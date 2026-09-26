/**
 * Structured Data (JSON-LD) generators for Search Engines (Google, Bing).
 * Conforms to Schema.org standards for Person, Service, BreadcrumbList, and CollectionPage.
 */

const SITE_URL = 'https://sakibziad.com'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sakib Ziad',
  jobTitle: 'AI Creative Strategist & Automation Architect',
  url: SITE_URL,
  image: `${SITE_URL}/images/sakib-ziad.jpg`,
  description:
    'AI Creative Strategist helping beauty, skincare, and cosmetics brands compound growth through AI-native creative systems and intelligent brand automation.',
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
    'Artificial Intelligence in Beauty',
    'AI Creative Systems',
    'Brand Operations Automation',
    'Creative Direction',
    'Skincare Brand Strategy',
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
