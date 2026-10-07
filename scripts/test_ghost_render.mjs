import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9228;

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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-wordmark-test-profile',
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

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            background: #020407;
            color: #fff;
            font-family: Inter, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 50px;
          }
          .ghost-wordmark-zone {
            position: relative;
            width: 1200px;
            padding-top: 120px;
          }
          .ghost-wordmark {
            container-type: inline-size;
            position: relative;
            width: 1200px;
            height: 165px;
            overflow: hidden;
            pointer-events: none;
          }
          .ghost-wordmark__line {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 1px;
            background: rgba(255, 255, 255, 0.06);
            pointer-events: none;
            z-index: 0;
          }
          .ghost-wordmark__line:nth-of-type(1) { left: 0; }
          .ghost-wordmark__line:nth-of-type(2) { left: 25%; }
          .ghost-wordmark__line:nth-of-type(3) { left: 50%; }
          .ghost-wordmark__line:nth-of-type(4) { left: 75%; }
          .ghost-wordmark__line:nth-of-type(5) { left: calc(100% - 1px); }

          .ghost-wordmark__text {
            position: relative;
            z-index: 1;
            display: block;
            font-family: Inter, sans-serif;
            font-weight: 700;
            letter-spacing: -0.041em;
            line-height: 0.8;
            font-size: 25.96cqw;
            white-space: nowrap;
            user-select: none;
            color: transparent;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            transform: translateY(0.06em);
            background-image:
              radial-gradient(
                ellipse 45% 220% at var(--x, 50%) 50%,
                rgba(255, 255, 255, var(--a, 0.18)) 0%,
                rgba(255, 255, 255, calc(var(--a, 0.18) * 0.6)) 35%,
                rgba(255, 255, 255, calc(var(--a, 0.18) * 0.18)) 70%,
                rgba(255, 255, 255, 0) 100%
              ),
              linear-gradient(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            background-blend-mode: overlay, normal, normal;
          }
        </style>
      </head>
      <body>
        <div class="ghost-wordmark-zone" style="--x: 300px; --a: 0.20;">
          <div class="ghost-wordmark" aria-hidden="true">
            <span class="ghost-wordmark__text">Intellient</span>
            <i class="ghost-wordmark__line"></i>
            <i class="ghost-wordmark__line"></i>
            <i class="ghost-wordmark__line"></i>
            <i class="ghost-wordmark__line"></i>
            <i class="ghost-wordmark__line"></i>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendCommand('Page.setDocumentContent', {
      frameId: (await sendCommand('Page.getFrameTree')).frameTree.frame.id,
      html: htmlContent
    });

    await sleep(2000);

    const metrics = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const text = document.querySelector('.ghost-wordmark__text');
          const wrapper = document.querySelector('.ghost-wordmark');
          const tRect = text.getBoundingClientRect();
          const wRect = wrapper.getBoundingClientRect();
          return {
            wrapperWidth: wRect.width,
            wrapperHeight: wRect.height,
            textWidth: tRect.width,
            textHeight: tRect.height,
            leftDiff: tRect.left - wRect.left,
            rightDiff: tRect.right - wRect.right
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Metrics:', metrics.result.value);

    const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\PrasanthS\\.gemini\antigravity-ide\\brain\\f98d4d48-69cb-431f-8548-e19f23dc901c\\screenshots\\test_ghost_wordmark.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved test_ghost_wordmark.png');

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
