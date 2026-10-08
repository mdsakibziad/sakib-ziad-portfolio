import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Download, Linkedin, Calendar } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Sakib Ziad — AI Creative Strategist & AI Commercial Director',
  description:
    'About Sakib Ziad, AI Creative Strategist and AI Commercial Director specializing in beauty and skincare ad campaigns. Based in Malaysia, working worldwide.',
}

export default function AboutPage() {
  const credentials = [
    'BSc in Artificial Intelligence',
    'Founder, Witlyn Studio',
    'AI solution engineering (agents and automation)',
  ]

  const tools = ['Claude', 'Google Flow', 'Higgsfield', 'n8n']

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Title */}
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Background & Direction
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-neutral-900 dark:text-neutral-50">
            About
          </h1>
        </div>

        {/* Story Section: Image & First-person Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Headshot Column (Stacked on mobile, side-by-side on desktop - NO OVERLAPPING) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
              <Image
                src="/images/sakib-ziad.jpg"
                alt="Sakib Ziad — AI Creative Strategist & AI Commercial Director"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="object-cover object-top filter grayscale contrast-105"
              />
            </div>
            <p className="mt-3 text-xs text-center lg:text-left text-neutral-500 font-mono">
              Sakib Ziad · Based in Malaysia, working worldwide.
            </p>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
              <p>
                I&apos;m Sakib Ziad, an AI Creative Strategist and AI Commercial Director focusing exclusively on beauty, skincare, and cosmetics. I partner with founders and marketing teams to plan and direct high-converting paid social ad campaigns for Meta, Instagram, and TikTok.
              </p>

              <p>
                I studied Artificial Intelligence, earning my BSc before transitioning directly into creative strategy and commercial direction. Seeing how traditional agency production often takes weeks of friction and unnecessary overhead, I built Witlyn Studio to prove that AI-native workflows can deliver publication-grade beauty visuals in days.
              </p>

              <p>
                My philosophy is simple: strategy first, creative second. Every ad should have one clear reason to exist—whether answering an unspoken buyer hesitation, proving a formula texture on camera, or reframing a daily skin routine. When the strategy and hook are solid, the visuals convert with conviction.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="/resume.pdf"
                download="Sakib_Ziad_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download résumé</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-200"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a call</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Credentials Strip */}
        <div className="rounded-2xl p-8 sm:p-10 border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Verified Credentials
          </p>
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-200">
            {credentials.map((cred, idx) => (
              <React.Fragment key={cred}>
                <span>{cred}</span>
                {idx < credentials.length - 1 && (
                  <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tools and Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-8 border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Tool Stack
            </p>
            <h3 className="text-lg font-serif text-neutral-900 dark:text-neutral-100">
              Production & Direction Stack
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
              {tools.join(' · ')}
            </p>
            <p className="text-xs text-neutral-500 pt-2">
              Clean prompt engineering, customized workflow automations, and studio-grade visual generation models.
            </p>
          </div>

          <div className="rounded-2xl p-8 border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Location & Availability
            </p>
            <h3 className="text-lg font-serif text-neutral-900 dark:text-neutral-100">
              Based in Malaysia, working worldwide.
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Serving direct-to-consumer beauty, skincare, and cosmetics brands globally across US, UK, APAC, and European markets.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
