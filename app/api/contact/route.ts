/**
 * app/api/contact/route.ts
 *
 * Handles inbound form submissions:
 *   - General contact
 *   - Consulting application
 *   - Membership waitlist
 *
 * POST /api/contact
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import {
  contactNotificationEmail,
  confirmationEmail,
  gapReportOwnerEmail,
} from '@/lib/email-templates'
import { generateGapReport, type GapReportInput } from '@/lib/ai-report'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>'
const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL ?? 'Sakib@witlyn.com'

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const ContactSchema = z.object({
  type: z.enum(['general', 'consulting', 'membership']),
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('A valid email address is required'),
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function subjectFor(type: string, name: string): string {
  switch (type) {
    case 'consulting':
      return `[New Consulting Application] from ${name}`
    case 'membership':
      return `[Membership Waitlist] from ${name}`
    default:
      return `[New Contact] from ${name}`
  }
}

/** Fire-and-forget Slack notification — never throws */
async function notifySlack(data: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  try {
    const fields = Object.entries(data)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `*${k}:* ${String(v)}`)
      .join('\n')

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `📬 New ${String(data.type ?? 'contact')} submission from *${String(data.name ?? 'Unknown')}*`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `📬 *New ${String(data.type ?? 'contact')} submission from ${String(data.name ?? 'Unknown')}*\n\n${fields}`,
            },
          },
        ],
      }),
    })
  } catch (err) {
    console.error('[contact/slack] Slack notification failed:', err)
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Parse body
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  // 2. Validate required fields
  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? 'Validation failed.'
    console.warn('[contact] Validation error:', parsed.error.flatten())
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }

  const { type, name, email } = parsed.data
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Track whether at least one critical action succeeded
  let ownerNotified = false
  let applicantConfirmed = false

  // 3. Send owner notification email
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: subjectFor(type, name),
      html: contactNotificationEmail(body),
    })
    ownerNotified = true
    console.log('[contact] Owner notification sent for:', email)
  } catch (err) {
    console.error('[contact] Failed to send owner notification:', err)
  }

  // 4. Fire-and-forget Slack notification
  void notifySlack(body)

  // 5. If consulting, trigger AI Gap Report (non-blocking for main flow)
  if (type === 'consulting') {
    // Don't await — run asynchronously so it doesn't delay the response
    ;(async () => {
      try {
        const reportInput: GapReportInput = {
          brandName:        String(body.brandName        ?? body.name ?? name),
          websiteUrl:       String(body.websiteUrl       ?? 'not provided'),
          instagramHandle:  body.instagramHandle != null ? String(body.instagramHandle) : undefined,
          primaryChallenge: String(body.primaryChallenge ?? body.message ?? 'not specified'),
        }

        console.log('[contact] Generating AI Gap Report for consulting application:', name)
        const report = await generateGapReport(reportInput)

        await resend.emails.send({
          from: FROM_EMAIL,
          to: NOTIFICATION_EMAIL,
          subject: `[AI Gap Report] ${reportInput.brandName} — Consulting Application`,
          html: gapReportOwnerEmail(reportInput.brandName, body, report),
        })
        console.log('[contact] AI Gap Report sent for:', name)
      } catch (err) {
        console.error('[contact] AI Gap Report generation or delivery failed:', err)
        // Non-fatal — owner already received the base notification
      }
    })()
  }

  // 6. Send confirmation email to applicant
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `We received your application, ${name}`,
      html: confirmationEmail(name, type),
    })
    applicantConfirmed = true
    console.log('[contact] Confirmation email sent to:', email)
  } catch (err) {
    console.error('[contact] Failed to send confirmation to applicant:', err)
  }

  // 7. Determine response
  if (!ownerNotified && !applicantConfirmed) {
    console.error('[contact] Complete email failure for submission from:', email)
    return NextResponse.json(
      { success: false, error: 'Unable to process your submission right now. Please try again.' },
      { status: 500 }
    )
  }

  // Partial email failure is still a success from the user's perspective
  return NextResponse.json(
    { success: true, message: 'Application received.' },
    { status: 200 }
  )
}
