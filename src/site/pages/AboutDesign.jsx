import { useId } from 'react';
import { ArrowRight, ArrowUpRight, Database, TreeStructure, ShieldCheck, UsersThree, Stack, Gear, Buildings } from '@phosphor-icons/react';
import styles from './AboutDesign.module.css';

// Each illustration is vector geometry. The background has only smooth gradients and curves.
function Definitions({ id }) {
  return <defs>
    <radialGradient id={`${id}-orb`} cx="30%" cy="22%" r="85%">
      <stop offset="0" stopColor="#d2f0ff" /><stop offset=".25" stopColor="#70b8ff" />
      <stop offset=".58" stopColor="#237dff" /><stop offset=".82" stopColor="#0642ba" /><stop offset="1" stopColor="#09274d" />
    </radialGradient>
    <radialGradient id={`${id}-sheen`} cx="28%" cy="15%" r="78%">
      <stop stopColor="#fff" stopOpacity=".55" /><stop offset=".38" stopColor="#c2e9ff" stopOpacity=".06" /><stop offset="1" stopColor="#62b1ff" stopOpacity=".13" />
    </radialGradient>
    <radialGradient id={`${id}-halo`}><stop stopColor="#1278ff" stopOpacity=".42" /><stop offset="1" stopColor="#1278ff" stopOpacity="0" /></radialGradient>
    <linearGradient id={`${id}-ribbon`} x1="0" x2="1" y1="0" y2=".3">
      <stop stopColor="#074ba4" stopOpacity=".35" /><stop offset=".4" stopColor="#63b3ff" stopOpacity=".75" /><stop offset=".65" stopColor="#e5f7ff" stopOpacity=".85" /><stop offset="1" stopColor="#0f63cc" stopOpacity=".3" />
    </linearGradient>
  </defs>;
}

function Mark({ x, y, size }) {
  return <svg x={x - size / 2} y={y - size / 2} width={size} height={size} viewBox="0 0 216 216" fill="white">
    <path d="M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818" />
    <path d="M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z" />
    <rect x="97.293" y="122.341" width="20.488" height="57.366" rx="10.244" />
  </svg>;
}

function Sphere({ id, x, y, r, brand = false, label = false }) {
  return <g>
    <circle cx={x} cy={y} r={r * 2.1} fill={`url(#${id}-halo)`} />
    <circle cx={x} cy={y} r={r} fill={`url(#${id}-orb)`} stroke="#b2ddff" strokeOpacity=".8" strokeWidth="1.3" />
    <circle cx={x} cy={y} r={r - 2} fill={`url(#${id}-sheen)`} />
    <path d={`M${x - r * .68} ${y + r * .66} Q${x} ${y + r * 1.14} ${x + r * .7} ${y + r * .55}`} fill="none" stroke="#83caff" strokeWidth="2" opacity=".7" />
    {brand && <Mark x={x} y={label ? y - r * .12 : y} size={r * .83} />}
    {label && <text x={x} y={y + r * .51} textAnchor="middle" className={styles.orbLabel}>Intellient</text>}
  </g>;
}

function Rings({ x, y, rx, ry, tilt = 0 }) {
  return <g className={styles.rings} transform={`rotate(${tilt} ${x} ${y})`}>
    <ellipse cx={x} cy={y} rx={rx} ry={ry} />
    <ellipse cx={x} cy={y} rx={rx * .77} ry={ry * .68} />
    {[-1, 1].map((direction) => <circle key={direction} cx={x + rx * .87 * direction} cy={y + ry * .48 * direction} r="3.2" className={styles.joint} />)}
  </g>;
}

function Chip({ x, y, width, label, Icon, tall = false }) {
  const height = tall ? 92 : 38;
  return <g transform={`translate(${x} ${y})`} className={styles.chip}>
    <rect width={width} height={height} rx={tall ? 13 : 17} />
    {Icon && <Icon x={tall ? width / 2 - 13 : 13} y={tall ? 15 : 10} width={tall ? 26 : 18} height={tall ? 26 : 18} color="#91d2ff" />}
    <text x={tall ? width / 2 : Icon ? 40 : width / 2} y={tall ? 65 : 24} textAnchor={tall || !Icon ? 'middle' : 'start'}>{label}</text>
  </g>;
}

function Wave({ variant }) {
  const paths = {
    hero: 'M-80 130 C230 150 470 300 800 292 S1230 190 1510 220',
    story: 'M-80 255 C250 360 540 330 840 215 S1260 128 1510 105',
    company: 'M-80 80 C260 130 465 16 680 160 S1160 310 1510 190',
    beliefs: 'M-80 125 C370 115 520 255 840 210 S1230 152 1510 185',
  };
  return <svg className={`${styles.wave} ${styles[`${variant}Wave`]}`} viewBox="0 0 1440 360" preserveAspectRatio="none" aria-hidden="true">
    <path d={paths[variant]} className={styles.waveHalo} />
    <path d={paths[variant]} className={styles.waveLine} />
  </svg>;
}

function HeroDiagram() {
  const id = useId();
  return <svg viewBox="0 0 650 560" className={styles.heroDiagram} role="img" aria-label="Intellient bridges the gap between AI promise and enterprise reality.">
    <Definitions id={id} />
    <g className={styles.grid}>
      {[100, 180, 260, 340, 420, 500, 580].map((x) => <line key={x} x1={x} x2={x} y1="35" y2="480" />)}
      {[80, 150, 220, 290, 360, 430].map((y) => <line key={y} x1="45" x2="620" y1={y} y2={y} />)}
    </g>
    <path d="M15 455 C230 440 386 240 600 55" className={styles.promise} />
    <path d="M15 456 C230 459 400 407 650 365" className={styles.litLine} />
    <path d="M490 130 V418" className={styles.beam} />
    <Rings x={490} y={265} rx={130} ry={43} tilt={-18} />
    <Rings x={490} y={265} rx={111} ry={47} tilt={16} />
    <Sphere id={id} x={490} y={265} r={65} brand label />
    <Chip x={318} y={114} width={135} label="AI promise" />
    <Chip x={399} y={425} width={186} label="Enterprise reality" />
    <circle cx="490" cy="154" r="4" className={styles.joint} />
    <circle cx="600" cy="55" r="3" className={styles.joint} />
  </svg>;
}

function StoryDiagram() {
  const id = useId();
  const nodes = [
    { x: 65, y: 345, label: 'Core systems', Icon: Database, width: 146 },
    { x: 235, y: 272, label: 'Workflows', Icon: TreeStructure, width: 129 },
    { x: 370, y: 202, label: 'Governance', Icon: ShieldCheck, width: 143 },
    { x: 507, y: 126, label: 'Delivery teams', Icon: UsersThree, width: 162 },
  ];
  return <svg viewBox="0 0 650 430" className={styles.storyDiagram} role="img" aria-label="Core systems, workflows, governance and delivery teams form the foundation of Intellient.">
    <Definitions id={id} />
    <path d="M18 379 C75 355 114 327 175 301 S283 254 338 222 S464 153 595 83" className={styles.litLine} />
    {nodes.map(({ x, y, label, Icon, width }) => <g key={label}>
      <line x1={x} x2={x} y1={y + 16} y2="404" className={styles.guide} />
      <Sphere id={id} x={x} y={y} r={16} />
      <Chip x={x - width / 2 - 8} y={y - 82} width={width} label={label} Icon={Icon} />
    </g>)}
    <Sphere id={id} x={595} y={83} r={38} brand />
  </svg>;
}

function CompanyDiagram() {
  const id = useId();
  return <svg viewBox="0 0 650 505" className={styles.companyDiagram} role="img" aria-label="Operating model, technology and specialist capability unite in Intellient. AIR carries them into the customer environment.">
    <Definitions id={id} />
    <path d="M110 113 C110 176 280 166 325 232 M325 113 V232 M540 113 C540 176 370 166 325 232" className={styles.litLine} />
    <Chip x={32} y={24} width={156} label="Operating model" Icon={Stack} tall />
    <Chip x={247} y={24} width={156} label="Technology" Icon={Gear} tall />
    <Chip x={462} y={24} width={156} label="Specialist capability" Icon={UsersThree} tall />
    <Rings x={325} y={300} rx={217} ry={70} tilt={-7} />
    <Rings x={325} y={290} rx={170} ry={39} tilt={8} />
    <Sphere id={id} x={325} y={253} r={72} brand label />
    <path d="M325 325 C328 398 437 396 491 420" className={styles.litLine} />
    <Chip x={384} y={359} width={54} label="AIR" />
    <Chip x={439} y={402} width={184} label="Customer environment" Icon={Buildings} />
    <rect x="28" y="453" width="390" height="35" rx="9" className={styles.productStrip} />
    <text x="223" y="475" textAnchor="middle" className={styles.productText}>IntelliLink · Intellient Core · IntelliSphere</text>
  </svg>;
}

function PrincipleArt({ variant }) {
  const id = useId();
  return <svg viewBox="0 0 360 205" className={styles.principleArt} aria-hidden="true">
    <Definitions id={id} />
    {variant === 'outcome' && <>
      <Rings x={180} y={111} rx={123} ry={47} tilt={-16} />
      <ellipse cx="180" cy="111" rx="96" ry="73" transform="rotate(33 180 111)" className={styles.orbit} />
      <Sphere id={id} x={180} y={111} r={49} />
      <path d="M61 124 C89 183 237 174 300 91" className={styles.orbitFront} />
      <circle cx="98" cy="57" r="7" fill={`url(#${id}-orb)`} stroke="#a0d8ff" />
    </>}
    {variant === 'authority' && <>
      <Rings x={180} y={122} rx={130} ry={48} tilt={-11} />
      <path d="M117 43 C274 27 276 85 157 111 S61 164 246 153" fill="none" stroke={`url(#${id}-ribbon)`} strokeWidth="24" />
      <path d="M117 31 C274 15 276 73 157 99 S61 152 246 141" className={styles.orbitFront} />
      <path d="M117 55 C274 39 276 97 157 123 S61 176 246 165" className={styles.orbit} />
      <ellipse cx="180" cy="148" rx="62" ry="26" className={styles.orbit} />
      <circle cx="219" cy="43" r="4" className={styles.joint} />
    </>}
    {variant === 'capability' && <>
      <ellipse cx="180" cy="112" rx="134" ry="58" transform="rotate(-22 180 112)" className={styles.dottedOrbit} />
      <path d="M100 98 Q173 174 278 64" className={styles.litLine} />
      <Sphere id={id} x={99} y={98} r={38} />
      <Sphere id={id} x={167} y={138} r={28} />
      <Sphere id={id} x={279} y={64} r={30} />
      <circle cx="231" cy="38" r="3" className={styles.joint} />
    </>}
  </svg>;
}

const principles = [
  { variant: 'outcome', title: 'Ground the design in real work.', body: 'Begin with the operating outcome. Understand the work before choosing technology.' },
  { variant: 'authority', title: 'Make accountability observable.', body: 'Keep authority visible. Measure adoption and business movement.' },
  { variant: 'capability', title: 'Leave capability with the customer.', body: 'Build customer capability. Let every deployment improve the next.' },
];
const explore = [
  { label: 'Operating model', title: 'The Intellient Model', href: '/intellient-model' },
  { label: 'Agentic technology', title: 'IntelliLink, Intellient Core and IntelliSphere', href: '/technology' },
  { label: 'Embedded delivery', title: 'AIR Residency', href: '/air-residency' },
];

function SectionLabel({ number, children }) {
  return <div className={styles.sectionLabel}><span aria-hidden="true" /><p>{number} / {children}</p><i aria-hidden="true" /></div>;
}

export default function AboutDesign() {
  return <div className={styles.about}>
    <section className={styles.hero}>
      <Wave variant="hero" />
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className="hero-pill">About Intellient</span>
          <h1>Built from the gap{' '}<br />between AI promise{' '}<br />and <span>enterprise reality.</span></h1>
          <p>Intelligence becomes valuable only when the enterprise around it changes.</p>
          <a href="/contact" className="btn btn-primary">Talk to Intellient<ArrowRight weight="bold" /></a>
        </div>
        <HeroDiagram />
      </div>
    </section>

    <section className={`container ${styles.story}`} id="our-story">
      <SectionLabel number="01">Our story</SectionLabel>
      <Wave variant="story" />
      <div className={styles.twoColumn}>
        <div className={styles.sectionCopy} data-reveal>
          <h2>The work came{' '}<br />before the category.</h2>
          <p>Our capabilities grew from real enterprise work: connecting agents to core systems, coordinating workflows, applying governance in production and keeping delivery close to the operating problem.</p>
        </div>
        <StoryDiagram />
      </div>
    </section>

    <section className={`container ${styles.company}`} id="the-company">
      <SectionLabel number="02">The company</SectionLabel>
      <Wave variant="company" />
      <div className={styles.twoColumn}>
        <div className={styles.sectionCopy} data-reveal>
          <h2>Enterprise AI built around operating performance.</h2>
          <p>One enterprise AI company. An operating model, agentic technology and specialist capability, working together in customer environments.</p>
        </div>
        <div className={styles.diagramPanel}><CompanyDiagram /></div>
      </div>
    </section>

    <section className={`container ${styles.beliefs}`} id="our-principles">
      <SectionLabel number="03">What we believe</SectionLabel>
      <Wave variant="beliefs" />
      <h2 className={styles.beliefsTitle} data-reveal>The principles behind{' '}<br />the operating model.</h2>
      <div className={styles.principles}>
        {principles.map(({ variant, title, body }, index) => <article className={styles.principle} key={variant} data-reveal>
          <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
          <PrincipleArt variant={variant} />
          <div className={styles.principleCopy}><h3>{title}</h3><p>{body}</p></div>
        </article>)}
      </div>
      <div className={styles.explore}>
        <h3>Explore the model{' '}<br />in practice.</h3>
        <div className={styles.exploreLinks}>
          {explore.map(({ label, title, href }) => <a href={href} key={href}><span>{label}</span><strong>{title}</strong><ArrowUpRight aria-hidden="true" /></a>)}
        </div>
      </div>
    </section>
  </div>;
}
