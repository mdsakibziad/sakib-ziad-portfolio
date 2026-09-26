import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: '1:1 AI Creative & Automation Advisory for Beauty Brands | Sakib Ziad',
  description:
    'Private advisory spanning AI-native creative strategy, campaign direction, and custom AI automation builds for beauty and skincare brands ready to scale.',
  alternates: {
    canonical: 'https://sakibziad.com/consulting',
  },
  openGraph: {
    title: '1:1 AI Creative & Automation Advisory for Beauty Brands | Sakib Ziad',
    description:
      'Private advisory spanning AI-native creative strategy, campaign direction, and custom AI automation builds for beauty brands ready to scale.',
    url: 'https://sakibziad.com/consulting',
  },
}

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serviceSchema = generateServiceSchema({
    name: '1:1 AI Creative & Automation Advisory',
    description:
      'High-touch advisory spanning AI creative strategy, campaign direction, and custom AI automation builds for beauty, skincare, and cosmetics brands.',
    serviceType: 'AI Brand Advisory & Creative Strategy',
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
