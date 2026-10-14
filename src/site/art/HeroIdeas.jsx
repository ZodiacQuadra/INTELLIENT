import { useEffect, useId, useState } from 'react';
import { User, Target, PenNib, Code, ShieldCheck, UsersThree, Pulse, Stack, Check, FileText, ClockCounterClockwise, Sparkle, ChartBar, AppWindow, Browser, SquaresFour, LinkSimple, Plugs, Cloud, Database, ShareNetwork, Brain, Graph, Article, Gear, Shield, LockSimple, Fingerprint, HardDrives, Cube } from '@phosphor-icons/react';
import styles from './HeroIdeas.module.css';

const still = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CYCLE = 12; // seconds for the six motions to light in turn

/* ---------- AIR Residency: the outcome holds the centre while the work moves around it ---------- */
// Drawn on a 640 x 540 stage. The operating outcome is the anchor; the Architect rides the inner,
// unbroken context orbit; the six motions sit on the outer orbit and light in turn, each bringing
// its specialists in and letting them go.
const RC = { x: 340, y: 300, inner: 150, outer: 244 };
const SIDE = ['above', 'right', 'right', 'below', 'left', 'left'];
const MOTIONS = [['Redesign', PenNib], ['Engineer', Code], ['Govern', ShieldCheck], ['Embed', UsersThree], ['Operate', Pulse], ['Compound', Stack]];

export function ResidencyOrbit() {
  const id = useId();
  const moving = !still();
  const at = (r, deg) => [RC.x + r * Math.cos((deg * Math.PI) / 180), RC.y + r * Math.sin((deg * Math.PI) / 180)];
  const ring = (r) => `M${RC.x - r} ${RC.y} A${r} ${r} 0 1 1 ${RC.x + r} ${RC.y} A${r} ${r} 0 1 1 ${RC.x - r} ${RC.y}`;
  return (
    <div className={styles.stage} style={{ width: 680, height: 600 }}>
      <svg className={styles.svg} viewBox="0 0 680 600" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#1f5fff" stopOpacity=".5" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx={RC.x} cy={RC.y} r="230" fill={`url(#${id}-glow)`} className={styles.breathe} />
        {/* Fine outer rings, the bright orbit of motions, and the lit ring round the outcome. */}
        <circle cx={RC.x} cy={RC.y} r={RC.outer + 34} className={styles.orbitOuter} />
        <circle cx={RC.x} cy={RC.y} r={RC.outer + 18} className={styles.orbitFaint} />
        <circle cx={RC.x} cy={RC.y} r={RC.outer} className={styles.rOrbit} />
        <circle cx={RC.x} cy={RC.y} r={RC.inner + 30} className={styles.orbitFaint} />
        <circle cx={RC.x} cy={RC.y} r={RC.inner} className={styles.orbitInner} />
        <circle cx={RC.x} cy={RC.y} r={RC.inner} className={styles.orbitGlow} />
        {/* Dashed spokes: every motion answers to the outcome. */}
        {MOTIONS.map((_, k) => { const deg = -90 + k * 60; const [x, y] = at(RC.outer - 34, deg); const [x2, y2] = at(RC.inner + 4, deg); return <path key={k} d={`M${x} ${y} L${x2} ${y2}`} className={styles.rSpoke} />; })}
        {/* Glowing beads either side of each tile, and one inside it. */}
        {MOTIONS.flatMap((_, k) => [-11, 11].map((o) => { const [x, y] = at(RC.outer, -90 + k * 60 + o); return <circle key={`${k}${o}`} cx={x} cy={y} r="5" className={styles.rBead} style={{ animationDelay: `-${k * 0.5}s` }} />; }))}
        {MOTIONS.map((_, k) => { const [x, y] = at(RC.outer - 42, -90 + k * 60); return <circle key={k} cx={x} cy={y} r="5" className={styles.rBead} />; })}
        {moving && [0, 1, 2].map((k) => <circle key={k} r="3.5" className={styles.dot}><animateMotion dur="15s" begin={`-${k * 5}s`} repeatCount="indefinite" path={ring(RC.outer)} /></circle>)}
        {moving && <circle r="3" className={styles.dot}><animateMotion dur="9s" repeatCount="indefinite" path={ring(RC.inner)} /></circle>}
      </svg>

      {/* The anchor: the operating outcome. */}
      <div className={styles.anchor} style={{ left: RC.x, top: RC.y - 6, width: 170, height: 170 }}>
        <span className={`orb-glass ${styles.anchorOrb}`}><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <Target className={styles.anchorIcon} weight="bold" style={{ width: 62, height: 62 }} />
      </div>
      <span className={styles.anchorLabel} style={{ left: RC.x, top: RC.y + 64 }}>Operating outcome</span>

      {MOTIONS.map(([label, Icon], k) => {
        const deg = -90 + k * 60;
        const [x, y] = at(RC.outer, deg);
        return (
          <div key={label} className={styles.motion} style={{ left: x, top: y, animationDelay: `${k * 2}s` }}>
            <span className={styles.motionTile}><Icon /></span>
            <span className={`${styles.motionLabel} ${styles[SIDE[k]]}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- AIR Audit: see the operation before you automate it ---------- */
// Drawn on a 680 x 520 stage. On the left, the operation as it really runs: a tangle of steps and
// crossings. A glass lens reads it; out of the lens runs one clean path through the four results.
const TANGLE = [
  'M20 150 C90 120 120 260 190 220 S260 120 300 250',
  'M30 320 C100 360 130 180 200 260 S250 360 300 250',
  'M10 240 C80 200 140 330 210 300 S270 200 300 250',
  'M40 90 C120 140 90 230 170 180 S250 300 300 250',
  'M20 400 C110 380 120 300 190 340 S260 280 300 250',
];
const TNODES = [[60, 140], [118, 205], [160, 300], [92, 330], [200, 230], [230, 320], [140, 170], [250, 190], [70, 250], [180, 380]];
const RESULTS = ['Outcome', 'Operating reality', 'Future state', 'Value baseline'];

export function AuditLens() {
  const id = useId();
  const moving = !still();
  const ys = [118, 196, 274, 352];
  const routes = ys.map((y) => `M392 250 C450 250 452 ${y} 504 ${y}`);
  return (
    <div className={styles.stage} style={{ width: 680, height: 520 }}>
      <svg className={styles.svg} viewBox="0 0 680 520" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#1f5fff" stopOpacity=".5" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}-fade`} x1="0" x2="1"><stop stopColor="#3f8cff" stopOpacity="0" /><stop offset=".5" stopColor="#3f8cff" stopOpacity=".55" /><stop offset="1" stopColor="#8fcbff" stopOpacity=".9" /></linearGradient>
        </defs>
        <circle cx="320" cy="250" r="200" fill={`url(#${id}-glow)`} className={styles.breathe} />
        {/* The operation as it runs: tangled, crossing, loosely framed. */}
        {TANGLE.map((d) => <path key={d} d={d} stroke={`url(#${id}-fade)`} className={styles.tangle} />)}
        {TNODES.map(([x, y], k) => <circle key={k} cx={x} cy={y} r="2.6" className={styles.tnode} style={{ animationDelay: `-${k * 0.37}s` }} />)}
        {moving && TANGLE.map((d, k) => <circle key={d} r="2.4" className={styles.dotDim}><animateMotion dur={`${4 + k * 0.6}s`} begin={`-${k * 0.9}s`} repeatCount="indefinite" path={d} /></circle>)}
        {/* Out of the lens: one clean route branching to the four results. */}
        {routes.map((d) => <path key={d} d={d} className={styles.route} />)}
        {moving && routes.map((d, k) => <circle key={d} r="3.2" className={styles.dot}><animateMotion dur="2.8s" begin={`-${k * 0.7}s`} repeatCount="indefinite" path={d} /></circle>)}
        {/* The lens: a ring of reading, with a scan sweeping across it. */}
        <circle cx="320" cy="250" r="96" className={styles.lensRing} />
        <circle cx="320" cy="250" r="112" className={styles.lensTicks} />
      </svg>
      <div className={styles.lens} style={{ left: 320, top: 250 }}>
        <span className={`orb-glass ${styles.lensOrb}`}><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <span className={styles.scan} />
        <img src="/svg/intellient.svg" alt="" className={styles.lensLogo} />
      </div>
      <span className={styles.ringTag} style={{ left: 320, top: 112 }}>AIR Audit</span>
      <span className={styles.caption} style={{ left: 30, top: 446 }}>The operation as it runs</span>
      <span className={styles.caption} style={{ left: 506, top: 446 }}>What should change</span>
      {RESULTS.map((label, k) => (
        <div key={label} className={styles.result} style={{ left: 504, top: ys[k], animationDelay: `${k * 0.6}s` }}>
          <span className={styles.check}><Check weight="bold" /></span>{label}
        </div>
      ))}
    </div>
  );
}

/* ---------- IntelliSphere: see and govern the AI estate ---------- */
// Drawn on a 660 x 540 stage. A wireframe sphere holds the estate; a radar sweep turns inside it and
// lights each agent as it passes. Three readouts name what leaders can see.
const SC = { x: 230, y: 270, r: 190 };
const SWEEP = 6; // seconds per turn
const AGENTS = [[-90, 120], [-40, 70], [10, 150], [62, 96], [120, 140], [168, 64], [205, 120], [255, 90], [300, 150], [-140, 40]];
const READOUTS = [
  { label: 'Who and what may act', Icon: User, y: 120 },
  { label: 'Evidence behind the action', Icon: FileText, y: 270 },
  { label: 'What changed over time', Icon: ClockCounterClockwise, y: 420 },
];

export function SphereView() {
  const id = useId();
  const moving = !still();
  return (
    <div className={styles.stage} style={{ width: 660, height: 540 }}>
      <svg className={styles.svg} viewBox="0 0 660 540" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#1f5fff" stopOpacity=".5" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${id}-body`} cx=".38" cy=".3" r=".8"><stop stopColor="#3f8cff" stopOpacity=".22" /><stop offset=".7" stopColor="#1f5fff" stopOpacity=".08" /><stop offset="1" stopColor="#1f5fff" stopOpacity=".18" /></radialGradient>
        </defs>
        <circle cx={SC.x} cy={SC.y} r={SC.r + 70} fill={`url(#${id}-glow)`} className={styles.breathe} />
        <circle cx={SC.x} cy={SC.y} r={SC.r} fill={`url(#${id}-body)`} className={styles.sphereEdge} />
        {/* Latitudes, and meridians that turn by narrowing and widening. */}
        {[-110, -55, 0, 55, 110].map((dy) => { const rx = Math.sqrt(SC.r ** 2 - dy ** 2); return <ellipse key={dy} cx={SC.x} cy={SC.y + dy} rx={rx} ry={rx * 0.22} className={styles.wire} />; })}
        {[0, 1, 2].map((k) => (
          <ellipse key={k} cx={SC.x} cy={SC.y} rx={SC.r} ry={SC.r} className={styles.wire}>
            {moving && <animate attributeName="rx" values={`${SC.r};8;${SC.r}`} dur="9s" begin={`-${k * 3}s`} repeatCount="indefinite" />}
          </ellipse>
        ))}
        {/* Leader lines to the readouts. */}
        {READOUTS.map(({ y }, k) => <path key={k} d={`M${SC.x + Math.sqrt(SC.r ** 2 - (y - SC.y) ** 2)} ${y} H440`} className={styles.leader} />)}
      </svg>
      <div className={styles.radar} style={{ left: SC.x, top: SC.y, width: SC.r * 2, height: SC.r * 2, animationDuration: `${SWEEP}s` }} />
      {AGENTS.map(([deg, r], k) => {
        const a = (deg * Math.PI) / 180;
        const delay = (((deg + 90 + 360) % 360) / 360) * SWEEP;
        return <span key={k} className={styles.agent} style={{ left: SC.x + r * Math.cos(a), top: SC.y + r * Math.sin(a), animationDelay: `${delay}s`, animationDuration: `${SWEEP}s` }} />;
      })}
      <div className={styles.core} style={{ left: SC.x, top: SC.y }}>
        <span className={`orb-glass ${styles.coreOrb}`}><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <img src="/svg/intellisphere.svg" alt="" className={styles.coreLogo} />
      </div>
      {READOUTS.map(({ label, Icon, y }, k) => (
        <div key={label} className={styles.readout} style={{ left: 440, top: y, animationDelay: `${k * 1.2}s` }}>
          <span className={styles.check}><Icon weight="bold" /></span>{label}
        </div>
      ))}
    </div>
  );
}

/* ---------- The Intellient Model: an operating system around intelligence ---------- */
// Drawn on a 640 x 600 stage. Intelligence is the glowing sphere at the centre; Outcome, People,
// Technology and Governance sit around it as glass tiles on one cross, inside a lit orbit ring.
const MODEL_TILES = [['Outcome', ChartBar, 0, -1], ['People', UsersThree, -1, 0], ['Technology', Stack, 1, 0], ['Governance', ShieldCheck, 0, 1]];

export function ModelFrames() {
  const id = useId();
  const moving = !still();
  const cx = 320; const cy = 290; const dx = 236; const dy = 196;
  const orbit = `M${cx - 236} ${cy} A236 236 0 1 1 ${cx + 236} ${cy} A236 236 0 1 1 ${cx - 236} ${cy}`;
  const ends = [[cx, cy - dy + 52, cx, cy - 76], [cx - dx + 70, cy, cx - 76, cy], [cx + dx - 70, cy, cx + 76, cy], [cx, cy + dy - 52, cx, cy + 76]];
  return (
    <div className={styles.stage} style={{ width: 640, height: 600 }}>
      <svg className={styles.svg} viewBox="0 0 640 600" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#1f5fff" stopOpacity=".55" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r="210" fill={`url(#${id}-glow)`} className={styles.breathe} />
        {/* The base: rings of light on the floor. */}
        <ellipse cx={cx} cy={cy + 250} rx="300" ry="44" className={styles.mBase} />
        <ellipse cx={cx} cy={cy + 250} rx="226" ry="30" className={styles.mBaseInner} />
        {/* Orbits: the lit ring, a dotted ring outside it and fine rings inside. */}
        <circle cx={cx} cy={cy} r="236" className={styles.mOrbit} />
        <circle cx={cx} cy={cy} r="272" className={styles.mOrbitDash} />
        {[150, 118].map((r) => <circle key={r} cx={cx} cy={cy} r={r} className={styles.mInner} />)}
        {/* The cross linking the sphere to each tile. */}
        {ends.map(([x1, y1, x2, y2], k) => <path key={k} d={`M${x1} ${y1} L${x2} ${y2}`} className={styles.mCross} />)}
        {ends.flatMap(([x1, y1, x2, y2], k) => [[x1, y1], [x2, y2]].map(([x, y], j) => <circle key={`${k}${j}`} cx={x} cy={y} r="4.5" className={styles.joint2} />))}
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], k) => <circle key={k} cx={cx + sx * 167} cy={cy + sy * 167} r="4" className={styles.joint2} style={{ animationDelay: `-${k * 0.6}s` }} />)}
        {moving && <>
          {[0, 1].map((k) => <circle key={k} r="3.5" className={styles.dot}><animateMotion dur="12s" begin={`-${k * 6}s`} repeatCount="indefinite" path={orbit} /></circle>)}
          {ends.map(([x1, y1, x2, y2], k) => <circle key={`c${k}`} r="3" className={styles.dot}><animateMotion dur="2.4s" begin={`-${k * 0.6}s`} repeatCount="indefinite" path={`M${x1} ${y1} L${x2} ${y2}`} /></circle>)}
        </>}
      </svg>
      <div className={styles.mCore} style={{ left: cx, top: cy }}>
        <span className={`orb-glass ${styles.coreOrb}`}><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <span className={styles.mStar} />
      </div>
      {MODEL_TILES.map(([label, Icon, sx, sy], k) => (
        <div key={label} className={styles.mTile} style={{ left: cx + sx * dx, top: cy + sy * dy, animationDelay: `${k * 0.9}s` }}>
          <Icon weight="fill" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Architecture: choose for the workload, not the logo ---------- */
// Drawn on a 900 x 640 stage. The workload sits on top; five layers run as rows, and five
// interchangeable options per layer stand in columns. The workload's path lights one column at a
// time, from experience down to the foundation: the outcome chooses, not the vendor.
const AF_ROWS = ['Experience', 'Connection and action', 'Reasoning and orchestration', 'Trust and control', 'Enterprise foundation'];
const AF_ICONS = [
  [AppWindow, Browser, User, Code, SquaresFour],
  [LinkSimple, Plugs, Cloud, Database, ShareNetwork],
  [Brain, Graph, Article, Sparkle, Gear],
  [Shield, ShieldCheck, LockSimple, UsersThree, Fingerprint],
  [Database, HardDrives, Cloud, Stack, Cube],
];
const AF = { cols: [262, 404, 546, 688, 830], rows: [236, 328, 420, 512, 604], wx: 470, wy: 70, top: 168 };

export function ArchitectureFit() {
  const id = useId();
  const moving = !still();
  const [pick, setPick] = useState(1);
  useEffect(() => {
    if (!moving) return undefined;
    const t = setInterval(() => setPick((p) => (p + 1) % AF.cols.length), 3200);
    return () => clearInterval(t);
  }, [moving]);
  const branch = (c) => `M${AF.wx} ${AF.wy + 32} C${AF.wx} ${AF.wy + 70} ${c} ${AF.top - 50} ${c} ${AF.top - 8}`;
  const px = AF.cols[pick];
  const route = `${branch(px)} L${px} ${AF.rows[AF.rows.length - 1]}`;
  return (
    <div className={styles.stage} style={{ width: 900, height: 660 }}>
      <svg className={styles.svg} viewBox="0 0 900 660" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#1f5fff" stopOpacity=".4" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx={px} cy="420" rx="160" ry="300" fill={`url(#${id}-glow)`} className={styles.afGlow} />
        {/* Row guides from each layer label across every option. */}
        {AF.rows.map((y) => <path key={y} d={`M176 ${y} H900`} className={styles.afRow} />)}
        {/* Column panels. */}
        {AF.cols.map((c) => <rect key={c} x={c - 56} y={AF.top} width="112" height={AF.rows[4] - AF.top + 52} rx="16" className={styles.afCol} />)}
        {/* Branches from the workload to each column; the chosen one is lit. */}
        {AF.cols.map((c, k) => <path key={c} d={branch(c)} className={k === pick ? styles.afBranchOn : styles.afBranch} />)}
        {AF.cols.map((c, k) => <circle key={c} cx={c} cy={AF.top - 8} r="4.5" className={k === pick ? styles.afNodeOn : styles.afNode} />)}
        <path d={`M${px} ${AF.top - 8} V${AF.rows[4]}`} className={styles.afSpine} />
        {AF.rows.slice(0, -1).map((y, k) => <circle key={y} cx={px} cy={(y + AF.rows[k + 1]) / 2} r="4.5" className={styles.afNodeOn} />)}
        {moving && <circle key={pick} r="4" className={styles.dot}><animateMotion dur="2.6s" repeatCount="indefinite" path={route} /></circle>}
        {/* The workload leads to the outcome. */}
        <path d={`M${AF.wx + 128} ${AF.wy} H${666}`} className={styles.afArrow} />
        <path d="M660 64 l8 6 l-8 6" className={styles.afArrowTip} />
      </svg>

      <div className={styles.afWork} style={{ left: AF.wx, top: AF.wy }}>
        <span className={styles.afWorkIcon}><Target weight="bold" /></span>THE WORKLOAD
      </div>
      <div className={styles.afOutcome} style={{ left: 682, top: AF.wy - 44 }}>
        <span>Outcome</span>
        <i /><i className={styles.afShort} />
        <ChartBar weight="fill" className={styles.afBars} />
      </div>
      {AF_ROWS.map((label, r) => <span key={label} className={styles.afLabel} style={{ left: 0, top: AF.rows[r] }}>{label}</span>)}
      {AF_ICONS.map((row, r) => row.map((Icon, c) => (
        <span key={`${r}${c}`} className={`${styles.afTile}${c === pick ? ` ${styles.afTileOn}` : ''}`} style={{ left: AF.cols[c], top: AF.rows[r], transitionDelay: c === pick ? `${r * 70}ms` : '0ms' }}>
          <Icon weight={c === pick ? 'regular' : 'light'} />
        </span>
      )))}
    </div>
  );
}
