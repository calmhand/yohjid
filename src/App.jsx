import { useCallback, useMemo, useRef, useState } from 'react'
import { decode } from './lib/decode.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import InfoDisplay from './components/InfoDisplay.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import GuideTeaser from './components/GuideTeaser.jsx'
import Footer from './components/Footer.jsx'
import FollowMeModal from './components/FollowMeModal.jsx'
import './App.css'

export default function App() {
  const [code, setCode] = useState('')
  const [signals, setSignals] = useState({ logo: '', sizing: '', laundry: '' })
  const [followOpen, setFollowOpen] = useState(false)

  const followTriggerRef = useRef(null)
  const resultsHeadingRef = useRef(null)

  const result = useMemo(() => decode(code, signals), [code, signals])

  const handleSignalChange = useCallback((key, value) => {
    setSignals((s) => ({ ...s, [key]: value }))
  }, [])

  const focusResults = useCallback(() => {
    resultsHeadingRef.current?.focus()
    resultsHeadingRef.current?.scrollIntoView({ block: 'start' })
  }, [])

  const closeFollow = useCallback(() => setFollowOpen(false), [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page" inert={followOpen ? '' : undefined}>
        <Nav onOpenFollow={() => setFollowOpen(true)} followTriggerRef={followTriggerRef} />
        <main id="main">
          <Hero
            code={code}
            onCodeChange={setCode}
            signals={signals}
            onSignalChange={handleSignalChange}
            onSubmit={focusResults}
          />
          <InfoDisplay result={result} ref={resultsHeadingRef} />
          <HowItWorks />
          <GuideTeaser />
        </main>
        <Footer />
      </div>
      <FollowMeModal open={followOpen} onClose={closeFollow} returnFocusRef={followTriggerRef} />
    </>
  )
}
