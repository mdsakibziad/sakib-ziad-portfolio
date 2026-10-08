'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-white/40 dark:bg-black/40 backdrop-blur-md border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ── Left Links (Desktop) ── */}
          <nav className="hidden md:flex items-center gap-8 flex-1" aria-label="Left navigation">
            <Link
              href="/work"
              className={cn(
                'text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                pathname.startsWith('/work')
                  ? 'text-black dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400'
              )}
            >
              Work
            </Link>
            <Link
              href="/services"
              className={cn(
                'text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                pathname === '/services'
                  ? 'text-black dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400'
              )}
            >
              Services
            </Link>
          </nav>

          {/* ── Center: Logo "SAKIB ZIAD" ── */}
          <div className="flex justify-start md:justify-center">
            <Link
              href="/"
              className="text-base sm:text-lg font-bold tracking-[0.16em] uppercase text-black dark:text-white hover:opacity-80 transition-opacity"
              aria-label="Sakib Ziad — Home"
            >
              SAKIB ZIAD
            </Link>
          </div>

          {/* ── Right: Links, Toggle, Pill Button (Desktop) ── */}
          <div className="hidden md:flex items-center justify-end gap-6 flex-1">
            <Link
              href="/about"
              className={cn(
                'text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                pathname === '/about'
                  ? 'text-black dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400'
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                'text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
                pathname === '/contact'
                  ? 'text-black dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400'
              )}
            >
              Contact
            </Link>

            {/* Dark / Light Toggle */}
            <ThemeToggle />

            {/* Pill Button "Book a call" */}
            <Link
              href="/contact#book"
              className="group inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 min-h-[44px]"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* ── Mobile Right: Toggle & Hamburger ── */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.06] text-black dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-black/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-black/95 backdrop-blur-2xl px-6 py-8 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4 text-base font-medium">
            <Link
              href="/work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white py-1"
            >
              Work
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white py-1"
            >
              Services
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white py-1"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white py-1"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
            <Link
              href="/contact#book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium bg-black text-white dark:bg-white dark:text-black min-h-[48px]"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
