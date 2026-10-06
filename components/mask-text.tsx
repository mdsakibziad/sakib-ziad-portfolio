'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface MaskTextProps {
  lines: string[]
  className?: string
  delay?: number
  align?: 'left' | 'right' | 'center'
}

export function MaskText({
  lines,
  className = '',
  delay = 0,
  align = 'left',
}: MaskTextProps) {
  const alignCls =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`${alignCls} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${alignCls}`}>
          <motion.span
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.1,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
