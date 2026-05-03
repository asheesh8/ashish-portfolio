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
import './App.css';

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

  return (
    <>
      <MountainScene />
      <Navbar />
      <main>
        {path === '/blog' && <BlogPage />}
        {path === '/blog/3d-car-configurator' && <BlogPostCar />}
        {path === '/' && <HomePage />}
      </main>
      <Footer />
    </>
  );
}

export default App;
