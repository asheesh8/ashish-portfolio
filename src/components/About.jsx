import { useReveal } from '../hooks/useReveal';
import Carousel from './Carousel';
import './About.css';

const toUrls = (mods) => Object.values(mods).map(m => m.default);
const ME_IMAGES      = toUrls(import.meta.glob('../assets/me/*.{jpg,jpeg,png,webp}',      { eager: true }));
const VERMONT_IMAGES = toUrls(import.meta.glob('../assets/vermont/*.{jpg,jpeg,png,webp}', { eager: true }));
const CAR_IMAGES     = toUrls(import.meta.glob('../assets/a4/*.{jpg,jpeg,png,webp}',      { eager: true }));

const FACTS = [
  ['Origin',   'Goldhaap, Nepal'],
  ['Home',     'Burlington, VT'],
  ['Studying', 'B.S. Computer Science & Innovation'],
  ['Minors',   'Mathematics · Cybersecurity'],
  ['Off-hours','NQ futures, cars, hardware'],
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section" ref={ref}>
      <div className="section-inner">
        <div className="section-head">
          <div className="section-index reveal"><b>01</b> / About</div>
          <h2 className="section-title reveal reveal-delay-1">
            From Goldhaap to Vermont.<br /><em>Same hunger, different weather.</em>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <p className="reveal">
              I grew up in a small camp in Goldhaap, Nepal. The first place I remember living
              burned down completely, and my family had to rebuild our life from nothing. I came
              to the U.S. when I was 5. My parents gave up a lot so I could get a shot somewhere
              else. I think about that every day. That's why I take the work seriously.
            </p>
            <p className="reveal reveal-delay-1">
              Now I'm a senior at Champlain studying CS, working at Best Buy, trading NQ futures
              as a funded trader, and building apps for people who need things done. Not fake
              startups, not another landing page. Actual tools where the results prove why the
              tool needed to exist.
            </p>
            <p className="reveal reveal-delay-2">
              If you work with me, you get me. No agency chain, no random handoff, no pretending
              simple stuff is rocket science. If something breaks, I fix it. If an idea is bad,
              I'll tell you before you waste money on it.
            </p>
            <span className="about-signature reveal reveal-delay-3">— A.S., Burlington</span>
          </div>

          <dl className="about-facts reveal reveal-delay-2">
            {FACTS.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>

        <div className="about-photos reveal reveal-delay-2">
          <figure><Carousel images={ME_IMAGES} label="Me" /><figcaption>me</figcaption></figure>
          <figure><Carousel images={VERMONT_IMAGES} label="Vermont" /><figcaption>vermont</figcaption></figure>
          <figure><Carousel images={CAR_IMAGES} label="Cars" /><figcaption>cars</figcaption></figure>
        </div>
      </div>
    </section>
  );
}
