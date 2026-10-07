import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9245;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function run() {
  const edge = spawn(EDGE_PATH, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-topbar', 'about:blank']);
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
  await sleep(4500);

  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const allFixedOrSticky = [];
        document.querySelectorAll('*').forEach(el => {
          const s = window.getComputedStyle(el);
          const r = el.getBoundingClientRect();
          if (r.top < 120 && r.height > 10 && r.width > 300) {
            allFixedOrSticky.push({
              tag: el.tagName,
              class: el.className,
              id: el.id,
              top: Math.round(r.top),
              left: Math.round(r.left),
              width: Math.round(r.width),
              height: Math.round(r.height),
              pos: s.position,
              bg: s.backgroundColor,
              border: s.borderTop
            });
          }
        });
        return JSON.stringify(allFixedOrSticky, null, 2);
      })()
    `,
    returnByValue: true
  });
  console.log('TOP ELEMENTS:\n', evalRes.result.value);
  ws.close();
  edge.kill();
}
run();
