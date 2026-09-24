'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

/* ── Data ────────────────────────────────────────────────────────────────── */
const articles = [
  {
    tag: 'AI Creative',
    title: '[PLACEHOLDER: Article 1 Title — e.g. "Why Beauty Brands Need Creative Systems, Not Creative Agencies"]',
    excerpt: '[PLACEHOLDER: 1–2 sentence excerpt. Something that makes the reader want to keep reading.]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
  {
    tag: 'Brand Strategy',
    title: '[PLACEHOLDER: Article 2 Title — e.g. "The Repositioning Trap: Why Most Beauty Brands Rebrand Wrong"]',
    excerpt: '[PLACEHOLDER: 1–2 sentence excerpt for article 2.]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
  {
    tag: 'AI Automation',
    title: '[PLACEHOLDER: Article 3 Title — e.g. "Build a Content Engine That Doesn\'t Sound Like a Robot"]',
    excerpt: '[PLACEHOLDER: 1–2 sentence excerpt for article 3.]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
  {
    tag: 'Creative Systems',
    title: '[PLACEHOLDER: Article 4 Title — e.g. "From Campaign to System: How to Stop Reinventing Your Brand Every Quarter"]',
    excerpt: '[PLACEHOLDER: 1–2 sentence excerpt for article 4.]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
  {
    tag: 'Beauty Marketing',
    title: '[PLACEHOLDER: Article 5 Title — e.g. "The Emotional ROI: What Beauty Brands Miss When They Measure Content"]',
    excerpt: '[PLACEHOLDER: 1–2 sentence excerpt for article 5.]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
  {
    tag: 'AI Tools',
    title: '[PLACEHOLDER: Article 6 Title — e.g. "The AI Stack I Use to Run a Creative Studio — and What I\'d Do Differently"]',
    excerpt: '[PLACEHOLDER: 1–2 sentence excerpt for article 6.]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
]

/* ── Article Card ────────────────────────────────────────────────────────── */
function ArticleCard({
  article,
  delay,
}: {
  article: (typeof articles)[0]
  delay: number
}) {
  return (
    <FadeUp delay={delay}>
      <Link
        href={article.href}
        className="card-surface group flex flex-col gap-5 p-7 md:p-8 h-full block transition-all duration-400"
      >
        {/* Tag */}
        <span className="eyebrow text-xs">{article.tag}</span>

        {/* Title */}
        <h3 className="font-fraunces text-body-xl text-ivory font-light leading-snug group-hover:text-gold/90 transition-colors duration-400">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="font-inter text-body-sm text-muted leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 pt-5 border-t border-border">
          <span className="font-inter text-label-sm text-muted">{article.date}</span>
          <span className="font-inter text-label-md text-gold group-hover:translate-x-1 transition-transform duration-400">
            Read →
          </span>
        </div>
      </Link>
    </FadeUp>
  )
}

/* ── Newsletter form ─────────────────────────────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      {status === 'success' ? (
        <p className="font-inter text-body-md text-gold">
          You're in. Expect depth, not noise.
        </p>
      ) : (
        <>
          <div className="flex-1">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
            />
          </div>
          <Button
            type="submit"
            variant="gold"
            size="md"
            disabled={status === 'loading'}
            className="shrink-0"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </Button>
        </>
      )}
      {status === 'error' && (
        <p className="font-inter text-label-sm text-red-400/80 mt-2 absolute" role="alert">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function InsightsPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury">
        <FadeUp>
          <p className="eyebrow mb-6">Insights</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="font-fraunces text-display-xl text-ivory font-light max-w-4xl mb-8 leading-tight">
            Thinking at the intersection of AI and beauty.
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="font-inter text-body-xl text-muted max-w-2xl leading-relaxed">
            Essays, frameworks, and observations on building beauty brands in the age of AI.
          </p>
        </FadeUp>
      </section>

      {/* ── Articles Grid ─────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <ArticleCard key={i} article={article} delay={0.06 * i} />
          ))}
        </div>

        {/* Publishing note */}
        <FadeUp delay={0.3}>
          <p className="font-inter text-body-sm text-muted/60 text-center mt-14 italic">
            Currently publishing on{' '}
            <a
              href="https://www.linkedin.com/in/sakib-ziad-290104211/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/40 hover:text-gold transition-colors duration-300 not-italic"
            >
              LinkedIn
            </a>{' '}
            — articles will be migrated here.
          </p>
        </FadeUp>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <FadeUp>
              <p className="eyebrow mb-6">Stay Sharp</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-fraunces text-display-md text-ivory font-light mb-5 leading-tight">
                Strategic AI insights for beauty brands — direct to your inbox.
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="font-inter text-body-lg text-muted mb-10 leading-relaxed">
                Join [PLACEHOLDER: X] founders and marketers reading along.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <NewsletterForm />
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="font-inter text-label-sm text-muted/50 mt-5">
                No spam. Occasional depth. Unsubscribe anytime.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury text-center">
        <FadeUp>
          <p className="font-fraunces text-display-md text-ivory font-light mb-8 max-w-xl mx-auto leading-tight">
            Ready to apply these ideas to your brand?
          </p>
          <Button asChild variant="gold" size="lg">
            <Link href="/contact">Apply for a Strategy Call</Link>
          </Button>
        </FadeUp>
      </section>
    </main>
  )
}
