// Inner pages of the Intellient site. Copy is taken from the Intellient Framer project
// (exported to framer-export/), rebuilt here on the local design system.
//
// Each page is { title, description, blocks, cta }. Blocks render in order through
// pages/blocks.jsx; `cta` feeds the closing call to action in the footer.
// Art references Framer illustration components ported to src/site/art.

const CONTACT_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'organisation', label: 'Organisation', type: 'text', required: true },
  { name: 'role', label: 'Role', type: 'text' },
  { name: 'email', label: 'Business email', type: 'email', required: true },
];
const CONSENT = 'I agree that Intellient may use this information to understand my request and contact me.';
const DEMO_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number (with country code)', type: 'tel' },
  { name: 'need', label: 'Tell us what you need', type: 'textarea', wide: true },
];
const TECH_CTA = { title: 'Apply the technology to one Operating Domain.', lead: 'Start with the work, then choose the mechanism.', button: { label: 'Start the conversation', href: '/contact' } };

export const PAGES = {
  /* ---------------- Approach ---------------- */
  '/why-intellient': {
    title: 'Why Intellient | From AI capability to operating performance',
    description: 'Why enterprise AI underperforms when workflows, authority and adoption remain unchanged.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Why Intellient',
        title: 'AI is not the scarce resource', accent: 'anymore.',
        lead: 'The ability to convert it into operating performance is.',
        cta: { label: 'Explore the Intellient Model', href: '/intellient-model' },
        panel: {
          kicker: 'The operating gap', title: 'A task improves. The work still waits.',
          rows: [['Approval queue', 'Waiting', 'hourglass'], ['Evidence to act', 'Needs review', 'file'], ['Trusted workaround', 'Still in use', 'stack']],
          layered: true,
          foot: 'Intelligence becomes valuable when the operation changes.',
        },
        backdrop: { kind: 'why', scene: 'earth' },
        planet: true,
      },
      {
        type: 'cards',
        title: 'The enterprise AI conversation often begins in the', accent: 'wrong place.',
        body: 'A model is selected. A platform is licensed. A list of use cases follows. The organisation then tries to fit the work around technology already chosen. Impressive demonstrations may follow, while the real questions remain unanswered: where does work wait, which exceptions consume the experienced team, who can remove a hand-off and what will people stop doing after go-live?',
        art: { kind: 'scene', scene: 'cubes' },
        items: [
          { icon: 'clock', visual: 'wait', title: 'Where does work wait?', body: 'An approval queue can outlast a faster task.', href: '/operating-domains' },
          { icon: 'warning', visual: 'exceptions', title: 'Which exceptions dominate?', body: 'The experienced team still carries unresolved work.', href: '/exception-architecture' },
          { icon: 'arrows', visual: 'golive', title: 'What changes after go-live?', body: 'The old process can survive beside the new workflow.', href: '/intellient-model' },
        ],
      },
      { type: 'statement', text: 'A faster task inside a slow system is', accent: 'still a slow system.', bg: '/images/slow-system-horizon.webp' },
      {
        type: 'cards', eyebrow: 'The missing architecture', eyebrowIcon: 'stack',
        title: 'Models provide intelligence. The enterprise still has to decide', accent: 'how work changes.',
        body: 'Intellient makes those decisions part of one operating model. It begins with the outcome, studies the operation before prescribing architecture and stays connected through production.',
        art: { kind: 'scene', scene: 'pillars' },
        items: [
          { icon: 'target', visual: 'outcome', title: 'Begin with the outcome', body: 'Define the work and the result that matters.', href: '/air-audit' },
          { icon: 'eye', visual: 'operation', title: 'Read the operation', body: 'Study behaviour, evidence and experience.', href: '/three-enterprises' },
          { icon: 'rocket', visual: 'production', title: 'Stay through production', body: 'Carry systems, controls and adoption into delivery.', href: '/technology' },
        ],
      },
    ],
    cta: { title: 'Do not place another layer of intelligence above unchanged work.', lead: 'Redesign the work around what intelligence can now make possible.', button: { label: 'See how Intellient works', href: '/intellient-model' } },
  },

  '/intellient-model': {
    title: 'The Intellient Model | How the intelligent enterprise operates',
    description: 'A practical system for understanding work, redesigning operating domains and embedding governed intelligence.',
    blocks: [
      {
        type: 'hero', eyebrow: 'The Intellient Model',
        title: 'Intelligence needs an operating system around it.',
        lead: 'Not a software operating system. An organisational one: a way to choose the outcome, understand the work, assign authority, introduce technology and prove that the result changed.',
        cta: { label: 'Start with the three enterprises', href: '/three-enterprises' },
        art: { kind: 'scene', scene: 'model' },
      },
      {
        type: 'steps', eyebrow: 'The model', cards: true,
        title: 'See the operation clearly. Change the work deliberately.',
        lead: 'Build only what the outcome requires. Expand only when evidence earns it.',
        art: { kind: 'scene', scene: 'path' },
        items: [
          { title: 'See', icon: 'eye', body: 'Reconcile design, evidence and experience.' },
          { title: 'Scope', icon: 'stack', body: 'Choose an Operating Domain.' },
          { title: 'Diagnose', icon: 'search', body: 'Expose delay, exceptions and unclear authority.' },
          { title: 'Redesign', icon: 'tools', body: 'Simplify before selecting technology.' },
          { title: 'Build', icon: 'cube', body: 'Connect, orchestrate and govern.' },
          { title: 'Embed', icon: 'gear', body: 'Make the future workflow normal.' },
          { title: 'Prove', icon: 'chart', body: 'Measure adoption and business movement.' },
          { title: 'Compound', icon: 'repeat', body: 'Reuse what worked.' },
        ],
      },
    ],
    cta: { title: 'Ready to examine one Operating Domain?', lead: 'AIR Audit turns the model into an evidence-backed Blueprint and Value Ledger.', button: { label: 'Explore AIR Audit', href: '/air-audit' } },
  },

  '/three-enterprises': {
    title: 'Designed, Observed and Lived Enterprise | Intellient',
    description: 'Why documents, operational evidence and human experience must be reconciled before AI is built.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Operating reality',
        title: 'The process you designed is not the only process', accent: 'you run.',
        lead: 'Every enterprise has an intended system, an evidenced system and a human system. Transformation fails when one is mistaken for the whole.',
        cta: { label: 'Explore AIR Audit', href: '/air-audit' },
        art: { kind: 'scene', scene: 'rise' },
      },
      {
        type: 'cards', title: 'Three forms of the', accent: 'same enterprise.', visualAt: 'bottom',
        items: [
          { icon: 'stack', visual: 'designed', title: 'The Designed Enterprise', body: 'Policies define the control. Process maps define the path. The design makes scale possible, but cannot capture every exception.' },
          { icon: 'chart', visual: 'observed', title: 'The Observed Enterprise', body: 'Timestamps show the wait. Queues show the backlog. Evidence reveals patterns, but not always their cause.' },
          { icon: 'users', visual: 'lived', title: 'The Lived Enterprise', body: 'People navigate workarounds, informal approvals and knowledge that never reached the process document.' },
        ],
      },
      { type: 'statement', text: 'Documentation tells us what should happen. Evidence shows what did happen. People help explain why.', marks: ['what', 'did', 'why.'], planet: true },
      {
        type: 'text', eyebrow: 'A simple example', eyebrowIcon: 'path',
        title: 'The documented purchase request moves cleanly from', accent: 'submission to approval.',
        body: 'Operational evidence shows requests returning repeatedly. People explain that approvals arrive without supporting evidence and a separate classification sheet is used. An agent that drafts the request may save minutes. A redesigned flow that assembles the evidence may remove days.',
        artBelow: { kind: 'scene', scene: 'request' },
      },
    ],
    cta: { title: 'Make sure you know which process you mean.', lead: 'AIR Audit reconciles all three views into one future state.', button: { label: 'Explore AIR Audit', href: '/air-audit' } },
  },

  '/operating-domains': {
    title: 'Operating Domains | Start enterprise AI at the right level',
    description: 'Choose a business outcome wide enough to reveal the constraint and narrow enough to change.',
    blocks: [
      {
        type: 'hero', eyebrow: 'The right scope',
        title: 'Start narrow enough to act. Wide enough to matter.',
        lead: 'An isolated task can improve while the outcome remains stuck. A company-wide transformation can become too broad to execute. An Operating Domain gives the work the right boundary.',
        cta: { label: 'Find your first domain', href: '/operating-domain-assessment' },
        art: { kind: 'scene', scene: 'scope' },
      },
      { type: 'statement', text: 'An Operating Domain is a bounded set of workflows, systems, decisions and owners that jointly produce a recognisable business outcome.' },
      {
        type: 'list', eyebrow: 'The scoping test', title: 'A good Operating Domain ends in a visible result.',
        items: [
          'A business leader recognises the outcome.',
          'Upstream information and downstream authority are included.',
          'One operating owner can be named.',
          'A baseline can be measured.',
          'The domain can change without redesigning the whole company.',
          'Success creates learning for adjacent domains.',
        ],
      },
    ],
    cta: { title: 'What outcome is not moving as it should?', lead: 'Turn the symptom into an Operating Domain Brief.', button: { label: 'Start the assessment', href: '/operating-domain-assessment' } },
  },

  '/where-value-hides': {
    title: 'Where AI value really hides | Intellient',
    description: 'Measure the full movement of enterprise work before deciding what to automate.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Operating economics',
        title: 'The task may take twenty minutes. The outcome may take ten days.',
        lead: 'If the business case measures only active effort, it may optimise the smallest part of the problem.',
        cta: { label: 'See the full operating clock', href: '/where-value-hides#clocks' },
        art: { kind: 'scene', scene: 'clocks' },
      },
      {
        type: 'cards', id: 'clocks', eyebrow: 'Six clocks inside one outcome', title: 'The intervention depends on where time and effort accumulate.', cols: 3,
        items: [
          { icon: 'hand', title: 'Touch time', body: 'Active effort.' },
          { icon: 'hourglass', title: 'Wait time', body: 'Time in queues.' },
          { icon: 'arrows', title: 'Coordination load', body: 'Chasing and routing.' },
          { icon: 'repeat', title: 'Rework', body: 'Correction and repetition.' },
          { icon: 'gavel', title: 'Decision latency', body: 'Delay before authorised action.' },
          { icon: 'clock', title: 'Elapsed time', body: 'The end-to-end experience.' },
        ],
      },
      {
        type: 'text', eyebrow: 'Why it changes the answer', title: 'If touch time dominates, automation may help.',
        body: 'If waiting dominates, routing or authority may matter more. If rework dominates, better evidence and validation may be the answer. If decision latency dominates, intelligence may prepare a decision package for a person.',
      },
      { type: 'statement', text: 'Do not ask only how quickly AI can perform the task. Ask what prevents the outcome from moving.' },
    ],
    cta: { title: 'Find the real constraint before choosing the technology.', lead: 'AIR Audit establishes the operating clock and evidence base.', button: { label: 'Start with AIR Audit', href: '/air-audit' } },
  },

  '/exception-architecture': {
    title: 'Exception Architecture | Intellient',
    description: 'Design the evidence, authority and escalation needed to resolve recurring exceptions.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Work beyond the happy path',
        title: 'The happy path is usually the easy part.',
        lead: 'The operating burden gathers where information is missing, systems disagree or authority is unclear. Intellient treats those moments as architecture, not noise.',
        cta: { label: 'Map your exceptions', href: '/air-audit' },
        art: { kind: 'scene', scene: 'exceptions' },
      },
      {
        type: 'text', eyebrow: 'An exception is a chain of reconstruction',
        title: 'Someone notices the case does not fit. Records are compared. Context is requested. Experienced people are pulled in. A decision waits for authority.',
        body: 'The final resolution may never be captured in a reusable form.',
      },
      {
        type: 'cards', eyebrow: 'Four possible treatments', title: 'Not every exception needs an agent.', cols: 4,
        items: [
          { icon: 'trash', title: 'Eliminate', body: 'Remove obsolete rules or avoidable variation.' },
          { icon: 'ruler', title: 'Standardise', body: 'Turn a recurring pattern into a testable rule.' },
          { icon: 'sparkle', title: 'Assist', body: 'Assemble context and recommend action.' },
          { icon: 'escalate', title: 'Escalate with structure', body: 'Bring an accountable person in with evidence prepared.' },
        ],
      },
      { type: 'statement', text: 'Automate the predictable path. Engineer intelligence around the exceptions.' },
    ],
    cta: { title: 'Make difficult work visible.', lead: 'AIR Audit turns recurring exceptions into a future-state design.', button: { label: 'Explore AIR Audit', href: '/air-audit' } },
  },

  /* ---------------- Engagement ---------------- */
  '/air-audit': {
    title: 'AIR Audit | Find the enterprise work worth changing',
    description: 'An evidence-led diagnostic that creates a customer-owned Blueprint and Value Ledger.',
    blocks: [
      {
        type: 'hero', eyebrow: 'The first engagement',
        title: 'See the operation before you automate it.',
        lead: 'AIR Audit turns an important but loosely framed ambition into an evidence-backed decision about what should change, what the future state requires and how the result will be measured.',
        cta: { label: 'Scope an AIR Audit', href: '/air-audit#contact' },
        panel: {
          kicker: 'AIR Audit / Blueprint', title: 'From ambition to an executable design.',
          rows: [['Outcome', 'Domain + sponsor'], ['Operating reality', 'Evidence + experience'], ['Future state', 'Authority + architecture'], ['Value baseline', 'Target + owner']],
          foot: 'The Blueprint is customer-owned.',
        },
        backdrop: { kind: 'technical', scene: 'blueprint' },
      },
      {
        type: 'text', eyebrow: 'Why an audit comes first', title: 'The costliest mistake may be made before the build begins.',
        body: 'A narrow use case is selected. The documented process is treated as reality. The sponsor assumes a technology team can change work owned by several functions. AIR Audit changes the starting point.',
        art: { kind: 'technical', scene: 'terrain' },
      },
      {
        type: 'cards', eyebrow: 'Who leads the work', title: 'One operating reading. One future state.', cols: 2,
        items: [
          { icon: 'compass', title: 'Industry Principal', body: 'Interprets operating patterns, constraints and exceptions.', href: '/industry-principals' },
          { icon: 'blueprint', title: 'Intellient Architect', body: 'Maps systems, data and controls, then carries context into delivery.' },
        ],
      },
      {
        type: 'steps', eyebrow: 'How the audit works', title: 'A disciplined route from ambition to an executable design.',
        items: [
          { title: 'Frame', body: 'Outcome, domain and sponsor.' },
          { title: 'Reconcile', body: 'Design, evidence and experience.' },
          { title: 'Measure', body: 'Delay, exceptions and rework.' },
          { title: 'Map authority', body: 'Ownership and escalation.' },
          { title: 'Redesign', body: 'Remove avoidable complexity.' },
          { title: 'Choose', body: 'Place software, agents and human authority.' },
          { title: 'Architect', body: 'Systems, controls and adoption.' },
          { title: 'Baseline', body: 'Target, source and value owner.' },
        ],
      },
      { type: 'statement', text: 'An AIR Audit may conclude that the process should be simplified first, normal software is sufficient, more evidence is required or AI has not earned a place in the answer.', art: { kind: 'why', scene: 'horizon' } },
      {
        type: 'faq', eyebrow: 'Common questions', title: 'What leaders ask before an audit.',
        items: [
          { category: 'AIR Audit', q: 'Is AIR Audit an AI readiness assessment?', a: 'It goes further. AIR Audit examines operating behaviour, redesigns the domain, assigns authority and defines the production architecture and value case.' },
          { category: 'AIR Audit', q: 'Do we need process-mining technology?', a: 'Not in every engagement. The evidence method depends on the domain and available data.' },
          { category: 'AIR Audit', q: 'Do we have to use Intellient for implementation?', a: 'No. The Blueprint is customer-owned.' },
          { category: 'Operating Domains', q: 'What is an Operating Domain?', a: 'A bounded set of workflows, systems, decisions and owners that jointly produce a recognisable outcome.' },
          { category: 'Technology', q: 'Does Intellient require one cloud or model provider?', a: 'No. The architecture follows the workload and approved capability scope.' },
          { category: 'AIR Residency', q: 'Is AIR Residency staff augmentation?', a: 'No. AIR is organised around a defined Operating Domain and outcome.' },
        ],
      },
      {
        type: 'form', id: 'contact', eyebrow: 'Start the conversation', title: 'Which Operating Domain should we examine?',
        lead: 'Tell us the outcome, what is visibly happening and what evidence is available.',
        subject: 'AIR Audit request',
        fields: [
          ...CONTACT_FIELDS,
          { name: 'domain', label: 'Which Operating Domain should we examine?', type: 'textarea', wide: true, required: true },
          { name: 'happening', label: 'What is visibly happening today?', type: 'textarea', wide: true },
          { name: 'evidence', label: 'What evidence is available?', type: 'textarea', wide: true },
        ],
        consent: CONSENT, submit: 'Submit the domain',
      },
    ],
  },

  '/intellient-blueprint': {
    title: 'Intellient Blueprint | A customer-owned path to production',
    description: 'The future-state operating design, architecture and value system created through AIR Audit.',
    blocks: [
      {
        type: 'hero', eyebrow: 'From insight to execution',
        title: 'A future-state operating design. Not a technology wish list.',
        lead: 'The Blueprint connects the business outcome to the workflow, authority, architecture and measurement required to change it.',
        cta: { label: 'Create your Blueprint', href: '/air-audit' },
        art: { kind: 'mockup', scene: 'blueprint' },
      },
      {
        type: 'cards', eyebrow: 'What makes it executable', title: 'The Blueprint does not end with a list of use cases.',
        body: 'It states what the future workflow will be, which systems provide authority, how exceptions are handled, where people remain accountable and how the old way of working will be retired.',
        cols: 4, numbered: true,
        items: [
          { title: 'Workflow design', body: 'What the future workflow will be.' },
          { title: 'Authority model', body: 'Which systems provide authority.' },
          { title: 'Accountability', body: 'Where people remain accountable.' },
          { title: 'Measurement', body: 'Measurement required to change it.' },
        ],
      },
      { type: 'statement', text: 'A new workflow that remains optional becomes another layer of complexity.', art: { kind: 'mockup', scene: 'terrain' } },
      {
        type: 'text', eyebrow: 'Customer ownership', title: 'The customer owns the Blueprint.',
        body: 'Intellient should earn the right to implement through the quality of the design, not by making the diagnostic dependent on proprietary delivery.',
      },
    ],
    cta: { title: 'Turn the operating question into an executable design.', lead: 'Begin with AIR Audit.', button: { label: 'Scope an AIR Audit', href: '/air-audit' } },
  },

  '/air-residency': {
    title: 'AIR Residency | Embedded enterprise AI capability',
    description: 'Keep operating context attached from Blueprint through production and adoption.',
    blocks: [
      {
        type: 'hero', eyebrow: 'AI Architects in Residence',
        title: 'The people who understand the operation stay connected to the build.',
        lead: 'AIR Residency preserves context from diagnosis through production. The team evolves as the work changes. Accountability remains anchored to the operating outcome.',
        cta: { label: 'Discuss AIR Residency', href: '/contact' },
        art: { kind: 'scene', scene: 'residency' },
      },
      {
        type: 'text', eyebrow: 'Why hand-offs destroy value',
        title: 'A strategy team learns why the process behaves as it does. A delivery team later receives a document.',
        body: 'The rationale is compressed into requirements. Exceptions become edge cases again. AIR keeps the operating context attached.',
      },
      {
        type: 'text', eyebrow: 'AIR is not one heroic generalist', title: 'No individual should carry every discipline equally well.',
        body: 'An Intellient Architect provides continuity and draws on the specialist capability the phase requires.',
      },
      {
        type: 'cards', eyebrow: 'The AIR motions', title: 'The team changes. Accountability does not.', cols: 3,
        items: [
          { icon: 'path', title: 'Redesign', body: 'Simplify the domain.' },
          { icon: 'code', title: 'Engineer', body: 'Build production capability.' },
          { icon: 'shield', title: 'Govern', body: 'Apply authority and evidence.' },
          { icon: 'users', title: 'Embed', body: 'Make the future workflow normal.' },
          { icon: 'pulse', title: 'Operate', body: 'Support the live system.' },
          { icon: 'stack', title: 'Compound', body: 'Reuse and expand from evidence.' },
        ],
      },
    ],
    cta: { title: 'Keep the context. Change the outcome.', lead: 'Discuss where AIR Residency should begin.', button: { label: 'Talk to Intellient', href: '/contact' } },
  },

  '/industry-principals': {
    title: 'Intellient Industry Principals | Operational experience in enterprise AI',
    description: 'Senior operators work with Intellient Architects to interpret operating reality.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Intellient Industry Council',
        title: 'Transformation begins with people who have carried the responsibility.',
        lead: 'An Industry Principal brings pattern recognition from running an operation. An Intellient Architect turns that insight into a production system.',
        cta: { label: 'Explore AIR Audit', href: '/air-audit' },
        art: { kind: 'scene', scene: 'council' },
      },
      {
        type: 'text', eyebrow: 'Why domain experience matters', title: 'A workaround may look inefficient and still protect a real risk.',
        body: 'A control may look necessary and survive only because nobody revisited it. Technical analysis alone cannot reliably distinguish the two.',
      },
      {
        type: 'cards', eyebrow: 'Two perspectives. One design.', title: 'Neither discipline substitutes for the other.', cols: 2,
        items: [
          { icon: 'compass', title: 'Industry Principal', body: 'Recognises abnormal friction and tests inherited complexity.' },
          { icon: 'blueprint', title: 'Intellient Architect', body: 'Tests feasibility, designs the future state and preserves continuity.' },
        ],
      },
      { type: 'statement', text: 'The Principal should not prescribe technology. The Architect should not redesign the operation without domain evidence.' },
    ],
    cta: { title: 'Bring operational judgement into the first decision.', lead: 'Begin with AIR Audit.', button: { label: 'Scope an AIR Audit', href: '/air-audit' } },
  },

  '/operating-domain-assessment': {
    title: 'Operating Domain Assessment | Intellient',
    description: 'Answer a short set of questions about one Operating Domain and receive a brief for an AIR Audit conversation.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Interactive assessment', title: 'Where does the outcome stop moving?',
        lead: 'Answer a short set of questions about one Operating Domain. The result is a brief for an AIR Audit conversation, not a maturity score.',
        art: { kind: 'technical', scene: 'blueprint' },
      },
      {
        type: 'form', id: 'assessment', subject: 'Operating Domain Brief', submit: 'Create my Operating Domain Brief', consent: CONSENT,
        fields: [
          { heading: 'Part one — the Operating Domain' },
          { name: 'outcome', label: 'What business outcome is not moving as it should?', type: 'textarea', wide: true, required: true },
          { name: 'workflow', label: 'Which workflow or Operating Domain produces this outcome?', type: 'textarea', wide: true },
          { name: 'symptoms', label: 'What is visibly happening today?', type: 'checkboxes', wide: true, options: ['Work waits in queues', 'People chase information or approvals', 'The same exceptions recur', 'Systems or records disagree', 'Work is repeated or corrected', 'Decisions arrive too late', 'The old process survives beside a new tool', 'Other'] },
          { name: 'exceptions', label: 'Which exceptions repeatedly require experienced intervention?', type: 'textarea', wide: true },
          { name: 'systems', label: 'Which systems or records must be reconciled before anyone can act?', type: 'textarea', wide: true },
          { name: 'owner', label: 'Is one person accountable for the outcome from beginning to end?', type: 'select', wide: true, options: ['Yes', 'No', 'Unsure'] },
          { name: 'evidence', label: 'What evidence is currently available?', type: 'checkboxes', wide: true, options: ['Transaction or event data', 'Cycle-time or queue reports', 'Quality or error reports', 'Customer or employee service data', 'Process documents', 'Operator interviews', 'No reliable evidence yet', 'Unsure'] },
          { name: 'improvement', label: 'What would meaningful improvement look like?', type: 'textarea', wide: true },
          { name: 'sponsor', label: 'Is there an executive sponsor who can change the process across affected functions?', type: 'select', wide: true, options: ['Yes', 'No', 'Unsure'] },
          { heading: 'Part two — about you' },
          ...CONTACT_FIELDS,
        ],
      },
      {
        type: 'cards', eyebrow: 'What you receive', title: 'Your Operating Domain Brief',
        lead: 'The brief assembles your answers into eight sections. It does not calculate a maturity score.', cols: 4, numbered: true,
        items: [
          { title: 'Outcome to move' }, { title: 'Proposed Operating Domain' }, { title: 'Visible symptoms' }, { title: 'Exception and context signals' },
          { title: 'Ownership and authority' }, { title: 'Evidence available' }, { title: 'Meaningful improvement' },
          { title: 'Recommended next step', body: 'Use this brief to scope an AIR Audit.' },
        ],
      },
    ],
    cta: { title: 'Your brief is ready.', lead: 'Take the brief into a conversation with an Intellient Architect.', button: { label: 'Discuss this Operating Domain', href: '/contact' } },
  },

  /* ---------------- Technology ---------------- */
  '/technology': {
    title: 'Intellient technology | Connect, orchestrate and govern enterprise AI',
    description: 'Three technology layers connect enterprise systems, coordinate complex work and govern the AI estate.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Technology', title: 'The technology should follow the work.',
        lead: 'Once the Operating Domain is redesigned, three layers carry the future state into production. Each has a distinct job.',
        cta: { label: 'Explore the architecture', href: '/architecture' },
        art: { kind: 'scene', scene: 'layers' },
      },
      {
        type: 'products', title: 'Connect. Orchestrate. Govern.',
        items: [
          { logo: '/svg/intellilink.svg', category: 'Connected context', title: 'IntelliLink', body: 'Connect enterprise context and enable action.', label: 'Explore IntelliLink', href: '/intellilink' },
          { logo: '/svg/intellient-core.svg', category: 'Coordinated work', title: 'Intellient Core', body: 'Coordinate complex and long-running work.', label: 'Explore Intellient Core', href: '/intellient-core' },
          { logo: '/svg/intellisphere.svg', category: 'Governed intelligence', title: 'IntelliSphere', body: 'Govern access, behaviour, evidence and change.', label: 'Explore IntelliSphere', href: '/intellisphere' },
        ],
      },
      {
        type: 'production', eyebrow: 'Production patterns', title: 'What each layer does in production.',
        items: [
          { category: 'IntelliLink', title: 'Assemble authorised context before the decision.', body: 'Retrieve evidence across systems, apply complete rules and route unresolved exceptions.', proofTitle: 'Context', proofRows: [['Authorised evidence', 'In scope'], ['Rules applied', 'In scope']] },
          { category: 'Intellient Core', title: 'Keep complex work coherent across time.', body: 'Maintain state, dependencies and evidence while systems and people complete their part.', proofTitle: 'Work', proofRows: [['State maintained', 'In scope'], ['Human decisions retained', 'In scope']] },
          { category: 'IntelliSphere', title: 'Govern the authority, behaviour and change.', body: 'Apply identity, policy, evaluation, observability, cost and lifecycle controls.', proofTitle: 'Governance', proofRows: [['Policy applied', 'In scope'], ['Change controlled', 'In scope']] },
        ],
        note: 'Illustrative production pattern',
      },
      {
        type: 'text', eyebrow: 'Architecture principle', title: 'Intellient is workload-led and model-aware.',
        body: 'The purpose is not to hide vendor differences. It is to prevent one vendor choice from dictating the operating design.',
        art: { kind: 'technical', scene: 'principle' },
      },
    ],
    cta: { title: 'Bring the Blueprint into production.', lead: 'Explore the layers or discuss one Operating Domain.', button: { label: 'Discuss the architecture', href: '/contact' } },
  },

  '/intellilink': {
    title: 'IntelliLink | Intellient',
    description: 'The answer may sit in one system while the action belongs in another. IntelliLink connects context, permissions and workflows so understanding can become authorised execution.',
    blocks: [
      {
        type: 'hero', eyebrow: 'IntelliLink', logo: '/svg/intellilink.svg',
        title: 'Intelligence becomes useful when it can reach the work.',
        lead: 'The answer may sit in one system while the action belongs in another. IntelliLink connects context, permissions and workflows so understanding can become authorised execution.',
        cta: { label: 'Talk to Intellient', href: '/contact' },
        art: { kind: 'scene', scene: 'link' },
      },
      {
        type: 'list', eyebrow: 'Capability areas', title: 'Designed for enterprise work.',
        items: ['Enterprise connectors and MCP-based access patterns', 'System-specific and cross-system agents', 'Authorised context retrieval', 'Workflow actions and approvals', 'Explicit system precedence', 'Audit-ready action visibility'],
      },
      { type: 'statement', text: 'Connection does not make conflicting data harmless. It makes the conflict visible and routes unresolved cases to the right authority.' },
    ],
    cta: TECH_CTA,
  },

  '/intellient-core': {
    title: 'Intellient Core | Intellient',
    description: 'Information arrives late. Systems disagree. Approvals change the path. Intellient Core keeps work coherent while models, agents, tools and people do their part.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Intellient Core', logo: '/svg/intellient-core.svg',
        title: 'Complex work does not fit inside a prompt.',
        lead: 'Information arrives late. Systems disagree. Approvals change the path. Intellient Core keeps work coherent while models, agents, tools and people do their part.',
        cta: { label: 'Talk to Intellient', href: '/contact' },
        art: { kind: 'scene', scene: 'core' },
      },
      {
        type: 'list', eyebrow: 'Capability areas', title: 'Designed for enterprise work.',
        items: ['Planning and task delegation', 'Workflow state and dependencies', 'Retries and exception routes', 'Enterprise context grounded in evidence', 'Workload-appropriate model choice', 'Structured human escalation', 'Decision traces and completion evidence'],
      },
      { type: 'statement', text: 'Human involvement should not be a vague fallback. The workflow must define where the person enters, what evidence is presented and what happens next.' },
    ],
    cta: TECH_CTA,
  },

  '/intellisphere': {
    title: 'IntelliSphere | Intellient',
    description: 'IntelliSphere gives leaders an operating view of the AI estate: who and what may act, which evidence supported the action and what changed over time.',
    blocks: [
      {
        type: 'hero', eyebrow: 'IntelliSphere', logo: '/svg/intellisphere.svg',
        title: 'If intelligence can act, the enterprise must be able to see and govern it.',
        lead: 'IntelliSphere gives leaders an operating view of the AI estate: who and what may act, which evidence supported the action and what changed over time.',
        cta: { label: 'Talk to Intellient', href: '/contact' },
        art: { kind: 'scene', scene: 'console' },
      },
      {
        type: 'cards', eyebrow: 'Capability areas', title: 'Designed for enterprise work.', cols: 4,
        items: [
          { icon: 'fingerprint', title: 'Agent identity and access' }, { icon: 'shield', title: 'Policy and data boundaries' },
          { icon: 'check', title: 'Evaluation' }, { icon: 'eye', title: 'Observability' },
          { icon: 'coins', title: 'Cost governance' }, { icon: 'file', title: 'Evidence and audit' },
          { icon: 'repeat', title: 'Lifecycle management' }, { icon: 'users', title: 'Human accountability' },
        ],
      },
      { type: 'statement', text: 'A dashboard shows activity. Governance defines what is allowed and what happens when the system leaves the boundary.' },
    ],
    cta: TECH_CTA,
  },

  '/architecture': {
    title: 'Intellient architecture | Workload-led enterprise AI',
    description: 'A model-aware architecture connecting enterprise systems, orchestration and governance.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Open by design', title: 'Choose for the workload, not the logo.',
        lead: 'The operating outcome defines the architecture. Intellient combines the platforms, models, applications and controls the domain requires without forcing a predetermined stack.',
        cta: { label: 'Discuss your architecture', href: '/contact' },
        art: { kind: 'scene', scene: 'stack' },
      },
      {
        type: 'cards', eyebrow: 'Architecture layers', title: 'One operating design across the stack.', cols: 5, numbered: true,
        items: [
          { title: 'Experience', body: 'Where people and systems initiate work.' },
          { title: 'Connection and action', body: 'IntelliLink access and execution.', href: '/intellilink' },
          { title: 'Reasoning and orchestration', body: 'Intellient Core coordination.', href: '/intellient-core' },
          { title: 'Trust and control', body: 'IntelliSphere governance.', href: '/intellisphere' },
          { title: 'Enterprise foundation', body: 'Cloud, data, applications, identity, security and operations.' },
        ],
      },
      {
        type: 'text', eyebrow: 'Model choice', title: 'Different tasks may require different models.',
        body: 'Choice should consider performance, latency, economics, data boundaries and supportability. Flexibility is useful only when workflow, evaluation and governance can absorb change.',
        art: { kind: 'mockup', scene: 'modelChoice' },
      },
    ],
    cta: { title: 'Let the outcome decide the architecture.', lead: 'Discuss one Operating Domain with an Intellient Architect.', button: { label: 'Start the conversation', href: '/contact' } },
  },

  /* ---------------- Company ---------------- */
  '/about': {
    title: 'About Intellient | Enterprise AI built from operating reality',
    description: 'Intellient combines an enterprise operating model, agentic technology and embedded delivery.',
    blocks: [
      {
        type: 'hero', eyebrow: 'About Intellient', title: 'Built from the gap between AI promise and enterprise reality.',
        lead: 'Intellient was formed around a simple conviction: intelligence becomes valuable only when the enterprise around it changes.',
        cta: { label: 'Talk to Intellient', href: '/contact' },
        art: { kind: 'scene', scene: 'gap' },
        backdrop: { kind: 'why', scene: 'earth' },
      },
      {
        type: 'text', eyebrow: 'Our story', title: 'The work came before the category.',
        body: 'The Intellient story did not begin with a blank platform diagram. Its capabilities were developed through enterprise work: agents connected to core systems, complex workflows coordinated across models and tools, governance applied in production and delivery teams kept close to the operating problem.',
      },
      {
        type: 'text', eyebrow: 'The company', title: 'Enterprise AI built around operating performance.',
        body: 'Intellient AI Private Limited brings the operating model, technology and specialist capability into one enterprise AI company. The strategy combines an evidence-led transformation method with IntelliLink, Intellient Core and IntelliSphere. AIR carries the model into customer environments.',
        art: { kind: 'why', scene: 'layers' },
      },
      {
        type: 'list', eyebrow: 'What we believe', title: 'The principles behind the operating model.',
        items: ['Begin with the operating outcome.', 'Understand the work before selecting technology.', 'Use the least complex mechanism that can produce the result.', 'Keep authority visible.', 'Measure adoption and business movement.', 'Build customer capability, not permanent dependence.', 'Let every deployment improve the next one.'],
      },
    ],
    cta: { title: 'Build the intelligent enterprise from operating reality.', lead: 'Talk to the team behind Intellient.', button: { label: 'Contact Intellient', href: '/contact' } },
  },

  '/responsible-ai': {
    title: 'Responsible AI | Intellient',
    description: 'How Intellient designs authority, evidence and accountability into enterprise AI systems.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Responsible AI', title: 'Responsible AI begins with responsible operating design.',
        lead: 'A model cannot decide its own authority. The enterprise must define what the system may access, which actions it may take and when a person remains accountable.',
        cta: { label: 'Discuss governance', href: '/contact' },
        art: { kind: 'scene', scene: 'gates' },
      },
      {
        type: 'list', eyebrow: 'The Intellient approach', title: 'Control enters the design before production.', numbered: true,
        items: ['Define the Operating Domain and consequence of action.', 'Assign human and system authority explicitly.', 'Apply identity, data and policy boundaries.', 'Evaluate behaviour against the intended standard.', 'Observe performance, failure patterns, cost and change.', 'Retain evidence for explanation and audit.', 'Review the system as models and policies evolve.'],
      },
    ],
    cta: { title: 'Govern the authority, behaviour and change.', lead: 'Discuss how IntelliSphere fits your governance model.', button: { label: 'Talk to Intellient', href: '/contact' } },
  },

  '/contact': {
    title: 'Contact Intellient | Start with an Operating Domain',
    description: 'Tell Intellient which operating outcome is constrained.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Start the conversation', title: 'What outcome is not moving as it should?',
        lead: 'Tell us where work waits, where exceptions gather or where a decision repeatedly lacks context. That is a better starting point than asking which agent to build.',
        backdrop: { kind: 'why', scene: 'horizon' },
      },
      {
        type: 'form', id: 'contact', title: 'Share the operating context.',
        lead: 'We will use the information to route the request to the appropriate Intellient leader.',
        subject: 'Intellient enquiry',
        fields: [...CONTACT_FIELDS, { name: 'domain', label: 'Which Operating Domain or outcome should we discuss?', type: 'textarea', wide: true, required: true }],
        consent: CONSENT, submit: 'Send',
        aside: [['Email', 'contact@intellient.ai', 'mailto:contact@intellient.ai'], ['Phone', '+91 98409 01993', 'tel:+919840901993'], ['Geography', 'India']],
      },
    ],
    cta: { title: 'Not ready to scope an audit?', lead: 'Share one workflow or decision that repeatedly waits for context. We will begin there.' },
  },

  '/contact-us': {
    title: 'Contact us | Intellient',
    description: 'Our AI experts are here to help.',
    blocks: [
      { type: 'hero', title: 'Any Questions?', lead: 'Our AI experts are here to help.', backdrop: { kind: 'why', scene: 'horizon' } },
      {
        type: 'form', id: 'contact', subject: 'Intellient question', asideTitle: 'Contact Information', fields: DEMO_FIELDS, submit: 'Submit',
        aside: [['Email', 'contact@intellient.ai', 'mailto:contact@intellient.ai'], ['Phone', '+91 98409 01993', 'tel:+919840901993'], ['Geography', 'India']],
      },
    ],
  },

  '/book-a-demo': {
    title: 'Book a demo | Intellient',
    description: 'Experience the Benefits Firsthand with a Free Personalized Demo.',
    blocks: [
      { type: 'hero', title: 'Want a Free Demo?', lead: 'Experience the Benefits Firsthand with a Free Personalized Demo. Fill out the form and we will reach out to you.', backdrop: { kind: 'why', scene: 'waves' } },
      { type: 'form', id: 'demo', subject: 'Demo request', fields: DEMO_FIELDS, submit: 'Submit' },
    ],
  },

  /* ---------------- Collections ---------------- */
  '/industries': {
    title: 'Industries | Intellient',
    description: 'Enterprise AI for Manufacturing, BFSI, Healthcare and Life Sciences, and Enterprise Services.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Industries', title: 'Four sectors. One operating question.',
        lead: 'Initial Intellient engagements focus on Manufacturing, BFSI, Healthcare and Life Sciences, and Enterprise Services. In each, the starting point is the same: one Operating Domain where the outcome is not moving.',
        art: { kind: 'scene', scene: 'sectors' },
      },
      { type: 'collection', name: 'Industries', base: '/industries' },
    ],
    cta: { title: 'Start with one Operating Domain.', button: { label: 'Scope an AIR Audit', href: '/air-audit' } },
  },

  '/outcomes': {
    title: 'Outcomes | Intellient',
    description: 'Operating performance, revenue movement, employee capacity, and risk and control.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Outcomes', title: 'What changes when the operating model changes.',
        lead: 'Intellient measures movement in four places. Each begins with an Operating Domain and an evidence baseline, not a technology choice.',
        art: { kind: 'scene', scene: 'outcomes' },
      },
      { type: 'collection', name: 'Outcomes', base: '/outcomes' },
    ],
    cta: { title: 'Start with one Operating Domain.', button: { label: 'Scope an AIR Audit', href: '/air-audit' } },
  },

  /* ---------------- Alternate home ---------------- */
  '/home-new': {
    title: 'Intellient | The operating model for the intelligent enterprise',
    description: 'Understand operating reality, redesign critical work and carry governed intelligence into production.',
    blocks: [
      {
        type: 'hero', eyebrow: 'Enterprise intelligence that moves work forward', title: 'Amplify intelligence. Make work move.',
        lead: 'Intellient helps your teams see where work stalls, redesign the decisions and handoffs that matter, and carry governed AI into production.',
        cta: { label: 'Start with an AIR Audit', href: '/air-audit' }, cta2: { label: 'Explore the approach', href: '/home-new#approach' },
        backdrop: { kind: 'technical', scene: 'orbit' },
      },
      { type: 'widget', widget: 'workflow' },
      {
        type: 'cards', id: 'approach', eyebrow: 'The operating gap', title: 'You may already have enough AI.',
        body: 'A model can make a task faster. It cannot, by itself, remove an approval queue, settle which system is authoritative or persuade people to abandon a trusted workaround.',
        link: { label: 'Why Intellient', href: '/why-intellient' },
        items: [
          { icon: 'hourglass', title: 'The case still waits', body: 'A task becomes faster, but the case still waits.', tag: 'Waiting for approval' },
          { icon: 'warning', title: 'The answer is not trusted', body: 'An answer becomes available, but nobody trusts it enough to act.', tag: 'Needs review' },
          { icon: 'repeat', title: 'The old process survives', body: 'A workflow is automated, but the old process survives beside it.', tag: 'Manual process' },
        ],
      },
      {
        type: 'cards', eyebrow: 'A clearer view', title: 'Your enterprise exists in three forms.', lead: 'Each is real. None is complete on its own.',
        link: { label: 'Explore the three enterprises', href: '/three-enterprises' },
        items: [
          { icon: 'stack', title: 'Designed', body: 'What policies, process maps and systems intend.', href: '/three-enterprises' },
          { icon: 'chart', title: 'Observed', body: 'What timestamps, queues and rework show.', href: '/three-enterprises' },
          { icon: 'users', title: 'Lived', body: 'What people know, adapt and work around.', href: '/three-enterprises' },
        ],
      },
      {
        type: 'text', eyebrow: 'The right scope', title: 'Do not start with a use case. Start with an outcome.',
        body: 'An Operating Domain is a bounded set of workflows, systems, decisions and owners that jointly produce a result the business recognises.',
        link: { label: 'Explore Operating Domains', href: '/operating-domains' },
        widget: 'domain',
      },
      {
        type: 'text', eyebrow: 'Measure movement', title: 'The task is rarely the whole problem.',
        body: 'A process can contain twenty minutes of work and ten days of elapsed time. Intellient measures waiting, coordination, rework and decision latency before deciding what to automate.',
        link: { label: 'See where value hides', href: '/where-value-hides' },
        widget: 'measurement',
      },
      {
        type: 'list', eyebrow: 'The first engagement', title: 'An AIR Audit finds what is worth changing.',
        lead: 'An Industry Principal and Intellient Architect expose exception load, clarify authority, establish the baseline and redesign the work before architecture is committed.',
        items: ['Expose exception load', 'Clarify authority', 'Establish the baseline', 'Redesign the work'],
        link: { label: 'Explore AIR Audit', href: '/air-audit' },
      },
      {
        type: 'products', eyebrow: 'From design to production', title: 'Three layers carry the design into production.',
        link: { label: 'Explore the technology', href: '/technology' },
        items: [
          { logo: '/svg/intellilink.svg', title: 'IntelliLink', body: 'Connect and act.', label: 'Explore IntelliLink', href: '/intellilink' },
          { logo: '/svg/intellient-core.svg', title: 'Intellient Core', body: 'Reason and orchestrate.', label: 'Explore Intellient Core', href: '/intellient-core' },
          { logo: '/svg/intellisphere.svg', title: 'IntelliSphere', body: 'Govern and improve.', label: 'Explore IntelliSphere', href: '/intellisphere' },
        ],
      },
      {
        type: 'cards', eyebrow: 'Continuity', title: 'The context stays with the team that builds.',
        body: 'AI Architects in Residence carry the Blueprint into production, keeping accountability anchored to the operating outcome.',
        link: { label: 'Explore AIR Residency', href: '/air-residency' }, numbered: true,
        items: [
          { title: 'Blueprint', body: 'Define the outcome' },
          { title: 'Production', body: 'Build and operationalize' },
          { title: 'Adoption', body: 'Scale with the team' },
        ],
      },
      {
        type: 'text', eyebrow: 'Production evidence', title: 'Built in real enterprise work.',
        body: 'Published proof distinguishes production evidence from pilots, demonstrations and roadmap.',
        notice: { title: 'Production stories — awaiting approved evidence', body: 'Relevant examples will be shared here once they are approved for publication. No pilot, demonstration or roadmap item is presented as production proof.' },
      },
    ],
    cta: { title: 'Do not begin with an agent. Begin with the operating outcome worth changing.', lead: 'Choose one domain where delay, exception load or fragmented decision-making is visible.', button: { label: 'Scope an AIR Audit', href: '/air-audit#contact' } },
  },
};

// Detail pages for the two CMS collections (exported from Framer CMS).
export const COLLECTIONS = {
  Industries: [
    { slug: 'manufacturing', name: 'Manufacturing', headline: 'The plant does not need another dashboard when the decision still depends on disconnected signals.', summary: 'Production, quality, maintenance, supply and commercial work cross systems and experienced human judgement.', bodyTitle: 'Where Intellient begins', body: 'AIR Audit examines one Operating Domain, maps delay and exception load, clarifies authority and defines the future state before technology is committed.', seoTitle: 'Enterprise AI for Manufacturing | Intellient', icon: 'factory' },
    { slug: 'bfsi', name: 'BFSI', headline: 'Speed matters only when control survives it.', summary: 'Place evidence, authority and audit inside workflows rather than treating control as a final checkpoint.', bodyTitle: 'Where Intellient begins', body: 'AIR Audit examines one Operating Domain, maps delay and exception load, clarifies authority and defines the future state before technology is committed.', seoTitle: 'Enterprise AI for BFSI | Intellient', icon: 'bank' },
    { slug: 'healthcare-life-sciences', name: 'Healthcare and Life Sciences', headline: 'Reduce the burden of finding and preparing evidence without obscuring accountability.', summary: 'Connect governed intelligence to knowledge, document and operational workflows.', bodyTitle: 'Where Intellient begins', body: 'AIR Audit examines one Operating Domain, maps delay and exception load, clarifies authority and defines the future state before technology is committed.', seoTitle: 'Enterprise AI for Healthcare and Life Sciences | Intellient', icon: 'heart' },
    { slug: 'enterprise-services', name: 'Enterprise Services', headline: 'Repetitive coordination consumes skilled teams long before a workflow is called broken.', summary: 'Improve service operations, knowledge, onboarding and managed work.', bodyTitle: 'Where Intellient begins', body: 'AIR Audit examines one Operating Domain, maps delay and exception load, clarifies authority and defines the future state before technology is committed.', seoTitle: 'Enterprise AI for Enterprise Services | Intellient', icon: 'briefcase' },
  ],
  Outcomes: [
    { slug: 'operating-performance', name: 'Operating Performance', headline: 'Your process may not be slow where you think it is.', summary: 'Reduce elapsed time, exception load and rework.', body: 'Intellient begins with the Operating Domain and establishes the baseline before selecting the intervention.', icon: 'gauge' },
    { slug: 'revenue-movement', name: 'Revenue Movement', headline: 'Make the decision while the opportunity is still alive.', summary: 'Connect commercial and operational context with fewer hand-offs.', body: 'Intellient begins with the Operating Domain and establishes the baseline before selecting the intervention.', icon: 'trend' },
    { slug: 'employee-capacity', name: 'Employee Capacity', headline: 'Return expertise to the work that needs it.', summary: 'Reduce repetitive coordination and reconstruction.', body: 'Intellient begins with the Operating Domain and establishes the baseline before selecting the intervention.', icon: 'users' },
    { slug: 'risk-control', name: 'Risk and Control', headline: 'Put control inside the flow of work.', summary: 'Make evidence, authority and audit part of the workflow.', body: 'Intellient begins with the Operating Domain and establishes the baseline before selecting the intervention.', icon: 'shield' },
  ],
};

// Builds a detail page for /industries/:slug and /outcomes/:slug.
export function collectionPage(path) {
  const [, base, slug] = path.split('/');
  const name = base === 'industries' ? 'Industries' : base === 'outcomes' ? 'Outcomes' : null;
  const item = name && COLLECTIONS[name].find((i) => i.slug === slug);
  if (!item) return null;
  return {
    title: item.seoTitle || `${item.name} | Intellient`,
    description: item.summary,
    blocks: [
      { type: 'hero', eyebrow: item.name, title: item.headline, lead: item.summary, back: { label: `All ${name.toLowerCase()}`, href: `/${base}` }, art: { kind: 'technical', scene: name === 'Industries' ? 'terrain' : 'orbit' } },
      { type: 'text', title: item.bodyTitle, body: item.body },
      { type: 'collection', name, base: `/${base}`, exclude: slug, title: name === 'Industries' ? 'Other industries' : 'Other outcomes' },
    ],
    cta: { title: 'Start with one Operating Domain.', button: { label: 'Scope an AIR Audit', href: '/air-audit' } },
  };
}

// Site map: one source for the nav dropdowns and the footer columns. `also` lists extra paths
// that light up the group in the nav; collection detail pages match by prefix.
export const SITE_MAP = [
  { title: 'Approach', href: '/intellient-model', links: [
    { href: '/why-intellient', label: 'Why Intellient', desc: 'From AI capability to operating performance' },
    { href: '/intellient-model', label: 'The Intellient Model', desc: 'How the intelligent enterprise operates' },
    { href: '/three-enterprises', label: 'Three enterprises', desc: 'Designed, observed and lived' },
    { href: '/operating-domains', label: 'Operating Domains', desc: 'Start at the right level' },
    { href: '/where-value-hides', label: 'Where value hides', desc: 'Measure the full operating clock' },
    { href: '/exception-architecture', label: 'Exception architecture', desc: 'Work beyond the happy path' },
  ] },
  { title: 'Engagement', href: '/air-audit', links: [
    { href: '/air-audit', label: 'AIR Audit', desc: 'Find the work worth changing' },
    { href: '/intellient-blueprint', label: 'Intellient Blueprint', desc: 'A customer-owned path to production' },
    { href: '/air-residency', label: 'AIR Residency', desc: 'Architects who stay through the build' },
    { href: '/industry-principals', label: 'Industry Principals', desc: 'Operational experience in the design' },
    { href: '/operating-domain-assessment', label: 'Domain assessment', desc: 'Find your first Operating Domain' },
  ] },
  { title: 'Technology', href: '/technology', links: [
    { href: '/technology', label: 'Technology', desc: 'Connect, orchestrate and govern' },
    { href: '/intellilink', label: 'IntelliLink', desc: 'Connect context and enable action' },
    { href: '/intellient-core', label: 'Intellient Core', desc: 'Keep complex work coherent' },
    { href: '/intellisphere', label: 'IntelliSphere', desc: 'Govern the AI estate' },
    { href: '/architecture', label: 'Architecture', desc: 'Choose for the workload, not the logo' },
  ] },
  { title: 'Company', href: '/about', also: ['/contact-us', '/book-a-demo'], links: [
    { href: '/about', label: 'About', desc: 'Built from operating reality' },
    { href: '/industries', label: 'Industries', desc: 'Four sectors, one operating question' },
    { href: '/outcomes', label: 'Outcomes', desc: 'What changes when the model changes' },
    { href: '/responsible-ai', label: 'Responsible AI', desc: 'Authority, evidence and accountability' },
    { href: '/contact', label: 'Contact', desc: 'Start with an Operating Domain' },
  ] },
];

export const inGroup = (group, path) =>
  group.links.some((l) => path === l.href || path.startsWith(`${l.href}/`)) || (group.also ?? []).includes(path);
