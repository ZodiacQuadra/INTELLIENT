import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9232;
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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-hero-seq-profile',
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
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // Navigate to page
    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });

    // Wait 1.0s (during animation)
    await sleep(1000);

    const duringState = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const header = document.querySelector('.site-header');
          const heroCopy = document.querySelector('#hero-copy-box');
          const title = document.querySelector('.item-title');
          const actions = document.querySelector('.item-actions');
          const headerStyle = header ? window.getComputedStyle(header) : null;
          const titleStyle = title ? window.getComputedStyle(title) : null;
          const actionsStyle = actions ? window.getComputedStyle(actions) : null;
          const stage = document.querySelector('#sculpture-stage');
          const stageRect = stage ? stage.getBoundingClientRect() : null;
          const img = document.querySelector('#sculpture-inner img');
          const inner = document.querySelector('#sculpture-inner');
          return {
            headerClasses: header ? header.className : null,
            headerOpacity: headerStyle ? headerStyle.opacity : null,
            titleOpacity: titleStyle ? titleStyle.opacity : null,
            actionsOpacity: actionsStyle ? actionsStyle.opacity : null,
            stageRect: stageRect ? { top: stageRect.top, bottom: stageRect.bottom, height: stageRect.height } : null,
            imgNaturalWidth: img ? img.naturalWidth : null,
            imgComplete: img ? img.complete : null,
            innerOpacity: inner ? window.getComputedStyle(inner).opacity : null,
            innerTransform: inner ? window.getComputedStyle(inner).transform : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('State at t=1.0s (during animation):', duringState.result.value);

    let shot1 = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'hero_seq_01_during_anim.png'), Buffer.from(shot1.data, 'base64'));
    console.log('Saved hero_seq_01_during_anim.png');

    // Wait another 2.5s (t = 3.5s, after animation completes and reveal triggers)
    await sleep(2500);

    const afterState = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const header = document.querySelector('.site-header');
          const heroCopy = document.querySelector('#hero-copy-box');
          const title = document.querySelector('.item-title');
          const actions = document.querySelector('.item-actions');
          const headerStyle = header ? window.getComputedStyle(header) : null;
          const titleStyle = title ? window.getComputedStyle(title) : null;
          const actionsStyle = actions ? window.getComputedStyle(actions) : null;
          return {
            headerClasses: header ? header.className : null,
            headerOpacity: headerStyle ? headerStyle.opacity : null,
            titleOpacity: titleStyle ? titleStyle.opacity : null,
            actionsOpacity: actionsStyle ? actionsStyle.opacity : null,
          };
        })()
      `,
      returnByValue: true
    });
    console.log('State at t=3.5s (after animation revealed):', afterState.result.value);

    let shot2 = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'hero_seq_02_after_reveal.png'), Buffer.from(shot2.data, 'base64'));
    console.log('Saved hero_seq_02_after_reveal.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
