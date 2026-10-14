import { useEffect, useId, useRef } from 'react';
import { ArrowRight, CaretRight, Check, Database, FileText, Flag, UsersThree } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AirAuditSections.module.css';
import HeroScene from '../art/HeroScenes';

gsap.registerPlugin(ScrollTrigger);

const AUDIT_ROWS = ['Outcome', 'Operating reality', 'Future state', 'Value baseline'];

function AuditPanels() {
  const ref = useRef(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current.querySelectorAll('[data-pane]'),
        { y: 20, opacity: .35 },
        { y: 0, opacity: 1, duration: 1.2, stagger: .1, ease: 'expo.out', clearProps: 'transform,opacity' });
    }, ref);
    return () => media.revert();
  }, []);
  return (
    <figure ref={ref} className={styles.panels} role="img" aria-label="AIR Audit brings questions and insights together around the outcome, operating reality, future state and value baseline.">
      <div className={styles.panelScene} aria-hidden="true">
        <div className={`${styles.sheet} ${styles.backLeft}`} data-pane><span /><span /><span /></div>
        <div className={`${styles.sheet} ${styles.backRight}`} data-pane><span /><span /><span /></div>
        <div className={`${styles.sheet} ${styles.questions}`} data-pane>
          <b className={styles.panelLabel}>Questions</b>
          {[72, 55, 82, 58].map((width, i) => <div className={`${styles.question}${i === 0 ? ` ${styles.checked}` : ''}`} key={i}>
            <span className={styles.checkbox}>{i === 0 && <Check weight="bold" />}</span><i style={{ '--bar-width': `${width}%` }} />
          </div>)}
        </div>
        <div className={`${styles.sheet} ${styles.insights}`} data-pane>
          <b className={styles.panelLabel}>Insights</b>
          <div className={styles.chart}>{[26, 44, 73, 42, 65, 100].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>
        </div>
        <div className={`${styles.sheet} ${styles.front}`} data-pane>
          <b className={styles.auditLabel}>AIR Audit</b>
          <div className={styles.auditRows}>{AUDIT_ROWS.map(row => <div className={styles.auditRow} key={row}><span className={styles.tick}><Check weight="bold" /></span><strong>{row}</strong><CaretRight weight="light" /></div>)}</div>
        </div>
        <svg className={styles.orbit} viewBox="0 0 1000 780" fill="none">
          <ellipse cx="510" cy="653" rx="459" ry="89" stroke="#1f5fff" strokeWidth="14" opacity=".5" className={styles.softGlow} />
          <ellipse cx="510" cy="653" rx="459" ry="89" stroke="#3f8cff" strokeWidth="3" />
          <ellipse cx="510" cy="653" rx="459" ry="89" stroke="#e9f6ff" strokeWidth="1.2" />
          <ellipse cx="510" cy="640" rx="418" ry="67" stroke="#3f8cff" strokeWidth="1.2" opacity=".5" />
          <ellipse cx="510" cy="676" rx="486" ry="100" stroke="#8fcbff" strokeWidth="1" opacity=".22" strokeDasharray="2 8" />
        </svg>
      </div>
    </figure>
  );
}

export function AirAuditHero({ b }) {
  return (
    <section className={styles.hero} aria-labelledby="air-audit-heading">
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className="hero-pill rise" style={{ '--d': 80 }}>{b.eyebrow}</span>
          <h1 className={`${styles.heroTitle} rise`} id="air-audit-heading" style={{ '--d': 180 }}>{b.title} <span className="accent">{b.accent}</span></h1>
          <p className={`${styles.body} rise`} style={{ '--d': 300 }}>{b.lead}</p>
          <div className="rise" style={{ '--d': 440 }}><a className="btn btn-primary" href={b.cta.href}>{b.cta.label}<ArrowRight weight="bold" aria-hidden="true" /></a></div>
        </div>
        <div className={styles.heroArt}><HeroScene scene="auditlens" /></div>
      </div>
    </section>
  );
}

const BRIEF_PATH = 'M205 535 C450 515 593 457 489 390 C365 312 379 263 524 220 C671 176 605 99 466 65';

function BriefVisual() {
  const id = useId().replace(/:/g, '');
  return (
    <figure className={styles.briefVisual} role="img" aria-label="Current process, multiple stakeholders and fragmented information are reconciled into a clear brief for what to change.">
      <div aria-hidden="true">
        <svg viewBox="0 0 680 600" className={styles.briefPath} fill="none">
          <defs><linearGradient id={`${id}-road`} x1="205" y1="535" x2="466" y2="65" gradientUnits="userSpaceOnUse"><stop stopColor="#3f8cff" /><stop offset=".5" stopColor="#8fcbff" /><stop offset="1" stopColor="#3f8cff" /></linearGradient><filter id={`${id}-wide`} filterUnits="userSpaceOnUse" x="0" y="0" width="680" height="600"><feGaussianBlur stdDeviation="14" /></filter><filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="0" y="0" width="680" height="600"><feGaussianBlur stdDeviation="5" /></filter></defs>
          {[-20, 20].map(x => <path key={x} d={BRIEF_PATH} stroke="#3f8cff" strokeOpacity=".18" strokeWidth="1" transform={`translate(${x} 10)`} />)}
          <path d={BRIEF_PATH} stroke="#1f5fff" strokeWidth="26" opacity=".18" filter={`url(#${id}-wide)`} />
          <path d={BRIEF_PATH} stroke="#3f8cff" strokeWidth="10" opacity=".4" filter={`url(#${id}-soft)`} />
          <path d={BRIEF_PATH} stroke={`url(#${id}-road)`} strokeWidth="3.5" opacity=".8" />
          <path d={BRIEF_PATH} stroke="#e9f6ff" strokeWidth="1.6" />
          {[[488, 464], [476, 379], [411, 287], [515, 223], [570, 155]].map(([x, y], i) => <g key={i} className={styles.node} style={{ '--n': i }}><circle cx={x} cy={y} r="10" fill="#3f8cff" opacity=".5" filter={`url(#${id}-soft)`} /><circle cx={x} cy={y} r="4.5" fill="#e9f6ff" stroke="#8fcbff" strokeWidth="1.5" /></g>)}
        </svg>
        <div className={`${styles.briefChip} ${styles.process}`}><FileText /><span>Current<br />process</span></div>
        <div className={`${styles.briefChip} ${styles.people}`}><UsersThree /><span>Multiple<br />stakeholders</span></div>
        <div className={`${styles.briefChip} ${styles.data}`}><Database /><span>Fragmented<br />information</span></div>
        <div className={`${styles.briefChip} ${styles.goal}`}><Flag weight="fill" /><span>Clear brief<small>for what to change</small></span><CaretRight /></div>
      </div>
    </figure>
  );
}

function MarkedTitle({ b }) {
  if (!b.titleMarks?.length) return b.title;
  const parts = []; let offset = 0;
  b.titleMarks.forEach(mark => {
    const index = b.title.indexOf(mark, offset);
    if (index < 0) return;
    parts.push(b.title.slice(offset, index), <span className="accent" key={index}>{mark}</span>);
    offset = index + mark.length;
  });
  parts.push(b.title.slice(offset));
  return parts;
}

export function AirAuditBrief({ b }) {
  return <section className={`section ${styles.briefSection}`} aria-labelledby="air-audit-brief-heading">
    <div className={`container ${styles.briefInner}`}>
      <div className={styles.briefCopy} data-reveal>
        <span className="eyebrow">{b.eyebrow}</span>
        <h2 className={styles.sectionTitle} id="air-audit-brief-heading"><MarkedTitle b={b} /></h2>
        <p className={styles.body}>{b.body}</p>
      </div>
      <div data-reveal><BriefVisual /></div>
    </div>
  </section>;
}

const ROUTE = 'M1880 410 C1400 414 700 428 300 448 C130 456.5 60 474 60 516 C60 562 140 582 300 586 C800 598.5 1400 604 1880 630';
const TOP_NODES = [[110, 471], [555, 437], [1006, 424], [1452, 415]];
const BOTTOM_NODES = [[153, 574], [555, 592], [1006, 601], [1452, 612]];

export function AirAuditRoute({ b }) {
  const ref = useRef(null);
  const id = useId().replace(/:/g, '');
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const path = ref.current.querySelector('[data-route-core]');
      const length = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
        strokeDashoffset: 0, duration: 2.4, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        clearProps: 'strokeDasharray,strokeDashoffset',
      });
    }, ref);
    return () => media.revert();
  }, []);

  return <section className={`section ${styles.routeSection}`} aria-labelledby="air-audit-route-heading">
    <div className="container">
      <div className={styles.routeHeading} data-reveal><span className="eyebrow">{b.eyebrow}</span><h2 className="h-section wide" id="air-audit-route-heading">{b.title}</h2></div>
      <div ref={ref} className={styles.route}>
        <svg viewBox="0 0 1875 840" className={styles.routeSvg} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-ends`}><stop stopColor="#fff" /><stop offset=".86" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
            <filter id={`${id}-wide`} filterUnits="userSpaceOnUse" x="0" y="0" width="1875" height="840"><feGaussianBlur stdDeviation="15" /></filter><filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="0" y="0" width="1875" height="840"><feGaussianBlur stdDeviation="5" /></filter>
            <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1875" height="840"><rect width="1875" height="840" fill={`url(#${id}-ends)`} /></mask>
          </defs>
          <g mask={`url(#${id}-mask)`}>
          <path d={ROUTE} stroke="#1f5fff" strokeWidth="44" opacity=".3" filter={`url(#${id}-wide)`} />
          <path d={ROUTE} stroke="#3f8cff" strokeWidth="12" opacity=".55" filter={`url(#${id}-soft)`} />
          <path d={ROUTE} stroke="#e9f6ff" strokeWidth="2.6" strokeLinecap="round" data-route-core />
          </g>
          {[...TOP_NODES, ...BOTTOM_NODES].map(([x, y], i) => <g key={i}>
            <line x1={x} x2={x} y1={i < 4 ? 224 : y} y2={i < 4 ? y : 795} stroke="#8fcbff" strokeWidth="1.4" opacity={i < 4 ? '.5' : '.3'} />
            {i < 4 && <circle cx={x} cy="224" r="5" fill="#e9f6ff" className={styles.cap} />}
            <g className={styles.node} style={{ '--n': i }}>
              <circle cx={x} cy={y} r="16" fill="#3f8cff" opacity=".5" filter={`url(#${id}-soft)`} />
              <circle cx={x} cy={y} r="7.5" fill="#e9f6ff" stroke="#8fcbff" strokeWidth="2" />
            </g>
          </g>)}
        </svg>
        <ol className={styles.routeSteps}>{b.items.map((item, i) => <li key={item.title} style={{ '--step-left': `${7.2 + (i % 4) * 24 + (i === 4 ? 2.3 : 0)}%`, '--row-top': i < 4 ? '28%' : '77%' }} data-reveal>
          <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p>
        </li>)}</ol>
      </div>
    </div>
  </section>;
}
