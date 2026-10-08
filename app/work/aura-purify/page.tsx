'use client'

import React from 'react'
import { CaseStudyTemplate, CaseStudyPageData } from '@/components/case-study-template'

const AURA_PURIFY_DATA: CaseStudyPageData = {
  campaignId: 'aura-purify',
  name: 'Aura Purify',
  tag: 'Concept campaign',
  oneLiner: 'A cleanser that turns from gel to milk, shown in one second.',
  role: 'Strategy, hook writing, AI commercial direction',
  year: '2026',
  heroImage: '/images/aura-purify/studio/aura-product-01.jpg',
  heroVideo: '/images/aura-purify/instagram/instagram-video-01.mp4',
  brief: {
    whatItIs:
      'A barrier-respecting phase-transforming cleanser that transitions from a rich translucent amber gel into a lightweight, soothing oat milk the moment water is introduced.',
    whoItIsFor:
      'Individuals who wear waterproof makeup or water-resistant mineral sunscreen and hate the stripped, tight sensation caused by harsh foaming washes.',
    whyItExists:
      'Traditional double-cleansing routines require two separate messy steps and frequently over-strip the skin barrier. Aura Purify combines oil-balm dissolving power with water-rinse ease in one formula.',
  },
  challenge:
    'Cleansers are viewed as commodity basics. Consumers are skeptical that a gentle formula can break down long-wear foundation and waterproof mascara without aggressive rubbing or drying alcohol.',
  idea: {
    coreHook: 'Gel to milk in 1 second. Never strip. Just clean.',
    explanation:
      'Instead of generic bathroom lifestyle b-roll, the creative anchors on an undeniable physical proof: an optical phase shift where golden amber gel blooms into velvety white milk in under one second, lifting pigments with zero drag.',
  },
  hooks: [
    {
      id: 1,
      hookLine: 'Gel to milk in 1 second. Never strip.',
      angleExplanation:
        'Demonstrates instantaneous optical formula transformation from balm-like gel to soothing milk.',
      videoSrc: '/images/aura-purify/instagram/instagram-video-01.mp4',
      posterSrc: '/images/aura-purify/studio/aura-product-01.jpg',
    },
    {
      id: 2,
      hookLine: 'Stop double cleansing with two separate products.',
      angleExplanation:
        'Contrarian angle that saves money and bathroom counter clutter by consolidating makeup removal and skin wash.',
      videoSrc: '/images/aura-purify/instagram/instagram-video-02.mp4',
      posterSrc: '/images/aura-purify/instagram/instagram-still-01.jpg',
    },
    {
      id: 3,
      hookLine: 'Waterproof mascara dissolved with zero stinging.',
      angleExplanation:
        'Visual demonstration of pigment dissolution around delicate eye contour areas without redness.',
      videoSrc: '/images/aura-purify/instagram/instagram-video-03.mp4',
      posterSrc: '/images/aura-purify/instagram/instagram-still-02.jpg',
    },
    {
      id: 4,
      hookLine: 'The post-wash towel test: zero tight skin.',
      angleExplanation:
        'Validates barrier hydration immediately after patting face dry with a clean towel.',
      videoSrc: '/images/aura-purify/instagram/instagram-video-04.mp4',
      posterSrc: '/images/aura-purify/instagram/instagram-still-03.jpg',
    },
    {
      id: 5,
      hookLine: 'From golden honey to silky oat milk.',
      angleExplanation:
        'Sensory macro visual focusing on clean ingredients, water droplets and emulsifying texture.',
      videoSrc: '/images/aura-purify/instagram/instagram-video-01.mp4',
      posterSrc: '/images/aura-purify/meta/meta-still-01.jpg',
    },
  ],
  platformAssets: {
    meta: [
      { id: 'a-m1', src: '/images/aura-purify/studio/aura-product-01.jpg', caption: 'Studio master bottle in directional spotlight' },
      { id: 'a-m2', src: '/images/aura-purify/meta/meta-still-01.jpg', caption: '1:1 square gel droplet texture' },
      { id: 'a-m3', src: '/images/aura-purify/meta/meta-still-02.jpg', caption: 'Phase shift water bloom moment' },
    ],
    instagram: [
      { id: 'a-i1', src: '/images/aura-purify/instagram/instagram-still-01.jpg', caption: '9:16 vertical bathroom aesthetic capture' },
      { id: 'a-i2', src: '/images/aura-purify/instagram/instagram-still-02.jpg', caption: 'Macro water droplet caustics' },
      { id: 'a-i3', src: '/images/aura-purify/instagram/instagram-still-03.jpg', caption: 'Minimalist sink shelf placement' },
    ],
    tiktok: [
      { id: 'a-t1', src: '/images/aura-purify/instagram/instagram-story-01.jpg', caption: 'Fast texture swipe on palm' },
      { id: 'a-t2', src: '/images/aura-purify/instagram/instagram-story-02.jpg', caption: 'Immediate waterproof makeup breakdown' },
    ],
    website: [
      { id: 'a-w1', src: '/images/aura-purify/studio/aura-product-01.jpg', caption: 'PDP above-the-fold banner visual' },
      { id: 'a-w2', src: '/images/aura-purify/meta/meta-still-01-var.jpg', caption: 'Ingredient botanical callout' },
    ],
  },
  totalAssetsCount: 27,
  strategySummary: {
    whyItWorks:
      'It dismantles double-cleansing exhaustion by showing the phase shift happen on camera. Viewers instantly see the functional convenience of melting stubborn pigments followed by a clean, residue-free rinse.',
    angleLogic:
      'We test hook 1 (texture transformation) as the broad audience hook, and hook 2 & 3 (two-product replacement & eye makeup removal) to capture specific pain-point audiences on Reels and TikTok.',
    projectedOutcomes: {
      targetRoas: '3.6x – 4.2x target return on ad spend',
      thumbStopRate: '42% – 48% projected 3-second hook rate',
      cpaImpact: 'Estimated 20% – 30% lower customer acquisition cost',
      notes:
        'These figures are strategic benchmarks and forecasts for ad spend testing, not historical client records.',
    },
  },
  nextCampaign: {
    name: 'Solaé',
    href: '/work/solae',
  },
}

export default function AuraPurifyCaseStudyPage() {
  return <CaseStudyTemplate data={AURA_PURIFY_DATA} />
}
