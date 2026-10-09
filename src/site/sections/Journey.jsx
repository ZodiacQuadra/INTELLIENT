import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Hourglass, Pause, Play, Sparkle } from '@phosphor-icons/react';
import { JOURNEY } from '../content';
import Eyebrow from './Eyebrow';

// One illustrative case, stage by stage: how it behaves today and once the work is redesigned.
// The active stage's progress bar is the timer: when its fill animation ends, the next stage opens.
// It runs only while the section is on screen, pauses on hover or focus, and never under reduced motion.
export default function Journey() {
  const { stages } = JOURNEY;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const shellRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(shellRef.current);
    return () => io.disconnect();
  }, []);

  const go = (i) => setIdx((i + stages.length) % stages.length);
  const running = inView && !paused && !hold;
  const s = stages[idx];

  return (
    <section className="section jr-section" id="journey">
      <div className="container">
        <div className="section-head" data-reveal>
          <Eyebrow id="journey" />
          <h2 className="h-section">{JOURNEY.title} <span className="accent">{JOURNEY.accent}</span></h2>
          <p className="lead">{JOURNEY.body}</p>
        </div>
        <div
          ref={shellRef}
          className={`jr-shell${running ? '' : ' is-held'}`}
          data-reveal
          role="region"
          aria-roledescription="carousel"
          aria-label="Illustrative operating workflow"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHold(false); }}
        >
          <div className="jr-rail" role="tablist" aria-label="Workflow stages">
            {stages.map((st, i) => (
              <button
                key={st.label}
                role="tab"
                aria-selected={i === idx}
                className={`jr-step${i === idx ? ' on' : ''}${i < idx ? ' done' : ''}`}
                onClick={() => setIdx(i)}
              >
                <span className="jr-num">{`0${i + 1}`}</span>
                <span className="jr-label">{st.label}</span>
                <i className="jr-bar" aria-hidden="true">
                  {i === idx && <b key={idx} onAnimationEnd={() => go(idx + 1)} />}
                </i>
              </button>
            ))}
          </div>

          <div key={idx} className="jr-stage" aria-live={hold ? 'polite' : 'off'}>
            <h3 className="jr-title">{s.title}</h3>
            <div className="jr-compare">
              <div className="jr-card before">
                <span className="jr-tag"><Hourglass />Before</span>
                <p>{s.before}</p>
              </div>
              <span className="jr-arrow" aria-hidden="true"><ArrowRight /></span>
              <div className="jr-card after">
                <span className="jr-tag"><Sparkle weight="fill" />With Intellient</span>
                <h4>{s.note}</h4>
                <p>{s.after}</p>
              </div>
            </div>
          </div>

          <div className="jr-foot">
            <ol className="jr-path">
              {JOURNEY.path.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <div className="jr-controls">
              <span className="jr-count">{`0${idx + 1}`} / {`0${stages.length}`}</span>
              <button className="jr-ctrl" onClick={() => go(idx - 1)} aria-label="Previous stage"><ArrowLeft /></button>
              <button className="jr-ctrl" onClick={() => go(idx + 1)} aria-label="Next stage"><ArrowRight /></button>
              <button className="jr-ctrl" onClick={() => setPaused((v) => !v)} aria-label={paused ? 'Resume automatic progression' : 'Pause automatic progression'}>
                {paused ? <Play weight="fill" /> : <Pause weight="fill" />}
              </button>
            </div>
          </div>
        </div>
        <p className="note jr-note">Illustrative process example · not a customer result</p>
      </div>
    </section>
  );
}
