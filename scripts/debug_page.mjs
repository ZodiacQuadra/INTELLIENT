import { spawn } from 'child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const edge = spawn(EDGE_PATH, [
  '--headless=new',
  '--remote-debugging-port=9228',
  '--user-data-dir=C:\\Users\\PrasanthS\\AppData\\Local\\Temp\\edge-err-profile',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9228/json');
    const data = await res.json();
    const ws = new WebSocket(data[0].webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise(resolve => {
        const msgId = id++;
        const h = (e) => {
          const m = JSON.parse(e.data);
          if (m.id === msgId) {
            ws.removeEventListener('message', h);
            resolve(m.result);
          }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.method === 'Runtime.consoleAPICalled') {
        console.log('CONSOLE:', m.params.type, m.params.args.map(a => a.value || a.description).join(' '));
      }
      if (m.method === 'Runtime.exceptionThrown') {
        console.log('EXCEPTION:', JSON.stringify(m.params.exceptionDetails));
      }
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 4000));

    const html = await send('Runtime.evaluate', { expression: 'document.getElementById("root").innerHTML' });
    console.log('Root HTML length:', html.result.value ? html.result.value.length : 0);
    if (!html.result.value || html.result.value.length === 0) {
      const pageHtml = await send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
      console.log('Page HTML:', pageHtml.result.value.substring(0, 1000));
    }
    ws.close();
    edge.kill();
  } catch (err) {
    console.error(err);
    edge.kill();
  }
}, 2000);
