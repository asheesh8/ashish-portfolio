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
            Open Box: Making the Hardest Sale Easier
          </h1>
        </header>

        <div className="post-body reveal reveal-delay-3">
          <PostImage
            src={inventoryShot}
            alt="Open Box inventory dashboard"
            caption="Open Box pulls open-box inventory into a sales-floor view instead of making employees dig for it."
          />

          <p>
            The best retail moments usually start with a customer who is almost there, but not quite.
            They have a real budget. They know what they want. Then the exact laptop they came in for
            is just out of reach.
          </p>

          <p>
            That is where the employee can either lose the sale or make the whole experience better.
            If they can quickly find the right open-box option, explain the condition, compare it to
            the new model, and show why it fits the customer's budget, the conversation changes. The
            customer does not feel downgraded. They feel like someone actually helped them win.
          </p>

          <h2>The budget problem</h2>
          <p>
            Say someone walks in with a specific budget for a laptop. The new machine they like is
            too expensive, and now the employee has to keep the sale alive without making the
            customer feel pressured or embarrassed. That is a very normal floor moment.
          </p>

          <p>
            I have seen what happens when the employee can take them through the open-box process the
            right way. The customer ends up with an even better machine than the one they thought
            they could afford. Then the rest of the basket makes sense too: keyboard, mouse, Total
            Tech, and financing through the card. That is not a fantasy sales scenario. That has
            happened plenty of times.
          </p>

          <h2>The AirPods Max example</h2>
          <p>
            The company-side problem is just as real. When I was looking through the data, there were
            <strong> 7 open-box AirPods Max units</strong> sitting there at <strong>over 55% off</strong>.
            That is a huge customer deal, but it is also revenue sitting in the building waiting to
            be recovered.
          </p>

          <p>
            Put numbers on it. AirPods Max are usually around <strong>$550</strong> new. If open-box
            units are sitting at roughly <strong>$255 to $350</strong>, that is a deal strong enough
            for a customer to seriously consider on the spot. Seven units at one store could mean
            around <strong>$1,785 to $2,450</strong> in recoverable product revenue from that one SKU
            alone, before any accessories, protection, memberships, or card financing are included.
          </p>

          <p>
            If those units stay buried, everybody loses. The customer never sees the deal. The
            employee misses an easy recommendation. Best Buy keeps carrying inventory that should
            already be moving. Open Box is built to turn that kind of hidden loss into a visible
            sales opportunity.
          </p>

          <p>
            And that was just one product at one store. Think about the loss sitting there if one
            location can have seven discounted AirPods Max units hiding in plain sight. Now stretch
            that same pattern across hundreds of thousands of SKUs and more than 1,000 Best Buy
            stores in North America. Even if only a small percentage of open-box products are missed,
            the company-side impact can get massive quickly. A tool like this could possibly change
            company revenue as a whole because it attacks a problem that repeats across products,
            departments, and locations.
          </p>

          <p>
            That is the part that makes this bigger than a nice customer deal. Open-box inventory is
            already paid for, already in the building, and already discounted enough to move. When it
            does not surface in the sale, the store is not just missing the item revenue. It can also
            miss the attachment revenue around it: accessories, memberships, protection, services,
            and card financing.
          </p>

          <h2>What the app does</h2>
          <p>
            Open Box is a BestBuy Connect sales tool built around the Best Buy API. It pulls open-box
            inventory into a cleaner interface so employees can guide that kind of conversation
            without digging through scattered systems while the customer waits.
          </p>

          <ul>
            <li>Search by product, brand, model, or SKU</li>
            <li>Filter by category, condition, RAM, storage, brand, and biggest sale</li>
            <li>Surface open-box products that are easy to miss</li>
            <li>Compare multiple products in a customer basket</li>
            <li>Match better machines to real customer budgets</li>
            <li>Attach membership, card, and financing context to the sale conversation</li>
            <li>Use an AI advisor to find the strongest recommendation for the customer</li>
          </ul>

          <PostImage
            src={connectShot}
            alt="Open Box connect screen"
            caption="The app can connect to live inventory through the Best Buy API, with sample data available for demos."
          />

          <h2>Why this matters</h2>
          <p>
            This is not about rushing customers in and out. It is about making the employee's job
            easier at the exact moment the sale gets complicated. The hardest part is not scanning a
            barcode. It is turning a budget objection into a better solution without losing trust.
          </p>

          <p>
            Open Box makes the better path visible. If a customer wants a laptop under a certain
            budget, the employee can find the open-box unit that gives them more value than a new
            lower-tier product. Then they can explain the savings, the condition, the protection
            options, the accessories, and the payment path in one connected conversation.
          </p>

          <p>
            That is why the benefit hits all three sides. The customer gets more value for their
            money. The employee gets a cleaner way to recommend the right product and build the
            basket. The company recovers revenue from inventory that would otherwise sit around,
            improves sell-through on open-box products, reduces stale inventory, and creates more
            chances for accessories, memberships, services, and financing to become part of the same
            useful recommendation instead of separate pitches.
          </p>

          <PostImage
            src={advisorShot}
            alt="Open Box AI advisor"
            caption="The AI advisor helps employees ask practical sales questions like best deal today, biggest savings, or laptops under a budget."
          />

          <h2>The AI part</h2>
          <p>
            The AI is not there just to sound fancy. It is there to help the employee think through
            the sale. You can ask for the best laptops under a budget, the biggest savings, Apple
            products only, excellent condition items, or the strongest bundle opportunity. It turns
            open-box inventory into a recommendation the employee can actually use.
          </p>

          <p>
            That matters because the right answer is not always the cheapest item. Sometimes the move
            is the open-box model with better specs, a clean condition grade, and enough savings left
            for the accessories and coverage the customer still needs.
          </p>

          <p>
            It also helps when the employee is selling outside their comfort zone. Maybe they usually
            sell computers, but now they are helping with an appliance customer. The advisor can give
            them product context, deal context, and a cleaner way to explain the recommendation so
            they are not stuck guessing through a category they do not work in every day.
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
            Open-box inventory is already there. Customers already have budgets. Employees already
            know a better deal can turn the whole conversation around, but they need the information
            in front of them while the customer is still engaged. The missing piece is a tool that
            connects the product, the budget, the full basket, and the company-side revenue gain at
            the exact moment it matters.
          </p>

          <p>
            The bigger opportunity is measuring that impact over time. If a single store can have
            thousands of dollars sitting in one open-box SKU, then charts showing recovered revenue
            by store, category, SKU, attachment rate, and yearly average could make the value obvious.
            Even a small lift in open-box sell-through could become a serious number when it repeats
            across hundreds of thousands of products and more than 1,000 stores.
          </p>

          <p>
            And if a tool like this can help save or create that much revenue, I would hope there is
            some upside for the person who built it too. Maybe that is a small participation in
            incremental open-box sales, something like <strong>2% to 5%</strong> if it performs at
            scale. Maybe it is a full-stack developer role where I get to keep building tools like
            this from the inside. Either way, the point is the same: useful software should create
            measurable value, and the people building it should be close to that value.
          </p>

          <p>
            That is Open Box. Take hidden inventory, make it visible, prove the revenue impact with
            data, and make a difficult sale feel easier for the customer, the employee, and the
            company.
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
