import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'Selected Commercial Campaigns & Systems | Sakib Ziad',
  description:
    'Selected case studies across luxury beauty, skincare, and cosmetics. Creative direction, high-velocity commercial systems, and direct-response architectures for Solaé, Vyraa, Lipéa, and Nuécera.',
  alternates: {
    canonical: 'https://sakibziad.my/work',
  },
  openGraph: {
    title: 'Selected Commercial Campaigns & Systems | Sakib Ziad',
    description:
      'Selected case studies across luxury beauty, skincare, and cosmetics. High-performance creative systems and commercial campaign direction.',
    url: 'https://sakibziad.my/work',
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Selected Commercial Campaigns & Creative Systems',
    description:
      'Archive of luxury beauty and skincare campaign systems and commercial directing architectures by Sakib Ziad.',
    url: '/work',
    hasPart: [
      {
        title: 'Solaé Skincare Campaign System',
        description: 'Commercial skincare campaign direction and 29-asset visual world from concept to launch.',
      },
      {
        title: 'Vyraa Cosmetics Repositioning',
        description: 'Brand strategy and creative direction repositioning a premium cosmetics brand.',
      },
      {
        title: 'Lipéa Content Engine Build',
        description: 'Scalable commercial content system and multi-channel asset generation pipeline.',
      },
      {
        title: 'Nuécera Fragrance Visual World',
        description: 'High-concept olfactory visual universe built with custom studio cinematography.',
      },
    ],
  })

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
  ])

  return (
    <>
      <StructuredData data={[collectionSchema, breadcrumbs]} />
      {children}
    </>
  )
}
