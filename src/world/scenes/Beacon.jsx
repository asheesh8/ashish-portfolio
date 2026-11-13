import { Btn, Ext } from '../ui';
import { LINKS } from '../data';

export default function Beacon() {
  return (
    <section className="beacon">
      <div className="beacon-card slab">
        <p className="beacon-kicker">You made it to the end.</p>
        <h1 className="h1">Got something you want built?</h1>
        <p className="lede">
          A site, an app, a dashboard, an internal tool, whatever. Email me. I read everything and I
          reply fast when the idea’s real.
        </p>
        <Btn href={LINKS.email} className="btn--big">{LINKS.emailText}</Btn>
        <ul className="beacon-links">
          <li><Ext href={LINKS.linkedin}>LinkedIn</Ext></li>
          <li><Ext href={LINKS.github}>GitHub</Ext></li>
          <li><Ext href={LINKS.arkitech}>Arkitech Solutions</Ext></li>
          <li><Ext href={LINKS.thepit}>ThePit</Ext></li>
        </ul>
        <p className="beacon-foot">Built by me in Burlington. The artwork was generated for this site.</p>
      </div>
    </section>
  );
}
