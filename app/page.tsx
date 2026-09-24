'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

/* ── Animation Helpers ─────────────────────────────────────────────────────── */

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const

/** Standard fade-up reveal variants */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_LUXURY },
  },
}

/** Staggered container */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/** Fade-up child for stagger */
const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_LUXURY },
  },
}

/* ── Reusable animated section wrapper ─────────────────────────────────────── */
function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.9, ease: EASE_LUXURY, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── SVG Icons ─────────────────────────────────────────────────────────────── */

function IconBrush({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 114.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.18 1 3.5 1 2.2 0 3.5-1.5 3.5-3.02 0-1.67-1.36-3.02-3-3.02z" />
    </svg>
  )
}

function IconCircuit({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="9" width="4" height="6" rx="1" />
      <rect x="18" y="9" width="4" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <rect x="9" y="18" width="6" height="4" rx="1" />
      <path d="M6 12h4M14 12h4M12 6v4M12 14v4" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

/* ── Placeholder Block ─────────────────────────────────────────────────────── */
function Placeholder({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-center bg-surface border border-dashed border-gold/30 rounded-xl text-gold/50 font-inter text-label-sm text-center px-4 py-3 ${className ?? ''}`}
    >
      <span>[PLACEHOLDER: {label}]</span>
    </div>
  )
}

/* ── FAQ Accordion Item ─────────────────────────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-none">
      <button
        className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-fraunces text-body-lg text-ivory group-hover:text-gold transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE_LUXURY }}
          className="shrink-0 mt-1 text-gold"
        >
          <IconChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE_LUXURY }}
        className="overflow-hidden"
      >
        <p className="font-inter text-body-md text-muted leading-relaxed pb-6 max-w-3xl">
          {answer}
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  /* ── Diagnostic Form State ─────────────────────────────────────────────── */
  const [diagnosticForm, setDiagnosticForm] = useState({
    brandName: '',
    websiteUrl: '',
    instagramHandle: '',
    growthChallenge: '',
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

  /* ── Credibility pillars ───────────────────────────────────────────────── */
  const credibilityPillars = [
    {
      label: 'BSc in AI',
      detail: 'Academic foundation in artificial intelligence systems.',
    },
    {
      label: 'Beauty & Skincare Focus',
      detail: 'Exclusively serving the beauty and cosmetics vertical.',
    },
    {
      label: 'Founder of Witlyn',
      detail: 'AI-native creative studio built from the ground up.',
    },
    {
      label: 'AI-Native Systems',
      detail: 'Strategy and execution built around AI at the core.',
    },
  ]

  /* ── Method steps ──────────────────────────────────────────────────────── */
  const methodSteps = [
    {
      num: '01',
      name: 'We Talk',
      desc: 'A focused discovery call to understand your brand, goals, and current gaps. We qualify the fit — no obligation, no pressure.',
    },
    {
      num: '02',
      name: 'We Diagnose',
      desc: 'A structured audit of your creative operations, AI readiness, and growth opportunity. The gap becomes visible.',
    },
    {
      num: '03',
      name: 'We Design',
      desc: 'We architect your AI creative system: strategy, campaign structure, automation blueprint, and roadmap.',
    },
    {
      num: '04',
      name: 'We Build',
      desc: 'Execution, iteration, and measurement. Systems are deployed, tested, and refined until results compound.',
    },
  ]

  /* ── FAQ data ──────────────────────────────────────────────────────────── */
  const faqs = [
    {
      question: 'Is this AI-generated-looking work?',
      answer:
        'AI is used as a system, not a shortcut. Every creative decision is strategically directed. The output is indistinguishable from — and often exceeds — traditionally produced campaigns.',
    },
    {
      question: "What if I'm not ready for AI yet?",
      answer:
        "That's actually the best time to engage. We build the system before you need to scale, so when you're ready, you already have the infrastructure.",
    },
    {
      question: 'How exclusive is the consulting offering?',
      answer:
        'Deliberately so. I work with a small number of brands at a time to ensure the depth of attention that drives real results. Applications are reviewed personally.',
    },
    {
      question: "What's the difference between Sakib Ziad and Witlyn?",
      answer:
        "Witlyn is the full-service AI creative studio I founded — it handles production, content retainers, and done-for-you campaigns. This advisory practice is the strategic layer: audits, direction, and AI automation builds. Think of Witlyn as the hands; this as the mind.",
    },
    {
      question: 'What industries do you serve?',
      answer: 'Exclusively beauty, skincare, and cosmetics. Depth over breadth.',
    },
  ]

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <main className="bg-background text-ivory overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 · HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-center noise-overlay overflow-hidden"
        aria-label="Hero"
      >
        {/* ── Background placeholder (replace with image if desired) ── */}
        {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(...)' }} /> */}

        {/* Subtle horizontal gold accent line */}
        <div
          className="absolute left-0 right-0 top-[38%] h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(201,166,107,0.18) 20%, rgba(201,166,107,0.18) 80%, transparent 100%)',
          }}
        />

        <div className="container-luxury relative z-10 pt-32 pb-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            {/* Eyebrow */}
            <motion.p variants={staggerChild} className="eyebrow mb-8">
              AI Creative Strategist
            </motion.p>

            {/* Main headline */}
            <motion.h1
              variants={staggerChild}
              className="font-fraunces text-display-2xl text-ivory mb-8 max-w-4xl"
            >
              The AI{' '}
              <em className="font-fraunces not-italic italic text-gold">
                Creative
              </em>{' '}
              Edge Beauty Brands Have Been Missing.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={staggerChild}
              className="font-inter text-body-xl text-muted max-w-2xl mb-12 leading-relaxed"
            >
              I help beauty, skincare and cosmetics brands compound their growth
              through AI-native creative systems and intelligent brand
              automation.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={staggerChild}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14"
            >
              <Button asChild variant="gold" size="lg">
                <Link href="/contact">Apply for a Strategy Call</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/work" className="flex items-center gap-2.5">
                  Explore the Work
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Divider + credibility strip */}
            <motion.div variants={staggerChild}>
              <div className="hr-gold mb-6" />
              <p className="font-inter text-label-sm text-muted uppercase tracking-widest">
                AI Degree&ensp;·&ensp;Beauty & Skincare Specialist&ensp;·&ensp;Founder
                of Witlyn&ensp;·&ensp;AI-Native Production
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="text-ivory/20"
          >
            <IconChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 · CREDIBILITY BAR
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-surface pt-16 pb-0 border-b border-border"
        aria-label="Credibility pillars"
      >
        <div className="container-luxury">
          <RevealSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border">
              {credibilityPillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="px-0 lg:px-10 py-10 first:pl-0 last:pr-0"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mb-4" />
                  <p className="font-fraunces text-body-lg text-ivory mb-2 leading-snug">
                    {pillar.label}
                  </p>
                  <p className="font-inter text-label-md text-muted leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 · THE GAP
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-background" aria-label="The problem">
        <div className="container-luxury">
          <RevealSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow mb-6">The Problem</p>
              <h2 className="font-fraunces text-display-lg text-ivory mb-12">
                Most beauty brands are creating content. Few are building
                creative systems.
              </h2>

              <div className="space-y-8 text-left">
                <p className="font-inter text-body-xl text-muted leading-relaxed">
                  Generic content floods every channel — same formats, same
                  hooks, same results. Without a systematic approach to AI
                  creative, beauty brands blend into the noise rather than
                  cut through it.
                </p>
                <p className="font-inter text-body-xl text-muted leading-relaxed">
                  There is no compounding advantage in posting. The brands
                  winning right now have built infrastructure: AI-native
                  workflows that produce at scale, maintain brand consistency,
                  and learn over time.
                </p>
                <p className="font-inter text-body-xl text-muted leading-relaxed">
                  Every month without an AI creative system is a month your
                  competitors use to widen the gap. The window to build
                  first-mover advantage is closing — and it will not reopen.
                </p>
              </div>

              <div className="hr-gold mt-16" />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 · TWO PILLARS
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-pad bg-background"
        aria-label="Two service pillars"
      >
        <div className="container-luxury">
          <RevealSection>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Card 1 */}
              <div className="card-surface p-10 flex flex-col gap-6">
                <div className="text-gold">
                  <IconBrush className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-fraunces text-display-md text-ivory mb-4">
                    AI Creative Systems
                  </h3>
                  <p className="font-inter text-body-md text-muted leading-relaxed">
                    Proven through Witlyn — AI-native campaign concepting,
                    creative direction, and content systems for beauty brands
                    that want to stand apart.
                  </p>
                </div>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300 mt-auto"
                >
                  See the Work
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card 2 */}
              <div className="card-surface p-10 flex flex-col gap-6">
                <div className="text-gold">
                  <IconCircuit className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-fraunces text-display-md text-ivory mb-4">
                    AI Automation & Agents
                  </h3>
                  <p className="font-inter text-body-md text-muted leading-relaxed">
                    Custom AI automation workflows and intelligent brand agents
                    that systematize your operations — from content pipelines to
                    customer intelligence.
                  </p>
                </div>
                <Link
                  href="/consulting"
                  className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300 mt-auto"
                >
                  Learn more
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Connector note */}
            <p className="font-inter text-body-sm text-muted italic text-center max-w-2xl mx-auto">
              Together, these form a complete AI growth system — from brand
              storytelling to operational intelligence.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 · THREE WAYS TO WORK WITH ME
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-pad bg-surface"
        aria-label="Ways to work together"
      >
        <div className="container-luxury">
          <RevealSection>
            <p className="eyebrow mb-6">Engagement Options</p>
            <h2 className="font-fraunces text-display-md text-ivory mb-14 max-w-2xl">
              Three ways to work with me.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card: Consulting */}
            <RevealSection delay={0}>
              <div className="card-surface p-8 flex flex-col h-full gap-6">
                <div>
                  <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-gold border border-gold/30 rounded-full px-3 py-1 mb-6">
                    Application Only
                  </span>
                  <h3 className="font-fraunces text-body-xl text-ivory mb-3">
                    1:1 Consulting & Advisory
                  </h3>
                  <p className="font-inter text-body-md text-muted leading-relaxed">
                    Private, high-touch advisory spanning AI creative strategy,
                    campaign direction, and custom AI automation builds for your
                    brand operations.
                  </p>
                </div>
                <Link
                  href="/consulting"
                  className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300 mt-auto"
                >
                  Apply Now
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealSection>

            {/* Card: Digital Products */}
            <RevealSection delay={0.1}>
              <div className="card-surface p-8 flex flex-col h-full gap-6">
                <div>
                  <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-gold border border-gold/30 rounded-full px-3 py-1 mb-6">
                    Self-Serve
                  </span>
                  <h3 className="font-fraunces text-body-xl text-ivory mb-3">
                    Frameworks & Playbooks
                  </h3>
                  <p className="font-inter text-body-md text-muted leading-relaxed">
                    Actionable AI creative frameworks, brand strategy playbooks,
                    and ready-to-deploy AI agent kits — built for beauty brands.
                  </p>
                </div>
                <Link
                  href="/digital-products"
                  className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300 mt-auto"
                >
                  Browse Products
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealSection>

            {/* Card: Membership */}
            <RevealSection delay={0.2}>
              <div className="card-surface p-8 flex flex-col h-full gap-6">
                <div>
                  <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-gold border border-gold/30 rounded-full px-3 py-1 mb-6">
                    Limited Access
                  </span>
                  <h3 className="font-fraunces text-body-xl text-ivory mb-3">
                    The Inner Circle
                  </h3>
                  <p className="font-inter text-body-md text-muted leading-relaxed">
                    Ongoing access to monthly strategy, tools, community, and
                    direct guidance. A compounding relationship, not a one-time
                    transaction.
                  </p>
                </div>
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300 mt-auto"
                >
                  Learn More
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealSection>
          </div>

          {/* Witlyn note */}
          <RevealSection>
            <p className="font-inter text-body-sm text-muted italic text-center mt-12">
              Looking for full-service AI creative production?{' '}
              <a
                href="https://witlyn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors duration-300 not-italic"
              >
                Visit Witlyn →
              </a>
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 6 · SELECTED WORK
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-pad bg-background"
        aria-label="Selected work"
      >
        <div className="container-luxury">
          <RevealSection>
            <p className="eyebrow mb-6">Selected Work</p>
            <h2 className="font-fraunces text-display-lg text-ivory mb-16">
              Creative Systems in the Wild.
            </h2>
          </RevealSection>

          <div className="space-y-6">
            {/* Case Study 01 */}
            <RevealSection>
              <div className="card-surface overflow-hidden">
                <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                  {/* Number */}
                  <div className="p-8 flex flex-col justify-between gap-8">
                    <span className="eyebrow text-gold/60">01</span>
                    <div className="space-y-2">
                      <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-ivory/40 border border-border rounded-full px-3 py-1">
                        Campaign Direction
                      </span>
                      <br />
                      <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-ivory/40 border border-border rounded-full px-3 py-1 mt-2">
                        AI Creative System
                      </span>
                    </div>
                  </div>
                  {/* Center */}
                  <div className="p-8 flex flex-col justify-center gap-4">
                    <h3 className="font-fraunces text-display-md text-ivory">
                      Solaé
                    </h3>
                    <p className="font-inter text-body-md text-muted italic">
                      [PLACEHOLDER: specify] — *Concept / Spec Work
                    </p>
                    <p className="font-inter text-body-lg text-ivory/70">
                      AI-native skincare campaign from zero to launch.
                    </p>
                    <Link
                      href="/work/solae"
                      className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300 mt-2"
                    >
                      View Case Study
                      <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  {/* Image placeholder */}
                  <div className="p-4 flex items-center justify-center">
                    <Placeholder
                      label="Case Study Image — Solaé"
                      className="w-full aspect-video"
                    />
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Case Study 02 */}
            <RevealSection delay={0.08}>
              <div className="card-surface overflow-hidden">
                <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-8 flex flex-col justify-between gap-8">
                    <span className="eyebrow text-gold/60">02</span>
                    <div className="space-y-2">
                      <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-ivory/40 border border-border rounded-full px-3 py-1">
                        Brand Strategy
                      </span>
                      <br />
                      <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-ivory/40 border border-border rounded-full px-3 py-1 mt-2">
                        Creative Direction
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center gap-4">
                    <h3 className="font-fraunces text-display-md text-ivory">
                      Vyraa
                    </h3>
                    <p className="font-inter text-body-md text-muted italic">
                      [PLACEHOLDER: specify] — *Concept / Spec Work
                    </p>
                    <p className="font-inter text-body-lg text-ivory/70">
                      Repositioning a premium beauty brand for the AI era.
                    </p>
                    <Link
                      href="/work/vyraa"
                      className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300 mt-2"
                    >
                      View Case Study
                      <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <Placeholder
                      label="Case Study Image — Vyraa"
                      className="w-full aspect-video"
                    />
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Case Study 03 */}
            <RevealSection delay={0.16}>
              <div className="card-surface overflow-hidden">
                <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-8 flex flex-col justify-between gap-8">
                    <span className="eyebrow text-gold/60">03</span>
                    <div className="space-y-2">
                      <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-ivory/40 border border-border rounded-full px-3 py-1">
                        Content System
                      </span>
                      <br />
                      <span className="inline-block font-inter text-label-sm uppercase tracking-widest text-ivory/40 border border-border rounded-full px-3 py-1 mt-2">
                        AI Automation
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center gap-4">
                    <h3 className="font-fraunces text-display-md text-ivory">
                      Lipéa
                    </h3>
                    <p className="font-inter text-body-md text-muted italic">
                      [PLACEHOLDER: specify] — *Concept / Spec Work
                    </p>
                    <p className="font-inter text-body-lg text-ivory/70">
                      Building a content engine that scales without a team.
                    </p>
                    <Link
                      href="/work/lipea"
                      className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300 mt-2"
                    >
                      View Case Study
                      <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <Placeholder
                      label="Case Study Image — Lipéa"
                      className="w-full aspect-video"
                    />
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* CTA */}
          <RevealSection>
            <div className="mt-14 flex justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/work">View All Work</Link>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 7 · METHOD
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-surface" aria-label="The process">
        <div className="container-luxury">
          <RevealSection>
            <p className="eyebrow mb-6">The Process</p>
            <h2 className="font-fraunces text-display-md text-ivory mb-16 max-w-2xl">
              A clear path from first conversation to measurable growth.
            </h2>
          </RevealSection>

          <RevealSection>
            <div className="relative">
              {/* Connector line — desktop only */}
              <div
                className="absolute hidden lg:block top-7 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(201,166,107,0.25) 15%, rgba(201,166,107,0.25) 85%, transparent)',
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
                {methodSteps.map((step) => (
                  <div key={step.num} className="flex flex-col gap-4">
                    <span className="font-fraunces text-display-md text-gold-gradient font-light leading-none">
                      {step.num}
                    </span>
                    <h3 className="font-fraunces text-body-xl text-ivory">
                      {step.name}
                    </h3>
                    <p className="font-inter text-body-md text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 8 · THE DIAGNOSTIC
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-pad bg-background"
        aria-label="Free diagnostic"
      >
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <RevealSection>
              <p className="eyebrow mb-6">Free Diagnostic</p>
              <h2 className="font-fraunces text-display-md text-ivory mb-6">
                Get a free AI-generated{' '}
                <em className="italic text-gold">Gap & Opportunity</em>{' '}
                Snapshot.
              </h2>
              <p className="font-inter text-body-lg text-muted mb-12 leading-relaxed">
                A personalized analysis of your brand's AI creative readiness,
                growth gaps, and quick-win opportunities — built specifically
                for your brand in 60 seconds.
              </p>
            </RevealSection>

            <RevealSection delay={0.1}>
              {diagnosticStatus === 'success' ? (
                <div className="card-surface p-10 text-center">
                  <div className="w-2 h-2 rounded-full bg-gold mx-auto mb-6" />
                  <p className="font-fraunces text-body-xl text-ivory mb-3">
                    Your Gap Report is on its way.
                  </p>
                  <p className="font-inter text-body-md text-muted">
                    We'll email your report within minutes — no spam, no
                    obligation.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleDiagnosticSubmit}
                  className="card-surface p-8 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Brand Name"
                      placeholder="e.g. Lumière Beauty"
                      value={diagnosticForm.brandName}
                      onChange={(e) =>
                        setDiagnosticForm((f) => ({
                          ...f,
                          brandName: e.target.value,
                        }))
                      }
                      required
                    />
                    <Input
                      label="Website URL"
                      type="url"
                      placeholder="https://yourbrand.com"
                      value={diagnosticForm.websiteUrl}
                      onChange={(e) =>
                        setDiagnosticForm((f) => ({
                          ...f,
                          websiteUrl: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Input
                    label="Instagram Handle (optional)"
                    placeholder="@yourbrand"
                    value={diagnosticForm.instagramHandle}
                    onChange={(e) =>
                      setDiagnosticForm((f) => ({
                        ...f,
                        instagramHandle: e.target.value,
                      }))
                    }
                  />
                  <Textarea
                    label="Primary Growth Challenge"
                    placeholder="What's the biggest creative or growth challenge you're facing right now?"
                    rows={3}
                    value={diagnosticForm.growthChallenge}
                    onChange={(e) =>
                      setDiagnosticForm((f) => ({
                        ...f,
                        growthChallenge: e.target.value,
                      }))
                    }
                    required
                  />

                  {diagnosticStatus === 'error' && (
                    <p className="font-inter text-label-sm text-red-400/80">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={diagnosticStatus === 'loading'}
                  >
                    {diagnosticStatus === 'loading'
                      ? 'Analyzing your brand…'
                      : 'Generate My Report →'}
                  </Button>

                  <p className="font-inter text-label-sm text-muted text-center">
                    We'll email your report within minutes — no spam, no
                    obligation.
                  </p>
                </form>
              )}
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 9 · ABOUT TEASER
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-surface" aria-label="About Sakib">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text block */}
            <RevealSection>
              <p className="eyebrow mb-6">About Sakib</p>
              <h2 className="font-fraunces text-display-md text-ivory mb-8">
                AI isn't a tool I use. It's the lens I see through.
              </h2>

              <div className="space-y-6 mb-10">
                <p className="font-inter text-body-lg text-muted leading-relaxed">
                  <Placeholder
                    label="2–3 sentence founder story — AI degree, why beauty/skincare, what drove you here"
                    className="text-left text-body-sm"
                  />
                </p>
                <p className="font-inter text-body-lg text-muted leading-relaxed">
                  Witlyn, the studio I founded, has become proof that AI-native
                  creative isn't a gimmick — it's a growth system.
                </p>
              </div>

              <Button asChild variant="ghost">
                <Link href="/about" className="flex items-center gap-2">
                  Read the Full Story
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </RevealSection>

            {/* Headshot placeholder */}
            <RevealSection delay={0.15}>
              <Placeholder
                label="Headshot image — Sakib Ziad"
                className="w-full aspect-[4/5] rounded-2xl"
              />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 10 · INSIGHTS TEASER
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-pad bg-background"
        aria-label="Insights and articles"
      >
        <div className="container-luxury">
          <RevealSection>
            <p className="eyebrow mb-6">Insights</p>
            <h2 className="font-fraunces text-display-md text-ivory mb-16 max-w-xl">
              Thinking out loud on AI, beauty, and brand growth.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Article 1 */}
            <RevealSection delay={0}>
              <div className="card-surface p-8 flex flex-col gap-5 h-full">
                <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
                  AI Creative
                </span>
                <div className="flex-1">
                  <Placeholder
                    label="Article Title 1"
                    className="mb-4 text-body-md"
                  />
                  <p className="font-inter text-label-md text-muted mb-3">
                    Sep 2026
                  </p>
                  <p className="font-inter text-body-sm text-muted leading-relaxed">
                    [PLACEHOLDER: 1-line article excerpt — Article 1]
                  </p>
                </div>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300"
                >
                  Read
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealSection>

            {/* Article 2 */}
            <RevealSection delay={0.1}>
              <div className="card-surface p-8 flex flex-col gap-5 h-full">
                <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
                  Brand Strategy
                </span>
                <div className="flex-1">
                  <Placeholder
                    label="Article Title 2"
                    className="mb-4 text-body-md"
                  />
                  <p className="font-inter text-label-md text-muted mb-3">
                    Sep 2026
                  </p>
                  <p className="font-inter text-body-sm text-muted leading-relaxed">
                    [PLACEHOLDER: 1-line article excerpt — Article 2]
                  </p>
                </div>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300"
                >
                  Read
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealSection>

            {/* Article 3 */}
            <RevealSection delay={0.2}>
              <div className="card-surface p-8 flex flex-col gap-5 h-full">
                <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
                  AI Automation
                </span>
                <div className="flex-1">
                  <Placeholder
                    label="Article Title 3"
                    className="mb-4 text-body-md"
                  />
                  <p className="font-inter text-label-md text-muted mb-3">
                    Sep 2026
                  </p>
                  <p className="font-inter text-body-sm text-muted leading-relaxed">
                    [PLACEHOLDER: 1-line article excerpt — Article 3]
                  </p>
                </div>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 font-inter text-label-md text-gold hover:text-gold-light transition-colors duration-300"
                >
                  Read
                  <IconArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealSection>
          </div>

          {/* Newsletter */}
          <RevealSection>
            <div className="border-t border-border pt-12">
              <p className="font-inter text-label-md text-muted text-center mb-6">
                Join{' '}
                <span className="text-ivory/60">
                  [PLACEHOLDER: X] strategists
                </span>{' '}
                following the intersection of AI and beauty.
              </p>

              {newsletterStatus === 'success' ? (
                <p className="font-fraunces text-body-lg text-gold text-center">
                  You're in. We'll be in touch.
                </p>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 rounded-xl px-4 py-3 font-inter text-body-md text-ivory placeholder:text-ivory/25 bg-surface border border-ivory/20 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-300"
                  />
                  <Button
                    type="submit"
                    variant="gold"
                    size="md"
                    disabled={newsletterStatus === 'loading'}
                  >
                    {newsletterStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
                  </Button>
                </form>
              )}

              {newsletterStatus === 'error' && (
                <p className="font-inter text-label-sm text-red-400/80 text-center mt-3">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 11 · FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-pad bg-background border-t border-border"
        aria-label="Final call to action"
      >
        <div className="container-luxury">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-fraunces text-display-lg text-ivory mb-6">
                Ready to build your AI creative edge?
              </h2>
              <p className="font-inter text-body-lg text-muted mb-12">
                Applications are reviewed personally. Limited spots available.
              </p>
              <Button asChild variant="gold" size="xl">
                <Link href="/contact">Apply for a Strategy Call</Link>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 12 · FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-pad bg-surface border-t border-border"
        aria-label="Frequently asked questions"
      >
        <div className="container-luxury">
          <RevealSection>
            <p className="eyebrow mb-6">Common Questions</p>
            <h2 className="font-fraunces text-display-md text-ivory mb-14 max-w-xl">
              Answered directly.
            </h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="max-w-3xl divide-y divide-border border-t border-border">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  )
}
