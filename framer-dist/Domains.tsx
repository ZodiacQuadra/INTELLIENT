// Intellient: Domains section. Generated from src/site by scripts/framer/build.mjs.
// Edit the source site and rebuild rather than editing this file by hand.
// @ts-nocheck

import { useRef as IxUseRef } from "react";
import { createElement as IxH, Fragment as IxFragment } from "react";
import * as e from "react";
import * as a2 from "react";
import * as e3 from "react";
import * as a3 from "react";
import * as a4 from "react";
import * as a5 from "react";
import * as e6 from "react";
import * as e7 from "react";
import { createContext as r } from "react";
import * as e8 from "react";
import * as o2 from "react";
import * as a7 from "react";
import * as e10 from "react";
import * as e11 from "react";
import * as e12 from "react";
import * as r5 from "react";
import { useEffect, useState } from "react";
import { isStaticRenderer as isStaticRenderer2 } from "framer";
import { gsap as realGsap } from "https://esm.sh/gsap@3.15.0";
import { ScrollTrigger as realST } from "https://esm.sh/gsap@3.15.0/ScrollTrigger";
import { isStaticRenderer } from "framer";
// scripts/framer/react-shim.js

// node_modules/@phosphor-icons/react/dist/defs/CheckCircle.es.js
var a = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z", opacity: "0.2" }), /* @__PURE__ */ e.createElement("path", { d: "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M172.24,99.76a6,6,0,0,1,0,8.48l-56,56a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L112,151.51l51.76-51.75A6,6,0,0,1,172.24,99.76ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("path", { d: "M170.83,101.17a4,4,0,0,1,0,5.66l-56,56a4,4,0,0,1-5.66,0l-24-24a4,4,0,0,1,5.66-5.66L112,154.34l53.17-53.17A4,4,0,0,1,170.83,101.17ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/defs/Crosshair.es.js
var e2 = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M232,116h-4.72A100.21,100.21,0,0,0,140,28.72V24a12,12,0,0,0-24,0v4.72A100.21,100.21,0,0,0,28.72,116H24a12,12,0,0,0,0,24h4.72A100.21,100.21,0,0,0,116,227.28V232a12,12,0,0,0,24,0v-4.72A100.21,100.21,0,0,0,227.28,140H232a12,12,0,0,0,0-24Zm-92,87v-3a12,12,0,0,0-24,0v3a76.15,76.15,0,0,1-63-63h3a12,12,0,0,0,0-24H53a76.15,76.15,0,0,1,63-63v3a12,12,0,0,0,24,0V53a76.15,76.15,0,0,1,63,63h-3a12,12,0,0,0,0,24h3A76.15,76.15,0,0,1,140,203ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M160,128a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z", opacity: "0.2" }), /* @__PURE__ */ a2.createElement("path", { d: "M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-96,87.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16h7.6A80.15,80.15,0,0,1,136,207.6ZM128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-32,16h7.6A80.15,80.15,0,0,1,136,207.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16Zm-32-8a40,40,0,1,1-40-40A40,40,0,0,1,168,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M232,122H221.8A94.13,94.13,0,0,0,134,34.2V24a6,6,0,0,0-12,0V34.2A94.13,94.13,0,0,0,34.2,122H24a6,6,0,0,0,0,12H34.2A94.13,94.13,0,0,0,122,221.8V232a6,6,0,0,0,12,0V221.8A94.13,94.13,0,0,0,221.8,134H232a6,6,0,0,0,0-12Zm-98,87.76V200a6,6,0,0,0-12,0v9.76A82.09,82.09,0,0,1,46.24,134H56a6,6,0,0,0,0-12H46.24A82.09,82.09,0,0,1,122,46.24V56a6,6,0,0,0,12,0V46.24A82.09,82.09,0,0,1,209.76,122H200a6,6,0,0,0,0,12h9.76A82.09,82.09,0,0,1,134,209.76ZM128,90a38,38,0,1,0,38,38A38,38,0,0,0,128,90Zm0,64a26,26,0,1,1,26-26A26,26,0,0,1,128,154Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-96,87.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16h7.6A80.15,80.15,0,0,1,136,207.6ZM128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ a2.createElement(a2.Fragment, null, /* @__PURE__ */ a2.createElement("path", { d: "M232,124H219.91A92.13,92.13,0,0,0,132,36.09V24a4,4,0,0,0-8,0V36.09A92.13,92.13,0,0,0,36.09,124H24a4,4,0,0,0,0,8H36.09A92.13,92.13,0,0,0,124,219.91V232a4,4,0,0,0,8,0V219.91A92.13,92.13,0,0,0,219.91,132H232a4,4,0,0,0,0-8ZM132,211.9V200a4,4,0,0,0-8,0v11.9A84.11,84.11,0,0,1,44.1,132H56a4,4,0,0,0,0-8H44.1A84.11,84.11,0,0,1,124,44.1V56a4,4,0,0,0,8,0V44.1A84.11,84.11,0,0,1,211.9,124H200a4,4,0,0,0,0,8h11.9A84.11,84.11,0,0,1,132,211.9ZM128,92a36,36,0,1,0,36,36A36,36,0,0,0,128,92Zm0,64a28,28,0,1,1,28-28A28,28,0,0,1,128,156Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/defs/Database.es.js
var t = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M196,35.52C177.62,25.51,153.48,20,128,20S78.38,25.51,60,35.52C39.37,46.79,28,62.58,28,80v96c0,17.42,11.37,33.21,32,44.48,18.35,10,42.49,15.52,68,15.52s49.62-5.51,68-15.52c20.66-11.27,32-27.06,32-44.48V80C228,62.58,216.63,46.79,196,35.52ZM204,128c0,17-31.21,36-76,36s-76-19-76-36v-8.46a88.9,88.9,0,0,0,8,4.94c18.35,10,42.49,15.52,68,15.52s49.62-5.51,68-15.52a88.9,88.9,0,0,0,8-4.94ZM128,44c44.79,0,76,19,76,36s-31.21,36-76,36S52,97,52,80,83.21,44,128,44Zm0,168c-44.79,0-76-19-76-36v-8.46a88.9,88.9,0,0,0,8,4.94c18.35,10,42.49,15.52,68,15.52s49.62-5.51,68-15.52a88.9,88.9,0,0,0,8-4.94V176C204,193,172.79,212,128,212Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement(
      "path",
      {
        d: "M216,80c0,26.51-39.4,48-88,48S40,106.51,40,80s39.4-48,88-48S216,53.49,216,80Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ e3.createElement("path", { d: "M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64Zm-21.61,74.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M128,26C75.29,26,34,49.72,34,80v96c0,30.28,41.29,54,94,54s94-23.72,94-54V80C222,49.72,180.71,26,128,26Zm0,12c44.45,0,82,19.23,82,42s-37.55,42-82,42S46,102.77,46,80,83.55,38,128,38Zm82,138c0,22.77-37.55,42-82,42s-82-19.23-82-42V154.79C62,171.16,92.37,182,128,182s66-10.84,82-27.21Zm0-48c0,22.77-37.55,42-82,42s-82-19.23-82-42V106.79C62,123.16,92.37,134,128,134s66-10.84,82-27.21Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ e3.createElement(e3.Fragment, null, /* @__PURE__ */ e3.createElement("path", { d: "M192.14,42.55C174.94,33.17,152.16,28,128,28S81.06,33.17,63.86,42.55C45.89,52.35,36,65.65,36,80v96c0,14.35,9.89,27.65,27.86,37.45,17.2,9.38,40,14.55,64.14,14.55s46.94-5.17,64.14-14.55c18-9.8,27.86-23.1,27.86-37.45V80C220,65.65,210.11,52.35,192.14,42.55ZM212,176c0,11.29-8.41,22.1-23.69,30.43C172.27,215.18,150.85,220,128,220s-44.27-4.82-60.31-13.57C52.41,198.1,44,187.29,44,176V149.48c4.69,5.93,11.37,11.34,19.86,16,17.2,9.38,40,14.55,64.14,14.55s46.94-5.17,64.14-14.55c8.49-4.63,15.17-10,19.86-16Zm0-48c0,11.29-8.41,22.1-23.69,30.43C172.27,167.18,150.85,172,128,172s-44.27-4.82-60.31-13.57C52.41,150.1,44,139.29,44,128V101.48c4.69,5.93,11.37,11.34,19.86,16,17.2,9.38,40,14.55,64.14,14.55s46.94-5.17,64.14-14.55c8.49-4.63,15.17-10,19.86-16Zm-23.69-17.57C172.27,119.18,150.85,124,128,124s-44.27-4.82-60.31-13.57C52.41,102.1,44,91.29,44,80s8.41-22.1,23.69-30.43C83.73,40.82,105.15,36,128,36s44.27,4.82,60.31,13.57C203.59,57.9,212,68.71,212,80S203.59,102.1,188.31,110.43Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/defs/FileText.es.js
var e4 = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ a3.createElement(a3.Fragment, null, /* @__PURE__ */ a3.createElement("path", { d: "M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Zm112-80a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,132Zm0,40a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,172Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ a3.createElement(a3.Fragment, null, /* @__PURE__ */ a3.createElement("path", { d: "M208,88H152V32Z", opacity: "0.2" }), /* @__PURE__ */ a3.createElement("path", { d: "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ a3.createElement(a3.Fragment, null, /* @__PURE__ */ a3.createElement("path", { d: "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,176H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm-8-56V44l44,44Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ a3.createElement(a3.Fragment, null, /* @__PURE__ */ a3.createElement("path", { d: "M212.24,83.76l-56-56A6,6,0,0,0,152,26H56A14,14,0,0,0,42,40V216a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V88A6,6,0,0,0,212.24,83.76ZM158,46.48,193.52,82H158ZM200,218H56a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2h90V88a6,6,0,0,0,6,6h50V216A2,2,0,0,1,200,218Zm-34-82a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,136Zm0,32a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,168Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ a3.createElement(a3.Fragment, null, /* @__PURE__ */ a3.createElement("path", { d: "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ a3.createElement(a3.Fragment, null, /* @__PURE__ */ a3.createElement("path", { d: "M210.83,85.17l-56-56A4,4,0,0,0,152,28H56A12,12,0,0,0,44,40V216a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V88A4,4,0,0,0,210.83,85.17ZM156,41.65,198.34,84H156ZM200,220H56a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4h92V88a4,4,0,0,0,4,4h52V216A4,4,0,0,1,200,220Zm-36-84a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h64A4,4,0,0,1,164,136Zm0,32a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h64A4,4,0,0,1,164,168Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/defs/TreeStructure.es.js
var H = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ a4.createElement(a4.Fragment, null, /* @__PURE__ */ a4.createElement("path", { d: "M160,116h48a20,20,0,0,0,20-20V48a20,20,0,0,0-20-20H160a20,20,0,0,0-20,20V60H128a28,28,0,0,0-28,28v28H76v-4A20,20,0,0,0,56,92H24A20,20,0,0,0,4,112v32a20,20,0,0,0,20,20H56a20,20,0,0,0,20-20v-4h24v28a28,28,0,0,0,28,28h12v12a20,20,0,0,0,20,20h48a20,20,0,0,0,20-20V160a20,20,0,0,0-20-20H160a20,20,0,0,0-20,20v12H128a4,4,0,0,1-4-4V88a4,4,0,0,1,4-4h12V96A20,20,0,0,0,160,116ZM52,140H28V116H52Zm112,24h40v40H164Zm0-112h40V92H164Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ a4.createElement(a4.Fragment, null, /* @__PURE__ */ a4.createElement(
      "path",
      {
        d: "M64,112v32a8,8,0,0,1-8,8H24a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8H56A8,8,0,0,1,64,112ZM208,40H160a8,8,0,0,0-8,8V96a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V48A8,8,0,0,0,208,40Zm0,112H160a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V160A8,8,0,0,0,208,152Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ a4.createElement("path", { d: "M160,112h48a16,16,0,0,0,16-16V48a16,16,0,0,0-16-16H160a16,16,0,0,0-16,16V64H128a24,24,0,0,0-24,24v32H72v-8A16,16,0,0,0,56,96H24A16,16,0,0,0,8,112v32a16,16,0,0,0,16,16H56a16,16,0,0,0,16-16v-8h32v32a24,24,0,0,0,24,24h16v16a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V160a16,16,0,0,0-16-16H160a16,16,0,0,0-16,16v16H128a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8h16V96A16,16,0,0,0,160,112ZM56,144H24V112H56v32Zm104,16h48v48H160Zm0-112h48V96H160Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ a4.createElement(a4.Fragment, null, /* @__PURE__ */ a4.createElement("path", { d: "M144,96V80H128a8,8,0,0,0-8,8v80a8,8,0,0,0,8,8h16V160a16,16,0,0,1,16-16h48a16,16,0,0,1,16,16v48a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V192H128a24,24,0,0,1-24-24V136H72v8a16,16,0,0,1-16,16H24A16,16,0,0,1,8,144V112A16,16,0,0,1,24,96H56a16,16,0,0,1,16,16v8h32V88a24,24,0,0,1,24-24h16V48a16,16,0,0,1,16-16h48a16,16,0,0,1,16,16V96a16,16,0,0,1-16,16H160A16,16,0,0,1,144,96Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ a4.createElement(a4.Fragment, null, /* @__PURE__ */ a4.createElement("path", { d: "M160,110h48a14,14,0,0,0,14-14V48a14,14,0,0,0-14-14H160a14,14,0,0,0-14,14V66H128a22,22,0,0,0-22,22v34H70V112A14,14,0,0,0,56,98H24a14,14,0,0,0-14,14v32a14,14,0,0,0,14,14H56a14,14,0,0,0,14-14V134h36v34a22,22,0,0,0,22,22h18v18a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V160a14,14,0,0,0-14-14H160a14,14,0,0,0-14,14v18H128a10,10,0,0,1-10-10V88a10,10,0,0,1,10-10h18V96A14,14,0,0,0,160,110ZM58,144a2,2,0,0,1-2,2H24a2,2,0,0,1-2-2V112a2,2,0,0,1,2-2H56a2,2,0,0,1,2,2Zm100,16a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2v48a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2Zm0-112a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2V96a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ a4.createElement(a4.Fragment, null, /* @__PURE__ */ a4.createElement("path", { d: "M160,112h48a16,16,0,0,0,16-16V48a16,16,0,0,0-16-16H160a16,16,0,0,0-16,16V64H128a24,24,0,0,0-24,24v32H72v-8A16,16,0,0,0,56,96H24A16,16,0,0,0,8,112v32a16,16,0,0,0,16,16H56a16,16,0,0,0,16-16v-8h32v32a24,24,0,0,0,24,24h16v16a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V160a16,16,0,0,0-16-16H160a16,16,0,0,0-16,16v16H128a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8h16V96A16,16,0,0,0,160,112ZM56,144H24V112H56v32Zm104,16h48v48H160Zm0-112h48V96H160Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ a4.createElement(a4.Fragment, null, /* @__PURE__ */ a4.createElement("path", { d: "M160,108h48a12,12,0,0,0,12-12V48a12,12,0,0,0-12-12H160a12,12,0,0,0-12,12V68H128a20,20,0,0,0-20,20v36H68V112a12,12,0,0,0-12-12H24a12,12,0,0,0-12,12v32a12,12,0,0,0,12,12H56a12,12,0,0,0,12-12V132h40v36a20,20,0,0,0,20,20h20v20a12,12,0,0,0,12,12h48a12,12,0,0,0,12-12V160a12,12,0,0,0-12-12H160a12,12,0,0,0-12,12v20H128a12,12,0,0,1-12-12V88a12,12,0,0,1,12-12h20V96A12,12,0,0,0,160,108ZM60,144a4,4,0,0,1-4,4H24a4,4,0,0,1-4-4V112a4,4,0,0,1,4-4H56a4,4,0,0,1,4,4Zm96,16a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4v48a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4Zm0-112a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V96a4,4,0,0,1-4,4H160a4,4,0,0,1-4-4Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/defs/UsersThree.es.js
var e5 = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ a5.createElement(a5.Fragment, null, /* @__PURE__ */ a5.createElement("path", { d: "M164.38,181.1a52,52,0,1,0-72.76,0,75.89,75.89,0,0,0-30,28.89,12,12,0,0,0,20.78,12,53,53,0,0,1,91.22,0,12,12,0,1,0,20.78-12A75.89,75.89,0,0,0,164.38,181.1ZM100,144a28,28,0,1,1,28,28A28,28,0,0,1,100,144Zm147.21,9.59a12,12,0,0,1-16.81-2.39c-8.33-11.09-19.85-19.59-29.33-21.64a12,12,0,0,1-1.82-22.91,20,20,0,1,0-24.78-28.3,12,12,0,1,1-21-11.6,44,44,0,1,1,73.28,48.35,92.18,92.18,0,0,1,22.85,21.69A12,12,0,0,1,247.21,153.59Zm-192.28-24c-9.48,2.05-21,10.55-29.33,21.65A12,12,0,0,1,6.41,136.79,92.37,92.37,0,0,1,29.26,115.1a44,44,0,1,1,73.28-48.35,12,12,0,1,1-21,11.6,20,20,0,1,0-24.78,28.3,12,12,0,0,1-1.82,22.91Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ a5.createElement(a5.Fragment, null, /* @__PURE__ */ a5.createElement(
      "path",
      {
        d: "M168,144a40,40,0,1,1-40-40A40,40,0,0,1,168,144ZM64,56A32,32,0,1,0,96,88,32,32,0,0,0,64,56Zm128,0a32,32,0,1,0,32,32A32,32,0,0,0,192,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ a5.createElement("path", { d: "M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1,0-16,24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.85,8,57,57,0,0,0-98.15,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ a5.createElement(a5.Fragment, null, /* @__PURE__ */ a5.createElement("path", { d: "M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ a5.createElement(a5.Fragment, null, /* @__PURE__ */ a5.createElement("path", { d: "M243.6,148.8a6,6,0,0,1-8.4-1.2A53.58,53.58,0,0,0,192,126a6,6,0,0,1,0-12,26,26,0,1,0-25.18-32.5,6,6,0,0,1-11.62-3,38,38,0,1,1,59.91,39.63A65.69,65.69,0,0,1,244.8,140.4,6,6,0,0,1,243.6,148.8ZM189.19,213a6,6,0,0,1-2.19,8.2,5.9,5.9,0,0,1-3,.81,6,6,0,0,1-5.2-3,59,59,0,0,0-101.62,0,6,6,0,1,1-10.38-6A70.1,70.1,0,0,1,103,182.55a46,46,0,1,1,50.1,0A70.1,70.1,0,0,1,189.19,213ZM128,178a34,34,0,1,0-34-34A34,34,0,0,0,128,178ZM70,120a6,6,0,0,0-6-6A26,26,0,1,1,89.18,81.49a6,6,0,1,0,11.62-3,38,38,0,1,0-59.91,39.63A65.69,65.69,0,0,0,11.2,140.4a6,6,0,1,0,9.6,7.2A53.58,53.58,0,0,1,64,126,6,6,0,0,0,70,120Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ a5.createElement(a5.Fragment, null, /* @__PURE__ */ a5.createElement("path", { d: "M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ a5.createElement(a5.Fragment, null, /* @__PURE__ */ a5.createElement("path", { d: "M237,147.44a4,4,0,0,1-5.48-1.4c-8.33-14-20.93-22-34.56-22a4,4,0,0,1-1.2-.2,36.76,36.76,0,0,1-3.8.2,4,4,0,0,1,0-8,28,28,0,1,0-27.12-35,4,4,0,0,1-7.75-2,36,36,0,1,1,54,39.48c10.81,3.85,20.51,12,27.31,23.48A4,4,0,0,1,237,147.44ZM187.46,214a4,4,0,0,1-1.46,5.46,3.93,3.93,0,0,1-2,.54,4,4,0,0,1-3.46-2,61,61,0,0,0-105.08,0,4,4,0,0,1-6.92-4,68.35,68.35,0,0,1,39.19-31,44,44,0,1,1,40.54,0A68.35,68.35,0,0,1,187.46,214ZM128,180a36,36,0,1,0-36-36A36,36,0,0,0,128,180ZM64,116A28,28,0,1,1,91.12,81a4,4,0,0,0,7.75-2A36,36,0,1,0,45.3,118.75,63.55,63.55,0,0,0,12.8,141.6a4,4,0,0,0,6.4,4.8A55.55,55.55,0,0,1,64,124a4,4,0,0,0,0-8Z" }))
  ]
]);

// node_modules/@phosphor-icons/react/dist/defs/WarningCircle.es.js
var a6 = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ e6.createElement(e6.Fragment, null, /* @__PURE__ */ e6.createElement("path", { d: "M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm-12-80V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,172Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ e6.createElement(e6.Fragment, null, /* @__PURE__ */ e6.createElement("path", { d: "M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z", opacity: "0.2" }), /* @__PURE__ */ e6.createElement("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ e6.createElement(e6.Fragment, null, /* @__PURE__ */ e6.createElement("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ e6.createElement(e6.Fragment, null, /* @__PURE__ */ e6.createElement("path", { d: "M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm-6-82V80a6,6,0,0,1,12,0v56a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,172Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ e6.createElement(e6.Fragment, null, /* @__PURE__ */ e6.createElement("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ e6.createElement(e6.Fragment, null, /* @__PURE__ */ e6.createElement("path", { d: "M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm-4-84V80a4,4,0,0,1,8,0v56a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,172Z" }))
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
var p = e7.forwardRef(
  (s3, a8) => {
    const {
      alt: n4,
      color: r6,
      size: t2,
      weight: o4,
      mirrored: c3,
      children: i,
      weights: m2,
      ...x
    } = s3, {
      color: d = "currentColor",
      size: l,
      weight: f = "regular",
      mirrored: g = false,
      ...w
    } = e7.useContext(o);
    return /* @__PURE__ */ e7.createElement(
      "svg",
      {
        ref: a8,
        xmlns: "http://www.w3.org/2000/svg",
        width: t2 != null ? t2 : l,
        height: t2 != null ? t2 : l,
        fill: r6 != null ? r6 : d,
        viewBox: "0 0 256 256",
        transform: c3 || g ? "scale(-1, 1)" : void 0,
        ...w,
        ...x
      },
      !!n4 && /* @__PURE__ */ e7.createElement("title", null, n4),
      i,
      m2.get(o4 != null ? o4 : f)
    );
  }
);
p.displayName = "IconBase";

// node_modules/@phosphor-icons/react/dist/csr/CheckCircle.es.js
var c = e8.forwardRef((o4, r6) => /* @__PURE__ */ e8.createElement(p, { ref: r6, ...o4, weights: a }));
c.displayName = "CheckCircleIcon";
var s = c;

// node_modules/@phosphor-icons/react/dist/csr/Crosshair.es.js
var r2 = o2.forwardRef((s3, a8) => /* @__PURE__ */ o2.createElement(p, { ref: a8, ...s3, weights: e2 }));
r2.displayName = "CrosshairIcon";
var c2 = r2;

// node_modules/@phosphor-icons/react/dist/csr/Database.es.js
var e9 = a7.forwardRef((o4, t2) => /* @__PURE__ */ a7.createElement(p, { ref: t2, ...o4, weights: t }));
e9.displayName = "DatabaseIcon";
var n = e9;

// node_modules/@phosphor-icons/react/dist/csr/FileText.es.js
var o3 = e10.forwardRef((t2, r6) => /* @__PURE__ */ e10.createElement(p, { ref: r6, ...t2, weights: e4 }));
o3.displayName = "FileTextIcon";
var s2 = o3;

// node_modules/@phosphor-icons/react/dist/csr/TreeStructure.es.js
var r3 = e11.forwardRef((t2, o4) => /* @__PURE__ */ e11.createElement(p, { ref: o4, ...t2, weights: H }));
r3.displayName = "TreeStructureIcon";
var n2 = r3;

// node_modules/@phosphor-icons/react/dist/csr/UsersThree.es.js
var r4 = e12.forwardRef((o4, s3) => /* @__PURE__ */ e12.createElement(p, { ref: s3, ...o4, weights: e5 }));
r4.displayName = "UsersThreeIcon";
var n3 = r4;

// node_modules/@phosphor-icons/react/dist/csr/WarningCircle.es.js
var e13 = r5.forwardRef((o4, n4) => /* @__PURE__ */ r5.createElement(p, { ref: n4, ...o4, weights: a6 }));
e13.displayName = "WarningCircleIcon";
var m = e13;

// src/site/content.js
var DOMAINS = {
  eyebrow: "The right scope",
  title: "Start with an outcome,",
  accent: "not a use case.",
  body: "An Operating Domain is the workflows, systems, decisions and owners behind one business result.",
  frictions: [
    {
      id: "delay",
      name: "Delay",
      problem: "Work waits on approvals and people.",
      outcome: "Make the waiting visible.",
      detail: "Map handoffs and queues before choosing what to automate.",
      metric: "Up to 88% latency reduction"
    },
    {
      id: "exceptions",
      name: "Exception load",
      problem: "Too many cases need manual handling.",
      outcome: "Understand the exceptions.",
      detail: "Find where work leaves the standard path and who resolves it.",
      metric: "4.2x faster exception routing"
    },
    {
      id: "decisions",
      name: "Fragmented decisions",
      problem: "Decisions split across systems and teams.",
      outcome: "Clarify who can decide.",
      detail: "Name the owners, sources of truth and decision boundaries.",
      metric: "Explicit decision boundaries"
    }
  ],
  criteria: ["Clear ownership", "Visible data and decision lineage", "A measurable cycle-time outcome"]
};

// src/site/sections/Domains.jsx
var VW = 640;
var VH = 500;
var CX = 320;
var CY = 250;
var pos = (x, y) => ({ left: `${x / VW * 100}%`, top: `${y / VH * 100}%` });
var reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var NODES = [
  { id: "workflows", label: "Workflows", icon: n2, x: CX, y: 78 },
  { id: "systems", label: "Systems", icon: n, x: 492, y: CY },
  { id: "decisions", label: "Decisions", icon: s2, x: CX, y: 422 },
  { id: "owners", label: "Owners", icon: n3, x: 148, y: CY }
];
var SLOTS = {
  tl: { cluster: [68, 88], card: [175, 115], path: "M88 92 C130 92 148 160 148 220" },
  tr: { cluster: null, card: [515, 115], path: "M520 125 C485 85 410 78 320 78" },
  br: { cluster: [562, 412], card: [495, 385], path: "M544 406 C492 406 492 340 492 280" },
  bl: { cluster: [68, 412], card: [165, 385], path: "M88 406 C135 406 148 340 148 280" }
};
var FRICTION = {
  delay: {
    hot: ["workflows", "systems"],
    calls: {
      tl: { tone: "alert", title: "Queue", value: "12 items" },
      tr: { tone: "alert", title: "Approval wait", value: "3.4 days", icon: true },
      br: { tone: "blue", title: "Queue", value: "8 items" },
      bl: { tone: "warm", title: "Handoff", value: "2 teams" }
    }
  },
  exceptions: {
    hot: ["workflows", "owners"],
    calls: {
      tl: { tone: "alert", title: "Manual review", value: "34% of cases" },
      tr: { tone: "warm", title: "Rework loop", value: "loop 2", icon: true },
      br: { tone: "blue", title: "Off path", value: "19 cases" },
      bl: { tone: "warm", title: "Resolver", value: "unclear owner" }
    }
  },
  decisions: {
    hot: ["decisions", "owners"],
    calls: {
      tl: { tone: "blue", title: "Approvers", value: "4 teams" },
      tr: { tone: "alert", title: "Escalation", value: "72 hours", icon: true },
      br: { tone: "warm", title: "Sources", value: "3 disagree" },
      bl: { tone: "warm", title: "Decision rights", value: "unclear" }
    }
  }
};
var TONE = { blue: "#4f8dff", alert: "#cfeaff", warm: "#7db8ff" };
var BUBBLES = [[0, 0], [14, -3], [27, 2], [-5, 13], [9, 11], [23, 14], [4, 25], [17, 26]];
function Cluster({ x, y, tone }) {
  return /* @__PURE__ */ IxH("g", { className: `dm-cluster ${tone}` }, BUBBLES.map(([dx, dy], i) => /* @__PURE__ */ IxH("circle", { key: i, cx: x + dx - 10, cy: y + dy - 12, r: "5.2" })));
}
function OrbitMap({ data }) {
  const animate = !reduce();
  return /* @__PURE__ */ IxH("div", { className: "dm-map", "aria-hidden": "true" }, /* @__PURE__ */ IxH("svg", { viewBox: `0 0 ${VW} ${VH}`, className: "dm-svg" }, /* @__PURE__ */ IxH("defs", null, /* @__PURE__ */ IxH("radialGradient", { id: "dm-halo", cx: "50%", cy: "50%", r: "50%" }, /* @__PURE__ */ IxH("stop", { offset: "0%", stopColor: "#3f8cff", stopOpacity: "0.28" }), /* @__PURE__ */ IxH("stop", { offset: "60%", stopColor: "#3f8cff", stopOpacity: "0.08" }), /* @__PURE__ */ IxH("stop", { offset: "100%", stopColor: "#3f8cff", stopOpacity: "0" }))), /* @__PURE__ */ IxH("circle", { cx: CX, cy: CY, r: "240", fill: "url(#dm-halo)" }), /* @__PURE__ */ IxH("g", { className: "dm-spin" }, /* @__PURE__ */ IxH("circle", { cx: CX, cy: CY, r: "228", className: "dm-ring dashed" }), animate && /* @__PURE__ */ IxH("animateTransform", { attributeName: "transform", type: "rotate", from: `0 ${CX} ${CY}`, to: `360 ${CX} ${CY}`, dur: "90s", repeatCount: "indefinite" })), /* @__PURE__ */ IxH("circle", { cx: CX, cy: CY, r: "172", className: "dm-ring" }), /* @__PURE__ */ IxH("circle", { cx: CX, cy: CY, r: "92", className: "dm-ring inner" }), animate && [0, 2, 4].map((b) => /* @__PURE__ */ IxH("circle", { key: b, cx: CX, cy: CY, r: "76", className: "dm-wave" }, /* @__PURE__ */ IxH("animate", { attributeName: "r", from: "76", to: "172", dur: "6s", begin: `-${b}s`, repeatCount: "indefinite" }), /* @__PURE__ */ IxH("animate", { attributeName: "opacity", values: "0;0.6;0", dur: "6s", begin: `-${b}s`, repeatCount: "indefinite" }))), [[CX, 64], [CX, 436], [134, CY], [506, CY]].map(([x, y]) => /* @__PURE__ */ IxH("circle", { key: `${x}${y}`, cx: x, cy: y, r: "2.2", className: "dm-tick" })), Object.entries(SLOTS).map(([slot, s3]) => {
    const call = data.calls[slot];
    return /* @__PURE__ */ IxH("g", { key: slot }, s3.cluster && /* @__PURE__ */ IxH(Cluster, { x: s3.cluster[0], y: s3.cluster[1], tone: call.tone }), /* @__PURE__ */ IxH("path", { d: s3.path, className: "dm-flow", style: { stroke: TONE[call.tone] } }), animate && [0, 1.1, 2.2].map((b) => /* @__PURE__ */ IxH("circle", { key: b, r: "3.2", className: "dm-particle", style: { fill: TONE[call.tone], color: TONE[call.tone] } }, /* @__PURE__ */ IxH("animateMotion", { dur: "3.3s", begin: `-${b}s`, repeatCount: "indefinite", path: s3.path }))));
  })), /* @__PURE__ */ IxH("div", { className: "dm-orb", style: pos(CX, CY) }, /* @__PURE__ */ IxH("div", { className: "dm-orb-glow", "aria-hidden": "true" }), /* @__PURE__ */ IxH("div", { className: "dm-orb-body" }, /* @__PURE__ */ IxH("svg", { className: "dm-orb-icon", viewBox: "0 0 216 216", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ IxH("path", { fill: "#ffffff", d: "M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818" }), /* @__PURE__ */ IxH("path", { fill: "#ffffff", d: "M149.331 49.43c3.878-5.725 11.784-7.192 16.743-2.374a83.9 83.9 0 0 1 16.658 22.862c6.146 12.379 9.2 26.125 8.889 40.01s-3.978 27.473-10.672 39.549a83.6 83.6 0 0 1-17.652 22.045c-5.177 4.588-13.01 2.758-16.626-3.138-3.507-5.719-1.682-13.113 3.088-17.831a59 59 0 0 0 10.101-13.342 60.26 60.26 0 0 0 7.516-27.853 60.35 60.35 0 0 0-6.261-28.178 59.2 59.2 0 0 0-9.517-13.83c-4.543-4.92-6.025-12.376-2.267-17.92" }), /* @__PURE__ */ IxH("path", { fill: "#ffffff", d: "M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z" }), /* @__PURE__ */ IxH("rect", { width: "20.488", height: "57.366", x: "97.293", y: "122.341", fill: "#ffffff", rx: "10.244" })), /* @__PURE__ */ IxH("span", { className: "dm-orb-label" }, "Outcome"))), NODES.map(({ id, label, icon: Icon, x, y }) => /* @__PURE__ */ IxH("div", { key: id, className: `dm-node${data.hot.includes(id) ? " hot" : ""}`, style: pos(x, y) }, /* @__PURE__ */ IxH("span", { className: "dm-node-ico" }, /* @__PURE__ */ IxH(Icon, null)), /* @__PURE__ */ IxH("span", { className: "dm-node-label" }, label))), Object.entries(SLOTS).map(([slot, s3]) => {
    const call = data.calls[slot];
    return /* @__PURE__ */ IxH("div", { key: slot, className: `dm-call ${call.tone}`, style: pos(s3.card[0], s3.card[1]) }, call.icon ? /* @__PURE__ */ IxH(m, { weight: "fill", className: "dm-call-ico" }) : /* @__PURE__ */ IxH("i", { className: "dm-dot" }), /* @__PURE__ */ IxH("span", { className: "dm-call-content" }, /* @__PURE__ */ IxH("b", null, call.title), /* @__PURE__ */ IxH("small", null, call.value)));
  }));
}
function Domains() {
  const f = DOMAINS.frictions[0];
  return /* @__PURE__ */ IxH("section", { className: "section dm-section", id: "domains" }, /* @__PURE__ */ IxH("span", { className: "dm-planet", "aria-hidden": "true" }), /* @__PURE__ */ IxH("div", { className: "container" }, /* @__PURE__ */ IxH("div", { className: "dm-layout" }, /* @__PURE__ */ IxH("div", { className: "dm-left", "data-reveal": true }, /* @__PURE__ */ IxH("div", { className: "section-head" }, /* @__PURE__ */ IxH("span", { className: "eyebrow" }, /* @__PURE__ */ IxH(c2, null), DOMAINS.eyebrow), /* @__PURE__ */ IxH("h2", { className: "h-section" }, DOMAINS.title, " ", /* @__PURE__ */ IxH("span", { className: "accent" }, DOMAINS.accent)), /* @__PURE__ */ IxH("p", { className: "lead" }, DOMAINS.body)), /* @__PURE__ */ IxH("div", { className: "dm-copy" }, /* @__PURE__ */ IxH("p", { className: "problem" }, f.problem), /* @__PURE__ */ IxH("h3", null, f.outcome), /* @__PURE__ */ IxH("p", { className: "detail" }, f.detail), /* @__PURE__ */ IxH("span", { className: "dm-metric" }, f.metric))), /* @__PURE__ */ IxH("div", { "data-reveal": true, style: { "--i": 1 } }, /* @__PURE__ */ IxH(OrbitMap, { data: FRICTION[f.id] }))), /* @__PURE__ */ IxH("ul", { className: "criteria", "data-reveal": true }, DOMAINS.criteria.map((c3) => /* @__PURE__ */ IxH("li", { key: c3 }, /* @__PURE__ */ IxH(s, { weight: "fill" }), c3))), /* @__PURE__ */ IxH("p", { className: "note", "data-reveal": true, style: { marginTop: 22 } }, "Outcome figures are from Intellient's illustrative operating benchmark.")));
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
  } catch (e14) {
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
      (entries) => entries.forEach((e14) => {
        if (e14.isIntersecting) {
          e14.target.classList.add("is-in");
          io.unobserve(e14.target);
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
      document.querySelectorAll("section[id]").forEach((s3) => {
        const r6 = s3.getBoundingClientRect();
        if (r6.top <= mid && r6.bottom > mid) current = s3.id;
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

const IxSection = Domains;
const IxUseReveal = useReveal;
const IxUseStatementLight = useStatementLight;
const IxUseNavState = useNavState;

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 */
export default function IntellientDomains() {
  const ref = IxUseRef(null);
  IxUseReveal(ref);

  return <div ref={ref} style={{ position: "relative", width: "100%" }}><IxSection /></div>;
}
