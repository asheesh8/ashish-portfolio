import { useEffect, useState } from 'react';
import { navigate } from '../router';
import { getPost } from '../utils/postStorage';
import { parseBlocks, renderBlocks } from '../utils/parsePost';
import './BlogPostCar.css';

export default function BlogPostDynamic({ slug }) {
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const p = getPost(slug);
    if (p && p.published) setPost(p);
    else setNotFound(true);
  }, [slug]);

  const handleBack = (e) => { e.preventDefault(); navigate('/blog'); window.scrollTo(0, 0); };
  const handleHome = (e) => { e.preventDefault(); navigate('/'); window.scrollTo(0, 0); };

  if (notFound) return (
    <article id="blog-post-car">
      <div className="post-wrapper">
        <a href="/blog" className="post-back" onClick={handleBack}>← blog</a>
        <p style={{ marginTop: '4rem', color: 'var(--text-muted)' }}>Post not found.</p>
      </div>
    </article>
  );

  if (!post) return null;

  const blocks = parseBlocks(post.content || '');
  const tags = Array.isArray(post.tags) ? post.tags : (post.tags || '').split(',').map(t => t.trim()).filter(Boolean);

  return (
    <article id="blog-post-car">
      <div className="post-wrapper">
        <a href="/blog" className="post-back reveal" onClick={handleBack}>← blog</a>

        <header className="post-header">
          <div className="post-meta reveal reveal-delay-1">
            <time className="post-date">{post.date}</time>
            <div className="post-tags">
              {tags.map(t => <span key={t} className="post-tag">{t}</span>)}
            </div>
          </div>
          <h1 className="post-title reveal reveal-delay-2">{post.title}</h1>
        </header>

        <div className="post-body reveal reveal-delay-3">
          {renderBlocks(blocks)}
        </div>

        <nav className="post-nav">
          <a href="/blog" onClick={handleBack}>← all posts</a>
          <a href="/" onClick={handleHome}>portfolio →</a>
        </nav>
      </div>
    </article>
  );
}
