import { useEffect } from 'react';
import { useRoute } from './router';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import MountainScene from './components/MountainScene';
import MountainPlate from './components/MountainPlate';
import ShootingStars from './components/ShootingStars';
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
import { GRAIN_URL, FIBERS_URL } from './utils/textures';
import './App.css';

const STATIC_SLUGS = new Set(['3d-car-configurator', 'open-box-bestbuy-connect']);

/* Woodcut filter — only used in light mode plate */
function WoodcutDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        <filter id="woodcut" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/* Paper grain overlay — only visible in light mode */
function PaperOverlay() {
  return (
    <>
      <div
        aria-hidden="true"
        className="paper-grain-overlay"
        style={{
          backgroundImage: `${GRAIN_URL}, ${FIBERS_URL}`,
        }}
      />
      <div aria-hidden="true" className="paper-vignette" />
    </>
  );
}

function HomePage() {
  const { dark } = useTheme();

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
      {!dark && <MountainPlate />}
      <About />
      <Projects />
      <TechStack />
      <Contact />
    </>
  );
}

function AppInner() {
  const { dark } = useTheme();
  const path = useRoute();
  const blogSlug = path.startsWith('/blog/') ? path.slice(6) : null;

  if (path === '/admin') return <AdminPage />;

  return (
    <>
      <WoodcutDefs />
      {dark ? <MountainScene /> : <PaperOverlay />}
      <ShootingStars />
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
