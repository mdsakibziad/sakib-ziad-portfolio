'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  ChevronDown,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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
    <div className="border-b border-border/80 last:border-none">
      <button
        className="w-full flex items-start justify-between gap-6 py-7 text-left group focus-visible:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-fraunces text-xl sm:text-2xl text-ivory font-light group-hover:text-gold transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_LUXURY }}
          className="shrink-0 mt-1 text-gold"
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
        <p className="font-inter text-base sm:text-lg text-ivory/70 leading-relaxed pb-8 max-w-3xl font-light">
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

  /* ── Method Steps ──────────────────────────────────────────────────────── */
  const methodSteps = [
    {
      num: '01',
      name: 'We Talk',
      desc: 'An intimate 30-minute discovery session to audit your current brand creative bottleneck, growth vectors, and AI readiness.',
    },
    {
      num: '02',
      name: 'We Diagnose',
      desc: 'We map your aesthetic and operational gaps — comparing your current content engine with what AI-native infrastructure can unlock.',
    },
    {
      num: '03',
      name: 'We Design',
      desc: 'We architect your bespoke AI Creative System: prompt libraries, visual style guides, and autonomous agent workflows.',
    },
    {
      num: '04',
      name: 'We Build',
      desc: 'Deployment, testing, and team handoff. Systems are put into live production until creative output compounds effortlessly.',
    },
  ]

  /* ── Case Studies (Real Witlyn Campaign Assets) ────────────────────────── */
  const caseStudies = [
    {
      id: 'solae',
      num: '01',
      brand: 'SOLAÉ',
      tag: 'AI Campaign Direction',
      type: 'Spec Commercial · Witlyn Production',
      headline: 'AIRVEIL — SPF50+ PA++++ Invisible Sun Serum',
      desc: 'A cinematic sun-care campaign shaped around sunlight, clarity, and sensorial sun care. Hero product translated across film, macro detail, and campaign-ready social creative.',
      image: 'https://witlyn.com/work/solae/01-solae-campaign-hero.jpg.jpg',
    },
    {
      id: 'vyraa',
      num: '02',
      brand: 'VYRAA',
      tag: 'Brand Repositioning',
      type: 'Spec Commercial · Witlyn Production',
      headline: '5-Peptide Neck Complex — Emerald Precision',
      desc: 'A deep-emerald product system built around brushed silver, formula texture, and controlled architectural lighting. Reimagining clinical skincare positioning.',
      image: 'https://witlyn.com/work/vyraa/vyraa%20product.jpg',
    },
    {
      id: 'lipea',
      num: '03',
      brand: 'LIPÉA',
      tag: 'Content Engine & Automation',
      type: 'Spec Commercial · Witlyn Production',
      headline: 'Peptide Glass Lip Serum — The Pink World',
      desc: 'A translucent beauty campaign built around liquid shine, chrome reflection, and blush-pink light. Translating one hero SKU into an infinite asset ecosystem.',
      image: 'https://witlyn.com/work/lipea/6.jpg',
    },
  ]

  /* ── FAQ Data ──────────────────────────────────────────────────────────── */
  const faqs = [
    {
      question: 'Is this AI-generated-looking work?',
      answer:
        'Never. AI is treated as an instrument of execution under strict creative direction. Every render passes through high-fashion art direction, color grading, and category aesthetic standards. The output regularly outperforms traditional studio photography in both visual prestige and engagement.',
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
    <div className="bg-background text-ivory overflow-x-hidden selection:bg-gold selection:text-background">

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 · CINEMATIC HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20"
        aria-label="Hero"
      >
        {/* Real Witlyn Campaign Atmosphere Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://witlyn.com/work/solae/01-solae-campaign-hero.jpg.jpg"
            alt="Witlyn campaign aesthetic atmosphere"
            fill
            priority
            className="object-cover object-center opacity-15 scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Multi-layer gradient overlays for seamless dark integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        </div>

        {/* Ambient Gold Horizontal Guide */}
        <div
          className="absolute left-0 right-0 top-[40%] h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(201,166,107,0.2) 30%, rgba(201,166,107,0.2) 70%, transparent 100%)',
          }}
        />

        <div className="container-luxury relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_LUXURY }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-surface/60 backdrop-blur-sm mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="eyebrow-luxury">AI Creative Strategist for Beauty & Skincare</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.1 }}
              className="heading-hero mb-8 max-w-4xl"
            >
              The AI{' '}
              <span className="italic font-fraunces text-gold-gradient font-light">
                Creative
              </span>{' '}
              Edge Beauty Brands Have Been Missing.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.2 }}
              className="body-editorial text-lg sm:text-xl max-w-2xl mb-12"
            >
              I help beauty, skincare, and cosmetics brands compound their growth
              through AI-native creative systems and autonomous brand intelligence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.3 }}
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

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 · THE GAP (PROBLEM STATEMENT)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad relative" aria-label="The Gap">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <RevealSection>
              <p className="eyebrow-luxury mb-4">The Strategic Gap</p>
              <h2 className="heading-section mb-8">
                Most beauty brands are churning content.{' '}
                <span className="italic font-fraunces text-gold font-light">
                  Almost none are building creative systems.
                </span>
              </h2>
            </RevealSection>

            <RevealSection delay={0.1} className="space-y-6 text-left sm:text-center">
              <p className="body-editorial text-lg">
                The traditional beauty playbook — relying on 6-week agency production cycles, expensive studio shoots, and disjointed freelance rosters — is collapsing under the velocity of modern consumer demand.
              </p>
              <p className="body-editorial text-lg">
                Meanwhile, brands dabbling in off-the-shelf AI generate uninspired, plastic-looking visuals that dilute their brand equity. The true moat is not prompt generation; it is architecting an end-to-end AI-native creative infrastructure with human art direction at the helm.
              </p>
              <p className="body-editorial text-lg text-gold/90 font-normal">
                When you systemize creative intelligence, output expands 10× while cost and turnaround shrink by 70%.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 · TWO PILLARS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-surface/30 border-y border-border/80" aria-label="Two Pillars">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Core Architecture</p>
            <h2 className="heading-section mb-4">Two connected pillars of growth.</h2>
            <p className="body-muted">Creative vision engineered with operational rigor.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Pillar 01 */}
            <RevealSection delay={0.1}>
              <div className="card-surface p-8 sm:p-12 flex flex-col justify-between h-full group hover:border-gold/40">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-8 transition-transform duration-300 group-hover:scale-110">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="eyebrow-luxury">Pillar 01 · Creative Direction</span>
                  <h3 className="heading-card text-2xl sm:text-3xl mt-2 mb-4">
                    AI-Native Creative Systems
                  </h3>
                  <p className="body-editorial text-base mb-6">
                    Proven through Witlyn — campaign concepting, visual worldbuilding, and generative asset systems tailored for prestige skincare and cosmetics. High-fashion aesthetics executed without studio friction.
                  </p>
                </div>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 self-start h-11 px-6 rounded-full bg-gold text-background font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury shadow-[0_0_18px_rgba(201,166,107,0.25)] hover:bg-gold-light hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(201,166,107,0.4)] active:scale-[0.98] mt-6 group/btn"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </RevealSection>

            {/* Pillar 02 */}
            <RevealSection delay={0.2}>
              <div className="card-surface p-8 sm:p-12 flex flex-col justify-between h-full group hover:border-gold/40">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-8 transition-transform duration-300 group-hover:scale-110">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="eyebrow-luxury">Pillar 02 · Brand Operations</span>
                  <h3 className="heading-card text-2xl sm:text-3xl mt-2 mb-4">
                    AI Automation & Agents
                  </h3>
                  <p className="body-editorial text-base mb-6">
                    Autonomous brand operations. Custom workflows that connect audience trend signals to asset generation, copy synthesis, and multi-channel asset routing — liberating founders from execution drag.
                  </p>
                </div>
                <Link
                  href="/consulting"
                  className="inline-flex items-center justify-center gap-2 self-start h-11 px-6 rounded-full bg-gold text-background font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury shadow-[0_0_18px_rgba(201,166,107,0.25)] hover:bg-gold-light hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(201,166,107,0.4)] active:scale-[0.98] mt-6 group/btn"
                >
                  <span>View Consulting Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 · THREE WAYS TO WORK WITH ME
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad" aria-label="Offerings">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Engagement Hub</p>
            <h2 className="heading-section mb-4">Three Ways to Work With Me</h2>
            <p className="body-muted">Engineered for depth, self-direction, and compounding partnership.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Consulting */}
            <RevealSection delay={0.1}>
              <div className="card-surface p-8 flex flex-col justify-between h-full group hover:border-gold/50">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-gold/10 border border-gold/30 text-gold mb-6">
                    By Application Only
                  </span>
                  <h3 className="heading-card text-2xl mb-3">1:1 Consulting & Advisory</h3>
                  <p className="body-muted mb-6">
                    High-touch strategic counsel spanning creative direction, campaign audits, and custom AI automation pipelines built for your brand.
                  </p>
                </div>
                <div className="pt-6 border-t border-border">
                  <Link
                    href="/consulting"
                    className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-full bg-gold text-background font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury shadow-[0_0_20px_rgba(201,166,107,0.25)] hover:bg-gold-light hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(201,166,107,0.4)] active:scale-[0.98] group/btn"
                  >
                    <span>Apply for Advisory</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </RevealSection>

            {/* Card 2: Digital Products */}
            <RevealSection delay={0.2}>
              <div className="card-surface p-8 flex flex-col justify-between h-full group hover:border-gold/50">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-ivory/10 border border-ivory/20 text-ivory/80 mb-6">
                    Self-Serve Systems
                  </span>
                  <h3 className="heading-card text-2xl mb-3">Digital Products & Kits</h3>
                  <p className="body-muted mb-6">
                    Battle-tested prompt architectures, creative director playbooks, and ready-to-deploy AI automation kits developed for beauty brands.
                  </p>
                </div>
                <div className="pt-6 border-t border-border">
                  <Link
                    href="/digital-products"
                    className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-full bg-surface border border-border-strong text-ivory font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury hover:bg-ivory hover:text-background hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(247,244,239,0.2)] active:scale-[0.98] group/btn"
                  >
                    <span>Enquire About Kits</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </RevealSection>

            {/* Card 3: Membership */}
            <RevealSection delay={0.3}>
              <div className="card-surface p-8 flex flex-col justify-between h-full group hover:border-gold/50">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-gold/10 border border-gold/30 text-gold mb-6">
                    Private Syndicate
                  </span>
                  <h3 className="heading-card text-2xl mb-3">The Advisory Syndicate</h3>
                  <p className="body-muted mb-6">
                    Ongoing monthly intelligence, new model breakdowns, template drops, and direct async strategy counsel for long-term category leaders.
                  </p>
                </div>
                <div className="pt-6 border-t border-border">
                  <Link
                    href="/membership"
                    className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-full bg-surface border border-gold/40 text-gold font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury hover:bg-gold hover:text-background hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(201,166,107,0.35)] active:scale-[0.98] group/btn"
                  >
                    <span>Explore Membership</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* Explicit Witlyn Distinction Callout */}
          <RevealSection delay={0.4} className="mt-14 text-center">
            <div className="inline-flex items-center flex-wrap justify-center gap-2 px-6 py-3 rounded-full border border-border bg-surface/50 text-xs font-inter text-muted-light">
              <span>Looking for full-service AI creative production or campaign execution?</span>
              <a
                href="https://witlyn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Visit Witlyn Studio</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 6 · SELECTED WORK WITH CINEMATIC IMAGERY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-surface/20 border-t border-border/80" aria-label="Selected Work">
        <div className="container-luxury">
          <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow-luxury mb-4">Proof of Work</p>
              <h2 className="heading-section">Selected Campaign Work</h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/work" className="flex items-center gap-2">
                <span>View Full Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </RevealSection>

          <div className="space-y-12">
            {caseStudies.map((study, i) => (
              <RevealSection key={study.id} delay={i * 0.1}>
                <div className="card-surface overflow-hidden group">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] items-center">
                    
                    {/* Content */}
                    <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full order-2 lg:order-1">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="font-inter text-xs font-semibold text-gold tracking-widest">{study.num}</span>
                          <span className="w-4 h-px bg-border" />
                          <span className="font-inter text-xs uppercase tracking-wider text-muted-light">{study.type}</span>
                        </div>
                        <h3 className="heading-card text-2xl sm:text-3xl mb-4 group-hover:text-gold transition-colors">
                          {study.brand}
                        </h3>
                        <p className="font-fraunces text-lg text-ivory/90 mb-4 font-light italic">
                          "{study.headline}"
                        </p>
                        <p className="body-muted mb-8">
                          {study.desc}
                        </p>
                      </div>

                      <div>
                        <Link
                          href={`/work#${study.id}`}
                          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-gold text-background font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury shadow-[0_0_18px_rgba(201,166,107,0.25)] hover:bg-gold-light hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(201,166,107,0.4)] active:scale-[0.98] group/btn"
                        >
                          <span>Read Case Breakdown</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Image with subtle zoom on hover */}
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden order-1 lg:order-2">
                      <Image
                        src={study.image}
                        alt={`${study.brand} creative campaign preview`}
                        fill
                        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-background/40 to-transparent pointer-events-none" />
                    </div>

                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 7 · THE METHOD
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-y border-border/80 bg-surface" aria-label="Process">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Methodology</p>
            <h2 className="heading-section mb-4">How Engagement Works</h2>
            <p className="body-muted">A clear, disciplined progression from initial audit to compounding asset generation.</p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodSteps.map((step, idx) => (
              <RevealSection key={step.num} delay={idx * 0.08} className="flex flex-col gap-4 relative">
                <span className="font-fraunces text-4xl text-gold/40 font-light">{step.num}</span>
                <h3 className="heading-card text-xl">{step.name}</h3>
                <p className="body-muted text-sm">{step.desc}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 8 · THE DIAGNOSTIC (LEAD GENERATION ENGINE)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="diagnostic" className="section-pad relative" aria-label="AI Diagnostic">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <RevealSection className="text-center mb-12">
              <p className="eyebrow-luxury mb-4">Immediate Value</p>
              <h2 className="heading-section mb-4">
                Get an AI-Generated Gap & Opportunity Snapshot
              </h2>
              <p className="body-muted">
                Input your brand details. Our specialized LLM engine analyzes your visual presence and returns 3 strategic creative opportunities within minutes.
              </p>
            </RevealSection>

            <RevealSection delay={0.15}>
              <div className="card-surface p-8 sm:p-12 border-gold/30 shadow-[0_0_50px_rgba(201,166,107,0.06)]">
                {diagnosticStatus === 'success' ? (
                  <div className="text-center py-8 space-y-6">
                    <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                    <h3 className="heading-card text-2xl">Snapshot Initiated</h3>
                    <p className="body-editorial text-base max-w-md mx-auto">
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
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 9 · ABOUT TEASER (WITH REAL PORTRAIT PHOTO)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-surface/40 border-y border-border/80" aria-label="About Sakib Ziad">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Real Executive Portrait Image */}
            <RevealSection className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-2xl group">
                <Image
                  src="/images/sakib-ziad.jpg"
                  alt="Sakib Ziad — AI Creative Strategist"
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-fraunces text-xl text-ivory">Sakib Ziad</p>
                  <p className="eyebrow-luxury text-gold">Founder of Witlyn · AI Strategist</p>
                </div>
              </div>
            </RevealSection>

            {/* Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <RevealSection>
                <p className="eyebrow-luxury">Founder Philosophy</p>
                <h2 className="heading-section my-4">
                  "AI is not a tool I use. It is the architectural lens I design through."
                </h2>
              </RevealSection>

              <RevealSection delay={0.1} className="space-y-4 body-editorial">
                <p>
                  With an academic degree in Artificial Intelligence and an obsession for prestige aesthetics, I founded Witlyn to prove that generative systems could exceed traditional studio campaigns in emotional depth and commercial conversion.
                </p>
                <p>
                  Now, through this private advisory practice, I partner directly with founders and creative leaders to install these proprietary systems inside their brands — turning sporadic marketing into an autonomous, compounding creative asset.
                </p>
              </RevealSection>

              <RevealSection delay={0.2} className="pt-4">
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
          SECTION 10 · THOUGHT LEADERSHIP TEASER
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad" aria-label="Insights">
        <div className="container-luxury">
          <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow-luxury mb-4">Strategic Perspectives</p>
              <h2 className="heading-section">Thinking on AI & Beauty</h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/insights" className="flex items-center gap-2">
                <span>View All Essays</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealSection delay={0.1}>
              <Link href="/insights" className="card-surface p-8 flex flex-col justify-between h-full group hover:border-gold/40">
                <div>
                  <span className="eyebrow-luxury text-gold">AI Creative</span>
                  <h3 className="heading-card text-xl mt-3 mb-3 group-hover:text-gold transition-colors">
                    Why Beauty Brands Need Creative Systems, Not Agencies
                  </h3>
                  <p className="body-muted text-sm">
                    The 6-week agency turnaround is dead. How leading cosmetics brands are replacing bloated production with on-demand AI systems.
                  </p>
                </div>
                <span className="text-xs font-inter text-gold/70 mt-6 inline-flex items-center gap-1">
                  Read Essay <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </RevealSection>

            <RevealSection delay={0.2}>
              <Link href="/insights" className="card-surface p-8 flex flex-col justify-between h-full group hover:border-gold/40">
                <div>
                  <span className="eyebrow-luxury text-gold">Brand Strategy</span>
                  <h3 className="heading-card text-xl mt-3 mb-3 group-hover:text-gold transition-colors">
                    The Prompt Is Not The Strategy: Aesthetics in 2026
                  </h3>
                  <p className="body-muted text-sm">
                    Why generic Midjourney renders dilute luxury brand equity, and how true art direction creates uncopyable visual prestige.
                  </p>
                </div>
                <span className="text-xs font-inter text-gold/70 mt-6 inline-flex items-center gap-1">
                  Read Essay <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </RevealSection>

            <RevealSection delay={0.3}>
              <Link href="/insights" className="card-surface p-8 flex flex-col justify-between h-full group hover:border-gold/40">
                <div>
                  <span className="eyebrow-luxury text-gold">AI Automation</span>
                  <h3 className="heading-card text-xl mt-3 mb-3 group-hover:text-gold transition-colors">
                    Autonomous Content Engines: Operational Breakdown
                  </h3>
                  <p className="body-muted text-sm">
                    Step-by-step architecture of the agent pipeline that produces 60+ commercial beauty assets every month with single-operator oversight.
                  </p>
                </div>
                <span className="text-xs font-inter text-gold/70 mt-6 inline-flex items-center gap-1">
                  Read Essay <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </RevealSection>
          </div>

          {/* Newsletter Box */}
          <RevealSection delay={0.35} className="mt-16 card-surface p-8 sm:p-12 border-border/80">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div>
                <p className="eyebrow-luxury mb-2">Private Dispatches</p>
                <h3 className="heading-card text-2xl mb-2">Curated Strategic Intelligence</h3>
                <p className="body-muted">
                  Join forward-thinking founders and creative directors receiving private breakdowns of generative technology in beauty.
                </p>
              </div>

              {newsletterStatus === 'success' ? (
                <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold text-sm text-center">
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
          SECTION 11 · FINAL CTA & APPLICATION INVITATION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-border/80 bg-surface/50 text-center" aria-label="Final Invitation">
        <div className="container-luxury max-w-3xl mx-auto">
          <RevealSection>
            <p className="eyebrow-luxury mb-4">Exclusivity by Design</p>
            <h2 className="heading-section text-4xl sm:text-5xl lg:text-6xl mb-6">
              Ready to install your AI creative edge?
            </h2>
            <p className="body-editorial text-lg max-w-xl mx-auto mb-10">
              Applications are reviewed personally. Limited advisory cohorts ensure deep immersion and measurable compounding growth.
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
          SECTION 12 · OBJECTION-HANDLING FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-border/80" aria-label="FAQ">
        <div className="container-luxury max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="eyebrow-luxury mb-4">Clarity</p>
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
