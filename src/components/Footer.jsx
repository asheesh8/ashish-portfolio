import { useTheme } from '../context/ThemeContext';
import './Footer.css';

export default function Footer() {
  const { dark } = useTheme();
  return (
    <footer className="footer">
      {!dark && <div className="print-rule" />}
      <div className="footer-inner">
        <span className="footer-item">Ashish Subedi</span>
        <span className="footer-item footer-center">
          Champlain College &nbsp;·&nbsp; Class of 2027
        </span>
        <span className="footer-item footer-right">
          B.S. Computer Science &amp; Innovation&nbsp;&nbsp;·&nbsp;&nbsp;Mathematics&nbsp;&nbsp;·&nbsp;&nbsp;Cybersecurity
        </span>
      </div>
    </footer>
  );
}
