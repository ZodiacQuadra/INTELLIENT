import Eyebrow from './Eyebrow';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Seal, Pulse, ShieldCheck } from '@phosphor-icons/react';
import { EVIDENCE, HOME_LINKS } from '../content';
import ExploreLinks from './ExploreLinks';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Seal, Pulse, ShieldCheck];
const PANES = 4;

export default function Evidence() {
  const panesRef = useRef(null);

  // The glass layers fan out as the section scrolls into view: one layer per safeguard.
  useEffect(() => {
    const el = panesRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pane').forEach((pane, k) => {
        gsap.fromTo(pane,
          { xPercent: -k * 34, opacity: 0.35 + k * 0.1 },
          { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'center 45%', scrub: 0.6 } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="evidence">
      <div className="container evidence">
        <div className="evidence-copy">
          <div data-reveal>
            <Eyebrow id="evidence" />
            <h2 className="h-section">{EVIDENCE.title}</h2>
            <p className="lead" style={{ marginTop: 22 }}>{EVIDENCE.body}</p>
            <div style={{ marginTop: 28 }}><ExploreLinks links={HOME_LINKS.evidence} /></div>
          </div>
          <ul className="principles">
            {EVIDENCE.principles.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <li key={p.name} data-reveal style={{ '--i': i }}>
                  <span className="ico"><Icon /></span>
                  <div><strong>{p.name}</strong><span>{p.body}</span></div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="panes" ref={panesRef} aria-hidden="true">
          <span className="panes-glow" />
          {Array.from({ length: PANES }, (_, k) => <span key={k} className="pane" style={{ '--k': k }} />)}
        </div>
      </div>
    </section>
  );
}
