import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9235;
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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-sculpture-svg-profile',
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

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
          }
          .stage {
            width: 1200px;
            height: 320px;
            position: relative;
          }
          .base-img {
            width: 1200px;
            height: 320px;
            object-fit: cover;
            object-position: center;
            display: block;
          }
          .svg-overlay {
            position: absolute;
            inset: 0;
            width: 1200px;
            height: 320px;
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        <div class="stage">
          <img src="https://framerusercontent.com/images/O5PQexhd4BXevLZvR6qAMiDGXVQ.png" class="base-img" />
          <svg class="svg-overlay" viewBox="0 0 1200 320">
            <!-- Center loop contour -->
            <path d="M 600,48 C 635,50 670,120 725,235 C 740,265 725,275 690,275 C 600,275 510,275 475,275 C 440,275 435,255 460,215 Z"
                  fill="none" stroke="#60a5fa" stroke-width="3" opacity="0.85" />
            <!-- Left loop contour -->
            <path d="M 350,110 C 375,115 410,175 450,235 C 465,260 445,272 415,272 C 340,272 270,272 245,272 C 220,272 225,250 250,210 Z"
                  fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.85" />
            <!-- Right loop contour -->
            <path d="M 850,110 C 875,115 935,210 955,250 C 965,270 945,272 915,272 C 840,272 770,272 745,272 C 730,272 730,255 755,210 Z"
                  fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.85" />
            <!-- Floor concentric energy rings -->
            <ellipse cx="600" cy="275" rx="260" ry="38" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.7" />
            <ellipse cx="600" cy="275" rx="180" ry="26" fill="none" stroke="#60a5fa" stroke-width="2.5" opacity="0.85" />
            <ellipse cx="600" cy="275" rx="100" ry="15" fill="none" stroke="#93c5fd" stroke-width="3" opacity="0.9" />
          </svg>
        </div>
      </body>
      </html>
    `;

    await sendCommand('Page.setDocumentContent', {
      frameId: (await sendCommand('Page.getFrameTree')).frameTree.frame.id,
      html
    });

    await sleep(2000);
    const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'sculpture_overlay_test.png'), Buffer.from(shot.data, 'base64'));
    console.log('Saved sculpture_overlay_test.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
