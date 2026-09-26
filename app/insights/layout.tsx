import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'Insights & Essays on AI-Native Beauty Brand Growth | Sakib Ziad',
  description:
    'Thinking out loud on AI, luxury beauty, and brand growth. Strategic frameworks and observations on building high-growth beauty brands in the AI era.',
  alternates: {
    canonical: 'https://sakibziad.my/insights',
  },
  openGraph: {
    title: 'Insights & Essays on AI-Native Beauty Brand Growth | Sakib Ziad',
    description:
      'Strategic frameworks and essays on building high-growth beauty and skincare brands in the AI era.',
    url: 'https://sakibziad.my/insights',
  },
}

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Insights & Essays on AI-Native Beauty Growth',
    description:
      'Essays and tactical breakdowns on creative direction, generative models, and operational AI for beauty brand executives.',
    url: '/insights',
  })

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
  ])

  return (
    <>
      <StructuredData data={[collectionSchema, breadcrumbs]} />
      {children}
    </>
  )
}
