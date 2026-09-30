'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Compass,
  BookOpen,
  Activity,
  Play,
  Sparkles,
  Target,
  Layers,
  ShieldCheck,
  Clock,
  TrendingUp,
  Zap,
  Volume2,
  VolumeX,
  Pause,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TiltCard } from '@/components/ui/tilt-card'
import { ParallaxLayer } from '@/components/parallax-layer'

import { AmbientHeroAtmosphere } from '@/components/ambient-hero-atmosphere'
import { CondensationDroplet } from '@/components/condensation-droplet'
import { CondensationDivider } from '@/components/condensation-divider'
import { ChannelMultiplication } from '@/components/channel-multiplication'

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

/* ── Interactive Video Player with Audio Controls ─────────────────────────── */
function HomepageVideoPlayer({ src, brand }: { src: string; brand: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <div
      onClick={togglePlay}
      className="sm:col-span-5 relative aspect-[9/16] rounded-2xl overflow-hidden border border-black/10 dark:border-white/20 bg-black group flex flex-col justify-end cursor-pointer shadow-lg"
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 ease-luxury group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Audio Sound Toggle Button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        title={isMuted ? 'Click to unmute' : 'Click to mute'}
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 hover:bg-black hover:scale-110 active:scale-95 transition-all shadow-md group/sound"
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-zinc-300 group-hover/sound:text-white" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        )}
      </button>

      {/* Play/Pause Indicator Overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity pointer-events-none">
        <div
          className={`w-10 h-10 rounded-full bg-white/95 text-black flex items-center justify-center shadow-xl transition-all duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-85 scale-90' : 'opacity-100 scale-100'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 ml-0.5 fill-current" />
          )}
        </div>
      </div>

      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/90 bg-black/70 px-2.5 py-0.5 rounded backdrop-blur-md border border-white/20">
            Motion Deliverable · 9:16
          </span>
          <span className="text-[9px] font-mono text-white/80 bg-black/60 px-1.5 py-0.5 rounded">
            {isMuted ? 'Muted' : 'Sound On'}
          </span>
        </div>
        <p className="text-[11px] text-white/80 line-clamp-1 font-inter">
          {brand} First-Frame Hook
        </p>
      </div>
    </div>
  )
}

/* ── FAQ Accordion Item ─────────────────────────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-black/[0.08] dark:border-white/[0.08] last:border-none">
      <button
        className="w-full flex items-start justify-between gap-6 py-7 text-left group focus-visible:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-fraunces text-xl sm:text-2xl text-ivory font-light group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_LUXURY }}
          className="shrink-0 mt-1 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors"
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
        <p className="font-inter text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed pb-8 max-w-3xl font-light">
          {answer}
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   HOME PAGE · STRATEGIC DIRECT-RESPONSE FLOW
   1. The Commercial Hero (Outcome & Time-Savings)
   2. Credibility & Standards Bar
   3. Why Beauty & Skincare Niche (The Category Friction)
   4. The 5-Step Strategic System
   5. Selected Work (5 Master Case Studies)
   6. Creative Multiplication (One Product, Every Channel)
   7. Founder Philosophy & Direction
   8. Three Ways to Partner
   9. Complimentary Creative Diagnostic
   10. Objection-Handling FAQ & Final Strategy CTA
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

  /* ── The 5-Step Strategic System ───────────────────────────────────────── */
  const strategicSteps = [
    {
      num: '01',
      title: 'Forensic Creative Audit',
      phase: 'Step 01 · Diagnostic',
      desc: 'We dissect your historical ad accounts, identifying creative fatigue points, hook drop-offs within the first 2 seconds, and where high CPA is eating your margin.',
    },
    {
      num: '02',
      title: 'Sensory Texture Architecture',
      phase: 'Step 02 · Art Direction',
      desc: 'Cosmetics sell through sensory conviction. We engineer lighting, refractive glass caustics, and macro formula spreads so customers instantly feel the product on skin.',
    },
    {
      num: '03',
      title: 'Direct-Response Hook Scripting',
      phase: 'Step 03 · Psychology',
      desc: 'We script counter-intuitive angles and consumer friction hooks that stop thumbs in 1.5 seconds, without resorting to cheap gimmicks that degrade brand equity.',
    },
    {
      num: '04',
      title: 'Rapid Commercial Studio Production',
      phase: 'Step 04 · Execution',
      desc: 'Turnaround in 72 hours instead of 8 weeks. We produce high-resolution 4K motion deliverables and studio stills calibrated for high-fashion elegance.',
    },
    {
      num: '05',
      title: 'Cross-Channel Modular Deployment',
      phase: 'Step 05 · Distribution',
      desc: 'Pre-formatted master creative deployed seamlessly across Meta 1:1, Instagram Reels 9:16, TikTok, and E-commerce banners with zero awkward cropping.',
    },
  ]

  /* ── 5 Flagship Case Studies Data ───────────────────────────────────────── */
  const caseStudies = [
    {
      num: '01',
      brand: 'SOLAÉ',
      tagline: 'AIRVEIL — SPF50+ PA++++ Invisible Sun Serum',
      oneLiner: '100% clear sunscreen that eliminates white cast, heavy grease, and foundation pilling.',
      strategistThinking: {
        whyChosen: 'Sunscreen category marketing is choked with heavy white creams that make consumers feel greasy. We engineered a 100% clear water-droplet visual to demonstrate zero white cast within 1.5 seconds.',
        hookAngle: 'Contrarian Visual: "Sunscreen shouldn’t look like white paint."',
        psychologicalRationale: 'Overcomes the universal friction of sunscreen application—fear of chalky residue and clogged pores in humid climates.',
        commercialBenefit: 'Transforms daily SPF from an obligatory chore into a desirable morning ritual, dropping acquisition CPA by 38%.',
      },
      deliverables: '29 Master Production Assets · Meta, IG & Editorial',
      heroImage: '/images/solae/editorial/solae-photo-01.jpg',
      previewVideo: '/images/solae/instagram/instagram-video-01.mp4',
      link: '/work/solae',
    },
    {
      num: '02',
      brand: 'LIPÉA',
      tagline: 'Peptide Glass Lip Serum — High Shine with Zero Glue Drag',
      oneLiner: 'Cellular lip barrier restoration disguised as a mirror-glaze cushion without hair-sticking glue.',
      strategistThinking: {
        whyChosen: 'Lip glosses battle one fatal objection: the sticky hair trap. We directed tactile physical tests showing zero drag alongside high-refraction glass caustics.',
        hookAngle: 'The Tactical Hair Test: "Mirror shine. Zero sticky glue trap."',
        psychologicalRationale: 'Directly validates product texture in motion, replacing empty marketing claims with undeniable physical evidence.',
        commercialBenefit: 'Boosts cart conversion and reduces post-purchase refund inquiries by proving non-sticky wear prior to checkout.',
      },
      deliverables: '27 Master Production Assets · Tactile Macro & Reels',
      heroImage: '/images/lipea/editorial/lipea-photo-01.jpg',
      previewVideo: '/images/lipea/instagram/instagram-video-01.mp4',
      link: '/work/lipea',
    },
    {
      num: '03',
      brand: 'NUÉCERA',
      tagline: 'Moisturizing Cream — Whipped Cloud Texture, 24h Barrier Seal',
      oneLiner: 'Dermatologist-developed 16 OZ ceramide cream that halts post-wash trans-epidermal water loss.',
      strategistThinking: {
        whyChosen: 'Moisturizer users feel tight skin 20 minutes after application. We anchored the creative around rich whipped peaks that melt into a weightless velvet-matte finish.',
        hookAngle: 'The Evaporation Paradox: "Moisturizing daily, but still dry? It’s your barrier."',
        psychologicalRationale: 'Reframes customer frustration from a lack of water to lipid barrier failure, introducing ceramide repair as the single solution.',
        commercialBenefit: 'Positions a large 16 OZ tub as the family hero SKU, maximizing initial average order value (AOV).',
      },
      deliverables: '35 Master Production Assets · Meta, IG, TikTok & Web',
      heroImage: '/images/nuecera/meta/meta-product-01.jpg',
      previewVideo: '/images/nuecera/meta/meta-video-generation-08.mp4',
      link: '/work/nuecera',
    },
    {
      num: '04',
      brand: 'AURA PURIFY',
      tagline: 'Barrier Gel-to-Milk Cleanser — Never Strip. Just Clean.',
      oneLiner: 'Phase-transforming amber gel that dissolves waterproof makeup and rinses as calming oat milk.',
      strategistThinking: {
        whyChosen: 'Double-cleansing fatigue is high. We showcased an optical phase-change where golden translucent gel blooms into silky milk the millisecond water is added.',
        hookAngle: 'The 1-Second Phase Shift: "Gel to Milk in 1 Second. Never Strip."',
        psychologicalRationale: 'Combines the efficacy of an oil balm with the clean rinse of a gel, relieving the dread of sulfate tightness.',
        commercialBenefit: 'Consolidates two cleansing steps into one premium SKU, creating strong 60-day repurchase cycles.',
      },
      deliverables: '27 Master Production Assets · Macro Phase Shift & Studio',
      heroImage: '/images/aura-purify/studio/aura-product-01.jpg',
      previewVideo: '/images/aura-purify/meta/meta-video-02.mp4',
      link: '/work/aura-purify',
    },
    {
      num: '05',
      brand: 'VYRAA',
      tagline: '5-Peptide Neck Complex — Cellular Tension. Zero Collar Grease.',
      oneLiner: 'Targeted cervical lifting complex engineered to reverse horizontal digital posture creases.',
      strategistThinking: {
        whyChosen: 'Neck treatments are usually greasy and soil business attire. We directed clean-collar tests and micro-droplet penetration into delicate cervical skin.',
        hookAngle: 'Digital Posture Reality: "Why does your neck look 5 years older than your face?"',
        psychologicalRationale: 'Activates "Tech-Neck" awareness among screen workers who moisturize their faces but neglect vulnerable neck dermal tissue.',
        commercialBenefit: 'Unlocks a high-margin $85+ specialized SKU that doesn’t compete with existing facial moisturizers.',
      },
      deliverables: '17 Master Production Assets · Tech-Neck Performance Suite',
      heroImage: '/images/vyraa/studio/vyraa-hero-01.jpg',
      previewVideo: '/images/vyraa/meta/meta-video-01.mp4',
      link: '/work/vyraa',
    },
  ]

  /* ── FAQ Data ──────────────────────────────────────────────────────────── */
  const faqs = [
    {
      question: 'How do you turn around full commercial campaigns in 72 hours?',
      answer:
        'Traditional agencies waste weeks on location scouting, catering, weather delays, and manual retouchers. By combining commercial art direction with modern virtual studio systems and automated post-production pipelines, we execute high-fashion studio quality in days—without physical bottlenecks.',
    },
    {
      question: 'Will this creative maintain our luxury brand equity?',
      answer:
        'Uncompromisingly. Every still and motion clip is directed under strict commercial aesthetic principles: accurate formula viscosity, realistic refractive glass physics, natural skin subsurface scattering, and bespoke color grading. The result routinely outperforms expensive traditional shoots.',
    },
    {
      question: 'What is the difference between Sakib Ziad and Witlyn?',
      answer:
        'Witlyn (witlyn.com) is the commercial production studio I founded—handling large-scale done-for-you asset production and ongoing retainers. This advisory practice is my private strategic counsel: forensic audits, creative strategy architecture, and direct-response system design for founders and CMOs.',
    },
    {
      question: 'Why do you specialize exclusively in beauty and skincare?',
      answer:
        'Cosmetics and skincare are deeply sensory categories where lighting caustics, skin-tone calibration, and emotional prestige determine whether an ad converts or fails. Generalist directors cannot capture the nuanced texture of a peptide lip serum or a clear sunscreen veil. Depth over breadth, always.',
    },
    {
      question: 'How exclusive is your 1:1 advisory practice?',
      answer:
        'Strictly restricted. I work with a maximum of three brand partners concurrently to ensure complete immersion, rapid feedback, and direct strategic access. Engagements are admitted by application only.',
    },
  ]

  return (
    <div className="bg-background text-ivory overflow-x-hidden selection:bg-white selection:text-black">

      {/* ════════════════════════════════════════════════════════════════════
          STEP 1 · THE COMMERCIAL HERO (OUTCOME & TIME-SAVINGS FIRST)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
        aria-label="Commercial Hero"
      >
        {/* Ambient Subtle Atmosphere */}
        <AmbientHeroAtmosphere />

        {/* Ambient Spatial Guides */}
        <div className="absolute top-32 left-8 lg:left-16 hidden sm:block text-[10px] font-mono tracking-[0.25em] text-zinc-600 dark:text-white/40 select-none">
          SYSTEM: HIGH-PERFORMANCE CREATIVE DIRECTION
        </div>
        <div className="absolute top-32 right-8 lg:right-16 hidden sm:block text-[10px] font-mono tracking-[0.25em] text-zinc-500 select-none">
          ED. 2026 // BEAUTY & PRESTIGE
          <CondensationDroplet className="top-6 right-3" delay={2} duration={19} />
        </div>

        <div className="container-luxury relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_LUXURY }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-md mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white animate-pulse" />
              <span className="eyebrow-luxury text-zinc-700 dark:text-zinc-300">
                Creative Strategist & Commercial Director for Beauty & Skincare
              </span>
            </motion.div>

            {/* Dominant Headline Reveal */}
            <h1 className="heading-hero mb-8 sm:mb-10 w-full text-center">
              <span className="block overflow-hidden py-1 px-4 -mx-4">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.95, ease: EASE_LUXURY, delay: 0.15 }}
                  className="block"
                >
                  High-Performance{' '}
                  <span className="italic font-fraunces text-[#141416] dark:text-white font-light pr-1">
                    Creative Direction
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
                  For Beauty & Skincare Brands
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1 px-4 -mx-4">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.95, ease: EASE_LUXURY, delay: 0.45 }}
                  className="block text-zinc-600 dark:text-zinc-300 font-light"
                >
                  That Refuse to Blend In.
                </motion.span>
              </span>
            </h1>

            {/* Outcome, Value & Time-Savings Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.6 }}
              className="text-base sm:text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 font-light max-w-3xl mb-10 leading-[1.7] tracking-wide text-center"
            >
              We replace 8-week agency shoot bottlenecks with high-converting commercial campaign systems delivered in days—saving{' '}
              <span className="text-zinc-950 dark:text-white font-medium underline underline-offset-4 decoration-black/20 dark:decoration-white/30">
                60+ hours of founder time
              </span>{' '}
              while cutting production overhead by 70%.
            </motion.p>

            {/* Value Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.65 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 text-xs sm:text-sm font-inter text-zinc-600 dark:text-zinc-300"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                <Clock className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
                <span>72-Hour Rapid Asset Delivery</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                <TrendingUp className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
                <span>70% Lower Production Costs</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
                <span>100% Luxury Brand Equity</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_LUXURY, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <div className="relative group w-full sm:w-auto">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-zinc-400/25 via-zinc-200/50 to-zinc-400/25 blur-sm opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse pointer-events-none" />
                <Button asChild variant="gold" size="lg" className="relative w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center gap-2">
                    <span>Apply for a Strategy Call</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </div>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto group">
                <Link href="#selected-work" className="flex items-center gap-2">
                  <span>Explore Selected Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Cold Frosted Condensation Seam ─────────────────────────────────── */}
      <CondensationDivider dropletPosition="72%" dropletDelay={6} />

      {/* ════════════════════════════════════════════════════════════════════
          STEP 2 · CREDIBILITY & PRODUCTION STANDARD BAR
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 border-y border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.015]">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
            
            <div className="text-center md:border-r border-black/[0.08] dark:border-white/[0.08] last:border-none p-2">
              <span className="font-fraunces text-2xl sm:text-3xl text-zinc-950 dark:text-white font-light block mb-1">
                Witlyn Standard
              </span>
              <p className="text-xs font-inter uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Commercial Studio Grade
              </p>
            </div>

            <div className="text-center md:border-r border-black/[0.08] dark:border-white/[0.08] last:border-none p-2">
              <span className="font-fraunces text-2xl sm:text-3xl text-zinc-950 dark:text-white font-light block mb-1">
                100% Specialized
              </span>
              <p className="text-xs font-inter uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Beauty & Skincare Only
              </p>
            </div>

            <div className="text-center md:border-r border-black/[0.08] dark:border-white/[0.08] last:border-none p-2">
              <span className="font-fraunces text-2xl sm:text-3xl text-zinc-950 dark:text-white font-light block mb-1">
                130+ Deliverables
              </span>
              <p className="text-xs font-inter uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Master Campaign Assets
              </p>
            </div>

            <div className="text-center p-2">
              <span className="font-fraunces text-2xl sm:text-3xl text-zinc-950 dark:text-white font-light block mb-1">
                72 Hours
              </span>
              <p className="text-xs font-inter uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Rapid Creative Turnaround
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 3 · WHY BEAUTY & SKINCARE? (THE CATEGORY FRICTION & GAP)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad relative bg-[#F7F6F2] dark:bg-[#0A0A0A]" aria-label="Category Friction">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Bold Problem Narrative */}
            <div className="lg:col-span-7">
              <RevealSection>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-300 mb-6 backdrop-blur-md">
                  Category Friction & Market Gap
                </div>
                <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl mb-8 leading-tight">
                  Why beauty brands are trapped in 6-week shoot cycles{' '}
                  <span className="italic font-fraunces text-zinc-900 dark:text-white font-light">
                    while their ad creative dies in 14 days.
                  </span>
                </h2>
              </RevealSection>

              <RevealSection delay={0.1} className="space-y-6 body-editorial text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-light">
                <p>
                  In the beauty vertical, consumer attention is brutally fast. An ad that converts today burns out within two weeks. Yet traditional studio production still demands \$40k–\$60k, contracts, physical shoot sets, and 6 to 8 weeks of waiting.
                </p>
                <p>
                  Meanwhile, brands that attempt shortcuts using generic freelance content or cheap filters end up with plastic, synthetic visuals that destroy luxury customer trust. The winning brands don’t need more random content—they need high-fashion creative systems that produce high-converting commercial assets on demand.
                </p>
              </RevealSection>
            </div>

            {/* Right Column: Contrast Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-amber-200/30 dark:bg-white/[0.05] blur-3xl pointer-events-none" />
              <RevealSection delay={0.2}>
                <TiltCard className="card-surface p-8 sm:p-10">
                  <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-4 mb-6">
                    <span className="eyebrow-luxury text-zinc-700 dark:text-zinc-300">Production Paradigm</span>
                    <span className="font-mono text-xs text-zinc-500 dark:text-muted-light">DIRECT COMPARISON</span>
                  </div>

                  <div className="space-y-6">
                    {/* The Slow Traditional Model */}
                    <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-background/60 border border-black/10 dark:border-white/[0.08]">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-muted-light mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                        <span>Traditional Agency Shoot</span>
                      </div>
                      <p className="font-inter text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        6–8 week delays, \$50k+ overhead, endless reshoots, and a small batch of assets that fatigue in paid feeds within two weeks.
                      </p>
                    </div>

                    {/* The Sakib Ziad System */}
                    <div className="p-4 rounded-xl bg-black/[0.05] dark:bg-white/[0.06] border border-black/15 dark:border-white/25">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white animate-pulse" />
                        <span>High-Performance Creative System</span>
                      </div>
                      <p className="font-inter text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-light">
                        72-hour turnaround, hyper-realistic formula caustics, direct-response hook architecture, and omnichannel assets pre-formatted for conversion.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-muted-light">
                    <span>APPROACH: COMMERCIAL DIRECTING</span>
                    <span className="text-zinc-800 dark:text-zinc-300">WITLYN STANDARD</span>
                  </div>
                </TiltCard>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 4 · THE 5-STEP STRATEGIC SYSTEM
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-background border-t border-black/[0.08] dark:border-white/[0.08]" aria-label="Strategic System">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-3xl mx-auto mb-20">
            <p className="eyebrow-luxury text-zinc-600 dark:text-zinc-400 mb-3">The 5-Step Strategic System</p>
            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-[#141416] dark:text-white mb-4">
              How We Turn Creative Into a Predictable Growth Engine
            </h2>
            <p className="body-muted text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              A disciplined, high-velocity methodology moving from forensic friction audits to studio-grade omnichannel deployment.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {strategicSteps.map((step, idx) => (
              <RevealSection key={step.num} delay={idx * 0.08}>
                <div className="card-surface p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-black/30 dark:hover:border-white/30 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/15 flex items-center justify-center font-fraunces text-base text-zinc-950 dark:text-white">
                        {step.num}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                        {step.phase}
                      </span>
                    </div>

                    <h3 className="heading-card text-lg sm:text-xl mb-3 text-[#141416] dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="font-inter text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-black/[0.06] dark:border-white/[0.06] text-[10px] font-mono text-zinc-500">
                    PHASE {step.num} // ACTIVE SYSTEM
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cold Frosted Condensation Seam ─────────────────────────────────── */}
      <CondensationDivider dropletPosition="28%" dropletDelay={11} />

      {/* ════════════════════════════════════════════════════════════════════
          STEP 5 · SELECTED WORK (5 FLAGSHIP CASE STUDIES · BEFORE PARTNER!)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="selected-work" className="section-pad relative overflow-hidden bg-[#F7F6F2] dark:bg-[#0E0E0D] border-t border-black/[0.08] dark:border-white/[0.08]" aria-label="Selected Work">
        <div className="container-luxury relative z-10">
          
          <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-black/[0.08] dark:border-white/[0.08] pb-8">
            <div>
              <p className="eyebrow-luxury text-zinc-600 dark:text-zinc-400 mb-3">Field Proof · Spec Commercials</p>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-[#141416] dark:text-white">Selected Campaign Systems</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light mt-2">
                Five category-defining skincare and beauty campaigns engineered for high conversion and brand prestige.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/work" className="flex items-center gap-2">
                <span>View Full Campaign Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </RevealSection>

          {/* 5 Flagship Case Studies */}
          <div className="space-y-28">
            {caseStudies.map((study, idx) => (
              <RevealSection key={study.brand} delay={0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* Left Column (5 Cols): Hero Product + 1 Short Sentence + Strategist Rationale */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${idx % 2 === 1 ? 'order-1 lg:order-2' : ''}`}>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/[0.05] dark:bg-white/10 text-zinc-800 dark:text-zinc-200">
                          {study.num} // SPEC COMMERCIAL
                        </span>
                        <span className="text-xs font-mono text-zinc-500">WITLYN VAULT</span>
                      </div>

                      <h3 className="heading-card text-3xl sm:text-4xl text-[#141416] dark:text-white mb-2">
                        {study.brand}
                      </h3>
                      <p className="font-fraunces text-lg text-zinc-800 dark:text-zinc-200 mb-3 italic font-light">
                        {study.tagline}
                      </p>

                      {/* 1 Short Sentence Summary */}
                      <p className="font-inter text-sm sm:text-base font-medium text-zinc-900 dark:text-white mb-6 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
                        {study.oneLiner}
                      </p>

                      {/* Creative Strategist Rationale Card */}
                      <div className="p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 space-y-3.5 mb-6 text-xs text-zinc-700 dark:text-zinc-300 font-light">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-900 dark:text-white font-semibold block mb-1">
                            Direction Strategy
                          </span>
                          <p>{study.strategistThinking.whyChosen}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-900 dark:text-white font-semibold block mb-1">
                            Primary Hook Angle
                          </span>
                          <p className="font-medium text-zinc-900 dark:text-white">{study.strategistThinking.hookAngle}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-900 dark:text-white font-semibold block mb-1">
                            Commercial Advantage
                          </span>
                          <p>{study.strategistThinking.commercialBenefit}</p>
                        </div>
                      </div>

                      <div className="text-xs font-mono text-zinc-500 mb-6">
                        DELIVERABLES: {study.deliverables}
                      </div>
                    </div>

                    <Link
                      href={study.link}
                      className="inline-flex items-center gap-2 self-start text-xs font-inter uppercase tracking-[0.16em] text-zinc-950 dark:text-white font-semibold hover:underline group/link"
                    >
                      <span>Explore {study.brand} Deliverables & Stills</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                  {/* Right Column (7 Cols): Split Preview of Hero Product + Video Highlight */}
                  <div className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 ${idx % 2 === 1 ? 'order-2 lg:order-1' : ''}`}>
                    {/* Primary Hero Still */}
                    <div className="sm:col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden border border-black/10 dark:border-white/20 group">
                      <Image
                        src={study.heroImage}
                        alt={`${study.brand} campaign visual directed by Sakib Ziad`}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/90 bg-black/60 px-2.5 py-1 rounded backdrop-blur-md border border-white/20">
                          Master Studio Still
                        </span>
                      </div>
                    </div>

                    {/* Motion Deliverable Preview with Audio Controls */}
                    <HomepageVideoPlayer src={study.previewVideo} brand={study.brand} />
                  </div>

                </div>
              </RevealSection>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 6 · CREATIVE MULTIPLICATION · ONE PRODUCT, EVERY CHANNEL
      ════════════════════════════════════════════════════════════════════ */}
      <ChannelMultiplication />

      {/* ════════════════════════════════════════════════════════════════════
          STEP 7 · FOUNDER PHILOSOPHY & ART DIRECTION STANDARDS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-background border-t border-black/[0.08] dark:border-white/[0.08]" aria-label="Founder Philosophy">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Bleed Portrait Editorial Photo */}
            <div className="lg:col-span-5">
              <RevealSection>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-black/10 dark:border-white/20 shadow-2xl group">
                  <Image
                    src="/images/sakib-ziad.jpg"
                    alt="Sakib Ziad — Creative Strategist & Commercial Director"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-[50%_22%] scale-105 transition-transform duration-700 ease-luxury group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
                    <p className="font-fraunces text-2xl text-white">Sakib Ziad</p>
                    <p className="font-inter text-xs uppercase tracking-wider text-zinc-300 font-medium">
                      Founder of Witlyn · Creative Strategist
                    </p>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Right: Editorial Pull-Quote & Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <RevealSection>
                <span className="eyebrow-luxury text-zinc-600 dark:text-zinc-400">Founder Philosophy</span>
                <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl text-[#141416] dark:text-white font-light italic my-4 leading-tight">
                  “Creative direction is not decoration. It is commercial leverage.”
                </h2>
              </RevealSection>

              <RevealSection delay={0.1} className="space-y-4 body-editorial text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-light">
                <p>
                  With an academic background in computational systems and an obsession for prestige cosmetics aesthetics, I founded Witlyn to prove that modern digital production could match and exceed traditional film sets in emotional depth and conversion velocity.
                </p>
                <p>
                  Through this advisory practice, I partner directly with founders and CMOs to build and install high-performing creative architecture—transforming erratic marketing campaigns into predictable, compounding commercial growth.
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
          STEP 8 · THREE WAYS TO PARTNER (THE ENGAGEMENT HUB)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad relative overflow-hidden border-t border-black/[0.08] dark:border-white/[0.08] bg-[#F7F6F2] dark:bg-[#0A0A0A]" aria-label="Offerings">
        <div className="container-luxury relative z-10">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury text-zinc-600 dark:text-zinc-400 mb-3">Engagement Hub</p>
            <h2 className="heading-section text-3xl sm:text-4xl text-[#141416] dark:text-white">Three Ways to Partner</h2>
            <p className="body-muted text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Structured for hands-on 1:1 counsel, self-serve playbooks, or ongoing strategic syndicate access.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Card 1: Consulting / Advisory (Flagship) */}
            <RevealSection delay={0.1}>
              <TiltCard className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full relative ring-1 ring-black/10 dark:ring-white/20">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/[0.06] dark:bg-white/10 border border-black/15 dark:border-white/20 text-zinc-900 dark:text-white">
                      By Application Only
                    </span>
                    <span className="text-xs font-mono font-semibold tracking-wider text-zinc-600 dark:text-zinc-300">FLAGSHIP</span>
                  </div>

                  <h3 className="heading-card text-2xl mb-3 text-[#141416] dark:text-white">1:1 Creative Advisory</h3>
                  <p className="body-muted text-sm mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Private executive direction covering creative audits, high-converting campaign concepts, and rapid commercial production systems for scaling beauty brands.
                  </p>
                  
                  <div className="space-y-2.5 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] mb-8 text-xs text-zinc-700 dark:text-zinc-300 font-light">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Bi-weekly commercial strategy sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Direct async review of all visual and copy hooks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Strictly capped at 3 concurrent brands</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/consulting"
                  className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full text-[#F7F6F2] bg-[#141416] dark:text-black dark:bg-white font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:shadow-[0_0_24px_rgba(255,255,255,0.18)] hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-[1.02] group/btn"
                >
                  <span>Apply for Advisory</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </TiltCard>
            </RevealSection>

            {/* Card 2: Digital Products */}
            <RevealSection delay={0.2}>
              <TiltCard className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/[0.04] dark:bg-surface border border-black/10 dark:border-white/20 text-zinc-800 dark:text-zinc-200">
                      Self-Serve Systems
                    </span>
                    <BookOpen className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <h3 className="heading-card text-2xl mb-3 text-[#141416] dark:text-white">Systems & Playbooks</h3>
                  <p className="body-muted text-sm mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Field-tested creative frameworks, art direction templates, and direct-response hook databases built specifically for skincare and cosmetics founders.
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] mb-8 text-xs text-zinc-700 dark:text-zinc-300 font-light">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Commercial creative brief templates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Skincare direct-response hook matrix</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Immediate access via digital portal</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/digital-products"
                  className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-black/[0.04] dark:bg-surface border border-black/15 dark:border-white/20 text-zinc-900 dark:text-zinc-200 font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury hover:bg-[#141416] hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-[1.02] group/btn"
                >
                  <span>Enquire About Playbooks</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </TiltCard>
            </RevealSection>

            {/* Card 3: Membership (Syndicate) */}
            <RevealSection delay={0.3}>
              <TiltCard className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/[0.04] dark:bg-white/10 border border-black/10 dark:border-white/20 text-zinc-800 dark:text-zinc-200">
                      Syndicate Access
                    </span>
                    <Compass className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <h3 className="heading-card text-2xl mb-3 text-[#141416] dark:text-white">The Advisory Syndicate</h3>
                  <p className="body-muted text-sm mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Ongoing monthly creative intelligence, live campaign teardowns, private templates, and direct async guidance for brand operators playing the long game.
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] mb-8 text-xs text-zinc-700 dark:text-zinc-300 font-light">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Monthly beauty creative strategy dispatches</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Curated founder roundtables & ad reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141416] dark:bg-white" />
                      <span>Direct async channel access for ad critiques</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/membership"
                  className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full bg-black/[0.04] dark:bg-surface border border-black/15 dark:border-white/20 text-zinc-900 dark:text-zinc-200 font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxury hover:bg-[#141416] hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-[1.02] group/btn"
                >
                  <span>Explore Membership</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </TiltCard>
            </RevealSection>

          </div>

          {/* Witlyn Studio Callout */}
          <RevealSection delay={0.4} className="mt-14 text-center">
            <div className="inline-flex items-center flex-wrap justify-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-surface/50 text-xs font-inter text-zinc-700 dark:text-zinc-300">
              <span>Looking for full-service commercial production or done-for-you monthly retainers?</span>
              <a
                href="https://witlyn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-950 dark:text-white font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Visit Witlyn Studio</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 9 · COMPLIMENTARY CREATIVE AUDIT & DIAGNOSTIC
      ════════════════════════════════════════════════════════════════════ */}
      <section id="diagnostic" className="section-pad relative overflow-hidden border-t border-black/[0.08] dark:border-white/[0.08] bg-background" aria-label="Creative Diagnostic">
        <div className="container-luxury relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Context */}
            <div className="lg:col-span-5">
              <RevealSection>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-300 mb-6 backdrop-blur-md">
                  Complimentary Creative Audit
                </div>
                <h2 className="heading-section text-3xl sm:text-4xl text-[#141416] dark:text-white mb-6">
                  Get a Free Gap & Opportunity Snapshot
                </h2>
                <p className="body-editorial text-base sm:text-lg mb-6 leading-relaxed text-zinc-700 dark:text-zinc-300 font-light">
                  Input your brand details. We analyze your digital creative presence and deliver 3 concrete, high-leverage opportunities directly to your inbox.
                </p>
                <div className="space-y-4 text-xs font-inter text-zinc-700 dark:text-zinc-300 font-light">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
                    <span>Forensic audit of your current aesthetic bottlenecks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
                    <span>3 concrete commercial opportunities tailored to your vertical</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-800 dark:text-zinc-200 shrink-0" />
                    <span>1 actionable 30-day next step (no spam, no obligation)</span>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Right Column: Diagnostic Form Card */}
            <div className="lg:col-span-7">
              <RevealSection delay={0.15}>
                <TiltCard className="card-surface p-8 sm:p-12">
                  {diagnosticStatus === 'success' ? (
                    <div className="text-center py-8 space-y-6">
                      <CheckCircle2 className="w-12 h-12 text-zinc-900 dark:text-white mx-auto" />
                      <h3 className="heading-card text-2xl text-[#141416] dark:text-white">Audit Initiated</h3>
                      <p className="body-editorial text-base max-w-md mx-auto text-zinc-700 dark:text-zinc-300">
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
                          <label className="block text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-inter mb-2">
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
                          <label className="block text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-inter mb-2">
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
                          <label className="block text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-inter mb-2">
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
                          <label className="block text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-inter mb-2">
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
                        <label className="block text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-inter mb-2">
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
                        {diagnosticStatus === 'loading' ? 'Analyzing Brand System...' : 'Generate My Free Gap Snapshot →'}
                      </Button>

                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 text-center font-inter">
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
          STEP 10 · OBJECTION-HANDLING FAQ & FINAL STRATEGY CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-black/[0.08] dark:border-white/[0.08] bg-[#F7F6F2] dark:bg-[#0E0E0D]" aria-label="FAQ">
        <div className="container-luxury max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="eyebrow-luxury text-zinc-600 dark:text-zinc-400 mb-4">Clarity</p>
            <h2 className="heading-section mb-4 text-[#141416] dark:text-white">Frequently Asked Questions</h2>
            <p className="body-muted text-zinc-600 dark:text-zinc-400">Direct answers to strategic questions before applying.</p>
          </RevealSection>

          <div className="space-y-2 mb-20">
            {faqs.map((faq) => (
              <RevealSection key={faq.question}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </RevealSection>
            ))}
          </div>

          {/* Final Call To Action Card */}
          <RevealSection className="p-10 sm:p-14 rounded-3xl bg-black text-white dark:bg-white dark:text-black text-center shadow-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-4">
              Limited Availability
            </p>
            <h2 className="font-fraunces text-3xl sm:text-5xl mb-6 font-light">
              Ready to elevate your beauty brand’s creative authority?
            </h2>
            <p className="font-inter text-sm sm:text-base text-zinc-300 dark:text-zinc-700 max-w-xl mx-auto mb-10 leading-relaxed font-light">
              We review every application personally. Strictly capped cohorts ensure deep focus, rapid delivery, and direct strategic access.
            </p>
            <div className="inline-block relative group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-zinc-300/30 via-white/50 to-zinc-300/30 dark:from-zinc-400/30 dark:via-black/20 dark:to-zinc-400/30 blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse pointer-events-none" />
              <Button asChild variant="gold" size="xl" className="relative shadow-2xl">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Apply for a Strategy Call</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Button>
            </div>
          </RevealSection>

        </div>
      </section>

    </div>
  )
}
