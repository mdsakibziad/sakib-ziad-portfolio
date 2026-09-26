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
          className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[1px] h-6 pointer-events-none bg-gradient-to-t from-black/[0.08] dark:from-white/35 to-transparent"
        />

        {/* Tactile Water Droplet Body (Shadow depth on light, specular glow on dark) */}
        <div
          className={cn(
            'relative w-2 h-2.5 rounded-[50%_50%_60%_60%] backdrop-blur-[2px]',
            'border border-black/[0.1] dark:border-white/35',
            'bg-gradient-to-b from-white/90 via-white/40 to-transparent dark:from-white/65 dark:via-white/20 dark:to-white/5',
            'shadow-[0_2px_6px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.9),0_0_6px_rgba(255,255,255,0.25)]'
          )}
        >
          {/* Top specular reflection point (ambient light bounce) */}
          <span className="absolute top-[1.5px] left-[1.5px] w-0.5 h-0.5 rounded-full bg-white opacity-95 shadow-[0_0_2px_#ffffff]" />
        </div>
      </div>
    </div>
  )
}
