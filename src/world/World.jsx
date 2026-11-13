import { useCallback, useEffect, useRef, useState } from 'react';
import { travel } from './portal';
import Particles from './Particles';
import PixelIcon from './PixelIcon';
import Island from './scenes/Island';
import Library from './scenes/Library';
import Workshop from './scenes/Workshop';
import Depths from './scenes/Depths';
import Beacon from './scenes/Beacon';

import artIsland from '../assets/world/island.webp';
import artIslandSm from '../assets/world/island-sm.webp';
import artLibrary from '../assets/world/library.webp';
import artLibrarySm from '../assets/world/library-sm.webp';
import artWorkshop from '../assets/world/workshop.webp';
import artWorkshopSm from '../assets/world/workshop-sm.webp';
import artPortal from '../assets/world/portal.webp';
import artPortalSm from '../assets/world/portal-sm.webp';
import artEnd from '../assets/world/end.webp';
import artEndSm from '../assets/world/end-sm.webp';
import dragon from '../assets/world/dragon.webp';
import vidIsland from '../assets/world/island.mp4';
import vidIslandSm from '../assets/world/island-sm.mp4';
import vidWorkshop from '../assets/world/workshop.mp4';
import vidWorkshopSm from '../assets/world/workshop-sm.mp4';
import vidLibrary from '../assets/world/library.mp4';
import vidLibrarySm from '../assets/world/library-sm.mp4';
import vidPortal from '../assets/world/portal.mp4';
import vidPortalSm from '../assets/world/portal-sm.mp4';
import vidEnd from '../assets/world/end.mp4';
import vidEndSm from '../assets/world/end-sm.mp4';

const SCENES = [
  { id: 'island',   name: 'The island',   hint: 'Home',          art: artIsland,   sm: artIslandSm,   vid: vidIsland,   vidSm: vidIslandSm,   pos: '62% 50%', C: Island },
  { id: 'workshop', name: 'The workshop', hint: 'What I build',   art: artWorkshop, sm: artWorkshopSm, vid: vidWorkshop, vidSm: vidWorkshopSm, pos: '40% 50%', C: Workshop },
  { id: 'library',  name: 'The library',  hint: 'What I studied', art: artLibrary,  sm: artLibrarySm,  vid: vidLibrary,  vidSm: vidLibrarySm,  pos: '50% 50%', C: Library },
  { id: 'depths',   name: 'The depths',   hint: 'Where I’ve been', art: artPortal,  sm: artPortalSm,   vid: vidPortal,   vidSm: vidPortalSm,   pos: '50% 50%', C: Depths },
  { id: 'end',      name: 'The end',      hint: 'Talk to me',     art: artEnd,      sm: artEndSm,      vid: vidEnd,      vidSm: vidEndSm,      pos: '72% 50%', C: Beacon },
];

// Phones get a portrait crop of each loop; skip video entirely for reduced motion or data saver.
const small = () => window.matchMedia('(max-width: 700px)').matches;
const motionOk = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData;

function SceneVideo({ s }) {
  const [ready, setReady] = useState(false);
  const [src] = useState(() => (motionOk() ? (small() ? s.vidSm : s.vid) : null));
  if (!src) return null;
  return (
    <video
      className={`art-video${ready ? ' is-ready' : ''}`}
      src={src}
      autoPlay muted loop playsInline preload="auto"
      onPlaying={() => setReady(true)}
      style={{ objectPosition: small() ? '50% 50%' : s.pos }}
    />
  );
}

const fromHash = () => {
  const id = window.location.hash.replace(/^#\/?/, '');
  return SCENES.find((s) => s.id === id) ? id : 'island';
};

export default function World() {
  const [scene, setScene] = useState(fromHash);
  const [arrival, setArrival] = useState(0);
  const [title, setTitle] = useState(null); // shown inside the portal while it covers the screen
  const busy = useRef(false);
  const artRef = useRef(null);
  const reduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const current = SCENES.find((s) => s.id === scene);

  const go = useCallback((id, e) => {
    if (busy.current || id === fromHash()) return;
    busy.current = true;
    let x = window.innerWidth / 2, y = window.innerHeight - 40;
    if (e && 'clientX' in e && e.clientX) { x = e.clientX; y = e.clientY; }
    else if (e?.currentTarget?.getBoundingClientRect) {
      const r = e.currentTarget.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2;
    }
    if (!reduced.current) setTitle(SCENES.find((s) => s.id === id).name);
    travel({
      x, y, reduced: reduced.current,
      onSwap: () => {
        window.history.pushState(null, '', id === 'island' ? '/' : `/#/${id}`);
        setScene(id);
        setArrival((n) => n + 1);
        window.scrollTo(0, 0);
      },
    }).then(() => { busy.current = false; setTitle(null); });
  }, []);

  // back/forward
  useEffect(() => {
    const onPop = () => { setScene(fromHash()); setArrival((n) => n + 1); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // number keys travel
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/input|textarea/i.test(e.target.tagName)) return;
      if (document.querySelector('.book-open')) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= SCENES.length) go(SCENES[n - 1].id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  // art parallax: follows the pointer a little and sinks as you scroll
  useEffect(() => {
    if (reduced.current) return;
    let px = 0, py = 0, sy = 0, raf;
    const apply = () => {
      raf = null;
      if (artRef.current) artRef.current.style.transform =
        `translate3d(${px * -14}px, ${py * -10 - Math.min(sy * 0.03, 26)}px, 0) scale(1.08)`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const onMove = (e) => { px = e.clientX / window.innerWidth - 0.5; py = e.clientY / window.innerHeight - 0.5; queue(); };
    const onScroll = () => { sy = window.scrollY; queue(); };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => { document.title = scene === 'island' ? 'Ashish Subedi' : `${current.name} · Ashish Subedi`; }, [scene, current]);

  const Scene = current.C;

  return (
    <div className={`world world--${scene}`}>
      <div className="art" aria-hidden="true">
        <div className="art-move" ref={artRef} key={scene}>
          <picture>
            <source media="(max-width: 700px)" srcSet={current.sm} />
            <img src={current.art} alt="" style={{ objectPosition: current.pos }} />
          </picture>
          <SceneVideo s={current} />
        </div>
        {scene === 'end' && !motionOk() && (
          <div className="dragon-path">
            <img className="dragon" src={dragon} alt="" />
          </div>
        )}
        <div className="art-shade" />
      </div>
      <Particles mood={scene} />

      <a className="mark" href="/" onClick={(e) => { e.preventDefault(); go('island', e); }} aria-label="Ashish Subedi, home">
        <span className="mark-block">AS</span>
        <span className="mark-where" key={arrival}>{current.name}</span>
      </a>

      {title && (
        <div className="arrive" aria-hidden="true">
          <small>Entering</small>
          <span>{title}</span>
        </div>
      )}

      <main className="scene" key={scene}>
        <Scene go={go} />
      </main>

      <nav className="hotbar" aria-label="Travel">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            className={`slot${s.id === scene ? ' slot--on' : ''}`}
            onClick={(e) => go(s.id, e)}
            aria-current={s.id === scene ? 'page' : undefined}
            aria-label={`${s.name}: ${s.hint}`}
          >
            <PixelIcon name={s.id} />
            <span className="slot-key">{i + 1}</span>
            <span className="slot-tip"><b>{s.name}</b>{s.hint}</span>
          </button>
        ))}
      </nav>

      <canvas id="portal-canvas" aria-hidden="true" />
    </div>
  );
}
