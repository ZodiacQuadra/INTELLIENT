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
        <h1>{hero.title}</h1>
        <p className={styles.intro}>{hero.lead}</p>
        <div className={styles.contextCopy}>
          <h2>A useful starting point</h2>
          <p>For example: “Customer orders wait for approval when stock records disagree.”</p>
        </div>
        <div className={styles.productLinks}>
          <h2>{outline?.title || 'Your Operating Domain Brief'}</h2>
          <ul className={styles.briefList}>{form.brief.map((section) => <li key={section.title}><FileText aria-hidden="true" />{section.title}</li>)}</ul>
        </div>
      </div>
      <div className={styles.conversationForm}>
        <div className={styles.emailNotice}>
          <FileText aria-hidden="true" />
          <div><h2>Build your brief.</h2><p>Answer what you know. Select “Unsure” where the answer is still unclear. You can preview, copy or download the brief before sending it.</p></div>
        </div>
        <p className={styles.required}>Fields marked * are required.</p>
        <Block b={form} />
      </div>
    </section>
  </div>;
}

function Conversation({ page, path }) {
  const hero = page.blocks.find((b) => b.type === 'hero');
  const originalForm = page.blocks.find((b) => b.type === 'form');
  const demo = path === '/book-a-demo';
  const general = path === '/contact-us';
  const form = { ...originalForm, title: undefined, lead: undefined, aside: undefined, asideTitle: undefined, submit: demo ? 'Prepare demo request' : 'Compose email' };
  return <div className={`${styles.root} ${styles.conversation}`}>
    <section className={`container ${styles.conversationGrid}`}>
      <div className={styles.conversationCopy}>
        <h1>{hero.title}</h1>
        <p className={styles.intro}>{hero.lead}</p>
        {originalForm.title && <div className={styles.contextCopy}><h2>{originalForm.title}</h2><p>{originalForm.lead}</p></div>}
        <ContactDetails items={originalForm.aside || CONTACT} />
        {demo ? <div className={styles.productLinks}>
          <h2>What would you like to explore?</h2>
          <p>Tell us which part of your work you want to discuss.</p>
          <a href="/intellilink"><span>IntelliLink<small>Connect context and enable action</small></span><ArrowRight aria-hidden="true" /></a>
          <a href="/intellient-core"><span>Intellient Core<small>Coordinate complex work</small></span><ArrowRight aria-hidden="true" /></a>
          <a href="/intellisphere"><span>IntelliSphere<small>Govern authority, behaviour and change</small></span><ArrowRight aria-hidden="true" /></a>
        </div> : <p className={styles.otherPath}>{general ? <>Have an operating outcome in mind? <a href="/contact">Share the operating context<ArrowRight aria-hidden="true" /></a></> : <>Need a starting point? <a href="/operating-domain-assessment">Build an Operating Domain Brief<ArrowRight aria-hidden="true" /></a></>}</p>}
      </div>
      <div className={styles.conversationForm}>
        <div className={styles.emailNotice}>
          <EnvelopeSimple aria-hidden="true" />
          <div><h2>{demo ? 'Prepare your demo request.' : general ? 'Share your question.' : 'Prepare your enquiry.'}</h2><p>This form opens your email app with the details addressed to <a href="mailto:contact@intellient.ai">contact@intellient.ai</a>. Review and send the email there.{demo && ' It does not schedule a demo.'}</p></div>
        </div>
        <p className={styles.required}>Fields marked * are required.</p>
        <Block b={form} />
      </div>
    </section>
  </div>;
}

export default function TaskRefinement({ page, path }) {
  return path === '/operating-domain-assessment' ? <Assessment page={page} /> : <Conversation page={page} path={path} />;
}
