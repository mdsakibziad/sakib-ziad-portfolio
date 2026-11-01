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
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  Layers,
  Smartphone,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VerticalFilm {
  id: string
  number: string
  title: string
  subtitle: string
  durationFormatted: string
  durationSec: number
  src: string
  channelTag: string
  retentionAngle: string
  soundDesign: string
  formatSpec: string
  performanceMetric: string
}

const VERTICAL_FILMS: VerticalFilm[] = [
  {
    id: 'vertical-01',
    number: '05',
    title: 'PERFORMANCE COMMERCIAL · REEL 01',
    subtitle: 'High-Velocity 9:16 Retention Hook & Product Reveal',
    durationFormatted: '00:15',
    durationSec: 15.1,
    src: '/films/commercial-vertical-01.mp4',
    channelTag: 'META REELS · TIKTOK · 9:16',
    retentionAngle: 'Sub-Second Hook: Immediate visual contrast arresting feed velocity within 0.8 seconds to defeat thumb scroll fatigue.',
    soundDesign: 'Crisp Spatial Audio: High-frequency texture cues calibrated to trigger organic sound-on engagement without friction.',
    formatSpec: '720×1280 Native 9:16 · 15.1s · AAC High-Fidelity Audio',
    performanceMetric: 'Engineered for Top-of-Funnel Prospecting & ROAS Escalation',
  },
  {
    id: 'vertical-02',
    number: '06',
    title: 'PERFORMANCE COMMERCIAL · REEL 02',
    subtitle: 'Direct-Response Kinetic Proof & Conversion Architecture',
    durationFormatted: '00:13',
    durationSec: 13.1,
    src: '/films/commercial-vertical-02.mp4',
    channelTag: 'PAID SOCIAL · CONVERSION CUT',
    retentionAngle: 'Sensory Micro-Proof: Rapid physical product demonstration creating instantaneous desire and frictionless objection elimination.',
    soundDesign: 'Dynamic Beat Pacing: Rhythmic cadence designed for seamless loop cycling and maximum view completion rate.',
    formatSpec: '720×1280 Native 9:16 · 13.1s · Seamless Loop Master',
    performanceMetric: 'Engineered for Retargeting & Direct Add-to-Cart Velocity',
  },
]

function VerticalPlayerCard({ film }: { film: VerticalFilm }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

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
    const curr = videoRef.current.currentTime
    const total = videoRef.current.duration || film.durationSec
    setCurrentTime(curr)
    setProgress((curr / total) * 100)
  }

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    const total = videoRef.current.duration || film.durationSec
    videoRef.current.currentTime = percent * total
  }

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
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
    <div className="border border-[#292929] bg-[#0b0c10] flex flex-col justify-between hover:border-[#f4521c]/60 transition-all duration-500 group">
      {/* ── Top Bar / Header ── */}
      <div className="p-5 border-b border-[#292929] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#f4521c] animate-pulse" />
          <span className="label-mono !text-[#f4521c] font-bold">
            FILM {film.number} // 9:16 VERTICAL
          </span>
        </div>
        <span className="label-mono text-[11px] text-[#8a8a8a] border border-[#292929] px-2 py-0.5 bg-[#050609]">
          {film.durationFormatted}
        </span>
      </div>

      {/* ── Middle: Phone-Framed Video Player ── */}
      <div className="p-5 flex justify-center bg-[#050609]/70">
        <div
          ref={containerRef}
          onClick={togglePlay}
          className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden border border-[#292929] group/player cursor-pointer bg-black shadow-2xl transition-all duration-500 hover:border-[#f4521c]/80"
        >
          {/* Native Video */}
          <video
            ref={videoRef}
            src={film.src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Luxury Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none" />

          {/* Top Badges inside frame */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#ece8e1] bg-black/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
              {film.channelTag}
            </span>
            <button
              onClick={toggleMute}
              className="pointer-events-auto p-2 rounded-full bg-black/80 text-white border border-white/20 hover:bg-[#f4521c] hover:border-[#f4521c] transition-all shadow-lg"
              aria-label={isMuted ? 'Unmute commercial' : 'Mute commercial'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-zinc-300" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              )}
            </button>
          </div>

          {/* Play / Pause Central Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div
              className={`w-12 h-12 rounded-full bg-black/70 border border-white/20 text-[#ece8e1] flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                isPlaying ? 'opacity-0 group-hover/player:opacity-80 scale-90' : 'opacity-100 scale-100'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 ml-0.5 fill-current text-[#f4521c]" />
              )}
            </div>
          </div>

          {/* Bottom Controls Bar inside frame */}
          <div className="absolute bottom-3 left-3 right-3 z-20 space-y-2 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            {/* Scrub bar */}
            <div
              onClick={handleScrub}
              className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer group/scrub relative"
            >
              <div
                className="h-full bg-[#f4521c] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#ece8e1]">
              <span className="bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                {formatTime(currentTime)} / {film.durationFormatted}
              </span>
              <button
                onClick={toggleFullscreen}
                className="p-1 rounded bg-black/60 text-white hover:text-[#f4521c] transition-colors"
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Directorial & Strategy Notes ── */}
      <div className="p-6 border-t border-[#292929] space-y-4">
        <div>
          <h3 className="font-inter font-black uppercase text-lg text-[#ece8e1] tracking-tight">
            {film.title}
          </h3>
          <p className="font-inter text-xs text-[#f4521c] font-medium tracking-wide mt-0.5">
            {film.subtitle}
          </p>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="border border-[#292929] bg-[#050609] p-3 space-y-1">
            <span className="label-mono text-[9px] text-[#8a8a8a] block">RETENTION HOOK STRATEGY</span>
            <p className="text-[#bdb8b0] leading-relaxed">{film.retentionAngle}</p>
          </div>

          <div className="border border-[#292929] bg-[#050609] p-3 space-y-1">
            <span className="label-mono text-[9px] text-[#8a8a8a] block">ACOUSTIC & PACING ARCHITECTURE</span>
            <p className="text-[#bdb8b0] leading-relaxed">{film.soundDesign}</p>
          </div>
        </div>

        {/* Footer Spec Pill */}
        <div className="pt-2 flex items-center justify-between border-t border-[#292929]/70 text-[10px] font-mono text-[#8a8a8a]">
          <span>{film.formatSpec}</span>
          <span className="text-[#f4521c] font-bold">READY FOR AD ACCOUNTS</span>
        </div>
      </div>
    </div>
  )
}

export function VerticalCommercialsShowcase() {
  return (
    <section
      className="relative bg-[#050609] text-[#ece8e1] py-24 border-t border-[#292929]"
      aria-label="Direct-Response Vertical Commercials"
    >
      <div className="container-luxury relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#292929] pb-4 mb-10 gap-3">
          <span className="label-mono !text-[#f4521c] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f4521c]" />
            FILM VAULT // 05 & 06 · 9:16 PERFORMANCE REELS
          </span>
          <span className="label-mono text-[#8a8a8a]">
            HIGH-CONVERSION DIRECT-RESPONSE DIRECTION
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-inter font-black uppercase text-3xl sm:text-5xl lg:text-6xl text-[#ece8e1] leading-[0.95] tracking-[-0.05em]">
              9:16 PERFORMANCE COMMERCIALS.
              <br />
              <span className="text-[#f4521c]">ENGINEERED FOR ROAS.</span>
            </h2>
            <p className="font-inter text-base sm:text-lg text-[#bdb8b0] max-w-2xl leading-relaxed">
              Widescreen builds brand mythology; vertical 9:16 converts attention into revenue. These high-velocity commercials are directed with sub-second thumb-stopping hooks, organic audio design, and native feed pacing for Meta Reels and TikTok.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="border border-[#292929] bg-[#0b0c10] p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#ece8e1]">
                <Smartphone className="w-4 h-4 text-[#f4521c]" />
                <span className="font-bold">MOBILE-NATIVE ARCHITECTURE</span>
              </div>
              <p className="text-xs text-[#8a8a8a] leading-relaxed">
                Click any phone viewport to play/pause. Use the audio icon in the top right to unmute sound design.
              </p>
            </div>
          </div>
        </div>

        {/* ── Vertical Dual Video Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VERTICAL_FILMS.map((film) => (
            <VerticalPlayerCard key={film.id} film={film} />
          ))}
        </div>

        {/* ── Bottom Directorial Summary Bar ── */}
        <div className="mt-12 border border-[#292929] bg-[#0b0c10] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#f4521c] flex items-center justify-center text-[#f4521c] font-black shrink-0">
              9:16
            </div>
            <div>
              <p className="font-inter font-bold text-sm text-[#ece8e1] uppercase">
                COMPLETE 6-FILM VAULT NOW ACTIVE
              </p>
              <p className="font-inter text-xs text-[#8a8a8a]">
                Lipéa Hero (16:9) · Director Statement (16:9) · Elara Cinema (16:9) · Solaé Ad (16:9) · Performance Commercials 01 & 02 (9:16)
              </p>
            </div>
          </div>

          <Button asChild className="btn-acid h-11 px-6 rounded-none shrink-0">
            <Link href="/contact" className="flex items-center gap-2">
              <span>COMMISSION PERFORMANCE FILMS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
