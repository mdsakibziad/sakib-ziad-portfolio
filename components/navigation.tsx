'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/* ── Nav Links Config ──────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Work',             href: '/work' },
  { label: 'Consulting',       href: '/consulting' },
  { label: 'Digital Products', href: '/digital-products' },
  { label: 'Membership',       href: '/membership' },
  { label: 'About',            href: '/about' },
  { label: 'Insights',         href: '/insights' },
] as const

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? 'https://cal.com/sakib-ziad/strategy-call'

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

/* ── Navigation Component ──────────────────────────────────────────────────── */
export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  // Scroll listener — activates after 50 px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
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
  const closeMenu  = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      {/* ── Main Nav Bar ─────────────────────────────────────────────────── */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50',
          'transition-all duration-500 ease-luxury',
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent border-b border-transparent'
        )}
        role="banner"
      >
        <div className="container-luxury">
          <nav
            className="flex items-center justify-between h-[68px] md:h-[76px]"
            aria-label="Primary navigation"
          >
            {/* ── Wordmark / Logo ─────────────────────────────────────────── */}
            <Link
              href="/"
              className={cn(
                'font-fraunces font-light text-ivory text-xl md:text-2xl',
                'tracking-tight leading-none',
                'transition-opacity duration-300 hover:opacity-75',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm'
              )}
              aria-label="Sakib Ziad — home"
            >
              Sakib Ziad
            </Link>

            {/* ── Desktop Nav Links ───────────────────────────────────────── */}
            <ul
              className="hidden lg:flex items-center gap-7 xl:gap-9"
              role="list"
            >
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'font-inter text-label-sm uppercase tracking-widest',
                        'transition-colors duration-300',
                        'relative pb-0.5',
                        // Active indicator
                        'after:absolute after:inset-x-0 after:bottom-0 after:h-px',
                        'after:transition-all after:duration-300',
                        isActive
                          ? 'text-ivory after:bg-gold after:opacity-100'
                          : 'text-muted hover:text-ivory after:bg-ivory/0 hover:after:bg-ivory/30 hover:after:opacity-100'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* ── Desktop CTA ─────────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="group"
              >
                <Link href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                  Apply for a Call
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>

            {/* ── Mobile Hamburger ────────────────────────────────────────── */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              className={cn(
                'lg:hidden flex items-center justify-center',
                'h-10 w-10 rounded-full border border-border',
                'text-ivory transition-all duration-300',
                'hover:bg-ivory/8 hover:border-border-strong',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background'
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
                    <X className="h-4.5 w-4.5" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-4.5 w-4.5" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
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
              onClick={closeMenu}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm',
                'bg-surface border-l border-border',
                'flex flex-col',
                'lg:hidden',
                'overflow-y-auto'
              )}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between h-[68px] px-6 border-b border-border shrink-0">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="font-fraunces font-light text-ivory text-xl tracking-tight leading-none"
                >
                  Sakib Ziad
                </Link>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className={cn(
                    'flex items-center justify-center h-9 w-9 rounded-full border border-border',
                    'text-ivory transition-all duration-300 hover:bg-ivory/8'
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Drawer nav links */}
              <nav className="flex-1 px-6 py-8" aria-label="Mobile navigation">
                <ul className="space-y-1" role="list">
                  {NAV_LINKS.map(({ label, href }, i) => {
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
                          onClick={closeMenu}
                          className={cn(
                            'flex items-center justify-between w-full',
                            'py-3.5 border-b border-border/50',
                            'font-fraunces font-light text-2xl tracking-tight',
                            'transition-colors duration-300',
                            isActive ? 'text-ivory' : 'text-ivory/50 hover:text-ivory'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {label}
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                          )}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* Drawer footer CTA */}
              <div className="px-6 pb-8 pt-4 space-y-3 shrink-0">
                <Button asChild variant="default" size="lg" className="w-full group">
                  <Link
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    Apply for a Call
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <p className="text-center font-inter text-label-sm text-muted">
                  Limited spots available each month
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
