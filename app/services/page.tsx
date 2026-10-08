import React from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Sakib Ziad — AI Creative Strategist & AI Commercial Director',
  description: 'Three ways I help beauty and skincare brands grow: Creative strategy, AI commercial direction, and full campaign packages.',
}

const SERVICES = [
  {
    id: 'creative-strategy',
    number: '01',
    title: 'Creative strategy',
    tagline: 'Clear angles and hooks before you spend on production.',
    whatItIs:
      'A focused strategic deep-dive into your brand messaging, buyer skepticism, and creative angles across Meta, Instagram, and TikTok.',
    whoItsFor:
      'Founders and marketing leads who want to find their winning creative angles and stop wasting ad budget on generic creative.',
    whatYouGet: [
      'Category and competitor messaging review',
      '5 to 10 distinct ad hook concepts with strategic angles',
      'Channel creative roadmap for Meta, Reels, and TikTok',
      '60-minute strategy session with direct recommendations',
    ],
    ctaText: 'Book a call',
    ctaHref: '/contact?service=strategy',
  },
  {
    id: 'commercial-direction',
    number: '02',
    title: 'AI commercial direction',
    tagline: 'High-end visual directing for beauty and skincare visuals.',
    whatItIs:
      'Creative direction for AI-assisted image and video generation, ensuring true-to-life packaging, accurate texture physics, and luxury brand equity.',
    whoItsFor:
      'Brands with existing creative teams or briefs who need luxury visual direction, realistic texture fidelity, and refined aesthetic standards.',
    whatYouGet: [
      'Visual moodboards and texture benchmarks',
      'Scene staging, lighting guides, and prompt direction',
      'Sensory product demonstrations (gels, creams, water veils)',
      'Packaging fidelity and color-matching review',
    ],
    ctaText: 'Book a call',
    ctaHref: '/contact?service=direction',
  },
  {
    id: 'campaign-package',
    number: '03',
    title: 'Full campaign package',
    tagline: 'Complete campaign creative from strategy to ready assets.',
    whatItIs:
      'A complete, turnkey campaign package combining strategy, written hooks, and platform-ready AI-directed video and still ad assets.',
    whoItsFor:
      'Beauty and skincare brands launching a new product SKU or looking to replace tired ad creative with high-converting creative assets.',
    whatYouGet: [
      '5 hook-based concept videos designed for paid social',
      'Platform ad stills formatted for Meta, Instagram, and TikTok',
      'Detailed strategy document explaining why each angle works',
      'Product brief and messaging guide for ongoing team use',
    ],
    ctaText: 'Apply for a project',
    ctaHref: '/contact?service=campaign',
    featured: true,
  },
]

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Advisory & Direction
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-neutral-900 dark:text-neutral-50">
            Services
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            Three ways I can help, from a single conversation to a full campaign.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                service.featured
                  ? 'bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-950 shadow-xl'
                  : 'bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest opacity-60">
                    {service.number}
                  </span>
                  {service.featured && (
                    <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100/15 dark:bg-neutral-900/10 border border-neutral-100/20 dark:border-neutral-900/20">
                      Most comprehensive
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-serif tracking-tight">
                    {service.title}
                  </h2>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      service.featured
                        ? 'text-neutral-300 dark:text-neutral-700'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {service.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/40 dark:border-neutral-800/80 space-y-4">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider opacity-60 mb-1">
                      What it is
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        service.featured
                          ? 'text-neutral-200 dark:text-neutral-800'
                          : 'text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {service.whatItIs}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider opacity-60 mb-1">
                      Who it is for
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        service.featured
                          ? 'text-neutral-200 dark:text-neutral-800'
                          : 'text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {service.whoItsFor}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                      What you get
                    </h3>
                    <ul className="space-y-2">
                      {service.whatYouGet.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm">
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              service.featured
                                ? 'text-neutral-200 dark:text-neutral-900'
                                : 'text-neutral-900 dark:text-neutral-100'
                            }`}
                          />
                          <span
                            className={
                              service.featured
                                ? 'text-neutral-200 dark:text-neutral-800'
                                : 'text-neutral-600 dark:text-neutral-400'
                            }
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={service.ctaHref}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium transition-colors ${
                    service.featured
                      ? 'bg-neutral-100 text-neutral-950 hover:bg-white dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800'
                      : 'bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white'
                  }`}
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Witlyn Studio */}
        <div className="rounded-2xl p-8 sm:p-10 border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Ongoing Production
            </p>
            <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 dark:text-neutral-100">
              Looking for ongoing production?
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Full-service studio production, multi-SKU asset libraries, and monthly retainer creative are delivered through Witlyn Studio.
            </p>
          </div>
          <a
            href="https://witlyn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 transition-colors shrink-0 self-start sm:self-center"
          >
            <span>Visit Witlyn Studio</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
