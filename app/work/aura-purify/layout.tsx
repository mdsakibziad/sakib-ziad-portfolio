import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aura Purify — Concept Campaign | Sakib Ziad',
  description:
    'Concept campaign for Aura Purify Barrier Gel-to-Milk Cleanser: creative strategy, hook videos, and platform ad assets directed by Sakib Ziad.',
  openGraph: {
    title: 'Aura Purify — Concept Campaign | Sakib Ziad',
    description:
      'Concept campaign for Aura Purify Barrier Gel-to-Milk Cleanser: creative strategy, hook videos, and platform ad assets.',
    images: [
      {
        url: '/images/aura-purify/studio/aura-product-01.jpg',
        width: 1200,
        height: 1200,
        alt: 'Aura Purify Barrier Cleanser Still',
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
