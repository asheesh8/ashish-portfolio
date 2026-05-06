import { useEffect } from 'react';
import { useRoute } from './router';
import Navbar from './components/Navbar';
import MountainScene from './components/MountainScene';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhoWeServe from './components/WhoWeServe';
import Projects from './components/Projects';
import LatestPosts from './components/LatestPosts';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import BlogPostCar from './pages/BlogPostCar';
import BlogPostDynamic from './pages/BlogPostDynamic';
import AdminPage from './pages/AdminPage';
import './App.css';

const STATIC_SLUGS = new Set(['3d-car-configurator']);

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.hero-section .reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhoWeServe />
      <Projects />
      <LatestPosts />
      <TechStack />
      <Contact />
    </>
  );
}

function App() {
  const path = useRoute();
  const blogSlug = path.startsWith('/blog/') ? path.slice(6) : null;

  if (path === '/admin') return <AdminPage />;

  return (
    <>
      <MountainScene />
      <Navbar />
      <main>
        {path === '/'    && <HomePage />}
        {path === '/blog' && <BlogPage />}
        {blogSlug === '3d-car-configurator' && <BlogPostCar />}
        {blogSlug && !STATIC_SLUGS.has(blogSlug) && <BlogPostDynamic slug={blogSlug} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
