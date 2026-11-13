import { useEffect, useRef } from 'react';

// Drifting light blocks over the artwork. Each scene gets its own mood.
const MOODS = {
  island:   { colors: ['#ffb44d', '#ffd88a', '#ff7a3d'], n: 34, vy: -0.12, vx: 0.05, size: [2, 6] },
  library:  { colors: ['#44e2c8', '#a17cff', '#ffd88a'], n: 40, vy: -0.18, vx: 0.02, size: [2, 5] },
  workshop: { colors: ['#ff7a3d', '#ffb44d', '#ffd88a'], n: 46, vy: -0.45, vx: 0.08, size: [1, 4] },
  depths:   { colors: ['#ffb44d', '#44e2c8', '#a17cff'], n: 26, vy: -0.08, vx: 0.03, size: [2, 4] },
  end:      { colors: ['#a17cff', '#e07cff', '#44e2c8'], n: 56, vy: -0.22, vx: 0.04, size: [2, 5] },
};

export default function Particles({ mood }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    const m = MOODS[mood] || MOODS.island;
    let W, H, raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const make = (fresh) => ({
      x: Math.random() * W,
      y: fresh ? Math.random() * H : H + 10,
      s: m.size[0] + Math.random() * (m.size[1] - m.size[0]),
      c: m.colors[(Math.random() * m.colors.length) | 0],
      vy: m.vy * (0.5 + Math.random()),
      vx: (Math.random() - 0.5) * m.vx * 4,
      ph: Math.random() * 6.28,
    });
    const ps = Array.from({ length: W < 640 ? Math.round(m.n * 0.6) : m.n }, () => make(true));

    const draw = (now) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        if (!reduce) { p.y += p.vy; p.x += p.vx + Math.sin(now / 1400 + p.ph) * 0.12; }
        if (p.y < -10) Object.assign(p, make(false));
        const flicker = 0.45 + 0.55 * Math.abs(Math.sin(now / 1100 + p.ph));
        ctx.globalAlpha = flicker;
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = p.s * 3;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [mood]);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
