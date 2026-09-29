import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NUÉCERA — Visual Identity & Omnichannel Creative Vault | Sakib Ziad',
  description:
    'Complete omnichannel campaign suite and generative asset vault for Nuécera Moisturizing Cream. 35 curated stills, videos, and multi-format creatives engineered across Meta, Instagram, TikTok, and Web.',
  openGraph: {
    title: 'NUÉCERA — AI-Native Campaign System | Sakib Ziad',
    description:
      'Explore the 35-asset campaign vault engineered around Nuécera Botanical Moisturizing Cream.',
    images: [
      {
        url: '/images/nuecera/meta/meta-product-02.jpg',
        width: 1200,
        height: 1200,
        alt: 'NUÉCERA Moisturizing Cream Master Still',
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
