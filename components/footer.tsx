'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowUp, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_MENU = [
  { label: 'Work',             href: '/work' },
  { label: 'Consulting',       href: '/consulting' },
  { label: 'Digital Products', href: '/digital-products' },
  { label: 'Membership',       href: '/membership' },
  { label: 'About',            href: '/about' },
  { label: 'Contact',          href: '/contact' },
] as const

const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/sakib-ziad-290104211/' },
  { label: 'Instagram', href: 'https://www.instagram.com/sakibziad/' },
  { label: 'Facebook',  href: 'https://www.facebook.com/sakibziad.21' },
] as const

const CONTACT_EMAIL = 'Sakib@witlyn.com'
const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative bg-[#f4521c] text-[#050609] overflow-hidden select-none"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Top Tick Pattern Strip (Selora Characteristic) ── */}
      <div className="tick-strip w-full border-b border-[#050609]/20" aria-hidden="true" />

      {/* ── Main Footer Info ── */}
      <div className="container-luxury pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Creator Statement & Copy Email Button */}
          <div className="md:col-span-6 lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#050609]/70 font-semibold">
              // SAKIB ZIAD · CREATIVE STRATEGY
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.05em] leading-[0.92] text-[#050609]">
              LET&apos;S SCALE YOUR BRAND TOGETHER.
            </h2>
            <p className="font-inter text-sm sm:text-base font-semibold max-w-md text-[#050609]/80 leading-snug">
              Direct-response creative direction, sensory hook systems, and high-velocity commercial production for beauty &amp; skincare brands.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative inline-flex items-center gap-3 px-5 py-3 bg-[#050609] text-[#ece8e1] font-inter text-xs uppercase font-bold tracking-wider hover:bg-[#ece8e1] hover:text-[#050609] transition-colors duration-300"
              >
                <span>{copied ? 'EMAIL COPIED' : 'COPY EMAIL'}</span>
                {copied ? <Check className="w-4 h-4 text-[#f4521c]" /> : <Copy className="w-4 h-4" />}
              </button>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-mono text-xs uppercase underline tracking-wider font-bold text-[#050609] hover:opacity-75 transition-opacity"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Middle Column: Menu Links */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#050609]/70 font-semibold">
              // NAVIGATION
            </p>
            <ul className="space-y-2">
              {NAV_MENU.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block font-inter text-sm uppercase font-black tracking-tight text-[#050609] hover:translate-x-1.5 transition-transform duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Social Links + Witlyn */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#050609]/70 font-semibold">
              // NETWORK
            </p>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-inter text-sm uppercase font-black tracking-tight text-[#050609] hover:translate-x-1.5 transition-transform duration-200"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://witlyn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-inter text-sm uppercase font-black tracking-tight text-[#050609] hover:translate-x-1.5 transition-transform duration-200"
                >
                  <span>WITLYN STUDIO</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Giant Wordmark (Selora 12vw Single Line) ── */}
        <div className="pt-16 sm:pt-24 select-none pointer-events-none">
          <div className="w-full flex justify-center items-center overflow-hidden border-t border-[#050609]/20 pt-8 sm:pt-12">
            <h1 className="font-inter font-black uppercase text-[clamp(2.5rem,11.5vw,14rem)] leading-[0.85] tracking-[-0.05em] text-[#050609] m-0 p-0 whitespace-nowrap text-center select-none">
              SAKIB ZIAD
            </h1>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 sm:pt-12 border-t border-[#050609]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-[#050609]/80 font-medium">
          <p>© {CURRENT_YEAR} SAKIB ZIAD. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#050609] underline transition-colors">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-[#050609] underline transition-colors">
              TERMS
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#050609] font-bold hover:opacity-75 transition-opacity"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
