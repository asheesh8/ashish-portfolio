import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { navigate } from '../router';
import './BlogPostCar.css';

const TAGS = ['Three.js', 'WebGL', '3D', 'JavaScript', 'Portfolio'];

const CARS = {
  gt3rs: { label: '911 GT3 RS', file: 'gt3rs-configurator.html' },
  rs6:   { label: 'RS6 GT',     file: 'rs6gt-configurator.html' },
  c220:  { label: 'C220',       file: 'c220-configurator.html' },
};

export default function BlogPostCar() {
  const ref = useReveal(0.05);
  const [isOpen, setIsOpen] = useState(false);
  const [car, setCar] = useState('gt3rs');
  const [iframeLoaded, setIframeLoaded] = useState(true);

  const switchCar = (key) => {
    if (key === car) return;
    setCar(key);
    setIframeLoaded(false);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/blog');
    window.scrollTo(0, 0);
  };

  const handleHome = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <>
    <article id="blog-post-car" ref={ref}>
      <div className="post-wrapper">
        <a href="/blog" className="post-back reveal" onClick={handleBack}>
          ← blog
        </a>

        <header className="post-header">
          <div className="post-meta reveal reveal-delay-1">
            <time className="post-date">May 2, 2026</time>
            <div className="post-tags">
              {TAGS.map((t) => (
                <span key={t} className="post-tag">{t}</span>
              ))}
            </div>
          </div>
          <h1 className="post-title reveal reveal-delay-2">
            Building a 3D Car Configurator with Three.js
          </h1>
        </header>

        <div className="post-body reveal reveal-delay-3">

          {/* ── Thumbnail — no iframe until opened ── */}
          <div className="demo-widget">
            <div className="demo-switcher">
              {Object.entries(CARS).map(([key, c]) => (
                <button
                  key={key}
                  className={`demo-switcher-btn${car === key ? ' active' : ''}`}
                  onClick={() => switchCar(key)}
                  type="button"
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="demo-widget-bar">
              <button
                className="demo-dot demo-dot-red demo-dot-inert"
                title="Demo only runs fullscreen"
                type="button"
              />
              <button
                className="demo-dot demo-dot-yellow demo-dot-inert"
                title="Demo only runs fullscreen"
                type="button"
              />
              <button
                className="demo-dot demo-dot-green"
                onClick={() => setIsOpen(true)}
                title="Launch demo"
                aria-label="Launch demo"
                type="button"
              />
              <span className="demo-widget-title">{CARS[car].file}</span>
            </div>
            <button
              className="demo-widget-preview"
              onClick={() => setIsOpen(true)}
              aria-label={`Launch ${CARS[car].label} demo`}
              type="button"
            >
              <span className="demo-car-title">{CARS[car].label}</span>
              <span className="demo-launch-btn">▶ Launch Demo</span>
            </button>
          </div>

          <p>
            I've been building a lot of web apps lately — forms, dashboards, trading tools — and I
            noticed the portfolio was starting to look like just another list of CRUD apps. Fine for
            showing I can ship things, but it's not really proving <em>what</em> I know technically.
            So I built a 3D car configurator.
          </p>
          <p>
            The goal was something that makes someone stop scrolling and actually interact with it.
            Something that requires real WebGL knowledge, not just "I followed a tutorial and
            incremented some vertices."
          </p>

          <h2>What it is</h2>
          <p>
            Three cars, one configurator. Use the switcher at the top of the widget to toggle between them.
          </p>
          <p>
            <strong>Porsche 911 GT3 RS (992)</strong> — drag to rotate 360°, pick from 14 paint
            colors, click Interior and the camera lerps into the driver's seat.
          </p>
          <p>GT3 RS colors:</p>
          <ul>
            <li><strong>Standard (6):</strong> Lava Orange, Guards Red, Racing Yellow, Chalk, GT Silver, Jet Black</li>
            <li><strong>Paint to Sample (8):</strong> Lizard Green, Python Green, Frozen Blue, Riviera Blue, Ultraviolet, Indian Red, Pastel Yellow, Rubystar</li>
          </ul>
          <p>
            <strong>Audi RS6 GT Avant (2024)</strong> — same interaction model, 12 colors, interior
            view into the cabin.
          </p>
          <p>RS6 GT colors:</p>
          <ul>
            <li><strong>Standard (6):</strong> Daytona Gray, Sebring Black, Glacier White, Catalunya Red, Navarra Blue, Floret Silver</li>
            <li><strong>Rare (6):</strong> Nardo Gray, Goodwood Green, Kemora Gray, Merlin Purple, Vegas Yellow, Sonoma Green</li>
          </ul>
          <p>
            All three auto-spin when idle, pause on grab, scroll to zoom.
          </p>
          <p>
            <strong>Mercedes-Benz C220 W206</strong> is in the garage now too. It uses the same
            rotate, repaint, zoom, and interior-view interaction model, but with a cleaner executive
            sedan palette.
          </p>

          <h2>Why I built it</h2>
          <p>
            Wanted something that actually shows Three.js/WebGL skills in a way that's memorable,
            not a line in a skills section. A screenshot-level resume entry doesn't prove much. A
            live 3D model you can rotate and repaint does.
          </p>
          <p>
            Dream cars felt like the right subject — something personal enough that I'd put real
            time into getting it right. The GT3 RS specifically. Flat-six screaming to 9000rpm, rear
            wing that fills the entire back of the car, no turbos, just a track car that happens to
            be road legal. If you've seen one in person you understand.
          </p>
          <p>
            The RS6 GT is the other dream. V8 biturbo, wagon body, full carbon aero kit, one of
            only 660 ever made. Completely different energy from the GT3 RS — one is a track weapon,
            the other is a continent-crusher that happens to have a race-spec V8. Deserved its own
            configurator.
          </p>

          <h2>How it works</h2>

          <h3>The model</h3>
          <p>
            Downloaded a .glb file from Sketchfab — 2023 Porsche 911 GT3 RS 992. GLB is binary
            GLTF: geometry, materials, and textures bundled into one file. Used Three.js{' '}
            <code>GLTFLoader</code> to parse and load it into the scene.
          </p>

          <h3>Scene setup</h3>
          <p>
            The renderer gets <code>alpha: true</code> so the background is transparent. The
            portfolio's gradient shows through underneath — the car floats on the page instead of
            sitting inside a black box.
          </p>
          <pre className="code-block"><code>{`const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));`}</code></pre>

          <h3>Lighting</h3>
          <p>
            Cinematic four-point setup. Without good lighting a 3D model looks flat regardless of
            how detailed the mesh is — this is the part most people skip and it shows.
          </p>
          <ul>
            <li>Key light — warm, top-right, main illumination</li>
            <li>Fill light — cool, lower intensity, from the left, softens the shadows</li>
            <li>Rim light — from behind, separates the car from the background</li>
            <li>Under-glow — point light underneath, subtle garage floor reflection feel</li>
          </ul>

          <h3>Body panel detection</h3>
          <p>
            When the GLB loads I traverse every mesh to figure out which ones are the body panels
            to repaint, and which to leave alone (glass, rubber, chrome, badges).
          </p>
          <pre className="code-block"><code>{`model.traverse((node) => {
  if (!node.isMesh) return;
  const name = (node.name + ' ' + (node.material?.name || '')).toLowerCase();

  const isBody     = bodyKeywords.some(k => name.includes(k));
  const isExcluded = excludeKeywords.some(k => name.includes(k));

  // skip tiny geometry like badges — size check on bounding box
  const box  = new THREE.Box3().setFromObject(node);
  const size = box.getSize(new THREE.Vector3());
  const isTooSmall = size.x < 0.05 && size.y < 0.05 && size.z < 0.05;

  if (isBody && !isExcluded && !isTooSmall) {
    bodyMaterials.push(node.material);
  }
});`}</code></pre>
          <p>
            <strong>bodyKeywords:</strong>{' '}
            body, paint, fender, door, bumper, hood, trunk, roof, quarter, panel, shell, exterior, coat
          </p>
          <p>
            <strong>excludeKeywords:</strong>{' '}
            glass, window, windshield, rubber, tire, wheel, chrome, trim, badge, emblem, logo, light, lamp
          </p>

          <h3>Color swap</h3>
          <p>
            Once you have the list of body materials, repainting is just one line per material.{' '}
            <code>MeshStandardMaterial</code> reacts to color changes in real time — no shader
            recompilation, no texture swaps, nothing fancy.
          </p>
          <pre className="code-block"><code>{`function setColor(hexColor) {
  bodyMaterials.forEach(mat => mat.color.setHex(hexColor));
}`}</code></pre>

          <h3>Drag rotation with smooth lerp</h3>
          <p>
            The rotation uses a target value that the actual rotation lerps toward each frame. That
            0.08 factor is what makes it feel physical — the car follows your drag with a slight lag
            instead of snapping instantly.
          </p>
          <pre className="code-block"><code>{`let targetRotY = 0;
let rotY = 0;

// in the render loop:
rotY += (targetRotY - rotY) * 0.08;
model.rotation.y = rotY;`}</code></pre>
          <p>
            Too high and it snaps. Too low and it drags forever. 0.08 felt right for this model
            size.
          </p>

          <h3>Interior view</h3>
          <p>
            Clicking "Interior" lerps the camera to the driver's seat position. From there, drag
            moves the <code>lookAt</code> target instead of rotating the model — so you're looking
            around the cabin, not spinning the exterior.
          </p>
          <pre className="code-block"><code>{`camera.position.lerp(interiorCamPos, 0.05);
camera.lookAt(interiorLookAt);`}</code></pre>
          <p>Auto-spin pauses automatically when interior mode is active.</p>

          <h3>Scroll to zoom</h3>
          <pre className="code-block"><code>{`window.addEventListener('wheel', (e) => {
  targetZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, targetZoom + e.deltaY * 0.01));
});`}</code></pre>
          <p>
            <code>targetZoom</code> lerps to <code>camera.position.z</code> in the render loop,
            same pattern as the rotation.
          </p>

          <h2>What broke</h2>

          <h3>THREE is not defined</h3>
          <p>
            Spent longer on this than I want to admit. I was mixing ES module Three.js (
            <code>import * as THREE from 'three'</code>) with regular inline{' '}
            <code>&lt;script&gt;</code> tags. ES modules live in their own scope — so{' '}
            <code>THREE</code> isn't in the global scope that the other scripts see.
          </p>
          <p>
            Fix: use only old-style <code>&lt;script src="..."&gt;</code> tags, not modules.
            Everything shares window scope, no more reference errors.
          </p>

          <h3>Named a variable <code>top</code></h3>
          <pre className="code-block"><code>{`const top = new THREE.PointLight(0xffffff, 0.5); // instant crash`}</code></pre>
          <p>
            <code>top</code> is <code>window.top</code> — a read-only browser global referring to
            the top-level browsing context. You can't assign to it. The error is generic enough that
            it took me a minute to figure out what was happening. Renamed to{' '}
            <code>topLight</code>, fixed immediately.
          </p>

          <h3>Color swapping was painting the whole car</h3>
          <p>
            The initial version had no exclusion logic. It was painting glass panels, rubber seals,
            and badge backgrounds the body color too. Looked like someone dipped the whole car in
            paint. The exclusion keyword list plus the bounding box size check got the detection
            tight enough to only hit the actual painted surfaces.
          </p>

          <h2>What's next</h2>
          <p>
            The RS6 GT is already in — it's live in the configurator now with its own color palette
            and interior view. One thing that was different building it: the RS6 GT model had a
            material explicitly named <code>"body"</code>, so instead of keyword matching I could
            just target it by exact name. Cleaner and more precise than the GT3 RS approach.
          </p>
          <p>
            What's actually next: probably a proper garage scene — rough concrete floor, showroom
            lighting rig, something that makes it feel like you're standing in a space rather than
            floating in the portfolio gradient. Maybe a fourth car.
          </p>
        </div>

        <nav className="post-nav">
          <a href="/blog" onClick={handleBack}>← all posts</a>
          <a href="/" onClick={handleHome}>portfolio →</a>
        </nav>
      </div>
    </article>
    {isOpen && (
      <div
        className="demo-modal-backdrop"
        onClick={() => setIsOpen(false)}
      >
        <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
          <div className="demo-switcher demo-switcher-modal">
            {Object.entries(CARS).map(([key, c]) => (
              <button
                key={key}
                className={`demo-switcher-btn${car === key ? ' active' : ''}`}
                onClick={() => switchCar(key)}
                type="button"
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="demo-widget-bar">
            <button
              className="demo-dot demo-dot-red"
              onClick={() => setIsOpen(false)}
              title="Close"
              aria-label="Close demo"
              type="button"
            />
            <button
              className="demo-dot demo-dot-yellow demo-dot-inert"
              title="Demo only runs fullscreen"
              type="button"
            />
            <button
              className="demo-dot demo-dot-green demo-dot-inert"
              title="Currently fullscreen"
              type="button"
            />
            <span className="demo-widget-title">{CARS[car].file}</span>
            <button
              className="demo-widget-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close demo"
              type="button"
            >
              ✕
            </button>
          </div>
          <iframe
            src={`/${CARS[car].file}`}
            style={{ width: '100%', flex: 1, minHeight: 0, border: 'none', display: 'block', opacity: iframeLoaded ? 1 : 0.3, transition: 'opacity 0.2s ease' }}
            onLoad={() => setIframeLoaded(true)}
            title={`${CARS[car].label} 3D Configurator`}
          />
        </div>
      </div>
    )}
    </>
  );
}
