import { ArrowRight } from '@phosphor-icons/react';

// A row of glass links that leads from a home section into its in-depth pages.
export default function ExploreLinks({ links, center, reveal }) {
  return (
    <div className={`explore${center ? ' center' : ''}`} data-reveal={reveal ? '' : undefined}>
      {links.map((l) => (
        <a key={l.href} href={l.href} className="btn btn-ghost btn-sm">{l.label}<ArrowRight /></a>
      ))}
    </div>
  );
}
