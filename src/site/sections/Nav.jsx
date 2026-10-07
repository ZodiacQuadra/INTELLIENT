import { useState } from 'react';
import { ArrowRight, List, X } from '@phosphor-icons/react';
import { NAV, PRIMARY_CTA } from '../content';

export default function Nav({ scrolled, active }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <a href="#intro" className="nav-brand" aria-label="Intellient home">
          <img src="/svg/intellient.svg" alt="Intellient" width="134" height="34" />
        </a>
        <nav className="nav-pill" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={active === n.href.slice(1) ? 'is-active' : ''}>{n.label}</a>
          ))}
        </nav>
        <div className="nav-end">
          <a href={PRIMARY_CTA.href} className="btn btn-primary btn-sm">
            {PRIMARY_CTA.label}<ArrowRight weight="bold" />
          </a>
          <button
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <List />}
          </button>
        </div>
      </header>
      {open && (
        <nav id="nav-sheet" className="nav-sheet" aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
          <a href={PRIMARY_CTA.href} className="btn btn-primary" onClick={() => setOpen(false)}>
            {PRIMARY_CTA.label}<ArrowRight weight="bold" />
          </a>
        </nav>
      )}
    </>
  );
}
