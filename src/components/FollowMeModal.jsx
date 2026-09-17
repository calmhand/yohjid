import { useEffect, useRef } from 'react'
import { SOCIALS } from '../data/socials.js'
import closeIcon from '../assets/icons/close.svg'
import { iconStyle } from '../lib/icon.js'

const FOCUSABLE = 'a[href], button:not([disabled])'

export default function FollowMeModal({ open, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = dialogRef.current.querySelectorAll(FOCUSABLE)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      // Defer until the page's `inert` attribute has been removed, or focus() is a no-op
      requestAnimationFrame(() => returnFocusRef.current?.focus())
    }
  }, [open, onClose, returnFocusRef])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="follow-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="follow-title" className="modal__title">
            Follow me
          </h2>
          <button ref={closeButtonRef} type="button" className="modal__close" onClick={onClose}>
            <span className="icon modal__close-icon" style={iconStyle(closeIcon)} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <ul className="modal__links" role="list">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a className="modal__link" href={s.href} target="_blank" rel="noopener noreferrer">
                <span className="modal__link-text">{s.name}</span>
                <span className="icon modal__link-icon" style={iconStyle(s.icon)} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
