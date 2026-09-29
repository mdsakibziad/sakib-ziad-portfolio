'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Sparkles,
  Smartphone,
  Monitor,
  Share2,
  Heart,
  MessageCircle,
  Volume2,
  Globe,
  ExternalLink,
  Layers,
  ArrowRight,
} from 'lucide-react'

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const

interface ChannelOutput {
  id: string
  channel: string
  format: string
  aspectRatio: string
  annotation: string
  imageSrc: string
  videoSrc?: string
  frameType: 'phone-story' | 'phone-reel' | 'phone-tiktok' | 'desktop' | 'feed'
  isPending?: boolean
  delay: number
}

const CHANNELS: ChannelOutput[] = [
  {
    id: 'meta-feed',
    channel: 'Meta Feed Ad',
    format: '1:1 Square Feed',
    aspectRatio: 'aspect-square',
    annotation: 'Scroll-stopping first-frame hook',
    imageSrc: '/images/aura-purify/aura.jpg',
    frameType: 'feed',
    delay: 0.25,
  },
  {
    id: 'ig-story',
    channel: 'Instagram Story',
    format: '9:16 Fullscreen Vertical',
    aspectRatio: 'aspect-[9/16]',
    annotation: '9:16 crop, CTA-safe zone',
    imageSrc: '/images/aura-purify/aura-purify-3rd-image.jpeg',
    frameType: 'phone-story',
    delay: 0.45,
  },
  {
    id: 'ig-reel',
    channel: 'Instagram Reel',
    format: '9:16 Motion Reel',
    aspectRatio: 'aspect-[9/16]',
    annotation: 'Dynamic kinetic pace, sound-on hook',
    imageSrc: '/images/aura-purify/aura-purify-2nd-image.jpeg',
    videoSrc: '/images/aura-purify/aura-purify-peoduct-video.mp4',
    frameType: 'phone-reel',
    delay: 0.65,
  },
  {
    id: 'tiktok-video',
    channel: 'TikTok Video',
    format: '9:16 Lo-Fi Native',
    aspectRatio: 'aspect-[9/16]',
    annotation: 'Native, low-polish framing for feed blend-in',
    imageSrc: '/images/aura-purify/aura-purify-6th-image.jpeg',
    frameType: 'phone-tiktok',
    delay: 0.85,
  },
  {
    id: 'website-banner',
    channel: 'Website Hero Banner',
    format: '16:9 / 21:9 Panoramic Web',
    aspectRatio: 'aspect-[16/9]',
    annotation: 'Wide-format hero crop, no CTA overlap',
    imageSrc: '/images/aura-purify/aura-purify-4th-image.jpeg',
    frameType: 'desktop',
    delay: 1.05,
  },
]

export function ChannelMultiplication() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px 0px' })
  const [activeTab, setActiveTab] = useState<string>('all')
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true)

  return (
    <section
      ref={containerRef}
      className="section-pad relative overflow-hidden border-t border-black/[0.08] dark:border-white/[0.08] bg-background"
      aria-label="Creative Multiplication: One Product, Every Channel"
    >
      {/* ── Ambient Liquid Glass Glow Blooms ──────────────────────────────── */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none -z-0 opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(235, 195, 150, 0.45) 0%, rgba(215, 175, 230, 0.25) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[700px] h-[550px] rounded-full pointer-events-none -z-0 opacity-35 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(160, 205, 240, 0.4) 0%, rgba(240, 185, 170, 0.2) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      <div className="container-luxury relative z-10">
        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE_LUXURY }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Creative Multiplication</span>
            </div>

            <h2 className="heading-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#141416] dark:text-white mb-5 leading-[1.12]">
              One Product.{' '}
              <span className="italic font-fraunces font-light text-[#141416] dark:text-white">
                Every Channel, Engineered On Purpose.
              </span>
            </h2>

            <p className="body-editorial text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-light max-w-2xl">
              Every format is a deliberate creative decision — not a resize. From native lo-fi feeds to cinematic wide-screen hero banners, each touchpoint is adapted for its platform’s consumption psychology.
            </p>
          </motion.div>
        </div>

        {/* ── Main Interactive Visualization Grid ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ════════════════════════════════════════════════════════════════
              LEFT SIDE: LARGE CINEMATIC HERO PRODUCT SHOT (ANCHOR VISUAL)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE_LUXURY }}
              className="card-surface p-6 sm:p-7 relative overflow-hidden group"
            >
              {/* Anchor Header Badge */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-800 dark:text-zinc-200 font-medium">
                    SOURCE ANCHOR // 00
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400">
                  Master Still (1/5)
                </span>
              </div>

              {/* Master Product Image Frame */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black/[0.02] dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/aura-purify/aura-purify-1st-product.jpeg"
                  alt="AURA Purify Clean Studio Master Shot on Dark Basalt Pedestal"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
                />

                {/* Subtle Inner Glass Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Product Information Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-fraunces text-lg tracking-wide text-white">AURA PURIFY</span>
                    <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">200ml / 6.7 fl. oz.</span>
                  </div>
                  <p className="text-[11px] font-inter text-white/80 font-light leading-snug">
                    Barrier Gel-to-Milk Cleanser · Clean studio master shot on dark pedestal
                  </p>
                </div>

                {/* Right Edge Output Port Indicator (Desktop Connectors Anchor) */}
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-[#141416] border border-black/20 dark:border-white/30 items-center justify-center shadow-lg z-20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute" />
                </div>
              </div>

              {/* Annotation & Provenance */}
              <div className="mt-5 space-y-2 text-xs font-inter text-zinc-600 dark:text-zinc-400 font-light">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <span>CAMERA CODE: 85MM // T1.5</span>
                  <span>PHYSICAL SPEC: AMBER GLASS</span>
                </div>
                <p className="leading-relaxed">
                  Single studio capture calibrated for optical refraction, packaging caustics, and label typography. Serves as the immutable root for all 5 platform derivatives.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT SIDE: BRANCHING CHANNELS DIAGRAM (DESTINATION CARDS)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col gap-6 relative">
            
            {/* Ambient Connecting Flow Line (Visible on Desktop) */}
            <div className="hidden lg:block absolute -left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-black/15 dark:via-white/20 to-transparent pointer-events-none" />

            {CHANNELS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.85,
                  delay: item.delay,
                  ease: EASE_LUXURY,
                }}
                className="relative"
              >
                {/* Horizontal branch line connecting inward from the left flow */}
                <div className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-px bg-gradient-to-r from-black/20 dark:from-white/25 to-transparent pointer-events-none" />
                <div className="hidden lg:block absolute -left-[27px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/50" />

                {/* Destination Card Container */}
                <div className="card-surface p-5 sm:p-6 transition-all duration-500 hover:border-black/30 dark:hover:border-white/30 group">
                  
                  {/* Top Bar: Channel Info + Strategic Format Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-[10px] font-mono font-bold text-zinc-800 dark:text-zinc-200">
                        0{index + 1}
                      </span>
                      <h3 className="font-fraunces text-lg sm:text-xl text-[#141416] dark:text-white font-normal">
                        {item.channel}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300 border border-black/5 dark:border-white/10">
                      {item.format}
                    </span>
                  </div>

                  {/* Layout Grid: Frame Mockup + Strategic Decision Rationale */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    
                    {/* Channel Specific Mockup Frame */}
                    <div className="sm:col-span-5 relative">
                      {item.isPending ? (
                        <div className="w-full aspect-[4/5] rounded-xl border border-dashed border-black/20 dark:border-white/20 bg-black/[0.02] dark:bg-white/[0.02] flex flex-col items-center justify-center p-4 text-center">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1">
                            Asset Pending
                          </span>
                          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-light">
                            Production still in calibration
                          </span>
                        </div>
                      ) : item.frameType === 'phone-story' ? (
                        /* Phone Frame: Instagram Story */
                        <div className="relative aspect-[9/16] max-h-72 w-auto mx-auto rounded-2xl overflow-hidden border-[3px] border-zinc-800/80 dark:border-zinc-700/80 bg-black shadow-lg">
                          <Image
                            src={item.imageSrc}
                            alt={`${item.channel} campaign visual`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-cover"
                          />
                          {/* Story UI Elements */}
                          <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
                            <div className="h-0.5 flex-1 bg-white rounded-full opacity-90" />
                            <div className="h-0.5 flex-1 bg-white/40 rounded-full" />
                          </div>
                          <div className="absolute top-4 left-3 right-3 flex items-center justify-between text-white text-[9px] font-medium z-10">
                            <span className="drop-shadow">aura.skincare</span>
                            <span className="drop-shadow">14h</span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] text-center font-medium">
                            Swipe to Experience →
                          </div>
                        </div>
                      ) : item.frameType === 'phone-reel' ? (
                        /* Phone Frame: Instagram Reel (Video / High-Motion Hook) */
                        <div className="relative aspect-[9/16] max-h-72 w-auto mx-auto rounded-2xl overflow-hidden border-[3px] border-zinc-800/80 dark:border-zinc-700/80 bg-black shadow-lg">
                          {item.videoSrc ? (
                            <video
                              src={item.videoSrc}
                              poster={item.imageSrc}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image
                              src={item.imageSrc}
                              alt={`${item.channel} campaign visual`}
                              fill
                              sizes="240px"
                              className="object-cover"
                            />
                          )}
                          {/* Reel Right Rail Icons */}
                          <div className="absolute right-2 bottom-8 flex flex-col items-center gap-3 text-white z-10 drop-shadow">
                            <Heart className="w-3.5 h-3.5" />
                            <MessageCircle className="w-3.5 h-3.5" />
                            <Share2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute bottom-3 left-3 text-white text-[9px] font-light z-10 flex items-center gap-1.5 drop-shadow">
                            <Volume2 className="w-3 h-3" />
                            <span>Original Audio · Kinetic Texture Hook</span>
                          </div>
                        </div>
                      ) : item.frameType === 'phone-tiktok' ? (
                        /* Phone Frame: TikTok Lo-Fi Feed */
                        <div className="relative aspect-[9/16] max-h-72 w-auto mx-auto rounded-2xl overflow-hidden border-[3px] border-zinc-800/80 dark:border-zinc-700/80 bg-black shadow-lg">
                          <Image
                            src={item.imageSrc}
                            alt={`${item.channel} campaign visual`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-cover"
                          />
                          {/* TikTok Native UI tags */}
                          <div className="absolute top-3 left-0 right-0 flex justify-center text-[10px] text-white/90 font-medium z-10">
                            <span className="font-bold underline decoration-2">Following</span>
                            <span className="mx-2 opacity-50">|</span>
                            <span>For You</span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-10 text-white z-10 drop-shadow">
                            <p className="text-[10px] font-bold">@auraskin</p>
                            <p className="text-[9px] font-light line-clamp-2 text-white/90">
                              barrier gel-to-milk transformation formula swatch ✨ #skincaretok
                            </p>
                          </div>
                        </div>
                      ) : item.frameType === 'desktop' ? (
                        /* Desktop Browser Frame: Website Hero Banner */
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-black/60 shadow-lg">
                          {/* Browser Chrome Header */}
                          <div className="h-5 bg-black/[0.08] dark:bg-white/[0.08] flex items-center px-2 gap-1 border-b border-black/[0.06] dark:border-white/[0.08]">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                            <div className="mx-auto text-[8px] font-mono text-zinc-500 dark:text-zinc-400 opacity-80">
                              auraskin.com/purify
                            </div>
                          </div>
                          <div className="relative aspect-[16/8] w-full">
                            <Image
                              src={item.imageSrc}
                              alt={`${item.channel} campaign visual`}
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-2 left-2 text-white font-fraunces text-xs font-light drop-shadow">
                              Purify Barrier Cleanser
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Feed Card: Meta Feed Ad (1:1) */
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-black/40 shadow-lg">
                          {/* Feed Header */}
                          <div className="p-2 bg-black/[0.04] dark:bg-white/[0.04] flex items-center justify-between text-[10px] font-inter border-b border-black/[0.05] dark:border-white/[0.05]">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3.5 h-3.5 rounded-full bg-amber-600/80" />
                              <span className="font-semibold text-zinc-900 dark:text-white">Aura Skincare</span>
                            </div>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Sponsored</span>
                          </div>
                          <div className="relative aspect-square w-full">
                            <Image
                              src={item.imageSrc}
                              alt={`${item.channel} campaign visual`}
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, 360px"
                              className="object-cover"
                            />
                          </div>
                          {/* Call To Action Strip */}
                          <div className="p-2 bg-black/[0.06] dark:bg-white/[0.06] flex items-center justify-between text-[10px] text-zinc-800 dark:text-zinc-200">
                            <span className="font-medium">Shop Barrier Cleanser</span>
                            <span className="text-[9px] font-mono uppercase underline">Learn More</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Strategic Micro-Annotation Rationale */}
                    <div className="sm:col-span-7 flex flex-col justify-between py-1">
                      <div>
                        {/* Micro-Annotation Pill */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-medium mb-3">
                          <Sparkles className="w-3 h-3 shrink-0" />
                          <span>{item.annotation}</span>
                        </div>

                        <h4 className="text-sm font-semibold text-[#141416] dark:text-white mb-2">
                          Platform-Specific Intent
                        </h4>
                        
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed mb-4">
                          {item.id === 'meta-feed' &&
                            'Engineered with high contrast directional illumination to halt passive thumb-scrolling on dense social feeds, commanding attention before copy is even read.'}
                          {item.id === 'ig-story' &&
                            'Calibrated precisely for 9:16 vertical displays with critical ingredients, formula highlights, and gesture swipe-up mechanics kept strictly in the safe interaction zone.'}
                          {item.id === 'ig-reel' &&
                            'Kinetic motion profile with a rapid 1.2s tactile hook. Sound-on pacing timed to formula transition physics from rich gel to conditioning milk.'}
                          {item.id === 'tiktok-video' &&
                            'Raw, editorial macro-swatch lighting avoiding excessive gloss so the asset seamlessly mirrors organic beauty-creator content instead of a disruptive corporate advertisement.'}
                          {item.id === 'website-banner' &&
                            'Composed with asymmetrical negative space on the left quadrant, ensuring desktop hero headlines and CTA buttons never occlude product caustics.'}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        <span>ASPECT: {item.aspectRatio.replace('aspect-', '').replace('[', '').replace(']', '')}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">CAMPAIGN-READY</span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}

          </div>

        </div>

        {/* ── Bottom Strategic Synthesis ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE_LUXURY }}
          className="mt-14 p-6 rounded-2xl liquid-glass text-center max-w-2xl mx-auto border border-black/10 dark:border-white/10"
        >
          <p className="text-xs sm:text-sm font-inter text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
            <span className="font-semibold text-[#141416] dark:text-white">The Compounding Advantage:</span>{' '}
            Instead of booking 5 separate studio shoots or accepting compromised crops, AI-native creative architecture produces custom platform-perfect assets from a single verified product model.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
