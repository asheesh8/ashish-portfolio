import { useEffect, useRef } from 'react';

// One small canvas per scene. Each mode is a different kind of weather.
// It only animates while its scene is on screen, and not at all with reduced motion.

const rand = (a, b) => a + Math.random() * (b - a);

const MODES = {
  glints: {
    count: 46,
    make: (w, h) => ({ x: rand(0, w), y: rand(h * 0.55, h * 0.92), r: rand(0.6, 2.2), t: rand(0, 6.28), s: rand(0.006, 0.02), v: rand(0.05, 0.25) }),
    step(p, w) { p.t += p.s; p.x += p.v; if (p.x > w + 4) p.x = -4; },
    draw(ctx, p) {
      const a = Math.max(0, Math.sin(p.t)) * 0.85;
      ctx.fillStyle = `rgba(255, 226, 160, ${a})`;
      ctx.fillRect(p.x - p.r * 2, p.y, p.r * 4, p.r * 0.7);
    },
  },
  dust: {
    count: 38,
    make: (w, h) => ({ x: rand(0, w), y: rand(0, h), r: rand(0.8, 2.4), vx: rand(0.05, 0.3), vy: rand(-0.15, 0.05), t: rand(0, 6.28) }),
    step(p, w, h) { p.t += 0.01; p.x += p.vx; p.y += p.vy + Math.sin(p.t) * 0.08; if (p.x > w + 5) p.x = -5; if (p.y < -5) p.y = h + 5; },
    draw(ctx, p) { ctx.fillStyle = `rgba(255, 236, 214, ${0.25 + Math.sin(p.t) * 0.15})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill(); },
  },
  snow: {
    count: 120,
    make: (w, h) => ({ x: rand(0, w), y: rand(-h, h), r: rand(0.7, 2.6), vy: rand(0.35, 1.1), t: rand(0, 6.28), s: rand(0.005, 0.02) }),
    step(p, w, h) { p.t += p.s; p.y += p.vy; p.x += Math.sin(p.t) * 0.4; if (p.y > h + 4) { p.y = -4; p.x = rand(0, w); } },
    draw(ctx, p) { ctx.fillStyle = `rgba(250, 248, 255, ${0.35 + p.r / 5})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill(); },
  },
  leaves: {
    count: 26,
    make: (w, h) => ({ x: rand(0, w), y: rand(-h, h), size: rand(5, 11), vy: rand(0.5, 1.3), vx: rand(-0.3, 0.5), rot: rand(0, 6.28), vr: rand(-0.03, 0.03), t: rand(0, 6.28), hue: [ '#b4442a', '#d2692e', '#e0a13a', '#8f2f22' ][Math.floor(rand(0, 4))] }),
    step(p, w, h) { p.t += 0.02; p.y += p.vy; p.x += p.vx + Math.sin(p.t) * 0.7; p.rot += p.vr + Math.sin(p.t) * 0.01; if (p.y > h + 20) { p.y = -20; p.x = rand(0, w); } },
    draw(ctx, p) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.abs(Math.cos(p.t)) * 0.6 + 0.4);
      ctx.fillStyle = p.hue; ctx.beginPath();
      const s = p.size;
      // a little five-point maple leaf
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.3, -s * 0.35); ctx.lineTo(s, -s * 0.5); ctx.lineTo(s * 0.55, 0);
      ctx.lineTo(s * 0.8, s * 0.45); ctx.lineTo(s * 0.15, s * 0.3); ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.15, s * 0.3); ctx.lineTo(-s * 0.8, s * 0.45); ctx.lineTo(-s * 0.55, 0);
      ctx.lineTo(-s, -s * 0.5); ctx.lineTo(-s * 0.3, -s * 0.35);
      ctx.closePath(); ctx.fill(); ctx.restore();
    },
  },
  fireflies: {
    count: 34,
    make: (w, h) => ({ x: rand(0, w), y: rand(h * 0.45, h), r: rand(1, 2.4), t: rand(0, 6.28), s: rand(0.01, 0.03), vx: rand(-0.25, 0.25), vy: rand(-0.2, 0.2) }),
    step(p, w, h) { p.t += p.s; p.x += p.vx + Math.sin(p.t * 1.3) * 0.3; p.y += p.vy + Math.cos(p.t) * 0.2; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < h * 0.4 || p.y > h) p.vy *= -1; },
    draw(ctx, p) {
      const a = Math.max(0, Math.sin(p.t * 2)) ;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, `rgba(232, 248, 170, ${a})`); g.addColorStop(1, 'rgba(232, 248, 170, 0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, 6.28); ctx.fill();
    },
  },
};

export default function Atmosphere({ mode }) {
  const ref = useRef(null);

  useEffect(() => {
    const cfg = MODES[mode];
    const canvas = ref.current;
    if (!cfg || !canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, raf = 0, visible = false, parts = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(cfg.count * Math.min(1, w / 1200 + 0.35));
      parts = Array.from({ length: n }, () => cfg.make(w, h));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) { cfg.step(p, w, h); cfg.draw(ctx, p); }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });

    resize();
    io.observe(canvas);
    window.addEventListener('resize', resize);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [mode]);

  return <canvas ref={ref} className="atmo" aria-hidden="true" />;
}
