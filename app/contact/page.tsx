'use client'

import React from 'react'
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
import { ApplicationForm } from '@/components/application-form'

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
                <ApplicationForm
                  defaultInterest="general"
                  pageSource="contact"
                  title="Direct Strategic Application"
                  subtitle="Please detail your brand and current bottlenecks to initiate review."
                  submitText="Submit Strategic Application"
                />
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
