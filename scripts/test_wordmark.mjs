import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9227;

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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-wordmark-profile',
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
    await sleep(3000);

    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const testEl = document.createElement('span');
          testEl.textContent = 'Intellient';
          testEl.style.fontFamily = 'Inter, sans-serif';
          testEl.style.fontWeight = '700';
          testEl.style.letterSpacing = '-0.04em';
          testEl.style.lineHeight = '0.8';
          testEl.style.position = 'absolute';
          testEl.style.visibility = 'hidden';
          testEl.style.whiteSpace = 'nowrap';
          document.body.appendChild(testEl);

          const results = [];
          for (let fs = 280; fs <= 340; fs += 2) {
            testEl.style.fontSize = fs + 'px';
            const rect = testEl.getBoundingClientRect();
            results.push({ fontSize: fs, width: Math.round(rect.width), height: Math.round(rect.height) });
          }
          document.body.removeChild(testEl);
          return results;
        })()
      `,
      returnByValue: true
    });

    console.log('Font size test results:', evalRes.result.value);

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
