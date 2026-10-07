import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9226;
const ARTIFACT_DIR = 'C:\\Users\\PrasanthS\\.gemini\\antigravity-ide\\brain\\fc7cb8b7-f59c-4bd4-bb8d-a123a8402a64';
const OUT_DIR = path.join(ARTIFACT_DIR, 'reference_analysis');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

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

async function analyzeSite(ws, url, prefix) {
  let id = 100;
  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  console.log(`Navigating to ${url}...`);
  await sendCommand('Page.navigate', { url });
  await sleep(5000);

  // Take full viewport screenshot
  const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(OUT_DIR, `${prefix}_hero.png`), Buffer.from(shot.data, 'base64'));

  // Scroll down a bit and take another shot
  await sendCommand('Runtime.evaluate', { expression: `window.scrollTo(0, 900)` });
  await sleep(1000);
  const shot2 = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(OUT_DIR, `${prefix}_section2.png`), Buffer.from(shot2.data, 'base64'));

  // Scroll down more
  await sendCommand('Runtime.evaluate', { expression: `window.scrollTo(0, 1800)` });
  await sleep(1000);
  const shot3 = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(OUT_DIR, `${prefix}_section3.png`), Buffer.from(shot3.data, 'base64'));

  // Extract comprehensive text, section hierarchy, styles, colors, badges, typography
  const evalResult = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, p, a, button, [data-framer-component-type="Text"]')).map(el => ({
        tag: el.tagName,
        text: el.innerText.trim(),
        color: window.getComputedStyle(el).color,
        fontSize: window.getComputedStyle(el).fontSize,
        fontWeight: window.getComputedStyle(el).fontWeight,
        fontFamily: window.getComputedStyle(el).fontFamily,
        letterSpacing: window.getComputedStyle(el).letterSpacing,
        textTransform: window.getComputedStyle(el).textTransform
      })).filter(item => item.text.length > 0 && item.text.length < 300);

      // Unique cards / containers
      const cards = Array.from(document.querySelectorAll('div, section, article')).filter(el => {
        const style = window.getComputedStyle(el);
        const hasBorder = style.borderWidth !== '0px' && style.borderColor !== 'transparent';
        const hasBg = style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent';
        const rect = el.getBoundingClientRect();
        return (hasBorder || hasBg) && rect.width > 200 && rect.height > 100 && rect.width < 1400;
      }).slice(0, 20).map(el => {
        const style = window.getComputedStyle(el);
        return {
          bg: style.backgroundColor,
          border: style.border,
          borderRadius: style.borderRadius,
          boxShadow: style.boxShadow,
          backdropFilter: style.backdropFilter,
          padding: style.padding,
          className: el.className
        };
      });

      return {
        title: document.title,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        headings: headings.slice(0, 60),
        cards: cards
      };
    })()`
  });

  fs.writeFileSync(path.join(OUT_DIR, `${prefix}_data.json`), JSON.stringify(evalResult.result.value, null, 2));
  console.log(`Saved analysis for ${prefix}`);
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-ref-profile',
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
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await analyzeSite(ws, 'https://cosmoq.framer.website/', 'cosmoq');
    await analyzeSite(ws, 'https://fine-n7vljkp34f.peachworlds.com/', 'peachworlds');

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
