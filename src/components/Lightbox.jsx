import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Lightbox.css';

export default function Lightbox({ src, alt, onClose, onPrev, onNext, total, current }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext?.();
      if (e.key === 'ArrowLeft')  onPrev?.();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return createPortal(
    <div className="lightbox" onClick={onClose}>
      {/* Image wrapper — clicks here don't close */}
      <div className="lb-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} draggable={false} />

        <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>

        {total > 1 && (
          <>
            <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">&#8249;</button>
            <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">&#8250;</button>
            <span className="lb-counter">{current + 1} / {total}</span>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
