/**
 * lib/email-templates.ts
 *
 * HTML email templates for all transactional emails.
 * Dark-themed, responsive, inline-styled (email-client safe).
 */

import type { GapReport } from './ai-report'

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

const BRAND_COLOR = '#a78bfa'   // violet-400
const BG_DARK    = '#0a0a0a'
const BG_CARD    = '#141414'
const BG_TABLE   = '#1a1a1a'
const TEXT_MAIN  = '#e5e7eb'
const TEXT_MUTED = '#9ca3af'
const BORDER     = '#27272a'

function shell(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BG_DARK};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:${TEXT_MAIN};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG_DARK};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${BG_CARD};border-radius:12px;border:1px solid ${BORDER};overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid ${BORDER};">
              <span style="font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND_COLOR};">Sakib Ziad</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid ${BORDER};text-align:center;">
              <p style="margin:0;font-size:12px;color:${TEXT_MUTED};">
                © ${new Date().getFullYear()} Sakib Ziad · witlyn.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
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

function heading(text: string): string {
  return `<h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${TEXT_MAIN};line-height:1.3;">${escHtml(text)}</h1>`
}

function subHeading(text: string): string {
  return `<h2 style="margin:24px 0 12px;font-size:15px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${BRAND_COLOR};">${escHtml(text)}</h2>`
}

function paragraph(html: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${TEXT_MAIN};">${html}</p>`
}

function mutedParagraph(html: string): string {
  return `<p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:${TEXT_MUTED};">${html}</p>`
}

function divider(): string {
  return `<hr style="border:none;border-top:1px solid ${BORDER};margin:24px 0;" />`
}

function ctaButton(text: string, href: string): string {
  return `<a href="${escHtml(href)}" style="display:inline-block;margin:8px 0 0;padding:12px 28px;background-color:${BRAND_COLOR};color:#0a0a0a;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;letter-spacing:0.04em;">${escHtml(text)}</a>`
}

/** Renders a key-value table from a plain object */
function kvTable(data: Record<string, unknown>): string {
  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => {
      const label = k
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (s) => s.toUpperCase())
      return `<tr>
        <td style="padding:10px 14px;font-size:13px;font-weight:600;color:${TEXT_MUTED};white-space:nowrap;vertical-align:top;width:38%;border-bottom:1px solid ${BORDER};">${escHtml(label)}</td>
        <td style="padding:10px 14px;font-size:13px;color:${TEXT_MAIN};vertical-align:top;word-break:break-word;border-bottom:1px solid ${BORDER};">${escHtml(String(v))}</td>
      </tr>`
    })
    .join('')

  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BG_TABLE};border-radius:8px;border:1px solid ${BORDER};margin:16px 0;overflow:hidden;">
    <tbody>${rows}</tbody>
  </table>`
}

/** Renders a Gap/Opportunity item block */
function reportItem(
  index: number,
  title: string,
  description: string,
  accent: string
): string {
  return `<div style="margin-bottom:16px;padding:16px;background-color:${BG_TABLE};border-radius:8px;border-left:3px solid ${accent};">
    <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:${accent};">${index}. ${escHtml(title)}</p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:${TEXT_MAIN};">${escHtml(description)}</p>
  </div>`
}

// ---------------------------------------------------------------------------
// 1. contactNotificationEmail
// ---------------------------------------------------------------------------

/**
 * Owner notification email for all inbound contact/application submissions.
 */
export function contactNotificationEmail(data: Record<string, unknown>): string {
  const type = String(data.type ?? 'submission')
  const name = String(data.name ?? 'Unknown')
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Singapore',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const body = `
    ${heading('New Inbound Submission')}
    ${mutedParagraph(`<strong style="color:${BRAND_COLOR};">${escHtml(type.toUpperCase())}</strong> · Received ${escHtml(timestamp)} (SGT)`)}
    ${divider()}
    ${subHeading('Submitted Fields')}
    ${kvTable(data)}
    ${mutedParagraph(`Submitted by <strong style="color:${TEXT_MAIN};">${escHtml(name)}</strong> via the portfolio contact system.`)}
  `
  return shell(`New ${type} submission from ${name}`, body)
}

// ---------------------------------------------------------------------------
// 2. confirmationEmail
// ---------------------------------------------------------------------------

/**
 * Confirmation email sent to the applicant after form submission.
 */
export function confirmationEmail(name: string, type: string): string {
  const typeLabels: Record<string, string> = {
    consulting: 'consulting inquiry',
    membership: 'membership waitlist',
    general:    'message',
  }
  const label = typeLabels[type] ?? 'submission'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://witlyn.com'

  const body = `
    ${heading(`Thank you, ${escHtml(name)}.`)}
    ${paragraph(`Your ${escHtml(label)} has been received.`)}
    ${divider()}
    ${paragraph(`I read every submission personally. You can expect a thoughtful response within <strong>48 hours</strong> — usually sooner.`)}
    ${paragraph(`In the meantime, feel free to explore:`)}
    <ul style="margin:0 0 20px;padding-left:20px;font-size:15px;line-height:2;color:${TEXT_MAIN};">
      <li><a href="${escHtml(siteUrl)}/work" style="color:${BRAND_COLOR};text-decoration:none;">Selected Work</a> — case studies and results</li>
      <li><a href="${escHtml(siteUrl)}/about" style="color:${BRAND_COLOR};text-decoration:none;">About</a> — background and approach</li>
    </ul>
    ${divider()}
    ${paragraph(`Talk soon,<br /><strong>— Sakib Ziad</strong>`)}
    ${mutedParagraph(`AI Creative Strategist · Beauty & Skincare`)}
  `
  return shell(`We received your ${label}, ${name}`, body)
}

// ---------------------------------------------------------------------------
// 3. gapReportOwnerEmail
// ---------------------------------------------------------------------------

/**
 * Full Gap & Opportunity Report for the owner — includes AI report + raw form data.
 */
export function gapReportOwnerEmail(
  brandName: string,
  rawData: Record<string, unknown>,
  report: GapReport
): string {
  const gapItems = report.gaps
    .map((g, i) => reportItem(i + 1, g.title, g.description, '#f87171'))
    .join('')

  const oppItems = report.opportunities
    .map((o, i) => reportItem(i + 1, o.title, o.description, '#34d399'))
    .join('')

  const body = `
    ${heading(`Gap & Opportunity Report: ${escHtml(brandName)}`)}
    ${mutedParagraph(`Generated ${escHtml(report.generatedAt)} · AI-powered analysis`)}
    ${divider()}

    ${subHeading('Identified Gaps')}
    ${gapItems}

    ${subHeading('Opportunities')}
    ${oppItems}

    ${subHeading('Suggested Next Step')}
    <div style="padding:16px;background-color:${BG_TABLE};border-radius:8px;border:1px solid ${BORDER};margin-bottom:24px;">
      <p style="margin:0;font-size:14px;line-height:1.65;color:${TEXT_MAIN};">${escHtml(report.suggestedNextStep)}</p>
    </div>

    ${divider()}
    ${subHeading('Raw Submission Data')}
    ${kvTable(rawData)}
  `
  return shell(`Gap Report — ${brandName}`, body)
}

// ---------------------------------------------------------------------------
// 4. gapReportProspectEmail
// ---------------------------------------------------------------------------

/**
 * Teaser Gap Report for the prospect — shows 2 gaps + 1 opportunity with a CTA.
 */
export function gapReportProspectEmail(brandName: string, report: GapReport): string {
  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK ??
    `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://witlyn.com'}/contact`

  // Show first 2 gaps as teasers (truncate description at 120 chars)
  const teaserGaps = report.gaps.slice(0, 2).map((g, i) => {
    const teaser =
      g.description.length > 120
        ? g.description.slice(0, 117) + '…'
        : g.description
    return reportItem(i + 1, g.title, teaser, '#f87171')
  }).join('')

  // Show first opportunity in full
  const opp = report.opportunities[0]
  const oppBlock = opp
    ? reportItem(1, opp.title, opp.description, '#34d399')
    : ''

  const body = `
    ${heading(`Your AI Gap Report for ${escHtml(brandName)} is ready.`)}
    ${paragraph(`I ran your brand through our AI Creative Strategy framework. Here's what surfaced.`)}
    ${divider()}

    ${subHeading('Where You\'re Leaving Growth on the Table')}
    ${teaserGaps}
    ${mutedParagraph(`<em>+ 1 more gap identified in your full report.</em>`)}

    ${subHeading('Highest-Leverage Opportunity')}
    ${oppBlock}

    ${divider()}
    ${paragraph(`Your full report includes all 3 gaps, 3 opportunities, and a prioritised 30-day action plan — specific to ${escHtml(brandName)}.`)}
    ${paragraph(`<strong>Book a Strategy Call to walk through it together:</strong>`)}
    ${ctaButton('Book Your Strategy Call →', calLink)}
    ${divider()}
    ${paragraph(`— Sakib Ziad`)}
    ${mutedParagraph(`AI Creative Strategist · Beauty & Skincare`)}
  `
  return shell(`Your AI Gap Report for ${brandName} is ready`, body)
}

// ---------------------------------------------------------------------------
// 5. subscribeConfirmationEmail
// ---------------------------------------------------------------------------

/**
 * Welcome email for new newsletter / waitlist subscribers.
 */
export function subscribeConfirmationEmail(email: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://witlyn.com'

  const body = `
    ${heading(`You're on the list.`)}
    ${paragraph(`<strong>${escHtml(email)}</strong> is confirmed.`)}
    ${divider()}
    ${paragraph(`You'll occasionally hear from me on:`)}
    <ul style="margin:0 0 20px;padding-left:20px;font-size:15px;line-height:2;color:${TEXT_MAIN};">
      <li>AI-native creative systems for beauty brands</li>
      <li>Real breakdowns of what's working (and what isn't)</li>
      <li>Early access to new frameworks and tools</li>
    </ul>
    ${paragraph(`No noise. No weekly newsletters for the sake of it. Only when there's something worth sharing.`)}
    ${divider()}
    <p style="margin:0 0 8px;font-size:14px;color:${TEXT_MUTED};">Want to explore in the meantime?</p>
    ${ctaButton('View Selected Work →', `${siteUrl}/work`)}
    ${divider()}
    ${paragraph(`— Sakib Ziad`)}
    ${mutedParagraph(`AI Creative Strategist · Beauty & Skincare`)}
  `
  return shell("You're on the list — Sakib Ziad", body)
}
