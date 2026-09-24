'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const

function RevealSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE_LUXURY, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function InsightsPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'insights' }),
      })
      setSubscribed(true)
    } catch {
      setSubscribed(true)
    }
  }

  const articles = [
    {
      id: 'creative-systems',
      tag: 'AI Creative Systems',
      readTime: 'Strategic Essay',
      date: 'LinkedIn Dispatch',
      title: 'Why Beauty Brands Need Creative Systems, Not More Agency Retainers',
      excerpt:
        'The traditional 6-week agency turnaround is dead. High-growth cosmetics brands are replacing bloated production cycles with AI-native generative engines that concept, iterate, and output on-demand.',
    },
    {
      id: 'aesthetics-post-generative',
      tag: 'Brand Strategy',
      readTime: 'Design Theory',
      date: 'Founder Note',
      title: 'The Prompt Is Not The Strategy: Aesthetics in the Post-Generative Era',
      excerpt:
        'Anyone can generate a glass dropper on a marble countertop. The competitive moat is in the art direction, emotional caustics, and non-negotiable brand codes that generic AI outputs miss.',
    },
    {
      id: 'autonomous-brand-ops',
      tag: 'AI Automation',
      readTime: 'Systems Blueprint',
      date: 'Field Monograph',
      title: 'Autonomous Brand Operations: Building an In-House Content Pipeline',
      excerpt:
        'Architecting automated agent workflows that map customer search intent to visual campaign briefs, transforming production bottlenecks into an agile generative studio.',
    },
    {
      id: 'synthetic-editorial',
      tag: 'Creative Direction',
      readTime: 'Studio Practice',
      date: 'Witlyn Archive',
      title: 'The Art of the Synthetic Editorial: Lessons from Founding Witlyn',
      excerpt:
        'What running an AI-native creative studio teaches us about brand defensibility, human taste curation, and scaling aesthetic prestige without enterprise budgets.',
    },
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-gold selection:text-background pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-border/80" aria-label="Insights Header">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/30 bg-surface/50 text-[11px] uppercase tracking-[0.2em] text-gold mb-8">
                Essays & Strategic Notes
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                Thinking at the intersection of{' '}
                <span className="italic font-fraunces text-gold font-light">
                  AI, aesthetics, and beauty.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-ivory/80 max-w-2xl">
                Essays, architectural breakdowns, and field notes on scaling prestige brands through computational creativity.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Articles Grid ─────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="Articles Feed">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {articles.map((article, idx) => (
              <RevealSection key={article.id} delay={idx * 0.1}>
                <div className="card-surface p-8 sm:p-12 flex flex-col justify-between h-full group hover:border-gold/50">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="eyebrow-luxury text-gold">{article.tag}</span>
                      <span className="text-xs font-inter text-muted-light">{article.readTime}</span>
                    </div>

                    <h2 className="heading-card text-2xl sm:text-3xl mb-4 group-hover:text-gold transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="body-muted text-sm sm:text-base leading-relaxed mb-8">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-inter text-muted-light">{article.date}</span>
                    <a
                      href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-inter uppercase tracking-[0.16em] text-gold hover:text-gold-light"
                    >
                      <span>Read on LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Syndication Note */}
          <RevealSection delay={0.3} className="mt-16 text-center">
            <p className="body-muted text-xs sm:text-sm">
              Selected essays are syndicated across LinkedIn and Substack. Long-form interactive case studies are published quarterly.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── Newsletter Dispatch ────────────────────────────────────────────── */}
      <section className="section-pad border-t border-border/80 bg-surface/50 text-center" aria-label="Newsletter">
        <div className="container-luxury max-w-xl mx-auto">
          <RevealSection>
            <p className="eyebrow-luxury mb-3">Private Briefing</p>
            <h2 className="heading-section text-3xl sm:text-4xl mb-4">Stay Ahead of the Aesthetic Curve</h2>
            <p className="body-muted mb-8 text-sm">
              Receive confidential briefings on prompt engineering, model breakthroughs, and beauty creative strategy. No spam. Only depth.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold text-sm text-center">
                You are confirmed for the private dispatch list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  required
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="gold" size="md">
                  Subscribe
                </Button>
              </form>
            )}
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
