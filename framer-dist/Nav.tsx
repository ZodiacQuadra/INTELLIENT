// Intellient: Nav section. Generated from src/site by scripts/framer/build.mjs.
// Edit the source site and rebuild rather than editing this file by hand.
// @ts-nocheck

import { useRef as IxUseRef } from "react";
import { createElement as IxH, Fragment as IxFragment } from "react";
import { useState } from "react";
import * as e from "react";
import * as a2 from "react";
import * as e3 from "react";
import * as e4 from "react";
import { createContext as r } from "react";
import * as o2 from "react";
import * as o3 from "react";
import * as o4 from "react";
import { useEffect, useState as useState2 } from "react";
import { isStaticRenderer as isStaticRenderer2 } from "framer";
import { gsap as realGsap } from "https://esm.sh/gsap@3.15.0";
import { ScrollTrigger as realST } from "https://esm.sh/gsap@3.15.0/ScrollTrigger";
import { isStaticRenderer } from "framer";
// scripts/framer/react-shim.js

// src/site/sections/Nav.jsx

// node_modules/@phosphor-icons/react/dist/defs/ArrowRight.es.js
var a = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M216,128l-72,72V56Z", opacity: "0.2" }), /* @__PURE__ */ e.createElement("path", { d: "M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M221.66,133.66l-72,72A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,13.66-5.66l72,72A8,8,0,0,1,221.66,133.66Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M218.83,130.83l-72,72a4,4,0,0,1-5.66-5.66L206.34,132H40a4,4,0,0,1,0-8H206.34L141.17,58.83a4,4,0,0,1,5.66-5.66l72,72A4,4,0,0,1,218.83,130.83Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/defs/List.es.js
var e2 = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M216,64V192H40V64Z", opacity: "0.2" }), /* @__PURE__ */ a2.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM192,184H64a8,8,0,0,1,0-16H192a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16H192a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16H192a8,8,0,0,1,0,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128ZM40,70H216a6,6,0,0,0,0-12H40a6,6,0,0,0,0,12ZM216,186H40a6,6,0,0,0,0,12H216a6,6,0,0,0,0-12Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128ZM40,68H216a4,4,0,0,0,0-8H40a4,4,0,0,0,0,8ZM216,188H40a4,4,0,0,0,0,8H216a4,4,0,0,0,0-8Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/defs/X.es.js
var a3 = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ e3.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/lib/IconBase.es.js

// node_modules/@phosphor-icons/react/dist/lib/context.es.js
var o = r({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: false
});

// node_modules/@phosphor-icons/react/dist/lib/IconBase.es.js
var p = e4.forwardRef(
  (s2, a4) => {
    const {
      alt: n2,
      color: r3,
      size: t2,
      weight: o5,
      mirrored: c2,
      children: i,
      weights: m,
      ...x
    } = s2, {
      color: d = "currentColor",
      size: l,
      weight: f = "regular",
      mirrored: g = false,
      ...w
    } = e4.useContext(o);
    return /* @__PURE__ */ e4.createElement(
      "svg",
      {
        ref: a4,
        xmlns: "http://www.w3.org/2000/svg",
        width: t2 != null ? t2 : l,
        height: t2 != null ? t2 : l,
        fill: r3 != null ? r3 : d,
        viewBox: "0 0 256 256",
        transform: c2 || g ? "scale(-1, 1)" : void 0,
        ...w,
        ...x
      },
      !!n2 && /* @__PURE__ */ e4.createElement("title", null, n2),
      i,
      m.get(o5 != null ? o5 : f)
    );
  }
);
p.displayName = "IconBase";

// node_modules/@phosphor-icons/react/dist/csr/ArrowRight.es.js
var r2 = o2.forwardRef((t2, e6) => /* @__PURE__ */ o2.createElement(p, { ref: e6, ...t2, weights: a }));
r2.displayName = "ArrowRightIcon";
var s = r2;

// node_modules/@phosphor-icons/react/dist/csr/List.es.js
var t = o3.forwardRef((e6, r3) => /* @__PURE__ */ o3.createElement(p, { ref: r3, ...e6, weights: e2 }));
t.displayName = "ListIcon";
var c = t;

// node_modules/@phosphor-icons/react/dist/csr/X.es.js
var e5 = o4.forwardRef((r3, t2) => /* @__PURE__ */ o4.createElement(p, { ref: t2, ...r3, weights: a3 }));
e5.displayName = "XIcon";
var n = e5;

// src/site/content.js
var NAV = [
  { href: "#approach", label: "Approach" },
  { href: "#technology", label: "Technology" },
  { href: "#domains", label: "Outcomes" },
  { href: "#three-enterprises", label: "About" }
];
var PRIMARY_CTA = { href: "#start", label: "Start with an AIR Audit" };

// src/site/sections/Nav.jsx
function Nav({ scrolled, active }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ IxH(IxFragment, null, /* @__PURE__ */ IxH("header", { className: `nav${scrolled ? " is-scrolled" : ""}` }, /* @__PURE__ */ IxH("a", { href: "#intro", className: "nav-brand", "aria-label": "Intellient home" }, /* @__PURE__ */ IxH("img", { src: "https://framerusercontent.com/assets/6b1shpH9VvkLrIIAyVugjBf3GD0.svg", alt: "Intellient", width: "134", height: "34" })), /* @__PURE__ */ IxH("nav", { className: "nav-pill", "aria-label": "Main" }, NAV.map((n2) => /* @__PURE__ */ IxH("a", { key: n2.href, href: n2.href, className: active === n2.href.slice(1) ? "is-active" : "" }, n2.label))), /* @__PURE__ */ IxH("div", { className: "nav-end" }, /* @__PURE__ */ IxH("a", { href: PRIMARY_CTA.href, className: "btn btn-primary btn-sm" }, PRIMARY_CTA.label, /* @__PURE__ */ IxH(s, { weight: "bold" })), /* @__PURE__ */ IxH(
    "button",
    {
      className: "nav-menu-btn",
      "aria-expanded": open,
      "aria-controls": "nav-sheet",
      "aria-label": open ? "Close menu" : "Open menu",
      onClick: () => setOpen((v) => !v)
    },
    open ? /* @__PURE__ */ IxH(n, null) : /* @__PURE__ */ IxH(c, null)
  ))), open && /* @__PURE__ */ IxH("nav", { id: "nav-sheet", className: "nav-sheet", "aria-label": "Mobile" }, NAV.map((n2) => /* @__PURE__ */ IxH("a", { key: n2.href, href: n2.href, onClick: () => setOpen(false) }, n2.label)), /* @__PURE__ */ IxH("a", { href: PRIMARY_CTA.href, className: "btn btn-primary", onClick: () => setOpen(false) }, PRIMARY_CTA.label, /* @__PURE__ */ IxH(s, { weight: "bold" }))));
}

// scripts/framer/runtime.jsx

// scripts/framer/gsap-shim.js
var stub = { add() {
  return stub;
}, revert() {
}, kill() {
} };
var staticNow = () => {
  try {
    return isStaticRenderer();
  } catch (e6) {
    return false;
  }
};
var gsap = new Proxy(realGsap, {
  get(target, key) {
    if (staticNow() && (key === "matchMedia" || key === "context")) return () => stub;
    return Reflect.get(target, key);
  }
});
var ScrollTrigger = new Proxy(realST, {
  get(target, key) {
    if (staticNow() && key === "create") return () => stub;
    if (staticNow() && key === "refresh") return () => {
    };
    return Reflect.get(target, key);
  }
});

// scripts/framer/runtime.jsx
gsap.registerPlugin(ScrollTrigger);
var reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return void 0;
    const targets = root.querySelectorAll("[data-reveal], [data-reveal-class]");
    if (isStaticRenderer2() || reduced() || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-in"));
      return void 0;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e6) => {
        if (e6.isIntersecting) {
          e6.target.classList.add("is-in");
          io.unobserve(e6.target);
        }
      }),
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}
function useStatementLight(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return void 0;
    const words = Array.from(root.querySelectorAll(".statement .w"));
    if (!words.length) return void 0;
    if (isStaticRenderer2() || reduced()) {
      words.forEach((w) => w.classList.add("lit"));
      return void 0;
    }
    const st = ScrollTrigger.create({
      trigger: root.querySelector(".statement"),
      start: "top 78%",
      end: "bottom 45%",
      scrub: true,
      onUpdate: (self) => {
        const lit = Math.round(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle("lit", i < lit));
      }
    });
    return () => st.kill();
  }, [ref]);
}
function useNavState() {
  const [scrolled, setScrolled] = useState2(false);
  const [active, setActive] = useState2("");
  useEffect(() => {
    if (isStaticRenderer2()) return void 0;
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const mid = window.innerHeight * 0.5;
      let current = "";
      document.querySelectorAll("section[id]").forEach((s2) => {
        const r3 = s2.getBoundingClientRect();
        if (r3.top <= mid && r3.bottom > mid) current = s2.id;
      });
      setActive(current);
    };
    const queue = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    const timers = [400, 1500, 3e3].map((ms) => window.setTimeout(queue, ms));
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      timers.forEach((t2) => window.clearTimeout(t2));
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return { scrolled, active };
}

const IxSection = Nav;
const IxUseReveal = useReveal;
const IxUseStatementLight = useStatementLight;
const IxUseNavState = useNavState;

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */
export default function IntellientNav() {
  const { scrolled, active } = IxUseNavState();
  return <div style={{ position: "relative", width: "100%" }}><IxSection scrolled={scrolled} active={active} /></div>;
}
