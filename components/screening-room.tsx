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
  Layers,
  Clock,
} from 'lucide-react'

interface ScreeningFilm {
  id: string
  tabLabel: string
  title: string
  subhead: string
  duration: number
  durationFormatted: string
  src: string
  badge: string
  category: string
  objective: string
  hookAngle: string
  technicalNotes: string
  caseStudyLink?: string
}

const FILMS: ScreeningFilm[] = [
  {
    id: 'elara',
    tabLabel: '03 // ELARA · PRESTIGE BRAND FILM',
    title: 'ELARA BEAUTY · &ldquo;THE LUMINESCENCE ESSENCE&rdquo;',
    subhead: 'Prestige 90-Second Cinematic Narrative & Brand World-Building',
    duration: 90.0,
    durationFormatted: '01:30',
    src: '/films/elara-beauty-short-film.mp4',
    badge: 'PRESTIGE NARRATIVE',
    category: 'CINEMATIC SHORT FILM',
    objective: 'Demonstrating luxury high-fashion editorial pacing, world-building, and emotional brand aura beyond short 15-second social cuts.',
    hookAngle: 'Sensory Immersion: Hypnotic light refraction through glass vessels paired with delicate skin subsurface scattering.',
    technicalNotes: '1080P Master · 24 FPS Cinematic Shutter · Ambient Scoring · DaVinci Resolve Master Grade',
  },
  {
    id: 'solae',
    tabLabel: '04 // SOLAÉ · CONTRARIAN COMMERCE',
    title: 'SOLAÉ · &ldquo;AIRVEIL SPF50+ INVISIBLE SERUM&rdquo;',
    subhead: 'Direct-Response Performance Commercial for Daily Sun Protection',
    duration: 39.2,
    durationFormatted: '00:39',
    src: '/films/solae-commercial-film.mp4',
    badge: 'PERFORMANCE COMMERCE',
    category: 'CONTRARIAN AD COMMERCIAL',
    objective: 'Breaking the #1 objection in daily sunscreen usage: fear of chalky white cast and greasy makeup pilling.',
    hookAngle: 'Contrarian Visual: "Sunscreen shouldn’t look like white paint." Micro water-burst droplets proving zero cast within 1.5 seconds.',
    technicalNotes: 'High-Velocity Conversion Cut · 100% Clear Fluid Dynamics · Meta & Reels Native Pacing',
    caseStudyLink: '/work/solae',
  },
]

export function ScreeningRoom() {
  const [activeFilmIndex, setActiveFilmIndex] = useState(0)
  const activeFilm = FILMS[activeFilmIndex]

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Switch film
  const switchFilm = (index: number) => {
    if (index === activeFilmIndex) return
    setActiveFilmIndex(index)
    setProgress(0)
    setCurrentTime(0)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
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
    const dur = videoRef.current.duration || activeFilm.duration
    setCurrentTime(cur)
    setProgress((cur / dur) * 100)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = percent * (videoRef.current.duration || activeFilm.duration)
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

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f4521c]" />
              <span className="label-mono !text-[#f4521c] text-[11px] tracking-widest uppercase font-bold">
                DIRECTORIAL SCREENING ROOM · DUAL REPERTOIRE
              </span>
            </div>
            <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl md:text-6xl text-[#ece8e1] tracking-[-0.04em] leading-[1.05]">
              PRESTIGE NARRATIVE VS. CONTRARIAN COMMERCE
            </h2>
            <p className="font-inter text-sm sm:text-base text-[#ece8e1]/70 max-w-2xl font-medium leading-relaxed">
              Explore two distinct directorial executions: a 90-second luxury mood film demonstrating high-fashion cinematic pacing, and a 39-second direct-response commercial engineered around formula physics.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3.5 py-1.5 border border-[#292929] bg-[#0b0c10] text-[#ece8e1]/80 font-mono text-[11px] uppercase tracking-wider">
              SCREENING VAULT // 2 MASTER EDITS
            </span>
          </div>
        </div>

        {/* ── Interactive Film Switcher Tabs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {FILMS.map((film, idx) => {
            const isSelected = idx === activeFilmIndex
            return (
              <button
                key={film.id}
                onClick={() => switchFilm(idx)}
                className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'border-[#f4521c] bg-[#0b0c10] shadow-[0_0_25px_rgba(244,82,28,0.15)]'
                    : 'border-[#292929] bg-[#050609] hover:border-[#8a8a8a]/50 opacity-70 hover:opacity-100'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#f4521c]" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className={`label-mono text-[11px] font-bold ${isSelected ? '!text-[#f4521c]' : 'text-[#8a8a8a]'}`}>
                    {film.tabLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#292929] font-mono text-[10px] text-[#ece8e1]/90">
                    {film.durationFormatted}
                  </span>
                </div>
                <p className="font-inter font-bold text-sm sm:text-base text-[#ece8e1] uppercase">
                  {film.id === 'elara' ? 'Elara: 90s Prestige Narrative' : 'Solaé: 39s Performance Suncare'}
                </p>
                <p className="font-inter text-xs text-[#ece8e1]/60 mt-1 line-clamp-1">
                  {film.badge} · {film.category}
                </p>
              </button>
            )
          })}
        </div>

        {/* ── Cinema Theatrical Container ── */}
        <div
          ref={containerRef}
          className="relative w-full rounded-2xl overflow-hidden border border-[#292929] bg-black shadow-2xl group select-none"
        >
          {/* 16:9 Aspect Frame */}
          <div
            className="relative aspect-[16/9] w-full bg-black flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              key={activeFilm.src}
              src={activeFilm.src}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Subtle Cinema Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Center Big Play/Pause Indicator */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
                isPlaying ? 'opacity-0 scale-95 group-hover:opacity-60' : 'opacity-100 scale-100 bg-black/40'
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f4521c] text-white flex items-center justify-center shadow-2xl">
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
                )}
              </div>
            </div>

            {/* Top Bar HUD */}
            <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#292929] font-mono text-[10px] text-[#ece8e1] uppercase tracking-widest font-bold">
                  {activeFilm.badge}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#f4521c]/20 border border-[#f4521c]/40 font-mono text-[10px] text-[#f4521c] uppercase tracking-widest font-bold">
                  DIRECTOR MASTER CUT
                </span>
              </div>

              {/* Audio Toggle Pill */}
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
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#f4521c]">SOUND MASTERED</span>
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
                    <span>{activeFilm.durationFormatted}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-wider text-[#ece8e1]/60">
                    MASTER ASSET // 24FPS SOUND DESIGN
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

        {/* ── Directorial Breakdown Cards for Active Film ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">

          <div className="p-5 border border-[#292929] bg-[#0b0c10] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#f4521c]">
              <ShieldCheck className="w-4 h-4" />
              <span className="label-mono !text-[#f4521c] text-[10px] tracking-wider uppercase font-bold">
                DIRECTORIAL INTENT
              </span>
            </div>
            <h3 className="font-inter font-bold text-sm text-[#ece8e1] uppercase">Category Objective</h3>
            <p className="font-inter text-xs text-[#ece8e1]/70 leading-relaxed">
              {activeFilm.objective}
            </p>
          </div>

          <div className="p-5 border border-[#292929] bg-[#0b0c10] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#ece8e1]">
              <Sparkles className="w-4 h-4 text-[#f4521c]" />
              <span className="label-mono !text-[#f4521c] text-[10px] tracking-wider uppercase font-bold">
                PSYCHOLOGY &amp; HOOK
              </span>
            </div>
            <h3 className="font-inter font-bold text-sm text-[#ece8e1] uppercase">Conversion Thesis</h3>
            <p className="font-inter text-xs text-[#ece8e1]/70 leading-relaxed">
              {activeFilm.hookAngle}
            </p>
          </div>

          <div className="p-5 border border-[#292929] bg-[#0b0c10] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#ece8e1]">
              <Film className="w-4 h-4 text-[#f4521c]" />
              <span className="label-mono !text-[#f4521c] text-[10px] tracking-wider uppercase font-bold">
                PRODUCTION SPECS
              </span>
            </div>
            <h3 className="font-inter font-bold text-sm text-[#ece8e1] uppercase">Technical Execution</h3>
            <p className="font-inter text-xs text-[#ece8e1]/70 leading-relaxed">
              {activeFilm.technicalNotes}
            </p>
            {activeFilm.caseStudyLink && (
              <div className="pt-1">
                <Link
                  href={activeFilm.caseStudyLink}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#f4521c] hover:underline uppercase"
                >
                  EXPLORE FULL CASE STUDY →
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
