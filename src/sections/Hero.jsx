import Chapter from '../components/Chapter';
import Button from '../components/Button';
import { ART, LOOPS } from '../data/art';
import { LINKS } from '../data/content';

const NAME = ['Ashish', 'Subedi'];

export default function Hero() {
  return (
    <Chapter id="top" scene="lake" art={ART.lake} loop={LOOPS.lake} weather="glints" focus="38% 55%" eager label="Intro">
      <div className="hero">
        <p className="hero-where">
          <span className="hero-dot" aria-hidden="true" /> Based in Burlington, Vermont. Taking on new projects.
        </p>
        <h1 className="hero-name" aria-label="Ashish Subedi">
          {NAME.map((word, w) => (
            <span className="hero-word" key={word}>
              {[...word].map((ch, i) => (
                <span className="hero-ch" style={{ '--i': w * 6 + i }} key={i} aria-hidden="true">{ch}</span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-lede">
          I build websites, apps, and the tools behind them. CS senior at Champlain,
          co-founder of ArkiTech Solutions, and a funded futures trader when the market’s open.
        </p>
        <div className="hero-actions">
          <Button href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>
            See what I’ve built
          </Button>
          <Button href={LINKS.email} variant="birch">Email me</Button>
        </div>
      </div>
      <a className="hero-scroll" href="#roots" onClick={(e) => { e.preventDefault(); document.getElementById('roots')?.scrollIntoView({ behavior: 'smooth' }); }}>
        <span>Start the hike</span>
        <svg width="14" height="22" viewBox="0 0 14 22" aria-hidden="true"><path d="M7 1v19M1 14l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </a>
    </Chapter>
  );
}
