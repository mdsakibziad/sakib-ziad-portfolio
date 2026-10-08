'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Sparkles,
  Download,
  Calendar,
  Layers,
  Send,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'
import { StructuredData } from '@/components/structured-data'

/* ── FAQ Data (Exact Copy from Section 6) ─────────────────────────────────── */
const FAQS = [
  {
    q: 'What do you do?',
    a: "I'm an AI Creative Strategist and AI Commercial Director. I plan the strategy and hooks for beauty and skincare ads, then direct the AI-made videos and images that bring them to life.",
  },
  {
    q: 'Who do you work with?',
    a: 'Founder-led beauty, skincare and cosmetics brands that want better ad creative for Meta, Instagram and TikTok.',
  },
  {
    q: 'Are your campaigns made with AI?',
    a: "Yes. I use AI tools to produce the films and visuals, and I direct them closely so packaging, colour, texture and lighting are accurate. I'm open about this with every client.",
  },
  {
    q: 'Do you have results from real clients?',
    a: "The five campaigns on this site are concept campaigns. They are built to full production standard, but they haven't run with ad spend yet, so any figures shown are labelled as projections. I'm happy to walk through the strategy behind each one on a call.",
  },
  {
    q: 'What do I get in a campaign package?',
    a: 'Hook-based videos, ad stills for each platform, a strategy document explaining why each idea works, and a product brief.',
  },
  {
    q: 'How long does a project take?',
    a: 'It depends on scope. After the call I give you a clear timeline before anything starts.',
  },
  {
    q: 'How much does it cost?',
    a: "Every brand is different, so I quote after we speak. Book a call and I'll give you a clear price for your project.",
  },
  {
    q: 'Do I own the final assets?',
    a: 'Yes, you receive the final files and the right to use them in your own advertising.',
  },
  {
    q: "What's the difference between this site and Witlyn?",
    a: 'This is my personal site: my work, my thinking and how to hire me. Witlyn is my studio, where full campaign production is delivered.',
  },
  {
    q: "I'm hiring. Where can I see your résumé?",
    a: 'Download it from the footer or the About page, or message me on LinkedIn.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  /* ── Snapshot Form State ── */
  const [snapshotWebsite, setSnapshotWebsite] = useState('')
  const [snapshotEmail, setSnapshotEmail] = useState('')
  const [snapshotStatus, setSnapshotStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const handleSnapshotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSnapshotStatus('loading')
    try {
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: snapshotWebsite.replace(/https?:\/\/(www\.)?/, '').split('/')[0],
          websiteUrl: snapshotWebsite,
          email: snapshotEmail,
          primaryChallenge: 'Requested free creative gap snapshot via homepage',
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setSnapshotStatus('success')
    } catch {
      setSnapshotStatus('error')
    }
  }

  return (
    <div className="relative min-h-screen">
      <StructuredData data={faqSchema} />

      {/* ════════════════════════════════════════════════════════════════════
          3.1 HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 frost-droplets">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Core Positioning */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.06] text-xs font-medium text-neutral-700 dark:text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                AI Creative Strategist &amp; AI Commercial Director
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-neutral-950 dark:text-white"
              >
                I create beauty ad campaigns that are built to convert.
              </motion.h1>

              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl">
                I plan the strategy, write the hooks and direct the AI-made commercials, ad stills and campaign assets that beauty and skincare brands run on Meta, Instagram and TikTok.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact#book"
                  className="btn-primary min-h-[50px] px-8 text-sm sm:text-base font-medium"
                >
                  <span>Book a strategy call</span>
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary min-h-[50px] px-7 text-sm sm:text-base font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span>Download résumé</span>
                </a>
              </div>

              {/* Proof Line */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  5 campaign packages · 135+ creative assets · Founder of Witlyn Studio · BSc in AI
                </p>
              </div>

            </div>

            {/* Right Column: Headshot + Looped Product Video */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-md">
                
                {/* Main Headshot Frame */}
                <div className="liquid-glass p-2.5 shadow-xl overflow-hidden">
                  <div className="relative aspect-[4/5] rounded-[1.25rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src="/images/sakib-ziad.jpg"
                      alt="Sakib Ziad — AI Creative Strategist & AI Commercial Director"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 450px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Looped Hero Campaign Film Preview */}
                <div className="mt-4 liquid-glass p-3 flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                    <video
                      src="/images/nuecera/meta/meta-video-generation-08.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/nuecera/meta/meta-product-01.jpg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                      Sample Commercial Direction
                    </span>
                    <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                      Nuécera Ceramide Cream · Barrier repair visual hook
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.2 THE PROBLEM
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-neutral-950 dark:text-white">
            Most beauty ads look good and sell poorly.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Ads wear out fast. A single hero video is not enough, and a nice-looking shoot rarely tells you why someone should stop scrolling. Brands end up paying for visuals without a strategy behind them.
          </p>
          <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 pt-2">
            I start with the strategy, then make the creative.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.3 WHAT I DO (3 CARDS)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-neutral-950 dark:text-white">What I do</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="liquid-glass p-8 sm:p-10 space-y-4 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                01 · Strategy
              </span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Creative strategy
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Who the ad is for, what problem it solves, and which hook will make them stop. You get a clear plan before anything is made.
              </p>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass p-8 sm:p-10 space-y-4 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                02 · Direction
              </span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                AI commercial direction
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                I direct AI-made films and product visuals with accurate packaging, texture and lighting, without the cost of a physical set.
              </p>
            </div>

            {/* Card 3 */}
            <div className="liquid-glass p-8 sm:p-10 space-y-4 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                03 · Production
              </span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Full campaign packages
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                One idea turned into everything you need to launch: hook videos, ad stills for every platform, and a strategy document that explains the thinking.
              </p>
            </div>

          </div>

          <div className="text-center pt-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:underline underline-offset-4"
            >
              <span>See the services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.4 SELECTED WORK (HONEST CONCEPT CAMPAIGN LABELING)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-3">
            <h2 className="text-neutral-950 dark:text-white">Selected work</h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 font-normal">
              Five concept campaigns, each built like a real client project.
            </p>
          </div>

          {/* Featured Large Card: Nuécera */}
          <div className="liquid-glass overflow-hidden border border-black/[0.08] dark:border-white/[0.1]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] bg-neutral-900">
                <Image
                  src="/images/nuecera/meta/meta-product-01.jpg"
                  alt="Nuécera concept campaign visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  Concept campaign
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                    Nuécera
                  </h3>
                  <p className="text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                    A moisturiser story built on a simple question: why are you still dry?
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/work/nuecera"
                    className="btn-primary min-h-[48px] px-6 text-sm font-medium"
                  >
                    <span>Read the case study</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* 4 Smaller Grid Cards: Aura Purify, Solaé, Lipéa, Vyraa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Aura Purify */}
            <Link
              href="/work/aura-purify"
              className="liquid-glass p-4 group flex flex-col justify-between hover:border-black/25 dark:hover:border-white/25 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900">
                  <Image
                    src="/images/aura-purify/studio/aura-product-01.jpg"
                    alt="Aura Purify concept campaign"
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-black backdrop-blur-md">
                    Concept campaign
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:underline underline-offset-4">
                    Aura Purify
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                    A cleanser that turns from gel to milk, shown in one second.
                  </p>
                </div>
              </div>
            </Link>

            {/* Solaé */}
            <Link
              href="/work/solae"
              className="liquid-glass p-4 group flex flex-col justify-between hover:border-black/25 dark:hover:border-white/25 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900">
                  <Image
                    src="/images/solae/editorial/solae-photo-01.jpg"
                    alt="Solaé concept campaign"
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-black backdrop-blur-md">
                    Concept campaign
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:underline underline-offset-4">
                    Solaé
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                    Daily SPF made to feel like part of a morning ritual.
                  </p>
                </div>
              </div>
            </Link>

            {/* Lipéa */}
            <Link
              href="/work/lipea"
              className="liquid-glass p-4 group flex flex-col justify-between hover:border-black/25 dark:hover:border-white/25 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900">
                  <Image
                    src="/images/lipea/editorial/lipea-photo-01.jpg"
                    alt="Lipéa concept campaign"
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-black backdrop-blur-md">
                    Concept campaign
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:underline underline-offset-4">
                    Lipéa
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                    A lip serum with high shine and no sticky feel, proven on camera.
                  </p>
                </div>
              </div>
            </Link>

            {/* Vyraa */}
            <Link
              href="/work/vyraa"
              className="liquid-glass p-4 group flex flex-col justify-between hover:border-black/25 dark:hover:border-white/25 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900">
                  <Image
                    src="/images/vyraa/studio/vyraa-hero-01.jpg"
                    alt="Vyraa concept campaign"
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-black backdrop-blur-md">
                    Concept campaign
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:underline underline-offset-4">
                    Vyraa
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                    A neck cream for the part of the face most ads forget.
                  </p>
                </div>
              </div>
            </Link>

          </div>

          <div className="text-center pt-4">
            <Link
              href="/work"
              className="btn-secondary min-h-[48px] px-8 text-sm font-medium"
            >
              <span>View all work</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.5 ONE IDEA, EVERY PLATFORM (VISUAL SECTION)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-neutral-950 dark:text-white">One idea. Every platform.</h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 font-normal">
              Each campaign is built once, then shaped for how people actually watch on each platform.
            </p>
          </div>

          {/* Visual: Center Hero Plate + 4 Platform Derivatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* Meta feed ad */}
            <div className="liquid-glass p-3 space-y-2">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-900">
                <Image
                  src="/images/solae/meta/meta-still-01.jpg"
                  alt="Meta feed ad asset"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 text-center py-1">
                Meta feed ad
              </p>
            </div>

            {/* Story, 9:16 */}
            <div className="liquid-glass p-3 space-y-2">
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900">
                <Image
                  src="/images/solae/instagram/instagram-story-01.jpg"
                  alt="Instagram Story 9:16 crop"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 text-center py-1">
                Story, 9:16
              </p>
            </div>

            {/* TikTok video */}
            <div className="liquid-glass p-3 space-y-2">
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900">
                <Image
                  src="/images/solae/instagram/instagram-still-03.jpg"
                  alt="TikTok video format"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 text-center py-1">
                TikTok video
              </p>
            </div>

            {/* Website banner */}
            <div className="liquid-glass p-3 space-y-2">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-900">
                <Image
                  src="/images/solae/editorial/solae-photo-02.jpg"
                  alt="Website hero banner"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 text-center py-1">
                Website banner
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.6 HOW I WORK (4 STEPS)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-3">
            <h2 className="text-neutral-950 dark:text-white">How I work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="liquid-glass p-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                Step 01
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Understand
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                We look at your product, your customer and what you already run.
              </p>
            </div>

            <div className="liquid-glass p-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                Step 02
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Plan
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                I write the strategy and the hooks, and you approve the direction.
              </p>
            </div>

            <div className="liquid-glass p-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                Step 03
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Create
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                I direct the films and visuals for every platform.
              </p>
            </div>

            <div className="liquid-glass p-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                Step 04
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Hand over
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                You get final files, a strategy document and a simple guide to testing them.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.7 WHAT YOU RECEIVE (CHECKLIST)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-neutral-950 dark:text-white">
              What a campaign package includes
            </h2>
          </div>

          <div className="liquid-glass p-8 sm:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                </div>
                <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium">
                  5 hook-based videos
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                </div>
                <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium">
                  Ad stills for Meta, Instagram, TikTok and your website
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                </div>
                <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium">
                  Strategy document: why each hook works
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                </div>
                <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium">
                  Product brief: what it is, why it exists, how it differs
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                </div>
                <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium">
                  Platform-ready file sizes
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                </div>
                <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium">
                  Full usage rights
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.8 ABOUT PREVIEW (FIXED MOBILE OVERLAP)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass p-8 sm:p-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Headshot left */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-48 sm:w-56 aspect-square rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-md">
                  <Image
                    src="/images/sakib-ziad.jpg"
                    alt="Sakib Ziad"
                    fill
                    sizes="224px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Text right */}
              <div className="md:col-span-8 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                  Hi, I'm Sakib.
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                  I'm an AI Creative Strategist and AI Commercial Director. I studied AI at university, and I use it to plan and produce beauty advertising that used to need a full crew and weeks of shooting. I run Witlyn Studio, where I make these campaigns for brands.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:underline underline-offset-4"
                  >
                    <span>More about me</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.9 WITLYN SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-neutral-950 dark:text-white">Need full production?</h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
            Witlyn is my studio for beauty brands that want complete campaigns made for them.
          </p>
          <div>
            <a
              href="https://witlyn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary min-h-[48px] px-8 text-sm font-medium inline-flex items-center gap-2"
            >
              <span>Visit Witlyn</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.10 WAYS TO WORK WITH ME (3 CARDS, NO PUBLIC PRICES)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="ways-to-work" className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-neutral-950 dark:text-white">Ways to work together</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Card 1: Free creative gap snapshot */}
            <div className="liquid-glass p-8 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                  Free creative gap snapshot
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                  Send your website. I send back 3 opportunities in your current creative.
                </p>
              </div>

              <div>
                <a
                  href="#snapshot"
                  className="btn-secondary w-full text-sm font-medium"
                >
                  Get my snapshot
                </a>
              </div>
            </div>

            {/* Card 2: Strategy call */}
            <div className="liquid-glass p-8 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                  Strategy call
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                  A focused call to look at your brand and decide the right campaign.
                </p>
              </div>

              <div>
                <Link
                  href="/contact#book"
                  className="btn-secondary w-full text-sm font-medium"
                >
                  Book a call
                </Link>
              </div>
            </div>

            {/* Card 3: Campaign package */}
            <div className="liquid-glass p-8 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                  Campaign package
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                  A complete strategy plus creative assets for one product.
                </p>
              </div>

              <div>
                <Link
                  href="/contact?type=package"
                  className="btn-primary w-full text-sm font-medium"
                >
                  Apply
                </Link>
              </div>
            </div>

          </div>

          {/* Inline Free Snapshot Form Anchor */}
          <div id="snapshot" className="pt-8 max-w-xl mx-auto">
            <div className="liquid-glass p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                  Request your free creative gap snapshot
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal">
                  Enter your brand URL and email. I review your creative and send back 3 concrete opportunities.
                </p>
              </div>

              {snapshotStatus === 'success' ? (
                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 space-y-2">
                  <p className="font-semibold">Snapshot requested.</p>
                  <p>I have received your details and will send your 3 opportunities within 2 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSnapshotSubmit} className="space-y-3">
                  <div>
                    <input
                      type="url"
                      required
                      placeholder="Brand website (e.g. https://yourbrand.com)"
                      value={snapshotWebsite}
                      onChange={(e) => setSnapshotWebsite(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-black text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={snapshotEmail}
                      onChange={(e) => setSnapshotEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-black text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={snapshotStatus === 'loading'}
                    className="btn-primary w-full text-xs font-medium min-h-[44px]"
                  >
                    {snapshotStatus === 'loading' ? 'Sending request...' : 'Get my snapshot'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.11 FAQ (ACCORDION, EXACT COPY FROM SECTION 6)
      ════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-neutral-950 dark:text-white">Frequently asked questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className="liquid-glass overflow-hidden border border-black/[0.06] dark:border-white/[0.08]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal border-t border-black/[0.04] dark:border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3.12 FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-neutral-950 dark:text-white max-w-2xl mx-auto">
            Have a beauty product to launch or scale?
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
            Tell me about it. I reply personally within 2 business days.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact#book"
              className="btn-primary min-h-[50px] px-8 text-sm sm:text-base font-medium"
            >
              <span>Book a strategy call</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              href="/contact"
              className="btn-secondary min-h-[50px] px-8 text-sm sm:text-base font-medium"
            >
              <span>Send a message</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
