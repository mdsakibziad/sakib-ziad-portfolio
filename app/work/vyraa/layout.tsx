import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VYRAA — 5-Peptide Neck Complex | Sakib Ziad',
  description:
    'Complete paid-social campaign suite and creative asset vault for VYRAA 5-Peptide Neck Complex (50ml / 1.7 FL.OZ.). 17 curated stills and motion reels across Studio, Meta, and Instagram.',
  openGraph: {
    title: 'VYRAA — AI-Native Campaign System | Sakib Ziad',
    description:
      'Explore the 17-asset campaign vault engineered around VYRAA 5-Peptide Neck Complex.',
    images: [
      {
        url: '/images/vyraa/studio/vyraa-hero-01.jpg',
        width: 1200,
        height: 1200,
        alt: 'VYRAA 5-Peptide Neck Complex Master Still',
      },
    ],
  },
}

export default function VyraaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
