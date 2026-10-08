'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Download,
  Calendar,
  Send,
  Sparkles,
  CheckCircle2,
  Mail,
  Linkedin,
  Instagram,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

export default function ContactPage() {
  // Message Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brandWebsite: '',
    need: 'Strategy call',
    message: '',
    botField: '', // Honeypot spam protection
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState(false)
  const [messageError, setMessageError] = useState('')

  // Gap Snapshot Form State
  const [gapData, setGapData] = useState({
    brandName: '',
    websiteUrl: '',
    email: '',
    primaryChallenge: 'Audit current creative hooks and identify ad growth opportunities.',
    botField: '', // Honeypot spam protection
  })
  const [gapSubmitting, setGapSubmitting] = useState(false)
  const [gapSuccess, setGapSuccess] = useState(false)
  const [gapError, setGapError] = useState('')

  const calUrl =
    process.env.NEXT_PUBLIC_CAL_LINK || 'https://cal.com/sakib-ziad/strategy-call'

  // Submit Message Form
  async function handleMessageSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (formData.botField) return // Bot trap triggered

    setIsSubmitting(true)
    setMessageError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'general',
          name: formData.name,
          email: formData.email,
          brandWebsite: formData.brandWebsite,
          whatDoYouNeed: formData.need,
          message: formData.message,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.')
      }

      setMessageSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setMessageError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Submit Gap Snapshot Form
  async function handleGapSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (gapData.botField) return

    setGapSubmitting(true)
    setGapError('')

    try {
      let formattedUrl = gapData.websiteUrl.trim()
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`
      }

      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: gapData.brandName || formattedUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0],
          websiteUrl: formattedUrl,
          email: gapData.email,
          primaryChallenge: gapData.primaryChallenge,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to generate report. Please check the URL and try again.')
      }

      setGapSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setGapError(msg)
    } finally {
      setGapSubmitting(false)
    }
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Recruiter Line */}
        <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
          <p className="text-neutral-700 dark:text-neutral-300 font-medium">
            Hiring? Download my résumé or message me directly.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Sakib_Ziad_Resume.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download résumé (PDF)</span>
            </a>
            <span className="text-neutral-400">·</span>
            <a
              href="mailto:Sakib@witlyn.com"
              className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:underline"
            >
              Sakib@witlyn.com
            </a>
          </div>
        </div>

        {/* Page Title */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-neutral-900 dark:text-neutral-50">
            Let&apos;s talk
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            Whether you want to discuss a new campaign, book strategic advisory, or explore hiring, I review every inquiry personally.
          </p>
        </div>

        {/* Two-Column Booking & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Booking Widget */}
          <div className="lg:col-span-5 rounded-2xl p-8 border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                <Calendar className="w-4 h-4" />
                <span>Direct Calendar</span>
              </div>
              <h2 className="text-2xl font-serif tracking-tight text-neutral-900 dark:text-neutral-100">
                Book a 30-minute strategy call.
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Pick a time directly on my calendar. We will review your current ad performance, unpack your creative friction, and outline 3 concrete angles tailored to your brand.
              </p>

              <div className="pt-2 space-y-2 text-xs text-neutral-500 font-mono">
                <p>✓ 1:1 direct consultation with Sakib Ziad</p>
                <p>✓ No sales fluff or agency friction</p>
                <p>✓ Actionable recommendations you can use immediately</p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800 space-y-4">
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white transition-colors"
              >
                <span>Open Calendar (Cal.com)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <p className="text-center text-xs text-neutral-400">
                Prefer email first? Use the form on the right.
              </p>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 rounded-2xl p-8 sm:p-10 border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md">
            {messageSuccess ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-neutral-900 dark:text-neutral-100 mx-auto" />
                <h3 className="text-2xl font-serif text-neutral-900 dark:text-neutral-100">
                  Message received.
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. I review every submission personally and will get back to you within 24 to 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMessageSuccess(false)
                    setFormData({
                      name: '',
                      email: '',
                      brandWebsite: '',
                      need: 'Strategy call',
                      message: '',
                      botField: '',
                    })
                  }}
                  className="mt-4 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-neutral-900 dark:text-neutral-100">
                    Send a message
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Fill out the details below and I will respond to your inbox directly.
                  </p>
                </div>

                {/* Spam Protection Honeypot */}
                <input
                  type="text"
                  name="company_trap"
                  value={formData.botField}
                  onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Brand Website
                    </label>
                    <input
                      type="text"
                      placeholder="brandname.com"
                      value={formData.brandWebsite}
                      onChange={(e) => setFormData({ ...formData, brandWebsite: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      What do you need?
                    </label>
                    <select
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    >
                      <option value="Strategy call">Strategy call</option>
                      <option value="Campaign package">Campaign package</option>
                      <option value="Hiring">Hiring / Role inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me a bit about your current challenges, timeline, or product focus..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  />
                </div>

                {messageError && (
                  <p className="text-xs text-red-500 font-mono">{messageError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Free Gap Snapshot Form (Below) */}
        <div className="rounded-2xl p-8 sm:p-12 border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/40 backdrop-blur-md space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
              <Sparkles className="w-4 h-4" />
              <span>Complimentary Strategic Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 dark:text-neutral-100">
              Get a free creative gap snapshot.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Enter your brand website and email. You will receive a summary highlighting 3 concrete creative opportunities tailored to your category.
            </p>
          </div>

          {gapSuccess ? (
            <div className="p-6 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-medium">
                <CheckCircle2 className="w-5 h-5" />
                <span>Your Gap Snapshot is on its way.</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Please check your inbox in a few minutes. I have also received your brand details and will review your creative positioning.
              </p>
            </div>
          ) : (
            <form onSubmit={handleGapSubmit} className="space-y-4 max-w-3xl">
              {/* Spam Protection Honeypot */}
              <input
                type="text"
                name="gap_trap"
                value={gapData.botField}
                onChange={(e) => setGapData({ ...gapData, botField: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Brand name"
                  value={gapData.brandName}
                  onChange={(e) => setGapData({ ...gapData, brandName: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />

                <input
                  type="text"
                  required
                  placeholder="Brand website (e.g. yourbrand.com)"
                  value={gapData.websiteUrl}
                  onChange={(e) => setGapData({ ...gapData, websiteUrl: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />

                <input
                  type="email"
                  required
                  placeholder="Your work email"
                  value={gapData.email}
                  onChange={(e) => setGapData({ ...gapData, email: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                />
              </div>

              {gapError && (
                <p className="text-xs text-red-500 font-mono">{gapError}</p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <p className="text-xs text-neutral-500">
                  No spam or hard sales push. Straightforward observations.
                </p>
                <button
                  type="submit"
                  disabled={gapSubmitting}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full text-xs font-mono uppercase tracking-wider bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{gapSubmitting ? 'Analyzing...' : 'Generate snapshot'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Direct Channels (Plain Text) */}
        <div className="pt-8 border-t border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                Direct Email
              </span>
              <a
                href="mailto:Sakib@witlyn.com"
                className="text-neutral-900 dark:text-neutral-100 font-medium hover:underline"
              >
                Sakib@witlyn.com
              </a>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                LinkedIn
              </span>
              <a
                href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-100 font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>linkedin.com/in/sakib-ziad-290104211</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                Production Studio
              </span>
              <a
                href="https://witlyn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-100 font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>witlyn.com</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <p className="text-xs font-mono text-neutral-500">
            Based in Malaysia · Global Client Availability
          </p>
        </div>

      </div>
    </div>
  )
}
