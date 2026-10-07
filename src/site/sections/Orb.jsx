import { useEffect, useRef, useState } from 'react';
import { TECH } from '../content';

const DWELL = 2800;

// Glass orb with a slowly swirling blue gradient inside; the centre cycles through
// the three technology layers with a blur cross-fade.
export default function Orb() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const items = TECH.layers;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !ref.current) return undefined;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => setIdx((i) => (i + 1) % items.length), DWELL);
    });
    io.observe(ref.current);
    return () => { clearInterval(timer); io.disconnect(); };
  }, [items.length]);

  return (
    <div className="orb-glass" ref={ref} role="img" aria-label="Intellient connects, orchestrates and governs">
      <span className="orb-swirl" aria-hidden="true" />
      <span className="orb-swirl two" aria-hidden="true" />
      {items.map((l, i) => (
        <div key={l.id} className={`orb-face${i === idx ? ' on' : ''}`} aria-hidden="true">
          <img src={l.logo} alt="" />
          <span>{l.layer}</span>
        </div>
      ))}
    </div>
  );
}
