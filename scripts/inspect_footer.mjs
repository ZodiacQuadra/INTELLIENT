import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9246;
const OUT_DIR = 'C:/Users/PrasanthS/.gemini/antigravity-ide/brain/2856d0e9-c92c-43ff-811c-51b9c31cc3e3/screenshots';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function run() {
  const edge = spawn(EDGE_PATH, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-footer', 'about:blank']);
  await sleep(1500);
  const res = await fetch('http://127.0.0.1:' + PORT + '/json');
  const data = await res.json();
  const ws = new WebSocket(data[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function send(method, params = {}) {
    return new Promise(resolve => {
      const msgId = id++;
      const handler = (e) => {
        const m = JSON.parse(e.data);
        if (m.id === msgId) { ws.removeEventListener('message', handler); resolve(m.result); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await sleep(2000);

  // Scroll to bottom instantly
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 999999);
      })()
    `
  });
  await sleep(2500);

  const footerMetrics = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const footer = document.querySelector('.site-footer');
        const r = footer ? footer.getBoundingClientRect() : null;
        const brand = document.querySelector('.footer-brand-section');
        const cols = document.querySelector('.footer-columns-stacked');
        const bottomBar = document.querySelector('.footer-bottom-bar');
        const wordmark = document.querySelector('.ghost-wordmark-zone');
        return JSON.stringify({
          windowScrollY: window.scrollY,
          documentHeight: document.body.scrollHeight,
          footer: r ? { top: r.top, bottom: r.bottom, height: r.height } : null,
          brand: brand ? brand.getBoundingClientRect() : null,
          cols: cols ? cols.getBoundingClientRect() : null,
          bottomBar: bottomBar ? bottomBar.getBoundingClientRect() : null,
          wordmark: wordmark ? wordmark.getBoundingClientRect() : null
        }, null, 2);
      })()
    `,
    returnByValue: true
  });
  console.log('FOOTER METRICS:\n', footerMetrics.result.value);

  // Scroll to footer start
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const footer = document.querySelector('.site-footer');
        if (footer) {
          window.scrollTo(0, footer.offsetTop);
        }
      })()
    `
  });
  await sleep(1000);
  const shotTop = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(OUT_DIR, 'footer_top_view.png'), Buffer.from(shotTop.data, 'base64'));

  // Scroll to bottom
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        window.scrollTo(0, document.body.scrollHeight);
      })()
    `
  });
  await sleep(1000);
  const shotBottom = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(OUT_DIR, 'footer_bottom_view.png'), Buffer.from(shotBottom.data, 'base64'));
  console.log('Saved footer_top_view.png and footer_bottom_view.png');

  ws.close();
  edge.kill();
}
run();
