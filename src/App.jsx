import { useEffect } from 'react';
import { useRoute } from './router';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import WaveScene from './components/WaveScene';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import BlogPostCar from './pages/BlogPostCar';
import BlogPostOpenBox from './pages/BlogPostOpenBox';
import BlogPostDynamic from './pages/BlogPostDynamic';
import AdminPage from './pages/AdminPage';
import './App.css';

const STATIC_SLUGS = new Set(['3d-car-configurator', 'open-box-bestbuy-connect']);

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />
    </>
  );
}

function AppInner() {
  const path = useRoute();
  const blogSlug = path.startsWith('/blog/') ? path.slice(6) : null;

  if (path === '/admin') return <AdminPage />;

  return (
    <>
      <WaveScene />
      <Navbar />
      <main>
        {path === '/'     && <HomePage />}
        {path === '/blog' && <BlogPage />}
        {blogSlug === '3d-car-configurator' && <BlogPostCar />}
        {blogSlug === 'open-box-bestbuy-connect' && <BlogPostOpenBox />}
        {blogSlug && !STATIC_SLUGS.has(blogSlug) && <BlogPostDynamic slug={blogSlug} />}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
