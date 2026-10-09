import { useEffect, useRef, useState } from 'react';
import Eyebrow from './Eyebrow';
import {
  SquaresFour, Database, UsersThree, ShieldCheck, FileText, Graph, Lightning, Stack, ChartBar,
  User, Calculator, Scales, Gear, CheckCircle, Circle,
} from '@phosphor-icons/react';
import { ENTERPRISES, HOME_LINKS } from '../content';
import ExploreLinks from './ExploreLinks';

/* Each scene lives in a 500 x 400 space; HTML labels sit on the SVG at % positions. */
const VW = 500;
const VH = 400;
const at = (x, y) => ({ left: `${(x / VW) * 100}%`, top: `${(y / VH) * 100}%` });
const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Designed: systems feeding a stack of architecture layers ---------- */
const SOURCES = [
  { label: 'Applications', icon: SquaresFour, x: 88 },
  { label: 'Data', icon: Database, x: 196 },
  { label: 'People', icon: UsersThree, x: 304 },
  { label: 'Policies', icon: ShieldCheck, x: 412 },
];
/*
  Three thin glass plates seen from above at an angle. Plates are wide, flat hexagons with rounded
  corners, translucent so the ones below show through, edged with light, and lit from a single
  point on the top plate's back edge where the sources converge.
*/
const H = 46;
const D = 7;
const LAYERS = [
  { label: 'Process layer', icon: FileText, y: 196 },
  { label: 'Decision layer', icon: Graph, y: 256 },
  { label: 'Execution layer', icon: Lightning, y: 316 },
];
const CORE_Y = LAYERS[0].y - H;
const feed = (x) => `M${x} 104 C${x} 128 250 ${CORE_Y - 26} 250 ${CORE_Y}`;
const hexPts = (y) => [[18, y], [92, y - H], [408, y - H], [482, y], [408, y + H], [92, y + H]];

// Closed path through the points with every corner rounded by radius r.
function rounded(pts, r) {
  const n = pts.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[(i - 1 + n) % n];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[(i + 1) % n];
    const l1 = Math.hypot(cx - px, cy - py);
    const l2 = Math.hypot(nx - cx, ny - cy);
    const a = [cx + ((px - cx) / l1) * r, cy + ((py - cy) / l1) * r];
    const b = [cx + ((nx - cx) / l2) * r, cy + ((ny - cy) / l2) * r];
    d += `${i === 0 ? 'M' : 'L'}${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${cx} ${cy} ${b[0].toFixed(1)} ${b[1].toFixed(1)} `;
  }
  return `${d}Z`;
}
const plate = (y) => rounded(hexPts(y), 12);
// Front edge only (left point -> front -> right point): the plate's lit lip.
const front = (y) => `M24 ${y + 3} L92 ${y + H - 1} Q96 ${y + H + 1} 104 ${y + H} L396 ${y + H} Q404 ${y + H + 1} 408 ${y + H - 1} L476 ${y + 3}`;

function DesignedScene({ animate }) {
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="ef-svg">
        <defs>
          <linearGradient id="ef-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a64d8" stopOpacity="0.55" />
            <stop offset="30%" stopColor="#14408f" stopOpacity="0.7" />
            <stop offset="52%" stopColor="#0b2563" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#060f2a" stopOpacity="0.98" />
          </linearGradient>
          <radialGradient id="ef-hot" cx="50%" cy="0%" r="75%" fx="50%" fy="0%">
            <stop offset="0%" stopColor="#cdeaff" stopOpacity="0.95" />
            <stop offset="18%" stopColor="#5fb4ff" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#2a64d8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2a64d8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ef-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5fb4ff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#cdeaff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5fb4ff" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="ef-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3f8cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="250" cy="372" rx="240" ry="22" fill="url(#ef-floor)" />
        {[...LAYERS].reverse().map((l, i) => {
          const isTop = i === LAYERS.length - 1;
          return (
            <g key={l.label} className={`ef-plate${isTop ? ' top' : ''}`} style={{ animationDelay: `${i * -0.9}s` }}>
              <path d={plate(l.y + D)} className="ef-plate-under" />
              <path d={plate(l.y)} fill="url(#ef-glass)" className="ef-plate-face" />
              {isTop && <path d={plate(l.y)} fill="url(#ef-hot)" className="ef-plate-hot" />}
              <path d={front(l.y)} stroke="url(#ef-edge)" className="ef-plate-lip" />
            </g>
          );
        })}
        {SOURCES.map((s) => <path key={s.label} d={feed(s.x)} className="ef-feed" />)}
        <circle cx="250" cy={CORE_Y} r="6" className="ef-core" />
        {animate && SOURCES.map((s, i) => (
          <circle key={s.label} r="3.2" className="ef-runner">
            <animateMotion dur="2.4s" begin={`-${i * 0.6}s`} repeatCount="indefinite" path={feed(s.x)} />
          </circle>
        ))}
      </svg>
      {SOURCES.map(({ label, icon: Icon, x }) => (
        <div key={label} className="ef-source" style={at(x, 54)}><Icon weight="fill" /><span>{label}</span></div>
      ))}
      {LAYERS.map(({ label, icon: Icon, y }) => (
        <div key={label} className="ef-layer" style={at(150, y + 24)}><Icon /><span>{label}</span></div>
      ))}
    </>
  );
}

/* ---------- Observed: many real paths, with work looping back ---------- */
const COLS = [['Intake', 112], ['Triage', 188], ['Review', 266], ['Approve', 346], ['Fulfil', 424]];
const IN = [30, 132];
const OUT = [470, 236];
const LANES = [192, 222, 252, 282];
// Lanes fan out gradually from the entry point and merge gradually into the exit.
const lane = (y) => `M${IN[0]} ${IN[1]} C112 ${IN[1]} 118 ${y} 186 ${y} L360 ${y} C412 ${y} 420 ${OUT[1]} ${OUT[0]} ${OUT[1]}`;
// Rework loop: rises from the exit, runs back over the lanes and drops into the top lane.
const LOOP = `M${OUT[0]} ${OUT[1] - 10} L${OUT[0]} 128 Q${OUT[0]} 98 440 98 L262 98 Q230 98 230 128 L230 166 Q230 ${LANES[0]} 258 ${LANES[0]}`;
// [lane index, duration s, start offset s, highlighted]
const CHIPS = [
  [0, 7.2, 0, false], [0, 7.2, 3.6, true], [1, 8.4, 1.2, true], [1, 8.4, 5.4, false],
  [2, 6.6, 2.1, false], [2, 6.6, 5.0, true], [3, 9.2, 0.7, false], [3, 9.2, 4.9, true],
  [0, 7.2, 5.6, false], [1, 8.4, 3.1, false], [2, 6.6, 0.4, false], [3, 9.2, 2.8, false],
];

function ObservedScene({ animate }) {
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="ef-svg">
        <defs>
          <marker id="ef-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#5fb4ff" />
          </marker>
          <radialGradient id="ef-out" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bfe6ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3f8cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {COLS.map(([name, x]) => <line key={name} x1={x} y1="64" x2={x} y2="326" className="ef-col" />)}
        {LANES.map((y) => <path key={y} d={lane(y)} className="ef-lane" />)}
        <path d={LOOP} className="ef-loop-glow" />
        <path d={LOOP} className="ef-loop" markerEnd="url(#ef-arrow)" />
        {/* Direction arrows on the loop's top run and right leg. */}
        <path d="M352 92 L340 98 L352 104" className="ef-loop-head" />
        <path d={`M${OUT[0] - 6} 160 L${OUT[0]} 150 L${OUT[0] + 6} 160`} className="ef-loop-head" />
        <circle cx={OUT[0]} cy={OUT[1]} r="22" fill="url(#ef-out)" className="ef-out-glow" />
        <circle cx={IN[0]} cy={IN[1]} r="5.5" className="ef-core" />
        <circle cx={OUT[0]} cy={OUT[1]} r="6.5" className="ef-core" />
        {CHIPS.map(([li, dur, off, hot], i) => (animate ? (
          <rect key={i} x="-11" y="-5.5" width="22" height="11" rx="2.5" className={`ef-chip${hot ? ' hot' : ''}`}>
            <animateMotion dur={`${dur}s`} begin={`-${off}s`} repeatCount="indefinite" rotate="auto" path={lane(LANES[li])} />
            <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.12;0.22;0.8;0.9;1" dur={`${dur}s`} begin={`-${off}s`} repeatCount="indefinite" />
          </rect>
        ) : (
          <rect key={i} x={170 + ((off * 53) % 200) - 11} y={LANES[li] - 5.5} width="22" height="11" rx="2.5" className={`ef-chip${hot ? ' hot' : ''}`} />
        )))}
        {animate && (
          <circle r="3.4" className="ef-runner">
            <animateMotion dur="3.6s" repeatCount="indefinite" path={LOOP} />
          </circle>
        )}
      </svg>
      <span className="ef-tag" style={at(IN[0] - 6, IN[1] - 24)}>Work enters</span>
      <span className="ef-tag right" style={at(OUT[0] + 22, OUT[1] + 18)}>Work<br />completes</span>
      <div className="ef-reopen" style={at(318, 50)}><small>Reopened</small><b>38% of cases</b></div>
      {COLS.map(([name, x]) => <span key={name} className="ef-col-label" style={at(x, 350)}>{name}</span>)}
    </>
  );
}

/* ---------- Lived: the approval chain people actually walk ---------- */
const APPROVERS = [
  { n: '01', name: 'Business Owner', sub: 'Review and approve', icon: User, hours: 18 },
  { n: '02', name: 'Finance', sub: 'Validate and approve', icon: Calculator, hours: 20 },
  { n: '03', name: 'Legal', sub: 'Assess and approve', icon: Scales, hours: 22 },
  { n: '04', name: 'Operations', sub: 'Final approval', icon: Gear, hours: 12 },
];
const ROW_Y = [52, 124, 196, 268];
const TOTAL = APPROVERS.reduce((s, a) => s + a.hours, 0);
const TICKS = [[44, '0h'], [180, '24h'], [316, '48h'], [452, '72h']];
const CYCLE = 9000;

function LivedScene({ animate, active }) {
  const [t, setT] = useState(animate ? 0 : 1);
  useEffect(() => {
    if (!animate || !active) return undefined;
    const t0 = performance.now() - t * CYCLE;
    const id = setInterval(() => setT(((performance.now() - t0) % (CYCLE + 1400)) / CYCLE), 90);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, active]);
  const progress = Math.min(t, 1);
  let acc = 0;
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="ef-svg">
        <line x1="148" y1={ROW_Y[0]} x2="148" y2={ROW_Y[3]} className="ef-spine" />
        <line x1="128" y1="170" x2="148" y2="170" className="ef-spine" />
        {ROW_Y.map((y) => (
          <g key={y}>
            <line x1="148" y1={y} x2="168" y2={y} className="ef-spine" />
            <circle cx="148" cy={y} r="3.6" className="ef-node" />
          </g>
        ))}
        <line x1="44" y1="332" x2="452" y2="332" className="ef-axis" />
        <line x1="44" y1="332" x2={44 + 408 * progress} y2="332" className="ef-axis-fill" />
        {TICKS.map(([x]) => <circle key={x} cx={x} cy="332" r="3.4" className={`ef-tick${44 + 408 * progress >= x - 1 ? ' on' : ''}`} />)}
      </svg>
      <div className="ef-request" style={at(76, 170)}>
        <span className="ef-request-ico"><FileText weight="fill" /></span>
        <b>Request</b><small>Needs approval</small>
      </div>
      {APPROVERS.map(({ n, name, sub, icon: Icon, hours }, i) => {
        acc += hours;
        const done = progress >= acc / TOTAL - 0.001;
        return (
          <div key={name} className={`ef-row${done ? ' done' : ''}`} style={at(300, ROW_Y[i])}>
            <span className="ef-row-ico"><Icon /></span>
            <em>{n}</em>
            <span className="ef-row-text"><b>{name}</b><small>{sub}</small></span>
            {done ? <CheckCircle weight="fill" className="ef-check" /> : <Circle className="ef-check off" />}
            <span className="ef-hours">+{hours}h</span>
          </div>
        );
      })}
      {TICKS.map(([x, l]) => <span key={l} className="ef-tick-label" style={at(x, 360)}>{l}</span>)}
    </>
  );
}

const SCENES = { designed: DesignedScene, observed: ObservedScene, lived: LivedScene };
const KICKER = { designed: Stack, observed: ChartBar, lived: UsersThree };

export default function Enterprises() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const animate = !reduce();

  // Only run the approval clock while the section is on screen.
  useEffect(() => {
    if (!ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="three-enterprises" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <Eyebrow id="enterprises" />
          <h2 className="h-section">{ENTERPRISES.title}</h2>
          <p className="lead">{ENTERPRISES.sub}</p>
          <ExploreLinks links={HOME_LINKS.enterprises} />
        </div>
      </div>
      <div className="container">
        <div className="ef-cards">
          {ENTERPRISES.items.map((it, i) => {
            const Scene = SCENES[it.id];
            const Kicker = KICKER[it.id];
            return (
              <article key={it.id} className={`ef-card ef-${it.id}`} data-reveal style={{ '--i': i }}>
                <div className="ef-stage" aria-hidden="true"><Scene animate={animate} active={active} /></div>
                <div className="ef-body">
                  <span className="ef-kicker"><Kicker weight="fill" />{it.panelTitle}</span>
                  <h3>{it.name}</h3>
                  <p>{it.line}</p>
                  <small>{it.note}</small>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
