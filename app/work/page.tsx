'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ArrowUpRight, Sparkles, Layers, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const

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
        'Vyraa was caught in a margin-eroding price war on retail shelves. The brand needed an immediate aesthetic elevation to justify a 2.5× price tier increase and secure placement in luxury boutique retailers.',
      approach:
        'Rebuilt the creative direction around deep emerald glass, brushed silver accents, and controlled architectural lighting. Used multi-model diffusion workflows to concept frosted vessels, micro-pigment smears, and tactile formula details.',
      outcome:
        'Secured acceptance into two high-end boutique retail distributors within 60 days of visual relaunch. Customer perceived value increased dramatically, validating the premium retail price point.',
      metric: '2.5× Price Realization Post-Relaunch',
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
        'Lipéa needed to feed paid TikTok, Meta, and email acquisition channels with fresh, on-brand creative every week, but their marketing team was completely overwhelmed by production coordination.',
      approach:
        'Engineered an integrated AI agent pipeline that ingests customer reviews and search queries, extracts emotional hook angles, automatically drafts ad scripts, and pairs them with synthetically rendered product lifestyle assets in a blush-pink reflective world.',
      outcome:
        'The brand now outputs over 60 verified on-brand creative variants monthly managed by a single marketing coordinator, cutting creative cost-per-asset by 74%.',
      metric: '60+ Monthly Brand Assets Generated with 1 Operator',
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
    'Campaign Art Direction',
    'Generative Brand Systems',
    'Autonomous Content Pipelines',
    'Prestige Aesthetic Engineering',
    'AI Model Prompt Calibration',
    'Creative Ops Automation',
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-gold selection:text-background pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-border/80" aria-label="Work Archive">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <span className="eyebrow-luxury mb-4 block">Archive of Practice</span>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                Creative systems built for{' '}
                <span className="italic font-fraunces text-gold font-light">
                  enduring beauty brands.
                </span>
              </h1>
              <p className="body-editorial text-lg sm:text-xl text-ivory/80 max-w-2xl mb-8">
                A selection of art-directed campaigns, autonomous pipelines, and generative visual worlds. Works are clearly marked for strategic transparency.
              </p>
            </RevealSection>

            {/* Service Tags Pill Strip */}
            <RevealSection delay={0.15} className="flex flex-wrap gap-2.5 pt-4">
              {servicePillars.map((pillar) => (
                <span
                  key={pillar}
                  className="px-3.5 py-1.5 rounded-full border border-border/80 bg-surface/40 text-xs font-inter text-muted-light"
                >
                  {pillar}
                </span>
              ))}
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Case Studies Detail Stream ────────────────────────────────────── */}
      <section className="section-pad bg-surface/20" aria-label="Case Studies">
        <div className="container-luxury space-y-28">
          {caseStudies.map((study, idx) => (
            <div
              key={study.id}
              id={study.id}
              className="scroll-mt-32 pt-8 border-t border-border/60 first:border-none first:pt-0"
            >
              <RevealSection>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  
                  {/* Left Column: Metadata & Header */}
                  <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-32">
                    <div className="flex items-center gap-3">
                      <span className="font-fraunces text-3xl text-gold font-light">{study.num}</span>
                      <span className="w-8 h-px bg-border" />
                      <span className="eyebrow-luxury text-gold">{study.tag}</span>
                    </div>

                    <h2 className="heading-section text-3xl sm:text-4xl text-ivory">
                      {study.brand}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-inter uppercase tracking-wider bg-gold/10 border border-gold/30 text-gold">
                        {study.status}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-inter uppercase tracking-wider bg-surface border border-border text-muted-light">
                        {study.category}
                      </span>
                    </div>

                    {/* Metric Callout Card */}
                    <div className="card-surface p-6 border-gold/30 mt-4">
                      <p className="eyebrow-luxury text-[10px] text-muted-light mb-2">Key Metric / Result</p>
                      <p className="font-fraunces text-lg text-gold font-light leading-snug">
                        {study.metric}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Imagery & Strategic Breakdown */}
                  <div className="lg:col-span-8 flex flex-col gap-10">
                    
                    {/* Full-bleed Case Visual with Zoom Hover */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border shadow-2xl group">
                      <Image
                        src={study.image}
                        alt={`${study.brand} campaign visual`}
                        fill
                        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-inter uppercase tracking-widest text-ivory/70 border border-border">
                        AI-Native Production
                      </div>
                    </div>

                    {/* Headline */}
                    <p className="font-fraunces text-2xl sm:text-3xl text-ivory font-light italic leading-tight">
                      "{study.headline}"
                    </p>

                    {/* 3-Step Strategy Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-gold">01 · Objective</span>
                        <p className="body-muted text-sm leading-relaxed">{study.objective}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-gold">02 · Approach</span>
                        <p className="body-muted text-sm leading-relaxed">{study.approach}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="eyebrow-luxury text-gold">03 · Outcome</span>
                        <p className="body-muted text-sm leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>

                  </div>

                </div>
              </RevealSection>
            </div>
          ))}
        </div>
      </section>

      {/* ── Production Arm Distinction ─────────────────────────────────────── */}
      <section className="py-20 border-y border-border/80 bg-surface/40">
        <div className="container-luxury max-w-4xl mx-auto text-center">
          <RevealSection>
            <p className="eyebrow-luxury mb-3">Full-Service Studio Execution</p>
            <h2 className="heading-section text-3xl sm:text-4xl mb-4">
              Need Done-For-You Production Instead of Advisory?
            </h2>
            <p className="body-editorial text-base sm:text-lg max-w-xl mx-auto mb-8">
              Witlyn is our dedicated creative studio providing end-to-end campaign execution, 3D generative still packs, and monthly content retainers.
            </p>
            <Button asChild variant="outline-gold" size="lg">
              <a href="https://witlyn.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <span>Visit Witlyn Studio (witlyn.com)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          </RevealSection>
        </div>
      </section>

      {/* ── Invitation CTA ─────────────────────────────────────────────────── */}
      <section className="section-pad text-center">
        <div className="container-luxury max-w-3xl mx-auto">
          <RevealSection>
            <p className="eyebrow-luxury mb-4">Start Here</p>
            <h2 className="heading-section mb-6">Install this creative system in your brand.</h2>
            <Button asChild variant="gold" size="xl">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Apply for a Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
