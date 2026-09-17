import { SOCIALS } from '../data/socials.js'
import { withBase } from '../lib/paths.js'
import { iconStyle } from '../lib/icon.js'
import yfmLogo from '../assets/images/yfm-logo.svg'
import sdnyLogo from '../assets/images/sdny-logo.png'

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="footer__copy">
        <p className="footer__wordmark">YOHJID</p>
        <p className="footer__text">
          A free decoder for Yohji Yamamoto product codes, built for collectors and resellers.
        </p>
        <a className="btn btn--light" href={withBase('#how-it-works')}>
          Learn more<span className="sr-only"> about how it works</span>
        </a>
      </div>

      <hr className="footer__divider" />

      <div className="footer__extras">
        <p className="footer__yfm">
          <img src={yfmLogo} alt="" width="32" height="32" />
          You Fulfill Me
        </p>
        <ul className="socials" role="list" aria-label="Social media">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a className="socials__link" href={s.href} target="_blank" rel="noopener noreferrer">
                <span className="icon socials__icon" style={iconStyle(s.icon)} aria-hidden="true" />
                <span className="sr-only">
                  {s.name} (opens in a new tab)
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="footer__credit">
          Site design by
          <img src={sdnyLogo} alt="SDNY" width="66" height="32" />
        </p>
      </div>
    </footer>
  )
}
