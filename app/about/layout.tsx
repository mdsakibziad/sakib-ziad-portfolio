import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, personSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'About Sakib Ziad — Creative Strategist & Commercial Director',
  description:
    'Founder of Witlyn studio. Helping beauty and cosmetics brands build compounding creative systems and high-converting commercial pipelines.',
  alternates: {
    canonical: 'https://sakibziad.my/about',
  },
  openGraph: {
    title: 'About Sakib Ziad — Creative Strategist & Commercial Director',
    description:
      'Founder of Witlyn studio. Dedicated exclusively to luxury beauty and skincare brand growth.',
    url: 'https://sakibziad.my/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ])

  return (
    <>
      <StructuredData data={[personSchema, breadcrumbs]} />
      {children}
    </>
  )
}
