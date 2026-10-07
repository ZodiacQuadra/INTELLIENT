import { useEffect, useRef } from 'react';
import { ArrowRight, Warning, Scales, Gauge, Path, CheckCircle } from '@phosphor-icons/react';
import { AUDIT, PRIMARY_CTA } from '../content';

const STEP_ICONS = [Warning, Scales, Gauge, Path];

export default function Audit() {
  const cardRef = useRef(null);

  // The Blueprint plays its entrance only once it is well into view.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="air-audit">
      <div className="container audit">
        <div className="audit-copy">
          <h2 className="h-section" data-reveal>{AUDIT.title} <span className="accent">{AUDIT.accent}</span></h2>
          <p className="lead" data-reveal>{AUDIT.body}</p>
          <ul className="steps">
            {AUDIT.steps.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li key={s.name} data-reveal style={{ '--i': i }}>
                  <span className="ico"><Icon /></span>
                  <div><strong>{s.name}</strong><span>{s.body}</span></div>
                </li>
              );
            })}
          </ul>
          <div className="facts" data-reveal>
            {AUDIT.facts.map((f) => <span key={f} className="chip"><CheckCircle weight="fill" />{f}</span>)}
          </div>
          <div data-reveal>
            <a href={PRIMARY_CTA.href} className="btn btn-primary">{PRIMARY_CTA.label}<ArrowRight weight="bold" /></a>
          </div>
        </div>
        <div className="blueprint-stage">
          <article className="blueprint" ref={cardRef} aria-label="The Operating Blueprint, the deliverable of an AIR Audit">
            <div className="bp-head"><span>Confidential</span><span>Version 4.2</span></div>
            <h3>The Operating<br />Blueprint</h3>
            <p className="bp-sub">Verified specification</p>
            <ul>
              <li><CheckCircle weight="fill" />Exception map</li>
              <li><CheckCircle weight="fill" />Decision boundaries</li>
              <li><CheckCircle weight="fill" />Baseline: waiting against work</li>
              <li><CheckCircle weight="fill" />Target operating design</li>
            </ul>
            <div className="bp-foot"><span>AIR Audit</span><span>2 weeks</span></div>
          </article>
        </div>
      </div>
    </section>
  );
}
