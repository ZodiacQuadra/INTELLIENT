import { ArrowLeft, ArrowUpRight, Factory, Bank, Heartbeat, Briefcase, Gauge, TrendUp, UsersThree, ShieldCheck, FileText } from '@phosphor-icons/react';
import { COLLECTIONS } from './pages';
import CollectionVisual from '../art/CollectionVisuals';
import HeroScene from '../art/HeroScenes';
import styles from './CollectionExperience.module.css';

const icons = { factory: Factory, bank: Bank, heart: Heartbeat, briefcase: Briefcase, gauge: Gauge, trend: TrendUp, users: UsersThree, shield: ShieldCheck };

function CollectionCard({ item, base, index, related = false }) {
  const Icon = icons[item.icon];
  return <a className={`${styles.card} ${related ? styles.relatedCard : ''}`} href={`${base}/${item.slug}`} data-reveal>
    <div className={styles.cardTop}><span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span><ArrowUpRight className={styles.cardArrow} aria-hidden="true" /></div>
    <div className={styles.cardArt}><CollectionVisual scene={item.slug} compact /></div>
    <div className={styles.cardCopy}>
      <span className={styles.category} data-copy><Icon aria-hidden="true" />{item.name}</span>
      <h3>{item.headline}</h3><p>{item.summary}</p>
    </div>
  </a>;
}

export function IndustriesExperience({ page }) {
  const hero = page.blocks.find(block => block.type === 'hero');
  return <div className={styles.experience}>
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}><span className="hero-pill">{hero.eyebrow}</span><h1>Four sectors.{' '}<br /><span>One operating question.</span></h1><p>{hero.lead}</p></div>
        <div className={`${styles.heroArt} ${styles.sectorArt}`}><HeroScene scene="sectorhub" /></div>
      </div>
    </section>
    <section className={`container ${styles.collection}`} aria-label="Industries">
      <div className={styles.cardGrid}>{COLLECTIONS.Industries.map((item, index) => <CollectionCard key={item.slug} item={item} index={index} base="/industries" />)}</div>
    </section>
  </div>;
}

export function CollectionDetailExperience({ page, path }) {
  const hero = page.blocks.find(block => block.type === 'hero');
  const body = page.blocks.find(block => block.type === 'text');
  const collection = page.blocks.find(block => block.type === 'collection');
  const slug = path.split('/')[2];
  return <div className={styles.experience}>
    <section className={`${styles.hero} ${styles.detailHero}`}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <a className={styles.back} href={hero.back.href}><ArrowLeft aria-hidden="true" />{hero.back.label}</a>
          <span className="hero-pill">{hero.eyebrow}</span><h1>{hero.title}</h1><p>{hero.lead}</p>
        </div>
        <div className={styles.heroArt}><CollectionVisual scene={slug} /></div>
      </div>
    </section>
    <section className={`container ${styles.context}`} aria-label={body.title || hero.eyebrow}>
      <div className={`${styles.contextInner} ${!body.title ? styles.bodyOnly : ''}`} data-reveal>
        {body.title ? <h2>{body.title}</h2> : <FileText className={styles.contextIcon} aria-hidden="true" />}
        <p>{body.body}</p>
      </div>
    </section>
    <section className={`container ${styles.related}`} aria-labelledby="related-collection-title">
      <h2 id="related-collection-title" data-reveal>{collection.title}</h2>
      <div className={styles.relatedGrid}>{COLLECTIONS[collection.name].filter(item => item.slug !== slug).map((item, index) => <CollectionCard key={item.slug} item={item} index={index} base={collection.base} related />)}</div>
    </section>
  </div>;
}
