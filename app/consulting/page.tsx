'use client'

import React, { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brandName: '',
    websiteUrl: '',
    brandStage: 'Growing ($50k–$250k/mo)',
    challenge: '',
    successVision: '',
  })

  const calUrl = process.env.NEXT_PUBLIC_CAL_LINK

  async function handleApplicationSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consulting',
          ...formData,
        }),
      })
      setFormSubmitted(true)
    } catch {
      setFormSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <div className="card-surface p-8 sm:p-12 border-gold/30 shadow-[0_0_60px_rgba(201,166,107,0.06)]">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-6">
                  <CheckCircle2 className="w-14 h-14 text-gold mx-auto" />
                  <h3 className="heading-card text-3xl">Application Received</h3>
                  <p className="body-editorial text-base max-w-md mx-auto">
                    Thank you for detailing your brand. Sakib reviews all inquiries personally and will respond within 48 hours.
                  </p>

                  {/* Clean Booking Card */}
                  <div className="card-surface p-6 border-border mt-8 text-left max-w-lg mx-auto">
                    <div className="flex items-center gap-3 text-gold mb-3">
                      <Calendar className="w-5 h-5" />
                      <span className="font-fraunces text-lg text-ivory">Direct Meeting Access</span>
                    </div>
                    <p className="body-muted text-xs mb-4">
                      If your matter is time-sensitive or you wish to secure a strategy window directly:
                    </p>
                    {calUrl && !calUrl.includes('PLACEHOLDER') ? (
                      <Button asChild variant="gold" size="md" className="w-full">
                        <a href={calUrl} target="_blank" rel="noopener noreferrer">
                          Schedule Intro Call via Cal.com
                        </a>
                      </Button>
                    ) : (
                      <Button asChild variant="gold" size="md" className="w-full">
                        <a href="mailto:Sakib@witlyn.com?subject=Strategic%20Advisory%20Call%20Request">
                          Email Sakib Directly (Sakib@witlyn.com)
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                        Your Full Name *
                      </label>
                      <Input
                        required
                        placeholder="e.g. Elena Rostova"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                        Work Email Address *
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="elena@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                        Brand / Company Name *
                      </label>
                      <Input
                        required
                        placeholder="e.g. Solaé Botanicals"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                        Website or Storefront URL *
                      </label>
                      <Input
                        required
                        type="url"
                        placeholder="https://yourbrand.com"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                      Current Monthly Revenue Stage
                    </label>
                    <select
                      className="w-full h-11 px-4 rounded-xl bg-surface border border-border text-ivory font-inter text-sm focus:outline-none focus:border-gold"
                      value={formData.brandStage}
                      onChange={(e) => setFormData({ ...formData, brandStage: e.target.value })}
                    >
                      <option value="Pre-launch / Seed">Pre-launch / Seed Stage</option>
                      <option value="Early Traction ($10k–$50k/mo)">Early Traction (\$10k–\$50k / month)</option>
                      <option value="Growing ($50k–$250k/mo)">Growing (\$50k–\$250k / month)</option>
                      <option value="Scale ($250k–$1M/mo)">Scale (\$250k–\$1M / month)</option>
                      <option value="Enterprise ($1M+/mo)">Enterprise (\$1M+ / month)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                      What is your most pressing creative or content challenge? *
                    </label>
                    <Textarea
                      required
                      rows={3}
                      placeholder="e.g. Current agency turnaround is 6 weeks, content looks generic, need an automated pipeline for paid social acquisition..."
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                      What would an ideal 6-month outcome look like? *
                    </label>
                    <Textarea
                      required
                      rows={2}
                      placeholder="e.g. In-house AI creative studio running smoothly, 50% reduction in production costs, 5× output..."
                      value={formData.successVision}
                      onChange={(e) => setFormData({ ...formData, successVision: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Transmitting Application...' : 'Submit Advisory Application →'}
                  </Button>
                </form>
              )}
            </div>
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
