import { useReveal } from '../hooks/useReveal';
import { navigate } from '../router';
import connectShot from '../assets/projects/bestbuy/openbox-01-connect.png';
import inventoryShot from '../assets/projects/bestbuy/openbox-02-inventory.png';
import advisorShot from '../assets/projects/bestbuy/openbox-04-ai-advisor.png';
import analysisShot from '../assets/projects/bestbuy/openbox-05-analysis.png';
import './BlogPostCar.css';

const TAGS = ['Best Buy API', 'Open Box', 'Retail Tools', 'AI', 'Revenue'];

function PostImage({ src, alt, caption }) {
  return (
    <figure className="post-figure">
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function BlogPostOpenBox() {
  const ref = useReveal(0.05);

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/blog');
    window.scrollTo(0, 0);
  };

  const handleHome = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <article id="blog-post-car" ref={ref}>
      <div className="post-wrapper">
        <a href="/blog" className="post-back reveal" onClick={handleBack}>
          ← blog
        </a>

        <header className="post-header">
          <div className="post-meta reveal reveal-delay-1">
            <time className="post-date">May 23, 2026</time>
            <div className="post-tags">
              {TAGS.map((t) => (
                <span key={t} className="post-tag">{t}</span>
              ))}
            </div>
          </div>
          <h1 className="post-title reveal reveal-delay-2">
            Open Box: The Best Buy Revenue Leak Sitting in Plain Sight
          </h1>
        </header>

        <div className="post-body reveal reveal-delay-3">
          <PostImage
            src={inventoryShot}
            alt="Open Box inventory dashboard"
            caption="Open Box pulls open-box inventory into a sales-floor view instead of making employees dig for it."
          />

          <p>
            Open-box products are some of the best deals in the store. The customer can save a
            ridiculous amount of money, the product is already sitting there, and Best Buy has a
            chance to turn inventory back into revenue instead of letting it collect dust.
          </p>

          <p>
            The problem is visibility. Open-box items get buried. They get put away, moved around,
            forgotten, or ignored because finding the right one in the middle of a customer
            conversation is annoying. So the customer never hears about the deal, the employee never
            pitches it, and Best Buy keeps losing money on inventory that is literally already in
            the building.
          </p>

          <h2>The AirPods Max example</h2>
          <p>
            This is exactly why I built <strong>Open Box</strong>. When I was looking through the
            data, there were <strong>7 open-box AirPods Max units</strong> sitting there at
            <strong> over 55% off</strong>. That is not a tiny discount. That is the kind of deal a
            customer would absolutely want to know about.
          </p>

          <p>
            But most customers do not know those units exist. And unless the employee has the time,
            memory, and patience to dig through the open-box system at the perfect moment, they might
            not know either. That is the leak. It is not that the deal is bad. It is that the deal is
            invisible.
          </p>

          <h2>What the app does</h2>
          <p>
            Open Box is a BestBuy Connect sales tool built around the Best Buy API. It pulls open-box
            inventory into a cleaner interface so employees can find deals fast and explain them in a
            way that makes sense to customers.
          </p>

          <ul>
            <li>Search by product, brand, model, or SKU</li>
            <li>Filter by category, condition, RAM, storage, brand, and biggest sale</li>
            <li>Surface open-box products that are easy to miss</li>
            <li>Compare multiple products in a customer basket</li>
            <li>Attach membership and card context to the sale conversation</li>
            <li>Use an AI advisor to find the strongest deals for the customer</li>
          </ul>

          <PostImage
            src={connectShot}
            alt="Open Box connect screen"
            caption="The app can connect to live inventory through the Best Buy API, with sample data available for demos."
          />

          <h2>Why this matters</h2>
          <p>
            A lot of retail tools are built like the person using them has unlimited time. They do
            not. On the floor, you have a customer in front of you, questions coming fast, and maybe
            thirty seconds to find something useful before the moment is gone.
          </p>

          <p>
            Open Box makes the hidden deal visible. If a customer wants headphones, the employee can
            quickly see that there are open-box AirPods Max units at a massive discount. If a
            customer wants a laptop under a certain budget, the employee can find the open-box unit
            that gives them more value than a new lower-tier product.
          </p>

          <p>
            That helps customers save money, but it also helps Best Buy recover value from inventory
            that would otherwise sit around. A product sitting in the back is not revenue. A product
            surfaced at the right time, with the right explanation, is.
          </p>

          <PostImage
            src={advisorShot}
            alt="Open Box AI advisor"
            caption="The AI advisor helps employees ask practical sales questions like best deal today, biggest savings, or laptops under a budget."
          />

          <h2>The AI part</h2>
          <p>
            The AI is not there just to sound fancy. It is there to make the employee faster. You can
            ask for the best deals to push today, the biggest savings, Apple products only, excellent
            condition items, or TVs under a certain price. It turns the open-box inventory into a
            sales conversation.
          </p>

          <p>
            That matters because the best deal is not always obvious from a list. Sometimes the move
            is not the cheapest item. It is the one with the strongest discount, best condition, and
            easiest explanation for the customer standing in front of you.
          </p>

          <PostImage
            src={analysisShot}
            alt="Open Box AI analysis"
            caption="The advisor can turn inventory into a concrete recommendation and attach note for the employee."
          />

          <h2>The bigger idea</h2>
          <p>
            This is the kind of software I like building. Not a random app that looks good in a
            screenshot but does nothing. A tool that finds a real business problem and attacks it
            directly.
          </p>

          <p>
            Open-box inventory is already there. Customers already want deals. Employees already want
            a faster way to find the right option. Best Buy already wants to stop losing revenue on
            products that get piled away. The missing piece is a tool that connects all of that at
            the exact moment a sale can happen.
          </p>

          <p>
            That is Open Box. Take the hidden inventory, make it visible, explain the value, and help
            the store move product that should not be sitting around in the first place.
          </p>
        </div>

        <nav className="post-nav">
          <a href="/blog" onClick={handleBack}>← all posts</a>
          <a href="/" onClick={handleHome}>portfolio →</a>
        </nav>
      </div>
    </article>
  );
}
