import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useSiteMotion() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const reduce = reducedMotion();
    const cleanups = [];

    // Reveal on scroll: elements fade up once as they enter.
    const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-class]');
    if (reduce) {
      revealTargets.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
        { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
      );
      revealTargets.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Nav gets a backdrop once the page leaves the very top.
    const sentinel = document.querySelector('.nav-sentinel');
    if (sentinel) {
      const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
      io.observe(sentinel);
      cleanups.push(() => io.disconnect());
    }

    // Active nav link follows the section in the middle of the viewport.
    const sections = document.querySelectorAll('section[id]');
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
    cleanups.push(() => spy.disconnect());

    if (!reduce) {
      const ctx = gsap.context(() => {
        // The console flattens out of its tilt as the reader moves past the headline.
        const consoleEl = document.querySelector('.console');
        if (consoleEl) {
          gsap.fromTo(
            consoleEl,
            { rotateX: 16, scale: 0.92, y: 40 },
            {
              rotateX: 0, scale: 1, y: 0, ease: 'none',
              scrollTrigger: { trigger: '.console-stage', start: 'top 92%', end: 'top 28%', scrub: 0.6 },
            }
          );
        }

        // The operating-gap statement is read word by word as it scrolls through.
        const words = gsap.utils.toArray('.statement .w');
        if (words.length) {
          ScrollTrigger.create({
            trigger: '.statement',
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: true,
            onUpdate: (self) => {
              const lit = Math.round(self.progress * words.length);
              words.forEach((w, i) => w.classList.toggle('lit', i < lit));
            },
          });
        }
      });
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return { scrolled, active };
}
