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
import { ChannelMultiplication } from '@/components/channel-multiplication'
import { MaskText } from '@/components/mask-text'
import { SplitRevealImage } from '@/components/split-reveal-image'

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
          STEP 1 · SELORA-STYLE EDITORIAL HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 pb-8 border-b border-[#292929]"
        aria-label="Commercial Hero"
      >
        {/* Background Portrait with dark film grain & gradient mask */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 filter grayscale contrast-125"
            style={{ backgroundImage: `url('/images/sakib-ziad.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050609] via-[#050609]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050609] via-transparent to-[#050609]" />
          <div className="absolute inset-0 grain" />
        </div>

        {/* ── Top Meta Row ── */}
        <div className="container-luxury relative z-10 w-full mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#292929] pb-4">
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#f4521c]" />
              SZ / 2026 — DIRECT RESPONSE STRATEGY
            </span>
            <span className="label-mono">
              BEAUTY · SKINCARE · HIGH-VELOCITY PRODUCTION
            </span>
          </div>
        </div>

        {/* ── Main Hero Editorial Content ── */}
        <div className="container-luxury relative z-10 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            
            {/* Left 8 Cols: Display Statement + Copy */}
            <div className="lg:col-span-8 space-y-6">
              <h1 className="font-inter font-black uppercase text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-[#ece8e1] m-0">
                HIGH-PERFORMANCE <br />
                <span className="text-[#f4521c]">CREATIVE DIRECTION</span> <br />
                FOR BEAUTY &amp; SKINCARE.
              </h1>

              <p className="font-inter text-base sm:text-lg md:text-xl font-medium text-[#bdb8b0] max-w-2xl leading-relaxed tracking-tight">
                We replace 8-week agency shoot bottlenecks with high-converting commercial campaign systems delivered in days—saving{' '}
                <span className="text-[#ece8e1] underline decoration-[#f4521c] decoration-2">
                  60+ hours of founder time
                </span>{' '}
                while cutting production overhead by 70%.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button asChild variant="gold" size="lg" className="h-12 px-8">
                  <Link href="/contact" className="flex items-center gap-2">
                    <span>Apply for a Strategy Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link href="#selected-work" className="flex items-center gap-2">
                    <span>Explore Selected Work</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right 4 Cols: Phase Progression Meters (Selora Characteristic) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#292929] pt-6 lg:pt-0 lg:pl-8 space-y-4">
              <p className="label-mono !text-[#8a8a8a]">// EXECUTION METRICS</p>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between label-mono text-[10px]">
                    <span>001 / AUDIT &amp; FRICTION MAPPING</span>
                    <span className="text-[#f4521c]">72H TURN</span>
                  </div>
                  <div className="h-[2px] w-full bg-[#292929] overflow-hidden">
                    <div className="h-full w-full bg-[#f4521c]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between label-mono text-[10px]">
                    <span>002 / SENSORY TEXTURE DIRECTION</span>
                    <span className="text-[#f4521c]">4K MACRO</span>
                  </div>
                  <div className="h-[2px] w-full bg-[#292929] overflow-hidden">
                    <div className="h-full w-[85%] bg-[#f4521c]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between label-mono text-[10px]">
                    <span>003 / RAPID COMMERCIAL STUDIO</span>
                    <span className="text-[#f4521c]">25+ ASSETS</span>
                  </div>
                  <div className="h-[2px] w-full bg-[#292929] overflow-hidden">
                    <div className="h-full w-full bg-[#f4521c]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between label-mono text-[10px]">
                    <span>004 / CROSS-CHANNEL DEPLOYMENT</span>
                    <span className="text-[#f4521c]">META · IG · TIKTOK</span>
                  </div>
                  <div className="h-[2px] w-full bg-[#292929] overflow-hidden">
                    <div className="h-full w-[90%] bg-[#f4521c]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Giant Footer Wordmark & Marquee Strip ── */}
        <div className="relative z-10 w-full mt-12">
          {/* Acid hairline accent */}
          <div className="w-full h-[2px] bg-[#f4521c]" />

          {/* Huge Display Wordmark */}
          <div className="w-full overflow-hidden select-none pointer-events-none py-2 border-b border-[#292929]">
            <h2 className="font-inter font-black uppercase text-[17vw] leading-[0.76] tracking-[-0.06em] text-[#ece8e1] text-center m-0 p-0">
              SAKIB ZIAD
            </h2>
          </div>

          {/* Services Mono Marquee Strip */}
          <div className="overflow-hidden border-b border-[#292929] bg-[#0b0c10] py-2.5">
            <div className="flex w-max animate-marquee items-center">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                  {['CREATIVE STRATEGY', 'DIRECT-RESPONSE HOOKS', 'COMMERCIAL DIRECTION', 'SENSORY MACRO TEXTURE', '72-HOUR DELIVERY', 'BEAUTY & SKINCARE ONLY', 'META & REELS ASSETS'].map((svc, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-4 px-6 label-mono !text-[#ece8e1] whitespace-nowrap"
                    >
                      <span>{svc}</span>
                      <span className="inline-block w-1.5 h-1.5 bg-[#f4521c]" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


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
          STEP 3 · CATEGORY FRICTION (SELORA EDITORIAL INTRO SPEC)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#050609] pt-24 pb-20 border-b border-[#292929]" aria-label="Category Friction">
        <div className="container-luxury">
          {/* Top Label Row */}
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-8">
            <span className="label-mono !text-[#f4521c]">COMMERCIAL LEVERAGE</span>
            <span className="label-mono">// CATEGORY BOTTLENECK</span>
          </div>

          {/* Large Split Header */}
          <div className="my-12">
            <MaskText
              align="right"
              lines={['TRADITIONAL SHOOTS ARE SLOW.', 'COMMERCIAL CREATIVE CANNOT WAIT.']}
              className="text-[clamp(28px,5.8vw,82px)] font-black uppercase tracking-[-0.05em] leading-[0.98] text-[#ece8e1]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start my-12">
            <div className="md:col-span-4 space-y-4">
              <p className="label-mono !text-[#f4521c]">// CAT — 1.07</p>
              <p className="font-inter text-base font-semibold leading-snug tracking-tight text-[#ece8e1]">
                Beauty ad creative fatigues in 14 days, yet legacy agency production still demands 6 to 8 weeks of waiting and $50k+ in friction overhead.
              </p>
              <p className="label-mono text-[#8a8a8a]">
                High-growth cosmetics brands win by deploying high-velocity commercial systems that generate studio-grade assets in days.
              </p>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <div className="border border-[#292929] bg-[#0b0c10] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#292929] pb-4">
                  <span className="label-mono !text-[#ece8e1]">DIRECT PARADIGM COMPARISON</span>
                  <span className="label-mono !text-[#f4521c]">STUDIO PROTOCOL</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="border-l-2 border-[#292929] pl-4 space-y-2">
                    <span className="label-mono text-[#8a8a8a]">01 / LEGACY AGENCY</span>
                    <p className="font-inter text-xs text-[#8a8a8a] leading-relaxed">
                      6–8 week turnaround, heavy set rental costs, limited asset variants, and rapid feed fatigue within two weeks of launch.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#f4521c] pl-4 space-y-2">
                    <span className="label-mono !text-[#f4521c]">02 / SAKIB ZIAD SYSTEM</span>
                    <p className="font-inter text-xs text-[#ece8e1] font-medium leading-relaxed">
                      72-hour turnaround, hyper-realistic formula caustics, direct-response hook architecture, and omnichannel assets pre-formatted for conversion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 4 · THE 5-STEP STRATEGIC SYSTEM (SELORA PROCESS MODULES)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#050609] py-24 border-b border-[#292929]" aria-label="Strategic System">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">SYSTEM ARCHITECTURE</span>
            <span className="label-mono">05 MODULAR PHASES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-8">
              <MaskText
                align="left"
                lines={['A PREDICTABLE ENGINE', 'FOR COMMERCIAL GROWTH.']}
                className="text-[clamp(32px,5.4vw,76px)] font-black uppercase tracking-[-0.05em] leading-[0.95] text-[#ece8e1]"
              />
            </div>
            <div className="lg:col-span-4">
              <p className="label-mono text-[#bdb8b0] leading-relaxed">
                A disciplined methodology moving from forensic friction audits to studio-grade omnichannel deployment.
              </p>
            </div>
          </div>

          {/* Selora Process Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {strategicSteps.map((step) => (
              <article
                key={step.num}
                className="group relative flex flex-col justify-between border border-[#292929] bg-[#0b0c10] p-6 hover:border-[#f4521c] transition-colors duration-500"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <span className="label-mono !text-[#f4521c]">MODULE — {step.num}</span>
                    <span className="label-mono text-[#8a8a8a]">{step.num}/05</span>
                  </div>

                  <div className="h-px w-full bg-[#292929] group-hover:bg-[#f4521c] transition-colors duration-500 mb-6" />

                  <h3 className="font-inter text-base font-bold uppercase tracking-tight text-[#ece8e1] mb-3 group-hover:text-[#f4521c] transition-colors">
                    {step.title}
                  </h3>

                  <p className="font-inter text-xs text-[#8a8a8a] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#292929] flex items-center justify-between label-mono text-[10px]">
                  <span>PROTOCOL</span>
                  <span className="text-[#f4521c]">ACTIVE</span>
                </div>
              </article>
            ))}
          </div>

          {/* Horizontal Acid Tracker Seam */}
          <div className="mt-8 h-[2px] w-full bg-[#292929] overflow-hidden">
            <div className="h-full w-full bg-[#f4521c]" />
          </div>
        </div>
      </section>


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
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/[0.05] dark:bg-white/10 text-zinc-800 dark:text-zinc-200">
                          Case Study {study.num}
                        </span>
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
                        {study.deliverables}
                      </div>
                    </div>

                    <Link
                      href={study.link}
                      className="inline-flex items-center gap-2 self-start text-xs font-inter uppercase tracking-[0.16em] text-zinc-950 dark:text-white font-semibold hover:underline group/link"
                    >
                      <span>Explore {study.brand} Campaign Vault</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                  {/* Right Column (7 Cols): Split Preview of Hero Product + Video Highlight */}
                  <div className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 ${idx % 2 === 1 ? 'order-2 lg:order-1' : ''}`}>
                    {/* Primary Hero Still with Selora Split-Shutter Reveal */}
                    <div className="sm:col-span-7 group">
                      <SplitRevealImage
                        src={study.heroImage}
                        alt={`${study.brand} campaign visual directed by Sakib Ziad`}
                        aspect="aspect-[4/5]"
                        className="border border-[#292929]"
                      />
                      <div className="mt-2 flex items-center justify-between label-mono text-[10px]">
                        <span className="text-[#ece8e1] group-hover:text-[#f4521c] transition-colors">
                          {study.brand} // HERO PLATE
                        </span>
                        <span className="text-[#8a8a8a]">4K STILL</span>
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
          STEP 6 · SELORA-STYLE FEATURED ACID BREAK SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f4521c] text-[#050609] py-20 my-12" aria-label="Commercial Velocity">
        {/* Giant Outlined Marquee Strip */}
        <div className="border-y border-[#050609]/20 py-4 mb-12">
          <div className="overflow-hidden w-full">
            <div className="flex w-max animate-marquee items-center">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                  {['HIGH-PERFORMANCE DIRECTION', '72-HOUR COMMERCIAL ASSETS', 'HIGH-VELOCITY CREATIVE', 'DIRECT-RESPONSE CONVERSION'].map((text, i) => (
                    <span key={i} className="flex items-center gap-8 px-6 font-inter font-black uppercase text-4xl sm:text-6xl md:text-7xl tracking-[-0.05em] whitespace-nowrap">
                      <span>{text}</span>
                      <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #050609' }}>{text}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#050609]/70 font-semibold">
                // STUDY — 04.13 · CONVERSION LOGIC
              </span>
              <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl leading-[0.95] tracking-[-0.05em] text-[#050609]">
                SENSORY PROOF OUTPERFORMS EMPTY CLAIMS.
              </h2>
              <p className="font-inter text-sm sm:text-base font-semibold text-[#050609]/80 leading-relaxed">
                We design refractive lighting caustics, liquid flow physics, and real texture micro-zooms that allow consumers to visually feel the formula before checkout.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-[#050609]/25 bg-[#050609]/5 p-5 space-y-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#050609]">01 / HOOK STOP</span>
                <p className="font-inter text-xs font-semibold text-[#050609]/80">Thumb-stop friction engineered in the first 1.5 seconds.</p>
              </div>
              <div className="border border-[#050609]/25 bg-[#050609]/5 p-5 space-y-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#050609]">02 / SENSORY TEXTURE</span>
                <p className="font-inter text-xs font-semibold text-[#050609]/80">Physical demonstration over generic talking heads.</p>
              </div>
              <div className="border border-[#050609]/25 bg-[#050609]/5 p-5 space-y-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#050609]">03 / RAPID SCALING</span>
                <p className="font-inter text-xs font-semibold text-[#050609]/80">Cross-channel 1:1, 9:16 and 4:5 ratios pre-formatted.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 7 · CREATIVE MULTIPLICATION · ONE PRODUCT, EVERY CHANNEL
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
