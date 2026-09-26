import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'Selected AI-Native Campaign Work | Sakib Ziad',
  description:
    'Selected case studies across luxury beauty, skincare, and cosmetics. Creative systems, campaign direction, and automation builds for Solaé, Vyraa, Lipéa, and Nuécera.',
  alternates: {
    canonical: 'https://sakibziad.my/work',
  },
  openGraph: {
    title: 'Selected AI-Native Campaign Work | Sakib Ziad',
    description:
      'Selected case studies across luxury beauty, skincare, and cosmetics. Creative systems and campaign direction built without stock imagery.',
    url: 'https://sakibziad.my/work',
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Selected AI-Native Campaign Work',
    description:
      'Archive of luxury beauty and skincare campaign systems and brand automation architectures directed by Sakib Ziad.',
    url: '/work',
    hasPart: [
      {
        title: 'Solaé Skincare Campaign System',
        description: 'AI-native skincare campaign direction and 48-asset visual world from concept to launch.',
      },
      {
        title: 'Vyraa Cosmetics Repositioning',
        description: 'Brand strategy and creative direction repositioning a premium cosmetics brand for the AI era.',
      },
      {
        title: 'Lipéa Content Engine Build',
        description: 'Scalable autonomous AI content engine and multi-channel asset generation pipeline.',
      },
      {
        title: 'Nuécera Fragrance Visual World',
        description: 'High-concept olfactory visual universe built using custom prompt architectures.',
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
