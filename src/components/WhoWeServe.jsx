import { useReveal } from '../hooks/useReveal';
import './WhoWeServe.css';

const clients = [
  {
    icon: '🛍️',
    title: 'Local Shops & Boutiques',
    desc: "You shouldn't need a $10k agency to sell online. I'll build you a store that actually converts — no Shopify monthly fees, no cookie-cutter templates.",
  },
  {
    icon: '🍕',
    title: 'Restaurants & Food Spots',
    desc: "Your menu should be online. Ordering should be simple. People should find you in under 30 seconds. I'll make that happen.",
  },
  {
    icon: '🧹',
    title: 'Home Service Businesses',
    desc: "Cleaning, landscaping, contracting — I built HomeSHINE for exactly this. Booking, quotes, job tracking, employee access. The whole thing.",
  },
  {
    icon: '📦',
    title: 'Back-Office & Internal Tools',
    desc: "Still running your business on spreadsheets? I'll build something that actually works — faster, cleaner, and made for how you actually operate.",
  },
  {
    icon: '🏪',
    title: 'Small & Family Businesses',
    desc: "You built something real. Your website should reflect that. I'll make sure it doesn't look like a free Wix site from 2014.",
  },
  {
    icon: '💡',
    title: 'People With an Idea',
    desc: "You've got something you want to build but don't know where to start. Message me. That's literally the conversation I want to have.",
  },
];

const delays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4', 'reveal-delay-5'];

export default function WhoWeServe() {
  const ref = useReveal(0.1);

  return (
    <section id="clients" ref={ref}>
      <div className="section-wrapper">
        <span className="section-label reveal">// who I work with</span>
        <h2 className="section-title reveal reveal-delay-1">Real businesses.<br />Real problems.</h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Not VC-backed startups. Not enterprise. People who need something built and want it done right the first time.
        </p>

        <div className="clients-grid">
          {clients.map((c, i) => (
            <div key={c.title} className={`client-card reveal ${delays[i % 6]}`}>
              <span className="client-icon">{c.icon}</span>
              <h3 className="client-title">{c.title}</h3>
              <p className="client-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
