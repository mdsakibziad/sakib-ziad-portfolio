'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SplitRevealImage } from '@/components/split-reveal-image'

export default function WorkPage() {
  const caseStudies = [
    {
      id: 'solae',
      num: '01',
      brand: 'SOLAÉ',
      tag: 'Invisible Sun Protection',
      status: 'SPEC COMMERCIAL · WITLYN VAULT',
      category: 'Sun Care & Hydrating Serum',
      headline: 'AIRVEIL — SPF50+ PA++++ Invisible Sun Serum',
      image: '/images/solae/editorial/solae-photo-01.jpg',
      link: '/work/solae',
      assetCount: '29 Master Assets',
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
      status: 'SPEC COMMERCIAL · WITLYN VAULT',
      category: 'Peptide Cosmetics & Treatment',
      headline: 'Peptide Glass Lip Serum — High Shine with Zero Glue Drag',
      image: '/images/lipea/editorial/lipea-photo-01.jpg',
      link: '/work/lipea',
      assetCount: '27 Master Assets',
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
      status: 'SPEC COMMERCIAL · WITLYN VAULT',
      category: 'Dermatological Moisturizer',
      headline: 'Moisturizing Cream — Whipped Cloud Texture, 24h Barrier Seal',
      image: '/images/nuecera/meta/meta-product-01.jpg',
      link: '/work/nuecera',
      assetCount: '35 Master Assets',
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
      status: 'SPEC COMMERCIAL · WITLYN VAULT',
      category: 'Oil-Balm to Emulsion Cleanser',
      headline: 'Barrier Gel-to-Milk Cleanser — Never Strip. Just Clean.',
      image: '/images/aura-purify/studio/aura-product-01.jpg',
      link: '/work/aura-purify',
      assetCount: '27 Master Assets',
      objective:
        'Dismantle double-cleansing exhaustion by demonstrating an instantaneous 1-second phase shift from honey-thick amber gel into lightweight nourishing oat milk.',
      approach:
        'Directed high-speed water emulsion macro reveals where waterproof eyeliner and mineral sunscreen melt upon water contact without greasy residue.',
      outcome:
        'Supplied 27 studio stills and vertical performance video assets engineered to drive immediate 60-day recurring subscription cart additions.',
      metric: '27 Master Assets · 1-Second Phase Shift · Zero Tightness Proof',
    },
    {
      id: 'vyraa',
      num: '05',
      brand: 'VYRAA',
      tag: 'Cervical Tension Architecture',
      status: 'SPEC COMMERCIAL · WITLYN VAULT',
      category: 'Targeted Neck Peptides',
      headline: '5-Peptide Neck Complex — Cellular Tension. Zero Collar Grease.',
      image: '/images/vyraa/studio/vyraa-hero-01.jpg',
      link: '/work/vyraa',
      assetCount: '17 Master Assets',
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
    { num: '01', title: 'COMMERCIAL CAMPAIGN DIRECTION', desc: 'Prestige visual worldbuilding calibrated for high conversion across paid feeds.' },
    { num: '02', title: 'SENSORY TEXTURE CAUSTICS', desc: '4K macro formula physics showing viscosity, refraction, and absorption on skin.' },
    { num: '03', title: 'DIRECT-RESPONSE HOOK ARCHITECTURE', desc: '1.5-second thumb-stop angles engineered to solve consumer friction points.' },
    { num: '04', title: '72-HOUR COMMERCIAL PIPELINE', desc: 'Virtual studio production replacing 8-week physical shoots and catering bottlenecks.' },
    { num: '05', title: 'OMNICHANNEL RE-FORMATTING', desc: 'Pre-formatted master deliverables for Meta 1:1, IG Reels 9:16, TikTok, and E-comm.' },
    { num: '06', title: 'VISUAL IDENTITY RIGOR', desc: 'Uncompromising luxury brand equity preserved under aggressive performance scaling.' },
  ]

  return (
    <div className="bg-[#050609] text-[#ece8e1] min-h-screen selection:bg-[#f4521c] selection:text-[#050609] pt-28 sm:pt-36">

      {/* ── Top Meta Bar ── */}
      <div className="container-luxury border-b border-[#292929] pb-4 mb-12">
        <div className="flex items-center justify-between">
          <span className="label-mono !text-[#f4521c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f4521c]" />
            IDX/02 — ARCHIVE
          </span>
          <span className="label-mono text-[#8a8a8a]">
            05 FLAGSHIP COMMERCIAL SYSTEMS
          </span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="container-luxury pb-16 border-b border-[#292929]" aria-label="Work Hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-inter font-black uppercase text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-[#ece8e1]">
              CREATIVE SYSTEMS <br />
              <span className="text-[#f4521c]">ENGINEERED FOR</span> <br />
              BEAUTY &amp; SKINCARE.
            </h1>

            <p className="font-inter text-base sm:text-lg md:text-xl font-medium text-[#bdb8b0] max-w-2xl leading-relaxed tracking-tight">
              Five category-defining skincare and beauty campaigns engineered around consumer friction points, sensory texture hooks, and paid-social conversion architecture.
            </p>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#292929] pt-6 lg:pt-0 lg:pl-8 space-y-4">
            <span className="label-mono text-[#8a8a8a] block">// PRODUCTION STANDARD</span>
            <p className="label-mono text-xs text-[#bdb8b0] leading-relaxed">
              All works produced under the Witlyn commercial standard for direct-response acquisition, sensory conviction, and luxury brand equity.
            </p>
            <div className="pt-2 flex items-center gap-2 label-mono !text-[#f4521c] text-xs">
              <span className="w-1.5 h-1.5 bg-[#f4521c]" />
              <span>135+ TOTAL PRODUCTION DELIVERABLES</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Studies Stream ───────────────────────────────────────────── */}
      <section className="py-20" aria-label="Case Studies">
        <div className="container-luxury space-y-32">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              id={study.id}
              className="scroll-mt-32 pt-12 border-t border-[#292929] first:border-none first:pt-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                
                {/* Left Column: Metadata & Header */}
                <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-32">
                  <div className="flex items-center justify-between border-b border-[#292929] pb-4">
                    <span className="label-mono !text-[#f4521c]">
                      CASE — {study.num} / SZ
                    </span>
                    <span className="label-mono text-[#8a8a8a]">
                      {study.assetCount}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-inter font-black uppercase text-3xl sm:text-4xl lg:text-5xl tracking-[-0.05em] text-[#ece8e1] hover:text-[#f4521c] transition-colors mb-2">
                      <Link href={study.link}>{study.brand}</Link>
                    </h2>
                    <p className="label-mono text-xs text-[#bdb8b0]">
                      {study.headline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="border border-[#292929] bg-[#0b0c10] px-3 py-1 label-mono text-[10px] text-[#ece8e1]">
                      {study.status}
                    </span>
                    <span className="border border-[#292929] bg-[#0b0c10] px-3 py-1 label-mono text-[10px] text-[#8a8a8a]">
                      {study.category}
                    </span>
                  </div>

                  {/* Metric Callout Card */}
                  <div className="border border-[#292929] border-l-2 border-l-[#f4521c] bg-[#0b0c10] p-5 space-y-2">
                    <span className="label-mono text-[10px] text-[#8a8a8a] block">
                      DELIVERABLE METRIC
                    </span>
                    <p className="font-inter font-bold text-sm text-[#ece8e1] tracking-tight leading-snug">
                      {study.metric}
                    </p>
                  </div>

                  {/* Direct Button to Case Study */}
                  <Button asChild className="btn-acid h-12 w-full rounded-none">
                    <Link href={study.link} className="flex items-center justify-between px-2">
                      <span>EXPLORE {study.brand} VAULT</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                {/* Right Column: Imagery & Strategic Breakdown */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                  
                  {/* Shutter Reveal Case Visual */}
                  <div className="border border-[#292929] bg-[#0b0c10] p-2">
                    <SplitRevealImage
                      src={study.image}
                      alt={`${study.brand} — ${study.headline}`}
                      aspect="aspect-[16/10]"
                      className="w-full"
                    />
                    <div className="flex items-center justify-between pt-3 px-2 label-mono text-[10px] text-[#8a8a8a]">
                      <span>{study.brand} // MASTER STILL</span>
                      <span className="text-[#f4521c]">4K STUDIO GRADE</span>
                    </div>
                  </div>

                  {/* 3-Step Strategy Breakdown in Selora Hairline Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-[#292929] bg-[#0b0c10] p-5 space-y-2 hover:border-[#f4521c] transition-colors">
                      <span className="label-mono !text-[#f4521c]">01 / OBJECTIVE</span>
                      <p className="font-inter text-xs text-[#bdb8b0] leading-relaxed">
                        {study.objective}
                      </p>
                    </div>

                    <div className="border border-[#292929] bg-[#0b0c10] p-5 space-y-2 hover:border-[#f4521c] transition-colors">
                      <span className="label-mono !text-[#f4521c]">02 / APPROACH</span>
                      <p className="font-inter text-xs text-[#bdb8b0] leading-relaxed">
                        {study.approach}
                      </p>
                    </div>

                    <div className="border border-[#292929] bg-[#0b0c10] p-5 space-y-2 hover:border-[#f4521c] transition-colors">
                      <span className="label-mono !text-[#f4521c]">03 / OUTCOME</span>
                      <p className="font-inter text-xs text-[#bdb8b0] leading-relaxed">
                        {study.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Link */}
                  <div className="pt-2">
                    <Link
                      href={study.link}
                      className="inline-flex items-center gap-2 label-mono !text-[#ece8e1] hover:!text-[#f4521c] transition-colors"
                    >
                      <span>VIEW COMPLETE {study.brand} CAMPAIGN VAULT</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>

              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Services Hairline Rows (Selora Style) ─────────────────────────── */}
      <section className="py-20 border-t border-[#292929] bg-[#050609]" aria-label="Capabilities">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">SYSTEM CAPABILITIES</span>
            <span className="label-mono text-[#8a8a8a]">CROSS-CAMPAIGN RIGOR</span>
          </div>

          <div className="space-y-0">
            {servicePillars.map((pillar) => (
              <div
                key={pillar.num}
                className="group relative border-b border-[#292929] py-6 transition-colors hover:border-[#f4521c]"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                  <span className="md:col-span-2 label-mono text-[#8a8a8a] group-hover:text-[#f4521c] transition-colors">
                    MOD — {pillar.num}
                  </span>
                  <h3 className="md:col-span-5 font-inter font-black uppercase text-xl sm:text-2xl tracking-tight text-[#ece8e1] group-hover:text-[#f4521c] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="md:col-span-5 font-inter text-xs text-[#8a8a8a] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-[#292929] bg-[#0b0c10]" aria-label="Work CTA">
        <div className="container-luxury text-center max-w-3xl space-y-6">
          <span className="label-mono !text-[#f4521c] block">
            // APPLICATION REQUIRED · 3 PARTNER SLOTS
          </span>
          <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl tracking-[-0.05em] text-[#ece8e1] leading-tight">
            READY TO INSTALL A HIGH-PERFORMANCE CREATIVE SYSTEM?
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#bdb8b0] leading-relaxed">
            Applications are reviewed personally. I partner directly with select cosmetics and skincare founders each quarter to eliminate creative fatigue and scale conversion assets.
          </p>
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="btn-acid h-12 px-8 rounded-none">
              <Link href="/contact" className="flex items-center gap-2">
                <span>APPLY FOR A STRATEGY CALL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
              <Link href="/consulting">
                LEARN ABOUT ADVISORY
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
