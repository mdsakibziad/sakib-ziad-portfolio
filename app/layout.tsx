import type { Metadata } from 'next'
import Script from 'next/script'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { StructuredData } from '@/components/structured-data'
import { personSchema } from '@/lib/seo-schemas'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sakib Ziad — AI Creative Strategist',
  url: 'https://sakibziad.com',
  description:
    'Helping beauty & skincare brands grow through AI-native creative systems and intelligent brand automation.',
  author: {
    '@type': 'Person',
    name: 'Sakib Ziad',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/* ── Metadata ──────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://sakibziad.com'),
  title: {
    default: 'Sakib Ziad — AI Creative Strategist for Beauty & Skincare Brands',
    template: '%s',
  },
  description:
    'Helping beauty & skincare brands grow through AI-native creative systems and intelligent brand automation.',
  keywords: [
    'AI Creative Strategist',
    'AI automation',
    'beauty brand strategy',
    'skincare marketing',
    'AI content systems',
    'Sakib Ziad',
    'Witlyn',
  ],
  authors: [{ name: 'Sakib Ziad', url: 'https://sakibziad.com' }],
  creator: 'Sakib Ziad',
  alternates: {
    canonical: 'https://sakibziad.com',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || 'google-site-verification-token',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sakibziad.com',
    siteName: 'Sakib Ziad',
    title: 'Sakib Ziad — AI Creative Strategist for Beauty & Skincare Brands',
    description:
      'Helping beauty & skincare brands grow through AI-native creative systems and intelligent brand automation.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sakib Ziad — AI Creative Strategist for Beauty & Skincare Brands',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakib Ziad — AI Creative Strategist for Beauty & Skincare Brands',
    description:
      'Helping beauty & skincare brands grow through AI-native creative systems and intelligent brand automation.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
}

/* ── Root Layout ───────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-ivory antialiased selection:bg-white selection:text-black overflow-x-hidden">
        {/* Global JSON-LD Schema (Person & WebSite) */}
        <StructuredData data={[personSchema, websiteSchema]} />

        {/* Deferred Google Analytics 4 (Zero impact on Core Web Vitals) */}
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Skip to main content (accessibility) */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-[9999]
            bg-white text-black text-sm font-semibold
            px-4 py-2 rounded-full shadow-lg
            focus:outline-none
          "
        >
          Skip to main content
        </a>

        {/* Site navigation */}
        <Navigation />

        {/* Page content */}
        <main id="main-content" className="relative">
          {children}
        </main>

        {/* Site footer */}
        <Footer />
      </body>
    </html>
  )
}

