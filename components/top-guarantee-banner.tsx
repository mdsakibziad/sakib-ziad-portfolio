'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ArrowRight, X, Sparkles } from 'lucide-react'

export function TopGuaranteeBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('sz_guarantee_dismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem('sz_guarantee_dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 bg-[#121214] text-[#F9F8F6] border-b border-white/10 overflow-hidden shadow-lg"
        aria-label="Outcome Guarantee Offer"
      >
        {/* Subtle moving amber/gold gradient accent line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-400/20 via-amber-300 to-amber-400/20 animate-pulse" />

        <div className="container-luxury py-2.5 px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Left: Badge + The Hormozi Offer */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[10px] uppercase tracking-wider shrink-0 font-semibold animate-pulse">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Outcome Guarantee</span>
              </span>

              <p className="font-inter text-zinc-200 text-[11px] sm:text-xs truncate font-normal">
                <span className="font-semibold text-white">THE 72-HOUR COMMERCIAL OFFER:</span>{' '}
                We direct &amp; deliver a 25+ asset high-converting campaign in 72 hours—or you pay \$0.{' '}
                <span className="hidden md:inline text-zinc-400 font-light">
                  (Strictly 2 brand slots left for Q4)
                </span>
              </p>
            </div>

            {/* Right: Action CTA & Close Button */}
            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black hover:bg-zinc-200 text-[11px] font-inter font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <span>Claim Slot</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <button
                onClick={handleDismiss}
                aria-label="Dismiss announcement"
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
