'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Compass,
  BookOpen,
  Activity,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TiltCard } from '@/components/ui/tilt-card'
import { ParallaxLayer } from '@/components/parallax-layer'

import { AmbientHeroAtmosphere } from '@/components/ambient-hero-atmosphere'
import { CondensationDroplet } from '@/components/condensation-droplet'
import { CondensationDivider } from '@/components/condensation-divider'

/* ── Animation Curve ──────────────────────────────────────────────────────── */
const EASE_LUXURY = [0.22, 1, 0.36, 1] as const

/* ── Reusable Scroll Reveal Wrapper ────────────────────────────────────────── */
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

/* ── FAQ Accordion Item ─────────────────────────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/[0.08] last:border-none">
      <button
        className="w-full flex items-start justify-between gap-6 py-7 text-left group focus-visible:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-fraunces text-xl sm:text-2xl text-ivory font-light group-hover:text-white transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_LUXURY }}
          className="shrink-0 mt-1 text-zinc-400 group-hover:text-white transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE_LUXURY }}
        className="overflow-hidden"
      >
        <p className="font-inter text-base sm:text-lg text-zinc-400 leading-relaxed pb-8 max-w-3xl font-light">
          {answer}
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  /* ── Diagnostic Form State ─────────────────────────────────────────────── */
  const [diagnosticForm, setDiagnosticForm] = useState({
    brandName: '',
    websiteUrl: '',
    instagramHandle: '',
    growthChallenge: '',
    email: '',
  })
  const [diagnosticStatus, setDiagnosticStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  async function handleDiagnosticSubmit(e: React.FormEvent) {
    e.preventDefault()
    setDiagnosticStatus('loading')
    try {
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diagnosticForm),
      })
      if (!res.ok) throw new Error('Failed')
      setDiagnosticStatus('success')
    } catch {
      setDiagnosticStatus('error')
    }
  }

  /* ── Newsletter Form State ─────────────────────────────────────────────── */
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault()
    setNewsletterStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      if (!res.ok) throw new Error('Failed')
      setNewsletterStatus('success')
    } catch {
      setNewsletterStatus('error')
    }
  }

  /* ── Method Milestones ─────────────────────────────────────────────────── */
  const methodSteps = [
    {
      num: '01',
      title: 'Discovery & Forensic Audit',
      role: 'Week 01',
      desc: 'An intensive discovery audit evaluating your current creative bottlenecks, asset velocity, and prompt stack architecture.',
    },
    {
      num: '02',
      title: 'Diagnostic Systems Blueprint',
      role: 'Week 02',
      desc: 'Formulation of your bespoke AI opportunity roadmap — defining brand LoRAs, visual style taxonomies, and agent pipelines.',
    },
    {
      num: '03',
      title: 'Architecture & Model Calibration',
      role: 'Weeks 03–04',
      desc: 'Engineering proprietary prompt stacks calibrated to botanical physics, formula caustics, and prestige packaging codes.',
    },
    {
      num: '04',
      title: 'Turnkey Production & Handoff',
      role: 'Ongoing',
      desc: 'System deployment into active marketing channels, team enablement, and continuous model upgrades as new diffusion engines drop.',
    },
  ]

  /* ── FAQ Data ──────────────────────────────────────────────────────────── */
  const faqs = [
    {
      question: 'Is this AI-generated-looking work?',
      answer:
        'Never. AI is treated as an instrument of execution under strict human creative direction. Every render passes through high-fashion art direction, color grading, and category aesthetic standards. The output regularly outperforms traditional studio photography in both visual prestige and engagement.',
    },
    {
      question: "What if my brand isn't ready for AI yet?",
      answer:
        'That is precisely when advisory is most valuable. We build the strategic foundation before you scale, so you avoid costly missteps, disjointed tools, and generic outputs. You get the blueprint before the market forces you to play catch-up.',
    },
    {
      question: 'How exclusive is your consulting practice?',
      answer:
        'Deliberately restricted. I work with a maximum of three advisory brands concurrently to guarantee deep strategic focus and direct partner access. Every engagement begins with an application process.',
    },
    {
      question: "What's the relationship between Sakib Ziad and Witlyn?",
      answer:
        'Witlyn (witlyn.com) is the AI-native creative studio I founded — it provides full done-for-you campaign production and creative retainers. This personal advisory practice is the 1:1 strategic layer: audits, creative direction, and custom AI agent automation builds. Witlyn is the production arm; this is your dedicated strategist.',
    },
    {
      question: 'Do you work outside beauty and cosmetics?',
      answer:
        'Exclusively beauty, skincare, and prestige wellness. Deep category mastery creates an unbeatable moat. Depth over breadth, always.',
    },
  ]

  return (
    <div className="bg-background text-ivory overflow-x-hidden selection:bg-white selection:text-black">

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 · CINEMATIC HERO (WITH LIQUID-GLASS DEPTH CANVAS)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
        aria-label="Hero"
      >
        {/* Pure CSS Ambient Glow & Floating Liquid Particles (Zero 3D/WebGL) */}
        <AmbientHeroAtmosphere />

        {/* Ambient Subtle Architectural Coordinate Guides */}
        <div className="absolute top-32 left-8 lg:left-16 hidden sm:block text-[10px] font-mono tracking-[0.25em] text-white/30 select-none">
          SYSTEM: AI-NATIVE CREATIVE ARCHITECTURE
        </div>
        <div className="absolute top-32 right-8 lg:right-16 hidden sm:block text-[10px] font-mono tracking-[0.25em] text-zinc-500 select-none">
          ED. 2026 // BEAUTY & PRESTIGE
          {/* Subtle slow-moving condensation droplet on cold glass horizon */}
          <CondensationDroplet className="top-6 right-3" delay={2} duration={19} />
        </div>

        <div className="container-luxury relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_LUXURY }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="eyebrow-luxury text-zinc-300">AI Creative Strategist for Beauty & Skincare</span>
            </motion.div>

            {/* Main Dominant Headline Reveal — Fluid Responsive Clamp */}
            <h1 className="heading-hero mb-8 sm:mb-10 w-full text-center">
              <span className="block overflow-hidden py-1 px-4 -mx-4">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.95, ease: EASE_LUXURY, delay: 0.15 }}
                  className="block"
                >
                  The AI{' '}
                  <span className="italic font-fraunces text-white font-light pr-1">
                    Creative Edge
                  </span>
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1 px-4 -mx-4">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.95, ease: EASE_LUXURY, delay: 0.3 }}
                  className="block"
                >
                  Beauty Brands
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1 px-4 -mx-4">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.95, ease: EASE_LUXURY, delay: 0.45 }}
                  className="block text-zinc-300 font-light"
                >
                  Have Been Missing.
                </motion.span>
              </span>
            </h1>

            {/* Considered Editorial Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.6 }}
              className="text-base sm:text-xl md:text-2xl text-zinc-300 font-light max-w-3xl mb-12 leading-[1.75] tracking-wide text-center"
            >
              I help beauty, skincare, and cosmetics brands compound their growth
              through{' '}
              <span className="inline-block px-3 py-0.5 my-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-normal backdrop-blur-sm shadow-[0_0_12px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.15)] align-baseline">
                AI-native creative systems
              </span>{' '}
              and autonomous brand intelligence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <Button asChild variant="gold" size="lg" className="w-full sm:w-auto group">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Apply for a Strategy Call</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto group">
                <Link href="/work" className="flex items-center gap-2">
                  <span>Explore Selected Work</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Cold Frosted Condensation Seam (Section Boundary 01) ─────────── */}
      <CondensationDivider dropletPosition="72%" dropletDelay={6} />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 · THE STRATEGIC GAP (ASYMMETRIC 2-COLUMN SPLIT)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad relative bg-[#0A0A0A]" aria-label="The Gap">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Bold Editorial Narrative Statement */}
            <div className="lg:col-span-7">
              <RevealSection>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-zinc-300 mb-6 backdrop-blur-md">
                  The Structural Dilemma
                </div>
                <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-8 leading-tight">
                  Most beauty brands are churning content.{' '}
                  <span className="italic font-fraunces text-white font-light">
                    Almost none are architecting creative systems.
                  </span>
                </h2>
              </RevealSection>

              <RevealSection delay={0.1} className="space-y-6 body-editorial text-base sm:text-lg text-zinc-300 font-light">
                <p>
                  The legacy beauty playbook — relying on 6-week agency production cycles, fragile retainer agreements, and disjointed creative rosters — is collapsing under the velocity of modern consumer attention.
                </p>
                <p>
                  Meanwhile, brands dabbling in off-the-shelf generative tools produce plastic figures and generic white-label visuals that actively erode luxury brand equity. The true moat is not raw prompt generation; it is architecting an end-to-end, AI-native creative infrastructure governed by uncompromising human art direction.
                </p>
              </RevealSection>
            </div>

            {/* Right Column: Architectural Paradigm Contrast Card */}
            <div className="lg:col-span-5">
              <RevealSection delay={0.2}>
                <TiltCard className="card-surface p-8 sm:p-10 border-white/20 bg-surface/90 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                    <span className="eyebrow-luxury text-zinc-300">Operating Paradigm</span>
                    <span className="font-mono text-xs text-muted-light">SHIFT ANALYSIS</span>
                  </div>

                  <div className="space-y-6">
                    {/* Legacy Box */}
                    <div className="p-4 rounded-xl bg-background/60 border border-white/[0.08]">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-light mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                        <span>Legacy Agency Production</span>
                      </div>
                      <p className="font-inter text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                        6–8 week lead times, escalating per-asset costs, manual retouching bottlenecks, and generic ad creative that burns paid spend.
                      </p>
                    </div>

                    {/* AI-Native System Box */}
                    <div className="p-4 rounded-xl bg-white/[0.06] border border-white/25">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>AI-Native Creative System</span>
                      </div>
                      <p className="font-inter text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                        Rapid concepting velocity, brand-calibrated prompt taxonomies, autonomous multi-format diffusion, and compounding creative equity owned entirely in-house.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-muted-light">
                    <span>STATUS: REVOLUTIONARY</span>
                    <span className="text-zinc-300">WITLYN PROVEN</span>
                  </div>
                </TiltCard>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PACING MOMENT 1 · SPARSE FULL-WIDTH EDITORIAL BREATHER
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 border-t border-white/[0.08] bg-background relative overflow-hidden" aria-label="Philosophy Quote">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
        <div className="container-luxury max-w-4xl mx-auto text-center relative z-10">
          <RevealSection>
            <span className="text-white/20 font-fraunces text-6xl lg:text-7xl block mb-4 leading-none">“</span>
            <blockquote className="font-fraunces text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ivory font-light italic leading-snug mb-8">
              In the generative era, prestige will not be measured by the volume of content you produce. It will be determined by the precision of the systems you command.
            </blockquote>
            <cite className="font-inter text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-400 font-medium not-italic block">
              Sakib Ziad · Founder of Witlyn
            </cite>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 · TWO PILLARS (VISUALLY CONTRASTING BLOCKS)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-surface/30 border-t border-white/[0.08]" aria-label="Two Pillars">
        <div className="container-luxury">
          
          <RevealSection className="max-w-2xl mb-16">
            <p className="eyebrow-luxury text-zinc-400 mb-3">Two Pillars of Growth</p>
            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl">
              Artistic direction engineered with computational leverage.
            </h2>
          </RevealSection>

          <div className="space-y-12">
            
            {/* PILLAR 1: IMAGE-LED LUXURY EDITORIAL SHOWCASE */}
            <RevealSection delay={0.1}>
              <TiltCard className="card-surface p-8 sm:p-12 border-white/20 bg-gradient-to-br from-surface to-background">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left: Real Campaign Image with Parallax */}
                  <div className="lg:col-span-5 relative aspect-[16/11] rounded-xl overflow-hidden border border-white/20 group">
                    <ParallaxLayer offset={25} className="w-full h-full">
                      <Image
                        src="https://witlyn.com/work/solae/01-solae-campaign-hero.jpg.jpg"
                        alt="Solaé campaign generative direction by Witlyn"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      />
                    </ParallaxLayer>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-inter uppercase tracking-wider bg-background/85 backdrop-blur-md text-zinc-300 border border-white/20">
                      Pillar 01 · Creative Direction
                    </span>
                  </div>

                  {/* Right: Editorial Content */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <span className="eyebrow-luxury text-zinc-400 block mb-2">Aesthetic Architecture</span>
                      <h3 className="heading-card text-2xl sm:text-3xl mb-4 text-ivory">
                        AI-Native Creative Systems & Visual Direction
                      </h3>
                      <p className="body-editorial text-base sm:text-lg mb-6 leading-relaxed text-zinc-300 font-light">
                        Proven through Witlyn — comprehensive campaign concepting, visual worldbuilding, and proprietary prompt taxonomies crafted specifically for prestige skincare and cosmetics physics. High-fashion aesthetics executed without studio friction.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs text-zinc-400 font-light">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                          <span>Formula caustics & refractive glass physics</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                          <span>Bespoke brand LoRAs & style guards</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                          <span>Packaging visualization & 3D renders</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                          <span>40+ commercial prompt blueprint repositories</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/work"
                      className="inline-flex items-center justify-center gap-2 self-start h-11 px-7 rounded-full bg-white text-black font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury shadow-[0_0_24px_rgba(255,255,255,0.18)] hover:bg-zinc-200 hover:scale-[1.03] group/btn"
                    >
                      <span>Explore Campaign Proof</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                </div>
              </TiltCard>
            </RevealSection>

            {/* PILLAR 2: CODE & SYSTEMS-LED ARCHITECTURAL BLOCK */}
            <RevealSection delay={0.2}>
              <TiltCard className="card-surface p-8 sm:p-12 border-white/[0.08] bg-[#0E0E0D]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left: Editorial Narrative */}
                  <div className="lg:col-span-6 flex flex-col justify-between order-2 lg:order-1">
                    <div>
                      <span className="eyebrow-luxury text-zinc-400 block mb-2">Operational Infrastructure</span>
                      <h3 className="heading-card text-2xl sm:text-3xl mb-4 text-ivory">
                        Autonomous AI Brand Operations & Agent Pipelines
                      </h3>
                      <p className="body-editorial text-base sm:text-lg mb-6 leading-relaxed text-zinc-300 font-light">
                        Transform your marketing department from a bottleneck into an autonomous generative studio. Custom agent pipelines that ingest customer sentiment, draft ad hooks, orchestrate diffusion engines, and output multi-channel campaigns with minimal human oversight.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs text-zinc-400 font-light">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                          <span>Automated search intent ➔ visual brief synthesis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                          <span>Make.com & n8n multi-model orchestration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                          <span>Prestige skincare tone-of-voice copy models</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                          <span>Autonomous multi-aspect ratio rendering</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/consulting"
                      className="inline-flex items-center justify-center gap-2 self-start h-11 px-7 rounded-full bg-white/[0.04] border border-white/20 text-white font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury hover:bg-white/10 hover:border-white/35 hover:scale-[1.03] group/btn"
                    >
                      <span>View Systems Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                  {/* Right: Interactive Pipeline Visual Schema */}
                  <div className="lg:col-span-6 order-1 lg:order-2">
                    <div className="p-6 rounded-2xl bg-[#090908] border border-white/[0.08] font-mono text-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                        <div className="flex items-center gap-2 text-zinc-300">
                          <Activity className="w-4 h-4 animate-pulse text-emerald-400" />
                          <span className="font-semibold tracking-wider">PIPELINE TELEMETRY</span>
                        </div>
                        <span className="text-[10px] text-muted-light">NODE 4/4 ACTIVE</span>
                      </div>

                      {/* Pipeline steps */}
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-surface/60 border border-white/[0.08] flex items-center justify-between">
                          <span className="text-zinc-300">01 // Sentiment & Review Ingestion</span>
                          <span className="text-emerald-400 text-[10px]">CONNECTED</span>
                        </div>
                        <div className="p-3 rounded-lg bg-surface/60 border border-white/[0.08] flex items-center justify-between">
                          <span className="text-zinc-300">02 // Dynamic Prompt Formulation</span>
                          <span className="text-zinc-300 text-[10px]">CALIBRATED</span>
                        </div>
                        <div className="p-3 rounded-lg bg-surface/60 border border-white/[0.08] flex items-center justify-between">
                          <span className="text-zinc-300">03 // Multi-Model Diffusion Render</span>
                          <span className="text-zinc-300 text-[10px]">FLUX / MIDJOURNEY</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.08] border border-white/20 flex items-center justify-between text-white">
                          <span>04 // Multi-Channel Asset Dispatch</span>
                          <span className="text-[10px] font-semibold text-emerald-400">AUTONOMOUS</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[10px] text-muted-light border-t border-white/[0.08]">
                        <span>LATENCY: ZERO BOTTLENECK</span>
                        <span className="text-zinc-300">COMPOSITE ARCHITECTURE</span>
                      </div>
                    </div>
                  </div>

                </div>
              </TiltCard>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 · THREE WAYS TO WORK WITH ME (HIERARCHICAL HUB)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-white/[0.08] bg-background" aria-label="Offerings">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury text-zinc-400 mb-3">Engagement Hub</p>
            <h2 className="heading-section text-3xl sm:text-4xl">Three Ways to Partner</h2>
            <p className="body-muted text-sm sm:text-base">Structured for strategic depth, self-direction, or ongoing syndicate access.</p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Card 1: Consulting / Advisory (Flagship - Elevated) */}
            <RevealSection delay={0.1}>
              <TiltCard className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.06)] bg-gradient-to-b from-surface via-surface to-[#161614] relative">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-white/10 border border-white/20 text-white">
                      By Application Only
                    </span>
                    <span className="text-xs font-mono text-muted-light">FLAGSHIP</span>
                  </div>
                  <h3 className="heading-card text-2xl mb-3 text-ivory">1:1 Consulting & Advisory</h3>
                  <p className="body-muted text-sm mb-6 leading-relaxed">
                    Private executive counsel spanning creative audits, campaign direction, and custom AI automation pipelines tailored to your brand operations.
                  </p>
                  
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08] mb-8 text-xs text-zinc-300 font-light">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Bi-weekly architectural strategy sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Direct async review for prompt & model tuning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Strictly capped at 3 concurrent brands</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/consulting"
                  className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-white text-black font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury shadow-[0_0_24px_rgba(255,255,255,0.18)] hover:bg-zinc-200 hover:scale-[1.02] group/btn"
                >
                  <span>Apply for Advisory</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </TiltCard>
            </RevealSection>

            {/* Card 2: Digital Products (Technical Blueprint Model) */}
            <RevealSection delay={0.2}>
              <TiltCard className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full border-white/[0.08] hover:border-white/30">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-surface border border-white/20 text-ivory/80">
                      Self-Serve Systems
                    </span>
                    <BookOpen className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h3 className="heading-card text-2xl mb-3 text-ivory">Digital Products & Kits</h3>
                  <p className="body-muted text-sm mb-6 leading-relaxed">
                    Battle-tested prompt frameworks, art direction taxonomies, and ready-to-deploy Make/n8n automation blueprints developed directly for beauty brands.
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08] mb-8 text-xs text-zinc-300 font-light">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>40+ tested prompt blueprints (Flux / Midjourney)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Turnkey agent scenario blueprints</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Immediate Notion repository access</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/digital-products"
                  className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-surface border border-white/20 text-ivory font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury hover:bg-white hover:text-black hover:scale-[1.02] group/btn"
                >
                  <span>Enquire About Kits</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </TiltCard>
            </RevealSection>

            {/* Card 3: Membership (Syndicate Cohort Model) */}
            <RevealSection delay={0.3}>
              <TiltCard className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full border-white/[0.08] hover:border-white/30">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-white/10 border border-white/20 text-zinc-200">
                      Syndicate Access
                    </span>
                    <Compass className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h3 className="heading-card text-2xl mb-3 text-ivory">The Advisory Syndicate</h3>
                  <p className="body-muted text-sm mb-6 leading-relaxed">
                    Ongoing monthly intelligence, emerging model setups, private template releases, and direct async guidance for brand leaders playing the long game.
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08] mb-8 text-xs text-zinc-300 font-light">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Monthly strategic intelligence monographs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Curated founder roundtables & ad reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>Direct async advisory channel access</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/membership"
                  className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-surface border border-white/20 text-zinc-200 font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury hover:bg-white hover:text-black hover:scale-[1.02] group/btn"
                >
                  <span>Explore Membership</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </TiltCard>
            </RevealSection>

          </div>

          {/* Explicit Witlyn Distinction Callout */}
          <RevealSection delay={0.4} className="mt-14 text-center">
            <div className="inline-flex items-center flex-wrap justify-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] bg-surface/50 text-xs font-inter text-muted-light">
              <span>Looking for full-service AI creative production or done-for-you monthly retainers?</span>
              <a
                href="https://witlyn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Visit Witlyn Studio</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 · PROOF OF WORK (MAGAZINE EDITORIAL SPREAD LAYOUT)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-[#0B0B0A] border-t border-white/[0.08]" aria-label="Selected Work">
        <div className="container-luxury">
          
          <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20 border-b border-white/[0.08] pb-8">
            <div>
              <p className="eyebrow-luxury text-zinc-400 mb-3">Field Proof</p>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl">Selected Campaign Work</h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/work" className="flex items-center gap-2">
                <span>View Full Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </RevealSection>

          {/* SPREAD 01: Solaé (Large Image Bleed Left, Editorial Narrative Right) */}
          <div className="space-y-24">
            
            <RevealSection>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Large Left Image */}
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 group">
                  <ParallaxLayer offset={30} className="w-full h-full">
                    <Image
                      src="https://witlyn.com/work/solae/01-solae-campaign-hero.jpg.jpg"
                      alt="SOLAÉ sun care campaign editorial"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                    />
                  </ParallaxLayer>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-widest text-zinc-300 bg-background/80 px-3 py-1 rounded backdrop-blur-md border border-white/10">
                    01 // CAMPAIGN DIRECTION
                  </span>
                </div>

                {/* Right Narrative */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <span className="eyebrow-luxury text-muted-light block mb-2">Spec Commercial · Witlyn Production</span>
                    <h3 className="heading-card text-3xl sm:text-4xl text-ivory mb-4">
                      SOLAÉ
                    </h3>
                    <p className="font-fraunces text-xl text-zinc-300 mb-4 font-light italic">
                      AIRVEIL — SPF50+ Invisible Sun Serum
                    </p>
                    <p className="body-editorial text-base text-zinc-300 mb-6 leading-relaxed font-light">
                      A cinematic sun-care campaign shaped around sunlight, skin refraction, and sensorial fluidity. Constructed 12 distinct art-directed scenes including liquid dispersion and warm architectural stills.
                    </p>
                    <div className="p-4 rounded-xl bg-surface border border-white/[0.08] mb-8">
                      <span className="text-[10px] font-mono text-muted-light uppercase tracking-wider block mb-1">Delivered Systems</span>
                      <span className="text-xs font-inter text-zinc-200">Hero Campaign Film + 48 High-Resolution Assets</span>
                    </div>
                  </div>

                  <Link
                    href="/work#solae"
                    className="inline-flex items-center gap-2 text-xs font-inter uppercase tracking-[0.16em] text-zinc-300 hover:text-white group/link"
                  >
                    <span>Read Solaé Breakdown</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </RevealSection>

            {/* SPREAD 02: Vyraa (REVERSE LAYOUT: Narrative Left, Emerald Visual Bleed Right) */}
            <RevealSection delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                {/* Left Narrative */}
                <div className="lg:col-span-5 flex flex-col justify-between order-2 lg:order-1">
                  <div>
                    <span className="eyebrow-luxury text-muted-light block mb-2">Spec Commercial · Witlyn Production</span>
                    <h3 className="heading-card text-3xl sm:text-4xl text-ivory mb-4">
                      VYRAA
                    </h3>
                    <p className="font-fraunces text-xl text-zinc-300 mb-4 font-light italic">
                      5-Peptide Neck Complex — Emerald Precision
                    </p>
                    <p className="body-editorial text-base text-zinc-300 mb-6 leading-relaxed font-light">
                      A deep-emerald product universe built around brushed silver, tactile formula smears, and architectural lighting. Reimagined clinical skincare positioning to establish uncompromising category prestige.
                    </p>
                    <div className="p-4 rounded-xl bg-surface border border-white/[0.08] mb-8">
                      <span className="text-[10px] font-mono text-muted-light uppercase tracking-wider block mb-1">Delivered Systems</span>
                      <span className="text-xs font-inter text-zinc-200">Complete Visual Identity Overhaul & Editorial Asset Suite</span>
                    </div>
                  </div>

                  <Link
                    href="/work#vyraa"
                    className="inline-flex items-center gap-2 text-xs font-inter uppercase tracking-[0.16em] text-zinc-300 hover:text-white group/link"
                  >
                    <span>Read Vyraa Breakdown</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 order-1 lg:order-2 group">
                  <ParallaxLayer offset={30} className="w-full h-full">
                    <Image
                      src="https://witlyn.com/work/vyraa/vyraa%20product.jpg"
                      alt="VYRAA skincare luxury packaging campaign"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                    />
                  </ParallaxLayer>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-6 right-6 font-mono text-xs uppercase tracking-widest text-zinc-300 bg-background/80 px-3 py-1 rounded backdrop-blur-md border border-white/10">
                    02 // BRAND REPOSITIONING
                  </span>
                </div>

              </div>
            </RevealSection>

            {/* SPREAD 03: Lipéa (CINEMATIC WIDE HORIZONTAL BANNER) */}
            <RevealSection delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-surface/80 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  
                  <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 z-10">
                    <span className="eyebrow-luxury text-zinc-400 block mb-2">Spec Commercial · Witlyn Production</span>
                    <h3 className="heading-card text-3xl sm:text-4xl text-ivory mb-2">LIPÉA</h3>
                    <p className="font-fraunces text-xl text-zinc-300 mb-4 font-light italic">
                      Peptide Glass Lip Serum — The Pink World
                    </p>
                    <p className="body-muted text-sm sm:text-base mb-6 leading-relaxed">
                      A translucent beauty campaign built around liquid shine, chrome reflection, and blush-pink caustics. Replaced manual production coordination with an automated pipeline for paid social acquisition.
                    </p>
                    <div className="p-3.5 rounded-xl bg-background/80 border border-white/[0.08] mb-6">
                      <span className="text-[10px] font-mono text-muted-light uppercase tracking-wider block mb-1">Delivered Systems</span>
                      <span className="text-xs font-inter text-zinc-200">Multi-Angle Campaign Suite & Automated Briefing System</span>
                    </div>
                    <Link
                      href="/work#lipea"
                      className="inline-flex items-center gap-2 text-xs font-inter uppercase tracking-[0.16em] text-zinc-300 hover:text-white group/link"
                    >
                      <span>Read Lipéa Breakdown</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[440px] overflow-hidden">
                    <Image
                      src="https://witlyn.com/work/lipea/6.jpg"
                      alt="LIPÉA Pink World campaign asset"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface via-transparent to-transparent pointer-events-none" />
                  </div>

                </div>
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* ── Cold Frosted Condensation Seam (Section Boundary 02) ─────────── */}
      <CondensationDivider dropletPosition="28%" dropletDelay={11} />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 6 · METHODOLOGY (CONNECTED VISUAL TIMELINE)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-[#0E0E0D]" aria-label="Methodology">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-20">
            <p className="eyebrow-luxury text-zinc-400 mb-3">Architectural Sequence</p>
            <h2 className="heading-section text-3xl sm:text-4xl">The Path to Compounding Leverage</h2>
            <p className="body-muted text-sm sm:text-base">A disciplined sequence moving from forensic diagnosis to automated production.</p>
          </RevealSection>

          {/* Connected Sequence Flow with Liquid-Glass Progress Track */}
          <div className="relative">
            {/* Horizontal Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {methodSteps.map((step, idx) => (
                <RevealSection key={step.num} delay={idx * 0.1}>
                  <div className="card-surface p-8 flex flex-col justify-between h-full border-white/[0.08] group hover:border-white/30">
                    <div>
                      {/* Step Node Marker */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-11 h-11 rounded-full bg-surface border border-white/30 flex items-center justify-center font-fraunces text-base text-white shadow-[0_0_16px_rgba(255,255,255,0.08)] group-hover:scale-110 transition-transform">
                          {step.num}
                        </div>
                        <span className="font-mono text-[10px] text-muted-light tracking-widest uppercase">
                          {step.role}
                        </span>
                      </div>

                      <h3 className="heading-card text-xl mb-3 text-ivory group-hover:text-white transition-colors">
                        {step.title}
                      </h3>
                      <p className="body-muted text-xs sm:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/[0.08] text-[10px] font-mono text-zinc-400">
                      MILESTONE {step.num} · VERIFIED
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 7 · THE DIAGNOSTIC (ASYMMETRIC INTERACTIVE LEAD ENGINE)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="diagnostic" className="section-pad relative border-t border-white/[0.08] bg-background" aria-label="AI Diagnostic">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Context & Strategic Value */}
            <div className="lg:col-span-5">
              <RevealSection>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-zinc-300 mb-6 backdrop-blur-md">
                  Complimentary Diagnosis
                </div>
                <h2 className="heading-section text-3xl sm:text-4xl mb-6">
                  Get a Free Gap & Opportunity Snapshot
                </h2>
                <p className="body-editorial text-base sm:text-lg mb-6 leading-relaxed text-zinc-300 font-light">
                  Input your brand details. Our specialized LLM diagnostic analyzes your visual presence and returns 3 strategic creative opportunities directly to your inbox.
                </p>
                <div className="space-y-4 text-xs font-inter text-zinc-300 font-light">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-200 shrink-0" />
                    <span>Forensic audit of your current aesthetic bottlenecks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-200 shrink-0" />
                    <span>3 concrete generative opportunities tailored to your vertical</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-200 shrink-0" />
                    <span>1 actionable 30-day next step (no obligation)</span>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Right Column: Diagnostic Form Card */}
            <div className="lg:col-span-7">
              <RevealSection delay={0.15}>
                <TiltCard className="card-surface p-8 sm:p-12 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                  {diagnosticStatus === 'success' ? (
                    <div className="text-center py-8 space-y-6">
                      <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                      <h3 className="heading-card text-2xl">Snapshot Initiated</h3>
                      <p className="body-editorial text-base max-w-md mx-auto text-zinc-300">
                        We are processing your brand synthesis. A detailed overview is being dispatched to your email, and our strategy team will follow up directly.
                      </p>
                      <Button asChild variant="gold" size="md">
                        <Link href="/contact">Book Strategy Call</Link>
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleDiagnosticSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Brand Name *
                          </label>
                          <Input
                            required
                            placeholder="e.g. Solaé Botanicals"
                            value={diagnosticForm.brandName}
                            onChange={(e) => setDiagnosticForm({ ...diagnosticForm, brandName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Website URL *
                          </label>
                          <Input
                            required
                            type="url"
                            placeholder="https://yourbrand.com"
                            value={diagnosticForm.websiteUrl}
                            onChange={(e) => setDiagnosticForm({ ...diagnosticForm, websiteUrl: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Work Email *
                          </label>
                          <Input
                            required
                            type="email"
                            placeholder="founder@yourbrand.com"
                            value={diagnosticForm.email}
                            onChange={(e) => setDiagnosticForm({ ...diagnosticForm, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Instagram Handle
                          </label>
                          <Input
                            placeholder="@yourbrand"
                            value={diagnosticForm.instagramHandle}
                            onChange={(e) => setDiagnosticForm({ ...diagnosticForm, instagramHandle: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                          Primary Creative / Growth Bottleneck *
                        </label>
                        <Textarea
                          required
                          rows={3}
                          placeholder="What is limiting your creative velocity right now? (e.g. agency turnaround too slow, generic visuals, ad fatigue)"
                          value={diagnosticForm.growthChallenge}
                          onChange={(e) => setDiagnosticForm({ ...diagnosticForm, growthChallenge: e.target.value })}
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="gold"
                        size="lg"
                        className="w-full"
                        disabled={diagnosticStatus === 'loading'}
                      >
                        {diagnosticStatus === 'loading' ? 'Analyzing Brand System...' : 'Generate My Gap Snapshot →'}
                      </Button>

                      <p className="text-[11px] text-muted-light text-center font-inter">
                        100% confidential. No spam. Reviewed by Sakib Ziad personally.
                      </p>
                    </form>
                  )}
                </TiltCard>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 8 · FOUNDER PHILOSOPHY / ABOUT TEASE (LARGE-FORMAT EDITORIAL)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-surface/40 border-t border-white/[0.08]" aria-label="About Sakib Ziad">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Bleed Portrait Editorial Photo */}
            <div className="lg:col-span-5">
              <RevealSection>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                  <Image
                    src="/images/sakib-ziad.jpg"
                    alt="Sakib Ziad — AI Creative Strategist"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-fraunces text-2xl text-ivory">Sakib Ziad</p>
                    <p className="eyebrow-luxury text-zinc-300">Founder of Witlyn · AI Creative Strategist</p>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Right: Large Editorial Pull-Quote & Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <RevealSection>
                <span className="eyebrow-luxury text-zinc-400">Founder Philosophy</span>
                <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl text-ivory font-light italic my-4 leading-tight">
                  “AI is not a tool I use. It is the architectural lens I design through.”
                </h2>
              </RevealSection>

              <RevealSection delay={0.1} className="space-y-4 body-editorial text-base sm:text-lg text-zinc-300 font-light">
                <p>
                  With an academic degree in Artificial Intelligence and an obsession for prestige aesthetics, I founded Witlyn to prove that generative systems could exceed traditional studio campaigns in emotional depth and commercial conversion.
                </p>
                <p>
                  Now, through this private advisory practice, I partner directly with founders and CMOs to install these proprietary systems inside their brands — turning sporadic marketing into an autonomous, compounding creative asset.
                </p>
              </RevealSection>

              <RevealSection delay={0.2} className="pt-2">
                <Button asChild variant="outline" size="md">
                  <Link href="/about" className="flex items-center gap-2">
                    <span>Read Full Founder Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 9 · STRATEGIC PERSPECTIVES (ASYMMETRIC EDITORIAL INDEX)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-white/[0.08] bg-background" aria-label="Insights">
        <div className="container-luxury">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
            
            {/* Left Header */}
            <div className="lg:col-span-5">
              <RevealSection>
                <p className="eyebrow-luxury text-zinc-400 mb-3">Strategic Perspectives</p>
                <h2 className="heading-section text-3xl sm:text-4xl mb-4">Thinking on AI & Beauty</h2>
                <p className="body-muted mb-8 text-sm sm:text-base leading-relaxed">
                  Essays, architectural breakdowns, and field notes exploring how computational creativity reshapes brand authority.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/insights" className="flex items-center gap-2">
                    <span>View All Essays</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </RevealSection>
            </div>

            {/* Right Editorial List */}
            <div className="lg:col-span-7 space-y-6">
              
              <RevealSection delay={0.1}>
                <Link href="/insights" className="card-surface p-6 sm:p-8 block group hover:border-white/30 transition-colors">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="eyebrow-luxury text-zinc-400 text-[10px]">AI Creative Systems</span>
                    <span className="text-xs font-mono text-muted-light">Strategic Essay</span>
                  </div>
                  <h3 className="heading-card text-xl sm:text-2xl my-2 group-hover:text-white transition-colors">
                    Why Beauty Brands Need Creative Systems, Not Agencies
                  </h3>
                  <p className="body-muted text-xs sm:text-sm leading-relaxed mb-4">
                    The 6-week agency turnaround is dead. How high-growth cosmetics brands replace bloated production with on-demand AI systems.
                  </p>
                  <span className="text-xs font-mono text-zinc-300 flex items-center gap-1">
                    READ DISPATCH <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </RevealSection>

              <RevealSection delay={0.2}>
                <Link href="/insights" className="card-surface p-6 sm:p-8 block group hover:border-white/30 transition-colors">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="eyebrow-luxury text-zinc-400 text-[10px]">Brand Strategy</span>
                    <span className="text-xs font-mono text-muted-light">Design Theory</span>
                  </div>
                  <h3 className="heading-card text-xl sm:text-2xl my-2 group-hover:text-white transition-colors">
                    The Prompt Is Not The Strategy: Aesthetics in 2026
                  </h3>
                  <p className="body-muted text-xs sm:text-sm leading-relaxed mb-4">
                    Why generic Midjourney renders dilute luxury brand equity, and how true art direction creates uncopyable visual prestige.
                  </p>
                  <span className="text-xs font-mono text-zinc-300 flex items-center gap-1">
                    READ DISPATCH <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </RevealSection>

              <RevealSection delay={0.3}>
                <Link href="/insights" className="card-surface p-6 sm:p-8 block group hover:border-white/30 transition-colors">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="eyebrow-luxury text-zinc-400 text-[10px]">AI Automation</span>
                    <span className="text-xs font-mono text-muted-light">Systems Blueprint</span>
                  </div>
                  <h3 className="heading-card text-xl sm:text-2xl my-2 group-hover:text-white transition-colors">
                    Autonomous Content Engines: Operational Breakdown
                  </h3>
                  <p className="body-muted text-xs sm:text-sm leading-relaxed mb-4">
                    Step-by-step architecture of the agent pipeline that translates audience intent into commercial beauty campaign variants.
                  </p>
                  <span className="text-xs font-mono text-zinc-300 flex items-center gap-1">
                    READ DISPATCH <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </RevealSection>

            </div>

          </div>

          {/* Newsletter Box */}
          <RevealSection delay={0.35} className="card-surface p-8 sm:p-12 border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div>
                <p className="eyebrow-luxury text-zinc-400 mb-2">Private Dispatches</p>
                <h3 className="heading-card text-2xl mb-2">Curated Strategic Intelligence</h3>
                <p className="body-muted">
                  Join forward-thinking founders and creative directors receiving private breakdowns of generative technology in beauty.
                </p>
              </div>

              {newsletterStatus === 'success' ? (
                <div className="p-4 rounded-xl bg-white/[0.06] border border-white/20 text-white text-sm text-center">
                  Confirmed. You are on the private dispatch list.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    required
                    type="email"
                    placeholder="Enter your work email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="gold" size="md">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 10 · FINAL INVITATION & DIRECT ACTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-white/[0.08] bg-surface/50 text-center" aria-label="Final Invitation">
        <div className="container-luxury max-w-3xl mx-auto">
          <RevealSection>
            <p className="eyebrow-luxury text-zinc-400 mb-4">Exclusivity by Design</p>
            <h2 className="heading-section text-4xl sm:text-5xl lg:text-6xl mb-6">
              Ready to install your AI creative edge?
            </h2>
            <p className="body-editorial text-lg max-w-xl mx-auto mb-10 text-zinc-300 font-light">
              Applications are reviewed personally. Limited advisory cohorts ensure deep immersion and compounding brand authority.
            </p>
            <Button asChild variant="gold" size="xl">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Apply for a Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 11 · OBJECTION-HANDLING FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-white/[0.08] bg-background" aria-label="FAQ">
        <div className="container-luxury max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="eyebrow-luxury text-zinc-400 mb-4">Clarity</p>
            <h2 className="heading-section mb-4">Frequently Asked Questions</h2>
            <p className="body-muted">Direct answers to strategic questions before applying.</p>
          </RevealSection>

          <div className="space-y-2">
            {faqs.map((faq) => (
              <RevealSection key={faq.question}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
