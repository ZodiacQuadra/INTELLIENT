import { Crosshair, CheckCircle, TreeStructure, Database, FileText, UsersThree, WarningCircle } from '@phosphor-icons/react';
import { DOMAINS } from '../content';

/*
  Orbital map of an Operating Domain in a 640 x 500 space: the outcome at the centre, the four
  parts that produce it on the ring, and friction clusters outside that feed particles inward.
*/
const VW = 640;
const VH = 500;
const CX = 320;
const CY = 250;
const pos = (x, y) => ({ left: `${(x / VW) * 100}%`, top: `${(y / VH) * 100}%` });
const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const NODES = [
  { id: 'workflows', label: 'Workflows', icon: TreeStructure, x: CX, y: 78 },
  { id: 'systems', label: 'Systems', icon: Database, x: 492, y: CY },
  { id: 'decisions', label: 'Decisions', icon: FileText, x: CX, y: 422 },
  { id: 'owners', label: 'Owners', icon: UsersThree, x: 148, y: CY },
];

// Four friction slots around the ring: cluster position, callout position and the path inward.
const SLOTS = {
  tl: { cluster: [68, 88], card: [175, 115], path: 'M88 92 C130 92 148 160 148 220' },
  tr: { cluster: null, card: [515, 115], path: 'M520 125 C485 85 410 78 320 78' },
  br: { cluster: [562, 412], card: [495, 385], path: 'M544 406 C492 406 492 340 492 280' },
  bl: { cluster: [68, 412], card: [165, 385], path: 'M88 406 C135 406 148 340 148 280' },
};

// What the friction looks like for each tab, and which parts of the domain it sits in.
const FRICTION = {
  delay: {
    hot: ['workflows', 'systems'],
    calls: {
      tl: { tone: 'alert', title: 'Queue', value: '12 items' },
      tr: { tone: 'alert', title: 'Approval wait', value: '3.4 days', icon: true },
      br: { tone: 'blue', title: 'Queue', value: '8 items' },
      bl: { tone: 'warm', title: 'Handoff', value: '2 teams' },
    },
  },
  exceptions: {
    hot: ['workflows', 'owners'],
    calls: {
      tl: { tone: 'alert', title: 'Manual review', value: '34% of cases' },
      tr: { tone: 'warm', title: 'Rework loop', value: 'loop 2', icon: true },
      br: { tone: 'blue', title: 'Off path', value: '19 cases' },
      bl: { tone: 'warm', title: 'Resolver', value: 'unclear owner' },
    },
  },
  decisions: {
    hot: ['decisions', 'owners'],
    calls: {
      tl: { tone: 'blue', title: 'Approvers', value: '4 teams' },
      tr: { tone: 'alert', title: 'Escalation', value: '72 hours', icon: true },
      br: { tone: 'warm', title: 'Sources', value: '3 disagree' },
      bl: { tone: 'warm', title: 'Decision rights', value: 'unclear' },
    },
  },
};

const TONE = { blue: '#5aa9ff', alert: '#ff5a6a', warm: '#ffab4a' };
const BUBBLES = [[0, 0], [14, -3], [27, 2], [-5, 13], [9, 11], [23, 14], [4, 25], [17, 26]];

function Cluster({ x, y, tone }) {
  return (
    <g className={`dm-cluster ${tone}`}>
      {BUBBLES.map(([dx, dy], i) => <circle key={i} cx={x + dx - 10} cy={y + dy - 12} r="5.2" />)}
    </g>
  );
}

function OrbitMap({ data }) {
  const animate = !reduce();
  return (
    <div className="dm-map" aria-hidden="true">
      <svg viewBox={`0 0 ${VW} ${VH}`} className="dm-svg">
        <defs>
          <radialGradient id="dm-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#3f8cff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#3f8cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r="240" fill="url(#dm-halo)" />
        <g className="dm-spin">
          <circle cx={CX} cy={CY} r="228" className="dm-ring dashed" />
          {animate && <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="90s" repeatCount="indefinite" />}
        </g>
        <circle cx={CX} cy={CY} r="172" className="dm-ring" />
        <circle cx={CX} cy={CY} r="82" className="dm-ring inner" />
        {[[CX, 64], [CX, 436], [134, CY], [506, CY]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" className="dm-tick" />)}
        {Object.entries(SLOTS).map(([slot, s]) => {
          const call = data.calls[slot];
          return (
            <g key={slot}>
              {s.cluster && <Cluster x={s.cluster[0]} y={s.cluster[1]} tone={call.tone} />}
              <path d={s.path} className="dm-flow" style={{ stroke: TONE[call.tone] }} />
              {animate && [0, 1.1, 2.2].map((b) => (
                <circle key={b} r="3.2" className="dm-particle" style={{ fill: TONE[call.tone], color: TONE[call.tone] }}>
                  <animateMotion dur="3.3s" begin={`-${b}s`} repeatCount="indefinite" path={s.path} />
                </circle>
              ))}
            </g>
          );
        })}
      </svg>
      <div className="dm-orb" style={pos(CX, CY)}>
        <div className="dm-orb-glow" aria-hidden="true" />
        <div className="dm-orb-swirl" aria-hidden="true" />
        <div className="dm-orb-glass" aria-hidden="true" />
        <span className="dm-orb-label">Outcome</span>
      </div>
      {NODES.map(({ id, label, icon: Icon, x, y }) => (
        <div key={id} className={`dm-node${data.hot.includes(id) ? ' hot' : ''}`} style={pos(x, y)}>
          <span className="dm-node-ico"><Icon /></span>
          <span className="dm-node-label">{label}</span>
        </div>
      ))}
      {Object.entries(SLOTS).map(([slot, s]) => {
        const call = data.calls[slot];
        return (
          <div key={slot} className={`dm-call ${call.tone}`} style={pos(s.card[0], s.card[1])}>
            {call.icon ? <WarningCircle weight="fill" className="dm-call-ico" /> : <i className="dm-dot" />}
            <span className="dm-call-content">
              <b>{call.title}</b>
              <small>{call.value}</small>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Domains() {
  // A single scene: the delay view of an Operating Domain.
  const f = DOMAINS.frictions[0];
  return (
    <section className="section dm-section" id="domains">
      <span className="dm-planet" aria-hidden="true" />
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow"><Crosshair />{DOMAINS.eyebrow}</span>
          <h2 className="h-section">{DOMAINS.title} <span className="accent">{DOMAINS.accent}</span></h2>
          <p className="lead">{DOMAINS.body}</p>
        </div>
        <div data-reveal>
          <div className="dm-card">
            <div className="dm-copy">
              <p className="problem">{f.problem}</p>
              <h3>{f.outcome}</h3>
              <p className="detail">{f.detail}</p>
              <span className="dm-metric">{f.metric}</span>
            </div>
            <OrbitMap data={FRICTION[f.id]} />
          </div>
          <ul className="criteria">
            {DOMAINS.criteria.map((c) => <li key={c}><CheckCircle weight="fill" />{c}</li>)}
          </ul>
          <p className="note" style={{ marginTop: 22 }}>Outcome figures are from Intellient&apos;s illustrative operating benchmark.</p>
        </div>
      </div>
    </section>
  );
}
