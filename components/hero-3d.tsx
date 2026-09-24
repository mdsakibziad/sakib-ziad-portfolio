'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Hero3D
 * Understated, luxury 3D ambient element for the Hero section.
 * Renders an abstract rotating metallic/glass form with a gold particle dust field
 * that gently reacts to mouse cursor movement without distracting from headline typography.
 */
export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5.2

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Inner Smooth Geometry
    const geometry = new THREE.IcosahedronGeometry(1.6, 2)
    const material = new THREE.MeshStandardMaterial({
      color: 0xc9a66b,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.28,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Outer Architectural Wireframe Cage
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8d5b5,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    })
    const wireMesh = new THREE.Mesh(geometry, wireMaterial)
    wireMesh.scale.setScalar(1.05)
    scene.add(wireMesh)

    // Floating Golden Particle Field
    const particleCount = 70
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 9
      positions[i + 1] = (Math.random() - 0.5) * 9
      positions[i + 2] = (Math.random() - 0.5) * 4
    }
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc9a66b,
      size: 0.03,
      transparent: true,
      opacity: 0.45,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xc9a66b, 3, 20)
    pointLight1.position.set(4, 3, 4)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xe5d0a8, 1.8, 20)
    pointLight2.position.set(-4, -2, -2)
    scene.add(pointLight2)

    // Interactive Mouse Tracking
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    function onMouseMove(event: MouseEvent) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // Handle Window Resize
    function onResize() {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    function animate() {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      mesh.rotation.y = elapsedTime * 0.12 + targetX * 0.35
      mesh.rotation.x = Math.sin(elapsedTime * 0.08) * 0.18 + targetY * 0.25

      wireMesh.rotation.y = -elapsedTime * 0.08 + targetX * 0.25
      wireMesh.rotation.x = Math.cos(elapsedTime * 0.08) * 0.18 + targetY * 0.2

      particles.rotation.y = elapsedTime * 0.025
      particles.rotation.x = elapsedTime * 0.015

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      wireMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-55 mix-blend-screen"
      aria-hidden="true"
    />
  )
}
