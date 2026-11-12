import { STOPS } from '../data/content';

// The site nav is a trail from the lake up to Camel's Hump.
export default function Trail({ active, progress }) {
  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="trail" aria-label="Sections">
      <div className="trail-line" aria-hidden="true">
        <span className="trail-fill" style={{ transform: `scaleY(${progress})` }} />
      </div>
      <ol>
        {STOPS.map((s, i) => (
          <li key={s.id} className={i === active ? 'is-here' : i < active ? 'is-past' : ''}>
            <a href={`#${s.id}`} onClick={go(s.id)} aria-current={i === active ? 'location' : undefined}>
              <span className="trail-dot" aria-hidden="true" />
              <span className="trail-label">
                {s.place}
                {s.note && <small>{s.note}</small>}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <div className="trail-mobile" aria-hidden="true">
        <span className="trail-mobile-place">{STOPS[active]?.place}</span>
        <span className="trail-mobile-bar"><span style={{ transform: `scaleX(${progress})` }} /></span>
      </div>
    </nav>
  );
}
