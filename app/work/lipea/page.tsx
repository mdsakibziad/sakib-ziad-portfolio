'use client'

import React from 'react'
import { CaseStudyTemplate, CaseStudyPageData } from '@/components/case-study-template'

const LIPEA_DATA: CaseStudyPageData = {
  campaignId: 'lipea',
  name: 'Lipéa',
  tag: 'Concept campaign',
  oneLiner: 'A lip serum with high shine and no sticky feel, proven on camera.',
  role: 'Strategy, hook writing, AI commercial direction',
  year: '2026',
  heroImage: '/images/lipea/editorial/lipea-photo-01.jpg',
  heroVideo: '/images/lipea/instagram/instagram-video-01.mp4',
  brief: {
    whatItIs:
      'A peptide-enriched glass lip serum that unites cellular barrier recovery with an ultra-reflective, non-sticky cushion glaze.',
    whoItIsFor:
      'Beauty lovers who want mirror-glaze shine without heavy glue tackiness, painful chemical stinging, or messy hair-in-lip friction.',
    whyItExists:
      'Standard cosmetic glosses rely on thick polymer glues that dry out lips, while basic balms lack visual shine. Lipéa delivers clinical ceramide and peptide repair inside a high-shine cushion.',
  },
  challenge:
    'Lip gloss is plagued by one fatal consumer objection: stickiness. Customers assume that any product claiming glass shine will inevitably trap their hair in the wind or feel uncomfortably heavy.',
  idea: {
    coreHook: 'Mirror shine. Zero sticky glue trap.',
    explanation:
      'We validate the texture directly on camera through physical tests: hair strands glide effortlessly across lips without sticking, while macro lighting highlights the smoothing of vertical lip creases.',
  },
  hooks: [
    {
      id: 1,
      hookLine: 'Mirror shine. Zero sticky glue trap.',
      angleExplanation:
        'Addresses the core objection directly by proving reflective shine without tacky polymer adhesion.',
      videoSrc: '/images/lipea/instagram/instagram-video-01.mp4',
      posterSrc: '/images/lipea/editorial/lipea-photo-01.jpg',
    },
    {
      id: 2,
      hookLine: 'The windy day hair test: zero stick.',
      angleExplanation:
        'Physical demonstration on camera showing loose hair strands sliding cleanly off glossy lips.',
      videoSrc: '/images/lipea/instagram/instagram-video-01.mp4',
      posterSrc: '/images/lipea/instagram/instagram-still-01.jpg',
    },
    {
      id: 3,
      hookLine: 'Stop burning your lips with irritating chemical plumpers.',
      angleExplanation:
        'Contrarian angle that contrasts painful chemical irritants against soothing peptide barrier volume.',
      videoSrc: '/images/lipea/instagram/instagram-video-01.mp4',
      posterSrc: '/images/lipea/instagram/instagram-still-02.jpg',
    },
    {
      id: 4,
      hookLine: '8 hours of continuous lip barrier recovery.',
      angleExplanation:
        'Positions the serum as active overnight care and daily hydration rather than just makeup.',
      videoSrc: '/images/lipea/instagram/instagram-video-01.mp4',
      posterSrc: '/images/lipea/instagram/instagram-still-03.jpg',
    },
    {
      id: 5,
      hookLine: 'From dry lip lines to smooth cushion glaze in one swipe.',
      angleExplanation:
        'Macro applicator swipe visual demonstrating immediate vertical crease-filling reflection.',
      videoSrc: '/images/lipea/instagram/instagram-video-01.mp4',
      posterSrc: '/images/lipea/meta/meta-still-01.jpg',
    },
  ],
  platformAssets: {
    meta: [
      { id: 'l-m1', src: '/images/lipea/editorial/lipea-photo-01.jpg', caption: 'Editorial glass vial with soft rose gold reflection' },
      { id: 'l-m2', src: '/images/lipea/meta/meta-still-01.jpg', caption: '1:1 feed applicator droplet cushion' },
      { id: 'l-m3', src: '/images/lipea/meta/meta-still-02.jpg', caption: 'Mirror reflection on clean lips' },
    ],
    instagram: [
      { id: 'l-i1', src: '/images/lipea/instagram/instagram-still-01.jpg', caption: 'Daylight handbag travel aesthetic' },
      { id: 'l-i2', src: '/images/lipea/instagram/instagram-still-02.jpg', caption: 'Macro glass caustics on transparent formula' },
      { id: 'l-i3', src: '/images/lipea/instagram/instagram-still-03.jpg', caption: '9:16 vertical single-swipe demonstration' },
    ],
    tiktok: [
      { id: 'l-t1', src: '/images/lipea/instagram/instagram-story-01.jpg', caption: 'Tactile hair drag test in vertical video' },
      { id: 'l-t2', src: '/images/lipea/instagram/instagram-story-02.jpg', caption: 'Peptide barrier ingredient breakdown' },
    ],
    website: [
      { id: 'l-w1', src: '/images/lipea/editorial/lipea-photo-01.jpg', caption: 'PDP above-the-fold hero image' },
      { id: 'l-w2', src: '/images/lipea/meta/meta-still-03.jpg', caption: 'Shade transparency and non-greasy cushion proof' },
    ],
  },
  totalAssetsCount: 27,
  strategySummary: {
    whyItWorks:
      'By anticipating the consumer’s biggest objection—hair sticking to gloss—and answering it physically within the first 3 seconds, the creative eliminates buying hesitation before checkout.',
    angleLogic:
      'We combine top-of-funnel virality (The Non-Sticky Hair Test) with deep product education (Peptide Barrier Recovery) to convert casual TikTok and Instagram browsers.',
    projectedOutcomes: {
      targetRoas: '3.8x – 4.6x target return on ad spend',
      thumbStopRate: '46% – 54% projected 3-second hook rate',
      cpaImpact: 'Estimated 22% – 32% lower customer acquisition cost',
      notes:
        'These figures are strategic benchmarks and forecasts for ad spend testing, not historical client records.',
    },
  },
  nextCampaign: {
    name: 'Vyraa',
    href: '/work/vyraa',
  },
}

export default function LipeaCaseStudyPage() {
  return <CaseStudyTemplate data={LIPEA_DATA} />
}
