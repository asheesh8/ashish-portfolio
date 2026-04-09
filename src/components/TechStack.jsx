import { useReveal } from '../hooks/useReveal';
import './TechStack.css';

const categories = [
  {
    label: 'Frontend',
    items: ['React', 'Vite', 'TypeScript', 'CSS / Sass', 'TailwindCSS'],
  },
  {
    label: 'Backend & DB',
    items: ['Go', 'Node.js', 'Supabase', 'PostgreSQL', 'SQLite'],
  },
  {
    label: 'Languages',
    items: ['JavaScript', 'Python', 'Rust', 'Go', 'Pine Script'],
  },
  {
    label: 'Tools & Infra',
    items: ['Git / GitHub', 'Docker', 'Vercel', 'Arduino', 'Figma'],
  },
];

const marqueeItems = [
  'React', 'Vite', 'Supabase', 'PostgreSQL', 'Go', 'Rust',
  'Python', 'Pine Script', 'Arduino', 'Docker', 'Git', 'TypeScript',
];

export default function TechStack() {
  const ref = useReveal(0.1);

  return (
    <section id="stack" ref={ref}>
      <div className="section-wrapper">
        <span className="section-label reveal">// toolbox</span>
        <h2 className="section-title reveal reveal-delay-1">Tech Stack</h2>
        <p className="section-subtitle reveal reveal-delay-2">
          From Go microservices to Pine Script trading strategies — I go where the problem takes me.
        </p>

        <div className="stack-grid">
          {categories.map((cat, ci) => (
            <div key={cat.label} className={`stack-category reveal reveal-delay-${ci + 1}`}>
              <h4 className="stack-cat-label">{cat.label}</h4>
              <ul className="stack-items">
                {cat.items.map((item) => (
                  <li key={item} className="stack-item">
                    <span className="stack-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="stack-marquee-wrapper reveal reveal-delay-4">
          <div className="stack-marquee">
            {[...Array(4)].flatMap((_, ri) =>
              marqueeItems.map((t) => (
                <span key={`${ri}-${t}`} className="marquee-item">{t}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
