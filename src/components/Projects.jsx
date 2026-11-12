import { useReveal } from '../hooks/useReveal';
import { navigate } from '../router';
import { LINKS } from '../data/links';
import Carousel from './Carousel';
import './Projects.css';

const toUrls = (mods) => Object.values(mods).map(m => m.default);
const IMGS = {
  homeshine: toUrls(import.meta.glob('../assets/projects/homeshine/*.{jpg,jpeg,png,webp}', { eager: true })),
  thepit:    toUrls(import.meta.glob('../assets/projects/thepit/*.{jpg,jpeg,png,webp}',    { eager: true })),
  bestbuy:   toUrls(import.meta.glob('../assets/projects/bestbuy/*.{jpg,jpeg,png,webp}',   { eager: true })),
  hardware:  toUrls(import.meta.glob('../assets/projects/hardware/*.{jpg,jpeg,png,webp}',  { eager: true })),
};

const FEATURED = [
  {
    id: 'homeshine',
    title: 'HomeSHINE™',
    kind: 'Client platform',
    status: 'Live',
    tagline: 'A full platform for a Vermont exterior-cleaning company. Built from zero.',
    body: 'They had paper, scattered notes and a pile of manual steps. I turned that into a field assessment app, automatic pricing, employee roles and a Claude chatbot that answers client quote questions around the clock. It replaced the messy process. That is the whole point of building software.',
    stack: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Claude API'],
  },
  {
    id: 'thepit',
    title: 'ThePit',
    kind: 'Trading community',
    status: 'pittrader.vercel.app',
    href: LINKS.thepit,
    tagline: 'A community for NQ futures traders. Built because I wanted it myself.',
    body: 'Journals, a public feed, profiles, and an AI Pit Boss that pulls your full trade history and calls out bad decision-making. Sharp, useful, and yes, I use it too.',
    stack: ['React', 'Vite', 'Supabase', 'Anthropic API', 'PostgreSQL'],
  },
  {
    id: 'bestbuy',
    title: 'Open Box',
    kind: 'Retail sales tool',
    status: 'Internal',
    blog: 'open-box-bestbuy-connect',
    tagline: 'Turns buried open-box inventory into actual revenue.',
    body: 'Open-box items are great deals, but on the store side they get lost or ignored because they are annoying to surface fast. Open Box uses the Best Buy API to pull that inventory into a clean sales flow, with an AI advisor that helps floor staff explain the deal.',
    stack: ['Python', 'Anthropic API', 'React', 'Node.js'],
  },
  {
    id: 'hardware',
    title: 'Hardware',
    kind: 'Personal builds',
    status: 'Personal',
    tagline: 'Mura the tank-bot, a foil-pad controller, and a lot of trial and error.',
    body: 'Built Mura, a tank-bot on treads, and programmed it from scratch. Also made a custom foil-pad step controller, basically a DIY foot pedal. Arduino, breadboards, C++, broken wires, fixing it, breaking it again.',
    stack: ['Arduino', 'C++', 'AVR Assembly'],
  },
];

const MORE = [
  {
    title: 'ClubCRM',
    kind: 'Senior capstone · in progress',
    body: 'A club management platform any school can brand as its own, with school sign-in like Canvas and FERPA-aware data handling. Built with Michael Olave and Noah Sheppard.',
    stack: ['Python', 'OAuth / SSO', 'Multi-tenant'],
  },
  {
    title: '3D Car Configurator',
    kind: 'WebGL experiment',
    body: 'Interactive Three.js configurator with a Porsche 911 GT3 RS and an Audi RS6 GT: drag to rotate, zoom, and step inside for interior views.',
    stack: ['Three.js', 'WebGL', 'JavaScript'],
    blog: '3d-car-configurator',
  },
  {
    title: 'Price Tracker',
    kind: 'Side project',
    body: 'A multi-retailer price tracking app that watches products across stores so you can buy at the right moment.',
    stack: ['Go', 'React'],
  },
];

const openPost = (slug) => { navigate(`/blog/${slug}`); window.scrollTo(0, 0); };

export default function Projects() {
  const ref = useReveal(0.06);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="section-inner">
        <div className="section-head">
          <div className="section-index reveal"><b>03</b> / Work</div>
          <div>
            <h2 className="section-title reveal reveal-delay-1">
              Stuff I actually built.<br /><em>Not theory. Not mockups.</em>
            </h2>
          </div>
        </div>

        <div className="proj-featured">
          {FEATURED.map((p, i) => (
            <article key={p.id} className="proj-card reveal">
              <div className="proj-media">
                <Carousel images={IMGS[p.id]} label={p.title} className="proj-carousel" />
              </div>
              <div className="proj-copy">
                <div className="proj-meta">
                  <span className="proj-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{p.kind}</span>
                  {p.href
                    ? <a className="chip chip--accent" href={p.href} target="_blank" rel="noopener noreferrer">{p.status} ↗</a>
                    : <span className={`chip${p.status === 'Live' ? ' chip--accent' : ''}`}>{p.status}</span>}
                </div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-tagline">{p.tagline}</p>
                <p className="proj-body">{p.body}</p>
                <div className="proj-stack">
                  {p.stack.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
                {p.blog && (
                  <button className="proj-link" onClick={() => openPost(p.blog)}>Read the write-up →</button>
                )}
              </div>
            </article>
          ))}
        </div>

        <h3 className="proj-more-head reveal">Also building</h3>
        <div className="proj-more">
          {MORE.map((p, i) => (
            <article key={p.title} className={`proj-mini reveal reveal-delay-${i + 1}`}>
              <span className="proj-mini-kind">{p.kind}</span>
              <h4 className="proj-mini-title">{p.title}</h4>
              <p className="proj-mini-body">{p.body}</p>
              <div className="proj-stack">
                {p.stack.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
              {p.blog && (
                <button className="proj-link" onClick={() => openPost(p.blog)}>Read the write-up →</button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
