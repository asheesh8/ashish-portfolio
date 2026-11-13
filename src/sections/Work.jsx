import Chapter from '../components/Chapter';
import Button from '../components/Button';
import { ART } from '../data/art';
import { BUILDS, CLIENTS, LINKS, SMALL_BUILDS } from '../data/content';
import office from '../assets/me/IMG_3387.webp';

const shots = (mods) => Object.values(mods).map((m) => m.default);
const SHOTS = {
  thepit: shots(import.meta.glob('../assets/projects/thepit/*.webp', { eager: true })).slice(0, 5),
  bestbuy: shots(import.meta.glob('../assets/projects/bestbuy/*.webp', { eager: true })),
};

const Out = () => (
  <svg className="out" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
);

function Strip({ images, name }) {
  return (
    <div className="strip" tabIndex={0} aria-label={`${name} screenshots, scroll sideways`}>
      {images.map((src, i) => (
        <img key={src} src={src} alt={`${name} screenshot ${i + 1}`} loading="lazy" />
      ))}
    </div>
  );
}

export default function Work() {
  const [feature, ...rest] = BUILDS;

  return (
    <Chapter id="work" scene="sugar" art={ART.sugar} weather="snow" focus="62% 55%" label="Work">
      <div className="work">
        <header className="work-head">
          <h2 className="display">Where stuff gets made.</h2>
          <div className="work-intro">
            <p>
              Most of my client work goes through <strong>ArkiTech Solutions</strong>, the studio I run with
              Terri Ambo out of Burlington. Terri runs the client side. I design and build every site, every
              dashboard, every line of it. 10+ clients so far, real businesses, live right now.
            </p>
            <figure className="work-office">
              <img src={office} alt="Ashish in a conference room with a pizza box and a laptop, lake sunset through the window" loading="lazy" />
              <figcaption>Pizza and a laptop. Most projects start like this.</figcaption>
            </figure>
          </div>
        </header>

        <section className="clients" aria-labelledby="clients-h">
          <div className="clients-top">
            <h3 id="clients-h">Client sites</h3>
            <Button href={LINKS.studio} external variant="ember">Visit arkitech-sol.com</Button>
          </div>
          <ul className="client-list">
            {CLIENTS.map((c) => (
              <li key={c.name}>
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  <span className="client-name">{c.name}</span>
                  <span className="client-what">{c.what}</span>
                  <span className="client-where">{c.where}</span>
                  <Out />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <article className="feature">
          <div className="feature-copy">
            <p className="kind">{feature.kind}</p>
            <h3 className="display">{feature.name}</h3>
            <p className="feature-line">{feature.line}</p>
            <p>{feature.body}</p>
            <ul className="tags">{feature.stack.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="feature-links">
              {feature.links.map(([label, href]) => (
                <Button key={href} href={href} external variant="ember">{label}</Button>
              ))}
            </div>
          </div>
          <div className="feature-art" aria-hidden="true">
            <svg viewBox="0 0 320 260" className="relay">
              <defs>
                <radialGradient id="g-sun" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#ffd88a" /><stop offset="1" stopColor="#ffd88a" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="64" cy="54" r="38" fill="url(#g-sun)" />
              <path d="M70 40 L160 120" className="relay-beam" />
              <rect x="138" y="112" width="46" height="34" rx="4" className="relay-box" />
              <path d="M146 112 l15 -14 l15 14" className="relay-roof" />
              {[[60, 210], [150, 225], [250, 200], [290, 120]].map(([x, y], i) => (
                <g key={i}>
                  <path d={`M161 146 Q ${(161 + x) / 2} ${Math.min(y, 146) - 30} ${x} ${y - 16}`} className="relay-arc" style={{ animationDelay: `${i * 0.6}s` }} />
                  <rect x={x - 8} y={y - 16} width="16" height="26" rx="3" className="relay-phone" />
                </g>
              ))}
            </svg>
            <p className="relay-caption">satellite in, solar server in the village, phone to phone from there</p>
          </div>
        </article>

        <div className="builds">
          {rest.map((b) => (
            <article key={b.id} className={`build${b.shots ? ' build--shots' : ''}`}>
              {b.shots && <Strip images={SHOTS[b.shots]} name={b.name} />}
              <div className="build-copy">
                <p className="kind">{b.kind}</p>
                <h3>{b.name}</h3>
                <p className="build-line">{b.line}</p>
                <p className="build-body">{b.body}</p>
                <ul className="tags">{b.stack.map((t) => <li key={t}>{t}</li>)}</ul>
                {b.links?.map(([label, href]) => (
                  <a key={href} className="textlink" href={href} target="_blank" rel="noopener noreferrer">{label} <Out /></a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="small" aria-labelledby="small-h">
          <h3 id="small-h">Also on the bench</h3>
          <ul>
            {SMALL_BUILDS.map((s) => (
              <li key={s.name}>
                <span className="small-name">
                  {s.href ? <a href={s.href}>{s.name} <Out /></a> : s.name}
                </span>
                <span className="small-line">{s.line}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Chapter>
  );
}
