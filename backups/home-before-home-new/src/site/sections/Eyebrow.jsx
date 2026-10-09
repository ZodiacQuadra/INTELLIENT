import { Cube, Gauge, Plugs, Seal, ClipboardText, Question, UsersThree } from '@phosphor-icons/react';

// Every section opens with the same small label: icon, then the section name in caps.
const EYEBROWS = {
  enterprises: [Cube, 'Three enterprises'],
  measurement: [Gauge, 'Measurement'],
  residency: [UsersThree, 'AIR Residency'],
  evidence: [Seal, 'Production evidence'],
  audit: [ClipboardText, 'AIR Audit'],
  faq: [Question, 'Questions'],
  ecosystem: [Plugs, 'Ecosystem'],
};

export default function Eyebrow({ id, reveal }) {
  const [Icon, label] = EYEBROWS[id];
  return <span className="eyebrow" data-reveal={reveal ? '' : undefined}><Icon />{label}</span>;
}
