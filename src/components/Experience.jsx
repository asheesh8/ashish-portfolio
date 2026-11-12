import { useReveal } from '../hooks/useReveal';
import './Experience.css';

const ROLES = [
  {
    when: 'Aug 2026 — now',
    title: 'Capstone Engineer, ClubCRM',
    org: 'Champlain College · team of 3',
    body: 'Turning a single-school prototype into a multi-institution club platform with school sign-in and FERPA-aware data handling. My focus: collapsing a four-database backend into something maintainable and shaping the frontend.',
  },
  {
    when: 'Ongoing',
    title: 'Freelance Full-Stack Developer',
    org: 'Independent · Vermont',
    body: 'Built and shipped HomeSHINE, a full operations platform for a local exterior-cleaning company: field assessments, automatic pricing, employee roles and a Claude-powered client chatbot.',
  },
  {
    when: 'Aug 2023 — now',
    title: 'Funded Futures Trader',
    org: 'Topstep',
    body: 'Trade NQ futures on a $200K funded allocation, with $60K+ in funded-account payouts. Strict risk rules, fast data-driven decisions, and the reason I built ThePit.',
  },
  {
    when: 'Apr 2023 — now',
    title: 'Sales Representative',
    org: 'Best Buy',
    body: 'Help customers find simple answers to tech problems. Built Open Box, an internal tool that surfaces buried open-box inventory for floor staff.',
  },
  {
    when: 'Mar — Jun 2023',
    title: 'Research Intern',
    org: 'Essex Junction Recreation Dept.',
    body: 'Analyzed decades of water-quality data to find optimal treatment temperature ranges, and designed public brochures on PFOS/PFAS and safe disposal.',
  },
];

export default function Experience() {
  const ref = useReveal(0.08);

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="section-inner">
        <div className="section-head">
          <div className="section-index reveal"><b>02</b> / Experience</div>
          <h2 className="section-title reveal reveal-delay-1">
            Where I've been<br /><em>putting in the hours.</em>
          </h2>
        </div>

        <ol className="xp-list">
          {ROLES.map((r, i) => (
            <li key={r.title} className={`xp-row reveal reveal-delay-${Math.min(i + 1, 5)}`}>
              <span className="xp-when">{r.when}</span>
              <div className="xp-main">
                <h3 className="xp-title">{r.title}</h3>
                <span className="xp-org">{r.org}</span>
              </div>
              <p className="xp-body">{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
