import { Flow, Ribbon } from './HeroScenes';

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
      </defs>
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

const VISUALS = {
  wait: Wait, exceptions: Exceptions, golive: GoLive, outcome: Outcome, operation: Operation, production: Production,
  designed: Designed, observed: Observed, lived: Lived,
};

// `bottom` sets the visual frameless at the foot of the card, blending into it.
export default function CardVisual({ kind, bottom }) {
  const Comp = VISUALS[kind];
  return Comp ? <div className={`pg-card-visual${bottom ? ' bottom' : ''}`}><Comp /></div> : null;
}
