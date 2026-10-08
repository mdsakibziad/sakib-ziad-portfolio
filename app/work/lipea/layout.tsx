import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lipéa — Concept Campaign | Sakib Ziad',
  description:
    'Concept campaign for Lipéa Peptide Glass Lip Serum: creative strategy, hook videos, and platform ad assets directed by Sakib Ziad.',
  openGraph: {
    title: 'Lipéa — Concept Campaign | Sakib Ziad',
    description:
      'Concept campaign for Lipéa Peptide Glass Lip Serum: creative strategy, hook videos, and platform ad assets.',
    images: [
      {
        url: '/images/lipea/editorial/lipea-photo-01.jpg',
        width: 1200,
        height: 1200,
        alt: 'Lipéa Peptide Glass Lip Serum Still',
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
