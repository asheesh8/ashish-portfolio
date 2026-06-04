import { navigate } from '../router';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-item">Ashish Subedi</span>
        <span className="footer-item footer-center">
          Champlain College &nbsp;·&nbsp; Class of 2027
        </span>
        <span className="footer-item footer-right">
          B.S. Computer Science &amp; Innovation&nbsp;&nbsp;·&nbsp;&nbsp;Mathematics&nbsp;&nbsp;·&nbsp;&nbsp;Cybersecurity
        </span>
      </div>
      <div className="footer-admin-row">
        <button
          className="footer-admin-link"
          onClick={() => { navigate('/admin'); window.scrollTo(0,0); }}
        >
          admin
        </button>
      </div>
    </footer>
  );
}
