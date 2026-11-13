// Everything the site says lives here, so the copy can be edited in one place.

export const LINKS = {
  email: 'mailto:subediashish31@gmail.com',
  emailText: 'subediashish31@gmail.com',
  github: 'https://github.com/asheesh8',
  linkedin: 'https://www.linkedin.com/in/ashish-subedi2',
  studio: 'https://arkitech-sol.com',
  studioWork: 'https://arkitech-sol.com/work',
  portal: 'https://arkitech.dev',
  thepit: 'https://pittrader.vercel.app',
  villageserver: 'https://villageservers.org',
  transfer: 'https://designhandoff123transfer.vercel.app',
  configurator: '/gt3rs-configurator.html',
};

// The trail. Each stop is one chapter of the page and one painted scene.
export const STOPS = [
  { id: 'top',    place: 'Lake Champlain',          note: '95 ft' },
  { id: 'roots',  place: 'Goldhaap to Burlington',  note: '' },
  { id: 'work',   place: 'The sugarhouse',          note: 'work' },
  { id: 'hours',  place: 'Route 100 in October',    note: 'experience' },
  { id: 'school', place: 'The hill',                note: 'school' },
  { id: 'say-hi', place: "Camel's Hump",            note: '4,083 ft' },
];

export const CLIENTS = [
  { name: 'Elite Real Estate Partners', what: 'Real estate team at RE/MAX North', where: 'Vermont, border to border', href: 'https://elitehomesvermont.com' },
  { name: 'Inspire Campaigns',          what: 'Video, social and paid ads studio', where: 'Burlington',  href: 'https://inspirecampaigns.com' },
  { name: "Jeff's Seafood",             what: 'Seafood restaurant',                where: 'Saint Albans', href: 'https://jeff-seafood-nine.vercel.app' },
  { name: 'Black Sheep Landscaping',    what: 'Landscaping and seasonal property care', where: 'Essex', href: 'https://blacksheepvt.com' },
  { name: 'VillageServer Initiative',   what: 'Nonprofit, Scripture to off-grid villages', where: 'Peru, Kenya, Zambia', href: 'https://villageservers.org' },
  { name: 'CallJoe',                    what: 'House and office cleaning',         where: 'Saint Albans', href: 'https://joethecleaner.net' },
];

export const BUILDS = [
  {
    id: 'bibletransfer',
    name: 'BibleTransfer123',
    kind: 'App I’m building now',
    line: 'Getting the Bible to places that will never get Wi-Fi.',
    body: 'VillageServer carries Scripture, films and kids’ content the last mile: solar servers in the village, satellite in, phone to phone from there. I built their site, and now I’m building the app that does the phone-to-phone part. The website’s out, the iOS and Android version is next.',
    stack: ['Mobile', 'Offline-first', 'Phone to phone'],
    links: [['villageservers.org', LINKS.villageserver]],
    feature: true,
  },
  {
    id: 'portal',
    name: 'ArkiTech Portal',
    kind: 'SaaS I built',
    line: 'Client dashboards and CRM, sold as a service.',
    body: 'Our clients pay for it monthly: leads from their site land straight in, they get their own dashboard, and nothing lives in a pile of emails. The studio runs on it too. Next goal is selling it to other software agencies.',
    stack: ['TypeScript', 'SaaS', 'Client logins'],
    links: [['arkitech.dev', LINKS.portal]],
  },
  {
    id: 'transfer',
    name: '123Transfer',
    kind: 'With Luke Cirne',
    line: 'Plug in a drive. Pick what to move. Done.',
    body: 'A file mover for people who hate file movers. Big tap targets, high-contrast mode, plain English, scan a paper and send it from your phone.',
    stack: ['JavaScript', 'Mobile web', 'Accessibility'],
    links: [['Design handoff', LINKS.transfer]],
  },
  {
    id: 'thepit',
    name: 'ThePit',
    kind: 'Trading community',
    line: 'A trading journal with an AI that roasts you.',
    body: 'Journals, a public feed, profiles, and the Pit Boss: it pulls your whole trade history and tells you exactly where you messed up. I built it because I wanted it. I still use it.',
    stack: ['React', 'Supabase', 'Postgres', 'Claude API'],
    links: [['pittrader.vercel.app', LINKS.thepit]],
    shots: 'thepit',
  },
  {
    id: 'openbox',
    name: 'Open Box',
    kind: 'Built on the Best Buy floor',
    line: 'Turns buried open-box inventory into sales.',
    body: 'Open-box deals are great, but on the floor nobody can find them fast. This pulls them from the Best Buy API into one clean flow, with an AI advisor that helps you explain the deal to a customer on a budget.',
    stack: ['Python', 'Node.js', 'React', 'Claude API'],
    shots: 'bestbuy',
  },
];

export const SMALL_BUILDS = [
  { name: 'ClubCRM', line: 'Senior capstone with Michael Olave and Noah Sheppard. A club platform any school can brand as its own, with school sign-in and FERPA-aware data.' },
  { name: '3D car configurator', line: 'Three.js. A 911 GT3 RS and an RS6 GT you can spin, zoom and sit inside.', href: LINKS.configurator },
  { name: 'Price tracker', line: 'Go and React. Watches a product across stores so you buy at the right time.' },
  { name: 'Mura', line: 'A tank-bot on treads, programmed from scratch. Plus a DIY foil-pad foot pedal. Arduino, C++, a lot of broken wires.' },
];

// It is a timeline, so it reads top to bottom, newest first.
export const HOURS = [
  { when: 'Now', title: 'Co-founder, full-stack designer', org: 'ArkiTech Solutions', body: 'Two-person web studio out of Burlington. Custom websites, our own SaaS for client dashboards and CRM, and getting businesses recommended by AI search.' },
  { when: 'Aug 2026 to now', title: 'Capstone engineer', org: 'ClubCRM, Champlain College', body: 'Team of three, taking a one-school prototype to something any school can run. I’m on the front end: designing the UI and wiring it up to the backend my teammates are building.' },
  { when: 'Aug 2023 to now', title: 'Funded futures trader', org: 'Topstep', body: 'NQ futures on a $200K funded allocation, $60K+ in funded-account payouts. Strict rules, fast calls, no ego. It’s also why ThePit exists.' },
  { when: 'Apr 2023 to now', title: 'Sales', org: 'Best Buy', body: 'Helping people figure out tech without the jargon. Built Open Box on the side because the floor needed it.' },
  { when: 'Mar to Jun 2023', title: 'Research intern', org: 'Essex Junction Recreation Dept.', body: 'Went through decades of water-quality data to find the best treatment temperatures, and designed public brochures on PFOS and PFAS.' },
];

// Not all 36. The ones that actually changed how I build.
export const COURSES = [
  { code: 'MTH-310', name: 'Linear Algebra',             line: 'The reason 3D and ML stopped feeling like magic.' },
  { code: 'MTH-350', name: 'Numerical Methods',          line: 'When there’s no clean answer, get close, fast, and know how wrong you are.' },
  { code: 'DAT-330', name: 'Data Mining',                line: 'Finding the pattern before someone tells you it’s there.' },
  { code: 'MTH-270', name: 'Discrete Math',              line: 'Proofs, graphs, logic. The stuff under every algorithm.' },
  { code: 'CSI-300', name: 'Database Management',        line: 'Postgres, Mongo, Redis, Neo4j. Same data, four different ways to think about it.' },
  { code: 'CSI-351', name: 'Software Testing',           line: 'If it isn’t tested, it’s a rumor.' },
  { code: 'CSI-340', name: 'Software Design Patterns',   line: 'Why some codebases are easy to change and some fight you.' },
  { code: 'CSI-380', name: 'Emerging Languages',         line: 'Rust and Go, and learning a new language fast.' },
  { code: 'CSI-370', name: 'Computer Architecture',      line: 'All the way down to assembly.' },
  { code: 'CSI-281', name: 'Data Structures & Algorithms', line: 'The class everything else leans on.' },
  { code: 'SEC-250', name: 'Computer & Network Security', line: 'How things break in, so I build so they don’t.' },
  { code: 'CCC-410', name: 'Capstone Design',            line: 'ClubCRM. A real team shipping a real product.' },
];
