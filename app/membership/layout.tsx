import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membership | Sakib Ziad — AI Creative Strategist & AI Commercial Director',
  description:
    'Private strategic advisory and ongoing creative guidance for beauty and skincare brand leaders.',
}

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
