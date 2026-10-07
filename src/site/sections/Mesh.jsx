import { WindowsLogo, GithubLogo, Triangle, ArrowsClockwise, Briefcase, Cloud, Database } from '@phosphor-icons/react';

// Systems stream into Intellient Core from both sides. Positions are % of the stage.
const TILES = [
  { icon: WindowsLogo, label: 'Microsoft Azure', x: 25, y: 40, s: 72, r: -8 },
  { icon: Triangle, label: 'Modern web', x: 35.5, y: 56, s: 62, r: 3 },
  { icon: GithubLogo, label: 'GitHub CI/CD', x: 26.5, y: 74, s: 72, r: 6 },
  { icon: ArrowsClockwise, label: 'Event stream', x: 56, y: 57, s: 44, r: -4 },
  { icon: Briefcase, label: 'Workday HCM', x: 65, y: 54, s: 66, r: 4 },
  { icon: Cloud, label: 'Salesforce', x: 75, y: 42, s: 72, r: 8 },
  { icon: Database, label: 'SAP S/4HANA', x: 73.5, y: 74, s: 74, r: -5 },
];

// Light particles riding the streams toward the core: [side, y %, delay s, duration s].
const PARTICLES = [
  ['l', 38, 0, 3.2], ['l', 50, 1.1, 2.8], ['l', 63, 2.0, 3.4], ['l', 45, 2.7, 3.0],
  ['r', 40, 0.5, 3.1], ['r', 52, 1.6, 2.9], ['r', 66, 2.3, 3.3], ['r', 47, 0.9, 3.6],
];

export default function Mesh() {
  return (
    <section className="section" id="ecosystem">
      <div className="container">
        <div className="section-head mesh-head" data-reveal>
          <h2 className="h-section wide">Your whole ecosystem, <span className="accent">one operating workspace.</span></h2>
          <p className="lead">Intellient syncs with Microsoft Azure, SAP, Workday, Salesforce and developer workflows under governed runtime controls.</p>
        </div>
      </div>
      <div className="mesh-stage" data-reveal aria-label="Systems connected to Intellient Core">
        <span className="mesh-sweep" aria-hidden="true" />
        {PARTICLES.map(([side, y, d, t], i) => (
          <span key={i} className={`mesh-particle ${side}`} style={{ top: `${y}%`, animationDelay: `${d}s`, animationDuration: `${t}s` }} aria-hidden="true" />
        ))}
        {TILES.map(({ icon: Icon, label, x, y, s, r }, i) => (
          <div
            key={label}
            className="mesh-tile"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, '--r': `${r}deg`, '--k': i }}
            tabIndex={0}
            aria-label={label}
          >
            <Icon weight="fill" />
            <span className="mesh-tip">{label}</span>
          </div>
        ))}
        <div className="mesh-core">
          <div className="mesh-core-tile"><img src="/svg/intellient-core.svg" alt="" /></div>
          <div className="mesh-core-label"><strong>Intellient Core</strong><span>Autonomous orchestration</span></div>
        </div>
      </div>
    </section>
  );
}
