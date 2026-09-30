'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealTextProps {
  children: string
  className?: string
  highlightWords?: string[]
  highlightClassName?: string
  delay?: number
}

export function ScrollRevealText({
  children,
  className = '',
  highlightWords = [],
  highlightClassName = 'italic font-fraunces text-zinc-950 dark:text-white font-light',
  delay = 0,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  const words = children.split(' ')

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '')
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        )

        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-top">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.035,
              }}
              className={`inline-block ${isHighlighted ? highlightClassName : ''}`}
            >
              {word}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
