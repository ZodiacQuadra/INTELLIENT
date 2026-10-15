import { useState } from 'react';
import { ArrowRight, CaretDown, List, X } from '@phosphor-icons/react';
import { PRIMARY_CTA } from '../content';
import { SITE_MAP, inGroup } from '../pages/pages';

// Site navigation, the same on every page: one dropdown per group of pages, opened on hover or
// keyboard focus. `path` lights up the group that contains the current page.
export default function Nav({ scrolled, path = '/' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <a href="/" className="nav-brand" aria-label="Intellient home">
          <img src="/svg/intellient.svg" alt="Intellient" width="134" height="34" />
        </a>
        <nav className="nav-pill" aria-label="Main">
          {SITE_MAP.map((g) => (
            <div key={g.title} className="nav-item">
              <a href={g.href} className={inGroup(g, path) ? 'is-active' : ''} aria-haspopup="true">
                {g.title}<CaretDown weight="bold" />
              </a>
              <div className="nav-drop">
                {g.links.map((l) => (
                  <a key={l.href} href={l.href} className={path === l.href ? 'is-current' : ''}>
                    <strong>{l.label}</strong>
                    <small>{l.desc}</small>
                  </a>
                ))}
              </div>
            </div>
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
          {SITE_MAP.map((g) => (
            <div key={g.title} className="nav-sheet-group">
              <span>{g.title}</span>
              {g.links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
              ))}
            </div>
          ))}
          <a href={PRIMARY_CTA.href} className="btn btn-primary" onClick={() => setOpen(false)}>
            {PRIMARY_CTA.label}<ArrowRight weight="bold" />
          </a>
        </nav>
      )}
    </>
  );
}
