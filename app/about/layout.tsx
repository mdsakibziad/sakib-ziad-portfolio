import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, personSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'About Sakib Ziad — AI Creative Strategist & Founder of Witlyn',
  description:
    'Founder of Witlyn studio, BSc in Artificial Intelligence. Helping beauty and cosmetics brands build compounding creative systems and operational AI.',
  alternates: {
    canonical: 'https://sakibziad.my/about',
  },
  openGraph: {
    title: 'About Sakib Ziad — AI Creative Strategist & Founder of Witlyn',
    description:
      'Founder of Witlyn studio, BSc in Artificial Intelligence. Dedicated exclusively to luxury beauty and skincare brand growth.',
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
