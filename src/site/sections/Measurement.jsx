import Eyebrow from './Eyebrow';
import { useState } from 'react';
import {
  ArrowRight, Cloud, SlackLogo, Envelope, FileText, MagnifyingGlass, CheckCircle, Flag,
  User, Receipt, ShieldCheck, UsersThree, Clock,
} from '@phosphor-icons/react';
import { MEASURE, HOME_LINKS } from '../content';
import ExploreLinks from './ExploreLinks';

/*
  Four panels share one 400 x 260 coordinate space each. A single glowing line runs through
  all of them: every panel's line leaves its right edge at the height the next one enters,
  so the track reads as one continuous journey. HTML tiles sit on top at % positions.
*/
const W = 400;
const H = 260;
const at = (x, y) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Glow({ d, id }) {
  return (
    <>
      <path d={d} className="mx-line-glow" />
      <path d={d} className="mx-line" id={id} />
    </>
  );
}

function Runner({ path, dur, extra = {} }) {
  if (reduce()) return null;
  return (
    <circle r="3.6" className="mx-runner">
      <animateMotion dur={dur} repeatCount="indefinite" path={path} {...extra} />
    </circle>
  );
}

/* ---------- Waiting: fast work, long queues ---------- */
const WAIT_PATH = 'M0 140 H400';
const WAIT_STEPS = [
  { x: 55, icon: FileText, name: 'Intake', mins: '4 min' },
  { x: 200, icon: MagnifyingGlass, name: 'Review', mins: '9 min' },
  { x: 345, icon: CheckCircle, name: 'Decision', mins: '6 min' },
];
function WaitingVisual() {
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-svg" aria-hidden="true">
        <Glow d={WAIT_PATH} />
        <path d="M85 140 H170" className="mx-queue" />
        <path d="M230 140 H315" className="mx-queue" />
        <Runner path={WAIT_PATH} dur="7s" extra={{ calcMode: 'linear', keyPoints: '0;0.0625;0.2125;0.425;0.575;0.7875;0.9375;1', keyTimes: '0;0.03;0.07;0.45;0.49;0.9;0.94;1' }} />
      </svg>
      {WAIT_STEPS.map(({ x, icon: Icon, name, mins }) => (
        <div key={name} className="mx-step" style={at(x, 140)}><Icon /><span>{name}</span><em>{mins}</em></div>
      ))}
      <div className="mx-pill sm" style={at(127, 84)}><Clock /><span><b>2.6 days</b> in queue</span></div>
      <div className="mx-pill sm" style={at(272, 84)}><Clock /><span><b>6.4 days</b> in queue</span></div>
    </>
  );
}

/* ---------- Coordination: a handoff hopping across seven systems ---------- */
const COORD_PATH = 'M0 140 H400';
const SYSTEMS = [
  { name: 'SAP', img: '/logos/sap-mark.svg' },
  { name: 'Salesforce', icon: Cloud },
  { name: 'Workday', img: '/logos/workday.svg', wide: true, tint: true },
  { name: 'Azure', img: '/logos/azure-mark.svg', tint: true },
  { name: 'GitHub', img: '/logos/github-mark.svg' },
  { name: 'Slack', icon: SlackLogo },
  { name: 'Email', icon: Envelope },
];
const COORD_DUR = 6.3;
function CoordinationVisual() {
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-svg" aria-hidden="true">
        <Glow d={COORD_PATH} />
        <Runner path={COORD_PATH} dur={`${COORD_DUR}s`} />
      </svg>
      {SYSTEMS.map(({ name, img, icon: Icon, wide, tint }, i) => {
        const x = 28 + i * 57.3;
        return (
          <div key={name} className="mx-sys mx-flash" style={{ ...at(x, 140), '--dur': `${COORD_DUR}s`, animationDelay: `${(x / W) * COORD_DUR - 0.25}s` }}>
            {img ? <img src={img} alt="" className={`${wide ? 'wide' : ''}${tint ? ' tint' : ''}`} /> : <Icon weight="fill" />}
            <span>{name}</span>
          </div>
        );
      })}
    </>
  );
}

/* ---------- Rework: a loop that sends cases backwards ---------- */
const RW_MAIN = 'M0 140 C30 140 40 165 75 165 L330 165 C372 165 372 215 400 215';
const RW_LOOP = 'M245 140 C245 66 160 66 160 140';
const RW_STEPS = [
  { x: 75, icon: FileText, name: 'Intake' },
  { x: 160, icon: MagnifyingGlass, name: 'Review', hot: true },
  { x: 245, icon: CheckCircle, name: 'Approve' },
  { x: 330, icon: Flag, name: 'Complete' },
];
function ReworkVisual() {
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-svg" aria-hidden="true">
        <defs>
          <marker id="mx-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#cfeaff" />
          </marker>
        </defs>
        <ellipse cx="205" cy="150" rx="168" ry="96" className="mx-orbit" />
        <ellipse cx="205" cy="150" rx="120" ry="66" className="mx-orbit" />
        <Glow d={RW_MAIN} />
        <path d={RW_LOOP} className="mx-loop-glow" />
        <path d={RW_LOOP} className="mx-loop" markerEnd="url(#mx-arrow)" />
        <Runner path={RW_MAIN} dur="4.6s" />
        <Runner path={RW_LOOP} dur="2.6s" />
      </svg>
      {RW_STEPS.map(({ x, icon: Icon, name, hot }) => (
        <div key={name} className={`mx-step${hot ? ' hot' : ''}`} style={at(x, 165)}><Icon /><span>{name}</span></div>
      ))}
      <div className="mx-pill big" style={at(202, 80)}><b>38%</b><span>of cases</span></div>
    </>
  );
}

/* ---------- Decisions: approvals stacking up against a 72-hour clock ---------- */
const DEC_PATH = 'M0 215 C26 215 34 222 52 222 L146 182 L221 137 L296 92 L352 50 L364 36';
const APPROVERS = [
  { x: 100, y: 200, n: '01', name: 'Manager', icon: User, reach: 0.24 },
  { x: 175, y: 155, n: '02', name: 'Finance', icon: Receipt, reach: 0.44 },
  { x: 250, y: 110, n: '03', name: 'Legal', icon: ShieldCheck, reach: 0.64 },
  { x: 322, y: 66, n: '04', name: 'Executive', icon: UsersThree, reach: 0.83 },
];
const DEC_DUR = 5;
const TICKS = [[40, '0h'], [148, '24h'], [256, '48h'], [364, '72h']];
function DecisionsVisual() {
  const animate = !reduce();
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-svg" aria-hidden="true">
        <Glow d={DEC_PATH} />
        <circle cx="364" cy="36" r="5" className="mx-end" />
        <line x1="40" y1="236" x2="364" y2="236" className="mx-axis" />
        <line x1="40" y1="236" x2={animate ? 40 : 364} y2="236" className="mx-axis-fill">
          {animate && <animate attributeName="x2" values="40;364" dur={`${DEC_DUR}s`} repeatCount="indefinite" />}
        </line>
        {TICKS.map(([x, t], i) => (
          <g key={t}>
            <circle cx={x} cy="236" r={i === 3 ? 4 : 2.6} className={i === 3 ? 'mx-tick end' : 'mx-tick'} />
            <text x={x} y="254" textAnchor="middle" className={i === 3 ? 'mx-tick-label end' : 'mx-tick-label'}>{t}</text>
          </g>
        ))}
        <Runner path={DEC_PATH} dur={`${DEC_DUR}s`} />
      </svg>
      {APPROVERS.map(({ x, y, n, name, icon: Icon, reach }) => (
        <div key={name} className="mx-appr mx-flash" style={{ ...at(x, y), '--dur': `${DEC_DUR}s`, animationDelay: `${reach * DEC_DUR - 0.2}s` }}>
          <Icon /><span><small>{n}</small>{name}</span>
        </div>
      ))}
    </>
  );
}

const VISUALS = { waiting: WaitingVisual, coordination: CoordinationVisual, rework: ReworkVisual, decisions: DecisionsVisual };

function Stat({ value, label, to }) {
  const [n, u, small] = value;
  return (
    <div className={`mx-stat${to ? ' to' : ''}`}>
      <b><span className="n">{n}</span> <span className={`u${small ? ' small' : ''}`}>{u}</span></b>
      <small>{label}</small>
    </div>
  );
}

export default function Measurement() {
  const [idx, setIdx] = useState(0);
  const dims = MEASURE.dimensions;

  return (
    <section className="section mx-section" id="measurement">
      <div className="container">
        <div className="section-head" data-reveal>
          <Eyebrow id="measurement" />
          <h2 className="h-section">{MEASURE.title} <span className="accent">{MEASURE.accent}</span></h2>
          <p className="lead">{MEASURE.body}</p>
          <ExploreLinks links={HOME_LINKS.measurement} />
        </div>
      </div>
      <div className="container" data-reveal>
        <div className="m-tabs" role="tablist" aria-label="Dimensions of operating work">
          {dims.map((m, i) => (
            <button key={m.id} role="tab" aria-selected={i === idx} className={`m-tab${i === idx ? ' on' : ''}`} onClick={() => setIdx(i)}>
              {m.name}
            </button>
          ))}
        </div>
        <div className="mx-viewport">
          <div className="mx-track">
            {dims.map((d, i) => {
              const Visual = VISUALS[d.id];
              return (
                <article key={d.id} className={`mx-panel${i === idx ? ' on' : ''}`} aria-hidden={i !== idx}>
                  <div className="mx-side">
                    <div className="mx-head">
                      <span className="mx-eyebrow">{`0${i + 1}`} / {d.name}</span>
                      <p>{d.line}</p>
                      <small className="mx-detail">{d.detail}</small>
                    </div>
                    <div className="mx-stats">
                      <Stat value={d.from} label={d.fromLabel} />
                      <span className="mx-arrow" aria-hidden="true"><ArrowRight /></span>
                      <Stat value={d.to} label={d.toLabel} to />
                    </div>
                  </div>
                  <div className="mx-vis"><Visual /></div>
                </article>
              );
            })}
          </div>
        </div>
        <p className="note mx-note">Illustrative process example · not a customer result</p>
      </div>
    </section>
  );
}
