import { useLayoutEffect, useRef, useState } from 'react';
import {
  FileText, CheckCircle, Warning, Trash, Ruler, Sparkle, ArrowFatLinesUp, Fingerprint, ShieldCheck, Eye, Coins,
  Gavel, User, TreeStructure, Database, UsersThree, Compass, PencilRuler, LockKey, Stack, ChartBar, ListChecks,
  Robot, Wrench, Factory, Bank, Heartbeat, Briefcase, Gauge, TrendUp, Target, UserCheck,
} from '@phosphor-icons/react';

/*
  Hero visuals for the inner pages, one per page, drawn from that page's own content.
  Every scene is laid out on a fixed 560 x 480 stage and scaled to fit its box, so the glass chips,
  connector lines and particles keep the same proportions as the home page at any width.
*/
const W = 560;
const H = 480;
const still = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

const Svg = ({ children, h = H }) => <svg className="hs-svg" viewBox={`0 0 ${W} ${h}`}>{children}</svg>;

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
const line = (list) => `M${list.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L')}`;

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
const through = (cps) => (t) => {
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

const SCENES = {
  exceptions: Exceptions, scope: Scope, clocks: Clocks, planes: Planes, residency: Residency, council: Council,
  layers: Layers, link: Link, core: Core, console: Console, gap: Gap, sectors: Sectors, outcomes: Outcomes, gates: Gates,
  stack: LayerStack,
  cubes: Cubes,
  model: () => <LayerStack labels={MODEL_LAYERS} top={100} gap={92} />,
  path: ModelPath,
  rise: Rise,
  request: Request,
  pillars: () => <LayerStack labels={['', '', '']} top={132} gap={104} />,
};

// Scenes laid out on a stage other than the default 560 x 480.
const SIZES = { request: [W, 300] };

export default function HeroScene({ scene }) {
  const [w, h] = SIZES[scene] || [W, H];
  const ref = useRef(null);
  const [k, setK] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width && height) setK(Math.min(width / w, height / h, 1.1));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  const Comp = SCENES[scene];
  return (
    <div className="hs" ref={ref}>
      <div className="hs-stage" style={{ width: w, height: h, transform: `translate(-50%, -50%) scale(${k})` }}>{Comp && <Comp />}</div>
    </div>
  );
}
