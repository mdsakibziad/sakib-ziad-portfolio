/**
 * app/api/subscribe/route.ts
 *
 * Newsletter / waitlist email capture.
 * Validates email, notifies owner, and sends a welcome email to the subscriber.
 *
 * POST /api/subscribe
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { subscribeConfirmationEmail } from '@/lib/email-templates'

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

const SubscribeSchema = z.object({
  email:  z.string().email('A valid email address is required'),
  source: z.string().max(100).optional(),
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal plain-text-style HTML for owner notification */
function ownerSubscribeEmail(email: string, source: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New Subscriber</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Helvetica Neue,Arial,sans-serif;color:#e5e7eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="560" style="max-width:560px;background:#141414;border-radius:10px;border:1px solid #27272a;padding:32px 40px;">
        <tr><td>
          <p style="margin:0 0 6px;font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#a78bfa;">New Subscriber</p>
          <h2 style="margin:0 0 24px;font-size:20px;color:#e5e7eb;">${escHtml(email)}</h2>
          <table style="width:100%;background:#1a1a1a;border-radius:8px;border:1px solid #27272a;">
            <tr>
              <td style="padding:10px 14px;font-size:13px;color:#9ca3af;width:35%;border-bottom:1px solid #27272a;">Email</td>
              <td style="padding:10px 14px;font-size:13px;color:#e5e7eb;border-bottom:1px solid #27272a;">${escHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;font-size:13px;color:#9ca3af;">Source</td>
              <td style="padding:10px 14px;font-size:13px;color:#e5e7eb;">${escHtml(source)}</td>
            </tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#6b7280;text-align:center;">© ${new Date().getFullYear()} Sakib Ziad · witlyn.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function escHtml(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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
  const parsed = SubscribeSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? 'Validation failed.'
    console.warn('[subscribe] Validation error:', parsed.error.flatten())
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }

  const { email, source = 'unknown' } = parsed.data
  const resend = new Resend(process.env.RESEND_API_KEY)

  let ownerNotified = false
  let subscriberWelcomed = false

  // 3. Notify owner
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `[New Subscriber] ${email} via ${source}`,
      html: ownerSubscribeEmail(email, source),
    })
    ownerNotified = true
    console.log('[subscribe] Owner notified of new subscriber:', email)
  } catch (err) {
    console.error('[subscribe] Failed to notify owner:', err)
  }

  // 4. Send welcome email to subscriber
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're on the list — Sakib Ziad",
      html: subscribeConfirmationEmail(email),
    })
    subscriberWelcomed = true
    console.log('[subscribe] Welcome email sent to:', email)
  } catch (err) {
    console.error('[subscribe] Failed to send welcome email to subscriber:', err)
  }

  // 5. Response — only hard-fail if both emails failed
  if (!ownerNotified && !subscriberWelcomed) {
    console.error('[subscribe] Complete email failure for subscriber:', email)
    return NextResponse.json(
      { success: false, error: 'Unable to process your subscription right now. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
