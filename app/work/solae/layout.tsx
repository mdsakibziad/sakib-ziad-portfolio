import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solaé — Concept Campaign | Sakib Ziad',
  description:
    'Concept campaign for Solaé AIRVEIL Invisible Sun Serum: creative strategy, hook videos, and platform ad assets directed by Sakib Ziad.',
  openGraph: {
    title: 'Solaé — Concept Campaign | Sakib Ziad',
    description:
      'Concept campaign for Solaé AIRVEIL Invisible Sun Serum: creative strategy, hook videos, and platform ad assets.',
    images: [
      {
        url: '/images/solae/editorial/solae-photo-01.jpg',
        width: 1200,
        height: 1200,
        alt: 'Solaé Invisible Sun Serum Still',
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
