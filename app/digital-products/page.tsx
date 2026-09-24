'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

/* ── Product card data ──────────────────────────────────────────────────────── */
interface Product {
  name: string
  tag: string
  description: string
  whatsInside?: string[]
  price: string
  comingSoon?: boolean
  ctaLabel: string
  ctaVariant: 'gold' | 'outline'
}

const products: Product[] = [
  {
    name: '[PLACEHOLDER: Product Name 1]',
    tag: 'Framework',
    description:
      '[PLACEHOLDER: Product 1 description — what\'s inside, the outcome it delivers, and who it\'s built for.]',
    whatsInside: [
      '[PLACEHOLDER: deliverable / module 1]',
      '[PLACEHOLDER: deliverable / module 2]',
      '[PLACEHOLDER: deliverable / module 3]',
      '[PLACEHOLDER: deliverable / module 4]',
    ],
    price: '[PLACEHOLDER: $XX]',
    ctaLabel: 'Get Instant Access →',
    ctaVariant: 'gold',
  },
  {
    name: '[PLACEHOLDER: Product Name 2]',
    tag: 'AI Automation Kit',
    description:
      '[PLACEHOLDER: Product 2 description — what\'s inside, the outcome it delivers, and who it\'s built for.]',
    whatsInside: [
      '[PLACEHOLDER: deliverable / module 1]',
      '[PLACEHOLDER: deliverable / module 2]',
      '[PLACEHOLDER: deliverable / module 3]',
    ],
    price: '[PLACEHOLDER: $XX]',
    ctaLabel: 'Get Instant Access →',
    ctaVariant: 'gold',
  },
  {
    name: '[PLACEHOLDER: Product Name 3]',
    tag: 'Playbook',
    description:
      '[PLACEHOLDER: Product 3 description — what\'s inside, the outcome it delivers, and who it\'s built for.]',
    whatsInside: [
      '[PLACEHOLDER: deliverable / module 1]',
      '[PLACEHOLDER: deliverable / module 2]',
      '[PLACEHOLDER: deliverable / module 3]',
    ],
    price: '[PLACEHOLDER: $XX]',
    ctaLabel: 'Get Instant Access →',
    ctaVariant: 'gold',
  },
  {
    name: '[PLACEHOLDER: Product Name 4]',
    tag: 'Course',
    description:
      '[PLACEHOLDER: Product 4 description — what this course will cover and who it\'s being built for.]',
    price: 'Coming Soon',
    comingSoon: true,
    ctaLabel: 'Join the Waitlist',
    ctaVariant: 'outline',
  },
]

/* ── Newsletter form state ───────────────────────────────────────────────────── */
type SubscribeState = 'idle' | 'loading' | 'success' | 'error'

/* ── Page ───────────────────────────────────────────────────────────────────── */
export default function DigitalProductsPage() {
  const [email, setEmail] = useState('')
  const [subscribeState, setSubscribeState] = useState<SubscribeState>('idle')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setSubscribeState('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Subscription failed')
      setSubscribeState('success')
    } catch {
      setSubscribeState('error')
    }
  }

  return (
    <main className="bg-background text-ivory">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-border">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow mb-6">Self-Serve Resources</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-fraunces text-display-xl text-ivory font-light mb-8">
                The AI creative playbooks{' '}
                <em className="italic text-gold-gradient not-italic">
                  I wish existed when I started.
                </em>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-xl text-muted max-w-2xl font-light">
                Frameworks, templates, and AI agent kits built specifically for beauty and skincare
                brands.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Products Grid ─────────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-luxury">
          <Reveal>
            <p className="eyebrow mb-5">Available Now</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {products.map((product, i) => (
              <Reveal key={product.name} delay={i * 0.1}>
                <div className="card-surface p-8 lg:p-10 flex flex-col h-full">
                  {/* Tag row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-label-md font-inter uppercase tracking-widest text-gold border border-gold/30 rounded-full px-3 py-1">
                      {product.tag}
                    </span>
                    {product.comingSoon && (
                      <span className="text-label-md font-inter uppercase tracking-widest text-muted border border-border rounded-full px-3 py-1">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h2 className="font-fraunces text-display-md text-ivory font-light mb-4">
                    {product.name}
                  </h2>

                  {/* Description */}
                  <p className="text-body-md text-muted font-light mb-6 flex-1">
                    {product.description}
                  </p>

                  {/* What's Inside */}
                  {product.whatsInside && !product.comingSoon && (
                    <div className="mb-6">
                      <p className="text-label-md uppercase tracking-widest text-ivory/40 mb-3">
                        What&apos;s Inside
                      </p>
                      <ul className="space-y-2">
                        {product.whatsInside.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-body-sm text-ivory/70"
                          >
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-gold/60 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-6 border-t border-border">
                    <p className="font-fraunces text-display-md text-ivory font-light">
                      {product.price}
                    </p>
                    <Button
                      variant={product.ctaVariant}
                      size="md"
                      onClick={() => {}}
                      disabled={product.comingSoon}
                    >
                      {product.ctaLabel}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Footnote */}
          <Reveal delay={0.4}>
            <p className="mt-10 text-body-md text-muted text-center font-light">
              All products are built from real engagements — not theory.
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* ── Why These Exist ───────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: headline */}
            <Reveal>
              <h2 className="font-fraunces text-display-lg text-ivory font-light">
                Built from the strategy room, not the classroom.
              </h2>
            </Reveal>

            {/* Right: rationale */}
            <Reveal delay={0.15}>
              <div className="space-y-6">
                <p className="text-body-lg text-muted font-light">
                  Every framework, template, and automation kit in this library was extracted
                  directly from active consulting engagements. These aren&apos;t theoretical
                  models — they&apos;re the exact thinking tools used with real beauty brands
                  navigating the transition to AI-native creative operations.
                </p>
                <p className="text-body-lg text-muted font-light">
                  If you want to move at your own pace, learn the system yourself, and implement
                  without a full advisory engagement, these are the most direct path there.
                  Structured enough to follow, flexible enough to adapt to your brand.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* ── Newsletter CTA ────────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-luxury">
          <div className="max-w-xl mx-auto text-center">
            <Reveal>
              <h2 className="font-fraunces text-display-md text-ivory font-light mb-4">
                New products drop occasionally.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg text-muted mb-10 font-light">
                Be the first to know.
              </p>
            </Reveal>

            {subscribeState === 'success' ? (
              <Reveal>
                <p className="text-body-lg text-ivory/70 font-light">
                  You&apos;re on the list. I&apos;ll reach out when something new drops.
                </p>
              </Reveal>
            ) : (
              <Reveal delay={0.15}>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 items-stretch"
                >
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Email address"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="gold"
                    size="md"
                    disabled={subscribeState === 'loading'}
                    className="shrink-0"
                  >
                    {subscribeState === 'loading' ? 'Subscribing…' : 'Notify Me'}
                  </Button>
                </form>
                {subscribeState === 'error' && (
                  <p className="text-label-md text-red-400/80 mt-3">
                    Something went wrong. Please try again.
                  </p>
                )}
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
