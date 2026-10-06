'use client'

import React from 'react'

interface MaskTextProps {
  lines: string[]
  className?: string
  align?: 'left' | 'right' | 'center'
}

export function MaskText({
  lines,
  className = '',
  align = 'left',
}: MaskTextProps) {
  const alignCls =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`${alignCls} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${alignCls}`}>
          <span
            className="block transform translate-y-0 opacity-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  )
}
