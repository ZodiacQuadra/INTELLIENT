import { ResidencyOrbit, AuditLens, SphereView, ModelFrames, ArchitectureFit, SphereEstate, BlueprintPlan, OwnerFrame, SectorHub, EvidenceGate } from './HeroIdeas';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  FileText, CheckCircle, Warning, Trash, Ruler, Sparkle, ArrowFatLinesUp, Fingerprint, ShieldCheck, Eye, Coins,
  Gavel, User, TreeStructure, Database, UsersThree, Compass, PencilRuler, LockKey, Stack, ChartBar, ListChecks,
  Robot, Wrench, Factory, Bank, Heartbeat, Briefcase, Gauge, TrendUp, Target, UserCheck, Gear, CaretRight, Check, Flag, Cloud, SquaresFour, Code, Pulse,
} from '@phosphor-icons/react';

/*
  Hero visuals for the inner pages, one per page, drawn from that page's own content.
  Every scene is laid out on a fixed 560 x 480 stage and scaled to fit its box, so the glass chips,
  connector lines and particles keep the same proportions as the home page at any width.
*/
const W = 560;
const H = 480;
export const still = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Shared pieces ---------- */

export function Flow({ d, lit, dashed, dots = 0, dur = 3, delay = 0 }) {
  const motion = dots > 0 && !still();
  return (
    <g>
      <path d={d} className={`hs-line${lit ? ' lit' : ''}${dashed ? ' dash' : ''}`} />
      {motion && Array.from({ length: dots }, (_, i) => (
        <circle key={i} r="3" className="hs-dot">
          <animateMotion dur={`${dur}s`} begin={`-${delay + (dur / dots) * i}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
    </g>
  );
}

function Node({ x, y, icon: Icon, img, label, sub, hot }) {
  return (
    <div className={`dm-node hs-node${hot ? ' hot' : ''}`} style={{ left: x, top: y }}>
      {img ? <img src={img} alt="" className="hs-node-img" /> : Icon && <span className="dm-node-ico"><Icon /></span>}
      <span className="dm-node-label">{label}</span>
      {sub && <span className="hs-sub">{sub}</span>}
    </div>
  );
}

// The Intellient mark, as used in the home page orb.
function Mark({ className }) {
  return (
    <svg className={className} viewBox="0 0 216 216" fill="none" aria-hidden="true">
      <path fill="#fff" d="M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818" />
      <path fill="#fff" d="M149.331 49.43c3.878-5.725 11.784-7.192 16.743-2.374a83.9 83.9 0 0 1 16.658 22.862c6.146 12.379 9.2 26.125 8.889 40.01s-3.978 27.473-10.672 39.549a83.6 83.6 0 0 1-17.652 22.045c-5.177 4.588-13.01 2.758-16.626-3.138-3.507-5.719-1.682-13.113 3.088-17.831a59 59 0 0 0 10.101-13.342 60.26 60.26 0 0 0 7.516-27.853 60.35 60.35 0 0 0-6.261-28.178 59.2 59.2 0 0 0-9.517-13.83c-4.543-4.92-6.025-12.376-2.267-17.92" />
      <path fill="#fff" d="M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z" />
      <rect width="20.488" height="57.366" x="97.293" y="122.341" fill="#fff" rx="10.244" />
    </svg>
  );
}

// The site's liquid-glass orb at scene scale.
function Orb({ x, y, size, label }) {
  return (
    <div className="dm-orb hs-orb" style={{ left: x, top: y, width: size }}>
      <div className="dm-orb-glow" />
      <div className="orb-glass dm-orb-glass">
        <span className="orb-swirl" />
        <span className="orb-swirl two" />
        <div className="dm-orb-body">
          <Mark className="dm-orb-icon" />
          {label && <span className="hs-orb-label">{label}</span>}
        </div>
      </div>
    </div>
  );
}

const Svg = ({ children, w = W, h = H }) => <svg className="hs-svg" viewBox={`0 0 ${w} ${h}`}>{children}</svg>;

/* ---------- Approach ---------- */

// Exception Architecture: the happy path runs straight; the exception drops off it into four treatments.
function Exceptions() {
  const fan = [[80, 'Eliminate', Trash], [213, 'Standardise', Ruler], [347, 'Assist', Sparkle], [480, 'Escalate', ArrowFatLinesUp]];
  return (
    <>
      <Svg>
        <text x="280" y="98" className="hs-cap" textAnchor="middle">The happy path</text>
        <Flow d="M60 130 H500" lit dots={3} dur={2.6} />
        <Flow d="M190 130 C190 190 280 180 280 234" dots={1} dur={3} />
        {fan.map(([x], i) => <Flow key={x} d={`M280 266 C280 322 ${x} 312 ${x} 366`} dashed dots={1} dur={3.4} delay={i * 0.85} />)}
        <text x="280" y="446" className="hs-cap dim" textAnchor="middle">Four possible treatments</text>
      </Svg>
      <Node x={60} y={130} icon={FileText} label="Case" />
      <Node x={500} y={130} icon={CheckCircle} label="Resolved" hot />
      <Node x={280} y={250} icon={Warning} label="Exception" hot />
      {fan.map(([x, l, I]) => <Node key={l} x={x} y={384} icon={I} label={l} />)}
    </>
  );
}

// Operating Domains: a task is too narrow, the enterprise too broad; the domain sits between.
function Scope() {
  const parts = [[170, 166, 'Workflows', TreeStructure], [390, 166, 'Systems', Database], [170, 318, 'Decisions', FileText], [390, 318, 'Owners', UsersThree]];
  return (
    <>
      <Svg>
        <rect x="20" y="28" width="520" height="424" rx="28" className="hs-zone faint" />
        <text x="44" y="58" className="hs-cap dim">Enterprise · too broad</text>
        <rect x="78" y="92" width="404" height="300" rx="22" className="hs-zone lit" />
        <text x="100" y="374" className="hs-cap">Operating Domain</text>
        <rect x="98" y="140" width="144" height="52" rx="14" className="hs-zone task" />
        <text x="100" y="128" className="hs-cap dim">Task · too narrow</text>
        {parts.map(([x, y], i) => <Flow key={i} d={`M${x} ${y} L280 242`} dots={1} dur={2.6} delay={i * 0.6} />)}
      </Svg>
      {parts.map(([x, y, l, I]) => <Node key={l} x={x} y={y} icon={I} label={l} />)}
      <Orb x={280} y={242} size={92} label="Outcome" />
    </>
  );
}

// Where value hides: six clocks on one timeline; the active effort is a sliver of the elapsed time.
function Clocks() {
  const x0 = 180;
  const span = 340;
  const rows = [
    ['Touch time', [[0, 0.018], [0.43, 0.015], [0.81, 0.015]], 'hot'],
    ['Wait time', [[0.03, 0.21], [0.46, 0.24]], ''],
    ['Coordination load', [[0.24, 0.1], [0.71, 0.09]], ''],
    ['Rework', [[0.33, 0.09]], ''],
    ['Decision latency', [[0.84, 0.15]], ''],
  ];
  return (
    <Svg>
      <text x="40" y="66" className="hs-cap">Six clocks inside one outcome</text>
      {rows.map(([label, segs, tone], r) => {
        const y = 118 + r * 50;
        return (
          <g key={label}>
            <text x="40" y={y + 5} className="hs-label">{label}</text>
            <line x1={x0} x2={x0 + span} y1={y} y2={y} className="hs-track" />
            {segs.map(([s, l], i) => (
              <rect key={i} x={x0 + s * span} y={y - 7} width={Math.max(l * span, 6)} height="14" rx="7"
                className={`hs-bar ${tone}`} style={{ '--i': r }} />
            ))}
          </g>
        );
      })}
      <text x={x0 + 0.018 * span + 10} y="104" className="hs-tag">20 min</text>
      <line x1="40" x2="520" y1="364" y2="364" className="hs-track" />
      <text x="40" y="409" className="hs-label strong">Elapsed time</text>
      <rect x={x0} y="397" width={span} height="16" rx="8" className="hs-bar total" />
      <text x={x0 + span} y="384" className="hs-tag" textAnchor="end">10 days</text>
      {!still() && (
        <g className="hs-scan">
          <line x1={x0} x2={x0} y1="96" y2="420" />
        </g>
      )}
    </Svg>
  );
}

// Three Enterprises: the designed, observed and lived versions of the same process, layered.
function Planes() {
  const planes = [
    { k: 'Designed', icon: Stack, x: 30, y: 36, draw: 'flow' },
    { k: 'Observed', icon: ChartBar, x: 140, y: 164, draw: 'queue' },
    { k: 'Lived', icon: UsersThree, x: 250, y: 292, draw: 'people' },
  ];
  return (
    <>
      <Svg>
        <path d="M165 120 C210 150 230 170 275 250 S340 330 385 376" className="hs-line dash" />
      </Svg>
      {planes.map((p, i) => {
        const Icon = p.icon;
        return (
          <div key={p.k} className="hs-plane" style={{ left: p.x, top: p.y, '--i': i }}>
            <span className="hs-plane-head"><Icon />The {p.k} Enterprise</span>
            <svg viewBox="0 0 240 80" className="hs-plane-art">
              {p.draw === 'flow' && (
                <>
                  <path d="M42 40 H198" className="hs-line lit" />
                  {[12, 72, 132, 192].map((x) => <rect key={x} x={x - 2} y="28" width="40" height="24" rx="7" className="hs-box" />)}
                </>
              )}
              {p.draw === 'queue' && [[16, 18, 120, 'on'], [16, 38, 46, ''], [70, 38, 88, 'on'], [16, 58, 30, ''], [54, 58, 150, 'on']].map(([x, y, w, on], i) => (
                <rect key={i} x={x} y={y - 5} width={w} height="10" rx="5" className={`hs-qbar ${on}`} />
              ))}
              {p.draw === 'people' && (
                <>
                  <path d="M40 40 C70 6 100 74 120 40 S170 6 200 40" className="hs-line dash" />
                  <path d="M120 40 C140 70 90 76 80 58" className="hs-line dash" />
                  {[40, 120, 200].map((x) => <g key={x}><circle cx={x} cy="40" r="15" className="hs-box" /><circle cx={x} cy="35" r="4.5" className="hs-ink" /><path d={`M${x - 8} 49 a8 7 0 0 1 16 0`} className="hs-ink" /></g>)}
                </>
              )}
            </svg>
          </div>
        );
      })}
    </>
  );
}

/* ---------- Engagement ---------- */

// AIR Residency: one continuous thread of context; the team around it changes, accountability does not.
function Residency() {
  const phases = [['Redesign', 2], ['Engineer', 3], ['Govern', 2], ['Embed', 3], ['Operate', 2], ['Compound', 1]];
  const xs = phases.map((_, i) => 70 + i * 84);
  return (
    <>
      <Svg>
        <text x="30" y="70" className="hs-cap">The team changes</text>
        {xs.map((x) => <path key={x} d={`M${x} 166 V206`} className="hs-line dash" />)}
        <Flow d="M30 222 H530" lit dots={3} dur={4.2} />
        {xs.map((x, i) => (
          <g key={x}>
            <circle cx={x} cy="222" r="6" className="hs-joint" style={{ '--i': i }} />
            <text x={x} y="256" className="hs-cap small" textAnchor="middle">{phases[i][0]}</text>
          </g>
        ))}
        <text x="30" y="330" className="hs-cap">Accountability does not</text>
        <Flow d="M30 392 H530" dots={1} dur={6} />
      </Svg>
      {xs.map((x, i) => (
        <div key={x} className="hs-team" style={{ left: x, top: 146, '--i': i }}>
          {Array.from({ length: phases[i][1] }, (_, j) => <span key={j}><User /></span>)}
        </div>
      ))}
      <Node x={280} y={392} icon={Target} label="Operating outcome" hot />
    </>
  );
}

// Industry Principals: two perspectives overlap into one design.
function Council() {
  return (
    <>
      <Svg>
        <defs>
          <clipPath id="hs-left"><circle cx="205" cy="230" r="150" /></clipPath>
          <radialGradient id="hs-lens" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3f8cff" stopOpacity="0.04" />
          </radialGradient>
        </defs>
        <circle cx="355" cy="230" r="150" fill="url(#hs-lens)" clipPath="url(#hs-left)" />
        <circle cx="205" cy="230" r="150" className="hs-ring" />
        <circle cx="355" cy="230" r="150" className="hs-ring" />
        <Flow d="M128 210 C150 120 240 130 262 192" dots={1} dur={2.8} />
        <Flow d="M432 210 C410 120 320 130 298 192" dots={1} dur={2.8} delay={1.4} />
        <Flow d="M196 248 C206 300 250 302 266 266" dots={1} dur={2.8} delay={0.7} />
        <Flow d="M364 248 C354 300 310 302 294 266" dots={1} dur={2.8} delay={2.1} />
        <text x="128" y="276" className="hs-cap small" textAnchor="middle">Pattern recognition</text>
        <text x="432" y="276" className="hs-cap small" textAnchor="middle">Production system</text>
        <text x="280" y="436" className="hs-cap dim" textAnchor="middle">Two perspectives · one design</text>
      </Svg>
      <Node x={128} y={230} icon={Compass} label="Industry Principal" />
      <Node x={432} y={230} icon={PencilRuler} label="Intellient Architect" />
      <Orb x={280} y={230} size={84} />
    </>
  );
}

/* ---------- Technology ---------- */

// Technology: three layers stacked over the enterprise systems, with work rising through them.
function Layers() {
  const cx = 170;
  const hw = 130;
  const plates = [
    [350, 'IntelliLink', 'Connect', '/svg/intellilink.svg'],
    [230, 'Intellient Core', 'Orchestrate', '/svg/intellient-core.svg'],
    [110, 'IntelliSphere', 'Govern', '/svg/intellisphere.svg'],
  ];
  return (
    <>
      <Svg>
        {plates.map(([cy], i) => (
          <g key={cy} className="hs-plate" style={{ '--i': i }}>
            <polygon points={`${cx - hw},${cy} ${cx},${cy + 52} ${cx},${cy + 64} ${cx - hw},${cy + 12}`} className="side" />
            <polygon points={`${cx},${cy + 52} ${cx + hw},${cy} ${cx + hw},${cy + 12} ${cx},${cy + 64}`} className="side dark" />
            <polygon points={`${cx - hw},${cy} ${cx},${cy - 52} ${cx + hw},${cy} ${cx},${cy + 52}`} className="top" />
          </g>
        ))}
        <Flow d={`M${cx} 440 V40`} lit dots={3} dur={3.2} />
        <text x={cx} y="462" className="hs-cap dim" textAnchor="middle">Enterprise systems</text>
      </Svg>
      {plates.map(([cy, l, sub, img]) => <Node key={l} x={425} y={cy} img={img} label={l} sub={sub} />)}
    </>
  );
}

// IntelliLink: context, permissions and workflows meet so understanding can become authorised action.
function Link() {
  const ins = [[130, 'Context', Database], [240, 'Permissions', LockKey], [350, 'Workflows', TreeStructure]];
  return (
    <>
      <Svg>
        <Flow d="M150 130 C200 130 190 220 217 230" dots={1} dur={2.4} />
        <Flow d="M165 240 H217" dots={1} dur={1.6} delay={0.5} />
        <Flow d="M150 350 C200 350 190 260 217 250" dots={1} dur={2.4} delay={1.1} />
        <Flow d="M313 240 H372" lit dots={2} dur={1.8} />
        <Flow d="M455 222 V150" dashed />
        <Flow d="M455 258 V330" dashed />
      </Svg>
      {ins.map(([y, l, I]) => <Node key={l} x={95} y={y} icon={I} label={l} />)}
      <div className="hs-hub" style={{ left: 265, top: 240 }}><img src="/svg/intellilink.svg" alt="" /></div>
      <Node x={455} y={130} icon={Eye} label="Audit-ready" />
      <Node x={455} y={240} icon={CheckCircle} label="Authorised action" hot />
      <Node x={455} y={350} icon={UserCheck} label="Approvals" />
    </>
  );
}

// Intellient Core: a plan fans out to models, agents and tools, escalates to a person and closes with evidence.
function Core() {
  return (
    <>
      <Svg>
        <rect x="24" y="22" width="512" height="436" rx="26" className="hs-zone faint" />
        <text x="48" y="52" className="hs-cap dim">Workflow state</text>
        <Flow d="M280 98 C280 150 120 140 120 172" dots={1} dur={2.2} />
        <Flow d="M280 98 V172" dots={1} dur={2.2} delay={0.7} />
        <Flow d="M280 98 C280 150 440 140 440 172" dots={1} dur={2.2} delay={1.4} />
        <Flow d="M280 208 V282" lit dots={1} dur={1.8} />
        <Flow d="M280 318 V392" lit dots={1} dur={1.8} delay={0.9} />
        <Flow d="M120 208 C120 350 170 410 190 410" dots={1} dur={3.2} />
        <Flow d="M440 208 C440 350 390 410 370 410" dots={1} dur={3.2} delay={1.6} />
        <path d="M500 183 a13 13 0 1 1 0 14" className="hs-line lit" />
        <path d="M500 197 l-6 -2 l4 6 z" className="hs-arrow" />
        <text x="512" y="226" className="hs-cap small" textAnchor="middle">Retry</text>
      </Svg>
      <Node x={280} y={80} icon={ListChecks} label="Plan" />
      <Node x={120} y={190} icon={Sparkle} label="Model" />
      <Node x={280} y={190} icon={Robot} label="Agent" />
      <Node x={440} y={190} icon={Wrench} label="Tool" />
      <Node x={280} y={300} icon={User} label="Human decision" />
      <Node x={280} y={410} icon={CheckCircle} label="Completion evidence" hot />
    </>
  );
}

// IntelliSphere: an operating view of the AI estate.
function Console() {
  const rows = [
    [Fingerprint, 'Agent identity and access', 'Verified'],
    [ShieldCheck, 'Policy and data boundaries', 'Applied'],
    [CheckCircle, 'Evaluation', 'Passing'],
    [Eye, 'Observability', 'Live'],
    [Coins, 'Cost governance', 'Within limits'],
    [FileText, 'Evidence and audit', 'Retained'],
  ];
  return (
    <>
      <Svg>
        <circle cx="280" cy="240" r="232" className="hs-ring spin" />
        <circle cx="280" cy="240" r="196" className="hs-ring" />
      </Svg>
      <div className="hs-console" style={{ left: 60, top: 62 }}>
        <div className="hs-console-head">
          <img src="/svg/intellisphere.svg" alt="" />
          <b>AI estate</b>
          <span className="hs-live"><i />Live</span>
        </div>
        <ul>
          {rows.map(([I, l, s], i) => (
            <li key={l} style={{ '--i': i }}>
              <span className="dm-node-ico"><I /></span>
              <span>{l}</span>
              <em>{s}</em>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ---------- Company ---------- */

// About: the gap between AI promise and enterprise reality, with Intellient bridging it.
function Gap() {
  const promise = 'M40 400 C200 390 320 200 520 70';
  const reality = 'M40 405 C220 400 360 370 520 345';
  return (
    <>
      <Svg>
        <defs>
          <linearGradient id="hs-gap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3f8cff" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        {[100, 160, 220, 280, 340, 400].map((y) => <line key={y} x1="40" x2="520" y1={y} y2={y} className="hs-grid" />)}
        <path d="M40 400 C200 390 320 200 520 70 L520 345 C360 370 220 400 40 405 Z" fill="url(#hs-gap)" />
        <path d={promise} className="hs-line dash bright" />
        <path d={reality} className="hs-line lit" />
        <Flow d="M440 352 V136" lit dots={2} dur={2.4} />
      </Svg>
      <Node x={240} y={150} icon={Sparkle} label="AI promise" />
      <Node x={300} y={430} icon={Gauge} label="Enterprise reality" />
      <Orb x={440} y={244} size={96} label="Intellient" />
    </>
  );
}

/* ---------- Collections ---------- */

// Industries: four sectors meeting one operating question.
function Sectors() {
  const sectors = [[140, 100, 'Manufacturing', Factory], [430, 100, 'BFSI', Bank], [150, 380, 'Healthcare and Life Sciences', Heartbeat], [420, 380, 'Enterprise Services', Briefcase]];
  return (
    <>
      <Svg>
        <circle cx="280" cy="240" r="150" className="hs-ring spin" />
        <circle cx="280" cy="240" r="96" className="hs-ring" />
        {sectors.map(([x, y], i) => <Flow key={i} d={`M${x} ${y} C${x} 240 ${x < 280 ? 200 : 360} 240 280 240`} dots={1} dur={2.8} delay={i * 0.7} />)}
      </Svg>
      {sectors.map(([x, y, l, I]) => <Node key={l} x={x} y={y} icon={I} label={l} />)}
      <Orb x={280} y={240} size={112} label="One domain" />
    </>
  );
}

// Outcomes: four places where movement is measured.
function Outcomes() {
  const tiles = [
    { x: 30, y: 46, label: 'Operating Performance', icon: Gauge, draw: 'down' },
    { x: 290, y: 46, label: 'Revenue Movement', icon: TrendUp, draw: 'up' },
    { x: 30, y: 252, label: 'Employee Capacity', icon: UsersThree, draw: 'bars' },
    { x: 290, y: 252, label: 'Risk and Control', icon: ShieldCheck, draw: 'checks' },
  ];
  return tiles.map((t, i) => {
    const Icon = t.icon;
    return (
      <div key={t.label} className="hs-tile" style={{ left: t.x, top: t.y, '--i': i }}>
        <span className="hs-tile-head"><span className="dm-node-ico"><Icon /></span>{t.label}</span>
        <svg viewBox="0 0 200 96" className="hs-tile-art">
          {[24, 48, 72].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} className="hs-grid" />)}
          {t.draw === 'down' && <><path d="M0 18 C40 22 60 40 90 52 S150 78 200 82" className="hs-draw" pathLength="1" /><circle cx="200" cy="82" r="4" className="hs-end" /></>}
          {t.draw === 'up' && <><path d="M0 84 C40 80 70 64 100 52 S160 22 200 12" className="hs-draw" pathLength="1" /><circle cx="200" cy="12" r="4" className="hs-end" /></>}
          {t.draw === 'bars' && [28, 40, 52, 66, 82].map((h, j) => <rect key={j} x={12 + j * 38} y={92 - h} width="22" height={h} rx="4" className={`hs-col${j === 4 ? ' on' : ''}`} style={{ '--j': j }} />)}
          {t.draw === 'checks' && [20, 48, 76].map((y, j) => (
            <g key={y} style={{ '--j': j }} className="hs-check">
              <circle cx="12" cy={y} r="8" />
              <path d={`M8 ${y} l3 3 l5 -6`} />
              <line x1="30" x2={150 + j * 14} y1={y} y2={y} />
            </g>
          ))}
        </svg>
      </div>
    );
  });
}

/* ---------- Responsible AI ---------- */

// Responsible AI: the model's request passes the enterprise's gates before it becomes an action.
function Gates() {
  const gates = [[160, 'Access', Fingerprint], [280, 'Policy', ShieldCheck], [400, 'Authority', Gavel]];
  return (
    <>
      <Svg>
        {gates.map(([x], i) => (
          <polygon key={x} points={`${x - 18},128 ${x + 18},148 ${x + 18},352 ${x - 18},332`} className="hs-gate" style={{ '--i': i }} />
        ))}
        <Flow d="M60 240 H490" lit dots={3} dur={3} />
        {gates.map(([x]) => <circle key={x} cx={x} cy="240" r="5" className="hs-joint" />)}
        <Flow d="M400 352 V392" dashed />
      </Svg>
      {gates.map(([x, l, I]) => <Node key={l} x={x} y={100} icon={I} label={l} />)}
      <Node x={60} y={240} icon={Sparkle} label="Model" />
      <Node x={490} y={240} icon={CheckCircle} label="Authorised" hot />
      <Node x={400} y={410} icon={User} label="Accountable person" />
    </>
  );
}

/* ---------- Architecture ---------- */

// Architecture: five glass layers of one operating design, each lifting in turn as work rises through them.
/* ---------- Why Intellient ---------- */

/*
  Glass cubes on a lit floor grid, with ribbons of light running between them. Everything is laid
  out in floor units (u runs to the lower right, v to the lower left, h is height) and projected
  isometrically, so the cubes sit exactly on the grid and the ribbons follow the floor.
*/
const ISO = { x0: 280, y0: 60, g: 36 };
const P = (u, v, h = 0) => [ISO.x0 + (u - v) * 0.866 * ISO.g, ISO.y0 + (u + v) * 0.5 * ISO.g - h * ISO.g];
const pts = (list) => list.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
export const line = (list) => `M${list.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L')}`;

// A four-point sparkle centred on (x, y).
const star = (x, y, r) => `M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z`;

// The glass the cubes are made of: lighter blue on top, deep blue sides, a soft sheen on the right.
const CubeGradients = () => (
  <>
    <linearGradient id="cb-top" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#7cbcff" stopOpacity="0.55" />
      <stop offset="45%" stopColor="#2f6fe8" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#0d3a9a" stopOpacity="0.75" />
    </linearGradient>
    <linearGradient id="cb-left" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stopColor="#0f3282" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#050f2c" stopOpacity="0.96" />
    </linearGradient>
    <linearGradient id="cb-right" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#1f5fff" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#081a4a" stopOpacity="0.95" />
    </linearGradient>
    <linearGradient id="cb-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#cfeaff" stopOpacity="0" />
      <stop offset="50%" stopColor="#cfeaff" stopOpacity="0.22" />
      <stop offset="100%" stopColor="#cfeaff" stopOpacity="0" />
    </linearGradient>
  </>
);

function GlassCube({ u, v, s, h = 0, i }) {
  const top = [P(u, v, h + s), P(u + s, v, h + s), P(u + s, v + s, h + s), P(u, v + s, h + s)];
  const left = [P(u, v + s, h + s), P(u + s, v + s, h + s), P(u + s, v + s, h), P(u, v + s, h)];
  const right = [P(u + s, v, h + s), P(u + s, v + s, h + s), P(u + s, v + s, h), P(u + s, v, h)];
  const base = [P(u - 0.25, v - 0.25), P(u + s + 0.25, v - 0.25), P(u + s + 0.25, v + s + 0.25), P(u - 0.25, v + s + 0.25)];
  const [cx, cy] = P(u + s / 2, v + s / 2, h + s);
  const front = P(u + s, v + s, h);
  const sides = [P(u, v + s, h), P(u + s, v, h)];
  return (
    <g className="cb" style={{ '--i': i }}>
      {h === 0 && <polygon points={pts(base)} className="cb-pool" />}
      <polygon points={pts(left)} className="cb-face l" />
      <polygon points={pts(right)} className="cb-face r" />
      <polygon points={pts(right)} fill="url(#cb-sheen)" className="cb-sheen" />
      <polygon points={pts(top)} className="cb-face t" />
      <path d={`${line([top[0], top[2]])} ${line([top[1], top[3]])}`} className="cb-diag" />
      <path d={`${line(top)}Z`} className="cb-rim" />
      <path d={`${line([top[1], right[3]])} ${line([top[3], left[3]])}`} className="cb-edge" />
      <path d={`${line([top[2], front])} ${line([left[3], front, right[3]])}`} className="cb-edge hot" />
      <path d={star(cx, cy, s * 7)} className="cb-star" />
      {[front, ...sides].map(([x, y], n) => <circle key={n} cx={x} cy={y} r={n ? 1.6 : 2.4} className="cb-spark" />)}
    </g>
  );
}

// A Catmull-Rom curve through floor points, sampled at t in [0, 1].
export const through = (cps) => (t) => {
  const k = Math.min(cps.length - 2, Math.floor(t * (cps.length - 1)));
  const f = t * (cps.length - 1) - k;
  const [a, b, c, d] = [cps[Math.max(0, k - 1)], cps[k], cps[k + 1], cps[Math.min(cps.length - 1, k + 2)]];
  return [0, 1].map((i) => 0.5 * ((2 * b[i]) + (-a[i] + c[i]) * f + (2 * a[i] - 5 * b[i] + 4 * c[i] - d[i]) * f * f + (-a[i] + 3 * b[i] - 3 * c[i] + d[i]) * f * f * f));
};

// One ribbon: a bundle of strands following a floor curve, offset across its width.
export function Ribbon({ cps, spread, strands = 7, id, project = P, fan = 0, width, light, small }) {
  const at = through(cps);
  const path = (t, d) => {
    const [u, v] = at(t);
    const [u2, v2] = at(Math.min(1, t + 0.01));
    const [u1, v1] = at(Math.max(0, t - 0.01));
    const len = Math.hypot(u2 - u1, v2 - v1) || 1;
    return [u - ((v2 - v1) / len) * d, v + ((u2 - u1) / len) * d];
  };
  // `fan` widens the bundle towards its end, as if it runs towards the viewer; `width(t)` overrides it.
  const scale = width || ((t) => 1 + fan * t * t);
  const curve = (d) => line(Array.from({ length: 140 }, (_, n) => { const t = n / 139; const [u, v] = path(t, d * scale(t)); return project(u, v); }));
  const offsets = Array.from({ length: strands }, (_, n) => (n / (strands - 1) - 0.5) * spread);
  const animate = !still();
  return (
    <g className={`rb${light ? ' light' : ''}${small ? ' small' : ''}`}>
      <path d={curve(0)} className="rb-glow" />
      <path d={curve(0)} className="rb-haze" />
      {offsets.map((d, n) => (
        <path key={n} d={curve(d)} className={`rb-strand${n === Math.floor(strands / 2) ? ' core' : ''}`} style={{ '--n': n, opacity: 0.5 + 0.5 * (1 - Math.abs(d) / (spread / 2)) }} />
      ))}
      {animate && [0, 1, 2].map((n) => (
        <circle key={n} r="2.6" className="hs-dot">
          <animateMotion dur="3.6s" begin={`-${n * 1.2 + id}s`} repeatCount="indefinite" path={curve(offsets[n * 3 % strands] * 0.6)} />
        </circle>
      ))}
    </g>
  );
}

function Cubes() {
  // Floor grid: lines of constant u and v, with nodes at the crossings.
  const lines = [];
  for (let k = -10; k <= 24; k += 1) {
    lines.push(line([P(k, -10), P(k, 24)]));
    lines.push(line([P(-10, k), P(24, k)]));
  }
  const nodes = [];
  for (let u = -8; u <= 22; u += 2) for (let v = -8; v <= 22; v += 2) nodes.push(P(u, v));
  const ribbonA = [[-4.2, 4.77], [-0.58, 3.91], [2.6, 3.24], [4.89, 2.33], [7.03, 1.58], [9.77, 0.79]];
  const ribbonB = [[4.7, 3.9], [6.9, 3.37], [9.23, 4.1], [11.7, 6.08], [15, 8.3]];
  const cubes = [
    { u: 3.45, v: -4.25, s: 0.8, i: 6 },
    { u: 2.04, v: -1.16, s: 1.9, i: 2 },
    { u: 4.21, v: -1.88, s: 1.0, i: 5 },
    { u: 2.17, v: 3.77, s: 2.4, i: 0 },
    { u: 1.6, v: 7.7, s: 1.3, i: 4 },
    { u: 9.25, v: 2.2, s: 1.3, i: 3 },
    { u: 9.25, v: 2.2, s: 1.3, h: 1.45, i: 7 },
    { u: 8.1, v: 6.5, s: 2.6, i: 1 },
  ].sort((a, b) => (a.u + a.v + a.s) - (b.u + b.v + b.s));
  return (
    <Svg>
      <defs>
        <radialGradient id="cb-floor" cx="52%" cy="52%" r="68%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="cb-mask"><rect width="560" height="480" fill="url(#cb-floor)" /></mask>
        <CubeGradients />
      </defs>
      <g mask="url(#cb-mask)">
        <path d={lines.join(' ')} className="cb-grid" />
        {nodes.map(([x, y], n) => <circle key={n} cx={x} cy={y} r="1.6" className="cb-node" style={{ '--n': n % 9 }} />)}
      </g>
      <g mask="url(#cb-mask)">
        <Ribbon cps={ribbonA} spread={0.8} strands={8} id={0} />
        <Ribbon cps={ribbonB} spread={1.1} strands={10} id={0.6} />
      </g>
      {cubes.map((c) => <GlassCube key={`${c.u}-${c.v}-${c.h || 0}`} {...c} />)}
    </Svg>
  );
}

/* ---------- The Intellient Model ---------- */

// A glass cube drawn straight in screen space: (x, y) is its top vertex, s its edge length.
function ScreenCube({ x, y, s, i }) {
  const dx = s * 0.866;
  const dy = s * 0.5;
  const top = [[x, y], [x + dx, y + dy], [x, y + 2 * dy], [x - dx, y + dy]];
  const left = [[x - dx, y + dy], [x, y + 2 * dy], [x, y + 2 * dy + s], [x - dx, y + dy + s]];
  const right = [[x, y + 2 * dy], [x + dx, y + dy], [x + dx, y + dy + s], [x, y + 2 * dy + s]];
  return (
    <g className="cb hs-float" style={{ '--i': i }}>
      <ellipse cx={x} cy={y + 2 * dy + s + 6} rx={dx} ry={dy * 0.5} className="cb-pool" />
      <polygon points={pts(left)} className="cb-face l" />
      <polygon points={pts(right)} className="cb-face r" />
      <polygon points={pts(right)} fill="url(#cb-sheen)" className="cb-sheen" />
      <polygon points={pts(top)} className="cb-face t" />
      <path d={`${line(top)}Z`} className="cb-rim" />
      <path d={`${line([top[2], [x, y + 2 * dy + s]])} ${line([left[3], [x, y + 2 * dy + s], right[3]])}`} className="cb-edge hot" />
      <path d={`${line([top[1], right[2]])} ${line([top[3], left[3]])}`} className="cb-edge" />
      <path d={star(x, y + dy, s * 0.22)} className="cb-star" />
    </g>
  );
}

// A tall pane of glass seen at an angle: front face plus a thin lit side.
function Pane({ x, y, w, h, skew, depth = 10, i }) {
  const front = [[x, y], [x + w, y + skew], [x + w, y + skew + h], [x, y + h]];
  const side = [[x + w, y + skew], [x + w + depth, y + skew - depth * 0.5], [x + w + depth, y + skew + h - depth * 0.5], [x + w, y + skew + h]];
  return (
    <g className="pn" style={{ '--i': i }}>
      <polygon points={pts(front)} className="pn-face" />
      <polygon points={pts(side)} className="pn-side" />
      <path d={`M${x} ${y + h} V${y} L${x + w} ${y + skew}`} className="pn-rim" />
      <path d={`M${x + w} ${y + skew} V${y + skew + h}`} className="pn-edge" />
    </g>
  );
}

// The model: work moving deliberately through the operation, as one lit path winding between
// panes of glass and the blocks it has to pass, across a dark grid floor.
function ModelPath() {
  const screen = (x, y) => [x, y];
  // Grid floor: two families of lines meeting the horizon at a shallow angle.
  const floor = [];
  for (let k = -14; k <= 20; k += 1) {
    floor.push(`M${-200 + k * 46} 520 L${420 + k * 46} 180`);
    floor.push(`M${-160 + k * 46} 180 L${720 + k * 46} 560`);
  }
  // Thin rising lines of light, each with a point at its top: [x, top, bottom].
  const beams = [[205, 150, 300], [283, 112, 250], [316, 62, 200], [362, 30, 190], [535, 80, 300], [96, 176, 330]];
  return (
    <Svg>
      <defs>
        <CubeGradients />
        <radialGradient id="mp-floor" cx="62%" cy="58%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="65%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="mp-mask"><rect x="-40" y="0" width="640" height="520" fill="url(#mp-floor)" /></mask>
        {/* The ribbon fades in where it enters at the top. */}
        <linearGradient id="mp-enter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.12" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="mp-ribbon"><rect x="-40" y="0" width="640" height="520" fill="url(#mp-enter)" /></mask>
      </defs>
      <g mask="url(#mp-mask)">
        <path d={floor.join(' ')} className="cb-grid" />
        {Array.from({ length: 24 }, (_, n) => <circle key={n} cx={60 + (n * 97) % 480} cy={200 + (n * 61) % 260} r="1.5" className="cb-node" style={{ '--n': n % 9 }} />)}
      </g>
      {beams.map(([x, y1, y2], n) => (
        <g key={n} className="mp-beam" style={{ '--n': n }}>
          <line x1={x} x2={x} y1={y1} y2={y2} />
          <circle cx={x} cy={y1} r="1.8" />
        </g>
      ))}
      <Pane x={136} y={105} w={74} h={206} skew={40} i={0} />
      <Pane x={361} y={15} w={94} h={250} skew={44} i={1} />
      <g mask="url(#mp-ribbon)">
        <Ribbon cps={[[400, 70], [300, 118], [244, 168], [250, 226], [330, 278], [380, 336], [352, 400], [250, 452], [170, 478]]} spread={24} fan={2.2} strands={14} id={0} project={screen} />
      </g>
      <Pane x={136} y={214} w={70} h={112} skew={-28} i={2} />
      <ScreenCube x={486} y={84} s={28} i={3} />
      <ScreenCube x={316} y={112} s={38} i={0} />
      <ScreenCube x={57} y={286} s={48} i={2} />
      <ScreenCube x={482} y={196} s={80} i={1} />
    </Svg>
  );
}

/* ---------- Three Enterprises ---------- */

// A glowing node on a path: the bright point where work passes a checkpoint.
const Orb3 = ({ x, y, r = 7, i = 0 }) => (
  <g className="te-orb" style={{ '--i': i }}>
    <circle cx={x} cy={y} r={r * 2.6} className="halo" />
    <circle cx={x} cy={y} r={r} className="core" />
  </g>
);

// A tall pane of glass with rounded corners, leaning back: its top edge falls to the right.
function Card3({ x, y, w, h, skew, i }) {
  const r = 5;
  const d = `M${x} ${y + r} Q${x} ${y} ${x + r} ${y + r * (skew / w)} L${x + w - r} ${y + skew - r * (skew / w)} Q${x + w} ${y + skew} ${x + w} ${y + skew + r}`
    + ` V${y + skew + h - r} Q${x + w} ${y + skew + h} ${x + w - r} ${y + skew + h - r * (skew / w)} L${x + r} ${y + h + r * (skew / w)} Q${x} ${y + h} ${x} ${y + h - r} Z`;
  return (
    <g className="te-card" style={{ '--i': i }}>
      <rect x={x - 4} y={y + h + 4} width={w + 8} height={h * 0.55} className="te-reflect" />
      <path d={d} className="face" />
      <path d={d} className="edge" />
      <path d={`M${x + w} ${y + skew + r} V${y + skew + h - r}`} className="side" />
    </g>
  );
}

// Three Enterprises hero: one bundle of work threading through four panes, pinched tight at each
// checkpoint and loosening between them, rising across a dark grid floor.
function Rise() {
  const screen = (x, y) => [x, y];
  // Control points; the odd ones are the checkpoints the bundle pinches through.
  const cps = [[-40, 452], [147, 343], [212, 318], [275, 301], [337, 262], [394, 220], [445, 172], [495, 140], [600, 112]];
  const nodes = [1, 3, 5, 7].map((k) => cps[k]);
  const knots = [1, 3, 5, 7].map((k) => k / (cps.length - 1));
  const smooth = (x) => x * x * (3 - 2 * x);
  // Width along the bundle: tight at each checkpoint, open between, and fanning wide where it enters.
  const width = (t) => {
    const d = Math.min(...knots.map((k) => Math.abs(t - k)));
    const open = 0.22 + 0.78 * smooth(Math.min(d / 0.125, 1));
    return t < knots[0] ? open * (1 + 3.2 * ((knots[0] - t) / knots[0]) ** 2) : open;
  };
  // Grid floor: one family of lines rising to the right, one falling.
  const floor = [];
  for (let k = -12; k <= 22; k += 1) {
    floor.push(`M${-300 + k * 34} 560 L${600 + k * 34} 100`);
    floor.push(`M${-300 + k * 34} 160 L${700 + k * 34} 600`);
  }
  // Dotted lines of light: [x, top, bottom].
  const beams = [[194, 233, 301], [219, 324, 360], [310, 160, 262], [282, 312, 362], [408, 262, 312], [421, 108, 160], [478, 222, 280], [495, 156, 206], [533, 72, 136]];
  return (
    <Svg>
      <defs>
        <radialGradient id="te-floor" cx="55%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="te-mask"><rect x="-40" y="0" width="640" height="520" fill="url(#te-floor)" /></mask>
        <linearGradient id="te-glass" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#8fc4ff" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#2f6fe8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0a2a6b" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="te-ref" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3f8cff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g mask="url(#te-mask)">
        <path d={floor.join(' ')} className="te-grid" />
        {Array.from({ length: 30 }, (_, n) => <circle key={n} cx={30 + (n * 83) % 520} cy={250 + (n * 47) % 220} r="1.4" className="cb-node" style={{ '--n': n % 9 }} />)}
      </g>
      {beams.map(([x, y1, y2], n) => (
        <g key={n} className="te-beam" style={{ '--n': n }}>
          <line x1={x} x2={x} y1={y1} y2={y2} />
          <circle cx={x} cy={y1} r="2.2" />
          <circle cx={x} cy={y2} r="1.4" className="end" />
        </g>
      ))}
      <Card3 x={144} y={268} w={39} h={99} skew={21} i={0} />
      <Card3 x={220} y={140} w={56} h={157} skew={33} i={1} />
      <Card3 x={345} y={98} w={48} h={143} skew={41} i={2} />
      <Card3 x={471} y={45} w={47} h={140} skew={38} i={3} />
      <Ribbon cps={cps} spread={48} width={width} strands={20} id={0} project={screen} light />
      {nodes.map(([x, y], i) => <Orb3 key={x} x={x} y={y} r={i === 3 ? 10 : 9} i={i} />)}
    </Svg>
  );
}

// A glass panel standing on the path at (x, y): its foot touches the path, its icon tells the step.
function Tile({ x, y, w = 64, h = 76, kind, i }) {
  const top = y - h - 14;
  const ink = {
    request: <><path d="M-12 -18 H6 L13 -11 V18 H-12 Z" className="ink" /><path d="M-6 -4 H7 M-6 3 H7 M-6 10 H3" className="ink thin" /></>,
    person: <><circle cx="0" cy="-7" r="8" className="ink" /><path d="M-14 17 V13 a14 10 0 0 1 28 0 V17" className="ink" /></>,
    sheet: <><rect x="-15" y="-15" width="30" height="30" rx="3" className="ink" /><path d="M-15 -5 H15 M-15 5 H15 M-5 -15 V15 M5 -15 V15" className="ink thin" /></>,
    approved: <><path d="M-14 -22 H6 L15 -13 V22 H-14 Z" className="docfill" /><path d="M-7 -8 H8 M-7 -1 H8 M-7 6 H2" className="ink lines" /><circle cx="13" cy="16" r="9" className="badge" /><path d="M9 16 l3 3 l5 -6" className="tick" /></>,
  }[kind];
  return (
    <g className={`rq-tile${kind === 'approved' ? ' hot' : ''}`} style={{ '--i': i }}>
      <line x1={x} x2={x} y1={top + h} y2={y} className="rq-stem" />
      <g className="hs-float" style={{ '--i': i }}>
        <rect x={x - w / 2} y={top} width={w} height={h} rx="10" className="face" />
        <rect x={x - w / 2} y={top} width={w} height={h} rx="10" className="rim" />
        <path d={`M${x - w / 2 + 10} ${top + 1} H${x + w / 2 - 10}`} className="shine" />
        <g transform={`translate(${x} ${top + h / 2})`}>{ink}</g>
      </g>
    </g>
  );
}

// A simple example: the request winds through approval and a side sheet before it is approved, and
// some requests loop back to the start.
function Request() {
  const screen = (x, y) => [x, y];
  const cps = [[-30, 262], [80, 236], [150, 238], [214, 218], [280, 214], [344, 192], [410, 186], [478, 162], [600, 140]];
  const stops = [1, 3, 5, 7].map((k) => cps[k]);
  const knots = [1, 3, 5, 7].map((k) => k / (cps.length - 1));
  const smooth = (x) => x * x * (3 - 2 * x);
  const width = (t) => 0.28 + 0.72 * smooth(Math.min(Math.min(...knots.map((k) => Math.abs(t - k))) / 0.12, 1));
  const floor = [];
  for (let k = -10; k <= 26; k += 1) {
    floor.push(`M${-200 + k * 34} 330 L${400 + k * 34} 120`);
    floor.push(`M${-200 + k * 34} 150 L${500 + k * 34} 360`);
  }
  const beams = [[36, 150, 250], [116, 120, 228], [252, 90, 210], [298, 130, 205], [384, 70, 186], [518, 60, 150], [540, 110, 150]];
  const [a, b] = stops;
  return (
    <Svg h={300}>
      <defs>
        <radialGradient id="rq-floor" cx="55%" cy="75%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="rq-mask"><rect x="-40" y="0" width="640" height="300" fill="url(#rq-floor)" /></mask>
        <linearGradient id="rq-glass" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#6fb4ff" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#0d3a9a" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <path d={floor.join(' ')} className="te-grid" mask="url(#rq-mask)" />
      {beams.map(([x, y1, y2], n) => (
        <g key={n} className="te-beam" style={{ '--n': n }}>
          <line x1={x} x2={x} y1={y1} y2={y2} />
          <circle cx={x} cy={y1} r="1.9" />
        </g>
      ))}
      <Ribbon cps={cps} spread={34} width={width} strands={16} id={0} project={screen} light />
      {/* Requests sent back from approval to the start. */}
      <path d={`M${b[0] - 6} ${b[1] - 100} C${b[0] - 30} ${b[1] - 150} ${a[0] + 20} ${a[1] - 150} ${a[0] + 4} ${a[1] - 106}`} className="rq-return" />
      <path d={`M${a[0] + 4} ${a[1] - 104} l-5 -9 l9 2 z`} className="rq-arrow" />
      <Tile x={a[0]} y={a[1]} kind="request" i={0} />
      <Tile x={b[0]} y={b[1]} kind="person" i={1} />
      <Tile x={stops[2][0]} y={stops[2][1]} kind="sheet" i={2} />
      <Tile x={stops[3][0]} y={stops[3][1]} w={80} h={94} kind="approved" i={3} />
      {stops.map(([x, y], i) => <Orb3 key={x} x={x} y={y} r={i === 3 ? 8 : 6} i={i} />)}
    </Svg>
  );
}

const MODEL_LAYERS = ['Outcome', 'People', 'Technology', 'Governance'];

const ARCH_LAYERS = ['Applications', 'Models', 'Platform', 'Data', 'Security & Governance'];

function LayerStack({ labels = ARCH_LAYERS, top = 82, gap = 76 }) {
  // With labels, the stack moves left to make room for a glass tag beside each layer.
  const named = labels.some(Boolean);
  const cx = named ? 190 : 280;
  const hw = named ? 165 : 200; // half width of a plate
  const hh = named ? 50 : 60; // half depth of a plate
  const t = 12; // plate thickness
  const ys = labels.map((_, i) => top + i * gap);
  const plate = (cy, s = 1) => `${cx - hw * s},${cy} ${cx},${cy - hh * s} ${cx + hw * s},${cy} ${cx},${cy + hh * s}`;
  return (
    <>
      <Svg>
        <defs>
          <linearGradient id="hs-st-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f9bff" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#1f5fff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0a2a6b" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="hs-st-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8fcbff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#e6f4ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#8fcbff" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="hs-st-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3f8cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[-150, -90, 90, 150].map((dx) => <line key={dx} x1={cx + dx} x2={cx + dx} y1="40" y2="440" className="hs-st-guide" />)}
        <ellipse cx={cx} cy="436" rx="230" ry="44" fill="url(#hs-st-floor)" />
        <ellipse cx={cx} cy="404" rx="262" ry="46" className="hs-st-orbit" />
        <Flow d={`M${cx} 470 V20`} lit dots={4} dur={3.6} />
        {[...labels].reverse().map((label, r) => {
          const i = labels.length - 1 - r;
          const cy = ys[i];
          return (
            <g key={i} className="hs-st-plate" style={{ '--i': i }}>
              <polygon points={`${cx - hw},${cy} ${cx},${cy + hh} ${cx},${cy + hh + t} ${cx - hw},${cy + t}`} className="side" />
              <polygon points={`${cx},${cy + hh} ${cx + hw},${cy} ${cx + hw},${cy + t} ${cx},${cy + hh + t}`} className="side dark" />
              <polygon points={plate(cy)} className="top" />
              <polygon points={plate(cy, 0.84)} className="inset" />
              <path d={`M${cx - hw} ${cy} L${cx} ${cy - hh} L${cx + hw} ${cy}`} className="rim" />
              <circle cx={cx} cy={cy} r="4" className="hs-st-node" />
              {label && <path d={`M${cx + hw + 4} ${cy} H${cx + hw + 20}`} className="hs-line dash" />}
            </g>
          );
        })}
      </Svg>
      {labels.map((label, i) => label && (
        <span key={label} className="hs-st-tag" style={{ left: cx + hw + 22, top: ys[i], '--i': i }}><i />{label}</span>
      ))}
    </>
  );
}

/* ---------- Operating Domains ---------- */

// Operating Domains hero: the domain as a glass dome. The outcome, the site's liquid-glass orb, sits at
// its centre; the work orbits it on lit rings and lines of light rise from inside the boundary.
// Drawn on a 1671 x 941 reference grid and mapped onto the stage.
function Domain() {
  const s = 0.44;
  const X = (x) => +(300 + (x - 930) * s).toFixed(1);
  const Y = (y) => +(250 + (y - 500) * s).toFixed(1);
  const pt = (x, y) => `${X(x)} ${Y(y)}`;
  // An ellipse as a path, so particles can travel on it: from its left end over the top and back.
  const ring = (cx, cy, rx, ry) => `M${pt(cx - rx, cy)} A${rx * s} ${ry * s} 0 0 1 ${pt(cx + rx, cy)} A${rx * s} ${ry * s} 0 0 1 ${pt(cx - rx, cy)}`;
  const Ell = ({ cx, cy, rx, ry, className, rot = 0 }) => (
    <ellipse cx={X(cx)} cy={Y(cy)} rx={rx * s} ry={ry * s} className={className} transform={rot ? `rotate(${rot} ${X(cx)} ${Y(cy)})` : undefined} />
  );
  // Ring geometry: the main lit ring and the dotted orbit around it, seen from a raised angle.
  const RING = [938, 520, 550, 190];
  const ORBIT = [915, 505, 600, 262];
  const on = ([cx, cy, rx, ry], deg) => [cx + rx * Math.cos((deg * Math.PI) / 180), cy + ry * Math.sin((deg * Math.PI) / 180)];
  const main = ring(...RING);
  const dome = `M${pt(385, 520)} A${555 * s} ${360 * s} 0 0 1 ${pt(1495, 520)} A${555 * s} ${335 * s} 0 0 1 ${pt(385, 520)}`;
  // Small glass orbs: [x, y, r, has a ring of its own].
  const sats = [[...on(ORBIT, 245), 15], [...on(ORBIT, 192), 8], [...on(RING, 205), 28, true], [...on(RING, 22), 14], [...on(RING, 140), 30, true]];
  // Dotted lines of light: [x, top, bottom].
  const beams = [[1163, 102, 330], [1263, 255, 425], [1377, 343, 605], [486, 310, 430], [440, 475, 620], [517, 676, 850], [1122, 760, 880]];
  const moving = !still();
  const Sat = ({ x, y, r, ringed, i }) => (
    <g className="od-sat" style={{ '--i': i }}>
      <circle cx={X(x)} cy={Y(y)} r={r * s * 2.4} className="halo" />
      {ringed && <Ell cx={x} cy={y + r * 0.15} rx={r * 1.75} ry={r * 0.5} className="band" />}
      <circle cx={X(x)} cy={Y(y)} r={r * s} className="ball" />
      <ellipse cx={X(x) - r * s * 0.3} cy={Y(y) - r * s * 0.38} rx={r * s * 0.42} ry={r * s * 0.26} className="shine" />
      {ringed && <path d={`M${pt(x - r * 1.75, y + r * 0.15)} A${r * 1.75 * s} ${r * 0.5 * s} 0 0 0 ${pt(x + r * 1.75, y + r * 0.15)}`} className="band front" />}
    </g>
  );
  const orb = 61 * s * 4;
  return (
    <>
      <Svg>
        <defs>
          <radialGradient id="od-dome" cx="50%" cy="58%" r="55%">
            <stop offset="0%" stopColor="#1f5fff" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#1f5fff" stopOpacity="0.06" />
            <stop offset="88%" stopColor="#3f8cff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#8fcbff" stopOpacity="0.34" />
          </radialGradient>
          <linearGradient id="od-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8fcbff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8fcbff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="od-ball" cx="34%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#e9f6ff" />
            <stop offset="30%" stopColor="#9fdcff" />
            <stop offset="62%" stopColor="#2f7bff" />
            <stop offset="100%" stopColor="#0b1a44" />
          </radialGradient>
          <filter id="od-blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>

        {/* Dome */}
        <path d={dome} fill="url(#od-dome)" className="od-dome" />
        <path d={`M${pt(385, 520)} A${555 * s} ${360 * s} 0 0 1 ${pt(1495, 520)}`} stroke="url(#od-rim)" className="od-rim" />
        {[0.38, 0.72].map((k) => (
          <path key={k} d={`M${pt(940 - 555 * k, 520)} A${555 * k * s} ${360 * s} 0 0 1 ${pt(940 + 555 * k, 520)}`} className="od-mer" />
        ))}
        <path d={`M${pt(470, 400)} A${470 * s} ${80 * s} 0 0 1 ${pt(1410, 400)}`} className="od-mer" />
        <line x1={X(925)} x2={X(925)} y1={Y(160)} y2={Y(860)} className="od-axis" />

        {/* Rings */}
        <Ell cx={935} cy={600} rx={650} ry={300} className="od-orbit faint" />
        {[80, 150, 230, 320, 420].map((rx, n) => <Ell key={rx} cx={925} cy={525} rx={rx} ry={rx * 0.38} className={`od-floor${n % 2 ? ' rev' : ''}`} />)}
        <Ell cx={ORBIT[0]} cy={ORBIT[1]} rx={ORBIT[2]} ry={ORBIT[3]} rot={1.5} className="od-orbit" />
        <path d={main} className="od-ring glow" filter="url(#od-blur)" />
        <path d={main} className="od-ring" />
        <path d={main} className="od-ring core" />
        {Array.from({ length: 14 }, (_, k) => {
          const a = (k / 14) * Math.PI * 2 + 0.2;
          return <circle key={k} cx={X(938 + Math.cos(a) * 550)} cy={Y(520 + Math.sin(a) * 190)} r="1.6" className="od-tick" />;
        })}
        {moving && [0, 1, 2].map((k) => (
          <circle key={k} r="2.8" className="hs-dot">
            <animateMotion dur="16s" begin={`-${k * 5.3}s`} repeatCount="indefinite" path={main} />
          </circle>
        ))}

        {/* Lines of light */}
        {beams.map(([x, y1, y2], n) => (
          <g key={n} className="te-beam" style={{ '--n': n }}>
            <line x1={X(x)} x2={X(x)} y1={Y(y1)} y2={Y(y2)} />
            <circle cx={X(x)} cy={Y(y1)} r="2.4" />
            <circle cx={X(x)} cy={Y(y2)} r="1.5" className="end" />
          </g>
        ))}

        {/* The work around the outcome */}
        <Ell cx={925} cy={512} rx={150} ry={40} className="od-orbit near" />
        {sats.map(([x, y, r, ringed], i) => <Sat key={i} x={x} y={y} r={r} ringed={ringed} i={i + 1} />)}
      </Svg>
      {/* The outcome: the same liquid-glass orb as the home page. */}
      <div className="od-orb" style={{ left: X(925), top: Y(470), width: orb, height: orb }}>
        <span className="od-orb-glow" aria-hidden="true" />
        <div className="orb-glass od-orb-glass">
          <span className="orb-swirl" aria-hidden="true" />
          <span className="orb-swirl two" aria-hidden="true" />
        </div>
        <img src="/svg/intellient.svg" alt="" className="od-orb-logo" />
      </div>
    </>
  );
}

/* ---------- Where value hides ---------- */

// Where value hides hero: the outcome is a long road. One lit path winds in an S across a dotted
// landscape of long, wave-like ridges to a far crest, with lines of light rising from the ground.
// The ground is painted once on a canvas (thousands of dots, ridges hiding what lies behind them);
// the road, its end point and the pins are SVG above it so they can move.
// Stage coordinates are the reference composition at half size.
const TR = { w: 892, h: 441, cx: 446, y0: 120, f: 583, cam: 1, phi: (37.9 * Math.PI) / 180, p0: [-0.24, 2.31] };
const TR_E = [Math.cos(TR.phi), -Math.sin(TR.phi)];
const TR_V = [Math.sin(TR.phi), Math.cos(TR.phi)];
// A screen point at a given height, back onto the ground plane (a along the near edge, b away from it).
const trBack = (sx, sy, h) => {
  const Z = (TR.f * (TR.cam - h)) / (sy - TR.y0);
  const X = ((sx - TR.cx) * Z) / TR.f;
  const d = [X - TR.p0[0], Z - TR.p0[1]];
  return [d[0] * TR_E[0] + d[1] * TR_E[1], d[0] * TR_V[0] + d[1] * TR_V[1], h];
};
// The crest of each ridge on screen, [x, y, height], and the ridge's half-width on the ground.
const TR_MIDDLE = [[165, 262, 0.12], [300, 237, 0.2], [400, 210, 0.28], [475, 200, 0.32], [550, 202, 0.3], [585, 218, 0.15]];
const TR_LEFT = [[0, 240, 0.12], [150, 212, 0.15], [250, 205, 0.16], [350, 202, 0.16]];
const TR_BACK = [[300, 200, 0.2], [350, 182, 0.3], [450, 152, 0.42], [510, 150, 0.45], [590, 143, 0.5]];
const TR_BETWEEN = [[515, 177, 0.22], [565, 172, 0.25], [620, 165, 0.28]];
const TR_RIGHT = [[655, 145, 0.45], [725, 139, 0.55], [800, 140, 0.55], [892, 160, 0.45]];
const TR_RIDGES = [[0.6, TR_MIDDLE], [0.8, TR_LEFT], [1.0, TR_BACK], [0.6, TR_BETWEEN], [1.6, TR_RIGHT]]
  .map(([w, pts]) => ({ w, p: pts.map(([x, y, h]) => trBack(x, y, h)) }));
// Ground height: each ridge rises around its centre line to its traced height.
function trHeight(a, b) {
  let y = 0;
  for (const { w, p } of TR_RIDGES) {
    let near = Infinity;
    let top = 0;
    for (let i = 0; i < p.length - 1; i += 1) {
      const [a1, b1, h1] = p[i];
      const [a2, b2, h2] = p[i + 1];
      const dx = a2 - a1;
      const dy = b2 - b1;
      const t = Math.max(0, Math.min(1, ((a - a1) * dx + (b - b1) * dy) / (dx * dx + dy * dy || 1)));
      const d = Math.hypot(a - a1 - t * dx, b - b1 - t * dy);
      if (d < near) { near = d; top = h1 + (h2 - h1) * t; }
    }
    y = Math.max(y, top * Math.exp(-((near / w) ** 2) / 2));
  }
  return y;
}
const trProject = (a, b, flat) => {
  const X = TR.p0[0] + a * TR_E[0] + b * TR_V[0];
  const Z = TR.p0[1] + a * TR_E[1] + b * TR_V[1];
  const y = flat ? 0 : trHeight(a, b);
  return [TR.cx + (TR.f * X) / Z, TR.y0 + (TR.f * (TR.cam - y)) / Z, Z];
};
// The near edge of the ground turns slightly towards the viewer on the left.
const trEdge = (a) => 0.1 * Math.min(a, 0);
// Crest lines that catch the light, traced from the reference: the skyline (the low ridge on the left,
// then the far ridge rising to the saddle where the road ends), the right swell, and two nearer waves.
const TR_SKYLINE = [[-10, 244], [0, 240], [80, 226], [150, 212], [250, 205], [300, 202], [350, 182], [400, 166], [450, 152], [510, 150], [590, 143], [640, 141], [678, 141], [725, 139], [800, 140], [850, 146], [902, 164]];
const TR_GLOWS = [
  TR_SKYLINE.slice(1, 13),
  [[650, 145], [725, 139], [800, 140], [850, 146], [892, 160]],
  [[165, 262], [230, 250], [300, 237], [350, 222], [400, 210], [450, 201], [475, 200], [520, 201], [550, 204], [585, 218], [600, 228]],
  [[500, 180], [515, 177], [565, 172], [620, 165]],
];
const trSmooth = (pts, n = 6) => { const at = through(pts); return Array.from({ length: (pts.length - 1) * n + 1 }, (_, i) => at(i / ((pts.length - 1) * n))); };

function paintTerrain(canvas) {
  const k = Math.min(3, 2 * (window.devicePixelRatio || 1));
  canvas.width = TR.w * k;
  canvas.height = TR.h * k;
  const g = canvas.getContext('2d');
  g.scale(k, k);
  // Only ground below the skyline is drawn; above it is open sky.
  g.save();
  g.beginPath();
  g.moveTo(-10, TR.h + 20);
  trSmooth(TR_SKYLINE).forEach(([x, y]) => g.lineTo(x, y));
  g.lineTo(TR.w + 10, TR.h + 20);
  g.closePath();
  g.clip();

  const step = 0.1;
  const as = Array.from({ length: Math.round(16.4 / step) + 1 }, (_, i) => -14 + i * step);
  const rows = Array.from({ length: 150 }, (_, j) => j);
  const grid = rows.map((j) => as.map((a) => trProject(a, trEdge(a) + j * step)));
  const plain = rows.map((j) => as.map((a) => trProject(a, trEdge(a) + j * step, true)));
  const fade = (Z) => Math.max(0, Math.min(1, 1.3 - Z / 15));
  const inView = ([x, y]) => x > -10 && x < TR.w + 10 && y > 90 && y < TR.h + 10;
  // How much a patch faces the viewer compared with flat ground: the faces of the ridges catch light.
  const lit = (r, i) => Math.max(0.6, Math.min(2.2, (grid[r][i][1] - grid[r + 1][i][1]) / Math.max(0.01, plain[r][i][1] - plain[r + 1][i][1])));

  // Paint strips from far to near so nearer ground hides what lies behind it.
  for (let r = rows.length - 2; r >= 0; r -= 1) {
    const near = grid[r];
    const far = grid[r + 1];
    g.beginPath();
    near.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    for (let i = far.length - 1; i >= 0; i -= 1) g.lineTo(far[i][0], far[i][1]);
    g.closePath();
    g.fillStyle = '#020917';
    g.fill();
    // Grid lines on the surface, both ways, faint and fading with distance.
    g.lineWidth = 0.55;
    for (let i = 0; i < near.length; i += 1) {
      if (!inView(far[i])) continue;
      const a = fade(far[i][2]) * Math.min(1.6, lit(r, i));
      g.strokeStyle = `rgba(63, 140, 255, ${0.2 * a})`;
      g.beginPath(); g.moveTo(near[i][0], near[i][1]); g.lineTo(far[i][0], far[i][1]); g.stroke();
      if (i) {
        g.strokeStyle = `rgba(63, 140, 255, ${0.16 * a})`;
        g.beginPath(); g.moveTo(far[i - 1][0], far[i - 1][1]); g.lineTo(far[i][0], far[i][1]); g.stroke();
      }
    }
    // Dots at the grid points, larger and brighter nearby and on the faces of the ridges.
    far.forEach(([x, y, Z], i) => {
      if (!inView([x, y])) return;
      const a = Math.min(1, fade(Z) * Math.min(1.5, lit(r, i)));
      if (a <= 0.03) return;
      g.fillStyle = `rgba(${Z < 4.5 ? '143, 203, 255' : '79, 155, 255'}, ${0.9 * a})`;
      g.beginPath(); g.arc(x, y, Math.max(0.35, Math.min(1.35, 3 / Z)), 0, Math.PI * 2); g.fill();
    });
  }
  // The near edge of the ground catches the light, brightest where the road leaves it.
  g.lineCap = 'round';
  for (let i = 1; i < as.length; i += 1) {
    const [x1, y1] = grid[0][i - 1];
    const [x2, y2] = grid[0][i];
    const a = 0.2 + 0.8 * Math.exp(-((as[i] / 2.2) ** 2));
    g.strokeStyle = `rgba(143, 203, 255, ${a})`;
    g.lineWidth = 1.3;
    g.shadowColor = '#3f8cff';
    g.shadowBlur = 8;
    g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
  }
  g.restore();

  // Crest lines: bright in the middle of each ridge, fading towards its ends.
  g.lineCap = 'round';
  g.shadowColor = '#3f8cff';
  TR_GLOWS.forEach((pts) => {
    const s = trSmooth(pts, 10);
    for (let i = 1; i < s.length; i += 1) {
      const t = i / (s.length - 1);
      const a = Math.sin(Math.PI * Math.min(1, Math.max(0, t))) ** 0.6;
      g.lineWidth = 1.2;
      g.shadowBlur = 10;
      g.strokeStyle = `rgba(110, 180, 255, ${0.9 * a})`;
      g.beginPath(); g.moveTo(s[i - 1][0], s[i - 1][1]); g.lineTo(s[i][0], s[i][1]); g.stroke();
    }
  });
  g.shadowBlur = 0;
}

function Terrain() {
  const ref = useRef(null);
  useLayoutEffect(() => { if (ref.current) paintTerrain(ref.current); }, []);
  // The road, traced from the reference: up from the near edge, a long sweep right, a broad S-bend
  // back to the left, and a last climb to the crest.
  const road = through([[383, 372], [392, 345], [402, 328], [418, 312], [440, 297], [470, 285], [500, 277], [550, 265], [620, 245], [650, 236], [667, 228], [677, 214], [673, 202], [660, 191], [640, 181], [624, 171], [619, 163], [626, 156], [642, 150], [662, 144], [678, 139]]);
  const pts2 = Array.from({ length: 200 }, (_, n) => road(n / 199));
  const pieces = [[0, 50, 3.1], [49, 100, 2.6], [99, 150, 2.1], [149, 199, 1.6]];
  const full = line(pts2);
  // Lines of light: [x, top, bottom, size of the light].
  const pins = [[361, 155, 228, 2.1], [504, 121, 200, 2.1], [395, 233, 325, 3.4], [772, 74, 228, 2.1], [825, 131, 149, 1.5], [832, 197, 280, 2.5], [787, 291, 441, 4.2], [595, 122, 150, 1.2]];
  const moving = !still();
  return (
    <>
      <canvas ref={ref} className="tr-canvas" />
      <Svg w={TR.w} h={TR.h}>
        <defs>
          <radialGradient id="tr-sky" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f5fff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#1f5fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="650" cy="110" rx="250" ry="95" fill="url(#tr-sky)" />
        {pins.map(([x, y1, y2, r], n) => (
          <g key={n} className="tr-pin" style={{ '--n': n }}>
            <line x1={x} x2={x} y1={y1} y2={y2} />
            <circle cx={x} cy={y1} r={r * 2.6} className="halo" />
            <circle cx={x} cy={y1} r={r} className="cap" />
          </g>
        ))}
        <path d={full} className="tr-road glow" />
        <path d={full} className="tr-road haze" />
        {pieces.map(([a, b, w]) => <path key={a} d={line(pts2.slice(a, b + 1))} className="tr-road core" style={{ strokeWidth: w }} />)}
        {moving && [0, 1].map((k) => (
          <circle key={k} r="2.2" className="hs-dot">
            <animateMotion dur="6s" begin={`-${k * 3}s`} repeatCount="indefinite" path={full} />
          </circle>
        ))}
        <g className="tr-goal">
          <circle cx="678" cy="139" r="34" className="sky" />
          {[31, 23, 15].map((r, k) => <circle key={r} cx="678" cy="139" r={r} className={`ring r${k}`} />)}
          <circle cx="678" cy="139" r="6.5" className="core" />
        </g>
      </Svg>
    </>
  );
}

// A pane of glass standing on the floor, seen slightly from one side: rounded front face, a lit
// edge on the side facing the light, and its glow reflected on the floor below.
function CfPane({ x, y, w, h, skew, lit = 'right', i }) {
  const r = 6;
  const s = skew / w;
  const d = `M${x} ${y + r} Q${x} ${y} ${x + r} ${y + r * s} L${x + w - r} ${y + skew - r * s} Q${x + w} ${y + skew} ${x + w} ${y + skew + r}`
    + ` V${y + skew + h - r} Q${x + w} ${y + skew + h} ${x + w - r} ${y + skew + h - r * s} L${x + r} ${y + h + r * s} Q${x} ${y + h} ${x} ${y + h - r} Z`;
  const edge = lit === 'right' ? `M${x + w} ${y + skew + r} V${y + skew + h - r}` : `M${x} ${y + r} V${y + h - r}`;
  return (
    <g className="cf-pane" style={{ '--n': i }}>
      <rect x={x - 6} y={y + h + 18} width={w + 12} height={h * 0.5} className="reflect" />
      <path d={d} className="face" />
      <path d={d} className="rim" />
      <path d={edge} className="edge" />
      <path d={`M${x + r + 2} ${y + 3 + r * s} L${x + w - r - 2} ${y + skew + 3 - r * s}`} className="shine" />
    </g>
  );
}

// Where value hides: work arrives as a loose tangle of strands, is drawn tight through panes of glass
// and the intelligence at the centre, and leaves as one line to the outcome.
function CubeFlow() {
  // The bundle: where it runs, and how loose it is along the way.
  const xs = [-420, -200, 0, 150, 270, 348, 412, 474, 600, 716, 787, 845, 960, 1107];
  const mid = [200, 198, 196, 194, 192, 192, 190, 192, 194, 194, 195, 195, 195, 195];
  const spread = [250, 185, 122, 80, 40, 30, 22, 18, 24, 16, 13, 11, 7, 0];
  const n = 44;
  const strands = Array.from({ length: n }, (_, i) => {
    const f = (i / (n - 1)) * 2 - 1;
    const cps = xs.map((x, k) => [x, mid[k] + f * spread[k] + Math.sin(i * 2.3 + k * 1.1) * spread[k] * 0.16]);
    const at = through(cps);
    return { i, d: line(Array.from({ length: 120 }, (_, m) => at(m / 119))), at, f };
  });
  const core = through(xs.map((x, k) => [x, mid[k]]));
  const coreD = line(Array.from({ length: 120 }, (_, m) => core(m / 119)));
  // Beads of light riding the strands: [x, y, size, phase]. Each keeps clear of the others, and
  // further apart where the bundle draws tight, so no two ever sit on top of one another.
  const beads = [];
  strands.filter((s) => s.i % 2 === 0).forEach((s) => [0.12, 0.24, 0.33, 0.47, 0.62, 0.78, 0.9].forEach((t, k) => {
    const [x, y] = s.at((t + ((s.i * 37) % 11) * 0.007) % 0.97);
    const r = (s.i + k) % 5 === 0 ? 2.6 : 1.3;
    const gap = (x > 330 ? 26 : 12) + r * 2;
    if (x > -60 && beads.every(([bx2, by2, br]) => Math.hypot(x - bx2, y - by2) > gap + br * 2)) beads.push([x, y, r, (s.i + k) % 7]);
  }));
  const bits = [[70, 116, 7], [150, 312, 9], [228, 266, 6], [262, 92, 6], [930, 114, 7], [1010, 148, 8], [1046, 276, 6], [884, 300, 7], [40, 210, 5]];
  const moving = !still();
  // The cube: a glass box seen almost face on, its back face up and to the left.
  const [fx, fy, fs] = [540, 137, 150];
  const [bx, by] = [fx - 18, fy - 15];
  // Nodes inside the cube: four bright ones in front, three deeper ones behind.
  const lit = [[581, 182], [611, 182], [581, 228], [611, 228]];
  const deep = [[648, 168], [648, 198], [648, 228]];
  return (
    <Svg w={1200} h={400}>
      <defs>
        <linearGradient id="cf-glass" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#8fcbff" stopOpacity="0.26" />
          <stop offset="45%" stopColor="#1f5fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0b1d52" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="cf-cube" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#8fcbff" stopOpacity="0.2" />
          <stop offset="55%" stopColor="#1f5fff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#3f8cff" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="cf-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cfeaff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3f8cff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="cf-ref" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#1f5fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cf-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8fcbff" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#3f8cff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#1f5fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cf-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="18%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="cf-in"><rect x="-440" y="-40" width="1700" height="480" fill="url(#cf-fade)" /></mask>
      </defs>

      {bits.map(([x, y, s], k) => <rect key={k} x={x} y={y} width={s} height={s} rx="1.5" className="cf-bit" style={{ '--n': k }} />)}

      {/* Floor: rings around the cube and its glow */}
      <ellipse cx={618} cy={292} rx={270} ry={46} className="cf-floor" />
      <ellipse cx={618} cy={292} rx={180} ry={30} className="cf-floor" />
      <ellipse cx={618} cy={292} rx={100} ry={16} className="cf-floor" />
      <ellipse cx={612} cy={290} rx={150} ry={22} fill="url(#cf-pool)" className="cf-pool" />

      {/* Strands */}
      <g mask="url(#cf-in)">
        <path d={coreD} className="cf-glow" />
        {strands.map(({ i, d, f }) => (
          <path key={i} d={d} className={`cf-strand${i % 6 === 3 ? ' lit' : ''}`} style={{ opacity: 0.3 + 0.7 * (1 - Math.abs(f)) ** 0.7 }} />
        ))}
        {beads.map(([x, y, r, p], k) => <circle key={k} cx={x} cy={y} r={r} className={`cf-bead${r > 2 ? ' big' : ''}`} style={{ '--n': p }} />)}
        {/* A few lights travel the bundle, evenly staggered so they never bunch where it narrows. */}
        {moving && [4, 13, 22, 31, 40].map((i, k) => (
          <circle key={i} r="2.2" className="hs-dot">
            <animateMotion dur="6s" begin={`-${k * 1.2}s`} repeatCount="indefinite" path={strands[i].d} />
          </circle>
        ))}
      </g>

      {/* Panes of glass the work passes through */}
      <CfPane x={318} y={100} w={60} h={176} skew={8} lit="right" i={0} />
      <CfPane x={448} y={94} w={52} h={172} skew={6} lit="right" i={1} />

      {/* The cube */}
      <g className="cf-cube">
        <rect x={fx - 14} y={fy + fs + 10} width={fs + 28} height={70} fill="url(#cf-ref)" className="cf-reflect" />
        <rect x={bx} y={by} width={fs} height={fs} className="cf-back" />
        <path d={`M${bx} ${by + fs} L${fx} ${fy + fs} M${bx} ${by + fs} V${by}`} className="cf-edge back" />
        <path d={`M${deep[0][0]} ${deep[0][1]} V${deep[2][1]} M${lit[1][0]} ${lit[1][1]} L${deep[0][0]} ${deep[0][1]} M${lit[3][0]} ${lit[3][1]} L${deep[2][0]} ${deep[2][1]} M${lit[0][0]} ${lit[0][1]} H${lit[1][0]} V${lit[3][1]} H${lit[0][0]} Z M${lit[0][0]} ${lit[0][1]} L${lit[3][0]} ${lit[3][1]}`} className="cf-wire" />
        {deep.map(([x, y], k) => <circle key={`d${k}`} cx={x} cy={y} r="2.8" className="cf-dot deep" style={{ '--n': k + 4 }} />)}
        <polygon points={pts([[bx, by], [bx + fs, by], [fx + fs, fy], [fx, fy]])} fill="url(#cf-top)" className="cf-top" />
        <polygon points={pts([[bx + fs, by], [fx + fs, fy], [fx + fs, fy + fs], [bx + fs, by + fs]])} className="cf-side" />
        <rect x={fx} y={fy} width={fs} height={fs} rx="3" fill="url(#cf-cube)" className="cf-face" />
        <path d={`M${bx} ${by} L${fx} ${fy} M${bx + fs} ${by} L${fx + fs} ${fy} M${bx} ${by} H${bx + fs}`} className="cf-edge" />
        {/* The bright nodes sit in front of the glass so they read as light inside the cube. */}
        {lit.map(([x, y], k) => (
          <g key={`l${k}`} className="cf-node" style={{ '--n': k }}>
            <circle cx={x} cy={y} r="11" className="halo" />
            <circle cx={x} cy={y} r="5" className="cf-dot" />
          </g>
        ))}
        <path d={`M${fx + 4} ${fy + 1} H${fx + fs - 4} M${fx + fs} ${fy + 4} V${fy + fs - 4}`} className="cf-shine" />
        <ellipse cx={fx + fs / 2} cy={fy + fs + 1} rx={fs * 0.46} ry={6} className="cf-base" />
      </g>

      <CfPane x={714} y={92} w={70} h={172} skew={7} lit="left" i={2} />
      <CfPane x={813} y={112} w={64} h={154} skew={8} lit="left" i={3} />

      {/* The outcome */}
      <g className="cf-goal">
        <circle cx={1107} cy={195} r={40} className="glow" />
        {[78, 62].map((r) => <circle key={r} cx={1107} cy={195} r={r} className="ring faint" />)}
        <circle cx={1107} cy={195} r={46} className="ring dots" />
        {[26, 16].map((r) => <circle key={r} cx={1107} cy={195} r={r} className="ring" />)}
        <circle cx={1107} cy={195} r="8" className="core" />
      </g>
    </Svg>
  );
}

/* ---------- Exception Architecture ---------- */

// A faint perspective floor of lines and dots, receding to a horizon: shared by the scenes below.
function Floor({ w, h, horizon, cx, rows = 9, cols = 24, id }) {
  const lines = [];
  const dots = [];
  const depth = (k) => horizon + (h - horizon) * (k / rows) ** 1.8;
  for (let k = 1; k <= rows; k += 1) lines.push(`M0 ${depth(k).toFixed(1)} H${w}`);
  for (let c = -cols; c <= cols; c += 1) {
    const xb = cx + c * (w / cols) * 1.6;
    lines.push(`M${cx + c * 6} ${horizon} L${xb.toFixed(1)} ${h}`);
    for (let k = 2; k <= rows; k += 2) {
      const y = depth(k);
      const x = cx + c * 6 + (xb - cx - c * 6) * ((y - horizon) / (h - horizon));
      if (x > 0 && x < w) dots.push(`M${x.toFixed(1)} ${y.toFixed(1)}h0`);
    }
  }
  return (
    <>
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
        </linearGradient>
        <mask id={`${id}-floor`}><rect x="0" y={horizon} width={w} height={h - horizon} fill={`url(#${id}-fade)`} /></mask>
      </defs>
      <g mask={`url(#${id}-floor)`}>
        <path d={lines.join(' ')} className="ex-floor" />
        <path d={dots.join('')} className="ex-floor-dots" />
      </g>
    </>
  );
}

// Exception Architecture hero: the happy path rises easily, but it runs through a widening row of
// cases standing like panes of glass; the line of light wanders through them to its outcome.
function HappyPath() {
  const panes = Array.from({ length: 8 }, (_, k) => ({ x: 214 + k * 80, base: 396 - k * 13, h: 70 + k * 34, w: 50, skew: -10 - k }));
  const path = through([[40, 430], [150, 400], [260, 352], [350, 290], [430, 236], [505, 208], [575, 214], [640, 246], [700, 262], [760, 238], [815, 186], [852, 146]]);
  const pts2 = Array.from({ length: 160 }, (_, n) => path(n / 159));
  const d = line(pts2);
  const end = pts2[pts2.length - 1];
  const moving = !still();
  return (
    <Svg w={892} h={441}>
      <defs>
        <linearGradient id="hp-glass" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#8fcbff" stopOpacity="0.24" />
          <stop offset="50%" stopColor="#1f5fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0b1d52" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <Floor w={892} h={441} horizon={300} cx={560} id="hp" />
      {panes.map(({ x, base, h, w, skew }, k) => {
        const top = base - h;
        const face = `M${x} ${base} V${top} L${x + w} ${top + skew} V${base + skew} Z`;
        return (
          <g key={k} className="hp-pane" style={{ '--n': k }}>
            <path d={face} className="face" />
            <path d={`M${x} ${base} V${top} L${x + w} ${top + skew}`} className="rim" />
            <path d={`M${x + w} ${top + skew} V${base + skew}`} className="edge" />
            <circle cx={x + w} cy={top + skew} r="1.8" className="tip" />
          </g>
        );
      })}
      <path d={d} className="hp-line glow" />
      <path d={d} className="hp-line haze" />
      <path d={d} className="hp-line core" />
      {moving && [0, 1].map((k) => (
        <circle key={k} r="2.4" className="hs-dot"><animateMotion dur="5.5s" begin={`-${k * 2.75}s`} repeatCount="indefinite" path={d} /></circle>
      ))}
      <g className="hp-end">
        <circle cx={end[0]} cy={end[1]} r="16" className="halo" />
        <circle cx={end[0]} cy={end[1]} r="5" className="core" />
      </g>
    </Svg>
  );
}

// Small line icons for the case tiles, drawn about (0, 0).
const CASE_ICONS = {
  doc: <><path d="M-11 -15 H5 L12 -8 V15 H-11 Z" /><path d="M5 -15 V-8 H12 M-5 -3 H6 M-5 3 H6 M-5 9 H2" /></>,
  db: <><ellipse cx="0" cy="-10" rx="12" ry="4.5" /><path d="M-12 -10 V10 A12 4.5 0 0 0 12 10 V-10 M-12 -3 A12 4.5 0 0 0 12 -3 M-12 4 A12 4.5 0 0 0 12 4" /></>,
  net: <><circle cx="-8" cy="-9" r="4" /><circle cx="9" cy="-4" r="4" /><circle cx="-4" cy="10" r="4" /><circle cx="10" cy="11" r="3" /><path d="M-5 -6 L6 -5 M-7 -5 L-5 6 M7 -1 L-1 8 M0 11 H7" /></>,
  people: <><circle cx="-5" cy="-6" r="5" /><circle cx="8" cy="-4" r="4" /><path d="M-15 11 A10 8 0 0 1 5 11 Z M4 3 A8 7 0 0 1 16 11 H7" /></>,
  shield: <><path d="M0 -14 L12 -7 V7 L0 14 L-12 7 V-7 Z" className="fill" /><path d="M-5 0 L-1 4 L6 -4" className="tick" /></>,
};

// A reason for AI beyond speed: the case passes from records to data to people, each a glass tile,
// joined by dotted links, with arcs of context reaching over them to the decision at the end.
function CaseChain() {
  // Tiles: [icon, x, y], each a pane of the site's glass leaning back a little.
  const T = { w: 86, h: 118, skew: 14 };
  const tiles = [['doc', 60, 172], ['db', 210, 158], ['net', 360, 144], ['people', 510, 130], ['shield', 660, 116]];
  const top = ([, x, y]) => [x + T.w / 2, y + T.skew / 2 - 4];
  const mid = ([, x, y]) => [x + T.w / 2, y + T.h / 2 + T.skew / 2];
  const [n2, n4] = [top(tiles[2]), top(tiles[4])];
  const arcA = `M${tiles[0][1] + 64} ${tiles[0][2] + 8} C170 40 300 14 ${n2[0]} ${n2[1]}`;
  const arcB = `M${n2[0]} ${n2[1]} C470 -10 560 0 600 50 S660 ${n4[1] - 6} ${n4[0]} ${n4[1]}`;
  const arcC = `M${tiles[1][1] + 52} ${tiles[1][2] + 6} C300 70 340 104 ${n2[0]} ${n2[1]}`;
  const [rx, ry] = mid(tiles[4]);
  const face = (x, y) => `M${x} ${y + 7} Q${x} ${y} ${x + 7} ${y + 1} L${x + T.w - 7} ${y + T.skew - 1} Q${x + T.w} ${y + T.skew} ${x + T.w} ${y + T.skew + 7}`
    + ` V${y + T.skew + T.h - 7} Q${x + T.w} ${y + T.skew + T.h} ${x + T.w - 7} ${y + T.skew + T.h - 1} L${x + 7} ${y + T.h + 1} Q${x} ${y + T.h} ${x} ${y + T.h - 7} Z`;
  const moving = !still();
  return (
    <Svg w={800} h={330}>
      <defs>
        {/* The site's glass: a cool translucent fill, lighter at the top left. */}
        <linearGradient id="cc-glass" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#6eaaff" stopOpacity="0.12" />
        </linearGradient>
        {/* Hot glass: the same pane lit from within. */}
        <linearGradient id="cc-hot" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#a0d4ff" stopOpacity="0.46" />
          <stop offset="50%" stopColor="#3f8cff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1f5fff" stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id="cc-ref" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f8cff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3f8cff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Floor w={800} h={330} horizon={165} cx={450} rows={8} id="cc" />
      {[[24, 50, 250], [140, 16, 220], [560, 6, 150], [772, 30, 210]].map(([x, y1, y2], n) => (
        <line key={x} x1={x} x2={x} y1={y1} y2={y2} className="cc-streak" style={{ '--n': n }} />
      ))}
      <path d={arcA} className="cc-arc" />
      <path d={arcC} className="cc-arc dots" />
      <path d={arcB} className="cc-arc" />
      {[[110, 70], [170, 36], [262, 22], [470, 14], [552, 30]].map(([x, y], n) => <circle key={x} cx={x} cy={y} r="2.2" className="cc-bead" style={{ '--n': n }} />)}
      {/* Rings of attention around the decision */}
      {[86, 68, 52].map((r, k) => <ellipse key={r} cx={rx} cy={ry} rx={r} ry={r * 1.05} className={`cc-ring${k === 1 ? ' dots' : ''}`} />)}
      {/* Dotted links between the tiles */}
      {tiles.slice(0, -1).map((t, k) => {
        const [x1, y1] = mid(t);
        const [x2, y2] = mid(tiles[k + 1]);
        return <path key={k} d={`M${x1 + T.w / 2 + 8} ${y1 + 4} L${x2 - T.w / 2 - 8} ${y2 - 4}`} className="cc-link" />;
      })}
      {tiles.map(([icon, x, y], k) => {
        const hot = icon === 'shield';
        return (
          <g key={icon} className={`cc-tile${hot ? ' hot' : ''}`} style={{ '--n': k }}>
            <path d={`M${x - 2} ${y + T.h + T.skew + 12} h${T.w + 4} l0 52 h-${T.w + 4} Z`} className="reflect" />
            <path d={face(x, y)} className="base" />
            <path d={face(x, y)} fill={`url(#${hot ? 'cc-hot' : 'cc-glass'})`} className="face" />
            <path d={`M${x + 8} ${y + 1.5} L${x + T.w - 8} ${y + T.skew - 1.5}`} className="rim" />
            <path d={`M${x + T.w} ${y + T.skew + 8} V${y + T.skew + T.h - 8}`} className="edge" />
            <g transform={`translate(${x + T.w / 2} ${y + T.h / 2 + T.skew / 2}) scale(1.35)`} className="ico">{CASE_ICONS[icon]}</g>
          </g>
        );
      })}
      {[n2, n4].map(([x, y]) => (
        <g key={x} className="cc-node"><circle cx={x} cy={y} r="10" className="halo" /><circle cx={x} cy={y} r="3.8" className="core" /></g>
      ))}
      {moving && [arcA, arcB].map((p, k) => (
        <circle key={k} r="2.4" className="hs-dot"><animateMotion dur="4.5s" begin={`-${k * 2.2}s`} repeatCount="indefinite" path={p} /></circle>
      ))}
    </Svg>
  );
}

/* ---------- Technology ---------- */

// The two marks in the stack that are not third-party brands, drawn in the site's own blue.
const StackGlyph = ({ kind }) => (
  <svg viewBox="0 0 40 40" className="ts-glyph" aria-hidden="true">
    {kind === 'agent' ? (
      <>
        <path d="M20 3 L35 11.5 V28.5 L20 37 L5 28.5 V11.5 Z" className="hex" />
        <circle cx="20" cy="17" r="5.5" className="ink" />
        <path d="M11.5 29 a8.5 7 0 0 1 17 0 Z" className="ink" />
        <path d="M12 18 a8 8 0 0 1 16 0 M12 18 v3 M28 18 v3" className="line" />
      </>
    ) : (
      <>
        <ellipse cx="20" cy="9" rx="13" ry="5" className="top" />
        <path d="M7 9 V31 A13 5 0 0 0 33 31 V9" className="body" />
        <path d="M7 16.5 A13 5 0 0 0 33 16.5 M7 24 A13 5 0 0 0 33 24" className="line" />
      </>
    )}
  </svg>
);

// Technology hero: the three layers as panes of glass, each carrying the tools it connects, with the
// orchestration spiralling around them.
const STACK = [
  { title: 'User experience', items: ['People', 'Teams', 'Applications'], logos: [['teams', 'Microsoft Teams'], ['agent'], ['slack', 'Slack']] },
  { title: 'Agentic layer', items: ['Models', 'Tools', 'Guardrails'], logos: [['openai', 'OpenAI'], ['meta', 'Meta'], ['anthropic', 'Anthropic'], ['gemini', 'Google Gemini']] },
  { title: 'Enterprise layer', items: ['Data', 'Systems', 'Security'], logos: [['db'], ['salesforce', 'Salesforce'], ['sap', 'SAP'], ['oracle', 'Oracle'], ['microsoft', 'Microsoft']] },
];
// The three layers as panes of glass, with lit rings far wider than the stack.
function TechStack() {
  // Rings run in the gaps between the layers and reach well beyond them: [cx, cy, rx, ry, tilt].
  const rings = [[300, 116, 336, 60, -6], [300, 284, 336, 62, -6]];
  const [top, step] = [18, 170];
  const half = ([cx, cy, rx, ry], sweep) => `M${cx - rx} ${cy} A${rx} ${ry} 0 0 ${sweep} ${cx + rx} ${cy}`;
  const tilt = ([cx, cy, , , r]) => `rotate(${r} ${cx} ${cy})`;
  const ends = rings.flatMap(([cx, cy, rx, , r]) => {
    const [s, k] = [Math.sin((r * Math.PI) / 180), Math.cos((r * Math.PI) / 180)];
    return [[cx - rx * k, cy - rx * s], [cx + rx * k, cy + rx * s]];
  });
  // Light pillars rising from the floor on both sides, and sparks scattered across it.
  const pillars = [];
  for (let k = 0; k < 6; k += 1) {
    pillars.push([-20 + k * 13, 520 - 50 - ((k * 37) % 110)]);
    pillars.push([620 - k * 13, 520 - 56 - ((k * 53) % 120)]);
  }
  const sparks = Array.from({ length: 20 }, (_, n) => [(n * 97) % 680 - 40, 452 + ((n * 41) % 90)]);
  const floor = [];
  for (let k = -14; k <= 14; k += 1) floor.push(`M${300 + k * 26} 440 L${300 + k * 110} 600`);
  [452, 474, 504, 546, 600].forEach((y) => floor.push(`M-80 ${y} H680`));
  const guides = [...new Set(ends.map(([x]) => Math.round(x)))];
  const moving = !still();
  return (
    <>
      <Svg w={600} h={520}>
        <defs>
          <radialGradient id="ts-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f5fff" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#1f5fff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1f5fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ts-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
          </linearGradient>
          <mask id="ts-floor"><rect x="-80" y="430" width="760" height="170" fill="url(#ts-fade)" /></mask>
        </defs>
        <ellipse cx="300" cy="250" rx="420" ry="300" fill="url(#ts-bg)" />
        <g mask="url(#ts-floor)">
          <path d={floor.join(' ')} className="ts-floor" />
          {sparks.map(([x, y], n) => <circle key={n} cx={x} cy={y} r={n % 5 ? 1.2 : 2} className="ts-floor-spark" style={{ '--n': n % 9 }} />)}
        </g>
        {pillars.map(([x, y1], n) => <line key={n} x1={x} x2={x} y1={y1} y2={530} className="ts-pillar" style={{ '--n': n % 9 }} />)}
        {/* Dotted guides framing the stack, dropping from the ends of the rings to the floor. */}
        {guides.map((x) => <line key={x} x1={x} x2={x} y1={60} y2={500} className="ts-guide" />)}
        {/* The far half of each ring runs behind the layers. */}
        {rings.map((r) => <path key={r[1]} d={half(r, 1)} transform={tilt(r)} className="ts-ring back" />)}
        {moving && rings.map((r, k) => (
          <circle key={r[1]} r="2.6" className="hs-dot" transform={tilt(r)}><animateMotion dur="6s" begin={`-${k * 2}s`} repeatCount="indefinite" path={half(r, 1)} /></circle>
        ))}
      </Svg>
      <div className="ts-stack">
        {STACK.map((layer, i) => (
          <div key={layer.title} className={`ts-panel${i === STACK.length - 1 ? ' last' : ''}`} style={{ '--i': i, top: top + i * step }}>
            <strong>{layer.title}</strong>
            {layer.items && <span className="ts-items">{layer.items.map((t, k) => <span key={t}>{k > 0 && <i>·</i>}{t}</span>)}</span>}
            <span className="ts-logos">
              {layer.logos.map(([id, name]) => (
                <span key={id} className="ts-tile">
                  {name ? <img src={`/svg/logos/${id}.svg`} alt={name} className={`ts-logo ${id}`} /> : <StackGlyph kind={id === 'agent' ? 'agent' : 'db'} />}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
      {/* The near half of each ring passes in front of the layers. */}
      <svg className="hs-svg ts-front" viewBox="0 0 600 520" aria-hidden="true">
        {rings.map((r) => <path key={r[1]} d={half(r, 0)} transform={tilt(r)} className="ts-ring glow" />)}
        {rings.map((r) => <path key={r[1]} d={half(r, 0)} transform={tilt(r)} className="ts-ring" />)}
        {moving && rings.map((r, k) => (
          <circle key={r[1]} r="3" className="hs-dot" transform={tilt(r)}><animateMotion dur="6s" begin={`-${k * 2 + 3}s`} repeatCount="indefinite" path={half(r, 0)} /></circle>
        ))}
        {ends.map(([x, y], n) => <g key={`${x}-${y}`} className="ts-node" style={{ '--n': n }}><circle cx={x} cy={y} r="11" className="halo" /><circle cx={x} cy={y} r="4.2" className="core" /></g>)}
      </svg>
    </>
  );
}

// Small marks for the hub tiles that are not third-party brands, in the site's blue.
const HubGlyph = ({ kind }) => (
  <svg viewBox="0 0 40 40" className="hb-glyph" aria-hidden="true">
    <defs>
      <linearGradient id={`hb-g-${kind}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8fcbff" />
        <stop offset="1" stopColor="#1f5fff" />
      </linearGradient>
    </defs>
    {kind === 'cloud' && <><path d="M12 30 a8 8 0 0 1 -1 -15.9 a10 10 0 0 1 19.3 3 a6.5 6.5 0 0 1 -0.8 12.9 Z" fill={`url(#hb-g-${kind})`} /><path d="M20 15 L25.5 25 H14.5 Z" fill="#fff" /></>}
    {kind === 'cube' && <><path d="M20 5 L34 12.5 V27.5 L20 35 L6 27.5 V12.5 Z" fill={`url(#hb-g-${kind})`} /><path d="M20 5 V20 M6 12.5 L20 20 L34 12.5 M20 20 V35" className="edge" /><path d="M13 16 L20 12 L27 16 V24 L20 28 L13 24 Z" className="edge" /></>}
    {kind === 'user' && <><circle cx="20" cy="20" r="15" fill={`url(#hb-g-${kind})`} /><circle cx="20" cy="16" r="5" fill="#fff" /><path d="M11.5 29 a8.5 7 0 0 1 17 0" fill="#fff" /></>}
    {kind === 'list' && <path d="M8 11 H32 M8 20 H32 M8 29 H24" stroke={`url(#hb-g-${kind})`} strokeWidth="5" strokeLinecap="round" />}
    {kind === 'gear' && <><path d="M20 4 l3 4.5 5.2-1.4 1 5.3 5.2 1.5 -1.6 5.1 3.6 4 -4.4 3 1 5.3 -5.3.6 -1.7 5.1 -5-2 -4 3.6 -3-4.4 -5.3 .9 -.5-5.3 -5.1-1.7 2-5 -3.6-4 4.4-3 -.9-5.3 5.3-.5 1.7-5.1 5 2 Z" fill={`url(#hb-g-${kind})`} transform="translate(20 20) scale(0.92) translate(-20 -20)" /><circle cx="20" cy="20" r="5.5" fill="#06122e" /></>}
    {kind === 'tree' && <><circle cx="20" cy="9" r="4" fill="none" stroke={`url(#hb-g-${kind})`} strokeWidth="2.6" /><path d="M20 13 V20 M10 27 V20 H30 V27" fill="none" stroke={`url(#hb-g-${kind})`} strokeWidth="2.6" /><circle cx="10" cy="30" r="3.5" fill="#8fcbff" /><circle cx="20" cy="30" r="3.5" fill="#8fcbff" /><circle cx="30" cy="30" r="3.5" fill="#8fcbff" /></>}
  </svg>
);

// The architecture principle: Intellient at the centre, wired to the applications people use, the models
// and tools it can call, the enterprise's data and systems, and the orchestration of agents. Each sits on
// its own glass panel, so no one vendor sets the shape of the whole.
const HUB = [
  { title: 'Your applications', side: 'l', y: 96, tiles: [['teams', 'Microsoft Teams'], ['slack', 'Slack'], ['cloud'], ['cube']] },
  { title: 'Enterprise data and systems', side: 'l', y: 386, tiles: [['salesforce', 'Salesforce'], ['sap', 'SAP'], ['oracle', 'Oracle'], ['microsoft', 'Microsoft']] },
  { title: 'Models and tools', side: 'r', y: 96, tiles: [['openai', 'OpenAI'], ['meta', 'Meta'], ['anthropic', 'Anthropic'], ['gemini', 'Google Gemini']] },
  { title: 'Agent orchestration', side: 'r', y: 386, tiles: [['user'], ['list'], ['gear'], ['tree']] },
];
function Hub() {
  const [cx, cy, r] = [500, 290, 92];
  // Two fine lit wires from each panel's inner edge into the orb: start, end.
  const wires = [
    [[350, 162], [cx - r * 0.8, cy - r * 0.6]],
    [[350, 452], [cx - r * 0.8, cy + r * 0.6]],
    [[650, 162], [cx + r * 0.8, cy - r * 0.6]],
    [[650, 452], [cx + r * 0.8, cy + r * 0.6]],
  ];
  const pair = ([x1, y1], [x2, y2]) => [-4, 4].map((o) => {
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y1 + o} C${mx} ${y1 + o} ${mx} ${y2 + o * 0.6} ${x2} ${y2 + o * 0.4}`;
  });
  const moving = !still();
  return (
    <>
      <Svg w={1000} h={620}>
        <defs>
          <radialGradient id="hb-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f5fff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1f5fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={cx} cy={cy} rx="420" ry="280" fill="url(#hb-bg)" />
        {/* A quiet floor: rings spreading out beneath the orb. */}
        {[120, 220, 340].map((rx, k) => <ellipse key={rx} cx={cx} cy="470" rx={rx} ry={rx * 0.18} className={`hb-floor${k ? ' dash' : ''}`} />)}
        {wires.map(([a, b], w) => pair(a, b).map((d, k) => (
          <g key={`${w}-${k}`}>
            <path d={d} className={`hb-wire${k ? '' : ' lit'}`} />
            {moving && k === 0 && <circle r="2.4" className="hs-dot"><animateMotion dur="3.2s" begin={`-${w * 0.8}s`} repeatCount="indefinite" path={d} /></circle>}
          </g>
        )))}
        {wires.map(([[x1, y1], [x2, y2]], n) => (
          <g key={n}>
            <circle cx={x1} cy={y1} r="3" className="hb-end" />
            <circle cx={x2} cy={y2} r="3" className="hb-end" />
          </g>
        ))}
      </Svg>
      {/* The centre: the site's liquid-glass orb carrying the Intellient mark. */}
      <div className="hb-orb" style={{ left: cx, top: cy, width: r * 2, height: r * 2 }}>
        <span className="hb-orb-glow" aria-hidden="true" />
        <div className="orb-glass hb-orb-glass">
          <span className="orb-swirl" aria-hidden="true" />
          <span className="orb-swirl two" aria-hidden="true" />
          <div className="hb-orb-body">
            <svg viewBox="0 0 216 216" className="hb-mark" aria-hidden="true">
              <path d="M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818" />
              <path d="M149.331 49.43c3.878-5.725 11.784-7.192 16.743-2.374a83.9 83.9 0 0 1 16.658 22.862c6.146 12.379 9.2 26.125 8.889 40.01s-3.978 27.473-10.672 39.549a83.6 83.6 0 0 1-17.652 22.045c-5.177 4.588-13.01 2.758-16.626-3.138-3.507-5.719-1.682-13.113 3.088-17.831a59 59 0 0 0 10.101-13.342 60.26 60.26 0 0 0 7.516-27.853 60.35 60.35 0 0 0-6.261-28.178 59.2 59.2 0 0 0-9.517-13.83c-4.543-4.92-6.025-12.376-2.267-17.92" />
              <path d="M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z" />
              <rect width="20.488" height="57.366" x="97.293" y="122.341" rx="10.244" />
            </svg>
            <span className="hb-word">Intellient</span>
          </div>
        </div>
      </div>
      {HUB.map((p, i) => (
        <div key={p.title} className={`hb-panel ${p.side}`} style={{ '--i': i, top: p.y }}>
          <strong>{p.title}</strong>
          <div className="hb-tiles">
            {p.tiles.map(([id, name]) => (
              <span key={id} className="hb-tile">
                {name ? <img src={`/svg/logos/${id}.svg`} alt={name} className={`hb-logo ${id}`} /> : <HubGlyph kind={id} />}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ---------- Intellient Blueprint ---------- */

// Blueprint hero: what the operation already knows (its data, documents, people, systems and measures)
// is drawn together through the audit into one Blueprint that answers four questions.
const BP_SOURCES = [
  ['Business data', 'CRM · ERP · Databases', Database],
  ['Documents', 'Policies · SOPs · Knowledge', FileText],
  ['People & experience', 'Teams · Expertise · Decisions', UsersThree],
  ['Systems & tools', 'Apps · Configurations · Access', Gear],
  ['Measurements', 'Metrics · KPIs · Outcomes', ChartBar],
];
const BP_ROWS = [
  ['Outcome', 'What should change?', Target],
  ['Operating reality', 'Where are we today?', FileText],
  ['Future state', 'What will this work look like?', TreeStructure],
  ['Value baseline', 'How will we measure it?', ChartBar],
];
function Funnel() {
  // The audit column's steps sit 90 apart; the wires all meet at the second, the hub.
  const hub = [437, 300];
  const ys = BP_SOURCES.map((_, k) => 104 + k * 98);
  const wires = ys.map((y) => `M292 ${y} C352 ${y} 360 ${hub[1]} 404 ${hub[1]}`);
  const moving = !still();
  return (
    <div className="bp-3d">
      <Svg w={1000} h={600}>
        <defs>
          <radialGradient id="bp-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f5fff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1f5fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bp-orbit" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3f8cff" stopOpacity="0" />
            <stop offset="0.25" stopColor="#3f8cff" />
            <stop offset="0.75" stopColor="#3f8cff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#8fcbff" />
          </linearGradient>
        </defs>
        <ellipse cx="640" cy="300" rx="460" ry="300" fill="url(#bp-bg)" />
        {/* An orbit of light sweeping around the whole scene */}
        <path d="M-40 470 A540 105 0 0 0 1040 450" className="bp-arc" stroke="url(#bp-orbit)" />
        {wires.map((d, k) => (
          <g key={d}>
            <path d={d} className="bp-wire glow" />
            <path d={d} className={`bp-wire${k === 2 ? ' lit' : ''}`} />
            {moving && <circle r="2.6" className="hs-dot"><animateMotion dur="2.6s" begin={`-${k * 0.5}s`} repeatCount="indefinite" path={d} /></circle>}
          </g>
        ))}
        {ys.map((y) => <circle key={y} cx="292" cy={y} r="3.4" className="bp-end" />)}
        {/* The audit beam: from the hub through the panes into the Blueprint */}
        <path d={`M${hub[0]} ${hub[1]} H612`} className="bp-beam glow" />
        <path d={`M${hub[0]} ${hub[1]} H612`} className="bp-beam" />
        {[0, 1, 2].map((k) => <circle key={k} cx={512 + k * 26} cy={hub[1]} r="3.4" className="bp-end" />)}
      </Svg>
      {/* Sources, each a glass card with a ghost of itself behind */}
      {BP_SOURCES.map(([t, s, Icon], k) => (
        <div key={t} className="bp-source" style={{ top: ys[k] - 37, '--i': k }}>
          <span className="bp-ico fill"><Icon weight="fill" /></span>
          <span><strong>{t}</strong><em>{s}</em></span>
        </div>
      ))}
      {/* The audit: a column of steps, the second lit where the wires meet */}
      <div className="bp-col">
        {[FileText, TreeStructure, Gear, ChartBar].map((Icon, k) => <span key={k} className={`bp-ico${k === 1 ? ' hot' : ''}`}><Icon weight="duotone" /></span>)}
      </div>
      {/* Panes the beam passes through, each with a column of points */}
      {[0, 1, 2].map((k) => <span key={k} className="bp-strip" style={{ left: 494 + k * 26, '--k': k }} />)}
      {/* The plinth, the panes stacked behind the Blueprint, and the Blueprint */}
      <span className="bp-plinth" />
      {[2, 1].map((k) => <span key={k} className="bp-pane" style={{ '--k': k }} />)}
      <div className="bp-panel">
        <span className="bp-kicker">AIR Audit / Blueprint</span>
        {BP_ROWS.map(([t, q, Icon]) => (
          <div key={t} className="bp-row">
            <span className="bp-ring"><Icon weight="bold" /></span>
            <span><strong>{t}</strong><em>{q}</em></span>
            <CaretRight className="bp-caret" weight="bold" />
          </div>
        ))}
      </div>
    </div>
  );
}

// A new workflow that remains optional: today's competing paths, soft bands of light drifting across one
// another, silver turning blue, are drawn together into one bright line that dips, rises and runs on to
// the future state. Drawn on the reference's own 2000 x 729.
function Optional() {
  // Strands draw together gradually, as a tapering bundle, and arrive along the line where it begins.
  const join = [1010, 502];
  const STRANDS = [
    [[-40, 262], [300, 280], [520, 336], [700, 400], [820, 440], [910, 472], join],
    [[-40, 300], [380, 322], [620, 356], [780, 412], [870, 452], [920, 478], join],
    [[-40, 340], [300, 346], [520, 392], [720, 434], [850, 466], [920, 486], join],
    [[-40, 486], [250, 490], [460, 444], [640, 396], [770, 420], [880, 470], [930, 492], join],
    [[-40, 562], [300, 576], [560, 524], [760, 478], [870, 490], [930, 498], join],
    [[-40, 604], [400, 598], [690, 546], [840, 512], [930, 506], join],
  ].map((cps) => line(Array.from({ length: 180 }, (_, n) => through(cps)(n / 179))));
  // The executable line: an ease into the dip, then a single S-curve that levels out at the arrow.
  const main = 'M1010 502 C1036 507 1060 508 1096 508 C1334 508 1370 392 1600 390';
  // Lines of light standing on the floor: [x, top, foot].
  const pins = [[337, 481, 598], [443, 308, 400], [564, 486, 578], [668, 298, 405], [771, 313, 425], [931, 330, 455], [1017, 418, 485], [1157, 457, 525], [1208, 362, 470], [1399, 486, 585], [1577, 518, 590], [1722, 483, 582]];
  const floor = [];
  for (let k = -36; k <= 36; k += 1) floor.push(`M${1000 + k * 24} 545 L${1000 + k * 180} 729`);
  [550, 562, 580, 606, 642, 692].forEach((y) => floor.push(`M0 ${y} H2000`));
  const moving = !still();
  return (
    <Svg w={2000} h={729}>
      <defs>
        <linearGradient id="op-tone" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
          <stop offset="0" stopColor="#e9f6ff" stopOpacity="0.35" />
          <stop offset="0.3" stopColor="#e9f6ff" />
          <stop offset="0.6" stopColor="#8fcbff" />
          <stop offset="0.85" stopColor="#3f8cff" />
          <stop offset="1" stopColor="#3f8cff" />
        </linearGradient>
        <linearGradient id="op-core" gradientUnits="userSpaceOnUse" x1="960" y1="0" x2="1110" y2="0">
          <stop offset="0" stopColor="#e9f6ff" stopOpacity="0" />
          <stop offset="1" stopColor="#e9f6ff" />
        </linearGradient>
        <radialGradient id="op-floor" cx="0.5" cy="0" r="0.6">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="op-floor-m"><rect x="0" y="545" width="2000" height="184" fill="url(#op-floor)" /></mask>
        <radialGradient id="op-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#1f5fff" stopOpacity="0.75" />
          <stop offset="0.45" stopColor="#1f5fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#1f5fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Floor: a pool of blue light spreading from beneath the line, and the grid */}
      <ellipse cx="1000" cy="580" rx="1000" ry="150" fill="url(#op-pool)" />
      <path d={floor.join(' ')} className="op-floor" mask="url(#op-floor-m)" />
      {pins.map(([x, y1, y2], k) => (
        <g key={x} className="op-pin" style={{ '--n': k % 7 }}>
          <line x1={x} x2={x} y1={y1} y2={y2} />
          <circle cx={x} cy={y1} r="4" />
        </g>
      ))}
      <circle cx="1610" cy="385" r="118" className="op-halo-ring" />
      {/* The strands: soft bands of light, each with a bright thread at its heart */}
      <ellipse cx="930" cy="488" rx="170" ry="46" className="op-merge" />
      {STRANDS.map((d) => <path key={`w${d}`} d={d} className="op-band wide" />)}
      {STRANDS.map((d) => <path key={`m${d}`} d={d} className="op-band" />)}
      {STRANDS.map((d) => <path key={d} d={d} className="op-thread" />)}
      {/* The executable line */}
      <path d={main} className="op-main glow" />
      <path d={main} className="op-main haze" />
      <path d={main} className="op-main" stroke="url(#op-core)" />
      <path d="M1598 362 L1652 390 L1598 418 Z" className="op-head" />
      {moving && [0, 1].map((k) => <circle key={k} r="4" className="hs-dot"><animateMotion dur="5s" begin={`-${k * 2.5}s`} repeatCount="indefinite" path={main} /></circle>)}
      {/* Labels */}
      <line x1="72" x2="72" y1="420" y2="462" className="op-drop" />
      <circle cx="72" cy="409" r="8" className="op-start" />
      <text x="104" y="420" className="op-label">TODAY</text>
      <text x="104" y="452" className="op-sub">(Optional path)</text>
      <text x="1700" y="384" className="op-label hot">FUTURE STATE</text>
      <text x="1700" y="418" className="op-sub">(Executable design)</text>
    </Svg>
  );
}

// The customer owns the Blueprint: the design as a set of files the customer holds, with the five things
// it settles checked off, standing on a lit ring.
function Owner() {
  const checks = ['Outcome', 'Workflow', 'Authority', 'Architecture', 'Measurement'];
  const boxes = [[101, 18], [11, 86], [101, 86], [191, 86], [101, 122]];
  return (
    <>
      <Svg w={1000} h={520}>
        <defs>
          <radialGradient id="ow-floor" cx="0.5" cy="0.3" r="0.55">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ow-floor-m"><rect x="0" y="420" width="1000" height="140" fill="url(#ow-floor)" /></mask>
          <radialGradient id="ow-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f5fff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1f5fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="500" cy="300" rx="480" ry="240" fill="url(#ow-bg)" />
        {/* Floor: a grid fading out from the platform */}
        <path d={[
          ...Array.from({ length: 33 }, (_, k) => `M${500 + (k - 16) * 22} 430 L${500 + (k - 16) * 120} 560`),
          ...[438, 452, 472, 500, 540].map((y) => `M0 ${y} H1000`),
        ].join(' ')} className="ow-floor" mask="url(#ow-floor-m)" />
        <ellipse cx="500" cy="458" rx="440" ry="40" className="ow-ring dash" />
        <ellipse cx="500" cy="448" rx="390" ry="34" className="ow-ring glow" />
        <ellipse cx="500" cy="448" rx="390" ry="34" className="ow-ring" />
        <ellipse cx="500" cy="441" rx="352" ry="27" className="ow-ring inner" />
        <ellipse cx="500" cy="436" rx="314" ry="21" className="ow-ring faint" />
        {/* Fine lines joining the design, the customer who holds it and what it settles */}
        <path d="M444 240 H452 M548 240 H558" className="ow-link" />
        {[[56, 230, 452], [100, 300, 456], [900, 300, 456], [944, 230, 452]].map(([x, y1, y2], k) => (
          <g key={x} className="op-pin" style={{ '--n': k }}><line x1={x} x2={x} y1={y1} y2={y2} /><circle cx={x} cy={y1} r="3.4" /></g>
        ))}
      </Svg>
      {/* The files, fanned behind the front one */}
      {[2, 1].map((k) => <span key={k} className="ow-file back" style={{ left: 140 + k * 12, top: 100 - k * 12, '--k': k }} />)}
      <div className="ow-file front">
        <span className="ow-tab" />
        <strong>BLUEPRINT</strong>
        <svg viewBox="0 0 260 150" className="ow-flow" aria-hidden="true">
          <path d="M130 44 V86 M69 99 H101 M159 99 H191 M130 112 V122 M101 31 H40 V86 M159 31 H220 V86 M40 112 V135 H101 M220 112 V135 H159" className="link" />
          {boxes.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="58" height="26" rx="5" className="box" />)}
          <circle cx="40" cy="135" r="3.5" className="node" /><circle cx="220" cy="135" r="3.5" className="node" />
        </svg>
      </div>
      <div className="ow-person"><User weight="fill" /></div>
      <div className="ow-list">
        {checks.map((c) => (
          <div key={c} className="ow-row"><span className="ow-check"><Check weight="bold" /></span>{c}<CaretRight className="bp-caret" weight="bold" /></div>
        ))}
      </div>
    </>
  );
}

/* ---------- AIR Audit ---------- */

// AIR Audit hero: the audit at the centre, the questions it asks on one side and the insight it produces
// on the other, three panes of glass standing on a lit ring.
const AA_ROWS = ['Outcome', 'Operating reality', 'Future state', 'Value baseline'];
function AuditPanels() {
  const bars = [44, 60, 96, 56, 84, 132];
  return (
    <div className="aa-3d">
      <Svg w={1000} h={600}>
        <defs>
          <radialGradient id="aa-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#1f5fff" stopOpacity="0.32" />
            <stop offset="1" stopColor="#1f5fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="520" cy="320" rx="480" ry="300" fill="url(#aa-bg)" />
        <ellipse cx="510" cy="520" rx="420" ry="56" className="aa-ring glow" />
        <ellipse cx="510" cy="520" rx="420" ry="56" className="aa-ring" />
        <ellipse cx="510" cy="514" rx="376" ry="44" className="aa-ring inner" />
        <ellipse cx="510" cy="530" rx="452" ry="68" className="aa-ring dash" />
      </Svg>
      {/* Panes standing behind the three panels */}
      <span className="aa-pane back l" />
      <span className="aa-pane back r" />
      <div className="aa-pane side l">
        <span className="aa-kicker">Questions</span>
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className={`aa-q${k ? '' : ' on'}`}>
            <span className="box">{!k && <Check weight="bold" />}</span>
            <i style={{ width: `${[70, 56, 78, 50][k]}%` }} />
          </span>
        ))}
      </div>
      <div className="aa-pane side r">
        <span className="aa-kicker">Insights</span>
        <span className="aa-chart">
          {bars.map((h, k) => <i key={k} style={{ height: h, '--k': k }} />)}
        </span>
      </div>
      <div className="aa-pane front">
        <span className="aa-kicker big">AIR Audit</span>
        {AA_ROWS.map((t) => (
          <div key={t} className="aa-row">
            <span className="aa-tick"><Check weight="bold" /></span>
            <strong>{t}</strong>
            <CaretRight className="bp-caret" weight="bold" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Why an audit comes first: the loose starting points (the documented process, several stakeholders,
// scattered information) and the winding route the audit takes from them to a clear brief.
function Brief() {
  const cps = [[330, 520], [520, 470], [560, 410], [470, 360], [430, 300], [500, 240], [600, 200], [590, 140], [520, 112]];
  const at = through(cps);
  const d = line(Array.from({ length: 160 }, (_, n) => at(n / 159)));
  const offset = (k) => line(Array.from({ length: 160 }, (_, n) => { const [x, y] = at(n / 159); return [x + k, y + k * 0.4]; }));
  const nodes = [0.08, 0.3, 0.52, 0.72, 0.9].map((t) => at(t));
  const moving = !still();
  return (
    <>
      <Svg w={640} h={540}>
        <defs>
          <radialGradient id="br-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#1f5fff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#1f5fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="470" cy="320" rx="240" ry="260" fill="url(#br-bg)" />
        {[-14, 14].map((k) => <path key={k} d={offset(k)} className="br-path faint" />)}
        <path d={d} className="br-path glow" />
        <path d={d} className="br-path" />
        {nodes.map(([x, y], k) => (
          <g key={k} className="br-node" style={{ '--n': k }}>
            <circle cx={x} cy={y} r="11" className="halo" />
            <circle cx={x} cy={y} r={k === 0 ? 6 : 4.5} className="core" />
          </g>
        ))}
        {moving && [0, 1].map((k) => <circle key={k} r="3" className="hs-dot"><animateMotion dur="4.5s" begin={`-${k * 2.25}s`} repeatCount="indefinite" path={d} /></circle>)}
      </Svg>
      {[['Current process', FileText, 168], ['Multiple stakeholders', UsersThree, 278], ['Fragmented information', Database, 388]].map(([t, Icon, y], k) => (
        <div key={t} className="br-chip" style={{ top: y, left: 30 + (k % 2) * 8 }}>
          <Icon weight="duotone" />
          <span>{t}</span>
        </div>
      ))}
      <div className="br-chip goal">
        <Flag weight="fill" />
        <span><strong>Clear brief</strong><em>for what to change</em></span>
        <CaretRight className="bp-caret" weight="bold" />
      </div>
    </>
  );
}

// The audit's route: eight steps along one winding path of light, four above it and four below, each
// joined to it by a fine line. Drawn on a 1875 x 840 stage that scales with the content width.
const ROUTE_X = [110, 555, 1006, 1452];
const ROUTE_PTS = [[1900, 396], [1452, 404], [1006, 412], [555, 420], [220, 438], [70, 495], [153, 566], [557, 573], [1006, 577], [1450, 580], [1900, 592]];
export function Route({ items }) {
  const at = through(ROUTE_PTS);
  const pts = Array.from({ length: 400 }, (_, n) => at(n / 399));
  const d = line(pts);
  // Where each step's line meets the path: the point on the path nearest its column, upper or lower run.
  const meet = (x, lower) => pts.filter(([, y]) => (lower ? y > 500 : y < 500 && y > 330)).reduce((b, p) => (Math.abs(p[0] - x) < Math.abs(b[0] - x) ? p : b));
  const nodes = [...ROUTE_X.map((x) => meet(x, false)), ...ROUTE_X.map((x) => meet(x + (x === 110 ? 43 : 0), true))];
  const moving = !still();
  return (
    <div className="rt">
      <svg className="rt-svg" viewBox="0 0 1875 840" aria-hidden="true">
        <defs>
          <linearGradient id="rt-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.8" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="rt-m"><rect x="0" y="0" width="1875" height="840" fill="url(#rt-fade)" /></mask>
        </defs>
        <g mask="url(#rt-m)">
          <path d={d} className="rt-path glow" />
          <path d={d} className="rt-path haze" />
          <path d={d} className="rt-path" />
          {moving && [0, 1, 2].map((k) => <circle key={k} r="4" className="hs-dot"><animateMotion dur="12s" begin={`-${k * 4}s`} repeatCount="indefinite" path={d} /></circle>)}
        </g>
        {/* Lines from each step to its point on the path */}
        {ROUTE_X.map((x, k) => <line key={`t${k}`} x1={x} x2={x} y1="232" y2={nodes[k][1]} className="rt-drop" />)}
        {ROUTE_X.map((x, k) => { const bx = k === 0 ? 153 : x; return <line key={`b${k}`} x1={bx} x2={bx} y1={nodes[k + 4][1]} y2="800" className="rt-drop fade" />; })}
        {ROUTE_X.map((x) => <circle key={`c${x}`} cx={x} cy="232" r="6" className="rt-cap" />)}
        {nodes.map(([x, y], k) => (
          <g key={k} className="rt-node" style={{ '--n': k }}>
            <circle cx={x} cy={y} r="18" className="halo" />
            <circle cx={x} cy={y} r="8" className="core" />
          </g>
        ))}
      </svg>
      <ol className="rt-steps">
        {items.map((it, i) => {
          const col = i % 4;
          const lower = i >= 4;
          const left = ((lower && col === 0 ? 153 : ROUTE_X[col]) + 27) / 18.75;
          return (
            <li key={it.title} className={lower ? 'low' : ''} style={{ left: `${left}%`, '--i': col }} data-reveal>
              <span className="rt-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- IntelliLink ---------- */

const LH_IN = [[106, Database], [218, Cloud], [330, FileText], [442, SquaresFour]];
const LH_OUT = [[150, User], [295, Gear], [440, ChartBar]];
// Ports: where each wire meets the cube, spread down its front edge (in) and its side edge (out).
const LH_ORB = [296, 296, 62];
const LH_IN_PORT = [262, 284, 308, 330];
const LH_OUT_PORT = [270, 296, 322];
const lhRim = (y, side) => [LH_ORB[0] + side * Math.sqrt(LH_ORB[2] ** 2 - (y - LH_ORB[1]) ** 2), y];
// A wire as a cubic from a to b, leaving and arriving level; `o` bows the two controls apart for a strand.
const lhCps = ([x1, y1], [x2, y2], o = 0) => { const m = (x1 + x2) / 2; return [[x1, y1], [m, y1 + o], [m, y2 + o], [x2, y2]]; };
const lhD = ([a, b, c, d]) => `M${a[0]} ${a[1]} C${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`;
const lhAt = ([a, b, c, d], t) => [0, 1].map((i) => (1 - t) ** 3 * a[i] + 3 * (1 - t) ** 2 * t * b[i] + 3 * (1 - t) * t * t * c[i] + t ** 3 * d[i]);
// IntelliLink hero: the systems the answer sits in (data, cloud, documents, applications) wired into one
// lit cube of glass, and out of it to the places the work is done, each action checked. Each wire is a
// small bundle: a lit core with two fine strands that part in the middle, and particles resting along it.
function LinkHub() {
  const wires = [
    ...LH_IN.map(([y], k) => [[118, y], lhRim(LH_IN_PORT[k], -1)]),
    ...LH_OUT.map(([y], k) => [lhRim(LH_OUT_PORT[k], 1), [458, y]]),
  ];
  const moving = !still();
  const floor = [
    ...Array.from({ length: 17 }, (_, k) => `M${310 + (k - 8) * 30} 384 L${310 + (k - 8) * 120} 560`),
    ...[396, 414, 440, 474, 520].map((y) => `M0 ${y} H640`),
  ].join(' ');
  return (
    <>
      <Svg w={640} h={560}>
        <defs>
          <linearGradient id="lh-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3f8cff" stopOpacity="0" />
            <stop offset="1" stopColor="#3f8cff" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="lh-floor-g" cx="0.5" cy="0.15" r="0.6">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="lh-floor-m"><rect x="0" y="370" width="640" height="190" fill="url(#lh-floor-g)" /></mask>
          <filter id="lh-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="560"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id="lh-blur" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="560"><feGaussianBlur stdDeviation="10" /></filter>
          <filter id="lh-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="560"><feGaussianBlur stdDeviation="18" /></filter>
        </defs>
        {/* A soft beam falling onto the cube, and the floor it stands on */}
        <rect x="278" y="0" width="36" height="236" fill="url(#lh-beam)" filter="url(#lh-blur)" />
        <path d={floor} className="lh-floor" mask="url(#lh-floor-m)" />
        <ellipse cx="296" cy="400" rx="160" ry="30" fill="#1f5fff" opacity="0.4" filter="url(#lh-wide)" />

        {/* Wires */}
        {wires.map(([a, b]) => <path key={`g${a}`} d={lhD(lhCps(a, b))} className="lh-wire-glow" filter="url(#lh-soft)" />)}
        {wires.map(([a, b]) => [-5, 5].map((o) => <path key={`s${a}${o}`} d={lhD(lhCps(a, b, o))} className="lh-strand" />))}
        {wires.map(([a, b]) => <path key={`c${a}`} d={lhD(lhCps(a, b))} className="lh-wire" />)}
        {wires.map(([a, b], w) => Array.from({ length: 9 }, (_, n) => {
          const [x, y] = lhAt(lhCps(a, b, n % 2 ? 5 : -5), (n + 1) / 10);
          return <circle key={`p${w}-${n}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r={n % 3 ? 1 : 1.5} className="lh-mote" style={{ '--n': (w + n) % 7 }} />;
        }))}
        {wires.map(([a, b]) => [a, b].map(([x, y]) => <circle key={`e${x}${y}`} cx={x} cy={y} r="3.2" className="lh-end" />))}
        {moving && wires.map(([a, b], k) => [0, 1].map((j) => <circle key={`m${k}${j}`} r="2" className="hs-dot"><animateMotion dur="2.8s" begin={`-${(k % 4) * 0.5 + j * 1.4}s`} repeatCount="indefinite" path={lhD(lhCps(a, b))} /></circle>))}

        {/* The ring the sphere floats above, lit like the site's other stages */}
        <ellipse cx="296" cy="398" rx="96" ry="18" className="lh-ring glow" filter="url(#lh-soft)" />
        <ellipse cx="296" cy="398" rx="96" ry="18" className="lh-ring" />
        <ellipse cx="296" cy="398" rx="70" ry="12" className="lh-ring inner" />
      </Svg>
      {/* The centre: the site's liquid-glass sphere, the IntelliLink mark set over it */}
      <div className="lh-orb" style={{ left: LH_ORB[0], top: LH_ORB[1], width: LH_ORB[2] * 2, height: LH_ORB[2] * 2 }}>
        <span className="lh-orb-glow" aria-hidden="true" />
        <div className="orb-glass lh-orb-glass">
          <span className="orb-swirl" aria-hidden="true" />
          <span className="orb-swirl two" aria-hidden="true" />
        </div>
        <img src="/svg/intellilink.svg" alt="" className="lh-logo" />
      </div>
      {LH_IN.map(([y, Icon]) => <div key={y} className="lh-tile" style={{ top: y - 46 }}><Icon weight="duotone" /></div>)}
      {LH_OUT.map(([y, Icon]) => (
        <div key={y} className="lh-card" style={{ top: y - 54 }}>
          <Icon weight="fill" />
          <span className="lh-lines"><i /><i /><i /></span>
          <span className="lh-tick"><Check weight="bold" /></span>
        </div>
      ))}
    </>
  );
}

// A planet of points rising from the lower left of a section and bleeding off the page's left edge. Its
// lit edge flares where the light catches it and sends threads of light upward: the enterprise as one
// surface of connected systems. Drawn on a 900 x 520 stage; the edge enters at (0, 150) and leaves the
// bottom near x = 620.
const GL = { cx: -150, cy: 1106, r: 968, tilt: -0.12, spin: 0.62 };
const glProject = (lat, lon) => {
  const [cl, sl] = [Math.cos(lat), Math.sin(lat)];
  let [x, y, z] = [cl * Math.sin(lon + GL.spin), sl, cl * Math.cos(lon + GL.spin)];
  [y, z] = [y * Math.cos(GL.tilt) - z * Math.sin(GL.tilt), y * Math.sin(GL.tilt) + z * Math.cos(GL.tilt)];
  return [GL.cx + GL.r * x, GL.cy - GL.r * y, z];
};
const glIn = ([x, y, z]) => z > 0 && x > -10 && x < 910 && y > -10 && y < 530;
const glEdge = (x) => { const c = (x - GL.cx) / GL.r; return [x, GL.cy - GL.r * Math.sqrt(1 - c * c)]; };
export function Globe() {
  const deg = Math.PI / 180;
  const dots = [];
  for (let la = -88; la <= 88; la += 3.2) {
    for (let lo = -180; lo < 180; lo += 3.2) {
      const p = glProject(la * deg, lo * deg);
      if (glIn(p)) dots.push(p);
    }
  }
  const curve = (pts) => {
    const segs = [];
    let run = [];
    pts.forEach((p) => { if (glIn(p)) run.push(p); else { if (run.length > 1) segs.push(run); run = []; } });
    if (run.length > 1) segs.push(run);
    return segs.map((s) => `M${s.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')}`).join(' ');
  };
  const grid = [
    ...Array.from({ length: 24 }, (_, k) => curve(Array.from({ length: 120 }, (_, n) => glProject((-89 + n * 1.5) * deg, (k * 15) * deg)))),
    ...[-45, -30, -15, 0, 15, 30, 45, 60].map((la) => curve(Array.from({ length: 361 }, (_, n) => glProject(la * deg, (-180 + n) * deg)))),
  ].join(' ');
  // Threads of light rising from the edge, each carrying a couple of lit points.
  const pins = [[330, 150], [420, 110], [470, 80]].map(([x, h]) => [...glEdge(x), h]);
  const flare = glEdge(262);
  // Sparks scattered just above the edge, thickest near the flare.
  let s = 17;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const sparks = Array.from({ length: 46 }, () => {
    const x = 20 + rnd() ** 1.4 * 640;
    const [, ey] = glEdge(x);
    return [x, ey - 6 - rnd() * 70 * (1 - Math.abs(x - 262) / 700), 0.6 + rnd() * 1.2];
  });
  const moving = !still();
  return (
    <svg className="pg-globe" viewBox="0 0 900 520" preserveAspectRatio="xMinYMax meet" aria-hidden="true">
      <defs>
        <radialGradient id="gl-body" cx={GL.cx} cy={GL.cy} r={GL.r} gradientUnits="userSpaceOnUse">
          <stop offset="0.7" stopColor="#1f5fff" stopOpacity="0.03" />
          <stop offset="0.95" stopColor="#1f5fff" stopOpacity="0.26" />
          <stop offset="1" stopColor="#3f8cff" stopOpacity="0.5" />
        </radialGradient>
        <linearGradient id="gl-pin" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#8fcbff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#8fcbff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gl-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#3f8cff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#3f8cff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gl-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#fff" />
        </linearGradient>
        <mask id="gl-m" maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="520"><rect width="900" height="520" fill="url(#gl-fade)" /></mask>
        <filter id="gl-soft" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1100" height="720"><feGaussianBlur stdDeviation="4" /></filter>
        <filter id="gl-wide" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1100" height="720"><feGaussianBlur stdDeviation="16" /></filter>
      </defs>
      <g mask="url(#gl-m)">
        <circle cx={GL.cx} cy={GL.cy} r={GL.r} fill="url(#gl-body)" />
        <path d={grid} className="gl-grid" />
        {dots.map(([x, y, z], k) => <circle key={k} cx={x.toFixed(1)} cy={y.toFixed(1)} r={(0.55 + (1 - z) * 1.5).toFixed(2)} className="gl-dot" style={{ opacity: (0.18 + (1 - z) * 0.75).toFixed(2) }} />)}
        <circle cx={GL.cx} cy={GL.cy} r={GL.r} className="gl-limb glow" filter="url(#gl-wide)" />
        <circle cx={GL.cx} cy={GL.cy} r={GL.r} className="gl-limb haze" filter="url(#gl-soft)" />
        <circle cx={GL.cx} cy={GL.cy} r={GL.r} className="gl-limb" />
      </g>
      {sparks.map(([x, y, r], k) => <circle key={`s${k}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(2)} className="gl-spark" style={{ '--n': k % 7 }} />)}
      {/* The flare, with a beam of light rising from it */}
      <rect x={flare[0] - 5} y={flare[1] - 110} width="10" height="110" fill="url(#gl-beam)" filter="url(#gl-soft)" />
      <rect x={flare[0] - 0.8} y={flare[1] - 100} width="1.6" height="100" fill="url(#gl-pin)" />
      <circle cx={flare[0]} cy={flare[1]} r="34" fill="#3f8cff" opacity="0.7" filter="url(#gl-wide)" />
      <path d={`M${flare[0] - 36} ${flare[1]} H${flare[0] + 36} M${flare[0]} ${flare[1] - 30} V${flare[1] + 30}`} className="gl-flare" filter="url(#gl-soft)" />
      <circle cx={flare[0]} cy={flare[1]} r="3.6" fill="#fff" />
      {pins.map(([x, y, h], k) => (
        <g key={k}>
          <rect x={x - 0.7} y={y - h} width="1.4" height={h} fill="url(#gl-pin)" />
          <circle cx={x} cy={y - h * 0.72} r="2.6" className="gl-node" style={{ '--n': k }} />
          <circle cx={x} cy={y - h * 0.3} r="2" className="gl-node" style={{ '--n': k + 3 }} />
          <circle cx={x} cy={y} r="2.6" className="gl-node" style={{ '--n': k + 1 }} />
          {moving && <circle r="1.8" className="hs-dot"><animateMotion dur="3s" begin={`-${k}s`} repeatCount="indefinite" path={`M${x} ${y} V${y - h}`} /></circle>}
        </g>
      ))}
    </svg>
  );
}

/* ---------- IntelliSphere ---------- */

// IntelliSphere hero: the operating view of the AI estate. One glass monitor charts the estate over time,
// flanked by who may act (identity, configuration, evidence) and the summaries leaders read, standing on
// a lit floor under falling threads of light. Drawn on a 640 x 600 stage.
const GV_STREAKS = [[40, 60, 300], [88, 10, 200], [170, 0, 150], [262, 30, 120], [330, 0, 160], [410, 20, 130], [486, 0, 110], [560, 40, 150], [612, 0, 260]];
const GV_PTS = [[10, 168], [42, 140], [70, 150], [104, 112], [134, 126], [160, 96], [196, 52], [222, 62], [258, 18]];
function GovernView() {
  const moving = !still();
  const smooth = (() => {
    const at = through(GV_PTS);
    return `M${Array.from({ length: 80 }, (_, n) => at(n / 79).map((v) => v.toFixed(1)).join(' ')).join(' L')}`;
  })();
  const vx = 300;
  const floor = [
    ...Array.from({ length: 21 }, (_, k) => `M${vx + (k - 10) * 26} 452 L${vx + (k - 10) * 110} 600`),
    ...[460, 474, 494, 520, 556].map((y) => `M0 ${y} H640`),
  ].join(' ');
  const floorDots = [];
  [474, 494, 520, 556].forEach((y, r) => {
    for (let k = -10; k <= 10; k += 2) {
      const t = (y - 452) / 148;
      floorDots.push([vx + (k + (r % 2)) * (26 + 84 * t), y, r]);
    }
  });
  return (
    <>
      <Svg w={640} h={600}>
        <defs>
          <linearGradient id="gv-streak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3f8cff" stopOpacity="0" />
            <stop offset="1" stopColor="#3f8cff" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="gv-floor-g" cx="0.5" cy="0.1" r="0.7">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="gv-floor-m"><rect x="0" y="446" width="640" height="154" fill="url(#gv-floor-g)" /></mask>
          <filter id="gv-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="600"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>
        <ellipse cx="300" cy="300" rx="300" ry="220" fill="#1f5fff" opacity="0.16" filter="url(#gv-wide)" />
        {GV_STREAKS.map(([x, y, h], k) => (
          <g key={x}>
            <rect x={x - 0.6} y={y} width="1.2" height={h} fill="url(#gv-streak)" />
            <circle cx={x} cy={y + h} r="1.8" className="gv-cap" style={{ '--n': k % 5 }} />
          </g>
        ))}
        <path d={floor} className="gv-floor" mask="url(#gv-floor-m)" />
        {floorDots.map(([x, y, r], k) => <circle key={k} cx={x.toFixed(1)} cy={y} r={1.2 + r * 0.25} className="gv-fdot" style={{ '--n': k % 7 }} mask="url(#gv-floor-m)" />)}
        <ellipse cx="300" cy="462" rx="170" ry="22" fill="#3f8cff" opacity="0.35" filter="url(#gv-wide)" />
        {/* The stand under the monitor */}
        <path d="M226 446 L246 432 H366 L346 446 Z" className="gv-stand top" />
        <path d="M226 446 H346 V458 H226 Z" className="gv-stand front" />
        <path d="M346 446 L366 432 V444 L346 458 Z" className="gv-stand side" />
        <path d="M226 446 H346" className="gv-stand-rim" />
        <path d="M286 432 V420" className="gv-stand-rim" />
      </Svg>

      {/* Who may act: identity, configuration, evidence */}
      <div className="gv-pane gv-side">
        {[User, Gear, FileText].map((Icon, k) => <span key={k} className="gv-tile"><Icon weight="fill" /></span>)}
      </div>

      {/* The monitor */}
      <div className="gv-pane gv-main">
        <span className="gv-bar head" />
        <div className="gv-main-body">
          <span className="gv-lines">{[70, 52, 62, 44].map((w) => <i key={w} style={{ width: `${w}%` }} />)}</span>
          <svg viewBox="0 0 270 190" className="gv-chart" aria-hidden="true">
            <defs>
              <linearGradient id="gv-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3f8cff" stopOpacity="0.45" />
                <stop offset="1" stopColor="#3f8cff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 80, 120, 160].map((y) => <path key={y} d={`M0 ${y} H270`} className="gv-grid" />)}
            {[60, 120, 180, 240].map((x) => <path key={x} d={`M${x} 0 V180`} className="gv-grid" />)}
            <path d={`${smooth} L258 180 L10 180 Z`} fill="url(#gv-area)" />
            <path d={smooth} className="gv-line glow" />
            <path d={smooth} className="gv-line" />
            {GV_PTS.filter((_, k) => k % 2 === 1 || k === GV_PTS.length - 1).map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.6" className="gv-pt" />)}
            {moving && <circle r="3" className="hs-dot"><animateMotion dur="4s" repeatCount="indefinite" path={smooth} /></circle>}
            {[30, 80, 130, 180, 230].map((x) => <path key={x} d={`M${x} 186 h14`} className="gv-tick" />)}
          </svg>
        </div>
      </div>

      {/* The summaries leaders read */}
      <div className="gv-pane gv-right one">
        <span className="gv-lines">{[80, 60, 70, 48].map((w) => <i key={w} style={{ width: `${w}%` }} />)}</span>
        <span className="gv-bars">{[30, 52, 40, 70, 92].map((h, k) => <i key={k} style={{ height: `${h}%` }} />)}</span>
      </div>
      <div className="gv-pane gv-right two">
        <svg viewBox="0 0 60 60" className="gv-donut" aria-hidden="true">
          <circle cx="30" cy="30" r="21" className="track" />
          <circle cx="30" cy="30" r="21" className="arc" pathLength="100" strokeDasharray="68 100" transform="rotate(-90 30 30)" />
          <circle cx="30" cy="30" r="21" className="arc soft" pathLength="100" strokeDasharray="20 100" strokeDashoffset="-70" transform="rotate(-90 30 30)" />
        </svg>
        <span className="gv-lines">{[78, 56, 66, 50].map((w) => <i key={w} style={{ width: `${w}%` }} />)}</span>
      </div>
      <div className="gv-pane gv-right three">
        <span className="gv-lines wide">{[72, 88, 60, 80].map((w) => <i key={w} style={{ width: `${w}%` }} />)}</span>
      </div>
    </>
  );
}

// IntelliSphere statement: the estate as a dome of points under one orbit of governance, with threads of
// light rising where the boundary is checked. Drawn on a 1400 x 640 stage.
const GD = { cx: 700, cy: 1000, r: 780, tilt: 0.14 };
const gdLimb = (x) => GD.cy - Math.sqrt(GD.r ** 2 - (x - GD.cx) ** 2);
const gdProject = (lat, lon) => {
  const [cl, sl] = [Math.cos(lat), Math.sin(lat)];
  let [x, y, z] = [cl * Math.sin(lon), sl, cl * Math.cos(lon)];
  [y, z] = [y * Math.cos(GD.tilt) - z * Math.sin(GD.tilt), y * Math.sin(GD.tilt) + z * Math.cos(GD.tilt)];
  return [GD.cx + GD.r * x, GD.cy - GD.r * y, z];
};
function GovernDome() {
  const deg = Math.PI / 180;
  const dots = [];
  for (let la = -10; la <= 84; la += 2.6) {
    for (let lo = -180; lo < 180; lo += 2.6) {
      const p = gdProject(la * deg, lo * deg);
      if (p[2] > 0 && p[1] < 640) dots.push(p);
    }
  }
  const orbit = (rx, ry, cy) => `M${700 - rx} ${cy} A${rx} ${ry} 0 1 0 ${700 + rx} ${cy} A${rx} ${ry} 0 1 0 ${700 - rx} ${cy}`;
  const pins = [[150, 150], [260, 110], [470, 70], [700, 90], [930, 70], [1140, 110], [1250, 150]].map(([x, h]) => [x, gdLimb(x), h]);
  const moving = !still();
  return (
    <Svg w={1400} h={640}>
      <defs>
        <radialGradient id="gd-body" cx="700" cy="1000" r="780" gradientUnits="userSpaceOnUse">
          <stop offset="0.6" stopColor="#1f5fff" stopOpacity="0.04" />
          <stop offset="0.95" stopColor="#1f5fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#3f8cff" stopOpacity="0.45" />
        </radialGradient>
        <linearGradient id="gd-pin" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#8fcbff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#8fcbff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gd-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="gd-m" maskUnits="userSpaceOnUse" x="0" y="0" width="1400" height="640"><rect width="1400" height="640" fill="url(#gd-fade)" /></mask>
        <filter id="gd-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="1400" height="640"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="gd-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="1400" height="640"><feGaussianBlur stdDeviation="22" /></filter>
      </defs>
      <g mask="url(#gd-m)">
        <circle cx={GD.cx} cy={GD.cy} r={GD.r} fill="url(#gd-body)" />
        {dots.map(([x, y, z], k) => <circle key={k} cx={x.toFixed(1)} cy={y.toFixed(1)} r={(0.6 + (1 - z) * 1.3).toFixed(2)} className="gd-dot" style={{ opacity: (0.1 + (1 - z) * 0.7).toFixed(2) }} />)}
        <circle cx={GD.cx} cy={GD.cy} r={GD.r} className="gd-limb glow" filter="url(#gd-wide)" />
        <circle cx={GD.cx} cy={GD.cy} r={GD.r} className="gd-limb haze" filter="url(#gd-soft)" />
        <circle cx={GD.cx} cy={GD.cy} r={GD.r} className="gd-limb" />
        {/* The orbit of governance around the estate */}
        <path d={orbit(680, 130, 470)} className="gd-orbit lit" />
        <path d={orbit(640, 112, 480)} className="gd-orbit" />
        <path d={orbit(720, 150, 458)} className="gd-orbit dash" />
        {moving && [0, 1].map((k) => <circle key={k} r="2.6" className="hs-dot"><animateMotion dur="14s" begin={`-${k * 7}s`} repeatCount="indefinite" path={orbit(680, 130, 470)} /></circle>)}
      </g>
      <ellipse cx="700" cy="226" rx="260" ry="36" fill="#3f8cff" opacity="0.45" filter="url(#gd-wide)" />
      {pins.map(([x, y, h], k) => (
        <g key={x}>
          <rect x={x - 0.7} y={y - h} width="1.4" height={h} fill="url(#gd-pin)" />
          <circle cx={x} cy={y - h * 0.65} r="2.4" className="gd-node" style={{ '--n': k }} />
          <circle cx={x} cy={y} r="3" className="gd-node" style={{ '--n': k + 2 }} />
        </g>
      ))}
      {[[20, 470], [1380, 470], [240, 470 + 130 * Math.sqrt(1 - (460 / 680) ** 2)], [1160, 470 + 130 * Math.sqrt(1 - (460 / 680) ** 2)]].map(([x, y], k) => (
        <g key={`o${x}`}>
          <circle cx={x} cy={y} r="14" fill="#3f8cff" opacity="0.6" filter="url(#gd-soft)" />
          <circle cx={x} cy={y} r="3.6" className="gd-node hot" style={{ '--n': k }} />
        </g>
      ))}
    </Svg>
  );
}

/* ---------- AIR Residency ---------- */

// AIR Residency hero: one thread of operating context runs through every phase of the work. Specialists
// join the phase that needs them and step away; the context and the Architect travel the whole way, and
// accountability runs underneath, straight to the operating outcome. Drawn on a 640 x 520 stage.
const RS_PHASES = [['Redesign', PencilRuler, 2], ['Engineer', Code, 3], ['Govern', ShieldCheck, 2], ['Embed', UsersThree, 3], ['Operate', Pulse, 2], ['Compound', Stack, 1]];
// The stage, left to right: the Architect, six phases evenly spaced, the operating outcome. One level thread
// runs through them all; specialists drop in from above each phase; accountability runs straight beneath.
const RS = { y: 150, arch: 50, x0: 132, step: 72, out: 616, team: 92, label: 52, acc: 262 };
const RS_X = RS_PHASES.map((_, k) => RS.x0 + k * RS.step);
// AIR Residency hero: one thread of operating context runs through every phase of the work. Specialists
// join the phase that needs them and step away; the context and the Architect travel the whole way, and
// accountability runs underneath, straight to the operating outcome. Drawn on a 696 x 300 stage.
function ResidencyThread() {
  const moving = !still();
  const thread = `M${RS.arch + 30} ${RS.y} H${RS.out - 78}`;
  const floor = [
    ...Array.from({ length: 21 }, (_, k) => `M${348 + (k - 10) * 34} ${RS.y + 40} L${348 + (k - 10) * 90} 300`),
    ...[198, 212, 232, 258, 290].map((y) => `M0 ${y} H696`),
  ].join(' ');
  return (
    <>
      <Svg w={696} h={300}>
        <defs>
          <radialGradient id="rs-floor-g" cx="0.5" cy="0.1" r="0.7">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="rs-floor-m"><rect x="0" y={RS.y + 36} width="696" height="120" fill="url(#rs-floor-g)" /></mask>
          <filter id="rs-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="696" height="300"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="rs-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="696" height="300"><feGaussianBlur stdDeviation="22" /></filter>
        </defs>
        <ellipse cx="348" cy={RS.y} rx="320" ry="90" fill="#1f5fff" opacity="0.2" filter="url(#rs-wide)" />
        <path d={floor} className="rs-floor" mask="url(#rs-floor-m)" />

        {/* Specialists join a phase from above */}
        {RS_X.map((x, k) => <path key={x} d={`M${x} ${RS.y - RS.team + 16} V${RS.y - 46}`} className={`rs-join${k === 1 ? ' hot' : ''}`} />)}

        {/* The context thread, lit the whole way */}
        <path d={thread} className="rs-thread glow" filter="url(#rs-soft)" />
        <path d={thread} className="rs-thread" />
        {[-6, 6].map((o) => <path key={o} d={`M${RS.arch + 30} ${RS.y + o} H${RS.out - 78}`} className="rs-strand" />)}
        {RS_X.slice(0, -1).map((x) => <circle key={x} cx={x + RS.step / 2} cy={RS.y} r="2.6" className="rs-node" />)}
        {moving && [0, 1, 2].map((k) => <circle key={k} r="2.6" className="hs-dot"><animateMotion dur="6s" begin={`-${k * 2}s`} repeatCount="indefinite" path={thread} /></circle>)}

        {/* Accountability: straight underneath, from the Architect to the outcome */}
        <path d={`M${RS.arch} ${RS.acc} H${RS.out}`} className="rs-account" />
        <path d={`M${RS.arch} ${RS.y + 30} V${RS.acc} M${RS.out} ${RS.acc} V${RS.y + 34}`} className="rs-account drop" />
        <text x={RS.arch + 16} y={RS.acc - 10} className="rs-cap">ACCOUNTABILITY</text>
      </Svg>
      <div className="rs-architect" style={{ left: RS.arch, top: RS.y }}><User weight="fill" /></div>
      <span className="rs-tag" style={{ left: RS.arch, top: RS.y - 46 }}>Architect</span>
      {RS_PHASES.map(([label, Icon, n], k) => {
        const x = RS_X[k];
        return (
          <div key={label}>
            <div className={`rs-team${k === 1 ? ' hot' : ''}`} style={{ left: x, top: RS.y - RS.team }}>
              {Array.from({ length: n }, (_, i) => <span key={i}><User weight="fill" /></span>)}
            </div>
            <div className={`rs-gate${k === 1 ? ' hot' : ''}`} style={{ left: x, top: RS.y }}><Icon weight="duotone" /></div>
            <span className="rs-label" style={{ left: x, top: RS.y + RS.label }}>{label}</span>
          </div>
        );
      })}
      <div className="rs-outcome" style={{ left: RS.out, top: RS.y }}><Target weight="duotone" /><span>Operating<br />outcome</span></div>
    </>
  );
}

// Why hand-offs destroy value. Two lanes on one grid, so the panes line up and compare directly. Above, the
// hand-off: strategy's threads of context are squeezed into one requirements document, two reach delivery and
// the rest fall away. Below, AIR: the same threads run unbroken to production, carried by the Architect.
// Drawn on a 640 x 480 stage.
const HO = { paneW: 170, paneH: 128, right: 470, topY: 56, airY: 322, docX: 288, docW: 96 };
const HO_BARS = [92, 74, 86, 60, 80];
function HoPane({ x, y, title, filled = 5, tone = '' }) {
  return (
    <div className={`ho-pane ${tone}`} style={{ left: x, top: y, width: HO.paneW, height: HO.paneH }}>
      <span className="ho-title">{title}</span>
      {HO_BARS.map((w, k) => <i key={k} className={k < filled ? '' : 'gap'} style={{ width: `${w}%` }} />)}
    </div>
  );
}
function Handoff() {
  const moving = !still();
  const cy = HO.topY + HO.paneH / 2;
  const ay = HO.airY + HO.paneH / 2;
  const docR = HO.docX + HO.docW;
  const ins = Array.from({ length: 7 }, (_, k) => {
    const y = cy - 36 + k * 12;
    const t = cy + (k - 3) * 4;
    return `M${HO.paneW} ${y} C${HO.paneW + 62} ${y} ${HO.docX - 54} ${t} ${HO.docX} ${t}`;
  });
  const outs = [[cy - 8, cy - 22], [cy + 8, cy - 6]].map(([y, t]) => `M${docR} ${y} C${docR + 44} ${y} ${HO.right - 44} ${t} ${HO.right} ${t}`);
  const lost = [[304, 0], [322, 1], [340, 2], [358, 3], [314, 4], [348, 5], [332, 6]];
  const air = [-15, -10, -5, 0, 5, 10, 15].map((o) => `M${HO.paneW} ${ay + o} H${HO.right}`);
  return (
    <>
      <Svg w={640} h={480}>
        <defs>
          <filter id="ho-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="480"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="ho-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="480"><feGaussianBlur stdDeviation="18" /></filter>
        </defs>
        {/* The hand-off: many threads in, two out, the rest lost. */}
        {ins.map((d, k) => <path key={d} d={d} className={`ho-in${k === 2 || k === 4 ? ' lit' : ''}`} />)}
        {outs.map((d) => <path key={d} d={d} className="ho-out" />)}
        {moving && ins.map((d, k) => <circle key={`i${k}`} r="2.2" className="hs-dot ho-die"><animateMotion dur="2.4s" begin={`-${k * 0.34}s`} repeatCount="indefinite" path={d} /></circle>)}
        {moving && outs.map((d, k) => <circle key={`o${k}`} r="2.2" className="hs-dot"><animateMotion dur="1.6s" begin={`-${k * 0.8}s`} repeatCount="indefinite" path={d} /></circle>)}
        {lost.map(([x, n]) => <rect key={n} x={x} y={190 + (n % 3) * 9} width="7" height="3" rx="1.5" className="ho-lost" style={{ '--n': n }} />)}
        <path d="M0 278 H640" className="ho-divide" />
        {/* AIR: the same threads, carried end to end. */}
        <ellipse cx="320" cy={ay} rx="230" ry="34" fill="#1f5fff" opacity="0.3" filter="url(#ho-wide)" />
        <path d={air[3]} className="ho-air glow" filter="url(#ho-soft)" />
        {air.map((d, k) => <path key={d} d={d} className={`ho-air${k === 3 ? ' lit' : ''}`} />)}
        {moving && [1, 3, 5].map((k, i) => <circle key={k} r="2.4" className="hs-dot"><animateMotion dur="3.6s" begin={`-${i * 1.2}s`} repeatCount="indefinite" path={air[k]} /></circle>)}
      </Svg>
      <span className="ho-cap" style={{ left: 0, top: 26 }}>Hand-off</span>
      <span className="ho-cap hot" style={{ left: 0, top: 300 }}>With AIR</span>
      <HoPane x={0} y={HO.topY} title="Strategy" />
      <div className="ho-doc" style={{ left: HO.docX, top: cy - 52, width: HO.docW, height: 104 }}><FileText weight="duotone" /><span>Requirements</span></div>
      <HoPane x={HO.right} y={HO.topY} title="Delivery" filled={2} tone="dim" />
      <span className="ho-note" style={{ left: HO.docX + HO.docW / 2, top: 244 }}>Context lost</span>
      <HoPane x={0} y={HO.airY} title="Strategy" />
      <div className="ho-orb" style={{ left: 320, top: ay }}>
        <span className="orb-glass ho-orb-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <User weight="fill" className="ho-orb-ico" />
      </div>
      <span className="ho-note hot" style={{ left: 320, top: ay + 56 }}>Architect</span>
      <HoPane x={HO.right} y={HO.airY} title="Production" tone="hot" />
    </>
  );
}

// AIR is not one heroic generalist: the Intellient Architect at the centre provides continuity, and draws
// on the specialist each phase requires; the lit specialist changes as the phase does. 640 x 460 stage.
const SP_ROLES = [['Process', TreeStructure], ['Data', Database], ['Engineering', Code], ['Security', LockKey], ['Change', UsersThree], ['Operations', Pulse]];
function Specialists() {
  const [cx, cy, rx, ry] = [320, 222, 256, 166];
  const pos = SP_ROLES.map((_, k) => { const a = -Math.PI / 2 + (k * Math.PI * 2) / SP_ROLES.length; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
  const moving = !still();
  const [hot, setHot] = useState(2);
  useEffect(() => {
    if (!moving) return undefined;
    const t = setInterval(() => setHot((h) => (h + 1) % SP_ROLES.length), 2800);
    return () => clearInterval(t);
  }, [moving]);
  // Each link leaves from the orb's edge; the one straight down starts below the Architect label.
  const link = ([x, y]) => {
    const dx = x - cx; const dy = y - cy; const len = Math.hypot(dx, dy);
    const start = Math.abs(dx) < 1 && dy > 0 ? 104 : 58;
    return `M${cx + (dx / len) * start} ${cy + (dy / len) * start} L${x} ${y}`;
  };
  return (
    <>
      <Svg w={640} h={460}>
        <defs>
          <filter id="sp-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="460"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="sp-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="460"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>
        <ellipse cx={cx} cy={cy} rx="200" ry="130" fill="#1f5fff" opacity="0.2" filter="url(#sp-wide)" />
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} className="sp-orbit" />
        <ellipse cx={cx} cy={cy} rx={rx * 0.6} ry={ry * 0.6} className="sp-orbit inner" />
        {pos.map((p, k) => <path key={k} d={link(p)} className="sp-link" />)}
        <path key={`g${hot}`} d={link(pos[hot])} className="sp-link glow" filter="url(#sp-soft)" />
        <path key={`h${hot}`} d={link(pos[hot])} className="sp-link hot" pathLength="1" />
        {moving && [0, 1].map((k) => <circle key={`${hot}${k}`} r="2.6" className="hs-dot"><animateMotion dur="1.4s" begin={`-${k * 0.7}s`} repeatCount="indefinite" path={link(pos[hot])} /></circle>)}
      </Svg>
      <div className="sp-core" style={{ left: cx, top: cy }}>
        <span className="sp-core-glow" />
        <span className="orb-glass sp-core-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <User weight="fill" className="sp-core-ico" />
      </div>
      <span className="sp-core-label" style={{ left: cx, top: cy + 66 }}>Intellient Architect</span>
      {SP_ROLES.map(([label, Icon], k) => (
        <div key={label} className={`sp-role${k === hot ? ' hot' : ''}`} style={{ left: pos[k][0], top: pos[k][1] }}>
          <Icon weight="duotone" /><span>{label}</span>
        </div>
      ))}
    </>
  );
}

/* ---------- Operating Domain Assessment ---------- */

// The assessment hero: the visible symptoms of one Operating Domain drawn in as threads of light and set
// down, section by section, in the Operating Domain Brief. Drawn on a 640 x 540 stage.
const BD_SIGNALS = [['Work waits in queues', 104], ['Systems disagree', 196], ['Exceptions recur', 288], ['Decisions arrive late', 380]];
const BD_SECTIONS = ['Outcome to move', 'Proposed Operating Domain', 'Visible symptoms', 'Exception and context signals', 'Ownership and authority', 'Evidence available', 'Meaningful improvement', 'Recommended next step'];
function BriefDoc() {
  const moving = !still();
  const wires = BD_SIGNALS.map(([, y], k) => `M196 ${y} C250 ${y} 262 ${150 + k * 40} 318 ${150 + k * 40}`);
  return (
    <>
      <Svg w={640} h={540}>
        <defs>
          <filter id="bd-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="540"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="bd-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="540"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>
        <ellipse cx="450" cy="300" rx="220" ry="230" fill="#1f5fff" opacity="0.22" filter="url(#bd-wide)" />
        <ellipse cx="468" cy="500" rx="166" ry="24" className="bd-ring glow" filter="url(#bd-soft)" />
        <ellipse cx="468" cy="500" rx="166" ry="24" className="bd-ring" />
        <ellipse cx="468" cy="496" rx="130" ry="16" className="bd-ring inner" />
        {wires.map((d) => <path key={d} d={d} className="bd-wire glow" filter="url(#bd-soft)" />)}
        {wires.map((d) => <path key={`c${d}`} d={d} className="bd-wire" />)}
        {BD_SIGNALS.map(([, y], k) => [0.3, 0.62].map((t) => {
          const ty = 150 + k * 40;
          const [x, py] = [196 + 122 * (3 * (1 - t) * t * t * 0.5 + 3 * (1 - t) ** 2 * t * 0.5 + t ** 3), (1 - t) ** 3 * y + 3 * (1 - t) ** 2 * t * y + 3 * (1 - t) * t * t * ty + t ** 3 * ty];
          return <circle key={`${k}${t}`} cx={x.toFixed(1)} cy={py.toFixed(1)} r="1.6" className="tp-mote" style={{ '--n': k * 2 + (t > 0.5 ? 1 : 0) }} />;
        }))}
        {moving && wires.map((d, k) => <circle key={`m${k}`} r="2.2" className="hs-dot"><animateMotion dur="2.6s" begin={`-${k * 0.65}s`} repeatCount="indefinite" path={d} /></circle>)}
      </Svg>
      {BD_SIGNALS.map(([t, y]) => <div key={t} className="bd-signal" style={{ top: y }}><i />{t}</div>)}
      {/* The brief: a back sheet, and the brief itself filling in */}
      <div className="bd-sheet back" />
      <div className="bd-sheet">
        <div className="bd-head">
          <span>Operating Domain Brief</span>
          <i><b /></i>
        </div>
        <ol>
          {BD_SECTIONS.map((s, k) => (
            <li key={s} className={k < 5 ? 'done' : ''} style={{ '--k': k }}>
              <span className="bd-num">{String(k + 1).padStart(2, '0')}</span>
              <span className="bd-text">{s}</span>
              <span className="bd-tick">{k < 5 && <Check weight="bold" />}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

/* ---------- Intellient Core ---------- */

// Intellient Core hero: the work travels from plan to completion evidence around the Core sphere, which
// holds its state the whole way. A tool fails and retries without the work losing its place, and a person
// decides where the workflow says they should. Drawn on a 640 x 560 stage.
const CW_ORB = [320, 318, 66];
const CW_STEPS = [
  ['Plan', ListChecks, 92, 262], ['Model', Sparkle, 156, 128], ['Agent', Robot, 320, 82],
  ['Tool', Wrench, 484, 128, 'retry'], ['Human decision', User, 548, 262, 'person'],
];
const CW_ARC = 'M92 243 C96 190 120 150 156 128 C210 96 262 82 320 82 C378 82 430 96 484 128 C520 150 544 190 548 243';
function CoreWork() {
  const moving = !still();
  const [ox, oy, or] = CW_ORB;
  const floor = [
    ...Array.from({ length: 17 }, (_, k) => `M${ox + (k - 8) * 32} 432 L${ox + (k - 8) * 110} 560`),
    ...[440, 454, 474, 502, 540].map((y) => `M0 ${y} H640`),
  ].join(' ');
  return (
    <>
      <Svg w={640} h={560}>
        <defs>
          <radialGradient id="cw-floor-g" cx="0.5" cy="0.1" r="0.7"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="cw-floor-m"><rect x="0" y="428" width="640" height="132" fill="url(#cw-floor-g)" /></mask>
          <filter id="cw-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="560"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="cw-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="560"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>
        <ellipse cx={ox} cy={oy} rx="250" ry="200" fill="#1f5fff" opacity="0.18" filter="url(#cw-wide)" />
        <path d={floor} className="cw-floor" mask="url(#cw-floor-m)" />
        <ellipse cx={ox} cy="430" rx="150" ry="24" className="cw-ring glow" filter="url(#cw-soft)" />
        <ellipse cx={ox} cy="430" rx="150" ry="24" className="cw-ring" />
        <ellipse cx={ox} cy="426" rx="112" ry="16" className="cw-ring inner" />
        {/* State threads: every step stays tied to the state the Core holds */}
        {CW_STEPS.map(([l, , x, y]) => <path key={l} d={`M${x} ${y} L${ox} ${oy}`} className="cw-state" />)}
        {/* The route of the work */}
        <path d={CW_ARC} className="cw-route glow" filter="url(#cw-soft)" />
        <path d={CW_ARC} className="cw-route" />
        <path d={`M548 282 C548 380 520 470 ${ox + 150} 492`} className="cw-route" />
        {/* The tool's retry: a loop back on itself, the work holding its place */}
        <path d="M548 96 a16 16 0 1 1 10 14" className="cw-retry" />
        <path d="M558 110 l-9 1 l6 6 z" className="cw-arrow" />
        {moving && [0, 1].map((k) => <circle key={k} r="2.6" className="hs-dot"><animateMotion dur="7s" begin={`-${k * 3.5}s`} repeatCount="indefinite" path={`${CW_ARC} L548 282 C548 380 520 470 ${ox + 150} 492`} /></circle>)}
      </Svg>
      <div className="cw-orb" style={{ left: ox, top: oy, width: or * 2, height: or * 2 }}>
        <span className="cw-orb-glow" aria-hidden="true" />
        <span className="orb-glass cw-orb-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <img src="/svg/intellient-core.svg" alt="" className="cw-logo" />
      </div>
      <span className="cw-state-label" style={{ left: ox, top: 462 }}>Workflow state</span>
      {CW_STEPS.map(([l, Icon, x, y, kind]) => (
        <div key={l} className={`cw-step${kind ? ` ${kind}` : ''}`} style={{ left: x, top: y }}>
          <Icon weight="duotone" /><span>{l}</span>
          {kind === 'retry' && <em>Retry</em>}
        </div>
      ))}
      <div className="cw-step done" style={{ left: ox + 70, top: 500 }}><CheckCircle weight="fill" /><span>Completion evidence</span></div>
    </>
  );
}

// Behind the capability list: the Core at the lower left, its orbits carrying the work, each pass marked.
export function CoreOrbits() {
  const rings = [[180, 64], [270, 98], [360, 132], [450, 166]];
  const moving = !still();
  return (
    <svg className="pg-coreorbits" viewBox="0 0 900 520" preserveAspectRatio="xMinYMax meet" aria-hidden="true">
      <defs>
        <radialGradient id="co-core" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#8fcbff" /><stop offset="0.35" stopColor="#3f8cff" /><stop offset="0.75" stopColor="#10307a" /><stop offset="1" stopColor="#06102a" />
        </radialGradient>
        <filter id="co-soft" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1100" height="720"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="co-wide" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1100" height="720"><feGaussianBlur stdDeviation="26" /></filter>
      </defs>
      <circle cx="170" cy="470" r="150" fill="#1f5fff" opacity="0.4" filter="url(#co-wide)" />
      {rings.map(([rx, ry], k) => (
        <g key={rx}>
          <ellipse cx="170" cy="470" rx={rx} ry={ry} className={`co-ring${k === 1 ? ' lit' : ''}`} transform="rotate(-14 170 470)" />
          {k === 1 && <ellipse cx="170" cy="470" rx={rx} ry={ry} className="co-ring glow" transform="rotate(-14 170 470)" filter="url(#co-soft)" />}
        </g>
      ))}
      {rings.map(([rx, ry], k) => [0.15, 0.32, 0.6].map((t, j) => {
        const a = -Math.PI * (0.18 + t);
        const [x0, y0] = [rx * Math.cos(a), ry * Math.sin(a)];
        const r = -14 * Math.PI / 180;
        return <circle key={`${k}${j}`} cx={(170 + x0 * Math.cos(r) - y0 * Math.sin(r)).toFixed(1)} cy={(470 + x0 * Math.sin(r) + y0 * Math.cos(r)).toFixed(1)} r={j === 1 ? 3 : 2} className="co-node" style={{ '--n': k + j }} />;
      }))}
      {moving && <circle r="3" className="hs-dot"><animateMotion dur="10s" repeatCount="indefinite" path={`M${170 - 270} 470 a270 98 0 1 1 540 0 a270 98 0 1 1 -540 0`} rotate="0" /></circle>}
      <circle cx="170" cy="470" r="58" fill="url(#co-core)" className="co-core" />
      <ellipse cx="150" cy="440" rx="26" ry="12" className="co-shine" />
    </svg>
  );
}

// Core statement: a planet horizon with one lit point, the place the workflow says a person enters.
export function EntryHorizon() {
  // The limb: a quadratic from (-300, 1200) to (1900, 1200) peaking at (800, 470).
  const limb = (x) => { const t = (x + 300) / 2200; return 1200 * ((1 - t) ** 2 + t * t) - 520 * t * (1 - t); };
  let s = 23;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const lights = Array.from({ length: 220 }, () => { const x = rnd() * 1600; return [x, limb(x) + 10 + rnd() * 160, 0.5 + rnd()]; });
  const pins = [[420, 80], [600, 130], [1000, 130], [1180, 80]];
  return (
    <svg className="pg-entry" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="eh-planet" x1="0" y1="470" x2="0" y2="760" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#081a4a" /><stop offset="0.25" stopColor="#040b1f" /><stop offset="1" stopColor="#000" /></linearGradient>
        <linearGradient id="eh-pin" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#8fcbff" /><stop offset="1" stopColor="#8fcbff" stopOpacity="0" /></linearGradient>
        <filter id="eh-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="1600" height="700"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="eh-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="1600" height="700"><feGaussianBlur stdDeviation="26" /></filter>
      </defs>
      <path d="M-300 1200 Q800 -260 1900 1200 Z" fill="url(#eh-planet)" />
      {lights.map(([x, y, r], k) => <circle key={k} cx={x.toFixed(0)} cy={y.toFixed(0)} r={r.toFixed(2)} fill="#8fcbff" opacity={(0.12 + (k % 5) * 0.06).toFixed(2)} />)}
      <path d="M-300 1200 Q800 -260 1900 1200" fill="none" stroke="#1f5fff" strokeWidth="26" opacity="0.55" filter="url(#eh-wide)" />
      <path d="M-300 1200 Q800 -260 1900 1200" fill="none" stroke="#3f8cff" strokeWidth="6" opacity="0.8" filter="url(#eh-soft)" />
      <path d="M-300 1200 Q800 -260 1900 1200" fill="none" stroke="#e9f6ff" strokeWidth="1.6" />
      {pins.map(([x, h], k) => (
        <g key={x}>
          <rect x={x - 0.7} y={limb(x) - h} width="1.4" height={h} fill="url(#eh-pin)" />
          <circle cx={x} cy={limb(x) - h * 0.7} r="2.4" className="gd-node" style={{ '--n': k }} />
          <circle cx={x} cy={limb(x)} r="2.6" className="gd-node" style={{ '--n': k + 2 }} />
        </g>
      ))}
      {/* The entry point: one beam and a bright mark where the person enters */}
      <ellipse cx="800" cy="470" rx="240" ry="30" fill="#3f8cff" opacity="0.55" filter="url(#eh-wide)" />
      <rect x="796" y="360" width="8" height="110" fill="url(#eh-pin)" filter="url(#eh-soft)" />
      <rect x="799.2" y="350" width="1.6" height="120" fill="url(#eh-pin)" />
      <circle cx="800" cy="470" r="5" fill="#fff" />
      <path d="M770 470 H830 M800 444 V496" stroke="#e9f6ff" strokeWidth="1.2" filter="url(#eh-soft)" />
    </svg>
  );
}

/* ---------- Architecture ---------- */

// Architecture hero: the same five layers as the cards below, each product on its own layer. A request
// travels down through the stack and the action returns up it. Drawn on a 640 x 560 stage.
const AS_LAYERS = [
  ['Experience', null],
  ['Connection and action', '/svg/intellilink.svg', 'IntelliLink'],
  ['Reasoning and orchestration', '/svg/intellient-core.svg', 'Intellient Core'],
  ['Trust and control', '/svg/intellisphere.svg', 'IntelliSphere'],
  ['Enterprise foundation', null],
];
const AS = { cx: 210, top: 92, gap: 88, w: 170, h: 54, t: 10 };
function ArchStack() {
  const moving = !still();
  const ys = AS_LAYERS.map((_, k) => AS.top + k * AS.gap);
  const { cx, w, h, t } = AS;
  const beam = `M${cx} 20 V${ys[4] + h}`;
  return (
    <>
      <Svg w={640} h={560}>
        <defs>
          <linearGradient id="as-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8fcbff" stopOpacity="0.32" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0.16" /></linearGradient>
          <linearGradient id="as-top-hot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8fcbff" stopOpacity="0.55" /><stop offset="1" stopColor="#3f8cff" stopOpacity="0.32" /></linearGradient>
          <filter id="as-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="560"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="as-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="560"><feGaussianBlur stdDeviation="22" /></filter>
        </defs>
        <ellipse cx={cx} cy={ys[4] + 30} rx="230" ry="60" fill="#1f5fff" opacity="0.35" filter="url(#as-wide)" />
        {/* Layers, bottom first so the upper ones sit in front */}
        {[...ys].reverse().map((y, r) => {
          const k = 4 - r;
          const hot = k >= 1 && k <= 3;
          return (
            <g key={y} className={`as-slab${hot ? ' hot' : ''}`}>
              <path d={`M${cx - w} ${y} L${cx} ${y + h} V${y + h + t} L${cx - w} ${y + t} Z`} className="l" />
              <path d={`M${cx + w} ${y} L${cx} ${y + h} V${y + h + t} L${cx + w} ${y + t} Z`} className="r" />
              <path d={`M${cx - w} ${y} L${cx} ${y - h} L${cx + w} ${y} L${cx} ${y + h} Z`} fill={`url(#${hot ? 'as-top-hot' : 'as-top'})`} className="t" />
              <path d={`M${cx - w * 0.62} ${y} L${cx} ${y - h * 0.62} L${cx + w * 0.62} ${y} L${cx} ${y + h * 0.62} Z`} className="in" />
              <path d={`M${cx + w} ${y} H${cx + w + 34}`} className="as-tick" />
            </g>
          );
        })}
        {/* The request down, the action back up */}
        <path d={beam} className="as-beam glow" filter="url(#as-soft)" />
        <path d={beam} className="as-beam" />
        <path d={`M${cx + 14} ${ys[4] + h} V20`} className="as-beam back" />
        {ys.map((y) => <circle key={y} cx={cx} cy={y} r="4" className="as-node" />)}
        {moving && <>
          <circle r="3" className="hs-dot"><animateMotion dur="4s" repeatCount="indefinite" path={beam} /></circle>
          <circle r="2.4" className="hs-dot"><animateMotion dur="4s" begin="-2s" repeatCount="indefinite" path={`M${cx + 14} ${ys[4] + h} V20`} /></circle>
        </>}
      </Svg>
      {AS_LAYERS.map(([label, logo, product], k) => (
        <div key={label}>
          {logo && <img src={logo} alt="" className="as-logo" style={{ left: cx - 62, top: ys[k] - 4 }} />}
          <div className={`as-chip${logo ? ' hot' : ''}`} style={{ left: cx + w + 36, top: ys[k] }}>
            <span className="as-num">{String(k + 1).padStart(2, '0')}</span>
            <span><b>{label}</b>{product && <em>{product}</em>}</span>
          </div>
        </div>
      ))}
    </>
  );
}

// Model choice: one workload's constraints set against candidate models. Each candidate is measured on the
// same constraints through evaluation, and the one that fits is chosen. Drawn on a 640 x 420 stage.
const MF_NEEDS = [['Performance', 0.8], ['Latency', 0.9], ['Economics', 0.6], ['Data boundaries', 1], ['Supportability', 0.7]];
const MF_MODELS = [['Model A', [0.95, 0.5, 0.4, 0.6, 0.7]], ['Model B', [0.82, 0.92, 0.7, 1, 0.8]], ['Model C', [0.55, 0.95, 0.95, 0.5, 0.6]]];
function ModelFit() {
  const moving = !still();
  const ys = [88, 210, 332];
  const links = ys.map((y) => `M262 210 C300 210 300 ${y} 350 ${y}`);
  return (
    <>
      <Svg w={640} h={420}>
        <defs>
          <filter id="mf-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="420"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="mf-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="420"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>
        <ellipse cx="420" cy="210" rx="220" ry="150" fill="#1f5fff" opacity="0.2" filter="url(#mf-wide)" />
        {links.map((d, k) => <path key={d} d={d} className={`mf-link${k === 1 ? ' hot' : ''}`} />)}
        <path d={links[1]} className="mf-link glow" filter="url(#mf-soft)" />
        {moving && [0, 1].map((k) => <circle key={k} r="2.4" className="hs-dot"><animateMotion dur="2.4s" begin={`-${k * 1.2}s`} repeatCount="indefinite" path={links[1]} /></circle>)}
        {/* The evaluation gate every candidate passes */}
        <rect x="292" y="58" width="16" height="304" rx="8" className="mf-gate" />
      </Svg>
      <span className="mf-gate-label" style={{ left: 300, top: 384 }}>Evaluation</span>
      <div className="mf-work">
        <span className="mf-title">Workload</span>
        {MF_NEEDS.map(([n, v]) => (
          <div key={n} className="mf-row"><span>{n}</span><i><b style={{ width: `${v * 100}%` }} /></i></div>
        ))}
      </div>
      {MF_MODELS.map(([name, vals], k) => (
        <div key={name} className={`mf-model${k === 1 ? ' hot' : ''}`} style={{ top: ys[k] }}>
          <div className="mf-model-head"><span>{name}</span>{k === 1 && <em><Check weight="bold" />Fits</em>}</div>
          <div className="mf-bars">{vals.map((v, j) => <i key={j} className={v >= MF_NEEDS[j][1] ? 'ok' : ''} style={{ height: `${v * 100}%` }} />)}</div>
        </div>
      ))}
    </>
  );
}

/* ---------- About and Responsible AI ---------- */

// Our story: the work came before the category. Systems, workflows, governance and delivery, each proven
// in enterprise work, rise along one path to the company they became. Drawn on a 640 x 440 stage.
const OG_STEPS = [['Core systems', Database, 84, 352], ['Workflows', TreeStructure, 222, 284], ['Governance', ShieldCheck, 360, 212], ['Delivery teams', UsersThree, 486, 154]];
const OG_PATH = 'M20 392 C60 380 70 360 84 352 C140 320 170 300 222 284 C280 266 310 236 360 212 C410 190 450 168 486 154 C524 138 554 124 578 112';
function Origin() {
  const moving = !still();
  return (
    <>
      <Svg w={640} h={440}>
        <defs>
          <filter id="og-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="440"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="og-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="440"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>
        <ellipse cx="340" cy="250" rx="300" ry="150" fill="#1f5fff" opacity="0.16" filter="url(#og-wide)" />
        {OG_STEPS.map(([l, , x, y]) => <path key={l} d={`M${x} ${y + 34} V420`} className="og-drop" />)}
        <path d="M0 420 H640" className="og-base" />
        <path d={OG_PATH} className="og-path glow" filter="url(#og-soft)" />
        <path d={OG_PATH} className="og-path" />
        {OG_STEPS.map(([l, , x, y]) => <circle key={l} cx={x} cy={y} r="4" className="og-node" />)}
        {moving && [0, 1].map((k) => <circle key={k} r="2.6" className="hs-dot"><animateMotion dur="5s" begin={`-${k * 2.5}s`} repeatCount="indefinite" path={OG_PATH} /></circle>)}
      </Svg>
      {OG_STEPS.map(([l, Icon, x, y], k) => (
        <div key={l} className="og-tile" style={{ left: x - (k === 3 ? 44 : 0), top: y - 44, '--k': k }}>
          <Icon weight="duotone" /><span>{l}</span>
        </div>
      ))}
      <div className="og-mark" style={{ left: 584, top: 108 }}>
        <span className="orb-glass og-mark-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <svg viewBox="0 0 216 216" className="in-mark" aria-hidden="true"><path d="M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818" /><path d="M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z" /><rect width="20.488" height="57.366" x="97.293" y="122.341" rx="10.244" /></svg>
      </div>
    </>
  );
}

// The company: the operating model, the technology and specialist capability brought into one company,
// and AIR carrying the model into the customer's environment. Drawn on a 640 x 460 stage.
function Company() {
  const moving = !still();
  const ins = [[110, 96], [320, 72], [530, 96]].map(([x, y]) => `M${x} ${y + 52} C${x} ${y + 120} 320 170 320 222`);
  const out = 'M320 300 C320 350 380 380 470 392';
  return (
    <>
      <Svg w={640} h={460}>
        <defs>
          <filter id="cp-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="460"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="cp-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="460"><feGaussianBlur stdDeviation="22" /></filter>
        </defs>
        <ellipse cx="320" cy="262" rx="230" ry="150" fill="#1f5fff" opacity="0.2" filter="url(#cp-wide)" />
        <ellipse cx="320" cy="318" rx="86" ry="14" className="cp-ring glow" filter="url(#cp-soft)" />
        <ellipse cx="320" cy="318" rx="86" ry="14" className="cp-ring" />
        {ins.map((d) => <path key={d} d={d} className="cp-link glow" filter="url(#cp-soft)" />)}
        {ins.map((d) => <path key={`c${d}`} d={d} className="cp-link" />)}
        <path d={out} className="cp-link out glow" filter="url(#cp-soft)" />
        <path d={out} className="cp-link out" />
        {moving && [...ins, out].map((d, k) => <circle key={`m${k}`} r="2.4" className="hs-dot"><animateMotion dur="2.8s" begin={`-${k * 0.7}s`} repeatCount="indefinite" path={d} /></circle>)}
      </Svg>
      <div className="cp-src" style={{ left: 110, top: 96 }}><Compass weight="duotone" /><span>Operating model</span></div>
      <div className="cp-src" style={{ left: 320, top: 72 }}>
        <span className="cp-logos">{['/svg/intellilink.svg', '/svg/intellient-core.svg', '/svg/intellisphere.svg'].map((s) => <img key={s} src={s} alt="" />)}</span>
        <span>Technology</span>
      </div>
      <div className="cp-src" style={{ left: 530, top: 96 }}><UsersThree weight="duotone" /><span>Specialist capability</span></div>
      <div className="cp-core" style={{ left: 320, top: 262 }}>
        <span className="cp-core-glow" />
        <span className="orb-glass cp-core-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
        <svg viewBox="0 0 216 216" className="in-mark" aria-hidden="true"><path d="M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818" /><path d="M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z" /><rect width="20.488" height="57.366" x="97.293" y="122.341" rx="10.244" /></svg>
      </div>
      <span className="cp-air" style={{ left: 382, top: 362 }}>AIR</span>
      <div className="cp-dest" style={{ left: 540, top: 392 }}><Briefcase weight="duotone" /><span>Customer environment</span></div>
    </>
  );
}

// Responsible AI hero: a request passes three gates of glass (access, policy, authority) before it may act.
// One request outside the boundary is held at policy; at authority a person decides, and the evidence of
// that decision is retained. Drawn on a 640 x 520 stage.
const GT_GATES = [['Access', Fingerprint, 196], ['Policy', ShieldCheck, 320], ['Authority', Gavel, 444]];
function Gates3D() {
  const moving = !still();
  const route = 'M96 236 H540';
  const held = 'M320 236 C300 236 290 300 268 318';
  const floor = [
    ...Array.from({ length: 19 }, (_, k) => `M${320 + (k - 9) * 32} 330 L${320 + (k - 9) * 110} 520`),
    ...[338, 352, 372, 400, 440, 500].map((y) => `M0 ${y} H640`),
  ].join(' ');
  return (
    <>
      <Svg w={640} h={520}>
        <defs>
          <radialGradient id="gt-floor-g" cx="0.5" cy="0.1" r="0.7"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="gt-floor-m"><rect x="0" y="326" width="640" height="194" fill="url(#gt-floor-g)" /></mask>
          <filter id="gt-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="520"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="gt-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="520"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>
        <ellipse cx="320" cy="250" rx="300" ry="120" fill="#1f5fff" opacity="0.18" filter="url(#gt-wide)" />
        <path d={floor} className="gt-floor" mask="url(#gt-floor-m)" />
        <path d={route} className="gt-route glow" filter="url(#gt-soft)" />
        <path d={route} className="gt-route" />
        <path d={held} className="gt-held" />
        <circle cx="268" cy="318" r="9" className="gt-hold" />
        <path d="M264 314 L272 322 M272 314 L264 322" className="gt-hold-x" />
        {/* The accountable decision and the evidence it leaves */}
        <path d="M444 278 V392" className="gt-drop" />
        <path d="M444 430 C444 452 470 462 500 462" className="gt-drop" />
        {GT_GATES.map(([l, , x]) => <circle key={l} cx={x} cy="236" r="4" className="gt-node" />)}
        {moving && [0, 1].map((k) => <circle key={k} r="2.6" className="hs-dot"><animateMotion dur="3.6s" begin={`-${k * 1.8}s`} repeatCount="indefinite" path={route} /></circle>)}
      </Svg>
      {GT_GATES.map(([l, Icon, x]) => (
        <div key={l}>
          <span className="gt-gate" style={{ left: x, top: 236 }} />
          <div className="gt-tag" style={{ left: x, top: 116 }}><Icon weight="duotone" /><span>{l}</span></div>
        </div>
      ))}
      <div className="gt-chip" style={{ left: 56, top: 236 }}><Sparkle weight="duotone" /><span>Model</span></div>
      <div className="gt-chip hot" style={{ left: 566, top: 236 }}><CheckCircle weight="fill" /><span>Authorised</span></div>
      <span className="gt-held-label" style={{ left: 268, top: 346 }}>Held at the boundary</span>
      <div className="gt-chip" style={{ left: 444, top: 410 }}><User weight="fill" /><span>Accountable person</span></div>
      <div className="gt-chip evidence" style={{ left: 566, top: 462 }}><FileText weight="duotone" /><span>Evidence retained</span></div>
    </>
  );
}

// Control enters the design before production: the seven steps as one loop of design, production and
// review, the loop closing as models and policies change. Drawn on a 520 x 360 stage.
const CL_GROUPS = [['Design', [0, 1, 2]], ['Production', [3, 4, 5]], ['Review', [6]]];
function ControlLoop() {
  const [cx, cy, rx, ry] = [260, 190, 200, 120];
  const at = (k) => { const a = -Math.PI / 2 + (k / 7) * Math.PI * 2; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; };
  const arc = (a0, a1) => { const p = Array.from({ length: 30 }, (_, n) => { const a = -Math.PI / 2 + ((a0 + (a1 - a0) * (n / 29)) / 7) * Math.PI * 2; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; }); return `M${p.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L')}`; };
  const moving = !still();
  const loop = `M${cx} ${cy - ry} A${rx} ${ry} 0 1 1 ${cx - 0.1} ${cy - ry}`;
  return (
    <>
      <Svg w={520} h={360}>
        <defs>
          <filter id="cl-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="520" height="360"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="cl-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="520" height="360"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>
        <ellipse cx={cx} cy={cy} rx={rx * 0.7} ry={ry * 0.7} fill="#1f5fff" opacity="0.22" filter="url(#cl-wide)" />
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} className="cl-ring" />
        {[[0, 2], [3, 5], [6, 6.6]].map(([a, b], k) => <path key={k} d={arc(a - 0.2, b + 0.2)} className={`cl-arc${k === 1 ? ' hot' : ''}`} />)}
        <path d={arc(2.8, 5.2)} className="cl-arc glow" filter="url(#cl-soft)" />
        {moving && <circle r="3" className="hs-dot"><animateMotion dur="9s" repeatCount="indefinite" path={loop} /></circle>}
        {Array.from({ length: 7 }, (_, k) => { const [x, y] = at(k); return <circle key={k} cx={x} cy={y} r="13" className={`cl-node${k >= 3 && k <= 5 ? ' hot' : ''}`} />; })}
        {Array.from({ length: 7 }, (_, k) => { const [x, y] = at(k); return <text key={`t${k}`} x={x} y={y + 4} className="cl-num" textAnchor="middle">{String(k + 1).padStart(2, '0')}</text>; })}
      </Svg>
      {CL_GROUPS.map(([l, ks], k) => {
        const mid = (ks[0] + ks[ks.length - 1]) / 2;
        const a = -Math.PI / 2 + (mid / 7) * Math.PI * 2;
        return <span key={l} className={`cl-label${k === 1 ? ' hot' : ''}`} style={{ left: cx + (rx * 0.55) * Math.cos(a), top: cy + (ry * 0.55) * Math.sin(a) }}>{l}</span>;
      })}
    </>
  );
}

/* ---------- Industry and outcome detail pages ---------- */

// Signals into one decision: the sector's sources of context drawn in as threads of light to the point where
// the decision is made, through any control gates, to the accountable owner. Drawn on a 640 x 480 stage.
function SignalFlow({ inputs, hub, gates = [], out, owner }) {
  const moving = !still();
  const n = inputs.length;
  const ys = inputs.map((_, k) => 240 + (k - (n - 1) / 2) * 76);
  const hx = 262;
  const wires = ys.map((y) => `M168 ${y} C212 ${y} 214 240 ${hx - 48} 240`);
  const gx = gates.map((_, k) => (gates.length === 1 ? 410 : 350 + k * (120 / (gates.length - 1))));
  const route = `M${hx + 48} 240 H${out ? 498 : 560}`;
  return (
    <>
      <Svg w={640} h={480}>
        <defs>
          <filter id="sf-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="480"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="sf-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="480"><feGaussianBlur stdDeviation="22" /></filter>
        </defs>
        <ellipse cx="340" cy="240" rx="280" ry="170" fill="#1f5fff" opacity="0.18" filter="url(#sf-wide)" />
        <ellipse cx={hx} cy="330" rx="86" ry="13" className="sf-ring" />
        {wires.map((d) => <path key={d} d={d} className="sf-wire glow" filter="url(#sf-soft)" />)}
        {wires.map((d) => <path key={`c${d}`} d={d} className="sf-wire" />)}
        <path d={route} className="sf-route glow" filter="url(#sf-soft)" />
        <path d={route} className="sf-route" />
        {owner && <path d={`M${out ? 540 : 560} 262 V368`} className="sf-drop" />}
        {moving && [...wires, route].map((d, k) => <circle key={`m${k}`} r="2.2" className="hs-dot"><animateMotion dur="2.8s" begin={`-${k * 0.6}s`} repeatCount="indefinite" path={d} /></circle>)}
      </Svg>
      {inputs.map(([l, Icon], k) => <div key={l} className="sf-in" style={{ top: ys[k] }}><Icon weight="duotone" /><span>{l}</span></div>)}
      <div className="sf-hub" style={{ left: hx, top: 240 }}>
        <span className="orb-glass sf-hub-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
      </div>
      <span className="sf-hub-label" style={{ left: hx, top: 300 }}>{hub}</span>
      {gates.map(([l, Icon], k) => (
        <div key={l}>
          <span className="sf-gate" style={{ left: gx[k], top: 240 }} />
          <div className="sf-gate-tag" style={{ left: gx[k], top: k % 2 ? 340 : 140 }}><Icon weight="duotone" /><span>{l}</span></div>
        </div>
      ))}
      {out && <div className="sf-out" style={{ left: 556, top: 240 }}><CheckCircle weight="fill" /><span>{out}</span></div>}
      {owner && <div className="sf-owner" style={{ left: out ? 540 : 560, top: 392 }}><User weight="fill" /><span>{owner}</span></div>}
      <span className="sf-note">Illustrative</span>
    </>
  );
}

// Where the time goes: one case's elapsed time split into its parts, before and after the redesign. The
// figures are illustrative, a shape to look for rather than a claim. Drawn on a 640 x 420 stage.
function Breakdown({ title, parts, before, after, good }) {
  const moving = !still();
  const total = before.reduce((a, b) => a + b, 0);
  const W = 520;
  const seg = (vals) => { let x = 0; return vals.map((v) => { const s = [x, (v / total) * W]; x += s[1]; return s; }); };
  const rows = [['Before', seg(before)], ['After', seg(after)]];
  return (
    <>
      <Svg w={640} h={420}>
        <defs>
          <filter id="bk-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="420"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="bk-wide" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="420"><feGaussianBlur stdDeviation="22" /></filter>
        </defs>
        <ellipse cx="320" cy="210" rx="300" ry="150" fill="#1f5fff" opacity="0.16" filter="url(#bk-wide)" />
        {Array.from({ length: 11 }, (_, k) => <path key={k} d={`M${60 + k * 52} 96 V330`} className="bk-grid" />)}
        {rows.map(([, s], r) => s.map(([x, w], k) => {
          const y = r ? 236 : 140;
          const hot = good === k;
          return <rect key={`${r}${k}`} x={60 + x + 2} y={y} width={Math.max(w - 4, 2)} height="44" rx="8" className={`bk-seg s${k}${hot ? ' hot' : ''}${r ? ' after' : ''}`} />;
        }))}
        <path d={`M${60 + seg(after).reduce((a, [x, w]) => x + w, 0)} 228 V290`} className="bk-end" />
        {moving && <circle r="3" className="hs-dot"><animateMotion dur="3.4s" repeatCount="indefinite" path={`M60 258 H${60 + seg(after).reduce((a, [x, w]) => x + w, 0)}`} /></circle>}
      </Svg>
      <span className="bk-title">{title}</span>
      {rows.map(([l], r) => <span key={l} className="bk-row" style={{ top: r ? 258 : 162 }}>{l}</span>)}
      <div className="bk-legend">
        {parts.map((p, k) => <span key={p} className={`s${k}${good === k ? ' hot' : ''}`}><i />{p}</span>)}
      </div>
      <span className="sf-note">Illustrative</span>
    </>
  );
}

const DETAIL_SCENES = {
  'cx-manufacturing': () => <SignalFlow inputs={[['Production', Factory], ['Quality', CheckCircle], ['Maintenance', Wrench], ['Supply', Stack]]} hub="Plant decision" out="Decision made" owner="Plant lead" />,
  'cx-bfsi': () => <SignalFlow inputs={[['Application', FileText], ['Customer record', Database], ['Risk signals', Warning]]} hub="Case assembled" gates={[['Evidence', FileText], ['Authority', Gavel]]} out="Decision" owner="Accountable officer" />,
  'cx-healthcare-life-sciences': () => <SignalFlow inputs={[['Knowledge', Stack], ['Documents', FileText], ['Operations', Heartbeat]]} hub="Evidence prepared" gates={[['Review', Eye]]} out="Ready for review" owner="Accountable reviewer" />,
  'cx-enterprise-services': () => <SignalFlow inputs={[['Service request', Briefcase], ['Knowledge', Database], ['Onboarding', UsersThree], ['Managed work', Gear]]} hub="Context reassembled" out="Hand-off complete" owner="Service owner" />,
  'cx-operating-performance': () => <Breakdown title="Elapsed time for one case" parts={['Work', 'Waiting', 'Exceptions', 'Rework']} before={[18, 44, 22, 16]} after={[18, 14, 8, 4]} good={0} />,
  'cx-revenue-movement': () => <Breakdown title="Time to a commercial decision" parts={['Finding context', 'Hand-offs', 'Approval', 'Decision']} before={[34, 30, 24, 12]} after={[10, 8, 12, 12]} good={3} />,
  'cx-employee-capacity': () => <Breakdown title="Where a specialist's week goes" parts={['Coordination', 'Reconstruction', 'Expertise applied']} before={[36, 30, 34]} after={[12, 8, 80]} good={2} />,
  'cx-risk-control': () => <SignalFlow inputs={[['Request', ArrowFatLinesUp], ['Data', Database]]} hub="In the workflow" gates={[['Permissions', LockKey], ['Evidence', FileText], ['Approval', Gavel]]} out="Action taken" owner="Exception owner" />,
};


const SCENES = {
  exceptions: Exceptions, scope: Scope, clocks: Clocks, planes: Planes, residency: Residency, council: Council,
  layers: Layers, link: Link, core: Core, console: Console, gap: Gap, sectors: Sectors, outcomes: Outcomes, gates: Gates,
  stack: LayerStack,
  cubes: Cubes,
  model: () => <LayerStack labels={MODEL_LAYERS} top={100} gap={92} />,
  path: ModelPath,
  rise: Rise,
  request: Request,
  domain: Domain,
  terrain: Terrain,
  cubeflow: CubeFlow,
  happypath: HappyPath,
  casechain: CaseChain,
  techstack: TechStack,
  hub: Hub,
  funnel: Funnel,
  auditpanels: AuditPanels,
  brief: Brief,
  optional: Optional,
  owner: Owner,
  linkhub: LinkHub,
  governview: GovernView,
  residency2: ResidencyThread,
  briefdoc: BriefDoc,
  corework: CoreWork,
  archstack: ArchStack,
  origin: Origin,
  company: Company,
  gates3d: Gates3D,
  controlloop: ControlLoop,
  residency3: ResidencyOrbit, auditlens: AuditLens, sphereview: SphereView, sphereestate: SphereEstate, blueprintplan: BlueprintPlan, ownerframe: OwnerFrame, sectorhub: SectorHub, evidencegate: EvidenceGate, modelframes: ModelFrames, archfit: ArchitectureFit,
  ...DETAIL_SCENES,
  modelfit: ModelFit,
  handoff: Handoff,
  specialists: Specialists,
  governdome: GovernDome,
  pillars: () => <LayerStack labels={['', '', '']} top={132} gap={104} />,
};

// Scenes laid out on a stage other than the default 560 x 480.
const SIZES = { evidencegate: [790, 480], sectorhub: [720, 480], ownerframe: [1200, 500], blueprintplan: [740, 560], sphereestate: [960, 560], archfit: [900, 660], sphereview: [660, 540], modelframes: [640, 600], residency3: [680, 600], auditlens: [680, 520], request: [W, 300], cubeflow: [1200, 400], terrain: [892, 441], happypath: [892, 441], casechain: [800, 330], techstack: [600, 520], hub: [1000, 620], funnel: [1000, 600], auditpanels: [1000, 600], brief: [640, 540], optional: [2000, 729], owner: [1000, 500], linkhub: [640, 560], governview: [640, 600], governdome: [1400, 640], residency2: [696, 300], handoff: [640, 480], specialists: [640, 460], briefdoc: [640, 540], corework: [640, 560], archstack: [640, 560], modelfit: [640, 420], origin: [640, 440], company: [640, 460], gates3d: [640, 520], controlloop: [520, 360], ...Object.fromEntries(Object.keys(DETAIL_SCENES).map((k) => [k, /cx-(operating|revenue|employee)/.test(k) ? [640, 420] : [640, 480]])) };
// Scenes that fill a whole backdrop may grow past the usual cap.
const MAX_SCALE = { evidencegate: 1.06, ownerframe: 0.84, sectors: 1.3, domain: 1.3, terrain: 1.6, cubeflow: 1.3, happypath: 1.6, casechain: 1.3, techstack: 1.3, hub: 1.25, funnel: 1.25, auditpanels: 1.25, brief: 1.2, optional: 1.3, owner: 1, linkhub: 1.1, governview: 1.1, governdome: 1.3, residency2: 1.2, handoff: 1.1, specialists: 1.1, briefdoc: 1.1, corework: 1.1, archstack: 1.1, modelfit: 1.1, origin: 1.1, company: 1.1, gates3d: 1.1, controlloop: 1.1, ...Object.fromEntries(Object.keys(DETAIL_SCENES).map((k) => [k, 1.1])) };

export default function HeroScene({ scene }) {
  const [w, h] = SIZES[scene] || [W, H];
  const ref = useRef(null);
  const [k, setK] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width && height) setK(Math.min(width / w, height / h, MAX_SCALE[scene] || 1.1));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h, scene]);
  const Comp = SCENES[scene];
  return (
    <div className="hs" ref={ref}>
      <div className="hs-stage" style={{ width: w, height: h, transform: `translate(-50%, -50%) scale(${k})` }}>{Comp && <Comp />}</div>
    </div>
  );
}
