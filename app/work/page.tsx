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
      tag: 'AI Campaign Direction',
      status: 'Spec Commercial · Witlyn Production',
      category: 'Clinical Botanical Sun Care',
      headline: 'AIRVEIL — SPF50+ PA++++ Invisible Sun Serum',
      image: 'https://witlyn.com/work/solae/01-solae-campaign-hero.jpg.jpg',
      objective:
        'Solaé required a luminous, hyper-tactile commercial campaign for an invisible sun serum. Traditional studio shooting projected a 7-week delay and heavy budget overhead for fluid-rig photography and architectural lighting sets.',
      approach:
        'Developed a proprietary prompt architecture calibrated to botanical cell morphology and warm architectural sunlight. Constructed 12 distinct art-directed scenes including liquid dispersion, macro dropper textures, and golden-hour lifestyle stills.',
      outcome:
        'Delivered publication-grade campaign assets in 5 days. Established the permanent visual brand playbook now deployed across product packaging, digital paid acquisition, and wholesale retail merchandising.',
      metric: 'Hero Campaign Film + 48 High-Resolution Assets Delivered in 5 Days',
    },
    {
      id: 'vyraa',
      num: '02',
      brand: 'VYRAA',
      tag: 'Brand Repositioning',
      status: 'Spec Commercial · Witlyn Production',
      category: 'Prestige Clinical Skincare',
      headline: '5-Peptide Neck Complex — Emerald Precision',
      image: 'https://witlyn.com/work/vyraa/vyraa%20product.jpg',
      objective:
        'Vyraa needed an immediate aesthetic elevation to establish prestige category authority and position seamlessly alongside luxury boutique skincare brands.',
      approach:
        'Rebuilt the creative direction around deep emerald glass, brushed silver accents, and controlled architectural lighting. Used multi-model diffusion workflows to concept frosted vessels, micro-pigment smears, and tactile formula details.',
      outcome:
        'Dramatically elevated brand perception and visual defensibility, establishing a cohesive luxury aesthetic suitable for high-end boutique retail placement.',
      metric: 'Complete Visual Identity Overhaul & Editorial Asset Suite',
    },
    {
      id: 'lipea',
      num: '03',
      brand: 'LIPÉA',
      tag: 'Autonomous Content Engine',
      status: 'Spec Commercial · Witlyn Production',
      category: 'Lip Care & Serum Cosmetics',
      headline: 'Peptide Glass Lip Serum — The Pink World',
      image: 'https://witlyn.com/work/lipea/6.jpg',
      objective:
        'Lipéa needed to feed paid social and email acquisition channels with fresh, high-aesthetic creative while eliminating manual production bottlenecks.',
      approach:
        'Engineered an integrated AI agent pipeline that ingests customer sentiment, extracts emotional hook angles, drafts ad scripts, and pairs them with synthetically rendered product lifestyle assets in a blush-pink reflective world.',
      outcome:
        'Streamlined weekly asset creation into an autonomous creative pipeline, allowing in-house marketing to produce cohesive campaign variants without traditional studio delays.',
      metric: 'Multi-Angle Campaign Suite & Automated Briefing System',
    },
    {
      id: 'nuecera',
      num: '04',
      brand: 'NUÉCERA',
      tag: 'Visual Identity & Generative Worldbuilding',
      status: 'Spec Concept · Witlyn Production',
      category: 'Botanical Moisturizing Cream',
      headline: 'Moisturizing Cream — A Complete Visual World',
      image: 'https://witlyn.com/work/nuecera/nuecera%20cream%201.jpg',
      objective:
        'Nuécera needed to create a complete visual ecosystem around a single flagship moisturizing cream — expanding beyond standard white-background e-commerce shots into everyday rituals and rich editorial atmosphere.',
      approach:
        'Constructed a multi-scene generative world spanning reflective green surfaces, micro-texture fingertip studies, application moments in warm window light, and sunlit bathroom counter lifestyle setups.',
      outcome:
        'Created 30 high-cohesion campaign assets under one creative direction without commissioning physical sets, delivering a complete brand identity world ready for retail pitch decks.',
      metric: '30-Scene Complete Visual World Built Around 1 SKU',
    },
  ]

  const servicePillars = [
    'AI-Native Campaign Direction',
    'Computational Brand Worldbuilding',
    'Autonomous Content Engines',
    'Custom Generative Pipeline Architecture',
    'Prestige Packaging Visualization',
    'Multi-Platform Diffusion Deployment',
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-white selection:text-black pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-white/[0.08]" aria-label="Work Hero">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] uppercase tracking-[0.2em] text-white/80 mb-8">
                Portfolio & Systems Archive
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                Creative systems built for{' '}
                <span className="italic font-fraunces font-light text-zinc-300">
                  beauty & skincare brands.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-zinc-300 max-w-2xl mb-8">
                High-fashion art direction meets neural computation. Each project represents a proprietary generative pipeline crafted for category-defining visual defensibility.
              </p>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-inter text-zinc-400 border border-white/10 bg-white/[0.02]">
                *All works clearly labeled as Live Client Engagements or Spec Commercials produced via Witlyn.
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
              className="scroll-mt-32 pt-8 border-t border-white/[0.08] first:border-none first:pt-0"
            >
              <RevealSection>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                  
                  {/* Left Column: Metadata & Header */}
                  <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-32">
                    <div className="flex items-center gap-3">
                      <span className="font-fraunces text-3xl text-white font-light">{study.num}</span>
                      <span className="w-8 h-px bg-white/20" />
                      <span className="eyebrow-luxury">{study.tag}</span>
                    </div>

                    <h2 className="heading-section text-3xl sm:text-4xl text-white">
                      {study.brand}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-inter uppercase tracking-wider bg-white/10 border border-white/20 text-white">
                        {study.status}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-inter uppercase tracking-wider bg-surface border border-white/10 text-zinc-300">
                        {study.category}
                      </span>
                    </div>

                    {/* Metric Callout Card */}
                    <div className="card-surface p-6 border-white/10 mt-2">
                      <p className="eyebrow-luxury text-[10px] text-zinc-400 mb-2">Scope Delivered</p>
                      <p className="font-fraunces text-base sm:text-lg text-white font-light leading-snug">
                        {study.metric}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Imagery & Strategic Breakdown */}
                  <div className="lg:col-span-8 flex flex-col gap-8 sm:gap-10">
                    
                    {/* Full-bleed Case Visual */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                      <Image
                        src={study.image}
                        alt={`${study.brand} campaign visual`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-102"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-inter uppercase tracking-widest text-white/80 border border-white/10">
                        AI-Native Production
                      </div>
                    </div>

                    {/* Headline */}
                    <p className="font-fraunces text-2xl sm:text-3xl text-white font-light italic leading-tight">
                      "{study.headline}"
                    </p>

                    {/* 3-Step Strategy Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-[10px]">01 · The Objective</span>
                        <p className="body-muted text-sm text-zinc-300">{study.objective}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-[10px]">02 · The Approach</span>
                        <p className="body-muted text-sm text-zinc-300">{study.approach}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-[10px]">03 · The Outcome</span>
                        <p className="body-muted text-sm text-zinc-300">{study.outcome}</p>
                      </div>
                    </div>

                    {/* Bottom Link out to Witlyn studio */}
                    <div className="pt-2">
                      <a
                        href="https://witlyn.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-inter uppercase tracking-[0.16em] text-zinc-400 hover:text-white transition-colors"
                      >
                        <span>View complete production archive on Witlyn</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </RevealSection>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Architectural Taxonomy ─────────────────────────────────── */}
      <section className="section-pad border-t border-white/[0.08] bg-surface/30" aria-label="Capabilities">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Capabilities</p>
            <h2 className="heading-section">Systems Architecture Deployed Across Work</h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicePillars.map((service, i) => (
              <RevealSection key={service} delay={i * 0.05}>
                <div className="card-surface p-6 sm:p-8 flex items-center justify-between">
                  <span className="font-fraunces text-base sm:text-lg text-white font-normal">{service}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0 ml-4" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Call to Action ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 border-t border-white/[0.08] bg-surface/50 text-center">
        <div className="container-luxury max-w-2xl mx-auto">
          <RevealSection>
            <h2 className="heading-section text-3xl sm:text-4xl mb-6">Ready to engineer your brand's AI edge?</h2>
            <Button asChild variant="default" size="lg">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Apply for Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
