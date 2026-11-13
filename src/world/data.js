// Everything the site says lives here, so copy edits never touch layout code.

import shotVillage from '../assets/work/villageservers.webp';
import shotBible from '../assets/work/bibletransfer.webp';
import shotTransfer from '../assets/work/transfer123.webp';
import shotArkitech from '../assets/work/arkitech.webp';
import shotPainting from '../assets/work/painting.webp';
import shotElite from '../assets/work/elite.webp';
import shotJeffs from '../assets/work/jeffs.webp';
import shotInspire from '../assets/work/inspire.webp';
import shotPit from '../assets/work/thepit.webp';
import shotOpenBox from '../assets/projects/bestbuy/openbox-01-home.webp';
import shotHardware from '../assets/projects/hardware/IMG_4290.webp';

export const LINKS = {
  email: 'mailto:subediashish31@gmail.com',
  emailText: 'subediashish31@gmail.com',
  github: 'https://github.com/asheesh8',
  linkedin: 'https://www.linkedin.com/in/ashish-subedi2',
  arkitech: 'https://arkitech-sol.com',
  thepit: 'https://pittrader.vercel.app',
};

/* ── Library: the classes worth pulling off the shelf ───────────────────── */

export const SHELVES = [
  {
    id: 'math',
    label: 'Math & data',
    books: [
      { code: 'MTH-310', name: 'Linear Algebra', term: 'Fall 2025', color: 'teal', h: 92,
        note: 'Vectors, matrices, eigen-everything. This is the class where a lot of ML and graphics stuff finally made sense to me instead of being magic.' },
      { code: 'MTH-350', name: 'Numerical Methods', term: 'Fall 2026', color: 'amethyst', h: 100,
        note: 'How computers actually do math when exact answers aren’t an option. Error, approximation, and why your float is lying to you.' },
      { code: 'MTH-240', name: 'Calculus II', term: 'Spring 2026', color: 'maple', h: 84,
        note: 'Series, integrals, the grind. Not glamorous, but it’s the reason the higher math didn’t scare me.' },
      { code: 'MTH-270', name: 'Discrete Mathematics', term: 'Fall 2024', color: 'moss', h: 88,
        note: 'Logic, proofs, graphs, counting. Basically the math that programming is secretly built on.' },
      { code: 'DAT-330', name: 'Data Mining', term: 'Fall 2026', color: 'lantern', h: 96,
        note: 'Finding patterns in messy data. Pairs really well with how I already think about trading.' },
    ],
  },
  {
    id: 'software',
    label: 'Building software',
    books: [
      { code: 'CSI-300', name: 'Database Management Systems', term: 'Spring 2026', color: 'lantern', h: 100,
        note: 'Postgres, Mongo, Redis and Neo4j in one semester. Final project was an auction house app. Every client project I ship now has a real data model behind it because of this class.' },
      { code: 'CSI-340', name: 'Software Design Patterns', term: 'Fall 2025', color: 'teal', h: 90,
        note: 'Learning to name the stuff I was already half doing, then doing it on purpose. Made my code way easier to come back to.' },
      { code: 'CSI-351', name: 'Software Testing', term: 'Fall 2026', color: 'maple', h: 86,
        note: 'Breaking my own code before a client does. Unit tests, integration tests, and actually thinking about edge cases.' },
      { code: 'CSI-380', name: 'Emerging Languages', term: 'Spring 2026', color: 'amethyst', h: 94,
        note: 'Rust and Go. Go stuck with me. I built a multi-retailer price tracker with it afterwards.' },
      { code: 'CSI-281', name: 'Data Structures & Algorithms', term: 'Spring 2025', color: 'moss', h: 98,
        note: 'The class everyone warns you about. Trees, graphs, big-O. Glad I took it seriously.' },
      { code: 'CCC-410', name: 'Capstone Design', term: 'Fall 2026', color: 'birch', h: 104,
        note: 'ClubCRM, with Michael Olave and Noah Sheppard. Taking a one-school prototype and making it work for any school, with school sign-in and FERPA in mind. I own the front end and the UI design.' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems & security',
    books: [
      { code: 'CSI-370', name: 'Computer Architecture', term: 'Fall 2025', color: 'birch', h: 90,
        note: 'What’s actually happening under the code. Registers, memory, a little assembly. Same energy as programming my Arduino builds.' },
      { code: 'CSI-275', name: 'Network Programming', term: 'Spring 2025', color: 'teal', h: 84,
        note: 'Sockets, protocols, writing things that talk to each other over a network.' },
      { code: 'CSI-230', name: 'Linux / Unix Programming', term: 'Fall 2024', color: 'moss', h: 96,
        note: 'Living in the terminal. Bash, scripting, permissions. Still use all of it every day.' },
      { code: 'SEC-250', name: 'Computer & Network Security', term: 'Fall 2026', color: 'maple', h: 100,
        note: 'Part of my cybersecurity minor. How systems get attacked and how you lock them down.' },
    ],
  },
];

/* ── Workshop: client and custom work ───────────────────────────────────── */

export const FEATURED = [
  {
    id: 'villageserver',
    title: 'VillageServer Initiative',
    kind: 'Nonprofit · site, campaigns and outreach tools',
    href: 'https://villageservers.org',
    linkText: 'villageservers.org',
    shot: shotVillage,
    body: 'A 501(c)(3) getting Bibles, teaching and gospel films to villages with no internet and no power grid. I built their whole web presence: the site, the giving campaigns, and the internal tools the team uses to find and keep up with partner churches and schools.',
    facts: ['Field tested in Peru, Kenya and Zambia', '15 Kenyan classrooms with screens', '12+ ministry partners'],
    stack: ['React', 'Vite', 'Supabase', 'Vercel'],
  },
  {
    id: 'bibletransfer',
    title: 'BibleTransfer123',
    kind: 'The app I’m building right now',
    href: 'https://bibletransfer123.org',
    linkText: 'bibletransfer123.org',
    shot: shotBible,
    body: 'Bible films, audio Bibles and Scripture in your own language. You save it once, then pass it phone to phone. No internet, no sign-up, no ads. It’s what VillageServer actually hands out in the field, so it has to work on cheap phones with zero signal.',
    facts: ['64 languages', 'Works fully offline', 'Free, no account'],
    stack: ['PWA', 'Offline storage', 'Peer sharing'],
  },
  {
    id: 'transfer123',
    title: '123Transfer',
    kind: 'App · built with Luke Cirne',
    href: 'https://designhandoff123transfer.vercel.app',
    linkText: 'Try the preview',
    shot: shotTransfer,
    body: 'Plug in a drive, pick what you want to move, done. Made for people who aren’t techy at all, so it’s big tap targets, plain English, and no file types to remember. You can tap through the whole thing in the preview.',
    facts: ['Drive, scan and send', 'High-contrast UI'],
    stack: ['React', 'Mobile web'],
  },
];

export const STUDIO = {
  title: 'Arkitech Solutions',
  href: LINKS.arkitech,
  shot: shotArkitech,
  body: 'My studio out of Burlington. Websites, dashboards and AI search for small businesses. Every site is built by me, start to finish.',
  count: '10+',
  saas: {
    title: 'The SaaS behind it',
    body: 'I also built the software Arkitech runs on: an industrial-level client dashboard and CRM that we sell to clients as a service. A lot of it was inspired by ClubCRM, my capstone that’s being built right now. The next goal is selling it to other software agencies.',
    href: 'https://arkitech.dev',
    linkText: 'arkitech.dev',
  },
  clients: [
    { name: 'Painting With Purpose', where: 'Vermont painting company', shot: shotPainting, href: 'https://paintingwithpurpose01.vercel.app' },
    { name: 'Elite Real Estate Partners', where: 'Vermont real estate team', shot: shotElite, href: 'https://elitehomesvermont.com' },
    { name: 'Jeff’s Seafood', where: 'Restaurant, Saint Albans', shot: shotJeffs, href: 'https://jeff-seafood-nine.vercel.app' },
    { name: 'Inspire Campaigns', where: 'Video and marketing studio, Burlington', shot: shotInspire, href: 'https://inspirecampaigns.com' },
  ],
  more: ['Black Sheep Landscaping', 'CallJoe', 'VillageServer Initiative'],
};

export const OWN = [
  {
    title: 'ThePit',
    kind: 'Trading community',
    href: LINKS.thepit,
    shot: shotPit,
    body: 'Journals, a live room, and an AI Pit Boss that reads your trade history and tells you exactly where you messed up. I built it because I wanted it. I still use it.',
    stack: ['React', 'Supabase', 'Anthropic API'],
  },
  {
    title: 'Open Box',
    kind: 'Retail tool · Best Buy',
    blog: 'open-box-bestbuy-connect',
    shot: shotOpenBox,
    body: 'Open-box deals get buried in the system. This pulls them up fast with the Best Buy API and gives floor staff an AI advisor to explain the deal.',
    stack: ['Python', 'React', 'Anthropic API'],
  },
  {
    title: 'Mura & other hardware',
    kind: 'Personal builds',
    shot: shotHardware,
    body: 'A tank bot on treads I programmed from scratch, and a DIY foil-pad foot controller. Arduino, C++, a little AVR assembly, a lot of broken wires.',
    stack: ['Arduino', 'C++', 'AVR'],
  },
];

export const ALSO = [
  { title: 'ClubCRM', kind: 'Senior capstone', body: 'Club management any school can brand as its own, with school sign-in like Canvas.' },
  { title: '3D car configurator', kind: 'Three.js', body: 'A GT3 RS and an RS6 GT you can spin, zoom and sit inside.', blog: '3d-car-configurator' },
  { title: 'Price tracker', kind: 'Go + React', body: 'Watches products across stores so you buy at the right moment.' },
];

export const TOOLS = [
  ['Languages', ['JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'SQL']],
  ['Front end', ['React', 'Vite', 'Tailwind', 'Three.js']],
  ['Back end & data', ['Node', 'Supabase', 'Postgres', 'MongoDB', 'Redis', 'Neo4j']],
  ['AI', ['Claude / Anthropic API', 'Agents & tool use', 'AI search']],
  ['Systems', ['Linux', 'Networking', 'Security', 'Testing', 'Vercel']],
];

/* ── Depths: experience, newest on top, roots at the bottom ─────────────── */

export const LAYERS = [
  { layer: 'grass', when: 'Now', title: 'Founder & developer', org: 'Arkitech Solutions',
    body: 'Running my own studio. Finding clients, building their sites and dashboards, and keeping them happy after launch. 10-plus clients so far, plus the SaaS dashboard we sell as a service.' },
  { layer: 'dirt', when: 'Aug 2026 – now', title: 'Capstone engineer', org: 'ClubCRM, Champlain College',
    body: 'Team of three. I’m on the front end: designing the UI and wiring it up to the backend my teammates are building.' },
  { layer: 'stone', when: 'Aug 2023 – now', title: 'Funded futures trader', org: 'Topstep',
    body: 'I trade NQ on a $200K funded allocation, with $60K+ in funded-account payouts. Strict risk rules, fast decisions, no ego. It’s also why ThePit exists.' },
  { layer: 'deep', when: 'Apr 2023 – now', title: 'Sales', org: 'Best Buy',
    body: 'Helping people figure out tech without making them feel dumb. Ended up building Open Box for the floor because the open-box workflow was painful.' },
  { layer: 'ore', when: 'Mar – Jun 2023', title: 'Research intern', org: 'Essex Junction Recreation Dept.',
    body: 'Went through decades of water-quality data to find the best treatment temperature ranges, and made public brochures on PFOS/PFAS and safe disposal.' },
];

export const ROOTS = {
  title: 'Goldhaap, Nepal',
  body: 'This is the bottom layer. I grew up in a small camp in Goldhaap. The first home I remember burned down completely and my family rebuilt from nothing. We came to the U.S. when I was 5. My parents gave up a lot so I could have a shot, and I think about that every day. It’s why I take the work this seriously.',
};
