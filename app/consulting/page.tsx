'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Cpu,
  ShieldCheck,
  Calendar,
  Mail,
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

export default function ConsultingPage() {
  const isFor = [
    'Founders & CMOs of beauty, skincare, or cosmetic brands seeking category-defining visual prestige.',
    'Brands spending \$15k–\$50k+/quarter on production who want to replace agency delays with compounding internal systems.',
    'Teams ready to install custom AI agent workflows to automate marketing and creative operations.',
    'Decision-makers who value high-level strategic counsel, architectural rigor, and partner-level attention.',
  ]

  const isNotFor = [
    'Brands looking for bargain \$500 content production or generic template social media posts.',
    'Founders seeking a magic one-click button without strategic positioning and brand discipline.',
    'Businesses outside the prestige beauty, skincare, fragrance, and wellness sectors.',
    'Organizations seeking a traditional agency team of 20 juniors (For done-for-you production, see Witlyn).',
  ]

  const engagements = [
    {
      num: '01',
      title: 'The Diagnostic & Strategy Blueprint',
      badge: 'Single Engagement',
      ideal: 'Best for brands seeking an immediate, forensic audit of their creative pipeline and a 90-day AI roadmap.',
      features: [
        'Complete audit of visual assets, prompt stacks, and category positioning',
        '90-minute private architectural strategy session with Sakib Ziad',
        'Custom written AI Opportunity Blueprint & tool-stack recommendations',
        'Immediate delivery of prioritized 30/60/90 day execution steps',
      ],
      investment: 'Fixed strategic audit fee — credited toward retainer upon mutual fit',
    },
    {
      num: '02',
      title: 'Monthly Advisory Retainer',
      badge: 'Ongoing Partner Access',
      ideal: 'Best for growth-stage brands needing dedicated executive creative direction and ongoing AI systems evolution.',
      features: [
        'Bi-weekly strategic direction calls with founder & internal marketing leads',
        'Direct async access for prompt optimization, aesthetic review, and model tuning',
        'Continual testing and deployment of emerging generative models (Midjourney, Flux, Kling)',
        'Ongoing oversight of autonomous brand agent and content workflows',
      ],
      investment: 'Monthly strategic retainer — strictly capped at 3 concurrent brands',
    },
    {
      num: '03',
      title: 'The Custom AI System Build',
      badge: 'Turnkey Infrastructure',
      ideal: 'Best for established beauty brands seeking to deploy a full-scale in-house AI creative studio and automation pipeline.',
      features: [
        'End-to-end architecture and deployment of brand-trained generative systems',
        'Custom Make / n8n workflow construction for autonomous multi-channel asset routing',
        'Full team training curriculum, prompt blueprint repositories, and SOP library',
        '30-day post-launch optimization and stabilization support',
      ],
      investment: 'Custom project scope — scoped during qualification application',
    },
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-gold selection:text-background pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-border/80" aria-label="Consulting Hero">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/30 bg-surface/50 text-[11px] uppercase tracking-[0.2em] text-gold mb-8">
                Private Advisory & Infrastructure
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                Strategic AI Counsel for Beauty Brands That{' '}
                <span className="italic font-fraunces text-gold font-light">
                  Mean Business.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-ivory/80 max-w-2xl mb-10">
                High-touch advisory spanning AI-native creative direction, campaign audits, and autonomous agent pipelines — engineered to make your creative operations unstoppable.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <Button asChild variant="gold" size="lg">
                <a href="#application" className="flex items-center gap-2">
                  <span>Apply for an Advisory Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Qualification Criteria (Who It Is / Is Not For) ────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="Qualification">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Mutual Fit</p>
            <h2 className="heading-section">Selective by Necessity</h2>
            <p className="body-muted">We protect outcomes by only partnering where we know we can create 10× leverage.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* IS FOR */}
            <RevealSection delay={0.1}>
              <div className="card-surface p-8 sm:p-10 border-gold/30 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-gold" />
                  <h3 className="heading-card text-2xl text-ivory">This Is For You If</h3>
                </div>
                <ul className="space-y-4">
                  {isFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 body-editorial text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>

            {/* IS NOT FOR */}
            <RevealSection delay={0.2}>
              <div className="card-surface p-8 sm:p-10 border-border/80 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-6 h-6 text-muted-light" />
                  <h3 className="heading-card text-2xl text-ivory">This Is Not For You If</h3>
                </div>
                <ul className="space-y-4">
                  {isNotFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 body-muted text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-light/50 shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Two Pillars Scope of Work ──────────────────────────────────────── */}
      <section className="section-pad border-t border-border/80" aria-label="Scope of Advisory">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Advisory Scope</p>
            <h2 className="heading-section">Dual-Pillar Advisory Architecture</h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Pillar 1 */}
            <RevealSection delay={0.1}>
              <div className="card-surface p-8 sm:p-10 h-full">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="eyebrow-luxury text-gold">Pillar 01</span>
                <h3 className="heading-card text-2xl my-3">AI Creative Strategy & Art Direction</h3>
                <ul className="space-y-3 body-muted text-sm pt-4 border-t border-border">
                  <li>• Creative audits & brand aesthetic deconstruction</li>
                  <li>• Custom prompt taxonomy engineered for skincare & cosmetic physics</li>
                  <li>• Packaging visualization & 3D generative asset workflows</li>
                  <li>• Visual brand guidelines calibrated for generative consistency</li>
                </ul>
              </div>
            </RevealSection>

            {/* Pillar 2 */}
            <RevealSection delay={0.2}>
              <div className="card-surface p-8 sm:p-10 h-full">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="eyebrow-luxury text-gold">Pillar 02</span>
                <h3 className="heading-card text-2xl my-3">Autonomous AI Brand Operations</h3>
                <ul className="space-y-3 body-muted text-sm pt-4 border-t border-border">
                  <li>• Autonomous content engines mapping audience search to creative generation</li>
                  <li>• Custom Make.com and n8n pipeline orchestration for multi-channel assets</li>
                  <li>• Tone-of-voice agent calibration for beauty copywriting</li>
                  <li>• Creative ops bottleneck elimination and internal team empowerment</li>
                </ul>
              </div>
            </RevealSection>
          </div>

          {/* Explicit Witlyn Callout Box */}
          <RevealSection delay={0.3}>
            <div className="card-surface p-8 sm:p-10 border-gold/40 bg-surface/80 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="eyebrow-luxury text-gold">Need Full Production Instead?</span>
                <h4 className="heading-card text-2xl my-2">Looking for a full-service creative studio?</h4>
                <p className="body-muted text-sm sm:text-base">
                  If you need end-to-end campaign execution, finished 3D asset packs, or done-for-you monthly content retainers, visit <strong>Witlyn</strong> — our dedicated production studio.
                </p>
              </div>
              <Button asChild variant="outline-gold" size="lg" className="shrink-0">
                <a href="https://witlyn.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <span>Visit Witlyn Studio</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Engagement Structures ─────────────────────────────────────────── */}
      <section className="section-pad bg-surface/30 border-t border-border/80" aria-label="Engagements">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Engagement Models</p>
            <h2 className="heading-section">Structured for Depth, Not Volume</h2>
            <p className="body-muted">Select the tier matching your brand's growth phase and operational scale.</p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {engagements.map((tier, idx) => (
              <RevealSection key={tier.num} delay={idx * 0.1}>
                <div className="card-surface p-8 flex flex-col justify-between h-full border-border/80 hover:border-gold/50">
                  <div>
                    <span className="font-fraunces text-2xl text-gold/40 block mb-4">{tier.num}</span>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-gold/10 border border-gold/30 text-gold mb-4">
                      {tier.badge}
                    </span>
                    <h3 className="heading-card text-2xl mb-3">{tier.title}</h3>
                    <p className="body-muted text-xs sm:text-sm mb-6">{tier.ideal}</p>

                    <div className="pt-6 border-t border-border space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2.5 text-xs text-ivory/80 leading-relaxed font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <p className="eyebrow-luxury text-[10px] text-muted-light mb-1">Investment Framework</p>
                    <p className="font-inter text-xs text-ivory/70 italic leading-relaxed">
                      {tier.investment}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form Section ───────────────────────────────────────── */}
      <section id="application" className="section-pad" aria-label="Advisory Application">
        <div className="container-luxury max-w-3xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="eyebrow-luxury mb-4">Confidential Application</p>
            <h2 className="heading-section mb-4">Apply for a Strategy Session</h2>
            <p className="body-muted">
              Every application is reviewed personally by Sakib Ziad within 48 business hours.
            </p>
          </RevealSection>

          <RevealSection delay={0.15}>
            <ApplicationForm
              defaultInterest="consulting"
              pageSource="consulting"
              submitText="Submit Advisory Application"
            />
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
