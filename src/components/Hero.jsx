import './Hero.css';

function PrintRule({ thick = false }) {
  return <div className={`print-rule${thick ? ' print-rule--thick' : ''}`} />;
}

function DoubleRule() {
  return (
    <div>
      <div className="double-rule__top" />
      <div className="double-rule__gap" />
      <div className="double-rule__bottom" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="hero-section">

      {/* Masthead bar */}
      <div className="masthead-bar reveal">
        <span className="masthead-loc">🇳🇵 Goldhaap, NP</span>
        <span className="masthead-title">Full-Stack Developer &amp; Freelancer</span>
        <span className="masthead-loc">📍 Burlington, VT</span>
      </div>
      <div className="hero-rule"><PrintRule /></div>

      {/* Hero content */}
      <div className="hero-inner">

        {/* Eyebrow */}
        <div className="hero-eyebrow-row reveal reveal-delay-1">
          <span className="hero-eyebrow-text">Available for freelance</span>
        </div>

        {/* Two-line off-register wordmark */}
        <div className="hero-wordmark-wrap reveal reveal-delay-2">
          <h1 className="hero-wordmark hero-wordmark--shadow" aria-hidden="true">
            ASHISH<br />SUBEDI
          </h1>
          <h1 className="hero-wordmark hero-wordmark--ink">
            ASHISH<br />SUBEDI<a href="/admin" className="hero-admin-dot" title="Admin" aria-label="Admin">.</a>
          </h1>
        </div>

        {/* Three-column sub-row */}
        <div className="hero-sub-row reveal reveal-delay-3">
          <p className="hero-tagline">
            I build full-stack apps —<br />
            the kind people actually use,<br />
            not just stare at in a demo.
          </p>
          <div className="hero-hairline-divider" />
          <div className="hero-colophon">
            <div className="hero-colophon-label">About</div>
            <div>Champlain College · Class of 2027</div>
            <div>B.S. Computer Science &amp; Innovation</div>
            <div>Minors: Mathematics &amp; Cybersecurity</div>
            <div style={{ marginTop: 10 }}>Goldhaap, Nepal → Burlington, VT</div>
          </div>
        </div>

      </div>

    </section>
  );
}
