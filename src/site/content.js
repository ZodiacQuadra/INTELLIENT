// All page copy in one place. Figures marked `illustrative` come from Intellient's
// operating benchmark material and are labelled as such wherever they render.

export const PRIMARY_CTA = { href: '/air-audit#contact', label: 'Start with an AIR Audit' };
export const SECONDARY_CTA = { href: '/intellient-model', label: 'Explore the approach' };

export const HERO = {
  eyebrow: 'Enterprise intelligence that moves work forward',
  title: 'Amplify intelligence.',
  accent: 'Make work move.',
  body: 'Intellient helps your teams see where work stalls, redesign the decisions and handoffs that matter, and carry governed AI into production.',
};

export const CONSOLE = {
  domain: 'Claims resolution',
  kpis: [
    { label: 'Active work', value: '19 min', note: 'per case' },
    { label: 'Elapsed time', value: '9 days', note: 'per case', warn: true },
    { label: 'Exception load', value: '34%', note: 'manual review' },
    { label: 'Queue delay', value: '48h', note: 'tier 2 approval', warn: true },
  ],
  journey: [
    { label: 'Intake', kind: 'work', w: 2 },
    { label: 'Waiting for approval', kind: 'wait', w: 30 },
    { label: 'Review', kind: 'work', w: 3 },
    { label: 'Reopened', kind: 'rework', w: 16 },
    { label: 'Waiting for evidence', kind: 'wait', w: 26 },
    { label: 'Decision', kind: 'work', w: 2 },
  ],
  events: [
    { time: '09:14', label: 'Task queued', delta: '' },
    { time: '11:42', label: 'Under review', delta: '+3.2h' },
    { time: '14:05', label: 'Reopened', delta: 'Loop 2' },
  ],
};

export const JOURNEY = {
  title: 'A case should move,',
  accent: 'not wait.',
  body: 'See how redesigning the work changes the journey, not just the speed of one task.',
  path: ['Observe the operation', 'Redesign the work', 'Carry it into production'],
  stages: [
    {
      label: 'Intake', title: 'A request enters the operation.',
      before: 'A request lands in an inbox without shared context.',
      note: 'Begin with the result the business recognises.',
      after: 'The work is framed around a clear outcome and owner.',
    },
    {
      label: 'Evidence', title: 'The right context comes together.',
      before: 'People chase documents and reconcile conflicting systems.',
      note: 'Make the real work visible before automating it.',
      after: 'Relevant evidence and exceptions are surfaced together.',
    },
    {
      label: 'Decision', title: 'Authority is made explicit.',
      before: 'The case waits while teams work out who can decide.',
      note: 'Design the handoff, not just the faster task.',
      after: 'The decision reaches the right owner with its context intact.',
    },
    {
      label: 'Outcome', title: 'The operation keeps learning.',
      before: 'The case closes, but delay and rework go unmeasured.',
      note: 'Measure the result, then improve the operating model.',
      after: 'Movement, exceptions and adoption inform the next change.',
    },
  ],
};

export const GAP = {
  statement:
    'You may already have enough AI. A model can make a task faster. It cannot, by itself, remove an approval queue, settle which system is authoritative or persuade people to abandon a trusted workaround.',
  // Each symptom carries the work state it leaves behind.
  symptoms: [
    { state: 'Waiting for approval', icon: 'wait', title: 'The case still waits', body: 'A task becomes faster, but the case still waits.' },
    { state: 'Needs review', icon: 'review', title: 'The answer is not trusted', body: 'An answer becomes available, but nobody trusts it enough to act.' },
    { state: 'Manual process', icon: 'manual', title: 'The old process survives', body: 'A workflow is automated, but the old process survives beside it.' },
  ],
};

export const ENTERPRISES = {
  title: 'Your enterprise exists in three forms.',
  sub: 'Each is real. None is complete on its own.',
  items: [
    {
      id: 'designed',
      name: 'Designed',
      line: 'What policies, process maps and systems intend.',
      panelTitle: 'Enterprise architecture',
      note: 'The path work is supposed to take.',
      flow: ['Intake', 'Triage', 'Approve', 'Fulfil'],
    },
    {
      id: 'observed',
      name: 'Observed',
      line: 'What timestamps, queues and rework show.',
      panelTitle: 'Event telemetry',
      note: 'The same case, queued, reviewed and reopened.',
    },
    {
      id: 'lived',
      name: 'Lived',
      line: 'What people know, adapt and work around.',
      panelTitle: 'Human adaptations',
      note: 'Knowledge held by people, not systems.',
      adaptations: ['What people know', 'How work really happens', 'Unhappy-path rules', 'Trusted side-channels'],
    },
  ],
};

export const MEASURE = {
  title: 'The task is rarely',
  accent: 'the whole problem.',
  body: 'A process can contain twenty minutes of work and ten days of elapsed time. Intellient measures waiting, coordination, rework and decision latency before deciding what to automate.',
  // Each stat is [number, unit, small unit?]: rendered as "7 handoffs" with the unit set smaller.
  dimensions: [
    {
      id: 'waiting', name: 'Waiting', line: 'The space between tasks matters.',
      detail: 'Active work is only part of the journey. Measure the time a case spends waiting for information, approval or action.',
      from: ['20', 'minutes'], fromLabel: 'of active human work',
      to: ['10', 'days'], toLabel: 'of total elapsed time',
    },
    {
      id: 'coordination', name: 'Coordination', line: 'Follow the handoffs.',
      detail: 'Look at how work crosses teams and systems. Repeated requests for context can delay the outcome even when every task is fast.',
      from: ['7', 'handoffs'], fromLabel: 'across disparate systems',
      to: ['3.5', 'days'], toLabel: 'spent reconciling context',
    },
    {
      id: 'rework', name: 'Rework', line: 'See what comes back.',
      detail: 'Trace reopened cases and repeated checks to understand why work is repeated before deciding what should be automated.',
      from: ['38%', 'of cases', true], fromLabel: 'go back for rework',
      to: ['4.8', 'days'], toLabel: 'added to the cycle',
    },
    {
      id: 'decisions', name: 'Decisions', line: 'Make authority explicit.',
      detail: 'Measure the time between a decision being needed and an accountable owner having enough evidence to make it.',
      from: ['4', 'approvers'], fromLabel: 'across multiple teams',
      to: ['72', 'hours'], toLabel: 'to reach a decision',
    },
  ],
};

export const DOMAINS = {
  eyebrow: 'The right scope',
  title: 'Do not start with a use case.',
  accent: 'Start with an outcome.',
  body: 'An Operating Domain is a bounded set of workflows, systems, decisions and owners that jointly produce a result the business recognises.',
  question: 'What is holding work back?',
  frictions: [
    {
      id: 'delay', name: 'Delay',
      problem: 'Work waits for approvals, information or people.',
      outcome: 'Make the waiting visible.',
      detail: 'Map the handoffs and queues around a meaningful business outcome before choosing what to automate.',
    },
    {
      id: 'exceptions', name: 'Exception load',
      problem: 'Too many cases need manual handling.',
      outcome: 'Understand the exceptions.',
      detail: 'Find where work leaves the standard path, who resolves it and what evidence they need to act.',
    },
    {
      id: 'decisions', name: 'Fragmented decisions',
      problem: 'Decisions are split across systems and teams.',
      outcome: 'Clarify who can decide.',
      detail: 'Identify the owners, authoritative information and decision boundaries that keep a domain moving.',
    },
  ],
  criteria: ['Clear ownership', 'Visible data and decision lineage', 'A measurable cycle-time outcome'],
};

export const AUDIT = {
  title: 'An AIR Audit finds',
  accent: 'what is worth changing.',
  body: 'An Industry Principal and Intellient Architect expose exception load, clarify authority, establish the baseline and redesign the work before architecture is committed.',
  steps: [
    { name: 'Expose exception load', body: 'Find workarounds and hidden rework.' },
    { name: 'Clarify authority', body: 'Set clear decision boundaries.' },
    { name: 'Establish the baseline', body: 'Measure waiting against real work.' },
    { name: 'Redesign the work', body: 'Remove drag before writing code.' },
  ],
  facts: ['Evidence-led diagnostic', 'Customer-owned Blueprint', 'Industry Principal and Architect'],
};

export const TECH = {
  eyebrow: 'From design to production',
  title: 'What sets Intellient apart.',
  sub: 'Three layers carry the design into production.',
  speed: { name: 'Start with a baseline', line: 'An AIR Audit sets the baseline before anything is built.' },
  cta: { title: 'Ready to get started?', line: 'Scope one domain and see what its friction costs.' },
  layers: [
    {
      id: 'core', layer: 'Orchestrate', name: 'Intellient Core', logo: '/svg/intellient-core.svg',
      line: 'Reason and orchestrate. Keeps work coherent while models, agents, tools and people do their part.',
      caps: ['Deterministic reasoning', 'Policy enforcement'],
    },
    {
      id: 'link', layer: 'Connect', name: 'IntelliLink', logo: '/svg/intellilink.svg',
      line: 'Connect and act. Context, permissions and workflows, so understanding becomes authorised execution.',
      caps: ['Bi-directional data mesh', 'Sub-50ms event sync'],
      systems: ['SAP S/4HANA', 'Salesforce', 'Workday', 'Microsoft Azure', 'GitHub'],
    },
    {
      id: 'sphere', layer: 'Govern', name: 'IntelliSphere', logo: '/svg/intellisphere.svg',
      line: 'Govern and improve. See who and what may act, and the evidence behind each action.',
      caps: ['Real-time telemetry', 'Audit lineage'],
    },
  ],
};

export const RESIDENCY = {
  title: 'The context stays',
  accent: 'with the team that builds.',
  body: 'AI Architects in Residence carry the Blueprint into production, keeping accountability anchored to the operating outcome.',
  phases: [
    { when: 'Define the outcome', name: 'Blueprint', body: 'Outcome, boundaries and target architecture.', ships: ['Domain baseline', 'Decision boundaries'] },
    { when: 'Build and operationalize', name: 'Production', body: 'Built inside your sprint cycle.', ships: ['Production connectors', 'Live telemetry gate'] },
    { when: 'Scale with the team', name: 'Adoption', body: 'Expanded across domains from evidence.', ships: ['Team enablement', 'Reuse from evidence'] },
  ],
};

export const EVIDENCE = {
  title: 'Built in real enterprise work.',
  body: 'We publish only audited production evidence. Case studies follow each customer\'s security review.',
  principles: [
    { name: 'Zero unverified proof', body: 'Every metric comes from audited production logs.' },
    { name: 'Production telemetry', body: 'Cycle times use real system timestamps.' },
    { name: 'Governed standards', body: 'Privacy and regulatory obligations come first.' },
  ],
};

export const FAQ = [
  {
    q: 'What is an AIR Audit?',
    a: 'An evidence-led diagnostic. An Industry Principal and Intellient Architect map exceptions, authority and the baseline, then redesign the work before any architecture is committed. The Blueprint is customer-owned.',
  },
  {
    q: 'Why not start with an AI use case?',
    a: 'A use case speeds up one task. The delay usually sits between tasks, in queues, handoffs, rework and unclear authority.',
  },
  {
    q: 'What is an Operating Domain?',
    a: 'The workflows, systems, decisions and owners that together produce one result the business recognises.',
  },
  {
    q: 'What do you measure before automating?',
    a: 'Waiting, coordination, rework and decision latency, measured against real system timestamps.',
  },
  {
    q: 'How does the design reach production?',
    a: 'IntelliLink connects, Intellient Core orchestrates and IntelliSphere governs. Resident architects carry the Blueprint through.',
  },
  {
    q: 'Where are your case studies?',
    a: 'We publish only audited production evidence, after each customer completes its security review.',
  },
];

export const CLOSE = {
  title: 'Do not begin with an agent.',
  accent: 'Begin with the operating outcome worth changing.',
  body: 'Choose one domain where delay, exception load or fragmented decision-making is visible.',
  button: { href: '/air-audit#contact', label: 'Scope an AIR Audit' },
};

// Where each home section leads: the in-depth pages behind it. The home page is the hub.
export const HOME_LINKS = {
  gap: [
    { href: '/why-intellient', label: 'Why Intellient' },
    { href: '/intellient-model', label: 'The Intellient Model' },
  ],
  technology: [
    { href: '/technology', label: 'Explore the technology' },
    { href: '/architecture', label: 'Architecture' },
  ],
  // Per card in the technology bento.
  techCards: { speed: '/air-audit', core: '/intellient-core', link: '/intellilink', sphere: '/intellisphere' },
  residency: [
    { href: '/air-residency', label: 'Explore AIR Residency' },
    { href: '/intellient-blueprint', label: 'The Intellient Blueprint' },
  ],
  evidence: [
    { href: '/about', label: 'About Intellient' },
    { href: '/responsible-ai', label: 'Responsible AI' },
  ],
  ecosystem: [
    { href: '/intellilink', label: 'Explore IntelliLink' },
    { href: '/architecture', label: 'See the architecture' },
  ],
  enterprises: [
    { href: '/three-enterprises', label: 'Explore the three enterprises' },
  ],
  measurement: [
    { href: '/where-value-hides', label: 'See where value hides' },
    { href: '/exception-architecture', label: 'Exception architecture' },
  ],
  domains: [
    { href: '/operating-domains', label: 'Explore Operating Domains' },
    { href: '/operating-domain-assessment', label: 'Find your first domain' },
    { href: '/outcomes', label: 'Outcomes' },
    { href: '/industries', label: 'Industries' },
  ],
  audit: [
    { href: '/air-audit', label: 'Explore AIR Audit' },
    { href: '/industry-principals', label: 'Industry Principals' },
  ],
  faq: { href: '/contact', label: 'Talk to Intellient' },
};

// The page that answers each FAQ in depth, in FAQ order.
export const FAQ_LINKS = ['/air-audit', '/why-intellient', '/operating-domains', '/where-value-hides', '/technology', '/about'];
