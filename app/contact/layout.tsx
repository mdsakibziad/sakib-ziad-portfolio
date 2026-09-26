import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'Apply for Advisory & Strategic Inquiries | Sakib Ziad',
  description:
    'Apply for private 1:1 advisory, campaign direction, or enterprise AI automation builds. Reviewed personally within 48 hours.',
  alternates: {
    canonical: 'https://sakibziad.my/contact',
  },
  openGraph: {
    title: 'Apply for Advisory & Strategic Inquiries | Sakib Ziad',
    description:
      'Apply for private 1:1 advisory, campaign direction, or enterprise AI automation builds. Applications reviewed personally.',
    url: 'https://sakibziad.my/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact & Advisory Application',
    url: 'https://sakibziad.my/contact',
    description:
      'Application and contact gateway for AI creative advisory and brand automation engagements.',
    mainEntity: {
      '@type': 'Person',
      name: 'Sakib Ziad',
      email: 'Sakib@witlyn.com',
      url: 'https://sakibziad.my',
    },
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ])

  return (
    <>
      <StructuredData data={[contactSchema, breadcrumbs]} />
      {children}
    </>
  )
}
