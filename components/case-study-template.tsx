'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Sliders,
  Package,
  Target,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Video,
  Camera,
  Compass,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const

export interface CaseStudyAsset {
  id: string
  title: string
  platform: 'all' | 'meta' | 'instagram' | 'editorial' | 'tiktok' | 'website' | 'studio'
  type: 'image' | 'video'
  src: string
  formatLabel: string
  aspectRatio: string
  caption: string // Exactly 1 simple short sentence
}

export interface CaseStudyData {
  campaignId: string
  caseNumber: string
  name: string
  tagline: string
  skuFocus: string
  deliverablesCount: string
  channelsText: string
  heroImage: string
  heroCaption: string
  heroBadge?: string
  brief: {
    whatItIs: string
    whyItExists: string
    whyDifferent: { title: string; desc: string }[]
    targetAudience: string
    packagingSpecs: {
      container: string
      labelTypography: string
    }
    marketAngles?: { title: string; desc: string }[]
  }
  strategy: {
    hooks: {
      id: number
      angle: string
      channelFit: string
      quote: string
      whyChosen?: string
      rationale: string
      projectedRoas?: string
      thumbStopRate?: string
      cpaImpact?: string
      commercialBenefit?: string
      expectedOutcome?: string
    }[]
  }
  assets: CaseStudyAsset[]
  tabs: { id: string; label: string }[]
  prevLink: { href: string; label: string }
  nextLink: { href: string; label: string }
}

// ── Horizontal Swipeable Row Component for Stills ─────────────────────────
function SwipeableStillsRow({
  title,
  subtitle,
  assets,
  badgeText,
}: {
  title: string
  subtitle: string
  assets: CaseStudyAsset[]
  badgeText: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const offset = direction === 'left' ? -360 : 360
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  if (assets.length === 0) return null

  return (
    <div className="space-y-4 pt-8 border-t border-black/[0.08] dark:border-white/[0.08] first:border-none first:pt-0">
      {/* Row Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {badgeText}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-zinc-600 dark:text-zinc-300">
              {assets.length} Stills · Swipe ➔
            </span>
          </div>
          <h3 className="font-fraunces text-xl sm:text-2xl text-zinc-900 dark:text-white font-medium">
            {title}
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light">
            {subtitle}
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-full liquid-glass border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-full liquid-glass border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Swipeable Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {assets.map((asset, idx) => (
          <div
            key={asset.id}
            className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl liquid-glass border border-black/10 dark:border-white/15 p-3 flex flex-col justify-between group hover:border-black/25 dark:hover:border-white/30 transition-all duration-300 shadow-md"
          >
            {/* Full Image Container — Strictly Preserved & Uncropped */}
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/[0.03] dark:bg-black/40">
              <Image
                src={asset.src}
                alt={asset.title}
                fill
                unoptimized
                sizes="320px"
                className="object-contain p-1 transition-transform duration-500 ease-luxury group-hover:scale-102"
              />
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-black/70 backdrop-blur-md text-white border border-white/20">
                  Still 0{idx + 1}
                </span>
              </div>
            </div>

            {/* 1 Short Sentence Caption directly visible up front */}
            <div className="pt-3 px-1 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-inter">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {asset.title}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 shrink-0 ml-1">
                  {asset.formatLabel.split(' ')[0]}
                </span>
              </div>
              <p className="text-[11px] font-inter text-zinc-600 dark:text-zinc-400 font-light leading-snug">
                {asset.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Interactive Video Player Card Component ───────────────────────────────
function VideoCard({
  video,
  index,
}: {
  video: CaseStudyAsset
  index: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const el = videoRef.current
    if (el) {
      el.muted = isMuted
      el.play().catch(() => {
        // Fallback if browser enforces user gesture
      })
    }
  }, [isMuted])

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
    <div className="rounded-2xl liquid-glass border border-black/10 dark:border-white/15 p-3 sm:p-4 flex flex-col justify-between group hover:border-black/25 dark:hover:border-white/30 transition-all duration-300 shadow-lg">
      {/* Video Container */}
      <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black shadow-inner cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={video.src}
          autoPlay
          preload="metadata"
          loop
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Video Overlay Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
            <Video className="w-3 h-3 text-emerald-400" />
            <span>Motion 0{index + 1}</span>
          </span>
        </div>

        {/* Audio Sound Toggle Button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Click to unmute" : "Click to mute"}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 hover:bg-black hover:scale-110 active:scale-95 transition-all shadow-md group/btn"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-zinc-300 group-hover/btn:text-white" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          )}
        </button>

        {/* Play/Pause Button Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity pointer-events-none">
          <div className={`w-12 h-12 rounded-full bg-white/95 text-black flex items-center justify-center shadow-xl transition-transform ${isPlaying ? 'opacity-0 group-hover:opacity-90 scale-90' : 'opacity-100 scale-100'}`}>
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            )}
          </div>
        </div>

        <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-white/80 bg-black/60 px-1.5 py-0.5 rounded flex items-center gap-1.5">
          <span>{isPlaying ? 'Playing' : 'Tap to Play'}</span>
          <span>·</span>
          <span>{isMuted ? 'Muted' : 'Sound On'}</span>
        </div>
      </div>

      {/* 1 Short Sentence Caption directly underneath */}
      <div className="pt-3 px-1 space-y-1">
        <div className="flex items-center justify-between text-xs font-inter">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {video.title}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase">
            9:16 Vertical
          </span>
        </div>
        <p className="text-xs font-inter text-zinc-600 dark:text-zinc-400 font-light leading-snug">
          {video.caption}
        </p>
      </div>
    </div>
  )
}

export function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  const [openHookIndex, setOpenHookIndex] = useState<number | null>(0)

  // Separate Videos and Stills
  const videoAssets = data.assets.filter((a) => a.type === 'video')
  const stillAssets = data.assets.filter((a) => a.type === 'image')

  // Group Stills by Platform
  const metaStills = stillAssets.filter((a) => a.platform === 'meta')
  const instagramStills = stillAssets.filter((a) => a.platform === 'instagram')
  const editorialStills = stillAssets.filter(
    (a) => a.platform === 'editorial' || a.platform === 'studio'
  )
  const otherStills = stillAssets.filter(
    (a) =>
      a.platform !== 'meta' &&
      a.platform !== 'instagram' &&
      a.platform !== 'editorial' &&
      a.platform !== 'studio'
  )

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-[#141416] selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* ── Top Breadcrumb Header ──────────────────────────────────────── */}
      <div className="pt-28 sm:pt-36 border-b border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="container-luxury py-3 flex items-center justify-between text-xs font-inter">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Work Archive</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-zinc-400 dark:text-zinc-500">Case Study {data.caseNumber}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="font-semibold text-zinc-900 dark:text-white">{data.name}</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300">
              {data.deliverablesCount}
            </span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO SECTION: PRODUCT HERO WITH 1 SHORT SENTENCE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden" aria-label={`${data.name} Hero`}>
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-amber-200/20 to-transparent dark:from-white/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-100/20 to-transparent dark:from-zinc-800/[0.1] blur-3xl pointer-events-none" />

        <div className="container-luxury relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_LUXURY }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-white/80 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {data.heroBadge || 'Flagship Commercial Direction · Witlyn Standard'}
                </div>

                <h1 className="heading-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#141416] dark:text-white mb-6">
                  {data.name}
                </h1>

                {/* 1 Short Sentence Positioning */}
                <div className="mb-8 p-5 rounded-2xl liquid-glass border border-black/10 dark:border-white/10">
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1.5">
                    Creative Strategy Rationale
                  </span>
                  <p className="font-fraunces text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 font-light italic leading-snug">
                    {data.tagline}
                  </p>
                </div>

                {/* Quick Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] text-xs font-inter text-zinc-600 dark:text-zinc-300">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-1">SKU Focus</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.skuFocus}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-1">Asset Vault</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.deliverablesCount}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-1">Distribution</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.channelsText}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Clean Hero Anchor Visual */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE_LUXURY }}
                className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden liquid-glass border border-black/10 dark:border-white/20 shadow-2xl group"
              >
                <Image
                  src={data.heroImage}
                  alt={`${data.name} master visual`}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white drop-shadow">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 block">Hero Product</span>
                    <p className="font-fraunces text-sm sm:text-base font-light">{data.heroCaption}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase border border-white/30 shrink-0 ml-2">
                    Master SKU
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. CREATIVE STRATEGIST DIRECT-RESPONSE ARCHITECTURE & HOOKS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-b border-black/[0.08] dark:border-white/[0.08] bg-surface/30" aria-label="Creative Strategy">
        <div className="container-luxury max-w-4xl space-y-10">
          
          <div>
            <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">01 · Strategic Rationale</p>
            <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl text-[#141416] dark:text-white">
              Creative Strategy &amp; Hook Architecture
            </h2>
            <p className="body-muted text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
              Every creative angle targets consumer friction points to maximize thumb-stop rate and paid-social conversion.
            </p>
          </div>

          {/* Hook Accordion */}
          <div className="space-y-3">
            {data.strategy.hooks.map((item, index) => {
              const isOpen = openHookIndex === index
              return (
                <div
                  key={item.id}
                  className="rounded-2xl liquid-glass border border-black/10 dark:border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenHookIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="font-mono text-xs sm:text-sm text-zinc-400">0{item.id}</span>
                      <div>
                        <h4 className="font-fraunces text-base sm:text-lg text-zinc-900 dark:text-white font-medium">
                          {item.angle}
                        </h4>
                        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                          Channel Fit: {item.channelFit}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-zinc-900 dark:text-white' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_LUXURY }}
                        className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-black/[0.05] dark:border-white/[0.05] space-y-4"
                      >
                        {/* Script Hook Quote */}
                        <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                            Script Hook Line (First 1.5s Thumb-Stop)
                          </span>
                          <p className="font-fraunces text-base sm:text-xl italic text-zinc-950 dark:text-white">
                            "{item.quote}"
                          </p>
                        </div>

                        {/* Performance & ROAS Scorecard */}
                        {(item.projectedRoas || item.thumbStopRate || item.cpaImpact) && (
                          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 text-center">
                            <div>
                              <span className="text-[9px] font-mono uppercase text-zinc-500 block">Target ROAS</span>
                              <span className="text-xs sm:text-sm font-fraunces text-zinc-900 dark:text-white font-medium">
                                {item.projectedRoas || '3.8x – 4.5x'}
                              </span>
                            </div>
                            <div className="border-x border-black/5 dark:border-white/10">
                              <span className="text-[9px] font-mono uppercase text-zinc-500 block">Thumb-Stop Rate</span>
                              <span className="text-xs sm:text-sm font-fraunces text-zinc-900 dark:text-white font-medium">
                                {item.thumbStopRate || '40%+ (3s View)'}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9px] font-mono uppercase text-zinc-500 block">CPA Efficiency</span>
                              <span className="text-xs sm:text-sm font-fraunces text-zinc-900 dark:text-white font-medium">
                                {item.cpaImpact || '-30% to -40%'}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {/* Why This Hook Was Chosen */}
                        {item.whyChosen && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block font-semibold">
                              🎯 Why This Hook Was Chosen
                            </span>
                            <p className="text-xs sm:text-sm font-inter text-zinc-700 dark:text-zinc-200 leading-relaxed font-light">
                              {item.whyChosen}
                            </p>
                          </div>
                        )}

                        {/* Psychological Rationale */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block font-semibold">
                            🧠 Consumer Psychological Rationale
                          </span>
                          <p className="text-xs sm:text-sm font-inter text-zinc-700 dark:text-zinc-200 leading-relaxed font-light">
                            {item.rationale}
                          </p>
                        </div>

                        {/* Commercial Benefit & Expected Outcome */}
                        <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-2">
                          {item.commercialBenefit && (
                            <div className="flex items-start gap-2 text-xs font-inter text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                              <span><strong>Commercial Benefit:</strong> {item.commercialBenefit}</span>
                            </div>
                          )}
                          {item.expectedOutcome && (
                            <div className="flex items-start gap-2 text-xs font-inter text-zinc-800 dark:text-zinc-300">
                              <Target className="w-4 h-4 shrink-0 mt-0.5 text-zinc-500" />
                              <span><strong>Expected Conversion Outcome:</strong> {item.expectedOutcome}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Product Brief Details */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400">Formula Definition</span>
              <h4 className="font-fraunces text-lg text-zinc-900 dark:text-white font-medium">What It Is</h4>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                {data.brief.whatItIs}
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400">Consumer Pain Point</span>
              <h4 className="font-fraunces text-lg text-zinc-900 dark:text-white font-medium">Why It Exists</h4>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                {data.brief.whyItExists}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. THE DELIVERABLES: VIDEOS FIRST, THEN SWIPEABLE STILLS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad" aria-label={`${data.name} Campaign Vault`}>
        <div className="container-luxury space-y-16">
          
          {/* Section Introduction */}
          <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
            <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">02 // Campaign Deliverables</p>
            <h2 className="heading-section text-3xl sm:text-4xl text-[#141416] dark:text-white">
              The Production Vault
            </h2>
            <p className="body-muted text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
              Performance video creatives followed by swipeable still suites. All assets fully visible up front.
            </p>
          </div>

          {/* ── PART A: MOTION & PERFORMANCE VIDEOS (FIRST!) ─────────────── */}
          {videoAssets.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-fraunces text-2xl text-zinc-900 dark:text-white font-medium">
                  Part 1 · Motion & Paid-Social Videos ({videoAssets.length})
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light -mt-3">
                Calibrated for high thumb-stop rate in the first 3 seconds with sensory formula textures and sound-on cues.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {videoAssets.map((video, idx) => (
                  <VideoCard key={video.id} video={video} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* ── PART B: STILL ASSET SUITES (SWIPEABLE 1, 2, 3, 4) ────────── */}
          <div className="space-y-12">
            <div>
              <h3 className="font-fraunces text-2xl text-zinc-900 dark:text-white font-medium mb-1">
                Part 2 · Omnichannel Stills & Swatches ({stillAssets.length})
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light">
                Swipe right to inspect each creative variant. Complete uncropped view without opening modals.
              </p>
            </div>

            {/* Meta Platform Stills Row */}
            {metaStills.length > 0 && (
              <SwipeableStillsRow
                badgeText="Meta Platform Suite"
                title="Meta Feed & Sponsored Stills"
                subtitle="Engineered for high conversion across 1:1 square feeds and 4:5 sponsored portraits."
                assets={metaStills}
              />
            )}

            {/* Instagram Suite Stills Row */}
            {instagramStills.length > 0 && (
              <SwipeableStillsRow
                badgeText="Instagram Architecture"
                title="Instagram Organic & Stories"
                subtitle="High-aesthetic beauty curation tailored for luxury feed algorithms and swipe-up stories."
                assets={instagramStills}
              />
            )}

            {/* Editorial & Master Studio Stills Row */}
            {editorialStills.length > 0 && (
              <SwipeableStillsRow
                badgeText="Studio Master Archives"
                title="Editorial Macro & Texture Captures"
                subtitle="Directional lighting studies focusing on packaging caustics, dropper dispense, and formula physics."
                assets={editorialStills}
              />
            )}

            {/* Other Stills (TikTok / Website) */}
            {otherStills.length > 0 && (
              <SwipeableStillsRow
                badgeText="Omnichannel Variants"
                title="TikTok Verticals & E-Commerce Banners"
                subtitle="Rapid vertical creator framing and wide-format e-commerce store headers."
                assets={otherStills}
              />
            )}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. PAGINATION & DIRECT ADVISORY CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-black/[0.08] dark:border-white/[0.08]">
        <div className="container-luxury max-w-4xl space-y-12">
          
          {/* Next / Previous Case Study Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={data.prevLink.href}
              className="p-5 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/30 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Previous Case</span>
                  <span className="font-fraunces text-base text-zinc-900 dark:text-white font-medium">
                    {data.prevLink.label}
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href={data.nextLink.href}
              className="p-5 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/30 transition-all group flex items-center justify-between text-right"
            >
              <div className="ml-auto">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Next Case</span>
                <span className="font-fraunces text-base text-zinc-900 dark:text-white font-medium">
                  {data.nextLink.label}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform ml-3" />
            </Link>
          </div>

          {/* Direct CTA */}
          <div className="p-8 sm:p-10 rounded-3xl liquid-glass border border-black/10 dark:border-white/20 text-center space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Commercial Direction & Advisory
            </span>
            <h3 className="font-fraunces text-2xl sm:text-3xl text-zinc-900 dark:text-white font-medium">
              Want category-defining creative systems for your brand?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-light max-w-lg mx-auto leading-relaxed">
              I partner with a small roster of beauty and skincare founders each quarter for full commercial direction, creative audits, and paid-social asset systems.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button size="lg" className="font-inter text-xs tracking-[0.2em] uppercase font-semibold">
                  Apply for a Strategy Call
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
