import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Gauge, TrendUp, UsersThree, ShieldCheck, FileText } from '@phosphor-icons/react';
import { COLLECTIONS } from './pages';
import CollectionVisual from '../art/CollectionVisuals';
import styles from './OutcomesDesign.module.css';

const outcomes = COLLECTIONS.Outcomes;
const icons = { gauge: Gauge, trend: TrendUp, users: UsersThree, shield: ShieldCheck };
const measurements = {
  'operating-performance': ['Elapsed time', 'Exception load', 'Rework'],
  'revenue-movement': ['Decision latency', 'Hand-offs', 'Commercial context'],
  'employee-capacity': ['Coordination', 'Reconstruction', 'Expertise'],
  'risk-control': ['Evidence', 'Authority', 'Audit'],
};

// The overview uses the same contextual diagrams as the corresponding detail pages.
function MeasurementDiagram() {
  return <div className={styles.overview}>
    {outcomes.map(outcome => {
      const Icon = icons[outcome.icon];
      return <a className={styles.overviewPanel} key={outcome.slug} href={`/outcomes/${outcome.slug}`}>
        <div className={styles.overviewTitle}><Icon aria-hidden="true" />{outcome.name}<ArrowUpRight className={styles.overviewArrow} aria-hidden="true" /></div>
        <div className={styles.overviewArt}><CollectionVisual scene={outcome.slug} compact /></div>
      </a>;
    })}
  </div>;
}
const ADVANCE_MS = 7000;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The four outcomes as one explorer: a list on the left, and on the right a glass stage with the selected
// outcome's full diagram, its summary and what to observe. It advances on its own until someone chooses one.
function OutcomeExplorer() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const outcome = outcomes[active];
  const Icon = icons[outcome.icon];

  useEffect(() => {
    if (paused || held || reducedMotion()) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % outcomes.length), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [active, paused, held]);

  // The jump links above select their outcome here.
  useEffect(() => {
    const pick = (slug) => { const i = outcomes.findIndex((o) => o.slug === slug); if (i >= 0) { setActive(i); setHeld(true); } };
    const onSelect = (e) => pick(e.detail);
    window.addEventListener('outcome:select', onSelect);
    if (window.location.hash.startsWith('#outcome-')) pick(window.location.hash.slice(9));
    return () => window.removeEventListener('outcome:select', onSelect);
  }, []);

  const choose = (i) => { setActive(i); setHeld(true); };
  const onKey = (e) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + outcomes.length) % outcomes.length;
    choose(next);
    document.getElementById(`outcome-${outcomes[next].slug}`)?.focus();
  };

  return <div className={styles.explorer} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} data-reveal>
    <div className={styles.tabs} role="tablist" aria-label="Outcomes" aria-orientation="vertical" onKeyDown={onKey}>
      {outcomes.map((o, i) => {
        const TabIcon = icons[o.icon];
        const on = i === active;
        return <button key={o.slug} id={`outcome-${o.slug}`} type="button" role="tab" aria-selected={on} aria-controls="outcome-stage" tabIndex={on ? 0 : -1}
          className={`${styles.tab}${on ? ` ${styles.tabOn}` : ''}`} onClick={() => choose(i)}>
          <span className={styles.tabNum}>{String(i + 1).padStart(2, '0')}</span>
          <span className={styles.iconTile}><TabIcon aria-hidden="true" /></span>
          <span className={styles.tabText}><strong>{o.name}</strong><span>{o.headline}</span></span>
          {on && !held && <span className={`${styles.tabProgress}${paused ? ` ${styles.tabPaused}` : ''}`} style={{ animationDuration: `${ADVANCE_MS}ms` }} key={active} aria-hidden="true" />}
        </button>;
      })}
    </div>

    <div className={styles.stage} id="outcome-stage" role="tabpanel" aria-labelledby={`outcome-${outcome.slug}`}>
      <div className={styles.stageHead}>
        <span className={styles.stageName}><Icon aria-hidden="true" />{outcome.name}</span>
        <a className={styles.stageLink} href={`/outcomes/${outcome.slug}`} aria-label={`${outcome.name}: ${outcome.headline}`}><ArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className={styles.stageArt} key={outcome.slug}><CollectionVisual scene={outcome.slug} /></div>
      <div className={styles.stageFoot} key={`${outcome.slug}-foot`}>
        <div><h3>{outcome.headline}</h3><p>{outcome.summary}</p></div>
        <div className={styles.lenses}><span>What to observe</span><ul>{measurements[outcome.slug].map((label) => <li key={label}>{label}</li>)}</ul></div>
      </div>
    </div>
  </div>;
}

export default function OutcomesDesign({ page }) {
  const hero = page.blocks.find((block) => block.type === 'hero');
  return <div className={styles.outcomes}>
    <section className={styles.hero}>
      <svg className={styles.horizon} viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-70 95 C290 20 590 120 975 260" className={styles.horizonGlow} />
        <path d="M-70 95 C290 20 590 120 975 260" className={styles.horizonLine} />
        <path d="M-70 95 C290 20 590 120 975 260" className={styles.horizonGlint} pathLength="1000" />
      </svg>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className="hero-pill">Outcomes</span>
          <h1>What changes when{' '}<br />the operating model{' '}<br /><span>changes.</span></h1>
          <p>{hero.lead}</p>
        </div>
        <MeasurementDiagram />
      </div>
    </section>

    <nav className={styles.jumpNav} aria-label="Outcome measurement lenses">
      <div className={`container ${styles.jumpLinks}`}>
        {outcomes.map((outcome) => {
          const Icon = icons[outcome.icon];
          return <a href={`#outcome-${outcome.slug}`} key={outcome.slug} onClick={() => window.dispatchEvent(new CustomEvent('outcome:select', { detail: outcome.slug }))}><Icon aria-hidden="true" /><span>{outcome.name}</span><ArrowDown aria-hidden="true" /></a>;
        })}
      </div>
    </nav>

    <section className={`container ${styles.measurements}`} aria-labelledby="outcome-movement-title">
      <div className={styles.sectionHead} data-reveal>
        <div><span className={styles.eyebrow}>Measure what matters</span><h2 id="outcome-movement-title">Choose the movement{' '}<br /><span>that matters.</span></h2></div>
        <div className={styles.sectionLead}><p>Each outcome begins with an Operating Domain and an evidence baseline.</p><small>Visuals and measurement lenses are illustrative.</small></div>
      </div>
      <OutcomeExplorer />
      <aside className={styles.auditBand} aria-labelledby="outcome-baseline-title" data-reveal>
        <span className={styles.auditIcon}><FileText aria-hidden="true" /></span>
        <div><h3 id="outcome-baseline-title">Establish the baseline before selecting the intervention.</h3><p>{outcomes[0].body}</p></div>
        <a href="/air-audit">Explore AIR Audit<ArrowRight aria-hidden="true" /></a>
      </aside>
    </section>
  </div>;
}
