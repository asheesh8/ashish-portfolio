import { useReveal } from '../hooks/useReveal';
import './Contact.css';

export default function Contact() {
  const ref = useReveal(0.1);

  return (
    <section id="contact" ref={ref}>
      <div className="contact-wrapper">
        <div className="contact-grid">

          <div className="contact-left">
            <div className="contact-eyebrow reveal">Available for freelance</div>
            <h2 className="contact-headline reveal reveal-delay-1">
              Got an idea?<br />
              <span className="contact-build">Let's make it real.</span>
            </h2>
            <div className="contact-actions reveal reveal-delay-2">
              <a href="mailto:subediashish31@gmail.com" className="btn-primary">
                subediashish31@gmail.com →
              </a>
              <span className="contact-meta">Burlington, VT · I reply fast when the idea is real</span>
            </div>
          </div>

          <div className="contact-right reveal reveal-delay-2">
            <div className="contact-colophon">
              <div style={{fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--cyan)',marginBottom:'8px'}}>a. subedi</div>
              <div>One person. No agency theater.</div>
              <div>Built in Vermont. Shipped wherever.</div>
              <div>Direct work. Direct answers.</div>
              <div style={{marginTop:'16px',paddingTop:'16px',borderTop:'1px solid var(--border)',display:'flex',gap:'16px',flexWrap:'wrap'}}>
                <a
                  href="https://github.com/asheesh8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{fontFamily:'var(--font-mono)',fontSize:'0.68rem',color:'var(--fg-muted)',letterSpacing:'0.06em'}}
                >github →</a>
                <a
                  href="https://pittrader.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{fontFamily:'var(--font-mono)',fontSize:'0.68rem',color:'var(--fg-muted)',letterSpacing:'0.06em'}}
                >thepit →</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
