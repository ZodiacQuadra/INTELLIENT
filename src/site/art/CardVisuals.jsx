import { Flow, Ribbon, line, still } from './HeroScenes';

/*
  Small animated visuals for the top of a card, drawn on a 320 x 150 stage in the same glass-and-light
  language as the hero scenes: lit paths carry work, dashed paths are where it stalls.
*/
const Svg = ({ children }) => <svg viewBox="0 0 320 150" className="cv-svg" aria-hidden="true">{children}</svg>;
const Node = ({ x, y, hot, r = 6 }) => <circle cx={x} cy={y} r={r} className={`cv-node${hot ? ' hot' : ''}`} />;
const Check = ({ x, y }) => <path d={`M${x - 4} ${y} l3 3 l5 -6`} className="cv-tick" />;

// Where does work wait: the task is done quickly, then the case sits in a queue.
function Wait() {
  return (
    <Svg>
      <Flow d="M30 90 H100" lit dots={2} dur={0.9} />
      <Flow d="M100 90 H290" dashed dots={1} dur={9} />
      <Node x={30} y={90} hot />
      <Node x={100} y={90} hot r={9} />
      <Check x={100} y={90} />
      {[0, 1, 2, 3, 4].map((n) => <rect key={n} x={168 + n * 13} y={80} width="10" height="20" rx="3" className="cv-item" style={{ '--n': n }} />)}
      <g className="cv-glass" transform="translate(196 34)">
        <rect x="-18" y="-16" width="36" height="32" rx="10" />
        <path d="M-6 -8 H6 M-6 8 H6 M-5 -8 C-5 -2 5 2 5 8 M5 -8 C5 -2 -5 2 -5 8" className="cv-ink" />
      </g>
      <Node x={290} y={90} />
    </Svg>
  );
}

// Which exceptions dominate: most cases run straight, some fall into a loop that needs experienced hands.
function Exceptions() {
  const loop = 'M120 70 C140 120 210 128 220 100 S180 64 150 96 S130 110 120 70';
  return (
    <Svg>
      <Flow d="M24 70 H296" lit dots={3} dur={2.2} />
      <path d={loop} className="hs-line dash" />
      <Flow d={loop} dots={2} dur={3.2} />
      <Node x={24} y={70} hot />
      <Node x={296} y={70} hot />
      <g className="cv-glass warn" transform="translate(236 120)">
        <rect x="-16" y="-14" width="32" height="28" rx="9" />
        <path d="M0 -7 L8 7 H-8 Z M0 -2 V2 M0 4.5 V5" className="cv-ink" />
      </g>
    </Svg>
  );
}

// What changes after go-live: the new workflow runs, and the old process keeps running beside it.
function GoLive() {
  return (
    <Svg>
      <Flow d="M30 75 C70 75 70 42 112 42 H290" lit dots={3} dur={2.4} />
      <Flow d="M30 75 C70 75 70 108 112 108 H290" dashed dots={2} dur={4.8} delay={1} />
      <Node x={30} y={75} hot />
      <Node x={290} y={42} hot r={9} />
      <Check x={290} y={42} />
      <Node x={290} y={108} />
    </Svg>
  );
}

// Begin with the outcome: everything converges on the result that matters.
function Outcome() {
  return (
    <Svg>
      {[22, 40, 58].map((r) => <circle key={r} cx="160" cy="75" r={r} className="cv-ring" />)}
      <Flow d="M20 40 C70 40 100 75 138 75" dots={1} dur={2.2} />
      <Flow d="M20 116 C70 116 100 75 138 75" dots={1} dur={2.2} delay={1.1} />
      <Flow d="M300 40 C250 40 220 75 182 75" dots={1} dur={2.2} delay={0.5} />
      <Flow d="M300 116 C250 116 220 75 182 75" dots={1} dur={2.2} delay={1.6} />
      <circle cx="160" cy="75" r="14" className="cv-core" />
    </Svg>
  );
}

// Read the operation: a scan passes over the operation's timelines and lights what it finds.
function Operation() {
  const rows = [[[20, 60], [100, 40], [180, 110]], [[20, 120], [160, 30], [210, 80]], [[50, 50], [120, 90], [230, 60]], [[20, 40], [80, 150], [250, 40]]];
  return (
    <Svg>
      {rows.map((segs, r) => (
        <g key={r}>
          <line x1="20" x2="300" y1={34 + r * 27} y2={34 + r * 27} className="cv-track" />
          {segs.map(([x, w], n) => <rect key={n} x={x} y={29 + r * 27} width={w} height="10" rx="5" className="cv-seg" style={{ '--x': x / 280 }} />)}
        </g>
      ))}
      <g className="cv-scan"><line x1="20" x2="20" y1="16" y2="134" /></g>
    </Svg>
  );
}

// Stay through production: the work climbs from design to live operation without a hand-off.
function Production() {
  const path = 'M30 122 H92 V94 H158 V66 H224 V38 H292';
  return (
    <Svg>
      {[122, 94, 66, 38].map((y) => <line key={y} x1="20" x2="300" y1={y} y2={y} className="cv-track" />)}
      <path d={path} className="cv-climb" pathLength="1" />
      <Flow d={path} dots={2} dur={3.4} />
      {[[30, 122], [92, 94], [158, 66], [224, 38]].map(([x, y]) => <Node key={x} x={x} y={y} />)}
      <Node x={292} y={38} hot r={9} />
      <Check x={292} y={38} />
    </Svg>
  );
}

// Isometric projection for the card stages: u runs to the lower right, v to the lower left, z is height.
const iso = (u, v, z = 0, k = 12, ky = 5.6, y0 = 60) => [150 + (u - v) * k, y0 + (u + v) * ky - z];
const quad = (u, v, wu, wv, z, ...o) => [iso(u, v, z, ...o), iso(u + wu, v, z, ...o), iso(u + wu, v + wv, z, ...o), iso(u, v + wv, z, ...o)];
const pts = (list) => list.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
const seg = (a, b) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
const screen = (x, y) => [x, y];

// A light flare where an edge of glass catches the light.
const Flare = ({ p, r = 9 }) => (
  <g className="cv-flare">
    <circle cx={p[0]} cy={p[1]} r={r} fill="url(#cv-flare)" />
    <circle cx={p[0]} cy={p[1]} r="1.6" className="dot" />
  </g>
);

// One sheet of glass: a translucent blue face, a soft sheen, dim back edges and bright front edges.
function Sheet({ q, back }) {
  return (
    <g className={`cvd-sheet${back ? ' back' : ''}`}>
      <polygon points={pts(q)} fill={back ? 'url(#cvd-back)' : 'url(#cvd-glass)'} />
      <polygon points={pts(q)} fill="url(#cvd-sheen)" className="sheen" />
      <path d={`${seg(q[3], q[0])} ${seg(q[0], q[1])}`} className="edge dim" />
      <path d={`${seg(q[3], q[2])} ${seg(q[2], q[1])}`} className="edge" />
    </g>
  );
}

// The Designed Enterprise: the intended operation as neat layers of glass, each a larger sheet behind
// and a smaller one in front, lit along their edges.
const DESIGNED_FLOOR = (() => { const g = []; [92, 98, 106, 116, 129, 146].forEach((y) => g.push(`M-20 ${y} H340`)); for (let k = -10; k <= 10; k += 1) g.push(`M${160 + k * 12} 86 L${160 + k * 58} 170`); return g.join(" "); })();
function Designed() {
  const o = [12.5, 5.8, 66];
  const layers = [0, 28, 56];
  const sheets = (z) => [quad(3.2, -1.8, 7, 5, z, ...o), quad(-0.2, 1.8, 6.6, 4.6, z, ...o)];
  return (
    <Svg>
      <defs>
        <linearGradient id="cvd-glass" x1="0" y1="0.2" x2="1" y2="0.8">
          <stop offset="0%" stopColor="#4f9bff" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#1f5fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0b2a80" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="cvd-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0b2a80" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="cvd-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#cfeaff" stopOpacity="0.22" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cv-flare">
          <stop offset="0%" stopColor="#e6f4ff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#3f8cff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3f8cff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cvd-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="cvd-reflect"><rect x="0" y="118" width="320" height="40" fill="url(#cvd-fade)" /></mask>
        <linearGradient id="cvd-gfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.45" stopColor="#fff" stopOpacity="0.9" /><stop offset="1" stopColor="#fff" stopOpacity="0.4" /></linearGradient>
        <mask id="cvd-gmask"><rect x="-20" y="80" width="360" height="90" fill="url(#cvd-gfade)" /></mask>
      </defs>
      {/* The same lit floor as the Observed and Lived cards, so the visual sits on the card edge. */}
      <path d={DESIGNED_FLOOR} className="cvo-grid" mask="url(#cvd-gmask)" />
      <Ribbon cps={[[-20, 150], [80, 138], [180, 140], [260, 132], [345, 122]]} spread={10} strands={8} id={2} project={screen} light small />
      {/* A faint reflection of the lowest layer on the floor. */}
      <g mask="url(#cvd-reflect)" transform="translate(0 236) scale(1 -1)">
        {sheets(-8).map((q, k) => <polygon key={k} points={pts(q)} fill="url(#cvd-back)" />)}
      </g>
      {layers.map((z, n) => {
        const [back, front] = sheets(z);
        return (
          <g key={z} className="cvd-layer" style={{ '--n': n, opacity: 0.6 + n * 0.2 }}>
            <Sheet q={back} back />
            <Sheet q={front} />
            <Flare p={front[2]} r={n === 2 ? 14 : 10} />
            <Flare p={back[1]} r={8} />
            {n === 2 && <Flare p={front[3]} r={7} />}
          </g>
        );
      })}
    </Svg>
  );
}

// A small glass cube in screen space: (x, y) is its top vertex, s its edge.
function Box({ x, y, s, n }) {
  const dx = s * 0.866;
  const dy = s * 0.5;
  return (
    <g className="cvo-box" style={{ '--n': n }}>
      <ellipse cx={x} cy={y + 2 * dy + s + 3} rx={dx * 1.3} ry={dy * 0.7} className="cv-pool" />
      <polygon points={`${x - dx},${y + dy} ${x},${y + 2 * dy} ${x},${y + 2 * dy + s} ${x - dx},${y + dy + s}`} fill="url(#cvo-l)" />
      <polygon points={`${x},${y + 2 * dy} ${x + dx},${y + dy} ${x + dx},${y + dy + s} ${x},${y + 2 * dy + s}`} fill="url(#cvo-r)" />
      <polygon points={`${x},${y} ${x + dx},${y + dy} ${x},${y + 2 * dy} ${x - dx},${y + dy}`} fill="url(#cvo-t)" />
      <path d={`M${x - dx} ${y + dy} L${x} ${y} L${x + dx} ${y + dy}`} className="edge hot" />
      <path d={`M${x - dx} ${y + dy} L${x} ${y + 2 * dy} L${x + dx} ${y + dy} M${x} ${y + 2 * dy} V${y + 2 * dy + s} M${x - dx} ${y + dy} V${y + dy + s} L${x} ${y + 2 * dy + s} L${x + dx} ${y + dy + s} V${y + dy}`} className="edge" />
      <circle cx={x} cy={y + 2 * dy + s} r="1.6" className="dot" />
    </g>
  );
}

// The Observed Enterprise: what actually happens, as streams of activity sweeping across a lit floor,
// with signals rising from it and blocks of work along the way.
function Observed() {
  const grid = [];
  [92, 98, 106, 116, 129, 146].forEach((y) => grid.push(`M-20 ${y} H340`));
  for (let k = -10; k <= 10; k += 1) grid.push(`M${160 + k * 12} 86 L${160 + k * 58} 170`);
  const beams = [[44, 46, 118], [70, 70, 112], [100, 24, 104], [140, 40, 98], [182, 58, 94], [212, 28, 90], [246, 50, 84]];
  return (
    <Svg>
      <defs>
        <linearGradient id="cvo-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.4" />
        </linearGradient>
        <mask id="cvo-mask"><rect x="-20" y="80" width="360" height="90" fill="url(#cvo-fade)" /></mask>
        <linearGradient id="cvo-t" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fcbff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2f6fe8" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="cvo-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f5fff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0b2a80" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="cvo-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0d3a9a" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="cvo-pane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fb4ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1f5fff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d={grid.join(' ')} className="cvo-grid" mask="url(#cvo-mask)" />
      {beams.map(([x, y1, y2], n) => (
        <g key={x} className="cv-beam" style={{ '--n': n }}>
          <line x1={x} x2={x} y1={y1} y2={y2} />
          <circle cx={x} cy={y1} r="2" />
        </g>
      ))}
      <path d="M272 16 L298 4 V60 L272 72 Z" fill="url(#cvo-pane)" className="cvo-pane" />
      <Ribbon cps={[[-20, 116], [40, 122], [90, 142], [120, 170]]} spread={12} strands={7} id={1} project={screen} light small />
      <Ribbon cps={[[-20, 152], [70, 128], [150, 112], [230, 98], [300, 74], [345, 56]]} spread={18} strands={12} id={0} project={screen} light small />
      <Box x={42} y={100} s={18} n={0} />
      <Box x={118} y={58} s={22} n={1} />
      <Box x={248} y={36} s={18} n={2} />
      <Box x={246} y={92} s={28} n={3} />
    </Svg>
  );
}

// The Lived Enterprise: people carry the work between them along a winding path until it becomes a
// document; one stage is a conversation more than a step.
function Lived() {
  const tile = (x, y, kind, n) => (
    <g key={x} className={`cvl-tile${kind === 'doc' ? ' hot' : ''}`} style={{ '--n': n }} transform={`translate(${x} ${y})`}>
      <rect x="-24" y="-30" width="48" height="58" rx="7" fill="url(#cvl-glass)" />
      <rect x="-24" y="-30" width="48" height="58" rx="7" fill="url(#cvl-sheen)" />
      <rect x="-24" y="-30" width="48" height="58" rx="7" className="rim" />
      <path d="M-16 -29.5 H16" className="shine" />
      {kind === 'person' && <><circle cx="0" cy="-6" r="7" className="cv-ink" /><path d="M-12 16 V12 a12 9 0 0 1 24 0 V16 Z" className="cv-ink" /></>}
      {kind === 'globe' && <><circle cx="0" cy="-1" r="15" className="cv-ink" /><ellipse cx="0" cy="-1" rx="6" ry="15" className="cv-ink" /><path d="M-15 -1 H15 M-12 -9 H12 M-12 7 H12" className="cv-ink thin" /></>}
      {kind === 'doc' && <><path d="M-11 -18 H5 L12 -11 V18 H-11 Z" className="cvl-doc" /><path d="M-6 -6 H7 M-6 0 H7 M-6 6 H7 M-6 12 H3" className="cvl-lines" /></>}
    </g>
  );
  const beams = [[14, 62, 128], [30, 40, 126], [100, 30, 108], [176, 44, 110], [236, 24, 100], [306, 34, 92]];
  const wave = [[-20, 112], [20, 106], [54, 84], [90, 92], [124, 86], [160, 76], [198, 82], [236, 72], [272, 68], [345, 50]];
  return (
    <Svg>
      <defs>
        <linearGradient id="cvl-glass" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#6fb4ff" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#0d3a9a" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="cvl-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#cfeaff" stopOpacity="0.16" />
          <stop offset="0.65" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Ribbon cps={[[-20, 168], [100, 140], [220, 132], [345, 116]]} spread={10} strands={6} id={2} project={screen} light small />
      {beams.map(([x, y1, y2], n) => (
        <g key={x} className="cv-beam" style={{ '--n': n }}>
          <line x1={x} x2={x} y1={y1} y2={y2} />
          <circle cx={x} cy={y1} r="1.8" />
        </g>
      ))}
      <Ribbon cps={wave} spread={10} strands={7} id={0} project={screen} light small />
      {tile(54, 82, 'person', 0)}
      {tile(124, 80, 'globe', 1)}
      {tile(198, 76, 'person', 2)}
      {tile(272, 66, 'doc', 3)}
      {[[89, 92], [161, 76], [235, 72]].map(([x, y], n) => <circle key={x} cx={x} cy={y} r="3" className="cvl-node" style={{ '--n': n }} />)}
    </Svg>
  );
}

/* ---------- Six clocks: visuals set into the right side of a card, on a 240 x 150 stage ---------- */

const Side = ({ children }) => <svg viewBox="0 0 240 150" className="cv-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">{children}</svg>;
const Glow = ({ x, y, r = 3, n = 0, big }) => <circle cx={x} cy={y} r={r} className={`ck-node${big ? ' big' : ''}`} style={{ '--n': n }} />;

// Touch time: the effort is a single point of activity, rippling out.
function Touch() {
  const rings = [14, 26, 40, 56, 74, 94];
  const at = (r, deg) => [130 + r * Math.cos((deg * Math.PI) / 180), 76 + r * 0.42 * Math.sin((deg * Math.PI) / 180)];
  return (
    <Side>
      <path d="M130 8 V144 M20 76 H236" className="ck-axis" />
      {rings.map((r, k) => <ellipse key={r} cx="130" cy="76" rx={r} ry={r * 0.42} className={`ck-ring${k > 3 ? ' dash' : ''}`} />)}
      <ellipse cx="130" cy="76" rx="14" ry="6" className="ck-ripple" />
      <ellipse cx="130" cy="76" rx="14" ry="6" className="ck-ripple two" />
      <ellipse cx="130" cy="76" rx="9" ry="4.5" className="ck-core" />
      {[[40, 200], [56, 330], [74, 160], [94, 20], [26, 70]].map(([r, d], n) => { const [x, y] = at(r, d); return <Glow key={n} x={x} y={y} r={2} n={n} />; })}
      <Glow x={130} y={30} r={2.6} n={2} />
    </Side>
  );
}

// Wait time: the case stands in a queue of panes, moving slowly from one to the next.
function Queue() {
  const panes = [0, 1, 2, 3, 4].map((k) => ({ x: 58 + k * 34, y: 22 + k * 9, w: 24 - k * 1.5, h: 104 - k * 13, skew: 8 - k }));
  const d = 'M40 64 L232 112';
  return (
    <Side>
      <path d={d} className="ck-queue" />
      {panes.map(({ x, y, w, h, skew }, k) => (
        <g key={k} className="ck-pane" style={{ '--n': k }}>
          <path d={`M${x} ${y} L${x + w} ${y + skew} V${y + skew + h} L${x} ${y + h} Z`} className="face" />
          <path d={`M${x} ${y + h} V${y} L${x + w} ${y + skew}`} className="rim" />
          <path d={`M${x + w} ${y + skew} V${y + skew + h}`} className="side" />
        </g>
      ))}
      {[60, 98, 132, 166, 200].map((x, n) => <Glow key={x} x={x} y={64 + (x - 40) * 0.25} r={1.8} n={n} />)}
      {!still() && <circle r="2.8" className="hs-dot"><animateMotion dur="9s" repeatCount="indefinite" path={d} keyPoints="0;0.22;0.22;0.4;0.4;0.6;0.6;0.8;0.8;1" keyTimes="0;0.1;0.25;0.35;0.5;0.6;0.72;0.8;0.92;1" calcMode="linear" /></circle>}
    </Side>
  );
}

// Coordination load: many threads of chasing and routing, all pulled to one point.
function Routing() {
  const goal = [226, 64];
  const starts = [[40, 30], [30, 52], [24, 74], [36, 96], [52, 120], [70, 140], [60, 14]];
  const paths = starts.map(([x, y], k) => {
    const mx = 120 + (k % 3) * 14;
    return `M${x} ${y} C${mx} ${y + (k % 2 ? 18 : -14)} ${mx + 30} ${goal[1] + (y - goal[1]) * 0.4} ${goal[0]} ${goal[1]}`;
  });
  return (
    <Side>
      {paths.map((d, k) => <path key={k} d={d} className={`ck-thread${k === 2 ? ' lit' : ''}`} />)}
      {[[120, 36], [150, 46], [104, 80], [142, 74], [168, 94], [178, 30], [126, 112], [196, 70]].map(([x, y], n) => <Glow key={n} x={x} y={y} r={n % 3 ? 2 : 2.8} n={n} />)}
      {!still() && [0, 3, 5].map((k, n) => (
        <circle key={k} r="2.2" className="hs-dot"><animateMotion dur="3.2s" begin={`-${n * 1.1}s`} repeatCount="indefinite" path={paths[k]} /></circle>
      ))}
      <path d={`M${goal[0]} ${goal[1]} l18 -10 M${goal[0]} ${goal[1]} l20 4 M${goal[0]} ${goal[1]} l14 14`} className="ck-flare" />
      <Glow x={goal[0]} y={goal[1]} r={4.5} big />
    </Side>
  );
}

// Rework: the same sheet of work, corrected and stacked again and again.
function Rework() {
  const iso = (u, v, z) => [120 + (u - v) * 13, 52 + (u + v) * 6.4 - z];
  const quad = (z) => [iso(0, 0, z), iso(7, 0, z), iso(7, 5, z), iso(0, 5, z)];
  const pp = (q) => q.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
  return (
    <Side>
      <defs>
        <linearGradient id="ck-sheet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fcbff" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#3f8cff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1f5fff" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {[-18, 4, 26, 48].map((z, n) => {
        const q = quad(z);
        return (
          <g key={z} className="ck-layer" style={{ '--n': 3 - n }}>
            <polygon points={pp(q)} className="face" />
            <polygon points={pp(q)} className="edge" />
            <path d={`M${q[3][0]} ${q[3][1]} L${q[2][0]} ${q[2][1]} L${q[1][0]} ${q[1][1]}`} className="lit" />
          </g>
        );
      })}
    </Side>
  );
}

// Decision latency: two lines of evidence travel apart and wait to be joined into one authorised action.
function Decision() {
  const end = [214, 74];
  const a = `M24 60 H86 C112 60 118 34 150 34 S184 50 ${end[0]} ${end[1]}`;
  const b = `M24 88 H86 C112 88 124 116 156 112 S190 96 ${end[0]} ${end[1]}`;
  return (
    <Side>
      <path d={a} className="ck-thread lit" />
      <path d={b} className="ck-thread lit" />
      {!still() && [a, b].map((d, k) => (
        <circle key={k} r="2.4" className="hs-dot"><animateMotion dur="3.6s" begin={`-${k * 1.8}s`} repeatCount="indefinite" path={d} /></circle>
      ))}
      {[[86, 60], [86, 88], [150, 34], [134, 106], [182, 52]].map(([x, y], n) => <Glow key={n} x={x} y={y} r={3} n={n} />)}
      <circle cx={end[0]} cy={end[1]} r="11" className="ck-halo" />
      <Glow x={end[0]} y={end[1]} r={5} big />
    </Side>
  );
}

// Elapsed time: the whole journey end to end, arriving at the point the customer actually feels.
function Elapsed() {
  const grid = [];
  for (let x = 30; x <= 230; x += 20) grid.push(`M${x} 14 V138`);
  for (let y = 14; y <= 138; y += 20) grid.push(`M30 ${y} H230`);
  return (
    <Side>
      <path d={grid.join(' ')} className="ck-grid" />
      <path d="M40 76 H200" className="ck-thread lit" />
      {!still() && <circle r="2.6" className="hs-dot"><animateMotion dur="4s" repeatCount="indefinite" path="M40 76 H200" /></circle>}
      {[40, 80, 120, 160].map((x, n) => <Glow key={x} x={x} y={76} r={3.2} n={n} />)}
      {[30, 20].map((r) => <circle key={r} cx="204" cy="76" r={r} className="ck-target" />)}
      <circle cx="204" cy="76" r="13" className="ck-halo" />
      <circle cx="204" cy="76" r="8" className="ck-end" />
    </Side>
  );
}

/* ---------- Four treatments: small charts set into a card's top-right corner, on a 200 x 110 stage ---------- */

const Corner = ({ children }) => <svg viewBox="0 0 200 110" className="cv-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">{children}</svg>;
const cornerGrid = (cols, rows) => {
  const g = [];
  for (let x = 20; x <= 190; x += 170 / cols) g.push(`M${x.toFixed(1)} 10 V100`);
  for (let y = 10; y <= 100; y += 90 / rows) g.push(`M20 ${y.toFixed(1)} H190`);
  return g.join(' ');
};

// Eliminate: a jagged run of variation, where the avoidable steps drop away and the line runs clean.
function Eliminate() {
  const pts = [[28, 58], [52, 34], [74, 66], [96, 48], [120, 80], [146, 40], [170, 22]];
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      <path d={`M${pts.map((p) => p.join(' ')).join(' L')}`} className="tc-line" />
      <path d="M28 58 L96 48 L170 22" className="tc-line clean" />
      {pts.map(([x, y], k) => <circle key={x} cx={x} cy={y} r={k % 2 ? 2.2 : 3} className={`tc-node${k % 2 ? ' gone' : ''}`} style={{ '--n': k }} />)}
    </Corner>
  );
}

// Standardise: two ways of handling the same case draw together into one testable rule.
function Standardise() {
  const a = 'M20 70 C50 30 80 30 104 56 S150 64 186 46';
  const b = 'M20 40 C52 76 82 78 106 56 S150 40 186 46';
  return (
    <Corner>
      <path d={cornerGrid(6, 4)} className="tc-grid" />
      <path d={a} className="tc-line soft" />
      <path d={b} className="tc-line soft" />
      <path d="M104 56 C130 60 150 52 186 46" className="tc-line clean" />
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="3.6s" repeatCount="indefinite" path={a} /></circle>}
      <circle cx="104" cy="56" r="4" className="tc-node hot" />
      <circle cx="186" cy="46" r="3" className="tc-node" />
    </Corner>
  );
}

// Assist: from a field of records, the few that matter are drawn together around the case.
function Assist() {
  const cells = [];
  for (let r = 0; r < 5; r += 1) for (let c = 0; c < 8; c += 1) cells.push([36 + c * 20, 18 + r * 19]);
  const picked = [[76, 37], [116, 18], [136, 75], [96, 94], [156, 37]];
  const hub = [116, 56];
  return (
    <Corner>
      <path d={cornerGrid(8, 5)} className="tc-grid" />
      {cells.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" className="tc-dot" />)}
      {picked.map(([x, y]) => <path key={x + y} d={`M${x} ${y} L${hub[0]} ${hub[1]}`} className="tc-link" />)}
      {picked.map(([x, y], k) => <circle key={`p${x}${y}`} cx={x} cy={y} r="2.6" className="tc-node" style={{ '--n': k }} />)}
      <circle cx={hub[0]} cy={hub[1]} r="9" className="tc-halo" />
      <circle cx={hub[0]} cy={hub[1]} r="4" className="tc-node hot" />
    </Corner>
  );
}

// Escalate with structure: the case climbs step by step to the one person who can decide it.
function Escalate() {
  const d = 'M20 92 C60 90 76 70 96 58 S132 30 150 30 S176 40 190 44';
  return (
    <Corner>
      <path d={cornerGrid(6, 4)} className="tc-grid" />
      <path d={d} className="tc-line" />
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="3.4s" repeatCount="indefinite" path={d} /></circle>}
      {[[58, 84], [96, 58], [124, 38]].map(([x, y], k) => <circle key={x} cx={x} cy={y} r="2.6" className="tc-node" style={{ '--n': k }} />)}
      <circle cx="150" cy="30" r="10" className="tc-halo" />
      <circle cx="150" cy="30" r="4.2" className="tc-node hot" />
      <circle cx="190" cy="44" r="2.2" className="tc-node" />
    </Corner>
  );
}

/* ---------- Technology: product cards (200 x 110 corner stage) ---------- */

// Unify your data: loose strands from many systems drawn through one bright point.
function Unify() {
  const hub = [118, 56];
  const lines = Array.from({ length: 9 }, (_, k) => {
    const a = (k - 4) * 9;
    return `M0 ${56 + a * 1.1} C40 ${56 + a * 1.6} 80 ${56 - a * 0.6} ${hub[0]} ${hub[1]} S170 ${56 + a * 1.8} 210 ${56 + a * 2.4}`;
  });
  return (
    <Corner>
      {lines.map((d, k) => <path key={d} d={d} className={`tc-strand${k === 4 ? ' lit' : ''}`} />)}
      {[[44, 46], [70, 66], [150, 40], [176, 78], [90, 50], [192, 26]].map(([x, y], n) => <circle key={x} cx={x} cy={y} r="1.9" className="tc-node" style={{ '--n': n }} />)}
      {[16, 10].map((r) => <circle key={r} cx={hub[0]} cy={hub[1]} r={r} className="tc-ring" />)}
      <circle cx={hub[0]} cy={hub[1]} r="9" className="tc-halo" />
      <circle cx={hub[0]} cy={hub[1]} r="3.6" className="tc-node hot" />
      {!still() && <circle r="2" className="hs-dot"><animateMotion dur="3.4s" repeatCount="indefinite" path={lines[4]} /></circle>}
    </Corner>
  );
}

// Intelligent orchestration: bars of light rising as work is coordinated, the latest the tallest.
function Orchestrate() {
  const bars = [[40, 30], [58, 22], [76, 40], [94, 34], [112, 58], [130, 50], [148, 76], [166, 92], [184, 70]];
  return (
    <Corner>
      {bars.map(([x, h], n) => (
        <g key={x} className="tc-bar" style={{ '--n': n }}>
          <line x1={x} x2={x} y1={104} y2={104 - h} className="beam" />
          <rect x={x - 2.5} y={104 - h - 2} width="5" height="4" rx="1" className="cap" />
        </g>
      ))}
    </Corner>
  );
}

// Govern with confidence: strands of activity crossing, each checkpoint marked as it passes.
function Govern() {
  const ws = [
    'M0 70 C40 66 60 40 100 46 S160 86 210 60',
    'M0 52 C50 60 70 78 108 70 S170 30 210 38',
    'M0 84 C44 80 80 58 120 60 S180 74 210 90',
  ];
  return (
    <Corner>
      {ws.map((d, k) => <path key={d} d={d} className={`tc-strand${k === 0 ? ' lit' : ''}`} />)}
      {[[58, 50], [100, 46], [148, 74], [184, 50], [30, 66]].map(([x, y], n) => <circle key={x} cx={x} cy={y} r={n === 2 ? 3 : 2.2} className="tc-node" style={{ '--n': n }} />)}
      {!still() && <circle r="2" className="hs-dot"><animateMotion dur="3.8s" repeatCount="indefinite" path={ws[0]} /></circle>}
    </Corner>
  );
}

/* ---------- Technology: production cards (240 x 150 corner stage) ---------- */

const Wide = ({ children }) => <svg viewBox="0 0 240 150" className="cv-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">{children}</svg>;
// A glass sheet seen from above at an angle, centred at (x, y): a translucent top with a hairline edge and
// a thin lit side. The one that matters is the site's hot glass.
const sheet = (x, y, w = 46, d = 22) => `M${x - w} ${y} L${x} ${y - d} L${x + w} ${y} L${x} ${y + d} Z`;
const Sheets = ({ x, y, n = 3, gap = 15, hot = 0 }) => (
  <>
    {Array.from({ length: n }, (_, k) => n - 1 - k).map((k) => (
      <g key={k} className={`tp-sheet${k === hot ? ' hot' : ''}`}>
        <path d={`M${x - 46} ${y + k * gap} L${x} ${y + k * gap + 22} L${x + 46} ${y + k * gap} V${y + k * gap + 4} L${x} ${y + k * gap + 26} L${x - 46} ${y + k * gap + 4} Z`} className="side" />
        <path d={sheet(x, y + k * gap)} className="face" />
      </g>
    ))}
  </>
);
// The site's liquid-glass orb, in miniature: the same swirl of light and dark blues behind a bright rim.
const Orb = ({ x, y, r, id }) => (
  <g className="tp-orb">
    <defs>
      <radialGradient id={`${id}-a`} cx="32%" cy="26%" r="80%">
        <stop offset="0" stopColor="#e9f6ff" />
        <stop offset="0.22" stopColor="#9fdcff" />
        <stop offset="0.5" stopColor="#3a63c9" />
        <stop offset="0.78" stopColor="#0b1a44" />
        <stop offset="1" stopColor="#4aa3ff" />
      </radialGradient>
    </defs>
    <circle cx={x} cy={y} r={r * 1.9} className="halo" />
    <circle cx={x} cy={y} r={r} fill={`url(#${id}-a)`} className="ball" />
    <ellipse cx={x - r * 0.3} cy={y - r * 0.45} rx={r * 0.42} ry={r * 0.22} className="shine" />
  </g>
);
// Particles: small lights resting along a path, the site's twinkle on each.
const Motes = ({ pts }) => pts.map(([x, y, r = 1.6], n) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} className="tp-mote" style={{ '--n': n % 7 }} />);

// IntelliLink: evidence from many sources streams in as lines of particles and settles on the layers.
function Context() {
  const ends = [[150, 58], [150, 74], [150, 90]];
  const streams = ends.flatMap(([x, y], k) => [0, 1].map((j) => `M${16 + j * 10} ${34 + k * 36 + j * 14} C66 ${38 + k * 32 + j * 8} 104 ${y - 2} ${x} ${y}`));
  return (
    <Wide>
      {streams.map((d, k) => <path key={d} d={d} className={`tp-stream${k % 2 ? '' : ' lit'}`} />)}
      <Motes pts={[[34, 40], [52, 50, 2.2], [40, 88], [70, 70], [58, 112, 2.2], [92, 58], [96, 96], [118, 74, 2.2]]} />
      <Sheets x={188} y={60} hot={0} />
      {ends.map(([x, y]) => <circle key={y} cx={x} cy={y} r="2.4" className="tc-node hot" />)}
      {!still() && [0, 2, 4].map((k, n) => <circle key={k} r="2" className="hs-dot"><animateMotion dur="2.8s" begin={`-${n * 0.9}s`} repeatCount="indefinite" path={streams[k]} /></circle>)}
    </Wide>
  );
}

// Intellient Core: the work held on its layers while state, the liquid-glass orb, sits above them, and the
// parts of the work orbit around it.
function CoreStack() {
  const orbit = 'M66 60 A84 22 0 1 1 234 60 A84 22 0 1 1 66 60';
  return (
    <Wide>
      <ellipse cx="150" cy="60" rx="84" ry="22" className="tp-orbit" />
      <Sheets x={150} y={80} n={3} gap={14} hot={0} />
      <path d="M66 60 A84 22 0 0 0 234 60" className="tp-orbit front" />
      <Orb x={150} y={46} r={13} id="tp-core" />
      <Motes pts={[[74, 66, 2.4], [226, 54, 2.4], [188, 80], [110, 40]]} />
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="7s" repeatCount="indefinite" path={orbit} /></circle>}
    </Wide>
  );
}

// IntelliSphere: authority held inside a sphere of glass, with checks circling it.
function ShieldOrb() {
  const orbit = 'M88 80 A72 18 0 1 1 232 80 A72 18 0 1 1 88 80';
  return (
    <Wide>
      <ellipse cx="160" cy="80" rx="72" ry="18" className="tp-orbit" />
      <circle cx="160" cy="70" r="52" className="tp-halo" />
      <circle cx="160" cy="70" r="40" className="tp-sphere" />
      <ellipse cx="146" cy="46" rx="16" ry="7" className="tp-shine" />
      <path d="M160 48 L178 55 V70 C178 82 170 89 160 93 C150 89 142 82 142 70 V55 Z" className="tp-shield" />
      <path d="M152 70 L158 76 L169 63" className="tp-tick" />
      <path d="M88 80 A72 18 0 0 0 232 80" className="tp-orbit front" />
      <Motes pts={[[96, 86, 2.4], [224, 74, 2.4], [190, 96], [122, 95]]} />
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="6s" repeatCount="indefinite" path={orbit} /></circle>}
    </Wide>
  );
}

/* ---------- Intellient Blueprint: isometric card visuals (320 x 150) ---------- */

// Isometric helpers for these cards: (u, v) on the floor, z up.
const bi = (u, v, z = 0) => [160 + (u - v) * 13, 52 + (u + v) * 6.5 - z];
const bpts = (list) => list.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
// A glass slab: top face, two sides, of footprint (w x d) and height h.
function Slab({ u, v, w, d, h = 6, z = 0, hot, children, cls = '' }) {
  const t = [bi(u, v, z + h), bi(u + w, v, z + h), bi(u + w, v + d, z + h), bi(u, v + d, z + h)];
  const l = [bi(u, v + d, z + h), bi(u + w, v + d, z + h), bi(u + w, v + d, z), bi(u, v + d, z)];
  const r = [bi(u + w, v, z + h), bi(u + w, v + d, z + h), bi(u + w, v + d, z), bi(u + w, v, z)];
  const [cx, cy] = bi(u + w / 2, v + d / 2, z + h);
  return (
    <g className={`bs${hot ? ' hot' : ''} ${cls}`}>
      <polygon points={bpts(l)} className="l" />
      <polygon points={bpts(r)} className="r" />
      <polygon points={bpts(t)} className="t" />
      {children && <g transform={`translate(${cx} ${cy}) scale(1 0.55) rotate(45)`} className="mk">{children}</g>}
    </g>
  );
}
const bpFloor = () => {
  const g = [];
  for (let k = -6; k <= 14; k += 2) { g.push(`M${bi(k, -6)[0]} ${bi(k, -6)[1]} L${bi(k, 14)[0]} ${bi(k, 14)[1]}`); g.push(`M${bi(-6, k)[0]} ${bi(-6, k)[1]} L${bi(14, k)[0]} ${bi(14, k)[1]}`); }
  return <path d={g.join(' ')} className="bs-floor" />;
};

// Workflow design: the steps of the future workflow laid out and joined.
function BpFlow() {
  const link = (a, b) => `M${bi(...a)[0]} ${bi(...a)[1]} L${bi(...b)[0]} ${bi(...b)[1]}`;
  return (
    <Svg>
      {bpFloor()}
      <path d={[link([1, 3.5], [4, 3.5]), link([4, 3.5], [4, 0.5]), link([5.5, 1], [7.5, 1]), link([4, 5], [4, 7.5]), link([5.5, 8.5], [7.5, 8.5]), link([7.5, 2.5], [7.5, 7])].join(' ')} className="bs-link" />
      {!still() && <circle r="2.6" className="hs-dot"><animateMotion dur="3.6s" repeatCount="indefinite" path={`${link([1, 3.5], [4, 3.5])} ${link([4, 3.5], [4, 7.5]).replace('M', 'L')} ${link([4, 7.5], [7.5, 8.5]).replace('M', 'L')}`} /></circle>}
      <Slab u={-1.5} v={2.6} w={1.6} d={1.6} h={4} cls="disc" />
      <Slab u={2.5} v={-1} w={3} d={2.6} h={6}><rect x="-6" y="-5" width="12" height="10" rx="2" className="ink" /></Slab>
      <Slab u={2.5} v={4.6} w={3} d={2.6} h={6}><path d="M-6 -4 H6 M-6 0 H6 M-6 4 H2" className="ink" /></Slab>
      <Slab u={6} v={-0.6} w={3.2} d={2.8} h={7} hot><circle cx="-4" cy="-3" r="2" className="ink" /><circle cx="4" cy="-3" r="2" className="ink" /><circle cx="0" cy="4" r="2" className="ink" /><path d="M-4 -3 L4 -3 M-4 -3 L0 4" className="ink" /></Slab>
      <Slab u={6.2} v={7.2} w={3} d={2.6} h={7} hot><circle r="4.5" className="ink" /><circle r="1.5" className="ink" /></Slab>
    </Svg>
  );
}

// Authority model: the systems of record stacked, with authority sitting on top.
function BpAuth() {
  return (
    <Svg>
      {bpFloor()}
      {[0, 20, 40].map((z, k) => (
        <Slab key={z} u={1} v={1} w={6} d={6} h={5} z={z} cls="dim">
          {k === 0 && <><rect x="-5" y="-3" width="4" height="3" className="ink" /><rect x="1" y="-3" width="4" height="3" className="ink" /><rect x="-5" y="1" width="4" height="3" className="ink" /><rect x="1" y="1" width="4" height="3" className="ink" /></>}
          {k === 1 && <path d="M-5 2 a3 3 0 0 1 1 -5.5 a4 4 0 0 1 7.5 0.5 a2.6 2.6 0 0 1 0 5 Z" className="ink" />}
          {k === 2 && <><ellipse cy="-3" rx="5" ry="2" className="ink" /><path d="M-5 -3 V3 A5 2 0 0 0 5 3 V-3" className="ink" /></>}
        </Slab>
      ))}
      {[[1, 1], [7, 1], [1, 7], [7, 7]].map(([u, v]) => { const [x, y1] = bi(u, v, 62); const [, y2] = bi(u, v, 5); return <line key={`${u}${v}`} x1={x} x2={x} y1={y1} y2={y2} className="bs-guide bs-march" />; })}
      <g className="bs-breathe"><Slab u={0.5} v={0.5} w={7} d={7} h={6} z={60} hot><path d="M0 -13 L11 -8.5 V1 C11 8 5.5 11.5 0 13.5 C-5.5 11.5 -11 8 -11 1 V-8.5 Z" className="ink bold" /><path d="M-4.5 0.5 L-1 4 L5 -3" className="ink bold" /></Slab></g>
    </Svg>
  );
}

// Accountability: one person at the centre of the decision, others connected around them.
function BpAccount() {
  const person = (x, y, s, hot) => (
    <g className={`bs-person${hot ? ' hot' : ''}`} transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="22" rx="20" ry="7" className="base" />
      <ellipse cx="0" cy="18" rx="20" ry="7" className="top" />
      <circle cx="0" cy="0" r="15" className="bub" />
      <circle cx="0" cy="-3" r="4.5" className="ink" />
      <path d="M-8 9 a8 6.5 0 0 1 16 0 Z" className="ink" />
    </g>
  );
  return (
    <Svg>
      {bpFloor()}
      <path d="M100 82 L160 104 L220 82 M160 104 L160 56" className="bs-link" />
      {!still() && ['M100 82 L160 104', 'M220 82 L160 104', 'M160 56 L160 104'].map((p, k) => <circle key={p} r="2.4" className="hs-dot"><animateMotion dur="2.4s" begin={`-${k * 0.8}s`} repeatCount="indefinite" path={p} /></circle>)}
      {person(100, 66, 0.82)}
      {person(220, 66, 0.82)}
      {person(160, 30, 0.82)}
      <ellipse cx="160" cy="128" rx="44" ry="13" className="bs-ped" />
      <ellipse cx="160" cy="118" rx="44" ry="13" className="bs-ped top" />
      {person(160, 92, 1.15, true)}
    </Svg>
  );
}

// Measurement: the bars that show whether the change is working, and its trend.
function BpMeasure() {
  return (
    <Svg>
      {bpFloor()}
      <Slab u={-1} v={-1} w={11} d={9} h={4} cls="dim" />
      <g className="bs-screen">
        <polygon points={bpts([bi(-0.5, -0.5, 52), bi(5, -0.5, 52), bi(5, -0.5, 18), bi(-0.5, -0.5, 18)])} className="face" />
        <path d={`M${bi(0.5, -0.5, 26)} L${bi(1.8, -0.5, 34)} L${bi(2.8, -0.5, 31)} L${bi(4.2, -0.5, 44)}`.replace(/,/g, ' ')} className="trend" />
        {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="3s" repeatCount="indefinite" path={`M${bi(0.5, -0.5, 26)} L${bi(1.8, -0.5, 34)} L${bi(2.8, -0.5, 31)} L${bi(4.2, -0.5, 44)}`.replace(/,/g, ' ')} /></circle>}
      </g>
      {[[2, 4.6, 14], [4.2, 3.4, 26], [6.4, 2.2, 40], [8.6, 1, 56]].map(([u, v, h], k) => <Slab key={u} u={u} v={v} w={1.5} d={1.5} h={h} z={4} hot={k === 3} cls={`bar${k === 3 ? ' bs-pulse' : ''}`} />)}
    </Svg>
  );
}

/* ---------- AIR Audit: who leads the work (side visuals, 240 x 150) ---------- */

// Industry Principal: the operation read as a field of particles, rising into one lit crest where the
// pattern shows, with the exception it hides marked at the peak.
function Mesh() {
  const lift = (x, r) => 34 * Math.exp(-(((x - 150) / 52) ** 2)) * (1 - r / 10);
  const dots = [];
  for (let r = 0; r < 8; r += 1) {
    for (let k = 0; k < 24; k += 1) {
      const x = 4 + k * 10 + r * 3;
      const y = 62 + r * 9 - lift(x, r);
      const near = Math.exp(-(((x - 150) / 60) ** 2));
      dots.push(<circle key={`${r}-${k}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r={(0.7 + near * 0.6 - r * 0.03).toFixed(2)} className="ms-dot" style={{ opacity: (0.22 + near * 0.6 - r * 0.04).toFixed(2) }} />);
    }
  }
  const crest = line(Array.from({ length: 60 }, (_, n) => { const x = 4 + n * 4; return [x, 62 - lift(x, 0)]; }));
  return (
    <Side>
      <ellipse cx="150" cy="70" rx="70" ry="30" className="ms-pool" />
      {dots}
      <path d={crest} className="ms-crest" />
      <Motes pts={[[96, 54, 1.8], [184, 46, 1.8], [214, 58]]} />
      <circle cx="150" cy="28" r="2.8" className="tc-node hot" />
      {!still() && <circle r="2" className="hs-dot"><animateMotion dur="5s" repeatCount="indefinite" path={crest} /></circle>}
    </Side>
  );
}

// Intellient Architect: systems, data and controls stream in and settle on the layers of glass, and the
// context they carry leaves on one lit line toward delivery.
function Slabs() {
  const ins = [[44, 40], [36, 72], [48, 104]].map(([x, y], k) => [`M${x} ${y} C${x + 40} ${y} 96 ${66 + k * 6} 120 ${70 + k * 4}`, x, y]);
  const out = 'M180 78 C200 78 214 70 240 70';
  return (
    <Side>
      <ellipse cx="150" cy="96" rx="60" ry="14" className="tp-halo" />
      {ins.map(([d], k) => <path key={d} d={d} className={`tp-stream${k === 1 ? ' lit' : ''}`} />)}
      {ins.map(([, x, y]) => <circle key={y} cx={x} cy={y} r="2.4" className="tc-node" style={{ '--n': y }} />)}
      <Sheets x={150} y={60} n={3} gap={16} hot={0} />
      <path d={out} className="tp-stream lit" />
      <Motes pts={[[76, 50], [86, 92, 2], [206, 92], [222, 54, 2]]} />
      {!still() && <>
        <circle r="2" className="hs-dot"><animateMotion dur="2.8s" repeatCount="indefinite" path={ins[1][0]} /></circle>
        <circle r="2" className="hs-dot"><animateMotion dur="2.4s" begin="-1.2s" repeatCount="indefinite" path={out} /></circle>
      </>}
    </Side>
  );
}

/* ---------- AIR Residency: the six motions (corner visuals, 200 x 110) ---------- */

// Redesign: a tangled route pulled straight.
function MoRedesign() {
  const knot = 'M20 72 C40 30 60 92 80 52 S108 20 118 64 S150 84 180 38';
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      <path d={knot} className="tc-line soft" />
      <path d="M20 72 L180 38" className="tc-line clean" />
      {[[20, 72], [100, 55], [180, 38]].map(([x, y], k) => <circle key={x} cx={x} cy={y} r={k === 2 ? 3.4 : 2.6} className={`tc-node${k === 2 ? ' hot' : ''}`} style={{ '--n': k }} />)}
    </Corner>
  );
}
// Engineer: production capability built up in layers of glass.
function MoEngineer() {
  const sheet = (y, hot) => (
    <g key={y} className={`mo-sheet${hot ? ' hot' : ''}`}>
      <path d={`M60 ${y + 4} L110 ${y + 26} L160 ${y + 4} V${y + 8} L110 ${y + 30} L60 ${y + 8} Z`} className="side" />
      <path d={`M60 ${y} L110 ${y - 22} L160 ${y} L110 ${y + 22} Z`} className="face" />
    </g>
  );
  return (
    <Corner>
      <ellipse cx="110" cy="92" rx="62" ry="12" className="tc-halo" />
      {sheet(74)}{sheet(56)}{sheet(38, true)}
      {[[40, 30], [178, 52], [36, 84]].map(([x, y], k) => <circle key={x} cx={x} cy={y} r="1.8" className="tp-mote" style={{ '--n': k }} />)}
    </Corner>
  );
}
// Govern: work passes a gate where authority and evidence are checked.
function MoGovern() {
  const route = 'M14 62 H186';
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      <path d={route} className="tc-line" />
      <rect x="92" y="30" width="26" height="64" rx="6" className="mo-gate" />
      <path d="M105 48 L114 52 V60 C114 66 110 69 105 71 C100 69 96 66 96 60 V52 Z" className="mo-shield" />
      <path d="M101 59 L104 62 L109 56" className="mo-tick" />
      {[40, 66, 146, 172].map((x, k) => <circle key={x} cx={x} cy="62" r="2.4" className="tc-node" style={{ '--n': k }} />)}
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="3s" repeatCount="indefinite" path={route} /></circle>}
    </Corner>
  );
}
// Embed: the people who do the work join the future workflow.
function MoEmbed() {
  const people = [48, 100, 152];
  return (
    <Corner>
      <path d="M14 78 H186" className="tc-line" />
      {!still() && <circle r="2.4" className="hs-dot"><animateMotion dur="3.2s" repeatCount="indefinite" path="M14 78 H186" /></circle>}
      {people.map((x, k) => (
        <g key={x}>
          <path d={`M${x} 46 V78`} className="tc-link" />
          <circle cx={x} cy="34" r="12" className={`mo-person${k === 1 ? ' hot' : ''}`} />
          <circle cx={x} cy="31" r="3.4" className="mo-head" />
          <path d={`M${x - 6} 41 Q${x} 34 ${x + 6} 41`} className="mo-head line" />
          <circle cx={x} cy="78" r="3" className="tc-node hot" />
        </g>
      ))}
    </Corner>
  );
}
// Operate: the live system's pulse, steady and watched.
function MoOperate() {
  const pulse = 'M10 64 H62 L72 64 L80 36 L90 88 L100 50 L108 64 H190';
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      <path d={pulse} className="tc-line" />
      <circle cx="80" cy="36" r="2.6" className="tc-node" />
      <circle cx="90" cy="88" r="2.6" className="tc-node" style={{ '--n': 2 }} />
      <circle cx="176" cy="64" r="3.4" className="tc-node hot" />
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="2.6s" repeatCount="indefinite" path={pulse} /></circle>}
    </Corner>
  );
}
// Compound: each proven pattern becomes the base for the next.
function MoCompound() {
  const cols = [[52, 1], [100, 2], [148, 3]];
  return (
    <Corner>
      <path d="M24 96 H180" className="tc-link" />
      {cols.map(([x, n], c) => Array.from({ length: n }, (_, k) => <rect key={`${x}${k}`} x={x - 16} y={84 - k * 20} width="32" height="14" rx="3" className={`mo-tile${c === 2 && k === n - 1 ? ' hot' : ''}`} />))}
      <path d="M52 66 C76 50 92 46 100 46 S132 30 148 26" className="tc-line clean" />
      {[[52, 66], [100, 46], [148, 26]].map(([x, y], k) => <circle key={x} cx={x} cy={y} r="2.4" className="tc-node" style={{ '--n': k }} />)}
    </Corner>
  );
}

/* ---------- Industries: one corner visual per sector (200 x 110) ---------- */

// Manufacturing: production, quality, maintenance and supply signals drawn into one decision.
function SecManufacturing() {
  const ys = [22, 44, 66, 88];
  const ins = ys.map((y) => `M18 ${y} C70 ${y} 90 55 140 55`);
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      {ins.map((d, k) => <path key={d} d={d} className={`tc-strand${k === 1 ? ' lit' : ''}`} />)}
      {ys.map((y, k) => <circle key={y} cx="18" cy={y} r="2.4" className="tc-node" style={{ '--n': k }} />)}
      <path d="M140 55 H184" className="tc-line" />
      <circle cx="140" cy="55" r="9" className="tc-halo" />
      <circle cx="140" cy="55" r="4" className="tc-node hot" />
      {!still() && <circle r="2" className="hs-dot"><animateMotion dur="2.6s" repeatCount="indefinite" path={ins[1]} /></circle>}
    </Corner>
  );
}
// BFSI: the work passes evidence and authority gates inside the flow, not at the end.
function SecBfsi() {
  const route = 'M12 58 H188';
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      <path d={route} className="tc-line" />
      {[74, 132].map((x) => <rect key={x} x={x - 9} y="30" width="18" height="56" rx="5" className="mo-gate" />)}
      <path d="M128 52 L132 56 L140 48" className="mo-tick" />
      <path d="M70 52 H78 M70 58 H78 M70 64 H76" className="mo-tick" />
      {[30, 104, 166].map((x, k) => <circle key={x} cx={x} cy="58" r="2.4" className="tc-node" style={{ '--n': k }} />)}
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="3s" repeatCount="indefinite" path={route} /></circle>}
    </Corner>
  );
}
// Healthcare and Life Sciences: evidence gathered from documents and set before one accountable reviewer.
function SecHealthcare() {
  const docs = [[34, 26], [26, 50], [40, 74]];
  return (
    <Corner>
      {docs.map(([x, y], k) => (
        <g key={y}>
          <rect x={x} y={y} width="30" height="20" rx="4" className="mo-tile" />
          <path d={`M${x + 6} ${y + 7} H${x + 22} M${x + 6} ${y + 13} H${x + 18}`} className="tc-link" />
          <path d={`M${x + 30} ${y + 10} C${x + 70} ${y + 10} 100 55 128 55`} className={`tc-strand${k === 1 ? ' lit' : ''}`} />
        </g>
      ))}
      <circle cx="150" cy="55" r="22" className="tc-halo" />
      <circle cx="150" cy="55" r="16" className="mo-person hot" />
      <circle cx="150" cy="51" r="4" className="mo-head" />
      <path d="M143 62 Q150 55 157 62" className="mo-head line" />
    </Corner>
  );
}
// Enterprise Services: one hand-off, the context carried across instead of rebuilt.
function SecServices() {
  const path = 'M24 70 C60 70 70 34 100 34 S140 70 176 70';
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      <path d={path} className="tc-line" />
      <rect x="10" y="58" width="28" height="24" rx="6" className="mo-tile" />
      <rect x="162" y="58" width="28" height="24" rx="6" className="mo-tile hot" />
      {[[62, 46], [100, 34], [138, 46]].map(([x, y], k) => <circle key={x} cx={x} cy={y} r="2.4" className="tc-node" style={{ '--n': k }} />)}
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="3.2s" repeatCount="indefinite" path={path} /></circle>}
    </Corner>
  );
}

/* ---------- Outcomes: one corner visual per outcome (200 x 110) ---------- */

// Operating Performance: the same case, before and after; the waiting, exceptions and rework fall away.
function OutPerformance() {
  const before = [[22, 30], [55, 62], [120, 34], [157, 26]];
  const after = [[22, 30], [55, 20]];
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      {before.map(([x, w], k) => <rect key={x} x={x} y="28" width={w - 3} height="16" rx="4" className={`mo-tile${k === 0 ? ' hot' : ''}`} />)}
      {after.map(([x, w], k) => <rect key={x} x={x} y="66" width={w - 3} height="16" rx="4" className={`mo-tile${k === 0 ? ' hot' : ''}`} />)}
      <path d="M78 74 H180" className="tc-line clean" />
      <circle cx="78" cy="74" r="2.4" className="tc-node hot" />
    </Corner>
  );
}
// Revenue Movement: the stepped route through hand-offs, and the direct one that reaches the decision in time.
function OutRevenue() {
  const slow = 'M20 70 H54 V52 H92 V78 H130 V58 H184';
  const fast = 'M20 70 C64 70 92 30 140 30';
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      <path d={slow} className="tc-line soft" />
      <path d={fast} className="tc-strand lit" />
      {[[54, 52], [92, 78], [130, 58]].map(([x, y], k) => <circle key={x} cx={x} cy={y} r="2.2" className="tc-node gone" style={{ '--n': k }} />)}
      <circle cx="140" cy="30" r="9" className="tc-halo" />
      <circle cx="140" cy="30" r="4" className="tc-node hot" />
      {!still() && <circle r="2" className="hs-dot"><animateMotion dur="2.8s" repeatCount="indefinite" path={fast} /></circle>}
    </Corner>
  );
}
// Employee Capacity: a specialist's week, the coordination thinning out and the expertise filling in.
function OutCapacity() {
  const cols = 8;
  return (
    <Corner>
      {Array.from({ length: cols * 3 }, (_, i) => {
        const c = i % cols; const r = Math.floor(i / cols);
        const hot = c >= 2 + r * 1.2;
        return <rect key={i} x={26 + c * 20} y={24 + r * 22} width="15" height="15" rx="4" className={`mo-tile${hot && c > 4 ? ' hot' : ''}`} style={hot && c <= 4 ? { stroke: 'rgba(143, 203, 255, 0.75)' } : undefined} />;
      })}
    </Corner>
  );
}
// Risk and Control: evidence, authority and audit sit on the route itself, not after it.
function OutRisk() {
  const route = 'M14 58 H188';
  return (
    <Corner>
      <path d={cornerGrid(7, 4)} className="tc-grid" />
      <rect x="44" y="34" width="122" height="48" rx="12" className="mo-tile" />
      <path d={route} className="tc-line" />
      {[72, 105, 138].map((x, k) => (
        <g key={x}>
          <circle cx={x} cy="58" r="8" className="mo-person hot" />
          <path d={`M${x - 3.5} 58 L${x - 1} 60.5 L${x + 4} 55.5`} className="mo-tick" style={{ strokeWidth: 1.3 }} />
        </g>
      ))}
      <circle cx="184" cy="58" r="2.6" className="tc-node hot" />
      {!still() && <circle r="2.2" className="hs-dot"><animateMotion dur="3.2s" repeatCount="indefinite" path={route} /></circle>}
    </Corner>
  );
}

const VISUALS = {
  wait: Wait, exceptions: Exceptions, golive: GoLive, outcome: Outcome, operation: Operation, production: Production,
  designed: Designed, observed: Observed, lived: Lived,
  touch: Touch, queue: Queue, routing: Routing, rework: Rework, decision: Decision, elapsed: Elapsed,
  eliminate: Eliminate, standardise: Standardise, assist: Assist, escalate: Escalate,
  bpflow: BpFlow, bpauth: BpAuth, bpaccount: BpAccount, bpmeasure: BpMeasure,
  mesh: Mesh, slabs: Slabs,
  manufacturing: SecManufacturing, bfsi: SecBfsi, 'healthcare-life-sciences': SecHealthcare, 'enterprise-services': SecServices,
  'operating-performance': OutPerformance, 'revenue-movement': OutRevenue, 'employee-capacity': OutCapacity, 'risk-control': OutRisk,
  moredesign: MoRedesign, moengineer: MoEngineer, mogovern: MoGovern, moembed: MoEmbed, mooperate: MoOperate, mocompound: MoCompound,
  unify: Unify, orchestrate: Orchestrate, govern: Govern, context: Context, corestack: CoreStack, shieldorb: ShieldOrb,
};

// `bottom` sets the visual frameless at the foot of the card, blending into it; `side` sets it into the
// card's right half, behind the copy; `corner` sets it in the top-right corner beside the icon.
export default function CardVisual({ kind, bottom, side, corner }) {
  const Comp = VISUALS[kind];
  return Comp ? <div className={`pg-card-visual cv-${kind}${bottom ? ' bottom' : ''}${side ? ' side' : ''}${corner ? ' corner' : ''}`} aria-hidden="true"><Comp /></div> : null;
}
