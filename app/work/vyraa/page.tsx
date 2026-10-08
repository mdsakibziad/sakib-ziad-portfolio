'use client'

import React from 'react'
import { CaseStudyTemplate, CaseStudyPageData } from '@/components/case-study-template'

const VYRAA_DATA: CaseStudyPageData = {
  campaignId: 'vyraa',
  name: 'Vyraa',
  tag: 'Concept campaign',
  oneLiner: 'A neck cream for the part of the face most ads forget.',
  role: 'Strategy, hook writing, AI commercial direction',
  year: '2026',
  heroImage: '/images/vyraa/studio/vyraa-hero-01.jpg',
  heroVideo: '/images/vyraa/meta/meta-video-01.mp4',
  brief: {
    whatItIs:
      'A targeted 5-peptide cervical firming complex formulated to support delicate neck skin tension and smooth horizontal creases with zero residue.',
    whoItIsFor:
      'Digital workers, desk professionals, and skincare conscious consumers noticing premature horizontal neck lines from prolonged screen use.',
    whyItExists:
      'Neck skin is structurally thinner than facial skin and lacks dense sebaceous glands. Regular facial moisturizers often leave a greasy coating that soils clothing collars.',
  },
  challenge:
    'Most consumers assume their standard daily face cream is sufficient for their neck, or they avoid neck creams entirely because they stain business attire and feel sticky.',
  idea: {
    coreHook: 'Why does your neck look 5 years older than your face?',
    explanation:
      'We connect a widespread digital lifestyle habit—looking down at laptops and phones—to premature horizontal neck creases. The creative proves fast skin penetration, validating that white collars remain 100% grease-free immediately after application.',
  },
  hooks: [
    {
      id: 1,
      hookLine: 'Why does your neck look 5 years older than your face?',
      angleExplanation:
        'Connects downward digital screen posture directly to horizontal cervical creases.',
      videoSrc: '/images/vyraa/meta/meta-video-01.mp4',
      posterSrc: '/images/vyraa/studio/vyraa-hero-01.jpg',
    },
    {
      id: 2,
      hookLine: 'The white shirt collar test: zero grease.',
      angleExplanation:
        'Physical fabric test showing clean shirt collars immediately after applying the neck complex.',
      videoSrc: '/images/vyraa/meta/meta-video-01.mp4',
      posterSrc: '/images/vyraa/studio/vyraa-product-01.jpg',
    },
    {
      id: 3,
      hookLine: "Your face moisturizer wasn't formulated for your neck.",
      angleExplanation:
        'Educates the audience on the thinner anatomical structure of neck dermal tissue.',
      videoSrc: '/images/vyraa/meta/meta-video-01.mp4',
      posterSrc: '/images/vyraa/meta/meta-still-01.jpg',
    },
    {
      id: 4,
      hookLine: '5 peptides targeted for horizontal screen creases.',
      angleExplanation:
        'Focuses on clinical tension restoration and multi-peptide firming efficacy.',
      videoSrc: '/images/vyraa/meta/meta-video-01.mp4',
      posterSrc: '/images/vyraa/meta/meta-still-02.jpg',
    },
    {
      id: 5,
      hookLine: 'Two minutes morning and night: lifted skin tension.',
      angleExplanation:
        'Creates an actionable, simple preventative routine for screen workers.',
      videoSrc: '/images/vyraa/meta/meta-video-01.mp4',
      posterSrc: '/images/vyraa/meta/meta-still-03.jpg',
    },
  ],
  platformAssets: {
    meta: [
      { id: 'v-m1', src: '/images/vyraa/studio/vyraa-hero-01.jpg', caption: 'Sculptural metallic airless pump in directional light' },
      { id: 'v-m2', src: '/images/vyraa/studio/vyraa-product-01.jpg', caption: '1:1 square pump dispenser macro' },
      { id: 'v-m3', src: '/images/vyraa/meta/meta-still-01.jpg', caption: 'Fast absorbing micro-droplet texture' },
    ],
    instagram: [
      { id: 'v-i1', src: '/images/vyraa/meta/meta-still-02.jpg', caption: 'Executive desk and laptop placement aesthetic' },
      { id: 'v-i2', src: '/images/vyraa/meta/meta-still-03.jpg', caption: 'Clean collar fabric test detail' },
    ],
    tiktok: [
      { id: 'v-t1', src: '/images/vyraa/meta/meta-still-01.jpg', caption: 'Tech-neck posture comparison in vertical video' },
      { id: 'v-t2', src: '/images/vyraa/studio/vyraa-product-01.jpg', caption: 'Fast upward massage technique demo' },
    ],
    website: [
      { id: 'v-w1', src: '/images/vyraa/studio/vyraa-hero-01.jpg', caption: 'PDP main visual' },
      { id: 'v-w2', src: '/images/vyraa/meta/meta-still-02.jpg', caption: 'Peptide tension formulation card' },
    ],
  },
  totalAssetsCount: 17,
  strategySummary: {
    whyItWorks:
      'It creates immediate category awareness around a problem consumers recognize but haven’t solved. By pairing the "tech-neck" concept with reassurance that clothes won’t get stained, it turns a skeptical viewer into an active buyer.',
    angleLogic:
      'We run the digital posture hook to capture screen workers on Meta and LinkedIn feeds, while retargeting ads focus on clean-collar evidence and peptide firming.',
    projectedOutcomes: {
      targetRoas: '3.7x – 4.4x target return on ad spend',
      thumbStopRate: '40% – 48% projected 3-second hook rate',
      cpaImpact: 'Estimated 20% – 30% lower customer acquisition cost',
      notes:
        'These figures are strategic benchmarks and forecasts for ad spend testing, not historical client records.',
    },
  },
  nextCampaign: {
    name: 'Nuécera',
    href: '/work/nuecera',
  },
}

export default function VyraaCaseStudyPage() {
  return <CaseStudyTemplate data={VYRAA_DATA} />
}
