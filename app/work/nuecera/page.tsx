'use client'

import React from 'react'
import { CaseStudyTemplate, CaseStudyPageData } from '@/components/case-study-template'

const NUECERA_DATA: CaseStudyPageData = {
  campaignId: 'nuecera',
  name: 'Nuécera',
  tag: 'Concept campaign',
  oneLiner: 'A moisturiser story built on a simple question: why are you still dry?',
  role: 'Strategy, hook writing, AI commercial direction',
  year: '2026',
  heroImage: '/images/nuecera/meta/meta-product-01.jpg',
  heroVideo: '/images/nuecera/meta/meta-video-generation-08.mp4',
  brief: {
    whatItIs:
      'A dermatologist-developed, full-size (16 OZ / 453 g) daily barrier restoration moisturizing cream formulated for normal to dry, compromised skin.',
    whoItIsFor:
      'Individuals dealing with tight, flaky, sensitized skin barriers, and corporate professionals exposed to drying office air-conditioning.',
    whyItExists:
      'Standard water-based lotions evaporate quickly, leaving skin tight within 20 minutes. Nuécera delivers an uncomplicated single-step ceramide barrier reset.',
  },
  challenge:
    'Moisturizer is one of the most crowded beauty categories. Consumers have tried dozens of brands and have grown numb to generic hydration claims, assuming every cream performs the same way.',
  idea: {
    coreHook: 'Moisturizing daily, but still dry? It’s about a stronger barrier.',
    explanation:
      'Instead of competing on hydration promises, we reframe the root issue: dryness is not a lack of water, but a failure of the lipid barrier to lock it in. The creative pairs this revelation with visual proof of whipped peaks melting into weightless protection.',
  },
  hooks: [
    {
      id: 1,
      hookLine: "Moisturizing daily, but still dry? It's about a stronger barrier.",
      angleExplanation:
        'Reframes the consumer problem from adding surface water to repairing lipid barrier retention.',
      videoSrc: '/images/nuecera/meta/meta-video-generation-08.mp4',
      posterSrc: '/images/nuecera/meta/meta-product-01.jpg',
    },
    {
      id: 2,
      hookLine: 'Stop destroying your skin with 10 steps.',
      angleExplanation:
        'Contrarian angle that challenges exhausting multi-step routines with a single clinical cream.',
      videoSrc: '/images/nuecera/meta/meta-video-generation-08.mp4',
      posterSrc: '/images/nuecera/meta/meta-still-01.jpg',
    },
    {
      id: 3,
      hookLine: '16 OZ of dermatologist-developed ceramide repair.',
      angleExplanation:
        'Highlights oversized family value and clinical authority compared to small luxury jars.',
      videoSrc: '/images/nuecera/meta/meta-video-generation-08.mp4',
      posterSrc: '/images/nuecera/meta/meta-still-02.jpg',
    },
    {
      id: 4,
      hookLine: 'Whipped cloud balm that melts completely weightless.',
      angleExplanation:
        'Eliminates the fear of heavy pore-clogging grease by proving clean skin absorption.',
      videoSrc: '/images/nuecera/meta/meta-video-generation-08.mp4',
      posterSrc: '/images/nuecera/meta/meta-still-03.jpg',
    },
    {
      id: 5,
      hookLine: 'The 24-hour office AC barrier test.',
      angleExplanation:
        'Demonstrates moisture retention on skin under harsh, drying corporate air conditioning.',
      videoSrc: '/images/nuecera/meta/meta-video-generation-08.mp4',
      posterSrc: '/images/nuecera/meta/meta-still-04.jpg',
    },
  ],
  platformAssets: {
    meta: [
      { id: 'n-m1', src: '/images/nuecera/meta/meta-product-01.jpg', caption: '1:1 square master tub presentation' },
      { id: 'n-m2', src: '/images/nuecera/meta/meta-still-01.jpg', caption: 'Dense whipped cloud texture swatch' },
      { id: 'n-m3', src: '/images/nuecera/meta/meta-still-02.jpg', caption: 'Spatula peak barrier demonstration' },
    ],
    instagram: [
      { id: 'n-i1', src: '/images/nuecera/meta/meta-still-03.jpg', caption: 'Macro skin absorption reveal' },
      { id: 'n-i2', src: '/images/nuecera/meta/meta-still-04.jpg', caption: 'Morning skincare routine still' },
      { id: 'n-i3', src: '/images/nuecera/meta/meta-still-05.jpg', caption: 'Velvet-matte non-greasy finish' },
    ],
    tiktok: [
      { id: 'n-t1', src: '/images/nuecera/meta/meta-still-06.jpg', caption: 'Texture pull test in 9:16 vertical' },
      { id: 'n-t2', src: '/images/nuecera/meta/meta-still-07.jpg', caption: 'Dermatologist formulation card' },
    ],
    website: [
      { id: 'n-w1', src: '/images/nuecera/meta/meta-product-01.jpg', caption: 'E-commerce PDP hero banner' },
      { id: 'n-w2', src: '/images/nuecera/meta/meta-still-08.jpg', caption: 'Ingredient callout comparison' },
    ],
  },
  totalAssetsCount: 35,
  strategySummary: {
    whyItWorks:
      'The campaign directly answers why the viewer is currently dissatisfied with their daily moisturizer. Instead of showing generic pretty faces splashing water, it proves the barrier repair mechanism using macro texture and real customer objections.',
    angleLogic:
      'We separate top-of-funnel discovery (The Evaporation Paradox) from retargeting (Texture Proof & 16 OZ Value), giving media buyers clean options for testing across Meta and TikTok.',
    projectedOutcomes: {
      targetRoas: '3.8x – 4.5x target return on ad spend',
      thumbStopRate: '38% – 44% projected 3-second hook rate',
      cpaImpact: 'Estimated 25% – 35% lower customer acquisition cost',
      notes:
        'These figures are strategic benchmarks and forecasts for ad spend testing, not historical client records.',
    },
  },
  nextCampaign: {
    name: 'Aura Purify',
    href: '/work/aura-purify',
  },
}

export default function NueceraCaseStudyPage() {
  return <CaseStudyTemplate data={NUECERA_DATA} />
}
