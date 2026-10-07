import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9229;
const ARTIFACT_DIR = 'C:\\Users\\PrasanthS\\.gemini\\antigravity-ide\\brain\\fc7cb8b7-f59c-4bd4-bb8d-a123a8402a64';
const OUT_DIR = path.join(ARTIFACT_DIR, 'current_audit');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-audit-fix-profile',
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
    await sleep(3500);

    const docHeight = await send('Runtime.evaluate', {
      expression: 'Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)'
    });
    const totalHeight = docHeight.result.value || 7000;
    console.log('Total height:', totalHeight);

    // Save screenshots at key intervals
    const sections = [
      { name: '01_hero', y: 0 },
      { name: '02_integration_stream', y: 780 },
      { name: '03_approach', y: 1550 },
      { name: '04_three_enterprises', y: 2350 },
      { name: '05_operating_domains', y: 3150 },
      { name: '06_measurement', y: 3950 },
      { name: '07_air_audit', y: 4750 },
      { name: '08_technology', y: 5550 },
      { name: '09_residency', y: 6350 },
      { name: '10_evidence_start_footer', y: 7000 }
    ];

    for (const sec of sections) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${sec.y})` });
      await sleep(600);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT_DIR, `${sec.name}.png`), Buffer.from(shot.data, 'base64'));
      console.log(`Saved ${sec.name}.png`);
    }

    ws.close();
    edge.kill();
  } catch (err) {
    console.error(err);
    edge.kill();
  }
}

run();
