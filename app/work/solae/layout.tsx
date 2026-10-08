import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SOLAÉ — AIRVEIL Invisible Sun Serum | Sakib Ziad',
  description:
    'Complete paid-social campaign suite and creative asset vault for SOLAÉ AIRVEIL Invisible Sun Serum (SPF50+ PA++++). 29 curated stills and motion reels across Meta, Instagram, and Editorial.',
  openGraph: {
    title: 'SOLAÉ — AI-Native Campaign System | Sakib Ziad',
    description:
      'Explore the 29-asset campaign vault engineered around SOLAÉ AIRVEIL Invisible Sun Serum.',
    images: [
      {
        url: '/images/solae/editorial/solae-photo-01.jpg',
        width: 1200,
        height: 1200,
        alt: 'SOLAÉ Invisible Sun Serum Master Still',
      },
    ],
  },
}

export default function SolaeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
