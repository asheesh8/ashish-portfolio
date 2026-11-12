import Chapter from '../components/Chapter';
import { ART } from '../data/art';
import { COURSES } from '../data/content';

export default function School() {
  return (
    <Chapter id="school" scene="campus" art={ART.campus} weather="snow" focus="55% 50%" label="School">
      <div className="school">
        <header className="school-head">
          <h2 className="display">Champlain College, on the hill.</h2>
          <p>
            B.S. in Computer Science & Innovation, class of 2027, with minors in Mathematics and Cybersecurity.
            Thirty-something courses on my transcript. These are the ones that actually changed how I build.
          </p>
        </header>
        <ul className="cards">
          {COURSES.map((c, i) => (
            <li key={c.code} className="card" style={{ '--tilt': `${((i * 7) % 5) - 2}deg` }}>
              <span className="card-code">{c.code}</span>
              <h3>{c.name}</h3>
              <p>{c.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  );
}
