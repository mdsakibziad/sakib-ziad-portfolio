import type { Metadata } from 'next'
import Script from 'next/script'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { TopGuaranteeBanner } from '@/components/top-guarantee-banner'
import { FloatingLeadTrigger } from '@/components/floating-lead-trigger'
import { StructuredData } from '@/components/structured-data'
import { personSchema } from '@/lib/seo-schemas'
import { ThemeProvider } from '@/components/theme-provider'

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
  name: 'Sakib Ziad — Creative Strategist & Commercial Director',
  url: 'https://sakibziad.my',
  description:
    'Helping beauty & skincare brands compound revenue through high-performance creative direction, sensory systems, and rapid commercial production.',
  author: {
    '@type': 'Person',
    name: 'Sakib Ziad',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/* ── Metadata ──────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://sakibziad.my'),
  title: {
    default: 'Sakib Ziad — Creative Strategist & Commercial Director for Beauty & Skincare Brands',
    template: '%s · Sakib Ziad',
  },
  description:
    'Senior Creative Strategist & Commercial Director. Helping beauty, skincare, and cosmetics brands scale profitably with high-velocity creative architecture, thumb-stop hook design, and rapid 72-hour studio production.',
  keywords: [
    'Creative Strategist',
    'Senior Creative Strategist',
    'Beauty Creative Strategist',
    'Skincare Creative Strategist',
    'Commercial Director',
    'Beauty Brand Creative Director',
    'Direct-Response Creative Strategist',
    'Paid Social Creative Director',
    'E-commerce Creative Strategist',
    'Thumb-Stop Rate Optimization',
    'High-Performance Creative Systems',
    'Sakib Ziad',
    'Witlyn',
  ],
  authors: [{ name: 'Sakib Ziad', url: 'https://sakibziad.my' }],
  creator: 'Sakib Ziad',
  alternates: {
    canonical: 'https://sakibziad.my',
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sakibziad.my',
    siteName: 'Sakib Ziad',
    title: 'Sakib Ziad — Creative Strategist & Commercial Director for Beauty & Skincare',
    description:
      'Helping beauty & skincare brands compound revenue through high-performance creative direction, sensory systems, and rapid commercial production.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sakib Ziad — Creative Strategist & Commercial Director for Beauty & Skincare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakib Ziad — Creative Strategist & Commercial Director for Beauty & Skincare',
    description:
      'Helping beauty & skincare brands compound revenue through high-performance creative direction, sensory systems, and rapid commercial production.',
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-ivory antialiased selection:bg-[#141416] selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden">
        <ThemeProvider>
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
              bg-[#141416] text-white dark:bg-white dark:text-black text-sm font-semibold
              px-4 py-2 rounded-full shadow-lg
              focus:outline-none
            "
          >
            Skip to main content
          </a>

          {/* Top Alex Hormozi Style Outcome Guarantee Offer */}
          <TopGuaranteeBanner />

          {/* Site navigation */}
          <Navigation />

          {/* Page content */}
          <main id="main-content" className="relative">
            {children}
          </main>

          {/* High-Converting Floating Lead Capture */}
          <FloatingLeadTrigger />

          {/* Site footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

