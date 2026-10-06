'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Cpu, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DigitalProductsPage() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)

  async function handleCheckout(productId: string) {
    setCheckoutLoading(productId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, cancelPath: '/digital-products' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Failed to initiate checkout session')
      }
    } catch {
      alert('Network error communicating with payment service')
    } finally {
      setCheckoutLoading(null)
    }
  }

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: 'digital-products' }),
      })
      setNewsletterSuccess(true)
    } catch {
      setNewsletterSuccess(true)
    }
  }

  const products = [
    {
      id: 'brief-system',
      num: '01',
      name: 'THE BEAUTY BRAND CREATIVE BRIEF & PROMPT BLUEPRINT',
      tag: 'FRAMEWORK & BLUEPRINT',
      badge: 'IMMEDIATE DOWNLOAD',
      price: '$249',
      schemaCode: 'SYS.01 // PROMPT ARCHITECTURE',
      icon: BookOpen,
      metric: 'CURATED BLUEPRINTS',
      description:
        'The exact prompt architecture, visual reference taxonomies, and art direction frameworks used to concept publication-grade beauty campaigns across Midjourney and modern virtual studios.',
      deliverables: [
        'Curated Prompt Blueprints: Botanical caustics, skin subsurface scattering & glass refraction',
        'Art Direction Taxonomy Guide: Photographic lenses, aperture codes & luxury lighting schemas',
        'Notion Creative Brief Hub: Structured briefing workflow for high-velocity marketing teams',
        'Commercial Guardrail Checklist: Ensuring brand consistency and eliminating artifacting',
      ],
      cta: 'ENQUIRE ABOUT THIS KIT',
    },
    {
      id: 'agent-kit',
      num: '02',
      name: 'AUTONOMOUS CONTENT ENGINE & ASSET PIPELINE',
      tag: 'AUTOMATION ARCHITECTURE',
      badge: 'TURNKEY SYSTEM',
      price: '$495',
      schemaCode: 'AUT.02 // PIPELINE ORCHESTRATION',
      icon: Cpu,
      metric: 'TURNKEY WORKFLOW',
      description:
        'A comprehensive automation blueprint that maps consumer review sentiment and friction angles directly into synthesized visual briefs and multi-platform content pipelines.',
      deliverables: [
        'Make.com & n8n Scenario Blueprints: Pre-configured API connections for automated workflows',
        'Tone-of-Voice Prompt Engine: Calibrated for prestige skincare copy & social scripts',
        'Dynamic Asset Storage & Tagging Pipeline: Automatic multi-aspect ratio rendering',
        'Complete Architecture Walkthrough: 45-minute step-by-step setup video tutorial',
      ],
      cta: 'ENQUIRE ABOUT THIS KIT',
    },
    {
      id: 'masterclass',
      num: '03',
      name: 'EXECUTIVE MASTERCLASS: IN-HOUSE COMMERCIAL DIRECTION',
      tag: 'COHORT MASTERCLASS',
      badge: 'COHORT WAITLIST',
      price: 'WAITLIST APPLICATION',
      schemaCode: 'EXE.03 // PRIVATE COHORT',
      icon: Compass,
      metric: '4-WEEK INTENSIVE',
      description:
        'A 4-week private intensive for founders and creative directors learning how to install and direct internal generative pipelines without compromising artistic prestige.',
      deliverables: [
        'Live weekly strategy & prompt architecture workshops directly with Sakib Ziad',
        'Custom model fine-tuning and brand LoRA training walkthroughs',
        'Private peer group with cosmetics & skincare brand operators',
        'Lifetime access to template updates and model upgrade blueprints',
      ],
      cta: 'JOIN COHORT WAITLIST',
    },
  ]

  return (
    <div className="bg-[#050609] text-[#ece8e1] min-h-screen selection:bg-[#f4521c] selection:text-[#050609] pt-28 sm:pt-36">

      {/* ── Top Meta Bar ── */}
      <div className="container-luxury border-b border-[#292929] pb-4 mb-12">
        <div className="flex items-center justify-between">
          <span className="label-mono !text-[#f4521c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f4521c]" />
            IDX/04 — PLAYBOOKS
          </span>
          <span className="label-mono text-[#8a8a8a]">
            PRODUCTIZED ARCHITECTURE
          </span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="container-luxury pb-16 border-b border-[#292929]" aria-label="Digital Products Hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-inter font-black uppercase text-[clamp(2.5rem,6.2vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-[#ece8e1]">
              COMMERCIAL CREATIVE <br />
              <span className="text-[#f4521c]">PLAYBOOKS FOR</span> <br />
              BEAUTY &amp; SKINCARE.
            </h1>

            <p className="font-inter text-base sm:text-lg md:text-xl font-medium text-[#bdb8b0] max-w-2xl leading-relaxed tracking-tight">
              Proprietary art direction frameworks, sensory hook matrices, and creative direction kits distilled directly from active client engagements in beauty and skincare.
            </p>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#292929] pt-6 lg:pt-0 lg:pl-8 space-y-4">
            <span className="label-mono text-[#8a8a8a] block">// TACTICAL BLUEPRINTS</span>
            <p className="label-mono text-xs text-[#bdb8b0] leading-relaxed">
              Every playbook is field-tested on real consumer ad spend across Meta and TikTok, preserving luxury brand equity while maximizing thumb-stop rate.
            </p>
            <div className="pt-2">
              <span className="label-mono !text-[#f4521c] text-xs">
                EXTRACTED FROM REAL STUDIO ENGAGEMENTS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#292929]" aria-label="Products Catalog">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">AVAILABLE BLUEPRINTS</span>
            <span className="label-mono text-[#8a8a8a]">03 DEPLOYABLE KITS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-[#292929] bg-[#0b0c10] p-8 flex flex-col justify-between hover:border-[#f4521c] transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-6">
                    <span className="label-mono !text-[#f4521c]">BLUEPRINT — {product.num}</span>
                    <span className="label-mono text-[#8a8a8a]">{product.badge}</span>
                  </div>

                  <span className="label-mono text-[10px] text-[#8a8a8a] block mb-2">{product.schemaCode}</span>
                  <h3 className="font-inter font-black uppercase text-xl text-[#ece8e1] mb-4 group-hover:text-[#f4521c] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="font-inter text-xs text-[#8a8a8a] mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-[#292929] mb-8">
                    <span className="label-mono text-[10px] text-[#8a8a8a] block mb-2">SYSTEM COMPONENTS</span>
                    {product.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="w-1 h-1 bg-[#f4521c] mt-2 shrink-0" />
                        <span className="font-inter text-xs text-[#bdb8b0] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#292929] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-[10px] text-[#8a8a8a]">TIER PRICING</span>
                    <span className="font-inter font-black text-lg text-[#ece8e1]">{product.price}</span>
                  </div>

                  <Button asChild className="btn-acid h-11 w-full rounded-none">
                    <Link href="/contact" className="flex items-center justify-center gap-2">
                      <span>{product.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why These Exist ──────────────────────────────────────────────── */}
      <section className="py-20 border-b border-[#292929] bg-[#0b0c10]" aria-label="Rationale">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="label-mono !text-[#f4521c] block">// RATIONALE</span>
              <h2 className="font-inter font-black uppercase text-2xl sm:text-4xl text-[#ece8e1] leading-tight">
                BUILT FROM THE STRATEGY ROOM, NOT ACADEMIC THEORY.
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-4 font-inter text-xs sm:text-sm text-[#bdb8b0] leading-relaxed">
              <p>
                Most creative playbooks are compiled by generalists recycling identical AI prompts across unrelated niches.
              </p>
              <p>
                These blueprints are extracted directly from active production sprints at Witlyn—specifically calibrated to the physical realities of cosmetic formulations, skin-tone lighting dynamics, and conversion-engineered video hooks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#050609]" aria-label="Playbook Updates">
        <div className="container-luxury max-w-2xl mx-auto text-center space-y-6">
          <span className="label-mono !text-[#f4521c] block">// RELEASE RADAR</span>
          <h2 className="font-inter font-black uppercase text-3xl sm:text-4xl text-[#ece8e1]">
            NEW PLAYBOOKS DROP PERIODICALLY.
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#8a8a8a]">
            Receive immediate notifications when new cosmetic prompt blueprints, automation workflows, or private masterclasses open.
          </p>

          {newsletterSuccess ? (
            <div className="border border-[#f4521c] bg-[#0b0c10] p-6 text-center space-y-2">
              <span className="label-mono !text-[#f4521c]">RADAR REGISTERED</span>
              <p className="font-inter text-xs text-[#ece8e1]">You will receive upcoming blueprint releases directly in your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="founder@yourbrand.com"
                className="flex-1 px-4 py-3 bg-[#0b0c10] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
              />
              <Button type="submit" className="btn-acid h-12 px-8 rounded-none">
                SUBSCRIBE →
              </Button>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
