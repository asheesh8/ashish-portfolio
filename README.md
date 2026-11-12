# Ashish Subedi — Portfolio

Personal portfolio for Ashish Subedi, built as a small block world you travel through. Five scenes, each with its own generated artwork: the island (home and about), the workshop (client and custom work), the library (a bookshelf of standout classes), the depths (experience, newest on top) and the beacon (contact). Moving between them plays a portal transition.

**Live:** https://ashish-portfolio-rust.vercel.app

## Tech stack

- Vite 8 + React 19 (JavaScript), no router library: scenes live in the URL hash (`/#/library`)
- `src/world/` holds the whole site: `World.jsx` (scenes, hotbar, parallax), `portal.js` (canvas transition), `Particles.jsx`, `scenes/`, and `world.css`
- All copy is in `src/world/data.js`
- Fonts: Fraunces, Hanken Grotesk, Silkscreen (Google Fonts)
- Artwork in `src/assets/world/` was generated with Higgsfield; client screenshots are in `src/assets/work/`
- Blog and the browser-only `/admin` editor keep their earlier layout and load from `src/legacy/` only when visited

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
