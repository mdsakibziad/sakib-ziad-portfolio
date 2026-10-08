'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer
      className="border-t border-black/[0.08] dark:border-white/[0.08] bg-neutral-50 dark:bg-black text-black dark:text-white transition-colors duration-200"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-black/[0.06] dark:border-white/[0.08]">
          
          {/* Left: SAKIB ZIAD + one line role */}
          <div className="md:col-span-5 space-y-3">
            <Link
              href="/"
              className="text-lg font-bold tracking-[0.16em] uppercase text-black dark:text-white block hover:opacity-80 transition-opacity"
            >
              SAKIB ZIAD
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-sm leading-relaxed">
              AI Creative Strategist &amp; AI Commercial Director.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-500 block mb-1">
                Direct Contact
              </span>
              <a
                href="mailto:Sakib@witlyn.com"
                className="text-base font-semibold text-black dark:text-white hover:underline underline-offset-4"
              >
                Sakib@witlyn.com
              </a>
            </div>
          </div>

          {/* Links: Work, Services, About, Contact, Résumé, FAQ */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500 block">
              Navigation
            </span>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <li>
                <Link href="/work" className="hover:text-black dark:hover:text-white transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-black dark:hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors"
                >
                  <span>Résumé</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-black dark:hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social: LinkedIn, Instagram, Witlyn */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500 block">
              Network
            </span>
            <ul className="space-y-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <li>
                <a
                  href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sakibziad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://witlyn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
                >
                  <span>Witlyn Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Privacy, Terms, and Coming soon links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 dark:text-neutral-400">
          <p>© 2026 Sakib Ziad · All rights reserved.</p>

          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/privacy" className="hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline underline-offset-4">
              Terms
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="text-neutral-400 dark:text-neutral-500">
              Membership (Coming soon)
            </span>
            <span className="text-neutral-400 dark:text-neutral-500">
              Digital Products (Coming soon)
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
