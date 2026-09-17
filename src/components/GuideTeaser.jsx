import photo from '../assets/images/guide.png'
import { withBase } from '../lib/paths.js'

export default function GuideTeaser({
  id = 'guide',
  title = 'Learn more',
  text = 'Read the full guide to product codes: every clothing line, garment type and season letter, plus the tag details that date a piece.',
  cta = 'Learn more',
  ctaHint = 'about product codes',
  href = withBase('guide/'),
}) {
  return (
    <section id={id} className="guide" aria-labelledby={`${id}-title`}>
      <div className="guide__card">
        <img
          className="guide__photo"
          src={photo}
          alt="Two black-and-white archive photographs of Yohji Yamamoto looks on a city street."
          width="641"
          height="442"
        />
        <div className="guide__copy">
          <h2 id={`${id}-title`} className="guide__title">
            {title}
          </h2>
          <p className="guide__text">{text}</p>
          <a className="btn btn--dark" href={href}>
            {cta}
            {ctaHint && <span className="sr-only"> {ctaHint}</span>}
          </a>
        </div>
      </div>
    </section>
  )
}
