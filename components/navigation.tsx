'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { TopGuaranteeBanner } from './top-guarantee-banner'

const NAV_LINKS = [
  { label: 'Work',       href: '/work' },
  { label: 'Consulting', href: '/consulting' },
  { label: 'Membership', href: '/membership' },
  { label: 'About',      href: '/about' },
  { label: 'Contact',    href: '/contact' },
] as const

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Supabase Auth listener
  useEffect(() => {
    if (!isSupabaseConfigured()) return
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setCurrentUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setCurrentUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  return (
    <>
      {/* ── Fixed Top Bar (Selora Exact Top Navigation) ───────────── */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-colors duration-400',
          scrolled
            ? 'bg-[#050609]/95 backdrop-blur-md border-b border-[#292929]'
            : 'bg-transparent border-b border-transparent'
        )}
        role="banner"
      >
        <div className="container-luxury">
            <nav
              className="flex items-center justify-between h-16 sm:h-20"
              aria-label="Primary navigation"
            >
              {/* ── Left: Wordmark with staggered acid hover ── */}
              <Link
                href="/"
                className="group flex items-baseline gap-2 focus-visible:outline-none"
                aria-label="Sakib Ziad — Home"
              >
                <span className="font-inter font-black uppercase text-xl sm:text-2xl tracking-[-0.05em] text-[#ece8e1] flex">
                  {'SAKIB ZIAD'.split('').map((char, index) => (
                    <span
                      key={index}
                      className="inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-[#f4521c]"
                      style={{ transitionDelay: `${index * 20}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <span className="label-mono hidden md:inline-block !text-[#8a8a8a] text-[10px]">
                  // STRATEGIST
                </span>
              </Link>

              {/* ── Desktop Nav Links (Text-roll hover) ── */}
              <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = pathname === href || pathname.startsWith(`${href}/`)
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        'roll-link font-inter text-[13px] font-bold uppercase tracking-[-0.01em]',
                        isActive ? 'text-[#f4521c]' : 'text-[#ece8e1]'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{label}</span>
                      <span>{label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* ── Desktop Right: Auth + Acid Action Button ── */}
              <div className="hidden lg:flex items-center gap-6">
                {currentUser ? (
                  <Link
                    href="/account"
                    className="label-mono hover:!text-[#f4521c] flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-[#f4521c]" />
                    <span>{currentUser.user_metadata?.full_name?.split(' ')[0] || 'Account'}</span>
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className="text-xs font-mono uppercase font-bold text-[#ece8e1] px-4 py-2 border border-[#383838] bg-[#111216]/90 hover:border-[#f4521c] hover:text-[#f4521c] transition-all tracking-wider"
                  >
                    Sign In
                  </Link>
                )}

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden xl:flex text-xs font-mono uppercase font-bold text-[#ece8e1] px-3.5 py-2 border border-[#383838] bg-[#111216]/90 hover:border-[#f4521c] hover:text-[#f4521c] transition-all tracking-wider items-center gap-1.5"
                  title="View official 1-page résumé"
                >
                  <span>Résumé (PDF)</span>
                  <ArrowUpRight className="h-3 w-3 text-[#f4521c]" />
                </a>

                <Link
                  href="/contact"
                  className="btn-acid h-10 px-5 text-xs font-bold"
                >
                  <span>Apply for a Call</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* ── Mobile Menu Trigger ── */}
              <div className="flex items-center gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={toggleMenu}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-nav-drawer"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  className="h-10 px-3 border border-[#292929] bg-[#0b0c10] text-[#ece8e1] label-mono flex items-center gap-2 hover:border-[#f4521c] transition-colors"
                >
                  <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
                  <div className="w-1.5 h-1.5 bg-[#f4521c]" />
                </button>
              </div>
            </nav>
          </div>
        </header>

      {/* ── Mobile Full-Screen Overlay Menu (Selora Style) ─────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-50 bg-[#050609] text-[#ece8e1] flex flex-col justify-between p-6 sm:p-12 lg:hidden overflow-y-auto"
          >
            {/* Grain background layer */}
            <div className="absolute inset-0 grain" aria-hidden="true" />

            {/* Top Bar inside overlay */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#292929] pb-6">
              <span className="label-mono !text-[#f4521c]">// NAVIGATION</span>
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Close menu"
                className="label-mono flex items-center gap-2 text-[#ece8e1] hover:text-[#f4521c] transition-colors"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Giant Typography Links */}
            <div className="relative z-10 py-10 space-y-4">
              {NAV_LINKS.map(({ label, href }, index) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`)
                return (
                  <motion.div
                    key={href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'block text-[11vw] sm:text-[9vw] font-inter font-black uppercase tracking-[-0.05em] leading-[0.9] hover:text-[#f4521c] transition-colors',
                        isActive ? 'text-[#f4521c]' : 'text-[#ece8e1]'
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom Details & CTA */}
            <div className="relative z-10 pt-6 border-t border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="label-mono !text-[#ece8e1]">SAKIB ZIAD</p>
                <p className="label-mono">BEAUTY & SKINCARE CREATIVE STRATEGIST</p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <a
                  href="/resume.pdf"
                  download="Sakib_Ziad_Resume.pdf"
                  className="px-4 py-3 border border-[#383838] bg-[#111216]/90 text-xs font-mono uppercase font-bold text-[#ece8e1] hover:border-[#f4521c] hover:text-[#f4521c] text-center tracking-wider transition-all"
                >
                  Download Résumé (PDF)
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn-acid w-full sm:w-auto h-12 px-6 text-xs"
                >
                  <span>Apply for a Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
