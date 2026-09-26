import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://sakibziad.my';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/account',
          '/account/',
          '/sign-in',
          '/sign-up',
          '/forgot-password',
          '/auth/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
