import Chapter from '../components/Chapter';
import Button from '../components/Button';
import { ART, LOOPS } from '../data/art';
import { LINKS } from '../data/content';

export default function Contact() {
  return (
    <Chapter id="say-hi" scene="night" art={ART.night} loop={LOOPS.night} weather="fireflies" focus="50% 40%" label="Contact">
      <div className="contact">
        <h2 className="display contact-title">Made it to the top. Got something that needs building?</h2>
        <p className="contact-lede">
          Tell me what you’re trying to do. If it’s a good idea I’ll tell you how I’d build it.
          If it’s not, I’ll tell you that too, before you spend a dollar on it. I reply fast when it’s real.
        </p>
        <a className="contact-email" href={LINKS.email}>{LINKS.emailText}</a>
        <div className="contact-actions">
          <Button href={LINKS.email}>Start a project</Button>
          <Button href={LINKS.linkedin} external variant="birch">LinkedIn</Button>
          <Button href={LINKS.github} external variant="birch">GitHub</Button>
        </div>
        <footer className="foot">
          <span>© {new Date().getFullYear()} Ashish Subedi</span>
          <span>Built by hand in Burlington. Scenes painted with Higgsfield.</span>
        </footer>
      </div>
    </Chapter>
  );
}
