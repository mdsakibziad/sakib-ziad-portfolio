import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work | Sakib Ziad — AI Creative Strategist & AI Commercial Director',
  description:
    'Five concept campaigns for beauty and skincare brands: strategy, hook videos, and platform ad assets for Nuécera, Aura Purify, Solaé, Lipéa, and Vyraa.',
  alternates: {
    canonical: 'https://sakibziad.my/work',
  },
  openGraph: {
    title: 'Work | Sakib Ziad — AI Creative Strategist & AI Commercial Director',
    description:
      'Five concept campaigns for beauty and skincare brands: strategy, hook videos, and platform ad assets.',
    url: 'https://sakibziad.my/work',
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
