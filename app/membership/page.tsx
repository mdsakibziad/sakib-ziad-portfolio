'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Users,
  Compass,
  MessageSquare,
  FileCode,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApplicationForm } from '@/components/application-form'

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

export default function MembershipPage() {
  const benefits = [
    {
      icon: Compass,
      num: '01',
      title: 'Monthly Strategy Deep-Dive',
      body: 'A comprehensive monthly architectural breakdown detailing emerging generative models (Flux, Midjourney, Kling, Sora), commercial prompt shifts, and competitive aesthetics in beauty.',
    },
    {
      icon: FileCode,
      num: '02',
      title: 'Monthly Blueprint & Prompt Drop',
      body: 'Fresh, production-verified prompt architectures, lighting schemas, and Make.com automation blueprints delivered directly to your member repository every 30 days.',
    },
    {
      icon: MessageSquare,
      num: '03',
      title: 'Private Async Slack Access',
      body: 'Direct access to Sakib Ziad inside a private member channel for fast feedback on prompt tuning, output critique, and tool stack recommendations.',
    },
    {
      icon: Sparkles,
      num: '04',
      title: 'Hands-On Tool & Model Audits',
      body: 'Unbiased, rigorous testing of new AI platforms. We separate enterprise-grade production tools from hype so your brand never wastes budget on toys.',
    },
    {
      icon: Users,
      num: '05',
      title: 'Curated Founder Roundtables',
      body: 'Quarterly closed-door virtual sessions with non-competing beauty, skincare, and wellness operators sharing live metrics, ad tests, and creative strategies.',
    },
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-white selection:text-black pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-white/[0.08]" aria-label="Membership Hero">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-zinc-300 mb-8 backdrop-blur-md">
                Private Advisory Syndicate
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                A standing strategic relationship with{' '}
                <span className="italic font-fraunces text-white font-light">
                  your AI Creative Strategist.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-ivory/80 max-w-2xl mb-10">
                Monthly intelligence, continuous asset drops, and direct advisory access — engineered for beauty brand leaders who refuse to fall behind.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <Button asChild variant="gold" size="lg">
                <a href="#waitlist-form" className="flex items-center gap-2">
                  <span>Apply for Syndicate Membership</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── What You Receive Monthly ───────────────────────────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="What You Receive">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Membership Architecture</p>
            <h2 className="heading-section">What Members Receive Monthly</h2>
            <p className="body-muted">Not an inactive Discord. An active strategic advantage.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <RevealSection key={b.num} delay={i * 0.08}>
                <div className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full hover:border-white/30">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-fraunces text-2xl text-white/40">{b.num}</span>
                      <b.icon className="w-5 h-5 text-zinc-300" />
                    </div>
                    <h3 className="heading-card text-2xl mb-4 leading-snug">{b.title}</h3>
                    <p className="body-muted text-sm leading-relaxed">{b.body}</p>
                  </div>
                </div>
              </RevealSection>
            ))}

            {/* Final Highlight Card */}
            <RevealSection delay={0.4}>
              <div className="card-surface p-8 sm:p-10 border-white/20 bg-surface/80 flex flex-col justify-between h-full">
                <div>
                  <span className="eyebrow-luxury text-zinc-400 block mb-4">Compounding Signal</span>
                  <h3 className="heading-card text-2xl mb-4">Ongoing Category Moat</h3>
                  <p className="body-muted text-sm leading-relaxed">
                    AI models upgrade every 90 days. As a member, your team never wastes months figuring out new tools alone. We digest the technical chaos and hand you the commercial playbook.
                  </p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Investment Block ───────────────────────────────────────────────── */}
      <section className="section-pad border-t border-border/80" aria-label="Investment">
        <div className="container-luxury max-w-2xl mx-auto text-center">
          <RevealSection>
            <p className="eyebrow-luxury mb-4">Syndicate Allocation</p>
            <h2 className="heading-section mb-6">Membership Investment</h2>
            <div className="card-surface p-10 sm:p-12 border-white/20">
              <span className="eyebrow-luxury text-zinc-400 block mb-2">Founding Member Allocation</span>
              {/* TODO: confirm membership pricing ($290/month) and billing cadence with owner before launch */}
              <p className="font-fraunces text-4xl sm:text-5xl text-ivory font-light mb-4">
                $290 <span className="text-xl text-muted-light font-inter">/ month</span>
              </p>
              <p className="body-muted text-sm max-w-md mx-auto mb-8">
                Billed monthly. Cancel anytime without penalty. Membership is strictly capped to protect access depth and direct attention.
              </p>
              <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
                <a href="#waitlist-form">Apply for Membership →</a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Waitlist & Application Form ────────────────────────────────────── */}
      <section id="waitlist-form" className="section-pad bg-surface/40 border-t border-border/80" aria-label="Waitlist Form">
        <div className="container-luxury max-w-2xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="eyebrow-luxury mb-3">Admission Request</p>
            <h2 className="heading-section text-3xl sm:text-4xl mb-4">Apply for Syndicate Access</h2>
            <p className="body-muted text-sm">
              We review each applicant to ensure no direct brand conflicts within cohorts.
            </p>
          </RevealSection>

          <RevealSection delay={0.15}>
            <ApplicationForm
              defaultInterest="membership"
              pageSource="membership"
              submitText="Submit Syndicate Application"
            />
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
