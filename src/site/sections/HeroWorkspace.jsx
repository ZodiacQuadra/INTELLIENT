import { useState } from 'react';
import {
  House,
  Robot,
  SquaresFour,
  FileText,
  Question,
  SidebarSimple,
  Plus,
  DotsThreeVertical,
  Sun,
  TrendUp,
  Layout,
  Certificate,
  UsersThree,
  ArrowsClockwise,
} from '@phosphor-icons/react';

const EXPERTS = [
  {
    id: 'sales',
    name: 'Sales Expert',
    icon: TrendUp,
    badgeClass: 'badge-sales',
    prompt: 'Analyze enterprise pipeline velocity and cross-system sales handoffs.',
  },
  {
    id: 'ux',
    name: 'UX Expert',
    icon: Layout,
    badgeClass: 'badge-ux',
    prompt: 'Audit user friction points across multi-system approval flows.',
  },
  {
    id: 'cert',
    name: 'Cert Prep Expert',
    icon: Certificate,
    badgeClass: 'badge-cert',
    prompt: 'Prepare compliance and architectural governance verification checklists.',
  },
  {
    id: 'talent',
    name: 'Talent Acquisition...',
    icon: UsersThree,
    badgeClass: 'badge-talent',
    prompt: 'Map recruiting cycle-time baselines across Workday and ATS pipelines.',
  },
  {
    id: 'migration',
    name: 'Migration Expert',
    icon: ArrowsClockwise,
    badgeClass: 'badge-migration',
    prompt: 'Orchestrate cloud ERP data sync and sub-50ms event streaming cutover.',
  },
];

const BOOKMARKED = [
  'Claims adjudication latency audit',
  'SAP S/4HANA event mesh pipeline',
];

const PAST_7_DAYS = [
  'Order-to-cash bottleneck review',
  'Azure runtime policy enforcement',
  'Salesforce lead qualification triage',
  'Workday HCM approval handoff trace',
  'KYC compliance exception analysis',
  'Sub-50ms data mesh benchmark',
];

const PREV_30_DAYS = [
  'AIR Audit baseline report — Domain 1',
  'Procure-to-pay cycle time breakdown',
];

export default function HeroWorkspace() {
  const [activeTab, setActiveTab] = useState('chat');
  const [activeExpert, setActiveExpert] = useState(null);
  const [activeRail, setActiveRail] = useState('home');

  return (
    <div className="hero-app-window" role="region" aria-label="Intellient AI Workspace">
      {/* Outer Window Chrome / Header */}
      <div className="hero-app-topbar">
        <div className="hero-app-topbar-spacer" />
        <div className="hero-app-topbar-actions">
          <button type="button" className="hero-app-topbar-btn" aria-label="AI Mode">
            <Robot weight="regular" />
          </button>
          <button type="button" className="hero-app-topbar-btn" aria-label="Toggle Theme">
            <Sun weight="regular" />
          </button>
          <div className="hero-app-avatar" title="David">
            <img src="/images/david_avatar.jpg" alt="David" />
          </div>
        </div>
      </div>

      {/* Workspace Body: Left Rail + Left Sidebar + Main Canvas */}
      <div className="hero-app-body">
        {/* 1. Left Icon Rail */}
        <nav className="hero-app-rail" aria-label="Primary navigation">
          <div className="hero-app-rail-group">
            <button type="button" className="hero-app-rail-btn" aria-label="Toggle Sidebar">
              <SidebarSimple weight="bold" />
            </button>
            <button
              type="button"
              className={`hero-app-rail-btn${activeRail === 'home' ? ' active' : ''}`}
              onClick={() => setActiveRail('home')}
              aria-label="Home"
            >
              <House weight="fill" />
            </button>
            <button
              type="button"
              className={`hero-app-rail-btn${activeRail === 'agents' ? ' active' : ''}`}
              onClick={() => setActiveRail('agents')}
              aria-label="AI Agents"
            >
              <Robot weight="regular" />
            </button>
            <button
              type="button"
              className={`hero-app-rail-btn${activeRail === 'modules' ? ' active' : ''}`}
              onClick={() => setActiveRail('modules')}
              aria-label="Modules"
            >
              <SquaresFour weight="regular" />
            </button>
            <button
              type="button"
              className={`hero-app-rail-btn${activeRail === 'docs' ? ' active' : ''}`}
              onClick={() => setActiveRail('docs')}
              aria-label="Documents"
            >
              <FileText weight="regular" />
            </button>
          </div>

          <div className="hero-app-rail-group bottom">
            <button type="button" className="hero-app-rail-btn" aria-label="Help & Documentation">
              <Question weight="bold" />
            </button>
          </div>
        </nav>

        {/* 2. Left Sidebar (History & New Chat) */}
        <aside className="hero-app-sidebar">
          {/* Glowing Gradient New Chat Button */}
          <button type="button" className="hero-app-new-chat-btn">
            <span className="hero-app-new-chat-inner">
              <Plus weight="bold" className="hero-app-new-chat-icon" />
              <span>New Chat</span>
            </span>
          </button>

          {/* Segmented Chat / Collection Switcher */}
          <div className="hero-app-segmented">
            <button
              type="button"
              className={`hero-app-seg-btn${activeTab === 'chat' ? ' active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              Chat
            </button>
            <button
              type="button"
              className={`hero-app-seg-btn${activeTab === 'collection' ? ' active' : ''}`}
              onClick={() => setActiveTab('collection')}
            >
              Collection
            </button>
          </div>

          {/* Conversation History List */}
          <div className="hero-app-history-scroll">
            <div className="hero-app-history-section">
              <div className="hero-app-history-heading">Bookmarked</div>
              {BOOKMARKED.map((item, i) => (
                <div key={i} className="hero-app-history-item" tabIndex={0} title={item}>
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-app-history-section">
              <div className="hero-app-history-heading">Past 7 days</div>
              {PAST_7_DAYS.map((item, i) => (
                <div key={i} className="hero-app-history-item" tabIndex={0} title={item}>
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-app-history-section">
              <div className="hero-app-history-heading">Previous 30 days</div>
              {PREV_30_DAYS.map((item, i) => (
                <div key={i} className="hero-app-history-item" tabIndex={0} title={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 3. Main Central Canvas */}
        <main className="hero-app-canvas">
          <div className="hero-app-canvas-ambient" aria-hidden="true" />

          <div className="hero-app-canvas-content">
            {/* Center Logo + Brand Wordmark */}
            <div className="hero-app-brand">
              <div className="hero-app-brand-mark">
                <svg viewBox="0 0 216 216" fill="none" className="hero-app-brand-svg" aria-hidden="true">
                  <path fill="#2F80ED" d="M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818"/>
                  <path fill="#ffffff" d="M149.331 49.43c3.878-5.725 11.784-7.192 16.743-2.374a83.9 83.9 0 0 1 16.658 22.862c6.146 12.379 9.2 26.125 8.889 40.01s-3.978 27.473-10.672 39.549a83.6 83.6 0 0 1-17.652 22.045c-5.177 4.588-13.01 2.758-16.626-3.138-3.507-5.719-1.682-13.113 3.088-17.831a59 59 0 0 0 10.101-13.342 60.26 60.26 0 0 0 7.516-27.853 60.35 60.35 0 0 0-6.261-28.178 59.2 59.2 0 0 0-9.517-13.83c-4.543-4.92-6.025-12.376-2.267-17.92"/>
                  <path fill="#F2A105" d="M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z"/>
                  <rect width="20.488" height="57.366" x="97.293" y="122.341" fill="#2F80ED" rx="10.244"/>
                </svg>
              </div>
              <span className="hero-app-brand-name">Intellient</span>
            </div>

            {/* Main Greeting Headline */}
            <h2 className="hero-app-greeting">
              Hello David, how <span className="hero-app-greeting-emp">can I help you today?</span>
            </h2>

            {/* AI Expert Capsules */}
            <div className="hero-app-experts">
              {/* Row 1 */}
              <div className="hero-app-experts-row">
                {EXPERTS.slice(0, 3).map((exp) => {
                  const Icon = exp.icon;
                  const isSelected = activeExpert === exp.id;
                  return (
                    <div
                      key={exp.id}
                      className={`hero-app-capsule${isSelected ? ' selected' : ''}`}
                      onClick={() => setActiveExpert(isSelected ? null : exp.id)}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                    >
                      <span className={`hero-app-capsule-badge ${exp.badgeClass}`}>
                        <Icon weight="fill" />
                      </span>
                      <span className="hero-app-capsule-title">{exp.name}</span>
                      <button
                        type="button"
                        className="hero-app-capsule-dots"
                        aria-label="Options"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <DotsThreeVertical weight="bold" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Row 2 */}
              <div className="hero-app-experts-row center">
                {EXPERTS.slice(3).map((exp) => {
                  const Icon = exp.icon;
                  const isSelected = activeExpert === exp.id;
                  return (
                    <div
                      key={exp.id}
                      className={`hero-app-capsule${isSelected ? ' selected' : ''}`}
                      onClick={() => setActiveExpert(isSelected ? null : exp.id)}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                    >
                      <span className={`hero-app-capsule-badge ${exp.badgeClass}`}>
                        <Icon weight="bold" />
                      </span>
                      <span className="hero-app-capsule-title">{exp.name}</span>
                      <button
                        type="button"
                        className="hero-app-capsule-dots"
                        aria-label="Options"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <DotsThreeVertical weight="bold" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Expert Context Banner if selected */}
            {activeExpert && (
              <div className="hero-app-expert-hint">
                <span className="hero-app-expert-hint-dot" />
                <span>{EXPERTS.find(e => e.id === activeExpert)?.prompt}</span>
              </div>
            )}
          </div>

          {/* Bottom Disclaimer */}
          <footer className="hero-app-footer">
            Intellient may occasionally make mistakes
          </footer>
        </main>
      </div>
    </div>
  );
}
