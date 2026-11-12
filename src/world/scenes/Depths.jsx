import { LAYERS, ROOTS } from '../data';
import strata from '../../assets/world/strata.webp';

export default function Depths() {
  return (
    <section className="slab-wrap depths">
      <header className="scene-head">
        <h1 className="h1">The depths</h1>
        <p className="lede">
          Everything I’ve been doing, newest at the top. The further you dig, the further back it
          goes, all the way down to where I started.
        </p>
      </header>

      <div className="dig">
        <div className="dig-art" aria-hidden="true">
          <img src={strata} alt="" />
        </div>
        <ol className="layers">
          {LAYERS.map((l) => (
            <li key={l.title} className={`layer layer--${l.layer}`}>
              <span className="layer-band" aria-hidden="true" />
              <div className="layer-body">
                <p className="layer-when">{l.when}</p>
                <h2 className="h3">{l.title}</h2>
                <p className="layer-org">{l.org}</p>
                <p>{l.body}</p>
              </div>
            </li>
          ))}
          <li className="layer layer--roots">
            <span className="layer-band" aria-hidden="true" />
            <div className="layer-body">
              <p className="layer-when">Where it started</p>
              <h2 className="h3">{ROOTS.title}</h2>
              <p>{ROOTS.body}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
