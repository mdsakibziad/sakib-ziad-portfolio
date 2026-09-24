'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const

export default function InsightsPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'insights' }),
      })
      setSubscribed(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-white selection:text-black pt-28">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-white/[0.08]" aria-label="Insights Header">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_LUXURY }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-white/80 mb-8">
              Strategic Essays & Theory
            </div>

            <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              Thinking at the intersection of{' '}
              <span className="italic font-fraunces font-light text-zinc-300">
                generative intelligence and beauty.
              </span>
            </h1>

            <p className="body-editorial text-lg sm:text-xl text-zinc-300 max-w-2xl">
              Rigorous strategic essays, prompt architecture breakdowns, and category analyses examining how prestige brands compound equity in the AI era.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Editorial Coming-Soon Notice ─────────────────────────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="Essays In Progress">
        <div className="container-luxury max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.15 }}
            className="card-surface p-8 sm:p-12 md:p-16 border-white/10 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-white mb-6">
              <BookOpen className="w-6 h-6 stroke-[1.5]" />
            </div>

            <span className="eyebrow-luxury mb-3 block">Publication Schedule</span>
            <h2 className="heading-section text-2xl sm:text-3xl md:text-4xl mb-4">
              Long-Form Essays in Active Development
            </h2>

            <p className="body-editorial text-base sm:text-lg text-zinc-300 max-w-xl mx-auto mb-8 leading-relaxed">
              We are finalizing a series of forensic case studies and systems blueprints detailing proprietary diffusion pipelines for beauty and skincare.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                <a
                  href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Follow Real-Time Writing on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/work" className="flex items-center justify-center gap-2">
                  <span>Explore Selected Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Private Dispatch / Notification Signup ──────────────────────────── */}
      <section className="section-pad border-t border-white/[0.08] bg-surface/50 text-center" aria-label="Notification">
        <div className="container-luxury max-w-xl mx-auto">
          <p className="eyebrow-luxury mb-3">Early Access</p>
          <h2 className="heading-section text-3xl sm:text-4xl mb-4">
            Receive New Essays Directly
          </h2>
          <p className="body-muted mb-8 text-sm text-zinc-400">
            No marketing fluff or spam. We email exclusively when a major strategic framework or case study goes live.
          </p>

          {subscribed ? (
            <div className="card-surface p-6 border-white/20 inline-flex items-center gap-3 text-white text-sm">
              <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
              <span>You are confirmed for the private dispatch list.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                required
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface border-white/10 text-white placeholder:text-zinc-500 text-sm focus:border-white/40"
              />
              <Button type="submit" variant="default" size="md" className="shrink-0" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
              </Button>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
