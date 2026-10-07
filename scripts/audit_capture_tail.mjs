import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9230;
const OUT_DIR = 'C:\\Users\\PrasanthS\\.gemini\\antigravity-ide\\brain\\fc7cb8b7-f59c-4bd4-bb8d-a123a8402a64\\current_audit';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-audit-tail-profile',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    await sleep(2000);
    const res = await fetch(`http://127.0.0.1:${PORT}/json`);
    const data = await res.json();
    const target = data.find(t => t.type === 'page') || data[0];
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const h = (e) => {
          const m = JSON.parse(e.data);
          if (m.id === msgId) {
            ws.removeEventListener('message', h);
            if (m.error) reject(m.error);
            else resolve(m.result);
          }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(3000);

    const targets = [
      { name: '13_evidence_section', id: 'evidence' },
      { name: '14_start_section', id: 'start' }
    ];

    for (const t of targets) {
      await send('Runtime.evaluate', { 
        expression: `document.getElementById('${t.id}')?.scrollIntoView({ behavior: 'instant', block: 'start' })` 
      });
      await sleep(800);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, `${t.name}.png`), Buffer.from(shot.data, 'base64'));
      console.log(`Saved ${t.name}.png`);
    }

    ws.close();
    edge.kill();
  } catch (e) {
    console.error(e);
    edge.kill();
  }
}

run();
