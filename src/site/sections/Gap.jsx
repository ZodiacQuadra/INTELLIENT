import { ClockCountdown, Eye, Copy } from '@phosphor-icons/react';
import { GAP, HOME_LINKS } from '../content';
import Eyebrow from './Eyebrow';
import ExploreLinks from './ExploreLinks';
import Orb from './Orb';

const STATE_ICONS = { wait: ClockCountdown, review: Eye, manual: Copy };

export default function Gap() {
  const words = GAP.statement.split(' ');
  return (
    <section className="section" id="approach">
      <div className="container">
        <div className="gap-lead">
          <div className="gap-copy">
            <Eyebrow id="gap" reveal />
            <h2 className="statement">
              {words.map((w, i) => <span key={i} className="w">{w}{i < words.length - 1 ? ' ' : ''}</span>)}
            </h2>
            <ExploreLinks links={HOME_LINKS.gap} reveal />
          </div>
          <div data-reveal><Orb /></div>
        </div>
        <div className="symptoms">
          {GAP.symptoms.map((s, i) => {
            const Icon = STATE_ICONS[s.icon];
            return (
              <div key={s.title} className="symptom" data-reveal style={{ '--i': i }}>
                <span className="work-state"><Icon />{s.state}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
