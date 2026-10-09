// Packs each Intellient section into a single-file Framer code component.
//   node scripts/framer/build.mjs
// Output: framer-dist/<Name>.tsx, one per section plus Styles (the global stylesheet).
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '../..');
const OUT = path.join(ROOT, 'framer-dist');
const ASSETS = JSON.parse(fs.readFileSync(path.join(ROOT, 'framer-assets.json'), 'utf8'));
const SECTIONS = path.join(ROOT, 'src/site/sections');
const RUNTIME = path.join(ROOT, 'scripts/framer/runtime.jsx');
const GSAP_SHIM = path.join(ROOT, 'scripts/framer/gsap-shim.js');
const REACT_SHIM = path.join(ROOT, 'scripts/framer/react-shim.js');

fs.mkdirSync(OUT, { recursive: true });

// Swap every local asset path for its Framer-hosted copy.
const withAssets = (text) => {
  let out = text;
  for (const [local, url] of Object.entries(ASSETS)) out = out.split(local).join(url);
  return out;
};

const fwd = (p) => p.split(path.sep).join('/');

// [Framer name, section file, extra runtime behaviour]
const ENTRIES = [
  ['Nav', 'Nav', 'nav'],
  ['Hero', 'Hero'],
  ['Gap', 'Gap', 'statement'],
  ['Technology', 'Technology'],
  ['Residency', 'Residency'],
  ['Evidence', 'Evidence'],
  ['Mesh', 'Mesh'],
  ['Enterprises', 'Enterprises'],
  ['Measurement', 'Measurement'],
  ['Domains', 'Domains'],
  ['Audit', 'Audit'],
  ['Faq', 'Faq'],
  ['Footer', 'Footer'],
];

// The bundle only re-exports the section and the runtime hooks. The Framer component itself is
// appended afterwards as plain JSX, because Framer lists a file as a component only when its
// exported function is written in JSX.
function entrySource(file) {
  const sec = fwd(path.join(SECTIONS, `${file}.jsx`));
  return [
    `export { default as Section } from '${sec}';`,
    `export { useReveal, useStatementLight, useNavState } from '${fwd(RUNTIME)}';`,
  ].join('\n');
}

const ANNOTATIONS = [
  '/**',
  ' * @framerSupportedLayoutWidth any-prefer-fixed',
  ' * @framerSupportedLayoutHeight auto',
  ' * @framerIntrinsicWidth 1440',
  ' */',
].join('\n');

function wrapperSource(name, extra) {
  if (extra === 'nav') {
    return [
      ANNOTATIONS,
      `export default function Intellient${name}() {`,
      '  const { scrolled, active } = IxUseNavState();',
      '  return <div style={{ position: "relative", width: "100%" }}><IxSection scrolled={scrolled} active={active} /></div>;',
      '}',
      '',
    ].join('\n');
  }
  return [
    ANNOTATIONS,
    `export default function Intellient${name}() {`,
    '  const ref = IxUseRef(null);',
    '  IxUseReveal(ref);',
    extra === 'statement' ? '  IxUseStatementLight(ref);' : '',
    '  return <div ref={ref} style={{ position: "relative", width: "100%" }}><IxSection /></div>;',
    '}',
    '',
  ].join('\n');
}

const aliasPlugin = {
  name: 'framer-alias',
  setup(b) {
    b.onResolve({ filter: /^gsap(\/ScrollTrigger)?$/ }, () => ({ path: GSAP_SHIM }));
    b.onResolve({ filter: /^https?:\/\// }, (a) => ({ path: a.path, external: true }));
    b.onResolve({ filter: /^(react|react-dom|framer|framer-motion)(\/.*)?$/ }, (a) => ({ path: a.path, external: true }));
  },
};

const header = (name) => [
  `// Intellient: ${name} section. Generated from src/site by scripts/framer/build.mjs.`,
  '// Edit the source site and rebuild rather than editing this file by hand.',
  '// @ts-nocheck',
  '',
].join('\n');

for (const [name, file, extra] of ENTRIES) {
  const result = await build({
    stdin: { contents: entrySource(file), loader: 'jsx', resolveDir: ROOT, sourcefile: `entry-${name}.jsx` },
    bundle: true,
    write: false,
    format: 'esm',
    target: 'es2020',
    // Bundle JSX compiles to a renamed createElement so no `React` binding enters the file.
    jsx: 'transform',
    jsxFactory: 'IxH',
    jsxFragment: 'IxFragment',
    inject: [REACT_SHIM],
    plugins: [aliasPlugin],
    loader: { '.js': 'jsx' },
    legalComments: 'none',
    logLevel: 'warning',
  });
  let code = withAssets(result.outputFiles[0].text);

  // Map the bundle's export list to its local names, then drop the export statement.
  const exp = code.match(/export\s*\{([^}]*)\};?\s*$/);
  const local = {};
  for (const part of exp[1].split(',')) {
    const m = part.trim().match(/^(\S+)(?:\s+as\s+(\S+))?$/);
    if (m) local[m[2] || m[1]] = m[1];
  }
  code = code.slice(0, exp.index);

  // esbuild leaves each module's imports where that module starts; Framer expects them at the top.
  const imports = ['import { useRef as IxUseRef } from "react";'];
  code = code.split('\n').filter((line) => {
    if (/^import .+ from ".+";$/.test(line)) { imports.push(line); return false; }
    return true;
  }).join('\n');

  code = [
    header(name),
    imports.join('\n'),
    code,
    `const IxSection = ${local.Section};`,
    `const IxUseReveal = ${local.useReveal};`,
    `const IxUseStatementLight = ${local.useStatementLight};`,
    `const IxUseNavState = ${local.useNavState};`,
    '',
    wrapperSource(name, extra),
  ].join('\n');
  fs.writeFileSync(path.join(OUT, `${name}.tsx`), code);
  console.log(name.padEnd(12), (code.length / 1024).toFixed(1) + ' KB');
}

// Global stylesheet + fonts, injected once by an invisible Styles component at the top of the page.
// Framer ships its own static "Inter", which would win over the Google variable font and lose
// the optical-size axis the headings rely on. Inline Google's faces under unique family names.
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&family=Geist+Mono:wght@400;500&display=swap';
const fontCss = (await (await fetch(FONT_URL, {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' },
})).text())
  .replace(/font-family: 'Inter';/g, "font-family: 'Intellient Inter';")
  .replace(/font-family: 'Geist Mono';/g, "font-family: 'Intellient Geist Mono';");
if (!fontCss.includes('Intellient Inter')) throw new Error('Font CSS did not load');
const css = fontCss + withAssets(fs.readFileSync(path.join(ROOT, 'src/site/site.css'), 'utf8'))
  .replace("--font: 'Inter',", "--font: 'Intellient Inter', 'Inter',")
  .replace("--mono: 'Geist Mono',", "--mono: 'Intellient Geist Mono', 'Geist Mono',");
const styles = `${header('Styles')}import { useIsStaticRenderer } from "framer";

const CSS = ${JSON.stringify(css)};
// On the canvas there is no scrolling, so show every scroll-revealed element in its final state.
const CANVAS_CSS = "[data-reveal]{opacity:1!important;transform:none!important}.rise{opacity:1!important;filter:none!important;transform:none!important;animation:none!important}.statement .w{color:var(--text)!important}";

/**
 * Global stylesheet for the Intellient sections. Place once at the top of the page.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1
 * @framerIntrinsicHeight 1
 */
export default function IntellientStyles() {
  const isStatic = useIsStaticRenderer();
  return (
    <div style={{ position: "relative", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <style>{CSS}</style>
      {isStatic ? <style>{CANVAS_CSS}</style> : null}
    </div>
  );
}
`;
fs.writeFileSync(path.join(OUT, 'Styles.tsx'), styles);
console.log('Styles'.padEnd(12), (styles.length / 1024).toFixed(1) + ' KB');
