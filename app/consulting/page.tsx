'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Sparkles,
  Bot,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApplicationForm } from '@/components/application-form'

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const

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
    'Brands spending $15k–$50k+/quarter on production who want to replace agency delays with compounding internal systems.',
    'Teams ready to install custom AI agent workflows to automate marketing and creative operations.',
    'Decision-makers who value high-level strategic counsel, architectural rigor, and partner-level attention.',
  ]

  const isNotFor = [
    'Brands looking for bargain $500 content production or generic template social media posts.',
    'Founders seeking a magic one-click button without strategic positioning and brand discipline.',
    'Businesses outside the prestige beauty, skincare, fragrance, and wellness sectors.',
    'Organizations seeking a traditional agency team of 20 juniors (For done-for-you production, see Witlyn).',
  ]

  const engagements = [
    {
      num: '01',
      title: 'The AI Creative & Systems Audit',
      badge: '90-Min Intensive + Blueprint',
      ideal: 'Best for founders and executives seeking an objective, forensic evaluation of their brand’s generative readiness.',
      features: [
        '90-minute private strategy session with Sakib Ziad',
        'Deep-dive audit of your visual identity, content pipelines, and creative tech stack',
        'Custom Gap & Opportunity Synthesis with immediate 30-day action items',
        'Direct identification of high-leverage generative workflows for your vertical',
      ],
      investment: 'Investment discussed during qualification application',
    },
    {
      num: '02',
      title: 'Monthly Advisory Retainer',
      badge: 'Ongoing Strategic Partnership',
      ideal: 'Best for growth-stage beauty brands actively deploying generative creative and scaling multi-channel output.',
      features: [
        'Bi-weekly strategic direction and prompt architecture reviews',
        'Asynchronous executive counsel via private communication channel',
        'Creative direction oversight across campaigns and launch assets',
        'Ongoing AI toolstack evaluations, LoRA model guidance, and prompt repositories',
      ],
      investment: 'Selective retainer — strictly limited to 3 concurrent brand partners',
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
    <div className="bg-background text-ivory min-h-screen selection:bg-white selection:text-black pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-white/[0.08]" aria-label="Consulting Hero">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-white/80 mb-8">
                Private Advisory & Infrastructure
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                Strategic AI Counsel for Beauty Brands That{' '}
                <span className="italic font-fraunces font-light text-zinc-300">
                  Mean Business.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-zinc-300 max-w-2xl mb-10">
                High-touch advisory spanning AI-native creative direction, campaign audits, and autonomous agent pipelines — engineered to make your creative operations unstoppable.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                <a href="#application" className="flex items-center justify-center gap-2">
                  <span>Apply for Advisory Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Qualification Criteria ────────────────────────────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="Qualification">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Mutual Fit</p>
            <h2 className="heading-section">Selective by Necessity</h2>
            <p className="body-muted text-zinc-400">We protect outcomes by only partnering where we know we can create 10× leverage.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* IS FOR */}
            <RevealSection delay={0.1}>
              <div className="card-surface p-6 sm:p-10 h-full border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                  <h3 className="heading-card text-2xl text-white">This Is For You If</h3>
                </div>
                <ul className="space-y-4">
                  {isFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 body-editorial text-sm sm:text-base text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>

            {/* IS NOT FOR */}
            <RevealSection delay={0.2}>
              <div className="card-surface p-6 sm:p-10 h-full border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-6 h-6 text-zinc-500" />
                  <h3 className="heading-card text-2xl text-white">This Is Not For You If</h3>
                </div>
                <ul className="space-y-4">
                  {isNotFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 body-editorial text-sm sm:text-base text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Scope of Work (The Two Pillars) ─────────────────────────────────── */}
      <section className="section-pad border-t border-white/[0.08]" aria-label="Scope of Work">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Advisory Scope</p>
            <h2 className="heading-section">Two Pillars. One Strategic Partner.</h2>
            <p className="body-muted text-zinc-400">Artistic direction engineered with computational leverage.</p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* PILLAR 1 */}
            <RevealSection delay={0.1}>
              <div className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-white">
                      <Sparkles className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="eyebrow-luxury text-[10px]">Pillar 01</span>
                      <h3 className="heading-card text-xl sm:text-2xl">AI Creative Strategy & Direction</h3>
                    </div>
                  </div>
                  <ul className="space-y-3.5 body-editorial text-sm sm:text-base text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 mt-2" />
                      <span>Proprietary prompt taxonomies calibrated to cosmetic physics and packaging caustics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 mt-2" />
                      <span>High-fashion visual worldbuilding and editorial moodboard synthesis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 mt-2" />
                      <span>Internal team training on diffusion models (Midjourney, Flux, Stable Diffusion)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 mt-2" />
                      <span>Creative audits ensuring brand defensibility and eliminating synthetic artifacting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </RevealSection>

            {/* PILLAR 2 */}
            <RevealSection delay={0.2}>
              <div className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-white">
                      <Bot className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="eyebrow-luxury text-[10px]">Pillar 02</span>
                      <h3 className="heading-card text-xl sm:text-2xl">Autonomous Agents & Brand Systems</h3>
                    </div>
                  </div>
                  <ul className="space-y-3.5 body-editorial text-sm sm:text-base text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 mt-2" />
                      <span>Automated customer review & sentiment ingestion mapped directly to visual briefs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 mt-2" />
                      <span>Custom Make.com and n8n orchestration connecting APIs and diffusion pipelines</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 mt-2" />
                      <span>Prestige skincare tone-of-voice copy models for ad scripts and retention copy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0 mt-2" />
                      <span>Autonomous multi-aspect ratio rendering pipelines for seamless omnichannel distribution</span>
                    </li>
                  </ul>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* Studio Production Callout */}
          <RevealSection>
            <div className="card-surface p-8 sm:p-12 border-white/15 bg-surface-elevated/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="eyebrow-luxury mb-2 block">Production Alternative</span>
                <h4 className="heading-card text-2xl text-white mb-2">Looking for Done-For-You Campaign Production?</h4>
                <p className="body-muted text-zinc-300">
                  If you need a full creative studio to concept and execute complete campaigns rather than advisory guidance, visit Witlyn — my full-service AI-native creative studio.
                </p>
              </div>
              <Button asChild variant="outline" size="lg" className="shrink-0 w-full sm:w-auto">
                <a href="https://witlyn.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <span>Visit Witlyn Studio</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Engagement Structures ───────────────────────────────────────────── */}
      <section className="section-pad bg-surface/30 border-t border-white/[0.08]" aria-label="Engagements">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Structure</p>
            <h2 className="heading-section">How We Work Together</h2>
            <p className="body-muted text-zinc-400">Structured for depth and partner-level attention.</p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {engagements.map((eng, idx) => (
              <RevealSection key={eng.num} delay={idx * 0.1}>
                <div className="card-surface p-6 sm:p-8 flex flex-col justify-between h-full border-white/10">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-fraunces text-2xl text-white/40">{eng.num}</span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-inter uppercase tracking-wider bg-white/10 border border-white/15 text-white">
                        {eng.badge}
                      </span>
                    </div>

                    <h3 className="heading-card text-xl sm:text-2xl mb-3 text-white">{eng.title}</h3>
                    <p className="body-muted text-xs sm:text-sm text-zinc-400 mb-6">{eng.ideal}</p>

                    <ul className="space-y-3 pt-6 border-t border-white/10 mb-8 body-editorial text-xs sm:text-sm text-zinc-300">
                      {eng.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <span className="eyebrow-luxury text-[10px] text-zinc-400 block mb-1">Pricing Model</span>
                    <p className="font-inter text-xs text-zinc-300 font-medium">{eng.investment}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Unified Application Form ────────────────────────────────────────── */}
      <section id="application" className="section-pad" aria-label="Advisory Application">
        <div className="container-luxury max-w-2xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="eyebrow-luxury mb-3">Qualification</p>
            <h2 className="heading-section text-3xl sm:text-4xl mb-4">Apply for an Advisory Strategy Call</h2>
            <p className="body-muted text-zinc-400">
              Please detail your brand, current bottlenecks, and goals. Applications are reviewed personally within 48 business hours.
            </p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <ApplicationForm
              defaultInterest="consulting"
              pageSource="consulting"
              title="Advisory Qualification Form"
              subtitle="All details remain strictly confidential under NDA principles."
              submitText="Submit Advisory Application"
            />
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
