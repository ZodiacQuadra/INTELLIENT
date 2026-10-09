// All page copy in one place. Figures marked `illustrative` come from Intellient's
// operating benchmark material and are labelled as such wherever they render.

export const PRIMARY_CTA = { href: '/air-audit#contact', label: 'Start with an AIR Audit' };
export const SECONDARY_CTA = { href: '/intellient-model', label: 'Explore the approach' };

export const HERO = {
  eyebrow: 'The operating model for the intelligent enterprise',
  title: 'Build the enterprise that',
  accent: 'senses, decides and acts.',
  body: 'Redesign how work really behaves, then carry governed AI into production.',
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

export const GAP = {
  statement:
    'You may already have enough AI. A model makes a task faster. It cannot clear an approval queue, settle which system is right or retire a trusted workaround.',
  symptoms: [
    { figure: '48h', title: 'The case still waits', body: 'Tasks get faster. Approvals do not.' },
    { figure: '34%', title: 'The answer is not trusted', body: 'Output arrives, but its lineage is unclear.' },
    { figure: '2 paths', title: 'The old process survives', body: 'A manual shadow runs beside the automation.' },
  ],
};

export const ENTERPRISES = {
  title: 'Your enterprise exists in three forms.',
  sub: 'Each is real. None is complete alone.',
  items: [
    {
      id: 'designed',
      name: 'Designed',
      line: 'What policy and process maps intend.',
      panelTitle: 'Enterprise architecture',
      note: 'The path work is supposed to take.',
      flow: ['Intake', 'Triage', 'Approve', 'Fulfil'],
    },
    {
      id: 'observed',
      name: 'Observed',
      line: 'What timestamps and queues reveal.',
      panelTitle: 'Event telemetry',
      note: 'The same case, queued, reviewed and reopened.',
    },
    {
      id: 'lived',
      name: 'Lived',
      line: 'What people know and work around.',
      panelTitle: 'Human adaptations',
      note: 'Knowledge held by people, not systems.',
      adaptations: ['What people know', 'How work really happens', 'Unhappy-path rules', 'Trusted side-channels'],
    },
  ],
};

export const MEASURE = {
  title: 'The task is rarely',
  accent: 'the whole problem.',
  body: 'Measure waiting, handoffs, rework and decisions before automating anything.',
  // Each stat is [number, unit, small unit?]: rendered as "7 handoffs" with the unit set smaller.
  dimensions: [
    {
      id: 'waiting', name: 'Waiting', line: 'Most of the time, nothing is happening.',
      from: ['19', 'minutes'], fromLabel: 'of active human work',
      to: ['9', 'days'], toLabel: 'of total elapsed time',
    },
    {
      id: 'coordination', name: 'Coordination', line: 'Work moves across systems.',
      from: ['7', 'handoffs'], fromLabel: 'across disparate systems',
      to: ['3.5', 'days'], toLabel: 'spent reconciling context',
    },
    {
      id: 'rework', name: 'Rework', line: 'Work often goes backwards.',
      from: ['38%', 'of cases', true], fromLabel: 'go back for rework',
      to: ['4.8', 'days'], toLabel: 'added to the cycle',
    },
    {
      id: 'decisions', name: 'Decisions', line: 'Every approver adds time.',
      from: ['4', 'approvers'], fromLabel: 'across multiple teams',
      to: ['72', 'hours'], toLabel: 'to reach a decision',
    },
  ],
};

export const DOMAINS = {
  eyebrow: 'The right scope',
  title: 'Start with an outcome,',
  accent: 'not a use case.',
  body: 'An Operating Domain is the workflows, systems, decisions and owners behind one business result.',
  frictions: [
    {
      id: 'delay', name: 'Delay',
      problem: 'Work waits on approvals and people.',
      outcome: 'Make the waiting visible.',
      detail: 'Map handoffs and queues before choosing what to automate.',
      metric: 'Up to 88% latency reduction',
    },
    {
      id: 'exceptions', name: 'Exception load',
      problem: 'Too many cases need manual handling.',
      outcome: 'Understand the exceptions.',
      detail: 'Find where work leaves the standard path and who resolves it.',
      metric: '4.2x faster exception routing',
    },
    {
      id: 'decisions', name: 'Fragmented decisions',
      problem: 'Decisions split across systems and teams.',
      outcome: 'Clarify who can decide.',
      detail: 'Name the owners, sources of truth and decision boundaries.',
      metric: 'Explicit decision boundaries',
    },
  ],
  criteria: ['Clear ownership', 'Visible data and decision lineage', 'A measurable cycle-time outcome'],
};

export const AUDIT = {
  title: 'An AIR Audit finds',
  accent: 'what is worth changing.',
  body: 'Two weeks with an Industry Principal and an Intellient Architect, before any architecture is committed.',
  steps: [
    { name: 'Expose exception load', body: 'Find workarounds and hidden rework.' },
    { name: 'Clarify authority', body: 'Set clear decision boundaries.' },
    { name: 'Establish the baseline', body: 'Measure waiting against real work.' },
    { name: 'Redesign the work', body: 'Remove drag before writing code.' },
  ],
  facts: ['2-week engagement', 'Fixed fee', 'Architect-led baseline'],
};

export const TECH = {
  eyebrow: 'From design to production',
  title: 'What sets Intellient apart.',
  sub: 'Three layers carry the design into production.',
  speed: { name: 'Fast to a baseline', line: 'A two-week AIR Audit sets the baseline before anything is built.' },
  cta: { title: 'Ready to get started?', line: 'Scope one domain and see what its friction costs.' },
  layers: [
    {
      id: 'core', layer: 'Orchestrate', name: 'Intellient Core', logo: '/svg/intellient-core.svg',
      line: 'Reasons over policy and orchestrates the work.',
      caps: ['Deterministic reasoning', 'Policy enforcement'],
    },
    {
      id: 'link', layer: 'Connect', name: 'IntelliLink', logo: '/svg/intellilink.svg',
      line: 'Connects to SAP, Salesforce, Workday and Azure, and acts inside them.',
      caps: ['Bi-directional data mesh', 'Sub-50ms event sync'],
      systems: ['SAP S/4HANA', 'Salesforce', 'Workday', 'Microsoft Azure', 'GitHub'],
    },
    {
      id: 'sphere', layer: 'Govern', name: 'IntelliSphere', logo: '/svg/intellisphere.svg',
      line: 'Governs what runs and shows where to improve.',
      caps: ['Real-time telemetry', 'Audit lineage'],
    },
  ],
};

export const RESIDENCY = {
  title: 'The context stays',
  accent: 'with the team that builds.',
  body: 'AI Architects in Residence carry the Blueprint into production.',
  phases: [
    { when: 'Weeks 0 to 4', name: 'Blueprint', body: 'Outcome, boundaries and target architecture.', ships: ['Domain baseline', 'Decision boundaries'] },
    { when: 'Weeks 4 to 12', name: 'Production', body: 'Built inside your sprint cycle.', ships: ['Production connectors', 'Live telemetry gate'] },
    { when: 'Continuous', name: 'Adoption', body: 'Scaled across domains, governed automatically.', ships: ['Team enablement', 'Autonomous health checks'] },
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
    a: 'A two-week, fixed-fee engagement that maps exceptions, decision rights and the baseline, then redesigns the work before any architecture is committed.',
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
  accent: 'Begin with the outcome.',
  body: 'Pick one domain where delay or exceptions are visible. We show you what that friction costs.',
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
