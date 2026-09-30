'use client'

import React from 'react'
import { CaseStudyTemplate, CaseStudyData } from '@/components/case-study-template'

const VYRAA_DATA: CaseStudyData = {
  campaignId: 'vyraa',
  caseNumber: '05',
  name: 'VYRAA',
  tagline: 'Your $100 face cream stops working at your jawline.',
  skuFocus: '5-Peptide Neck Complex · 50ml / 1.7 FL.OZ.',
  deliverablesCount: '17 Master Production Assets',
  channelsText: 'Studio · Meta · Instagram',
  heroImage: '/images/vyraa/studio/vyraa-hero-01.jpg',
  heroCaption: 'Frosted emerald glass jar crowned with brushed gunmetal cap on slate rock.',
  heroBadge: 'Flagship Spec Commercial 05 · Witlyn Standard',
  brief: {
    whatItIs:
      'A targeted 50ml (1.7 FL.OZ.) structural dermal firming and lifting cream specifically formulated for the delicate neck, throat, and jawline contour. It tightens loose crepey tissue, reinforces elasticity, and smooths deep horizontal creases.',
    whyItExists:
      'Looking down at mobile phones and laptop displays for hours each day generates repetitive horizontal folds known as "Tech-Neck". Because neck skin is 3x thinner than facial tissue and possesses far fewer sebaceous glands, it degrades collagen twice as fast. Standard $100 face creams fail on the neck—their thick lipids merely slide, clog pores, cause downward gravitational drag, and stain collared shirts.',
    whyDifferent: [
      {
        title: '5-Peptide Structural Matrix',
        desc: 'Bypasses heavy occlusive oils with a specialized signal-peptide sequence engineered to penetrate thin cervical dermal layers and contract horizontal banding.',
      },
      {
        title: 'Collar-Safe Weightless Tension',
        desc: 'Dispenses as a dense whipped peptide balm that absorbs within seconds into a firming matte finish, leaving zero greasy residue or oil rings on clothing collars.',
      },
    ],
    targetAudience:
      'Digital professionals and screen workers (ages 25–45) noticing premature horizontal tech-neck banding, sagging jawline definition, or dry crepey neck skin.',
    packagingSpecs: {
      container:
        'Heavy cylindrical frosted deep emerald-green glass jar paired with a brushed gunmetal silver cap featuring a precision horizontal groove.',
      labelTypography:
        'VYRAA | 5-PEPTIDE | NECK COMPLEX | 50ml / 1.7 FL.OZ. (rendered in crisp architectural silkscreen)',
    },
    marketAngles: [
      {
        title: 'The Tech-Neck Screen Reality',
        desc: '"Why does your neck look 5 years older than your face?" — addressing the visual aging caused by repetitive downward screen posture.',
      },
      {
        title: 'Face Cream Inefficiency Hook',
        desc: '"Your $100 face cream stops working the moment it touches your neck" — educating on why facial moisturizers lack the tensile strength for neck dermis.',
      },
    ],
  },
  strategy: {
    hooks: [
      {
        id: 1,
        angle: 'The Digital Posture Aging Hook',
        channelFit: 'Meta Feed & Video Reels',
        quote: 'Why does your neck look 5 years older than your face?',
        whyChosen:
          'Consumers spend 8+ hours looking down at smartphones and laptop screens without realizing downward compression folds neck skin into permanent horizontal bands. Confronting this discrepancy creates an immediate self-diagnosis moment that halts passive browsing.',
        rationale:
          'Directly confronts daily screen time habits by showing how downward neck angles fold thin skin into permanent horizontal bands, contrasting facial care with neglected cervical tissue.',
        projectedRoas: '4.3x – 4.9x (Prospecting)',
        thumbStopRate: '46%+ (First 3 Seconds)',
        cpaImpact: '-36% Blended Acquisition Cost',
        commercialBenefit:
          'Instantly creates a new self-care category for tech workers, unlocking net-new customer acquisition outside general skincare.',
        expectedOutcome:
          'Unlocks a completely separate customer acquisition funnel targeting corporate and remote professionals, achieving profitable first-order ROAS at high price points ($85+).',
      },
      {
        id: 2,
        angle: 'Contrarian Face Cream Failure Truth',
        channelFit: 'Meta 4:5 Feed Stills & Stories',
        quote: 'Your $100 face cream stops working the moment it touches your neck.',
        whyChosen:
          'Most buyers assume dragging expensive facial moisturizer down to their throat is sufficient. By challenging this assumption on structural dermal biology (neck dermis has 30% fewer sebaceous glands and 50% less collagen support), we justify an entirely new dedicated product purchase.',
        rationale:
          'Calls out the habit of dragging heavy facial oils down onto the neck, proving that thinner neck tissue requires peptides over heavy grease.',
        projectedRoas: '4.1x – 4.7x (Middle-of-Funnel)',
        thumbStopRate: '42%+ (Sponsored Stories)',
        cpaImpact: '-32% Retargeting CPA',
        commercialBenefit:
          'Disrupts common user habits to justify high-ticket specialized price points ($85+), increasing gross margins.',
        expectedOutcome:
          'Transforms a skepticism hurdle into an educational conversion trigger, driving a 28% increase in average order value via routine-stacking bundles.',
      },
      {
        id: 3,
        angle: 'Clean Collar Performance Proof',
        channelFit: 'Paid Carousels & Macro Demos',
        quote: 'Cellular tension. Zero collar grease.',
        whyChosen:
          'The number one reason affluent buyers abandon neck creams is oily collar transfer ruining expensive silk and white cotton clothing. Demonstrating a clean white collar pressed firmly against skin removes the final hesitation before purchase.',
        rationale:
          'Visually demonstrates a crisp white dress shirt buttoned directly against freshly moisturized neck skin with zero transfer or yellow staining.',
        projectedRoas: '4.0x – 4.6x (Bottom-of-Funnel)',
        thumbStopRate: '44%+ (Social Proof Demo)',
        cpaImpact: '-29% Cart Abandonment CPA',
        commercialBenefit:
          'Addresses the primary reason customers abandon neck treatments, converting professional daytime buyers and reducing returns to under 1.2%.',
        expectedOutcome:
          'Eliminates post-purchase remorse and product return risk, driving an exceptional 54% 90-day repeat purchase rate.',
      },
    ],
  },
  tabs: [
    { id: 'all', label: 'All Assets' },
    { id: 'studio', label: 'Studio Hero' },
    { id: 'meta', label: 'Meta Ads' },
    { id: 'instagram', label: 'Instagram Suite' },
  ],
  prevLink: {
    href: '/work/aura-purify',
    label: '04 AURA PURIFY Cleanser',
  },
  nextLink: {
    href: '/work/solae',
    label: '01 SOLAÉ Sun Serum',
  },
  assets: [
    // Motion & Performance Video Assets (5) — Videos First!
    {
      id: 'vyraa-meta-v01',
      title: 'Meta Motion Reel: Tech-Neck Lift',
      platform: 'meta',
      type: 'video',
      src: '/images/vyraa/meta/meta-video-01.mp4',
      formatLabel: '9:16 Vertical Video',
      aspectRatio: 'aspect-[9/16]',
      caption: 'Dynamic motion demonstration highlighting rapid skin tightening and firming.',
    },
    {
      id: 'vyraa-meta-v02',
      title: 'Meta Motion Reel: Cellular Absorption',
      platform: 'meta',
      type: 'video',
      src: '/images/vyraa/meta/meta-video-02.mp4',
      formatLabel: '9:16 Vertical Video',
      aspectRatio: 'aspect-[9/16]',
      caption: 'Macro video showing peptide balm absorbing instantly into thin cervical skin.',
    },
    {
      id: 'vyraa-meta-v03',
      title: 'Meta Motion Reel: Shirt Collar Test',
      platform: 'meta',
      type: 'video',
      src: '/images/vyraa/meta/meta-video-03.mp4',
      formatLabel: '9:16 Vertical Video',
      aspectRatio: 'aspect-[9/16]',
      caption: 'Fabric contact test confirming zero oil transfer on white cotton dress shirts.',
    },
    {
      id: 'vyraa-ig-v01',
      title: 'Instagram Reel: Jawline Sculpting',
      platform: 'instagram',
      type: 'video',
      src: '/images/vyraa/instagram/instagram-video-01.mp4',
      formatLabel: '9:16 Vertical Reel',
      aspectRatio: 'aspect-[9/16]',
      caption: 'Upward lymphatic drainage massage routine sculpting the jawline and throat.',
    },
    {
      id: 'vyraa-ig-v02',
      title: 'Instagram Reel: Crease Smoothing Test',
      platform: 'instagram',
      type: 'video',
      src: '/images/vyraa/instagram/instagram-video-02.mp4',
      formatLabel: '9:16 Vertical Reel',
      aspectRatio: 'aspect-[9/16]',
      caption: 'Visual timeline demonstrating visible smoothing of horizontal tech-neck folds.',
    },

    // Studio Hero Asset (1)
    {
      id: 'vyraa-std-01',
      title: 'Emerald Jar Studio Master',
      platform: 'studio',
      type: 'image',
      src: '/images/vyraa/studio/vyraa-hero-01.jpg',
      formatLabel: 'Master Studio Capture · 4:5',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Frosted emerald-green glass jar with brushed gunmetal cap on dark textured slate.',
    },

    // Meta Platform Stills (6)
    {
      id: 'vyraa-meta-s01',
      title: 'Meta Tech-Neck Angle Still 01',
      platform: 'meta',
      type: 'image',
      src: '/images/vyraa/meta/meta-still-01.jpg',
      formatLabel: '1:1 Square Feed',
      aspectRatio: 'aspect-square',
      caption: 'Centered hero composition framed for high direct-response click rates on Meta.',
    },
    {
      id: 'vyraa-meta-s11',
      title: 'Meta Variation Angle Still 11',
      platform: 'meta',
      type: 'image',
      src: '/images/vyraa/meta/meta-still-11.jpg',
      formatLabel: '1:1 Square Feed',
      aspectRatio: 'aspect-square',
      caption: 'High-contrast lighting showcasing the tactile frosted emerald texture.',
    },
    {
      id: 'vyraa-meta-s02',
      title: 'Meta Neck Firming Still 02',
      platform: 'meta',
      type: 'image',
      src: '/images/vyraa/meta/meta-still-02.jpg',
      formatLabel: '4:5 Feed Portrait',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Portrait angle highlighting upward massage strokes along the jawline contour.',
    },
    {
      id: 'vyraa-meta-s22',
      title: 'Meta Variation Still 22',
      platform: 'meta',
      type: 'image',
      src: '/images/vyraa/meta/meta-still-22.jpg',
      formatLabel: '4:5 Feed Portrait',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Macro focus on the whipped peptide matrix holding firm tensile structure.',
    },
    {
      id: 'vyraa-meta-s03',
      title: 'Meta Zero Collar Grease Still 03',
      platform: 'meta',
      type: 'image',
      src: '/images/vyraa/meta/meta-still-03.jpg',
      formatLabel: '4:5 Feed Portrait',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Demonstration proving immediate absorption with zero residue on clothing collars.',
    },
    {
      id: 'vyraa-meta-s33',
      title: 'Meta Retargeting Still 33',
      platform: 'meta',
      type: 'image',
      src: '/images/vyraa/meta/meta-still-33.jpg',
      formatLabel: '4:5 Feed Portrait',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Clean architectural framing designed for middle-of-funnel retargeting ads.',
    },

    // Instagram Suite Stills & Stories (5)
    {
      id: 'vyraa-ig-s01',
      title: 'Instagram Editorial Jar Still 01',
      platform: 'instagram',
      type: 'image',
      src: '/images/vyraa/instagram/instagram-still-01.jpg',
      formatLabel: '4:5 Feed Portrait',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Deep green emerald glass styled on natural slate for luxury feed aesthetics.',
    },
    {
      id: 'vyraa-ig-s02',
      title: 'Instagram Texture Swatch Still 02',
      platform: 'instagram',
      type: 'image',
      src: '/images/vyraa/instagram/instagram-still-02.jpg',
      formatLabel: '4:5 Feed Portrait',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Tactile scoop of whipped peptide complex displaying dense elastic cushion.',
    },
    {
      id: 'vyraa-ig-s03',
      title: 'Instagram Vanity Still 03',
      platform: 'instagram',
      type: 'image',
      src: '/images/vyraa/instagram/instagram-still-03.jpg',
      formatLabel: '4:5 Feed Portrait',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Minimalist bedside staging representing an evening neck sculpting ritual.',
    },
    {
      id: 'vyraa-ig-story01',
      title: 'Instagram Story Creative 01',
      platform: 'instagram',
      type: 'image',
      src: '/images/vyraa/instagram/instagram-story-01.jpg',
      formatLabel: '9:16 Vertical Story',
      aspectRatio: 'aspect-[9/16]',
      caption: 'Vertical story ad addressing screen neck posture with direct purchase link.',
    },
    {
      id: 'vyraa-ig-story02',
      title: 'Instagram Story Creative 02',
      platform: 'instagram',
      type: 'image',
      src: '/images/vyraa/instagram/instagram-story-02.jpg',
      formatLabel: '9:16 Vertical Story',
      aspectRatio: 'aspect-[9/16]',
      caption: 'Ingredient callout card highlighting the 5-peptide structural matrix.',
    },
  ],
}

export default function VyraaPage() {
  return <CaseStudyTemplate data={VYRAA_DATA} />
}
