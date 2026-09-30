/**
 * Structured Data (JSON-LD) generators for Search Engines (Google, Bing).
 * Conforms to Schema.org standards for Person, Service, BreadcrumbList, and CollectionPage.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://sakibziad.my'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sakib Ziad',
  alternateName: [
    'Creative Strategist',
    'Beauty Creative Strategist',
    'Commercial Creative Director',
    'Sakib Ziad Creative Strategist',
  ],
  jobTitle: 'Creative Strategist & Commercial Director',
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Creative Strategist',
    occupationalCategory: '27-1011.00',
    description:
      'High-velocity creative direction, sensory texture architecture, and direct-response performance systems for beauty and skincare brands.',
    skills:
      'Creative Strategy, Direct Response Advertising, Beauty Marketing, Sensory Art Direction, Paid Social Creative Systems, Hook Architecture, Conversion Rate Optimization',
  },
  url: SITE_URL,
  image: `${SITE_URL}/images/sakib-ziad.jpg`,
  description:
    'Creative Strategist and Commercial Director helping beauty, skincare, and cosmetics brands compound revenue through high-velocity creative architecture and rapid 72-hour studio production.',
  worksFor: {
    '@type': 'Organization',
    name: 'Witlyn',
    url: 'https://witlyn.com',
  },
  sameAs: [
    'https://www.linkedin.com/in/sakib-ziad-290104211/',
    'https://www.instagram.com/sakibziad/',
    'https://www.facebook.com/sakibziad.21',
  ],
  knowsAbout: [
    'Creative Strategy',
    'Direct-Response Creative Direction',
    'Beauty & Skincare Advertising',
    'Prestige Brand Architecture',
    'Paid Social Creative Systems (Meta, TikTok, Instagram)',
    'Thumb-Stop Rate Engineering',
    'ROAS Optimization & CPA Reduction',
    'Sensory Visual Directing & Formula Caustics',
    'Rapid Commercial Production Pipelines',
  ],
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateServiceSchema({
  name,
  description,
  serviceType,
  url,
  price,
  priceCurrency = 'USD',
}: {
  name: string
  description: string
  serviceType: string
  url: string
  price?: string
  priceCurrency?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    provider: {
      '@type': 'Person',
      name: 'Sakib Ziad',
      url: SITE_URL,
      worksFor: {
        '@type': 'Organization',
        name: 'Witlyn',
        url: 'https://witlyn.com',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
  }

  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
    }
  }

  return schema
}

export function generateCollectionPageSchema({
  name,
  description,
  url,
  hasPart,
}: {
  name: string
  description: string
  url: string
  hasPart?: Array<{ title: string; description: string; url?: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    publisher: {
      '@type': 'Person',
      name: 'Sakib Ziad',
      url: SITE_URL,
    },
    ...(hasPart && {
      hasPart: hasPart.map((part) => ({
        '@type': 'CreativeWork',
        headline: part.title,
        description: part.description,
        author: {
          '@type': 'Person',
          name: 'Sakib Ziad',
        },
      })),
    }),
  }
}
