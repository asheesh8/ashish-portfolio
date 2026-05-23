import { useReveal } from '../hooks/useReveal';
import './Contact.css';

function RegMark({ size = 28, color = 'var(--warm)' }) {
  return (
    <svg viewBox="0 0 32 32" style={{ width: size, height: size, display: 'block' }}>
      <circle cx="16" cy="16" r="13" fill="none" stroke={color} strokeWidth="1.2" />
      <line x1="16" y1="0" x2="16" y2="32" stroke={color} strokeWidth="1.2" />
      <line x1="0" y1="16" x2="32" y2="16" stroke={color} strokeWidth="1.2" />
      <circle cx="16" cy="16" r="3" fill={color} />
    </svg>
  );
}

export default function Contact() {
  const ref = useReveal(0.1);

  return (
    <section id="contact" ref={ref}>
      <div className="contact-wrapper">
        <div className="contact-grid">

          {/* Left: CTA */}
          <div className="contact-left">
            <div className="contact-eyebrow reveal">Available for freelance</div>
            <h2 className="contact-headline reveal reveal-delay-1">
              Got an idea?<br />
              <span className="contact-build">Let's make it real.</span>
            </h2>
            <div className="contact-actions reveal reveal-delay-2">
              <a href="mailto:subediashish31@gmail.com" className="btn-primary">
                subediashish31@gmail.com
              </a>
              <span className="contact-meta">Burlington, VT · I reply fast when the idea is real</span>
            </div>
          </div>

          {/* Right: Colophon */}
          <div className="contact-right reveal reveal-delay-2">
            <RegMark />
            <div className="contact-colophon">
              <div>A. Subedi — one person, no agency theater.</div>
              <div>Built in Vermont. Shipped wherever.</div>
              <div>© 2026 — direct work, direct answers.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-rule-wrap">
        <div className="print-rule" />
      </div>
    </section>
  );
}
