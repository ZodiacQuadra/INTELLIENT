import Eyebrow from './Eyebrow';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Plugs, UsersThree, Pulse, ArrowRight } from '@phosphor-icons/react';
import { RESIDENCY, TECH, HOME_LINKS } from '../content';
import ExploreLinks from './ExploreLinks';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 01: set the domain baseline beside a glowing logo sphere; the field types itself in.
function BlueprintVisual() {
  return (
    <div className="sv sv-blueprint" aria-hidden="true">
      <div className="sv-sphere sm">
        <img src="/svg/intellient.svg" alt="Intellient" className="sv-sphere-logo" />
      </div>
      <div className="sv-field glass"><small>Operating Domain</small><span className="typed">Claims resolution</span></div>
      <div className="sv-field glass muted"><small>Decision boundaries</small><span>4 approvers per threshold</span></div>
      <span className="sv-btn">Set baseline</span>
    </div>
  );
}

// 02: production connectors arcing around a large logo sphere, wired to an activation point.
const ARC = [[58, 4], [44, 22], [30, 44], [44, 66], [58, 84]];
function ProductionVisual() {
  const systems = TECH.layers.find((l) => l.id === 'link').systems;
  return (
    <div className="sv sv-production" aria-hidden="true">
      <div className="sv-sphere lg"><span className="sv-word">Intellient</span></div>
      <span className="sv-activate glass"><span>Activate</span><i /></span>
      <span className="sv-wire" />
      {systems.map((s, i) => (
        <span key={s} className={`sv-chip glass${i === 2 ? ' live' : ''}`} style={{ left: `${ARC[i][0]}%`, top: `${ARC[i][1]}%`, '--k': i }}>
          <Plugs weight="bold" />{s}
        </span>
      ))}
    </div>
  );
}

// 03: rollout panel whose highlight steps through the adoption work.
function AdoptionVisual() {
  const rows = [
    { icon: UsersThree, name: 'Team enablement', sub: 'Owners trained on the new flow' },
    { icon: Pulse, name: 'Health checks', sub: 'Telemetry gates every release' },
    { icon: ArrowRight, name: 'Next domain', sub: 'Carry the Blueprint forward' },
  ];
  const [on, setOn] = useState(1);
  useEffect(() => {
    if (reduceMotion()) return undefined;
    const t = setInterval(() => setOn((v) => (v + 1) % rows.length), 1800);
    return () => clearInterval(t);
  }, [rows.length]);
  return (
    <div className="sv sv-adoption" aria-hidden="true">
      <div className="sv-panel glass">
        <div className="sv-panel-head"><strong>Domain rollout</strong><small>Scale and govern</small></div>
        {rows.map(({ icon: Icon, name, sub }, i) => (
          <div key={name} className={`sv-row glass${i === on ? ' on' : ''}`}>
            <span className="sv-row-ico"><Icon /></span>
            <div><strong>{name}</strong><small>{sub}</small></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VISUALS = [BlueprintVisual, ProductionVisual, AdoptionVisual];

export default function Residency() {
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;
    const bar = stack.querySelector('.sh-bar');
    const labels = stack.querySelectorAll('.sh');
    const cards = gsap.utils.toArray(stack.querySelectorAll('.step-card'));
    if (reduceMotion()) {
      bar.style.transform = 'scaleX(1)';
      labels.forEach((l) => l.classList.add('on'));
      return undefined;
    }
    const ctx = gsap.context(() => {
      // Progress line under 01 / 02 / 03 follows the scroll through the stack.
      ScrollTrigger.create({
        trigger: stack,
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: true,
        onUpdate: (self) => {
          bar.style.transform = `scaleX(${self.progress})`;
          const active = Math.min(labels.length - 1, Math.floor(self.progress * labels.length + 0.05));
          labels.forEach((l, i) => l.classList.toggle('on', i <= active));
        },
      });
      // Each card sinks back slightly as the next one slides over it.
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.95, filter: 'brightness(0.55)', ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top 85%', end: 'top 25%', scrub: true },
        });
      });
    }, stack);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="residency">
      <div className="container">
        <div className="section-head" data-reveal>
          <Eyebrow id="residency" />
          <h2 className="h-section">{RESIDENCY.title} <span className="accent">{RESIDENCY.accent}</span></h2>
          <p className="lead">{RESIDENCY.body}</p>
          <ExploreLinks links={HOME_LINKS.residency} />
        </div>
        <div className="steps-stack" ref={stackRef}>
          <div className="steps-head">
            {RESIDENCY.phases.map((p, i) => (
              <span key={p.name} className="sh">{`0${i + 1}.`} <em>{p.name}</em></span>
            ))}
            <i className="sh-bar" />
          </div>
          {RESIDENCY.phases.map((p, i) => {
            const Visual = VISUALS[i];
            return (
              <article key={p.name} className="step-card" style={{ '--i': i }}>
                <div className="sc-copy">
                  <time>{p.when}</time>
                  <h3>{p.name}</h3>
                  <p>{p.body}</p>
                  <ul>
                    {p.ships.map((s) => <li key={s}><CheckCircle weight="fill" />{s}</li>)}
                  </ul>
                </div>
                <Visual />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
