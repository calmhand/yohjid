import photo from '../assets/images/how-it-works.png'

const STEPS = [
  'Find the product code on the care label — usually inside the right seam or a pocket. It looks like HH-B69-009.',
  'Type it into the decoder. The breakdown updates with every character you enter.',
  'If the season is ambiguous, set the sizing tag, laundry-icon position and ‘Y’ logo style to narrow it down.',
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how" aria-labelledby="how-title">
      <div className="how__copy">
        <h2 id="how-title" className="how__title">
          How it works
        </h2>
        <p className="how__lead">
          Every Yohji Yamamoto piece carries an alphanumeric product code on its care label. Each
          segment encodes something about the garment — but season letters are reused across years,
          so the tag’s other details help pin down when it was made.
        </p>
        <ol className="steps" role="list">
          {STEPS.map((text, i) => (
            <li key={i} className="step">
              <span className="step__number" aria-hidden="true">
                {i + 1}
              </span>
              <p className="step__text">{text}</p>
            </li>
          ))}
        </ol>
      </div>
      <img
        className="how__photo"
        src={photo}
        alt="Black-and-white portrait of a model in a wide-brimmed hat with a netted veil, seen from behind."
        width="314"
        height="415"
      />
    </section>
  )
}
