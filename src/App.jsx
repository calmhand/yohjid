import { useCallback, useMemo, useRef, useState } from 'react'
import { decode } from './lib/decode.js'
import Layout from './components/Layout.jsx'
import Hero from './components/Hero.jsx'
import InfoDisplay from './components/InfoDisplay.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import GuideTeaser from './components/GuideTeaser.jsx'
import { withBase } from './lib/paths.js'
import './App.css'

const NAV_LINKS = [
  { label: 'Home', href: '#top', current: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Guide', href: withBase('guide/') },
]

export default function App() {
  const [code, setCode] = useState('')
  const [signals, setSignals] = useState({ logo: '', sizing: '', laundry: '' })
  const resultsHeadingRef = useRef(null)

  const result = useMemo(() => decode(code, signals), [code, signals])

  const handleSignalChange = useCallback((key, value) => {
    setSignals((s) => ({ ...s, [key]: value }))
  }, [])

  const focusResults = useCallback(() => {
    resultsHeadingRef.current?.focus()
    resultsHeadingRef.current?.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <Layout navLinks={NAV_LINKS}>
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
    </Layout>
  )
}
