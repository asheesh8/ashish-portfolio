import { useState, useEffect } from 'react';
import './Navbar.css';

const links = ['about', 'services', 'projects', 'stack', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <a className="navbar-logo" href="#hero" onClick={() => handleLink('hero')}>
          <span className="logo-bracket">&lt;</span>Ashish<span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
          {links.map((id) => (
            <li key={id}>
              <button onClick={() => handleLink(id)}>{id}</button>
            </li>
          ))}
          <li>
            <a
              className="btn-hire"
              href="mailto:ashish@example.com"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </a>
          </li>
        </ul>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
