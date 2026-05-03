import { useReveal } from '../hooks/useReveal';
import { navigate } from '../router';
import { posts } from '../data/posts';
import '../components/LatestPosts.css';
import './BlogPage.css';

export default function BlogPage() {
  const ref = useReveal(0.05);

  const handlePostClick = (e, slug) => {
    e.preventDefault();
    navigate(`/blog/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleHome = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <section id="blog-page" ref={ref}>
      <div className="section-wrapper">
        <a href="/" className="back-link reveal" onClick={handleHome}>
          ← portfolio
        </a>

        <span className="section-label reveal reveal-delay-1">// writing</span>
        <h2 className="section-title reveal reveal-delay-2">Blog</h2>
        <p className="section-subtitle reveal reveal-delay-3">
          Things I figured out, built from scratch, or broke badly enough to write about.
        </p>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className={`blog-card reveal reveal-delay-${i + 1}${post.draft ? ' blog-card-draft' : ''}`}
            >
              <div className="blog-card-top">
                <time className="blog-card-date">{post.date}</time>
                {post.draft && <span className="blog-draft-badge">Draft</span>}
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-desc">{post.description}</p>
              <div className="blog-card-footer">
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-card-tag">{tag}</span>
                  ))}
                </div>
                {!post.draft ? (
                  <a
                    href={`/blog/${post.slug}`}
                    className="blog-read-btn"
                    onClick={(e) => handlePostClick(e, post.slug)}
                  >
                    Read →
                  </a>
                ) : (
                  <span className="blog-read-soon">Coming soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
