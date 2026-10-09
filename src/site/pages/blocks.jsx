import { useState } from 'react';
import {
  ArrowRight, ArrowUpRight, ArrowLeft, CheckCircle, Clock, Warning, ArrowsLeftRight, Target, Eye, RocketLaunch,
  Stack, ChartBar, UsersThree, Hand, Hourglass, ArrowsClockwise, Gavel, Trash, Ruler, Sparkle, ArrowFatLinesUp,
  Compass, PencilRuler, Path, Code, ShieldCheck, Pulse, Fingerprint, Coins, FileText, Factory, Bank, Heartbeat,
  Briefcase, Gauge, TrendUp, EnvelopeSimple, Phone, MapPin, Info, Plus, MagnifyingGlass, Wrench, Cube, Gear,
} from '@phosphor-icons/react';
import WhyIntellientAtmosphere from '../art/WhyIntellientAtmosphere';
import IntellientMockupArt from '../art/IntellientMockupArt';
import IntellientTechnicalAtmosphere from '../art/IntellientTechnicalAtmosphere';
import WorkflowJourney from '../art/WorkflowJourney';
import OperatingExplorer from '../art/OperatingExplorer';
import HeroScene from '../art/HeroScenes';
import CardVisual from '../art/CardVisuals';
import { COLLECTIONS } from './pages';

const ICONS = {
  clock: Clock, warning: Warning, arrows: ArrowsLeftRight, target: Target, eye: Eye, rocket: RocketLaunch,
  stack: Stack, chart: ChartBar, users: UsersThree, hand: Hand, hourglass: Hourglass, repeat: ArrowsClockwise,
  gavel: Gavel, trash: Trash, ruler: Ruler, sparkle: Sparkle, escalate: ArrowFatLinesUp, compass: Compass,
  blueprint: PencilRuler, path: Path, code: Code, shield: ShieldCheck, pulse: Pulse, fingerprint: Fingerprint,
  check: CheckCircle, coins: Coins, file: FileText, factory: Factory, bank: Bank, heart: Heartbeat,
  briefcase: Briefcase, gauge: Gauge, trend: TrendUp, search: MagnifyingGlass, tools: Wrench, cube: Cube, gear: Gear,
};
const pad = (i) => String(i + 1).padStart(2, '0');
// A title with its last words optionally set in the accent blue.
const Title = ({ b }) => (b.accent ? <>{b.title} <span className="accent">{b.accent}</span></> : b.title);

/* ---------- Shared pieces ---------- */

export function Art({ art, className = '' }) {
  if (!art) return null;
  if (art.kind === 'scene') return <div className={`pg-art pg-scene ${className}`} aria-hidden="true"><HeroScene scene={art.scene} /></div>;
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
    <section className={`pg-hero${aside ? ' split' : ''}${b.backdrop ? ' has-backdrop' : ''}`}>
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
    <section className="section pg-sec" id={b.id}>
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
              <Tag key={it.title} href={it.href} className={`pg-card${it.href ? ' link' : ''}${it.visual ? (b.visualAt === 'bottom' ? ' has-foot-visual' : ' has-visual') : ''}`} data-reveal style={{ '--i': i % 4 }}>
                {it.visual && b.visualAt !== 'bottom' && <CardVisual kind={it.visual} />}
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

function List({ b }) {
  return (
    <section className="section pg-sec" id={b.id}>
      <div className="container pg-two">
        <div>
          <Head b={b} />
          <MoreLink link={b.link} />
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
    <section className={`pg-statement${b.bg ? ' has-bg' : ''}${b.planet ? ' has-planet' : ''}`}>
      {b.planet && <><span className="pg-statement-planet" aria-hidden="true" /><span className="pg-statement-dots" aria-hidden="true" /></>}
      {b.bg && <img src={b.bg} alt="" className="pg-statement-bg" />}
      {b.art && <Art art={b.art} className="pg-statement-art" />}
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
  if (b.art) {
    return (
      <section className="section pg-sec" id={b.id}>
        <div className="container pg-intro with-art">
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
      <div className="container pg-two">
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
            <a key={p.title} href={p.href} className="pg-card pg-product link" data-reveal style={{ '--i': i }}>
              <img src={p.logo} alt="" />
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
            <div key={p.title} className="pg-card pg-prod" data-reveal style={{ '--i': i }}>
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
function Form({ b }) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [];
    for (const f of b.fields) {
      if (f.heading) { lines.push('', `— ${f.heading}`); continue; }
      const v = f.type === 'checkboxes' ? data.getAll(f.name).join(', ') : data.get(f.name);
      if (v) lines.push(`${f.label}: ${v}`);
    }
    window.location.href = `mailto:contact@intellient.ai?subject=${encodeURIComponent(b.subject || 'Intellient enquiry')}&body=${encodeURIComponent(lines.join('\n'))}`;
    setSent(true);
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
        <form className="pg-form" onSubmit={onSubmit} data-reveal>
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
            {sent && <p className="pg-form-note" role="status">Your email app should open with these details addressed to contact@intellient.ai.</p>}
          </div>
        </form>
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
              <a key={it.slug} href={`${b.base}/${it.slug}`} className="pg-card pg-cms link" data-reveal style={{ '--i': i }}>
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

const BLOCKS = { hero: Hero, cards: Cards, list: List, statement: Statement, text: Text, steps: Steps, faq: Faq, products: Products, production: Production, form: Form, collection: Collection, widget: Widget };

export default function Block({ b }) {
  const Comp = BLOCKS[b.type];
  return Comp ? <Comp b={b} /> : null;
}
