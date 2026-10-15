import { useState } from 'react';
import { ArrowRight, CaretDown, List, X } from '@phosphor-icons/react';
import { PRIMARY_NAV, NAV_CTA, navActive, SITE_MAP, COLLECTIONS } from '../pages/pages';

// Each primary link opens the pages in its section. Industries and Outcomes list their entries;
// Company leaves those two out because they have their own links.
const collection = (name, base) => COLLECTIONS[name].map((c) => ({ href: `${base}/${c.slug}`, label: c.name, desc: c.summary }));
const dropFor = (item) => {
  if (item.href === '/outcomes') return collection('Outcomes', '/outcomes');
  if (item.href === '/industries') return collection('Industries', '/industries');
  const group = SITE_MAP.find((g) => g.title === item.label);
  return group ? group.links.filter((l) => !['/industries', '/outcomes'].includes(l.href)) : [];
};

// Site navigation, the same on every page: the primary links from the approved content, each with a
// dropdown of its section, opened on hover or keyboard focus. `path` lights up the current section.
export default function Nav({ scrolled, path = '/' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <a href="/" className="nav-brand" aria-label="Intellient home">
          <img src="/svg/intellient.svg" alt="Intellient" width="134" height="34" />
        </a>
        <nav className="nav-pill" aria-label="Main">
          {PRIMARY_NAV.map((item) => {
            const links = dropFor(item);
            return (
              <div key={item.href} className="nav-item">
                <a href={item.href} className={navActive(item, path) ? 'is-active' : ''} aria-haspopup={links.length ? 'true' : undefined}>
                  {item.label}{links.length > 0 && <CaretDown weight="bold" />}
                </a>
                {links.length > 0 && (
                  <div className="nav-drop">
                    {links.map((l) => (
                      <a key={l.href} href={l.href} className={path === l.href ? 'is-current' : ''}>
                        <strong>{l.label}</strong>
                        {l.desc && <small>{l.desc}</small>}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
