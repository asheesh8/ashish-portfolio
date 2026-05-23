import { useState, useEffect } from 'react';
import { navigate } from '../router';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const SECTION_LINKS = ['about', 'projects', 'stack', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const handleSectionLink = (id) => {
    setMenuOpen(false);
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#' + id;
    }
  };

  const handleBlog = () => {
    setMenuOpen(false);
    navigate('/blog');
    window.scrollTo(0, 0);
  };

  const handleHome = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${dark ? ' navbar-dark' : ''}`}>
      <div className="navbar-inner">
        <a className="navbar-logo" href="/" onClick={handleHome}>
          ASHISH<span className="logo-dot">.</span>
        </a>

        <ul id="primary-navigation" className={`navbar-links${menuOpen ? ' open' : ''}`}>
          {SECTION_LINKS.map((id) => (
            <li key={id}>
              <button onClick={() => handleSectionLink(id)}>{id}</button>
            </li>
          ))}
          <li>
            <button onClick={handleBlog}>blog</button>
          </li>
          <li className="navbar-theme-item">
            <button
              className="theme-toggle"
              onClick={toggle}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? '☀' : '◑'}
            </button>
          </li>
          <li>
            <a className="btn-hire" href="mailto:subediashish31@gmail.com" onClick={() => setMenuOpen(false)}>
              Hire Me
            </a>
          </li>
        </ul>

        <div className="navbar-right-mobile">
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? '☀' : '◑'}
          </button>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
