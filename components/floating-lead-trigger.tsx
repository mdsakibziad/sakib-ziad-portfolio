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
      {/* ── Persistent Floating Trigger (Bottom Right) ────────────────── */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => {
            setIsOpen(true)
            setHasPrompted(false)
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Request Free Creative Audit"
          className="group flex items-center gap-3 px-4 py-3 bg-[#050609] text-[#ece8e1] border border-[#292929] hover:border-[#f4521c] shadow-2xl transition-all duration-300"
        >
          <span className="w-2 h-2 bg-[#f4521c] block shrink-0" />
          <span className="label-mono !text-[11px] text-[#ece8e1] group-hover:text-[#f4521c] transition-colors">
            FREE CREATIVE AUDIT
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#f4521c] transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* ── High-Converting Lead Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-[#050609] text-[#ece8e1] border border-[#292929] p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-[#f4521c]" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 text-[#8a8a8a] hover:text-[#f4521c] border border-transparent hover:border-[#292929] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {status === 'success' ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 border border-[#f4521c] text-[#f4521c] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1]">
                    AUDIT DISPATCHED
                  </h3>
                  <p className="label-mono text-xs text-[#8a8a8a] max-w-sm mx-auto leading-relaxed">
                    Analyzing <span className="text-[#ece8e1]">{brandName}</span>. Your diagnostic breakdown and growth opportunities will arrive in your inbox shortly.
                  </p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="mt-4 rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]"
                  >
                    CLOSE WINDOW
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 label-mono !text-[#f4521c] mb-2">
                      <span className="w-2 h-2 bg-[#f4521c]" />
                      <span>FORENSIC BRAND DIAGNOSTIC</span>
                    </div>
                    <h3 className="font-inter font-black uppercase text-2xl sm:text-3xl text-[#ece8e1] leading-tight">
                      GET A FREE CREATIVE AUDIT
                    </h3>
                    <p className="label-mono text-xs text-[#8a8a8a] mt-2 leading-relaxed">
                      Discover why your ad creative fatigues within 14 days and how a 72-hour commercial system cuts acquisition costs.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                        BRAND NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. Solaé Skincare"
                        className="w-full px-4 py-2.5 bg-[#0b0c10] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] transition-colors rounded-none font-inter"
                      />
                    </div>

                    <div>
                      <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                        WEBSITE OR INSTAGRAM URL *
                      </label>
                      <input
                        type="text"
                        required
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="e.g. yourbrand.com or @yourbrand"
                        className="w-full px-4 py-2.5 bg-[#0b0c10] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] transition-colors rounded-none font-inter"
                      />
                    </div>

                    <div>
                      <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="founder@yourbrand.com"
                        className="w-full px-4 py-2.5 bg-[#0b0c10] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] transition-colors rounded-none font-inter"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="label-mono text-xs text-[#f4521c]">
                        Something went wrong. Please check your information and try again.
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full h-12 btn-acid rounded-none uppercase font-inter font-bold tracking-wider"
                    >
                      {status === 'loading' ? 'ANALYZING...' : 'DISPATCH AUDIT REPORT →'}
                    </Button>

                    <p className="label-mono text-[10px] text-[#8a8a8a] text-center pt-1">
                      CONFIDENTIAL · ZERO SPAM · READ PERSONALLY BY SAKIB ZIAD
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
