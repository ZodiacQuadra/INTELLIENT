import { useEffect, useState } from 'react';

// A small client-side router: real paths (/air-audit, /industries/bfsi) without a dependency.
// Internal links stay plain <a href="/..."> elements; clicks on them are intercepted here.

const listeners = new Set();
const current = () => (typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/+$/, '') || '/');

export function navigate(href) {
  const url = new URL(href, window.location.href);
  if (url.pathname === window.location.pathname && url.hash) {
    // Same page: only scroll to the anchor.
    window.history.pushState({}, '', url.pathname + url.hash);
    document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.history.pushState({}, '', url.pathname + url.search + url.hash);
  document.activeElement?.blur?.();
  listeners.forEach((fn) => fn(current()));
  // After the new page renders, jump (not smooth-scroll) to its anchor or to the top.
  window.requestAnimationFrame(() => {
    const target = url.hash ? document.getElementById(url.hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

function onClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest?.('a[href]');
  if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
  const href = a.getAttribute('href');
  if (!href || !href.startsWith('/') || href.startsWith('//')) return;
  e.preventDefault();
  navigate(href);
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => listeners.forEach((fn) => fn(current())));
  document.addEventListener('click', onClick);
}

export function usePath() {
  const [path, setPath] = useState(current);
  useEffect(() => {
    listeners.add(setPath);
    return () => listeners.delete(setPath);
  }, []);
  return path;
}
