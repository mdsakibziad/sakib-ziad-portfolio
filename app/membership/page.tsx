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

/* ── Shared list items ──────────────────────────────────────────────────────── */
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

/* ── Benefit card data ───────────────────────────────────────────────────────── */
const benefits = [
  {
    label: '01',
    title: 'Monthly Strategy Deep-Dive',
    body: 'A structured analysis of emerging AI creative trends and what they mean for your brand — delivered with clear, actionable interpretation, not just a summary.',
  },
  {
    label: '02',
    title: 'AI Tool Reviews & Setups',
    body: 'Hands-on reviews of new AI tools relevant to beauty brand operations. Each review comes with a setup guide and honest verdict on whether it belongs in your stack.',
  },
  {
    label: '03',
    title: 'Direct Access',
    body: '[PLACEHOLDER: async channel / community platform TBD — describe how members reach Sakib directly and the expected response format.]',
  },
  {
    label: '04',
    title: 'Member-Only Templates',
    body: 'Exclusive creative frameworks and AI automation blueprints released monthly. Each template is drawn directly from active consulting work.',
  },
  {
    label: '05',
    title: '[PLACEHOLDER: 5th Benefit Title]',
    body: '[PLACEHOLDER: 5th benefit description — what members receive, how it works, and what makes it valuable.]',
  },
]

/* ── Form state ─────────────────────────────────────────────────────────────── */
type FormState = 'idle' | 'loading' | 'success' | 'error'

/* ── Page ───────────────────────────────────────────────────────────────────── */
export default function MembershipPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    reason: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        body: JSON.stringify({ type: 'membership', ...formData }),
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
              <p className="eyebrow mb-6">Limited Access</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-fraunces text-display-xl text-ivory font-light mb-8">
                A standing relationship with your{' '}
                <em className="italic text-gold-gradient">AI creative strategist.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-xl text-muted max-w-2xl mb-10 font-light">
                Monthly strategy, tools, community, and direct access — for founders and teams
                building for the long game.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Button
                variant="gold"
                size="lg"
                onClick={() =>
                  document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Apply to Join
              </Button>
            </Reveal>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute right-0 top-0 h-full w-px"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(201,166,107,0.15) 40%, rgba(201,166,107,0.15) 60%, transparent 100%)',
          }}
        />
      </section>

      {/* ── What's Included ───────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-luxury">
          <Reveal>
            <p className="eyebrow mb-5">What You Get</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-fraunces text-display-lg text-ivory font-light mb-16 max-w-2xl">
              Not a newsletter. Not a Discord.{' '}
              <span className="text-gold-gradient">A system.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.label} delay={i * 0.08}>
                <div className="card-surface p-8 flex flex-col h-full">
                  <p className="eyebrow text-muted mb-4">{benefit.label}</p>
                  <h3 className="font-fraunces text-display-md text-ivory font-light mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-body-md text-muted font-light">{benefit.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* ── Who It's For ──────────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface">
        <div className="container-luxury">
          <Reveal>
            <p className="eyebrow mb-5">Right Fit</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-fraunces text-display-lg text-ivory font-light mb-16 max-w-2xl">
              Built for founders who want intelligence on tap.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
            {/* IS for */}
            <Reveal delay={0.15}>
              <div className="border border-border rounded-2xl p-8 lg:p-10">
                <p className="font-fraunces text-display-md text-ivory font-light mb-8">
                  This IS for you
                </p>
                <ul className="space-y-5">
                  <CheckItem>
                    Brands who want ongoing strategic intelligence without the cost of a full
                    advisory retainer
                  </CheckItem>
                  <CheckItem>
                    Curious founders who are learning the AI creative space and want a reliable
                    signal amid the noise
                  </CheckItem>
                  <CheckItem>
                    Teams who want expert strategic guidance available on a consistent cadence
                  </CheckItem>
                  <CheckItem>
                    Operators who are self-directed and can implement with the right frameworks
                  </CheckItem>
                </ul>
              </div>
            </Reveal>

            {/* NOT for */}
            <Reveal delay={0.25}>
              <div className="border border-border rounded-2xl p-8 lg:p-10">
                <p className="font-fraunces text-display-md text-ivory/40 font-light mb-8">
                  This is NOT for you
                </p>
                <ul className="space-y-5">
                  <CrossItem>
                    Brands who need hands-on execution —{' '}
                    <a
                      href="/consulting"
                      className="text-gold hover:text-gold-light transition-colors duration-300"
                    >
                      consulting
                    </a>{' '}
                    or{' '}
                    <a
                      href="https://witlyn.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-light transition-colors duration-300"
                    >
                      Witlyn
                    </a>{' '}
                    is the right path
                  </CrossItem>
                  <CrossItem>
                    Those looking for a generic marketing community or peer networking group
                  </CrossItem>
                  <CrossItem>
                    Brands outside the beauty, skincare, and cosmetics vertical
                  </CrossItem>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* ── Investment ────────────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p className="eyebrow mb-6">Investment</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-fraunces text-display-xl text-ivory font-light mb-6">
                [PLACEHOLDER: $XX/month]
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-body-lg text-muted font-light mb-4">
                Billed monthly. Cancel anytime.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-md text-muted/70 font-light max-w-md mx-auto mb-10">
                Membership is kept deliberately small to preserve the quality of access and
                discussion. Applications are reviewed before a spot is confirmed.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Button
                variant="gold"
                size="lg"
                onClick={() =>
                  document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Apply to Join
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* ── Waitlist Form ─────────────────────────────────────────────────────── */}
      <section id="waitlist-form" className="section-pad bg-surface">
        <div className="container-luxury">
          <div className="max-w-lg mx-auto">
            <Reveal>
              <p className="eyebrow mb-5">Waitlist</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-fraunces text-display-lg text-ivory font-light mb-4">
                Tell me a little about yourself.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-body-lg text-muted font-light mb-12">
                Spots open on a rolling basis. I&apos;ll reach out personally when one becomes
                available.
              </p>
            </Reveal>

            {formState === 'success' ? (
              <Reveal>
                <div className="border border-gold/20 rounded-2xl p-8 text-center">
                  <p className="font-fraunces text-display-md text-ivory font-light mb-4">
                    You&apos;re on the list.
                  </p>
                  <p className="text-body-lg text-muted font-light">
                    I&apos;ll be in touch when a spot opens up. In the meantime, check out the{' '}
                    <a
                      href="/digital-products"
                      className="text-gold hover:text-gold-light transition-colors duration-300"
                    >
                      digital products
                    </a>{' '}
                    for self-serve resources.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-7">
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@brand.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Brand Name"
                    name="brand"
                    type="text"
                    placeholder="Your brand (optional)"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                  <Textarea
                    label="What brings you here?"
                    name="reason"
                    rows={5}
                    placeholder="Tell me about your brand, what you're working on, and what draws you to this."
                    value={formData.reason}
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
                    {formState === 'loading' ? 'Submitting…' : 'Join the Waitlist'}
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
