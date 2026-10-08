'use client'

import React from 'react'
import { CaseStudyTemplate, CaseStudyPageData } from '@/components/case-study-template'

const SOLAE_DATA: CaseStudyPageData = {
  campaignId: 'solae',
  name: 'Solaé',
  tag: 'Concept campaign',
  oneLiner: 'Daily SPF made to feel like part of a morning ritual.',
  role: 'Strategy, hook writing, AI commercial direction',
  year: '2026',
  heroImage: '/images/solae/editorial/solae-photo-01.jpg',
  heroVideo: '/images/solae/instagram/instagram-video-01.mp4',
  brief: {
    whatItIs:
      'An SPF50+ PA++++ invisible hydrating sun serum formulated with hyaluronic acid and niacinamide, designed to disappear into skin with zero white cast.',
    whoItIsFor:
      'Daily skincare users and makeup wearers across diverse complexions who dread chalky residues, clogged pores, and greasy afternoon shine.',
    whyItExists:
      'Sunscreen is universally recommended by dermatologists but routinely skipped because traditional formulas feel thick, smell medicinal, and pill under cosmetics.',
  },
  challenge:
    'Sun protection is widely treated as an obligatory chore. Consumers are tired of white sunscreen casts and heavy chemical odors, making them skeptical of claims promising truly weightless wear.',
  idea: {
    coreHook: 'Sunscreen shouldn’t look like white paint.',
    explanation:
      'We contrast standard opaque white sun creams against Solaé’s 100% clear water-veil droplet. Within 3 seconds on camera, the formula absorbs completely into skin, leaving behind a natural skin finish without grease or chalk.',
  },
  hooks: [
    {
      id: 1,
      hookLine: 'Sunscreen shouldn’t look like white paint.',
      angleExplanation:
        'Contrarian visual comparing thick white paste to an instantaneous transparent water-veil droplet.',
      videoSrc: '/images/solae/instagram/instagram-video-01.mp4',
      posterSrc: '/images/solae/editorial/solae-photo-01.jpg',
    },
    {
      id: 2,
      hookLine: 'Zero white cast. Zero makeup pilling.',
      angleExplanation:
        'Targets beauty lovers who need seamless cosmetic prep without foundation separation.',
      videoSrc: '/images/solae/instagram/instagram-video-01.mp4',
      posterSrc: '/images/solae/meta/meta-still-01.jpg',
    },
    {
      id: 3,
      hookLine: 'Water-veil absorption in 3 seconds.',
      angleExplanation:
        'Proves rapid skin penetration on camera without leaving an oily reflective film.',
      videoSrc: '/images/solae/instagram/instagram-video-01.mp4',
      posterSrc: '/images/solae/instagram/instagram-still-01.jpg',
    },
    {
      id: 4,
      hookLine: 'Your daily SPF should feel like a morning serum.',
      angleExplanation:
        'Elevates sun care into an enjoyable, hydrating step in the customer’s morning ritual.',
      videoSrc: '/images/solae/instagram/instagram-video-01.mp4',
      posterSrc: '/images/solae/editorial/solae-photo-02.jpg',
    },
    {
      id: 5,
      hookLine: 'The humid commute test: no greasy forehead.',
      angleExplanation:
        'Validates breathability and sweat-resistant comfort in hot, muggy weather.',
      videoSrc: '/images/solae/instagram/instagram-video-01.mp4',
      posterSrc: '/images/solae/instagram/instagram-still-03.jpg',
    },
  ],
  platformAssets: {
    meta: [
      { id: 's-m1', src: '/images/solae/editorial/solae-photo-01.jpg', caption: 'Editorial water-veil dropper capture' },
      { id: 's-m2', src: '/images/solae/meta/meta-still-01.jpg', caption: '1:1 feed clear droplet skin swatch' },
      { id: 's-m3', src: '/images/solae/meta/meta-still-02.jpg', caption: 'Zero-cast comparison on diverse skin' },
    ],
    instagram: [
      { id: 's-i1', src: '/images/solae/instagram/instagram-still-01.jpg', caption: 'Daylight morning mirror aesthetic' },
      { id: 's-i2', src: '/images/solae/instagram/instagram-still-02.jpg', caption: 'Glass dropper caustics under sunlight' },
      { id: 's-i3', src: '/images/solae/instagram/instagram-still-03.jpg', caption: '9:16 vertical application swatch' },
    ],
    tiktok: [
      { id: 's-t1', src: '/images/solae/instagram/instagram-story-01.jpg', caption: '3-second absorption challenge' },
      { id: 's-t2', src: '/images/solae/editorial/solae-photo-02.jpg', caption: 'Under-makeup foundation test' },
    ],
    website: [
      { id: 's-w1', src: '/images/solae/editorial/solae-photo-01.jpg', caption: 'E-commerce hero product presentation' },
      { id: 's-w2', src: '/images/solae/meta/meta-still-03.jpg', caption: 'Clinical SPF50+ PA++++ certification badge' },
    ],
  },
  totalAssetsCount: 29,
  strategySummary: {
    whyItWorks:
      'It instantly arrests the scroll by calling out the single universal irritation with sunscreen: the chalky white mask. By replacing that friction with clear water droplets and morning light, it positions the product as an upgrade to everyday living.',
    angleLogic:
      'Top-of-funnel ads challenge white sunscreen formulas directly, while retargeting variants focus on cosmetic compatibility under foundation and sweat resistance.',
    projectedOutcomes: {
      targetRoas: '4.0x – 4.8x target return on ad spend',
      thumbStopRate: '45% – 52% projected 3-second hook rate',
      cpaImpact: 'Estimated 25% – 38% lower customer acquisition cost',
      notes:
        'These figures are strategic benchmarks and forecasts for ad spend testing, not historical client records.',
    },
  },
  nextCampaign: {
    name: 'Lipéa',
    href: '/work/lipea',
  },
}

export default function SolaeCaseStudyPage() {
  return <CaseStudyTemplate data={SOLAE_DATA} />
}
