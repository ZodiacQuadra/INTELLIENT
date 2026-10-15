import { useEffect, useId, useState } from 'react';
import { User, Target, PenNib, Code, ShieldCheck, UsersThree, Pulse, Stack, Check, FileText, ClockCounterClockwise, Sparkle, ChartBar, AppWindow, Browser, SquaresFour, LinkSimple, Plugs, Cloud, Database, ShareNetwork, Brain, Graph, Article, Gear, Shield, LockSimple, Fingerprint, HardDrives, Cube, Robot, UserFocus, TreeStructure, ChatDots, Factory, Bank, Heartbeat, Briefcase, Flask, Presentation, MapTrifold, SealCheck } from '@phosphor-icons/react';
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
  const spoke = (k) => { const deg = -90 + k * 60; const [x, y] = at(RC.outer - 34, deg); const [x2, y2] = at(RC.inner + 4, deg); return `M${x} ${y} L${x2} ${y2}`; };
  // One motion leads at a time, and its work runs down the spoke into the outcome.
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!moving) return undefined;
    const t = setInterval(() => setOn((p) => (p + 1) % MOTIONS.length), (CYCLE / MOTIONS.length) * 1000);
    return () => clearInterval(t);
  }, [moving]);
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
        {MOTIONS.map((_, k) => <path key={k} d={spoke(k)} className={k === on ? styles.rSpokeOn : styles.rSpoke} />)}
        {moving && [0, 1].map((k) => <circle key={`${on}${k}`} r="3.5" className={styles.dot}><animateMotion dur="1.4s" begin={`-${k * 0.7}s`} repeatCount="indefinite" path={spoke(on)} /></circle>)}
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
          <div key={label} className={`${styles.motion}${k === on ? ` ${styles.motionOn}` : ''}`} style={{ left: x, top: y }}>
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

/* ---------- IntelliSphere: inputs enter the sphere, the governed view comes out ---------- */
// Drawn on a 960 x 560 stage. People, agents and systems feed the IntelliSphere on the left; the
// operating view leaves on the right: who may act, the evidence behind the action, what changed.
const SE = { w: 960, cx: 468, cy: 268, rows: [110, 268, 426], lw: 252, rx: 630 };
const SE_IN = [['People', 'Users, roles and permissions', UsersThree], ['AI Agents', 'Enterprise and third-party agents', Robot], ['Systems', 'Apps, data sources and integrations', HardDrives]];
const SE_OUT = [['Who and what may act', 'People, agents, systems and their permissions.', UserFocus], ['Evidence behind the action', 'Data, decisions, prompts and approvals.', FileText], ['What changed over time', 'Audit trails, impact and continuous monitoring.', ClockCounterClockwise]];

export function SphereEstate() {
  const id = useId();
  const moving = !still();
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!moving) return undefined;
    const t = setInterval(() => setOn((p) => (p + 1) % 3), 3200);
    return () => clearInterval(t);
  }, [moving]);
  // Joints on a ring just outside the sphere; the middle rows run straight in.
  const joint = (side, k) => [SE.cx + side * (k === 1 ? 118 : 124), SE.cy + (k - 1) * 58];
  const inPath = (k) => { const [jx, jy] = joint(-1, k); const y = SE.rows[k]; return k === 1 ? `M${SE.lw} ${y} H${jx}` : `M${SE.lw} ${y} C${SE.lw + 70} ${y} ${jx - 70} ${jy} ${jx} ${jy}`; };
  const outPath = (k) => { const [jx, jy] = joint(1, k); const y = SE.rows[k]; return k === 1 ? `M${jx} ${jy} H${SE.rx}` : `M${jx} ${jy} C${jx + 70} ${jy} ${SE.rx - 70} ${y} ${SE.rx} ${y}`; };
  return (
    <div className={styles.stage} style={{ width: SE.w, height: 560 }}>
      <svg className={styles.svg} viewBox="0 0 960 560" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#1f5fff" stopOpacity=".55" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${id}-disc`}><stop stopColor="#8fcbff" stopOpacity=".9" /><stop offset=".55" stopColor="#3f8cff" stopOpacity=".45" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx={SE.cx} cy={SE.cy} r="230" fill={`url(#${id}-glow)`} className={styles.breathe} />
        {/* Faint orbits round the sphere. */}
        <circle cx={SE.cx} cy={SE.cy} r="150" className={styles.seRing} />
        <circle cx={SE.cx} cy={SE.cy} r="186" className={styles.seRing} strokeDasharray="2 7" />
        {/* The pedestal: a lit disc and widening rings under the sphere. */}
        <ellipse cx={SE.cx} cy={SE.cy + 116} rx="120" ry="26" fill={`url(#${id}-disc)`} />
        {[[98, 18, 1], [118, 25, 0.6], [136, 31, 0.35], [152, 37, 0.2]].map(([rx, ry, o], k) => (
          <ellipse key={rx} cx={SE.cx} cy={SE.cy + 118 + k * 4} rx={rx} ry={ry} className={styles.seBase} style={{ opacity: o, animationDelay: `-${k * 0.6}s` }} />
        ))}
        {/* Connectors: inputs in, the governed view out. */}
        {[0, 1, 2].map((k) => <path key={`i${k}`} d={inPath(k)} className={k === on ? styles.seLineOn : styles.seLine} />)}
        {[0, 1, 2].map((k) => <path key={`o${k}`} d={outPath(k)} className={k === on ? styles.seLineOn : styles.seLine} />)}
        {[0, 1, 2].flatMap((k) => [joint(-1, k), joint(1, k)]).map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" className={styles.seJoint} />)}
        {[0, 1, 2].flatMap((k) => [[SE.lw, SE.rows[k]], [SE.rx, SE.rows[k]]]).map(([x, y]) => <circle key={`e${x}${y}`} cx={x} cy={y} r="5" className={styles.seEnd} />)}
        {moving && [0, 1, 2].map((k) => <circle key={`di${k}`} r="3.5" className={styles.dot}><animateMotion dur="2.4s" begin={`-${k * 0.8}s`} repeatCount="indefinite" path={inPath(k)} /></circle>)}
        {moving && [0, 1, 2].map((k) => <circle key={`do${k}`} r="3.5" className={styles.dot}><animateMotion dur="2.4s" begin={`-${k * 0.8 + 1.2}s`} repeatCount="indefinite" path={outPath(k)} /></circle>)}
        {/* Motes drifting on the orbit. */}
        {[[-40, 150], [35, 150], [200, 186], [150, 186]].map(([a, r]) => <circle key={`${a}${r}`} cx={SE.cx + r * Math.cos((a * Math.PI) / 180)} cy={SE.cy + r * Math.sin((a * Math.PI) / 180) - 40} r="3" className={styles.seMote} />)}
      </svg>

      <div className={styles.seSphere} style={{ left: SE.cx, top: SE.cy }}>
        <span className={`orb-glass ${styles.seOrb}`}><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <img src="/svg/intellisphere.svg" alt="" className={styles.seLogo} />
      </div>

      {SE_IN.map(([title, body, Icon], k) => (
        <div key={title} className={`${styles.seCard}${k === on ? ` ${styles.seCardOn}` : ''}`} style={{ left: 0, top: SE.rows[k], width: SE.lw - 8 }}>
          <span className={styles.seIco}><Icon weight="duotone" /></span>
          <span className={styles.seText}><b>{title}</b><small>{body}</small></span>
        </div>
      ))}
      {SE_OUT.map(([title, body, Icon], k) => (
        <div key={title} className={`${styles.seCard} ${styles.seOut}${k === on ? ` ${styles.seCardOn}` : ''}`} style={{ left: SE.rx + 8, top: SE.rows[k], width: SE.w - SE.rx - 8 }}>
          <span className={styles.seIco}><Icon weight="duotone" /></span>
          <span className={styles.seText}><b>{title}</b><small>{body}</small></span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Intellient Blueprint: an operating design, not a technology wish list ---------- */
// Drawn on a 740 x 560 stage. On the left, the wish list: loose tools whose dotted threads converge and
// are taken into the Blueprint. On the right, the Blueprint sheet, laid flat so its text stays crisp: the business
// outcome at the top, then one spine through workflow, authority, architecture and measurement.
const BP = { bx: 280, by: 20, bw: 460, bh: 520, rx: 22, rw: 416, out: 112, rows: [208, 294, 380, 466], spine: 60 };
const BP_ROWS = [['Workflow', 'The future way of working', TreeStructure], ['Authority', 'Who and which systems decide', ShieldCheck], ['Architecture', 'What connects and runs it', Stack], ['Measurement', 'Proof the outcome moved', ChartBar]];
const BP_WISH = [['AI chatbot', ChatDots, 120], ['New platform', Cube, 216], ['Dashboards', ChartBar, 312], ['Automation tool', Gear, 408]];
const BP_CHIP = 188;
const BP_NODE = [238, 268];

export function BlueprintPlan() {
  const moving = !still();
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!moving) return undefined;
    const t = setInterval(() => setOn((p) => (p + 1) % (BP_ROWS.length + 1)), 2200);
    return () => clearInterval(t);
  }, [moving]);
  const thread = ([, , y]) => `M${BP_CHIP} ${y} C${BP_CHIP + 32} ${y} ${BP_NODE[0] - 34} ${BP_NODE[1]} ${BP_NODE[0]} ${BP_NODE[1]}`;
  // Step 0 is the outcome itself; steps 1-4 light the spine down to that layer.
  const lit = on > 0 ? `M${BP.spine} ${BP.out} V${BP.rows[on - 1]}` : null;
  return (
    <div className={styles.stage} style={{ width: 740, height: 560 }}>
      <svg className={styles.svg} viewBox="0 0 740 560" aria-hidden="true">
        {BP_WISH.map((w) => <path key={w[0]} d={thread(w)} className={styles.bpThread} />)}
        {moving && BP_WISH.map((w, k) => <circle key={`m${k}`} r="3" className={styles.dot}><animateMotion dur="2.4s" begin={`-${k * 0.6}s`} repeatCount="indefinite" path={thread(w)} /></circle>)}
        <path d={`M${BP_NODE[0]} ${BP_NODE[1]} H${BP.bx - 4}`} className={styles.bpArrow} />
        <path d={`M${BP.bx - 12} ${BP_NODE[1] - 7} l8 7 l-8 7`} className={styles.bpTip} />
        <circle cx={BP_NODE[0]} cy={BP_NODE[1]} r="7" className={styles.bpNode} />
      </svg>

      <span className={styles.bpCaption} style={{ left: 8, top: 62 }}>Wish list</span>
      {BP_WISH.map(([label, Icon, y]) => (
        <span key={label} className={styles.bpWish} style={{ left: 0, top: y, width: BP_CHIP }}><Icon weight="regular" />{label}</span>
      ))}

      {/* The Blueprint sheet. */}
      <div className={styles.bpBoard} style={{ left: BP.bx, top: BP.by, width: BP.bw, height: BP.bh }}>
        <span className={styles.bpSheet} />
        <span className={styles.bpHead}>Intellient Blueprint</span>
        <span className={styles.bpMore}><i /><i /><i /></span>
        <svg className={styles.svg} viewBox={`0 0 ${BP.bw} ${BP.bh}`} aria-hidden="true">
          <path d={`M${BP.spine} ${BP.out} V${BP.rows[3]}`} className={styles.bpSpine} />
          {lit && <path key={`l${on}`} d={lit} className={styles.bpSpineOn} pathLength="1" />}
          {[BP.out, ...BP.rows].slice(0, -1).map((y, k) => <circle key={y} cx={BP.spine} cy={(y + [...BP.rows][k]) / 2} r="3.5" className={styles.bpJoint} />)}
          {moving && lit && <circle key={`d${on}`} r="4" className={styles.dot}><animateMotion dur="1.1s" repeatCount="1" fill="freeze" path={lit} /></circle>}
        </svg>
        <div className={`${styles.bpRow} ${styles.bpOutcome}${on === 0 ? ` ${styles.bpRowOn}` : ` ${styles.bpRowDone}`}`} style={{ left: BP.rx, top: BP.out, width: BP.rw }}>
          <span className={styles.bpIco}><Target weight="bold" /></span>
          <span className={styles.bpText}><b>Business outcome</b><small>What must change, and by how much</small></span>
        </div>
        {BP_ROWS.map(([title, sub, Icon], k) => (
          <div key={title} className={`${styles.bpRow}${k + 1 === on ? ` ${styles.bpRowOn}` : ''}${k + 1 < on ? ` ${styles.bpRowDone}` : ''}`} style={{ left: BP.rx, top: BP.rows[k], width: BP.rw }}>
            <span className={styles.bpIco}><Icon weight="regular" /></span>
            <span className={styles.bpText}><b>{title}</b><small>{sub}</small></span>
            <span className={styles.bpNum}>{String(k + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Customer ownership: the customer owns the Blueprint and controls its framework ---------- */
// Drawn on a 1200 x 500 stage. The Blueprint sheets on the left and the Framework on the right, laid flat so
// their text stays crisp, connect only through the customer at the centre, who owns and controls them.
const OW = { cx: 600, cy: 250, rows: ['Outcome', 'Workflow', 'Authority', 'Architecture', 'Measurement'] };
const OW_IN = [[467, 186], [467, 318]];
const OW_OUT = [134, 200, 266, 332, 398].map((y) => [826, y]);

export function OwnerFrame() {
  const moving = !still();
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!moving) return undefined;
    const t = setInterval(() => setOn((p) => (p + 1) % OW.rows.length), 2000);
    return () => clearInterval(t);
  }, [moving]);
  const inPath = ([x, y], k) => { const jy = OW.cy + (k ? 12 : -12); return `M${x} ${y} H${x + 16} C${x + 44} ${y} ${x + 20} ${jy} ${OW.cx - 82} ${jy}`; };
  const outPath = ([x, y]) => { const jy = OW.cy + (y < OW.cy ? -12 : 12); return `M${OW.cx + 82} ${jy} C${OW.cx + 118} ${jy} ${x - 70} ${y} ${x - 34} ${y} H${x}`; };
  return (
    <div className={styles.stage} style={{ width: 1200, height: 500 }}>
      <svg className={styles.svg} viewBox="0 0 1200 500" aria-hidden="true">
        <defs>
          <radialGradient id="ow-floor"><stop stopColor="#1f5fff" stopOpacity=".45" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="600" cy="470" rx="560" ry="40" fill="url(#ow-floor)" />
        <circle cx={OW.cx} cy={OW.cy} r="112" className={styles.owHalo} />
        {OW_IN.map((p, k) => <path key={k} d={inPath(p, k)} className={styles.owLine} />)}
        {OW_OUT.map((p, k) => <path key={k} d={outPath(p)} className={k === on ? styles.owLineOn : styles.owLine} />)}
        {[...OW_IN, ...OW_OUT].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" className={styles.owEnd} />)}
        {[-12, 12].flatMap((o) => [[OW.cx - 82, OW.cy + o], [OW.cx + 82, OW.cy + o]]).map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4" className={styles.owEnd} />)}
        {moving && OW_IN.map((p, k) => <circle key={`i${k}`} r="3.5" className={styles.dot}><animateMotion dur="2.2s" begin={`-${k * 1.1}s`} repeatCount="indefinite" path={inPath(p, k)} /></circle>)}
        {moving && <circle key={`o${on}`} r="3.5" className={styles.dot}><animateMotion dur="1.6s" repeatCount="indefinite" path={outPath(OW_OUT[on])} /></circle>}
      </svg>

      {/* The Blueprint: three sheets, the front one carrying the future workflow. */}
      <div className={styles.owBoard} style={{ left: 66, top: 36, width: 400, height: 428 }}>
        <span className={`${styles.owSheet} ${styles.owBack2}`} />
        <span className={`${styles.owSheet} ${styles.owBack}`} />
        <span className={styles.owSheet} />
        <span className={styles.owHead}>Blueprint</span>
        <span className={styles.owMore}><i /><i /><i /></span>
        <svg className={styles.owChart} viewBox="0 0 400 428" aria-hidden="true">
          <path d="M80 182 V130 H170 M250 130 H312 V182 M80 222 V286 H164 M244 286 H312 V222" className={styles.owWire} />
          <path d="M128 202 H178 M242 202 H276 M210 150 V170 M210 234 V266" className={styles.owWire} />
          <rect x="170" y="110" width="80" height="40" rx="8" className={styles.owBox} />
          <rect x="38" y="182" width="90" height="40" rx="8" className={`${styles.owBox} ${styles.owBoxOn}`} />
          <path d="M210 170 L242 202 L210 234 L178 202Z" className={styles.owBox} />
          <rect x="276" y="182" width="82" height="40" rx="8" className={styles.owBox} />
          <rect x="164" y="266" width="80" height="40" rx="8" className={styles.owBox} />
          <circle cx="312" cy="286" r="3.5" className={styles.owEnd} />
          <rect x="40" y="338" width="230" height="10" rx="5" className={styles.owBar} />
          <rect x="40" y="360" width="180" height="10" rx="5" className={styles.owBar} />
          <rect x="40" y="382" width="140" height="10" rx="5" className={styles.owBar} />
        </svg>
      </div>

      {/* The customer, who owns and controls both. */}
      <div className={styles.owOrb} style={{ left: OW.cx, top: OW.cy }}>
        <span className="orb-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <User weight="fill" className={styles.owUser} />
      </div>
      <span className={styles.owLabel} style={{ left: OW.cx, top: OW.cy + 104 }}>Customer</span>

      {/* The Framework the Blueprint is checked against. */}
      <div className={styles.owBoard} style={{ left: 826, top: 30, width: 380, height: 440 }}>
        <span className={styles.owSheet} />
        <span className={styles.owHead}>Framework</span>
        <span className={styles.owMore}><i /><i /><i /></span>
        {OW.rows.map((label, k) => (
          <div key={label} className={`${styles.owRow}${k === on ? ` ${styles.owRowOn}` : ''}`} style={{ top: 74 + k * 66 }}>
            <span className={styles.owCheck}><Check weight="bold" /></span>{label}<i className={styles.owCaret} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Industries: four sectors, one operating question ---------- */
// Drawn on a 720 x 480 stage. Four sector cards on the left; each threads into the same liquid-glass orb,
// the one Operating Domain where the outcome is not moving. One sector lights at a time.
const SH = { cx: 572, cy: 240, orb: 150, cardW: 300, rows: [78, 186, 294, 402] };
const SH_SECTORS = [['Manufacturing', Factory], ['BFSI', Bank], ['Healthcare and Life Sciences', Heartbeat], ['Enterprise Services', Briefcase]];

export function SectorHub() {
  const id = useId();
  const moving = !still();
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!moving) return undefined;
    const t = setInterval(() => setOn((p) => (p + 1) % SH_SECTORS.length), 2600);
    return () => clearInterval(t);
  }, [moving]);
  // Each thread meets the orb's halo at its own point on the left arc.
  const joint = (k) => { const a = ((210 - k * 20) * Math.PI) / 180; return [SH.cx + 96 * Math.cos(a), SH.cy + 96 * Math.sin(a)]; };
  const thread = (k) => { const y = SH.rows[k]; const [jx, jy] = joint(k); return `M${SH.cardW + 6} ${y} C${SH.cardW + 90} ${y} ${jx - 90} ${jy} ${jx} ${jy}`; };
  return (
    <div className={styles.stage} style={{ width: 720, height: 480 }}>
      <svg className={styles.svg} viewBox="0 0 720 480" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#1f5fff" stopOpacity=".5" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx={SH.cx} cy={SH.cy} r="190" fill={`url(#${id}-glow)`} className={styles.breathe} />
        <circle cx={SH.cx} cy={SH.cy} r="96" className={styles.shRing} />
        <circle cx={SH.cx} cy={SH.cy} r="128" className={styles.shRingDash} />
        {SH_SECTORS.map((_, k) => <path key={k} d={thread(k)} className={k === on ? styles.shLineOn : styles.shLine} />)}
        {SH_SECTORS.map((_, k) => { const [x, y] = joint(k); return <circle key={`j${k}`} cx={x} cy={y} r="4.5" className={styles.shJoint} />; })}
        {SH.rows.map((y) => <circle key={`e${y}`} cx={SH.cardW + 6} cy={y} r="4.5" className={styles.shJoint} />)}
        {moving && SH_SECTORS.map((_, k) => <circle key={`d${k}`} r="3.4" className={styles.dot}><animateMotion dur="2.6s" begin={`-${k * 0.65}s`} repeatCount="indefinite" path={thread(k)} /></circle>)}
      </svg>

      {SH_SECTORS.map(([label, Icon], k) => (
        <div key={label} className={`${styles.shCard}${k === on ? ` ${styles.shCardOn}` : ''}`} style={{ top: SH.rows[k], width: SH.cardW }}>
          <span className={styles.shIco}><Icon weight="duotone" /></span>
          <span className={styles.shLabel}>{label}</span>
          <span className={styles.shNum}>{String(k + 1).padStart(2, '0')}</span>
        </div>
      ))}

      <div className={styles.shOrb} style={{ left: SH.cx, top: SH.cy, width: SH.orb, height: SH.orb }}>
        <span className="orb-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <Target weight="bold" className={styles.shOrbIco} />
      </div>
      <span className={styles.shOrbLabel} style={{ left: SH.cx, top: SH.cy + 104 }}>One Operating Domain</span>
    </div>
  );
}

/* ---------- Evidence: production evidence is distinguished from pilots, demonstrations and roadmap ---------- */
// Drawn on a 790 x 480 stage. Four kinds of claim arrive from the left; the verification orb lets only
// production evidence through, and it lands as published proof: baseline, change, result, evidence source.
const EV = { cx: 420, cy: 240, inX: 236, rows: [96, 192, 288, 384], outX: 540 };
const EV_IN = [['Production evidence', ShieldCheck, true], ['Pilots', Flask, false], ['Demonstrations', Presentation, false], ['Roadmap', MapTrifold, false]];
const EV_PROOF = ['Baseline', 'Change', 'Result', 'Evidence source'];

export function EvidenceGate() {
  const id = useId();
  const moving = !still();
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!moving) return undefined;
    const t = setInterval(() => setOn((p) => (p + 1) % EV_PROOF.length), 1800);
    return () => clearInterval(t);
  }, [moving]);
  const joint = (k) => [EV.cx - 74, EV.cy + (k - 1.5) * 22];
  const inPath = (k) => { const y = EV.rows[k]; const [jx, jy] = joint(k); return `M${EV.inX} ${y} C${EV.inX + 70} ${y} ${jx - 70} ${jy} ${jx} ${jy}`; };
  const outPath = `M${EV.cx + 74} ${EV.cy} H${EV.outX}`;
  return (
    <div className={styles.stage} style={{ width: 790, height: 480 }}>
      <svg className={styles.svg} viewBox="0 0 790 480" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`}><stop stopColor="#1f5fff" stopOpacity=".5" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx={EV.cx} cy={EV.cy} r="190" fill={`url(#${id}-glow)`} className={styles.breathe} />
        <circle cx={EV.cx} cy={EV.cy} r="96" className={styles.shRing} />
        <circle cx={EV.cx} cy={EV.cy} r="124" className={styles.shRingDash} />
        {EV_IN.map(([, , ok], k) => <path key={k} d={inPath(k)} className={ok ? styles.shLineOn : styles.evLineDim} />)}
        {EV_IN.map(([, , ok], k) => { const [x, y] = joint(k); return ok ? <circle key={k} cx={x} cy={y} r="4.5" className={styles.shJoint} /> : <path key={k} d={`M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10`} className={styles.evStop} />; })}
        <path d={outPath} className={styles.shLineOn} />
        {moving && <circle r="3.5" className={styles.dot}><animateMotion dur="2.4s" repeatCount="indefinite" path={`${inPath(0)} L${EV.cx + 74} ${EV.cy} H${EV.outX}`} /></circle>}
        {moving && [1, 2, 3].map((k) => <circle key={k} r="2.6" className={styles.evDotDim}><animateMotion dur="2.4s" begin={`-${k * 0.6}s`} repeatCount="indefinite" path={inPath(k)} keyPoints="0;1" keyTimes="0;1" /></circle>)}
      </svg>

      {EV_IN.map(([label, Icon, ok], k) => (
        <div key={label} className={`${styles.evChip}${ok ? ` ${styles.evChipOn}` : ''}`} style={{ top: EV.rows[k], width: EV.inX - 6 }}>
          <span className={styles.shIco}><Icon weight="duotone" /></span>{label}
        </div>
      ))}

      <div className={styles.shOrb} style={{ left: EV.cx, top: EV.cy, width: 140, height: 140 }}>
        <span className="orb-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <SealCheck weight="fill" className={styles.shOrbIco} />
      </div>

      <div className={styles.evProof} style={{ left: EV.outX, top: EV.cy }}>
        <span className={styles.evProofHead}><ShieldCheck weight="fill" />Published proof</span>
        {EV_PROOF.map((label, k) => (
          <div key={label} className={`${styles.evRow}${k === on ? ` ${styles.evRowOn}` : ''}`}>
            <span className={styles.evNum}>{String(k + 1).padStart(2, '0')}</span>{label}<Check weight="bold" className={styles.evTick} />
          </div>
        ))}
      </div>
    </div>
  );
}
