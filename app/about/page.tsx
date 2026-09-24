'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

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
const beliefs = [
  {
    number: '01',
    title: 'AI is an amplifier, not a replacement.',
    body: 'The brands that will win aren\'t the ones replacing human creativity with AI. They\'re the ones using AI to express creativity at a scale previously impossible.',
  },
  {
    number: '02',
    title: 'Beauty brands deserve better than generic content.',
    body: 'The beauty industry is one of the most emotionally rich categories in marketing. It deserves creative systems that match that depth.',
  },
  {
    number: '03',
    title: 'Systems compound. Tactics expire.',
    body: 'A well-built AI creative system grows stronger over time. A campaign idea dies the moment it stops running.',
  },
]

const timeline = [
  {
    year: '[PLACEHOLDER: Year]',
    event: 'BSc in Artificial Intelligence, [PLACEHOLDER: University Name]',
  },
  {
    year: '[PLACEHOLDER: Year]',
    event: 'First beauty brand engagement — [PLACEHOLDER: context, e.g. "freelance campaign direction for an indie skincare brand"]',
  },
  {
    year: '[PLACEHOLDER: Year]',
    event: 'Founded Witlyn, AI-native creative studio for beauty & skincare brands',
  },
  {
    year: '[PLACEHOLDER: Year]',
    event: 'Launched this advisory practice',
  },
  {
    year: '[PLACEHOLDER: Year]',
    event: '[PLACEHOLDER: Any notable milestone — e.g. first international client, case study published, media mention]',
  },
]

const pressCards = [
  {
    publication: '[PLACEHOLDER: Publication Name]',
    title: '[PLACEHOLDER: Article Title]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
  {
    publication: '[PLACEHOLDER: Publication Name]',
    title: '[PLACEHOLDER: Article Title]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
  {
    publication: '[PLACEHOLDER: Publication Name]',
    title: '[PLACEHOLDER: Article Title]',
    date: '[PLACEHOLDER: Date]',
    href: '#',
  },
]

const PRESS_AVAILABLE = false // flip to true once press exists

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury">
        <FadeUp>
          <p className="eyebrow mb-8">About</p>
        </FadeUp>
        <FadeUp delay={0.12}>
          <h1 className="font-fraunces text-display-xl text-ivory font-light max-w-5xl leading-tight">
            I built Witlyn to prove AI-native creative works.{' '}
            <em className="italic text-ivory/70">
              I built this practice to show brands how to think in it.
            </em>
          </h1>
        </FadeUp>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-start">
          {/* Left — headshot placeholder */}
          <FadeUp delay={0.05} className="lg:col-span-2">
            <div className="w-full aspect-[3/4] bg-surface border border-border rounded-2xl flex items-center justify-center">
              <span className="font-inter text-label-md text-muted text-center px-6">
                [PLACEHOLDER: Headshot Image]
              </span>
            </div>
          </FadeUp>

          {/* Right — story paragraphs */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            <FadeUp delay={0.1}>
              <p className="eyebrow mb-2">The Story</p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="font-inter text-body-lg text-ivory/75 leading-relaxed">
                [PLACEHOLDER: Paragraph 1 — where you started, the AI degree, first encounter with beauty brands. Maximum 4 sentences. Something like: how studying AI led you to see the gap in how beauty brands were creating content, and the moment you realised the industry was underserving itself creatively.]
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-inter text-body-lg text-ivory/75 leading-relaxed">
                [PLACEHOLDER: Paragraph 2 — founding Witlyn, what you learned, why AI-native creative is a competitive edge. Maximum 4 sentences. Describe what building Witlyn taught you about the relationship between AI capability and genuine creative quality, and why that combination is now a strategic differentiator for brands willing to build properly.]
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="font-inter text-body-lg text-ivory/75 leading-relaxed">
                [PLACEHOLDER: Paragraph 3 — why this advisory practice exists alongside Witlyn, what you want to build long-term. Maximum 4 sentences. Explain the distinction between Witlyn as execution and this practice as education and strategy, and what the longer vision looks like for beauty brands operating in an AI-native creative landscape.]
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Philosophy ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface">
        <div className="container-luxury">
          <FadeUp>
            <p className="eyebrow mb-6">Philosophy</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-fraunces text-display-lg text-ivory font-light max-w-2xl mb-16 leading-tight">
              Three beliefs that shape everything I build.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {beliefs.map((belief, i) => (
              <FadeUp key={belief.number} delay={0.1 + i * 0.1}>
                <div className="bg-surface p-8 lg:p-10 flex flex-col gap-5 h-full">
                  <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
                    {belief.number}
                  </span>
                  <h3 className="font-fraunces text-body-xl text-ivory font-light leading-snug">
                    {belief.title}
                  </h3>
                  <p className="font-inter text-body-md text-muted leading-relaxed">
                    {belief.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury">
        <FadeUp>
          <p className="eyebrow mb-6">Background</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-fraunces text-display-lg text-ivory font-light max-w-2xl mb-16 leading-tight">
            The work that brought me here.
          </h2>
        </FadeUp>
        <div className="max-w-2xl flex flex-col">
          {timeline.map((item, i) => (
            <FadeUp key={i} delay={0.05 * i}>
              <div className="relative flex gap-8 pb-12 last:pb-0">
                {/* Vertical gold line */}
                <div className="relative flex flex-col items-center">
                  <div className="w-px flex-1 bg-gold/30" />
                  <div className="w-2 h-2 rounded-full bg-gold/60 absolute top-1.5" />
                </div>
                <div className="flex flex-col gap-1 pt-0.5 pb-4">
                  <span className="font-inter text-label-md text-gold">
                    {item.year}
                  </span>
                  <p className="font-inter text-body-md text-ivory/70">
                    {item.event}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Press / Media ─────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface">
        <div className="container-luxury">
          <FadeUp>
            <p className="eyebrow mb-6">Press & Mentions</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-fraunces text-display-md text-ivory font-light mb-12 leading-tight">
              [PLACEHOLDER: Any press/media mentions — or remove section if none yet]
            </h2>
          </FadeUp>

          {PRESS_AVAILABLE ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pressCards.map((card, i) => (
                <FadeUp key={i} delay={0.08 * i}>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-surface block p-7 flex flex-col gap-3 hover:border-gold/30 transition-all duration-400"
                  >
                    <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
                      {card.publication}
                    </span>
                    <p className="font-fraunces text-body-lg text-ivory font-light leading-snug">
                      {card.title}
                    </p>
                    <span className="font-inter text-label-sm text-muted mt-auto">
                      {card.date}
                    </span>
                  </a>
                </FadeUp>
              ))}
            </div>
          ) : (
            <FadeUp delay={0.1}>
              <p className="font-inter text-body-lg text-muted max-w-lg">
                Coverage coming soon — follow along on{' '}
                <a
                  href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 hover:text-gold transition-colors duration-300"
                >
                  LinkedIn
                </a>{' '}
                and{' '}
                <a
                  href="https://www.instagram.com/sakibziad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 hover:text-gold transition-colors duration-300"
                >
                  Instagram
                </a>
                .
              </p>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury text-center">
        <FadeUp>
          <p className="font-inter text-body-xl text-muted mb-8">
            Ready to work together?
          </p>
          <Button asChild variant="gold" size="lg">
            <Link href="/contact">Start the Conversation</Link>
          </Button>
        </FadeUp>
      </section>
    </main>
  )
}
