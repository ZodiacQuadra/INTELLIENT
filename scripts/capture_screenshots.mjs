import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9225;
const OUT_DIR = 'C:\\Users\\PrasanthS\\.gemini\\antigravity-ide\\brain\\f98d4d48-69cb-431f-8548-e19f23dc901c\\screenshots';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getWsUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json`);
      const data = await res.json();
      const pageTarget = data.find(t => t.type === 'page');
      if (pageTarget && pageTarget.webSocketDebuggerUrl) {
        return pageTarget.webSocketDebuggerUrl;
      }
    } catch (e) {
      await sleep(300);
    }
  }
  throw new Error('Could not connect to Edge DevTools');
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-shots-profile',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    '--hide-scrollbars',
    'about:blank'
  ]);

  try {
    await sleep(2000);
    const wsUrl = await getWsUrl();
    const ws = new WebSocket(wsUrl);

    await new Promise(res => ws.onopen = res);

    let id = 1;
    function sendCommand(method, params = {}) {
      return new Promise(resolve => {
        const msgId = id++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(3500);

    const sections = [
      { name: '01_hero', y: 0 },
      { name: '02_approach', y: 894 },
      { name: '03_three_enterprises', y: 1638 },
      { name: '04_domains', y: 2444 },
      { name: '05_measurement', y: 3150 },
      { name: '06_air_audit', y: 4042 },
      { name: '07_technology', y: 4763 },
      { name: '08_residency', y: 5490 },
      { name: '09_evidence_start', y: 6087 },
      { name: '10_footer', y: 7112 }
    ];

    for (const sec of sections) {
      await sendCommand('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${sec.y})`
      });
      await sleep(600);
      const shot = await sendCommand('Page.captureScreenshot', {
        format: 'png'
      });
      fs.writeFileSync(path.join(OUT_DIR, `${sec.name}.png`), Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot ${sec.name}.png`);
    }

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
