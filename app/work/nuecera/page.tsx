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
  BarChart3,
  FileText,
  AlertCircle,
  Eye,
  Check,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const

interface Asset {
  id: string
  title: string
  platform: 'meta' | 'instagram' | 'tiktok' | 'website'
  type: 'image' | 'video'
  src: string
  formatLabel: string
  aspectRatio: string
}

const NUECERA_ASSETS: Asset[] = [
  // ── Meta Platform Assets (22) ──────────────────────────────
  {
    id: 'meta-p1',
    title: 'Meta Product Hero',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-product-01.jpg',
    formatLabel: '1:1 Square Feed Still',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-p2',
    title: 'Meta Studio Still',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-product-02.jpg',
    formatLabel: '1:1 Square Feed Still',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-p3',
    title: 'Meta Architectural Still',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-product-03.jpg',
    formatLabel: '1:1 Square Feed Still',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-s1',
    title: 'Meta Feed Still 01',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-still-01.jpg',
    formatLabel: '4:5 Feed Portrait',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 'meta-s2',
    title: 'Meta Feed Still 02',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-still-02.jpg',
    formatLabel: '4:5 Feed Portrait',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 'meta-s3',
    title: 'Meta Feed Still 03',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-still-03.jpg',
    formatLabel: '4:5 Feed Portrait',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 'meta-s4',
    title: 'Meta Feed Still 04',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-still-04.jpg',
    formatLabel: '4:5 Feed Portrait',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 'meta-o1',
    title: 'Meta Offer Variant A',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-offer-01.jpg',
    formatLabel: '1:1 Square Feed Ad',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-o2',
    title: 'Meta Offer Variant B',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-offer-02.jpg',
    formatLabel: '1:1 Square Feed Ad',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-c1',
    title: 'Meta Campaign Creative 01',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-creative-01.jpg',
    formatLabel: '1:1 Square Feed Still',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-c2',
    title: 'Meta Campaign Creative 02',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-creative-02.jpg',
    formatLabel: '1:1 Square Feed Still',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-c3',
    title: 'Meta Campaign Creative 03',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-creative-03.jpg',
    formatLabel: '1:1 Square Feed Still',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-c4',
    title: 'Meta Campaign Creative 04',
    platform: 'meta',
    type: 'image',
    src: '/images/nuecera/meta/meta-creative-04.jpg',
    formatLabel: '1:1 Square Feed Still',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'meta-v1',
    title: 'Meta Campaign Reel 01',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-01.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'meta-v2',
    title: 'Meta Campaign Reel 02',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-02.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'meta-v3',
    title: 'Meta Campaign Reel 03',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-03.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'meta-v4',
    title: 'Meta Campaign Reel 04',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-04.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'meta-v6',
    title: 'Meta Campaign Reel 05',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-06.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'meta-v7',
    title: 'Meta Campaign Reel 06',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-07.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'meta-v8',
    title: 'Meta Campaign Reel 07',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-08.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'meta-vg8',
    title: 'Meta Generative Video Study 08',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-generation-08.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'meta-vg10',
    title: 'Meta Generative Video Study 10',
    platform: 'meta',
    type: 'video',
    src: '/images/nuecera/meta/meta-video-generation-10.mp4',
    formatLabel: '9:16 Vertical Video',
    aspectRatio: 'aspect-[9/16]',
  },

  // ── Instagram Platform Assets (8) ───────────────────────────
  {
    id: 'ig-c1',
    title: 'Instagram Ad Creative 01',
    platform: 'instagram',
    type: 'image',
    src: '/images/nuecera/instagram/instagram-creative-01.jpg',
    formatLabel: '1:1 Square Feed Ad',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'ig-c2',
    title: 'Instagram Ad Creative 02',
    platform: 'instagram',
    type: 'image',
    src: '/images/nuecera/instagram/instagram-creative-02.jpg',
    formatLabel: '1:1 Square Feed Ad',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'ig-c3',
    title: 'Instagram Ad Creative 03',
    platform: 'instagram',
    type: 'image',
    src: '/images/nuecera/instagram/instagram-creative-03.jpg',
    formatLabel: '1:1 Square Feed Ad',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'ig-c4',
    title: 'Instagram Ad Creative 04',
    platform: 'instagram',
    type: 'image',
    src: '/images/nuecera/instagram/instagram-creative-04.jpg',
    formatLabel: '1:1 Square Feed Ad',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'ig-s1',
    title: 'Instagram Feed Still 01',
    platform: 'instagram',
    type: 'image',
    src: '/images/nuecera/instagram/instagram-still-01.jpg',
    formatLabel: '4:5 Feed Portrait',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 'ig-s2',
    title: 'Instagram Feed Still 02',
    platform: 'instagram',
    type: 'image',
    src: '/images/nuecera/instagram/instagram-still-02.jpg',
    formatLabel: '4:5 Feed Portrait',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 'ig-s3',
    title: 'Instagram Feed Still 03',
    platform: 'instagram',
    type: 'image',
    src: '/images/nuecera/instagram/instagram-still-03.jpg',
    formatLabel: '4:5 Feed Portrait',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 'ig-story1',
    title: 'Instagram Story Creative',
    platform: 'instagram',
    type: 'image',
    src: '/images/nuecera/instagram/instagram-story-01.jpg',
    formatLabel: '9:16 Vertical Story',
    aspectRatio: 'aspect-[9/16]',
  },

  // ── TikTok Platform Assets (4) ──────────────────────────────
  {
    id: 'tt-s1',
    title: 'TikTok Feed Creative 01',
    platform: 'tiktok',
    type: 'image',
    src: '/images/nuecera/tiktok/tiktok-still-01.jpg',
    formatLabel: '9:16 Vertical Feed',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'tt-s2',
    title: 'TikTok Feed Creative 02',
    platform: 'tiktok',
    type: 'image',
    src: '/images/nuecera/tiktok/tiktok-still-02.jpg',
    formatLabel: '9:16 Vertical Feed',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'tt-s3',
    title: 'TikTok Feed Creative 03',
    platform: 'tiktok',
    type: 'image',
    src: '/images/nuecera/tiktok/tiktok-still-03.jpg',
    formatLabel: '9:16 Vertical Feed',
    aspectRatio: 'aspect-[9/16]',
  },
  {
    id: 'tt-s4',
    title: 'TikTok Feed Creative 04',
    platform: 'tiktok',
    type: 'image',
    src: '/images/nuecera/tiktok/tiktok-still-04.jpg',
    formatLabel: '9:16 Vertical Feed',
    aspectRatio: 'aspect-[9/16]',
  },

  // ── Website Asset (1) ───────────────────────────────────────
  {
    id: 'web-s1',
    title: 'Website Hero Banner',
    platform: 'website',
    type: 'image',
    src: '/images/nuecera/website/website-still-01.jpg',
    formatLabel: '16:9 Hero Banner',
    aspectRatio: 'aspect-[16/9]',
  },
]

export default function NueceraCaseStudyPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'meta' | 'instagram' | 'tiktok' | 'website'>('all')
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null)
  const [openHookIndex, setOpenHookIndex] = useState<number | null>(null)

  // Filtered assets
  const filteredAssets = activeTab === 'all'
    ? NUECERA_ASSETS
    : NUECERA_ASSETS.filter((a) => a.platform === activeTab)

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

  // Current active asset in modal
  const activeAsset = selectedAssetIndex !== null ? filteredAssets[selectedAssetIndex] : null

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-[#141416] selection:text-white dark:selection:bg-white dark:selection:text-black">

      {/* ── Top Navigation Bar / Breadcrumb ──────────────────────────────── */}
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
            <span className="text-zinc-400 dark:text-zinc-500">Case Study 04</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="font-semibold text-zinc-900 dark:text-white">NUÉCERA</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300">
              35 Assets Vault
            </span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO SECTION (Full-Bleed Visual Anchor)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden" aria-label="Nuécera Hero">
        {/* Ambient atmospheric backdrop */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-emerald-200/20 to-transparent dark:from-emerald-950/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-100/20 to-transparent dark:from-white/[0.02] blur-3xl pointer-events-none" />

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
                  Spec Campaign System · Witlyn Vault
                </div>

                <h1 className="heading-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#141416] dark:text-white mb-6">
                  NUÉCERA
                </h1>

                {/* One-line positioning tag */}
                <div className="mb-8 p-4 rounded-xl liquid-glass border border-black/10 dark:border-white/10">
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
                    Campaign Positioning
                  </span>
                  <p className="font-fraunces text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 font-light italic">
                    [PLACEHOLDER: one-line product/campaign tagline — e.g. "Barrier repair moisturizer campaign"]
                  </p>
                </div>

                {/* Quick Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] text-xs font-inter text-zinc-600 dark:text-zinc-300">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-1">SKU Focus</span>
                    <span className="font-medium text-zinc-900 dark:text-white">Moisturizing Cream</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-1">Asset Vault</span>
                    <span className="font-medium text-zinc-900 dark:text-white">35 Omnichannel Creatives</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-1">Channels Deployed</span>
                    <span className="font-medium text-zinc-900 dark:text-white">Meta · IG · TikTok · Web</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Clean High-Impact Hero Still */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE_LUXURY }}
                className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden liquid-glass border border-black/10 dark:border-white/20 shadow-2xl group"
              >
                <Image
                  src="/images/nuecera/meta/meta-product-02.jpg"
                  alt="NUÉCERA Moisturizing Cream clean studio anchor visual"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white drop-shadow">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 block">Anchor Studio Capture</span>
                    <span className="font-fraunces text-base font-light">16 OZ Daily Moisturizing Cream</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase border border-white/30">
                    Master Asset
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. THE BRIEF (PRODUCT CONTEXT — STRICTLY MARKED AS PENDING)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-b border-black/[0.08] dark:border-white/[0.08]" aria-label="The Product Brief">
        <div className="container-luxury max-w-4xl">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">01 // Product Context</p>
              <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl text-[#141416] dark:text-white">
                The Product Brief
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Pending Input</span>
            </div>
          </div>

          {/* Explicit Pending Placeholder Callout Box (Dashed luxury border) */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-amber-500/30 dark:border-amber-400/25 bg-amber-500/[0.03] dark:bg-amber-400/[0.02] space-y-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-3 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                <p className="font-semibold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                  [PLACEHOLDER: Product Brief not yet written.]
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 font-sans sm:font-mono leading-relaxed">
                  When ready, this section will cover:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 dark:text-zinc-300">
                  <li>What the product is</li>
                  <li>Why it exists / the market gap it addresses</li>
                  <li>What makes it different</li>
                  <li>Its core unique selling point (USP)</li>
                </ul>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                  Note: Visually present in draft state. Unfabricated authentic placeholder awaiting founder/client documentation.
                </p>
              </div>
            </div>

            {/* Empty-State Structural Skeleton Cards (Ready for real content insertion) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-amber-500/20 dark:border-amber-400/20">
              <div className="p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">Slot 01</span>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Product Formulation</p>
                <p className="text-[11px] text-zinc-500 font-mono">[Pending SKU Overview]</p>
              </div>
              <div className="p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">Slot 02</span>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Market Gap</p>
                <p className="text-[11px] text-zinc-500 font-mono">[Pending Category Vacuum]</p>
              </div>
              <div className="p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">Slot 03</span>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Core USP</p>
                <p className="text-[11px] text-zinc-500 font-mono">[Pending Value Rationale]</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. CREATIVE STRATEGY (HOOK RATIONALE — STRICTLY MARKED AS PENDING)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-b border-black/[0.08] dark:border-white/[0.08] bg-surface/30" aria-label="Creative Strategy">
        <div className="container-luxury max-w-4xl">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">02 // Hook Framework</p>
              <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl text-[#141416] dark:text-white">
                Creative Strategy & Hook Breakdown
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Pending Input</span>
            </div>
          </div>

          {/* Pending Strategy Note */}
          <div className="p-6 rounded-2xl border-2 border-dashed border-amber-500/30 dark:border-amber-400/25 bg-amber-500/[0.03] dark:bg-amber-400/[0.02] mb-8 font-mono text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-3">
            <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <p className="font-semibold text-amber-900 dark:text-amber-200">
                [PLACEHOLDER: Creative Strategy / hook breakdown not yet written.]
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 font-sans sm:font-mono">
                When ready, this section will list each hook angle used in the campaign (as an accordion or card grid) with a short rationale for why that angle was chosen for this audience/product.
              </p>
            </div>
          </div>

          {/* Reusable Empty-State Hook Accordion Structure */}
          <div className="space-y-3">
            {[
              {
                id: 1,
                hookAngle: 'Hook Angle 01: Problem-Agitation & Skin Tightness',
                channelFit: 'Meta Feed & IG Portrait Stills',
                rationalePlaceholder: '[PLACEHOLDER: Target customer friction rationale — addressing the common consumer complaint that heavy moisturizing creams fail to penetrate impaired skin barriers.]',
              },
              {
                id: 2,
                hookAngle: 'Hook Angle 02: Tactile Swirl & Formula Sensoriality',
                channelFit: 'TikTok 9:16 Video & IG Story',
                rationalePlaceholder: '[PLACEHOLDER: Sensorial macro-lighting rationale — arresting passive feed scrolling through visceral, high-definition cream consistency demonstration.]',
              },
              {
                id: 3,
                hookAngle: 'Hook Angle 03: Clinical Authority & Ingredient Proof',
                channelFit: 'Meta Square Still & Retargeting Feed',
                rationalePlaceholder: '[PLACEHOLDER: Dermatological validation rationale — positioning 3 Essential Ceramides and Hyaluronic Acid against commodity barrier products.]',
              },
              {
                id: 4,
                hookAngle: 'Hook Angle 04: Lifestyle Integration & Morning Bathroom Counter',
                channelFit: 'Website Hero Banner & Ambient Social',
                rationalePlaceholder: '[PLACEHOLDER: Prestige habit-stacking rationale — framing the 16 oz tub as an immutable, daily bathroom counter fixture for elevated morning rituals.]',
              },
            ].map((item, index) => {
              const isOpen = openHookIndex === index
              return (
                <div
                  key={item.id}
                  className="rounded-2xl liquid-glass border border-black/10 dark:border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenHookIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-400">0{item.id}</span>
                      <div>
                        <h4 className="font-fraunces text-base sm:text-lg text-zinc-900 dark:text-white font-medium">
                          {item.hookAngle}
                        </h4>
                        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                          Channel Application: {item.channelFit}
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
                        className="px-5 pb-5 pt-1 border-t border-black/[0.05] dark:border-white/[0.05]"
                      >
                        <div className="p-3.5 rounded-xl bg-amber-500/[0.04] dark:bg-amber-400/[0.03] border border-amber-500/20 text-xs font-mono text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {item.rationalePlaceholder}
                        </div>
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
          4. THE WORK — CURATED, TABBED ASSET GALLERY (35 ASSETS)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad" aria-label="Nuécera Asset Vault">
        <div className="container-luxury">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
            <div>
              <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">03 // Curated Deliverables</p>
              <h2 className="heading-section text-3xl sm:text-4xl text-[#141416] dark:text-white">
                The Asset Vault
              </h2>
              <p className="body-muted text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
                A structured omnichannel campaign suite produced across multiple formats and aspect ratios.
              </p>
            </div>

            {/* Tab Filter Controls */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl liquid-glass border border-black/10 dark:border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All Assets', count: NUECERA_ASSETS.length },
                { id: 'meta', label: 'Meta', count: 22 },
                { id: 'instagram', label: 'Instagram', count: 8 },
                { id: 'tiktok', label: 'TikTok', count: 4 },
                { id: 'website', label: 'Website', count: 1 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Asset Grid (Mix of 1:1, 4:5, 9:16 and 16:9 thumbnails) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredAssets.map((asset, idx) => (
              <motion.div
                key={asset.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.02, 0.3) }}
                className="group cursor-pointer"
                onClick={() => setSelectedAssetIndex(idx)}
              >
                <div className="rounded-2xl liquid-glass overflow-hidden border border-black/10 dark:border-white/15 p-2 sm:p-2.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-black/25 dark:group-hover:border-white/30 group-hover:shadow-xl">
                  
                  {/* Media Container */}
                  <div className={`relative ${asset.aspectRatio} w-full rounded-xl overflow-hidden bg-black/[0.04] dark:bg-black/40`}>
                    {asset.type === 'image' ? (
                      <Image
                        src={asset.src}
                        alt={`${asset.title} - ${asset.formatLabel}`}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
                      />
                    ) : (
                      /* Video Item Thumbnail with First Frame Preview & Play Icon Overlay */
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

                    {/* Hover Zoom Prompt */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <span className="p-1 rounded-md bg-black/70 backdrop-blur text-white flex items-center justify-center">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Minimal Caption: Platform + Format Only (Strictly visual-first) */}
                  <div className="pt-2.5 pb-1 px-1 flex items-center justify-between text-[11px] font-inter">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {asset.title}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 shrink-0 ml-1">
                      {asset.formatLabel.split(' ')[0]}
                    </span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. PROJECTED PERFORMANCE (STRICTLY MARKED AS PENDING)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-black/[0.08] dark:border-white/[0.08] bg-[#F7F6F2] dark:bg-[#0E0E0D]" aria-label="Projected Performance">
        <div className="container-luxury max-w-4xl">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-2">04 // Performance Modeling</p>
              <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl text-[#141416] dark:text-white">
                Projected Performance
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Pending Input</span>
            </div>
          </div>

          {/* Pending Strategy Callout Box */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-amber-500/30 dark:border-amber-400/25 bg-amber-500/[0.03] dark:bg-amber-400/[0.02] space-y-6">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-2 font-mono text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p className="font-semibold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                  [PLACEHOLDER: Strategy document / projected ROAS and revenue modeling not yet written.]
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 font-sans sm:font-mono">
                  When ready, this section will show projected performance metrics clearly labeled as projections (not achieved results), with the methodology briefly noted.
                </p>
              </div>
            </div>

            {/* Empty Metric Card Skeletons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-500/20 dark:border-amber-400/20">
              <div className="p-5 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Projected Metric 01
                </span>
                <p className="font-fraunces text-2xl text-zinc-900 dark:text-white font-light">
                  [PROJECTION]
                </p>
                <p className="text-[11px] font-mono text-zinc-500">
                  Target ROAS Range
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Projected Metric 02
                </span>
                <p className="font-fraunces text-2xl text-zinc-900 dark:text-white font-light">
                  [PROJECTION]
                </p>
                <p className="text-[11px] font-mono text-zinc-500">
                  Target First 3s Hook Rate
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Projected Metric 03
                </span>
                <p className="font-fraunces text-2xl text-zinc-900 dark:text-white font-light">
                  [PROJECTION]
                </p>
                <p className="text-[11px] font-mono text-zinc-500">
                  Creative Fatigue Extension
                </p>
              </div>
            </div>

            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 italic">
              Methodology disclaimer: All metrics in this section represent forward projections modeled on historical category benchmarks, not live client results.
            </p>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. BOTTOM NAVIGATION & STRATEGY CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-pad border-t border-black/[0.08] dark:border-white/[0.08]">
        <div className="container-luxury max-w-4xl text-center">
          <p className="eyebrow-luxury text-zinc-500 dark:text-zinc-400 mb-4">Autonomous Creative Systems</p>
          <h2 className="heading-section text-3xl sm:text-4xl text-[#141416] dark:text-white mb-6">
            Ready to Build Your Brand's Creative Vault?
          </h2>
          <p className="body-muted text-base max-w-xl mx-auto mb-8 text-zinc-600 dark:text-zinc-400">
            From single-SKU product worlds to autonomous multi-channel distribution engines, strategic AI creative turns one model into dozens of channel-ready assets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Apply for a Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/work" className="flex items-center gap-2">
                <span>Explore All Case Studies</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. LIGHTBOX / MODAL VIEWER
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeAsset && selectedAssetIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
            onClick={() => setSelectedAssetIndex(null)}
          >
            {/* Modal Container */}
            <div
              className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
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
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md transition-all z-20"
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
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md transition-all z-20"
                aria-label="Next Asset"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Media Content */}
              <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl">
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

              {/* Minimal Caption Strip Beneath Lightbox Media */}
              <div className="mt-4 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-4 text-xs font-inter text-white/90">
                <span className="font-semibold text-white">{activeAsset.title}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="font-mono uppercase text-white/70">{activeAsset.platform}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-white/80">{activeAsset.formatLabel}</span>
                <span className="text-[10px] font-mono text-white/50 ml-2">
                  {selectedAssetIndex + 1} / {filteredAssets.length}
                </span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
