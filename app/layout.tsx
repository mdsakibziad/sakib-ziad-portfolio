import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

/* ── Metadata ──────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://sakibziad.com'),
  title: {
    default: 'Sakib Ziad — AI Creative Strategist',
    template: '%s — Sakib Ziad',
  },
  description:
    'Helping beauty & skincare brands grow through AI-native creative systems and AI automation.',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sakibziad.com',
    siteName: 'Sakib Ziad',
    title: 'Sakib Ziad — AI Creative Strategist',
    description:
      'Helping beauty & skincare brands grow through AI-native creative systems and AI automation.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sakib Ziad — AI Creative Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakib Ziad — AI Creative Strategist',
    description:
      'Helping beauty & skincare brands grow through AI-native creative systems and AI automation.',
    images: ['/og-image.jpg'],
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

/* ── Root Layout ───────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-ivory antialiased">
        {/* Skip to main content (accessibility) */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-[9999]
            bg-gold text-background text-sm font-medium
            px-4 py-2 rounded-lg
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
