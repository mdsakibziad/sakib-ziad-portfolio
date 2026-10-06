'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative bg-[#f4521c] text-[#050609] overflow-hidden select-none"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-luxury pt-16 sm:pt-24 pb-8">
        
        {/* ── 4-Column Header Grid (Exact Selora Characteristic) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start pb-16 sm:pb-24">
          
          {/* Col 1: Identity & Statement */}
          <div className="md:col-span-4 space-y-4">
            <span className="label-mono text-[#050609]/70 text-[11px] block">
              IDX/SZ — {CURRENT_YEAR}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] text-[#050609] leading-none">
              Sakib Ziad
            </h2>
            <p className="font-inter text-sm font-semibold max-w-xs text-[#050609]/85 leading-snug">
              Working between sensory conviction and rapid commercial systems for scaling beauty brands.
            </p>
          </div>

          {/* Col 2: Direct Contact & Studio */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <a
                href="mailto:Sakib@witlyn.com"
                className="text-2xl sm:text-3xl font-black tracking-tight text-[#050609] hover:opacity-75 transition-opacity block"
              >
                Sakib@witlyn.com
              </a>
              <span className="font-mono text-xs uppercase tracking-wider text-[#050609]/75 block mt-1 font-bold">
                COMMERCIAL INTAKE
              </span>
            </div>

            <div className="pt-2 font-mono text-xs text-[#050609]/80 leading-relaxed font-semibold">
              <span className="text-[#050609] uppercase block font-bold mb-1">STUDIO 2026</span>
              <p>Witlyn Commercial Studio</p>
              <p>Direct-Response &amp; Performance</p>
              <p>Available Worldwide</p>
            </div>
          </div>

          {/* Col 3: Navigation Menu */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-[#050609]/60 uppercase tracking-widest font-bold block mb-2">
              MENU
            </span>
            <ul className="space-y-1.5 font-bold uppercase tracking-wide">
              <li><Link href="/" className="hover:opacity-70 transition-opacity">HOME</Link></li>
              <li><Link href="/work" className="hover:opacity-70 transition-opacity">WORK</Link></li>
              <li><Link href="/consulting" className="hover:opacity-70 transition-opacity">ADVISORY</Link></li>
              <li><Link href="/about" className="hover:opacity-70 transition-opacity">ABOUT</Link></li>
              <li><Link href="/digital-products" className="hover:opacity-70 transition-opacity">PLAYBOOKS</Link></li>
              <li><Link href="/contact" className="hover:opacity-70 transition-opacity">CONTACT</Link></li>
              <li className="pt-2"><Link href="/privacy" className="text-[10px] text-[#050609]/75 hover:opacity-100">PRIVACY POLICY</Link></li>
              <li><Link href="/terms" className="text-[10px] text-[#050609]/75 hover:opacity-100">TERMS OF USE</Link></li>
            </ul>
          </div>

          {/* Col 4: Network & Social */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-[#050609]/60 uppercase tracking-widest font-bold block mb-2">
              SOCIAL
            </span>
            <ul className="space-y-1.5 font-bold uppercase tracking-wide">
              <li>
                <a href="https://www.linkedin.com/in/sakib-ziad-290104211/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  LINKEDIN
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/sakibziad/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/sakibziad.21" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  FACEBOOK
                </a>
              </li>
              <li>
                <a href="https://witlyn.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  WITLYN STUDIO
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Giant Wordmark (Exact Selora 24vw Black Display Characteristic) ── */}
        <div className="w-full text-center overflow-hidden select-none pointer-events-none border-t border-[#050609]/15 pt-8 sm:pt-12">
          <p className="font-inter font-black uppercase text-[clamp(3.5rem,15vw,22rem)] leading-[0.76] tracking-[-0.06em] text-[#050609] m-0 p-0 whitespace-nowrap text-center">
            SAKIB ZIAD
          </p>
        </div>

        {/* ── Bottom Bar (Exact Selora Layout) ── */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-[#050609]/85 font-medium border-t border-[#050609]/20">
          <p>© {CURRENT_YEAR} Sakib Ziad. All work, all rights.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#050609] font-bold hover:opacity-75 transition-opacity"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>BACK TO TOP</span>
          </button>
        </div>

      </div>
    </footer>
  )
}
