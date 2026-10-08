'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const CAMPAIGNS = [
  {
    id: 'nuecera',
    name: 'Nuécera',
    oneLiner: 'A moisturiser story built on a simple question: why are you still dry?',
    tag: 'Concept campaign',
    link: '/work/nuecera',
    image: '/images/nuecera/meta/meta-product-01.jpg',
    assetCount: '35 creative assets',
  },
  {
    id: 'aura-purify',
    name: 'Aura Purify',
    oneLiner: 'A cleanser that turns from gel to milk, shown in one second.',
    tag: 'Concept campaign',
    link: '/work/aura-purify',
    image: '/images/aura-purify/studio/aura-product-01.jpg',
    assetCount: '27 creative assets',
  },
  {
    id: 'solae',
    name: 'Solaé',
    oneLiner: 'Daily SPF made to feel like part of a morning ritual.',
    tag: 'Concept campaign',
    link: '/work/solae',
    image: '/images/solae/editorial/solae-photo-01.jpg',
    assetCount: '29 creative assets',
  },
  {
    id: 'lipea',
    name: 'Lipéa',
    oneLiner: 'A lip serum with high shine and no sticky feel, proven on camera.',
    tag: 'Concept campaign',
    link: '/work/lipea',
    image: '/images/lipea/editorial/lipea-photo-01.jpg',
    assetCount: '27 creative assets',
  },
  {
    id: 'vyraa',
    name: 'Vyraa',
    oneLiner: 'A neck cream for the part of the face most ads forget.',
    tag: 'Concept campaign',
    link: '/work/vyraa',
    image: '/images/vyraa/studio/vyraa-hero-01.jpg',
    assetCount: '17 creative assets',
  },
]

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-neutral-950 dark:text-white">Work</h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Five concept campaigns. Each one includes hook videos, platform ad stills, a strategy document and a product brief.
          </p>
        </div>

        {/* 5 Campaigns Grid (Nuécera First) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAMPAIGNS.map((campaign, idx) => (
            <div
              key={campaign.id}
              className={`liquid-glass overflow-hidden group flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-neutral-900 overflow-hidden">
                  <Image
                    src={campaign.image}
                    alt={`${campaign.name} — ${campaign.oneLiner}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-black/90 text-neutral-900 dark:text-neutral-100 backdrop-blur-md shadow-sm">
                    {campaign.tag}
                  </span>
                </div>

                <div className="p-8 sm:p-10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    <span>{campaign.assetCount}</span>
                    <span>2026</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                    {campaign.name}
                  </h2>
                  <p className="text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                    {campaign.oneLiner}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 sm:px-10 sm:pb-10 pt-0">
                <Link
                  href={campaign.link}
                  className="btn-primary min-h-[48px] px-6 text-sm font-medium w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <span>Read the case study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency Note under Grid */}
        <div className="pt-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            All campaigns are concept work created to full production standard. Projected figures are labelled as forecasts.
          </p>
        </div>

      </div>
    </div>
  )
}
