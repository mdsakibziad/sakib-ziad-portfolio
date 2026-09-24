'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

/* ── Animation helpers ──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-body-md text-ivory/80">
      <span className="mt-1 h-4 w-4 shrink-0 rounded-full border border-gold/50 flex items-center justify-center">
        <span className="block h-1.5 w-1.5 rounded-full bg-gold" />
      </span>
      {children}
    </li>
  )
}

function CrossItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-body-md text-muted">
      <span className="mt-[5px] shrink-0 text-muted/60 leading-none select-none">✕</span>
      {children}
    </li>
  )
}

/* ── Form state ─────────────────────────────────────────────────────────────── */
type FormState = 'idle' | 'loading' | 'success' | 'error'

const selectClass =
  'w-full rounded-xl px-4 py-3 font-inter text-body-md text-ivory bg-surface border border-ivory/20 transition-all duration-300 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 appearance-none'

const labelClass =
  'block font-inter text-label-sm uppercase tracking-widest text-ivory/60 mb-1.5'

/* ── Page ───────────────────────────────────────────────────────────────────── */
export default function ConsultingPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    website: '',
    instagram: '',
    stage: '',
    revenue: '',
    challenge: '',
    success: '',
    referral: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'consulting', ...formData }),
      })
      if (!res.ok) throw new Error('Request failed')
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  return (
    <main className="bg-background text-ivory">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center section-pad border-b border-border">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow mb-6">By Application Only</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-fraunces text-display-xl text-ivory mb-8 font-light">
                Strategic AI Counsel for Beauty Brands{' '}
                <em className="italic text-gold-gradient not-italic">That Mean Business.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-xl text-muted max-w-2xl mb-10 font-light">
                Private advisory spanning AI-native creative strategy, campaign direction, and
                custom AI automation builds — for brands ready to move from reactive to systematic.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Button
                variant="gold"
                size="lg"
                onClick={() =>
                  document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Apply for a Strategy Call
              </Button>
            </Reveal>
          </div>
        </div>
        {/* Subtle vertical gold line accent */}
        <div
          aria-hidden
          className="absolute right-0 top-0 h-full w-px"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(201,166,107,0.15) 40%, rgba(201,166,107,0.15) 60%, transparent 100%)',
          }}
        />
      </section>

      {/* ── Who This Is For ───────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-luxury">
          <Reveal>
            <p className="eyebrow mb-5">Right Fit</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-fraunces text-display-lg text-ivory font-light mb-16 max-w-2xl">
              This is for founders and CMOs who are done playing catch-up.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
            {/* IS for */}
            <Reveal delay={0.15}>
              <div className="card-surface p-8 lg:p-10">
                <p className="font-fraunces text-display-md text-ivory font-light mb-8">
                  This IS for you
                </p>
                <ul className="space-y-5">
                  <CheckItem>
                    Founders and marketing leads at beauty, skincare, or cosmetics brands
                  </CheckItem>
                  <CheckItem>
                    Leaders who want strategic depth and clear frameworks — not just tactics
                  </CheckItem>
                  <CheckItem>
                    Brands ready to invest meaningfully in AI-native infrastructure and systems
                  </CheckItem>
                  <CheckItem>
                    Those who want a thought partner who has lived inside the problem, not just an
                    executor
                  </CheckItem>
                </ul>
              </div>
            </Reveal>

            {/* IS NOT for */}
            <Reveal delay={0.25}>
              <div className="card-surface p-8 lg:p-10">
                <p className="font-fraunces text-display-md text-ivory/40 font-light mb-8">
                  This is NOT for you
                </p>
                <ul className="space-y-5">
                  <CrossItem>
                    Brands primarily looking for cheap, high-volume content creation
                  </CrossItem>
                  <CrossItem>Anyone expecting overnight viral results or quick-fix tactics</CrossItem>
                  <CrossItem>
                    Businesses outside the beauty, skincare, and cosmetics vertical
                  </CrossItem>
                  <CrossItem>
                    Brands that need a full-service agency —{' '}
                    <a
                      href="https://witlyn.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-light transition-colors duration-300"
                    >
                      Witlyn
                    </a>{' '}
                    is built for that
                  </CrossItem>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* ── What's Included ───────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface">
        <div className="container-luxury">
          <Reveal>
            <p className="eyebrow mb-5">Scope of Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-fraunces text-display-lg text-ivory font-light mb-16 max-w-2xl">
              Two pillars. One strategic partner.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Pillar 01 */}
            <Reveal delay={0.15}>
              <div className="border border-border rounded-2xl p-8 lg:p-10 h-full">
                <span className="eyebrow text-muted mb-3 block">Pillar 01</span>
                <h3 className="font-fraunces text-display-md text-ivory font-light mb-8">
                  AI Creative Strategy
                </h3>
                <ul className="space-y-4">
                  {[
                    'Creative audits and brand positioning reviews',
                    'AI-native campaign concepting and art direction',
                    'Content system architecture and editorial planning',
                    'Visual identity guidance for AI-era brand expression',
                  ].map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Pillar 02 */}
            <Reveal delay={0.25}>
              <div className="border border-border rounded-2xl p-8 lg:p-10 h-full">
                <span className="eyebrow text-muted mb-3 block">Pillar 02</span>
                <h3 className="font-fraunces text-display-md text-ivory font-light mb-8">
                  AI Automation &amp; Agents
                </h3>
                <ul className="space-y-4">
                  {[
                    'Brand operations automation: content pipelines, scheduling, analytics',
                    'Custom AI agent builds for brand intelligence and monitoring',
                    'Workflow mapping, toolchain selection, and implementation',
                    'Ongoing iteration, performance review, and optimization',
                  ].map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Witlyn callout */}
          <Reveal delay={0.3}>
            <div className="border border-gold/20 rounded-2xl p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="text-body-lg text-ivory/70 max-w-xl font-light">
                Need full-service AI creative production instead of advisory? That&apos;s what{' '}
                <span className="text-ivory">Witlyn</span> is built for.
              </p>
              <a
                href="https://witlyn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="outline-gold" size="md">
                  Visit Witlyn →
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* ── Engagement Structure ──────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-luxury">
          <Reveal>
            <p className="eyebrow mb-5">How It Works</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-fraunces text-display-lg text-ivory font-light mb-16 max-w-2xl">
              Structured for depth, not volume.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Reveal delay={0.15}>
              <div className="card-surface p-8 flex flex-col h-full">
                <div className="mb-8 flex-1">
                  <p className="eyebrow text-muted mb-4">01</p>
                  <h3 className="font-fraunces text-display-md text-ivory font-light mb-4">
                    The Diagnostic Session
                  </h3>
                  <p className="text-body-md text-muted mb-6">
                    Best for: brands evaluating fit and looking for a clear picture of where they
                    stand.
                  </p>
                  <ul className="space-y-3">
                    {[
                      '90-minute deep-dive brand audit',
                      'Review of current creative and marketing systems',
                      'Written gap report with prioritised recommendations',
                      'One-time engagement — no ongoing commitment',
                    ].map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border pt-6 mt-auto">
                  <p className="text-label-md text-muted uppercase tracking-widest">Investment</p>
                  <p className="text-body-md text-ivory/60 mt-1">
                    [PLACEHOLDER: starting from range] — discussed during application
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 2 */}
            <Reveal delay={0.25}>
              <div className="card-surface p-8 flex flex-col h-full">
                <div className="mb-8 flex-1">
                  <p className="eyebrow text-muted mb-4">02</p>
                  <h3 className="font-fraunces text-display-md text-ivory font-light mb-4">
                    Monthly Advisory Retainer
                  </h3>
                  <p className="text-body-md text-muted mb-6">
                    Best for: brands in active growth mode who need ongoing strategic guidance.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Structured monthly strategy sessions',
                      'Async support between calls',
                      'Creative direction and campaign review',
                      'AI automation oversight and iteration',
                    ].map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border pt-6 mt-auto">
                  <p className="text-label-md text-muted uppercase tracking-widest">Investment</p>
                  <p className="text-body-md text-ivory/60 mt-1">
                    [PLACEHOLDER: starting from range] — discussed during application
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 3 */}
            <Reveal delay={0.35}>
              <div className="card-surface p-8 flex flex-col h-full">
                <div className="mb-8 flex-1">
                  <p className="eyebrow text-muted mb-4">03</p>
                  <h3 className="font-fraunces text-display-md text-ivory font-light mb-4">
                    The Build Engagement
                  </h3>
                  <p className="text-body-md text-muted mb-6">
                    Best for: brands ready for full transformation and committed to building
                    lasting systems.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Project-scoped from the ground up',
                      'End-to-end design and build of a complete AI system',
                      'Creative infrastructure or automation — or both',
                      'Delivery with full documentation and handoff',
                    ].map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border pt-6 mt-auto">
                  <p className="text-label-md text-muted uppercase tracking-widest">Investment</p>
                  <p className="text-body-md text-ivory/60 mt-1">
                    [PLACEHOLDER: starting from range] — discussed during application
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* ── Application Form ──────────────────────────────────────────────────── */}
      <section id="application" className="section-pad bg-surface">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <p className="eyebrow mb-5">Apply</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-fraunces text-display-lg text-ivory font-light mb-4">
                Tell me about your brand.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-body-lg text-muted mb-12 font-light">
                Applications are reviewed within 48 hours. Every response is read personally.
              </p>
            </Reveal>

            {formState === 'success' ? (
              <Reveal>
                <div className="space-y-8">
                  <div className="border border-gold/20 rounded-2xl p-8">
                    <p className="font-fraunces text-display-md text-ivory font-light mb-3">
                      Thank you.
                    </p>
                    <p className="text-body-lg text-ivory/80 mb-2">
                      Your application has been received.
                    </p>
                    <p className="text-body-md text-muted">
                      While you wait for my review, feel free to schedule a brief intro call:
                    </p>
                  </div>
                  {/* Cal.com embed */}
                  <div className="rounded-2xl overflow-hidden border border-border">
                    <iframe
                      src="[PLACEHOLDER: Cal.com URL]"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      title="Schedule an intro call"
                      className="block"
                    />
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Your Name"
                      name="name"
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      placeholder="you@brand.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Brand Name"
                      name="brand"
                      type="text"
                      required
                      placeholder="Your brand"
                      value={formData.brand}
                      onChange={handleChange}
                    />
                    <Input
                      label="Website URL"
                      name="website"
                      type="text"
                      placeholder="https://"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <Input
                    label="Instagram Handle"
                    name="instagram"
                    type="text"
                    placeholder="@yourbrand (optional)"
                    value={formData.instagram}
                    onChange={handleChange}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="w-full space-y-1.5">
                      <label htmlFor="stage" className={labelClass}>
                        Brand Stage
                      </label>
                      <select
                        id="stage"
                        name="stage"
                        className={selectClass}
                        value={formData.stage}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select stage
                        </option>
                        <option value="pre-launch">Pre-launch</option>
                        <option value="early-stage">Early Stage</option>
                        <option value="growing">Growing</option>
                        <option value="established">Established</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>

                    <div className="w-full space-y-1.5">
                      <label htmlFor="revenue" className={labelClass}>
                        Current Monthly Revenue
                      </label>
                      <select
                        id="revenue"
                        name="revenue"
                        className={selectClass}
                        value={formData.revenue}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select range (optional)
                        </option>
                        <option value="under-10k">Under $10k</option>
                        <option value="10k-50k">$10k – $50k</option>
                        <option value="50k-250k">$50k – $250k</option>
                        <option value="250k-plus">$250k+</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <Textarea
                    label="What is your biggest creative / marketing challenge right now?"
                    name="challenge"
                    required
                    rows={5}
                    placeholder="Be as specific as you like."
                    value={formData.challenge}
                    onChange={handleChange}
                  />

                  <Textarea
                    label="What would success look like in 6 months?"
                    name="success"
                    required
                    rows={5}
                    placeholder="Paint the picture."
                    value={formData.success}
                    onChange={handleChange}
                  />

                  <Input
                    label="How did you hear about Sakib Ziad?"
                    name="referral"
                    type="text"
                    placeholder="Optional"
                    value={formData.referral}
                    onChange={handleChange}
                  />

                  {formState === 'error' && (
                    <p className="text-label-md text-red-400/80">
                      Something went wrong. Please try again or reach out directly.
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={formState === 'loading'}
                  >
                    {formState === 'loading' ? 'Submitting…' : 'Submit Application'}
                  </Button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
