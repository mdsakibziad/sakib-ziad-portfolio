import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: '1:1 Creative Strategy & Commercial Advisory for Beauty Brands | Sakib Ziad',
  description:
    'Private advisory spanning commercial creative strategy, campaign direction, and high-performance production systems for beauty and skincare brands ready to scale.',
  alternates: {
    canonical: 'https://sakibziad.my/consulting',
  },
  openGraph: {
    title: '1:1 Creative Strategy & Commercial Advisory for Beauty Brands | Sakib Ziad',
    description:
      'Private advisory spanning commercial creative strategy, campaign direction, and high-performance production systems for beauty brands ready to scale.',
    url: 'https://sakibziad.my/consulting',
  },
}

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serviceSchema = generateServiceSchema({
    name: '1:1 Creative Strategy & Commercial Advisory',
    description:
      'High-touch advisory spanning commercial creative strategy, campaign direction, and direct-response creative systems for beauty, skincare, and cosmetics brands.',
    serviceType: 'Commercial Brand Advisory & Creative Strategy',
    url: '/consulting',
  })

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Consulting & Advisory', url: '/consulting' },
  ])

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbs]} />
      {children}
    </>
  )
}
