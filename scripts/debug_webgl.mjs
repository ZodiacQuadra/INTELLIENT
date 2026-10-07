import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9246;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-debug-profile-2',
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

    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('CONSOLE:', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.log('EXCEPTION:', JSON.stringify(msg.params.exceptionDetails));
      }
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(3500);

    const test = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const testCanvas = document.createElement('canvas');
          const gl2 = testCanvas.getContext('webgl2');
          const gl = testCanvas.getContext('webgl');
          const exp = testCanvas.getContext('experimental-webgl');
          return {
            gl2: !!gl2,
            gl: !!gl,
            exp: !!exp
          };
        })()
      `,
      returnByValue: true
    });
    console.log('WebGL support in Edge:', test.result.value);

    // Let's test the dynamic import manually in the browser context to see if it throws!
    const importTest = await send('Runtime.evaluate', {
      expression: `
        (async () => {
          try {
            const three = await import('three');
            const gsap = await import('gsap');
            const ec = await import('three/addons/postprocessing/EffectComposer.js');
            return { ok: true, three: !!three, gsap: !!gsap, ec: !!ec };
          } catch(e) {
            return { error: e.message, stack: e.stack };
          }
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Browser import test:', importTest.result.value);

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
