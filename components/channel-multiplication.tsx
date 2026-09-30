'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
} from 'lucide-react'

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const

interface ChannelOutput {
  id: string
  channel: string
  format: string
  annotation: string
  imageSrc: string
  videoSrc?: string
  frameType: 'phone-story' | 'phone-reel' | 'phone-tiktok' | 'desktop' | 'feed'
  delay: number
}

const CHANNELS: ChannelOutput[] = [
  {
    id: 'meta-feed',
    channel: 'Meta Feed Ad',
    format: '1:1 Square Feed',
    annotation: 'Scroll-stopping zero-cast hook',
    imageSrc: '/images/solae/meta/meta-still-01.jpg',
    frameType: 'feed',
    delay: 0.2,
  },
  {
    id: 'ig-story',
    channel: 'Instagram Story',
    format: '9:16 Story',
    annotation: '9:16 vertical crop, CTA-safe zone',
    imageSrc: '/images/solae/instagram/instagram-story-01.jpg',
    frameType: 'phone-story',
    delay: 0.3,
  },
  {
    id: 'ig-reel',
    channel: 'Instagram Reel',
    format: '9:16 Reel',
    annotation: 'Dynamic water velocity, sound-on hook',
    imageSrc: '/images/solae/instagram/instagram-still-01.jpg',
    videoSrc: '/images/solae/instagram/instagram-video-01.mp4',
    frameType: 'phone-reel',
    delay: 0.4,
  },
  {
    id: 'tiktok-video',
    channel: 'TikTok Video',
    format: '9:16 Feed',
    annotation: 'Native 3-second absorption proof',
    imageSrc: '/images/solae/instagram/instagram-still-03.jpg',
    videoSrc: '/images/solae/meta/meta-video-01.mp4',
    frameType: 'phone-tiktok',
    delay: 0.5,
  },
  {
    id: 'website-banner',
    channel: 'Website Hero Banner',
    format: 'Wide-Format Web',
    annotation: 'Wide-format hero crop, no CTA overlap',
    imageSrc: '/images/solae/editorial/solae-photo-05.jpg',
    frameType: 'desktop',
    delay: 0.6,
  },
]

export function ChannelMultiplication() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-60px 0px' })

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
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE_LUXURY }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-300 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Creative Multiplication</span>
            </div>

            <h2 className="heading-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#141416] dark:text-white mb-4 leading-[1.12]">
              One Product.{' '}
              <span className="italic font-fraunces font-light text-[#141416] dark:text-white">
                Every Channel, Engineered On Purpose.
              </span>
            </h2>

            <p className="body-editorial text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-light max-w-2xl">
              Every format is a deliberate creative decision — not a resize.
            </p>
          </motion.div>
        </div>

        {/* ── Main Visual Diagram ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ════════════════════════════════════════════════════════════════
              LEFT SIDE: HERO PRODUCT ANCHOR (SOLAÉ AIRVEIL STUDIO MASTER)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE_LUXURY }}
              className="card-surface p-5 sm:p-6 relative overflow-hidden group"
            >
              {/* Clean Minimal Title */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <span className="font-fraunces text-lg text-[#141416] dark:text-white font-medium">
                  SOLAÉ
                </span>
                <span className="text-[11px] font-inter text-zinc-500 dark:text-zinc-400">
                  Studio Master
                </span>
              </div>

              {/* Master Studio Image */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black/[0.02] dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/solae/editorial/solae-photo-01.jpg"
                  alt="SOLAÉ AIRVEIL Clean Studio Master Capture"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
                />

                {/* Subtle bottom gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-fraunces text-base tracking-wide">AIRVEIL Invisible Sun Serum</p>
                  <p className="text-[11px] font-inter text-white/80 font-light">Root asset for all platform derivatives · SPF50+ PA++++</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT SIDE: 5 CHANNEL DESTINATION CARDS (VISUAL-FIRST)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {CHANNELS.map((item) => {
                const isWide = item.frameType === 'desktop'

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.75,
                      delay: item.delay,
                      ease: EASE_LUXURY,
                    }}
                    className={`card-surface p-4 sm:p-5 flex flex-col justify-between ${
                      isWide ? 'sm:col-span-2' : ''
                    }`}
                  >
                    {/* Minimal Channel Name & Format Header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
                      <h3 className="font-fraunces text-sm sm:text-base text-[#141416] dark:text-white font-normal">
                        {item.channel}
                      </h3>
                      <span className="text-[10px] font-inter text-zinc-500 dark:text-zinc-400">
                        {item.format}
                      </span>
                    </div>

                    {/* Dominant Platform-Appropriate Frame */}
                    <div className="my-auto">
                      {item.frameType === 'phone-story' ? (
                        /* Phone Frame: Instagram Story */
                        <div className="relative aspect-[9/16] max-h-80 w-auto mx-auto rounded-2xl overflow-hidden border-[3px] border-zinc-800/80 dark:border-zinc-700/80 bg-black shadow-lg">
                          <Image
                            src={item.imageSrc}
                            alt={`${item.channel} campaign visual`}
                            fill
                            priority
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-cover"
                          />
                          {/* Story UI Elements */}
                          <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
                            <div className="h-0.5 flex-1 bg-white rounded-full opacity-90" />
                            <div className="h-0.5 flex-1 bg-white/40 rounded-full" />
                          </div>
                          <div className="absolute top-4 left-3 right-3 flex items-center justify-between text-white text-[9px] font-medium z-10">
                            <span className="drop-shadow">solae.skin</span>
                            <span className="drop-shadow">14h</span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] text-center font-medium">
                            Swipe to Protect →
                          </div>
                        </div>
                      ) : item.frameType === 'phone-reel' ? (
                        /* Phone Frame: Instagram Reel */
                        <div className="relative aspect-[9/16] max-h-80 w-auto mx-auto rounded-2xl overflow-hidden border-[3px] border-zinc-800/80 dark:border-zinc-700/80 bg-black shadow-lg">
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
                              priority
                              unoptimized
                              sizes="(max-width: 768px) 100vw, 320px"
                              className="object-cover"
                            />
                          )}
                          <div className="absolute right-2 bottom-8 flex flex-col items-center gap-3 text-white z-10 drop-shadow">
                            <Heart className="w-3.5 h-3.5" />
                            <MessageCircle className="w-3.5 h-3.5" />
                            <Share2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute bottom-3 left-3 text-white text-[9px] font-light z-10 flex items-center gap-1.5 drop-shadow">
                            <Volume2 className="w-3 h-3" />
                            <span>Original Audio · Solaé</span>
                          </div>
                        </div>
                      ) : item.frameType === 'phone-tiktok' ? (
                        /* Phone Frame: TikTok */
                        <div className="relative aspect-[9/16] max-h-80 w-auto mx-auto rounded-2xl overflow-hidden border-[3px] border-zinc-800/80 dark:border-zinc-700/80 bg-black shadow-lg">
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
                              priority
                              unoptimized
                              sizes="(max-width: 768px) 100vw, 320px"
                              className="object-cover"
                            />
                          )}
                          <div className="absolute top-3 left-0 right-0 flex justify-center text-[10px] text-white/90 font-medium z-10">
                            <span className="font-bold underline decoration-2">Following</span>
                            <span className="mx-2 opacity-50">|</span>
                            <span>For You</span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-10 text-white z-10 drop-shadow">
                            <p className="text-[10px] font-bold">@solaeskin</p>
                            <p className="text-[9px] font-light line-clamp-2 text-white/90">
                              feels like water, zero white cast ✨ #ClearSunscreen #SPF50
                            </p>
                          </div>
                        </div>
                      ) : item.frameType === 'desktop' ? (
                        /* Desktop Browser Frame: Website Hero Banner */
                        <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full rounded-xl overflow-hidden border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-black/60 shadow-lg">
                          <div className="h-5 bg-black/[0.08] dark:bg-white/[0.08] flex items-center px-2 gap-1 border-b border-black/[0.06] dark:border-white/[0.08]">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                            <div className="mx-auto text-[8px] font-mono text-zinc-500 dark:text-zinc-400 opacity-80">
                              solaeskin.com/airveil
                            </div>
                          </div>
                          <div className="relative h-full min-h-[160px] sm:min-h-[200px] w-full">
                            <Image
                              src={item.imageSrc}
                              alt={`${item.channel} campaign visual`}
                              fill
                              priority
                              unoptimized
                              sizes="(max-width: 1024px) 100vw, 650px"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-4 left-4 text-white font-fraunces text-sm sm:text-base font-light drop-shadow">
                              AIRVEIL Invisible Sun Serum
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Feed Card: Meta Feed Ad (1:1 Complete View) */
                        <div className="flex flex-col w-full max-w-[320px] mx-auto rounded-xl overflow-hidden border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-black/40 shadow-lg">
                          <div className="p-2.5 bg-black/[0.04] dark:bg-white/[0.04] flex items-center justify-between text-[10px] font-inter border-b border-black/[0.05] dark:border-white/[0.05]">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                              <span className="font-semibold text-zinc-900 dark:text-white">SOLAÉ Skincare</span>
                            </div>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Sponsored</span>
                          </div>
                          <div className="relative aspect-square w-full bg-[#FAF7F2] dark:bg-zinc-900">
                            <Image
                              src={item.imageSrc}
                              alt={`${item.channel} campaign visual`}
                              fill
                              priority
                              unoptimized
                              sizes="(max-width: 768px) 100vw, 360px"
                              className="object-contain"
                            />
                          </div>
                          <div className="p-2.5 bg-black/[0.06] dark:bg-white/[0.06] flex items-center justify-between text-[10px] text-zinc-800 dark:text-zinc-200 border-t border-black/[0.05] dark:border-white/[0.05]">
                            <span className="font-medium">Shop Invisible Sun Serum</span>
                            <span className="text-[9px] font-mono uppercase underline">Learn More</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Short Micro-Annotation Caption Only */}
                    <div className="mt-3 pt-2.5 border-t border-black/[0.05] dark:border-white/[0.05] text-center">
                      <p className="text-xs font-inter text-zinc-600 dark:text-zinc-300 font-medium">
                        {item.annotation}
                      </p>
                    </div>

                  </motion.div>
                )
              })}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
