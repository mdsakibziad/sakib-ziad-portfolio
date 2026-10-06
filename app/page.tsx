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
      <section className="py-8 border-y border-[#292929] bg-[#050609]">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-center">
            
            <div className="md:border-r border-[#292929] md:pr-6 space-y-1">
              <span className="label-mono text-[#8a8a8a] block">001 // WITLYN STANDARD</span>
              <p className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
                STUDIO GRADE
              </p>
              <span className="label-mono !text-[#f4521c] text-[10px] block">COMMERCIAL STANDARD</span>
            </div>

            <div className="md:border-r border-[#292929] md:px-6 space-y-1">
              <span className="label-mono text-[#8a8a8a] block">002 // SPECIALIZATION</span>
              <p className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
                BEAUTY ONLY
              </p>
              <span className="label-mono !text-[#f4521c] text-[10px] block">100% COSMETICS</span>
            </div>

            <div className="md:border-r border-[#292929] md:px-6 space-y-1">
              <span className="label-mono text-[#8a8a8a] block">003 // PORTFOLIO ASSETS</span>
              <p className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
                135+ ASSETS
              </p>
              <span className="label-mono !text-[#f4521c] text-[10px] block">MASTER CAMPAIGN VAULT</span>
            </div>

            <div className="md:pl-6 space-y-1">
              <span className="label-mono text-[#8a8a8a] block">004 // EXECUTION SPEED</span>
              <p className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
                72 HOURS
              </p>
              <span className="label-mono !text-[#f4521c] text-[10px] block">RAPID TURNAROUND</span>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 3 · CATEGORY FRICTION (SELORA EDITORIAL INTRO SPEC)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#050609] pt-20 pb-20 border-b border-[#292929]" aria-label="Category Friction">
        <div className="container-luxury">
          {/* Top Label Row */}
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-8">
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f4521c]" />
              COMMERCIAL LEVERAGE
            </span>
            <span className="label-mono text-[#8a8a8a]">// CATEGORY BOTTLENECK</span>
          </div>

          {/* Large Split Header */}
          <div className="my-10">
            <h2 className="text-right font-inter font-black uppercase text-[clamp(28px,5.8vw,82px)] tracking-[-0.05em] leading-[0.98] text-[#ece8e1]">
              <span className="block overflow-hidden"><span className="block">TRADITIONAL SHOOTS ARE SLOW.</span></span>
              <span className="block overflow-hidden"><span className="block text-[#f4521c]">COMMERCIAL CREATIVE CANNOT WAIT.</span></span>
            </h2>
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
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f4521c]" />
              SYSTEM ARCHITECTURE
            </span>
            <span className="label-mono text-[#8a8a8a]">05 MODULAR PHASES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-8">
              <h2 className="font-inter font-black uppercase text-[clamp(32px,5.4vw,76px)] tracking-[-0.05em] leading-[0.95] text-[#ece8e1]">
                <span className="block overflow-hidden"><span className="block">A PREDICTABLE ENGINE</span></span>
                <span className="block overflow-hidden"><span className="block text-[#f4521c]">FOR COMMERCIAL GROWTH.</span></span>
              </h2>
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
      <section id="selected-work" className="py-24 bg-[#050609] border-b border-[#292929]" aria-label="Selected Work">
        <div className="container-luxury">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-[#292929] pb-8">
            <div className="space-y-3">
              <span className="label-mono !text-[#f4521c] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#f4521c]" />
                FIELD PROOF · 05 FLAGSHIP VAULTS
              </span>
              <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1] leading-tight">
                SELECTED CAMPAIGN SYSTEMS
              </h2>
              <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] max-w-xl">
                Five category-defining skincare and beauty campaigns engineered for high conversion and luxury prestige.
              </p>
            </div>
            <Button asChild variant="outline" className="h-11 px-6 rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
              <Link href="/work" className="flex items-center gap-2">
                <span>VIEW COMPLETE ARCHIVE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {/* 5 Flagship Case Studies */}
          <div className="space-y-32">
            {caseStudies.map((study, idx) => (
              <div key={study.brand} className="pt-8 border-t border-[#292929] first:border-none first:pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* Left Column (5 Cols): Hero Product + 1 Short Sentence + Strategist Rationale */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${idx % 2 === 1 ? 'order-1 lg:order-2' : ''}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#292929] pb-3">
                        <span className="label-mono !text-[#f4521c]">
                          CASE STUDY {study.num} // WITLYN VAULT
                        </span>
                        <span className="label-mono text-[#8a8a8a]">
                          STUDIO GRADE
                        </span>
                      </div>

                      <div>
                        <h3 className="font-inter font-black uppercase text-3xl sm:text-4xl text-[#ece8e1] hover:text-[#f4521c] transition-colors mb-1">
                          <Link href={study.link}>{study.brand}</Link>
                        </h3>
                        <p className="label-mono text-xs text-[#bdb8b0]">
                          {study.tagline}
                        </p>
                      </div>

                      {/* 1 Short Sentence Summary */}
                      <p className="font-inter text-xs sm:text-sm font-semibold text-[#ece8e1] leading-relaxed">
                        {study.oneLiner}
                      </p>

                      {/* Creative Strategist Rationale Card */}
                      <div className="border border-[#292929] bg-[#0b0c10] p-5 space-y-3">
                        <div>
                          <span className="label-mono text-[10px] text-[#8a8a8a] block mb-1">
                            01 // DIRECTION STRATEGY
                          </span>
                          <p className="font-inter text-xs text-[#bdb8b0] leading-relaxed">{study.strategistThinking.whyChosen}</p>
                        </div>
                        <div className="pt-2 border-t border-[#292929]">
                          <span className="label-mono text-[10px] text-[#f4521c] block mb-1">
                            02 // PRIMARY HOOK ANGLE
                          </span>
                          <p className="font-inter text-xs text-[#ece8e1] font-bold">{study.strategistThinking.hookAngle}</p>
                        </div>
                        <div className="pt-2 border-t border-[#292929]">
                          <span className="label-mono text-[10px] text-[#8a8a8a] block mb-1">
                            03 // COMMERCIAL ADVANTAGE
                          </span>
                          <p className="font-inter text-xs text-[#bdb8b0] leading-relaxed">{study.strategistThinking.commercialBenefit}</p>
                        </div>
                      </div>

                      <div className="label-mono text-[10px] text-[#8a8a8a]">
                        {study.deliverables}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button asChild className="btn-acid h-11 w-full rounded-none">
                        <Link href={study.link} className="flex items-center justify-between px-2">
                          <span>EXPLORE {study.brand} CAMPAIGN VAULT</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right Column (7 Cols): Split Preview of Hero Product + Video Highlight */}
                  <div className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 ${idx % 2 === 1 ? 'order-2 lg:order-1' : ''}`}>
                    {/* Primary Hero Still with Selora Split-Shutter Reveal */}
                    <div className="sm:col-span-7 group border border-[#292929] bg-[#0b0c10] p-2">
                      <SplitRevealImage
                        src={study.heroImage}
                        alt={`${study.brand} campaign visual directed by Sakib Ziad`}
                        aspect="aspect-[4/5]"
                        className="w-full"
                      />
                      <div className="mt-2 flex items-center justify-between label-mono text-[10px] px-1">
                        <span className="text-[#ece8e1] group-hover:text-[#f4521c] transition-colors">
                          {study.brand} // HERO PLATE
                        </span>
                        <span className="text-[#8a8a8a]">4K STILL</span>
                      </div>
                    </div>

                    {/* Motion Deliverable Preview with Audio Controls */}
                    <div className="sm:col-span-5 border border-[#292929] bg-[#0b0c10] p-2">
                      <HomepageVideoPlayer src={study.previewVideo} brand={study.brand} />
                    </div>
                  </div>

                </div>
              </div>
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
          STEP 8 · FOUNDER PHILOSOPHY & ART DIRECTION STANDARDS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#050609] border-t border-[#292929]" aria-label="Founder Philosophy">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-12">
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f4521c]" />
              IDX/08 — PHILOSOPHY
            </span>
            <span className="label-mono text-[#8a8a8a]">
              COMMERCIAL ART DIRECTION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Bleed Portrait Photo with Shutter Reveal */}
            <div className="lg:col-span-5">
              <div className="border border-[#292929] bg-[#0b0c10] p-2">
                <SplitRevealImage
                  src="/images/sakib-ziad.jpg"
                  alt="Sakib Ziad — Creative Strategist & Commercial Director"
                  aspect="aspect-[4/5]"
                  className="w-full"
                />
                <div className="flex items-center justify-between pt-3 px-2 label-mono text-[10px] text-[#8a8a8a]">
                  <span className="text-[#ece8e1]">SAKIB ZIAD</span>
                  <span className="text-[#f4521c]">FOUNDER // WITLYN</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Pull-Quote & Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="space-y-4">
                <span className="label-mono !text-[#f4521c] block">DIRECTOR MANIFESTO</span>
                <h2 className="font-inter font-black uppercase text-2xl sm:text-4xl lg:text-5xl text-[#ece8e1] leading-tight">
                  “CREATIVE DIRECTION IS NOT DECORATION. IT IS COMMERCIAL LEVERAGE.”
                </h2>
              </div>

              <div className="space-y-4 font-inter text-sm sm:text-base text-[#bdb8b0] leading-relaxed">
                <p>
                  With an academic background in computational systems and an obsession for prestige cosmetics aesthetics, I founded Witlyn to prove that modern digital production could match and exceed traditional film sets in emotional depth and conversion velocity.
                </p>
                <p>
                  Through this advisory practice, I partner directly with founders and CMOs to build and install high-performing creative architecture—transforming erratic marketing campaigns into predictable, compounding commercial growth.
                </p>
              </div>

              <div className="pt-2">
                <Button asChild variant="outline" className="h-11 px-6 rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
                  <Link href="/about" className="flex items-center gap-2">
                    <span>READ FULL FOUNDER STORY</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 9 · THREE WAYS TO PARTNER (THE ENGAGEMENT HUB)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-[#292929] bg-[#0b0c10]" aria-label="Offerings">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-12">
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f4521c]" />
              IDX/09 — ENGAGEMENT
            </span>
            <span className="label-mono text-[#8a8a8a]">
              THREE PATHS TO PARTNERSHIP
            </span>
          </div>

          <div className="max-w-2xl mb-14 space-y-3">
            <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1]">
              THREE WAYS TO PARTNER
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#8a8a8a]">
              Structured for hands-on 1:1 counsel, self-serve playbooks, or ongoing strategic syndicate access.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Card 1: Consulting / Advisory */}
            <div className="border border-[#292929] bg-[#050609] p-8 flex flex-col justify-between hover:border-[#f4521c] transition-colors">
              <div>
                <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-6">
                  <span className="label-mono !text-[#f4521c]">FLAGSHIP // 01</span>
                  <span className="label-mono text-[#8a8a8a]">APPLICATION ONLY</span>
                </div>

                <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1] mb-3 leading-snug">
                  1:1 CREATIVE ADVISORY
                </h3>
                <p className="font-inter text-xs text-[#8a8a8a] mb-6 leading-relaxed">
                  Private executive direction covering creative audits, high-converting campaign concepts, and rapid commercial production systems for scaling beauty brands.
                </p>
                
                <div className="space-y-3 pt-6 border-t border-[#292929] mb-8 font-inter text-xs text-[#bdb8b0]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Bi-weekly commercial strategy sessions</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Direct async review of all visual and copy hooks</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Strictly capped at 3 concurrent brands</span>
                  </div>
                </div>
              </div>

              <Button asChild className="btn-acid h-11 w-full rounded-none">
                <Link href="/consulting" className="flex items-center justify-center gap-2">
                  <span>APPLY FOR ADVISORY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Card 2: Digital Products */}
            <div className="border border-[#292929] bg-[#050609] p-8 flex flex-col justify-between hover:border-[#f4521c] transition-colors">
              <div>
                <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-6">
                  <span className="label-mono !text-[#f4521c]">PLAYBOOKS // 02</span>
                  <span className="label-mono text-[#8a8a8a]">SELF-SERVE</span>
                </div>

                <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1] mb-3 leading-snug">
                  SYSTEMS &amp; PLAYBOOKS
                </h3>
                <p className="font-inter text-xs text-[#8a8a8a] mb-6 leading-relaxed">
                  Field-tested creative frameworks, art direction templates, and direct-response hook databases built specifically for skincare and cosmetics founders.
                </p>

                <div className="space-y-3 pt-6 border-t border-[#292929] mb-8 font-inter text-xs text-[#bdb8b0]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Commercial creative brief templates</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Skincare direct-response hook matrix</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Immediate access via digital portal</span>
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" className="h-11 w-full rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
                <Link href="/digital-products" className="flex items-center justify-center gap-2">
                  <span>EXPLORE PLAYBOOKS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Card 3: Membership */}
            <div className="border border-[#292929] bg-[#050609] p-8 flex flex-col justify-between hover:border-[#f4521c] transition-colors">
              <div>
                <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-6">
                  <span className="label-mono !text-[#f4521c]">SYNDICATE // 03</span>
                  <span className="label-mono text-[#8a8a8a]">LIMITED INTAKE</span>
                </div>

                <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1] mb-3 leading-snug">
                  THE ADVISORY SYNDICATE
                </h3>
                <p className="font-inter text-xs text-[#8a8a8a] mb-6 leading-relaxed">
                  Ongoing monthly creative intelligence, live campaign teardowns, private templates, and direct async guidance for brand operators playing the long game.
                </p>

                <div className="space-y-3 pt-6 border-t border-[#292929] mb-8 font-inter text-xs text-[#bdb8b0]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Monthly beauty creative strategy dispatches</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Curated founder roundtables &amp; ad reviews</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>Direct async channel access for ad critiques</span>
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" className="h-11 w-full rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
                <Link href="/membership" className="flex items-center justify-center gap-2">
                  <span>EXPLORE MEMBERSHIP</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

          </div>

          {/* Witlyn Studio Callout */}
          <div className="mt-12 text-center border-t border-[#292929] pt-8">
            <span className="label-mono text-xs text-[#8a8a8a]">
              LOOKING FOR FULL-SERVICE PRODUCTION? VISIT{' '}
              <a
                href="https://witlyn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ece8e1] hover:text-[#f4521c] underline underline-offset-4"
              >
                WITLYN STUDIO (WITLYN.COM) →
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 10 · COMPLIMENTARY CREATIVE AUDIT & DIAGNOSTIC
      ════════════════════════════════════════════════════════════════════ */}
      <section id="diagnostic" className="py-24 border-t border-[#292929] bg-[#050609]" aria-label="Creative Diagnostic">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-12">
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f4521c]" />
              IDX/10 — DIAGNOSTIC
            </span>
            <span className="label-mono text-[#8a8a8a]">
              COMPLIMENTARY CREATIVE AUDIT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Context */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1] leading-tight">
                GET A FREE GAP &amp; OPPORTUNITY SNAPSHOT
              </h2>
              <p className="font-inter text-sm sm:text-base text-[#bdb8b0] leading-relaxed">
                Input your brand details. We analyze your digital creative presence and deliver 3 concrete, high-leverage opportunities directly to your inbox.
              </p>
              <div className="space-y-4 pt-4 border-t border-[#292929] font-inter text-xs text-[#bdb8b0]">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                  <span>Forensic audit of your current aesthetic bottlenecks</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                  <span>3 concrete commercial opportunities tailored to your vertical</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                  <span>1 actionable 30-day next step (no spam, no obligation)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Diagnostic Form Card */}
            <div className="lg:col-span-7">
              <div className="border border-[#292929] bg-[#0b0c10] p-8 sm:p-12">
                {diagnosticStatus === 'success' ? (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-12 h-12 border border-[#f4521c] text-[#f4521c] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1]">AUDIT INITIATED</h3>
                    <p className="font-inter text-xs sm:text-sm text-[#bdb8b0] max-w-md mx-auto">
                      We are processing your brand synthesis. A detailed overview is being dispatched to your email, and our strategy team will follow up directly.
                    </p>
                    <Button asChild className="btn-acid h-11 px-8 rounded-none">
                      <Link href="/contact">BOOK STRATEGY CALL</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleDiagnosticSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                          BRAND NAME *
                        </label>
                        <input
                          required
                          placeholder="e.g. Solaé Botanicals"
                          value={diagnosticForm.brandName}
                          onChange={(e) => setDiagnosticForm({ ...diagnosticForm, brandName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
                        />
                      </div>
                      <div>
                        <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                          WEBSITE URL *
                        </label>
                        <input
                          required
                          type="url"
                          placeholder="https://yourbrand.com"
                          value={diagnosticForm.websiteUrl}
                          onChange={(e) => setDiagnosticForm({ ...diagnosticForm, websiteUrl: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                          WORK EMAIL *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="founder@yourbrand.com"
                          value={diagnosticForm.email}
                          onChange={(e) => setDiagnosticForm({ ...diagnosticForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
                        />
                      </div>
                      <div>
                        <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                          INSTAGRAM HANDLE
                        </label>
                        <input
                          placeholder="@yourbrand"
                          value={diagnosticForm.instagramHandle}
                          onChange={(e) => setDiagnosticForm({ ...diagnosticForm, instagramHandle: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                        PRIMARY CREATIVE / GROWTH BOTTLENECK *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="What is limiting your creative velocity right now? (e.g. agency turnaround too slow, generic visuals, ad fatigue)"
                        value={diagnosticForm.growthChallenge}
                        onChange={(e) => setDiagnosticForm({ ...diagnosticForm, growthChallenge: e.target.value })}
                        className="w-full p-4 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={diagnosticStatus === 'loading'}
                      className="w-full h-12 btn-acid rounded-none uppercase font-inter font-bold tracking-wider"
                    >
                      {diagnosticStatus === 'loading' ? 'ANALYZING BRAND SYSTEM...' : 'GENERATE MY FREE GAP SNAPSHOT →'}
                    </Button>

                    <p className="label-mono text-[10px] text-[#8a8a8a] text-center pt-1">
                      100% CONFIDENTIAL · ZERO SPAM · REVIEWED BY SAKIB ZIAD PERSONALLY
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 11 · OBJECTION-HANDLING FAQ & FINAL STRATEGY CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-[#292929] bg-[#050609]" aria-label="FAQ">
        <div className="container-luxury max-w-4xl mx-auto space-y-20">
          <div>
            <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-8">
              <span className="label-mono !text-[#f4521c]">FAQ // STRATEGIC CLARITY</span>
              <span className="label-mono text-[#8a8a8a]">ANSWERS DIRECT</span>
            </div>
            <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1] mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] mb-8">
              Direct answers to strategic questions before submitting your partnership application.
            </p>

            <div className="space-y-0 border-t border-[#292929]">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Final Call To Action Card */}
          <div className="border border-[#292929] bg-[#0b0c10] p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-[#f4521c]" />

            <span className="label-mono !text-[#f4521c] block">
              // LIMITED AVAILABILITY · STRICTLY 3 CONCURRENT BRANDS
            </span>
            <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1] leading-tight max-w-2xl mx-auto">
              READY TO ELEVATE YOUR BEAUTY BRAND’S COMMERCIAL CONVERSION?
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#bdb8b0] max-w-xl mx-auto leading-relaxed">
              We review every application personally within 48 business hours. Strictly capped cohorts ensure deep focus, rapid turnaround, and direct partner access.
            </p>
            <div className="pt-4">
              <Button asChild className="btn-acid h-14 px-10 text-sm rounded-none uppercase font-inter font-bold tracking-wider">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>APPLY FOR A STRATEGY CALL</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
