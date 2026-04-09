import { useReveal } from '../hooks/useReveal';
import Carousel from './Carousel';
import './About.css';

// ── Drop files into these folders and they load automatically ──
const meRaw      = import.meta.glob('../assets/me/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',      { eager: true });
const vermontRaw = import.meta.glob('../assets/vermont/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', { eager: true });
const a4Raw      = import.meta.glob('../assets/a4/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',      { eager: true });

const toUrls = (mods) => Object.values(mods).map(m => m.default);

const ME_IMAGES      = toUrls(meRaw);
const VERMONT_IMAGES = toUrls(vermontRaw);
const A4_IMAGES      = toUrls(a4Raw);

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" ref={ref}>
      <div className="section-wrapper">
        <div className="about-grid">
          <div className="about-left">
            <span className="section-label reveal">// about me</span>
            <h2 className="section-title reveal reveal-delay-1">
              From Goldhaap, Nepal<br />
              <span className="accent-text">to Burlington, VT.</span>
            </h2>

            <p className="about-bio reveal reveal-delay-2">
              I grew up in Goldhaap — a small village in Nepal where my family worked
              hard for everything they had. My parents sacrificed a lot to give me a shot
              at something better. I don't take that lightly. It's why I show up and finish things.
            </p>
            <p className="about-bio reveal reveal-delay-3">
              I'm finishing my CS degree at Champlain College, working at Best Buy,
              and trading NQ futures on a Topstep account at night. In between all that
              I build web apps for people who actually need them — not as a hobby,
              as a real service.
            </p>
            <p className="about-bio reveal reveal-delay-3">
              You work directly with me. No agency, no handoffs, no markup.
              If something breaks, I fix it. If something's wrong, I say so.
            </p>

            <div className="about-tags reveal reveal-delay-4">
              {[
                '20 (21 soon 🍷)',
                'Champlain CS',
                'NQ futures',
                'Goldhaap, Nepal',
                'Burlington, VT',
                'Ships code',
              ].map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="about-right">
            <div className="about-card reveal reveal-delay-2">
              <div className="about-info-rows">
                {[
                  { label: 'from',      value: 'Goldhaap, Nepal' },
                  { label: 'based',     value: 'Burlington, VT' },
                  { label: 'school',    value: 'Champlain College' },
                  { label: 'major',     value: 'CS + Math minor' },
                  { label: 'trading',   value: 'Topstep / NQ futures' },
                  { label: 'stack',     value: 'React + Supabase + Go' },
                  { label: 'status',    value: 'Open to projects' },
                ].map(({ label, value }) => (
                  <div className="info-row" key={label}>
                    <span className="info-label">{label}</span>
                    <span className="info-value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="about-status">
                <span className="status-dot" />
                <span>Available — let's build something</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-carousels reveal reveal-delay-3">
          <Carousel images={ME_IMAGES}      label="Me" />
          <Carousel images={VERMONT_IMAGES} label="Vermont" />
          <Carousel images={A4_IMAGES}      label="Cars" />
        </div>
      </div>
    </section>
  );
}
