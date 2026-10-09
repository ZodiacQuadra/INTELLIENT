import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Hourglass, Database, User, FileText, FolderOpen, ChartBar, Warning,
  CheckCircle, Check, Pause, Play,
} from '@phosphor-icons/react';
import { JOURNEY } from '../content';
import Eyebrow from './Eyebrow';

/*
  One illustrative case, stage by stage down a central spine. Each stage is a row: on the left the
  case as it runs today (dashed, grey, stuck), on the right the redesigned work (lit, with a small
  product view). The case orb travels down the spine to the active stage, which is fully lit; the
  copy for that stage sits in a fixed row under the map.
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
    [chip(Hourglass), <Docs key="d" />],
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
      <i className="jr-end" /><i className="jr-dash short" />
      {parts[0]}
      <i className="jr-dash arrow" />
      {parts[1]}
      <i className="jr-dash grow" />
    </div>
  );
}

// Right lane: the redesigned work and a glimpse of it in the product.
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
      <span className="jr-fix"><Icon />{label}</span>
      <i className="jr-lit short" />
      {mock}
      <i className="jr-lit grow" /><i className="jr-end lit" />
    </div>
  );
}

export default function Journey() {
  const { stages } = JOURNEY;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const [orbTop, setOrbTop] = useState(0);
  const shellRef = useRef(null);
  const rowsRef = useRef(null);
  const junctions = useRef([]);
  const animate = !reduceMotion();

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(shellRef.current);
    return () => io.disconnect();
  }, []);

  const go = (i) => setIdx((i + stages.length) % stages.length);
  const running = animate && inView && !paused && !hold;

  // Advance on a timer while the panel is on screen, unless paused or a keyboard user is inside it.
  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => go(idx + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [idx, running]);

  // Put the case orb on the active stage's junction, and keep it there as the layout changes.
  useLayoutEffect(() => {
    const place = () => {
      const j = junctions.current[idx];
      if (!j || !rowsRef.current) return;
      setOrbTop(j.getBoundingClientRect().top + j.offsetHeight / 2 - rowsRef.current.getBoundingClientRect().top);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(rowsRef.current);
    return () => ro.disconnect();
  }, [idx]);

  const s = stages[idx];

  return (
    <section className="section jr-section" id="journey">
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
            <span className="jr-spine" aria-hidden="true"><i style={{ height: orbTop }} /></span>
            <span className="jr-orb" style={{ top: orbTop }} aria-hidden="true" />
            {stages.map((st, i) => (
              <div key={st.label} className={`jr-row${i === idx ? ' on' : ''}${i < idx ? ' done' : ''}`}>
                <span className="jr-side">Before</span>
                <button role="tab" aria-selected={i === idx} className="jr-stage" onClick={() => setIdx(i)}>
                  <b className="jr-badge">{`0${i + 1}`}</b>
                  <span className="jr-name">{st.label}</span>
                </button>
                <span className="jr-side on">With Intellient</span>
                <Before i={i} label={st.stuck} />
                <i className="jr-junction" ref={(el) => { junctions.current[i] = el; }} aria-hidden="true" />
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
