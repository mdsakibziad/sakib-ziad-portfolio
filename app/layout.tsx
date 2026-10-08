import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ThemeProvider } from '@/components/theme-provider'
import { StructuredData } from '@/components/structured-data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sakib Ziad',
  jobTitle: 'AI Creative Strategist & AI Commercial Director',
  url: 'https://sakibziad.my',
  sameAs: [
    'https://www.linkedin.com/in/sakib-ziad-290104211/',
    'https://www.instagram.com/sakibziad/',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Witlyn Studio',
    url: 'https://witlyn.com',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Witlyn Studio',
  url: 'https://witlyn.com',
  founder: {
    '@type': 'Person',
    name: 'Sakib Ziad',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/* ── Metadata (Strict Format & No Keyword Stuffing) ───────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://sakibziad.my'),
  title: {
    default: 'Sakib Ziad | AI Creative Strategist & AI Commercial Director',
    template: '%s | Sakib Ziad',
  },
  description:
    'AI creative strategist and commercial director creating beauty and skincare ad campaigns: strategy, hook videos and platform-ready ad assets.',
  authors: [{ name: 'Sakib Ziad', url: 'https://sakibziad.my' }],
  creator: 'Sakib Ziad',
  alternates: {
    canonical: 'https://sakibziad.my',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sakibziad.my',
    siteName: 'Sakib Ziad',
    title: 'Sakib Ziad | AI Creative Strategist & AI Commercial Director',
    description:
      'AI creative strategist and commercial director creating beauty and skincare ad campaigns: strategy, hook videos and platform-ready ad assets.',
    images: [
      {
        url: '/images/sakib-ziad.jpg',
        width: 1200,
        height: 630,
        alt: 'Sakib Ziad — AI Creative Strategist & AI Commercial Director',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakib Ziad | AI Creative Strategist & AI Commercial Director',
    description:
      'AI creative strategist and commercial director creating beauty and skincare ad campaigns: strategy, hook videos and platform-ready ad assets.',
    images: ['/images/sakib-ziad.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Anti-flicker script for user theme preference (light default) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('sz-theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-neutral-900 dark:text-neutral-100 antialiased overflow-x-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider>
          {/* Global Structured Data (Person + Organization) */}
          <StructuredData data={[personSchema, organizationSchema]} />

          {/* Analytics */}
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

          {/* Accessibility skip link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only fixed top-4 left-4 z-[9999] bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-xs font-semibold focus:outline-none"
          >
            Skip to main content
          </a>

          {/* Site Navigation */}
          <Navigation />

          {/* Smooth Momentum Scrolling */}
          <SmoothScroll>
            <main id="main-content" className="relative pt-20">
              {children}
            </main>
          </SmoothScroll>

          {/* Site Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
