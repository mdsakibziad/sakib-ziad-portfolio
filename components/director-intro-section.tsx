'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  FileText,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DirectorIntroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const cur = videoRef.current.currentTime
    const dur = videoRef.current.duration || 46.0
    setProgress((cur / dur) * 100)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    videoRef.current.currentTime = percent * (videoRef.current.duration || 46.0)
    setProgress(percent * 100)
  }

  return (
    <section className="relative bg-[#050609] py-16 sm:py-24 border-b border-[#292929] overflow-hidden">
      <div className="container-luxury space-y-12">

        {/* Section Header */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f4521c]" />
          <span className="label-mono !text-[#f4521c] text-[11px] tracking-widest uppercase font-bold">
            02 // THE DIRECTOR &amp; STRATEGIST
          </span>
        </div>

        {/* Split Theater: Video Left (7 cols) + Directorial Thesis Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: 46s Director Intro Video */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#292929] bg-black shadow-2xl group select-none">
              
              {/* Aspect 16:9 Video Box */}
              <div
                className="relative aspect-[16/9] w-full bg-black cursor-pointer flex items-center justify-center"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  src="/films/sakib-intro-reel.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Big Center Play/Pause button */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-0 scale-95 group-hover:opacity-75' : 'opacity-100 scale-100 bg-black/40'
                  }`}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f4521c] text-white flex items-center justify-center shadow-xl">
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
                  </div>
                </div>

                {/* Top Corner HUD */}
                <div className="absolute top-4 inset-x-4 sm:top-5 sm:inset-x-5 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-3 py-1 rounded bg-black/85 backdrop-blur-md border border-[#292929] font-mono text-[10px] text-[#ece8e1] uppercase tracking-wider font-bold">
                    SAKIB ZIAD · DIRECTOR STATEMENT
                  </span>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[#ece8e1] hover:border-[#f4521c] hover:text-[#f4521c] transition-all group/sound"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-[#ece8e1]/70 group-hover/sound:text-[#f4521c]" />
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">UNMUTE SPEECH</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#f4521c] animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#f4521c]">AUDIO ON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom Scrub Bar & Runtime */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/95 to-transparent z-10 space-y-2"
                >
                  <div
                    onClick={handleSeek}
                    className="relative h-1.5 w-full bg-[#292929] rounded-full cursor-pointer overflow-hidden transition-all hover:h-2"
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-[#f4521c] rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[#ece8e1] pt-1">
                    <div className="flex items-center gap-3">
                      <button onClick={togglePlay} className="p-1 hover:text-[#f4521c] transition-colors">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button onClick={toggleMute} className="p-1 hover:text-[#f4521c] transition-colors">
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#f4521c]" />}
                      </button>
                      <span className="font-mono text-[11px] text-[#ece8e1]/70">
                        DIRECTOR INTRO · 00:46
                      </span>
                    </div>

                    <span className="font-mono text-[10px] uppercase text-[#f4521c] tracking-widest font-bold">
                      1080P MASTER AUDIO
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right: Directorial Thesis & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <span className="label-mono !text-[#8a8a8a] text-[11px] tracking-wider uppercase block">
                CREATIVE PHILOSOPHY
              </span>
              <h2 className="font-inter font-black uppercase text-2xl sm:text-4xl text-[#ece8e1] tracking-[-0.04em] leading-[1.08]">
                NOT RANDOM AI PROMPTS. COMMERCIAL SYSTEMS.
              </h2>
            </div>

            <p className="font-inter text-sm sm:text-base text-[#ece8e1]/80 leading-relaxed">
              Traditional production houses demand 6–8 weeks, expensive studio hires, and $50k+ budgets for ad sets that fatigue in 14 days. 
              <br /><br />
              I bridge <strong className="text-[#ece8e1]">consumer psychology</strong> with <strong className="text-[#f4521c]">generative AI production pipelines</strong>—directing high-fashion lighting caustics, macro fluid physics, and contrarian hook angles that scale prestige beauty brands in 72 hours.
            </p>

            {/* Credential Indicators */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#292929]">
              <div className="p-3 border border-[#292929] bg-[#0b0c10] rounded-lg">
                <span className="label-mono text-[#8a8a8a] text-[9px] block">ACADEMIC CREDENTIAL</span>
                <p className="font-inter font-bold text-xs text-[#ece8e1] mt-0.5">BSc in AI (Lincoln 2026)</p>
              </div>

              <div className="p-3 border border-[#292929] bg-[#0b0c10] rounded-lg">
                <span className="label-mono text-[#8a8a8a] text-[9px] block">COMMERCIAL SCALE</span>
                <p className="font-inter font-bold text-xs text-[#ece8e1] mt-0.5">135+ Assets Directed</p>
              </div>

              <div className="p-3 border border-[#292929] bg-[#0b0c10] rounded-lg">
                <span className="label-mono text-[#8a8a8a] text-[9px] block">STUDIO LEADERSHIP</span>
                <p className="font-inter font-bold text-xs text-[#ece8e1] mt-0.5">Founder, Witlyn Studio</p>
              </div>

              <div className="p-3 border border-[#292929] bg-[#0b0c10] rounded-lg">
                <span className="label-mono text-[#8a8a8a] text-[9px] block">PRODUCTION SPEED</span>
                <p className="font-inter font-bold text-xs text-[#f4521c] mt-0.5">72-Hour Delivery</p>
              </div>
            </div>

            {/* Direct Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button asChild className="btn-acid h-11 px-5 rounded-none font-bold text-xs tracking-wider uppercase">
                <Link href="/contact">
                  APPLY FOR STRATEGY CALL <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 px-5 rounded-none border-[#292929] bg-[#0b0c10] text-[#ece8e1] hover:border-[#f4521c] hover:text-[#f4521c] font-mono text-xs uppercase tracking-wider font-bold"
              >
                <a href="/resume.pdf" download="Sakib_Ziad_Resume.pdf">
                  RÉSUMÉ (PDF) ↗
                </a>
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
