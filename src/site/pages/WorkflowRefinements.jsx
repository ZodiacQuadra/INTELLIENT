import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle, Compass, Database, Path, ShieldCheck, UserCircle, Plugs, Graph, Stack } from '@phosphor-icons/react';
import CardVisual from '../art/CardVisuals';
import styles from './WorkflowRefinements.module.css';

const TARGETS = {
  '/air-residency': 'cards',
  '/intellient-core': 'list',
  '/architecture': 'cards',
};

export function acceptsWorkflowBlock(path, b) {
  return Boolean(b && TARGETS[path] === b.type);
}

function Title({ b }) {
  if (!b.titleMarks) return <>{b.title}{b.accent && <> <span className="accent">{b.accent}</span></>}</>;
  let at = 0;
  const parts = [];
  b.titleMarks.forEach((mark) => {
    const index = b.title.indexOf(mark, at);
    if (index < 0) return;
    parts.push(b.title.slice(at, index), <span className="accent" key={index}>{mark}</span>);
    at = index + mark.length;
  });
  parts.push(b.title.slice(at));
  return parts;
}

function Head({ b }) {
  return <header className={styles.head} data-reveal>
    {b.eyebrow && <span className="eyebrow">{b.eyebrow}</span>}
    <h2><Title b={b} /></h2>
    {b.lead && <p>{b.lead}</p>}
    {b.body && <p>{b.body}</p>}
  </header>;
}

function More({ b }) {
  return b.link && <a className={`link-arrow ${styles.more}`} href={b.link.href}>{b.link.label}<ArrowRight /></a>;
}

function Frame({ b, children, className = '' }) {
  return <section className={`section ${styles.section} ${className}`} id={b.id}>
    <div className="container">{children}</div>
  </section>;
}

const PHASES = [
  { title: 'Understand', range: [0, 3], note: 'See → Scope → Diagnose' },
  { title: 'Deliver', range: [3, 6], note: 'Redesign → Build → Embed' },
  { title: 'Learn', range: [6, 8], note: 'Prove → Compound' },
];

function Model({ b }) {
  return <Frame b={b}>
    <Head b={b} />
    <div className={styles.phases}>
      {PHASES.map((phase, phaseIndex) => <div className={styles.phase} key={phase.title} data-reveal style={{ '--i': phaseIndex }}>
        <div className={styles.phaseHeading}>
          <span className={styles.phaseLine} aria-hidden="true" />
          <h3>{phase.title}</h3>
          {phaseIndex < 2 && <ArrowRight aria-hidden="true" />}
        </div>
        <ol className={styles.steps} start={phase.range[0] + 1}>
          {b.items.slice(...phase.range).map((item, index) => <li key={item.title}>
            <span className={styles.stepNumber}>{String(phase.range[0] + index + 1).padStart(2, '0')}</span>
            <div><h4>{item.title}</h4><p>{item.body}</p></div>
          </li>)}
        </ol>
        <p className={styles.phaseRoute}>{phase.note}</p>
      </div>)}
    </div>
    <More b={b} />
  </Frame>;
}

function Residency({ b }) {
  return <Frame b={b}>
    <Head b={b} />
    <div className={`${styles.residency} ${styles.residencyPlain}`}>
      <div className={styles.motionLanes}>
        {[{ key: 'first', from: 0, to: 3 }, { key: 'second', from: 3, to: 6 }].map((lane, laneIndex) => <section className={styles.motionLane} key={lane.key} data-reveal style={{ '--i': laneIndex }}>
          <div className={styles.motionItems}>
            {b.items.slice(lane.from, lane.to).map((item) => <article className={styles.motion} key={item.title}>
              {item.visual && <div className={styles.motionArt}><CardVisual kind={item.visual} /></div>}
              <h4>{item.title}</h4><p>{item.body}</p>
            </article>)}
          </div>
        </section>)}
      </div>
    </div>
    <More b={b} />
  </Frame>;
}

const CAPABILITIES = [
  { title: 'Planning', icon: Compass, indices: [0] },
  { title: 'Context', icon: Database, indices: [3, 4] },
  { title: 'Continuity', icon: Path, indices: [1, 2] },
  { title: 'Accountable decisions', icon: ShieldCheck, indices: [5, 6] },
];

function Core({ b }) {
  return <Frame b={b}>
    <div className={styles.coreLayout}>
      <div><Head b={b} /><More b={b} /></div>
      <div className={styles.capabilities}>
        {CAPABILITIES.map(({ title, icon: Icon, indices }, index) => <section className={styles.capability} key={title} data-reveal style={{ '--i': index }}>
          <h3><Icon aria-hidden="true" />{title}</h3>
          <ul>{indices.map((i) => <li key={b.items[i]}><CheckCircle aria-hidden="true" /><span>{b.items[i]}</span></li>)}</ul>
        </section>)}
      </div>
    </div>
  </Frame>;
}

const PRODUCTS = {
  '/intellilink': 'IntelliLink',
  '/intellient-core': 'Intellient Core',
  '/intellisphere': 'IntelliSphere',
};

function LayerBody({ item }) {
  const product = PRODUCTS[item.href];
  if (!product || !item.body.startsWith(product)) return <p>{item.body}</p>;
  return <p><a href={item.href}>{product}<ArrowUpRight aria-hidden="true" /></a>{item.body.slice(product.length)}</p>;
}

const LAYER_ICONS = [UserCircle, Plugs, Graph, ShieldCheck, Database];
const LAYER_LOGOS = { '/intellilink': '/svg/intellilink.svg', '/intellient-core': '/svg/intellient-core.svg', '/intellisphere': '/svg/intellisphere.svg' };

// Five isometric glass slabs; the active layer lifts and lights.
function StackArt({ count, active }) {
  const slab = (y) => `M200 ${y} L340 ${y + 52} L200 ${y + 104} L60 ${y + 52} Z`;
  return <svg className={styles.stackArt} viewBox="0 0 400 380" aria-hidden="true">
    <defs>
      <linearGradient id="arch-hot" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8fcbff" stopOpacity=".55" /><stop offset="1" stopColor="#1f5fff" stopOpacity=".35" /></linearGradient>
      <radialGradient id="arch-glow"><stop stopColor="#1f5fff" stopOpacity=".5" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="200" cy="300" rx="190" ry="70" fill="url(#arch-glow)" />
    <path d="M200 20 V330" className={styles.stackSpine} />
    {Array.from({ length: count }, (_, k) => count - 1 - k).map((k) => {
      const y = 30 + k * 54 - (k === active ? 10 : 0);
      const on = k === active;
      return <g key={k} className={`${styles.slab}${on ? ` ${styles.slabOn}` : ''}`}>
        <path d={`M60 ${y + 52} L60 ${y + 62} L200 ${y + 114} L340 ${y + 62} L340 ${y + 52}`} className={styles.slabSide} />
        <path d={slab(y)} fill={on ? 'url(#arch-hot)' : undefined} className={styles.slabTop} />
        <circle cx="200" cy={y + 52} r={on ? 5 : 3} className={styles.slabNode} />
      </g>;
    })}
  </svg>;
}

function Architecture({ b }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % b.items.length), 2600);
    return () => clearTimeout(t);
  }, [active, held, b.items.length]);
  return <Frame b={b}>
    <div className={styles.architectureLayout}>
      <div className={styles.archIntro}><Head b={b} /><StackArt count={b.items.length} active={active} /><More b={b} /></div>
      <ol className={styles.stack} data-reveal onMouseLeave={() => setHeld(false)}>
        <span className={styles.stackPulse} aria-hidden="true" />
        {b.items.map((item, index) => {
          const Icon = LAYER_ICONS[index] || Stack;
          const on = index === active;
          return <li key={item.title} className={`${styles.layer}${index === b.items.length - 1 ? ` ${styles.foundation}` : ''}${on ? ` ${styles.layerOn}` : ''}`} style={{ '--i': index }}
            onMouseEnter={() => { setActive(index); setHeld(true); }}>
            <span className={styles.stackNode} aria-hidden="true" />
            <span className={styles.layerNum}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.layerIcon}><Icon aria-hidden="true" /></span>
            <div className={styles.layerCopy}><h3>{item.title}</h3><p>{item.body}</p></div>
          </li>;
        })}
      </ol>
    </div>
  </Frame>;
}

export default function WorkflowRefinement({ path, b }) {
  if (!acceptsWorkflowBlock(path, b)) return null;
  if (path === '/intellient-model') return <Model b={b} />;
  if (path === '/air-residency') return <Residency b={b} />;
  if (path === '/intellient-core') return <Core b={b} />;
  return <Architecture b={b} />;
}
