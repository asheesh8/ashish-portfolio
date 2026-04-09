import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

export default function Contact() {
  const ref = useReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:subediashish31@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" ref={ref}>
      <div className="section-wrapper">
        <div className="contact-grid">
          <div className="contact-left">
            <span className="section-label reveal">// get in touch</span>
            <h2 className="section-title reveal reveal-delay-1">
              Let's talk.<br />
              <span className="accent-text">No pitch, no BS.</span>
            </h2>
            <p className="contact-desc reveal reveal-delay-2">
              Tell me what you're trying to build. I'll be straight with you about
              whether I can do it, how long it'll take, and what it'll cost.
              Vermont businesses especially — don't hesitate.
            </p>

            <div className="contact-links reveal reveal-delay-3">
              <a href="mailto:subediashish31@gmail.com" className="contact-link">
                <span className="contact-link-icon">✉</span>
                subediashish31@gmail.com
              </a>
              <a href="tel:+18023103749" className="contact-link">
                <span className="contact-link-icon">#</span>
                (802) 310-3749
              </a>
              <a
                href="https://github.com/asheesh8"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">gh</span>
                github.com/asheesh8
              </a>
              <a
                href="https://www.linkedin.com/in/ashish-subedi2/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">in</span>
                linkedin.com/in/ashish-subedi2
              </a>
            </div>
          </div>

          <div className="contact-right reveal reveal-delay-2">
            {sent ? (
              <div className="form-success">
                <span className="success-icon">✓</span>
                <h3>Got it.</h3>
                <p>I'll get back to you within 24 hours — usually faster.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">What do you need?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me what you're trying to build..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-submit">
                  Send it &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
