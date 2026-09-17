import arrowIcon from '../assets/icons/arrow-right.svg'
import chevronIcon from '../assets/icons/chevron-down.svg'

const SIGNAL_FIELDS = [
  {
    key: 'sizing',
    label: 'Sizing tag',
    options: [
      { value: '', label: 'Not sure' },
      { value: 'lettered', label: 'Lettered (S / M / L)' },
      { value: 'numbered', label: 'Numbered (1 / 2 / 3)' },
    ],
  },
  {
    key: 'laundry',
    label: 'Laundry tag location',
    options: [
      { value: '', label: 'Not sure' },
      { value: 'bottom', label: 'Bottom of tag' },
      { value: 'top', label: 'Top of tag' },
    ],
  },
  {
    key: 'logo',
    label: '‘Y’ logo type',
    options: [
      { value: '', label: 'Not sure' },
      { value: 'rounded', label: 'Rounded' },
      { value: 'sharp', label: 'Sharp-edged' },
    ],
  },
]

export default function Hero({ code, onCodeChange, signals, onSignalChange, onSubmit }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero__title">
        Know your Yohji
      </h1>
      <p className="hero__lead">
        Type the product code from a garment’s care label and Yohjid tells you the line, season,
        type, cut and material — as you type.
      </p>

      <form
        className="decoder"
        role="search"
        aria-label="Product code decoder"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <div className="decoder__row">
          <label htmlFor="product-code" className="sr-only">
            Product code
          </label>
          <input
            id="product-code"
            className="decoder__input"
            type="text"
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            placeholder="Enter your product code..."
            aria-describedby="product-code-hint"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={10}
          />
          <button type="submit" className="decoder__submit">
            <span className="icon decoder__submit-icon" style={{ '--icon': `url(${arrowIcon})` }} aria-hidden="true" />
            <span className="sr-only">Decode product code</span>
          </button>
        </div>
        <p id="product-code-hint" className="decoder__hint">
          Format: <span className="decoder__example">HH-B69-009</span> — printed on the care label,
          usually inside the right seam or a pocket.
        </p>

        <fieldset className="signals">
          <legend className="sr-only">Tag details to narrow down the season</legend>
          {SIGNAL_FIELDS.map((field) => (
            <div key={field.key} className="signal">
              <div className="signal__control">
                <select
                  id={`signal-${field.key}`}
                  className="signal__select"
                  value={signals[field.key]}
                  onChange={(e) => onSignalChange(field.key, e.target.value)}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span
                  className="icon signal__chevron"
                  style={{ '--icon': `url(${chevronIcon})` }}
                  aria-hidden="true"
                />
              </div>
              <label htmlFor={`signal-${field.key}`} className="signal__label">
                {field.label}
              </label>
            </div>
          ))}
        </fieldset>
      </form>
    </section>
  )
}
