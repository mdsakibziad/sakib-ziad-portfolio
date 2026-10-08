'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Heart, MessageCircle, Share2, Volume2 } from 'lucide-react'
import { MaskText } from '@/components/mask-text'

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
    channel: 'META FEED AD',
    format: '1:1 SQUARE FEED',
    annotation: 'Scroll-stopping zero-cast hook',
    imageSrc: '/images/solae/meta/meta-still-01.jpg',
    frameType: 'feed',
    delay: 0.2,
  },
  {
    id: 'ig-story',
    channel: 'INSTAGRAM STORY',
    format: '9:16 VERTICAL STORY',
    annotation: '9:16 vertical crop, CTA-safe zone',
    imageSrc: '/images/solae/instagram/instagram-story-01.jpg',
    frameType: 'phone-story',
    delay: 0.3,
  },
  {
    id: 'ig-reel',
    channel: 'INSTAGRAM REEL',
    format: '9:16 REEL',
    annotation: 'Dynamic water velocity, sound-on hook',
    imageSrc: '/images/solae/instagram/instagram-still-01.jpg',
    videoSrc: '/images/solae/instagram/instagram-video-01.mp4',
    frameType: 'phone-reel',
    delay: 0.4,
  },
  {
    id: 'tiktok-video',
    channel: 'TIKTOK VIDEO',
    format: '9:16 FOR-YOU FEED',
    annotation: 'Native 3-second absorption proof',
    imageSrc: '/images/solae/instagram/instagram-still-03.jpg',
    videoSrc: '/images/solae/instagram/instagram-video-01.mp4',
    frameType: 'phone-tiktok',
    delay: 0.5,
  },
  {
    id: 'ecommerce-hero',
    channel: 'E-COMMERCE PDP HERO',
    format: '16:9 DESKTOP LANDSCAPE',
    annotation: 'Luxury above-the-fold conversion asset',
    imageSrc: '/images/solae/editorial/solae-photo-02.jpg',
    frameType: 'desktop',
    delay: 0.6,
  },
]

export function ChannelMultiplication() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#050609] text-[#ece8e1] py-24 border-t border-[#292929]"
      aria-label="Creative Multiplication"
    >
      <div className="container-luxury relative z-10">
        {/* ── Section Header ── */}
        <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
          <span className="label-mono !text-[#f4521c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f4521c]" />
            OMNICHANNEL DERIVATIVES
          </span>
          <span className="label-mono text-[#8a8a8a]">
            ONE PRODUCT · EVERY CHANNEL
          </span>
        </div>

        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl lg:text-6xl text-[#ece8e1] leading-[0.95] tracking-[-0.05em]">
            <MaskText
              lines={[
                'ONE PRODUCT.',
                'EVERY CHANNEL,',
                'DIRECTED ON PURPOSE.',
              ]}
            />
          </h2>

          <p className="font-inter text-base sm:text-lg text-[#bdb8b0] max-w-2xl leading-relaxed">
            Every format is a deliberate creative decision — not a lazy resize. We construct master production captures that branch natively into each platform's native psychology.
          </p>
        </div>

        {/* ── Main Visual Diagram ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: HERO PRODUCT ANCHOR */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="border border-[#292929] bg-[#0b0c10] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#292929] pb-3">
                <span className="font-inter font-black uppercase text-lg text-[#ece8e1]">
                  SOLAÉ // AIRVEIL
                </span>
                <span className="label-mono !text-[#f4521c]">
                  STUDIO MASTER
                </span>
              </div>

              {/* Master Studio Image */}
              <div className="relative aspect-[4/5] w-full border border-[#292929] overflow-hidden bg-black">
                <Image
                  src="/images/solae/editorial/solae-photo-01.jpg"
                  alt="SOLAÉ AIRVEIL Clean Studio Master Capture"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-inter font-bold text-sm uppercase">AIRVEIL INVISIBLE SUN SERUM</p>
                  <p className="label-mono text-[10px] text-[#bdb8b0]">Root asset for all platform derivatives · SPF50+ PA++++</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 5 CHANNEL DESTINATION CARDS */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CHANNELS.map((item) => {
                const isWide = item.frameType === 'desktop'

                return (
                  <div
                    key={item.id}
                    className={`border border-[#292929] bg-[#0b0c10] p-5 flex flex-col justify-between hover:border-[#f4521c] transition-colors ${
                      isWide ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-[#292929] pb-3 mb-4">
                      <span className="font-inter font-bold uppercase text-xs text-[#ece8e1]">
                        {item.channel}
                      </span>
                      <span className="label-mono text-[10px] text-[#8a8a8a]">
                        {item.format}
                      </span>
                    </div>

                    {/* Frame Visual */}
                    <div className="my-auto py-2">
                      {item.frameType === 'desktop' ? (
                        <div className="relative aspect-[16/9] w-full border border-[#292929] overflow-hidden bg-black">
                          <Image
                            src={item.imageSrc}
                            alt={`${item.channel} visual`}
                            fill
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 600px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-[4/5] w-full border border-[#292929] overflow-hidden bg-black">
                          <Image
                            src={item.imageSrc}
                            alt={`${item.channel} visual`}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#292929] flex items-center justify-between">
                      <span className="label-mono text-[10px] text-[#8a8a8a]">{item.annotation}</span>
                      <span className="label-mono text-[10px] !text-[#f4521c]">DEPLOYED</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
