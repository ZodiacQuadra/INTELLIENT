import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9235;

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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-sphere-preview',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=900,600',
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
    await sendCommand('Page.navigate', { url: 'http://localhost:3000/test-sphere.html' });
    await sleep(1500);

    const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\PrasanthS\\.gemini\\antigravity-ide\\brain\\19bcb6e1-36c9-4d82-8274-bb1f70f24116\\test_sphere_out.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved test_sphere_out.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
