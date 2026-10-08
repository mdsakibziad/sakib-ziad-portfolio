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
    <div className="space-y-4 pt-8 border-t border-[#292929] first:border-none first:pt-0">
      {/* Row Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="label-mono !text-[#f4521c]">
              {badgeText}
            </span>
            <span className="label-mono text-[#8a8a8a] text-[10px]">
              · {assets.length} Stills · Swipe ➔
            </span>
          </div>
          <h3 className="font-inter font-black uppercase text-xl sm:text-2xl text-[#ece8e1]">
            {title}
          </h3>
          <p className="font-inter text-xs text-[#8a8a8a]">
            {subtitle}
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-8 h-8 border border-[#292929] bg-[#0b0c10] flex items-center justify-center text-[#ece8e1] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#f4521c] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-8 h-8 border border-[#292929] bg-[#0b0c10] flex items-center justify-center text-[#ece8e1] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#f4521c] transition-colors"
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
            className="snap-start shrink-0 w-[280px] sm:w-[320px] border border-[#292929] bg-[#0b0c10] p-3 flex flex-col justify-between group hover:border-[#f4521c] transition-all duration-300"
          >
            {/* Full Image Container — Strictly Preserved & Uncropped */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050609]">
              <Image
                src={asset.src}
                alt={asset.title}
                fill
                unoptimized
                sizes="320px"
                className="object-contain p-1 transition-transform duration-500 ease-luxury group-hover:scale-102"
              />
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-black/85 text-[#ece8e1] border border-[#292929]">
                  Still 0{idx + 1}
                </span>
              </div>
            </div>

            {/* 1 Short Sentence Caption directly visible up front */}
            <div className="pt-3 px-1 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-inter">
                <span className="font-bold uppercase text-[#ece8e1] truncate">
                  {asset.title}
                </span>
                <span className="label-mono text-[#8a8a8a] text-[10px] shrink-0 ml-1">
                  {asset.formatLabel.split(' ')[0]}
                </span>
              </div>
              <p className="font-inter text-[11px] text-[#8a8a8a] leading-snug">
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
    <div className="border border-[#292929] bg-[#0b0c10] p-3 sm:p-4 flex flex-col justify-between group hover:border-[#f4521c] transition-all duration-300">
      {/* Video Container */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black cursor-pointer" onClick={togglePlay}>
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
          <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-black/85 text-[#ece8e1] border border-[#292929] flex items-center gap-1">
            <Video className="w-3 h-3 text-[#f4521c]" />
            <span>Motion 0{index + 1}</span>
          </span>
        </div>

        {/* Audio Sound Toggle Button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Click to unmute" : "Click to mute"}
          className="absolute top-2 right-2 z-20 p-2 bg-black/85 text-[#ece8e1] border border-[#292929] hover:border-[#f4521c] hover:scale-105 active:scale-95 transition-all shadow-md group/btn"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#8a8a8a] group-hover/btn:text-white" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#f4521c] animate-pulse" />
          )}
        </button>

        {/* Play/Pause Button Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity pointer-events-none">
          <div className={`w-12 h-12 bg-black/80 border border-[#f4521c] text-[#ece8e1] flex items-center justify-center shadow-xl transition-transform ${isPlaying ? 'opacity-0 group-hover:opacity-90 scale-90' : 'opacity-100 scale-100'}`}>
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            )}
          </div>
        </div>

        <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-[#ece8e1]/80 bg-black/80 border border-[#292929] px-1.5 py-0.5 flex items-center gap-1.5">
          <span>{isPlaying ? 'Playing' : 'Tap to Play'}</span>
          <span>·</span>
          <span>{isMuted ? 'Muted' : 'Sound On'}</span>
        </div>
      </div>

      {/* 1 Short Sentence Caption directly underneath */}
      <div className="pt-3 px-1 space-y-1">
        <div className="flex items-center justify-between text-xs font-inter">
          <span className="font-bold uppercase text-[#ece8e1] truncate">
            {video.title}
          </span>
          <span className="label-mono text-[#8a8a8a] text-[10px] uppercase">
            9:16 Vertical
          </span>
        </div>
        <p className="font-inter text-xs text-[#8a8a8a] leading-snug">
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
    <div className="bg-[#050609] text-[#ece8e1] min-h-screen selection:bg-[#f4521c] selection:text-[#050609]">
      
      {/* ── Top Breadcrumb Header ──────────────────────────────────────── */}
      <div className="pt-28 sm:pt-36 border-b border-[#292929] bg-[#07080c]">
        <div className="container-luxury py-3 flex items-center justify-between text-xs font-inter">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[#8a8a8a] hover:text-[#f4521c] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Work Archive</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="label-mono text-[#8a8a8a] text-[11px]">CASE STUDY {data.caseNumber}</span>
            <span className="w-1 h-1 bg-[#f4521c]" />
            <span className="font-bold text-[#ece8e1] uppercase">{data.name}</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase bg-[#111216] border border-[#292929] text-[#8a8a8a]">
              {data.deliverablesCount}
            </span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO SECTION: PRODUCT HERO WITH 1 SHORT SENTENCE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-[#292929] overflow-hidden bg-[#050609]" aria-label={`${data.name} Hero`}>
        <div className="container-luxury relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_LUXURY }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 border border-[#292929] bg-[#0b0c10] px-3.5 py-1 text-[11px] uppercase tracking-[0.2em] text-[#ece8e1]">
                  <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                  <span>{data.heroBadge || 'SPEC COMMERCIAL · WITLYN STANDARD'}</span>
                </div>

                <h1 className="font-inter font-black uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#ece8e1]">
                  {data.name}
                </h1>

                {/* 1 Short Sentence Positioning */}
                <div className="p-6 border border-[#292929] bg-[#0b0c10] space-y-2">
                  <span className="label-mono !text-[#f4521c] text-[10px] block">
                    CREATIVE STRATEGY RATIONALE
                  </span>
                  <p className="font-inter text-base sm:text-lg text-[#ece8e1] font-medium leading-snug">
                    {data.tagline}
                  </p>
                </div>

                {/* Quick Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#292929] text-xs font-inter text-[#8a8a8a]">
                  <div>
                    <span className="block label-mono text-[10px] text-[#8a8a8a] mb-1">SKU FOCUS</span>
                    <span className="font-bold text-[#ece8e1]">{data.skuFocus}</span>
                  </div>
                  <div>
                    <span className="block label-mono text-[10px] text-[#8a8a8a] mb-1">ASSET VAULT</span>
                    <span className="font-bold text-[#ece8e1]">{data.deliverablesCount}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block label-mono text-[10px] text-[#8a8a8a] mb-1">DISTRIBUTION</span>
                    <span className="font-bold text-[#ece8e1]">{data.channelsText}</span>
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
                className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full overflow-hidden border border-[#292929] bg-[#0b0c10] group"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#ece8e1]">
                  <div>
                    <span className="label-mono text-[10px] text-[#8a8a8a] block">HERO PRODUCT</span>
                    <p className="font-inter text-sm sm:text-base font-bold uppercase">{data.heroCaption}</p>
                  </div>
                  <span className="px-3 py-1 bg-black/80 text-[10px] font-mono uppercase border border-[#292929] shrink-0 ml-2">
                    MASTER SKU
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
      <section className="py-20 border-b border-[#292929] bg-[#07080c]" aria-label="Creative Strategy">
        <div className="container-luxury max-w-4xl space-y-10">
          
          <div>
            <p className="label-mono !text-[#f4521c] mb-2">01 // STRATEGIC RATIONALE</p>
            <h2 className="font-inter font-black uppercase text-2xl sm:text-4xl text-[#ece8e1]">
              CREATIVE STRATEGY &amp; HOOK ARCHITECTURE
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] mt-1">
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
                  className="border border-[#292929] bg-[#0b0c10] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenHookIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#111216] transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="label-mono !text-[#f4521c]">0{item.id}</span>
                      <div>
                        <h4 className="font-inter font-bold uppercase text-sm sm:text-base text-[#ece8e1]">
                          {item.angle}
                        </h4>
                        <span className="label-mono text-[10px] text-[#8a8a8a]">
                          CHANNEL FIT: {item.channelFit}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a8a8a] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#f4521c]' : ''
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
                        className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-[#292929] space-y-4"
                      >
                        {/* Script Hook Quote */}
                        <div className="p-4 bg-[#050609] border border-[#292929]">
                          <span className="label-mono text-[10px] text-[#8a8a8a] block mb-1">
                            SCRIPT HOOK LINE (FIRST 1.5S THUMB-STOP)
                          </span>
                          <p className="font-inter text-base sm:text-lg font-bold text-[#ece8e1]">
                            "{item.quote}"
                          </p>
                        </div>

                        {/* Performance & ROAS Scorecard */}
                        {(item.projectedRoas || item.thumbStopRate || item.cpaImpact) && (
                          <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#050609] border border-[#292929] text-center">
                            <div>
                              <span className="label-mono text-[9px] text-[#8a8a8a] block">TARGET ROAS</span>
                              <span className="text-xs sm:text-sm font-mono text-[#ece8e1] font-bold">
                                {item.projectedRoas || '3.8x – 4.5x'}
                              </span>
                            </div>
                            <div className="border-x border-[#292929]">
                              <span className="label-mono text-[9px] text-[#8a8a8a] block">THUMB-STOP RATE</span>
                              <span className="text-xs sm:text-sm font-mono text-[#ece8e1] font-bold">
                                {item.thumbStopRate || '40%+ (3s View)'}
                              </span>
                            </div>
                            <div>
                              <span className="label-mono text-[9px] text-[#8a8a8a] block">CPA EFFICIENCY</span>
                              <span className="text-xs sm:text-sm font-mono text-[#f4521c] font-bold">
                                {item.cpaImpact || '-30% to -40%'}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {/* Why This Hook Was Chosen */}
                        {item.whyChosen && (
                          <div className="space-y-1.5">
                            <span className="label-mono text-[10px] text-[#8a8a8a] block">
                              WHY THIS HOOK WAS CHOSEN
                            </span>
                            <p className="text-xs sm:text-sm font-inter text-[#bdb8b0] leading-relaxed">
                              {item.whyChosen}
                            </p>
                          </div>
                        )}

                        {/* Psychological Rationale */}
                        <div className="space-y-1.5">
                          <span className="label-mono text-[10px] text-[#8a8a8a] block">
                            CONSUMER PSYCHOLOGICAL RATIONALE
                          </span>
                          <p className="text-xs sm:text-sm font-inter text-[#bdb8b0] leading-relaxed">
                            {item.rationale}
                          </p>
                        </div>

                        {/* Commercial Benefit & Expected Outcome */}
                        <div className="pt-2 border-t border-[#292929] space-y-2">
                          {item.commercialBenefit && (
                            <div className="flex items-start gap-2 text-xs font-inter text-[#ece8e1]">
                              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#f4521c]" />
                              <span><strong>Commercial Benefit:</strong> {item.commercialBenefit}</span>
                            </div>
                          )}
                          {item.expectedOutcome && (
                            <div className="flex items-start gap-2 text-xs font-inter text-[#8a8a8a]">
                              <Target className="w-4 h-4 shrink-0 mt-0.5 text-[#8a8a8a]" />
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
            <div className="p-6 border border-[#292929] bg-[#0b0c10] space-y-2">
              <span className="label-mono !text-[#f4521c] text-[10px]">FORMULA DEFINITION</span>
              <h4 className="font-inter font-bold uppercase text-lg text-[#ece8e1]">What It Is</h4>
              <p className="text-xs sm:text-sm text-[#8a8a8a] leading-relaxed">
                {data.brief.whatItIs}
              </p>
            </div>

            <div className="p-6 border border-[#292929] bg-[#0b0c10] space-y-2">
              <span className="label-mono !text-[#f4521c] text-[10px]">CONSUMER PAIN POINT</span>
              <h4 className="font-inter font-bold uppercase text-lg text-[#ece8e1]">Why It Exists</h4>
              <p className="text-xs sm:text-sm text-[#8a8a8a] leading-relaxed">
                {data.brief.whyItExists}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. THE DELIVERABLES: VIDEOS FIRST, THEN SWIPEABLE STILLS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-b border-[#292929] bg-[#050609]" aria-label={`${data.name} Campaign Vault`}>
        <div className="container-luxury space-y-16">
          
          {/* Section Introduction */}
          <div className="border-b border-[#292929] pb-6">
            <p className="label-mono !text-[#f4521c] mb-2">02 // CAMPAIGN DELIVERABLES</p>
            <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl text-[#ece8e1]">
              THE PRODUCTION VAULT
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] mt-1">
              Performance video creatives followed by swipeable still suites. All assets fully visible up front.
            </p>
          </div>

          {/* ── PART A: MOTION & PERFORMANCE VIDEOS (FIRST!) ─────────────── */}
          {videoAssets.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#f4521c]" />
                <h3 className="font-inter font-bold uppercase text-xl sm:text-2xl text-[#ece8e1]">
                  Part 1 · Motion &amp; Paid-Social Videos ({videoAssets.length})
                </h3>
              </div>
              <p className="font-inter text-xs text-[#8a8a8a] -mt-3">
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
              <h3 className="font-inter font-bold uppercase text-xl sm:text-2xl text-[#ece8e1] mb-1">
                Part 2 · Omnichannel Stills &amp; Swatches ({stillAssets.length})
              </h3>
              <p className="font-inter text-xs text-[#8a8a8a]">
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
      <section className="py-24 border-t border-[#292929] bg-[#07080c]">
        <div className="container-luxury max-w-4xl space-y-12">
          
          {/* Next / Previous Case Study Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={data.prevLink.href}
              className="p-5 border border-[#292929] bg-[#0b0c10] hover:border-[#f4521c] transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <ChevronLeft className="w-5 h-5 text-[#8a8a8a] group-hover:-translate-x-1 transition-transform group-hover:text-[#f4521c]" />
                <div>
                  <span className="label-mono text-[10px] text-[#8a8a8a] block">PREVIOUS CASE</span>
                  <span className="font-inter font-bold uppercase text-base text-[#ece8e1] group-hover:text-[#f4521c] transition-colors">
                    {data.prevLink.label}
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href={data.nextLink.href}
              className="p-5 border border-[#292929] bg-[#0b0c10] hover:border-[#f4521c] transition-all group flex items-center justify-between text-right"
            >
              <div className="ml-auto">
                <span className="label-mono text-[10px] text-[#8a8a8a] block">NEXT CASE</span>
                <span className="font-inter font-bold uppercase text-base text-[#ece8e1] group-hover:text-[#f4521c] transition-colors">
                  {data.nextLink.label}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8a8a8a] group-hover:translate-x-1 transition-transform ml-3 group-hover:text-[#f4521c]" />
            </Link>
          </div>

          {/* Direct CTA */}
          <div className="p-8 sm:p-12 border border-[#292929] bg-[#0b0c10] text-center space-y-5">
            <span className="label-mono !text-[#f4521c] block">
              // COMMERCIAL DIRECTION &amp; ADVISORY
            </span>
            <h3 className="font-inter font-black uppercase text-2xl sm:text-4xl text-[#ece8e1]">
              WANT CATEGORY-DEFINING CREATIVE SYSTEMS FOR YOUR BRAND?
            </h3>
            <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] max-w-lg mx-auto leading-relaxed">
              I partner with a select roster of beauty and skincare founders each quarter for full commercial direction, creative audits, and paid-social asset systems.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="btn-acid h-11 px-8 rounded-none">
                <Link href="/contact">
                  APPLY FOR A STRATEGY CALL
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 px-8 rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
                <a href="/resume.pdf" download="Sakib_Ziad_Resume.pdf">
                  DOWNLOAD RÉSUMÉ (PDF)
                </a>
              </Button>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
