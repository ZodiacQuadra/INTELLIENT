import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9223;

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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-details-profile',
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

    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const navLinks = Array.from(document.querySelectorAll('.nav-link')).map(el => {
            const r = el.getBoundingClientRect();
            return { text: el.textContent.trim(), x: Math.round(r.x), width: Math.round(r.width) };
          });
          const cta = document.querySelector('.header-cta-btn');
          const ctaR = cta ? cta.getBoundingClientRect() : null;

          const logo = document.querySelector('.brand-lockup-img');
          const logoR = logo ? logo.getBoundingClientRect() : null;

          const heroBtns = Array.from(document.querySelectorAll('#intro a')).map(el => {
            const r = el.getBoundingClientRect();
            return { text: el.textContent.trim(), w: Math.round(r.width), h: Math.round(r.height) };
          });

          const approachCards = Array.from(document.querySelectorAll('#approach [class*="card"]')).map(el => {
            const r = el.getBoundingClientRect();
            return { w: Math.round(r.width), h: Math.round(r.height) };
          });

          const threeCards = Array.from(document.querySelectorAll('#three-enterprises [class*="three-enterprises-card"]')).map(el => {
            const r = el.getBoundingClientRect();
            return { w: Math.round(r.width), h: Math.round(r.height) };
          });

          const blueprint = document.querySelector('#air-audit [class*="blueprint-card"]');
          const blueprintR = blueprint ? blueprint.getBoundingClientRect() : null;

          const checklist = document.querySelector('#air-audit [class*="checklist-card"]');
          const checklistR = checklist ? checklist.getBoundingClientRect() : null;

          const techCards = Array.from(document.querySelectorAll('#technology [class*="technology-card"]')).map(el => {
            const r = el.getBoundingClientRect();
            return { w: Math.round(r.width), h: Math.round(r.height) };
          });

          const residencyCards = Array.from(document.querySelectorAll('#residency [class*="residency-card"]')).map(el => {
            const r = el.getBoundingClientRect();
            return { w: Math.round(r.width), h: Math.round(r.height) };
          });

          const evidenceCard = document.querySelector('#evidence [class*="evidence-card"]');
          const evidenceR = evidenceCard ? evidenceCard.getBoundingClientRect() : null;

          return {
            navLinks,
            cta: ctaR ? { x: Math.round(ctaR.x), w: Math.round(ctaR.width), h: Math.round(ctaR.height) } : null,
            logo: logoR ? { x: Math.round(logoR.x), w: Math.round(logoR.width), h: Math.round(logoR.height) } : null,
            heroBtns,
            approachCards,
            threeCards,
            blueprint: blueprintR ? { w: Math.round(blueprintR.width), h: Math.round(blueprintR.height) } : null,
            checklist: checklistR ? { w: Math.round(checklistR.width), h: Math.round(checklistR.height) } : null,
            techCards,
            residencyCards,
            evidence: evidenceR ? { w: Math.round(evidenceR.width), h: Math.round(evidenceR.height) } : null
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Details:', JSON.stringify(evalRes.result.value, null, 2));
    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
