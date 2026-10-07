import { ArrowRight, SquaresFour, TreeStructure, Pulse, UsersThree, FileText } from '@phosphor-icons/react';
import { HERO, CONSOLE, PRIMARY_CTA } from '../content';
import HeroAurora from './HeroAurora';
import LogoStrip from './LogoStrip';

const SIDE = [
  { icon: SquaresFour, label: 'Overview', on: true },
  { icon: TreeStructure, label: 'Designed' },
  { icon: Pulse, label: 'Observed' },
  { icon: UsersThree, label: 'Lived' },
  { icon: FileText, label: 'Blueprint' },
];

const LEGEND = [
  { kind: 'work', label: 'Active work' },
  { kind: 'wait', label: 'Waiting' },
  { kind: 'rework', label: 'Rework' },
];

function Console() {
  return (
    <div className="console" role="img" aria-label={`Illustrative Operating Domain view for ${CONSOLE.domain}: 19 minutes of active work against 9 days elapsed.`}>
      <aside className="console-side" aria-hidden="true">
        <img src="/svg/intellient.svg" alt="" />
        {SIDE.map(({ icon: Icon, label, on }) => (
          <span key={label} className={on ? 'on' : ''}><Icon />{label}</span>
        ))}
      </aside>
      <div className="console-main" aria-hidden="true">
        <div className="console-top">
          <div>
            <small>Operating Domain</small>
            <h3>{CONSOLE.domain}</h3>
          </div>
          <span className="note">Illustrative benchmark</span>
        </div>
        <div className="kpis">
          {CONSOLE.kpis.map((k) => (
            <div key={k.label} className={`kpi${k.warn ? ' warn' : ''}`}>
              <small>{k.label}</small>
              <strong>{k.value}</strong>
              <span>{k.note}</span>
            </div>
          ))}
        </div>
        <div className="console-panels">
          <div className="cpanel">
            <h4><span>Case journey</span><span className="note">one case, end to end</span></h4>
            <div className="journey">
              {CONSOLE.journey.map((j, k) => (
                <i key={j.label} className={j.kind} style={{ flex: j.w, '--k': k }} title={j.label} />
              ))}
            </div>
            <div className="legend">
              {LEGEND.map((l) => (
                <span key={l.kind}><i style={legendSwatch(l.kind)} />{l.label}</span>
              ))}
            </div>
          </div>
          <div className="cpanel">
            <h4><span>Event telemetry</span></h4>
            <ul className="events">
              {CONSOLE.events.map((e) => (
                <li key={e.time}><time>{e.time}</time><span>{e.label}</span><em>{e.delta}</em></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const legendSwatch = (kind) => ({
  background: kind === 'work' ? '#fff' : kind === 'wait' ? 'rgba(63,140,255,.55)' : 'rgba(143,203,255,.85)',
});

export default function Hero() {
  return (
    <section className="hero" id="intro">
      <HeroAurora />
      <div className="container hero-inner">
        <p className="hero-pill rise" style={{ '--d': 100 }}>{HERO.eyebrow}</p>
        <h1 className="h-display hero-title rise" style={{ '--d': 220 }}>
          {HERO.title}<br />{HERO.accent}
        </h1>
        <p className="hero-body rise" style={{ '--d': 380 }}>{HERO.body}</p>
        <div className="btn-row rise" style={{ '--d': 520 }}>
          <a href={PRIMARY_CTA.href} className="btn btn-primary">{PRIMARY_CTA.label}<ArrowRight weight="bold" /></a>
        </div>
      </div>
      <div className="container console-stage rise" style={{ '--d': 700 }}>
        <Console />
      </div>
      <div className="container"><LogoStrip /></div>
    </section>
  );
}
