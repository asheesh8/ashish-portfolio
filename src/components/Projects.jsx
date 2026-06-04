import { useReveal } from '../hooks/useReveal';
import Carousel from './Carousel';
import './Projects.css';

const toUrls = (mods) => Object.values(mods).map(m => m.default);

const HOMESHINE_IMGS = toUrls(import.meta.glob('../assets/projects/homeshine/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', { eager: true }));
const THEPIT_IMGS    = toUrls(import.meta.glob('../assets/projects/thepit/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',    { eager: true }));
const HARDWARE_IMGS  = toUrls(import.meta.glob('../assets/projects/hardware/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',  { eager: true }));
const BESTBUY_IMGS   = toUrls(import.meta.glob('../assets/projects/bestbuy/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',   { eager: true }));

const projects = [
  {
    id: 'homeshine',
    title: 'HomeSHINE™',
    status: 'Live',
    statusType: 'live',
    tagline: 'A full platform for a Vermont exterior-cleaning company. Built from zero.',
    body: [
      'They had paper, scattered notes, and a bunch of manual steps. I turned that into a field assessment app, automatic pricing, employee roles, and a Claude chatbot for client questions.',
      'It is live. People use it. It replaced the messy process. That is the whole point of building software.',
    ],
    stack: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Claude AI'],
    images: HOMESHINE_IMGS,
  },
  {
    id: 'thepit',
    title: 'ThePit',
    status: 'pittrader.vercel.app',
    statusHref: 'https://pittrader.vercel.app',
    statusType: 'link',
    tagline: 'A trading community for NQ futures traders. Built because I wanted it myself.',
    body: [
      'Most trading tools feel overpriced, boring, or useless. ThePit has journals, a public feed, profiles, and an AI Pit Boss that pulls your trade history and calls out bad decision-making.',
      'It is sharp, it is useful, and yeah, I use it too.',
    ],
    stack: ['React', 'Vite', 'Supabase', 'Anthropic API', 'PostgreSQL'],
    images: THEPIT_IMGS,
  },
  {
    id: 'bestbuy',
    title: 'Open Box',
    status: 'Internal',
    statusType: 'personal',
    tagline: 'BestBuy Connect sales tool for turning buried open-box inventory into actual revenue.',
    body: [
      'Open-box items are great deals for customers, but on the store side a lot of that inventory gets lost, piled away, or ignored because it is annoying to surface fast. That is missed revenue sitting in the building.',
      'Open Box uses the Best Buy API to pull that inventory into a cleaner sales flow, so floor staff can find open-box options, explain the deal, and move products that would otherwise sit around. Better for customers, better for revenue.',
    ],
    stack: ['Python', 'Anthropic API', 'React', 'Node.js'],
    images: BESTBUY_IMGS,
  },
  {
    id: 'hardware',
    title: 'Hardware',
    status: 'Personal',
    statusType: 'personal',
    tagline: 'Mura the tank-bot, a foil-pad controller, and a lot of trial and error.',
    body: [
      'When I am not writing web apps, I mess with hardware. Built Mura, a tank-bot on treads, and programmed it from scratch. Also made a custom foil-pad step controller, basically a DIY foot pedal.',
      'Arduino, breadboards, C++, broken wires, fixing it, breaking it again. Normal stuff.',
    ],
    stack: ['Arduino', 'C++', 'AVR Assembly'],
    images: HARDWARE_IMGS,
  },
];

export default function Projects() {
  const ref = useReveal(0.08);

  return (
    <section id="projects" ref={ref}>
      <div className="projects-wrapper">

        <div className="projects-header reveal">
          <span className="projects-eyebrow">// my work</span>
          <h2 className="projects-headline">
            Stuff I actually built.<br />
            <span className="projects-headline-sub">Not theory. Not mockups. Real things.</span>
          </h2>
        </div>

        <div className="projects-list">
          {projects.map((p, i) => (
            <article key={p.id} className={`project-card reveal reveal-delay-${i + 1}`}>

              {/* Image carousel */}
              <div className="project-media">
                <Carousel
                  images={p.images}
                  label={p.title}
                  className="project-carousel"
                  emptyHint={p.id === 'bestbuy' ? 'drop Open Box screenshots into src/assets/projects/bestbuy/' : undefined}
                />
              </div>

              {/* Copy */}
              <div className="project-copy">
                <div className="project-top">
                  <h3 className="project-title">{p.title}</h3>
                  <div className={`project-status project-status--${p.statusType}`}>
                    {p.statusHref ? (
                      <a href={p.statusHref} target="_blank" rel="noopener noreferrer">{p.status}</a>
                    ) : (
                      <span>{p.status}</span>
                    )}
                  </div>
                </div>
                <p className="project-tagline">{p.tagline}</p>

                <div className="project-body">
                  {p.body.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>

                <div className="project-footer">
                  <div className="project-stack">
                    {p.stack.map((t, k) => (
                      <span key={k} className="project-stack-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
