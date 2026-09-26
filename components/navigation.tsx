'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { getDemoUser } from '@/lib/auth/demo-auth'

/* ── Split Nav Links for Centered-Logo Studio Header ──────────────────────── */
const NAV_LEFT = [
  { label: 'Work',       href: '/work' },
  { label: 'Consulting', href: '/consulting' },
] as const

const NAV_RIGHT = [
  { label: 'Products',   href: '/digital-products' },
  { label: 'About',      href: '/about' },
] as const

/* ── Core Navigation Links (Simplified & Focused) ─────────────────────────── */
const ALL_LINKS = [
  { label: 'Work',             href: '/work' },
  { label: 'Consulting',       href: '/consulting' },
  { label: 'Digital Products', href: '/digital-products' },
  { label: 'Membership',       href: '/membership' },
  { label: 'About',            href: '/about' },
  { label: 'Contact',          href: '/contact' },
] as const

/* ── Mobile Drawer Overlay Variants ───────────────────────────────────────── */
const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

const drawerVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 35 } },
  exit:    { x: '100%', transition: { type: 'spring' as const, stiffness: 400, damping: 40 } },
}

/* ── Pure Monochromatic Liquid-Glass Navigation Component ──────────────────── */
export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Auth listener
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      const demo = getDemoUser()
      if (demo) {
        setCurrentUser(demo)
      }
      return
    }

    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUser(data.user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Scroll listener — frosted glass backdrop blur & border after 30px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  return (
    <>
      {/* ── Main Nav Bar (Frosted Cold Glass Treatment) ─────────────────── */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-luxury',
          scrolled
            ? 'bg-[#070708]/80 backdrop-blur-2xl border-b border-white/[0.12] shadow-[0_4px_30px_rgba(0,0,0,0.85),inset_0_-1px_0_rgba(255,255,255,0.06)]'
            : 'bg-transparent border-b border-transparent'
        )}
        role="banner"
      >
        {/* Frosted Micro-Noise Grain Overlay */}
        {scrolled && (
          <div
            className="absolute inset-0 pointer-events-none frost-noise opacity-30 mix-blend-overlay"
            aria-hidden="true"
          />
        )}
        <div className="container-luxury relative z-10">
          <nav
            className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center h-[72px] md:h-[84px]"
            aria-label="Primary navigation"
          >
            {/* ── Desktop Left Nav Links ───────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {NAV_LEFT.map(({ label, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'nav-link-hover',
                      isActive && 'active text-white'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>

            {/* ── Center Wordmark / Logo ─────────────────────────────────── */}
            <div className="flex items-center justify-start lg:justify-center">
              <Link
                href="/"
                className="group flex flex-col items-start lg:items-center focus-visible:outline-none"
                aria-label="Sakib Ziad — home"
              >
                <span className="font-fraunces font-light text-white text-xl md:text-2xl tracking-[-0.01em] transition-opacity duration-300 group-hover:opacity-80">
                  Sakib Ziad
                </span>
                <span className="font-inter text-[9px] uppercase tracking-[0.24em] text-white/50 -mt-0.5 transition-colors duration-300 group-hover:text-white/80">
                  Creative Strategy & AI
                </span>
              </Link>
            </div>

            {/* ── Desktop Right Nav Links + Far-Right CTA ─────────────────── */}
            <div className="hidden lg:flex items-center justify-end gap-8 xl:gap-10">
              {NAV_RIGHT.map(({ label, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'nav-link-hover',
                      isActive && 'active text-white'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                )
              })}

              {/* Auth Link: Sign In or My Account */}
              {currentUser ? (
                <Link
                  href="/account"
                  className={cn(
                    'inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-white/20 bg-white/[0.05] text-xs font-inter uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/30 transition-all',
                    pathname.startsWith('/account') && 'bg-white/15 border-white'
                  )}
                  aria-label="My Account Dashboard"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{currentUser.user_metadata?.full_name?.split(' ')[0] || 'Account'}</span>
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className={cn(
                    'nav-link-hover',
                    pathname === '/sign-in' && 'active text-white'
                  )}
                >
                  Sign In
                </Link>
              )}

              {/* Primary Header CTA — Liquid Glass White Pill */}
              <Link
                href="/contact"
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'font-inter text-[11px] font-semibold uppercase tracking-[0.14em]',
                  'text-black bg-white rounded-full',
                  'px-5 py-2.5',
                  'shadow-[0_0_20px_rgba(255,255,255,0.18)]',
                  'transition-all duration-300 ease-luxury',
                  'hover:bg-zinc-200 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]',
                  'active:scale-[0.98]'
                )}
              >
                <span>Apply for a Call</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* ── Mobile Hamburger Button ──────────────────────────────────── */}
            <div className="flex items-center justify-end lg:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className={cn(
                  'relative h-10 w-10 flex items-center justify-center rounded-full',
                  'bg-white/[0.04] backdrop-blur-md border border-white/10',
                  'text-white transition-all duration-300',
                  'hover:bg-white/10 hover:border-white/20',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0,   opacity: 1 }}
                      exit={{   rotate: 90,   opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90,  opacity: 0 }}
                      animate={{ rotate: 0,   opacity: 1 }}
                      exit={{   rotate: -90,  opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className={cn(
                'fixed top-0 right-0 bottom-0 z-50',
                'w-full max-w-xs sm:max-w-sm',
                'bg-[#09090b]/95 backdrop-blur-2xl border-l border-white/12',
                'shadow-[-20px_0_60px_rgba(0,0,0,0.95)]',
                'flex flex-col justify-between',
                'p-6 sm:p-8 pt-20 sm:pt-24',
                'lg:hidden overflow-hidden'
              )}
            >
              {/* Frosted Grain Texture Overlay inside Drawer */}
              <div
                className="absolute inset-0 pointer-events-none frost-noise opacity-30 mix-blend-overlay"
                aria-hidden="true"
              />
              {/* Close Button Inside Drawer */}
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Close menu"
                className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-white hover:border-white/30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Navigation Items */}
              <nav aria-label="Mobile navigation" className="space-y-4">
                <p className="font-inter text-[10px] uppercase tracking-[0.24em] text-white/40 mb-4">
                  Navigation
                </p>
                <ul className="space-y-2">
                  {ALL_LINKS.map(({ label, href }) => {
                    const isActive = pathname === href || pathname.startsWith(href + '/')
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            'block py-2.5 text-base sm:text-lg font-fraunces transition-colors duration-200',
                            isActive ? 'text-white pl-2 border-l border-white font-normal' : 'text-zinc-400 hover:text-white'
                          )}
                        >
                          {label}
                        </Link>
                      </li>
                    )
                  })}

                  {/* Auth Mobile Item */}
                  <li className="pt-3 border-t border-white/10">
                    {currentUser ? (
                      <Link
                        href="/account"
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 bg-white/10 text-xs font-inter uppercase tracking-wider text-white"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>My Account ({currentUser.user_metadata?.full_name?.split(' ')[0] || 'Client'})</span>
                      </Link>
                    ) : (
                      <Link
                        href="/sign-in"
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 text-base font-fraunces text-white/80 hover:text-white"
                      >
                        Sign In →
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>

              {/* Mobile Drawer Footer CTA */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'w-full flex items-center justify-center gap-2',
                    'font-inter text-xs font-semibold uppercase tracking-[0.14em]',
                    'text-black bg-white rounded-full',
                    'py-3 px-6 text-center leading-snug',
                    'shadow-[0_0_24px_rgba(255,255,255,0.18)]',
                    'transition-all duration-300 hover:bg-zinc-200'
                  )}
                >
                  <span>Apply for a Strategy Call</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </Link>

                <p className="text-center text-[10px] text-zinc-500 font-inter">
                  Sakib Ziad · AI Creative Strategist
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
