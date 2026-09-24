'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface LiquidGlass3DProps {
  className?: string
  variant?: 'hero' | 'compact' | 'accent'
  interactive?: boolean
}

/**
 * Procedural Liquid Glass 3D Engine
 * Built natively in Three.js with zero external images, textures, or pre-rendered assets.
 * 
 * Features:
 * - Procedural Simplex-Noise vertex displacement executed on GPU in vertex shader
 * - Physical transmission material (MeshPhysicalMaterial) with real index-of-refraction (IOR: 1.52)
 * - Volumetric internal absorption (champagne gold attenuation)
 * - Razor-sharp clearcoat specular highlights and Fresnel rim refraction
 * - Procedural studio environment map generated in-memory via PMREMGenerator
 * - Inner luminous chromatic core refracting through the outer liquid shell
 * - Fully responsive with ResizeObserver, mobile GPU optimizations (throttled PR, low poly count)
 * - Guaranteed non-zero container sizing and pointer-events pass-through on mobile
 */
export function LiquidGlass3D({
  className = '',
  variant = 'hero',
  interactive = true,
}: LiquidGlass3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Verify WebGL availability
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
      if (!gl) {
        setIsSupported(false)
        return
      }
    } catch {
      setIsSupported(false)
      return
    }

    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)

    // Sizing with safe fallback for initial mobile mounting
    const width = container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 800)
    const height = container.clientHeight || (typeof window !== 'undefined' ? (isMobile ? 420 : 600) : 600)

    // Scene & Perspective Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 48 : 42,
      width / height,
      0.1,
      100
    )
    camera.position.z = isMobile ? 4.6 : 5.0

    // WebGL Renderer with Alpha Channel
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // ─────────────────────────────────────────────────────────────────────────────
    // PROCEDURAL STUDIO ENVIRONMENT MAP (In-Memory Canvas -> PMREM)
    // ─────────────────────────────────────────────────────────────────────────────
    let envMap: THREE.WebGLRenderTarget | null = null
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      pmremGenerator.compileEquirectangularShader()

      const envCanvas = document.createElement('canvas')
      envCanvas.width = 512
      envCanvas.height = 256
      const ctx = envCanvas.getContext('2d')
      if (ctx) {
        // Deep prestige studio gradient with golden and luminous light bands
        const grad = ctx.createLinearGradient(0, 0, 512, 256)
        grad.addColorStop(0.0, '#070707')
        grad.addColorStop(0.2, '#181613')
        grad.addColorStop(0.45, '#c9a66b') // Warm gold studio reflector
        grad.addColorStop(0.55, '#ffffff') // Specular high-intensity rim
        grad.addColorStop(0.75, '#262018')
        grad.addColorStop(1.0, '#070707')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 512, 256)

        // Studio Softbox lights
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
        ctx.fillRect(180, 30, 140, 50)
        ctx.fillStyle = 'rgba(201, 166, 107, 0.85)'
        ctx.fillRect(360, 100, 100, 70)
        ctx.fillStyle = 'rgba(255, 245, 220, 0.6)'
        ctx.fillRect(40, 140, 80, 50)

        const envTexture = new THREE.CanvasTexture(envCanvas)
        envTexture.mapping = THREE.EquirectangularReflectionMapping
        envMap = pmremGenerator.fromEquirectangular(envTexture)
        scene.environment = envMap.texture
        pmremGenerator.dispose()
        envTexture.dispose()
      }
    } catch {
      // Fallback gracefully without envMap
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // PROCEDURAL SIMPLEX NOISE GLSL VERTEX DISPLACEMENT
    // ─────────────────────────────────────────────────────────────────────────────
    const simplexShaderChunk = `
      // Simplex 3D noise
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      float snoise(vec3 v){
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0 );
        vec4 p = permute( permute( permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }
    `

    // ─────────────────────────────────────────────────────────────────────────────
    // OUTER LIQUID-GLASS SHELL (Transmission + IOR + Attenuation)
    // ─────────────────────────────────────────────────────────────────────────────
    const outerRadius = variant === 'compact' ? 1.0 : isMobile ? 1.25 : 1.45
    const outerDetail = isMobile ? 3 : 5
    const outerGeometry = new THREE.IcosahedronGeometry(outerRadius, outerDetail)

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xfcfaf6),
      transmission: 0.96,
      opacity: 1.0,
      transparent: true,
      roughness: 0.06,
      ior: 1.52,
      thickness: isMobile ? 1.8 : 2.4,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      attenuationColor: new THREE.Color(0xd4af37), // Champagne gold light absorption
      attenuationDistance: 2.2,
    })

    const customUniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 0.55 },
      uNoiseFreq: { value: 1.25 },
      uNoiseAmp: { value: isMobile ? 0.16 : 0.22 },
    }

    glassMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = customUniforms.uTime
      shader.uniforms.uSpeed = customUniforms.uSpeed
      shader.uniforms.uNoiseFreq = customUniforms.uNoiseFreq
      shader.uniforms.uNoiseAmp = customUniforms.uNoiseAmp

      shader.vertexShader = `
        uniform float uTime;
        uniform float uSpeed;
        uniform float uNoiseFreq;
        uniform float uNoiseAmp;
        ${simplexShaderChunk}
        ${shader.vertexShader}
      `

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        // Organic liquid droplet pulsing and wave morphing
        vec3 noiseCoord = position * uNoiseFreq + vec3(uTime * uSpeed * 0.4, uTime * uSpeed * 0.3, uTime * uSpeed * 0.2);
        float displacement = snoise(noiseCoord) * uNoiseAmp;
        transformed += normal * displacement;

        // Perturb normal for accurate dynamic refraction and specular glints
        vec3 p1 = position + vec3(0.015, 0.0, 0.0);
        vec3 p2 = position + vec3(0.0, 0.015, 0.0);
        float d1 = snoise(p1 * uNoiseFreq + vec3(uTime * uSpeed * 0.4)) * uNoiseAmp;
        float d2 = snoise(p2 * uNoiseFreq + vec3(uTime * uSpeed * 0.4)) * uNoiseAmp;
        vec3 v1 = (p1 + normal * d1) - transformed;
        vec3 v2 = (p2 + normal * d2) - transformed;
        vec3 calculatedNormal = normalize(cross(v1, v2));
        if (length(calculatedNormal) > 0.1) {
          vNormal = normalize(normalMatrix * calculatedNormal);
        }
        `
      )
    }

    const glassDroplet = new THREE.Mesh(outerGeometry, glassMaterial)
    scene.add(glassDroplet)

    // ─────────────────────────────────────────────────────────────────────────────
    // INNER LUMINOUS CHROMATIC CORE (Refracts through the liquid glass droplet)
    // ─────────────────────────────────────────────────────────────────────────────
    const innerRadius = outerRadius * 0.58
    const innerGeometry = new THREE.IcosahedronGeometry(innerRadius, isMobile ? 2 : 3)
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a66b,
      emissive: 0xb58e4d,
      emissiveIntensity: 0.65,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
      transparent: true,
      opacity: 0.45,
    })
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial)
    scene.add(innerCore)

    // Architectural Wireframe Halo
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8d5b5,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    })
    const wireHalo = new THREE.Mesh(outerGeometry, wireMaterial)
    wireHalo.scale.setScalar(1.08)
    scene.add(wireHalo)

    // ─────────────────────────────────────────────────────────────────────────────
    // FLOATING SUSPENDED GOLD MICRON PARTICLES
    // ─────────────────────────────────────────────────────────────────────────────
    const particleCount = isMobile ? 24 : 55
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6.5
      positions[i + 1] = (Math.random() - 0.5) * 6.5
      positions[i + 2] = (Math.random() - 0.5) * 3.5
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: isMobile ? 0.04 : 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // ─────────────────────────────────────────────────────────────────────────────
    // STUDIO LIGHT RIG (Key, Rim, Fill)
    // ─────────────────────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Key warm gold light
    const keyLight = new THREE.PointLight(0xc9a66b, 3.8, 25)
    keyLight.position.set(4, 3.5, 4.5)
    scene.add(keyLight)

    // Cool razor-sharp specular rim back light (causes glowing glass silhouette)
    const rimLight = new THREE.PointLight(0xffffff, 5.0, 25)
    rimLight.position.set(-4.5, 4.0, -3.5)
    scene.add(rimLight)

    // Under-fill champagne light
    const fillLight = new THREE.PointLight(0xedd9b5, 2.0, 20)
    fillLight.position.set(1.5, -4.0, 2.5)
    scene.add(fillLight)

    // ─────────────────────────────────────────────────────────────────────────────
    // INTERACTION & ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────────────────────
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    function onMouseMove(event: MouseEvent) {
      if (!interactive) return
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ResizeObserver ensures instant mounting calculation on mobile
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight
          camera.updateProjectionMatrix()
          renderer.setSize(newWidth, newHeight)
        }
      }
    })
    resizeObserver.observe(container)

    let animId: number
    const clock = new THREE.Clock()
    let lastRenderTime = 0
    const frameInterval = isMobile ? 1 / 45 : 1 / 60 // Cap frame rate on mobile to save GPU battery

    function animate(now: number) {
      animId = requestAnimationFrame(animate)

      // Throttle frame rate on mobile
      const delta = (now - lastRenderTime) / 1000
      if (isMobile && delta < frameInterval) {
        return
      }
      lastRenderTime = now

      const elapsedTime = clock.getElapsedTime()
      customUniforms.uTime.value = elapsedTime

      // Smooth inertia tracking
      targetX += (mouseX - targetX) * 0.04
      targetY += (mouseY - targetY) * 0.04

      // Gentle continuous organic fluid rotation
      const rotY = elapsedTime * 0.14 + targetX * 0.35
      const rotX = Math.sin(elapsedTime * 0.12) * 0.2 + targetY * 0.25

      glassDroplet.rotation.y = rotY
      glassDroplet.rotation.x = rotX

      innerCore.rotation.y = -elapsedTime * 0.22 + targetX * 0.2
      innerCore.rotation.x = Math.cos(elapsedTime * 0.16) * 0.25

      wireHalo.rotation.y = -rotY * 0.75
      wireHalo.rotation.x = rotX * 0.85

      particles.rotation.y = elapsedTime * 0.03
      particles.rotation.x = elapsedTime * 0.02

      renderer.render(scene, camera)
    }

    animId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      resizeObserver.disconnect()
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      if (envMap) {
        envMap.dispose()
      }
      outerGeometry.dispose()
      innerGeometry.dispose()
      wireMaterial.dispose()
      glassMaterial.dispose()
      innerMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [variant, interactive])

  if (!isSupported) {
    // Elegant CSS-based fallback with animated liquid gradient if WebGL is unavailable
    return (
      <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-gold/30 via-ivory/10 to-gold/40 blur-2xl animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[500px] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  )
}
