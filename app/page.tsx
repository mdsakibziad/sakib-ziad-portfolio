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
import { EditorialReveal, StickyStackedSection } from '@/components/vertical-motion'

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

  /* ── FAQ State & Questions ──────────────────────────────────────────────── */
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const faqs = [
    {
      q: 'How does AI commercial directing differ from traditional production houses?',
      a: 'Traditional production houses demand 6–8 weeks, physical studio rentals, actor casting, equipment shipping, and $50k+ in overhead for a single ad set that fatigues in 14 days. As an AI Commercial Director, I orchestrate generative neural pipelines (Midjourney, ComfyUI, Gen-3, Luma) to engineer photorealistic lighting caustics, macro formula physics, and cinematic motion plates, delivering 25–35 master production deliverables in 72 hours without compromising luxury brand equity.',
    },
    {
      q: 'Are the 5 portfolio campaigns concept work or live client ad spend?',
      a: 'The 5 flagship campaigns (Solaé, Lipéa, Nuécera, Aura Purify, Vyraa) are concept campaigns: real consumer objection deconstruction, scripted hook psychology, and studio-grade deliverables produced under the Witlyn commercial standard. When partnering with client brands on advisory or production, assets are integrated directly into live Meta and TikTok ad accounts.',
    },
    {
      q: 'Are you available for full-time or leadership roles at agencies or brands?',
      a: 'Yes. In addition to private brand advisory and Witlyn studio production, I am open to select Full-Time, Fractional, and Lead Creative Strategist & AI Commercial Director positions for forward-thinking global agencies and beauty conglomerates (Remote / Global). You can download my official résumé directly from the header or recruiter hub.',
    },
    {
      q: 'What is your academic and technical background?',
      a: 'I hold a BSc in Artificial Intelligence from Lincoln University College (2026). My background bridges computational deep learning models, generative AI pipelines, and high-fashion post-production (DaVinci Resolve Studio color grading & ASMR audio mastering).',
    },
    {
      q: 'What is the difference between Sakib Ziad and Witlyn?',
      a: 'Witlyn (witlyn.com) is the full-service AI commercial production studio handling done-for-you campaign execution and multi-asset retainers. This personal site represents my executive practice: creative strategy audits, direct 1:1 advisory, and directorial leadership.',
    },
    {
      q: 'How do we initiate a collaboration or interview?',
      a: 'For brand founders: submit the complimentary diagnostic form above or apply for a strategy call via the contact page. For agency leads and talent recruiters: view my official résumé (PDF) or reach out directly at witlyn@sakibziad.my.',
    },
  ]

  /* ── The 5-Stage Commercial Production Pipeline ────────────────────────── */
  const strategicSteps = [
    {
      num: '01',
      title: 'Objection Mapping & Consumer Audit',
      phase: 'Stage 01 · Creative Strategy',
      desc: 'Deconstructing consumer friction, category fatigue, and why target audiences hesitate before purchase.',
    },
    {
      num: '02',
      title: 'First-Frame Hook Engineering',
      phase: 'Stage 02 · Behavioral Psychology',
      desc: 'Scripting 5+ contrarian, sensory, and transformation angles to arrest scroll within 1.5 seconds without brand degradation.',
    },
    {
      num: '03',
      title: 'Neural Staging & Macro Physics',
      phase: 'Stage 03 · Commercial Direction',
      desc: 'Directing refractive caustics, micro fluid dynamics, and photorealistic skin subsurface scattering with zero plastic artifacting.',
    },
    {
      num: '04',
      title: 'Generative Motion & Camera Trajectory',
      phase: 'Stage 04 · Cinematic Direction',
      desc: 'Choreographing 100mm macro orbits, speed ramps, and tactile skin interactions to prove formula efficacy in motion.',
    },
    {
      num: '05',
      title: 'Color Grading, ASMR Sound & Mastering',
      phase: 'Stage 05 · Omnichannel Delivery',
      desc: 'DaVinci Resolve finishing, tactile foley audio (ASMR textures), and native rendering across Meta 1:1, IG 9:16, TikTok, and Web.',
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



  return (
    <div className="bg-background text-ivory overflow-x-hidden selection:bg-white selection:text-black">

      {/* ════════════════════════════════════════════════════════════════════
          STEP 1 · EXACT SELORA HERO PARITY (SCREENSHOT 1:1)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#050609] text-[#ece8e1] select-none"
        aria-label="Commercial Hero"
      >
        {/* Background Portrait: High-Definition, Sharp Studio Black & White (No heavy grain, no blur) */}
        <div data-hero-portrait="true" className="absolute inset-0 z-0 will-change-transform pointer-events-none select-none overflow-hidden bg-[#050609]">
          {/* Sharp High-Res Portrait Container placed on right side */}
          <div className="absolute right-0 top-0 w-full sm:w-[65vw] md:w-[50vw] lg:w-[44vw] max-w-[850px] h-[95vh] overflow-hidden">
            <img
              src="/images/sakib-ziad.jpg"
              alt="Sakib Ziad — Creative Strategist"
              className="w-full h-full object-cover object-[52%_16%] filter grayscale contrast-110 brightness-105"
            />
            {/* Seamless Left Edge Fade into pure dark ink */}
            <div className="absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-[#050609] via-[#050609]/80 to-transparent pointer-events-none" />
            {/* Seamless Bottom Edge Fade */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050609] via-[#050609]/90 to-transparent pointer-events-none" />
          </div>

          {/* Solid dark protective gradient keeping the left typography completely unobstructed */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(98deg,#050609_12%,rgba(5,6,9,0.92)_38%,rgba(5,6,9,0.3)_68%,rgba(5,6,9,0.15)_100%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#050609] to-transparent" />
        </div>

        {/* ── Top Meta Row ── */}
        <div className="relative z-10 flex items-start justify-between gap-6 container-luxury pt-[14vh] md:pt-[16vh]">
          <div>
            <p className="label-mono !text-[#ece8e1]/70">SAKIB ZIAD · 2026 // PORTFOLIO</p>
          </div>
          <div>
            <p className="label-mono text-right !text-[#ece8e1]/70 uppercase">
              AI CREATIVE STRATEGIST / COMMERCIAL DIRECTOR
            </p>
          </div>
        </div>

        {/* ── Main Hero Editorial Statement & Directorial Indicators ── */}
        <div className="relative z-10 flex flex-1 items-center container-luxury py-8 my-auto">
          <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12">
            
            {/* Left 7 Cols: Statement with Orange Dot */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f4521c] block" />
                <span className="label-mono !text-[#f4521c] text-[10px] tracking-wider uppercase">
                  BEAUTY &amp; SKINCARE CAMPAIGN DIRECTION
                </span>
              </div>

              <h1 className="font-inter font-black uppercase text-[clamp(28px,5vw,70px)] leading-[1.02] tracking-[-0.05em] text-[#ece8e1] m-0">
                <MaskText
                  immediate
                  delay={0.1}
                  lines={[
                    <span key="1">WHERE CONSUMER PSYCHOLOGY</span>,
                    <span key="2">MEETS PRESTIGE</span>,
                    <span key="3" className="text-[#f4521c]">COMMERCIAL DIRECTION.</span>,
                  ]}
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="font-inter text-xs sm:text-sm md:text-base font-bold text-[#f5f2eb] max-w-xl leading-relaxed uppercase pt-3 tracking-wide"
              >
                I direct high-converting beauty and skincare ad campaigns by engineering macro formula conviction, friction-breaking hooks, and AI-native production scale.
              </motion.p>
            </div>

            {/* Right 4 Cols: Directorial Focus Indicators (col-start-9) */}
            <div className="md:col-span-4 md:col-start-9 space-y-0">
              
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-[#292929] py-[10px]">
                <span className="label-mono text-[#ece8e1]/45 text-[11px]">001</span>
                <div aria-hidden="true" className="relative h-px w-full bg-[#292929] overflow-hidden">
                  <span className="absolute inset-y-0 left-0 block w-full origin-left bg-[#f4521c]" />
                </div>
                <span className="label-mono text-[#ece8e1]/70 text-[11px]">
                  STRATEGY/<span className="text-[#f4521c]">PSYCHOLOGY</span>
                </span>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-[#292929] py-[10px]">
                <span className="label-mono text-[#ece8e1]/45 text-[11px]">002</span>
                <div aria-hidden="true" className="relative h-px w-full bg-[#292929] overflow-hidden">
                  <span className="absolute inset-y-0 left-0 block w-[85%] origin-left bg-[#f4521c]" />
                </div>
                <span className="label-mono text-[#ece8e1]/70 text-[11px]">
                  DIRECTING/<span className="text-[#f4521c]">MACRO PHYSICS</span>
                </span>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-[#292929] py-[10px]">
                <span className="label-mono text-[#ece8e1]/45 text-[11px]">003</span>
                <div aria-hidden="true" className="relative h-px w-full bg-[#292929] overflow-hidden">
                  <span className="absolute inset-y-0 left-0 block w-full origin-left bg-[#f4521c]" />
                </div>
                <span className="label-mono text-[#ece8e1]/70 text-[11px]">
                  RETENTION/<span className="text-[#f4521c]">FIRST 3 SECONDS</span>
                </span>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-[#292929] py-[10px]">
                <span className="label-mono text-[#ece8e1]/45 text-[11px]">004</span>
                <div aria-hidden="true" className="relative h-px w-full bg-[#292929] overflow-hidden">
                  <span className="absolute inset-y-0 left-0 block w-[70%] origin-left bg-[#f4521c]" />
                </div>
                <span className="label-mono text-[#ece8e1]/70 text-[11px]">
                  DELIVERY/<span className="text-[#f4521c]">OMNICHANNEL SUITE</span>
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* ── Giant Edge-To-Edge Display Mark (Exact Selora Characteristic) ── */}
        <div className="relative z-10 w-full">
          
          <div className="w-full overflow-hidden select-none pointer-events-none px-4 sm:px-8">
            <p className="block font-inter font-black uppercase text-[clamp(2.4rem,14vw,22rem)] leading-[0.76] text-[#ece8e1] tracking-[-0.06em] whitespace-nowrap text-left m-0 p-0">
              SAKIB ZIAD
            </p>
          </div>

          {/* 3px Solid Acid Orange Line */}
          <div className="shrink-0 h-[3px] w-full bg-[#f4521c]" />

          {/* Explore Cue Row */}
          <div className="container-luxury flex items-end justify-end pb-6 pt-4">
            <div className="flex items-end gap-3">
              <span className="label-mono text-[#f4521c] uppercase text-xs">explore</span>
              <div className="w-[1px] h-[34px] bg-[#f4521c]" />
            </div>
          </div>

          {/* Ticker / Marquee Strip (Exact Selora Marquee) */}
          <div className="border-t border-[#292929] py-3 overflow-hidden bg-[#050609]">
            <div className="flex w-max animate-marquee items-center">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                  {['VISUAL EXPERIMENTS', 'FORM & FUNCTION', 'SOUND & MOTION', 'WRITTEN FRAGMENTS', 'THINGS I CAN’T EXPLAIN', 'COMMERCIAL CREATIVE SYSTEMS'].map((text, i) => (
                    <span key={i} className="label-mono flex items-center whitespace-nowrap px-6 text-[#8a8a8a] text-[11px]">
                      {text}
                      <span className="ml-6 block w-[3px] h-[3px] bg-[#f4521c]" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          STEP 2 · CREDIBILITY & PROFESSIONAL STANDARDS BAR
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 border-y border-[#292929] bg-[#050609]">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-center">
            
            <EditorialReveal delay={0.05}>
              <div className="md:border-r border-[#292929] md:pr-6 space-y-1">
                <span className="label-mono text-[#8a8a8a] block">001 // ACADEMIC FOUNDATION</span>
                <p className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
                  BSc IN AI
                </p>
                <span className="label-mono !text-[#f4521c] text-[10px] block">LINCOLN UNIVERSITY (2026)</span>
              </div>
            </EditorialReveal>

            <EditorialReveal delay={0.1}>
              <div className="md:border-r border-[#292929] md:px-6 space-y-1">
                <span className="label-mono text-[#8a8a8a] block">002 // SPECIALIZATION</span>
                <p className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
                  BEAUTY ONLY
                </p>
                <span className="label-mono !text-[#f4521c] text-[10px] block">PRESTIGE COSMETICS &amp; SKINCARE</span>
              </div>
            </EditorialReveal>

            <EditorialReveal delay={0.15}>
              <div className="md:border-r border-[#292929] md:px-6 space-y-1">
                <span className="label-mono text-[#8a8a8a] block">003 // PORTFOLIO ASSETS</span>
                <p className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
                  135+ ASSETS
                </p>
                <span className="label-mono !text-[#f4521c] text-[10px] block">5 MASTER CAMPAIGN PACKAGES</span>
              </div>
            </EditorialReveal>

            <EditorialReveal delay={0.2}>
              <div className="md:pl-6 space-y-1">
                <span className="label-mono text-[#8a8a8a] block">004 // PRODUCTION STUDIO</span>
                <p className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
                  WITLYN STUDIO
                </p>
                <span className="label-mono !text-[#f4521c] text-[10px] block">FOUNDER &amp; COMMERCIAL DIRECTOR</span>
              </div>
            </EditorialReveal>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 3 · THE CATEGORY THESIS (CONSUMER SKEPTICISM & SENSORY PROOF)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#050609] pt-16 pb-24 border-b border-[#292929]" aria-label="Category Thesis">
        <div className="container-luxury">
          {/* Top Meta Bar */}
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-8">
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f4521c]" />
              THE STRATEGIC THESIS
            </span>
            <span className="label-mono text-[#8a8a8a]">// WHY BEAUTY ADS FAIL</span>
          </div>

          {/* Centered High-Fashion Study Image Plate with Editorial Reveal */}
          <EditorialReveal delay={0.1} className="flex justify-center my-8">
            <div className="relative overflow-hidden w-full max-w-4xl h-[42vh] md:h-[62vh] border border-[#292929] bg-[#0b0c10] group">
              <img
                src="/images/solae/editorial/solae-photo-01.jpg"
                alt="Solaé Clear Serum Sensory Macro Study"
                className="w-full h-full object-cover object-center filter contrast-110 transition-transform duration-700 ease-luxury group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050609]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between label-mono text-[10px] text-[#ece8e1]/80">
                <span>MACRO STUDY // REFRACTIVE FORMULA CAUSTICS</span>
                <span className="text-[#f4521c]">STUDIO ARCHIVE</span>
              </div>
            </div>
          </EditorialReveal>

          {/* Colossal Right-Aligned Headline */}
          <div className="mt-14 mb-12">
            <h2 className="text-right font-inter font-black uppercase text-[clamp(28px,5.8vw,86px)] tracking-[-0.05em] leading-[0.98] text-[#ece8e1]">
              <MaskText
                align="right"
                lines={[
                  <span key="1">BEAUTY ADS DON’T FAIL FROM LACK OF BUDGET.</span>,
                  <span key="2" className="text-[#f4521c]">THEY FAIL FROM LACK OF SENSORY CONVICTION.</span>,
                ]}
              />
            </h2>
          </div>

          {/* Editorial Reality Statement with Editorial Reveal */}
          <EditorialReveal delay={0.15}>
            <div className="border-t border-[#292929] pt-8 mt-10">
              <div className="max-w-3xl space-y-3">
                <p className="label-mono !text-[#f4521c]">// CONSUMER SKEPTICISM &amp; VISUAL PROOF</p>
                <p className="font-inter text-lg sm:text-2xl font-bold leading-snug tracking-tight text-[#ece8e1]">
                  Ad creative fatigues rapidly because modern consumers ignore empty claims. They convert only when they visually feel the texture, see zero white-cast proof, and witness undeniable physical efficacy.
                </p>
              </div>
            </div>
          </EditorialReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 4 · THE 5-STAGE COMMERCIAL PRODUCTION PIPELINE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#050609] py-24 border-b border-[#292929]" aria-label="Production Pipeline">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f4521c]" />
              THE PRODUCTION PIPELINE
            </span>
            <span className="label-mono text-[#8a8a8a]">05 INTEGRATED STAGES</span>
          </div>

          <div className="mb-14">
            <h2 className="font-inter font-black uppercase text-[clamp(26px,4.8vw,72px)] tracking-[-0.05em] leading-[0.98] text-[#ece8e1]">
              <MaskText
                lines={[
                  <span key="1">A DISCIPLINED DIRECTING METHODOLOGY</span>,
                  <span key="2">BRIDGING BEHAVIORAL SCIENCE</span>,
                  <span key="3" className="text-[#f4521c]">AND PHOTOREALISTIC COMMERCIAL PRODUCTION.</span>,
                ]}
              />
            </h2>
            <p className="font-inter text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8a8a8a] max-w-2xl mt-6">
              Eliminating months of traditional agency bloat while elevating brand prestige and algorithmic acquisition performance.
            </p>
          </div>

          {/* Selora Process Module Cards Grid with Vertical Stagger */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {strategicSteps.map((step, idx) => (
              <EditorialReveal key={step.num} delay={idx * 0.08} className="h-full">
                <article
                  className="group relative flex flex-col justify-between border border-[#292929] bg-[#0b0c10] p-6 hover:border-[#f4521c] transition-colors duration-500 h-full"
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
              </EditorialReveal>
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
                COMMERCIAL PORTFOLIO · 05 SPEC CAMPAIGNS
              </span>
              <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1] leading-tight">
                <MaskText lines={['SELECTED COMMERCIAL WORK']} />
              </h2>
              <p className="font-inter text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8a8a8a] max-w-xl">
                Real category friction, scripted hook psychology, and studio-grade macro directing executed for prestige beauty SKUs.
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
          <div className="space-y-28">
            {caseStudies.map((study, idx) => (
              <EditorialReveal key={study.brand} delay={0.08} yOffset={36}>
                <div className="pt-8 border-t border-[#292929] first:border-none first:pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Left Column (5 Cols): Brand Title + Impact Takeaway */}
                    <div className={`lg:col-span-5 flex flex-col justify-between ${idx % 2 === 1 ? 'order-1 lg:order-2' : ''}`}>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-[#292929] pb-3">
                          <span className="label-mono !text-[#f4521c]">
                            CASE STUDY {study.num} // WITLYN VAULT
                          </span>
                          <span className="label-mono text-[#8a8a8a]">
                            STUDIO GRADE
                          </span>
                        </div>

                        <div>
                          <h3 className="font-inter font-black uppercase text-3xl sm:text-4xl text-[#ece8e1] hover:text-[#f4521c] transition-colors">
                            <Link href={study.link}>{study.brand}</Link>
                          </h3>
                        </div>

                        {/* Strategic Commercial Result & Deliverables */}
                        <div className="border-l-2 border-[#f4521c] pl-4 py-2 space-y-1.5 bg-[#0b0c10] border-y border-r border-[#292929]">
                          <span className="label-mono text-[10px] text-[#8a8a8a] block">
                            IMPACT // {study.deliverables}
                          </span>
                          <p className="font-inter text-xs sm:text-sm text-[#ece8e1] font-medium leading-relaxed">
                            {study.strategistThinking.commercialBenefit}
                          </p>
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
              </EditorialReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 5 · CREATIVE MULTIPLICATION · ONE PRODUCT, EVERY CHANNEL
      ════════════════════════════════════════════════════════════════════ */}
      <ChannelMultiplication />

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
              <MaskText lines={['THREE WAYS TO PARTNER']} />
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#8a8a8a]">
              Structured for hands-on 1:1 counsel, self-serve playbooks, or ongoing strategic syndicate access.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Card 1: Consulting / Advisory */}
            <EditorialReveal delay={0.1} className="h-full">
              <div className="border border-[#292929] bg-[#050609] p-8 flex flex-col justify-between hover:border-[#f4521c] transition-colors h-full">
                <div>
                  <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-6">
                    <span className="label-mono !text-[#f4521c]">FLAGSHIP // 01</span>
                    <span className="label-mono text-[#8a8a8a]">APPLICATION ONLY</span>
                  </div>

                  <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1] mb-3 leading-snug">
                    1:1 CREATIVE ADVISORY
                  </h3>
                  <p className="font-inter text-xs text-[#8a8a8a] mb-8 leading-relaxed">
                    Private high-touch counsel covering ad audits, campaign concepting, and rapid 72h commercial pipelines.
                  </p>
                  
                  <div className="pt-4 border-t border-[#292929] mb-8 label-mono text-[11px] !text-[#f4521c]">
                    // STRICTLY CAPPED AT 3 CONCURRENT BRANDS
                  </div>
                </div>

                <Button asChild className="btn-acid h-11 w-full rounded-none">
                  <Link href="/consulting" className="flex items-center justify-center gap-2">
                    <span>APPLY FOR ADVISORY</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </EditorialReveal>

            {/* Card 2: Campaign Systems */}
            <EditorialReveal delay={0.2} className="h-full">
              <div className="border border-[#292929] bg-[#050609] p-8 flex flex-col justify-between hover:border-[#f4521c] transition-colors h-full">
                <div>
                  <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-6">
                    <span className="label-mono !text-[#f4521c]">SYSTEMS // 02</span>
                    <span className="label-mono text-[#8a8a8a]">VAULT</span>
                  </div>

                  <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1] mb-3 leading-snug">
                    CAMPAIGN SYSTEMS
                  </h3>
                  <p className="font-inter text-xs text-[#8a8a8a] mb-8 leading-relaxed">
                    Battle-tested creative frameworks, commercial brief templates, and skincare hook matrices.
                  </p>

                  <div className="pt-4 border-t border-[#292929] mb-8 label-mono text-[11px] !text-[#f4521c]">
                    // WITLYN PRODUCTION STANDARD
                  </div>
                </div>

                <Button asChild variant="outline" className="h-11 w-full rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
                  <Link href="/work" className="flex items-center justify-center gap-2">
                    <span>EXPLORE CAMPAIGN VAULT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </EditorialReveal>

            {/* Card 3: Membership */}
            <EditorialReveal delay={0.3} className="h-full">
              <div className="border border-[#292929] bg-[#050609] p-8 flex flex-col justify-between hover:border-[#f4521c] transition-colors h-full">
                <div>
                  <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-6">
                    <span className="label-mono !text-[#f4521c]">SYNDICATE // 03</span>
                    <span className="label-mono text-[#8a8a8a]">LIMITED INTAKE</span>
                  </div>

                  <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1] mb-3 leading-snug">
                    THE ADVISORY SYNDICATE
                  </h3>
                  <p className="font-inter text-xs text-[#8a8a8a] mb-8 leading-relaxed">
                    Monthly beauty creative strategy dispatches, live campaign teardowns, and direct async feedback.
                  </p>

                  <div className="pt-4 border-t border-[#292929] mb-8 label-mono text-[11px] !text-[#f4521c]">
                    // CURATED FOUNDER COHORT
                  </div>
                </div>

                <Button asChild variant="outline" className="h-11 w-full rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
                  <Link href="/membership" className="flex items-center justify-center gap-2">
                    <span>EXPLORE MEMBERSHIP</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </EditorialReveal>

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
          STEP 9.5 · TALENT & RECRUITMENT FAST-TRACK (FOR CREATIVE LEADS & RECRUITERS)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="recruitment-fast-track" className="py-24 border-t border-[#292929] bg-[#07080c]" aria-label="Talent and Recruitment">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-12">
            <span className="label-mono !text-[#f4521c] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f4521c]" />
              TALENT &amp; LEADERSHIP EVALUATION
            </span>
            <span className="label-mono text-[#8a8a8a]">
              FOR AGENCIES &amp; BRAND RECRUITERS
            </span>
          </div>

          <div className="border border-[#292929] bg-[#0b0c10] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-[2px] bg-[#f4521c]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading and Context */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f4521c] block animate-pulse" />
                  <span className="label-mono !text-[#f4521c] text-[10px] tracking-wider uppercase">
                    OPEN FOR SELECT CREATIVE ROLES
                  </span>
                </div>

                <h2 className="font-inter font-black uppercase text-2xl sm:text-4xl text-[#ece8e1] leading-tight">
                  EVALUATING FOR A CREATIVE STRATEGIST OR COMMERCIAL DIRECTOR ROLE?
                </h2>

                <p className="font-inter text-xs sm:text-sm text-[#bdb8b0] leading-relaxed max-w-xl">
                  Available for select Full-Time, Fractional, or Lead positions (Remote / Global). Bridging computational AI workflows with high-fashion sensory commercial directing.
                </p>

                {/* 4 Pillars of Candidate Fit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#292929]">
                  <div className="space-y-1">
                    <span className="label-mono text-[10px] text-[#8a8a8a] block">EDUCATION &amp; DEGREE</span>
                    <p className="font-inter text-xs text-[#ece8e1] font-bold">
                      BSc in Artificial Intelligence
                    </p>
                    <p className="text-[11px] text-[#8a8a8a]">Lincoln University College (2026)</p>
                  </div>

                  <div className="space-y-1">
                    <span className="label-mono text-[10px] text-[#8a8a8a] block">DIRECTORIAL STACK</span>
                    <p className="font-inter text-xs text-[#ece8e1] font-bold">
                      Neural Film &amp; Generative AI
                    </p>
                    <p className="text-[11px] text-[#8a8a8a]">Midjourney v6 · ComfyUI · Gen-3 · Luma</p>
                  </div>

                  <div className="space-y-1">
                    <span className="label-mono text-[10px] text-[#8a8a8a] block">POST-PRODUCTION</span>
                    <p className="font-inter text-xs text-[#ece8e1] font-bold">
                      Studio Finishing &amp; Audio
                    </p>
                    <p className="text-[11px] text-[#8a8a8a]">DaVinci Resolve · Foley ASMR · Premiere</p>
                  </div>

                  <div className="space-y-1">
                    <span className="label-mono text-[10px] text-[#8a8a8a] block">PAID PERFORMANCE</span>
                    <p className="font-inter text-xs text-[#ece8e1] font-bold">
                      Ad Architecture &amp; Psychology
                    </p>
                    <p className="text-[11px] text-[#8a8a8a]">Meta Ads · TikTok Creative · Hook Systems</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Recruiter Actions */}
              <div className="lg:col-span-5 flex flex-col gap-3 justify-center bg-[#050609] p-6 sm:p-8 border border-[#292929]">
                <span className="label-mono text-[10px] text-[#8a8a8a] block mb-2">
                  DIRECT RECRUITER ACTIONS
                </span>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-acid h-12 w-full flex items-center justify-between px-5 font-bold text-xs uppercase tracking-wider rounded-none"
                >
                  <span>VIEW OFFICIAL RÉSUMÉ (PDF)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="/resume.pdf"
                  download="Sakib_Ziad_Resume.pdf"
                  className="h-11 w-full border border-[#383838] bg-[#111216] text-[#ece8e1] hover:border-[#f4521c] hover:text-[#f4521c] flex items-center justify-between px-5 font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <span>DOWNLOAD RÉSUMÉ (PDF)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-full border border-[#292929] bg-transparent text-[#8a8a8a] hover:text-[#ece8e1] hover:border-[#383838] flex items-center justify-between px-5 font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <span>VIEW LINKEDIN PROFILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <Link
                  href="/contact"
                  className="text-center pt-2 font-mono text-[11px] text-[#f4521c] hover:underline"
                >
                  Direct Inquiry: witlyn@sakibziad.my →
                </Link>
              </div>

            </div>
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
            {/* Left Column: Context */}
            <EditorialReveal delay={0.1} className="lg:col-span-5 space-y-6">
              <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1] leading-tight">
                <MaskText lines={['GET A FREE GAP &', 'OPPORTUNITY SNAPSHOT']} />
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
            </EditorialReveal>

            {/* Right Column: Diagnostic Form Card */}
            <EditorialReveal delay={0.2} className="lg:col-span-7">
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
                  <form onSubmit={handleDiagnosticSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                          BRAND WEBSITE URL *
                        </label>
                        <input
                          required
                          type="url"
                          placeholder="https://yourbrand.com"
                          value={diagnosticForm.websiteUrl}
                          onChange={(e) => setDiagnosticForm({ ...diagnosticForm, websiteUrl: e.target.value })}
                          className="w-full px-4 py-3 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
                        />
                      </div>
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
                          className="w-full px-4 py-3 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
                        />
                      </div>
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
            </EditorialReveal>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STEP 11 · OBJECTION-HANDLING FAQ & FINAL STRATEGY CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 border-t border-[#292929] bg-[#050609]" aria-label="Frequently Asked Questions">
        <div className="container-luxury max-w-4xl mx-auto space-y-20">

          {/* FAQ Accordion Section */}
          <div className="space-y-8">
            <div className="border-b border-[#292929] pb-4 flex items-center justify-between">
              <span className="label-mono !text-[#f4521c] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#f4521c]" />
                COMMON QUESTIONS
              </span>
              <span className="label-mono text-[#8a8a8a]">
                DIRECT ANSWERS
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1] leading-tight">
                <MaskText lines={['FREQUENTLY ASKED QUESTIONS']} />
              </h2>
              <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] max-w-xl">
                Addressing core commercial production standards, candidate availability, and strategic engagement models upfront.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    className="border border-[#292929] bg-[#0b0c10] overflow-hidden transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#111216] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className="label-mono !text-[#f4521c] text-xs">0{idx + 1}</span>
                        <h3 className="font-inter font-bold uppercase text-sm sm:text-base text-[#ece8e1] pr-2">
                          {faq.q}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8a8a8a] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#f4521c]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-[#292929] bg-[#07080c]">
                        <p className="font-inter text-xs sm:text-sm text-[#bdb8b0] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Final Call To Action Card */}
          <EditorialReveal delay={0.1}>
            <div className="border border-[#292929] bg-[#0b0c10] p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-[#f4521c]" />

              <span className="label-mono !text-[#f4521c] block">
                // LIMITED AVAILABILITY · STRICTLY 3 CONCURRENT BRANDS
              </span>
              <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1] leading-tight max-w-2xl mx-auto">
                <MaskText align="center" lines={['READY TO ELEVATE YOUR BEAUTY BRAND’S', 'COMMERCIAL CONVERSION?']} />
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
          </EditorialReveal>

        </div>
      </section>

    </div>
  )
}
