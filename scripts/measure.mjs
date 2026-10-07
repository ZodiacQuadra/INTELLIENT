import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9222;

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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-test-profile',
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

    // Enable console and page events
    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[Browser console]', msg.params.type, msg.params.args.map(a => a.value || a.description));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[Browser Exception]', msg.params.exceptionDetails);
      }
    });

    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(3000);

    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const targets = {
            '#intro': { targetTop: 72, targetHeight: 822 },
            '#approach': { targetTop: 894, targetHeight: 743 },
            '#three-enterprises': { targetTop: 1638, targetHeight: 806 },
            '#domains': { targetTop: 2444, targetHeight: 706 },
            '#measurement': { targetTop: 3150, targetHeight: 892 },
            '#air-audit': { targetTop: 4042, targetHeight: 721 },
            '#technology': { targetTop: 4763, targetHeight: 727 },
            '#residency': { targetTop: 5490, targetHeight: 597 },
            '#evidence': { targetTop: 6087, targetHeight: 530 },
            '#start': { targetTop: 6618, targetHeight: 494 },
            'footer': { targetTop: 7112, targetHeight: 791 }
          };

          const list = Object.entries(targets).map(([sel, t]) => {
            const el = document.querySelector(sel);
            if (!el) return { sel, notFound: true };
            const r = el.getBoundingClientRect();
            const top = Math.round(r.top + window.scrollY);
            const height = Math.round(r.height);
            return {
              sel,
              top,
              targetTop: t.targetTop,
              diffTop: top - t.targetTop,
              height,
              targetHeight: t.targetHeight,
              diffHeight: height - t.targetHeight
            };
          });

          return {
            title: document.title,
            bodyChildren: document.body.children.length,
            htmlSnippet: document.body.innerHTML.slice(0, 300),
            viewport: { w: window.innerWidth, h: window.innerHeight },
            scrollHeight: document.documentElement.scrollHeight,
            targetTotalHeight: 7903,
            diffTotal: document.documentElement.scrollHeight - 7903,
            list
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Result:', JSON.stringify(evalRes.result.value, null, 2));
    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
