/**
 * lib/ai-report.ts
 *
 * AI-powered Gap & Opportunity Report generator for beauty/skincare brands.
 * Uses native fetch only — zero SDK dependencies.
 * Primary:  OpenAI GPT-4o-mini  (OPENAI_API_KEY)
 * Fallback: Anthropic Claude     (ANTHROPIC_API_KEY)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GapReportInput {
  brandName: string
  websiteUrl: string
  instagramHandle?: string
  primaryChallenge: string
}

export interface GapReport {
  brandName: string
  gaps: Array<{ title: string; description: string }>
  opportunities: Array<{ title: string; description: string }>
  suggestedNextStep: string
  generatedAt: string
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are an expert AI Creative Strategist specializing in beauty, skincare, and cosmetics brands. You analyze a brand's current creative and marketing presence and identify strategic gaps and opportunities for AI-native creative and brand operations.

Given information about a beauty/skincare/cosmetics brand, produce a structured Gap & Opportunity Summary with:
- 3 specific, observed gaps in their current visual/creative/marketing presence (be concrete, reference likely patterns for their brand stage)
- 3 concrete opportunities where AI-native creative systems could unlock measurable growth
- 1 suggested next step that is actionable within 30 days

Respond in valid JSON matching this schema exactly:
{
  "gaps": [{"title": "string", "description": "string"}],
  "opportunities": [{"title": "string", "description": "string"}],
  "suggestedNextStep": "string"
}

Be specific, credible, and strategic. Do not use generic marketing speak. Speak like a senior strategist who has seen this pattern before.`

function buildUserPrompt(input: GapReportInput): string {
  return `Brand: ${input.brandName}
Website: ${input.websiteUrl}
Instagram: ${input.instagramHandle ?? 'not provided'}
Primary Challenge: ${input.primaryChallenge}`
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

interface RawLLMResponse {
  gaps?: unknown
  opportunities?: unknown
  suggestedNextStep?: unknown
}

function isGapItem(val: unknown): val is { title: string; description: string } {
  return (
    typeof val === 'object' &&
    val !== null &&
    typeof (val as Record<string, unknown>).title === 'string' &&
    typeof (val as Record<string, unknown>).description === 'string'
  )
}

function validateAndShape(raw: RawLLMResponse, input: GapReportInput): GapReport {
  const gaps = Array.isArray(raw.gaps) ? raw.gaps.filter(isGapItem) : []
  const opportunities = Array.isArray(raw.opportunities)
    ? raw.opportunities.filter(isGapItem)
    : []
  const suggestedNextStep =
    typeof raw.suggestedNextStep === 'string' ? raw.suggestedNextStep : ''

  if (gaps.length === 0 || opportunities.length === 0 || !suggestedNextStep) {
    throw new Error('LLM response failed structural validation')
  }

  return {
    brandName: input.brandName,
    gaps,
    opportunities,
    suggestedNextStep,
    generatedAt: new Date().toISOString(),
  }
}

// ---------------------------------------------------------------------------
// OpenAI provider
// ---------------------------------------------------------------------------

async function callOpenAI(input: GapReportInput): Promise<GapReport> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY not set')

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(input) },
      ],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`OpenAI API error ${response.status}: ${errText}`)
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const content = data?.choices?.[0]?.message?.content
  if (!content) throw new Error('OpenAI returned empty content')

  const parsed: RawLLMResponse = JSON.parse(content)
  return validateAndShape(parsed, input)
}

// ---------------------------------------------------------------------------
// Anthropic provider
// ---------------------------------------------------------------------------

async function callAnthropic(input: GapReportInput): Promise<GapReport> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(input) }],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Anthropic API error ${response.status}: ${errText}`)
  }

  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>
  }

  const textBlock = data?.content?.find((b) => b.type === 'text')
  if (!textBlock?.text) throw new Error('Anthropic returned empty content')

  // Claude may wrap JSON in markdown fences — strip them if present
  const jsonString = textBlock.text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  const parsed: RawLLMResponse = JSON.parse(jsonString)
  return validateAndShape(parsed, input)
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generates a Gap & Opportunity Report for the given brand.
 * Tries OpenAI first, falls back to Anthropic.
 * Throws if both providers fail or neither key is configured.
 */
export async function generateGapReport(input: GapReportInput): Promise<GapReport> {
  const errors: string[] = []

  // 1. Try OpenAI
  if (process.env.OPENAI_API_KEY) {
    try {
      console.log('[ai-report] Calling OpenAI for brand:', input.brandName)
      return await callOpenAI(input)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[ai-report] OpenAI failed:', msg)
      errors.push(`OpenAI: ${msg}`)
    }
  } else {
    errors.push('OpenAI: OPENAI_API_KEY not configured')
  }

  // 2. Fallback: Anthropic
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      console.log('[ai-report] Falling back to Anthropic for brand:', input.brandName)
      return await callAnthropic(input)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[ai-report] Anthropic failed:', msg)
      errors.push(`Anthropic: ${msg}`)
    }
  } else {
    errors.push('Anthropic: ANTHROPIC_API_KEY not configured')
  }

  throw new Error(
    `All AI providers failed. Details: ${errors.join(' | ')}`
  )
}
