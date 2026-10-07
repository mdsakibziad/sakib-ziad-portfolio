'use client'

import React, { useState } from 'react'
import { CheckCircle2, Calendar, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  { value: 'consulting', label: '1:1 Strategic Advisory & Direction', submissionType: 'consulting' },
  { value: 'automation', label: 'Autonomous Brand Systems & Asset Pipeline', submissionType: 'consulting' },
  { value: 'membership', label: 'Private Syndicate Membership', submissionType: 'membership' },
  { value: 'digital-products', label: 'Campaign Vault & Systems', submissionType: 'general' },
  { value: 'general', label: 'General Strategic Inquiry', submissionType: 'general' },
]

export function ApplicationForm({
  defaultInterest = 'general',
  pageSource = 'contact',
  title,
  subtitle,
  submitText = 'SUBMIT APPLICATION →',
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
      <div className={`border border-[#292929] bg-[#050609] p-8 sm:p-12 text-center space-y-6 ${className}`}>
        <div className="w-12 h-12 border border-[#f4521c] text-[#f4521c] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-inter font-black uppercase text-2xl sm:text-3xl text-[#ece8e1]">
          APPLICATION TRANSMITTED
        </h3>
        <p className="font-inter text-xs sm:text-sm text-[#bdb8b0] max-w-md mx-auto leading-relaxed">
          Thank you for detailing your brand. Sakib reviews all inquiries personally and will respond via email within 48 business hours.
        </p>

        {/* Meeting Window */}
        <div className="border border-[#292929] bg-[#0b0c10] p-6 text-left max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between border-b border-[#292929] pb-3">
            <span className="label-mono !text-[#f4521c]">DIRECT CALENDAR ACCESS</span>
            <Calendar className="w-4 h-4 text-[#8a8a8a]" />
          </div>
          <p className="font-inter text-xs text-[#8a8a8a] leading-relaxed">
            If your timeline is urgent and you wish to reserve a strategic window directly on the calendar:
          </p>
          {calUrl && !calUrl.includes('PLACEHOLDER') ? (
            <Button asChild className="btn-acid h-11 w-full rounded-none">
              <a href={calUrl} target="_blank" rel="noopener noreferrer">
                OPEN STRATEGY CALENDAR VIA CAL.COM →
              </a>
            </Button>
          ) : (
            <Button asChild className="btn-acid h-11 w-full rounded-none">
              <a href="mailto:Sakib@witlyn.com?subject=Priority%20Strategic%20Application">
                EMAIL SAKIB DIRECTLY (SAKIB@WITLYN.COM) →
              </a>
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {title && (
        <div className="border-b border-[#292929] pb-4">
          <span className="label-mono !text-[#f4521c] block mb-1">INTAKE FORM</span>
          <h3 className="font-inter font-black uppercase text-2xl text-[#ece8e1]">{title}</h3>
          {subtitle && <p className="font-inter text-xs text-[#8a8a8a] mt-1">{subtitle}</p>}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 border border-[#f4521c] bg-[#f4521c]/10 text-[#f4521c] label-mono text-xs">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
              FULL NAME *
            </label>
            <input
              required
              placeholder="e.g. Julian Vance"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
            />
          </div>
          <div>
            <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
              WORK EMAIL *
            </label>
            <input
              required
              type="email"
              placeholder="julian@brand.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
              BRAND / COMPANY NAME *
            </label>
            <input
              required
              placeholder="e.g. Solaé Botanicals"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
            />
          </div>
          <div>
            <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
              WEBSITE OR STOREFRONT URL *
            </label>
            <input
              required
              placeholder="https://yourbrand.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
              AREA OF INTEREST
            </label>
            <select
              className="w-full h-11 px-4 bg-[#050609] border border-[#292929] text-[#ece8e1] font-inter text-sm focus:outline-none focus:border-[#f4521c] rounded-none"
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value as AreaOfInterest })}
            >
              {INTEREST_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#050609] text-[#ece8e1]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
              IMPLEMENTATION TIMELINE
            </label>
            <select
              className="w-full h-11 px-4 bg-[#050609] border border-[#292929] text-[#ece8e1] font-inter text-sm focus:outline-none focus:border-[#f4521c] rounded-none"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            >
              <option value="Immediately (Next 2–4 weeks)" className="bg-[#050609] text-[#ece8e1]">Immediately (Next 2–4 weeks)</option>
              <option value="Within 1–2 months" className="bg-[#050609] text-[#ece8e1]">Within 1–2 months</option>
              <option value="1–3 months out" className="bg-[#050609] text-[#ece8e1]">1–3 months out</option>
              <option value="Exploring & Planning" className="bg-[#050609] text-[#ece8e1]">Exploring & Planning</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block label-mono text-[10px] text-[#8a8a8a] mb-1.5">
            TELL US ABOUT YOUR BRAND AND PRIMARY BOTTLENECK *
          </label>
          <textarea
            required
            rows={4}
            placeholder="What is your biggest creative friction or CPA bottleneck, current ad spend, and target outcome?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-4 bg-[#050609] border border-[#292929] text-[#ece8e1] placeholder-[#8a8a8a]/60 text-sm focus:outline-none focus:border-[#f4521c] rounded-none font-inter"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 btn-acid rounded-none uppercase font-inter font-bold tracking-wider"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>TRANSMITTING APPLICATION...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>{submitText}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}
