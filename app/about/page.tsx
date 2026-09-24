'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ArrowUpRight, Award, Compass, Sparkles, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export default function AboutPage() {
  const beliefs = [
    {
      num: '01',
      title: 'AI is an amplifier of human taste, not a shortcut.',
      body: 'The beauty industry is fundamentally driven by emotion, nuance, and aspiration. Brands that use AI purely to cut corners produce sterile, forgettable content. The winners are those who use AI to execute extraordinary human art direction at unprecedented velocity.',
    },
    {
      num: '02',
      title: 'Beauty brands deserve category-native systems.',
      body: 'Generalist AI agencies don’t understand skin physics, fluid caustics, packaging reflection, or prestige color harmony. A generative system must be tuned specifically for cosmetics and skincare codes to build lasting brand equity.',
    },
    {
      num: '03',
      title: 'Systems compound. Tactical campaigns expire.',
      body: 'A single campaign photoshoot provides assets for six weeks. An AI-native creative system generates an infinite library of on-brand assets forever. We build compounding infrastructure, not ephemeral one-offs.',
    },
  ]

  const timeline = [
    {
      year: 'Academic Foundation',
      title: 'BSc in Artificial Intelligence',
      desc: 'Computational study of generative architectures, neural representations, and computer vision, forming the engineering bedrock for aesthetic automation.',
    },
    {
      year: 'Studio Launch',
      title: 'Founded Witlyn (witlyn.com)',
      desc: 'Built an AI-native creative production studio dedicated to beauty and skincare. Engineered campaign systems for brands across skincare, cosmetics, and wellness.',
    },
    {
      year: 'Systems Expansion',
      title: 'Autonomous Brand Operations & Agent Pipelines',
      desc: 'Pioneered custom AI agent workflows connecting consumer search intent, moodboard synthesis, and automated asset rendering for cosmetic brands.',
    },
    {
      year: 'Present Practice',
      title: 'Advisory & Strategic Counsel',
      desc: 'Launched dedicated 1:1 advisory to partner directly with beauty founders and CMOs who want to install in-house AI creative infrastructure.',
    },
  ]

  return (
    <div className="bg-background text-ivory min-h-screen selection:bg-gold selection:text-background pt-28">

      {/* ── Editorial Hero ─────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-border/80 relative overflow-hidden" aria-label="About Hero">
        <div className="container-luxury">
          <div className="max-w-4xl">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/30 bg-surface/50 text-[11px] uppercase tracking-[0.2em] text-gold mb-8">
                Founder Narrative
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">
                I built Witlyn to prove AI-native creative works.{' '}
                <span className="italic font-fraunces text-gold font-light">
                  I built this practice to show brands how to lead with it.
                </span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="body-editorial text-lg sm:text-xl text-ivory/80 max-w-2xl">
                Bridging the gap between computational artificial intelligence and prestige beauty storytelling.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Story Section with Real Executive Portrait ─────────────────────── */}
      <section className="section-pad bg-surface/30" aria-label="The Story">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Real Executive Headshot — Large & Editorial */}
            <RevealSection className="lg:col-span-5 sticky top-28">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-[0_16px_48px_rgba(0,0,0,0.8)] group">
                <Image
                  src="/images/sakib-ziad.jpg"
                  alt="Sakib Ziad — Portrait"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-fraunces text-2xl text-ivory">Sakib Ziad</p>
                  <p className="eyebrow-luxury text-gold">AI Creative Strategist & Founder</p>
                </div>
              </div>
            </RevealSection>

            {/* Narrative Body */}
            <div className="lg:col-span-7 flex flex-col gap-10">
              <RevealSection>
                <p className="eyebrow-luxury mb-3">Origin & Purpose</p>
                <h2 className="heading-section text-3xl sm:text-4xl text-ivory">
                  From machine intelligence to brand emotion.
                </h2>
              </RevealSection>

              <RevealSection delay={0.1} className="space-y-6 body-editorial text-lg">
                <p>
                  My journey began inside an academic degree in Artificial Intelligence. While the technology world was fascinated by theoretical benchmarks, I was captivated by how neural networks interpret visual aesthetics, light refraction, and brand emotion.
                </p>
                <p>
                  Looking closely at the beauty and cosmetics landscape, the disparity was striking: founders were spending \$30,000 to \$50,000 per quarter on studio shoots that yielded static, quickly exhausted assets. When brands attempted to use early AI tools, the results looked plastic, synthetic, and completely detached from the sensory luxury beauty consumers demand.
                </p>
                <p>
                  To solve this, I founded <a href="https://witlyn.com" target="_blank" rel="noopener noreferrer" className="text-gold font-medium underline underline-offset-4 hover:text-gold-light">Witlyn</a> — a full-service AI-native creative studio. Witlyn proved that when computational prompt systems are guided by high-fashion art direction, the resulting creative not only equals traditional studio photography, but delivers radical aesthetic consistency at 10× speed.
                </p>
                <p>
                  This personal advisory practice was created for founders and marketing executives who don’t just want to outsource content; they want to master the intelligence themselves. Here, we build custom AI creative infrastructure, train internal teams, and deploy autonomous brand agents that turn creative velocity into an enduring moat.
                </p>
              </RevealSection>

              <RevealSection delay={0.2} className="pt-6 border-t border-border/80 flex flex-wrap gap-6 items-center">
                <Button asChild variant="gold" size="lg">
                  <Link href="/consulting" className="flex items-center gap-2">
                    <span>Explore Advisory Engagements</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <a
                  href="https://witlyn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-inter uppercase tracking-[0.16em] text-ivory/70 hover:text-gold transition-colors"
                >
                  <span>Visit Witlyn Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {/* ── Philosophy Section ─────────────────────────────────────────────── */}
      <section className="section-pad border-t border-border/80" aria-label="Core Philosophy">
        <div className="container-luxury">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow-luxury mb-4">Core Principles</p>
            <h2 className="heading-section">Three Beliefs That Shape Everything</h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beliefs.map((belief, i) => (
              <RevealSection key={belief.num} delay={i * 0.1}>
                <div className="card-surface p-8 sm:p-10 flex flex-col justify-between h-full hover:border-gold/40">
                  <div>
                    <span className="font-fraunces text-3xl text-gold/40 mb-6 block">{belief.num}</span>
                    <h3 className="heading-card text-xl sm:text-2xl mb-4 leading-snug">{belief.title}</h3>
                    <p className="body-muted text-base">{belief.body}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verified Timeline ──────────────────────────────────────────────── */}
      <section className="section-pad bg-surface/30 border-y border-border/80" aria-label="Background Timeline">
        <div className="container-luxury max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="eyebrow-luxury mb-4">Pedigree</p>
            <h2 className="heading-section">The Trajectory</h2>
          </RevealSection>

          <div className="space-y-12 relative before:absolute before:inset-0 before:left-[19px] before:w-px before:bg-border/80">
            {timeline.map((item, i) => (
              <RevealSection key={item.title} delay={i * 0.1} className="flex gap-8 relative">
                <div className="w-10 h-10 rounded-full bg-background border border-gold/40 flex items-center justify-center shrink-0 z-10 text-gold text-xs font-semibold">
                  0{i + 1}
                </div>
                <div className="card-surface p-8 flex-1">
                  <span className="eyebrow-luxury text-gold block mb-2">{item.year}</span>
                  <h3 className="heading-card text-xl sm:text-2xl mb-3">{item.title}</h3>
                  <p className="body-muted text-base">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media & Inquiries Section (Clean Designed State) ────────────────── */}
      <section className="section-pad" aria-label="Media & Speaking">
        <div className="container-luxury max-w-4xl mx-auto">
          <div className="card-surface p-10 sm:p-14 border-gold/30 text-center flex flex-col items-center">
            <RevealSection>
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6 mx-auto">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="eyebrow-luxury mb-3">Speaking & Thought Leadership</p>
              <h2 className="heading-section text-3xl sm:text-4xl mb-4">
                Keynotes, Podcasts & Brand Workshops
              </h2>
              <p className="body-editorial text-base sm:text-lg max-w-xl mx-auto mb-8">
                Available for executive briefings, beauty industry summits, and podcast conversations on the commercial future of generative AI in luxury aesthetics.
              </p>
              <Button asChild variant="gold" size="lg">
                <a href="mailto:Sakib@witlyn.com?subject=Speaking%20or%20Press%20Inquiry" className="flex items-center gap-2">
                  <span>Inquire for Speaking</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Final Call to Action ───────────────────────────────────────────── */}
      <section className="py-20 border-t border-border/80 bg-surface/50 text-center">
        <div className="container-luxury max-w-2xl mx-auto">
          <RevealSection>
            <h2 className="heading-section text-3xl sm:text-4xl mb-6">Let’s discuss your brand's AI roadmap.</h2>
            <Button asChild variant="gold" size="lg">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Apply for Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
