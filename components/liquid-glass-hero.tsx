'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * LiquidGlassHeroRefraction
 * Inspired by Apple's restrained liquid-glass material:
 * A subtle, architectural monochrome light refraction sheet that gently undulates
 * with soft specular highlights, silver caustics, and zero circular/orb shapes.
 * Optimized specifically for mobile GPUs with low polycount and zero layout shift.
 */
export function LiquidGlassHeroRefraction() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Safety check for WebGL
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) return
    } catch {
      return
    }

    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || (isMobile ? 450 : 650)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
    camera.position.set(0, 0, 4.5)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    container.appendChild(renderer.domElement)

    // ─────────────────────────────────────────────────────────────────────────
    // PROCEDURAL MONOCHROME GLASS REFRACTION PLANE (Curved Horizon Wave)
    // ─────────────────────────────────────────────────────────────────────────
    const segmentsX = isMobile ? 24 : 48
    const segmentsY = isMobile ? 16 : 32
    const planeGeo = new THREE.PlaneGeometry(6.5, 3.8, segmentsX, segmentsY)

    // Pure monochrome physical glass material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      transmission: 0.94,
      roughness: 0.12,
      ior: 1.45,
      thickness: 1.5,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.45,
      wireframe: false,
    })

    // Store original z positions
    const posAttr = planeGeo.attributes.position
    const count = posAttr.count
    const originalZ = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      originalZ[i] = posAttr.getZ(i)
    }

    const mesh = new THREE.Mesh(planeGeo, glassMat)
    mesh.position.set(0, -0.4, -0.5)
    mesh.rotation.x = -0.35 // Slightly tilted backward to catch overhead light
    scene.add(mesh)

    // ─────────────────────────────────────────────────────────────────────────
    // LIGHTING: Monochrome Key, Rim & Specular Glint
    // ─────────────────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35)
    scene.add(ambientLight)

    // Overhead cool white key light
    const keyLight = new THREE.PointLight(0xffffff, 3.5, 20)
    keyLight.position.set(0, 3.0, 3.0)
    scene.add(keyLight)

    // Soft rim light from below
    const rimLight = new THREE.PointLight(0xd4d4d8, 2.0, 15)
    rimLight.position.set(0, -3.0, 1.0)
    scene.add(rimLight)

    // ResizeObserver
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect
        if (w > 0 && h > 0) {
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        }
      }
    })
    ro.observe(container)

    // Subtle cursor tracking
    let targetX = 0
    let mouseX = 0
    function handleMouseMove(e: MouseEvent) {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
    }
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    // Animation loop — gentle continuous liquid wave motion
    let animId: number
    const clock = new THREE.Clock()
    let lastTime = 0
    const interval = isMobile ? 1 / 30 : 1 / 60

    function animate(now: number) {
      animId = requestAnimationFrame(animate)
      const delta = (now - lastTime) / 1000
      if (isMobile && delta < interval) return
      lastTime = now

      const time = clock.getElapsedTime()
      targetX += (mouseX - targetX) * 0.03

      // Deform plane vertices with gentle sine/cosine liquid surface waves
      const speed = isMobile ? 0.45 : 0.6
      for (let i = 0; i < count; i++) {
        const x = posAttr.getX(i)
        const y = posAttr.getY(i)
        const wave =
          Math.sin(x * 1.2 + time * speed) * 0.12 +
          Math.cos(y * 1.5 + time * (speed * 0.8)) * 0.08 +
          Math.sin((x + y) * 0.8 + time * (speed * 0.5)) * 0.06

        posAttr.setZ(i, wave)
      }
      posAttr.needsUpdate = true
      planeGeo.computeVertexNormals()

      // Subtle horizontal tilt with mouse
      mesh.rotation.y = targetX * 0.15

      renderer.render(scene, camera)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      planeGeo.dispose()
      glassMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-[1] overflow-hidden opacity-40 mix-blend-screen"
      aria-hidden="true"
    />
  )
}
