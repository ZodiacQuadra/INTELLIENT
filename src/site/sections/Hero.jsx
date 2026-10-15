import { ArrowRight } from '@phosphor-icons/react';
import { HERO, PRIMARY_CTA, SECONDARY_CTA } from '../content';
import HeroAurora from './HeroAurora';
import LogoStrip from './LogoStrip';
import HeroWorkspace from './HeroWorkspace';

export default function Hero({ hero = HERO }) {
  return (
    <section className="hero" id="intro">
      <HeroAurora />
      <div className="container hero-inner">
        <p className="hero-pill rise" style={{ '--d': 100 }}>{hero.eyebrow}</p>
        <h1 className="h-display hero-title rise" style={{ '--d': 220 }}>
          {hero.title}<br />{hero.accent}
        </h1>
        <p className={`hero-body rise${hero.wide ? ' is-wide' : ''}`} style={{ '--d': 380 }}>{hero.body[0]}<br />{hero.body[1]}</p>
        <div className="btn-row rise" style={{ '--d': 520 }}>
          <a href={PRIMARY_CTA.href} className="btn btn-primary">{PRIMARY_CTA.label}<ArrowRight weight="bold" /></a>
          <a href={SECONDARY_CTA.href} className="btn btn-ghost">{SECONDARY_CTA.label}<ArrowRight /></a>
        </div>
      </div>
      <div className="container console-stage rise" style={{ '--d': 700 }}>
        <HeroWorkspace />
      </div>
      <div className="container"><LogoStrip /></div>
    </section>
  );
}
