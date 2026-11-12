import { useReveal } from '../hooks/useReveal';
import './TechStack.css';

const GROUPS = [
  { label: 'Languages', tools: ['JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'SQL', 'AVR Assembly'] },
  { label: 'Frontend',  tools: ['React', 'Vite', 'HTML / CSS', 'Tailwind', 'Three.js', 'WebGL'] },
  { label: 'Backend & Data', tools: ['Node.js', 'Supabase', 'PostgreSQL', 'MongoDB', 'Redis', 'Neo4j', 'REST APIs', 'Auth / OAuth'] },
  { label: 'AI & Automation', tools: ['Anthropic API', 'Claude', 'LLM agents', 'Tool use', 'Workflow automation'] },
  { label: 'Systems & Security', tools: ['Linux / Unix', 'Networking', 'Network security', 'Digital forensics', 'Software testing'] },
  { label: 'Hardware', tools: ['Arduino', 'Elegoo UNO R3', 'Bluetooth modules', 'Sensors', 'Custom PC builds'] },
];

export default function TechStack() {
  const ref = useReveal(0.1);

  return (
    <section id="stack" className="section" ref={ref}>
      <div className="section-inner">
        <div className="section-head">
          <div className="section-index reveal"><b>05</b> / Toolkit</div>
          <h2 className="section-title reveal reveal-delay-1">
            What I build with.<br /><em>Whatever gets it done right.</em>
          </h2>
        </div>

        <div className="stack-grid">
          {GROUPS.map((g, i) => (
            <div key={g.label} className={`stack-box reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="stack-label">{g.label}</div>
              <div className="stack-tools">
                {g.tools.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
