import { navigate } from '../../router';
import { Btn, Ext } from '../ui';
import { FEATURED, STUDIO, OWN, HARDWARE, ALSO, TOOLS } from '../data';

const openPost = (slug) => { navigate(`/blog/${slug}`); window.scrollTo(0, 0); };

export default function Workshop() {
  return (
    <section className="slab-wrap shop">
      <header className="scene-head">
        <h1 className="h1">The workshop</h1>
        <p className="lede">
          Stuff I’ve actually built and shipped. Some of it’s for clients, some is for causes I care
          about, and some I built because I wanted it to exist.
        </p>
      </header>

      <div className="featured">
        {FEATURED.map((p) => (
          <article className="work slab" key={p.id}>
            <a className="work-shot" href={p.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
              <img src={p.shot} alt="" loading="lazy" />
            </a>
            <div className="work-copy">
              <p className="work-kind">{p.kind}</p>
              <h2 className="h2">{p.title}</h2>
              <p>{p.body}</p>
              {p.facts && (
                <ul className="work-facts">{p.facts.map((f) => <li key={f}>{f}</li>)}</ul>
              )}
              <div className="work-foot">
                <Ext href={p.href}>{p.linkText}</Ext>
                <span className="stack">{p.stack.join(', ')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <article className="studio slab">
        <div className="studio-head">
          <div>
            <p className="work-kind">My studio</p>
            <h2 className="h2">{STUDIO.title}</h2>
            <p>{STUDIO.body}</p>
            <Btn href={STUDIO.href} target="_blank" rel="noopener noreferrer">Visit Arkitech Solutions</Btn>
          </div>
          <div className="studio-count">
            <b>{STUDIO.count}</b>
            <span>clients so far</span>
          </div>
        </div>
        <div className="item-frames">
          {STUDIO.clients.map((c) => (
            <a className="item" key={c.name} href={c.href} target="_blank" rel="noopener noreferrer">
              <span className="item-img"><img src={c.shot} alt="" loading="lazy" /></span>
              <b>{c.name}</b>
              <span>{c.where}</span>
            </a>
          ))}
        </div>
        <p className="studio-more">
          Also: {STUDIO.more.join(', ')}. See all of it at <Ext href={STUDIO.href}>arkitech-sol.com</Ext>
        </p>
        <div className="saas">
          <div>
            <h3 className="h3">{STUDIO.saas.title}</h3>
            <p>{STUDIO.saas.body}</p>
          </div>
          <Ext href={STUDIO.saas.href}>{STUDIO.saas.linkText}</Ext>
        </div>
      </article>

      <h2 className="h2 sub">Built for me</h2>
      <div className="own">
        {OWN.map((p) => (
          <article className="mini slab" key={p.title}>
            <span className="mini-img"><img src={p.shot} alt="" loading="lazy" /></span>
            <p className="work-kind">{p.kind}</p>
            <h3 className="h3">{p.title}</h3>
            <p>{p.body}</p>
            <div className="work-foot">
              {p.href && <Ext href={p.href}>Open it</Ext>}
              {p.blog && <button className="ext" onClick={() => openPost(p.blog)}>Read the write-up</button>}
              <span className="stack">{p.stack.join(', ')}</span>
            </div>
          </article>
        ))}
      </div>

      <section className="bench slab" aria-labelledby="bench-title">
        <div className="bench-head">
          <p className="work-kind">Personal builds</p>
          <h2 className="h2" id="bench-title">On the bench</h2>
          <p>{HARDWARE.body}</p>
        </div>
        <div className="bench-builds">
          {HARDWARE.builds.map((b) => (
            <figure className="bench-build" key={b.title}>
              <span className="frame bench-frame"><img src={b.shot} alt={`${b.title}, ${b.kind.toLowerCase()}`} loading="lazy" /></span>
              <figcaption>
                <p className="work-kind">{b.kind}</p>
                <h3 className="h3">{b.title}</h3>
                <p>{b.body}</p>
                <span className="stack">{b.stack.join(', ')}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="also">
        {ALSO.map((p) => (
          <div className="also-row" key={p.title}>
            <b>{p.title}</b>
            <span className="work-kind">{p.kind}</span>
            <span>{p.body}</span>
            {p.blog && <button className="ext" onClick={() => openPost(p.blog)}>Write-up</button>}
          </div>
        ))}
      </div>

      <div className="tools slab">
        <h2 className="h3">What I build with</h2>
        <div className="tools-grid">
          {TOOLS.map(([label, list]) => (
            <div key={label}>
              <b>{label}</b>
              <p>{list.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
