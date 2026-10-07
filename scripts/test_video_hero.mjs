import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9231;
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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-video-test-profile',
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

    // Scroll to top
    await sendCommand('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });

    // Replace sculpture image with video dynamically in DOM to inspect
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const inner = document.getElementById('sculpture-inner');
          if (inner) {
            inner.innerHTML = '';
            const vid = document.createElement('video');
            vid.src = '/video/animate_this.mp4';
            vid.autoplay = true;
            vid.loop = true;
            vid.muted = true;
            vid.playsInline = true;
            vid.style.width = '1200px';
            vid.style.height = '320px';
            vid.style.objectFit = 'cover';
            vid.style.objectPosition = 'center';
            vid.style.display = 'block';
            vid.style.pointerEvents = 'none';
            inner.appendChild(vid);
          }
        })()
      `
    });

    await sleep(1500);

    let shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'hero_video_frame1.png'), Buffer.from(shot.data, 'base64'));
    console.log('Saved hero_video_frame1.png');

    // Seek to 5 seconds to capture peak animation (floating loops + concentric rings)
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const vid = document.querySelector('#sculpture-inner video');
          if (vid) vid.currentTime = 5.0;
        })()
      `
    });
    await sleep(800);

    shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'hero_video_frame2_rings.png'), Buffer.from(shot.data, 'base64'));
    console.log('Saved hero_video_frame2_rings.png');

    // Seek to 7 seconds to capture laser filament orbits
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const vid = document.querySelector('#sculpture-inner video');
          if (vid) vid.currentTime = 7.0;
        })()
      `
    });
    await sleep(800);

    shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'hero_video_frame3_orbits.png'), Buffer.from(shot.data, 'base64'));
    console.log('Saved hero_video_frame3_orbits.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
