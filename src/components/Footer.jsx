import { navigate } from '../router';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Ashish Subedi</span>
        <span>Champlain College · Class of 2027</span>
        <button className="footer-admin-link" onClick={() => { navigate('/admin'); window.scrollTo(0, 0); }}>
          admin
        </button>
      </div>
    </footer>
  );
}
