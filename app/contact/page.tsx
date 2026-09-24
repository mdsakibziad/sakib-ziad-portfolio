'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Calendar,
  Linkedin,
  Instagram,
  Facebook,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const

function RevealSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE_LUXURY, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    website: '',
    intent: 'Consulting & Advisory',
    message: '',
    timeline: 'Within 1 month',
  })

  const calUrl = process.env.NEXT_PUBLIC_CAL_LINK

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'general', ...formData }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-gold selection:text-background pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-border/80" aria-label="Contact Header">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/30 bg-surface/50 text-[11px] uppercase tracking-[0.2em] text-gold mb-8">
                Direct Inquiries
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                Every partnership begins with a{' '}
                <span className="italic font-fraunces text-gold font-light">
                  conversation.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-ivory/80 max-w-xl">
                I review every application personally and respond within 48 business hours.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Main Form & Info Grid ─────────────────────────────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="Application Form">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8">
              <RevealSection>
                <div className="card-surface p-8 sm:p-12 border-gold/30 shadow-[0_0_50px_rgba(201,166,107,0.06)]">
                  {submitted ? (
                    <div className="text-center py-10 space-y-6">
                      <CheckCircle2 className="w-14 h-14 text-gold mx-auto" />
                      <h2 className="heading-card text-3xl">Application Received</h2>
                      <p className="body-editorial text-base max-w-md mx-auto">
                        Thank you for reaching out. I review all inquiries personally and will respond via email within 48 hours.
                      </p>

                      <div className="card-surface p-6 border-border mt-8 text-left max-w-md mx-auto">
                        <div className="flex items-center gap-2 text-gold mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-fraunces text-base text-ivory">Schedule Direct Intro</span>
                        </div>
                        <p className="body-muted text-xs mb-4">
                          If you'd like to schedule your 30-minute intro directly:
                        </p>
                        {calUrl && !calUrl.includes('PLACEHOLDER') ? (
                          <Button asChild variant="gold" size="md" className="w-full">
                            <a href={calUrl} target="_blank" rel="noopener noreferrer">
                              Open Calendar via Cal.com
                            </a>
                          </Button>
                        ) : (
                          <Button asChild variant="gold" size="md" className="w-full">
                            <a href="mailto:Sakib@witlyn.com?subject=Strategic%20Advisory%20Inquiry">
                              Email Directly (Sakib@witlyn.com)
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Your Name *
                          </label>
                          <Input
                            required
                            placeholder="e.g. Julian Vance"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Email Address *
                          </label>
                          <Input
                            required
                            type="email"
                            placeholder="julian@brand.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Brand / Company Name *
                          </label>
                          <Input
                            required
                            placeholder="e.g. Solaé Botanicals"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Website or Store URL *
                          </label>
                          <Input
                            required
                            type="url"
                            placeholder="https://yourbrand.com"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Area of Interest
                          </label>
                          <select
                            className="w-full h-11 px-4 rounded-xl bg-surface border border-border text-ivory font-inter text-sm focus:outline-none focus:border-gold"
                            value={formData.intent}
                            onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                          >
                            <option value="Consulting & Advisory">1:1 Strategic Advisory</option>
                            <option value="AI Automation System Build">AI Automation & Agent Build</option>
                            <option value="Digital Products">Digital Products & Blueprints</option>
                            <option value="Syndicate Membership">Syndicate Membership</option>
                            <option value="General Speaking / Inquiries">Speaking & Media</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                            Implementation Timeline
                          </label>
                          <select
                            className="w-full h-11 px-4 rounded-xl bg-surface border border-border text-ivory font-inter text-sm focus:outline-none focus:border-gold"
                            value={formData.timeline}
                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          >
                            <option value="Immediately (Next 2 weeks)">Immediately (Next 2 weeks)</option>
                            <option value="Within 1 month">Within 1 month</option>
                            <option value="1–3 months out">1–3 months out</option>
                            <option value="Exploring & Planning">Exploring & Planning</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
                          Tell me about your brand and what you wish to achieve with AI *
                        </label>
                        <Textarea
                          required
                          rows={4}
                          placeholder="What is your biggest creative challenge, current monthly content volume, and ideal outcome?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="gold"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Transmitting Inbound...' : 'Submit Application →'}
                      </Button>
                    </form>
                  )}
                </div>
              </RevealSection>
            </div>

            {/* Sidebar Column: Direct Contacts & Channels */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <RevealSection delay={0.15}>
                <div className="card-surface p-8 space-y-6">
                  <span className="eyebrow-luxury text-gold block">Direct Inquiries</span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-light mb-1">Direct Email</p>
                    <a
                      href="mailto:Sakib@witlyn.com"
                      className="font-fraunces text-xl text-ivory hover:text-gold transition-colors"
                    >
                      Sakib@witlyn.com
                    </a>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs uppercase tracking-wider text-muted-light mb-3">Professional Channels</p>
                    <div className="flex flex-col gap-2.5 text-sm font-inter">
                      <a
                        href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-gold" />
                        <span>LinkedIn / sakib-ziad</span>
                      </a>
                      <a
                        href="https://www.instagram.com/sakibziad/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors"
                      >
                        <Instagram className="w-4 h-4 text-gold" />
                        <span>Instagram / @sakibziad</span>
                      </a>
                      <a
                        href="https://www.facebook.com/sakibziad.21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors"
                      >
                        <Facebook className="w-4 h-4 text-gold" />
                        <span>Facebook / sakibziad.21</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs uppercase tracking-wider text-muted-light mb-1">Production Studio</p>
                    <a
                      href="https://witlyn.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline"
                    >
                      <span>Witlyn Studio (witlyn.com)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
