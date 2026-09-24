'use client'

import React, { useRef, useState } from 'react'

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  tiltMaxAngle?: number
  glareOpacity?: number
}

/**
 * TiltCard
 * Adds physical 3D depth and cursor-tracking perspective tilt with a dynamic
 * monochromatic liquid-glass specular glare highlight.
 */
export function TiltCard({
  children,
  className = '',
  tiltMaxAngle = 6,
  glareOpacity = 0.16,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation (-tiltMaxAngle to +tiltMaxAngle)
    const rotateX = ((y - centerY) / centerY) * -tiltMaxAngle
    const rotateY = ((x - centerX) / centerX) * tiltMaxAngle

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    )

    // Glare position in percentage
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setGlarePosition({
      x: glareX,
      y: glareY,
      opacity: glareOpacity,
    })
  }

  function handleMouseLeave() {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Pure Monochromatic Liquid-Glass Specular Reflection */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 75%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
