import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LIPÉA — Peptide Glass Lip Serum | Sakib Ziad',
  description:
    'Complete paid-social campaign suite and creative asset vault for LIPÉA Peptide Glass Lip Serum (12ml). 27 curated stills and motion reels across Meta, Instagram, and Editorial.',
  openGraph: {
    title: 'LIPÉA — AI-Native Campaign System | Sakib Ziad',
    description:
      'Explore the 27-asset campaign vault engineered around LIPÉA Peptide Glass Lip Serum.',
    images: [
      {
        url: '/images/lipea/editorial/lipea-photo-01.jpg',
        width: 1200,
        height: 1200,
        alt: 'LIPÉA Peptide Glass Lip Serum Master Still',
      },
    ],
  },
}

export default function LipeaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
