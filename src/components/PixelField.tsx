import { useEffect, useRef } from 'react'

const pixelSize = 12

function PixelField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: false })
    if (!context) {
      throw new Error('The browser could not initialize the portfolio canvas.')
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
    let animationFrame = 0
    let lastFrame = 0

    const parseColorToken = (name: string) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
        .split(',')
        .map((value) => Number(value.trim()))

    const hash = (x: number, y: number) => {
      const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
      return value - Math.floor(value)
    }

    const smoothNoise = (x: number, y: number) => {
      const x0 = Math.floor(x)
      const y0 = Math.floor(y)
      const tx = x - x0
      const ty = y - y0
      const sx = tx * tx * (3 - 2 * tx)
      const sy = ty * ty * (3 - 2 * ty)
      const top = hash(x0, y0) * (1 - sx) + hash(x0 + 1, y0) * sx
      const bottom = hash(x0, y0 + 1) * (1 - sx) + hash(x0 + 1, y0 + 1) * sx
      return top * (1 - sy) + bottom * sy
    }

    const cloudValue = (u: number, v: number, drift: number) =>
      smoothNoise(u * 3 + drift, v * 3 - drift * 0.4) * 0.58 +
      smoothNoise(u * 6 - drift * 0.7, v * 6 + drift * 0.25) * 0.28 +
      smoothNoise(u * 12 + drift * 0.4, v * 12 - drift * 0.18) * 0.14

    const drawFrame = (time: number) => {
      const width = canvas.width
      const height = canvas.height
      const drift = reducedMotion.matches ? 0 : time * 0.00008
      const base = parseColorToken('--cloud-base')
      const peak = parseColorToken('--cloud-peak')
      const image = context.createImageData(width, height)
      const { data } = image
      let offset = 0

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const cloud = cloudValue(x / width, y / height, drift)
          const intensity = Math.max(0, Math.min(1, (cloud - 0.33) * 2.8))
          const band = Math.floor(intensity * 5) / 5
          const blue = Math.round(base[2] + (peak[2] - base[2]) * band)
          data[offset] = 0
          data[offset + 1] = 0
          data[offset + 2] = Math.max(0, Math.min(140, blue))
          data[offset + 3] = 255
          offset += 4
        }
      }
      context.putImageData(image, 0, 0)
    }

    const animate = (time: number) => {
      if (time - lastFrame >= 50) {
        lastFrame = time
        drawFrame(time)
      }
      if (!reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    const resizeCanvas = () => {
      canvas.width = Math.ceil(window.innerWidth / pixelSize)
      canvas.height = Math.ceil(window.innerHeight / pixelSize)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.imageSmoothingEnabled = false
      drawFrame(0)
    }

    const restartClouds = () => {
      window.cancelAnimationFrame(animationFrame)
      lastFrame = 0
      drawFrame(0)
      if (!reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    window.addEventListener('resize', resizeCanvas)
    darkMode.addEventListener('change', restartClouds)
    reducedMotion.addEventListener('change', restartClouds)
    resizeCanvas()
    restartClouds()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      darkMode.removeEventListener('change', restartClouds)
      reducedMotion.removeEventListener('change', restartClouds)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} id="pixel-field" aria-hidden="true" />
}

export default PixelField
