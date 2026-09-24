'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Linkedin, Instagram, Facebook, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Footer Config ─────────────────────────────────────────────────────────── */
const NAV_GROUPS = [
  {
    heading: 'Offerings & Systems',
    links: [
      { label: 'Selected Work',    href: '/work' },
      { label: '1:1 Consulting',   href: '/consulting' },
      { label: 'Digital Products', href: '/digital-products' },
      { label: 'Syndicate Access', href: '/membership' },
    ],
  },
  {
    heading: 'Studio & Access',
    links: [
      { label: 'About Sakib',      href: '/about' },
      { label: 'Direct Inquiries', href: '/contact' },
      { label: 'Witlyn Studio',    href: 'https://witlyn.com' },
    ],
  },
] as const

const SOCIAL_LINKS = [
  {
    label:   'LinkedIn',
    href:    'https://www.linkedin.com/in/sakib-ziad-290104211/',
    Icon:    Linkedin,
    handle:  'sakib-ziad',
  },
  {
    label:   'Instagram',
    href:    'https://www.instagram.com/sakibziad/',
    Icon:    Instagram,
    handle:  '@sakibziad',
  },
  {
    label:   'Facebook',
    href:    'https://www.facebook.com/sakibziad.21',
    Icon:    Facebook,
    handle:  'sakibziad.21',
  },
] as const

const CONTACT_EMAIL = 'Sakib@witlyn.com'
const CURRENT_YEAR = new Date().getFullYear()

/* ── Pure Monochromatic Liquid-Glass Footer Component ──────────────────────── */
export function Footer() {
  return (
    <footer
      className={cn(
        'relative bg-background border-t border-white/[0.08]',
        'overflow-hidden'
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Subtle liquid-glass background light sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 30% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Main Footer Grid ──────────────────────────────────────────────── */}
      <div className="container-luxury relative z-10 pt-16 pb-12 md:pt-20 md:pb-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-16">

          {/* ── Col 1: Brand + Positioning ─────────────────────────────── */}
          <div className="md:col-span-4 lg:col-span-5 space-y-5">
            {/* Wordmark */}
            <Link
              href="/"
              className={cn(
                'inline-block font-fraunces font-light text-white text-3xl lg:text-4xl',
                'tracking-tight leading-none',
                'transition-opacity duration-300 hover:opacity-75'
              )}
              aria-label="Sakib Ziad — home"
            >
              Sakib Ziad
            </Link>

            {/* Positioning tagline */}
            <p className="font-inter text-sm text-zinc-400 max-w-xs leading-relaxed">
              Helping beauty &amp; skincare brands compound their growth through AI-native creative systems and intelligent automation.
            </p>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={cn(
                'inline-flex items-center gap-2',
                'font-inter text-xs uppercase tracking-widest',
                'text-white/80 transition-all duration-300',
                'hover:text-white hover:gap-3',
                'group'
              )}
              aria-label={`Email Sakib at ${CONTACT_EMAIL}`}
            >
              <Mail className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href, Icon, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={`${label}: ${handle}`}
                  className={cn(
                    'flex items-center justify-center',
                    'h-10 w-10 rounded-full border border-white/10 bg-white/[0.03]',
                    'text-zinc-400',
                    'transition-all duration-300',
                    'hover:text-white hover:border-white/30 hover:bg-white/[0.08]',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white'
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Nav Groups ──────────────────────────────────────── */}
          <div className="md:col-span-5 lg:col-span-4 grid grid-cols-2 gap-8">
            {NAV_GROUPS.map(({ heading, links }) => (
              <div key={heading} className="space-y-4">
                <p className="font-inter text-[11px] uppercase tracking-widest text-zinc-400 font-medium">
                  {heading}
                </p>
                <ul className="space-y-2.5" role="list">
                  {links.map(({ label, href }) => {
                    const isExternal = href.startsWith('http')
                    return (
                      <li key={href}>
                        {isExternal ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-inter text-sm text-zinc-400 transition-colors duration-200 hover:text-white inline-flex items-center gap-1"
                          >
                            <span>{label}</span>
                            <ArrowUpRight className="h-3 w-3 opacity-60" />
                          </a>
                        ) : (
                          <Link
                            href={href}
                            className="font-inter text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                          >
                            {label}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Col 3: CTA Block ───────────────────────────────────────── */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <p className="font-inter text-[11px] uppercase tracking-widest text-zinc-400 font-medium">
              Work Together
            </p>
            <p className="font-fraunces font-light text-white text-xl lg:text-2xl leading-snug tracking-tight">
              Ready to build an AI-native brand system?
            </p>
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'font-inter text-xs font-semibold uppercase tracking-[0.14em]',
                'text-black bg-white rounded-full',
                'px-6 py-3 text-center leading-snug',
                'shadow-[0_0_24px_rgba(255,255,255,0.18)]',
                'transition-all duration-300 ease-luxury group',
                'hover:bg-zinc-200 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(255,255,255,0.3)]',
                'active:scale-[0.98]'
              )}
            >
              <span>Apply for Strategy Call</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-luxury relative z-10">
        <div className="hr-glass" aria-hidden="true" />
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────────────────── */}
      <div className="container-luxury relative z-10 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="font-inter text-xs text-zinc-500 order-2 sm:order-1">
            © {CURRENT_YEAR} Sakib Ziad. All rights reserved.
          </p>

          {/* Bottom links */}
          <nav aria-label="Legal navigation" className="order-1 sm:order-2">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="font-inter text-xs text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-inter text-xs text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <a
                  href="https://witlyn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-1',
                    'font-inter text-xs text-zinc-400 transition-colors duration-300 hover:text-white',
                    'group'
                  )}
                  aria-label="Visit Witlyn (opens in new tab)"
                >
                  <span>Witlyn Studio</span>
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
