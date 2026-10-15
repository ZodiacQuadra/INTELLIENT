import { ArrowRight, EnvelopeSimple, Phone, MapPin, FileText } from '@phosphor-icons/react';
import Block, { Art } from './blocks';
import styles from './TaskRefinements.module.css';

const CONTACT = [
  ['Email', 'contact@intellient.ai', 'mailto:contact@intellient.ai'],
  ['Phone', '+91 98409 01993', 'tel:+919840901993'],
  ['Geography', 'India'],
];

function ContactDetails({ items = CONTACT }) {
  return <dl className={styles.contactDetails}>
    {items.map(([label, value, href]) => {
      const Icon = label === 'Email' ? EnvelopeSimple : label === 'Phone' ? Phone : MapPin;
      return <div key={label}><Icon aria-hidden="true" /><div><dt>{label}</dt><dd>{href ? <a href={href}>{value}</a> : value}</dd></div></div>;
    })}
  </dl>;
}

function Assessment({ page }) {
  const hero = page.blocks.find((b) => b.type === 'hero');
  const form = page.blocks.find((b) => b.type === 'form');
  const outline = page.blocks.find((b) => b.type === 'cards');
  // The same two-column layout as the contact pages: short context on the left, the form as the main content.
  return <div className={`${styles.root} ${styles.conversation} ${styles.assessment}`}>
    <section className={`container ${styles.conversationGrid}`}>
      <div className={styles.conversationCopy}>
        <span className="hero-pill">{hero.eyebrow}</span>
        <h1>{hero.title}</h1>
        <p className={styles.intro}>{hero.lead}</p>
        <div className={styles.productLinks}>
          <h2>{outline?.title || 'Your Operating Domain Brief'}</h2>
          <ul className={styles.briefList}>{form.brief.map((section) => <li key={section.title}><FileText aria-hidden="true" />{section.title}</li>)}</ul>
        </div>
      </div>
      <div className={styles.conversationForm}>
        <p className={styles.required}>Fields marked * are required.</p>
        <Block b={form} />
      </div>
    </section>
  </div>;
}

function Conversation({ page }) {
  const hero = page.blocks.find((b) => b.type === 'hero');
  const originalForm = page.blocks.find((b) => b.type === 'form');
  const form = { ...originalForm, title: undefined, lead: undefined, aside: undefined, asideTitle: undefined };
  return <div className={`${styles.root} ${styles.conversation}`}>
    <section className={`container ${styles.conversationGrid}`}>
      <div className={styles.conversationCopy}>
        {hero.eyebrow && <span className="hero-pill">{hero.eyebrow}</span>}
        <h1>{hero.title}</h1>
        <p className={styles.intro}>{hero.lead}</p>
        {hero.cta && <a className="btn btn-primary" href={hero.cta.href}>{hero.cta.label}<ArrowRight weight="bold" aria-hidden="true" /></a>}
        {originalForm.title && <div className={styles.contextCopy}><h2>{originalForm.title}</h2><p>{originalForm.lead}</p></div>}
        <ContactDetails items={originalForm.aside || CONTACT} />
      </div>
      <div className={styles.conversationForm}>
        <p className={styles.required}>Fields marked * are required.</p>
        <Block b={form} />
      </div>
    </section>
  </div>;
}

export default function TaskRefinement({ page, path }) {
  return path === '/operating-domain-assessment' ? <Assessment page={page} /> : <Conversation page={page} />;
}
