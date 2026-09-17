import { useCallback, useRef, useState } from 'react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import FollowMeModal from './FollowMeModal.jsx'

export default function Layout({ navLinks, children }) {
  const [followOpen, setFollowOpen] = useState(false)
  const followTriggerRef = useRef(null)
  const closeFollow = useCallback(() => setFollowOpen(false), [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page" inert={followOpen ? '' : undefined}>
        <Nav links={navLinks} onOpenFollow={() => setFollowOpen(true)} followTriggerRef={followTriggerRef} />
        <main id="main">{children}</main>
        <Footer />
      </div>
      <FollowMeModal open={followOpen} onClose={closeFollow} returnFocusRef={followTriggerRef} />
    </>
  )
}
