import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">
          <span className="logo-bracket">&lt;</span>Ashish<span className="logo-bracket">/&gt;</span>
        </span>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Ashish Subedi &mdash; Burlington, VT
        </p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:ashish@example.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
