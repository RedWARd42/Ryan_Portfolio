import { useEffect, useRef } from 'react'
import type { PortfolioEntry } from '../data/entryData'

interface DetailPanelProps {
  entry: PortfolioEntry | null
  trigger: HTMLButtonElement | null
  shouldReturnFocus: boolean
  onClose: () => void
}

function DetailPanel({
  entry,
  trigger,
  shouldReturnFocus,
  onClose,
}: DetailPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeTimerRef = useRef<number | null>(null)
  const animationFramesRef = useRef<number[]>([])
  const isClosingRef = useRef(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (!entry) {
      if (dialog.open) dialog.close()
      document.body.classList.remove('panel-open')
      dialog.classList.remove('is-visible', 'is-closing')
      isClosingRef.current = false
      return
    }

    document.body.classList.add('panel-open')
    dialog.classList.remove('is-visible', 'is-closing')
    isClosingRef.current = false

    if (!dialog.open) dialog.showModal()

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      dialog.classList.add('is-visible')
      return
    }

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        dialog.classList.add('is-visible')
      })
      animationFramesRef.current.push(secondFrame)
    })
    animationFramesRef.current.push(firstFrame)

    return () => {
      animationFramesRef.current.forEach(window.cancelAnimationFrame)
      animationFramesRef.current = []
    }
  }, [entry])

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
      animationFramesRef.current.forEach(window.cancelAnimationFrame)
      document.body.classList.remove('panel-open', 'panel-returning')
    },
    [],
  )

  const closePanel = () => {
    const dialog = dialogRef.current
    if (!dialog?.open || isClosingRef.current) return

    if (!shouldReturnFocus) document.body.classList.add('panel-returning')
    isClosingRef.current = true
    dialog.classList.add('is-closing')
    dialog.classList.remove('is-visible')

    const finishClose = () => {
      if (dialog.open) dialog.close()
      onClose()

      if (trigger && shouldReturnFocus) {
        trigger.focus({ preventScroll: true })
      } else if (trigger) {
        window.requestAnimationFrame(() => {
          trigger.blur()
          document.body.classList.remove('panel-returning')
        })
      } else {
        document.body.classList.remove('panel-returning')
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClose()
    } else {
      closeTimerRef.current = window.setTimeout(finishClose, 240)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="panelTitle"
      onClick={(event) => {
        if (event.target === event.currentTarget) closePanel()
      }}
      onCancel={(event) => {
        event.preventDefault()
        closePanel()
      }}
    >
      <div className="panel-shell">
        <div className="panel-top">
          <button
            className="panel-close"
            type="button"
            aria-label="Close detail panel"
            data-cursor="Close"
            onClick={closePanel}
          />
        </div>
        <div className="panel-body">
          <div className="panel-visual">
            <div className="panel-visual-label">
              <span>{entry?.label}</span>
            </div>
          </div>
          <div className="panel-content">
            <p className="panel-kind">{entry?.kind}</p>
            <h3 id="panelTitle">{entry?.title}</h3>
            <p className="panel-lede">{entry?.lede}</p>
            <div className="panel-details">
              <div>
                <h4>RYAN&apos;S ROLE</h4>
                <p>{entry?.role}</p>
              </div>
              <div>
                <h4>WHY IT MATTERS</h4>
                <p>{entry?.impact}</p>
              </div>
            </div>
            <div className="panel-tags">
              {entry?.tags.map((tag) => (
                <span className="panel-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <a
              className="text-link panel-link"
              href={entry?.link || undefined}
              target="_blank"
              rel="noopener"
              data-cursor={
                entry?.link
                  ? entry.link.includes('github.com')
                    ? 'View the source'
                    : 'Open the live site'
                  : undefined
              }
              hidden={!entry?.link}
            >
              {entry?.linkText}
            </a>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default DetailPanel
