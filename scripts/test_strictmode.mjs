import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9248;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-cleanup-profile',
    '--no-first-run',
    'about:blank'
  ]);

  try {
    await sleep(2000);
    const res = await fetch(`http://127.0.0.1:${PORT}/json`);
    const data = await res.json();
    const ws = new WebSocket(data.find(t => t.type === 'page').webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    const send = (method, params = {}) => new Promise(resolve => {
      const msgId = id++;
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2500);

    const checkCanvases = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const canvases = document.querySelectorAll('canvas');
          return {
            canvasCount: canvases.length,
            stageExists: !!document.getElementById('sculpture-stage'),
            innerExists: !!document.getElementById('sculpture-inner')
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Canvases in DOM (StrictMode check):', checkCanvases.result.value);

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
