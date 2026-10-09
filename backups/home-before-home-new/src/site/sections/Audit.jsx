import Eyebrow from './Eyebrow';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Warning, Scales, Gauge, Path, CheckCircle } from '@phosphor-icons/react';
import { AUDIT, PRIMARY_CTA, HOME_LINKS } from '../content';
import ExploreLinks from './ExploreLinks';

const STEP_ICONS = [Warning, Scales, Gauge, Path];

export default function Audit() {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const manualTimerRef = useRef(null);

  // Entrance observer
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleCardClick = () => {
    setFlipped((f) => !f);
    setIsManual(true);
    clearTimeout(manualTimerRef.current);
    manualTimerRef.current = setTimeout(() => {
      setIsManual(false);
    }, 8000);
  };

  useEffect(() => {
    return () => clearTimeout(manualTimerRef.current);
  }, []);

  return (
    <section className="section" id="air-audit">
      <div className="container audit">
        <div className="audit-copy">
          <Eyebrow id="audit" reveal />
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
          <div className="btn-row" data-reveal>
            <a href={PRIMARY_CTA.href} className="btn btn-primary">{PRIMARY_CTA.label}<ArrowRight weight="bold" /></a>
            {HOME_LINKS.audit.map((l) => <a key={l.href} href={l.href} className="btn btn-ghost">{l.label}<ArrowRight /></a>)}
          </div>
        </div>

        <div className="blueprint-stage">
          <div
            className="blueprint-3d-wrap"
            ref={cardRef}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(); } }}
            aria-label="The Operating Blueprint. Click to flip card."
          >
            <div className={`blueprint-flipper ${isManual ? (flipped ? 'manual-back' : 'manual-front') : 'auto-rotating'}`}>
              {/* FRONT FACE: The Iconic Cover with Intellient Logo */}
              <div className="blueprint-face bp-face-front">
                <div className="bp-head">
                  <span className="bp-security-tag">CONFIDENTIAL BLUEPRINT</span>
                  <span className="bp-security-dot" />
                </div>
                <div className="bp-cover-center">
                  <div className="bp-logo-halo">
                    <img src="/svg/intellient-core.svg" alt="" className="bp-logo-icon" width="62" height="62" />
                  </div>
                  <img src="/svg/intellient.svg" alt="Intellient" className="bp-logo-wordmark" width="150" height="36" />
                  <div className="bp-cover-title">
                    <span>THE OPERATING</span>
                    <span>BLUEPRINT</span>
                  </div>
                </div>
                <div className="bp-foot">
                  <span>VERIFIED SPECIFICATION</span>
                  <span>VERSION 4.2</span>
                </div>
                <div className="bp-shine" />
              </div>

              {/* BACK FACE: The Specification Details */}
              <div className="blueprint-face bp-face-back">
                <div className="bp-head">
                  <span>Confidential</span>
                  <span>Version 4.2</span>
                </div>
                <h3>The Operating<br />Blueprint</h3>
                <p className="bp-sub">Verified specification</p>
                <ul>
                  <li><CheckCircle weight="fill" />Exception map</li>
                  <li><CheckCircle weight="fill" />Decision boundaries</li>
                  <li><CheckCircle weight="fill" />Baseline: waiting against work</li>
                  <li><CheckCircle weight="fill" />Target operating design</li>
                </ul>
                <div className="bp-foot">
                  <span>AIR Audit</span>
                  <span>2 weeks</span>
                </div>
                <div className="bp-shine" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
