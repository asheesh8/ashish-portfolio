import { useEffect } from 'react';
import Navbar from './components/Navbar';
import MountainScene from './components/MountainScene';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhoWeServe from './components/WhoWeServe';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
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
      <MountainScene />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhoWeServe />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
