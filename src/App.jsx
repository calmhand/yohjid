import { useMemo, useState } from 'react'
import { decode } from './lib/decode.js'
import './App.css'

const SIGNAL_FIELDS = [
  {
    key: 'logo',
    label: 'Logo "Y"',
    options: [
      { value: '', label: "Don't know" },
      { value: 'rounded', label: 'Rounded' },
      { value: 'sharp', label: 'Sharp-edged' },
    ],
  },
  {
    key: 'sizing',
    label: 'Sizing tag',
    options: [
      { value: '', label: "Don't know" },
      { value: 'lettered', label: 'Lettered (S/M/L)' },
      { value: 'numbered', label: 'Numbered (1/2/3)' },
    ],
  },
  {
    key: 'laundry',
    label: 'Laundry icons',
    options: [
      { value: '', label: "Don't know" },
      { value: 'bottom', label: 'Bottom of tag' },
      { value: 'top', label: 'Top of tag' },
    ],
  },
]

function seasonLabel(entry) {
  return `${entry.year} ${entry.season}`
}

function SeasonResult({ season }) {
  if (!season) return null

  if (season.note) {
    return <p className="note">{season.note}</p>
  }

  if (season.resolved) {
    return <p className="value">{seasonLabel(season.resolved)}</p>
  }

  if (season.candidates.length === 0) {
    return <p className="value unknown">No match for letter "{season.letter}"</p>
  }

  return (
    <div>
      <p className="value unknown">Ambiguous — {season.candidates.length} possible seasons:</p>
      <ul className="candidates">
        {season.candidates.map((c) => (
          <li key={`${c.year}-${c.season}`}>{seasonLabel(c)}</li>
        ))}
      </ul>
      <p className="hint">Add logo/sizing/laundry details above to narrow this down.</p>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div className="field">
      <span className="field-label">{label}</span>
      {value}
    </div>
  )
}

export default function App() {
  const [code, setCode] = useState('')
  const [signals, setSignals] = useState({ logo: '', sizing: '', laundry: '' })

  const result = useMemo(() => decode(code, signals), [code, signals])

  return (
    <main className="app">
      <h1>Yohjid</h1>
      <p className="subtitle">Live Yohji Yamamoto product code decoder</p>

      <label className="code-input-label" htmlFor="product-code">
        Product code
      </label>
      <input
        id="product-code"
        className="code-input"
        type="text"
        placeholder="HH-B69-009"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength={10}
        autoComplete="off"
        spellCheck={false}
      />

      <fieldset className="signals">
        <legend>Disambiguation (optional — only needed if season is ambiguous)</legend>
        {SIGNAL_FIELDS.map((field) => (
          <label key={field.key} className="signal-field">
            {field.label}
            <select
              value={signals[field.key]}
              onChange={(e) => setSignals((s) => ({ ...s, [field.key]: e.target.value }))}
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </fieldset>

      <section className="results">
        <Field
          label="Clothing line"
          value={
            result.line ? (
              <span className={result.line.name ? 'value' : 'value unknown'}>
                {result.line.name ?? `Unknown letter "${result.line.letter}"`}
              </span>
            ) : (
              <span className="value empty">—</span>
            )
          }
        />

        <Field
          label="Season"
          value={result.season ? <SeasonResult season={result.season} /> : <span className="value empty">—</span>}
        />

        <Field
          label="Clothing type"
          value={
            result.type ? (
              <span className={result.type.name ? 'value' : 'value unknown'}>
                {result.type.name ?? `Unknown letter "${result.type.letter}"`}
              </span>
            ) : (
              <span className="value empty">—</span>
            )
          }
        />

        <Field
          label="Cut/shape"
          value={
            result.cutShape ? (
              <span className="value unknown">
                Code {result.cutShape.code} — {result.cutShape.name ?? 'not mapped yet'}
              </span>
            ) : (
              <span className="value empty">—</span>
            )
          }
        />

        <Field
          label="Material"
          value={
            result.material ? (
              <span className="value unknown">
                Code {result.material.code} — {result.material.name ?? 'not mapped yet'}
              </span>
            ) : (
              <span className="value empty">—</span>
            )
          }
        />
      </section>
    </main>
  )
}
