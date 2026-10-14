import { useId } from 'react';
import { Factory, Bank, Heartbeat, Briefcase, Check, ArrowRight, ShieldCheck } from '@phosphor-icons/react';
import styles from './CollectionVisuals.module.css';

const Text = ({ x, y, children, muted = false, anchor = 'start', icon: Icon }) => {
  if (muted) return <text x={x} y={y} textAnchor={anchor} className={styles.muted}>{children}</text>;
  if (Icon) {
    const w = String(children).length * 7.6 + 62;
    return <g className={styles.chip}>
      <rect x={x - 44} y={y - 22} width={w} height="34" rx="17" className={styles.chipFill} />
      <circle cx={x - 25} cy={y - 5} r="12" className={styles.chipIcon} />
      <Icon x={x - 33} y={y - 13} width="16" height="16" color="#8fcbff" />
      <text x={x} y={y} className={styles.label}>{children}</text>
    </g>;
  }
  const w = String(children).length * 7.1 + 24;
  const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w + 12 : x - 12;
  return <g className={styles.chip}><rect x={left} y={y - 17} width={w} height="25" rx="12.5" className={styles.chipFill} /><text x={x} y={y} textAnchor={anchor} className={styles.label}>{children}</text></g>;
};
const still = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// A stable offset per path, so particles on neighbouring routes do not move in step.
const phase = (d) => [...d].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 997, 7) / 997;
const TONE = { dim: 'rgba(143, 203, 255, 0.07)', low: 'rgba(63, 140, 255, 0.16)', mid: 'rgba(63, 140, 255, 0.32)' };
const EDGE = { dim: 'rgba(143, 203, 255, 0.28)', low: 'rgba(143, 203, 255, 0.38)', mid: 'rgba(143, 203, 255, 0.5)', hot: '#e9f6ff' };
const Path = ({ d, soft = false, dashed = false, quiet = false }) => {
  const moving = !still() && !quiet;
  return <>
    <path d={d} className={`${soft ? styles.soft : styles.path} ${dashed ? `${styles.dashed} ${styles.march}` : ''}`} />
    {moving && soft && !dashed && <path d={d} className={styles.trail} style={{ animationDelay: `-${(phase(d) * 3).toFixed(2)}s` }} />}
    {moving && !soft && !dashed && <circle r="3.4" className={styles.dot}><animateMotion dur="3.6s" begin={`-${(phase(d) * 3.6).toFixed(2)}s`} repeatCount="indefinite" path={d} /></circle>}
  </>;
};
const Point = ({ x, y, small = false }) => <circle cx={x} cy={y} r={small ? 3 : 5} className={styles.point} style={{ animationDelay: `-${((x + y) % 7) * 0.45}s` }} />;
const Checkpoint = ({ x, y }) => <g transform={`translate(${x} ${y})`}><path d="M0 -14 L12 -8 V4 Q12 12 0 18 Q-12 12 -12 4 V-8 Z" className={styles.shield} style={{ animationDelay: `-${(x % 5) * 0.5}s` }} /><Check x={-7} y={-4} width="14" height="14" color="#ffffff" weight="bold" /></g>;
const Orb = ({ id, x, y, r }) => <g className={styles.float}>
  <circle cx={x} cy={y} r={r * 1.9} className={styles.halo} />
  <circle cx={x} cy={y} r={r * 1.15} className={styles.ripple} />
  <circle cx={x} cy={y} r={r} fill={`url(#${id}-orb)`} className={styles.orb} />
  <ellipse cx={x - r * 0.28} cy={y - r * 0.42} rx={r * 0.46} ry={r * 0.22} className={styles.spec} />
</g>;
const Document = ({ x, y, large = false }) => <g transform={`translate(${x} ${y}) scale(${large ? 1.2 : 1})`}><path d="M0 0 H38 L52 14 V70 H0 Z M38 0 V14 H52" className={styles.glass} /><path d="M11 29 H40 M11 40 H40 M11 51 H29" className={styles.docLines} /></g>;

function IndustryOverview({ id }) {
  const sectors = [[Factory, 'Manufacturing', 68], [Bank, 'BFSI', 158], [Heartbeat, 'Healthcare and Life Sciences', 248], [Briefcase, 'Enterprise Services', 338]];
  return <>
    <circle cx="450" cy="210" r="118" className={styles.ring} />
    <circle cx="450" cy="210" r="86" className={`${styles.ring} ${styles.dashed}`} />
    {sectors.map(([Icon, label, y], index) => <g key={label}>
      <Text x={74} y={y + 5} icon={Icon}>{label}</Text>
      <Path d={`M70 ${y + 24} H295 C345 ${y + 24} 365 210 402 210`} />
      <Point x={295} y={y + 24} small />
    </g>)}
    <Orb id={id} x={450} y={210} r={44} />
    <ArrowRight x="435" y="195" width="30" height="30" color="#ffffff" weight="bold" />
    <Text x={450} y={292} anchor="middle">One domain</Text>
  </>;
}

function Manufacturing({ id }) {
  return <>
    {[['Production', 87], ['Quality', 153], ['Maintenance', 219], ['Supply', 285]].map(([label, y], index) => <g key={label}>
      <Text x={40} y={y - 30}>{label}</Text>
      <Path d={`M28 ${y} H195 C248 ${y} 260 186 312 186`} />
      <Path d={`M32 ${y} h28 l8 -${12 + index * 2} l13 ${24 + index * 4} l14 -${12 + index * 2} h85`} soft />
      <Point x={195} y={y} small />
    </g>)}
    <Orb id={id} x={352} y={186} r={38} />
    <Factory x="336" y="170" width="32" height="32" color="#ffffff" />
    <Text x={352} y={258} anchor="middle">Plant decision</Text>
    <Path d="M399 186 H557" /><Point x={557} y={186} />
    <Text x={557} y={161} anchor="end">Decision made</Text>
    <Path d="M515 186 V326 H397" soft dashed />
    <Text x={397} y={353}>Plant lead</Text>
    <path d="M26 324 H300 M26 333 H214" className={`${styles.rule} ${styles.legend}`} />
  </>;
}

function Bfsi({ id }) {
  return <>
    {['Application', 'Customer record', 'Risk signals'].map((label, index) => <g key={label}><Text x={28} y={78 + index * 55}>{label}</Text><Path d={`M28 ${94 + index * 55} H116 Q156 ${94 + index * 55} 173 194`} soft /></g>)}
    <Document x={180} y={159} />
    <Text x={206} y={264} anchor="middle">Case assembled</Text>
    <Path d="M233 194 H561" />
    {[['Evidence', 331], ['Authority', 439]].map(([label, x]) => <g key={label}>
      <path d={`M${x} 132 V246`} className={styles.boundary} />
      <Checkpoint x={x} y={194} /><Text x={x} y={285} anchor="middle">{label}</Text>
    </g>)}
    <Point x={561} y={194} /><Text x={561} y={164} anchor="end">Decision</Text>
    <Path d="M439 300 V337 H249" dashed soft />
    <Text x={249} y={365}>Accountable officer</Text>
    <path d="M284 104 H486 M284 113 H437" className={`${styles.rule} ${styles.legend}`} />
  </>;
}

function Healthcare({ id }) {
  return <>
    {['Knowledge', 'Documents', 'Operations'].map((label, index) => <g key={label}>
      <Document x={35 + index * 62} y={96 + index * 29} />
      <Text x={30 + index * 75} y={75 + index * 30}>{label}</Text>
      <Path d={`M${87 + index * 62} ${130 + index * 29} C240 ${130 + index * 29} 215 241 283 241`} soft />
    </g>)}
    <path d="M281 176 H362 L385 199 V306 H281 Z M362 176 V199 H385" fill={`url(#${id}-glass)`} className={styles.outline} />
    <path d="M303 212 H361 M303 229 H361 M303 246 H336" className={styles.path} />
    <Check x="340" y="263" width="27" height="27" color="#a9dfff" />
    <Text x={333} y={341} anchor="middle">Evidence prepared</Text>
    <Path d="M385 241 H551" /><Checkpoint x={457} y={241} />
    <Text x={457} y={207} anchor="middle">Review</Text>
    <Point x={551} y={241} />
    <Text x={484} y={283}>Ready for review</Text>
    <Path d="M457 268 V365" soft dashed />
    <Text x={565} y={390} anchor="end">Accountable reviewer</Text>
  </>;
}

function Services() {
  return <>
    {['Service request', 'Knowledge', 'Onboarding', 'Managed work'].map((label, index) => <g key={label}>
      <Text x={28} y={80 + index * 68}>{label}</Text>
      <Path d={`M28 ${100 + index * 68} H${200 + index * 24} Q${245 + index * 20} ${100 + index * 68} 302 212 H555`} soft />
      <path d={`M${164 + index * 23} ${92 + index * 68} l9 8 l-9 8`} className={styles.path} />
    </g>)}
    <path d="M281 153 H329 V269 H281 M294 168 V254 M315 168 V254" className={styles.boundary} />
    <Path d="M329 212 H555" />
    <Point x={555} y={212} />
    <Text x={419} y={176} anchor="middle">Context reassembled</Text>
    <Text x={565} y={252} anchor="end">Hand-off complete</Text>
    <Path d="M345 212 V346" dashed soft />
    <Text x={345} y={378} anchor="middle">Service owner</Text>
  </>;
}

function Performance({ id }) {
  const labels = ['Work', 'Waiting', 'Exceptions', 'Rework'];
  const lengths = [[82, 199, 99, 72], [82, 63, 36, 18]];
  return <>
    <Text x={28} y={60}>Elapsed time for one case</Text>
    {lengths.map((values, row) => { let x = 95; return <g key={row}>
      <Text x={28} y={142 + row * 108} muted>{row ? 'After' : 'Before'}</Text>
      <path d={`M95 ${177 + row * 108} H551`} className={styles.rule} />
      {values.map((width, index) => { const current = x; x += width + 3; return <g key={index}><rect className={index === 0 ? styles.lit : undefined} x={current} y={113 + row * 108} width={width} height="48" rx="4" fill={index === 0 ? `url(#${id}-bright)` : ['', TONE.mid, TONE.low, TONE.dim][index]} stroke={[EDGE.hot, EDGE.mid, EDGE.low, EDGE.dim][index]} strokeOpacity={index === 0 ? 0.7 : 1} />{row === 0 && <Path d={`M${current + width / 2} 163 V190`} soft quiet />}</g>; })}
    </g>; })}
    {labels.map((label, index) => <g key={label} className={styles.legend}><rect x={28 + index * 143} y="337" width="7" height="7" rx="1" fill={['#8fcbff', TONE.mid, TONE.low, TONE.dim][index]} stroke={[EDGE.hot, EDGE.mid, EDGE.low, EDGE.dim][index]} strokeWidth=".8" /><Text x={44 + index * 143} y={345} muted>{label}</Text></g>)}
    <Path d="M303 224 H551" dashed soft /><path d="M542 219 l9 5 l-9 5" className={styles.soft} />
    {!still() && <g className={styles.playhead}><path d="M95 100 V300" /><circle cx="95" cy="100" r="3.5" /><animateTransform attributeName="transform" type="translate" values="0 0; 456 0" dur="5s" repeatCount="indefinite" /></g>}
  </>;
}

function Revenue({ id }) {
  return <>
    <Text x={28} y={60}>Time to a commercial decision</Text>
    <Text x={28} y={94} muted>Before</Text><Text x={28} y={247} muted>After</Text>
    <Path d="M40 150 H152 V185 H270 V123 H431 V150 H556" soft />
    <Path d="M40 280 H103 Q113 280 121 269 L140 252 Q149 243 162 243 H296" />
    <Orb id={id} x={296} y={243} r={14} />
    <Path d="M313 243 H556" dashed soft />
    {[['Finding context', 88, 150], ['Hand-offs', 213, 185], ['Approval', 350, 123], ['Decision', 540, 150]].map(([label, x, y]) => <g key={label}><Point x={x} y={y} small /><Text x={x} y={y - 26} anchor="middle" muted>{label}</Text></g>)}
    <Point x={40} y={280} /><Text x={296} y={296} anchor="middle">Decision</Text>
    <path d="M40 355 H556 M40 350 V360 M296 350 V360 M556 350 V360" className={`${styles.rule} ${styles.legend}`} />
  </>;
}

function Capacity({ id }) {
  const colors = [TONE.dim, TONE.mid, `url(#${id}-bright)`];
  const edges = [EDGE.dim, EDGE.mid, EDGE.hot];
  const tone = (row, index) => (row ? (index < 3 ? 0 : index < 5 ? 1 : 2) : (index < 9 ? 0 : index < 17 ? 1 : 2));
  return <>
    <Text x={28} y={54}>Where a specialist's week goes</Text>
    {[0, 1].map(row => <g key={row} transform={`translate(${row ? 324 : 28} 92)`}>
      <Text x={0} y={0} muted>{row ? 'After' : 'Before'}</Text>
      {Array.from({ length: 25 }, (_, index) => <path key={index} d={`M${index % 5 * 44} ${Math.floor(index / 5) * 41 + 23} l30 -6 l9 9 l-30 6 Z`} fill={colors[tone(row, index)]} stroke={edges[tone(row, index)]} strokeWidth=".8" className={(row ? index >= 5 : index >= 17) ? styles.shimmer : undefined} style={{ animationDelay: `-${(index % 5) * 0.35 + Math.floor(index / 5) * 0.2}s` }} />)}
    </g>)}
    <ArrowRight x="274" y="192" width="27" height="27" color="#8fcbff" />
    {['Coordination', 'Reconstruction', 'Expertise applied'].map((label, index) => <g key={label} className={styles.legend}><rect x={28} y={328 + index * 27} width="8" height="8" rx="1" fill={colors[index]} /><Text x={48} y={337 + index * 27} muted>{label}</Text><path d={`M220 ${333 + index * 27} H565`} className={styles.rule} /></g>)}
  </>;
}

function Risk({ id }) {
  return <>
    <Text x={28} y={107}>Request</Text><Text x={28} y={273}>Data</Text>
    <Path d="M28 129 H107 Q132 129 148 202 M28 251 H107 Q132 251 148 202" soft />
    <Path d="M148 202 H557" />
    {[['Permissions', 212], ['Evidence', 342], ['Approval', 471]].map(([label, x], index) => <g key={label}>
      <path d={`M${x - 24} 140 H${x + 24} V264 H${x - 24}`} fill={index === 2 ? `url(#${id}-glass)` : 'none'} className={styles.boundary} />
      <Checkpoint x={x} y={202} /><Text x={x} y={111} anchor="middle">{label}</Text>
    </g>)}
    <Point x={557} y={202} /><Text x={565} y={292} anchor="end">Action taken</Text>
    <Path d="M342 264 V327 H500" soft dashed />
    <ShieldCheck x="463" y="317" width="26" height="26" color="#8fcbff" weight="duotone" />
    <Text x={565} y={369} anchor="end">Exception owner</Text>
    <Text x={28} y={369} muted>In the workflow</Text>
  </>;
}

const scenes = { sectors: IndustryOverview, manufacturing: Manufacturing, bfsi: Bfsi, 'healthcare-life-sciences': Healthcare, 'enterprise-services': Services, 'operating-performance': Performance, 'revenue-movement': Revenue, 'employee-capacity': Capacity, 'risk-control': Risk };
const descriptions = {
  sectors: 'Four sectors connect to one Operating Domain.', manufacturing: 'Production, quality, maintenance and supply signals converge into a plant decision, with the plant lead accountable.',
  bfsi: 'An assembled case passes evidence and authority checks before a decision, with an accountable officer.', 'healthcare-life-sciences': 'Knowledge, documents and operational context prepare evidence for an accountable review.',
  'enterprise-services': 'Service requests, knowledge, onboarding and managed work share context before the hand-off.', 'operating-performance': 'Illustrative before and after case timelines distinguish work, waiting, exceptions and rework.',
  'revenue-movement': 'Illustrative decision paths show how finding context, hand-offs and approval affect time to a commercial decision.', 'employee-capacity': 'Illustrative specialist workweeks distinguish coordination, reconstruction and expertise applied.',
  'risk-control': 'Permissions, evidence and approval are embedded in the workflow, with an exception owner.'
};

// Compact previews are cropped to each drawing, so it sits centred in its card.
const COMPACT_VIEW = { 'operating-performance': '70 92 500 214', 'revenue-movement': '20 104 560 196', 'employee-capacity': '10 98 580 210', 'risk-control': '10 112 580 248' };

export default function CollectionVisual({ scene, compact = false }) {
  const id = useId();
  const Scene = scenes[scene];
  if (!Scene) return null;
  return <svg className={`${styles.visual} ${compact ? styles.compact : ''} ${scene === 'sectors' ? styles.sectors : ''}`} viewBox={compact ? (COMPACT_VIEW[scene] || '0 60 600 330') : scene === 'sectors' ? '0 30 600 345' : '0 0 600 420'} role={compact ? undefined : 'img'} aria-label={compact ? undefined : descriptions[scene]} aria-hidden={compact ? true : undefined}>
    <defs>
      <linearGradient id={`${id}-bright`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#e9f6ff" /><stop offset=".35" stopColor="#8fcbff" /><stop offset="1" stopColor="#3f8cff" /></linearGradient>
      <linearGradient id={`${id}-glass`} x2=".8" y2="1"><stop stopColor="rgba(143, 203, 255, 0.16)" /><stop offset="1" stopColor="rgba(31, 95, 255, 0.08)" /></linearGradient>
      <radialGradient id={`${id}-orb`} cx=".36" cy=".3" r=".78"><stop stopColor="#e9f6ff" /><stop offset=".22" stopColor="#8fcbff" /><stop offset=".58" stopColor="#3f8cff" /><stop offset=".9" stopColor="#1f5fff" /><stop offset="1" stopColor="#123a9e" /></radialGradient>
    </defs>
    <Scene id={id} />
    {!compact && <text x="572" y={scene === 'sectors' ? 370 : 415} textAnchor="end" className={styles.note}>ILLUSTRATIVE</text>}
  </svg>;
}
