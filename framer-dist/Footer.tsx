// Intellient: Footer section. Generated from src/site by scripts/framer/build.mjs.
// Edit the source site and rebuild rather than editing this file by hand.
// @ts-nocheck

import { useRef as IxUseRef } from "react";
import { createElement as IxH, Fragment as IxFragment } from "react";
import * as e from "react";
import * as e2 from "react";
import { createContext as r } from "react";
import * as o2 from "react";
import { useEffect, useState } from "react";
import { isStaticRenderer as isStaticRenderer2 } from "framer";
import { gsap as realGsap } from "https://esm.sh/gsap@3.15.0";
import { ScrollTrigger as realST } from "https://esm.sh/gsap@3.15.0/ScrollTrigger";
import { isStaticRenderer } from "framer";
// scripts/framer/react-shim.js

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

// node_modules/@phosphor-icons/react/dist/lib/IconBase.es.js

// node_modules/@phosphor-icons/react/dist/lib/context.es.js
var o = r({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: false
});

// node_modules/@phosphor-icons/react/dist/lib/IconBase.es.js
var p = e2.forwardRef(
  (s2, a2) => {
    const {
      alt: n,
      color: r3,
      size: t,
      weight: o3,
      mirrored: c,
      children: i,
      weights: m,
      ...x
    } = s2, {
      color: d = "currentColor",
      size: l,
      weight: f = "regular",
      mirrored: g = false,
      ...w
    } = e2.useContext(o);
    return /* @__PURE__ */ e2.createElement(
      "svg",
      {
        ref: a2,
        xmlns: "http://www.w3.org/2000/svg",
        width: t != null ? t : l,
        height: t != null ? t : l,
        fill: r3 != null ? r3 : d,
        viewBox: "0 0 256 256",
        transform: c || g ? "scale(-1, 1)" : void 0,
        ...w,
        ...x
      },
      !!n && /* @__PURE__ */ e2.createElement("title", null, n),
      i,
      m.get(o3 != null ? o3 : f)
    );
  }
);
p.displayName = "IconBase";

// node_modules/@phosphor-icons/react/dist/csr/ArrowRight.es.js
var r2 = o2.forwardRef((t, e3) => /* @__PURE__ */ o2.createElement(p, { ref: e3, ...t, weights: a }));
r2.displayName = "ArrowRightIcon";
var s = r2;

// src/site/content.js
var PRIMARY_CTA = { href: "#start", label: "Start with an AIR Audit" };
var SECONDARY_CTA = { href: "#approach", label: "Explore the approach" };
var CLOSE = {
  title: "Do not begin with an agent.",
  accent: "Begin with the outcome.",
  body: "Pick one domain where delay or exceptions are visible. We show you what that friction costs."
};
var FOOTER = [
  {
    title: "Approach",
    links: [
      { href: "#approach", label: "The operating gap" },
      { href: "#three-enterprises", label: "Three enterprises" },
      { href: "#measurement", label: "Measurement" },
      { href: "#domains", label: "Operating Domains" }
    ]
  },
  {
    title: "Engagement",
    links: [
      { href: "#air-audit", label: "AIR Audit" },
      { href: "#residency", label: "AIR Residency" },
      { href: "#evidence", label: "Production evidence" },
      { href: "#faq", label: "Questions" }
    ]
  },
  {
    title: "Technology",
    links: [
      { href: "#technology", label: "IntelliLink" },
      { href: "#technology", label: "Intellient Core" },
      { href: "#technology", label: "IntelliSphere" }
    ]
  }
];

// src/site/sections/Footer.jsx
function Footer() {
  return /* @__PURE__ */ IxH("footer", { className: "finale", id: "start" }, /* @__PURE__ */ IxH("div", { className: "finale-glow", "aria-hidden": "true" }), /* @__PURE__ */ IxH("div", { className: "finale-grain", "aria-hidden": "true" }), /* @__PURE__ */ IxH("div", { className: "container finale-cta", "data-reveal": true }, /* @__PURE__ */ IxH("h2", { className: "h-section" }, CLOSE.title, /* @__PURE__ */ IxH("br", null), CLOSE.accent), /* @__PURE__ */ IxH("p", { className: "lead" }, CLOSE.body), /* @__PURE__ */ IxH("div", { className: "btn-row" }, /* @__PURE__ */ IxH("a", { href: "#air-audit", className: "btn btn-primary" }, PRIMARY_CTA.label, /* @__PURE__ */ IxH(s, { weight: "bold" })), /* @__PURE__ */ IxH("a", { href: SECONDARY_CTA.href, className: "btn btn-ghost" }, SECONDARY_CTA.label, /* @__PURE__ */ IxH(s, null)))), /* @__PURE__ */ IxH("div", { className: "finale-wordmark", "aria-hidden": "true" }, /* @__PURE__ */ IxH("span", { className: "ghost" }, "Intellient"), /* @__PURE__ */ IxH("span", { className: "hero-word" }, "Intellient"), /* @__PURE__ */ IxH("span", { className: "ghost" }, "Intellient")), /* @__PURE__ */ IxH("div", { className: "container finale-links" }, FOOTER.map((col) => /* @__PURE__ */ IxH("div", { key: col.title }, /* @__PURE__ */ IxH("h4", null, col.title), /* @__PURE__ */ IxH("ul", null, col.links.map((l) => /* @__PURE__ */ IxH("li", { key: l.label }, /* @__PURE__ */ IxH("a", { href: l.href }, l.label)))))), /* @__PURE__ */ IxH("div", null, /* @__PURE__ */ IxH("h4", null, "Intellient"), /* @__PURE__ */ IxH("ul", null, /* @__PURE__ */ IxH("li", null, /* @__PURE__ */ IxH("a", { href: "#intro" }, "Back to top")), /* @__PURE__ */ IxH("li", null, /* @__PURE__ */ IxH("a", { href: "#faq" }, "Questions"))))), /* @__PURE__ */ IxH("div", { className: "finale-base" }, /* @__PURE__ */ IxH("div", { className: "container" }, /* @__PURE__ */ IxH("span", null, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Intellient. All rights reserved."), /* @__PURE__ */ IxH("span", null, "The operating model for the intelligent enterprise."))));
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
  } catch (e3) {
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
      (entries) => entries.forEach((e3) => {
        if (e3.isIntersecting) {
          e3.target.classList.add("is-in");
          io.unobserve(e3.target);
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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
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
      timers.forEach((t) => window.clearTimeout(t));
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return { scrolled, active };
}

const IxSection = Footer;
const IxUseReveal = useReveal;
const IxUseStatementLight = useStatementLight;
const IxUseNavState = useNavState;

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */
export default function IntellientFooter() {
  const ref = IxUseRef(null);
  IxUseReveal(ref);

  return <div ref={ref} style={{ position: "relative", width: "100%" }}><IxSection /></div>;
}
