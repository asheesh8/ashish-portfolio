import { LINKS } from '../data/links';
import './Hero.css';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-top reveal">
          <span className="chip chip--accent"><span className="pulse-dot" /> Open to freelance work</span>
          <span className="chip">Burlington, VT</span>
        </div>

        <h1 className="hero-name reveal reveal-delay-1">
          Ashish Subedi<a href="/admin" className="hero-admin-dot" aria-label="Admin">.</a>
        </h1>

        <p className="hero-lede reveal reveal-delay-2">
          Computer Science senior at Champlain College. I build full-stack apps and
          AI tools <em>that people actually use</em>, not just stare at in a demo.
        </p>

        <div className="hero-cta reveal reveal-delay-3">
          <a href={LINKS.email} className="btn-primary">Get in touch <span aria-hidden>→</span></a>
          <button className="btn-secondary" onClick={() => scrollTo('projects')}>See my work</button>
          <div className="hero-socials">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        <dl className="hero-meta reveal reveal-delay-4">
          <div><dt>Now</dt><dd>Building ClubCRM, my senior capstone</dd></div>
          <div><dt>School</dt><dd>Champlain College · CS, Class of 2027</dd></div>
          <div><dt>Focus</dt><dd>Full-stack · AI tooling · Security</dd></div>
          <div><dt>From</dt><dd>Goldhaap, Nepal → Vermont</dd></div>
        </dl>
      </div>
    </section>
  );
}
