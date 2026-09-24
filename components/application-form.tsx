'use client'

import React, { useState } from 'react'
import { CheckCircle2, Calendar, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export type AreaOfInterest =
  | 'consulting'
  | 'automation'
  | 'membership'
  | 'digital-products'
  | 'general'

interface ApplicationFormProps {
  /** Pre-selected area of interest based on the host page */
  defaultInterest?: AreaOfInterest
  /** Human-readable page source identifier for the notification */
  pageSource?: string
  /** Custom heading rendered inside the form card */
  title?: string
  /** Custom sub-copy */
  subtitle?: string
  /** Submit button text */
  submitText?: string
  /** Optional container CSS class */
  className?: string
}

const INTEREST_OPTIONS: { value: AreaOfInterest; label: string; submissionType: 'consulting' | 'membership' | 'general' }[] = [
  { value: 'consulting', label: '1:1 Strategic Advisory & Consulting', submissionType: 'consulting' },
  { value: 'automation', label: 'Autonomous AI Brand Systems & Automation', submissionType: 'consulting' },
  { value: 'membership', label: 'Private Syndicate Membership', submissionType: 'membership' },
  { value: 'digital-products', label: 'Digital Products & Prompt Frameworks', submissionType: 'general' },
  { value: 'general', label: 'General Strategic Inquiry / Speaking', submissionType: 'general' },
]

export function ApplicationForm({
  defaultInterest = 'general',
  pageSource = 'contact',
  title,
  subtitle,
  submitText = 'Submit Strategic Application',
  className = '',
}: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    website: '',
    interest: defaultInterest,
    timeline: 'Within 1–2 months',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const calUrl = process.env.NEXT_PUBLIC_CAL_LINK

  const selectedInterestMeta = INTEREST_OPTIONS.find((opt) => opt.value === formData.interest) ?? INTEREST_OPTIONS[0]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const payload = {
        type: selectedInterestMeta.submissionType,
        name: formData.name.trim(),
        email: formData.email.trim(),
        brandName: formData.brand.trim(),
        brand: formData.brand.trim(),
        websiteUrl: formData.website.trim(),
        website: formData.website.trim(),
        areaOfInterest: selectedInterestMeta.label,
        timeline: formData.timeline,
        message: formData.message.trim(),
        primaryChallenge: formData.message.trim(),
        submittedFrom: pageSource,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application. Please try again.')
      }

      setIsSubmitted(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setErrorMessage(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`card-surface p-8 sm:p-12 border-gold/40 text-center animate-fade-in ${className}`}>
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mx-auto mb-6">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="heading-card text-2xl sm:text-3xl mb-3 text-ivory">
          Application Received
        </h3>
        <p className="body-editorial text-sm sm:text-base text-ivory/80 max-w-md mx-auto mb-8 leading-relaxed">
          Thank you for detailing your brand. Sakib reviews all inquiries personally and will respond via email within 48 hours.
        </p>

        {/* Optional Fast-Track Booking Card */}
        <div className="card-surface p-6 border-border text-left max-w-md mx-auto bg-surface/80">
          <div className="flex items-center gap-2.5 text-gold mb-2">
            <Calendar className="w-4 h-4" />
            <span className="font-fraunces text-base text-ivory">Direct Meeting Access</span>
          </div>
          <p className="body-muted text-xs mb-4 leading-relaxed">
            If your timing is urgent and you wish to reserve a strategic window directly on the calendar:
          </p>
          {calUrl && !calUrl.includes('PLACEHOLDER') ? (
            <Button asChild variant="gold" size="md" className="w-full">
              <a href={calUrl} target="_blank" rel="noopener noreferrer">
                Open Strategy Calendar via Cal.com
              </a>
            </Button>
          ) : (
            <Button asChild variant="gold" size="md" className="w-full">
              <a href="mailto:Sakib@witlyn.com?subject=Priority%20Strategic%20Application">
                Email Sakib Directly (Sakib@witlyn.com)
              </a>
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`card-surface p-8 sm:p-12 border-gold/30 ${className}`}>
      {title && (
        <div className="mb-8">
          <h3 className="heading-card text-2xl sm:text-3xl mb-2">{title}</h3>
          {subtitle && <p className="body-muted text-sm">{subtitle}</p>}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-inter">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
              Full Name *
            </label>
            <Input
              required
              placeholder="e.g. Julian Vance"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-surface border-border focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
              Work Email *
            </label>
            <Input
              required
              type="email"
              placeholder="julian@brand.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-surface border-border focus:border-gold"
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
              className="bg-surface border-border focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
              Website or Storefront URL *
            </label>
            <Input
              required
              type="url"
              placeholder="https://yourbrand.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="bg-surface border-border focus:border-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
              Area of Interest
            </label>
            <select
              className="w-full h-11 px-4 rounded-xl bg-surface border border-border text-ivory font-inter text-sm focus:outline-none focus:border-gold transition-colors"
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value as AreaOfInterest })}
            >
              {INTEREST_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-surface text-ivory">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
              Implementation Timeline
            </label>
            <select
              className="w-full h-11 px-4 rounded-xl bg-surface border border-border text-ivory font-inter text-sm focus:outline-none focus:border-gold transition-colors"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            >
              <option value="Immediately (Next 2–4 weeks)" className="bg-surface text-ivory">Immediately (Next 2–4 weeks)</option>
              <option value="Within 1–2 months" className="bg-surface text-ivory">Within 1–2 months</option>
              <option value="1–3 months out" className="bg-surface text-ivory">1–3 months out</option>
              <option value="Exploring & Planning" className="bg-surface text-ivory">Exploring & Planning</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-light font-inter mb-2">
            Tell us about your brand and what you wish to achieve *
          </label>
          <Textarea
            required
            rows={4}
            placeholder="What is your biggest creative or automation bottleneck, current monthly volume, and ideal outcome?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-surface border-border focus:border-gold"
          />
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full group/btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Application...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>{submitText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}
