import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nuécera — Concept Campaign | Sakib Ziad',
  description:
    'Concept campaign for Nuécera Botanical Moisturizing Cream: creative strategy, hook videos, and platform ad assets directed by Sakib Ziad.',
  openGraph: {
    title: 'Nuécera — Concept Campaign | Sakib Ziad',
    description:
      'Concept campaign for Nuécera Botanical Moisturizing Cream: creative strategy, hook videos, and platform ad assets.',
    images: [
      {
        url: '/images/nuecera/meta/meta-product-02.jpg',
        width: 1200,
        height: 1200,
        alt: 'Nuécera Moisturizing Cream Still',
      },
    ],
  },
}

export default function NueceraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
