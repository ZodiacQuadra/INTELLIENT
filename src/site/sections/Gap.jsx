import { GAP } from '../content';
import Orb from './Orb';

export default function Gap() {
  const words = GAP.statement.split(' ');
  return (
    <section className="section" id="approach">
      <div className="container">
        <div className="gap-lead">
          <p className="statement">
            {words.map((w, i) => <span key={i} className="w">{w}{i < words.length - 1 ? ' ' : ''}</span>)}
          </p>
          <div data-reveal><Orb /></div>
        </div>
        <div className="symptoms">
          {GAP.symptoms.map((s, i) => (
            <div key={s.title} className="symptom" data-reveal style={{ '--i': i }}>
              <b>{s.figure}</b>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
