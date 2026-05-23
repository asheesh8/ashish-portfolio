export const GRAIN_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">' +
  '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/>' +
  '<feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"/></filter>' +
  '<rect width="100%" height="100%" filter="url(#n)" opacity="0.55"/></svg>'
)}")`;

export const FIBERS_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">' +
  '<filter id="f"><feTurbulence type="turbulence" baseFrequency="0.012 0.6" numOctaves="2" seed="9"/>' +
  '<feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.05  0 0 0 0.18 0"/></filter>' +
  '<rect width="100%" height="100%" filter="url(#f)"/></svg>'
)}")`;

export const HALFTONE_URL = (color = 'rgba(13,40,24,0.55)', size = 4, dot = 1.1) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
    `<circle cx="${size / 2}" cy="${size / 2}" r="${dot}" fill="${color}"/></svg>`
  )}")`;
