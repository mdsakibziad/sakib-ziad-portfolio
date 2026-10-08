'use client'

import React from 'react'
import { ArrowUpRight, Linkedin, Instagram, Facebook } from 'lucide-react'
import { ApplicationForm } from '@/components/application-form'

export default function ContactPage() {
  return (
    <div className="bg-[#050609] text-[#ece8e1] min-h-screen selection:bg-[#f4521c] selection:text-[#050609] pt-28 sm:pt-36">

      {/* ── Top Meta Bar ── */}
      <div className="container-luxury border-b border-[#292929] pb-4 mb-12">
        <div className="flex items-center justify-between">
          <span className="label-mono !text-[#f4521c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f4521c]" />
            IDX/06 — CONTACT
          </span>
          <span className="label-mono text-[#8a8a8a]">
            DIRECT ADVISORY APPLICATION
          </span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="container-luxury pb-16 border-b border-[#292929]" aria-label="Contact Header">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-inter font-black uppercase text-[clamp(2.5rem,6.2vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-[#ece8e1]">
            EVERY PARTNERSHIP <br />
            <span className="text-[#f4521c]">BEGINS WITH A</span> <br />
            CONVERSATION.
          </h1>

          <p className="font-inter text-base sm:text-lg md:text-xl font-medium text-[#bdb8b0] max-w-xl leading-relaxed tracking-tight">
            I review every application personally and respond within 48 business hours. Please provide your brand context and current friction bottlenecks.
          </p>
          <div className="pt-2 flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#8a8a8a]">
            <span>Hiring?</span>
            <a
              href="/resume.pdf"
              download="Sakib_Ziad_Resume.pdf"
              className="text-[#f4521c] hover:underline flex items-center gap-1 font-bold"
            >
              Download Résumé (PDF) →
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Form & Info Grid ─────────────────────────────────────────── */}
      <section className="py-20" aria-label="Application Form">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 border border-[#292929] bg-[#0b0c10] p-8">
              <ApplicationForm
                defaultInterest="general"
                pageSource="contact"
                title="DIRECT STRATEGIC APPLICATION"
                subtitle="Please detail your brand and current bottlenecks to initiate review."
                submitText="SUBMIT APPLICATION →"
              />
            </div>

            {/* Sidebar Column: Direct Contacts & Channels */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="border border-[#292929] bg-[#0b0c10] p-8 space-y-6">
                <span className="label-mono !text-[#f4521c] block border-b border-[#292929] pb-4">
                  DIRECT CHANNELS
                </span>

                <div>
                  <span className="label-mono text-[10px] text-[#8a8a8a] block mb-1">DIRECT INQUIRIES</span>
                  <a
                    href="mailto:witlyn@sakibziad.my"
                    className="font-inter font-bold text-lg text-[#ece8e1] hover:text-[#f4521c] transition-colors"
                  >
                    witlyn@sakibziad.my
                  </a>
                </div>

                <div className="pt-4 border-t border-[#292929] space-y-3">
                  <span className="label-mono text-[10px] text-[#8a8a8a] block mb-2">OFFICIAL NETWORKS</span>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href="https://www.linkedin.com/in/sakib-ziad-290104211/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs font-inter text-[#bdb8b0] hover:text-[#f4521c] transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#8a8a8a]" />
                      <span>LinkedIn / sakib-ziad</span>
                    </a>
                    <a
                      href="https://www.instagram.com/sakibziad/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs font-inter text-[#bdb8b0] hover:text-[#f4521c] transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-[#8a8a8a]" />
                      <span>Instagram / @sakibziad</span>
                    </a>
                    <a
                      href="https://www.facebook.com/sakibziad.21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs font-inter text-[#bdb8b0] hover:text-[#f4521c] transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-[#8a8a8a]" />
                      <span>Facebook / sakibziad.21</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#292929]">
                  <span className="label-mono text-[10px] text-[#8a8a8a] block mb-1">FULL-SERVICE STUDIO</span>
                  <a
                    href="https://witlyn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 label-mono !text-[#f4521c] hover:underline text-xs"
                  >
                    <span>WITLYN COMMERCIAL STUDIO</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
