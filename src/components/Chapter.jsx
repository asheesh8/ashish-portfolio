import { useEffect, useRef, useState } from 'react';
import Atmosphere from './Atmosphere';

// A chapter is a painted scene that sticks to the screen while its content
// scrolls over it. The next chapter slides up over the last one like a new sheet.
export default function Chapter({ id, scene, art, loop, weather, focus = '50% 50%', eager = false, label, children }) {
  const [loopReady, setLoopReady] = useState(false);
  const [artReady, setArtReady] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) setArtReady(true);
  }, []);

  return (
    <section id={id} className={`chapter scene-${scene}`} data-chapter={id} aria-label={label}>
      <div className="chapter-art" aria-hidden="true" style={{ '--focus': focus }}>
        <div className="art-frame">
          <img
            ref={imgRef}
            src={art}
            alt=""
            className={`art-img${artReady ? ' is-ready' : ''}`}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            decoding="async"
            onLoad={() => setArtReady(true)}
          />
          {loop && (
            <video
              className={`art-loop${loopReady ? ' is-ready' : ''}`}
              src={loop}
              muted
              autoPlay
              playsInline
              preload="metadata"
              onCanPlay={() => setLoopReady(true)}
              onTimeUpdate={(e) => {
                // The clip starts on the painting itself, so fade back to the still near the end
                // and restart. That hides the jump a plain loop would show.
                const v = e.currentTarget;
                if (v.duration && v.duration - v.currentTime < 0.9) setLoopReady(false);
              }}
              onEnded={(e) => { const v = e.currentTarget; v.currentTime = 0; v.play().catch(() => {}); }}
              onPlaying={() => setLoopReady(true)}
            />
          )}
        </div>
        <Atmosphere mode={weather} />
        <div className="art-scrim" />
      </div>
      <div className="chapter-body">{children}</div>
    </section>
  );
}
