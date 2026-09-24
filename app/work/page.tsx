'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

/* ── Animation helpers ───────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Data ────────────────────────────────────────────────────────────────── */
const caseStudies = [
  {
    number: '01',
    brand: 'Solaé',
    status: '[PLACEHOLDER: Live Client Work / Concept / Spec Work]',
    tags: ['Campaign Direction', 'AI Creative System', 'Content Strategy'],
    year: '[PLACEHOLDER: Year]',
    visualLabel: 'Solaé — AI-Native Skincare',
    objective:
      '[PLACEHOLDER: 2–3 sentence brand objective for Solaé. Describe the challenge the brand was facing, what they needed to achieve, and why it mattered to their audience.]',
    approach:
      '[PLACEHOLDER: Describe the strategic and creative approach taken for Solaé. What systems were built, what creative decisions were made, how AI was used as an execution layer.]',
    outcome:
      '[PLACEHOLDER: Describe the results achieved for Solaé — what changed, what improved, what was unlocked.]',
    metric: '[PLACEHOLDER: Key metric or result — e.g. "3× content output with 40% reduction in production time"]',
  },
  {
    number: '02',
    brand: 'Vyraa',
    status: '[PLACEHOLDER: Live Client Work / Concept / Spec Work]',
    tags: ['Brand Strategy', 'Creative Direction', 'AI Integration'],
    year: '[PLACEHOLDER: Year]',
    visualLabel: 'Vyraa — Premium Beauty Repositioning',
    objective:
      '[PLACEHOLDER: 2–3 sentence brand objective for Vyraa. Why did the brand need repositioning, who is their target audience, and what was the strategic imperative driving the engagement.]',
    approach:
      '[PLACEHOLDER: Describe the strategic and creative approach taken for Vyraa. What frameworks were applied, how the brand narrative was rebuilt, and what AI systems enabled the work.]',
    outcome:
      '[PLACEHOLDER: Describe the results achieved for Vyraa — brand perception shifts, market positioning gains, measurable business outcomes.]',
    metric: '[PLACEHOLDER: Key metric or result — e.g. "Repositioned from mass-market to premium in 90 days"]',
  },
  {
    number: '03',
    brand: 'Lipéa',
    status: '[PLACEHOLDER: Live Client Work / Concept / Spec Work]',
    tags: ['Content System', 'AI Automation', 'Creative Infrastructure'],
    year: '[PLACEHOLDER: Year]',
    visualLabel: 'Lipéa — Content Engine Build',
    objective:
      '[PLACEHOLDER: 2–3 sentence brand objective for Lipéa. What content challenges did the brand face, what scale of output was required, and what was at stake for the brand.]',
    approach:
      '[PLACEHOLDER: Describe the content infrastructure built for Lipéa. How the AI creative system was architected, what workflows were automated, and how brand voice was preserved at scale.]',
    outcome:
      '[PLACEHOLDER: Describe the content engine results — output velocity, consistency metrics, team capacity freed.]',
    metric: '[PLACEHOLDER: Key metric or result — e.g. "60 pieces of on-brand content produced per month with 1 operator"]',
  },
  {
    number: '04',
    brand: 'Nuécera',
    status: '[PLACEHOLDER: Live Client Work / Concept / Spec Work]',
    tags: ['[PLACEHOLDER: Tag 1]', '[PLACEHOLDER: Tag 2]', '[PLACEHOLDER: Tag 3]'],
    year: '[PLACEHOLDER: Year]',
    visualLabel: 'Nuécera — [PLACEHOLDER: Brief Description]',
    objective:
      '[PLACEHOLDER: 2–3 sentence brand objective for Nuécera. What was the brand trying to achieve, who are their customers, and what problem required a new creative approach.]',
    approach:
      '[PLACEHOLDER: Describe the approach taken for Nuécera. The strategic thinking, creative systems deployed, and how AI capability amplified the team\'s creative vision.]',
    outcome:
      '[PLACEHOLDER: Describe the measurable outcomes for Nuécera — business results, creative milestones, or systemic improvements.]',
    metric: '[PLACEHOLDER: Key metric or result]',
  },
]

const servicesFeatured = [
  'Campaign Direction',
  'AI Creative Systems',
  'Content Strategy',
  'Brand Strategy',
  'Creative Direction',
  'AI Integration',
  'Content Automation',
  'Creative Infrastructure',
  'Brand Repositioning',
]

/* ── Case Study Block ────────────────────────────────────────────────────── */
function CaseStudyBlock({
  study,
  index,
}: {
  study: (typeof caseStudies)[0]
  index: number
}) {
  return (
    <FadeUp delay={0.05}>
      <div className="py-16 md:py-20 lg:py-24">
        {/* Gold divider */}
        <div className="hr-gold mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — metadata (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
              {study.number}
            </span>
            <h2 className="font-fraunces text-display-md text-ivory font-light leading-tight">
              {study.brand}
            </h2>

            {/* Status badge */}
            <span className="inline-flex self-start items-center px-3 py-1 rounded-full border border-border text-label-sm font-inter text-muted">
              {study.status}
            </span>

            {/* Service tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-surface border border-border text-label-sm font-inter text-ivory/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Year */}
            <p className="font-inter text-label-md text-muted mt-2">
              {study.year}
            </p>
          </div>

          {/* Right — content (3/5) */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            {/* Visual placeholder */}
            <div className="w-full aspect-video bg-surface border border-border rounded-2xl flex items-center justify-center">
              <span className="font-inter text-label-md text-muted text-center px-6">
                [Case Study Visual — {study.visualLabel}]
              </span>
            </div>

            {/* Objective */}
            <div className="flex flex-col gap-2">
              <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
                Objective
              </span>
              <p className="font-inter text-body-md text-ivory/70 leading-relaxed">
                {study.objective}
              </p>
            </div>

            {/* Approach */}
            <div className="flex flex-col gap-2">
              <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
                Approach
              </span>
              <p className="font-inter text-body-md text-ivory/70 leading-relaxed">
                {study.approach}
              </p>
            </div>

            {/* Outcome */}
            <div className="flex flex-col gap-4">
              <span className="font-inter text-label-sm uppercase tracking-widest text-gold">
                Outcome
              </span>
              <p className="font-inter text-body-md text-ivory/70 leading-relaxed">
                {study.outcome}
              </p>
              {/* Metric callout */}
              <div className="border-l-2 border-gold/50 pl-5 py-1 mt-1">
                <p className="font-fraunces text-body-xl text-ivory font-light italic">
                  {study.metric}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function WorkPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury">
        <FadeUp>
          <p className="eyebrow mb-6">Selected Work</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="font-fraunces text-display-xl text-ivory font-light max-w-4xl mb-8 leading-tight">
            Creative systems built for beauty brands.
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="font-inter text-body-xl text-muted max-w-2xl mb-6 leading-relaxed">
            Each engagement is a collaboration — strategy, direction, and AI-native execution working as one.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="font-inter text-body-sm text-muted/60 italic">
            Works are labeled:{' '}
            <em className="text-ivory/40">*Live Client Work</em> or{' '}
            <em className="text-ivory/40">*Concept / Spec Work</em> for transparency.
          </p>
        </FadeUp>
      </section>

      {/* ── Case Studies ──────────────────────────────────────────────────── */}
      <section className="container-luxury pb-16">
        {caseStudies.map((study, i) => (
          <CaseStudyBlock key={study.brand} study={study} index={i} />
        ))}
      </section>

      {/* ── Services Featured ─────────────────────────────────────────────── */}
      <section className="section-pad bg-surface">
        <div className="container-luxury">
          <FadeUp>
            <p className="eyebrow mb-6">Services Across These Projects</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-fraunces text-display-md text-ivory font-light mb-12">
              What we build, together.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap gap-3">
              {servicesFeatured.map((service) => (
                <span
                  key={service}
                  className="px-4 py-2 rounded-full border border-gold/30 text-label-md font-inter text-gold/80 bg-gold/5"
                >
                  {service}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="section-pad container-luxury text-center">
        <FadeUp>
          <p className="font-inter text-body-xl text-muted mb-8">
            Interested in working together?
          </p>
          <Button asChild variant="gold" size="lg">
            <Link href="/contact">Apply for a Strategy Call</Link>
          </Button>
        </FadeUp>
      </section>
    </main>
  )
}
