import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vyraa — Concept Campaign | Sakib Ziad',
  description:
    'Concept campaign for Vyraa 5-Peptide Neck Complex: creative strategy, hook videos, and platform ad assets directed by Sakib Ziad.',
  openGraph: {
    title: 'Vyraa — Concept Campaign | Sakib Ziad',
    description:
      'Concept campaign for Vyraa 5-Peptide Neck Complex: creative strategy, hook videos, and platform ad assets.',
    images: [
      {
        url: '/images/vyraa/studio/vyraa-hero-01.jpg',
        width: 1200,
        height: 1200,
        alt: 'Vyraa 5-Peptide Neck Complex Still',
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
