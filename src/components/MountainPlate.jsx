import { useState } from 'react';
import Lightbox from './Lightbox';
import lookoutPhoto from '../assets/vermont/IMG_4078.JPG';
import './MountainPlate.css';

const C = {
  paper:    '#ece2c8',
  paperHi:  '#f4ecd2',
  ink:      '#0d2818',
  inkSoft:  '#1a3a25',
  rust:     '#a0432b',
  rustSoft: '#c25f43',
  warm:     '#7c6a52',
  hairline: '#5a4830',
};

function LinoMountains() {
  return (
    <svg viewBox="0 0 1200 460" style={{ width: '100%', display: 'block' }}>
      <defs>
        <pattern id="hatch-h" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(0)">
          <line x1="0" y1="0" x2="8" y2="0" stroke={C.ink} strokeWidth="1.6" />
        </pattern>
        <pattern id="hatch-d" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={C.ink} strokeWidth="1.4" />
        </pattern>
        <pattern id="hatch-x" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={C.ink} strokeWidth="1" />
        </pattern>
      </defs>

      {/* Rust off-register layer */}
      <g transform="translate(6,4)" opacity="0.55" style={{ mixBlendMode: 'multiply' }}>
        <polygon points="0,460 0,300 180,160 360,260 540,140 720,230 900,120 1080,220 1200,170 1200,460" fill={C.rust} />
      </g>

      {/* Sun */}
      <circle cx="880" cy="160" r="62" fill={C.rust} opacity="0.85" />
      <circle cx="880" cy="160" r="62" fill="url(#hatch-x)" opacity="0.4" />

      {/* Far peaks */}
      <g filter="url(#woodcut)">
        <polygon
          points="0,300 120,210 250,260 360,180 470,240 580,170 700,230 820,180 940,240 1080,200 1200,250 1200,460 0,460"
          fill={C.inkSoft}
        />
      </g>

      {/* Mid peaks */}
      <g filter="url(#woodcut)">
        <polygon
          points="0,460 0,340 160,250 300,330 420,260 540,330 660,270 780,330 900,260 1040,330 1200,280 1200,460"
          fill={C.ink}
        />
      </g>

      {/* Hatched ridge */}
      <polygon
        points="0,340 160,250 300,330 420,260 540,330 660,270 780,330 900,260 1040,330 1200,280 1200,340 1100,320 940,300 800,340 660,300 540,360 420,300 300,360 160,290 60,360"
        fill="url(#hatch-d)"
        opacity="0.35"
      />

      {/* Forests climbing the mountain slopes */}
      <g filter="url(#woodcut)" opacity="0.74">
        {[
          [116, 254, 15, C.rustSoft], [146, 238, 13, C.warm], [176, 252, 14, C.rust],
          [226, 282, 12, C.rustSoft], [264, 292, 14, C.warm],
          [374, 226, 13, C.rust], [408, 210, 15, C.rustSoft], [444, 232, 13, C.warm],
          [518, 262, 12, C.rustSoft], [562, 278, 14, C.rust],
          [646, 246, 13, C.warm], [688, 260, 12, C.rustSoft],
          [792, 228, 14, C.rust], [832, 212, 13, C.warm], [878, 232, 15, C.rustSoft],
          [956, 266, 13, C.rust], [1014, 246, 12, C.warm], [1088, 238, 14, C.rustSoft],
        ].map(([x, y, h, color]) => (
          <g key={`slope-tree-${x}-${y}`}>
            <polygon points={`${x},${y - h} ${x - h * 0.42},${y + h * 0.35} ${x + h * 0.42},${y + h * 0.35}`} fill={color} />
            <polygon points={`${x},${y - h * 0.55} ${x - h * 0.5},${y + h * 0.65} ${x + h * 0.5},${y + h * 0.65}`} fill={color} opacity="0.78" />
            <rect x={x - 1} y={y + h * 0.28} width="2" height={h * 0.32} fill={C.ink} />
          </g>
        ))}
        <path
          d="M 94 268 C 150 248, 212 262, 284 294 M 358 238 C 420 214, 508 246, 576 282 M 774 236 C 842 218, 934 242, 1014 270"
          stroke={C.ink}
          strokeWidth="1.2"
          fill="none"
          opacity="0.34"
        />
      </g>

      {/* Autumn color washes tucked into the ridge */}
      <g filter="url(#woodcut)" opacity="0.78">
        <path
          d="M 92 335 C 142 294, 198 306, 248 330 C 204 342, 142 352, 92 335 Z"
          fill={C.rustSoft}
        />
        <path
          d="M 328 348 C 382 304, 448 314, 504 346 C 450 360, 382 366, 328 348 Z"
          fill={C.warm}
        />
        <path
          d="M 708 354 C 770 302, 852 312, 924 340 C 852 360, 776 368, 708 354 Z"
          fill={C.rust}
        />
        <path
          d="M 960 350 C 1018 318, 1082 324, 1134 342 C 1082 360, 1014 366, 960 350 Z"
          fill={C.rustSoft}
          opacity="0.85"
        />
        <path
          d="M 108 332 C 232 346, 384 338, 512 350 M 716 348 C 850 356, 1004 348, 1130 356"
          stroke={C.ink}
          strokeWidth="1.4"
          fill="none"
          opacity="0.4"
        />
        {[
          [92, 338, 17, C.warm],
          [116, 334, 21, C.rustSoft],
          [140, 331, 24, C.rust],
          [162, 334, 18, C.warm],
          [184, 337, 19, C.rustSoft],
          [214, 340, 20, C.rust],
          [246, 345, 17, C.warm],
          [344, 352, 18, C.rustSoft],
          [382, 350, 20, C.rust],
          [420, 348, 22, C.warm],
          [456, 351, 18, C.rustSoft],
          [492, 354, 16, C.rust],
          [724, 356, 18, C.warm],
          [748, 352, 20, C.rust],
          [774, 350, 21, C.rustSoft],
          [806, 348, 19, C.warm],
          [842, 344, 18, C.rustSoft],
          [882, 340, 24, C.rust],
          [918, 344, 19, C.warm],
          [966, 356, 17, C.rust],
          [1006, 356, 18, C.rustSoft],
          [1042, 354, 20, C.warm],
          [1080, 352, 17, C.rust],
          [1112, 350, 16, C.rustSoft],
        ].map(([x, y, h, color]) => (
          <g key={`autumn-tree-${x}`}>
            <rect x={x - 1.5} y={y - h * 0.36} width="3" height={h * 0.48} fill={C.ink} />
            <path
              d={`M ${x} ${y - h} C ${x - h * 0.5} ${y - h * 0.7}, ${x - h * 0.52} ${y - h * 0.2}, ${x} ${y - h * 0.18} C ${x + h * 0.52} ${y - h * 0.2}, ${x + h * 0.5} ${y - h * 0.72}, ${x} ${y - h} Z`}
              fill={color}
            />
            <path
              d={`M ${x - h * 0.28} ${y - h * 0.5} C ${x - 2} ${y - h * 0.42}, ${x + h * 0.2} ${y - h * 0.62}, ${x + h * 0.32} ${y - h * 0.44}`}
              stroke={C.ink}
              strokeWidth="1"
              fill="none"
              opacity="0.42"
            />
          </g>
        ))}
        {[
          [126, 350, 54, C.rustSoft],
          [384, 365, 64, C.warm],
          [782, 370, 74, C.rust],
          [1032, 366, 66, C.rustSoft],
        ].map(([x, y, w, color]) => (
          <g key={`leaf-pile-${x}`} opacity="0.92">
            <path
              d={`M ${x - w * 0.5} ${y} C ${x - w * 0.32} ${y - 16}, ${x + w * 0.32} ${y - 16}, ${x + w * 0.5} ${y} C ${x + w * 0.18} ${y + 10}, ${x - w * 0.18} ${y + 10}, ${x - w * 0.5} ${y} Z`}
              fill={color}
            />
            {[-0.32, -0.18, -0.04, 0.12, 0.28].map((offset, i) => {
              const lx = x + w * offset;
              const ly = y - 5 - (i % 2) * 4;
              const leafColor = i % 3 === 0 ? C.rust : i % 3 === 1 ? C.rustSoft : C.warm;
              return (
                <g key={`${x}-leaf-${i}`} transform={`rotate(${i % 2 ? -18 : 18} ${lx} ${ly})`}>
                  <ellipse cx={lx} cy={ly} rx="5" ry="9" fill={leafColor} />
                  <path d={`M ${lx - 3} ${ly + 4} L ${lx + 3} ${ly - 5}`} stroke={C.ink} strokeWidth="0.8" opacity="0.38" />
                </g>
              );
            })}
            <path
              d={`M ${x - w * 0.38} ${y - 2} C ${x - w * 0.1} ${y - 11}, ${x + w * 0.18} ${y - 9}, ${x + w * 0.4} ${y - 1}`}
              stroke={C.ink}
              strokeWidth="1.1"
              fill="none"
              opacity="0.42"
            />
          </g>
        ))}
      </g>

      {/* Foreground hill */}
      <g filter="url(#woodcut)">
        <path d="M 0,460 L 0,400 Q 200,330 380,390 Q 540,440 720,370 Q 900,310 1100,380 L 1200,360 L 1200,460 Z" fill={C.ink} />
      </g>

      {/* Ridge treeline */}
      <g fill={C.ink}>
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

      {/* Foreground silhouettes */}
      <g fill={C.ink}>
        {[60, 180, 290, 420, 580, 730, 880, 1010, 1140].map((x, i) => {
          const h = 38 + (i * 7) % 14;
          return (
            <g key={i}>
              <polygon points={`${x},${440 - h} ${x - 11},${440} ${x + 11},${440}`} />
              <polygon points={`${x},${430 - h - 4} ${x - 7},${430 - 4} ${x + 7},${430 - 4}`} fill={C.paper} />
              <polygon points={`${x},${432 - h - 4} ${x - 7},${432 - 4} ${x + 7},${432 - 4}`} />
            </g>
          );
        })}
      </g>

      {/* Tiny lit cabin */}
      <g transform="translate(540, 420)">
        <rect x="0" y="-12" width="14" height="12" fill={C.ink} />
        <polygon points="-2,-12 7,-19 16,-12" fill={C.ink} />
        <rect x="4" y="-9" width="3" height="3" fill={C.rustSoft} />
      </g>

    </svg>
  );
}

export default function MountainPlate() {
  const [showLookout, setShowLookout] = useState(false);

  return (
    <>
      <div className="mountain-plate-wrapper">
        <div className="mountain-plate-frame">
          <div className="mountain-svg-layer">
            <LinoMountains />
          </div>

          <div className="falling-leaves" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} className={`falling-leaf falling-leaf--${i + 1}`} />
            ))}
          </div>

          <button
            type="button"
            className="mountain-chair-hotspot"
            onClick={() => setShowLookout(true)}
            aria-label="Open lookout photo"
            title="Open lookout photo"
          >
            <svg className="mountain-chair" viewBox="0 0 96 96" aria-hidden="true">
              <path className="mountain-chair-shadow" d="M20 74 L72 80 L84 72 L32 66 Z" />
              <path className="mountain-chair-fill" d="M31 18 L62 13 L68 57 L38 60 Z" />
              <path className="mountain-chair-fill" d="M24 57 L76 52 L67 68 L18 72 Z" />
              <path d="M31 18 L62 13 L68 57 L38 60 Z" />
              <path d="M24 57 L76 52 L67 68 L18 72 Z" />
              <path d="M39 20 L44 59" />
              <path d="M48 17 L53 58" />
              <path d="M57 15 L62 56" />
              <path d="M24 47 L9 55 L15 60 L31 53" />
              <path d="M68 42 L86 45 L83 52 L70 52" />
              <path d="M24 70 L15 90" />
              <path d="M62 68 L70 90" />
              <path d="M76 54 L87 78" />
              <path d="M18 72 L12 83" />
            </svg>
          </button>
        </div>
      </div>

      {showLookout && (
        <Lightbox
          src={lookoutPhoto}
          alt="Ashish sitting on a chair looking over the mountains"
          onClose={() => setShowLookout(false)}
          total={1}
          current={0}
        />
      )}

      {/* Thin rule into About */}
      <div className="plate-double-rule">
        <div className="double-rule__top" />
        <div className="double-rule__gap" />
        <div className="double-rule__bottom" />
      </div>
    </>
  );
}
