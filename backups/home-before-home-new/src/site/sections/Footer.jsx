import { ArrowRight } from '@phosphor-icons/react';
import { CLOSE, PRIMARY_CTA, SECONDARY_CTA } from '../content';
import { SITE_MAP } from '../pages/pages';

// Closing call to action, glowing wordmark on a blue horizon, then the link columns: one finale.
// Inner pages pass their own closing `cta` ({ title, lead, button }), or false for none; the home page uses CLOSE.
export default function Footer({ cta }) {
  return (
    <footer className={`finale${cta === false ? ' no-cta' : ''}`} id="start">
      <div className="finale-glow" aria-hidden="true" />
      <div className="finale-grain" aria-hidden="true" />
      {cta !== false && <div className="container finale-cta" data-reveal>
        {cta ? (
          <>
            <h2 className="h-section">{cta.title}</h2>
            {cta.lead && <p className="lead">{cta.lead}</p>}
            {cta.button && (
              <div className="btn-row">
                <a href={cta.button.href} className="btn btn-primary">{cta.button.label}<ArrowRight weight="bold" /></a>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="h-section">{CLOSE.title}<br />{CLOSE.accent}</h2>
            <p className="lead">{CLOSE.body}</p>
            <div className="btn-row">
              <a href="#air-audit" className="btn btn-primary">{PRIMARY_CTA.label}<ArrowRight weight="bold" /></a>
              <a href={SECONDARY_CTA.href} className="btn btn-ghost">{SECONDARY_CTA.label}<ArrowRight /></a>
            </div>
          </>
        )}
      </div>}
      <div className="finale-wordmark" aria-hidden="true">
        <span className="ghost">Intellient</span>
        <span className="hero-word">Intellient</span>
        <span className="ghost">Intellient</span>
      </div>
      <div className="container finale-links">
        {SITE_MAP.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="finale-base">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} Intellient. All rights reserved.</span>
          <span>The operating model for the intelligent enterprise.</span>
        </div>
      </div>
    </footer>
  );
}
