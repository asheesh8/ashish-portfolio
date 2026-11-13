import Chapter from '../components/Chapter';
import { ART } from '../data/art';
import sunset from '../assets/me/IMG_3752.webp';

const FACTS = [
  ['From', 'Goldhaap, Nepal'],
  ['Came to the US', 'At 5'],
  ['Home now', 'Burlington, VT'],
  ['Studying', 'CS & Innovation, minors in Math and Cybersecurity'],
  ['Off the clock', 'NQ futures, cars, hardware'],
];

export default function Roots() {
  return (
    <Chapter id="roots" scene="roots" art={ART.roots} weather="dust" focus="50% 60%" label="About">
      <div className="roots">
        <article className="letter">
          <h2 className="letter-title">Started in a camp in Goldhaap. Ended up on Lake Champlain.</h2>
          <p>
            I grew up in a small camp in Goldhaap, Nepal. The first place I remember living burned
            down completely, and my family had to rebuild from nothing. We came to the U.S. when I was 5.
            My parents gave up a lot so I could get a shot somewhere else, and I think about that every day.
            That’s why I take the work seriously.
          </p>
          <p>
            Now I’m a senior at Champlain, I run a web studio, I trade NQ futures on a funded account,
            and I still work the floor at Best Buy. I build for people who need things done. Not fake startups,
            not another landing page nobody visits. Stuff where the results prove why it needed to exist.
          </p>
          <p>
            If you work with me, you get me. No agency chain, no random handoff. If something breaks, I fix it.
            If your idea is bad, I’ll tell you before you spend money on it.
          </p>
          <p className="letter-sign">Ashish</p>
          <dl className="letter-facts">
            {FACTS.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </article>
        <figure className="polaroid">
          <img src={sunset} alt="Ashish smiling on the shore of Lake Champlain at sunset" loading="lazy" />
          <figcaption>Lake Champlain, right after sunset</figcaption>
        </figure>
      </div>
    </Chapter>
  );
}
