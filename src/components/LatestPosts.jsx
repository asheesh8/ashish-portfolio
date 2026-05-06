import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { navigate } from '../router';
import { posts as staticPosts } from '../data/posts';
import { getPublishedPosts, formatDateDisplay } from '../utils/postStorage';
import './LatestPosts.css';

function mergedPosts() {
  const dynamic = getPublishedPosts().map(p => ({
    slug: p.slug,
    title: p.title,
    date: formatDateDisplay(p.date),
    description: p.description,
    tags: Array.isArray(p.tags) ? p.tags : (p.tags || '').split(',').map(t => t.trim()).filter(Boolean),
    draft: false,
  }));
  const staticSlugs = new Set(staticPosts.map(p => p.slug));
  const uniqueDynamic = dynamic.filter(p => !staticSlugs.has(p.slug));
  return [...uniqueDynamic, ...staticPosts];
}

export default function LatestPosts() {
  const ref = useReveal(0.1);
  const [posts, setPosts] = useState(() => mergedPosts());

  useEffect(() => { setPosts(mergedPosts()); }, []);

  const handlePostClick = (e, slug) => {
    e.preventDefault();
    navigate(`/blog/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    navigate('/blog');
    window.scrollTo(0, 0);
  };

  const preview = posts.slice(0, 2);

  return (
    <section id="blog-preview" ref={ref}>
      <div className="section-wrapper">
        <span className="section-label reveal">// writing</span>
        <h2 className="section-title reveal reveal-delay-1">Latest Posts</h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Things I figured out, built from scratch, or broke badly enough to write about.
        </p>

        <div className="blog-preview-grid">
          {preview.map((post, i) => (
            <div
              key={post.slug}
              className={`blog-card reveal reveal-delay-${i + 1}${post.draft ? ' blog-card-draft' : ''}`}
            >
              <div className="blog-card-top">
                <time className="blog-card-date">{post.date}</time>
                {post.draft && <span className="blog-draft-badge">Soon</span>}
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
                  <span className="blog-read-soon">Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="blog-preview-footer reveal reveal-delay-3">
          <a href="/blog" className="blog-view-all" onClick={handleViewAll}>
            View all posts →
          </a>
        </div>
      </div>
    </section>
  );
}
