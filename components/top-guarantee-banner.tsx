'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, CheckCircle2, AlertCircle } from 'lucide-react'

const OFFER_LINE = '72-Hour Commercial Offer — 25+ campaign assets in 72 hours, or you pay $0'

const inputCls =
  'w-full px-3.5 py-3 bg-transparent border border-[#292929] text-sm text-[#ece8e1] placeholder:text-[#5a5a5a] focus:outline-none focus:border-[#f4521c] transition-colors'

export function TopGuaranteeBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ brandName: '', email: '', website: '', primaryGoal: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consulting',
          name: formData.brandName || 'Brand Founder',
          email: formData.email,
          brandName: formData.brandName,
          websiteUrl: formData.website,
          message: `[72-Hour Offer Claimed] Primary goal: ${formData.primaryGoal || 'Not specified'}`,
        }),
      })
      const json = await res.json().catch(() => ({}))
      setStatus(res.ok && json?.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!isVisible) return null

  const items = Array.from({ length: 6 })

  return (
    <>
      <motion.aside
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-[#f4521c] text-[#050609] overflow-hidden select-none"
        aria-label="72-hour commercial offer"
      >
        <div className="flex items-stretch h-9 sm:h-10">
          {/* Marquee */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="relative flex-1 min-w-0 overflow-hidden text-left"
            aria-label="Open the 72-hour offer"
          >
            <div className="flex w-max animate-marquee items-center h-full">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-4 px-4 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.06em] font-medium whitespace-nowrap text-[#050609]"
                    >
                      {OFFER_LINE}
                      <span className="inline-block h-[7px] w-[7px] bg-[#050609]" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </button>

          {/* Claim + dismiss */}
          <div className="flex items-stretch shrink-0">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="group relative flex items-center gap-2 px-4 sm:px-6 bg-[#050609] text-[#f4521c] font-inter text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.02em] overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#ece8e1] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              <span className="relative group-hover:text-[#050609] transition-colors duration-500">Claim Offer</span>
              <ArrowRight className="relative w-3.5 h-3.5 group-hover:text-[#050609] transition-all duration-500 group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss offer banner"
              className="px-2.5 sm:px-3 bg-[#050609] text-[#8a8a8a] hover:text-[#ece8e1] border-l border-[#292929] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* ── Claim Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Claim the 72-hour offer">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-[#050609]/90"
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0b0c10] text-[#ece8e1] border border-[#292929] p-6 sm:p-8"
            >
              <div className="absolute top-0 inset-x-0 h-[3px] bg-[#f4521c]" />

              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 text-[#8a8a8a] hover:text-[#f4521c] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {status === 'success' ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-[#f4521c]" />
                  <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">Request received</h3>
                  <p className="text-sm text-[#bdb8b0] max-w-sm mx-auto leading-relaxed">
                    I review every brand personally and reply within 24 hours with next steps for your 72-hour campaign.
                  </p>
                  <button
                    onClick={() => { setModalOpen(false); setStatus('idle') }}
                    className="btn-acid px-6 py-2.5 text-xs mt-4"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="label-mono !text-[#f4521c] mb-3">// 72-Hour Offer</p>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-[-0.045em] leading-[0.95]">
                      Claim your 72-hour campaign
                    </h3>
                    <p className="text-sm text-[#8a8a8a] mt-3 leading-relaxed">
                      25+ ready-to-run campaign assets in 72 hours — or you pay $0.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="label-mono block mb-1.5">Brand name *</label>
                      <input type="text" required value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        placeholder="e.g. Solaé Skincare" className={inputCls} />
                    </div>
                    <div>
                      <label className="label-mono block mb-1.5">Email *</label>
                      <input type="email" required value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="founder@yourbrand.com" className={inputCls} />
                    </div>
                    <div>
                      <label className="label-mono block mb-1.5">Website or Instagram</label>
                      <input type="text" value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="yourbrand.com or @yourbrand" className={inputCls} />
                    </div>
                    <div>
                      <label className="label-mono block mb-1.5">Hero product or campaign goal</label>
                      <input type="text" value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        placeholder="e.g. Hydrating cleanser, Q4 Meta ads" className={inputCls} />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-start gap-2 border border-[#f4521c]/50 p-3 text-xs text-[#ece8e1]">
                        <AlertCircle className="w-4 h-4 shrink-0 text-[#f4521c]" />
                        <span>
                          Couldn&apos;t send right now. Email me directly at{' '}
                          <a href="mailto:Sakib@witlyn.com" className="underline text-[#f4521c]">Sakib@witlyn.com</a>.
                        </span>
                      </div>
                    )}

                    <button type="submit" disabled={status === 'submitting'}
                      className="btn-acid w-full py-3.5 text-sm disabled:opacity-50 mt-2">
                      {status === 'submitting' ? 'Sending…' : 'Claim the 72-hour offer'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-center text-[#8a8a8a]">No upfront payment. Reply within 24 hours.</p>
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
