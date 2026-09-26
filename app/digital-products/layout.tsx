import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'AI Prompt Systems & Automation Kits for Beauty Brands | Sakib Ziad',
  description:
    'Actionable AI creative frameworks, brand strategy playbooks, and ready-to-deploy AI agent kits built specifically for beauty, skincare, and cosmetics brands.',
  alternates: {
    canonical: 'https://sakibziad.my/digital-products',
  },
  openGraph: {
    title: 'AI Prompt Systems & Automation Kits for Beauty Brands | Sakib Ziad',
    description:
      'Actionable AI creative frameworks, brand strategy playbooks, and ready-to-deploy AI agent kits built specifically for beauty and cosmetics brands.',
    url: 'https://sakibziad.my/digital-products',
  },
}

export default function DigitalProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serviceSchema = generateServiceSchema({
    name: 'AI Prompt Frameworks & Automation Blueprints',
    description:
      'Self-serve proprietary frameworks and AI agent blueprints for beauty brand creative systems and operations.',
    serviceType: 'Digital Intellectual Property & Frameworks',
    url: '/digital-products',
    price: '190.00',
    priceCurrency: 'USD',
  })

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Digital Products', url: '/digital-products' },
  ])

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbs]} />
      {children}
    </>
  )
}
