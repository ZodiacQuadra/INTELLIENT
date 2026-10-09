import { ArrowRight } from '@phosphor-icons/react';

// A row of text links that leads from a home section into its in-depth pages. Buttons are kept
// for actions (start an audit); onward reading is a quieter link, so sections do not end in pills.
export default function ExploreLinks({ links, center, reveal }) {
  return (
    <div className={`explore${center ? ' center' : ''}`} data-reveal={reveal ? '' : undefined}>
      {links.map((l) => (
        <a key={l.href} href={l.href} className="link-arrow">{l.label}<ArrowRight /></a>
      ))}
    </div>
  );
}
