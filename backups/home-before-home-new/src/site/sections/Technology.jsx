import {
  ArrowRight, Stack, Database, Cloud, UsersThree, GitBranch, ChartBar, ShieldCheck,
  Lightning, FileText, Graph, Briefcase, Plugs, Cube,
} from '@phosphor-icons/react';
import { TECH, PRIMARY_CTA, SECONDARY_CTA, HOME_LINKS } from '../content';
import ExploreLinks from './ExploreLinks';

// Deterministic spark layout for the speed ring: [start angle, radius %, duration s, length px].
const SPARKS = [
  [0, 33, 5.2, 14], [25, 41, 7.1, 9], [52, 29, 4.6, 12], [80, 38, 6.4, 10], [110, 45, 8.0, 8],
  [138, 31, 5.0, 13], [165, 40, 6.9, 9], [195, 35, 5.6, 12], [222, 43, 7.6, 8], [250, 30, 4.9, 14],
  [278, 39, 6.2, 10], [305, 46, 8.4, 7], [330, 33, 5.4, 12], [350, 42, 7.3, 9],
];

const TRACES = [
  'M58 64 H118 V34 H182',
  'M38 112 H98 V84 H150 V60',
  'M70 162 H128 V132 H198 V100 H246',
  'M150 192 V164 H208 V142',
  'M182 34 V72 H230 V112',
];
const NODES = [[58, 64], [182, 34], [38, 112], [150, 60], [70, 162], [246, 100], [150, 192], [208, 142], [230, 112]];
const RUNNERS = [[0, 3.2], [2, 4.4], [4, 3.6], [1, 5.0]];

const ROW_A = [Database, Cloud, UsersThree, GitBranch, ChartBar, ShieldCheck];
const ROW_B = [Lightning, FileText, Graph, Briefcase, Plugs, Cube];

function Caption({ title, line }) {
  return (
    <div className="ap-caption">
      <h3>{title}</h3>
      <p>{line}</p>
    </div>
  );
}

function SpeedVisual() {
  return (
    <div className="ap-visual ap-speed" aria-hidden="true">
      <div className="ring" />
      {SPARKS.map(([a, r, s, l], i) => (
        <span key={i} className="spark-orbit" style={{ '--a': `${a}deg`, '--r': `${r * 4.2}px`, '--s': `${s}s`, '--l': `${l}px` }}>
          <i />
        </span>
      ))}
    </div>
  );
}

function CircuitVisual({ animate }) {
  return (
    <div className="ap-visual ap-circuit" aria-hidden="true">
      <svg viewBox="0 0 284 226" preserveAspectRatio="xMidYMid meet">
        {TRACES.map((d) => <path key={d} d={d} />)}
        {NODES.map(([x, y]) => <circle key={`${x}-${y}`} className="node" cx={x} cy={y} r="5" />)}
        {animate && RUNNERS.map(([p, dur]) => (
          <circle key={p} className="runner" r="4.5">
            <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={TRACES[p]} keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

function ControlVisual() {
  return (
    <div className="ap-visual ap-control" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="track" style={{ '--k': i }}><i className="knob" /></span>
      ))}
    </div>
  );
}

function FlexVisual() {
  const row = (icons, cls) => (
    <div className={`icon-row ${cls}`}>
      {[...icons, ...icons].map((Icon, i) => <span key={i} className="icon-tile"><Icon weight="fill" /></span>)}
    </div>
  );
  return (
    <div className="ap-visual ap-flex" aria-hidden="true">
      {row(ROW_A, 'a')}
      {row(ROW_B, 'b')}
    </div>
  );
}

export default function Technology() {
  const [core, link, sphere] = TECH.layers;
  const animate = typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <section className="section" id="technology">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow"><Stack />{TECH.eyebrow}</span>
          <h2 className="h-section wide">{TECH.title}</h2>
          <p className="lead">{TECH.sub}</p>
          <ExploreLinks links={HOME_LINKS.technology} />
        </div>
        <div className="apart">
          <a href={HOME_LINKS.techCards.speed} className="ap-card ap-wide ap-link" data-reveal>
            <SpeedVisual />
            <Caption title={TECH.speed.name} line={TECH.speed.line} />
          </a>
          <a href={HOME_LINKS.techCards.core} className="ap-card ap-wide ap-link" data-reveal style={{ '--i': 1 }}>
            <CircuitVisual animate={animate} />
            <Caption title={core.name} line={core.line} />
          </a>
          <a href={HOME_LINKS.techCards.sphere} className="ap-card ap-link" data-reveal>
            <ControlVisual />
            <Caption title={sphere.name} line={sphere.line} />
          </a>
          <a href={HOME_LINKS.techCards.link} className="ap-card ap-link" data-reveal style={{ '--i': 1 }}>
            <FlexVisual />
            <Caption title={link.name} line={link.line} />
          </a>
          <article className="ap-card ap-cta" data-reveal style={{ '--i': 2 }}>
            <div>
              <h3>{TECH.cta.title}</h3>
              <p>{TECH.cta.line}</p>
            </div>
            <div className="ap-cta-actions">
              <a href={PRIMARY_CTA.href} className="btn btn-primary">{PRIMARY_CTA.label}<ArrowRight weight="bold" /></a>
              <a href={SECONDARY_CTA.href} className="ap-cta-link">{SECONDARY_CTA.label}</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
