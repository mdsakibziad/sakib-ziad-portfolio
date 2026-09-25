'use client'

import React from 'react'

/**
 * AmbientHeroAtmosphere
 * 
 * Cold Liquid-Glass Atmosphere:
 * - Crisp, clinical monochrome ambient light (pure white & cool silver-grey, zero blue).
 * - Upper specular horizon rim simulating cold studio light reflecting across a chilled glass pane.
 * - 20 suspended particles:
 *   - 15 particles behave as slow-drifting liquid air bubbles (upward float with gentle sway).
 *   - 5 particles behave as condensation droplets sliding slowly downward on cold glass with faint trailing streaks.
 * - 100% CSS keyframes, zero Three.js/WebGL, zero runtime JS overhead.
 */

interface ParticleConfig {
  id: number
  type: 'bubble' | 'droplet'
  left: string
  top: string
  size: number
  opacity: number
  blur: number
  duration: number
  delay: number
  streakLength?: number
}

// 20 pre-configured particles with staggered positions, sizes, and slow loop durations
const PARTICLES: ParticleConfig[] = [
  { id: 1,  type: 'bubble',  left: '12%', top: '25%', size: 3,   opacity: 0.16, blur: 1.5, duration: 28, delay: 0 },
  { id: 2,  type: 'bubble',  left: '22%', top: '65%', size: 5,   opacity: 0.22, blur: 2.0, duration: 32, delay: 4 },
  { id: 3,  type: 'droplet', left: '26%', top: '22%', size: 3.5, opacity: 0.28, blur: 0.5, duration: 18, delay: 2, streakLength: 16 },
  { id: 4,  type: 'bubble',  left: '38%', top: '18%', size: 4,   opacity: 0.18, blur: 2.0, duration: 34, delay: 2 },
  { id: 5,  type: 'bubble',  left: '45%', top: '75%', size: 6,   opacity: 0.20, blur: 2.5, duration: 30, delay: 10 },
  { id: 6,  type: 'bubble',  left: '52%', top: '30%', size: 3,   opacity: 0.15, blur: 1.5, duration: 25, delay: 5 },
  { id: 7,  type: 'droplet', left: '62%', top: '26%', size: 4,   opacity: 0.30, blur: 0.5, duration: 22, delay: 7, streakLength: 20 },
  { id: 8,  type: 'bubble',  left: '68%', top: '22%', size: 2,   opacity: 0.12, blur: 1.0, duration: 27, delay: 12 },
  { id: 9,  type: 'bubble',  left: '75%', top: '68%', size: 5,   opacity: 0.18, blur: 2.5, duration: 33, delay: 7 },
  { id: 10, type: 'bubble',  left: '84%', top: '38%', size: 3,   opacity: 0.16, blur: 1.5, duration: 29, delay: 3 },
  { id: 11, type: 'droplet', left: '18%', top: '44%', size: 3,   opacity: 0.25, blur: 0.5, duration: 20, delay: 11, streakLength: 14 },
  { id: 12, type: 'bubble',  left: '32%', top: '82%', size: 3,   opacity: 0.18, blur: 1.5, duration: 31, delay: 14 },
  { id: 13, type: 'bubble',  left: '48%', top: '45%', size: 2,   opacity: 0.12, blur: 1.0, duration: 24, delay: 6 },
  { id: 14, type: 'bubble',  left: '58%', top: '15%', size: 5,   opacity: 0.20, blur: 2.5, duration: 37, delay: 11 },
  { id: 15, type: 'droplet', left: '74%', top: '34%', size: 3.5, opacity: 0.27, blur: 0.5, duration: 24, delay: 5, streakLength: 18 },
  { id: 16, type: 'bubble',  left: '88%', top: '72%', size: 4,   opacity: 0.17, blur: 2.0, duration: 30, delay: 8 },
  { id: 17, type: 'bubble',  left: '25%', top: '12%', size: 2,   opacity: 0.10, blur: 1.0, duration: 23, delay: 13 },
  { id: 18, type: 'droplet', left: '66%', top: '58%', size: 4,   opacity: 0.30, blur: 0.5, duration: 26, delay: 15, streakLength: 22 },
  { id: 19, type: 'bubble',  left: '80%', top: '18%', size: 3,   opacity: 0.15, blur: 1.5, duration: 27, delay: 2 },
  { id: 20, type: 'bubble',  left: '42%', top: '60%', size: 4,   opacity: 0.19, blur: 2.0, duration: 33, delay: 16 },
]

export function AmbientHeroAtmosphere() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* ── Cold Studio Horizon Specular Rim Light ─────────────────────────── */}
      <div
        className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[720px] sm:w-[950px] lg:w-[1200px] h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.18) 50%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* ── Cold Specular Ambient Core Glow (Centered) ────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] rounded-full pointer-events-none animate-ambient-drift"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.075) 0%, rgba(240, 240, 248, 0.02) 38%, transparent 68%)',
          filter: 'blur(55px)',
        }}
      />

      {/* ── Secondary Ambient Diffusion (Upper-Right Accent) ───────────────── */}
      <div
        className="absolute top-[18%] right-[14%] w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full pointer-events-none animate-ambient-drift-alt"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.045) 0%, rgba(240, 240, 248, 0.01) 48%, transparent 70%)',
          filter: 'blur(75px)',
        }}
      />

      {/* ── Suspended Liquid Particles & Sliding Condensation Droplets ─────── */}
      {PARTICLES.map((p) => {
        if (p.type === 'droplet') {
          // Condensation droplet sliding slowly downward with a faint vertical trailing streak
          return (
            <div
              key={p.id}
              className="absolute pointer-events-none animate-droplet-particle"
              style={{
                left: p.left,
                top: p.top,
                animationDuration: `${p.duration}s`,
                animationDelay: `-${p.delay}s`,
              }}
            >
              {/* Faint trailing condensation streak above droplet */}
              <span
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  bottom: `${p.size - 1}px`,
                  width: '1px',
                  height: `${p.streakLength || 16}px`,
                  background:
                    'linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.12) 60%, transparent 100%)',
                  opacity: p.opacity * 1.2,
                }}
              />
              {/* Droplet head with specular reflection */}
              <span
                className="block rounded-full pointer-events-none"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size * 1.15}px`,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  opacity: p.opacity,
                  filter: `blur(${p.blur}px)`,
                  boxShadow: `0 1px 3px rgba(0, 0, 0, 0.6), 0 0 ${p.size * 2}px rgba(255, 255, 255, 0.45)`,
                }}
              />
            </div>
          )
        }

        // Standard liquid bubble floating slowly upward
        return (
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
        )
      })}
    </div>
  )
}
