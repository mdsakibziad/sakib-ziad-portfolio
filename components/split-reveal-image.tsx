'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SplitRevealImageProps {
  src: string
  alt: string
  aspect?: string
  className?: string
  priority?: boolean
}

export function SplitRevealImage({
  src,
  alt,
  aspect = 'aspect-[3/4]',
  className = '',
}: SplitRevealImageProps) {
  return (
    <div className={`relative overflow-hidden w-full ${aspect} ${className} bg-[#0b0c10]`}>
      {/* Scaled Image */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />

      {/* Left Shutter Panel */}
      <motion.div
        initial={{ x: 0 }}
        whileInView={{ x: '-101%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[#050609] z-10"
      />

      {/* Right Shutter Panel */}
      <motion.div
        initial={{ x: 0 }}
        whileInView={{ x: '101%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none absolute inset-y-0 right-0 w-[calc(50%+1px)] bg-[#050609] z-10"
      />
    </div>
  )
}
