import { useEffect, useRef, useState } from 'react';
import Nav from '../sections/Nav';
import Footer from '../sections/Footer';
import Block from './blocks';
import './pages.css';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// One inner page: the shared nav, the page's blocks in order and the finale footer.
export default function Page({ page, path }) {
  const ref = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description || '');
  }, [page]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal on scroll: elements fade up once as they enter.
  useEffect(() => {
    const targets = ref.current.querySelectorAll('[data-reveal]');
    if (reduced()) {
      targets.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }),
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  return (
    <div ref={ref}>
      <Nav scrolled={scrolled} path={path} />
      <main className="pg">
        {page.blocks.map((b, i) => <Block key={`${path}-${i}`} b={b} />)}
      </main>
      <Footer cta={page.cta ?? false} />
    </div>
  );
}
