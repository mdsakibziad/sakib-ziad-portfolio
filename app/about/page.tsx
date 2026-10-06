'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SplitRevealImage } from '@/components/split-reveal-image'

export default function AboutPage() {
  const beliefs = [
    {
      num: '01',
      title: 'CREATIVE DIRECTION IS LEVERAGE, NOT DECORATION',
      body: 'The beauty brands that will dominate are not replacing human creative direction with automated shortcuts. They are empowering taste with technical systems — achieving visual scale and velocity previously restricted to conglomerate budgets.',
    },
    {
      num: '02',
      title: 'PRESTIGE AESTHETICS DEMAND VERTICAL SPECIALIZATION',
      body: 'Generalist creators produce plastic, uninspired caricatures. Beauty and cosmetics require deep category intuition: botanical caustics, skin subsurface scattering, packaging refraction, and emotional luxury positioning.',
    },
    {
      num: '03',
      title: 'TACTICS EXPIRE. PROPRIETARY SYSTEMS COMPOUND',
      body: 'A viral video trend delivers temporary traffic and vanishes. An internal creative architecture and rapid commercial production pipeline compounds in velocity, consistency, and margin every single month.',
    },
  ]

  const timeline = [
    {
      phase: '01 / FOUNDATION',
      title: 'Computing & Visual Systems Background',
      desc: 'Rigorous technical training in visual computing systems, digital image processing, and cognitive modeling, establishing deep analytical precision.',
    },
    {
      phase: '02 / IMMERSION',
      title: 'Creative Direction & Beauty Specialization',
      desc: 'Bridged engineering theory with luxury brand positioning, studying light refraction, cosmetic formulation aesthetics, and high-fashion editorial art direction.',
    },
    {
      phase: '03 / VENTURE',
      title: 'Founded Witlyn Studio',
      desc: 'Launched Witlyn (witlyn.com) to provide full-service commercial campaign production, establishing proven commercial case studies for innovative skincare and cosmetics brands.',
    },
    {
      phase: '04 / ADVISORY',
      title: 'Executive Strategic Advisory',
      desc: 'Initiated 1:1 strategic advisory and direct-response creative builds for beauty founders seeking to master internal creative infrastructure and escape traditional agency overhead.',
    },
  ]

  const expertisePoints = [
    {
      num: '01',
      title: 'DIRECT-RESPONSE CREATIVE ARCHITECTURE',
      desc: 'Translating abstract cosmetic benefits into scroll-stopping paid-social video hooks and visual proof demonstrations that consistently cut CPA by 30%–45%.',
    },
    {
      num: '02',
      title: 'SENSORY COSMETIC DIRECTING & TEXTURE PHYSICS',
      desc: 'Engineering studio lighting caustics, optical bottle reflections, and tactile formula dispersion (gel-to-milk blooms, peptide matrix cushion, clear water-veils) so consumers instantly feel the formula on skin.',
    },
    {
      num: '03',
      title: 'FIRST-FRAME HOOK ENGINEERING (1.5S THUMB-STOP)',
      desc: 'Confronting consumer category friction head-on with contrarian truth angles ("Sunscreen shouldn’t look like white paint", "Cellular tension. Zero collar grease") that drive 48%+ 3-second hold rates.',
    },
    {
      num: '04',
      title: 'OMNICHANNEL DERIVATIVE SCALING',
      desc: 'Structuring master visual captures that branch natively into Meta 1:1 square feeds, 4:5 sponsored portraits, 9:16 Instagram Reels, TikTok video feeds, and e-commerce hero banners with zero awkward cropping.',
    },
    {
      num: '05',
      title: 'RAPID 72-HOUR COMMERCIAL STUDIO TURNAROUND',
      desc: 'Replacing antiquated 6–8 week agency shoot bottlenecks and $50k+ overhead with agile 72-hour studio workflows delivering 25+ publication-grade commercial assets under the Witlyn standard.',
    },
    {
      num: '06',
      title: 'PAID-SOCIAL FORENSIC AD ACCOUNT AUDITING',
      desc: 'Dissecting historical Meta & TikTok ad data to pinpoint creative fatigue drop-offs, hook decay rates, and ad spend leakage across top-of-funnel prospecting vs middle-of-funnel retargeting.',
    },
    {
      num: '07',
      title: 'PRESTIGE BRAND EQUITY DEFENSE',
      desc: 'Ensuring aggressive direct-response conversion never compromises luxury prestige. We balance high-performance copywriting with refined editorial art direction and typographic rigor.',
    },
    {
      num: '08',
      title: 'COSMETIC SENSORY FRICTION DIAGNOSTICS',
      desc: 'Diagnosing the hidden friction points that stop beauty buyers (chalky white casts, foundation pilling, midday shine breakthrough, sticky hair gloss traps) and scripting undeniable visual counters.',
    },
    {
      num: '09',
      title: 'DTC E-COMMERCE CONVERSION ALIGNMENT',
      desc: 'Synchronizing paid social ad creative hooks directly with Product Detail Page (PDP) hero copy, driving higher first-visit cart conversion and increasing Average Order Value (AOV) via routine bundles.',
    },
    {
      num: '10',
      title: 'EXECUTIVE ADVISORY & IN-HOUSE TEAM ENABLEMENT',
      desc: 'Working 1:1 with beauty founders and CMOs to build and install sustainable in-house creative pipelines—turning creative velocity into a compounding competitive moat.',
    },
  ]

  return (
    <div className="bg-[#050609] text-[#ece8e1] min-h-screen selection:bg-[#f4521c] selection:text-[#050609] pt-28 sm:pt-36">

      {/* ── Top Meta Bar ── */}
      <div className="container-luxury border-b border-[#292929] pb-4 mb-12">
        <div className="flex items-center justify-between">
          <span className="label-mono !text-[#f4521c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f4521c]" />
            IDX/05 — ABOUT
          </span>
          <span className="label-mono text-[#8a8a8a]">
            FOUNDER &amp; CREATIVE STRATEGIST
          </span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="container-luxury pb-16 border-b border-[#292929]" aria-label="About Hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-inter font-black uppercase text-[clamp(2.5rem,6.2vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-[#ece8e1]">
              CREATIVE DIRECTION <br />
              <span className="text-[#f4521c]">IS AN AMPLIFIER,</span> <br />
              NOT DECORATION.
            </h1>

            <p className="font-inter text-base sm:text-lg md:text-xl font-medium text-[#bdb8b0] max-w-2xl leading-relaxed tracking-tight">
              “I built Witlyn to prove that high-performance creative transforms cosmetics brands. I built this advisory practice to show founders how to think in commercial systems.”
            </p>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#292929] pt-6 lg:pt-0 lg:pl-8 space-y-4">
            <span className="label-mono text-[#8a8a8a] block">// POSITIONING MEMORANDUM</span>
            <p className="label-mono text-xs text-[#bdb8b0] leading-relaxed">
              Sakib Ziad is the founder of Witlyn and an executive creative strategist advising high-growth beauty, skincare, and fragrance brands globally.
            </p>
            <div className="pt-2">
              <span className="label-mono !text-[#f4521c] text-xs">
                FOUNDER OF WITLYN · COMMERCIAL DIRECTOR
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story Section with Shutter Reveal Portrait ─────────────────────── */}
      <section className="py-20 border-b border-[#292929]" aria-label="Founder Story">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Sakib Portrait with Selora Shutter Split Reveal */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="border border-[#292929] bg-[#0b0c10] p-2">
                <SplitRevealImage
                  src="/images/sakib-ziad.jpg"
                  alt="Sakib Ziad photographed in studio"
                  aspect="aspect-[4/5]"
                  className="w-full"
                />
                <div className="flex items-center justify-between pt-3 px-2 label-mono text-[10px] text-[#8a8a8a]">
                  <span className="text-[#ece8e1]">SAKIB ZIAD</span>
                  <span className="text-[#f4521c]">PORTRAIT / 2026</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative Editorial */}
            <div className="lg:col-span-7 space-y-8">
              <div className="border-b border-[#292929] pb-4">
                <span className="label-mono !text-[#f4521c]">// THE BACKGROUND</span>
              </div>

              <div className="space-y-6 font-inter text-sm sm:text-base text-[#bdb8b0] leading-relaxed">
                <p>
                  With an academic foundation in computing and an obsession with luxury visual culture, I began investigating why cosmetics marketing felt trapped in an outdated loop of 8-week production timelines, bloated set costs, and 14-day creative fatigue.
                </p>
                <p>
                  Beauty is among the most sensory categories in commercial direct-response: lighting caustics, packaging refraction, and realistic formula viscosity govern whether a consumer trusts a brand in the first 1.5 seconds.
                </p>
                <p>
                  I established Witlyn (witlyn.com) to solve this bottleneck—engineering high-fashion virtual production workflows that generate 25+ studio-grade deliverables in 72 hours.
                </p>
                <p>
                  This advisory practice exists to give founders and CMOs direct access to that strategic methodology: auditing conversion leaks, engineering contrarian hook angles, and installing compounding creative infrastructure.
                </p>
              </div>

              {/* Direct Link to Studio */}
              <div className="pt-4 border-t border-[#292929] flex items-center justify-between">
                <span className="label-mono text-xs text-[#8a8a8a]">LOOKING FOR DONE-FOR-YOU PRODUCTION?</span>
                <a
                  href="https://witlyn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 label-mono !text-[#f4521c] hover:underline text-xs"
                >
                  <span>VISIT WITLYN STUDIO</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3 Core Beliefs (Selora Grid Cards) ─────────────────────────────── */}
      <section className="py-20 border-b border-[#292929] bg-[#0b0c10]" aria-label="Beliefs">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">CORE BELIEFS</span>
            <span className="label-mono text-[#8a8a8a]">FIRST PRINCIPLES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beliefs.map((b) => (
              <div
                key={b.num}
                className="border border-[#292929] bg-[#050609] p-8 space-y-4 hover:border-[#f4521c] transition-colors"
              >
                <div className="flex items-center justify-between border-b border-[#292929] pb-4">
                  <span className="label-mono !text-[#f4521c]">BELIEF — {b.num}</span>
                  <span className="label-mono text-[#8a8a8a]">0{b.num}/03</span>
                </div>
                <h3 className="font-inter font-black uppercase text-lg text-[#ece8e1] leading-snug">
                  {b.title}
                </h3>
                <p className="font-inter text-xs text-[#8a8a8a] leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Timeline ────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#292929]" aria-label="Timeline">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">TRAJECTORY</span>
            <span className="label-mono text-[#8a8a8a]">EVOLUTION &amp; ACCREDITATION</span>
          </div>

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="border-b border-[#292929] py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:border-[#f4521c] transition-colors group"
              >
                <span className="md:col-span-3 label-mono !text-[#f4521c]">
                  {item.phase}
                </span>
                <h3 className="md:col-span-4 font-inter font-black uppercase text-lg text-[#ece8e1] group-hover:text-[#f4521c] transition-colors">
                  {item.title}
                </h3>
                <p className="md:col-span-5 font-inter text-xs text-[#8a8a8a] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 Capabilities & Expertise Points ─────────────────────────────── */}
      <section className="py-20 border-b border-[#292929] bg-[#050609]" aria-label="Capabilities">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">TECHNICAL CAPABILITIES</span>
            <span className="label-mono text-[#8a8a8a]">10 OPERATIONAL PILLARS</span>
          </div>

          <div className="space-y-0">
            {expertisePoints.map((ep) => (
              <div
                key={ep.num}
                className="border-b border-[#292929] py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:border-[#f4521c] transition-colors group"
              >
                <span className="md:col-span-2 label-mono text-[#8a8a8a] group-hover:text-[#f4521c] transition-colors">
                  MOD — {ep.num}
                </span>
                <h3 className="md:col-span-5 font-inter font-black uppercase text-base sm:text-lg text-[#ece8e1] group-hover:text-[#f4521c] transition-colors">
                  {ep.title}
                </h3>
                <p className="md:col-span-5 font-inter text-xs text-[#8a8a8a] leading-relaxed">
                  {ep.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0b0c10]" aria-label="About CTA">
        <div className="container-luxury text-center max-w-3xl space-y-6">
          <span className="label-mono !text-[#f4521c] block">
            // APPLICATION REQUIRED · 3 PARTNER SLOTS
          </span>
          <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl tracking-[-0.05em] text-[#ece8e1] leading-tight">
            READY TO ARCHITECT YOUR BRAND'S CREATIVE EDGE?
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#bdb8b0] leading-relaxed">
            I review all advisory applications personally within 48 business hours. Let's discuss your brand's bottlenecks and growth objectives.
          </p>
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="btn-acid h-12 px-8 rounded-none">
              <Link href="/contact" className="flex items-center gap-2">
                <span>APPLY FOR A STRATEGY CALL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
              <Link href="/work">
                EXPLORE CASE ARCHIVE
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
