// Tiny pixel icons drawn from 12×12 character maps. Each letter is a palette key.

const PAL = {
  g: '#7fb043', G: '#4f7a2a', d: '#8a5a33', D: '#5c3a22', b: '#efe6d8', k: '#2a2238',
  l: '#ffb44d', L: '#ff7a3d', t: '#44e2c8', T: '#1f9e8f', a: '#a17cff', A: '#6b4fd1',
  r: '#d9472b', s: '#a9a3b8', S: '#6d6680', w: '#ffffff',
};

const MAPS = {
  island: [
    '....rr......',
    '...rrLr.....',
    '..rLrrrr....',
    '...rrrr.....',
    '.....D......',
    '.....D......',
    '.gggggggggg.',
    '.GgGgGgGgGG.',
    '..dDdDdDdD..',
    '...SdSdSd...',
    '....SSSS....',
    '.....SS.....',
  ],
  library: [
    '............',
    '.dddddddddd.',
    '.d.rr.tt.ld.',
    '.d.rr.tt.ld.',
    '.d.rr.tt.ld.',
    '.dddddddddd.',
    '.d.aa.l.rrd.',
    '.d.aa.l.rrd.',
    '.d.aa.l.rrd.',
    '.dddddddddd.',
    '.D........D.',
    '............',
  ],
  workshop: [
    '............',
    '..SSSSSS....',
    '.SssssssS...',
    '.SssssssSS..',
    '..SSSSSSSS..',
    '.....dd.....',
    '.....dd.....',
    '....dDDd....',
    '...lLLLLl...',
    '..lLLLLLLl..',
    '..DDDDDDDD..',
    '............',
  ],
  depths: [
    '............',
    '..tttttt....',
    '.tTTTTTTt...',
    '.....tTTt...',
    '....dDtTt...',
    '...dD..tT...',
    '..dD....t...',
    '.dD.........',
    'dD..........',
    'D...........',
    '............',
    '............',
  ],
  beacon: [
    '.....tt.....',
    '.....tt.....',
    '.....tt.....',
    '.....tt.....',
    '....twwt....',
    '...SttttS...',
    '...SSSSSS...',
    '..SsSsSsSS..',
    '..SSSSSSSS..',
    '.SsSsSsSsSS.',
    '.SSSSSSSSSS.',
    '............',
  ],
};

export default function PixelIcon({ name, size = 28 }) {
  const map = MAPS[name];
  const rects = [];
  map.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c !== '.') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={PAL[c]} />);
    })
  );
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true">
      {rects}
    </svg>
  );
}
