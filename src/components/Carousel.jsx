import { useState, useEffect, useCallback } from 'react';
import Lightbox from './Lightbox';
import './Carousel.css';

export default function Carousel({ images = [], label, className = '' }) {
  const [idx, setIdx]         = useState(0);
  const [paused, setPaused]   = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (paused || lightbox || images.length <= 1) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused, lightbox, next, images.length]);

  useEffect(() => { setIdx(0); }, [images.length]);

  if (images.length === 0) {
    return (
      <div className={`carousel carousel-empty ${className}`}>
        <span className="carousel-empty-icon">📷</span>
        <span className="carousel-empty-label">[ {label} ]</span>
        <span className="carousel-empty-hint">drop images into src/assets/{label?.toLowerCase().replace(/\s+/g, '-') ?? 'folder'}/</span>
      </div>
    );
  }

  return (
    <>
      <div
        className={`carousel ${className}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span className="carousel-label">{label}</span>

        <div className="carousel-inner">
          {images.map((src, i) => (
            <div key={src} className={`carousel-slide${i === idx ? ' active' : ''}`}>
              <img
                src={src}
                alt={`${label} ${i + 1}`}
                loading="lazy"
                draggable={false}
                onClick={() => setLightbox(true)}
                style={{ cursor: 'zoom-in' }}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button className="carousel-btn prev" onClick={prev} aria-label="Previous">&#8249;</button>
            <button className="carousel-btn next" onClick={next} aria-label="Next">&#8250;</button>
            <div className="carousel-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === idx ? ' active' : ''}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <Lightbox
          src={images[idx]}
          alt={`${label} ${idx + 1}`}
          onClose={() => setLightbox(false)}
          onPrev={prev}
          onNext={next}
          total={images.length}
          current={idx}
        />
      )}
    </>
  );
}
