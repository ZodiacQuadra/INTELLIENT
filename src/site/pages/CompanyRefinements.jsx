import { ArrowRight, ArrowUpRight, Factory, Bank, Heartbeat, Briefcase, Gauge, TrendUp, UsersThree, ShieldCheck, PencilRuler, Fingerprint, ArrowsClockwise } from '@phosphor-icons/react';
import { COLLECTIONS } from './pages';
import { Art } from './blocks';
import styles from './CompanyRefinements.module.css';

const sectorContext = {
  manufacturing: ['Production', 'Quality', 'Maintenance', 'Supply'],
  bfsi: ['Evidence', 'Authority', 'Audit'],
  'healthcare-life-sciences': ['Knowledge', 'Documents', 'Operational workflows'],
  'enterprise-services': ['Service operations', 'Knowledge', 'Onboarding'],
};
const outcomeContext = {
  'operating-performance': ['Elapsed time', 'Exception load', 'Rework'],
  'revenue-movement': ['Decision latency', 'Hand-offs', 'Commercial context'],
  'employee-capacity': ['Coordination', 'Reconstruction', 'Expertise'],
  'risk-control': ['Evidence', 'Authority', 'Audit'],
};
const icons = { factory: Factory, bank: Bank, heart: Heartbeat, briefcase: Briefcase, gauge: Gauge, trend: TrendUp, users: UsersThree, shield: ShieldCheck };

function Heading({ b }) {
  return <div className={styles.heading} data-reveal>
    {b.eyebrow && <span className="eyebrow">{b.eyebrow}</span>}
    <h2 className="h-section wide">{b.title}{b.accent && <> <span className="accent">{b.accent}</span></>}</h2>
    {b.lead && <p className="lead">{b.lead}</p>}
  </div>;
}

function Beliefs({ b }) {
  const groups = [
    { title: 'Ground the design in real work.', label: 'Outcome and mechanism', items: [0, 1, 2] },
    { title: 'Make accountability observable.', label: 'Authority and measurement', items: [3, 4] },
    { title: 'Leave capability with the customer.', label: 'Capability and continuity', items: [5, 6] },
  ];
  return <section className={`section ${styles.beliefs}`} id={b.id}>
    <div className="container">
      <Heading b={b} />
      <div className={styles.beliefLayout}>
        {groups.map((group) => <div className={styles.beliefGroup} key={group.title} data-reveal>
          <span className={styles.groupLabel}>{group.label}</span>
          <h3>{group.title}</h3>
          <ul>{group.items.map((index) => <li key={b.items[index]}>{b.items[index]}</li>)}</ul>
        </div>)}
      </div>
      <div className={styles.companyMap} data-reveal>
        <h3>Explore the model in practice.</h3>
        <div className={styles.companyLinks}>
          <a href="/intellient-model"><span>Operating model</span><strong>The Intellient Model</strong><ArrowUpRight /></a>
          <a href="/technology"><span>Agentic technology</span><strong>IntelliLink, Intellient Core and IntelliSphere</strong><ArrowUpRight /></a>
          <a href="/air-residency"><span>Embedded delivery</span><strong>AIR Residency</strong><ArrowUpRight /></a>
        </div>
      </div>
    </div>
  </section>;
}

function Collection({ b, path }) {
  const outcomes = path === '/outcomes';
  const items = (COLLECTIONS[b.name] || []).filter((item) => item.slug !== b.exclude);
  const title = b.title || (outcomes ? 'Choose the movement that matters.' : 'Find your operating context.');
  return <section className={`section ${styles.collection}`} id={b.id}>
    <div className="container">
      <div className={styles.directoryHead} data-reveal>
        <h2 className="h-section wide">{title}</h2>
        <div>
          <p>{outcomes ? 'Each outcome begins with an Operating Domain and an evidence baseline.' : 'Start with one Operating Domain where the outcome is not moving.'}</p>
          <span className={styles.illustrative}>Hero visual and focus areas are illustrative.</span>
        </div>
      </div>
      <div className={styles.directoryLabels} aria-hidden="true"><span>{outcomes ? 'Outcome' : 'Sector'}</span><span>Operating question</span><span>{outcomes ? 'Measurement lens' : 'Workflow focus'}</span></div>
      <div className={styles.directory}>
        {items.map((item) => {
          const Icon = icons[item.icon];
          const context = (outcomes ? outcomeContext : sectorContext)[item.slug];
          return <a className={styles.directoryRow} href={`${b.base}/${item.slug}`} key={item.slug} data-reveal>
            <div className={styles.directoryName}>{Icon && <Icon weight="duotone" />}<h3>{item.name}</h3></div>
            <div className={styles.directoryCopy}><p className={styles.question}>{item.headline}</p><p className={styles.summary}>{item.summary}</p></div>
            <div className={styles.directoryContext}><span>{outcomes ? 'What to observe' : 'Illustrative focus'}</span><ul>{context?.map((label) => <li key={label}>{label}</li>)}</ul></div>
            <ArrowUpRight className={styles.rowArrow} aria-hidden="true" />
          </a>;
        })}
      </div>
      <div className={styles.baseline} data-reveal>
        <div><h3>{outcomes ? 'Establish the baseline before selecting the intervention.' : 'Understand the work before committing technology.'}</h3><p>{items[0]?.body}</p></div>
        <a href="/air-audit" className="link-arrow">Explore AIR Audit<ArrowRight /></a>
      </div>
    </div>
  </section>;
}

function Responsible({ b }) {
  const stages = [
    { title: 'Design', label: 'Define authority and boundaries', Icon: PencilRuler, indices: [0, 1, 2] },
    { title: 'Apply', label: 'Evaluate, observe and retain evidence', Icon: Fingerprint, indices: [3, 4, 5] },
    { title: 'Review', label: 'Review models and policies', Icon: ArrowsClockwise, indices: [6] },
  ];
  return <section className={`section ${styles.responsible}`} id={b.id}>
    <div className="container">
      <div className={styles.controlIntro}>
        <Heading b={b} />
        <div className={styles.loopFigure} data-reveal><Art art={b.art} className={styles.loopArt} /><p>Design and production feed continuing review.</p></div>
      </div>
      <ol className={styles.lifecycle}>
        {stages.map(({ title, label, Icon, indices }) => <li className={styles.stage} key={title} data-reveal>
          <div className={styles.stageHead}><Icon weight="duotone" /><h3>{title}</h3><span>{label}</span></div>
          <ol className={styles.stageItems} start={indices[0] + 1}>{indices.map((index) => <li key={b.items[index]}><span className={styles.controlNumber}>{String(index + 1).padStart(2, '0')}</span><p>{b.items[index]}</p></li>)}</ol>
        </li>)}
      </ol>
      <div className={styles.authorityPath} data-reveal>
        <div className={styles.pathTitle}><ShieldCheck weight="duotone" /><h3>Authority, action and evidence stay connected.</h3></div>
        <ol className={styles.pathNodes} aria-label="Accountable control path"><li><strong>Enterprise</strong><span>Defines authority</span></li><li><strong>System</strong><span>Acts within boundaries</span></li><li><strong>Evidence</strong><span>Supports explanation and review</span></li></ol>
        <a href="/intellisphere" className="link-arrow">Explore IntelliSphere<ArrowRight /></a>
      </div>
    </div>
  </section>;
}

export function acceptsCompanyBlock(path, b) {
  return (path === '/responsible-ai' && b.type === 'list') || (path === '/outcomes' && b.type === 'collection');
}

export default function CompanyRefinement({ path, b }) {
  if (path === '/about') return <Beliefs b={b} />;
  if (path === '/responsible-ai') return <Responsible b={b} />;
  return <Collection b={b} path={path} />;
}
