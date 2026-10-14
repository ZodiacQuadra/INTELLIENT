import { useId } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Factory, Bank, Heartbeat, Briefcase, ClipboardText } from '@phosphor-icons/react';
import { COLLECTIONS } from './pages';
import styles from './IndustriesDesign.module.css';

const sectors = COLLECTIONS.Industries;
const icons = { factory: Factory, bank: Bank, heart: Heartbeat, briefcase: Briefcase };
const focus = {
  manufacturing: ['Production', 'Quality', 'Maintenance', 'Supply'],
  bfsi: ['Evidence', 'Authority', 'Audit'],
  'healthcare-life-sciences': ['Knowledge', 'Documents', 'Operational workflows'],
  'enterprise-services': ['Service operations', 'Knowledge', 'Onboarding'],
};

function SectorChip({ x, y, width, Icon, label }) {
  return <g transform={`translate(${x} ${y})`} className={styles.diagramChip}>
    <rect width={width} height="46" rx="23" />
    <Icon x="17" y="12" width="23" height="23" color="#94d8ff" />
    <text x="51" y="29">{label}</text>
  </g>;
}

function SectorDiagram() {
  const id = useId();
  return <svg className={styles.diagram} viewBox="0 0 620 430" role="img" aria-label="Manufacturing, BFSI, Healthcare and Life Sciences, and Enterprise Services connect to one Operating Domain.">
    <defs>
      <radialGradient id={`${id}-sphere`} cx="29%" cy="19%" r="86%">
        <stop stopColor="#c0eaff" /><stop offset=".28" stopColor="#68aaff" />
        <stop offset=".65" stopColor="#125de5" /><stop offset="1" stopColor="#092d73" />
      </radialGradient>
      <radialGradient id={`${id}-halo`}>
        <stop stopColor="#256cff" stopOpacity=".4" /><stop offset="1" stopColor="#256cff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-chip`} x2=".2" y2="1">
        <stop stopColor="#213e5c" stopOpacity=".75" /><stop offset="1" stopColor="#061523" stopOpacity=".94" />
      </linearGradient>
    </defs>
    <circle cx="320" cy="216" r="174" fill={`url(#${id}-halo)`} />
    <circle cx="320" cy="216" r="162" className={styles.dottedRing} />
    <circle cx="320" cy="216" r="118" className={styles.orbit} />
    <g className={styles.connectors}>
      <path d="M167 92 C171 163 238 166 263 195" />
      <path d="M459 92 C457 164 399 169 378 195" />
      <path d="M138 349 C142 271 199 252 261 234" />
      <path d="M475 349 C468 273 417 253 379 234" />
    </g>
    <circle cx="320" cy="216" r="77" fill={`url(#${id}-sphere)`} stroke="#a1d2ff" strokeWidth="1.4" />
    <path d="M268 270 Q320 305 373 269" fill="none" stroke="#89caff" opacity=".5" />
    <svg x="296" y="179" width="48" height="48" viewBox="0 0 216 216" fill="#fff" aria-hidden="true">
      <path d="M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818" />
      <path d="M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z" />
      <rect x="97.293" y="122.341" width="20.488" height="57.366" rx="10.244" />
    </svg>
    <text x="320" y="247" textAnchor="middle" className={styles.domainLabel}>One domain</text>
    {[[212, 162], [432, 161], [139, 319]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.5" className={styles.node} />)}
    <g style={{ '--chip-fill': `url(#${id}-chip)` }}>
      <SectorChip x={82} y={46} width={186} Icon={Factory} label="Manufacturing" />
      <SectorChip x={422} y={46} width={122} Icon={Bank} label="BFSI" />
      <SectorChip x={22} y={348} width={282} Icon={Heartbeat} label="Healthcare and Life Sciences" />
      <SectorChip x={352} y={348} width={229} Icon={Briefcase} label="Enterprise Services" />
    </g>
  </svg>;
}

export default function IndustriesDesign({ page }) {
  const hero = page.blocks.find((block) => block.type === 'hero');
  return <div className={styles.industries}>
    <section className={styles.hero}>
      <svg className={styles.horizon} viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-30 130 C390 225 920 247 1470 10" />
      </svg>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className="hero-pill">Industries</span>
          <h1>Four sectors.{' '}<br /><span>One operating question.</span></h1>
          <p>{hero.lead}</p>
        </div>
        <SectorDiagram />
      </div>
    </section>

    <nav className={styles.jumpNav} aria-label="Industry sectors">
      <div className={`container ${styles.jumpLinks}`}>
        {sectors.map((sector) => {
          const Icon = icons[sector.icon];
          return <a href={`#sector-${sector.slug}`} key={sector.slug}>
            <Icon aria-hidden="true" /><span>{sector.slug === 'healthcare-life-sciences' ? 'Healthcare & Life Sciences' : sector.name}</span><ArrowDown aria-hidden="true" />
          </a>;
        })}
      </div>
    </nav>

    <section className={`container ${styles.sectors}`} aria-labelledby="industry-context-title">
      <div className={styles.sectionHead} data-reveal>
        <div><span className={styles.eyebrow}>Explore the sectors</span><h2 id="industry-context-title">Find your<br />operating context.</h2></div>
        <div className={styles.sectionLead}><p>Start with one Operating Domain where the outcome is not moving.</p><small>Focus areas are illustrative.</small></div>
      </div>
      <div className={styles.cardGrid}>
        {sectors.map((sector, index) => {
          const Icon = icons[sector.icon];
          return <a className={styles.card} href={`/industries/${sector.slug}`} id={`sector-${sector.slug}`} key={sector.slug} data-reveal>
            <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
            <ArrowUpRight className={styles.cardArrow} aria-hidden="true" />
            <span className={styles.iconTile}><Icon aria-hidden="true" /></span>
            <h3>{sector.name}</h3>
            <p className={styles.question}>{sector.headline}</p>
            <p className={styles.summary}>{sector.summary}</p>
            <div className={styles.focus}><span>Workflow focus</span><ul>{focus[sector.slug].map((label) => <li key={label}>{label}</li>)}</ul></div>
          </a>;
        })}
      </div>
      <aside className={styles.auditBand} aria-labelledby="industry-audit-title" data-reveal>
        <ClipboardText className={styles.auditIcon} aria-hidden="true" />
        <div><h3 id="industry-audit-title">Understand the work before committing technology.</h3><p>{sectors[0].body}</p></div>
        <a href="/air-audit">Explore AIR Audit<ArrowRight aria-hidden="true" /></a>
      </aside>
    </section>
  </div>;
}
