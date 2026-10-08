import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo-schemas'

export const metadata: Metadata = {
  title: 'The Advisory Syndicate — Ongoing AI Strategy for Beauty Brand Leaders | Sakib Ziad',
  description:
    'Standing relationship with your AI creative strategist. Monthly strategy deep-dives, proprietary agent templates, tool reviews, and direct advisory.',
  alternates: {
    canonical: 'https://sakibziad.my/membership',
  },
  openGraph: {
    title: 'The Advisory Syndicate — Ongoing AI Strategy for Beauty Brand Leaders | Sakib Ziad',
    description:
      'Ongoing access to monthly strategy, tools, and direct guidance for beauty brand founders and creative directors.',
    url: 'https://sakibziad.my/membership',
  },
}

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serviceSchema = generateServiceSchema({
    name: 'The Advisory Syndicate Membership',
    description:
      'Curated private membership offering ongoing monthly AI strategy, tool setups, and direct guidance for beauty brand leaders.',
    serviceType: 'Advisory Membership',
    url: '/membership',
    price: '290.00',
    priceCurrency: 'USD',
  })

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Membership', url: '/membership' },
  ])

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbs]} />
      {children}
    </>
  )
}
