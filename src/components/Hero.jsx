import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <p className="hero-eyebrow reveal">
          <span className="hero-dot" />
          Available for freelance work
        </p>

        <h1 className="hero-title reveal reveal-delay-1">
          I'm <span className="hero-name">Ashish<a href="/admin" className="hero-admin-i" title="Admin">.</a></span><br />
          <span className="hero-gradient-text">I build things that work.</span>
        </h1>

        <p className="hero-tagline reveal reveal-delay-2">
          <span className="mono-tag">// From a village in Nepal. Built in Vermont. Shipping code.</span>
        </p>

        <p className="hero-desc reveal reveal-delay-2">
          CS student, NQ futures trader, freelance dev.
          No agency. No middleman. Just me — and I finish what I start.
        </p>

        <div className="hero-cta reveal reveal-delay-3">
          <a
            className="btn-primary"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See What I've Built
          </a>
          <a
            className="btn-secondary"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Work Together
          </a>
        </div>
      </div>
    </section>
  );
}
