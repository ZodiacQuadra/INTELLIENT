import { useState } from 'react';
import { ArrowRight, List, X } from '@phosphor-icons/react';
import { PRIMARY_NAV, NAV_CTA, navActive } from '../pages/pages';

// Site navigation, the same on every page: the primary links from the approved content. `path` lights
// up the link whose section contains the current page.
export default function Nav({ scrolled, path = '/' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <a href="/" className="nav-brand" aria-label="Intellient home">
          <img src="/svg/intellient.svg" alt="Intellient" width="134" height="34" />
        </a>
        <nav className="nav-pill" aria-label="Main">
          {PRIMARY_NAV.map((item) => (
            <div key={item.href} className="nav-item">
              <a href={item.href} className={navActive(item, path) ? 'is-active' : ''} aria-current={path === item.href ? 'page' : undefined}>{item.label}</a>
            </div>
          ))}
        </nav>
        <div className="nav-end">
          <a href={NAV_CTA.href} className="btn btn-primary btn-sm">
            {NAV_CTA.label}<ArrowRight weight="bold" />
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
          {PRIMARY_NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href={NAV_CTA.href} className="btn btn-primary" onClick={() => setOpen(false)}>
            {NAV_CTA.label}<ArrowRight weight="bold" />
          </a>
        </nav>
      )}
    </>
  );
}
