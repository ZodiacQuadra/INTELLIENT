import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9233;
const OUT_DIR = 'C:\\Users\\PrasanthS\\.gemini\\antigravity-ide\\brain\\f98d4d48-69cb-431f-8548-e19f23dc901c\\screenshots';

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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-sizes-profile',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
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
    await sleep(2000);

    const sizes = [
      { name: 'size_w800_rings', width: '800px', height: '450px', time: 5.5, offsetTop: '-60px' },
      { name: 'size_w900_rings', width: '900px', height: '506px', time: 5.5, offsetTop: '-90px' },
      { name: 'size_w1000_rings', width: '1000px', height: '562px', time: 5.5, offsetTop: '-120px' },
      { name: 'size_w900_idle', width: '900px', height: '506px', time: 0.5, offsetTop: '-90px' },
      { name: 'size_w900_lasers', width: '900px', height: '506px', time: 6.8, offsetTop: '-90px' }
    ];

    for (const s of sizes) {
      await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const inner = document.getElementById('sculpture-inner');
            const stage = document.getElementById('sculpture-stage');
            if (inner && stage) {
              stage.style.overflow = 'visible';
              inner.style.overflow = 'visible';
              inner.innerHTML = '';
              const vid = document.createElement('video');
              vid.src = '/video/animate_this.mp4';
              vid.autoplay = true;
              vid.loop = true;
              vid.muted = true;
              vid.playsInline = true;
              vid.style.width = "${s.width}";
              vid.style.height = "${s.height}";
              vid.style.marginTop = "${s.offsetTop}";
              vid.style.display = 'block';
              vid.style.margin = "${s.offsetTop} auto 0 auto";
              vid.style.pointerEvents = 'none';
              vid.currentTime = ${s.time};
              inner.appendChild(vid);
            }
          })()
        `
      });
      await sleep(1000);
      const shot = await sendCommand('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
      });
      fs.writeFileSync(path.join(OUT_DIR, `${s.name}.png`), Buffer.from(shot.data, 'base64'));
      console.log(`Saved ${s.name}.png`);
    }

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
