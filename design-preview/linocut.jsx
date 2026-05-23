/* Direction 1 — LINOCUT BROADSIDE
   Cream paper, deep forest ink, rust accent. Off-register print.
   Reads like a hand-cut letterpress broadside / zine cover.
*/

const linoColors = {
  paper:   '#ece2c8',
  paperHi: '#f4ecd2',
  ink:     '#0d2818',    // deep forest
  inkSoft: '#1a3a25',
  rust:    '#a0432b',    // off-register / accent
  rustSoft:'#c25f43',
  warm:    '#7c6a52',
  hairline:'#5a4830',
};

/* Linocut-style mountain print — geometric triangle layers + hatching */
function LinoMountains() {
  return (
    <svg viewBox="0 0 1200 460" style={{ width: '100%', display: 'block' }}>
      <defs>
        <pattern id="hatch-h" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(0)">
          <line x1="0" y1="0" x2="8" y2="0" stroke={linoColors.ink} strokeWidth="1.6" />
        </pattern>
        <pattern id="hatch-d" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={linoColors.ink} strokeWidth="1.4" />
        </pattern>
        <pattern id="hatch-x" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={linoColors.ink} strokeWidth="1" />
        </pattern>
        <pattern id="dots-print" patternUnits="userSpaceOnUse" width="7" height="7">
          <circle cx="3.5" cy="3.5" r="1.1" fill={linoColors.ink} />
        </pattern>
      </defs>

      {/* Rust off-register layer — same composition shifted */}
      <g transform="translate(6,4)" opacity="0.55" style={{ mixBlendMode: 'multiply' }}>
        <polygon points="0,460 0,300 180,160 360,260 540,140 720,230 900,120 1080,220 1200,170 1200,460" fill={linoColors.rust} />
      </g>

      {/* Sun — a perfect circle, low and warm */}
      <circle cx="880" cy="160" r="62" fill={linoColors.rust} opacity="0.85" />
      <circle cx="880" cy="160" r="62" fill="url(#hatch-x)" opacity="0.4" />

      {/* Far peaks — silhouette + hatching */}
      <g filter="url(#woodcut)">
        <polygon
          points="0,300 120,210 250,260 360,180 470,240 580,170 700,230 820,180 940,240 1080,200 1200,250 1200,460 0,460"
          fill={linoColors.inkSoft}
        />
      </g>

      {/* Mid peaks — solid forest ink */}
      <g filter="url(#woodcut)">
        <polygon
          points="0,460 0,340 160,250 300,330 420,260 540,330 660,270 780,330 900,260 1040,330 1200,280 1200,460"
          fill={linoColors.ink}
        />
      </g>

      {/* Hatched ridge highlight */}
      <polygon
        points="0,340 160,250 300,330 420,260 540,330 660,270 780,330 900,260 1040,330 1200,280 1200,340 1100,320 940,300 800,340 660,300 540,360 420,300 300,360 160,290 60,360"
        fill="url(#hatch-d)"
        opacity="0.35"
      />

      {/* Foreground hill — bigger, blackest */}
      <g filter="url(#woodcut)">
        <path d="M 0,460 L 0,400 Q 200,330 380,390 Q 540,440 720,370 Q 900,310 1100,380 L 1200,360 L 1200,460 Z" fill={linoColors.ink} />
      </g>

      {/* Trees — triangular pines along ridge */}
      <g fill={linoColors.ink}>
        {Array.from({ length: 36 }, (_, i) => {
          const x = 30 + i * 33 + ((i * 13) % 11);
          const h = 22 + (i * 7) % 18;
          const w = 7 + (i % 3);
          const y = 410 - ((i * 19) % 30);
          return (
            <g key={i}>
              <polygon points={`${x},${y - h} ${x - w},${y} ${x + w},${y}`} />
              <rect x={x - 1} y={y} width="2" height="4" />
            </g>
          );
        })}
      </g>

      {/* Foreground silhouettes — sharper, fewer trees */}
      <g fill={linoColors.ink}>
        {[60, 180, 290, 420, 580, 730, 880, 1010, 1140].map((x, i) => {
          const h = 38 + (i * 7) % 14;
          return (
            <g key={i}>
              <polygon points={`${x},${440 - h} ${x - 11},${440} ${x + 11},${440}`} />
              <polygon points={`${x},${430 - h - 4} ${x - 7},${430 - 4} ${x + 7},${430 - 4}`} fill={linoColors.paper} />
              <polygon points={`${x},${432 - h - 4} ${x - 7},${432 - 4} ${x + 7},${432 - 4}`} />
            </g>
          );
        })}
      </g>

      {/* Tiny lit cabin */}
      <g transform="translate(540, 420)">
        <rect x="0" y="-12" width="14" height="12" fill={linoColors.ink} />
        <polygon points="-2,-12 7,-19 16,-12" fill={linoColors.ink} />
        <rect x="4" y="-9" width="3" height="3" fill={linoColors.rustSoft} />
      </g>
    </svg>
  );
}

/* Registration mark — that crosshair-in-circle thing on print proofs */
function RegMark({ size = 32, color = linoColors.ink }) {
  return (
    <svg viewBox="0 0 32 32" style={{ width: size, height: size, display: 'block' }}>
      <circle cx="16" cy="16" r="13" fill="none" stroke={color} strokeWidth="1.2" />
      <line x1="16" y1="0" x2="16" y2="32" stroke={color} strokeWidth="1.2" />
      <line x1="0" y1="16" x2="32" y2="16" stroke={color} strokeWidth="1.2" />
      <circle cx="16" cy="16" r="3" fill={color} />
    </svg>
  );
}

/* ornament rules */
function PrintRule({ thick = false }) {
  return <div style={{ height: thick ? 4 : 1, background: linoColors.ink, width: '100%' }} />;
}
function DoubleRule() {
  return (
    <div>
      <div style={{ height: 3, background: linoColors.ink }} />
      <div style={{ height: 6 }} />
      <div style={{ height: 1, background: linoColors.ink }} />
    </div>
  );
}

function LinocutDirection() {
  const baseSerif = "'Spectral', Georgia, serif";
  const sans      = "'Manrope', system-ui, sans-serif";
  const mono      = "'JetBrains Mono', ui-monospace, monospace";

  return (
    <div
      className="ab"
      style={{
        width: 1280,
        background: linoColors.paper,
        color: linoColors.ink,
        fontFamily: baseSerif,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* paper grain + fibers across whole artboard */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `${window.GRAIN_URL}, ${window.FIBERS_URL}`,
        backgroundSize: '300px 300px, 600px 600px',
        mixBlendMode: 'multiply',
        opacity: 0.85,
        zIndex: 30,
      }} />

      {/* warm vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(60,40,20,0.18) 100%)',
        zIndex: 31,
      }} />

      {/* === MASTHEAD === */}
      <div style={{ padding: '24px 56px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: linoColors.hairline }}>
        <span>Vol. I — Fall 2026</span>
        <span>The Burlington Broadside</span>
        <span>Goldhaap · Burlington 04°N</span>
      </div>
      <div style={{ padding: '0 56px' }}><PrintRule /></div>

      {/* === HERO MASTHEAD-TITLE === */}
      <div style={{ padding: '40px 56px 28px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 40, marginBottom: 18 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: linoColors.rust, marginTop: 12 }}>
            № 001 — Available for freelance
          </div>
          <RegMark />
        </div>

        {/* Big name — off-register: rust shadow behind ink */}
        <div style={{ position: 'relative', lineHeight: 0.86 }}>
          <h1 style={{
            fontFamily: baseSerif,
            fontWeight: 800,
            fontSize: 220,
            letterSpacing: '-0.04em',
            lineHeight: 0.86,
            color: linoColors.rust,
            position: 'absolute',
            left: 6, top: 5,
            opacity: 0.5,
            mixBlendMode: 'multiply',
          }}>ASHISH</h1>
          <h1 style={{
            fontFamily: baseSerif,
            fontWeight: 800,
            fontSize: 220,
            letterSpacing: '-0.04em',
            lineHeight: 0.86,
            color: linoColors.ink,
            position: 'relative',
          }}>ASHISH</h1>
        </div>

        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'end' }}>
          <p style={{
            fontFamily: baseSerif,
            fontStyle: 'italic',
            fontSize: 30,
            lineHeight: 1.2,
            fontWeight: 400,
            color: linoColors.inkSoft,
            maxWidth: 360,
          }}>
            Freelance full-stack <br/>web developer&nbsp;— building things that work, <br/>shipping them, finishing them.
          </p>

          <div style={{ width: 1, alignSelf: 'stretch', background: linoColors.hairline }} />

          <div style={{ fontFamily: mono, fontSize: 12, lineHeight: 1.8, color: linoColors.warm }}>
            <div style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 10, color: linoColors.rust, marginBottom: 8 }}>Colophon</div>
            <div>From a village in Nepal —</div>
            <div>Goldhaap. Built in Vermont.</div>
            <div>Shipping code from a small desk.</div>
            <div style={{ marginTop: 10 }}>CS · NQ Futures · Freelance</div>
            <div>No agency. No middleman.</div>
          </div>
        </div>
      </div>

      {/* === LINOCUT MOUNTAIN PLATE === */}
      <div style={{ padding: '0 56px' }}>
        <div style={{ position: 'relative', border: `1px solid ${linoColors.ink}`, padding: 6, background: linoColors.paperHi }}>
          <LinoMountains />
          {/* plate caption */}
          <div style={{ position: 'absolute', left: 10, bottom: -28, fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: linoColors.warm }}>
            Plate I — Green Mountains, looking west · cut from memory
          </div>
          <div style={{ position: 'absolute', right: 10, bottom: -28, fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', color: linoColors.warm }}>
            A.S. 2026
          </div>
        </div>
      </div>

      {/* === CTA + STATS === */}
      <div style={{ padding: '64px 56px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: linoColors.ink, color: linoColors.paperHi,
            fontFamily: baseSerif, fontWeight: 700, fontSize: 18,
            padding: '16px 32px', letterSpacing: '0.02em',
            border: `2px solid ${linoColors.ink}`,
            position: 'relative',
            boxShadow: `4px 4px 0 0 ${linoColors.rust}`,
          }}>See what I've built →</button>
          <button style={{
            background: 'transparent', color: linoColors.ink,
            fontFamily: baseSerif, fontWeight: 600, fontSize: 18,
            padding: '14px 28px', letterSpacing: '0.02em',
            border: `2px solid ${linoColors.ink}`,
          }}>Work together</button>
        </div>
        <div style={{ display: 'flex', gap: 28, fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: linoColors.warm, justifyContent: 'flex-end' }}>
          <div><div style={{ fontFamily: baseSerif, fontSize: 36, fontWeight: 800, color: linoColors.ink, letterSpacing: '-0.02em' }}>03</div>Live products</div>
          <div><div style={{ fontFamily: baseSerif, fontSize: 36, fontWeight: 800, color: linoColors.ink, letterSpacing: '-0.02em' }}>20</div>Years</div>
          <div><div style={{ fontFamily: baseSerif, fontSize: 36, fontWeight: 800, color: linoColors.ink, letterSpacing: '-0.02em' }}>01</div>Builder</div>
        </div>
      </div>

      <div style={{ padding: '0 56px 24px' }}><DoubleRule /></div>

      {/* === ABOUT — newspaper columns === */}
      <div style={{ padding: '40px 56px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 32, marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: linoColors.rust, marginBottom: 8 }}>Chapter I</div>
            <div style={{ fontFamily: baseSerif, fontStyle: 'italic', fontSize: 14, color: linoColors.warm }}>page two</div>
          </div>
          <h2 style={{
            gridColumn: '2 / span 2',
            fontFamily: baseSerif,
            fontWeight: 800,
            fontSize: 72,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}>
            From Goldhaap, Nepal<br/>
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: linoColors.rust }}>to Burlington, Vermont.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 36, fontFamily: baseSerif, fontSize: 16, lineHeight: 1.7, color: linoColors.inkSoft, columnFill: 'balance' }}>
          <p>
            <span style={{ fontFamily: baseSerif, fontWeight: 800, fontSize: 56, lineHeight: 0.85, float: 'left', marginRight: 8, marginTop: 6, color: linoColors.ink }}>I</span>
            grew up in Goldhaap — a small village in Nepal where my family worked hard for everything they had. My parents sacrificed a lot to give me a shot at something better. I don't take that lightly. It's why I show up, and it's why I finish things.
          </p>
          <p>
            Now I'm finishing my CS degree at Champlain College, working at Best Buy, and trading NQ futures on a Topstep account at night. In between I build web apps for people who actually need them — not as a hobby, as a real service.
          </p>
          <p>
            You work directly with me. No agency, no handoffs, no markup. If something breaks, I fix it. If something's wrong, I say so. That's the deal.
            <br/><br/>
            <span style={{ fontFamily: mono, fontSize: 12, color: linoColors.rust }}>— A.S., Burlington</span>
          </p>
        </div>

        {/* tags as set-in slugs */}
        <div style={{ marginTop: 36, display: 'flex', gap: 0, flexWrap: 'wrap', borderTop: `1px solid ${linoColors.hairline}`, borderBottom: `1px solid ${linoColors.hairline}`, padding: '14px 0' }}>
          {['Goldhaap, NP', 'Burlington, VT', 'Champlain CS', 'NQ Futures', 'Ships code', '20 (21 soon)'].map((t, i) => (
            <span key={t} style={{
              fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: linoColors.ink, padding: '4px 18px',
              borderRight: i < 5 ? `1px solid ${linoColors.hairline}` : 'none',
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 56px' }}><PrintRule thick /></div>

      {/* === PROJECTS — catalog of plates === */}
      <div style={{ padding: '64px 56px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: linoColors.rust, marginBottom: 8 }}>Chapter II</div>
            <div style={{ fontFamily: baseSerif, fontStyle: 'italic', fontSize: 14, color: linoColors.warm }}>the work</div>
          </div>
          <h2 style={{
            fontFamily: baseSerif, fontWeight: 800, fontSize: 72, lineHeight: 0.95, letterSpacing: '-0.03em',
          }}>
            A catalog of <span style={{ fontStyle: 'italic', fontWeight: 400 }}>things shipped.</span>
          </h2>
        </div>

        {/* three plates */}
        {[
          { plate: 'II', title: 'HomeSHINE™', tagline: 'A full platform for a Vermont exterior-cleaning company.',
            body: 'Field assessment app, 10 screens, pricing engine that quotes jobs automatically, Claude AI chatbot, and a full employee system with role-based access. Live. Used. Replaced their paper process.',
            stack: 'React · Vite · Supabase · PostgreSQL · Claude',
            badge: 'Live',
            img: 'src/assets/projects/homeshine/Screenshot 2026-04-08 235755.png'
          },
          { plate: 'III', title: 'ThePit', tagline: 'A trading community for futures traders. Including me.',
            body: 'Journals, public feed, user profiles, and an AI Pit Boss that pulls up your trade history and roasts your decision-making. Sharp. Traders use it. I use it.',
            stack: 'React · Supabase · Anthropic · PostgreSQL',
            badge: 'pittrader.vercel.app',
            img: 'src/assets/projects/thepit/Screenshot 2026-04-09 001824.png'
          },
          { plate: 'IV', title: 'Hardware', tagline: 'Mura the tank-bot, and a foil-pad step controller.',
            body: 'When I am not writing web apps I am messing with hardware. Programmed Mura on treads from scratch. Built a custom step controller using a foil pad system. Elegoo, breadboards, trial and error. No tutorials.',
            stack: 'Arduino · C++ · AVR Assembly',
            badge: 'Personal',
            img: 'src/assets/projects/hardware/IMG_4290.JPG'
          },
        ].map((p, i) => (
          <div key={p.plate} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
            padding: '40px 0',
            borderTop: i === 0 ? `1px solid ${linoColors.hairline}` : 'none',
            borderBottom: `1px solid ${linoColors.hairline}`,
            alignItems: 'start',
          }}>
            <div style={{
              position: 'relative',
              padding: 6,
              background: linoColors.paperHi,
              border: `1px solid ${linoColors.ink}`,
            }}>
              <div style={{
                aspectRatio: '16/10',
                background: `${linoColors.ink} url(${p.img}) center/cover no-repeat`,
                filter: 'sepia(0.4) contrast(1.05) saturate(0.7)',
                position: 'relative',
              }}>
                {/* halftone overlay for printed feel */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: window.HALFTONE_URL('rgba(13,40,24,0.55)', 4, 0.9), mixBlendMode: 'multiply', opacity: 0.7 }} />
              </div>
              <div style={{ position: 'absolute', left: -8, top: -8, background: linoColors.rust, color: linoColors.paperHi, fontFamily: baseSerif, fontWeight: 800, padding: '6px 12px', letterSpacing: '0.05em' }}>
                Plate {p.plate}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: linoColors.rust, marginBottom: 10 }}>
                · {p.badge}
              </div>
              <h3 style={{ fontFamily: baseSerif, fontWeight: 800, fontSize: 48, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 6 }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: baseSerif, fontStyle: 'italic', fontSize: 20, color: linoColors.warm, marginBottom: 16 }}>{p.tagline}</p>
              <p style={{ fontFamily: baseSerif, fontSize: 16, lineHeight: 1.7, color: linoColors.inkSoft, maxWidth: 480, marginBottom: 18 }}>
                {p.body}
              </p>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', color: linoColors.ink, paddingTop: 14, borderTop: `1px solid ${linoColors.hairline}` }}>
                {p.stack}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === STACK ROW — typeset list === */}
      <div style={{ padding: '32px 56px 56px' }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: linoColors.rust, marginBottom: 14 }}>
          Tools of the trade
        </div>
        <div style={{ fontFamily: baseSerif, fontSize: 28, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
          <span style={{ fontWeight: 700 }}>React</span>, <span style={{ fontWeight: 700 }}>Vite</span>, <span style={{ fontWeight: 700 }}>Supabase</span>, <span style={{ fontWeight: 700 }}>PostgreSQL</span>, <span style={{ fontWeight: 700 }}>Node</span>, <span style={{ fontWeight: 700 }}>Go</span>, <span style={{ fontWeight: 700 }}>Python</span>,&nbsp;
          <span style={{ fontStyle: 'italic', color: linoColors.warm }}>and</span>&nbsp;
          <span style={{ fontWeight: 700 }}>Claude</span>, <span style={{ fontWeight: 700 }}>Anthropic API</span>, <span style={{ fontWeight: 700 }}>Arduino</span>, <span style={{ fontWeight: 700 }}>C++</span>, <span style={{ fontWeight: 700 }}>AVR</span>.
        </div>
      </div>

      <div style={{ padding: '0 56px' }}><DoubleRule /></div>

      {/* === CONTACT / COLOPHON FOOTER === */}
      <div style={{ padding: '64px 56px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: linoColors.rust, marginBottom: 16 }}>
            Available for hire
          </div>
          <h2 style={{
            fontFamily: baseSerif, fontWeight: 800, fontSize: 92, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: 28,
          }}>
            Let's <span style={{ fontStyle: 'italic', fontWeight: 400, color: linoColors.rust }}>build</span><br/> something good.
          </h2>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: linoColors.ink, color: linoColors.paperHi,
              fontFamily: baseSerif, fontWeight: 700, fontSize: 18,
              padding: '16px 32px',
              border: `2px solid ${linoColors.ink}`,
              boxShadow: `4px 4px 0 0 ${linoColors.rust}`,
            }}>subediashish31@gmail.com</button>
            <div style={{ fontFamily: mono, fontSize: 12, color: linoColors.warm }}>
              · Burlington, VT &nbsp;·&nbsp; replies same-day
            </div>
          </div>
        </div>

        <div style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.9, color: linoColors.warm, textAlign: 'right' }}>
          <RegMark size={28} color={linoColors.warm} />
          <div style={{ marginTop: 8 }}>Set in Spectral &amp; JetBrains Mono.</div>
          <div>Cut on cream stock, autumn ’26.</div>
          <div>A. Subedi, sole proprietor.</div>
          <div>© MMXXVI — printed in Vermont.</div>
        </div>
      </div>

      <div style={{ padding: '0 56px 28px' }}><PrintRule /></div>
      <div style={{ padding: '0 56px 30px', display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: linoColors.warm }}>
        <span>{`{ Goldhaap → Burlington }`}</span>
        <span>—  end of broadside  —</span>
        <span>Vol. I — № 001</span>
      </div>
    </div>
  );
}

window.LinocutDirection = LinocutDirection;
