'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Film,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export function HeroCommercialFilm() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(35.4)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

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
    const dur = videoRef.current.duration || 35.4
    setCurrentTime(cur)
    setDuration(dur)
    setProgress((cur / dur) * 100)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = percent * (videoRef.current.duration || 35.4)
    videoRef.current.currentTime = newTime
    setProgress(percent * 100)
  }

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  return (
    <section className="relative bg-[#050609] py-16 sm:py-24 border-b border-[#292929] overflow-hidden">
      <div className="container-luxury space-y-8">
        
        {/* ── Section Directorial Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f4521c] animate-pulse" />
              <span className="label-mono !text-[#f4521c] text-[11px] tracking-widest uppercase font-bold">
                01 // FEATURED COMMERCIAL DIRECTION
              </span>
            </div>
            <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl md:text-6xl text-[#ece8e1] tracking-[-0.04em] leading-[1.05]">
              LIPÉA · &ldquo;PEPTIDE GLASS&rdquo;
            </h2>
            <p className="font-inter text-sm sm:text-base text-[#ece8e1]/70 max-w-2xl font-medium leading-relaxed">
              High-converting hero commercial directed for luxury peptide lip serum. Engineered to overcome the category&apos;s primary objection—sticky glue drag—through high-refraction macro caustics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-3.5 py-1.5 border border-[#292929] bg-[#0b0c10] text-[#ece8e1]/80 font-mono text-[11px] uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f4521c]" />
              RUNTIME: 00:35 · 1080P MASTER
            </div>
            <Link
              href="/work/lipea"
              className="btn-acid inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase"
            >
              FULL CASE STUDY <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Cinema Theatrical Container ── */}
        <div
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          className="relative w-full rounded-2xl overflow-hidden border border-[#292929] bg-black shadow-2xl group select-none"
        >
          {/* 16:9 Aspect Frame */}
          <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
            <video
              ref={videoRef}
              src="/films/lipea-hero-film.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Subtle Cinema Letterbox Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Center Big Play/Pause Indicator (fades out when playing) */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
                isPlaying ? 'opacity-0 scale-95 group-hover:opacity-60' : 'opacity-100 scale-100 bg-black/40'
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f4521c] text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-105">
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
                )}
              </div>
            </div>

            {/* Top Bar HUD inside Video */}
            <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#292929] font-mono text-[10px] text-[#ece8e1] uppercase tracking-widest font-bold">
                  DIRECTOR CUT · WITLYN STUDIO
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#f4521c]/20 border border-[#f4521c]/40 font-mono text-[10px] text-[#f4521c] uppercase tracking-widest font-bold">
                  BEAUTY &amp; SKINCARE
                </span>
              </div>

              {/* Prominent Audio Toggle Pill */}
              <button
                type="button"
                onClick={toggleMute}
                className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[#ece8e1] hover:border-[#f4521c] hover:text-[#f4521c] transition-all shadow-lg active:scale-95 group/aud"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-[#ece8e1]/70 group-hover/aud:text-[#f4521c]" />
                    <span className="font-mono text-xs uppercase tracking-wider font-bold">UNMUTE SOUND</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#f4521c] animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#f4521c]">SOUND ON (ASMR)</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-10 space-y-3"
            >
              {/* Scrubbable Progress Bar */}
              <div
                onClick={handleSeek}
                className="relative h-2 w-full bg-[#292929] rounded-full cursor-pointer overflow-hidden group/bar transition-all hover:h-2.5"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-[#f4521c] rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bottom Control Buttons & Time */}
              <div className="flex items-center justify-between text-[#ece8e1] pt-1">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-1 hover:text-[#f4521c] transition-colors focus:outline-none"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1 hover:text-[#f4521c] transition-colors focus:outline-none"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#f4521c]" />}
                  </button>

                  <div className="font-mono text-xs tracking-wider text-[#ece8e1]/80">
                    <span className="text-[#ece8e1] font-bold">{formatTime(currentTime)}</span>
                    <span className="text-[#ece8e1]/40 mx-1.5">/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-wider text-[#ece8e1]/60">
                    DIRECTORIAL TELEMETRY · 1080P MASTER
                  </span>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1 hover:text-[#f4521c] transition-colors focus:outline-none"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Directorial Breakdown Cards (Under Hero Video) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-5 border border-[#292929] bg-[#0b0c10] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#f4521c]">
              <ShieldCheck className="w-4 h-4" />
              <span className="label-mono !text-[#f4521c] text-[10px] tracking-wider uppercase font-bold">
                01 · CATEGORY FRICTION
              </span>
            </div>
            <h3 className="font-inter font-bold text-sm text-[#ece8e1] uppercase">The Sticky Glue Objection</h3>
            <p className="font-inter text-xs text-[#ece8e1]/70 leading-relaxed">
              Consumers abandon lip oil carts over fear of hair getting trapped in tacky residue. Empty ad copy cannot dissolve this anxiety.
            </p>
          </div>

          <div className="p-5 border border-[#292929] bg-[#0b0c10] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#ece8e1]">
              <Sparkles className="w-4 h-4 text-[#f4521c]" />
              <span className="label-mono !text-[#f4521c] text-[10px] tracking-wider uppercase font-bold">
                02 · DIRECTORIAL EVIDENCE
              </span>
            </div>
            <h3 className="font-inter font-bold text-sm text-[#ece8e1] uppercase">Macro Physics &amp; Glass Caustics</h3>
            <p className="font-inter text-xs text-[#ece8e1]/70 leading-relaxed">
              We choreographed 100mm extreme macro fluid motion demonstrating clean-glide cushion and mirror-glaze light refraction with zero tack.
            </p>
          </div>

          <div className="p-5 border border-[#292929] bg-[#0b0c10] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#ece8e1]">
              <Film className="w-4 h-4 text-[#f4521c]" />
              <span className="label-mono !text-[#f4521c] text-[10px] tracking-wider uppercase font-bold">
                03 · CAMPAIGN SCALE
              </span>
            </div>
            <h3 className="font-inter font-bold text-sm text-[#ece8e1] uppercase">27 Omnichannel Deliverables</h3>
            <p className="font-inter text-xs text-[#ece8e1]/70 leading-relaxed">
              From this single commercial direction, 27 platform-native assets were generated across Meta 1:1, TikTok 9:16, and e-commerce landers.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
