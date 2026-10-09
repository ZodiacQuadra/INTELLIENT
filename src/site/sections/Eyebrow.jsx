import { Cube, Gauge, Plugs, Seal, ClipboardText, Question, UsersThree, Hourglass, Path, Flag } from '@phosphor-icons/react';

// Every section opens with the same small label: icon, then the section name in caps.
const EYEBROWS = {
  journey: [Path, 'An illustrative workflow'],
  gap: [Hourglass, 'The operating gap'],
  enterprises: [Cube, 'A clearer view'],
  measurement: [Gauge, 'Measure movement'],
  residency: [UsersThree, 'Continuity'],
  evidence: [Seal, 'Production evidence'],
  audit: [ClipboardText, 'The first engagement'],
  faq: [Question, 'Questions'],
  ecosystem: [Plugs, 'Ecosystem'],
  close: [Flag, 'Begin with the work'],
};

export default function Eyebrow({ id, reveal }) {
  const [Icon, label] = EYEBROWS[id];
  return <span className="eyebrow" data-reveal={reveal ? '' : undefined}><Icon />{label}</span>;
}
