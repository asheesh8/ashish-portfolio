import { useState, useEffect } from 'react';
import { navigate } from '../router';
import './Navbar.css';

const SECTION_LINKS = ['about', 'services', 'projects', 'stack', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <a className="navbar-logo" href="/" onClick={handleHome}>
          <span className="logo-bracket">&lt;</span>Ashish<span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
          {SECTION_LINKS.map((id) => (
            <li key={id}>
              <button onClick={() => handleSectionLink(id)}>{id}</button>
            </li>
          ))}
          <li>
            <button onClick={handleBlog}>blog</button>
          </li>
          <li>
            <a
              className="btn-hire"
              href="mailto:subediashish31@gmail.com"
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
