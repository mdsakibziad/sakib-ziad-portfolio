'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
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
      rationale: string
    }[]
  }
  assets: CaseStudyAsset[]
  tabs: { id: string; label: string }[]
  prevLink: { href: string; label: string }
  nextLink: { href: string; label: string }
}

export function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null)
  const [openHookIndex, setOpenHookIndex] = useState<number | null>(0)

  // Filter assets
  const filteredAssets =
    activeTab === 'all'
      ? data.assets
      : data.assets.filter((a) => a.platform === activeTab)

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedAssetIndex === null) return
      if (e.key === 'Escape') setSelectedAssetIndex(null)
      if (e.key === 'ArrowRight') {
        setSelectedAssetIndex((prev) =>
          prev !== null ? (prev + 1) % filteredAssets.length : 0
        )
      }
      if (e.key === 'ArrowLeft') {
        setSelectedAssetIndex((prev) =>
          prev !== null ? (prev - 1 + filteredAssets.length) % filteredAssets.length : 0
        )
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedAssetIndex, filteredAssets.length])

  const activeAsset =
    selectedAssetIndex !== null ? filteredAssets[selectedAssetIndex] : null

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-[#141416] selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* ── Top Navigation / Breadcrumb Header ─────────────────────────── */}
      <div className="fixed top-20 left-0 right-0 z-40 backdrop-blur-md bg-white/70 dark:bg-black/60 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
        <div className="container-luxury py-3 flex items-center justify-between text-xs font-inter">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Work Archive</span>
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
          1. HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden" aria-label={`${data.name} Hero`}>
        {/* Ambient atmospheric backdrop */}
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
                  {data.heroBadge || 'Flagship Spec Commercial · Witlyn Vault'}
                </div>

                <h1 className="heading-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#141416] dark:text-white mb-6">
                  {data.name}
                </h1>

                {/* Positioning Tagline */}
                <div className="mb-8 p-5 rounded-2xl liquid-glass border border-black/10 dark:border-white/10">
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1.5">
                    Positioning Architecture
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
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 block">Anchor Studio Capture</span>
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
          2. THE BRIEF (PRODUCT CONTEXT — FULL PROFESSIONAL EDITORIAL TEXT)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-b border-black/[0.08] dark:border-white/[0.08]" aria-label="The Product Brief">
        <div className="container-luxury max-w-4xl space-y-12">
          
          <div>
            <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">01 // Formulation & Purpose</p>
            <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl text-[#141416] dark:text-white">
              The Product Brief
            </h2>
          </div>

          {/* What It Is & Why It Exists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Formula Definition
              </span>
              <h3 className="font-fraunces text-xl text-zinc-900 dark:text-white font-medium">What It Is</h3>
              <p className="body-editorial text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                {data.brief.whatItIs}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Market Friction
              </span>
              <h3 className="font-fraunces text-xl text-zinc-900 dark:text-white font-medium">Why It Exists</h3>
              <p className="body-editorial text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                {data.brief.whyItExists}
              </p>
            </div>
          </div>

          {/* Why It Is Different (Key Differentiators) */}
          <div className="p-6 sm:p-8 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Formulation & Utility Moat
            </span>
            <h3 className="font-fraunces text-2xl text-zinc-900 dark:text-white font-medium">Why It Is Different</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.brief.whyDifferent.map((diff, idx) => (
                <div key={idx} className="space-y-2 border-l-2 border-black/15 dark:border-white/20 pl-4">
                  <h4 className="font-inter text-sm font-semibold text-zinc-900 dark:text-white">
                    {diff.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                    {diff.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Market Angles (If applicable, e.g. USA vs Malaysia for Nuecera) */}
          {data.brief.marketAngles && data.brief.marketAngles.length > 0 && (
            <div className="p-6 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Geographic & Audience Positioning
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.brief.marketAngles.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-1">
                    <h5 className="font-inter text-xs font-semibold text-zinc-900 dark:text-white">{m.title}</h5>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packaging & Label Specs + Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-inter text-xs font-semibold">
                <Target className="w-4 h-4 text-zinc-500" />
                <span>Target Audience</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                {data.brief.targetAudience}
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-inter text-xs font-semibold">
                <Package className="w-4 h-4 text-zinc-500" />
                <span>Packaging & Label Specs</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                <strong className="text-zinc-900 dark:text-white font-medium">Container:</strong> {data.brief.packagingSpecs.container}
              </p>
              <div className="p-2.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                {data.brief.packagingSpecs.labelTypography}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. CREATIVE STRATEGY & HOOK RATIONALE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-b border-black/[0.08] dark:border-white/[0.08] bg-surface/30" aria-label="Creative Strategy">
        <div className="container-luxury max-w-4xl space-y-8">
          
          <div>
            <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">02 // Direct-Response Architecture</p>
            <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl text-[#141416] dark:text-white">
              Creative Strategy & Hook Rationale
            </h2>
            <p className="body-muted text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
              Engineered around consumer tension points and physical formula behaviors to arrest feed scroll.
            </p>
          </div>

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
                          Channel Deployment: {item.channelFit}
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
                        className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-black/[0.05] dark:border-white/[0.05] space-y-3"
                      >
                        <div className="p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/10">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                            Primary Hook Line
                          </span>
                          <p className="font-fraunces text-base sm:text-lg italic text-zinc-900 dark:text-white">
                            "{item.quote}"
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm font-inter text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                          {item.rationale}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. THE WORK — CURATED ASSET VAULT WITH 1-SENTENCE CAPTIONS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad" aria-label={`${data.name} Asset Vault`}>
        <div className="container-luxury">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
            <div>
              <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">03 // Curated Deliverables</p>
              <h2 className="heading-section text-3xl sm:text-4xl text-[#141416] dark:text-white">
                The Campaign Vault
              </h2>
              <p className="body-muted text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
                Full production archive spanning feed stills, vertical motion reels, and architectural setups.
              </p>
            </div>

            {/* Tab Controls */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
              {data.tabs.map((tab) => {
                const count = tab.id === 'all'
                  ? data.assets.length
                  : data.assets.filter((a) => a.platform === tab.id).length
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-inter transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? 'bg-[#141416] text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                        : 'bg-black/5 dark:bg-white/10 text-zinc-500 dark:text-zinc-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredAssets.map((asset, idx) => (
              <motion.div
                key={asset.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.02, 0.3) }}
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedAssetIndex(idx)}
              >
                <div className="rounded-2xl liquid-glass overflow-hidden border border-black/10 dark:border-white/15 p-2 sm:p-2.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-black/25 dark:group-hover:border-white/30 group-hover:shadow-xl flex-1 flex flex-col justify-between">
                  
                  {/* Media Container */}
                  <div className={`relative ${asset.aspectRatio} w-full rounded-xl overflow-hidden bg-black/[0.04] dark:bg-black/40`}>
                    {asset.type === 'image' ? (
                      <Image
                        src={asset.src}
                        alt={asset.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full relative bg-zinc-900">
                        <video
                          src={`${asset.src}#t=0.5`}
                          preload="metadata"
                          muted
                          playsInline
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none group-hover:bg-black/10 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Platform Tag Badge Overlay */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {asset.platform}
                      </span>
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <span className="p-1 rounded-md bg-black/70 backdrop-blur text-white flex items-center justify-center">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* 1 Short Sentence Caption under every photo/video */}
                  <div className="pt-2.5 px-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-inter">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {asset.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0 ml-1">
                        {asset.formatLabel.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] font-inter text-zinc-600 dark:text-zinc-400 font-light leading-snug line-clamp-2">
                      {asset.caption}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. CASE STUDY PAGINATION & STRATEGY CTA
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
              <div className="flex items-center gap-3 justify-end w-full">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Next Case</span>
                  <span className="font-fraunces text-base text-zinc-900 dark:text-white font-medium">
                    {data.nextLink.label}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Bottom Strategy Call CTA */}
          <div className="p-8 sm:p-12 rounded-3xl liquid-glass border border-black/10 dark:border-white/10 text-center space-y-6">
            <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400">Autonomous Creative Direction</p>
            <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl text-[#141416] dark:text-white">
              Ready to Engineer Your Brand's Creative Systems?
            </h2>
            <p className="body-muted text-sm sm:text-base max-w-xl mx-auto text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              We eliminate traditional studio shoot fatigue by building unified, multi-channel asset engines around verified 3D and generative brand models.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Apply for Strategy Advisory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/work" className="flex items-center gap-2">
                  <span>Explore Full Archive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. LIGHTBOX MODAL WITH 1-SENTENCE CAPTIONS
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeAsset && selectedAssetIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-4 sm:p-6"
            onClick={() => setSelectedAssetIndex(null)}
          >
            <div
              className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAssetIndex(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={() =>
                  setSelectedAssetIndex((prev) =>
                    prev !== null ? (prev - 1 + filteredAssets.length) % filteredAssets.length : 0
                  )
                }
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 rounded-full backdrop-blur-md transition-all z-20"
                aria-label="Previous Asset"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() =>
                  setSelectedAssetIndex((prev) =>
                    prev !== null ? (prev + 1) % filteredAssets.length : 0
                  )
                }
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 rounded-full backdrop-blur-md transition-all z-20"
                aria-label="Next Asset"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Media Display */}
              <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/50 shadow-2xl">
                {activeAsset.type === 'image' ? (
                  <div className="relative w-full h-[65vh] max-h-[75vh]">
                    <Image
                      src={activeAsset.src}
                      alt={activeAsset.title}
                      fill
                      unoptimized
                      sizes="90vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <video
                    src={activeAsset.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[75vh] max-w-full rounded-2xl object-contain"
                  />
                )}
              </div>

              {/* Lightbox Caption: 1 Simple Short Sentence */}
              <div className="mt-4 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center max-w-2xl space-y-1">
                <div className="flex items-center justify-center gap-3 text-xs font-mono uppercase text-white/70">
                  <span>{activeAsset.title}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{activeAsset.platform}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{activeAsset.formatLabel}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{selectedAssetIndex + 1} / {filteredAssets.length}</span>
                </div>
                <p className="text-xs sm:text-sm font-inter text-white font-light">
                  {activeAsset.caption}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
