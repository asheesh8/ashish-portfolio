/* Shared SVG defs — paper grain, ink bleed, deckle edges.
   Mounted once in <body>; all three directions reference them by id. */

function TextureDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        {/* Coarse paper grain */}
        <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
          <feComposite in="SourceGraphic" in2="noise" operator="in" />
        </filter>

        {/* Ink bleed for printed type — softens edges + adds wobble */}
        <filter id="ink-bleed" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="0.9" />
        </filter>

        {/* Heavier woodcut roughness */}
        <filter id="woodcut" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.02" numOctaves="3" seed="2" />
          <feDisplacementMap in="SourceGraphic" scale="3.5" />
        </filter>

        {/* Riso halftone overlay */}
        <pattern id="riso-dots" patternUnits="userSpaceOnUse" width="3" height="3">
          <circle cx="1.5" cy="1.5" r="0.8" fill="currentColor" />
        </pattern>

        {/* Deckle edge mask for cards */}
        <filter id="deckle">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>
      </defs>
    </svg>
  );
}

window.TextureDefs = TextureDefs;

/* Inline data-URI grain for backgrounds (works in CSS via url(...)) */
window.GRAIN_URL =
  "url(\"data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\">' +
    '<filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" seed=\"3\"/>' +
    '<feColorMatrix values=\"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0\"/></filter>' +
    '<rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.55\"/></svg>'
  ) +
  "\")";

window.GRAIN_LIGHT =
  "url(\"data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\">' +
    '<filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"2\" seed=\"5\"/>' +
    '<feColorMatrix values=\"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0\"/></filter>' +
    '<rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/></svg>'
  ) +
  "\")";

window.FIBERS_URL =
  "url(\"data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"600\">' +
    '<filter id=\"f\"><feTurbulence type=\"turbulence\" baseFrequency=\"0.012 0.6\" numOctaves=\"2\" seed=\"9\"/>' +
    '<feColorMatrix values=\"0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.05  0 0 0 0.18 0\"/></filter>' +
    '<rect width=\"100%\" height=\"100%\" filter=\"url(%23f)\"/></svg>'
  ) +
  "\")";

window.HALFTONE_URL = (color, size = 4, dot = 1.1) =>
  "url(\"data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"' + size + '\" height=\"' + size + '\">' +
    '<circle cx=\"' + (size/2) + '\" cy=\"' + (size/2) + '\" r=\"' + dot + '\" fill=\"' + color + '\"/></svg>'
  ) +
  "\")";
