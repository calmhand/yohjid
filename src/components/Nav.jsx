import { useEffect, useRef, useState } from 'react'
import menuIcon from '../assets/icons/menu.svg'
import closeIcon from '../assets/icons/close.svg'

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Guide', href: '#guide' },
]

export default function Nav({ onOpenFollow, followTriggerRef }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key !== 'Escape' || e.target.closest?.('[role="dialog"]')) return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="nav" id="top">
      <a className="nav__wordmark" href="#top">
        YOHJID
      </a>

      <button
        ref={menuButtonRef}
        type="button"
        className="nav__toggle"
        aria-expanded={menuOpen}
        aria-controls="primary-menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span
          className="icon nav__toggle-icon"
          style={{ '--icon': `url(${menuOpen ? closeIcon : menuIcon})` }}
          aria-hidden="true"
        />
        <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
      </button>

      <nav
        id="primary-menu"
        className={`nav__menu${menuOpen ? ' nav__menu--open' : ''}`}
        aria-label="Primary"
      >
        <ul className="nav__links" role="list">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a className="nav__link" href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              ref={followTriggerRef}
              type="button"
              className="nav__follow"
              onClick={onOpenFollow}
            >
              Follow Me
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
