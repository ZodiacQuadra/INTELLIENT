import { ArrowRight, Plus } from '@phosphor-icons/react';
import { FAQ, PRIMARY_CTA } from '../content';

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="faq-head" data-reveal>
          <h2 className="h-section">Good <span className="accent">questions.</span></h2>
          <a href={PRIMARY_CTA.href} className="link-arrow">{PRIMARY_CTA.label}<ArrowRight /></a>
        </div>
        <div data-reveal>
          {FAQ.map((f, i) => (
            <details key={f.q} className="qa" open={i === 0}>
              <summary>{f.q}<Plus /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
