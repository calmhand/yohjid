import Layout from '../components/Layout.jsx'
import CodeCard from '../components/CodeCard.jsx'
import GuideTeaser from '../components/GuideTeaser.jsx'
import { CLOTHING_LINES } from '../data/clothingLines.js'
import { CLOTHING_TYPES } from '../data/clothingTypes.js'
import { seasonsByLetter } from '../lib/seasons.js'
import hero from '../assets/images/guide-hero.png'
import '../App.css'
import './guide.css'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Guide', href: '#top', current: true },
]

const SEASON_GROUPS = seasonsByLetter()

export default function GuidePage() {
  return (
    <Layout navLinks={NAV_LINKS}>
      <img className="guide-hero" src={hero} alt="" width="652" height="418" />

      <div className="guide-page">
        <header className="guide-intro">
          <h1>Product Number Decode Guide</h1>
          <p>
            Every Yohji Yamamoto garment carries a product code on its care label, for example{' '}
            <span className="guide-code">HH-B69-009</span>. It reads as [Clothing Line + Season] –
            [Clothing Type + Number + Number] – [Number + Number + Number]. This guide breaks down
            what each part means.
          </p>
        </header>

        <section aria-labelledby="lines-title">
          <h2 id="lines-title">Clothing Lines</h2>
          <p>Each letter here corresponds with a specific line under the Yohji Yamamoto umbrella.</p>
          <ul className="tiles tiles--4" role="list">
            {Object.entries(CLOTHING_LINES).map(([code, name]) => (
              <CodeCard key={code} code={code} label={name} tone="moss" />
            ))}
          </ul>
        </section>

        <section aria-labelledby="season-title">
          <h2 id="season-title">Season</h2>
          <p>
            Each letter here corresponds with a specific season. Some seasons will have the same
            letter. There is no discernable formula to predict what the letter will be for a future
            season. This is where we’ll refer to the laundry/size tags and logo to help make the
            distinction:
          </p>
          <ul className="guide-bullets">
            <li>
              The “Y” in the logo from older collections has a more rounded look whereas modern
              logos have sharper edges.{' '}
              <strong>
                Anything before AW 1991, you will see the more rounded logo. Anything after SS 1992
                features the sharper styled logo.
              </strong>
            </li>
            <li>
              In prior years, the sizing tag on Yohji pieces featured lettered tags (S, M, L) while
              modern Yohji uses a numbered system now (1, 2, 3).{' '}
              <strong>
                If the piece uses a lettered sizing tag, it most likely comes from before the AW 1999
                collections. If it’s numbered sizing, it’s most likely after SS 2000.
              </strong>
            </li>
            <li>
              The positioning of the laundry care icons on a piece’s tags can also help identify when
              a piece was made.{' '}
              <strong>
                If the laundry icons sit at the bottom of the tag, they come before AW 2016; if they
                sit at (or near) the top, they come after SS 2017.
              </strong>
            </li>
          </ul>
          <ul className="tiles tiles--5" role="list">
            {SEASON_GROUPS.map(({ code, seasons }) => (
              <CodeCard
                key={code}
                code={code}
                tone="black"
                tall
                lines={seasons.map((s) => `${s.season} ${s.year}`)}
              />
            ))}
          </ul>
        </section>

        <section aria-labelledby="types-title">
          <h2 id="types-title">Clothing Types</h2>
          <p>The letter in the middle section of the product code identifies the clothing type.</p>
          <ul className="tiles tiles--4" role="list">
            {Object.entries(CLOTHING_TYPES).map(([code, name]) => (
              <CodeCard key={code} code={code} label={name} tone="indigo" />
            ))}
          </ul>
        </section>

        <section aria-labelledby="piece-title">
          <h2 id="piece-title">Type of Piece</h2>
          <p>The last two numbers of the middle section represent the type of cut/shape the piece is.</p>
        </section>

        <section aria-labelledby="material-title">
          <h2 id="material-title">Material</h2>
          <p>
            The numbers in the last section represent the material the item is made from. There is no
            available record of which numbers represent a given material.
          </p>
        </section>

        <section aria-labelledby="notes-title">
          <h2 id="notes-title">Things to Note</h2>
          <p>
            For S’yte, the letter describing the season does not appear to match up with the chart
            provided. It could be the case that S’yte follows its own seasonal structure and is
            primarily sold online. All other parts of the product code are cohesive with S’yte and
            the other product lines.
          </p>
        </section>
      </div>

      <GuideTeaser
        id="decoder"
        title="Try the decoder"
        text="Have a code in hand? Type it in and Yohjid breaks it down for you, live, as you type."
        cta="Decode a code"
        ctaHint=""
        href="/"
      />
    </Layout>
  )
}
