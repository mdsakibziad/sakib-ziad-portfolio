'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, ArrowRight, X } from 'lucide-react'

export function TopGuaranteeBanner() {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <aside
      className="w-full bg-[#111113] text-[#F9F8F6] border-b border-amber-400/30 overflow-hidden shadow-md select-none shrink-0"
      aria-label="Outcome Guarantee Offer"
    >
      {/* Moving gold accent line */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-amber-400/20 via-amber-300 to-amber-400/20" />

      <div className="container-luxury py-1.5 sm:py-2 px-3 sm:px-6">
        {/* Mobile View (< sm) */}
        <div className="flex sm:hidden items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[9px] uppercase tracking-wider shrink-0 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>72H Guarantee</span>
            </span>
            <span className="text-[11px] font-inter text-zinc-200 truncate font-normal">
              25+ Campaign Assets in 72h or $0
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-black hover:bg-zinc-200 text-[10px] font-inter font-semibold uppercase tracking-wider transition-all"
            >
              <span>Claim</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Desktop View (>= sm) */}
        <div className="hidden sm:flex items-center justify-between gap-3 text-xs">
          {/* Left: Badge + Copy */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[10px] uppercase tracking-wider shrink-0 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Outcome Guarantee</span>
            </span>

            <p className="font-inter text-zinc-200 text-xs truncate font-normal">
              <span className="font-semibold text-white">THE 72-HOUR COMMERCIAL OFFER:</span>{' '}
              We direct &amp; deliver a 25+ asset high-converting campaign in 72 hours—or you pay $0.{' '}
              <span className="hidden lg:inline text-zinc-400 font-light">
                (Strictly 2 brand slots left for Q4)
              </span>
            </p>
          </div>

          {/* Right: Action CTA & Close Button */}
          <div className="flex items-center gap-2.5 shrink-0 ml-auto">
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
    </aside>
  )
}
