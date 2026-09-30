'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const

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

export default function WorkPage() {
  const caseStudies = [
    {
      id: 'solae',
      num: '01',
      brand: 'SOLAÉ',
      tag: 'Invisible Sun Protection',
      status: 'Spec Commercial · Witlyn Vault',
      category: 'Sun Care & Hydrating Serum',
      headline: 'AIRVEIL — SPF50+ PA++++ Invisible Sun Serum',
      image: '/images/solae/editorial/solae-photo-01.jpg',
      link: '/work/solae',
      assetCount: '29 Curated Assets',
      objective:
        'Eliminate the sensory and visual friction of traditional daily sunscreens—addressing chalky white cast, greasy film in high humidity, and foundation pilling.',
      approach:
        'Engineered a 100% clear water-veil formulation visual system, contrasting thick white creams with an instantaneous 3-second absorption aesthetic across diverse skin tones.',
      outcome:
        'Delivered 29 publication-grade paid social assets spanning Meta feeds, vertical Reels, and editorial daylight textures ready for conversion campaigns.',
      metric: '29 Master Assets · 100% Zero-Cast Water Veil · Meta & IG Suite',
    },
    {
      id: 'lipea',
      num: '02',
      brand: 'LIPÉA',
      tag: 'Cellular Lip Barrier Care',
      status: 'Spec Commercial · Witlyn Vault',
      category: 'Peptide Cosmetics & Treatment',
      headline: 'Peptide Glass Lip Serum — High Shine with Zero Glue Drag',
      image: '/images/lipea/editorial/lipea-photo-01.jpg',
      link: '/work/lipea',
      assetCount: '27 Curated Assets',
      objective:
        'Solve the age-old contradiction between short-lived sticky glosses and hydrating balms, positioning a high-gloss rose glaze that actively restores the lip barrier.',
      approach:
        'Conducted the visual "Non-Sticky Hair Test" alongside macro vertical line crease-filling demonstrations to prove mirror shine without tack or painful chemical plumpers.',
      outcome:
        'Built a 27-asset campaign vault across transparent cylindrical glass vessels, sheer blush-pink swatches, and high-conversion vertical motion ads.',
      metric: '27 Master Assets · Non-Sticky Hair Test Proof · 8-Hour Barrier Recovery',
    },
    {
      id: 'nuecera',
      num: '03',
      brand: 'NUÉCERA',
      tag: 'Clinical Barrier Restoration',
      status: 'Spec Commercial · Witlyn Vault',
      category: 'Dermatological Moisturizer',
      headline: 'Moisturizing Cream — Whipped Cloud Texture, 24h Barrier Seal',
      image: '/images/nuecera/meta/meta-product-01.jpg',
      link: '/work/nuecera',
      assetCount: '35 Curated Assets',
      objective:
        'Position an oversized 16 OZ dermatologist-developed cream to combat rapid lotion evaporation, freezing office AC dryness, and multi-step routine fatigue.',
      approach:
        'Crafted a multi-platform visual identity system demonstrating dense whipped spatula peaks that melt into weightless velvet-matte protection on skin.',
      outcome:
        'Deployed 35 multi-channel assets engineered across Meta square feeds, 4:5 portraits, TikTok fullscreen verticals, and direct-to-consumer store banners.',
      metric: '35 Master Assets · 16 OZ Value Proposition · Meta, IG, TikTok & Web',
    },
    {
      id: 'aura-purify',
      num: '04',
      brand: 'AURA PURIFY',
      tag: 'Phase-Transforming Cleanser',
      status: 'Spec Commercial · Witlyn Vault',
      category: 'Barrier Defense & Cleansing',
      headline: 'Barrier Gel-to-Milk Cleanser — Never Strip. Just Clean.',
      image: '/images/aura-purify/studio/aura-product-01.jpg',
      link: '/work/aura-purify',
      assetCount: '27 Curated Assets',
      objective:
        'Overcome double-cleanse fatigue and post-wash "tight plastic" sulfate strip, providing a single restorative cleanse that melts waterproof makeup without drying skin.',
      approach:
        'Showcased the optical 1-second phase-shift from dense honey-golden plant glycerin into silky white milk upon water contact, captured in high-definition macro video.',
      outcome:
        'Constructed a 27-asset suite featuring frosted amber apothecary packaging, lipid-safe rinse demonstrations, and sponsored paid-social conversion ads.',
      metric: '27 Master Assets · 1-Second Optical Phase Shift · 50% Glycerin Base',
    },
    {
      id: 'vyraa',
      num: '05',
      brand: 'VYRAA',
      tag: 'Targeted Dermal Tension',
      status: 'Spec Commercial · Witlyn Vault',
      category: 'Prestige Clinical Neck Care',
      headline: '5-Peptide Neck Complex — Cellular Tension. Zero Collar Grease.',
      image: '/images/vyraa/studio/vyraa-hero-01.jpg',
      link: '/work/vyraa',
      assetCount: '17 Curated Assets',
      objective:
        'Confront the universal digital posture issue ("Tech-Neck") with a specialized firming cream that will not slide, clog pores, or stain dress shirt collars.',
      approach:
        'Visualized high-tensile peptide chains contracting thin horizontal neck creases, contrasted with heavy facial creams that fail on the throat and collar line.',
      outcome:
        'Delivered 17 luxury editorial and performance assets centered on frosted deep emerald-green glass and brushed gunmetal silver hardware.',
      metric: '17 Master Assets · Tech-Neck Direct Response · Zero Collar Grease',
    },
  ]

  const servicePillars = [
    'Commercial Campaign Direction',
    'Sensory Brand Worldbuilding',
    'Direct-Response Asset Systems',
    'Prestige Packaging Visualization',
    'Multi-Platform Creative Multiplication',
    'Visual Identity & Art Direction',
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-[#141416] selection:text-white dark:selection:bg-white dark:selection:text-black pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-black/[0.08] dark:border-white/[0.08]" aria-label="Work Hero">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-white/80 mb-8">
                Portfolio & Systems Archive · 5 Flagship Campaigns
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                Creative systems built for{' '}
                <span className="italic font-fraunces font-light text-zinc-600 dark:text-zinc-300">
                  beauty & skincare brands.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mb-8">
                High-fashion art direction meets direct-response psychology. Five flagship spec-commercial campaigns engineered around consumer friction points, sensory texture hooks, and paid-social conversion architecture.
              </p>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-inter text-zinc-600 dark:text-zinc-400 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                *All works produced under the Witlyn commercial standard for paid-social acquisition and portfolio case studies.
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Case Studies Detail Stream ────────────────────────────────────── */}
      <section className="section-pad bg-surface/20" aria-label="Case Studies">
        <div className="container-luxury space-y-24 sm:space-y-32">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              id={study.id}
              className="scroll-mt-32 pt-8 border-t border-black/[0.08] dark:border-white/[0.08] first:border-none first:pt-0"
            >
              <RevealSection>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                  
                  {/* Left Column: Metadata & Header */}
                  <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-32">
                    <div className="flex items-center gap-3">
                      <span className="font-fraunces text-3xl text-zinc-900 dark:text-white font-light">{study.num}</span>
                      <span className="w-8 h-px bg-black/20 dark:bg-white/20" />
                      <span className="eyebrow-luxury text-zinc-500 dark:text-zinc-400">{study.tag}</span>
                    </div>

                    <h2 className="heading-section text-3xl sm:text-4xl text-[#141416] dark:text-white">
                      {study.brand}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-inter uppercase tracking-wider bg-black/[0.04] dark:bg-white/10 border border-black/10 dark:border-white/20 text-zinc-900 dark:text-white">
                        {study.status}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-inter uppercase tracking-wider bg-white dark:bg-surface border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300">
                        {study.category}
                      </span>
                    </div>

                    {/* Metric Callout Card */}
                    <div className="card-surface p-6 mt-2">
                      <p className="eyebrow-luxury text-[10px] text-zinc-500 dark:text-zinc-400 mb-2">Scope Delivered</p>
                      <p className="font-fraunces text-base sm:text-lg text-zinc-900 dark:text-white font-light leading-snug">
                        {study.metric}
                      </p>
                    </div>

                    {/* Direct Button to Case Study */}
                    <Link
                      href={study.link}
                      className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-inter uppercase tracking-[0.16em] font-semibold hover:opacity-90 transition-opacity shadow-md"
                    >
                      <span>Explore {study.brand} Vault ({study.assetCount})</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>

                  {/* Right Column: Imagery & Strategic Breakdown */}
                  <div className="lg:col-span-8 flex flex-col gap-8 sm:gap-10">
                    
                    {/* Full-bleed Case Visual */}
                    <Link href={study.link} className="block group">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl">
                        <Image
                          src={study.image}
                          alt={`${study.brand} — ${study.headline}`}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-inter uppercase tracking-widest text-white/90 border border-white/20">
                          {study.assetCount}
                        </div>
                        <div className="absolute bottom-4 left-4 text-white text-xs font-inter font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                          <span>Open Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>

                    {/* Headline */}
                    <p className="font-fraunces text-2xl sm:text-3xl text-zinc-900 dark:text-white font-light italic leading-tight">
                      "{study.headline}"
                    </p>

                    {/* 3-Step Strategy Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-black/[0.08] dark:border-white/10">
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-[10px] text-zinc-500 dark:text-zinc-400">01 · The Objective</span>
                        <p className="body-muted text-sm text-zinc-700 dark:text-zinc-300">{study.objective}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-[10px] text-zinc-500 dark:text-zinc-400">02 · The Approach</span>
                        <p className="body-muted text-sm text-zinc-700 dark:text-zinc-300">{study.approach}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-[10px] text-zinc-500 dark:text-zinc-400">03 · The Outcome</span>
                        <p className="body-muted text-sm text-zinc-700 dark:text-zinc-300">{study.outcome}</p>
                      </div>
                    </div>

                    {/* Bottom Link */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        href={study.link}
                        className="inline-flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-[0.16em] text-zinc-900 dark:text-white hover:underline"
                      >
                        <span>View complete {study.brand} case breakdown</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>

                </div>
              </RevealSection>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Cross-Reference ──────────────────────────────────────── */}
      <section className="section-pad border-t border-black/[0.08] dark:border-white/[0.08]" aria-label="Capabilities">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-white/80 mb-2">
                Capabilities Across All 5 Vaults
              </div>
              <h2 className="heading-section text-3xl sm:text-4xl text-[#141416] dark:text-white">
                Systems, not one-off shoots.
              </h2>
              <p className="body-muted text-base max-w-xl mx-auto text-zinc-700 dark:text-zinc-300">
                Every project is architected as an interconnected content infrastructure—not an isolated set of assets that decays once a sprint closes.
              </p>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3 pt-6">
                {servicePillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="px-4 py-2 rounded-xl text-xs font-inter text-zinc-800 dark:text-zinc-200 border border-black/10 dark:border-white/10 liquid-glass font-medium"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface border-t border-black/[0.08] dark:border-white/[0.08]" aria-label="Work CTA">
        <div className="container-luxury text-center max-w-3xl space-y-6">
          <RevealSection>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-white/80 mb-4">
              Private Advisory & Direction
            </div>
            <h2 className="heading-section text-4xl sm:text-5xl text-[#141416] dark:text-white">
              Ready to construct your brand's AI creative system?
            </h2>
            <p className="body-editorial text-lg text-zinc-700 dark:text-zinc-300">
              Applications are reviewed personally. I take on a limited number of beauty and skincare brands each quarter for 1:1 advisory and creative direction.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto font-inter text-xs tracking-[0.2em] uppercase font-semibold">
                  Apply for a Strategy Call
                </Button>
              </Link>
              <Link href="/consulting">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-inter text-xs tracking-[0.2em] uppercase font-semibold">
                  Learn About Advisory
                </Button>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
