import photo from '../assets/images/guide.png'

export default function GuideTeaser() {
  return (
    <section id="guide" className="guide" aria-labelledby="guide-title">
      <div className="guide__card">
        <img
          className="guide__photo"
          src={photo}
          alt="Two black-and-white archive photographs of Yohji Yamamoto looks on a city street."
          width="641"
          height="442"
        />
        <div className="guide__copy">
          <h2 id="guide-title" className="guide__title">
            Learn more
          </h2>
          <p className="guide__text">
            Read the full guide to product codes: every clothing line, garment type and season
            letter, plus the tag details that date a piece.
          </p>
          <a className="btn btn--dark" href="/guide">
            Learn more<span className="sr-only"> about product codes</span>
          </a>
        </div>
      </div>
    </section>
  )
}
