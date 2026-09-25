'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CondensationDropletProps {
  className?: string
  style?: React.CSSProperties
  delay?: number
  duration?: number
}

/**
 * CondensationDroplet
 * 
 * A subtle, rare condensation water droplet beading on cold glass:
 * - Forms slowly over several seconds as moisture condenses on the cold surface.
 * - Pauses as surface tension holds the droplet in place.
 * - Slowly slides downward along the glass pane, trailing a microscopic moisture streak.
 * - Evaporates gently and resets on an 18-22 second loop.
 * - 100% pure CSS keyframes with zero runtime performance cost.
 */
export function CondensationDroplet({
  className,
  style,
  delay = 0,
  duration = 18,
}: CondensationDropletProps) {
  return (
    <div
      className={cn('absolute pointer-events-none select-none z-20', className)}
      style={style}
      aria-hidden="true"
    >
      <div
        className="relative animate-condensation-slide"
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
        }}
      >
        {/* Microscopic moisture trail left behind the sliding droplet */}
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[1px] h-6 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 70%, transparent 100%)',
          }}
        />

        {/* Tactile Water Droplet Body */}
        <div
          className="relative w-2 h-2.5 rounded-[50%_50%_60%_60%] backdrop-blur-[2px]"
          style={{
            background:
              'linear-gradient(175deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.22) 50%, rgba(255, 255, 255, 0.06) 100%)',
            border: '0.5px solid rgba(255, 255, 255, 0.35)',
            boxShadow:
              '0 2px 4px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 0 6px rgba(255, 255, 255, 0.25)',
          }}
        >
          {/* Top specular reflection point (cold light bounce) */}
          <span className="absolute top-[1.5px] left-[1.5px] w-0.5 h-0.5 rounded-full bg-white opacity-95 shadow-[0_0_2px_#ffffff]" />
        </div>
      </div>
    </div>
  )
}
