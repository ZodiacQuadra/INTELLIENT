import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9229;
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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-wordmark-behavior-profile',
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

    await sleep(3000);

    // Scroll to footer
    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo(0, document.documentElement.scrollHeight);`
    });
    await sleep(1200);

    // 1. Resting state
    const restingMetrics = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('ghost-wordmark');
          const zone = document.getElementById('ghost-wordmark-zone');
          const text = el.querySelector('.ghost-wordmark__text');
          const lines = el.querySelectorAll('.ghost-wordmark__line');
          const r = el.getBoundingClientRect();
          const tr = text.getBoundingClientRect();
          return {
            linesCount: lines.length,
            wrapperWidth: Math.round(r.width),
            wrapperHeight: Math.round(r.height),
            textWidth: Math.round(tr.width),
            textHeight: Math.round(tr.height),
            textLeft: Math.round(tr.left),
            wrapperLeft: Math.round(r.left),
            styleX: el.style.getPropertyValue('--x'),
            styleA: el.style.getPropertyValue('--a')
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Resting Metrics:', restingMetrics.result.value);

    // Capture resting screenshot
    let shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'wordmark_01_resting.png'), Buffer.from(shot.data, 'base64'));
    console.log('Saved wordmark_01_resting.png');

    // 2. Dispatch pointermove to left side (15% of 1200 = 180px)
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const zone = document.getElementById('ghost-wordmark-zone');
          const rect = zone.getBoundingClientRect();
          const clientX = rect.left + 180;
          const clientY = rect.top + 50;
          zone.dispatchEvent(new PointerEvent('pointerenter', { clientX, clientY, bubbles: true }));
          zone.dispatchEvent(new PointerEvent('pointermove', { clientX, clientY, bubbles: true }));
        })()
      `
    });
    await sleep(600);

    const hoverLeftMetrics = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('ghost-wordmark');
          return {
            styleX: el.style.getPropertyValue('--x'),
            styleA: el.style.getPropertyValue('--a')
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Hover Left (target 180px):', hoverLeftMetrics.result.value);

    shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'wordmark_02_hover_left.png'), Buffer.from(shot.data, 'base64'));
    console.log('Saved wordmark_02_hover_left.png');

    // 3. Dispatch pointermove to right side (85% of 1200 = 1020px)
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const zone = document.getElementById('ghost-wordmark-zone');
          const rect = zone.getBoundingClientRect();
          const clientX = rect.left + 1020;
          const clientY = rect.top + 50;
          zone.dispatchEvent(new PointerEvent('pointermove', { clientX, clientY, bubbles: true }));
        })()
      `
    });
    await sleep(600);

    const hoverRightMetrics = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('ghost-wordmark');
          return {
            styleX: el.style.getPropertyValue('--x'),
            styleA: el.style.getPropertyValue('--a')
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Hover Right (target 1020px):', hoverRightMetrics.result.value);

    shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'wordmark_03_hover_right.png'), Buffer.from(shot.data, 'base64'));
    console.log('Saved wordmark_03_hover_right.png');

    // 4. Dispatch pointerleave
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const zone = document.getElementById('ghost-wordmark-zone');
          zone.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
        })()
      `
    });
    await sleep(800);

    const leaveMetrics = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('ghost-wordmark');
          return {
            styleX: el.style.getPropertyValue('--x'),
            styleA: el.style.getPropertyValue('--a')
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Leave (settled back to center):', leaveMetrics.result.value);

    shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, 'wordmark_04_settled.png'), Buffer.from(shot.data, 'base64'));
    console.log('Saved wordmark_04_settled.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
