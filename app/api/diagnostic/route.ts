/**
 * app/api/diagnostic/route.ts
 *
 * Handles the "Gap & Opportunity Report" diagnostic form submissions.
 * Runs an AI analysis, emails the full report to the owner, and
 * emails a teaser version to the prospect.
 *
 * POST /api/diagnostic
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import {
  contactNotificationEmail,
  gapReportOwnerEmail,
  gapReportProspectEmail,
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

const DiagnosticSchema = z.object({
  brandName:         z.string().min(1, 'Brand name is required').max(200),
  websiteUrl:        z.string().url('A valid website URL is required'),
  instagramHandle:   z.string().max(100).optional(),
  primaryChallenge:  z.string().min(1, 'Primary challenge is required').max(2000),
  email:             z.string().email('A valid email address is required'),
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fire-and-forget — never throws */
async function sendOwnerAcknowledgement(
  resend: Resend,
  rawData: Record<string, unknown>
): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `[Diagnostic Requested] ${String(rawData.brandName ?? 'Unknown Brand')} — generating report…`,
      html: contactNotificationEmail(rawData),
    })
    console.log('[diagnostic] Owner acknowledgement sent for:', rawData.email)
  } catch (err) {
    console.error('[diagnostic] Failed to send owner acknowledgement:', err)
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

  // 2. Validate
  const parsed = DiagnosticSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? 'Validation failed.'
    console.warn('[diagnostic] Validation error:', parsed.error.flatten())
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }

  const { brandName, websiteUrl, instagramHandle, primaryChallenge, email } =
    parsed.data

  const apiKey = process.env.RESEND_API_KEY
  const resend = apiKey ? new Resend(apiKey) : null

  const reportInput: GapReportInput = {
    brandName,
    websiteUrl,
    instagramHandle,
    primaryChallenge,
  }

  // 3a. Fire-and-forget owner acknowledgement (don't block on AI)
  if (resend) {
    void sendOwnerAcknowledgement(resend, { ...body, type: 'diagnostic' })
  } else {
    console.warn('[diagnostic] RESEND_API_KEY not configured. Mocking diagnostic email dispatch.')
  }

  // 3b. Generate AI Gap Report (awaited — we need it for both emails)
  let reportGenerated = false
  try {
    console.log('[diagnostic] Generating Gap Report for:', brandName)
    const report = await generateGapReport(reportInput)
    reportGenerated = true

    if (resend) {
      // 4a. Email owner: full report + raw submission data (parallel with prospect email)
      const ownerEmailPromise = resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAIL,
        subject: `[Full Gap Report] ${brandName}`,
        html: gapReportOwnerEmail(brandName, body, report),
      })

      // 4b. Email prospect: teaser version with CTA
      const prospectEmailPromise = resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Your AI Gap Report for ${brandName} is ready`,
        html: gapReportProspectEmail(brandName, report),
      })

      const [ownerResult, prospectResult] = await Promise.allSettled([
        ownerEmailPromise,
        prospectEmailPromise,
      ])

      if (ownerResult.status === 'rejected') {
        console.error('[diagnostic] Failed to send full report to owner:', ownerResult.reason)
      } else {
        console.log('[diagnostic] Full report emailed to owner.')
      }

      if (prospectResult.status === 'rejected') {
        console.error('[diagnostic] Failed to send teaser to prospect:', prospectResult.reason)
      } else {
        console.log('[diagnostic] Teaser report emailed to prospect:', email)
      }
    }
  } catch (err) {
    // AI report failed — send owner the raw data so nothing is lost
    console.error('[diagnostic] AI report generation failed:', err)

    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: NOTIFICATION_EMAIL,
          subject: `[Diagnostic Requested — Manual Review] ${brandName}`,
          html: contactNotificationEmail({
            ...body,
            type: 'diagnostic',
            '_note': 'AI report generation failed. Please prepare manually.',
          }),
        })
        console.log('[diagnostic] Manual review notification sent to owner.')
      } catch (fallbackErr) {
        console.error('[diagnostic] Fallback owner email also failed:', fallbackErr)
      }
    }

    // Still return 200 — user experience is not penalised for our AI failure
    return NextResponse.json(
      {
        success: true,
        message:
          'Your diagnostic has been received. Your report is being prepared and will be sent to you shortly.',
      },
      { status: 200 }
    )
  }

  return NextResponse.json(
    {
      success: true,
      message: reportGenerated
        ? 'Report generated and sent.'
        : 'Diagnostic received. Your report is being prepared.',
    },
    { status: 200 }
  )
}
