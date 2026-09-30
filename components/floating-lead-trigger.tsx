'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FloatingLeadTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasPrompted, setHasPrompted] = useState(false)
  const [brandName, setBrandName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [email, setEmail] = useState('')
  const [primaryChallenge, setPrimaryChallenge] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Automatically tease after 12 seconds of high intent reading
  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyEngaged = sessionStorage.getItem('sz_lead_engaged')
      if (!alreadyEngaged) {
        setHasPrompted(true)
      }
    }, 12000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          websiteUrl: websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`,
          primaryChallenge: primaryChallenge || 'Requesting forensic ad creative friction audit.',
          email,
        }),
      })

      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      sessionStorage.setItem('sz_lead_engaged', 'true')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ── Persistent Floating Trigger Pill (Bottom Right) ────────────────── */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => {
            setIsOpen(true)
            setHasPrompted(false)
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Request Free Creative Audit"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#141416] dark:bg-white text-white dark:text-black shadow-2xl border border-white/20 dark:border-black/10 text-xs font-inter font-semibold uppercase tracking-wider transition-all duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Free Creative Audit</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* ── High-Converting Lead Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0E0E10] text-[#F9F8F6] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {status === 'success' ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-fraunces text-2xl text-white font-medium">
                    Audit Dispatched to Your Inbox
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
                    We are analyzing <span className="text-white font-medium">{brandName}</span>. Your diagnostic breakdown and growth opportunities will arrive shortly.
                  </p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="mt-4"
                  >
                    Close Window
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono text-[10px] uppercase tracking-widest mb-3">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Forensic Brand Diagnostic</span>
                    </div>
                    <h3 className="font-fraunces text-2xl sm:text-3xl text-white font-medium">
                      Get a Free Creative Audit
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1.5 leading-relaxed">
                      Discover why your ad creative fatigues within 14 days and how a 72-hour commercial system cuts customer acquisition costs.
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
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. Solaé Skincare"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Website or Instagram URL *
                      </label>
                      <input
                        type="text"
                        required
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="e.g. yourbrand.com or @yourbrand"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="founder@yourbrand.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-red-400">
                        Something went wrong. Please check your information and try again.
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={status === 'loading'}
                      variant="gold"
                      size="lg"
                      className="w-full mt-2"
                    >
                      {status === 'loading' ? 'Analyzing Brand...' : 'Generate My Creative Audit →'}
                    </Button>

                    <p className="text-[10px] font-mono text-zinc-500 text-center">
                      Strictly confidential · Zero spam · Read personally by Sakib Ziad
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
