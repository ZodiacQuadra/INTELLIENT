import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9242;
const OUT_DIR = 'C:/Users/PrasanthS/.gemini/antigravity-ide/brain/2856d0e9-c92c-43ff-811c-51b9c31cc3e3/screenshots';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

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
    '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-three-test-profile-2',
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

    const consoleLogs = [];
    const errors = [];

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description).join(' ');
        consoleLogs.push(`[${msg.params.type}] ${text}`);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        errors.push(msg.params.exceptionDetails.text || 'Exception');
      }
    });

    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to http://localhost:3000...');
    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });

    // 1. Capture during entrance (t = 2.0s: rim trails active, center stage, utilizing whole hero layout)
    await sleep(2000);
    const entranceState = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const hero = document.querySelector('#intro');
          const heroRect = hero ? hero.getBoundingClientRect() : null;
          const copyBox = document.querySelector('#hero-copy-box');
          const header = document.querySelector('.site-header');
          return {
            heroHeight: heroRect ? Math.round(heroRect.height) : null,
            copyRevealed: copyBox ? copyBox.classList.contains('hero-revealed') : null,
            headerRevealed: header ? header.classList.contains('hero-revealed') : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Entrance state (t=2.0s):', entranceState.result.value);

    let shotEntrance = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
    });
    fs.writeFileSync(path.join(OUT_DIR, 'hero_01_utilize_whole_layout.png'), Buffer.from(shotEntrance.data, 'base64'));
    console.log('Saved hero_01_utilize_whole_layout.png');

    // 2. Capture Flare Burst (t = 3.35s)
    await sleep(1350);
    let shotFlare = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
    });
    fs.writeFileSync(path.join(OUT_DIR, 'hero_02_flare.png'), Buffer.from(shotFlare.data, 'base64'));
    console.log('Saved hero_02_flare.png');

    // 3. Wait until alignment completes (t = 5.0s)
    await sleep(1650);
    const alignedState = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const stage = document.querySelector('#sculpture-stage');
          const stageRect = stage ? stage.getBoundingClientRect() : null;
          const title = document.querySelector('.item-title');
          const titleRect = title ? title.getBoundingClientRect() : null;
          const copyBox = document.querySelector('#hero-copy-box');
          const header = document.querySelector('.site-header');
          return {
            stageTop: stageRect ? Math.round(stageRect.top + window.scrollY) : null,
            stageBottom: stageRect ? Math.round(stageRect.bottom + window.scrollY) : null,
            titleTop: titleRect ? Math.round(titleRect.top + window.scrollY) : null,
            copyRevealed: copyBox ? copyBox.classList.contains('hero-revealed') : null,
            headerRevealed: header ? header.classList.contains('hero-revealed') : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Aligned state (t=5.0s):', alignedState.result.value);

    let shotAligned = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
    });
    fs.writeFileSync(path.join(OUT_DIR, 'hero_03_aligned_in_position.png'), Buffer.from(shotAligned.data, 'base64'));
    console.log('Saved hero_03_aligned_in_position.png');

    // Capture screenshots at choreography timeline targets:
    // t = 0.5, 1.2, 2.4, 3.4, 4.0, 5.3, 6.6, 7.6, 8.5, 9.5s
    const timelinePoints = [
      { t: 0.5, name: '01_t0_5_rest.png', label: 'Rest (T0)' },
      { t: 1.2, name: '02_t1_2_first_trail.png', label: 'First Trail (T1)' },
      { t: 2.4, name: '03_t2_4_all_trails.png', label: 'All Trails (T2)' },
      { t: 3.4, name: '04_t3_4_flare.png', label: 'Flare Burst (T3)' },
      { t: 4.0, name: '05_t4_0_edge_on_loop.png', label: 'Edge-on Loop (T4)' },
      { t: 5.3, name: '06_t5_3_rings.png', label: 'Floor Rings (T5)' },
      { t: 6.6, name: '07_t6_6_orbit_ribbons.png', label: 'Orbit Ribbons (T6)' },
      { t: 7.6, name: '08_t7_6_settling.png', label: 'Settling (T7)' },
      { t: 8.5, name: '09_t8_5_fading_trails.png', label: 'Fading Trails (T8)' },
      { t: 9.5, name: '10_t9_5_rest.png', label: 'Rest Return (T9)' }
    ];

    for (const pt of timelinePoints) {
      await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const tl = window.__heroMasterTimeline;
            if (tl) {
              tl.pause();
              tl.seek(${pt.t}, false);
            }
          })()
        `
      });

      await sleep(250);

      const shot = await sendCommand('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
      });

      const outPath = path.join(OUT_DIR, pt.name);
      fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
      console.log(`Captured [${pt.label}] at t=${pt.t}s -> ${pt.name}`);
    }

    // Measure memory & draw calls
    const perfState = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const canvas = document.querySelector('#sculpture-inner canvas');
          const gl = canvas ? canvas.getContext('webgl2') || canvas.getContext('webgl') : null;
          return {
            canvasExists: !!canvas,
            devicePixelRatio: window.devicePixelRatio
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Performance State:', perfState.result.value);

    console.log('Errors logged:', errors);
    if (consoleLogs.length) {
      console.log('Console logs:', consoleLogs.slice(0, 10));
    }

    ws.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
