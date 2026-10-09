// Intellient: Gap section. Generated from src/site by scripts/framer/build.mjs.
// Edit the source site and rebuild rather than editing this file by hand.
// @ts-nocheck

import { useRef as IxUseRef } from "react";
import { createElement as IxH, Fragment as IxFragment } from "react";
import { useEffect, useRef, useState } from "react";
import { useEffect as useEffect2, useState as useState2 } from "react";
import { isStaticRenderer as isStaticRenderer2 } from "framer";
import { gsap as realGsap } from "https://esm.sh/gsap@3.15.0";
import { ScrollTrigger as realST } from "https://esm.sh/gsap@3.15.0/ScrollTrigger";
import { isStaticRenderer } from "framer";
// scripts/framer/react-shim.js

// src/site/content.js
var GAP = {
  statement: "You may already have enough AI. A model makes a task faster. It cannot clear an approval queue, settle which system is right or retire a trusted workaround.",
  symptoms: [
    { figure: "48h", title: "The case still waits", body: "Tasks get faster. Approvals do not." },
    { figure: "34%", title: "The answer is not trusted", body: "Output arrives, but its lineage is unclear." },
    { figure: "2 paths", title: "The old process survives", body: "A manual shadow runs beside the automation." }
  ]
};
var TECH = {
  eyebrow: "From design to production",
  title: "What sets Intellient apart.",
  sub: "Three layers carry the design into production.",
  speed: { name: "Fast to a baseline", line: "A two-week AIR Audit sets the baseline before anything is built." },
  cta: { title: "Ready to get started?", line: "Scope one domain and see what its friction costs." },
  layers: [
    {
      id: "core",
      layer: "Orchestrate",
      name: "Intellient Core",
      logo: "https://framerusercontent.com/assets/NkL9FazgSsLZoSsGTPVi4IKrmRw.svg",
      line: "Reasons over policy and orchestrates the work.",
      caps: ["Deterministic reasoning", "Policy enforcement"]
    },
    {
      id: "link",
      layer: "Connect",
      name: "IntelliLink",
      logo: "https://framerusercontent.com/assets/nHERIJshHWA7ANFk3Fel11V6E.svg",
      line: "Connects to SAP, Salesforce, Workday and Azure, and acts inside them.",
      caps: ["Bi-directional data mesh", "Sub-50ms event sync"],
      systems: ["SAP S/4HANA", "Salesforce", "Workday", "Microsoft Azure", "GitHub"]
    },
    {
      id: "sphere",
      layer: "Govern",
      name: "IntelliSphere",
      logo: "https://framerusercontent.com/assets/9x9zj5f4TzW3vBKqfdX7l3DNTrg.svg",
      line: "Governs what runs and shows where to improve.",
      caps: ["Real-time telemetry", "Audit lineage"]
    }
  ]
};

// src/site/sections/Orb.jsx
var DWELL = 2800;
function Orb() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const items = TECH.layers;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return void 0;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => setIdx((i) => (i + 1) % items.length), DWELL);
    });
    io.observe(ref.current);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, [items.length]);
  return /* @__PURE__ */ IxH("div", { className: "orb-glass", ref, role: "img", "aria-label": "Intellient connects, orchestrates and governs" }, /* @__PURE__ */ IxH("span", { className: "orb-swirl", "aria-hidden": "true" }), /* @__PURE__ */ IxH("span", { className: "orb-swirl two", "aria-hidden": "true" }), items.map((l, i) => /* @__PURE__ */ IxH("div", { key: l.id, className: `orb-face${i === idx ? " on" : ""}`, "aria-hidden": "true" }, /* @__PURE__ */ IxH("img", { src: l.logo, alt: "" }), /* @__PURE__ */ IxH("span", null, l.layer))));
}

// src/site/sections/Gap.jsx
function Gap() {
  const words = GAP.statement.split(" ");
  return /* @__PURE__ */ IxH("section", { className: "section", id: "approach" }, /* @__PURE__ */ IxH("div", { className: "container" }, /* @__PURE__ */ IxH("div", { className: "gap-lead" }, /* @__PURE__ */ IxH("p", { className: "statement" }, words.map((w, i) => /* @__PURE__ */ IxH("span", { key: i, className: "w" }, w, i < words.length - 1 ? " " : ""))), /* @__PURE__ */ IxH("div", { "data-reveal": true }, /* @__PURE__ */ IxH(Orb, null))), /* @__PURE__ */ IxH("div", { className: "symptoms" }, GAP.symptoms.map((s, i) => /* @__PURE__ */ IxH("div", { key: s.title, className: "symptom", "data-reveal": true, style: { "--i": i } }, /* @__PURE__ */ IxH("b", null, s.figure), /* @__PURE__ */ IxH("h3", null, s.title), /* @__PURE__ */ IxH("p", null, s.body))))));
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
  } catch (e) {
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
  useEffect2(() => {
    const root = ref.current;
    if (!root) return void 0;
    const targets = root.querySelectorAll("[data-reveal], [data-reveal-class]");
    if (isStaticRenderer2() || reduced() || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-in"));
      return void 0;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}
function useStatementLight(ref) {
  useEffect2(() => {
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
  useEffect2(() => {
    if (isStaticRenderer2()) return void 0;
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const mid = window.innerHeight * 0.5;
      let current = "";
      document.querySelectorAll("section[id]").forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = s.id;
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

const IxSection = Gap;
const IxUseReveal = useReveal;
const IxUseStatementLight = useStatementLight;
const IxUseNavState = useNavState;

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */
export default function IntellientGap() {
  const ref = IxUseRef(null);
  IxUseReveal(ref);
  IxUseStatementLight(ref);
  return <div ref={ref} style={{ position: "relative", width: "100%" }}><IxSection /></div>;
}
