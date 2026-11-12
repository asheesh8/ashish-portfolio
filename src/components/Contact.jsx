import { useReveal } from '../hooks/useReveal';
import { LINKS } from '../data/links';
import './Contact.css';

const SOCIALS = [
  ['LinkedIn', LINKS.linkedin],
  ['GitHub', LINKS.github],
  ['ThePit', LINKS.thepit],
];

export default function Contact() {
  const ref = useReveal(0.1);

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="section-inner">
        <div className="section-index reveal"><b>06</b> / Contact</div>
        <h2 className="contact-headline reveal reveal-delay-1">
          Got an idea?<br /><em>Let's make it real.</em>
        </h2>
        <a href={LINKS.email} className="contact-email reveal reveal-delay-2">
          {LINKS.emailText} <span aria-hidden>↗</span>
        </a>
        <div className="contact-foot reveal reveal-delay-3">
          <p>One person. No agency theater. Built in Vermont, shipped wherever. I reply fast when the idea is real.</p>
          <ul>
            {SOCIALS.map(([label, href]) => (
              <li key={label}><a href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
