import './legacy.css';
import './legacy-shell.css';
import BlogPage from '../pages/BlogPage';
import BlogPostCar from '../pages/BlogPostCar';
import BlogPostOpenBox from '../pages/BlogPostOpenBox';
import BlogPostDynamic from '../pages/BlogPostDynamic';
import AdminPage from '../pages/AdminPage';

const STATIC_SLUGS = new Set(['3d-car-configurator', 'open-box-bestbuy-connect']);

export default function Legacy({ path }) {
  if (path === '/admin') return <AdminPage />;
  const slug = path.startsWith('/blog/') ? path.slice(6) : null;
  return (
    <div className="legacy">
      <header className="legacy-bar">
        <a href="/#/workshop">Back to the workshop</a>
        <a href="/blog">Writing</a>
      </header>
      <main>
        {path === '/blog' && <BlogPage />}
        {slug === '3d-car-configurator' && <BlogPostCar />}
        {slug === 'open-box-bestbuy-connect' && <BlogPostOpenBox />}
        {slug && !STATIC_SLUGS.has(slug) && <BlogPostDynamic slug={slug} />}
      </main>
    </div>
  );
}
