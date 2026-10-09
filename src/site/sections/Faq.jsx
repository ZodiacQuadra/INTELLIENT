import Eyebrow from './Eyebrow';
import { ArrowRight, Plus } from '@phosphor-icons/react';
import { FAQ, FAQ_LINKS, PRIMARY_CTA, HOME_LINKS } from '../content';

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="faq-head" data-reveal>
          <Eyebrow id="faq" />
          <h2 className="h-section">Good <span className="accent">questions.</span></h2>
          <a href={PRIMARY_CTA.href} className="link-arrow">{PRIMARY_CTA.label}<ArrowRight /></a>
          <a href={HOME_LINKS.faq.href} className="link-arrow">{HOME_LINKS.faq.label}<ArrowRight /></a>
        </div>
        <div data-reveal>
          {FAQ.map((f, i) => (
            <details key={f.q} className="qa" open={i === 0}>
              <summary>{f.q}<Plus /></summary>
              <p>{f.a} {FAQ_LINKS[i] && <a href={FAQ_LINKS[i]} className="link-arrow qa-more" aria-label={`Read more: ${f.q}`}>Read more<ArrowRight /></a>}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
