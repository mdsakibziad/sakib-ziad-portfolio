'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Linkedin, Instagram, Facebook, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Footer Config ─────────────────────────────────────────────────────────── */
const NAV_GROUPS = [
  {
    heading: 'Work & Services',
    links: [
      { label: 'Work',             href: '/work' },
      { label: 'Consulting',       href: '/consulting' },
      { label: 'Digital Products', href: '/digital-products' },
      { label: 'Membership',       href: '/membership' },
    ],
  },
  {
    heading: 'About & Content',
    links: [
      { label: 'About',    href: '/about' },
      { label: 'Insights', href: '/insights' },
      { label: 'Contact',  href: '/contact' },
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

/* ── Footer Component ──────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer
      className={cn(
        'relative bg-background border-t border-border',
        'overflow-hidden'
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Subtle background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,166,107,0.06) 0%, transparent 70%)',
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
                'inline-block font-fraunces font-light text-ivory text-3xl lg:text-4xl',
                'tracking-tight leading-none',
                'transition-opacity duration-300 hover:opacity-70'
              )}
              aria-label="Sakib Ziad — home"
            >
              Sakib Ziad
            </Link>

            {/* Positioning tagline */}
            <p className="font-inter text-body-md text-muted max-w-xs leading-relaxed">
              Helping beauty &amp; skincare brands grow through AI-native creative systems and intelligent automation.
            </p>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={cn(
                'inline-flex items-center gap-2',
                'font-inter text-label-md uppercase tracking-widest',
                'text-gold transition-all duration-300',
                'hover:text-gold-light hover:gap-3',
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
                    'h-10 w-10 rounded-full border border-border',
                    'text-muted',
                    'transition-all duration-300',
                    'hover:text-ivory hover:border-border-strong hover:bg-ivory/5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background'
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
                <p className="font-inter text-label-sm uppercase tracking-widest text-muted/70">
                  {heading}
                </p>
                <ul className="space-y-3" role="list">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          'font-inter text-body-sm text-ivory/60',
                          'transition-colors duration-300',
                          'hover:text-ivory',
                          'relative inline-block',
                          'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold',
                          'after:scale-x-0 after:origin-left after:transition-transform after:duration-300',
                          'hover:after:scale-x-100'
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Col 3: CTA Block ───────────────────────────────────────── */}
          <div className="md:col-span-3 lg:col-span-3 space-y-5">
            <p className="font-inter text-label-sm uppercase tracking-widest text-muted/70">
              Work Together
            </p>
            <p className="font-fraunces font-light text-ivory text-xl lg:text-2xl leading-snug tracking-tight">
              Ready to build an AI-native brand?
            </p>
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center justify-center gap-2.5',
                'font-inter text-xs font-semibold uppercase tracking-[0.16em]',
                'text-background bg-gold rounded-full',
                'px-7 py-3.5',
                'transition-all duration-300 ease-luxury group',
                'hover:bg-gold-light hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(201,166,107,0.35)]',
                'active:scale-[0.98]'
              )}
            >
              <span>Apply for a Strategy Call</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-luxury relative z-10">
        <div className="hr-gold" aria-hidden="true" />
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────────────────── */}
      <div className="container-luxury relative z-10 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="font-inter text-label-sm text-muted order-2 sm:order-1">
            © {CURRENT_YEAR} Sakib Ziad. All rights reserved.
          </p>

          {/* Bottom links */}
          <nav aria-label="Legal navigation" className="order-1 sm:order-2">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="font-inter text-label-sm text-muted transition-colors duration-300 hover:text-ivory"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-inter text-label-sm text-muted transition-colors duration-300 hover:text-ivory"
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
                    'font-inter text-label-sm',
                    'text-gold/70 transition-colors duration-300 hover:text-gold',
                    'group'
                  )}
                  aria-label="Visit Witlyn (opens in new tab)"
                >
                  Witlyn
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
