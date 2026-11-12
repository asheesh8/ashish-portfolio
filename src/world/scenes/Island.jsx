import { Btn } from '../ui';
import { LINKS } from '../data';
import me1 from '../../assets/me/IMG_3752.webp';
import me2 from '../../assets/vermont/IMG_3416.webp';
import me3 from '../../assets/a4/IMG_4045.webp';

const FACTS = [
  ['From', 'Goldhaap, Nepal'],
  ['Lives in', 'Burlington, Vermont'],
  ['Studying', 'Computer Science & Innovation, Champlain College'],
  ['Minors', 'Mathematics and Cybersecurity'],
  ['Also', 'Funded NQ futures trader'],
];

export default function Island({ go }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-where">Burlington, Vermont</p>
          <h1 className="hero-name">Ashish<br />Subedi</h1>
          <p className="hero-lede">
            I build websites and apps for real businesses and real people. CS senior at Champlain,
            funded futures trader, and the one guy behind Arkitech Solutions.
          </p>
          <div className="hero-cta">
            <Btn href={LINKS.email}>Start a project</Btn>
            <Btn as="button" tone="portal" onClick={(e) => go('workshop', e)}>See what I’ve built</Btn>
          </div>
          <p className="hero-hint">
            This site is a little world.{' '}
            <span className="hint-keys">Use the bar at the bottom, or press <kbd>1</kbd>–<kbd>5</kbd>, to step through a portal.</span>
            <span className="hint-touch">Tap the bar at the bottom to step through a portal.</span>
          </p>
        </div>
      </section>

      <section className="slab-wrap about">
        <div className="slab about-slab">
          <div className="about-copy">
            <h2 className="h2">Hey, I’m Ashish.</h2>
            <p>
              I came to the U.S. from Nepal when I was 5. My parents gave up a lot for that, and I don’t
              take it for granted. Now I’m a senior at Champlain studying CS, working at Best Buy, trading
              NQ futures on a funded account, and building software for people who need stuff done.
            </p>
            <p>
              Not fake startups. Not another pretty landing page that does nothing. Actual tools, where
              the results prove why it needed to exist.
            </p>
            <p>
              If you work with me, you get me. No agency chain, no random handoff. If something breaks,
              I fix it. If your idea is bad, I’ll tell you before you spend money on it.
            </p>
            <dl className="facts">
              {FACTS.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="frames">
            <figure className="frame frame--a"><img src={me1} alt="Me, at the lake at sunset" loading="lazy" /></figure>
            <figure className="frame frame--b"><img src={me2} alt="The lake shore near home" loading="lazy" /></figure>
            <figure className="frame frame--c"><img src={me3} alt="A fall drive in Vermont" loading="lazy" /></figure>
          </div>
        </div>

        <div className="doors">
          <button className="door" onClick={(e) => go('workshop', e)}>
            <b>The workshop</b><span>Client sites, apps, and the stuff I build for myself</span>
          </button>
          <button className="door" onClick={(e) => go('library', e)}>
            <b>The library</b><span>The classes that actually changed how I think</span>
          </button>
          <button className="door" onClick={(e) => go('depths', e)}>
            <b>The depths</b><span>Jobs, trading, and where I come from</span>
          </button>
        </div>
      </section>
    </>
  );
}
