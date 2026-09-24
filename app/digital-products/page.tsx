'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Cpu,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

export default function DigitalProductsPage() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: 'digital-products' }),
      })
      setNewsletterSuccess(true)
    } catch {
      setNewsletterSuccess(true)
    }
  }

  const products = [
    {
      // TODO: confirm product name/contents/price ($249) with owner before official public cart launch
      id: 'brief-system',
      name: 'The Beauty Brand AI Creative Brief & Prompt Blueprint',
      tag: 'Framework & Blueprint',
      badge: 'Immediate Download',
      price: '$249',
      schemaCode: 'SYS.01 // PROMPT ARCHITECTURE',
      icon: BookOpen,
      metric: '40+ TESTED BLUEPRINTS',
      description:
        'The exact prompt architecture, visual reference taxonomies, and art direction frameworks used to concept publication-grade beauty campaigns across Midjourney and Flux.',
      deliverables: [
        '40+ Tested Prompt Blueprints: Botanical caustics, skin subsurface scattering & glass refraction',
        'Art Direction Taxonomy Guide: Photographic lenses, aperture codes & luxury lighting schemas',
        'Notion Creative Brief Hub: Structured briefing workflow for marketing teams',
        'Commercial Guardrail Checklist: Ensuring brand consistency and avoiding artifacting',
      ],
      cta: 'Enquire About This Kit',
    },
    {
      // TODO: confirm product name/contents/price ($495) with owner before official public cart launch
      id: 'agent-kit',
      name: 'Autonomous AI Content Engine & Agent Blueprint',
      tag: 'Automation Architecture',
      badge: 'Turnkey System',
      price: '$495',
      schemaCode: 'AUT.02 // PIPELINE ORCHESTRATION',
      icon: Cpu,
      metric: 'TURNKEY WORKFLOW',
      description:
        'A comprehensive automation blueprint that maps customer review angles and search intent directly into synthesized visual briefs and multi-platform content pipelines.',
      deliverables: [
        'Make.com & n8n Scenario Blueprints: Pre-configured API connections for automated workflows',
        'Tone-of-Voice Prompt Engine: Calibrated for prestige skincare copy & social scripts',
        'Dynamic Asset Storage & Tagging Pipeline: Automatic multi-aspect ratio rendering',
        'Complete Architecture Walkthrough: 45-minute step-by-step setup tutorial',
      ],
      cta: 'Enquire About This Kit',
    },
    {
      // TODO: confirm cohort start dates and pricing with owner before official launch
      id: 'masterclass',
      name: 'Executive Masterclass: In-House Generative Direction',
      tag: 'Cohort Masterclass',
      badge: 'Cohort Waitlist',
      price: 'Waitlist Application',
      schemaCode: 'EXE.03 // PRIVATE COHORT',
      icon: Compass,
      metric: '4-WEEK INTENSIVE',
      description:
        'A 4-week private intensive for founders and creative directors learning how to install and direct internal generative pipelines without losing artistic prestige.',
      deliverables: [
        'Live weekly strategy & prompt architecture workshops with Sakib Ziad',
        'Custom model fine-tuning and brand LoRA training walkthroughs',
        'Private peer group with beauty & cosmetic brand operators',
        'Lifetime access to template updates and model upgrade blueprints',
      ],
      cta: 'Join Cohort Waitlist',
    },
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-white selection:text-black pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-white/[0.08]" aria-label="Digital Products Hero">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-white/80 mb-8">
                Productized Intelligence
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                The AI creative playbooks I wish{' '}
                <span className="italic font-fraunces font-light text-zinc-300">
                  existed when I began.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-zinc-300 max-w-2xl">
                Proprietary prompt frameworks, automation blueprints, and creative direction kits distilled directly from active client engagements in beauty and skincare.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="Products Catalog">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Tactical Blueprints</p>
            <h2 className="heading-section">Deployable Systems for Immediate Leverage</h2>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((product, idx) => (
              <RevealSection key={product.id} delay={idx * 0.1}>
                <div className="card-surface overflow-hidden flex flex-col justify-between h-full group">
                  
                  {/* Abstract Monochrome Liquid-Glass Graphic Treatment */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#0C0C0C] p-6 flex flex-col justify-between group-hover:border-white/20 transition-colors">
                    {/* Precision dot matrix overlay */}
                    <div 
                      className="absolute inset-0 opacity-[0.06] pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Ambient white radial glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/[0.04] blur-3xl pointer-events-none group-hover:bg-white/[0.08] transition-all duration-700" />

                    {/* Concentric circles */}
                    <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border border-white/[0.06] pointer-events-none" />
                    <div className="absolute -right-2 -bottom-2 w-32 h-32 rounded-full border border-white/[0.1] pointer-events-none" />

                    {/* Top Row: System Code & Badge */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
                        {product.schemaCode}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-inter uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/15">
                        {product.badge}
                      </span>
                    </div>

                    {/* Central Emblem */}
                    <div className="relative z-10 my-auto flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-white shadow-[0_0_24px_rgba(255,255,255,0.06)] group-hover:border-white/30 group-hover:scale-105 transition-all duration-500">
                        <product.icon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <div>
                        <span className="font-fraunces text-xs uppercase tracking-[0.2em] text-white/40 block">Digital Architecture</span>
                        <span className="font-inter text-xs text-zinc-300 font-medium">{product.tag}</span>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-3 border-t border-white/10">
                      <span className="text-zinc-300 tracking-wider">{product.metric}</span>
                      <span className="text-white flex items-center gap-1.5 tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
                        READY
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="heading-card text-xl sm:text-2xl mb-3 text-white">
                        {product.name}
                      </h3>
                      <p className="body-muted text-sm text-zinc-400 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                        <p className="eyebrow-luxury text-[10px] text-zinc-400">What's Inside</p>
                        <ul className="space-y-2.5 body-editorial text-xs sm:text-sm text-zinc-300">
                          {product.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <span className="eyebrow-luxury text-[10px] text-zinc-400 block">Tier</span>
                        <p className="font-fraunces text-xl sm:text-2xl text-white font-light">
                          {product.price}
                        </p>
                      </div>

                      <Button asChild variant="default" size="md">
                        <Link href="/contact" className="flex items-center gap-2">
                          <span>{product.cta}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why These Exist Editorial Section ─────────────────────────────── */}
      <section className="section-pad border-t border-white/[0.08]" aria-label="Philosophy">
        <div className="container-luxury max-w-4xl mx-auto">
          <RevealSection className="card-surface p-8 sm:p-12 md:p-14 border-white/10">
            <span className="eyebrow-luxury mb-3 block">Field Intelligence</span>
            <h2 className="heading-section text-3xl sm:text-4xl mb-6">
              Extracted from real campaign rooms — never theoretical.
            </h2>
            <div className="space-y-4 body-editorial text-base sm:text-lg text-zinc-300">
              <p>
                The internet is saturated with generic "AI prompts" that generate plastic figures on marble floors. Those have zero commercial utility for a serious beauty brand protecting millions in perceived equity.
              </p>
              <p>
                Every framework and agent template in this library is extracted directly from the active production environment of Witlyn. They have generated publication-grade campaign assets, satisfied rigorous packaging designers, and established permanent visual brand systems for innovative cosmetic brands.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Newsletter Dispatch ────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.08] bg-surface/50 text-center" aria-label="Drop Alerts">
        <div className="container-luxury max-w-xl mx-auto">
          <RevealSection>
            <p className="eyebrow-luxury mb-3">Release Dispatches</p>
            <h2 className="heading-section text-3xl sm:text-4xl mb-4">Be First When New Blueprints Drop</h2>
            <p className="body-muted mb-8 text-sm text-zinc-400">
              New prompt blueprints and agent architectures are released on a rolling basis. Subscribers receive early access and launch pricing.
            </p>

            {newsletterSuccess ? (
              <div className="card-surface p-6 border-white/20 inline-flex items-center gap-3 text-white text-sm">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span>Confirmed. You'll receive early access to new framework drops.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-surface border-white/10 text-white placeholder:text-zinc-500 text-sm focus:border-white/40"
                />
                <Button type="submit" variant="default" size="md" className="shrink-0">
                  Notify Me
                </Button>
              </form>
            )}
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
