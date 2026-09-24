'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Split Nav Links Config for Centered-Logo Studio Header ───────────────── */
const NAV_LEFT = [
  { label: 'Work',       href: '/work' },
  { label: 'Consulting', href: '/consulting' },
] as const

const NAV_RIGHT = [
  { label: 'Products',   href: '/digital-products' },
  { label: 'About',      href: '/about' },
] as const

const ALL_LINKS = [
  { label: 'Work',             href: '/work' },
  { label: 'Consulting',       href: '/consulting' },
  { label: 'Digital Products', href: '/digital-products' },
  { label: 'Membership',       href: '/membership' },
  { label: 'About',            href: '/about' },
  { label: 'Insights',         href: '/insights' },
] as const

/* ── Mobile Drawer Overlay Variants ───────────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
}

const drawerVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 35 } },
  exit:    { x: '100%', transition: { type: 'spring' as const, stiffness: 400, damping: 40 } },
}

const navItemVariants = {
  hidden:  { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Boutique Centered-Logo Navigation Component ─────────────────────────── */
export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll listener — subtle backdrop blur & border after 40px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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
      {/* ── Main Nav Bar ─────────────────────────────────────────────────── */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-luxury',
          scrolled
            ? 'bg-background/85 backdrop-blur-md border-b border-border/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-transparent'
        )}
        role="banner"
      >
        <div className="container-luxury">
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
                      isActive && 'active text-ivory'
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
                <span className="font-fraunces font-light text-ivory text-xl md:text-2xl tracking-[-0.01em] transition-opacity duration-300 group-hover:opacity-80">
                  Sakib Ziad
                </span>
                <span className="font-inter text-[9px] uppercase tracking-[0.24em] text-gold/80 -mt-0.5 transition-colors duration-300 group-hover:text-gold">
                  Creative Strategy & AI
                </span>
              </Link>
            </div>

            {/* ── Desktop Right Nav Links + Far-Right CTA ─────────────────── */}
            <div className="hidden lg:flex items-center justify-end gap-8 xl:gap-10">
              <div className="flex items-center gap-8 xl:gap-10">
                {NAV_RIGHT.map(({ label, href }) => {
                  const isActive = pathname === href || pathname.startsWith(href + '/')
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        'nav-link-hover',
                        isActive && 'active text-ivory'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  )
                })}
              </div>

              {/* Far-Right Standalone CTA Button */}
              <Link
                href="/contact"
                className={cn(
                  'group relative inline-flex items-center justify-center gap-2',
                  'h-11 px-6 rounded-full border border-gold/50 bg-gold/10 text-gold text-xs font-inter font-semibold uppercase tracking-[0.16em]',
                  'transition-all duration-300 ease-luxury shadow-[0_0_15px_rgba(201,166,107,0.15)]',
                  'hover:border-gold hover:bg-gold hover:text-background hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(201,166,107,0.35)]',
                  'active:scale-[0.98]'
                )}
              >
                <span>Apply for Call</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* ── Mobile Hamburger ────────────────────────────────────────── */}
            <div className="flex lg:hidden items-center justify-end">
              <button
                type="button"
                onClick={toggleMenu}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-drawer"
                className={cn(
                  'flex items-center justify-center',
                  'h-11 w-11 rounded-full border border-border',
                  'text-ivory transition-all duration-300',
                  'hover:bg-ivory/5 hover:border-gold/40',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold'
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
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md lg:hidden"
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
                'w-full max-w-sm',
                'bg-surface border-l border-border',
                'flex flex-col justify-between',
                'p-8 pt-24',
                'lg:hidden'
              )}
            >
              {/* Close Button Inside Drawer */}
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Close menu"
                className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full border border-border text-ivory hover:border-gold/40 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Navigation Items */}
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-6" role="list">
                  {ALL_LINKS.map(({ label, href }, i) => {
                    const isActive = pathname === href || pathname.startsWith(href + '/')
                    return (
                      <motion.li
                        key={href}
                        custom={i}
                        variants={navItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={href}
                          className={cn(
                            'block font-fraunces text-2xl transition-colors duration-300',
                            isActive ? 'text-gold' : 'text-ivory/80 hover:text-ivory'
                          )}
                        >
                          {label}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* Bottom Actions */}
              <div className="flex flex-col gap-6 pt-8 border-t border-border/80">
                <Link
                  href="/contact"
                  className={cn(
                    'w-full inline-flex items-center justify-center gap-2',
                    'h-12 rounded-full bg-gold text-background font-inter text-xs font-semibold uppercase tracking-[0.16em]',
                    'hover:bg-gold-light transition-colors duration-300'
                  )}
                >
                  <span>Apply for a Strategy Call</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center justify-between text-xs text-muted-light font-inter">
                  <a
                    href="https://witlyn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    Studio: witlyn.com ↗
                  </a>
                  <a
                    href="mailto:Sakib@witlyn.com"
                    className="hover:text-gold transition-colors"
                  >
                    Sakib@witlyn.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
