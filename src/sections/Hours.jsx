import Chapter from '../components/Chapter';
import { ART } from '../data/art';
import { HOURS } from '../data/content';

export default function Hours() {
  return (
    <Chapter id="hours" scene="foliage" art={ART.foliage} weather="leaves" focus="50% 60%" label="Experience">
      <div className="hours">
        <h2 className="display">Where the hours go.</h2>
        <ol className="road">
          {HOURS.map((h) => (
            <li key={h.title} className="stop">
              <span className="stop-when">{h.when}</span>
              <div className="stop-card">
                <h3>{h.title}</h3>
                <p className="stop-org">{h.org}</p>
                <p>{h.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Chapter>
  );
}
