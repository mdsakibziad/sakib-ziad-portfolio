'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApplicationForm } from '@/components/application-form'

export default function MembershipPage() {

  const isFor = [
    'Founders and CMOs building in-house creative capacity and seeking an ongoing strategic compass.',
    'Marketing teams requiring monthly access to verified prompt blueprints and automation assets.',
    'Brands that value strategic depth, continuous innovation, and early competitive intelligence.',
  ]

  const isNotFor = [
    'Brands looking for complete done-for-you production (For full production retainers, see Witlyn).',
    'Casual spectators looking for generic marketing discussions or community small-talk.',
    'Teams expecting immediate overnight results without committing to rigorous internal practice.',
  ]

  return (
    <div className="bg-[#050609] text-[#ece8e1] min-h-screen selection:bg-[#f4521c] selection:text-[#050609] pt-28 sm:pt-36">

      {/* ── Top Meta Bar ── */}
      <div className="container-luxury border-b border-[#292929] pb-4 mb-12">
        <div className="flex items-center justify-between">
          <span className="label-mono !text-[#f4521c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f4521c]" />
            IDX/05 — MEMBERSHIP
          </span>
          <span className="label-mono text-[#8a8a8a]">
            LIMITED ACCESS · PRIVATE SYNDICATE
          </span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="container-luxury pb-16 border-b border-[#292929]" aria-label="Membership Hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-inter font-black uppercase text-[clamp(2.5rem,6.2vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-[#ece8e1]">
              A STANDING PARTNERSHIP <br />
              <span className="text-[#f4521c]">WITH YOUR CREATIVE</span> <br />
              STRATEGIST.
            </h1>

            <p className="font-inter text-base sm:text-lg md:text-xl font-medium text-[#bdb8b0] max-w-2xl leading-relaxed tracking-tight">
              Monthly strategy, prompt blueprints, tool intelligence, and direct async access — designed for beauty founders building internal creative leverage for the long game.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild className="btn-acid h-12 px-8 rounded-none">
                <a href="#apply" className="flex items-center gap-2">
                  <span>APPLY FOR MEMBERSHIP</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#292929] pt-6 lg:pt-0 lg:pl-8 space-y-4">
            <span className="label-mono text-[#8a8a8a] block">// MEMBERSHIP ALLOCATION</span>
            <p className="label-mono text-xs text-[#bdb8b0] leading-relaxed">
              Deliberately limited to 15 active brand members to ensure high-bandwidth feedback, direct strategic attention, and candid peer exchange.
            </p>
            <div className="pt-2">
              <span className="label-mono !text-[#f4521c] text-xs">
                MAX 15 BRANDS CONCURRENTLY
              </span>
            </div>
          </div>
        </div>
      </section>



      {/* ── Who It Is For vs Not For ───────────────────────────────────────── */}
      <section className="py-20 border-b border-[#292929] bg-[#0b0c10]" aria-label="Mutual Fit">
        <div className="container-luxury">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4 mb-10">
            <span className="label-mono !text-[#f4521c]">MUTUAL FIT</span>
            <span className="label-mono text-[#8a8a8a]">QUALIFIED CRITERIA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-[#292929] bg-[#050609] p-8 space-y-6">
              <span className="label-mono !text-[#ece8e1] border-b border-[#292929] pb-4 block">
                01 / QUALIFIED CANDIDATES
              </span>
              <ul className="space-y-4">
                {isFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="label-mono text-[#f4521c] text-xs mt-0.5">[{idx + 1}]</span>
                    <p className="font-inter text-xs sm:text-sm text-[#ece8e1] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#292929] bg-[#050609] p-8 space-y-6">
              <span className="label-mono text-[#8a8a8a] border-b border-[#292929] pb-4 block">
                02 / NON-FIT CRITERIA
              </span>
              <ul className="space-y-4">
                {isNotFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="label-mono text-[#8a8a8a] text-xs mt-0.5">[X]</span>
                    <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Form ────────────────────────────────────────────────── */}
      <section id="apply" className="py-24" aria-label="Membership Application">
        <div className="container-luxury max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <span className="label-mono !text-[#f4521c] block">ADMISSIONS</span>
            <h2 className="font-inter font-black uppercase text-3xl sm:text-4xl text-[#ece8e1]">
              JOIN THE ADVISORY WAITLIST
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#8a8a8a] max-w-md mx-auto">
              Membership intake opens each quarter. Submit your details below to be notified when the next opening is allocated.
            </p>
          </div>

          <div className="border border-[#292929] bg-[#0b0c10] p-8">
            <ApplicationForm
              defaultInterest="membership"
              pageSource="membership"
              title="MEMBERSHIP ADMISSION FORM"
              subtitle="All details reviewed personally by Sakib Ziad."
              submitText="SUBMIT ADMISSION REQUEST →"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
