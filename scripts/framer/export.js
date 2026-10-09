// Read-only export of page content from the connected Framer project.
const fs = require('fs');
const SKIP = new Set(['/', '/advantage', '/pricing', '/404-page']);
const pages = (await framer.agent.getNodesOfTypes({ types: ['WebPageNode'] }))
  .map((p) => ({ id: p.id, path: p.attributes?.path }))
  .filter((p) => !SKIP.has(p.path));
const comps = await framer.agent.listComponents();
const compName = {};
const addList = (list) => (list ?? []).forEach((c) => { compName[c.id] = c.displayName || c.name; });
addList(comps.project?.canvas);
for (const l of Object.values(comps.project?.code ?? {})) addList(l);
addList(comps.external); addList(comps.additional);

const textOf = (n) => {
  const out = [];
  const w = (x) => { if (x.type === 'TextRun' && x.attributes?.text) out.push(x.attributes.text); if (x.type === 'TextLineBreak') out.push('\n'); (x.children ?? []).forEach(w); };
  w(n);
  return out.join('');
};
const blocks = (n) => (n.children ?? []).filter((c) => c.type === 'TextBlock').map((b) => ({ tag: b.attributes?.tag || 'p', text: textOf(b) }));

function condense(n, depth = 0) {
  const a = n.attributes ?? {};
  if (a.visible === false || a.visible === 'false') return null;
  const o = { t: n.type.replace('Node', ''), n: n.name };
  if (n.type === 'RichTextNode') {
    o.text = blocks(n);
    if (!o.text.length) o.text = [{ tag: 'p', text: textOf(n) }];
    if (a.textColor) o.color = a.textColor;
  }
  if (n.type === 'IconNode') o.icon = a.$control__icon;
  if (n.type === 'ComponentInstanceNode') {
    o.comp = n.$componentDisplayName || compName[n.component] || n.component;
    const ctrl = {};
    for (const [k, v] of Object.entries(a)) if (k.startsWith('$control__') && v != null && typeof v !== 'object') ctrl[k.slice(10)] = v;
    for (const [k, v] of Object.entries(a)) if (k.startsWith('$control__') && v && typeof v === 'object') ctrl[k.slice(10)] = v;
    o.ctrl = ctrl;
  }
  if (typeof a.fill === 'string' && /^https?:/.test(a.fill)) o.img = a.fill;
  if (a['link']?.href || a['link.href']) o.href = a['link']?.href || a['link.href'];
  if (a.htmlTag) o.tag = a.htmlTag;
  if (a.layout === 'grid') o.grid = a.gridColumnCount;
  if (a.layout === 'stack') o.dir = a.stackDirection === 'horizontal' ? 'row' : 'col';
  if (a.collectionList?.collection || a['collectionList.collection']) o.cms = a.collectionList?.collection || a['collectionList.collection'];
  const kids = (n.children ?? []).filter((c) => !['TextBlock', 'TextRun', 'TextLineBreak'].includes(c.type)).map((c) => condense(c, depth + 1)).filter(Boolean);
  if (kids.length && n.type !== 'RichTextNode') o.c = kids;
  return o;
}

const out = {};
for (const p of pages) {
  const node = await framer.agent.getNode({ id: p.id }, { pagePath: p.path.includes(':') ? p.path : p.path });
  const primary = (node.children ?? []).find((c) => c.$isPrimary) ?? node.children?.[0];
  out[p.path] = { id: p.id, meta: node.attributes?.metadata ?? null, layoutTemplate: node.$layoutTemplateDisplayName ?? null, sections: (primary?.children ?? []).map((c) => condense(c)).filter(Boolean) };
}
fs.writeFileSync('framer-export/pages.json', JSON.stringify(out, null, 1));

// CMS collections behind the /industries and /outcomes templates.
const collections = await framer.getCollections();
const cms = {};
for (const col of collections) {
  const fields = await col.getFields();
  const items = await col.getItems();
  cms[col.name] = {
    fields: fields.map((f) => ({ id: f.id, name: f.name, type: f.type })),
    items: items.map((it) => {
      const row = { slug: it.slug, draft: it.draft };
      for (const f of fields) {
        const v = it.fieldData?.[f.id];
        if (!v) continue;
        row[f.name] = v.type === 'image' ? v.value?.url : v.value;
      }
      return row;
    }),
  };
}
fs.writeFileSync('framer-export/cms.json', JSON.stringify(cms, null, 1));
console.log(Object.keys(out).length, 'pages;', Object.entries(cms).map(([k, v]) => `${k}:${v.items.length}`).join(', '));

// Source of the project's code components (illustrations, interactive pieces), for local reuse.
fs.mkdirSync('framer-export/code', { recursive: true });
const files = await framer.getCodeFiles();
for (const f of files) fs.writeFileSync('framer-export/code/' + f.name.replace(/[\/]/g, '_'), f.content);
console.log('code files:', files.length);
