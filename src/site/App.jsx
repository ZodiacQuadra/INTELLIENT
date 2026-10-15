import { useEffect } from 'react';
import Site from './Site';
import Page from './pages/Page';
import { PAGES, collectionPage } from './pages/pages';
import { usePath } from './router';
import { HERO_APPROVED } from './content';

// Retired routes: /contact-us and /book-a-demo fold into /contact, and /home-new became the home page.
const REDIRECTS = { '/contact-us': '/contact', '/book-a-demo': '/contact', '/home-new': '/' };

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
  const requested = usePath();
  const path = REDIRECTS[requested] || requested;

  useEffect(() => {
    if (path !== requested) window.history.replaceState({}, '', path + window.location.search + window.location.hash);
  }, [path, requested]);
  const isHome = path === '/' || path === '/home-before';

  useEffect(() => {
    if (isHome) document.title = HOME_TITLE;
  }, [isHome]);

  // /home-before is the same home page with the hero from the approved content document.
  if (isHome) return <Site key={path} hero={path === '/home-before' ? HERO_APPROVED : undefined} />;
  const page = PAGES[path] || collectionPage(path) || NOT_FOUND;
  return <Page key={path} page={page} path={path} />;
}
