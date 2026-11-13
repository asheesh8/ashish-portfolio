import { useEffect, useRef, useState } from 'react';
import { SHELVES } from '../data';

// Unlabelled books so the shelves look lived in. Only the labelled ones open.
const FILLER = {
  math: [78, 86, 70, 92, 81, 74, 88],
  software: [82, 74, 90, 68, 84],
  systems: [76, 88, 72, 94, 80, 70, 86, 78],
};

export default function Library() {
  const [open, setOpen] = useState(null);
  const closeRef = useRef(null);
  const lastSpine = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastSpine.current?.focus();
    };
  }, [open]);

  return (
    <section className="slab-wrap lib">
      <header className="scene-head">
        <h1 className="h1">The library</h1>
        <p className="lede">
          B.S. in Computer Science & Innovation at Champlain College, class of 2027, with minors in
          math and cybersecurity. I’m not putting every class up here. These are the ones that
          actually changed how I think. Pull one off the shelf.
        </p>
      </header>

      <div className="bookcase">
        {SHELVES.map((shelf) => (
          <div className="shelf" key={shelf.id}>
            <h2 className="shelf-label">{shelf.label}</h2>
            <div className="shelf-row">
              {shelf.books.map((b) => (
                <button
                  key={b.code}
                  className={`spine spine--${b.color}`}
                  style={{ '--h': `${b.h}%` }}
                  onClick={(e) => { lastSpine.current = e.currentTarget; setOpen(b); }}
                  aria-haspopup="dialog"
                >
                  <span className="spine-code">{b.code}</span>
                  <span className="spine-name">{b.name}</span>
                </button>
              ))}
              {FILLER[shelf.id].map((h, i) => (
                <span key={i} className={`spine spine--dust spine--d${i % 3}`} style={{ '--h': `${h}%` }} aria-hidden="true" />
              ))}
            </div>
            <div className="plank" aria-hidden="true" />
          </div>
        ))}
      </div>

      {open && (
        <div className="book-open" role="dialog" aria-modal="true" aria-labelledby="book-title" onClick={() => setOpen(null)}>
          <article className={`book book--${open.color}`} onClick={(e) => e.stopPropagation()}>
            <div className="page page--l">
              <span className="book-code">{open.code}</span>
              <h2 id="book-title" className="book-title">{open.name}</h2>
              <span className="book-term">{open.term}</span>
            </div>
            <div className="page page--r">
              <p>{open.note}</p>
              <button ref={closeRef} className="book-close" onClick={() => setOpen(null)}>Put it back</button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
