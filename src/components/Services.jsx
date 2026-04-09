import { useReveal } from '../hooks/useReveal';
import './Services.css';

const services = [
  {
    icon: '⚡',
    title: 'Frontend Development',
    desc: "React apps that load fast and work on every screen. I write the code myself — no drag-and-drop builders, no bloated themes.",
  },
  {
    icon: '🔧',
    title: 'Backend & APIs',
    desc: "Supabase, Go, Node.js, Postgres. I use whatever actually fits your project, not whatever I'm comfortable with.",
  },
  {
    icon: '🎨',
    title: 'UI Design → Code',
    desc: "I'll design it and build it. Clean, simple, functional. Nothing that looks good in Figma but falls apart in the browser.",
  },
  {
    icon: '🚀',
    title: 'Full-Stack Builds',
    desc: "Got an idea and need the whole thing built? That's my wheelhouse. Front to back, designed, deployed, and working.",
  },
  {
    icon: '🔍',
    title: 'Speed & SEO',
    desc: "Slow sites lose customers. I optimize load times, fix Core Web Vitals, and make sure Google can actually find you.",
  },
  {
    icon: '🛠️',
    title: 'Maintenance & Fixes',
    desc: "I don't disappear after launch. Something breaks, I fix it. Want a new feature? I'm still here. Retainers available.",
  },
];

const delays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4', 'reveal-delay-5'];

export default function Services() {
  const ref = useReveal(0.1);

  return (
    <section id="services" ref={ref}>
      <div className="section-wrapper">
        <div className="services-header">
          <span className="section-label reveal">// what I do</span>
          <h2 className="section-title reveal reveal-delay-1">Services</h2>
          <p className="section-subtitle reveal reveal-delay-2">
            Real work, done right. I don't subcontract, I don't use templates, and I don't overpromise.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={s.title} className={`service-card reveal ${delays[i % 6]}`}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
