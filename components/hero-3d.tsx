'use client'

import React from 'react'
import { LiquidGlass3D } from '@/components/liquid-glass-3d'

/**
 * Hero3D
 * Understated, luxury 3D procedural liquid glass element for the Hero section.
 * Renders an organic morphing liquid droplet with physical transmission, internal caustics,
 * and gold particle dispersion. Guaranteed visible and performant on mobile and desktop.
 */
export function Hero3D() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <LiquidGlass3D
        className="w-full h-full min-h-[380px] sm:min-h-[500px]"
        variant="hero"
        interactive={true}
      />
    </div>
  )
}
