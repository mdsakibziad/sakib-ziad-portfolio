'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface MaskTextProps {
  lines: (string | React.ReactNode)[]
  className?: string
  align?: 'left' | 'right' | 'center'
  delay?: number
  immediate?: boolean
}

export function MaskText({
  lines,
  className = '',
  align = 'left',
  delay = 0,
  immediate = false,
}: MaskTextProps) {
  const alignCls =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`${alignCls} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${alignCls} py-[2px]`}>
          <motion.span
            className="block will-change-transform"
            initial={{ y: '100%', opacity: 0 }}
            {...(immediate
              ? {
                  animate: { y: '0%', opacity: 1 },
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: delay + i * 0.1,
                  },
                }
              : {
                  whileInView: { y: '0%', opacity: 1 },
                  viewport: { once: true, amount: 0.02 },
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: delay + i * 0.08,
                  },
                })}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
