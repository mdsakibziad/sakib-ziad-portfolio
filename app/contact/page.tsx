'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

/* ── Animation helpers ───────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Form types ──────────────────────────────────────────────────────────── */
interface FormData {
  name: string
  email: string
  company: string
  website: string
  intent: string
  message: string
  timeline: string
  referral: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  company: '',
  website: '',
  intent: '',
  message: '',
  timeline: '',
  referral: '',
}

/* ── Select component (inline, design-matched) ───────────────────────────── */
function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  required,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  required?: boolean
}) {
  return (
    <div className="w-full space-y-1.5">
      <label
        htmlFor={id}
        className="block font-inter text-label-sm uppercase tracking-widest text-ivory/60"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 font-inter text-body-md text-ivory bg-surface border border-ivory/20 transition-all duration-300 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer"
        style={{ backgroundImage: 'none' }}
      >
        <option value="" disabled className="bg-surface text-muted">
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface text-ivory">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

/* ── Success state ───────────────────────────────────────────────────────── */
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="card-surface p-10 md:p-14 text-center flex flex-col items-center gap-8"
    >
      {/* Gold mark */}
      <div className="w-16 h-px bg-gold/60 mx-auto" />
      <h2 className="font-fraunces text-display-md text-ivory font-light leading-tight">
        Received. Thank you.
      </h2>
      <p className="font-inter text-body-lg text-muted max-w-md leading-relaxed">
        I'll review your application and follow up within 48 hours. In the meantime, feel free to schedule a brief intro call.
      </p>

      {/* Cal.com embed */}
      <div className="w-full mt-4">
        <iframe
          src="[PLACEHOLDER: Cal.com URL — e.g. https://cal.com/sakibziad/intro]"
          width="100%"
          height="600"
          style={{ border: 'none', borderRadius: '12px' }}
          title="Schedule an intro call"
        />
      </div>

      {/* Secondary links */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Button asChild variant="outline" size="md">
          <Link href="/work">View the Work</Link>
        </Button>
        <Button asChild variant="outline-gold" size="md">
          <Link href="/digital-products">Browse Digital Products</Link>
        </Button>
      </div>
    </motion.div>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function update(field: keyof FormData) {
    return (value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'general', ...form }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury">
        <FadeUp>
          <p className="eyebrow mb-6">Get in Touch</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="font-fraunces text-display-lg text-ivory font-light max-w-3xl mb-8 leading-tight">
            Every relationship starts with a conversation.
          </h1>
        </FadeUp>
        <FadeUp delay={0.18}>
          <p className="font-inter text-body-xl text-muted max-w-xl mb-5 leading-relaxed">
            Fill in the form below. I review every application personally and respond within 48 hours.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <p className="font-inter text-body-sm text-muted/60">
            Not ready to apply?{' '}
            <Link href="/work" className="text-ivory/50 hover:text-gold transition-colors duration-300">
              Browse the work
            </Link>{' '}
            or{' '}
            <Link href="/digital-products" className="text-ivory/50 hover:text-gold transition-colors duration-300">
              explore digital products
            </Link>{' '}
            first.
          </p>
        </FadeUp>
      </section>

      {/* ── Application Form ──────────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32 lg:pb-40 container-luxury">
        <FadeUp delay={0.1}>
          <div className="max-w-2xl mx-auto">
            {status === 'success' ? (
              <SuccessState />
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="card-surface p-8 md:p-12 flex flex-col gap-8"
              >
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update('name')(e.target.value)}
                    required
                    autoComplete="name"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@brand.com"
                    value={form.email}
                    onChange={(e) => update('email')(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Row 2: Company + Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Brand / Company Name"
                    placeholder="Your brand"
                    value={form.company}
                    onChange={(e) => update('company')(e.target.value)}
                    required
                  />
                  <Input
                    label="Website URL"
                    type="url"
                    placeholder="https://yourbrand.com"
                    value={form.website}
                    onChange={(e) => update('website')(e.target.value)}
                  />
                </div>

                {/* Intent select */}
                <SelectField
                  label="What are you looking to do?"
                  id="intent"
                  value={form.intent}
                  onChange={update('intent')}
                  required
                  options={[
                    { value: 'consulting', label: 'Get consulting / advisory' },
                    { value: 'product', label: 'Buy a digital product' },
                    { value: 'membership', label: 'Join the membership' },
                    { value: 'other', label: 'Something else' },
                  ]}
                />

                {/* Brand message */}
                <Textarea
                  label="Tell me about your brand and what you're trying to achieve."
                  placeholder="Give me the full picture — your brand, your challenges, your ambitions. The more context, the better."
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message')(e.target.value)}
                  required
                />

                {/* Row: Timeline + Referral */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <SelectField
                    label="What's your timeline?"
                    id="timeline"
                    value={form.timeline}
                    onChange={update('timeline')}
                    options={[
                      { value: 'immediately', label: 'Immediately' },
                      { value: '1-month', label: 'Within 1 month' },
                      { value: '1-3-months', label: '1–3 months' },
                      { value: 'exploring', label: 'Just exploring' },
                    ]}
                  />
                  <Input
                    label="How did you find this page?"
                    placeholder="LinkedIn, referral, Instagram…"
                    value={form.referral}
                    onChange={(e) => update('referral')(e.target.value)}
                    hint="Optional"
                  />
                </div>

                {/* Error message */}
                {status === 'error' && errorMsg && (
                  <p className="font-inter text-label-sm text-red-400/80 text-center" role="alert">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={status === 'loading'}
                  className="w-full mt-2"
                >
                  {status === 'loading' ? 'Sending…' : 'Send My Application'}
                </Button>
              </form>
            )}
          </div>
        </FadeUp>
      </section>

      {/* ── Alternative Contact ───────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32 container-luxury">
        <FadeUp>
          <div className="max-w-2xl mx-auto">
            <div className="hr-gold mb-12" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="font-inter text-label-sm uppercase tracking-widest text-muted">
                  Direct Email
                </span>
                <a
                  href="mailto:Sakib@witlyn.com"
                  className="font-inter text-body-lg text-ivory/70 hover:text-gold transition-colors duration-300"
                >
                  Sakib@witlyn.com
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-inter text-label-sm uppercase tracking-widest text-muted">
                  LinkedIn
                </span>
                <a
                  href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-body-lg text-ivory/70 hover:text-gold transition-colors duration-300"
                >
                  linkedin.com/in/sakib-ziad-290104211
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-inter text-label-sm uppercase tracking-widest text-muted">
                  Instagram
                </span>
                <a
                  href="https://www.instagram.com/sakibziad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-body-lg text-ivory/70 hover:text-gold transition-colors duration-300"
                >
                  @sakibziad
                </a>
              </div>

              <div className="mt-4 pt-6 border-t border-border">
                <p className="font-inter text-body-sm text-muted/60">
                  Witlyn inquiries (full-service production / retainer):{' '}
                  <a
                    href="https://witlyn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/40 hover:text-gold transition-colors duration-300"
                  >
                    witlyn.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  )
}
