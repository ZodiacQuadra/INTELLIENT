import { useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, ArrowLeft, CheckCircle, Clock, Warning, ArrowsLeftRight, Target, Eye, RocketLaunch,
  Stack, ChartBar, UsersThree, Hand, Hourglass, ArrowsClockwise, Gavel, Trash, Ruler, Sparkle, ArrowFatLinesUp,
  Compass, PencilRuler, Path, Code, ShieldCheck, Pulse, Fingerprint, Coins, FileText, Factory, Bank, Heartbeat,
  Briefcase, Gauge, TrendUp, Graph, Database, EnvelopeSimple, Phone, MapPin, Info, Plus, MagnifyingGlass, Wrench, Cube, Gear,
} from '@phosphor-icons/react';
import WhyIntellientAtmosphere from '../art/WhyIntellientAtmosphere';
import IntellientMockupArt from '../art/IntellientMockupArt';
import IntellientTechnicalAtmosphere from '../art/IntellientTechnicalAtmosphere';
import WorkflowJourney from '../art/WorkflowJourney';
import OperatingExplorer from '../art/OperatingExplorer';
import HeroScene, { Route, Globe, CoreOrbits, EntryHorizon } from '../art/HeroScenes';
import CardVisual from '../art/CardVisuals';
import { COLLECTIONS } from './pages';

const ICONS = {
  clock: Clock, warning: Warning, arrows: ArrowsLeftRight, target: Target, eye: Eye, rocket: RocketLaunch,
  stack: Stack, chart: ChartBar, users: UsersThree, hand: Hand, hourglass: Hourglass, repeat: ArrowsClockwise,
  gavel: Gavel, trash: Trash, ruler: Ruler, sparkle: Sparkle, escalate: ArrowFatLinesUp, compass: Compass,
  blueprint: PencilRuler, path: Path, code: Code, shield: ShieldCheck, pulse: Pulse, fingerprint: Fingerprint,
  check: CheckCircle, coins: Coins, file: FileText, factory: Factory, bank: Bank, heart: Heartbeat,
  briefcase: Briefcase, gauge: Gauge, trend: TrendUp, search: MagnifyingGlass, tools: Wrench, cube: Cube, gear: Gear, graph: Graph, database: Database,
};
const pad = (i) => String(i + 1).padStart(2, '0');
// A title with its last words, or the words in `titleMarks`, set in the accent blue.
const Title = ({ b }) => {
  if (b.titleMarks) return marked(b.title, b.titleMarks);
  return b.accent ? <>{b.title} <span className="accent">{b.accent}</span></> : b.title;
};

/* ---------- Shared pieces ---------- */

// Background art for a section, kept within the page's content width so every page has the same
// left and right gaps; it fades out just inside the content edges.
const Deco = ({ children }) => <div className="pg-deco" aria-hidden="true">{children}</div>;

export function Art({ art, className = '' }) {
  if (!art) return null;
  if (art.kind === 'scene') return <div className={`pg-art pg-scene ${art.className || ''} ${className}`} aria-hidden="true"><HeroScene scene={art.scene} /></div>;
  const Comp = art.kind === 'why' ? WhyIntellientAtmosphere : art.kind === 'mockup' ? IntellientMockupArt : IntellientTechnicalAtmosphere;
  const props = art.kind === 'why' ? { mode: art.scene } : { scene: art.scene };
  return <div className={`pg-art ${art.kind} ${art.scene} ${className}`} aria-hidden="true"><Comp {...props} /></div>;
}

function Head({ b, center }) {
  if (!b.eyebrow && !b.title && !b.lead) return null;
  const EyebrowIcon = ICONS[b.eyebrowIcon];
  return (
    <div className={`section-head pg-head${center ? ' center' : ''}`} data-reveal>
      {b.eyebrow && <span className="eyebrow">{EyebrowIcon && <EyebrowIcon />}{b.eyebrow}</span>}
      {b.title && <h2 className="h-section wide"><Title b={b} /></h2>}
      {b.lead && <p className="lead">{b.lead}</p>}
    </div>
  );
}

function MoreLink({ link }) {
  if (!link) return null;
  return <a href={link.href} className="link-arrow pg-more">{link.label}<ArrowRight /></a>;
}

/* ---------- Blocks ---------- */

function Hero({ b }) {
  const aside = b.panel ? (
    <div className={`pg-panel${b.panel.layered ? ' layered' : ''}`} data-reveal style={{ '--i': 2 }}>
      <span className="pg-panel-kicker">{b.panel.kicker}</span>
      <h3>{b.panel.title}</h3>
      <ul>
        {b.panel.rows.map(([k, v, icon]) => {
          const Icon = ICONS[icon];
          return <li key={k}><span>{Icon && <Icon className="pg-panel-ico" />}{k}</span><em>{v}</em></li>;
        })}
      </ul>
      <p>{b.panel.foot}</p>
    </div>
  ) : b.art ? <Art art={b.art} className="pg-hero-art" /> : null;
  return (
    <section className={`pg-hero${aside ? ' split' : ''}${b.backdrop ? ' has-backdrop' : ''}${b.className ? ` ${b.className}` : ''}`}>
      {/* Hero illustrations run the full width, like background photos. */}
      {b.backdrop && <Art art={b.backdrop} className="pg-backdrop" />}
      {b.planet && <span className="pg-planet" aria-hidden="true" />}
      <span className="pg-hero-glow" aria-hidden="true" />
      <div className="container pg-hero-inner">
        <div className="pg-hero-copy">
          {b.back && <a href={b.back.href} className="pg-back rise" style={{ '--d': 60 }}><ArrowLeft />{b.back.label}</a>}
          {b.logo && <img src={b.logo} alt="" className="pg-hero-logo rise" style={{ '--d': 80 }} />}
          {b.eyebrow && <span className="hero-pill rise" style={{ '--d': 100 }}>{b.eyebrow}</span>}
          <h1 className="pg-title rise" style={{ '--d': 200 }}><Title b={b} /></h1>
          {b.lead && <p className="pg-lead rise" style={{ '--d': 320 }}>{b.lead}</p>}
          {(b.cta || b.cta2) && (
            <div className="btn-row rise" style={{ '--d': 440 }}>
              {b.cta && <a href={b.cta.href} className="btn btn-primary">{b.cta.label}<ArrowRight weight="bold" /></a>}
              {b.cta2 && <a href={b.cta2.href} className="btn btn-ghost">{b.cta2.label}<ArrowRight /></a>}
            </div>
          )}
        </div>
        {aside && <div className="pg-hero-aside rise" style={{ '--d': 360 }}>{aside}</div>}
      </div>
    </section>
  );
}

function Cards({ b }) {
  const cols = b.cols || Math.min(b.items.length, 3);
  return (
    <section className={`section pg-sec${b.className ? ` ${b.className}` : ''}`} id={b.id}>
      <div className="container">
        <div className={`pg-intro${b.art ? ' with-art' : ''}`}>
          <div>
            <Head b={b} />
            {b.body && <p className="pg-body" data-reveal>{b.body}</p>}
          </div>
          {b.art && <Art art={b.art} className="pg-side-art" />}
        </div>
        <div className={`pg-cards cols-${cols}`}>
          {b.items.map((it, i) => {
            const Icon = ICONS[it.icon];
            const Tag = it.href ? 'a' : 'div';
            return (
              <Tag key={it.title} href={it.href} className={`pg-card${it.href ? ' link' : ''}${it.visual ? ({ bottom: ' has-foot-visual', side: ' has-side-visual', corner: ' has-corner-visual' }[b.visualAt] || ' has-visual') : ''}`} data-reveal style={{ '--i': i % 4 }}>
                {it.visual && !b.visualAt && <CardVisual kind={it.visual} />}
                {it.visual && b.visualAt === 'side' && <CardVisual kind={it.visual} side />}
                {it.visual && b.visualAt === 'corner' && <CardVisual kind={it.visual} corner />}
                {b.numbered && <span className="pg-num">{pad(i)}</span>}
                {Icon && <span className="pg-ico"><Icon /></span>}
                <h3>{it.title}</h3>
                {it.body && <p>{it.body}</p>}
                {it.tag && <span className="pg-tag"><i />{it.tag}</span>}
                {it.visual && b.visualAt === 'bottom' && <CardVisual kind={it.visual} bottom />}
                {it.href && <span className="pg-card-arrow"><ArrowUpRight /></span>}
              </Tag>
            );
          })}
        </div>
        <MoreLink link={b.link} />
      </div>
    </section>
  );
}

// Lit strands sweeping up from the lower left behind a section, with particles riding the brightest.
const SWOOSH = [
  'M-40 600 C260 570 560 470 690 40',
  'M-40 560 C220 540 480 440 600 120',
  'M-40 640 C300 600 620 520 760 0',
  'M-40 620 C420 600 860 640 1480 590',
  'M-40 645 C480 630 900 660 1480 630',
];
function Swoosh() {
  return (
    <svg className="pg-swoosh" viewBox="0 0 1440 640" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
      {SWOOSH.map((d, i) => <path key={d} d={d} className={`pg-swoosh-line${i === 0 || i === 3 ? ' lit' : ''}`} />)}
      {!(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) && [0, 3].map((k) => (
        <circle key={k} r="2.6" className="hs-dot">
          <animateMotion dur={`${k ? 9 : 6}s`} repeatCount="indefinite" path={SWOOSH[k]} />
        </circle>
      ))}
    </svg>
  );
}

function List({ b }) {
  return (
    <section className={`section pg-sec${b.swoosh ? ' has-swoosh' : ''}${b.globe ? ' has-globe' : ''}${b.orbits ? ' has-orbits' : ''}`} id={b.id}>
      {b.swoosh && <Deco><Swoosh /></Deco>}
      {b.globe && <Globe />}
      {b.orbits && <CoreOrbits />}
      <div className="container pg-two">
        <div>
          <Head b={b} />
          <MoreLink link={b.link} />
          {b.art && <Art art={b.art} className="pg-list-art" />}
        </div>
        <ol className={`pg-list${b.numbered ? ' numbered' : ''}`}>
          {b.items.map((t, i) => (
            <li key={t} data-reveal style={{ '--i': i % 6 }}>
              {b.numbered ? <span className="pg-num">{pad(i)}</span> : <CheckCircle weight="fill" />}
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Sets each of `marks` (in order, first match after the last) in the accent blue.
function marked(text, marks) {
  const out = [];
  let at = 0;
  marks.forEach((m) => {
    const i = text.indexOf(m, at);
    if (i < 0) return;
    out.push(text.slice(at, i), <span key={i} className="accent">{m}</span>);
    at = i + m.length;
  });
  out.push(text.slice(at));
  return out;
}

function Statement({ b }) {
  const text = b.marks ? marked(b.text, b.marks) : b.text;
  return (
    <section className={`pg-statement${b.bg ? ' has-bg' : ''}${b.planet ? ' has-planet' : ''}${b.className ? ` ${b.className}` : ''}`}>
      {/* A background photo runs the full width; drawn art keeps to the content width. */}
      {b.bg && <img src={b.bg} alt="" loading="lazy" decoding="async" className="pg-statement-bg" style={b.bgPos ? { objectPosition: b.bgPos } : undefined} />}
      {b.art?.full && <Art art={b.art} className="pg-statement-art" />}
      {b.entry && <EntryHorizon />}
      {(b.planet || (b.art && !b.art.full)) && (
        <Deco>
          {b.planet && <><span className="pg-statement-planet" /><span className="pg-statement-dots" /></>}
          {b.art && !b.art.full && <Art art={b.art} className="pg-statement-art" />}
        </Deco>
      )}
      <span className="pg-statement-glow" aria-hidden="true" />
      <div className="container">
        <p data-reveal>{b.accent ? <>{text} <span className="accent">{b.accent}</span></> : text}</p>
      </div>
    </section>
  );
}

function Text({ b }) {
  const notice = b.notice && (
    <div className="pg-notice" data-reveal>
      <Info />
      <div><h3>{b.notice.title}</h3><p>{b.notice.body}</p></div>
    </div>
  );
  // A single glass panel: the starting point, with a short route drawn into its right side.
  if (b.panel) {
    return (
      <section className="section pg-sec pg-start-sec" id={b.id}>
        <div className="container">
          <div className={`pg-start${b.title ? '' : ' no-title'}`} data-reveal>
            <svg className="pg-start-art" viewBox="0 0 420 200" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
              <path d="M40 150 C140 150 170 70 260 70 S360 100 400 100" className="pg-start-path" />
              <path d="M40 150 C140 150 170 70 260 70 S360 100 400 100" className="pg-start-path glow" />
              {[[40, 150], [170, 104], [260, 70]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" className="pg-start-node" />)}
              <circle cx="400" cy="100" r="14" className="pg-start-halo" />
              <circle cx="400" cy="100" r="5" className="pg-start-node hot" />
            </svg>
            <span className="pg-ico pg-start-ico"><Compass /></span>
            <div className="pg-start-copy">
              {b.title && <h2>{b.title}</h2>}
              <p>{b.body}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (b.art) {
    return (
      <section className="section pg-sec" id={b.id}>
        <div className={`container pg-intro with-art${b.artWide ? ' art-wide' : ''}`}>
          <div>
            <Head b={{ ...b, lead: undefined }} />
            {b.body && <p className="pg-body" data-reveal>{b.body}</p>}
            <MoreLink link={b.link} />
          </div>
          <Art art={b.art} className="pg-side-art" />
        </div>
      </section>
    );
  }
  return (
    <section className="section pg-sec" id={b.id}>
      <div className={`container pg-two${!b.title && !b.eyebrow ? ' solo' : ''}`}>
        <div>
          <Head b={{ ...b, lead: undefined }} />
          {!b.widget && <MoreLink link={b.link} />}
        </div>
        <div className="pg-text-side">
          {b.body && <p className="pg-body big" data-reveal>{b.body}</p>}
          {b.widget && <MoreLink link={b.link} />}
          {notice}
          {b.artBelow && <Art art={b.artBelow} className="pg-below-art" />}
        </div>
      </div>
      {b.artFull && <div className="container"><Art art={b.artFull} className="pg-full-art" /></div>}
      {b.widget && (
        <div className="container pg-side-wrap">
          <div className="pg-widget" data-reveal style={{ '--i': 1 }}><OperatingExplorer mode={b.widget === 'domain' ? 'domain' : 'measurement'} accent="#3f8cff" /></div>
        </div>
      )}
    </section>
  );
}

function Steps({ b }) {
  // Card layout: the head beside its visual, then the steps as numbered glass cards.
  if (b.cards) {
    return (
      <section className="section pg-sec" id={b.id}>
        <div className="container">
          <div className="pg-intro with-art pg-steps-intro">
            <Head b={b} />
            {b.art && <Art art={b.art} className="pg-side-art" />}
          </div>
          <ol className="pg-stepcards">
            {b.items.map((it, i) => {
              const Icon = ICONS[it.icon];
              return (
                <li key={it.title} className="pg-stepcard" data-reveal style={{ '--i': i % 4 }}>
                  <span className="pg-stepcard-num">{pad(i)}</span>
                  {Icon && <Icon className="pg-stepcard-ico" />}
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    );
  }
  // Route layout: the steps along one winding path of light.
  if (b.route) {
    return (
      <section className="section pg-sec" id={b.id}>
        <div className="container">
          <Head b={b} />
          <Route items={b.items} />
        </div>
      </section>
    );
  }
  return (
    <section className="section pg-sec" id={b.id}>
      {b.art && <Art art={b.art} className="pg-steps-art" />}
      <div className="container">
        <Head b={b} />
        <ol className="pg-steps">
          {b.items.map((it, i) => (
            <li key={it.title} data-reveal style={{ '--i': i % 4 }}>
              <span className="pg-step-dot" aria-hidden="true" />
              <span className="pg-num">{pad(i)}</span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faq({ b }) {
  return (
    <section className="section pg-sec" id={b.id}>
      <div className="container faq">
        <div className="faq-head" data-reveal>
          {b.eyebrow && <span className="eyebrow">{b.eyebrow}</span>}
          <h2 className="h-section">{b.title}</h2>
        </div>
        <div data-reveal>
          {b.items.map((f, i) => (
            <details key={f.q} className="qa" open={i === 0}>
              <summary><span><small className="pg-qa-cat">{f.category}</small>{f.q}</span><Plus /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products({ b }) {
  return (
    <section className="section pg-sec" id={b.id}>
      <div className="container">
        <Head b={b} />
        <div className="pg-cards cols-3">
          {b.items.map((p, i) => (
            <a key={p.title} href={p.href} className={`pg-card pg-product link${p.visual ? ' has-corner-visual' : ''}`} data-reveal style={{ '--i': i }}>
              {p.visual && <CardVisual kind={p.visual} corner />}
              {p.visual ? <span className="pg-ico logo"><img src={p.logo} alt="" /></span> : <img src={p.logo} alt="" />}
              {p.category && <span className="pg-cat">{p.category}</span>}
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <span className="link-arrow">{p.label}<ArrowRight /></span>
            </a>
          ))}
        </div>
        <MoreLink link={b.link} />
      </div>
    </section>
  );
}

function Production({ b }) {
  return (
    <section className="section pg-sec" id={b.id}>
      <div className="container">
        <Head b={b} />
        <div className="pg-cards cols-3">
          {b.items.map((p, i) => (
            <div key={p.title} className={`pg-card pg-prod${p.visual ? ' has-corner-visual' : ''}`} data-reveal style={{ '--i': i }}>
              {p.visual && <CardVisual kind={p.visual} corner />}
              {ICONS[p.icon] && <span className="pg-ico">{(() => { const Icon = ICONS[p.icon]; return <Icon />; })()}</span>}
              <span className="pg-cat">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <div className="pg-proof">
                <strong>{p.proofTitle}</strong>
                {p.proofRows.map(([k, v]) => <div key={k}><span>{k}</span><em><CheckCircle weight="fill" />{v}</em></div>)}
              </div>
            </div>
          ))}
        </div>
        {b.note && <p className="note" style={{ marginTop: 22 }}>{b.note}</p>}
      </div>
    </section>
  );
}

// Forms have no backend in this build: submitting opens the visitor's email client with the
// answers addressed to contact@intellient.ai.
// Reads a field's answer from form data: checkbox groups join their ticked options.
const answerOf = (data, f) => (f.type === 'checkboxes' ? data.getAll(f.name).join(', ') : (data.get(f.name) || '').toString().trim());
const mailto = (subject, body) => `mailto:contact@intellient.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

function Form({ b }) {
  const [sent, setSent] = useState(false);
  const [brief, setBrief] = useState(null);
  const [answered, setAnswered] = useState(0);
  const formRef = useRef(null);
  const briefRef = useRef(null);
  const questions = b.brief ? b.fields.filter((f) => !f.heading && b.brief.some((s) => s.from.includes(f.name))) : [];
  const onChange = () => {
    if (!b.brief) return;
    const data = new FormData(formRef.current);
    setAnswered(questions.filter((q) => answerOf(data, q)).length);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (b.brief) {
      // Assemble the answers into the brief's sections, in the brief's order.
      const label = Object.fromEntries(b.fields.filter((f) => !f.heading).map((f) => [f.name, f.label]));
      const sections = b.brief.map((s) => ({
        title: s.title,
        rows: s.from.map((n) => [label[n], answerOf(data, { ...b.fields.find((f) => f.name === n) })]).filter(([, v]) => v),
        note: s.note,
      }));
      const contact = b.fields.filter((f) => !f.heading && !b.brief.some((s) => s.from.includes(f.name))).map((f) => [f.label, answerOf(data, f)]).filter(([, v]) => v);
      setBrief({ sections, contact });
      requestAnimationFrame(() => briefRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      return;
    }
    const lines = [];
    for (const f of b.fields) {
      if (f.heading) { lines.push('', `— ${f.heading}`); continue; }
      const v = answerOf(data, f);
      if (v) lines.push(`${f.label}: ${v}`);
    }
    window.location.href = mailto(b.subject || 'Intellient enquiry', lines.join('\n'));
    setSent(true);
  };
  const briefText = brief && [
    b.subject || 'Operating Domain Brief', '',
    ...brief.sections.flatMap((s, i) => [`${pad(i)}  ${s.title}`, ...(s.rows.length ? s.rows.map(([q, v]) => `    ${q}\n    ${v}`) : ['    Not answered yet']), ...(s.note ? [`    ${s.note}`] : []), '']),
    ...(brief.contact.length ? ['Contact', ...brief.contact.map(([q, v]) => `    ${q}: ${v}`)] : []),
  ].join('\n');
  const download = () => {
    const url = URL.createObjectURL(new Blob([briefText], { type: 'text/plain' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: 'operating-domain-brief.txt' });
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className="section pg-sec" id={b.id}>
      <div className={`container${b.aside || b.title ? ' pg-form-wrap' : ''}`}>
        {(b.title || b.aside) && (
          <div className="pg-form-side">
            <Head b={b} />
            {b.aside && (
              <div className="pg-contact" data-reveal>
                {b.asideTitle && <h3>{b.asideTitle}</h3>}
                {b.aside.map(([k, v, href]) => {
                  const Icon = k === 'Email' ? EnvelopeSimple : k === 'Phone' ? Phone : MapPin;
                  return (
                    <div key={k} className="pg-contact-row">
                      <span className="pg-ico"><Icon /></span>
                      <div><small>{k}</small>{href ? <a href={href}>{v}</a> : <span>{v}</span>}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {b.brief && (
          <div className="pg-progress" aria-live="polite">
            <span>{answered} of {questions.length} questions answered</span>
            <i><b style={{ width: `${(answered / Math.max(questions.length, 1)) * 100}%` }} /></i>
          </div>
        )}
        <form ref={formRef} className="pg-form" onSubmit={onSubmit} onChange={onChange} data-reveal>
          {b.fields.map((f, i) => {
            if (f.heading) return <h3 key={`h${i}`} className="pg-form-heading">{f.heading}</h3>;
            const id = `${b.id}-${f.name}`;
            return (
              <div key={f.name} className={`pg-field${f.wide ? ' wide' : ''}`}>
                {f.type === 'checkboxes' ? (
                  <fieldset>
                    <legend>{f.label}</legend>
                    <div className="pg-checks">
                      {f.options.map((o) => (
                        <label key={o} className="pg-check"><input type="checkbox" name={f.name} value={o} /><span>{o}</span></label>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <>
                    <label htmlFor={id}>{f.label}{f.required && <i aria-hidden="true"> *</i>}</label>
                    {f.type === 'textarea' ? <textarea id={id} name={f.name} rows={3} required={f.required} />
                      : f.type === 'select' ? (
                        <select id={id} name={f.name} defaultValue="">
                          <option value="" disabled>Select an answer</option>
                          {f.options.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      ) : <input id={id} name={f.name} type={f.type} required={f.required} />}
                  </>
                )}
              </div>
            );
          })}
          {b.consent && (
            <label className="pg-check pg-consent wide"><input type="checkbox" required /><span>{b.consent}</span></label>
          )}
          <div className="pg-form-foot wide">
            <button type="submit" className="btn btn-primary">{b.submit}<ArrowRight weight="bold" /></button>
            {!b.brief && !sent && <p className="pg-form-hint">Opens your email app with these details addressed to contact@intellient.ai.</p>}
            {sent && <p className="pg-form-note" role="status">Your email app should open with these details addressed to contact@intellient.ai.</p>}
          </div>
        </form>
        {brief && (
          <div ref={briefRef} className="pg-brief" role="region" aria-label="Your Operating Domain Brief">
            <div className="pg-brief-head">
              <span className="eyebrow">Your brief</span>
              <h3>{b.subject || 'Operating Domain Brief'}</h3>
            </div>
            <ol>
              {brief.sections.map((s, i) => (
                <li key={s.title} className={s.rows.length || s.note ? 'done' : ''}>
                  <span className="pg-num">{pad(i)}</span>
                  <div>
                    <h4>{s.title}</h4>
                    {s.rows.map(([q, v]) => <p key={q}><small>{q}</small>{v}</p>)}
                    {!s.rows.length && !s.note && <p className="empty">Not answered yet</p>}
                    {s.note && <p className="next">{s.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
            <div className="pg-brief-actions">
              <a className="btn btn-primary" href={mailto(b.subject || 'Operating Domain Brief', briefText)}>Send to Intellient<ArrowRight weight="bold" /></a>
              <button type="button" className="btn btn-ghost" onClick={download}>Download brief</button>
              <button type="button" className="btn btn-ghost" onClick={() => navigator.clipboard?.writeText(briefText)}>Copy brief</button>
              <button type="button" className="pg-brief-edit" onClick={() => { setBrief(null); formRef.current?.scrollIntoView({ behavior: 'smooth' }); }}>Edit answers</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Collection({ b }) {
  const items = COLLECTIONS[b.name].filter((i) => i.slug !== b.exclude);
  return (
    <section className="section pg-sec" id={b.id}>
      <div className="container">
        {b.title && <Head b={{ title: b.title }} />}
        <div className={`pg-cards cols-${Math.min(items.length, b.exclude ? 3 : 2)}`}>
          {items.map((it, i) => {
            const Icon = ICONS[it.icon];
            return (
              <a key={it.slug} href={`${b.base}/${it.slug}`} className="pg-card pg-cms link has-corner-visual" data-reveal style={{ '--i': i }}>
                <CardVisual kind={it.slug} corner />
                {Icon && <span className="pg-ico"><Icon /></span>}
                <span className="pg-cat">{it.name}</span>
                <h3>{it.headline}</h3>
                <p>{it.summary}</p>
                <span className="pg-card-arrow"><ArrowUpRight /></span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Widget({ b }) {
  return (
    <section className="section pg-sec pg-widget-sec">
      <div className="container" data-reveal>
        <div className="pg-widget wide"><WorkflowJourney accent="#3f8cff" autoAdvance intervalSeconds={6} /></div>
      </div>
    </section>
  );
}

// A full-width band of art between sections.
function Band({ b }) {
  return <section className="pg-band" aria-hidden="true"><Deco><Art art={b.art} className="pg-band-art" /></Deco></section>;
}

const BLOCKS = { band: Band, hero: Hero, cards: Cards, list: List, statement: Statement, text: Text, steps: Steps, faq: Faq, products: Products, production: Production, form: Form, collection: Collection, widget: Widget };

export default function Block({ b }) {
  const Comp = BLOCKS[b.type];
  return Comp ? <Comp b={b} /> : null;
}
