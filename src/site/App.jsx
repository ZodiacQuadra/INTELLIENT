import { lazy, Suspense, useEffect } from 'react';
import Site from './Site';
import Page from './pages/Page';
import { PAGES, collectionPage } from './pages/pages';
import { usePath } from './router';

// The home page as it was before the /home-new content, kept for comparison at /home-before.
const HomeBefore = lazy(() => import('../../backups/home-before-home-new/src/site/Site.jsx'));

const HOME_TITLE = 'Intellient | The operating model for the intelligent enterprise';

const NOT_FOUND = {
  title: 'Page not found | Intellient',
  description: 'This page does not exist.',
  blocks: [
    { type: 'hero', eyebrow: '404', title: 'This page is not part of the operating model.', lead: 'The link may be out of date. Start from the home page or scope one Operating Domain.', cta: { label: 'Back to home', href: '/' }, backdrop: { kind: 'why', scene: 'horizon' } },
  ],
  cta: { title: 'Start with one Operating Domain.', button: { label: 'Scope an AIR Audit', href: '/air-audit' } },
};

export default function App() {
  const path = usePath();
  const isHome = path === '/';

  useEffect(() => {
    if (isHome) document.title = HOME_TITLE;
  }, [isHome]);

  if (isHome) return <Site />;
  if (path === '/home-before') return <Suspense fallback={null}><HomeBefore /></Suspense>;
  const page = PAGES[path] || collectionPage(path) || NOT_FOUND;
  return <Page key={path} page={page} path={path} />;
}
