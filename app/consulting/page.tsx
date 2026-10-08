'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApplicationForm } from '@/components/application-form'
import { MaskText } from '@/components/mask-text'
import { motion } from 'framer-motion'

export default function ConsultingPage() {
  const isFor = [
    'Founders & CMOs of beauty, skincare, or cosmetic brands seeking category-defining visual prestige.',
    'Brands spending $15k–$50k+/quarter on production who want to replace agency delays with compounding internal systems.',
    'Teams ready to install high-velocity creative workflows to accelerate marketing and creative operations.',
    'Decision-makers who value high-level strategic counsel, architectural rigor, and partner-level attention.',
  ]

  const isNotFor = [
    'Brands looking for bargain $500 content production or generic template social media posts.',
    'Founders seeking a magic one-click button without strategic positioning and brand discipline.',
    'Businesses outside the prestige beauty, skincare, fragrance, and wellness sectors.',
    'Organizations seeking a traditional agency team of 20 juniors (For done-for-you production, see Witlyn).',
  ]

  const engagements = [
    {
      num: '01',
      title: 'FORENSIC CREATIVE AUDIT & BLUEPRINT',
      badge: '90-MIN INTENSIVE + SYNTHESIS',
      ideal: 'Best for founders and executives seeking an objective, forensic evaluation of their brand’s creative bottlenecks and conversion leaks.',
      features: [
        '90-minute private strategy session with Sakib Ziad',
        'Deep-dive audit of your visual identity, content pipelines, and creative velocity',
        'Custom Gap & Opportunity Synthesis with immediate 30-day action items',
        'Direct identification of high-leverage creative opportunities for your vertical',
      ],
      investment: 'Investment discussed during qualification application',
    },
    {
      num: '02',
      title: 'MONTHLY STRATEGIC ADVISORY RETAINER',
      badge: 'ONGOING STRATEGIC PARTNERSHIP',
      ideal: 'Best for growth-stage beauty brands actively scaling ad spend and multi-channel creative output.',
      features: [
        'Bi-weekly strategic direction and creative hook reviews',
        'Asynchronous executive counsel via private communication channel',
        'Creative direction oversight across campaigns and launch assets',
        'Performance asset guidance and commercial brief repositories',
      ],
      investment: 'Selective retainer — strictly limited to 3 concurrent brand partners',
    },
    {
      num: '03',
      title: 'TURNKEY CREATIVE PRODUCTION SYSTEM',
      badge: 'COMPLETE INFRASTRUCTURE BUILD',
      ideal: 'Best for established beauty brands seeking to deploy a full-scale in-house creative studio and rapid asset pipeline.',
      features: [
        'End-to-end architecture and deployment of brand-specific creative systems',
        'Streamlined workflow construction for omnichannel asset routing',
        'Full team training curriculum, creative blueprint repositories, and SOP library',
        '30-day post-launch optimization and stabilization support',
      ],
      investment: 'Custom project scope — scoped during qualification application',
    },
  ]

  return (
    <div className="bg-[#050609] text-[#ece8e1] min-h-screen selection:bg-[#f4521c] selection:text-[#050609] pt-28 sm:pt-36">

      {/* ── Top Meta Bar ── */}
      <div className="container-luxury border-b border-[#292929] pb-4 mb-12">
        <div className="flex items-center justify-between">
          <span className="label-mono !text-[#f4521c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f4521c]" />
            IDX/03 — ADVISORY
          </span>
          <span className="label-mono text-[#8a8a8a]">
            PRIVATE STRATEGIC COUNSEL
          </span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="container-luxury pb-16 border-b border-[#292929]" aria-label="Consulting Hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-inter font-black uppercase text-[clamp(2.5rem,6.2vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-[#ece8e1]">
              <MaskText
                immediate
                delay={0.1}
                lines={[
                  <span key="1">STRATEGIC CREATIVE</span>,
                  <span key="2" className="text-[#f4521c]">COUNSEL FOR BEAUTY</span>,
                  <span key="3">BRANDS THAT SCALE.</span>,
                ]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="font-inter text-base sm:text-lg md:text-xl font-medium text-[#bdb8b0] max-w-2xl leading-relaxed tracking-tight"
            >
              High-touch advisory spanning commercial creative direction, direct-response friction audits, and rapid asset production pipelines — engineered to make your creative operations unstoppable.
            </motion.p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild className="btn-acid h-12 px-8 rounded-none">
                <a href="#application" className="flex items-center gap-2">
                  <span>APPLY FOR ADVISORY CALL</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 px-8 rounded-none border-[#292929] text-[#ece8e1] hover:border-[#f4521c]">
                <a href="#engagements">VIEW ENGAGEMENT MODELS</a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#292929] pt-6 lg:pt-0 lg:pl-8 space-y-4">
            <span className="label-mono text-[#8a8a8a] block">// ADVISORY PROTOCOL</span>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between label-mono text-[10px]">
                  <span>PARTNER CAPACITY</span>
                  <span className="text-[#f4521c]">STRICTLY 3 BRANDS</span>
                </div>
                <div className="h-[2px] w-full bg-[#292929]">
                  <div className="h-full w-full bg-[#f4521c]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between label-mono text-[10px]">
                  <span>AUDIT VELOCITY</span>
                  <span className="text-[#f4521c]">72H TURNAROUND</span>
                </div>
                <div className="h-[2px] w-full bg-[#292929]">
                  <div className="h-full w-full bg-[#f4521c]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between label-mono text-[10px]">
                  <span>CATEGORY SPECIALIZATION</span>
                  <span className="text-[#f4521c]">BEAUTY &amp; SKINCARE ONLY</span>
                </div>
                <div className="h-[2px] w-full bg-[#292929]">
                  <div className="h-full w-full bg-[#f4521c]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Qualification Criteria (Selora Comparison Format) ──────────────── */}
      <section className="py-20 border-b border-[#292929]" aria-label="Qualification">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">QUALIFICATION MATRIX</span>
            <span className="label-mono text-[#8a8a8a]">SELECTIVE BY NECESSITY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IS FOR */}
            <div className="border border-[#292929] bg-[#0b0c10] p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#292929] pb-4">
                <span className="label-mono !text-[#ece8e1]">01 / QUALIFIED FIT</span>
                <span className="label-mono !text-[#f4521c]">IDEAL PARTNER</span>
              </div>
              <ul className="space-y-4">
                {isFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="label-mono text-[#f4521c] text-xs mt-0.5">[{idx + 1}]</span>
                    <p className="font-inter text-xs sm:text-sm text-[#ece8e1] leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* IS NOT FOR */}
            <div className="border border-[#292929] bg-[#0b0c10] p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#292929] pb-4">
                <span className="label-mono text-[#8a8a8a]">02 / NON-FIT CRITERIA</span>
                <span className="label-mono text-[#8a8a8a]">DISQUALIFIED</span>
              </div>
              <ul className="space-y-4">
                {isNotFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="label-mono text-[#8a8a8a] text-xs mt-0.5">[X]</span>
                    <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Engagement Structures & Pricing Models ─────────────────────────── */}
      <section id="engagements" className="py-20 border-b border-[#292929]" aria-label="Engagements">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">PRICING MODEL</span>
            <span className="label-mono text-[#8a8a8a]">ENGAGEMENT STRUCTURE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {engagements.map((eng) => (
              <div
                key={eng.num}
                className="border border-[#292929] bg-[#0b0c10] p-8 flex flex-col justify-between hover:border-[#f4521c] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-6">
                    <span className="label-mono !text-[#f4521c]">MODEL — {eng.num}</span>
                    <span className="label-mono text-[#8a8a8a]">{eng.badge}</span>
                  </div>

                  <h3 className="font-inter font-black uppercase text-xl text-[#ece8e1] mb-3 leading-snug">
                    {eng.title}
                  </h3>
                </div>

                <div className="pt-6 border-t border-[#292929] mt-8">
                  <span className="label-mono text-[10px] text-[#8a8a8a] block mb-1">PRICING MODEL</span>
                  <p className="label-mono text-xs text-[#ece8e1]">{eng.investment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Unified Application Form ────────────────────────────────────────── */}
      <section id="application" className="py-24" aria-label="Advisory Application">
        <div className="container-luxury max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <span className="label-mono !text-[#f4521c] block">QUALIFICATION</span>
            <h2 className="font-inter font-black uppercase text-3xl sm:text-4xl text-[#ece8e1]">
              APPLY FOR AN ADVISORY STRATEGY CALL
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] max-w-md mx-auto">
              Please detail your brand, current bottlenecks, and goals. Applications are reviewed personally within 48 business hours.
            </p>
          </div>

          <div className="border border-[#292929] bg-[#0b0c10] p-8">
            <ApplicationForm
              defaultInterest="consulting"
              pageSource="consulting"
              title="ADVISORY QUALIFICATION FORM"
              subtitle="All details remain strictly confidential under NDA principles."
              submitText="SUBMIT ADVISORY APPLICATION →"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
