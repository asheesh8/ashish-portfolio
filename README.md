# Ashish Subedi — Portfolio

Personal portfolio for Ashish Subedi: about, experience, projects (HomeSHINE, ThePit, Open Box, ClubCRM and more), full Champlain coursework, toolkit, a blog, and contact.

**Live:** https://ashish-portfolio-rust.vercel.app

## Tech stack

- Vite 8 + React 19 (JavaScript), one CSS file per component
- A tiny path router (`src/router.js`) — no React Router
- Light/dark theme via `src/context/ThemeContext.jsx`; design tokens live in `src/index.css`
- Fonts: Geist, Geist Mono and Instrument Serif (Google Fonts)
- Blog: built-in posts in `src/data/posts.js` plus drafts written in the browser-only `/admin` editor (`src/utils/postStorage.js`, `localStorage`)
- `design-preview/` holds standalone HTML/JSX design explorations; it is not part of the build

## Project layout

```
src/components/   Page sections (Hero, About, Projects, TechStack, Contact, ...)
src/pages/        Blog index, individual posts, admin editor
src/data/         Blog post metadata, coursework list, contact links
src/assets/       Photos used on the site (WebP, max 1800px; convert new photos before adding)
public/sw.js      Service worker
```

## Local setup

Requires Node 20+.

```bash
npm install
npm run dev
npm run lint
npm run build     # output in dist/
```

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_ADMIN_PASSWORD` | Optional password for the `/admin` blog editor. It is compiled into the public bundle, so treat it as a casual lock, not security. |

## Deploying

Hosted on Vercel with the stock Vite preset; pushes to `main` deploy to production.
