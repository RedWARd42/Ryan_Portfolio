import { useEffect, useRef } from 'react'
import './PixelCursorGlow.css'

function PixelCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let enabled = !reducedMotion.matches
    let hasPosition = false
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let animationFrame = 0

    const stopAnimation = () => {
      if (!animationFrame) return
      window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
    }

    const animate = () => {
      animationFrame = 0
      const deltaX = targetX - currentX
      const deltaY = targetY - currentY
      currentX += deltaX * 0.16
      currentY += deltaY * 0.16
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`

      if (Math.hypot(targetX - currentX, targetY - currentY) >= 0.1) {
        animationFrame = window.requestAnimationFrame(animate)
      } else {
        currentX = targetX
        currentY = targetY
        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!enabled) return

      targetX = event.clientX
      targetY = event.clientY
      if (!hasPosition) {
        currentX = targetX
        currentY = targetY
        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
        hasPosition = true
      }

      glow.classList.add('on')
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animate)
    }

    const handleMouseLeave = () => {
      glow.classList.remove('on')
      hasPosition = false
      stopAnimation()
    }

    const handleMotionPreferenceChange = () => {
      enabled = !reducedMotion.matches
      if (!enabled) handleMouseLeave()
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    reducedMotion.addEventListener('change', handleMotionPreferenceChange)

    return () => {
      stopAnimation()
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange)
    }
  }, [])

  return <div ref={glowRef} className="pixel-cursor-glow" aria-hidden="true" />
}

export default PixelCursorGlow
