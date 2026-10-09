// Framer runtime for the ported Intellient sections. Each section component is mounted on
// its own in Framer, so the site-wide motion from useSiteMotion is split into hooks that
// work inside one section's root.
import { useEffect, useState } from 'react';
import { isStaticRenderer } from 'framer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal on scroll: elements inside this section fade up once as they enter.
export function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll('[data-reveal], [data-reveal-class]');
    if (isStaticRenderer() || reduced() || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}

// The operating-gap statement is read word by word as it scrolls through.
export function useStatementLight(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const words = Array.from(root.querySelectorAll('.statement .w'));
    if (!words.length) return undefined;
    if (isStaticRenderer() || reduced()) {
      words.forEach((w) => w.classList.add('lit'));
      return undefined;
    }
    const st = ScrollTrigger.create({
      trigger: root.querySelector('.statement'),
      start: 'top 78%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => {
        const lit = Math.round(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle('lit', i < lit));
      },
    });
    return () => st.kill();
  }, [ref]);
}

// Nav state: a backdrop once the page leaves the top, and the link for the section in view.
// Sections are separate Framer components that mount at different times, so the active section
// is measured from positions on scroll and resize rather than from intersection events.
export function useNavState() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    if (isStaticRenderer()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const mid = window.innerHeight * 0.5;
      let current = '';
      document.querySelectorAll('section[id]').forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = s.id;
      });
      setActive(current);
    };
    const queue = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    // Late-mounting sections shift the layout; re-measure once they have settled.
    const timers = [400, 1500, 3000].map((ms) => window.setTimeout(queue, ms));
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      timers.forEach((t) => window.clearTimeout(t));
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return { scrolled, active };
}
