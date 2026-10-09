import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Database, User, FileText, FolderOpen, ChartBar, Warning,
  CheckCircle, Check, Pause, Play,
} from '@phosphor-icons/react';
import { JOURNEY } from '../content';
import Eyebrow from './Eyebrow';

/*
  One illustrative case, stage by stage down a central spine. Each stage is a row: on the left the
  case as it runs today, in a red-tinted lane; in the middle the stage badge on the spine, with the
  red path bending into it and the blue path bending out; on the right the redesigned work as a glass
  card with a small product view. The spine fills down to the active stage, and the copy for that
  stage sits in a panel under the map.
*/
const STEP_MS = 3200;
const FIX_ICONS = [FileText, FolderOpen, User, ChartBar];
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Lines = ({ w }) => w.map((x, i) => <i key={i} className="ln" style={{ width: `${x}%` }} />);

function Docs() {
  return <span className="jr-docs"><i /><i /><i /></span>;
}

// Left lane: where the case stalls today.
function Before({ i, label }) {
  const chip = (Icon) => <span className="jr-stuck"><Icon />{label}</span>;
  const parts = [
    [chip(User), <Docs key="d" />],
    [<Docs key="d" />, chip(Database)],
    [
      <span key="p" className="jr-decide">
        <span className="jr-people"><i><User /></i><i><User /></i><i><User /></i><i className="q">?</i></span>
        <span className="jr-stuck sm">{label}</span>
      </span>,
      <span key="f" className="jr-doc"><FileText /></span>,
    ],
    [
      chip(Warning),
      <span key="c" className="jr-dimcard"><span className="bars"><i /><i /><i /></span><span className="lns"><Lines w={[90, 70, 80]} /></span></span>,
    ],
  ][i];
  return (
    <div className="jr-lane before" aria-hidden="true">
      <span className="jr-side">Before</span>
      <i className="jr-end" /><i className="jr-dash short" />
      {parts[0]}
      <i className="jr-dash arrow" />
      {parts[1]}
      <i className="jr-dash grow" />
    </div>
  );
}

// Right lane: the redesigned work as one glass card, with a glimpse of it in the product.
function After({ i, label }) {
  const Icon = FIX_ICONS[i];
  const mock = [
    <span key="m" className="jr-mock stacked"><span className="tick"><Check weight="bold" /></span><span className="lns"><Lines w={[90, 70, 55]} /></span></span>,
    <span key="m" className="jr-mock rows">
      <span className="row"><span className="tile"><FileText /></span><span className="lns"><Lines w={[80, 55]} /></span></span>
      <span className="row"><span className="tile"><FileText /></span><span className="lns"><Lines w={[70, 45]} /></span></span>
    </span>,
    <span key="m" className="jr-mock decide">
      <span className="row"><span className="avatar"><User /></span><span className="lns"><Lines w={[75, 50]} /></span></span>
      <span className="checks"><span><Check weight="bold" /><i className="ln" /></span><span><Check weight="bold" /><i className="ln" /></span></span>
      <CheckCircle weight="fill" className="ok" />
    </span>,
    <span key="m" className="jr-mock chart"><span className="bars"><i /><i /><i /><i /><i /></span><CheckCircle weight="fill" className="ok" /></span>,
  ][i];
  return (
    <div className="jr-lane after" aria-hidden="true">
      <i className="jr-lit lead" />
      <span className="jr-card">
        <span className="jr-fix"><Icon />{label}</span>
        {mock}
      </span>
      <i className="jr-lit grow" /><i className="jr-end lit" />
    </div>
  );
}

// The two paths meeting the badge: red bends up into it, blue bends back out to the lane.
function Bend() {
  return (
    <svg className="jr-bend" viewBox="0 0 140 128" aria-hidden="true">
      <path d="M0 66 C42 66 34 50 70 50" className="red" />
      <path d="M70 50 C106 50 98 66 140 66" className="blue" />
    </svg>
  );
}

// Faint flowing lines at the section edges, as in the rest of the site's backdrops.
function Waves() {
  return (
    <svg className="jr-waves" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
      {[0, 1, 2, 3].map((n) => (
        <g key={n}>
          <path d={`M-40 ${180 + n * 34} C120 ${260 + n * 30} 60 ${520 + n * 20} 220 ${900}`} />
          <path d={`M1480 ${120 + n * 38} C1300 ${240 + n * 26} 1400 ${520 + n * 24} 1220 ${900}`} />
        </g>
      ))}
    </svg>
  );
}

export default function Journey() {
  const { stages } = JOURNEY;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const [fill, setFill] = useState(0);
  const shellRef = useRef(null);
  const rowsRef = useRef(null);
  const badges = useRef([]);
  const animate = !reduceMotion();

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(shellRef.current);
    return () => io.disconnect();
  }, []);

  const go = (i) => setIdx((i + stages.length) % stages.length);
  const running = animate && inView && !paused && !hold;

  // Advance on a timer while the section is on screen, unless paused or a keyboard user is inside it.
  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => go(idx + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [idx, running]);

  // Fill the spine down to the active stage's badge, and keep it there as the layout changes.
  useLayoutEffect(() => {
    const place = () => {
      const b = badges.current[idx];
      if (!b || !rowsRef.current) return;
      setFill(b.getBoundingClientRect().top + b.offsetHeight / 2 - rowsRef.current.getBoundingClientRect().top);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(rowsRef.current);
    return () => ro.disconnect();
  }, [idx]);

  const s = stages[idx];

  return (
    <section className="section jr-section" id="journey">
      <Waves />
      <div className="container">
        <div className="jr-head" data-reveal>
          <div className="jr-head-copy">
            <Eyebrow id="journey" />
            <h2 className="h-section jr-title">{JOURNEY.title} <span className="accent">{JOURNEY.accent}</span></h2>
            <p className="lead">{JOURNEY.body}</p>
          </div>
          <ul className="jr-legend" aria-hidden="true">
            <li><i className="dash" />Before</li>
            <li className="on"><i />With Intellient</li>
          </ul>
        </div>

        <div
          ref={shellRef}
          className="jr-shell"
          data-reveal
          role="region"
          aria-roledescription="carousel"
          aria-label="Illustrative operating workflow"
          onFocus={(e) => { if (e.target.matches(':focus-visible')) setHold(true); }}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHold(false); }}
        >
          <div className="jr-rows" ref={rowsRef} role="tablist" aria-label="Workflow stages">
            <span className="jr-spine" aria-hidden="true"><i style={{ height: fill }} /></span>
            {stages.map((st, i) => (
              <div key={st.label} className={`jr-row${i === idx ? ' on' : ''}${i < idx ? ' done' : ''}`}>
                <Before i={i} label={st.stuck} />
                <div className="jr-mid">
                  <Bend />
                  <button role="tab" aria-selected={i === idx} className="jr-stage" onClick={() => setIdx(i)}>
                    <b className="jr-badge" ref={(el) => { badges.current[i] = el; }}>{`0${i + 1}`}</b>
                    <span className="jr-name">{st.label}</span>
                  </button>
                </div>
                <After i={i} label={st.fix} />
              </div>
            ))}
          </div>

          <div className="jr-copy" aria-live={hold ? 'polite' : 'off'}>
            <div key={idx} className="jr-copy-in">
              <h3>{s.title}</h3>
              <div className="jr-copy-body">
                <p><b>Before:</b> {s.before}</p>
                <p className="after"><b>With Intellient:</b> {s.after}</p>
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
              <button className="jr-ctrl next" onClick={() => go(idx + 1)} aria-label="Next stage"><ArrowRight /></button>
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
