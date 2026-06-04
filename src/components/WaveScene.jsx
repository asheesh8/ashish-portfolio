import { useEffect, useRef } from 'react';
import './WaveScene.css';

// Each wave spins around canvas center at its own rate + oscillates sideways
const DARK_WAVES = [
  { amp: 100, freq: 0.0011, speed: 0.00024, phase: 0,    rotSpeed:  0.00028, color: [0, 212, 255],  alpha: 0.60, width: 1.6 },
  { amp: 65,  freq: 0.0017, speed: 0.00033, phase: 1.3,  rotSpeed: -0.00041, color: [124, 77, 255], alpha: 0.45, width: 1.2 },
  { amp: 130, freq: 0.0008, speed: 0.00016, phase: 2.7,  rotSpeed:  0.00015, color: [0, 212, 255],  alpha: 0.20, width: 2.8 },
  { amp: 50,  freq: 0.0024, speed: 0.00045, phase: 4.1,  rotSpeed: -0.00062, color: [255, 77, 141], alpha: 0.28, width: 1.0 },
  { amp: 80,  freq: 0.0013, speed: 0.00020, phase: 5.5,  rotSpeed:  0.00035, color: [124, 77, 255], alpha: 0.32, width: 1.8 },
  { amp: 35,  freq: 0.0031, speed: 0.00058, phase: 0.6,  rotSpeed: -0.00018, color: [0, 212, 255],  alpha: 0.15, width: 0.8 },
  { amp: 90,  freq: 0.0009, speed: 0.00012, phase: 3.3,  rotSpeed:  0.00050, color: [255, 77, 141], alpha: 0.18, width: 1.4 },
];

const LIGHT_WAVES = [
  { amp: 90,  freq: 0.0011, speed: 0.00024, phase: 0,    rotSpeed:  0.00028, color: [0, 140, 210],  alpha: 0.30, width: 1.6 },
  { amp: 55,  freq: 0.0017, speed: 0.00033, phase: 1.3,  rotSpeed: -0.00041, color: [96, 48, 224],  alpha: 0.20, width: 1.2 },
  { amp: 115, freq: 0.0008, speed: 0.00016, phase: 2.7,  rotSpeed:  0.00015, color: [0, 140, 210],  alpha: 0.10, width: 2.8 },
  { amp: 42,  freq: 0.0024, speed: 0.00045, phase: 4.1,  rotSpeed: -0.00062, color: [224, 48, 90],  alpha: 0.12, width: 1.0 },
  { amp: 70,  freq: 0.0013, speed: 0.00020, phase: 5.5,  rotSpeed:  0.00035, color: [96, 48, 224],  alpha: 0.15, width: 1.8 },
  { amp: 30,  freq: 0.0031, speed: 0.00058, phase: 0.6,  rotSpeed: -0.00018, color: [0, 140, 210],  alpha: 0.08, width: 0.8 },
  { amp: 80,  freq: 0.0009, speed: 0.00012, phase: 3.3,  rotSpeed:  0.00050, color: [224, 48, 90],  alpha: 0.09, width: 1.4 },
];

function drawGrid(ctx, W, H, dark) {
  ctx.strokeStyle = dark ? 'rgba(255,255,255,0.016)' : 'rgba(0,0,0,0.035)';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  const step = 80;
  for (let x = 0; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for (let y = 0; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();
}

function drawWave(ctx, W, H, wave, t) {
  const cx = W / 2;
  const cy = H / 2;
  const [r, g, b] = wave.color;

  ctx.save();

  // Rotate each wave individually around canvas center
  ctx.translate(cx, cy);
  ctx.rotate(wave.rotSpeed * t + wave.phase * 0.15);
  ctx.translate(-cx, -cy);

  ctx.shadowBlur = 20;
  ctx.shadowColor = `rgba(${r},${g},${b},0.55)`;
  ctx.strokeStyle = `rgba(${r},${g},${b},${wave.alpha})`;
  ctx.lineWidth = wave.width;

  // Draw wave wider than canvas so it looks full through any rotation
  const margin = Math.max(W, H);
  ctx.beginPath();
  for (let x = -margin; x <= W + margin; x += 3) {
    const y = cy
      + Math.sin(x * wave.freq + t * wave.speed) * wave.amp
      + Math.sin(x * wave.freq * 1.8 + t * wave.speed * 0.75 + 1.2) * (wave.amp * 0.28);
    x === -margin ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();
}

export default function WaveScene() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0, W, H;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function frame() {
      t++;
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      const waves = dark ? DARK_WAVES : LIGHT_WAVES;
      const bg    = dark ? '#04040a'  : '#f4f5fa';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      drawGrid(ctx, W, H, dark);

      for (const wave of waves) drawWave(ctx, W, H, wave, t);

      // Soft radial glow at center
      const grd = ctx.createRadialGradient(W / 2, H * 0.5, 0, W / 2, H * 0.5, W * 0.5);
      grd.addColorStop(0, dark ? 'rgba(0,212,255,0.03)' : 'rgba(0,140,210,0.04)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="wave-scene" aria-hidden="true" />;
}
