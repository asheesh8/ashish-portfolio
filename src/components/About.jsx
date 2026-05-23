import { useReveal } from '../hooks/useReveal';
import Carousel from './Carousel';
import './About.css';

// Carousels still load from the asset folders — kept as a photo plate near the bottom
const meRaw      = import.meta.glob('../assets/me/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',      { eager: true });
const vermontRaw = import.meta.glob('../assets/vermont/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', { eager: true });
const a4Raw      = import.meta.glob('../assets/a4/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',      { eager: true });

const toUrls = (mods) => Object.values(mods).map(m => m.default);
const ME_IMAGES      = toUrls(meRaw);
const VERMONT_IMAGES = toUrls(vermontRaw);
const A4_IMAGES      = toUrls(a4Raw);

const TAGS = ['🇳🇵 Goldhaap, NP', '🍁 Burlington, VT', '🎓 Champlain CS', '📈 NQ Futures', '🏎️ Actually ships', '🍹 Almost 21'];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" ref={ref}>
      <div className="about-wrapper">

        {/* Chapter header */}
        <div className="about-header">
          <div className="about-chapter reveal">
            <div className="about-chapter-label">// about</div>
            <div className="about-chapter-sub">🇳🇵 → 🇺🇸</div>
          </div>
          <h2 className="about-headline reveal reveal-delay-1">
            From Goldhaap to Vermont.<br />
            <span className="about-headline-italic">Same hunger, different weather.</span>
          </h2>
        </div>

        {/* Three-column newspaper body */}
        <div className="about-columns">
          <p className="reveal reveal-delay-2">
            <span className="about-dropcap">I</span>
            grew up in a small camp in Goldhaap, Nepal. The first place I remember
            living burned down completely, and my family had to rebuild our life from
            nothing. I came to the U.S. when I was 5. My parents gave up a lot so I
            could get a shot somewhere else. I think about that every day. That's why
            I take the work seriously.
          </p>
          <p className="reveal reveal-delay-3">
            Now I'm at Champlain for CS, working at Best Buy, trading NQ futures
            through firms profitably, and building apps and tools for people who need
            things done. Not fake startups, not another landing page, not another
            feature for businesses that never gets used. Actual tools where the results
            prove why the tool needed to exist.
          </p>
          <p className="reveal reveal-delay-4">
            If you work with me, you get me. No agency chain, no random handoff,
            no pretending simple stuff is rocket science. If something breaks, I fix it.
            If an idea is bad, I'll tell you before you waste money on it.
            <br /><br />
            <span className="about-signature">— A.S., Burlington</span>
          </p>
        </div>

        {/* Tags strip */}
        <div className="about-tags reveal reveal-delay-5">
          {TAGS.map((t, i) => (
            <span key={t} className="about-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="print-rule print-rule--thick" style={{ margin: '0 0 40px' }} />

        {/* Photo carousels as a framed plate row */}
        <div className="about-carousels-wrap reveal reveal-delay-3">
          <div className="about-carousel-block">
            <div className="about-carousel-header">me</div>
            <Carousel images={ME_IMAGES} label="Me" />
          </div>
          <div className="about-carousel-block">
            <div className="about-carousel-header">Vermont</div>
            <Carousel images={VERMONT_IMAGES} label="Vermont" />
          </div>
          <div className="about-carousel-block">
            <div className="about-carousel-header">cars</div>
            <Carousel images={A4_IMAGES} label="Cars" />
          </div>
        </div>
      </div>
    </section>
  );
}
