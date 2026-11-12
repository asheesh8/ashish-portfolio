import { useMemo, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { AREAS, COURSES, CURRENT_TERM, TERMS } from '../data/coursework';
import './Coursework.css';

const TERM_ORDER = Object.keys(TERMS).reverse(); // newest first

export default function Coursework() {
  const ref = useReveal(0.05);
  const [area, setArea] = useState('all');

  const byTerm = useMemo(() => {
    const list = area === 'all' ? COURSES : COURSES.filter(c => c.area === area);
    return TERM_ORDER
      .map(t => ({ term: t, courses: list.filter(c => c.term === t) }))
      .filter(g => g.courses.length);
  }, [area]);

  const counts = useMemo(() => {
    const c = { all: COURSES.length };
    COURSES.forEach(x => { c[x.area] = (c[x.area] || 0) + 1; });
    return c;
  }, []);

  return (
    <section id="courses" className="section" ref={ref}>
      <div className="section-inner">
        <div className="section-head">
          <div className="section-index reveal"><b>04</b> / Coursework</div>
          <div>
            <h2 className="section-title reveal reveal-delay-1">
              Every class,<br /><em>Fall 2023 to now.</em>
            </h2>
            <p className="section-lede reveal reveal-delay-2">
              {COURSES.length} courses at Champlain College across software, security, math and the
              interdisciplinary core. Highlighted rows are this semester.
            </p>
          </div>
        </div>

        <div className="cw-tabs reveal" role="tablist" aria-label="Filter courses by area">
          {AREAS.map(a => (
            <button
              key={a.id}
              role="tab"
              aria-selected={area === a.id}
              className={`cw-tab${area === a.id ? ' active' : ''}`}
              onClick={() => setArea(a.id)}
            >
              {a.label} <span>{counts[a.id] || 0}</span>
            </button>
          ))}
        </div>

        <div className="cw-terms">
          {byTerm.map(({ term, courses }) => (
            <div key={term} className={`cw-term${term === CURRENT_TERM ? ' current' : ''}`}>
              <div className="cw-term-label">
                {TERMS[term]}
                {term === CURRENT_TERM && <span className="chip chip--accent"><span className="pulse-dot" /> now</span>}
              </div>
              <ul className="cw-list">
                {courses.map(c => (
                  <li key={c.code} className="cw-row">
                    <span className="cw-code">{c.code}</span>
                    <span className="cw-name">{c.name}</span>
                    <span className={`cw-area cw-area--${c.area}`}>{AREAS.find(a => a.id === c.area)?.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
