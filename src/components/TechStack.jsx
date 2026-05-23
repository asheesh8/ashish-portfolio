import { useReveal } from '../hooks/useReveal';
import './TechStack.css';

const STACK_COLS = [
  {
    label: 'Frontend',
    icon: '⬡',
    tools: ['React', 'Vite', 'JavaScript', 'HTML / CSS', 'Tailwind', 'Three.js', 'WebGL', 'Responsive UI'],
  },
  {
    label: 'Backend',
    icon: '⬡',
    tools: ['Node.js', 'Go', 'Python', 'PostgreSQL', 'Supabase', 'REST APIs', 'Auth', 'Serverless Functions'],
  },
  {
    label: 'Hardware',
    icon: '⬡',
    tools: ['Arduino', 'C++', 'AVR Assembly', 'Elegoo UNO R3', 'Bluetooth modules', 'Sensors', 'Custom PC builds'],
  },
  {
    label: 'AI & Automation',
    icon: '⬡',
    tools: ['Anthropic API', 'Codex', 'Gemini', 'LLM agents', 'Custom tools', 'Workflow automation'],
  },
];

export default function TechStack() {
  const ref = useReveal(0.1);

  return (
    <section id="stack" ref={ref}>
      <div className="stack-wrapper">

        {/* Header */}
        <div className="stack-header reveal">
          <span className="stack-eyebrow">// tools of the trade</span>
          <h2 className="stack-headline">
            What I build with.<br />
            <span className="stack-headline-sub">Whatever gets the job done right.</span>
          </h2>
        </div>

        {/* Category boxes */}
        <div className="stack-grid reveal reveal-delay-1">
          {STACK_COLS.map((col) => (
            <div key={col.label} className="stack-box">
              <div className="stack-box-label">{col.label}</div>
              <ul className="stack-box-list">
                {col.tools.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AI for business callout */}
        <div className="stack-ai reveal reveal-delay-2">
          <div className="stack-ai-left">
            <div className="stack-ai-eyebrow">AI is useful when it stops being a gimmick</div>
            <p className="stack-ai-body">
              I like AI when it actually does work. Not "we added a chatbot" for no reason.
              I mean tools that save time, pull context, and make people faster.
              The AI Pit Boss in <strong>ThePit</strong> reads a trader's history and points
              out the bad habits. <strong>Open Box</strong> uses the Best Buy API to surface
              open-box inventory that can get buried, then turns it into a cleaner sales flow.
              Same idea every time: less guessing,
              more useful answers.
            </p>
          </div>
          <div className="stack-ai-right">
            <div className="stack-ai-example">
              <span className="stack-ai-example-tag">ThePit</span>
              <span className="stack-ai-example-desc">AI Pit Boss — trade journal analysis &amp; roast engine</span>
            </div>
            <div className="stack-ai-example">
              <span className="stack-ai-example-tag">Open Box</span>
              <span className="stack-ai-example-desc">Best Buy API sales tool — recover value from open-box inventory</span>
            </div>
            <div className="stack-ai-example">
              <span className="stack-ai-example-tag">HomeSHINE</span>
              <span className="stack-ai-example-desc">Client chatbot — answers quote questions 24/7</span>
            </div>
          </div>
        </div>

      </div>

      <div style={{ padding: '0 var(--gutter) 16px' }}>
        <div className="double-rule__top" />
        <div className="double-rule__gap" />
        <div className="double-rule__bottom" />
      </div>
    </section>
  );
}
