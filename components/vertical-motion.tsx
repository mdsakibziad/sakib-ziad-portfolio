'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const

/**
 * MaskedText: Replicates Vertical's masked text reveal.
 * Splits text into lines/words and reveals them from an overflow-hidden wrapper.
 */
interface MaskedTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export function MaskedText({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  as: Component = 'div',
}: MaskedTextProps) {
  const words = children.split(' ')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: delay,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: {
      y: '110%',
      opacity: 0,
      rotateX: 15,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease: EASE_EDITORIAL,
      },
    },
  }

  return (
    <Component className={className}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.05em]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              variants={wordVariants}
              className="inline-block will-change-transform transform-gpu origin-bottom"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  )
}

/**
 * EditorialReveal: Smooth upward fade and mask for whole block elements.
 */
export function EditorialReveal({
  children,
  className = '',
  delay = 0,
  yOffset = 30,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.85,
        delay,
        ease: EASE_EDITORIAL,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StickyStackedSection: For the signature vertical card stacking effect.
 * The section pins or slows down while shrinking slightly as the next one scrolls over.
 */
export function StickyStackedSection({
  children,
  index = 0,
  className = '',
}: {
  children: React.ReactNode
  index?: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Subtle vertical stacking compression
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96 - index * 0.01])
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 0.9, 0.6])

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity }}
      className={`relative will-change-transform transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  )
}
