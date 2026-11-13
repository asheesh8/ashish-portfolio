// Portal travel: blocks of portal-light fill the screen outward from where you
// clicked, the void swirls for a beat, then the blocks clear onto the new scene.

const COLORS = ['#1b1233', '#24164a', '#2f1d63', '#3a2380', '#1f9e8f', '#44e2c8', '#6b4fd1', '#a17cff'];

export function travel({ x, y, onSwap, reduced }) {
  const canvas = document.getElementById('portal-canvas');
  if (!canvas || reduced) {
    onSwap();
    return Promise.resolve();
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const cell = W < 640 ? 28 : 40;
  const cols = Math.ceil(W / cell);
  const rows = Math.ceil(H / cell);
  const maxD = Math.hypot(Math.max(x, W - x), Math.max(y, H - y));
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * cell + cell / 2;
      const cy = r * cell + cell / 2;
      const d = Math.hypot(cx - x, cy - y) / maxD;
      const roll = Math.random();
      const col = roll < 0.72 ? COLORS[(Math.random() * 4) | 0] : roll < 0.9 ? '#1a6f6a' : '#4b3693';
      cells.push({ c, r, d: d * 0.75 + Math.random() * 0.25, col, glint: Math.random() });
    }
  }
  const stars = Array.from({ length: 320 }, () => ({
    a: Math.random() * Math.PI * 2,
    rad: Math.random() * Math.max(W, H) * 0.7,
    s: Math.random() < 0.2 ? 6 : Math.random() < 0.5 ? 4 : 2, arm: (Math.random() * 3) | 0,
    col: COLORS[4 + ((Math.random() * 4) | 0)],
  }));

  const IN = 520, HOLD = 820, OUT = 560;
  let swapped = false;
  const start = performance.now();

  return new Promise((resolve) => {
    const frame = (now) => {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);

      let cover; // 0..1 per cell threshold
      if (t < IN) cover = t / IN;
      else if (t < IN + HOLD) cover = 1;
      else cover = 1 - (t - IN - HOLD) / OUT;

      const phaseOut = t >= IN + HOLD;
      if (t >= IN && !swapped) { swapped = true; onSwap(); }

      // swirl void, visible once mostly covered
      const swirlAlpha = Math.max(0, Math.min(1, (cover - 0.55) / 0.45));
      for (const cl of cells) {
        const k = phaseOut ? 1 - cl.d : cl.d; // clear from the outside in on the way out
        const on = cover >= k;
        if (!on) continue;
        const local = Math.min(1, (cover - k) * 6);
        const size = cell * (0.35 + 0.65 * local);
        const off = (cell - size) / 2;
        ctx.fillStyle = cl.col;
        ctx.fillRect(cl.c * cell + off, cl.r * cell + off, size + 0.5, size + 0.5);
        if (cl.glint > 0.93) {
          ctx.fillStyle = cl.glint > 0.97 ? '#a17cff' : '#44e2c8';
          ctx.globalAlpha = 0.5 + 0.5 * Math.sin(now / 90 + cl.glint * 40);
          ctx.fillRect(cl.c * cell + cell / 2 - 2, cl.r * cell + cell / 2 - 2, 4, 4);
          ctx.globalAlpha = 1;
        }
      }
      if (swirlAlpha > 0) {
        ctx.globalAlpha = swirlAlpha * 0.85;
        const R = Math.max(W, H) * 0.6;
        const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, R);
        g.addColorStop(0, 'rgba(68,226,200,.45)');
        g.addColorStop(0.18, 'rgba(68,226,200,.28)');
        g.addColorStop(0.4, 'rgba(107,79,209,.35)');
        g.addColorStop(1, 'rgba(27,18,51,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = swirlAlpha;
        const spin = t / 700;
        for (const st of stars) {
          // three spiral arms, inner stars turn faster
          const a = st.arm * 2.094 + st.rad / 140 + spin * (1.6 - st.rad / Math.max(W, H)) + (st.a - Math.PI) * 0.18;
          const px = W / 2 + Math.cos(a) * st.rad;
          const py = H / 2 + Math.sin(a) * st.rad * 0.8;
          ctx.fillStyle = st.col;
          ctx.fillRect(Math.round(px / 2) * 2, Math.round(py / 2) * 2, st.s, st.s);
        }
        ctx.globalAlpha = 1;
      }

      if (t < IN + HOLD + OUT) requestAnimationFrame(frame);
      else {
        ctx.clearRect(0, 0, W, H);
        canvas.style.display = 'none';
        resolve();
      }
    };
    requestAnimationFrame(frame);
  });
}
