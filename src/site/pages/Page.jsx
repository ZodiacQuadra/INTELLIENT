import { useEffect, useRef, useState } from 'react';
import Nav from '../sections/Nav';
import Footer from '../sections/Footer';
import Block from './blocks';
import IndustryPrincipals from './IndustryPrincipals';
import { AirAuditHero, AirAuditBrief, AirAuditRoute } from './AirAuditSections';
import WorkflowRefinement, { acceptsWorkflowBlock } from './WorkflowRefinements';
import CompanyRefinement, { acceptsCompanyBlock } from './CompanyRefinements';
import TaskRefinement from './TaskRefinements';
import OutcomesDesign from './OutcomesDesign';
import ResponsibleDesign from './ResponsibleDesign';
import { IndustriesExperience, CollectionDetailExperience } from './CollectionExperience';
import './pages.css';
import './refined-pages.css';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const TASK_ROUTES = new Set(['/operating-domain-assessment', '/contact']);
const REFINED_ROUTES = new Set(['/air-residency', '/intellient-core', '/architecture', '/outcomes', '/responsible-ai', ...TASK_ROUTES]);

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
      <main className={`pg${REFINED_ROUTES.has(path) ? ' pg-refined' : ''}`} data-page={path}>
        {path === '/industries'
          ? <IndustriesExperience page={page} />
          : /^\/(industries|outcomes)\/[^/]+$/.test(path)
          ? <CollectionDetailExperience page={page} path={path} />
          : path === '/outcomes'
          ? <OutcomesDesign page={page} />
          : path === '/responsible-ai'
          ? <ResponsibleDesign page={page} />
          : TASK_ROUTES.has(path)
          ? <TaskRefinement page={page} path={path} />
          : path === '/industry-principals'
          ? <IndustryPrincipals page={page} />
          : page.blocks.map((b, i) => {
            if (acceptsWorkflowBlock(path, b)) return <WorkflowRefinement key={`${path}-${i}`} path={path} b={b} />;
            if (acceptsCompanyBlock(path, b)) return <CompanyRefinement key={`${path}-${i}`} path={path} b={b} />;
            const AuditBlock = path === '/air-audit'
              ? (b.type === 'hero' ? AirAuditHero : b.type === 'text' && b.art?.scene === 'brief' ? AirAuditBrief : b.type === 'steps' && b.route ? AirAuditRoute : null)
              : null;
            return AuditBlock ? <AuditBlock key={`${path}-${i}`} b={b} /> : <Block key={`${path}-${i}`} b={b} />;
          })}
      </main>
      <Footer cta={path === '/industry-principals' ? false : (page.cta ?? false)} />
    </div>
  );
}
