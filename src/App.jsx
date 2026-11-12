import { useEffect, useState } from 'react';
import Trail from './components/Trail';
import Hero from './sections/Hero';
import Roots from './sections/Roots';
import Work from './sections/Work';
import Hours from './sections/Hours';
import School from './sections/School';
import Contact from './sections/Contact';

// One scroll loop drives everything: each chapter gets --p (how far through it you are)
// and --cover (how much of it the next chapter has slid over), and the trail gets its position.
function useScenes() {
  const [state, setState] = useState({ active: 0, progress: 0 });

  useEffect(() => {
    const root = document.documentElement;
    const chapters = [...document.querySelectorAll('[data-chapter]')];
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      let active = 0;
      chapters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
        const next = chapters[i + 1];
        const cover = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0;
        el.style.setProperty('--p', p.toFixed(4));
        el.style.setProperty('--cover', cover.toFixed(4));
        if (r.top <= vh * 0.5) active = i;
      });
      const max = root.scrollHeight - vh;
      setState((s) => {
        const progress = max > 0 ? window.scrollY / max : 0;
        return s.active === active && Math.abs(s.progress - progress) < 0.002 ? s : { active, progress };
      });
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    const onMove = (e) => {
      if (still) return;
      root.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3));
      root.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3));
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return state;
}

export default function App() {
  const { active, progress } = useScenes();

  useEffect(() => {
    requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
  }, []);

  return (
    <>
      <a className="skip" href="#roots">Skip to content</a>
      <Trail active={active} progress={progress} />
      <main>
        <Hero />
        <Roots />
        <Work />
        <Hours />
        <School />
        <Contact />
      </main>
    </>
  );
}
