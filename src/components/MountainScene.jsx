import { useEffect, useRef } from 'react';
import './MountainScene.css';

// ─── color helpers ────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}
function lerpColor(a, b, t) {
  const [r1,g1,b1] = hexToRgb(a), [r2,g2,b2] = hexToRgb(b);
  return `rgb(${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))})`;
}
function getFrame(frames, p) {
  let a = frames[0], b = frames[1];
  for (let i = 0; i < frames.length - 1; i++) {
    if (p >= frames[i].p && p <= frames[i+1].p) { a = frames[i]; b = frames[i+1]; break; }
  }
  const t = (b.p - a.p) > 0 ? (p - a.p) / (b.p - a.p) : 0;
  return { a, b, t };
}

// ─── sky keyframes ────────────────────────────────────────────────────────────
const SKY = [
  { p: 0,    top: '#1c0535', mid: '#6b1e3a', horizon: '#cc4400', cityGlow: 0.0 },
  { p: 0.18, top: '#0a0425', mid: '#1e0840', horizon: '#55085a', cityGlow: 0.3 },
  { p: 0.45, top: '#020307', mid: '#030608', horizon: '#050c10', cityGlow: 1.0 },
  { p: 0.72, top: '#020210', mid: '#050318', horizon: '#080522', cityGlow: 0.6 },
  { p: 1.0,  top: '#060210', mid: '#4a0a00', horizon: '#c85000', cityGlow: 0.0 },
];

// ─── mountain fill keyframes ──────────────────────────────────────────────────
const MTN = [
  { p: 0,    far: '#3d1808', mid2: '#1e0e06', mid: '#100804', fg: '#080502' },
  { p: 0.18, far: '#1a0e30', mid2: '#100828', mid: '#08061a', fg: '#050410' },
  { p: 0.45, far: '#081408', mid2: '#060e06', mid: '#040a04', fg: '#030603' },
  { p: 0.72, far: '#080c18', mid2: '#060810', mid: '#040608', fg: '#030405' },
  { p: 1.0,  far: '#3a1404', mid2: '#1c0a04', mid: '#0e0602', fg: '#080402' },
];

// ─── stars ────────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 90 }, (_, i) => ({
  cx: (i * 37.3 + 11) % 100,
  cy: (i * 19.7 + 5)  % 55,
  r:  (i * 7.1)  % 1.2 + 0.35,
  op: (i * 13.3) % 0.55 + 0.2,
  twinkle: i % 3 === 0,
}));

// ─── town scene ───────────────────────────────────────────────────────────────
// viewBox 0 0 1440 360 — buildings have bases at y≈278, tops from y≈210–258
// LIT window = #FFD580 with glow filter   DARK window = #100c06
const LIT  = '#FFD580';
const DARK = '#100c06';
const B    = '#060402'; // building fill (near-black)

function House({ x, y=278, w, h, roofH, windows }) {
  // y is the BOTTOM (ground). body sits from y-h to y. roof peak above body.
  const by = y - h;       // body top
  const rpy = by - roofH; // roof peak
  const mx = x + w / 2;  // midpoint x
  return (
    <g fill={B}>
      <polygon points={`${x},${by} ${mx},${rpy} ${x+w},${by}`} />
      <rect x={x} y={by} width={w} height={h} />
      {windows}
    </g>
  );
}

function Bldg({ x, y=278, w, h, windows }) {
  return (
    <g fill={B}>
      <rect x={x} y={y-h} width={w} height={h} />
      {windows}
    </g>
  );
}

function Win({ x, y, w=5, h=6, lit=true }) {
  return (
    <rect
      x={x} y={y} width={w} height={h}
      fill={lit ? LIT : DARK}
      filter={lit ? 'url(#wg)' : undefined}
    />
  );
}

function Church({ x, y=278, bw, bh, tw, th, spireH }) {
  // Base body, then tower on top, then spire
  const baseTop = y - bh;
  const towerX  = x + (bw - tw) / 2;
  const towerTop = y - bh - th;
  const spireTop = towerTop - spireH;
  const tMid    = towerX + tw / 2;
  return (
    <g fill={B}>
      <rect x={x} y={baseTop} width={bw} height={bh} />
      <rect x={towerX} y={towerTop} width={tw} height={th} />
      <polygon points={`${towerX},${towerTop} ${tMid},${spireTop} ${towerX+tw},${towerTop}`} />
    </g>
  );
}

function TownScene() {
  return (
    <svg
      className="mtn-layer mtn-town"
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* Warm amber glow for lit windows */}
        <filter id="wg" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── CLUSTER 1 — left village (x: 55–268) ── */}
      <House x={55}  w={24} h={20} roofH={11} windows={<><Win x={59}  y={263} lit/><Win x={70}  y={263} lit={false}/></>} />
      <House x={85}  w={30} h={25} roofH={13} windows={<><Win x={89}  y={258} lit/><Win x={101} y={258} lit/></>} />
      <Bldg  x={121} w={18} h={48}             windows={<><Win x={124} y={236} w={4} h={5} lit/><Win x={130} y={236} w={4} h={5} lit={false}/><Win x={124} y={246} w={4} h={5} lit/><Win x={130} y={246} w={4} h={5} lit/><Win x={124} y={256} w={4} h={5} lit={false}/><Win x={130} y={256} w={4} h={5} lit/><Win x={124} y={266} w={4} h={5} lit/></>} />
      <House x={145} w={24} h={19} roofH={11} windows={<><Win x={148} y={264} lit/><Win x={160} y={264} lit={false}/></>} />
      <House x={175} w={28} h={23} roofH={12} windows={<><Win x={179} y={261} lit/><Win x={190} y={261} lit/></>} />
      <Bldg  x={209} w={20} h={44}             windows={<><Win x={212} y={241} w={4} h={5} lit={false}/><Win x={219} y={241} w={4} h={5} lit/><Win x={212} y={251} w={4} h={5} lit/><Win x={219} y={251} w={4} h={5} lit/><Win x={212} y={261} w={4} h={5} lit/><Win x={219} y={261} w={4} h={5} lit={false}/></>} />
      <House x={235} w={24} h={19} roofH={11} windows={<><Win x={239} y={264} lit/><Win x={250} y={264} lit/></>} />

      {/* ── CLUSTER 2 — mid-left (x: 330–528) ── */}
      <House x={330} w={26} h={21} roofH={12} windows={<><Win x={334} y={263} lit/><Win x={346} y={263} lit={false}/></>} />
      <House x={362} w={30} h={25} roofH={13} windows={<><Win x={366} y={259} lit/><Win x={378} y={259} lit/></>} />
      <Bldg  x={398} w={24} h={50}             windows={<><Win x={401} y={234} w={5} h={6} lit/><Win x={408} y={234} w={5} h={6} lit={false}/><Win x={401} y={244} w={5} h={6} lit/><Win x={408} y={244} w={5} h={6} lit/><Win x={401} y={254} w={5} h={6} lit={false}/><Win x={408} y={254} w={5} h={6} lit/><Win x={401} y={264} w={5} h={6} lit/></>} />

      {/* Church — left landmark */}
      <Church x={429} bw={18} bh={30} tw={6} th={50} spireH={14} />
      <Win x={431} y={258} w={4} h={6} lit />
      <Win x={438} y={258} w={4} h={6} lit={false} />
      <Win x={434} y={215} w={3} h={5} lit />  {/* belfry */}

      <House x={454} w={24} h={19} roofH={11} windows={<><Win x={457} y={264} lit={false}/><Win x={469} y={264} lit/></>} />
      <Bldg  x={484} w={22} h={46}             windows={<><Win x={487} y={240} w={5} h={6} lit/><Win x={494} y={240} w={5} h={6} lit/><Win x={487} y={250} w={5} h={6} lit={false}/><Win x={494} y={250} w={5} h={6} lit/><Win x={487} y={260} w={5} h={6} lit/><Win x={494} y={260} w={5} h={6} lit={false}/></>} />

      {/* ── CLUSTER 3 — center / Burlington (x: 612–806) ── */}
      <Bldg  x={612} w={20} h={52}             windows={<><Win x={615} y={232} w={4} h={5} lit/><Win x={622} y={232} w={4} h={5} lit={false}/><Win x={615} y={242} w={4} h={5} lit/><Win x={622} y={242} w={4} h={5} lit/><Win x={615} y={252} w={4} h={5} lit={false}/><Win x={622} y={252} w={4} h={5} lit/><Win x={615} y={262} w={4} h={5} lit/></>} />
      <Bldg  x={637} w={22} h={58}             windows={<><Win x={640} y={226} w={5} h={6} lit/><Win x={648} y={226} w={5} h={6} lit/><Win x={640} y={236} w={5} h={6} lit={false}/><Win x={648} y={236} w={5} h={6} lit/><Win x={640} y={246} w={5} h={6} lit/><Win x={648} y={246} w={5} h={6} lit={false}/><Win x={640} y={256} w={5} h={6} lit/><Win x={648} y={256} w={5} h={6} lit/><Win x={640} y={266} w={5} h={6} lit={false}/></>} />
      <House x={664} w={28} h={24} roofH={13} windows={<><Win x={668} y={260} lit/><Win x={679} y={260} lit={false}/></>} />

      {/* Main Burlington church steeple — the landmark */}
      <Church x={698} bw={20} bh={32} tw={8} th={62} spireH={16} />
      <Win x={700} y={254} w={5} h={7} lit />
      <Win x={710} y={254} w={5} h={7} lit />
      <Win x={703} y={210} w={4} h={7} lit />  {/* belfry glow */}

      <Bldg  x={724} w={22} h={50}             windows={<><Win x={727} y={234} w={5} h={6} lit/><Win x={735} y={234} w={5} h={6} lit={false}/><Win x={727} y={244} w={5} h={6} lit/><Win x={735} y={244} w={5} h={6} lit/><Win x={727} y={254} w={5} h={6} lit={false}/><Win x={735} y={254} w={5} h={6} lit/><Win x={727} y={264} w={5} h={6} lit/></>} />
      <Bldg  x={752} w={18} h={44}             windows={<><Win x={755} y={240} w={4} h={5} lit={false}/><Win x={762} y={240} w={4} h={5} lit/><Win x={755} y={250} w={4} h={5} lit/><Win x={762} y={250} w={4} h={5} lit/><Win x={755} y={260} w={4} h={5} lit/><Win x={762} y={260} w={4} h={5} lit={false}/></>} />
      <House x={776} w={24} h={20} roofH={12} windows={<><Win x={780} y={263} lit/><Win x={791} y={263} lit={false}/></>} />

      {/* ── CLUSTER 4 — mid-right (x: 904–1086) ── */}
      <House x={904}  w={24} h={20} roofH={11} windows={<><Win x={908}  y={263} lit/><Win x={919}  y={263} lit/></>} />
      <House x={934}  w={30} h={25} roofH={13} windows={<><Win x={938}  y={258} lit={false}/><Win x={950}  y={258} lit/></>} />
      <Bldg  x={970}  w={22} h={48}             windows={<><Win x={973}  y={236} w={5} h={6} lit/><Win x={981}  y={236} w={5} h={6} lit/><Win x={973}  y={246} w={5} h={6} lit={false}/><Win x={981}  y={246} w={5} h={6} lit/><Win x={973}  y={256} w={5} h={6} lit/><Win x={981}  y={256} w={5} h={6} lit={false}/><Win x={973}  y={266} w={5} h={6} lit/></>} />
      <House x={998}  w={24} h={19} roofH={11} windows={<><Win x={1002} y={264} lit={false}/><Win x={1013} y={264} lit/></>} />
      <House x={1028} w={28} h={23} roofH={12} windows={<><Win x={1032} y={261} lit/><Win x={1043} y={261} lit/></>} />
      <Bldg  x={1062} w={20} h={42}             windows={<><Win x={1065} y={242} w={4} h={5} lit/><Win x={1072} y={242} w={4} h={5} lit={false}/><Win x={1065} y={252} w={4} h={5} lit/><Win x={1072} y={252} w={4} h={5} lit/><Win x={1065} y={262} w={4} h={5} lit={false}/><Win x={1072} y={262} w={4} h={5} lit/></>} />

      {/* ── CLUSTER 5 — right village (x: 1183–1366) ── */}
      <House x={1183} w={24} h={20} roofH={11} windows={<><Win x={1187} y={263} lit/><Win x={1198} y={263} lit={false}/></>} />
      <House x={1213} w={28} h={24} roofH={12} windows={<><Win x={1217} y={260} lit/><Win x={1228} y={260} lit/></>} />
      <Bldg  x={1247} w={20} h={42}             windows={<><Win x={1250} y={242} w={4} h={5} lit={false}/><Win x={1257} y={242} w={4} h={5} lit/><Win x={1250} y={252} w={4} h={5} lit/><Win x={1257} y={252} w={4} h={5} lit/><Win x={1250} y={262} w={4} h={5} lit/><Win x={1257} y={262} w={4} h={5} lit={false}/></>} />
      <House x={1273} w={24} h={19} roofH={11} windows={<><Win x={1277} y={264} lit/><Win x={1288} y={264} lit/></>} />
      <House x={1303} w={28} h={23} roofH={12} windows={<><Win x={1307} y={261} lit={false}/><Win x={1318} y={261} lit/></>} />
      <House x={1338} w={24} h={20} roofH={11} windows={<><Win x={1342} y={263} lit/><Win x={1353} y={263} lit={false}/></>} />
    </svg>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function MountainScene() {
  const sceneRef = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const skyEl      = scene.querySelector('.mtn-sky');
    const cityGlowEl = scene.querySelector('.mtn-city-glow');
    const starsEl    = scene.querySelector('.mtn-stars');
    const farEl      = scene.querySelector('.mtn-far path');
    const midFarEl   = scene.querySelector('.mtn-mid-far path');
    const midEl      = scene.querySelector('.mtn-mid path');
    const fgEl       = scene.querySelector('.mtn-fg path');

    const layers = [
      { el: scene.querySelector('.mtn-far'),     rate: 0.05 },
      { el: scene.querySelector('.mtn-mid-far'), rate: 0.12 },
      { el: scene.querySelector('.mtn-mid'),     rate: 0.2  },
      { el: scene.querySelector('.mtn-fg'),      rate: 0.3  },
      { el: scene.querySelector('.mtn-town'),    rate: 0.3  },
    ];

    const tick = () => {
      rafRef.current = null;
      const scrollY    = window.scrollY;
      const maxScroll  = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p          = Math.min(scrollY / maxScroll, 1);

      // Sky
      const { a: sa, b: sb, t: st } = getFrame(SKY, p);
      skyEl.style.background = `linear-gradient(180deg,
        ${lerpColor(sa.top, sb.top, st)} 0%,
        ${lerpColor(sa.mid, sb.mid, st)} 55%,
        ${lerpColor(sa.horizon, sb.horizon, st)} 100%)`;

      // Burlington city glow
      cityGlowEl.style.opacity = lerp(sa.cityGlow, sb.cityGlow, st);

      // Stars (peak at night ~p=0.45)
      const nightness = p < 0.45 ? p / 0.45 : 1 - (p - 0.45) / 0.55;
      starsEl.style.opacity = Math.max(0, Math.min(1, nightness * 1.5));

      // Mountain fills
      const { a: ma, b: mb, t: mt } = getFrame(MTN, p);
      if (farEl)    farEl.style.fill    = lerpColor(ma.far,  mb.far,  mt);
      if (midFarEl) midFarEl.style.fill = lerpColor(ma.mid2, mb.mid2, mt);
      if (midEl)    midEl.style.fill    = lerpColor(ma.mid,  mb.mid,  mt);
      if (fgEl)     fgEl.style.fill     = lerpColor(ma.fg,   mb.fg,   mt);

      // Parallax
      layers.forEach(({ el, rate }) => {
        if (el) el.style.transform = `translateY(${scrollY * rate}px)`;
      });
    };

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', tick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="mountain-scene" ref={sceneRef} aria-hidden="true">
      <div className="mtn-sky" />

      <svg className="mtn-stars" viewBox="0 0 100 55" preserveAspectRatio="xMidYMid slice">
        {STARS.map((s, i) => (
          <circle
            key={i} cx={s.cx} cy={s.cy} r={s.r}
            fill="white" opacity={s.op}
            className={s.twinkle ? 'star-twinkle' : ''}
          />
        ))}
      </svg>

      {/* Warm ambient glow over Burlington */}
      <div className="mtn-city-glow" />

      {/* Mountain layers — back to front */}
      <svg className="mtn-layer mtn-far" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice">
        <path d="M0,210 C60,195 130,208 220,175 C310,142 380,190 480,150 C580,110 640,172 740,128 C840,84 910,152 1020,100 C1100,62 1160,128 1260,88 C1330,60 1400,105 1440,82 L1440,360 L0,360 Z" />
      </svg>

      <svg className="mtn-layer mtn-mid-far" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice">
        <path d="M0,238 C70,220 155,238 280,205 C405,172 490,225 615,192 C740,159 840,218 980,180 C1120,142 1230,205 1360,168 C1410,152 1435,170 1440,160 L1440,360 L0,360 Z" />
      </svg>

      <svg className="mtn-layer mtn-mid" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice">
        <path d="M0,262 C55,248 125,265 245,235 C365,205 455,255 590,228 C725,201 850,258 1010,225 C1170,192 1310,252 1440,222 L1440,360 L0,360 Z" />
      </svg>

      {/* Foreground hills — no more inline silhouette, town handles it */}
      <svg className="mtn-layer mtn-fg" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice">
        <path d="M0,280 C50,268 115,282 230,262 C345,242 440,282 570,262 C700,242 825,282 985,262 C1145,242 1310,276 1440,255 L1440,360 L0,360 Z" />
      </svg>

      {/* Vermont mountain town — houses, buildings, glowing windows */}
      <TownScene />
    </div>
  );
}
