import { useState, useEffect } from 'react';
import { navigate } from '../router';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const SECTION_LINKS = ['about', 'projects', 'stack', 'contact'];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="5"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="5" y2="12"/>
      <line x1="19" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 80 && y > last); // hide when scrolling down past 80px
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleSection = (id) => {
    setMenuOpen(false);
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#' + id;
    }
  };

  const handleBlog = () => { setMenuOpen(false); navigate('/blog'); window.scrollTo(0, 0); };
  const handleHome = (e) => { e.preventDefault(); setMenuOpen(false); navigate('/'); window.scrollTo(0, 0); };

  return (
    <>
      {/* ── Mobile full-screen overlay — rendered OUTSIDE <nav> so
           backdrop-filter on nav doesn't trap it as a fixed child ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}${dark ? '' : ' mobile-menu-light'}`}>
        {/* Tap blank area to close */}
        <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
        <nav className="mobile-menu-inner">
          {SECTION_LINKS.map((id) => (
            <button key={id} className="mobile-menu-link" onClick={() => handleSection(id)}>
              {id}
            </button>
          ))}
          <button className="mobile-menu-link" onClick={handleBlog}>blog</button>
          <div className="mobile-menu-divider" />
          <button className="theme-toggle mobile-theme-toggle" onClick={toggle}>
            {dark ? <SunIcon /> : <MoonIcon />}
            <span>{dark ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <a
            className="btn-hire mobile-hire"
            href="mailto:subediashish31@gmail.com"
            onClick={() => setMenuOpen(false)}
          >
            Hire Me
          </a>
        </nav>
      </div>

      {/* ── Navbar pill ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}${hidden ? ' nav-hidden' : ''}${dark ? '' : ' navbar-light'}`}>
        <div className="navbar-inner">

          <a className="navbar-logo" href="/" onClick={handleHome}>
            ASHISH<span className="logo-dot">.</span>
          </a>

          {/* Desktop links */}
          <ul className="navbar-links">
            {SECTION_LINKS.map((id) => (
              <li key={id}><button onClick={() => handleSection(id)}>{id}</button></li>
            ))}
            <li><button onClick={handleBlog}>blog</button></li>
            <li className="navbar-divider-item" aria-hidden="true" />
            <li>
              <button
                className="theme-toggle"
                onClick={toggle}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
            </li>
            <li>
              <a className="btn-hire" href="mailto:subediashish31@gmail.com">Hire Me</a>
            </li>
          </ul>

          {/* Mobile controls */}
          <div className="navbar-right-mobile">
            <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}
