import { useEffect, useId, useRef } from 'react';
import { ArrowRight, Cube, FileText, ShieldCheck, UsersThree, Warning } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardVisual from '../art/CardVisuals';
import { still } from '../art/HeroScenes';
import styles from './IndustryPrincipals.module.css';

gsap.registerPlugin(ScrollTrigger);

// A point on a cubic Bezier at t.
const bez = ([a, b, c, d], t) => [0, 1].map((i) => (1 - t) ** 3 * a[i] + 3 * (1 - t) ** 2 * t * b[i] + 3 * (1 - t) * t * t * c[i] + t ** 3 * d[i]);
const cubic = ([a, b, c, d]) => `M${a} C${b} ${c} ${d}`;

const roles = [
  { title: 'Operational judgement', icon: UsersThree, lines: ['Experience', 'Patterns', 'Real-world constraints'] },
  { title: 'Technical execution', icon: Cube, lines: ['Systems', 'Data', 'Controls'] },
];

// The two disciplines as panes of glass. Fine strands of light leave their inner and lower edges and
// gather on one lit plinth: two bodies of evidence, one decision.
const MEET = [320, 476];
function decisionStrands() {
  const list = [];
  [1, -1].forEach((dir) => {
    const mx = (x) => (dir === 1 ? x : 640 - x);
    // From the inner edge of the pane, falling almost straight into the plinth.
    for (let i = 0; i < 9; i += 1) {
      const y = 46 + i * 24;
      list.push({ d: [[mx(268), y], [mx(292 + i * 1.5), y + 28], [mx(314), 390], MEET], lit: i === 4 });
    }
    // From the lower edge, swinging out and back in.
    for (let i = 0; i < 7; i += 1) {
      const x = 52 + i * 33;
      list.push({ d: [[mx(x), 272], [mx(x - 18 + i * 4), 352 + i * 6], [mx(286), 418], MEET], lit: i === 5 });
    }
  });
  return list;
}
const diamond = (cx, cy, w, h) => `M${cx - w} ${cy} L${cx} ${cy - h} L${cx + w} ${cy} L${cx} ${cy + h} Z`;

function DecisionVisual() {
  const id = useId().replace(/:/g, '');
  const strands = decisionStrands();
  const moving = !still();
  const [cx, cy] = [MEET[0], MEET[1] + 10];
  return (
    <figure className={styles.decision} aria-label="Operational judgement and technical execution combine into a stronger decision.">
      <svg className={styles.decisionLines} viewBox="0 0 640 640" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-flow`} x1="0" y1="40" x2="0" y2="476" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3f8cff" stopOpacity=".15" />
            <stop offset=".6" stopColor="#3f8cff" stopOpacity=".75" />
            <stop offset="1" stopColor="#e9f6ff" />
          </linearGradient>
          <linearGradient id={`${id}-top`} x1="0" y1={cy - 40} x2="0" y2={cy + 40} gradientUnits="userSpaceOnUse">
            <stop stopColor="#8fcbff" stopOpacity=".55" />
            <stop offset="1" stopColor="#1f5fff" stopOpacity=".35" />
          </linearGradient>
          <radialGradient id={`${id}-flare`}>
            <stop stopColor="#fff" />
            <stop offset=".25" stopColor="#8fcbff" stopOpacity=".8" />
            <stop offset="1" stopColor="#3f8cff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-floor`} cx="50%" cy="50%" r="50%">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-floorMask`} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="640"><ellipse cx={cx} cy={cy + 20} rx="320" ry="110" fill={`url(#${id}-floor)`} /></mask>
          <filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="640"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id={`${id}-wide`} filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="640"><feGaussianBlur stdDeviation="16" /></filter>
        </defs>

        {/* The floor: nested outlines and fine lines running out from the plinth */}
        <g mask={`url(#${id}-floorMask)`}>
          {[1.75, 2.35, 3].map((k) => <path key={k} d={diamond(cx, cy + 10 + k * 6, 130 * k, 36 * k)} className={styles.floorLine} />)}
          {[-1, 1].map((s) => [0, 1, 2].map((n) => <path key={`${s}${n}`} d={`M${cx + s * (150 + n * 40)} ${cy + 4 + n * 12} L${cx + s * 640} ${cy - 60 + n * 70}`} className={styles.floorLine} />))}
        </g>
        <ellipse cx={cx} cy={cy + 6} rx="190" ry="54" fill="#1f5fff" opacity=".35" filter={`url(#${id}-wide)`} />

        {/* Strands */}
        {strands.map(({ d }, k) => <path key={k} d={cubic(d)} stroke={`url(#${id}-flow)`} strokeWidth=".8" data-flow />)}
        {strands.filter((s) => s.lit).map(({ d }, k) => <path key={`g${k}`} d={cubic(d)} stroke="#3f8cff" strokeWidth="5" opacity=".5" filter={`url(#${id}-soft)`} />)}
        {strands.filter((s) => s.lit).map(({ d }, k) => <path key={`l${k}`} d={cubic(d)} stroke="#8fcbff" strokeWidth="1.5" />)}
        {strands.filter((_, k) => k % 3 === 1).map(({ d }, k) => {
          const [x, y] = bez(d, 0.35 + (k % 4) * 0.12);
          return <circle key={`p${k}`} cx={x} cy={y} r="1.6" className={styles.mote} style={{ '--n': k % 7 }} />;
        })}
        {moving && strands.filter((s) => s.lit).map(({ d }, k) => <circle key={`m${k}`} r="2.2" className="hs-dot"><animateMotion dur="3.4s" begin={`-${k * 0.85}s`} repeatCount="indefinite" path={cubic(d)} /></circle>)}

        {/* The plinth: a lit slab of glass, the point where the strands meet glowing on its face */}
        <path d={`M${cx - 130} ${cy} L${cx} ${cy + 36} L${cx + 130} ${cy} V${cy + 8} L${cx} ${cy + 44} L${cx - 130} ${cy + 8} Z`} className={styles.plinthSide} />
        <path d={diamond(cx, cy, 130, 36)} fill={`url(#${id}-top)`} className={styles.plinthTop} />
        <path d={diamond(cx, cy, 78, 22)} className={styles.plinthInner} />
        <ellipse cx={MEET[0]} cy={MEET[1]} rx="46" ry="16" fill={`url(#${id}-flare)`} />
        <circle cx={MEET[0]} cy={MEET[1]} r="3.5" fill="#fff" />
      </svg>
      <div className={styles.rolePair}>
        {roles.map(({ title, icon: Icon, lines }) => (
          <div className={styles.role} key={title} data-role>
            <Icon className={styles.roleIcon} weight="light" aria-hidden="true" />
            <h2>{title}</h2>
            <ul>{lines.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
        ))}
      </div>
      <figcaption className={styles.decisionResult}>A stronger decision</figcaption>
    </figure>
  );
}

// Process, people, systems and data as threads of evidence. Each input sends three fine strands that draw
// together through one pane of glass and leave it as three clean lines toward a clearer view.
const INPUT_Y = [62, 124, 186, 248];
const CX_LANES = [128, 158, 188];
const CX_PANE = 530;
function contextStrands() {
  const ins = INPUT_Y.flatMap((y, row) => [-1, 0, 1].map((j) => {
    const e = 158 + (y - 158) * 0.5 + j * 9;
    return { row, j, y, e, left: [[176, y], [300, y], [400, e], [CX_PANE, e]], lit: j === 0 };
  }));
  // Out of the pane: the twelve strands, top to bottom, gather into the three lanes in fours.
  const sorted = [...ins].sort((a, b) => a.e - b.e);
  sorted.forEach((s, k) => { const lane = CX_LANES[Math.floor(k / 4)]; s.right = [[CX_PANE, s.e], [620, s.e], [650, lane], [720, lane]]; });
  return ins;
}

function ContextVisual() {
  const id = useId().replace(/:/g, '');
  const inputs = ['Process', 'People', 'Systems', 'Data'];
  const strands = contextStrands();
  const lit = strands.filter((s) => s.lit);
  const moving = !still();
  return (
    <figure className={styles.context} aria-label="Process, people, systems and data come together to provide a clearer view for better decisions.">
      <svg viewBox="0 0 1100 310" className={styles.contextLines} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-in`} x1="176" x2={CX_PANE} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3f8cff" stopOpacity=".35" />
            <stop offset="1" stopColor="#8fcbff" stopOpacity=".8" />
          </linearGradient>
          <linearGradient id={`${id}-pane`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#3f8cff" stopOpacity=".06" />
            <stop offset="1" stopColor="#8fcbff" stopOpacity=".22" />
          </linearGradient>
          <filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="0" y="-20" width="1100" height="370"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id={`${id}-wide`} filterUnits="userSpaceOnUse" x="0" y="-20" width="1100" height="370"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>

        {/* Strands in: fine and calm, one lit line from each input */}
        {strands.map((s, k) => <path key={k} d={cubic(s.left)} stroke={`url(#${id}-in)`} strokeWidth={s.lit ? 1.3 : 0.7} opacity={s.lit ? 1 : 0.6} />)}
        {lit.map((s, k) => <path key={`g${k}`} d={cubic(s.left)} stroke="#3f8cff" strokeWidth="4" opacity=".35" filter={`url(#${id}-soft)`} />)}
        {lit.map((s, k) => { const [x, y] = bez(s.left, 0.5); return <circle key={`p${k}`} cx={x} cy={y} r="1.8" className={styles.mote} style={{ '--n': k * 2 }} />; })}

        {/* The pane */}
        <ellipse cx={CX_PANE} cy="158" rx="40" ry="120" fill="#1f5fff" opacity=".22" filter={`url(#${id}-wide)`} />
        <path d={`M${CX_PANE - 22} 40 L${CX_PANE + 14} 22 V292 L${CX_PANE - 22} 274 Z`} fill={`url(#${id}-pane)`} stroke="rgba(143, 203, 255, .35)" strokeWidth="1" />
        <path d={`M${CX_PANE + 14} 22 V292`} stroke="#3f8cff" strokeWidth="6" opacity=".45" filter={`url(#${id}-soft)`} />
        <path d={`M${CX_PANE + 14} 22 V292`} stroke="#e9f6ff" strokeWidth="1.4" />

        {/* Strands out: gathered into three lanes, then three clean arrows */}
        {strands.map((s, k) => <path key={`r${k}`} d={cubic(s.right)} stroke="#8fcbff" strokeWidth=".8" opacity=".55" />)}
        {CX_LANES.map((y) => (
          <g key={y}>
            <path d={`M720 ${y} H812`} stroke="#3f8cff" strokeWidth="5" opacity=".4" filter={`url(#${id}-soft)`} />
            <path d={`M720 ${y} H812`} stroke="#e9f6ff" strokeWidth="1.4" />
            <path d={`M804 ${y - 6} L813 ${y} L804 ${y + 6}`} stroke="#e9f6ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        {moving && lit.map((s, k) => <circle key={`d${k}`} r="2" className="hs-dot"><animateMotion dur="4s" begin={`-${k}s`} repeatCount="indefinite" path={`${cubic(s.left)} ${cubic(s.right).replace(/^M[^C]+/, '')}`} /></circle>)}
      </svg>
      <ul className={styles.contextInputs}>{inputs.map((input, k) => <li key={input} style={{ top: `${(INPUT_Y[k] / 310) * 100}%` }}>{input}<i /></li>)}</ul>
      <figcaption className={styles.contextResult}>A clearer view<br />for better decisions</figcaption>
    </figure>
  );
}

export default function IndustryPrincipals({ page }) {
  const root = useRef(null);
  const [hero, risk, disciplines, statement] = page.blocks;

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(root.current.querySelectorAll('[data-ip-intro]'),
        { autoAlpha: .4, y: 18, filter: 'blur(5px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .9, stagger: .12, ease: 'expo.out', clearProps: 'transform,filter,opacity,visibility' });
      const decision = root.current.querySelector(`.${styles.decision}`);
      gsap.timeline({ scrollTrigger: { trigger: decision, start: 'top 85%', once: true } })
        .fromTo(decision.querySelectorAll('[data-role]'), { y: 20, autoAlpha: .5 }, { y: 0, autoAlpha: 1, duration: 1, stagger: .16, ease: 'expo.out', clearProps: 'transform,opacity,visibility' })
        .fromTo(decision.querySelectorAll('[data-flow]'), { strokeDasharray: 700, strokeDashoffset: 700 }, { strokeDashoffset: 0, duration: 1.5, stagger: .02, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' }, .25)
        .fromTo(decision.querySelector('figcaption'), { autoAlpha: .25, y: 8 }, { autoAlpha: 1, y: 0, duration: .7, ease: 'expo.out', clearProps: 'transform,opacity,visibility' }, 1.2);
      return undefined;
    }, root);
    return () => media.revert();
  }, []);

  return (
    <div ref={root} className={styles.page}>
      <section className={styles.hero} aria-labelledby="ip-title">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={`hero-pill ${styles.kicker}`} data-ip-intro>{hero.eyebrow}</span>
            <h1 id="ip-title" className={styles.title} data-ip-intro>{hero.title}</h1>
            <p className={styles.lead} data-ip-intro>{hero.lead}</p>
            <div data-ip-intro><a className="btn btn-primary" href={hero.cta.href}>{hero.cta.label}<ArrowRight weight="bold" aria-hidden="true" /></a></div>
          </div>
          <DecisionVisual />
        </div>
      </section>

      <section className={`section ${styles.risk}`} aria-labelledby="ip-risk-title">
        <div className="container">
          <div className={styles.riskInner}>
            <div className={styles.sectionCopy} data-reveal>
              <span className={`eyebrow ${styles.kicker}`}>{risk.eyebrow}</span>
              <h2 className="h-section wide" id="ip-risk-title">{risk.title}</h2>
            </div>
            <div className={styles.riskEvidence} data-reveal>
              <div className={styles.riskRow}>
                <div className={`${styles.riskCell} ${styles.riskOutcome}`}><FileText aria-hidden="true" /><span>Looks inefficient<br />on the surface</span></div>
                <ArrowRight className={styles.riskArrow} aria-hidden="true" />
                <div className={`${styles.riskCell} ${styles.riskOutcome}`}><Warning aria-hidden="true" /><span>May protect<br />a real risk</span></div>
              </div>
              <div className={`${styles.riskRow} ${styles.riskMuted}`}>
                <div className={styles.riskCell}><FileText aria-hidden="true" /><span>Looks efficient<br />on the surface</span></div>
                <ArrowRight className={styles.riskArrow} aria-hidden="true" />
                <div className={styles.riskCell}><ShieldCheck aria-hidden="true" /><span>May introduce<br />unseen risk</span></div>
              </div>
              <p className={styles.lead}>{risk.body}</p>
            </div>
          </div>
          <div className={styles.contextWrap} data-reveal><ContextVisual /></div>
        </div>
      </section>

      <section className={`section ${styles.disciplines}`} aria-labelledby="ip-disciplines-title">
        <div className="container">
          <div className={styles.sectionCopy} data-reveal>
            <span className={`eyebrow ${styles.kicker}`}>{disciplines.eyebrow}</span>
            <h2 className="h-section wide" id="ip-disciplines-title">{disciplines.title}</h2>
          </div>
          <div className={styles.disciplineCards}>
            {disciplines.items.map((item, i) => {
              const Icon = i === 0 ? UsersThree : Cube;
              return <article className={styles.disciplineCard} key={item.title} data-reveal style={{ '--i': i }}>
                <CardVisual kind={i === 0 ? 'mesh' : 'slabs'} side />
                <span className={`pg-ico ${styles.disciplineIcon}`}><Icon weight="light" aria-hidden="true" /></span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className={styles.statement} aria-label="The balance between operational judgement and technical execution">
        <div className={styles.statementBg} aria-hidden="true"><img src="/images/principals-horizon.webp" alt="" width="1920" height="1080" loading="lazy" /></div>
        <div className="container"><p data-reveal>{statement.text}</p></div>
      </section>

      <section className={styles.closing} aria-labelledby="ip-closing-title">
        <div className={`container ${styles.closingCopy}`} data-reveal>
          <h2 id="ip-closing-title">{page.cta.title}</h2>
          <p className="lead">{page.cta.lead}</p>
          <a className="btn btn-primary" href={page.cta.button.href}>{page.cta.button.label}<ArrowRight weight="bold" aria-hidden="true" /></a>
        </div>
      </section>
    </div>
  );
}
