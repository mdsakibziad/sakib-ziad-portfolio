'use client'

import React from 'react'

/**
 * AmbientHeroAtmosphere
 * 
 * Pure CSS ambient lighting & suspended liquid-glass micro-particles:
 * - Soft diffuse radial gradient glow drifting slowly on an 18-second loop.
 * - 20 soft-edged liquid micro-particles / air bubbles with gentle vertical drift and horizontal sway.
 * - Heavily blurred edges with low opacity (10-25%) — NOT stars, NO twinkling.
 * - 100% CSS keyframes, zero Three.js/WebGL, zero runtime JS overhead.
 */

// 20 pre-configured particles with staggered positions, sizes, and slow loop durations
const PARTICLES = [
  { id: 1,  left: '12%', top: '25%', size: 3, opacity: 0.16, blur: 1.5, duration: 28, delay: 0 },
  { id: 2,  left: '22%', top: '65%', size: 5, opacity: 0.22, blur: 2.0, duration: 32, delay: 4 },
  { id: 3,  left: '28%', top: '35%', size: 2, opacity: 0.14, blur: 1.0, duration: 26, delay: 8 },
  { id: 4,  left: '38%', top: '18%', size: 4, opacity: 0.18, blur: 2.0, duration: 34, delay: 2 },
  { id: 5,  left: '45%', top: '75%', size: 6, opacity: 0.20, blur: 2.5, duration: 30, delay: 10 },
  { id: 6,  left: '52%', top: '30%', size: 3, opacity: 0.15, blur: 1.5, duration: 25, delay: 5 },
  { id: 7,  left: '60%', top: '55%', size: 4, opacity: 0.22, blur: 2.0, duration: 36, delay: 1 },
  { id: 8,  left: '68%', top: '22%', size: 2, opacity: 0.12, blur: 1.0, duration: 27, delay: 12 },
  { id: 9,  left: '75%', top: '68%', size: 5, opacity: 0.18, blur: 2.5, duration: 33, delay: 7 },
  { id: 10, left: '84%', top: '38%', size: 3, opacity: 0.16, blur: 1.5, duration: 29, delay: 3 },
  { id: 11, left: '16%', top: '48%', size: 4, opacity: 0.15, blur: 2.0, duration: 35, delay: 9 },
  { id: 12, left: '32%', top: '82%', size: 3, opacity: 0.18, blur: 1.5, duration: 31, delay: 14 },
  { id: 13, left: '48%', top: '45%', size: 2, opacity: 0.12, blur: 1.0, duration: 24, delay: 6 },
  { id: 14, left: '58%', top: '15%', size: 5, opacity: 0.20, blur: 2.5, duration: 37, delay: 11 },
  { id: 15, left: '72%', top: '42%', size: 3, opacity: 0.14, blur: 1.5, duration: 26, delay: 15 },
  { id: 16, left: '88%', top: '72%', size: 4, opacity: 0.17, blur: 2.0, duration: 30, delay: 8 },
  { id: 17, left: '25%', top: '12%', size: 2, opacity: 0.10, blur: 1.0, duration: 23, delay: 13 },
  { id: 18, left: '64%', top: '85%', size: 6, opacity: 0.22, blur: 3.0, duration: 38, delay: 5 },
  { id: 19, left: '80%', top: '18%', size: 3, opacity: 0.15, blur: 1.5, duration: 27, delay: 2 },
  { id: 20, left: '42%', top: '60%', size: 4, opacity: 0.19, blur: 2.0, duration: 33, delay: 16 },
]

export function AmbientHeroAtmosphere() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* ── Soft Drifting Ambient Glow (Center Anchor) ──────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] rounded-full pointer-events-none animate-ambient-drift"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.055) 0%, rgba(255, 255, 255, 0.018) 42%, transparent 72%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ── Secondary Ambient Diffusion (Upper-Right Accent) ───────────────── */}
      <div
        className="absolute top-[20%] right-[15%] w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full pointer-events-none animate-ambient-drift-alt"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.008) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Suspended Liquid Micro-Particles / Air Bubbles ─────────────────── */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-liquid-bubble"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.35)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
