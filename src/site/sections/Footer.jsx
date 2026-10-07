import { ArrowRight } from '@phosphor-icons/react';
import { FOOTER, CLOSE, PRIMARY_CTA, SECONDARY_CTA } from '../content';

// Closing call to action, glowing wordmark on a blue horizon, then the link columns: one finale.
export default function Footer() {
  return (
    <footer className="finale" id="start">
      <div className="finale-glow" aria-hidden="true" />
      <div className="finale-grain" aria-hidden="true" />
      <div className="container finale-cta" data-reveal>
        <h2 className="h-section">{CLOSE.title}<br />{CLOSE.accent}</h2>
        <p className="lead">{CLOSE.body}</p>
        <div className="btn-row">
          <a href="#air-audit" className="btn btn-primary">{PRIMARY_CTA.label}<ArrowRight weight="bold" /></a>
          <a href={SECONDARY_CTA.href} className="btn btn-ghost">{SECONDARY_CTA.label}<ArrowRight /></a>
        </div>
      </div>
      <div className="finale-wordmark" aria-hidden="true">
        <span className="ghost">Intellient</span>
        <span className="hero-word">Intellient</span>
        <span className="ghost">Intellient</span>
      </div>
      <div className="container finale-links">
        {FOOTER.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h4>Intellient</h4>
          <ul>
            <li><a href="#intro">Back to top</a></li>
            <li><a href="#faq">Questions</a></li>
          </ul>
        </div>
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
