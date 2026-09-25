'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { CondensationDroplet } from './condensation-droplet'

interface CondensationDividerProps {
  className?: string
  dropletPosition?: string // e.g. '68%'
  dropletDelay?: number
}

/**
 * CondensationDivider
 * 
 * Subtle horizontal condensation line between key sections:
 * - Ultra-thin frosted glass hairline with a center frosted mist band.
 * - Scattered static microscopic condensation beads along the chilled edge.
 * - Single rare active condensation droplet that slowly forms and beads downward.
 * - Used sparingly (1-2 times) across the homepage.
 */
export function CondensationDivider({
  className,
  dropletPosition = '68%',
  dropletDelay = 4,
}: CondensationDividerProps) {
  return (
    <div
      className={cn('relative w-full overflow-visible py-4 pointer-events-none select-none', className)}
      aria-hidden="true"
    >
      {/* ── Base Frosted Glass Seam ────────────────────────────────────────── */}
      <div className="relative w-full h-[1px]">
        {/* Hairline gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        
        {/* Subtle Frosted Moisture Band along center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-[3px] rounded-full pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
            filter: 'blur(1px)',
          }}
        />

        {/* ── Static Micro-Condensation Beads (Chilled Glass Texture) ──────── */}
        <span
          className="absolute -top-[1px] left-[32%] w-[2px] h-[2px] rounded-full bg-white/50"
          style={{ boxShadow: '0 0 3px rgba(255, 255, 255, 0.6)' }}
        />
        <span
          className="absolute -top-[1.5px] left-[45%] w-[3px] h-[3px] rounded-full bg-white/40"
          style={{ boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)' }}
        />
        <span
          className="absolute -top-[1px] left-[58%] w-[2px] h-[2px] rounded-full bg-white/45"
          style={{ boxShadow: '0 0 3px rgba(255, 255, 255, 0.5)' }}
        />
        <span
          className="absolute -top-[1.5px] left-[78%] w-[2.5px] h-[2.5px] rounded-full bg-white/40"
          style={{ boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)' }}
        />

        {/* ── Single Rare Active Condensation Droplet ──────────────────────── */}
        <div
          className="absolute -top-[2px]"
          style={{ left: dropletPosition }}
        >
          <CondensationDroplet delay={dropletDelay} duration={19} />
        </div>
      </div>
    </div>
  )
}
