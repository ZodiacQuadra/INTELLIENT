import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9243;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getWsUrl() {
  for (let i = 0; i < 25; i++) {
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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-inspect-hero',
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
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(4500); // wait until intro finishes and copy is revealed

    const result = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const hero = document.querySelector('section#intro') || document.querySelector('.hero');
          const framenode = hero ? hero.querySelector('div') : null;
          const copyBox = document.getElementById('hero-copy-box');
          const sculpture = document.getElementById('sculpture-stage');
          const header = document.querySelector('.site-header');

          return JSON.stringify({
            window: { width: window.innerWidth, height: window.innerHeight },
            hero: hero ? hero.getBoundingClientRect() : null,
            framenode: framenode ? framenode.getBoundingClientRect() : null,
            copyBox: copyBox ? copyBox.getBoundingClientRect() : null,
            sculpture: sculpture ? sculpture.getBoundingClientRect() : null,
            header: header ? header.getBoundingClientRect() : null
          }, null, 2);
        })()
      `,
      returnByValue: true
    });

    console.log('LAYOUT METRICS:', result.result.value);
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    edge.kill();
  }
}

run();
