import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AURA PURIFY — Barrier Gel-to-Milk Cleanser | Sakib Ziad',
  description:
    'Complete paid-social campaign suite and creative asset vault for AURA PURIFY Barrier Gel-to-Milk Cleanser (200 ml / 6.7 fl. oz.). 27 curated stills, motion reels, and studio master captures across Studio, Meta, and Instagram.',
  openGraph: {
    title: 'AURA PURIFY — AI-Native Campaign System | Sakib Ziad',
    description:
      'Explore the 27-asset campaign vault engineered around AURA PURIFY Barrier Gel-to-Milk Cleanser.',
    images: [
      {
        url: '/images/aura-purify/studio/aura-product-01.jpg',
        width: 1200,
        height: 1200,
        alt: 'AURA PURIFY Barrier Cleanser Master Still',
      },
    ],
  },
}

export default function AuraPurifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
