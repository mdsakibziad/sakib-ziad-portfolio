'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  ChevronDown,
  ChevronRight,
  Check,
  Video,
  Volume2,
  VolumeX,
} from 'lucide-react'

export interface CaseStudyHook {
  id: number
  hookLine: string
  angleExplanation: string
  videoSrc?: string
  posterSrc?: string
}

export interface PlatformAssetItem {
  id: string
  src: string
  caption: string
}

export interface CaseStudyPageData {
  campaignId: string
  name: string
  tag: string // strictly 'Concept campaign'
  oneLiner: string
  role: string
  year: string
  heroImage: string
  heroVideo?: string
  brief: {
    whatItIs: string
    whoItIsFor: string
    whyItExists: string
  }
  challenge: string
  idea: {
    coreHook: string
    explanation: string
  }
  hooks: CaseStudyHook[]
  platformAssets: {
    meta: PlatformAssetItem[]
    instagram: PlatformAssetItem[]
    tiktok: PlatformAssetItem[]
    website: PlatformAssetItem[]
  }
  totalAssetsCount: number
  strategySummary: {
    whyItWorks: string
    angleLogic: string
    projectedOutcomes: {
      targetRoas: string
      thumbStopRate: string
      cpaImpact: string
      notes: string
    }
  }
  nextCampaign: {
    name: string
    href: string
  }
}

// ── Single Video Card with audio and pause controls ─────────────────────────
function CaseStudyVideoCard({
  hook,
}: {
  hook: CaseStudyHook
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
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
    <div className="liquid-glass p-4 flex flex-col justify-between space-y-4">
      {/* Video Container */}
      <div
        onClick={togglePlay}
        className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-neutral-900 cursor-pointer group"
      >
        {hook.videoSrc ? (
          <video
            ref={videoRef}
            src={hook.videoSrc}
            preload="metadata"
            loop
            muted={isMuted}
            playsInline
            poster={hook.posterSrc}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />
        ) : hook.posterSrc ? (
          <Image
            src={hook.posterSrc}
            alt={hook.hookLine}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
          />
        ) : null}

        {hook.videoSrc && (
          <>
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-black/70 text-white backdrop-blur-md hover:bg-black transition-all"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Play/Pause Indicator */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity">
              <div
                className={`w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition-transform ${
                  isPlaying ? 'opacity-0 group-hover:opacity-90 scale-90' : 'opacity-100 scale-100'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
              </div>
            </div>
          </>
        )}

        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-white backdrop-blur-md">
          Hook 0{hook.id} · 9:16
        </div>
      </div>

      {/* Caption & Explanation */}
      <div className="space-y-1.5 pt-1">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
          "{hook.hookLine}"
        </h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
          {hook.angleExplanation}
        </p>
      </div>
    </div>
  )
}

export function CaseStudyTemplate({ data }: { data: CaseStudyPageData }) {
  const [showAllAssets, setShowAllAssets] = useState(false)

  // Flatten and group assets
  const allAssetsList = [
    ...data.platformAssets.meta.map((a) => ({ ...a, channel: 'Meta' })),
    ...data.platformAssets.instagram.map((a) => ({ ...a, channel: 'Instagram' })),
    ...data.platformAssets.tiktok.map((a) => ({ ...a, channel: 'TikTok' })),
    ...data.platformAssets.website.map((a) => ({ ...a, channel: 'Website' })),
  ]

  const visibleAssets = showAllAssets ? allAssetsList : allAssetsList.slice(0, 8)

  return (
    <div className="py-12 sm:py-20 space-y-20 sm:space-y-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">

        {/* ── Breadcrumb & Back ── */}
        <div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Work</span>
          </Link>
        </div>

        {/* ── 1. HEADER ── */}
        <section className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            {data.tag}
          </div>

          <h1 className="text-neutral-950 dark:text-white">
            {data.name}
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
            {data.oneLiner}
          </p>

          <div className="pt-4 flex flex-wrap gap-y-3 gap-x-8 text-xs font-medium text-neutral-500 dark:text-neutral-400 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">Role</span>
              <span className="text-neutral-900 dark:text-neutral-100">{data.role}</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">Year</span>
              <span className="text-neutral-900 dark:text-neutral-100">{data.year}</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">Assets</span>
              <span className="text-neutral-900 dark:text-neutral-100">{data.totalAssetsCount} creative assets</span>
            </div>
          </div>
        </section>

        {/* ── 2. HERO FILM OR BEST IMAGE ── */}
        <section className="liquid-glass overflow-hidden border border-black/[0.08] dark:border-white/[0.1]">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-neutral-900">
            {data.heroVideo ? (
              <video
                src={data.heroVideo}
                autoPlay
                loop
                muted
                playsInline
                poster={data.heroImage}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={data.heroImage}
                alt={`${data.name} hero asset`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            )}
          </div>
        </section>

        {/* ── 3. THE BRIEF ── */}
        <section className="space-y-6 max-w-4xl">
          <h2 className="text-neutral-950 dark:text-white">The brief</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="liquid-glass p-6 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                What it is
              </span>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {data.brief.whatItIs}
              </p>
            </div>

            <div className="liquid-glass p-6 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Who it is for
              </span>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {data.brief.whoItIsFor}
              </p>
            </div>

            <div className="liquid-glass p-6 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Why it exists
              </span>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {data.brief.whyItExists}
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. THE CHALLENGE ── */}
        <section className="space-y-4 max-w-3xl">
          <h2 className="text-neutral-950 dark:text-white">The challenge</h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            {data.challenge}
          </p>
        </section>

        {/* ── 5. THE IDEA ── */}
        <section className="space-y-4 max-w-3xl">
          <h2 className="text-neutral-950 dark:text-white">The idea</h2>
          <div className="liquid-glass p-8 space-y-3">
            <p className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white leading-snug">
              "{data.idea.coreHook}"
            </p>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
              {data.idea.explanation}
            </p>
          </div>
        </section>

        {/* ── 6. THE 5 HOOKS ── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-neutral-950 dark:text-white">The 5 hooks</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
              Five distinct script angles created for Meta, Instagram Reels and TikTok testing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {data.hooks.map((hook) => (
              <CaseStudyVideoCard key={hook.id} hook={hook} />
            ))}
          </div>
        </section>

        {/* ── 7. PLATFORM ASSETS (GROUPED & COLLAPSED) ── */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-neutral-950 dark:text-white">Platform assets</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
                Ad stills for Meta, Instagram, TikTok and website PDP integration.
              </p>
            </div>
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {allAssetsList.length} total deliverables
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleAssets.map((asset, i) => (
              <div key={asset.id || i} className="liquid-glass p-2.5 space-y-2">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900">
                  <Image
                    src={asset.src}
                    alt={asset.caption}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-white backdrop-blur-md">
                    {asset.channel}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1 px-1">
                  {asset.caption}
                </p>
              </div>
            ))}
          </div>

          {allAssetsList.length > 8 && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setShowAllAssets(!showAllAssets)}
                className="btn-secondary min-h-[46px] px-8 text-xs font-medium"
              >
                {showAllAssets
                  ? 'Show fewer assets'
                  : `Show all ${allAssetsList.length} assets`}
              </button>
            </div>
          )}
        </section>

        {/* ── 8. STRATEGY SUMMARY & PROJECTED OUTCOMES ── */}
        <section className="space-y-8 max-w-4xl">
          <div className="space-y-2">
            <h2 className="text-neutral-950 dark:text-white">Strategy summary</h2>
          </div>

          <div className="liquid-glass p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                Why the creative works
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                {data.strategySummary.whyItWorks}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                Angle logic
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                {data.strategySummary.angleLogic}
              </p>
            </div>

            {/* Clearly Labelled Forecast Box */}
            <div className="p-6 rounded-2xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Projected outcomes (estimates, not live results)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Projected Target ROAS
                  </span>
                  <span className="text-base font-bold text-neutral-950 dark:text-white">
                    {data.strategySummary.projectedOutcomes.targetRoas}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Projected Hook Retention Rate
                  </span>
                  <span className="text-base font-bold text-neutral-950 dark:text-white">
                    {data.strategySummary.projectedOutcomes.thumbStopRate}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Projected CPA Efficiency
                  </span>
                  <span className="text-base font-bold text-neutral-950 dark:text-white">
                    {data.strategySummary.projectedOutcomes.cpaImpact}
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] font-normal leading-relaxed">
                {data.strategySummary.projectedOutcomes.notes}
              </p>
            </div>
          </div>
        </section>

        {/* ── 9. NEXT CAMPAIGN & CTA ── */}
        <section className="pt-8 border-t border-black/[0.06] dark:border-white/[0.08] space-y-12">
          {/* Next Campaign Link */}
          <div className="flex justify-between items-center">
            <Link
              href="/work"
              className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            >
              All campaigns
            </Link>

            <Link
              href={data.nextCampaign.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 dark:text-white hover:underline underline-offset-4"
            >
              <span>Next: {data.nextCampaign.name}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Book a Call CTA */}
          <div className="liquid-glass p-8 sm:p-14 text-center space-y-6 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
              Want this for your brand?
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
              Book a strategy call to discuss your product, your customer and the right campaign creative.
            </p>
            <div>
              <Link
                href="/contact#book"
                className="btn-primary min-h-[48px] px-8 text-sm font-medium"
              >
                <span>Book a call</span>
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
