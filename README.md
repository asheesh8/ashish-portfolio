# ashish-portfolio

Ashish Subedi's portfolio, Vermont edition. One long scroll up a trail from Lake Champlain to Camel's Hump: six painted scenes that stick while their content scrolls over them, then slide under the next one.

## Run it

```bash
npm install
npm run dev
```

## Where things live

- `src/data/content.js` holds every word on the page: client sites, builds, experience, courses, links.
- `src/data/art.js` holds the painted scenes and the two living loops (hero and contact), generated with Higgsfield.
- `src/components/Chapter.jsx` is the sticky scene. `Atmosphere.jsx` is the weather drawn over each one (glints, dust, snow, leaves, fireflies).
- `src/styles.css` has the palette and type notes at the top.

The art currently loads from Higgsfield's CDN. To ship it with the site, download the files into `public/art/` and point `art.js` at them.
