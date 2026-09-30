'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ArrowRight, X, Sparkles, CheckCircle2, Clock, Zap } from 'lucide-react'

export function TopGuaranteeBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    website: '',
    primaryGoal: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consulting',
          name: formData.brandName || 'Brand Founder',
          email: formData.email,
          brandName: formData.brandName,
          websiteUrl: formData.website,
          message: `[72-Hour Outcome Guarantee Claimed] Primary Goal: ${formData.primaryGoal || 'High-Converting Skincare Campaign'}`,
        }),
      })
      setStatus('success')
    } catch {
      setStatus('success')
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* ── Luminous Animated Banner (Positioned Below Main Navbar) ──────── */}
      <motion.aside
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-gradient-to-r from-[#2A2008] via-[#3D2C0A] to-[#2A2008] text-white border-y border-amber-400/50 shadow-[0_4px_24px_rgba(217,119,6,0.3)] backdrop-blur-xl relative overflow-hidden select-none shrink-0 z-40"
        aria-label="Outcome Guarantee Offer"
      >
        {/* Shimmering Top Accent Beam */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent animate-pulse" />

        <div className="container-luxury py-2 sm:py-2.5 px-3 sm:px-6">
          {/* Mobile View (< sm) */}
          <div className="flex sm:hidden items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-black font-mono text-[9px] uppercase font-bold shrink-0 shadow-sm animate-pulse">
                <Zap className="w-2.5 h-2.5 fill-black" />
                <span>72H Offer</span>
              </span>
              <span className="text-[11px] font-inter text-amber-100 font-medium truncate">
                25+ Campaign Assets in 72h or $0
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 text-black text-[11px] font-inter font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(251,191,36,0.8)] active:scale-95 transition-all"
              >
                <span>Claim</span>
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss banner"
                className="p-1 rounded text-amber-200 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Desktop View (>= sm) */}
          <div className="hidden sm:flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-mono text-[10px] uppercase tracking-wider shrink-0 font-bold shadow-[0_0_14px_rgba(251,191,36,0.6)] animate-pulse">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Outcome Guarantee</span>
              </span>

              <p className="font-inter text-amber-50 text-xs truncate font-normal">
                <strong className="font-bold text-amber-300 tracking-wide uppercase">The 72-Hour Commercial Offer:</strong>{' '}
                We direct &amp; deliver a 25+ asset high-converting campaign in 72 hours—or you pay $0.{' '}
                <span className="text-amber-200/80 font-light">
                  (Strictly 2 brand slots reserved for Q4)
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-white hover:to-amber-300 text-black text-xs font-inter font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.7)] active:scale-95 cursor-pointer"
              >
                <span>Claim 72H Slot</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss banner"
                className="p-1 rounded text-amber-200 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* ── Smart Instant Claim Modal (No Contact Redirect!) ──────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl bg-[#121214] text-white border border-amber-400/40 p-6 sm:p-8 shadow-[0_24px_80px_rgba(217,119,6,0.25)] overflow-hidden"
            >
              {/* Gold Top Light */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {status === 'success' ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-fraunces text-2xl text-white">
                    72-Hour Guarantee Slot Locked!
                  </h3>
                  <p className="font-inter text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                    Thank you. We review your brand details within 24 hours. If admitted, your 25+ campaign assets will be scheduled for 72-hour delivery under our zero-risk outcome guarantee.
                  </p>
                  <button
                    onClick={() => {
                      setModalOpen(false)
                      setStatus('idle')
                    }}
                    className="px-6 py-2 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors mt-4"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[10px] uppercase font-semibold mb-3">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Strictly 2 Brand Slots for Q4</span>
                    </div>
                    <h3 className="font-fraunces text-2xl sm:text-3xl text-white font-medium leading-tight">
                      Claim Your 72-Hour Commercial Offer
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                      We direct &amp; deliver a 25+ asset high-converting campaign in 72 hours—or you pay $0. Reserve your priority review below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        placeholder="e.g. Solaé Skincare"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Founder / Marketing Lead Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="founder@yourbrand.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Website or Instagram (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="yourbrand.com or @yourbrand"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Primary SKU or Campaign Goal
                      </label>
                      <input
                        type="text"
                        value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        placeholder="e.g. Hydrating Cleanser Q4 Meta Ads"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-white hover:to-amber-300 text-black font-inter font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-[0_0_24px_rgba(251,191,36,0.6)] cursor-pointer disabled:opacity-50 mt-2"
                    >
                      {status === 'submitting' ? 'Reserving...' : 'Lock In 72-Hour Guarantee Slot →'}
                    </button>
                    
                    <p className="text-[10px] text-center text-zinc-400">
                      Zero upfront commitment · Underwritten by the 72-hour outcome guarantee.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
