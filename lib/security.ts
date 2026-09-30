import { NextRequest } from 'next/server'

interface RateLimitRecord {
  count: number
  resetTime: number
}

// In-memory rate limiting map
const ipRateLimits = new Map<string, RateLimitRecord>()

/**
 * Checks whether an incoming request exceeds allowed rate limits.
 * Default: 6 requests per 60 seconds per IP.
 */
export function checkRateLimit(
  req: NextRequest,
  limit = 6,
  windowMs = 60 * 1000
): { allowed: boolean; remaining: number } {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1'

  const now = Date.now()
  const record = ipRateLimits.get(ip)

  if (!record || now > record.resetTime) {
    ipRateLimits.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { allowed: true, remaining: limit - 1 }
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  return { allowed: true, remaining: limit - record.count }
}

/**
 * Sanitizes user input string against HTML injection and basic XSS.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '') // strip HTML angle brackets
    .trim()
    .slice(0, 3000) // max length boundary
}

/**
 * Checks if a honeypot field has been filled by a bot.
 */
export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  return Boolean(body._gotcha || body.company_hp || body.phone_hp)
}
