import { useReveal } from '../hooks/useReveal';
import Carousel from './Carousel';
import './Projects.css';

// ── Drop screenshots into each folder — they load automatically ──────────────
// HomeSHINE:   src/assets/projects/homeshine/
// ThePit:      src/assets/projects/thepit/
// Hardware:    src/assets/projects/hardware/

const toUrls = (mods) => Object.values(mods).map(m => m.default);

const HOMESHINE_IMGS = toUrls(import.meta.glob('../assets/projects/homeshine/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', { eager: true }));
const THEPIT_IMGS    = toUrls(import.meta.glob('../assets/projects/thepit/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',    { eager: true }));
const HARDWARE_IMGS  = toUrls(import.meta.glob('../assets/projects/hardware/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',  { eager: true }));

const projects = [
  {
    title: 'HomeSHINE™',
    desc: "A full platform I built for a Vermont exterior cleaning company — from the ground up. Field assessment app with 10 screens, a pricing engine that quotes jobs automatically, a Claude AI chatbot so clients aren't waiting on hold, and a full employee system with role-based access. It's live. It's being used. It replaced their entire paper process.",
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Claude AI'],
    live: null,
    featured: true,
    emoji: '🏔️',
    detail: 'React + Vite + Supabase',
    images: HOMESHINE_IMGS,
    folder: 'projects/homeshine',
  },
  {
    title: 'ThePit',
    desc: "I trade NQ futures. The tools out there are either overpriced or useless. So I built my own. ThePit is a trading community with journals, a public feed, user profiles, and an AI Pit Boss that pulls up your trade history and roasts your decision-making. It's sharp. Traders use it. I use it.",
    tags: ['React', 'Vite', 'Supabase', 'Anthropic API', 'PostgreSQL'],
    live: 'https://pittrader.vercel.app',
    featured: true,
    emoji: '📈',
    detail: 'React + Supabase + AI',
    images: THEPIT_IMGS,
    folder: 'projects/thepit',
  },
  {
    title: 'Hardware Projects',
    desc: "When I'm not writing web apps I'm messing with hardware. Built Mura — a tank-bot on treads, programmed from scratch. Also built a custom step controller using a foil pad system — basically a DIY foot pedal for inputs. Elegoo UNO R3, breadboards, a lot of trial and error. No tutorials. Just figured it out.",
    tags: ['Arduino', 'C++', 'AVR Assembly'],
    live: null,
    featured: false,
    emoji: '⚡',
    detail: 'Arduino · C++ · AVR Assembly',
    images: HARDWARE_IMGS,
    folder: 'projects/hardware',
    badge: 'Personal Project',
  },
];

export default function Projects() {
  const ref = useReveal(0.1);

  return (
    <section id="projects" ref={ref}>
      <div className="section-wrapper">
        <span className="section-label reveal">// my work</span>
        <h2 className="section-title reveal reveal-delay-1">Projects</h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Stuff I actually built. For real people. That's actually being used.
        </p>

        <div className="projects-list">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`project-card reveal reveal-delay-${i + 1}${p.featured ? ' featured' : ''}`}
            >
              {/* Screenshot carousel — drop images into src/assets/{folder}/ */}
              <Carousel
                images={p.images}
                label={p.title}
                className="project-carousel"
              />

              <div className="project-bottom">
                <div className="project-left">
                  <div className="project-emoji-wrap">
                    <span className="project-emoji">{p.emoji}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-header">
                      <h3 className="project-title">{p.title}</h3>
                      {p.featured && <span className="badge">Featured</span>}
                      {p.badge && <span className="badge badge-personal">{p.badge}</span>}
                      <span className="project-detail-tag">{p.detail}</span>
                    </div>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-tags">
                      {p.tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-links">
                  {p.live ? (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      Live &rarr;
                    </a>
                  ) : (
                    <span className="project-link-private">
                      {p.badge ? 'Personal' : 'Private'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
