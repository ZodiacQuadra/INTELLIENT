// Form submissions. Each form sends one flat record (field label -> answer) to VITE_FORM_ENDPOINT, a Google
// Apps Script web app that appends it as a row to the team's Google Sheet (docs/forms/README.md). Framer's
// native forms can send to the same sheet, so records keep the same shape after the move to Framer.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export async function submitForm(record) {
  if (!ENDPOINT) throw new Error('VITE_FORM_ENDPOINT is not set');
  // A text/plain body keeps this a simple request with no CORS preflight, which Apps Script cannot answer.
  // The response is opaque in no-cors mode, so a request that reaches the server counts as recorded.
  await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(record) });
}
