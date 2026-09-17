export default function CodeCard({ code, label, lines, tone = 'moss', tall = false }) {
  return (
    <li className={`tile tile--${tone}${tall ? ' tile--tall' : ''}`}>
      <span className="tile__code">{code}</span>
      {lines ? (
        <ul className="tile__list" role="list">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <span className="tile__label">{label}</span>
      )}
    </li>
  )
}
