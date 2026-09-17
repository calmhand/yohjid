import { forwardRef } from 'react'

function seasonLabel(entry) {
  return `${entry.season} ${entry.year}`
}

function Row({ label, value, code, note, empty }) {
  return (
    <div className="result">
      <dt className="result__label">{label}</dt>
      <dd className={`result__value${empty ? ' result__value--empty' : ''}`}>
        {value}
        {empty && <span className="sr-only">not entered yet</span>}
      </dd>
      {note && <dd className="result__note">{note}</dd>}
      {code && (
        <dd className="result__code">
          <span className="sr-only">Code </span>
          {code}
        </dd>
      )}
    </div>
  )
}

function SeasonRow({ season }) {
  if (!season) {
    return <Row label="Possible seasons" value="—" empty />
  }

  const { letter, candidates, resolved, note } = season

  if (note) {
    return <Row label="Possible seasons" value="Unresolved" code={letter} note={note} />
  }

  if (resolved) {
    return <Row label="Season" value={seasonLabel(resolved)} code={letter} />
  }

  if (candidates.length === 0) {
    return <Row label="Possible seasons" value={`No match for “${letter}”`} code={letter} />
  }

  return (
    <Row
      label="Possible seasons"
      code={letter}
      note="Set the tag details above to narrow this down."
      value={
        <ul className="result__list" role="list">
          {candidates.map((c) => (
            <li key={`${c.year}-${c.season}`}>{seasonLabel(c)}</li>
          ))}
        </ul>
      }
    />
  )
}

const InfoDisplay = forwardRef(function InfoDisplay({ result }, ref) {
  const { line, season, type, cutShape, material } = result

  return (
    <section className="info on-dark" aria-labelledby="results-heading">
      <h2 id="results-heading" className="sr-only" tabIndex={-1} ref={ref}>
        Decoded result
      </h2>
      <dl className="info__list" aria-live="polite">
        <Row
          label="Clothing line"
          value={line ? line.name ?? `Unknown letter “${line.letter}”` : '—'}
          code={line?.letter}
          empty={!line}
        />
        <SeasonRow season={season} />
        <Row
          label="Clothing type"
          value={type ? type.name ?? `Unknown letter “${type.letter}”` : '—'}
          code={type?.letter}
          empty={!type}
        />
        <Row
          label="Cut / shape"
          value={cutShape ? cutShape.name ?? 'Not mapped yet' : '—'}
          code={cutShape?.code}
          empty={!cutShape}
        />
        <Row
          label="Material"
          value={material ? material.name ?? 'Not mapped yet' : '—'}
          code={material?.code}
          empty={!material}
        />
      </dl>
    </section>
  )
})

export default InfoDisplay
