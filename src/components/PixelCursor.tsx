import { useEffect, useRef } from 'react'
import './PixelCursor.css'

const ARROW = [
  'XX......',
  'XXX.....',
  'XXXX....',
  'XXXXX...',
  'XXXXXX..',
  'XXXXXXX.',
  'XXXXXXXX',
  'XXXXXXX.',
  'XXXXX...',
  'XX..XX..',
  '....XX..',
  '.....XX.',
  '.....XX.',
]

const HAND = [
  '....X............',
  '....XX...........',
  '....XX...........',
  '....XX...........',
  '....XX.XX........',
  '....XX.XX........',
  '....XX.XX.XX.....',
  '....XX.XX.XX.XX..',
  'XX..XX.XX.XX.XX..',
  'XXX.XXXXXXXXXXX..',
  '.XXXXXXXXXXXXXX..',
  '..XXXXXXXXXXXX...',
  '...XXXXXXXXXXX...',
  '....XXXXXXXXX....',
  '.....XXXXXXXX....',
  '......XXXXXXXX...',
  '......XXXXXX.....',
  '......XXXXXX.....',
  '.................',
]

function PixelSprite({
  map,
  className,
}: {
  map: string[]
  className: string
}) {
  const width = map[0].length
  const pixels = map.flatMap((row, y) =>
    Array.from(row).flatMap((pixel, x) =>
      pixel === 'X' || pixel === 'D'
        ? [{ x, y, shaded: pixel === 'D' }]
        : [],
    ),
  )

  return (
    <svg
      className={className}
      width={width * 3}
      height={map.length * 3}
      viewBox={`0 0 ${width} ${map.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {pixels.map(({ x, y, shaded }) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="1"
          height="1"
          fill={shaded ? '#8a6a2c' : 'var(--accent)'}
        />
      ))}
    </svg>
  )
}

function PixelCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const tag = tagRef.current
    if (!cursor || !tag) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let enabled = false
    let hasPositioned = false
    let insideDialog = false
    let hoveredElement: Element | null = null

    const updateEnabledState = () => {
      enabled = finePointer.matches && !reducedMotion.matches
      document.body.classList.toggle(
        'custom-cursor-enabled',
        enabled && !insideDialog,
      )
      cursor.classList.toggle(
        'is-active',
        enabled && hasPositioned && !insideDialog,
      )
      if (!enabled) {
        cursor.classList.remove('is-hand', 'is-down')
        tag.classList.remove('show')
        hoveredElement = null
      }
    }

    const setHoveredElement = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null
      const interactive = element?.closest('a, button, [data-cursor]') ?? null
      if (interactive === hoveredElement) return

      hoveredElement = interactive
      const label = interactive?.getAttribute('data-cursor') ?? ''
      cursor.classList.toggle('is-hand', Boolean(interactive))
      tag.textContent = label
      tag.classList.toggle('show', Boolean(label))
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!enabled) return

      hasPositioned = true
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`

      const target = event.target instanceof Element ? event.target : null
      insideDialog = Boolean(target?.closest('dialog[open]'))
      document.body.classList.toggle(
        'custom-cursor-enabled',
        !insideDialog && enabled,
      )
      cursor.classList.toggle('is-active', !insideDialog)
      cursor.classList.toggle('is-in-dialog', insideDialog)

      if (insideDialog) {
        setHoveredElement(null)
        return
      }

      setHoveredElement(event.target)
    }

    const handleMouseDown = () => {
      if (enabled) cursor.classList.add('is-down')
    }

    const handleMouseUp = () => {
      cursor.classList.remove('is-down')
    }

    const handleMouseLeave = () => {
      cursor.classList.remove('is-active', 'is-hand', 'is-down')
      tag.classList.remove('show')
      document.body.classList.remove('custom-cursor-enabled')
      hasPositioned = false
      insideDialog = false
      hoveredElement = null
    }

    updateEnabledState()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    finePointer.addEventListener('change', updateEnabledState)
    reducedMotion.addEventListener('change', updateEnabledState)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      finePointer.removeEventListener('change', updateEnabledState)
      reducedMotion.removeEventListener('change', updateEnabledState)
      document.body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  return (
    <div ref={cursorRef} className="pixel-cursor" aria-hidden="true">
      <PixelSprite map={ARROW} className="pixel-cursor-sprite pixel-cursor-arrow" />
      <PixelSprite map={HAND} className="pixel-cursor-sprite pixel-cursor-hand" />
      <span ref={tagRef} className="pixel-cursor-tag" />
    </div>
  )
}

export default PixelCursor
