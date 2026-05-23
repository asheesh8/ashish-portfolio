import { useEffect, useRef } from 'react';
import './ShootingStars.css';

const STAR_COUNT = 6;

function randomStar(W, H) {
  const angle = -(25 + Math.random() * 20); // degrees, falling right
  const startX = Math.random() * W * 1.5;
  const startY = Math.random() * H * 0.5;
  const length = 80 + Math.random() * 120;
  const speed  = 600 + Math.random() * 800; // ms
  const delay  = Math.random() * 8000;      // ms
  const tail   = 0.6 + Math.random() * 0.4;
  return { startX, startY, length, speed, delay, angle, tail };
}

export default function ShootingStars() {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ stars: [], animId: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const state = stateRef.current;
    state.stars = Array.from({ length: STAR_COUNT }, () => ({ ...randomStar(W, H), elapsed: 0, born: performance.now() + Math.random() * 8000 }));

    const draw = (now) => {
      state.animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      state.stars.forEach((s) => {
        if (now < s.born) return;
        const age = now - s.born;
        const t = (age % (s.speed + s.delay)) / s.speed;
        if (t > 1) return; // in delay gap

        const rad = (s.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * s.length * t;
        const dy = Math.sin(rad) * s.length * t;
        const x1 = s.startX + dx;
        const y1 = s.startY + dy;
        const x0 = x1 - Math.cos(rad) * s.length * s.tail * Math.min(t, 1);
        const y0 = y1 - Math.sin(rad) * s.length * s.tail * Math.min(t, 1);

        const alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${alpha * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Tip glow
        ctx.beginPath();
        ctx.arc(x1, y1, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.8})`;
        ctx.fill();
      });
    };

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      state.stars = Array.from({ length: STAR_COUNT }, () => ({ ...randomStar(W, H), born: performance.now() + Math.random() * 6000 }));
    };
    window.addEventListener('resize', onResize);
    state.animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(state.animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="shooting-stars-canvas" aria-hidden="true" />;
}
