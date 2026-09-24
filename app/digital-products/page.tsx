'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Download,
  BookOpen,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

export default function DigitalProductsPage() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

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
      name: 'The Beauty Brand AI Creative Brief & Prompt Blueprint',
      tag: 'Framework & Blueprint',
      badge: 'Immediate Download',
      price: '$249',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
      description:
        'The exact prompt architecture, visual reference taxonomies, and art direction frameworks used at Witlyn to concept publication-grade beauty campaigns across Midjourney and Flux.',
      deliverables: [
        '40+ Tested Prompt Blueprints: Botanical caustics, skin subsurface scattering & glass refraction',
        'Art Direction Taxonomy Guide: Photographic lenses, aperture codes & luxury lighting schemas',
        'Notion Creative Brief Hub: Structured briefing workflow for marketing teams',
        'Commercial Guardrail Checklist: Ensuring brand consistency and avoiding artifacting',
      ],
      cta: 'Enquire About This Kit',
      variant: 'gold' as const,
    },
    {
      id: 'agent-kit',
      name: 'Autonomous AI Content Engine & Agent Blueprint',
      tag: 'Automation Architecture',
      badge: 'Turnkey System',
      price: '$495',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      description:
        'A comprehensive automation kit that maps customer search intent and trending review angles directly into synthesized visual briefs and multi-platform content schedules.',
      deliverables: [
        'Make.com & n8n Scenario Blueprints: Pre-configured API connections for automated workflows',
        'Tone-of-Voice Prompt Engine: Calibrated for prestige skincare copy & social scripts',
        'Dynamic Asset Storage & Tagging Pipeline: Automatic multi-aspect ratio rendering',
        'Complete Video Architecture Walkthrough: 45-minute step-by-step setup tutorial',
      ],
      cta: 'Enquire About This Kit',
      variant: 'gold' as const,
    },
    {
      id: 'masterclass',
      name: 'Executive Masterclass: In-House Generative Direction',
      tag: 'Cohort Masterclass',
      badge: 'Cohort 01 Waitlist',
      price: 'Waitlist Only',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
      description:
        'A 4-week private intensive for founders and creative directors learning how to install and direct internal generative pipelines without losing artistic prestige.',
      deliverables: [
        'Live weekly strategy & prompt architecture workshops with Sakib Ziad',
        'Custom model fine-tuning and brand LoRA training walkthroughs',
        'Private Slack community with peer beauty & cosmetic brand operators',
        'Lifetime access to template updates and model upgrade blueprints',
      ],
      cta: 'Join Cohort Waitlist',
      variant: 'outline-gold' as const,
    },
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-gold selection:text-background pt-28">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-border/80" aria-label="Digital Products Hero">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/30 bg-surface/50 text-[11px] uppercase tracking-[0.2em] text-gold mb-8">
                Productized Intelligence
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                The AI creative playbooks I wish{' '}
                <span className="italic font-fraunces text-gold font-light">
                  existed when I began.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-ivory/80 max-w-2xl">
                Proprietary prompt frameworks, automation blueprints, and creative direction kits distilled directly from active client engagements in beauty and skincare.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Products Showcase with Visual Mockups ──────────────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="Products Grid">
        <div className="container-luxury space-y-16">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Available Frameworks</p>
            <h2 className="heading-section">Engineered for Autonomous Execution</h2>
            <p className="body-muted">Each kit contains production-tested assets ready to deploy today.</p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((product, idx) => (
              <RevealSection key={product.id} delay={idx * 0.1}>
                <div className="card-surface overflow-hidden flex flex-col justify-between h-full group hover:border-gold/50">
                  
                  {/* Visual Mockup Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-inter uppercase tracking-wider bg-background/85 backdrop-blur-md text-gold border border-gold/30">
                      {product.badge}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      {/* Internal Confirmation Tag */}
                      <div className="mb-5 p-3 rounded-lg border border-gold/40 bg-gold/10 text-gold text-xs font-mono leading-relaxed">
                        [CONFIRM: is this a real, ready-to-sell product? Confirm name, contents, and price before launch]
                      </div>

                      <span className="eyebrow-luxury text-gold block mb-2">{product.tag}</span>
                      <h3 className="heading-card text-2xl mb-4 group-hover:text-gold transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="body-muted text-sm mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="pt-6 border-t border-border space-y-3 mb-8">
                        <p className="eyebrow-luxury text-[10px] text-muted-light">What's Inside</p>
                        {product.deliverables.map((item) => (
                          <div key={item} className="flex items-start gap-2.5 text-xs text-ivory/80 leading-relaxed font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
                      <div>
                        <span className="eyebrow-luxury text-[10px] text-muted-light block">Investment</span>
                        <span className="font-fraunces text-2xl text-ivory font-light">{product.price}</span>
                      </div>
                      <Button asChild variant={product.variant} size="md" className="group/btn">
                        <Link href="/contact" className="inline-flex items-center gap-2">
                          <span>{product.cta}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>

                  </div>

                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why These Exist Editorial Section ─────────────────────────────── */}
      <section className="section-pad border-t border-border/80" aria-label="Philosophy">
        <div className="container-luxury max-w-4xl mx-auto">
          <RevealSection className="card-surface p-10 sm:p-14 border-gold/30">
            <span className="eyebrow-luxury text-gold mb-3 block">Field Intelligence</span>
            <h2 className="heading-section text-3xl sm:text-4xl mb-6">
              Extracted from real campaign rooms — never theoretical.
            </h2>
            <div className="space-y-4 body-editorial text-base sm:text-lg">
              <p>
                The internet is saturated with generic "AI prompts" that generate plastic figures on marble floors. Those have zero commercial utility for a serious beauty brand protecting millions in perceived equity.
              </p>
              <p>
                Every framework and agent template in this library is extracted directly from the production environment of Witlyn. They have generated commercial campaign assets, satisfied rigorous packaging designers, and driven actual ecommerce conversion.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Newsletter Dispatch ────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border/80 bg-surface/50 text-center" aria-label="Drop Alerts">
        <div className="container-luxury max-w-xl mx-auto">
          <RevealSection>
            <p className="eyebrow-luxury mb-3">Release Dispatches</p>
            <h2 className="heading-section text-3xl sm:text-4xl mb-4">Be First When New Blueprints Drop</h2>
            <p className="body-muted mb-8 text-sm">
              New prompt blueprints and agent architectures are released on a rolling basis. Subscribers receive early access and launch pricing.
            </p>

            {newsletterSuccess ? (
              <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold text-sm text-center">
                Confirmed. You'll receive early access to new framework drops.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                <Input
                  required
                  type="email"
                  placeholder="Enter your work email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="gold" size="md">
                  Join Dispatch List
                </Button>
              </form>
            )}
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
