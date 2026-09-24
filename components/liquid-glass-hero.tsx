'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * LiquidGlassHeroRefraction
 * 
 * Rebuilt from scratch with extreme restraint:
 * - A smooth, organic, rounded liquid-glass droplet/blob with subtle spherical harmonic displacement.
 * - Genuine transmission & clearcoat glass optics via MeshPhysicalMaterial + procedural HDR environment.
 * - Soft refraction, subtle specular highlights, gentle continuous rotation & breathing.
 * - Zero sharp facets, zero diagonal shards or planes cutting across the screen.
 * - Sits quietly as an ethereal, elegant visual complement behind/around the headline.
 */
export function LiquidGlassHeroRefraction() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Safety check for WebGL
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
      if (!gl) return
    } catch {
      return
    }

    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || 'ontouchstart' in window)

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || (isMobile ? 500 : 700)

    // Scene & Perspective Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50)
    camera.position.set(0, 0, 4.2)

    // WebGL Renderer with ACES Filmic tonemapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    container.appendChild(renderer.domElement)

    // ─────────────────────────────────────────────────────────────────────────
    // PROCEDURAL STUDIO LIGHTING ENVIRONMENT
    // Generates an offscreen monochrome studio reflection map for realistic glass caustics
    // ─────────────────────────────────────────────────────────────────────────
    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')
    if (ctx) {
      // Dark studio background
      ctx.fillStyle = '#080808'
      ctx.fillRect(0, 0, 512, 256)

      // Top softbox reflector (smooth white gradient)
      const gradTop = ctx.createRadialGradient(256, 40, 10, 256, 40, 180)
      gradTop.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
      gradTop.addColorStop(0.4, 'rgba(240, 240, 245, 0.6)')
      gradTop.addColorStop(1, 'rgba(8, 8, 8, 0)')
      ctx.fillStyle = gradTop
      ctx.fillRect(0, 0, 512, 200)

      // Left specular accent strip
      const gradLeft = ctx.createRadialGradient(70, 128, 5, 70, 128, 90)
      gradLeft.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
      gradLeft.addColorStop(1, 'rgba(8, 8, 8, 0)')
      ctx.fillStyle = gradLeft
      ctx.fillRect(0, 0, 200, 256)

      // Right soft rim reflector
      const gradRight = ctx.createRadialGradient(440, 140, 10, 440, 140, 120)
      gradRight.addColorStop(0, 'rgba(230, 230, 235, 0.65)')
      gradRight.addColorStop(1, 'rgba(8, 8, 8, 0)')
      ctx.fillStyle = gradRight
      ctx.fillRect(300, 0, 212, 256)
    }

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture
    scene.environment = envMap
    envTexture.dispose()

    // ─────────────────────────────────────────────────────────────────────────
    // GEOMETRY: Ultra-Smooth Organic Sphere / Droplet
    // Highly subdivided so surface normals interpolate with pure continuous curvature
    // ─────────────────────────────────────────────────────────────────────────
    const baseRadius = isMobile ? 1.05 : 1.25
    const segments = isMobile ? 48 : 64
    const sphereGeo = new THREE.SphereGeometry(baseRadius, segments, segments)

    // Store un-displaced unit normals
    const posAttr = sphereGeo.attributes.position
    const vertexCount = posAttr.count
    const normals = new Float32Array(vertexCount * 3)

    for (let i = 0; i < vertexCount; i++) {
      const x = posAttr.getX(i)
      const y = posAttr.getY(i)
      const z = posAttr.getZ(i)
      const len = Math.sqrt(x * x + y * y + z * z) || 1
      normals[i * 3]     = x / len
      normals[i * 3 + 1] = y / len
      normals[i * 3 + 2] = z / len
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MATERIAL: Physical Liquid Glass with Transmission & Clearcoat
    // Pure monochrome optical clarity, soft caustics, and subtle specular shine
    // ─────────────────────────────────────────────────────────────────────────
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      transmission: 0.96, // Near complete transmission
      roughness: 0.06,    // High clarity, soft specular sheen
      ior: 1.48,          // Natural crown glass / liquid refraction index
      thickness: 2.0,     // Volumetric refraction depth
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,     // High-gloss outer liquid sheen
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.88,
      attenuationColor: new THREE.Color(0xf4f4f6),
      attenuationDistance: 4.0,
    })

    const blobMesh = new THREE.Mesh(sphereGeo, glassMat)
    blobMesh.position.set(0, 0.08, 0)
    scene.add(blobMesh)

    // ─────────────────────────────────────────────────────────────────────────
    // DIRECTIONAL & RIM LIGHTING
    // ─────────────────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45)
    scene.add(ambientLight)

    const keyLight = new THREE.PointLight(0xffffff, 2.5, 15)
    keyLight.position.set(2.5, 3.2, 3.5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0xd4d4d8, 1.8, 15)
    fillLight.position.set(-2.5, -2.5, 2.0)
    scene.add(fillLight)

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

    // Interactive mouse parallax (very subtle)
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    function handleMouseMove(e: MouseEvent) {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ANIMATION LOOP: Continuous Organic Breathing & Gentle Rotation
    // Zero sudden movements, zero faceted jumps
    // ─────────────────────────────────────────────────────────────────────────
    let animId: number
    const clock = new THREE.Clock()
    let lastTime = 0
    const frameInterval = isMobile ? 1 / 30 : 1 / 60

    function animate(now: number) {
      animId = requestAnimationFrame(animate)
      const delta = (now - lastTime) / 1000
      if (isMobile && delta < frameInterval) return
      lastTime = now

      const time = clock.getElapsedTime()

      // Smooth mouse follow
      targetX += (mouseX * 0.25 - targetX) * 0.02
      targetY += (mouseY * 0.15 - targetY) * 0.02

      blobMesh.rotation.y = time * 0.08 + targetX
      blobMesh.rotation.x = Math.sin(time * 0.06) * 0.08 + targetY

      // Organic liquid surface breathing (smooth harmonic frequencies)
      const t = time * 0.42
      for (let i = 0; i < vertexCount; i++) {
        const nx = normals[i * 3]
        const ny = normals[i * 3 + 1]
        const nz = normals[i * 3 + 2]

        // Three harmonically blended spherical waves
        const wave1 = Math.sin(nx * 2.2 + t) * Math.cos(ny * 2.2 + t * 0.85)
        const wave2 = Math.sin(nz * 2.6 + t * 0.75) * 0.5
        const wave3 = Math.cos((nx + nz) * 1.8 + t * 0.6) * 0.35

        const displacement = (wave1 + wave2 + wave3) * 0.075 // Restrained 7.5% radius breathing
        const r = baseRadius * (1.0 + displacement)

        posAttr.setXYZ(i, nx * r, ny * r, nz * r)
      }
      posAttr.needsUpdate = true
      sphereGeo.computeVertexNormals()

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
      sphereGeo.dispose()
      glassMat.dispose()
      envMap.dispose()
      pmremGenerator.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-[1] overflow-hidden flex items-center justify-center opacity-85"
      aria-hidden="true"
    />
  )
}
