import { ArrowRight } from '@phosphor-icons/react';
import { HERO, PRIMARY_CTA, SECONDARY_CTA } from '../content';
import HeroAurora from './HeroAurora';
import LogoStrip from './LogoStrip';
import HeroWorkspace from './HeroWorkspace';

export default function Hero() {
  return (
    <section className="hero" id="intro">
      <HeroAurora />
      <div className="container hero-inner">
        <p className="hero-pill rise" style={{ '--d': 100 }}>{HERO.eyebrow}</p>
        <h1 className="h-display hero-title rise" style={{ '--d': 220 }}>
          {HERO.title}<br />{HERO.accent}
        </h1>
        <p className="hero-body rise" style={{ '--d': 380 }}>{HERO.body[0]}<br />{HERO.body[1]}</p>
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
