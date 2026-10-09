// One shared GSAP instance for every Intellient code component (loaded once from esm.sh).
// On Framer's canvas (static renderer) scroll-driven effects are skipped, so pins and
// scrubbed tweens never add spacer height to the layout while editing.
import { gsap as realGsap } from 'https://esm.sh/gsap@3.15.0';
import { ScrollTrigger as realST } from 'https://esm.sh/gsap@3.15.0/ScrollTrigger';
import { isStaticRenderer } from 'framer';

const stub = { add() { return stub; }, revert() {}, kill() {} };
const staticNow = () => { try { return isStaticRenderer(); } catch (e) { return false; } };

export const gsap = new Proxy(realGsap, {
  get(target, key) {
    if (staticNow() && (key === 'matchMedia' || key === 'context')) return () => stub;
    return Reflect.get(target, key);
  },
});

export const ScrollTrigger = new Proxy(realST, {
  get(target, key) {
    if (staticNow() && key === 'create') return () => stub;
    if (staticNow() && key === 'refresh') return () => {};
    return Reflect.get(target, key);
  },
});

export default gsap;
