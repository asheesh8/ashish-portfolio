import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">

        <div className="hero-status reveal">
          <span className="hero-status-dot" />
          Available for freelance
        </div>

        <h1 className="hero-name reveal reveal-delay-1">
          <span className="hero-name-line">ASHISH</span>
          <span className="hero-name-line hero-name-line--glow">SUBEDI</span>
        </h1>

        <div className="hero-tagline-row reveal reveal-delay-2">
          <p className="hero-tagline">
            I build full-stack apps —<br />
            the kind people actually use,<br />
            not just stare at in a demo.
          </p>
          <div className="hero-divider-v" />
          <div className="hero-meta">
            <div className="hero-meta-item">location <span>Burlington, VT</span></div>
            <div className="hero-meta-item">origin <span>🇳🇵 Goldhaap, Nepal</span></div>
            <div className="hero-meta-item">school <span>Champlain College · CS 2027</span></div>
            <div className="hero-meta-item">focus <span>Full-Stack · AI · Hardware</span></div>
          </div>
        </div>

        <div className="hero-cta reveal reveal-delay-3">
          <a href="mailto:subediashish31@gmail.com" className="btn-primary">
            Get in touch →
          </a>
          <button
            className="btn-secondary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See my work
          </button>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
