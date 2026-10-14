// Restored from the last successful local build after the source scene definitions were lost.
import * as t from "react/jsx-runtime";
import * as o from "react";
import { Database as wn, FileText as Qe, UsersThree as St, Gear as Jr, ChartBar as B0, TreeStructure as ir, Target as oo, CaretRight as fi, Check as j0, Flag as Rc, User as Qt, Cloud as uu, SquaresFour as vu, PencilRuler as Dc, Code as hu, ShieldCheck as Fn, Pulse as lo, Stack as tr, ListChecks as Bg, Sparkle as e1, Robot as wc, Wrench as zc, CheckCircle as jt, Compass as Pc, Briefcase as hi, Fingerprint as ro, Gavel as ri, Factory as Oc, Warning as mi, Heartbeat as Ic, Eye as ao, ArrowFatLinesUp as ou, LockKey as mu } from "@phosphor-icons/react";

const th = 560;

const wy = 480;

const Ae = () => typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Te({
  d: n,
  lit: e,
  dashed: s,
  dots: a = 0,
  dur: i = 3,
  delay: c = 0
}) {
  const d = a > 0 && !Ae();
  return t.jsxs("g", {
    children: [t.jsx("path", {
      d: n,
      className: `hs-line${e ? " lit" : ""}${s ? " dash" : ""}`
    }), d && Array.from({
      length: a
    }, (h, f) => t.jsx("circle", {
      r: "3",
      className: "hs-dot",
      children: t.jsx("animateMotion", {
        dur: `${i}s`,
        begin: `-${c + i / a * f}s`,
        repeatCount: "indefinite",
        path: n
      })
    }, f))]
  });
}

const ke = ({
  children: n,
  w: e = th,
  h: s = wy
}) => t.jsx("svg", {
  className: "hs-svg",
  viewBox: `0 0 ${e} ${s}`,
  children: n
});

const ll = {
  x0: 280,
  y0: 60,
  g: 36
};

const ut = (n, e, s = 0) => [ll.x0 + (n - e) * .866 * ll.g, ll.y0 + (n + e) * .5 * ll.g - s * ll.g];

const Cs = n => n.map(e => e.map(s => s.toFixed(1)).join(",")).join(" ");

const vt = n => `M${n.map(e => e.map(s => s.toFixed(1)).join(" ")).join(" L")}`;

const Ay = (n, e, s) => `M${n} ${e - s} Q${n} ${e} ${n + s} ${e} Q${n} ${e} ${n} ${e + s} Q${n} ${e} ${n - s} ${e} Q${n} ${e} ${n} ${e - s}Z`;

const My = () => t.jsxs(t.Fragment, {
  children: [t.jsxs("linearGradient", {
    id: "cb-top",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1",
    children: [t.jsx("stop", {
      offset: "0%",
      stopColor: "#7cbcff",
      stopOpacity: "0.55"
    }), t.jsx("stop", {
      offset: "45%",
      stopColor: "#2f6fe8",
      stopOpacity: "0.5"
    }), t.jsx("stop", {
      offset: "100%",
      stopColor: "#0d3a9a",
      stopOpacity: "0.75"
    })]
  }), t.jsxs("linearGradient", {
    id: "cb-left",
    x1: "0",
    y1: "0",
    x2: "0.3",
    y2: "1",
    children: [t.jsx("stop", {
      offset: "0%",
      stopColor: "#0f3282",
      stopOpacity: "0.9"
    }), t.jsx("stop", {
      offset: "100%",
      stopColor: "#050f2c",
      stopOpacity: "0.96"
    })]
  }), t.jsxs("linearGradient", {
    id: "cb-right",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [t.jsx("stop", {
      offset: "0%",
      stopColor: "#1f5fff",
      stopOpacity: "0.5"
    }), t.jsx("stop", {
      offset: "100%",
      stopColor: "#081a4a",
      stopOpacity: "0.95"
    })]
  }), t.jsxs("linearGradient", {
    id: "cb-sheen",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0",
    children: [t.jsx("stop", {
      offset: "0%",
      stopColor: "#cfeaff",
      stopOpacity: "0"
    }), t.jsx("stop", {
      offset: "50%",
      stopColor: "#cfeaff",
      stopOpacity: "0.22"
    }), t.jsx("stop", {
      offset: "100%",
      stopColor: "#cfeaff",
      stopOpacity: "0"
    })]
  })]
});

const D0 = n => e => {
  const s = Math.min(n.length - 2, Math.floor(e * (n.length - 1))),
    a = e * (n.length - 1) - s,
    [i, c, d, h] = [n[Math.max(0, s - 1)], n[s], n[s + 1], n[Math.min(n.length - 1, s + 2)]];
  return [0, 1].map(f => .5 * (2 * c[f] + (-i[f] + d[f]) * a + (2 * i[f] - 5 * c[f] + 4 * d[f] - h[f]) * a * a + (-i[f] + 3 * c[f] - 3 * d[f] + h[f]) * a * a * a));
};

function ga({
  cps: n,
  spread: e,
  strands: s = 7,
  id: a,
  project: i = ut,
  fan: c = 0,
  width: d,
  light: h,
  small: f
}) {
  const m = D0(n),
    g = (M, b) => {
      const [E, N] = m(M),
        [C, Z] = m(Math.min(1, M + .01)),
        [L, O] = m(Math.max(0, M - .01)),
        T = Math.hypot(C - L, Z - O) || 1;
      return [E - (Z - O) / T * b, N + (C - L) / T * b];
    },
    x = d || (M => 1 + c * M * M),
    v = M => vt(Array.from({
      length: 140
    }, (b, E) => {
      const N = E / 139,
        [C, Z] = g(N, M * x(N));
      return i(C, Z);
    })),
    j = Array.from({
      length: s
    }, (M, b) => (b / (s - 1) - .5) * e),
    A = !Ae();
  return t.jsxs("g", {
    className: `rb${h ? " light" : ""}${f ? " small" : ""}`,
    children: [t.jsx("path", {
      d: v(0),
      className: "rb-glow"
    }), t.jsx("path", {
      d: v(0),
      className: "rb-haze"
    }), j.map((M, b) => t.jsx("path", {
      d: v(M),
      className: `rb-strand${b === Math.floor(s / 2) ? " core" : ""}`,
      style: {
        "--n": b,
        opacity: .5 + .5 * (1 - Math.abs(M) / (e / 2))
      }
    }, b)), A && [0, 1, 2].map(M => t.jsx("circle", {
      r: "2.6",
      className: "hs-dot",
      children: t.jsx("animateMotion", {
        dur: "3.6s",
        begin: `-${M * 1.2 + a}s`,
        repeatCount: "indefinite",
        path: v(j[M * 3 % s] * .6)
      })
    }, M))]
  });
}

function I2({
  x: n,
  y: e,
  s,
  i: a
}) {
  const i = s * .866,
    c = s * .5,
    d = [[n, e], [n + i, e + c], [n, e + 2 * c], [n - i, e + c]],
    h = [[n - i, e + c], [n, e + 2 * c], [n, e + 2 * c + s], [n - i, e + c + s]],
    f = [[n, e + 2 * c], [n + i, e + c], [n + i, e + c + s], [n, e + 2 * c + s]];
  return t.jsxs("g", {
    className: "cb hs-float",
    style: {
      "--i": a
    },
    children: [t.jsx("ellipse", {
      cx: n,
      cy: e + 2 * c + s + 6,
      rx: i,
      ry: c * .5,
      className: "cb-pool"
    }), t.jsx("polygon", {
      points: Cs(h),
      className: "cb-face l"
    }), t.jsx("polygon", {
      points: Cs(f),
      className: "cb-face r"
    }), t.jsx("polygon", {
      points: Cs(f),
      fill: "url(#cb-sheen)",
      className: "cb-sheen"
    }), t.jsx("polygon", {
      points: Cs(d),
      className: "cb-face t"
    }), t.jsx("path", {
      d: `${vt(d)}Z`,
      className: "cb-rim"
    }), t.jsx("path", {
      d: `${vt([d[2], [n, e + 2 * c + s]])} ${vt([h[3], [n, e + 2 * c + s], f[3]])}`,
      className: "cb-edge hot"
    }), t.jsx("path", {
      d: `${vt([d[1], f[2]])} ${vt([d[3], h[3]])}`,
      className: "cb-edge"
    }), t.jsx("path", {
      d: Ay(n, e + c, s * .22),
      className: "cb-star"
    })]
  });
}

function Vd({
  x: n,
  y: e,
  w: s,
  h: a,
  skew: i,
  depth: c = 10,
  i: d
}) {
  const h = [[n, e], [n + s, e + i], [n + s, e + i + a], [n, e + a]],
    f = [[n + s, e + i], [n + s + c, e + i - c * .5], [n + s + c, e + i + a - c * .5], [n + s, e + i + a]];
  return t.jsxs("g", {
    className: "pn",
    style: {
      "--i": d
    },
    children: [t.jsx("polygon", {
      points: Cs(h),
      className: "pn-face"
    }), t.jsx("polygon", {
      points: Cs(f),
      className: "pn-side"
    }), t.jsx("path", {
      d: `M${n} ${e + a} V${e} L${n + s} ${e + i}`,
      className: "pn-rim"
    }), t.jsx("path", {
      d: `M${n + s} ${e + i} V${e + i + a}`,
      className: "pn-edge"
    })]
  });
}

function ModelPath() {
  const n = (a, i) => [a, i],
    e = [];
  for (let a = -14; a <= 20; a += 1) e.push(`M${-200 + a * 46} 520 L${420 + a * 46} 180`), e.push(`M${-160 + a * 46} 180 L${720 + a * 46} 560`);
  const s = [[205, 150, 300], [283, 112, 250], [316, 62, 200], [362, 30, 190], [535, 80, 300], [96, 176, 330]];
  return t.jsxs(ke, {
    children: [t.jsxs("defs", {
      children: [t.jsx(My, {}), t.jsxs("radialGradient", {
        id: "mp-floor",
        cx: "62%",
        cy: "58%",
        r: "62%",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#fff",
          stopOpacity: "1"
        }), t.jsx("stop", {
          offset: "65%",
          stopColor: "#fff",
          stopOpacity: "0.4"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#fff",
          stopOpacity: "0"
        })]
      }), t.jsx("mask", {
        id: "mp-mask",
        children: t.jsx("rect", {
          x: "-40",
          y: "0",
          width: "640",
          height: "520",
          fill: "url(#mp-floor)"
        })
      }), t.jsxs("linearGradient", {
        id: "mp-enter",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0.12",
          stopColor: "#fff",
          stopOpacity: "0"
        }), t.jsx("stop", {
          offset: "0.3",
          stopColor: "#fff",
          stopOpacity: "1"
        })]
      }), t.jsx("mask", {
        id: "mp-ribbon",
        children: t.jsx("rect", {
          x: "-40",
          y: "0",
          width: "640",
          height: "520",
          fill: "url(#mp-enter)"
        })
      })]
    }), t.jsxs("g", {
      mask: "url(#mp-mask)",
      children: [t.jsx("path", {
        d: e.join(" "),
        className: "cb-grid"
      }), Array.from({
        length: 24
      }, (a, i) => t.jsx("circle", {
        cx: 60 + i * 97 % 480,
        cy: 200 + i * 61 % 260,
        r: "1.5",
        className: "cb-node",
        style: {
          "--n": i % 9
        }
      }, i))]
    }), s.map(([a, i, c], d) => t.jsxs("g", {
      className: "mp-beam",
      style: {
        "--n": d
      },
      children: [t.jsx("line", {
        x1: a,
        x2: a,
        y1: i,
        y2: c
      }), t.jsx("circle", {
        cx: a,
        cy: i,
        r: "1.8"
      })]
    }, d)), t.jsx(Vd, {
      x: 136,
      y: 105,
      w: 74,
      h: 206,
      skew: 40,
      i: 0
    }), t.jsx(Vd, {
      x: 361,
      y: 15,
      w: 94,
      h: 250,
      skew: 44,
      i: 1
    }), t.jsx("g", {
      mask: "url(#mp-ribbon)",
      children: t.jsx(ga, {
        cps: [[400, 70], [300, 118], [244, 168], [250, 226], [330, 278], [380, 336], [352, 400], [250, 452], [170, 478]],
        spread: 24,
        fan: 2.2,
        strands: 14,
        id: 0,
        project: n
      })
    }), t.jsx(Vd, {
      x: 136,
      y: 214,
      w: 70,
      h: 112,
      skew: -28,
      i: 2
    }), t.jsx(I2, {
      x: 486,
      y: 84,
      s: 28,
      i: 3
    }), t.jsx(I2, {
      x: 316,
      y: 112,
      s: 38,
      i: 0
    }), t.jsx(I2, {
      x: 57,
      y: 286,
      s: 48,
      i: 2
    }), t.jsx(I2, {
      x: 482,
      y: 196,
      s: 80,
      i: 1
    })]
  });
}

const _y = ({
  x: n,
  y: e,
  r: s = 7,
  i: a = 0
}) => t.jsxs("g", {
  className: "te-orb",
  style: {
    "--i": a
  },
  children: [t.jsx("circle", {
    cx: n,
    cy: e,
    r: s * 2.6,
    className: "halo"
  }), t.jsx("circle", {
    cx: n,
    cy: e,
    r: s,
    className: "core"
  })]
});

function D2({
  x: n,
  y: e,
  w: s,
  h: a,
  skew: i,
  i: c
}) {
  const h = `M${n} ${e + 5} Q${n} ${e} ${n + 5} ${e + 5 * (i / s)} L${n + s - 5} ${e + i - 5 * (i / s)} Q${n + s} ${e + i} ${n + s} ${e + i + 5} V${e + i + a - 5} Q${n + s} ${e + i + a} ${n + s - 5} ${e + i + a - 5 * (i / s)} L${n + 5} ${e + a + 5 * (i / s)} Q${n} ${e + a} ${n} ${e + a - 5} Z`;
  return t.jsxs("g", {
    className: "te-card",
    style: {
      "--i": c
    },
    children: [t.jsx("rect", {
      x: n - 4,
      y: e + a + 4,
      width: s + 8,
      height: a * .55,
      className: "te-reflect"
    }), t.jsx("path", {
      d: h,
      className: "face"
    }), t.jsx("path", {
      d: h,
      className: "edge"
    }), t.jsx("path", {
      d: `M${n + s} ${e + i + 5} V${e + i + a - 5}`,
      className: "side"
    })]
  });
}

function Rise() {
  const n = (f, m) => [f, m],
    e = [[-40, 452], [147, 343], [212, 318], [275, 301], [337, 262], [394, 220], [445, 172], [495, 140], [600, 112]],
    s = [1, 3, 5, 7].map(f => e[f]),
    a = [1, 3, 5, 7].map(f => f / (e.length - 1)),
    i = f => f * f * (3 - 2 * f),
    c = f => {
      const m = Math.min(...a.map(x => Math.abs(f - x))),
        g = .22 + .78 * i(Math.min(m / .125, 1));
      return f < a[0] ? g * (1 + 3.2 * ((a[0] - f) / a[0]) ** 2) : g;
    },
    d = [];
  for (let f = -12; f <= 22; f += 1) d.push(`M${-300 + f * 34} 560 L${600 + f * 34} 100`), d.push(`M${-300 + f * 34} 160 L${700 + f * 34} 600`);
  const h = [[194, 233, 301], [219, 324, 360], [310, 160, 262], [282, 312, 362], [408, 262, 312], [421, 108, 160], [478, 222, 280], [495, 156, 206], [533, 72, 136]];
  return t.jsxs(ke, {
    children: [t.jsxs("defs", {
      children: [t.jsxs("radialGradient", {
        id: "te-floor",
        cx: "55%",
        cy: "70%",
        r: "60%",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#fff",
          stopOpacity: "1"
        }), t.jsx("stop", {
          offset: "70%",
          stopColor: "#fff",
          stopOpacity: "0.3"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#fff",
          stopOpacity: "0"
        })]
      }), t.jsx("mask", {
        id: "te-mask",
        children: t.jsx("rect", {
          x: "-40",
          y: "0",
          width: "640",
          height: "520",
          fill: "url(#te-floor)"
        })
      }), t.jsxs("linearGradient", {
        id: "te-glass",
        x1: "0",
        y1: "0",
        x2: "0.6",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#8fc4ff",
          stopOpacity: "0.28"
        }), t.jsx("stop", {
          offset: "55%",
          stopColor: "#2f6fe8",
          stopOpacity: "0.1"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#0a2a6b",
          stopOpacity: "0.2"
        })]
      }), t.jsxs("linearGradient", {
        id: "te-ref",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#3f8cff",
          stopOpacity: "0.35"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#3f8cff",
          stopOpacity: "0"
        })]
      })]
    }), t.jsxs("g", {
      mask: "url(#te-mask)",
      children: [t.jsx("path", {
        d: d.join(" "),
        className: "te-grid"
      }), Array.from({
        length: 30
      }, (f, m) => t.jsx("circle", {
        cx: 30 + m * 83 % 520,
        cy: 250 + m * 47 % 220,
        r: "1.4",
        className: "cb-node",
        style: {
          "--n": m % 9
        }
      }, m))]
    }), h.map(([f, m, g], x) => t.jsxs("g", {
      className: "te-beam",
      style: {
        "--n": x
      },
      children: [t.jsx("line", {
        x1: f,
        x2: f,
        y1: m,
        y2: g
      }), t.jsx("circle", {
        cx: f,
        cy: m,
        r: "2.2"
      }), t.jsx("circle", {
        cx: f,
        cy: g,
        r: "1.4",
        className: "end"
      })]
    }, x)), t.jsx(D2, {
      x: 144,
      y: 268,
      w: 39,
      h: 99,
      skew: 21,
      i: 0
    }), t.jsx(D2, {
      x: 220,
      y: 140,
      w: 56,
      h: 157,
      skew: 33,
      i: 1
    }), t.jsx(D2, {
      x: 345,
      y: 98,
      w: 48,
      h: 143,
      skew: 41,
      i: 2
    }), t.jsx(D2, {
      x: 471,
      y: 45,
      w: 47,
      h: 140,
      skew: 38,
      i: 3
    }), t.jsx(ga, {
      cps: e,
      spread: 48,
      width: c,
      strands: 20,
      id: 0,
      project: n,
      light: !0
    }), s.map(([f, m], g) => t.jsx(_y, {
      x: f,
      y: m,
      r: g === 3 ? 10 : 9,
      i: g
    }, f))]
  });
}

function B2({
  x: n,
  y: e,
  w: s = 64,
  h: a = 76,
  kind: i,
  i: c
}) {
  const d = e - a - 14,
    h = {
      request: t.jsxs(t.Fragment, {
        children: [t.jsx("path", {
          d: "M-12 -18 H6 L13 -11 V18 H-12 Z",
          className: "ink"
        }), t.jsx("path", {
          d: "M-6 -4 H7 M-6 3 H7 M-6 10 H3",
          className: "ink thin"
        })]
      }),
      person: t.jsxs(t.Fragment, {
        children: [t.jsx("circle", {
          cx: "0",
          cy: "-7",
          r: "8",
          className: "ink"
        }), t.jsx("path", {
          d: "M-14 17 V13 a14 10 0 0 1 28 0 V17",
          className: "ink"
        })]
      }),
      sheet: t.jsxs(t.Fragment, {
        children: [t.jsx("rect", {
          x: "-15",
          y: "-15",
          width: "30",
          height: "30",
          rx: "3",
          className: "ink"
        }), t.jsx("path", {
          d: "M-15 -5 H15 M-15 5 H15 M-5 -15 V15 M5 -15 V15",
          className: "ink thin"
        })]
      }),
      approved: t.jsxs(t.Fragment, {
        children: [t.jsx("path", {
          d: "M-14 -22 H6 L15 -13 V22 H-14 Z",
          className: "docfill"
        }), t.jsx("path", {
          d: "M-7 -8 H8 M-7 -1 H8 M-7 6 H2",
          className: "ink lines"
        }), t.jsx("circle", {
          cx: "13",
          cy: "16",
          r: "9",
          className: "badge"
        }), t.jsx("path", {
          d: "M9 16 l3 3 l5 -6",
          className: "tick"
        })]
      })
    }[i];
  return t.jsxs("g", {
    className: `rq-tile${i === "approved" ? " hot" : ""}`,
    style: {
      "--i": c
    },
    children: [t.jsx("line", {
      x1: n,
      x2: n,
      y1: d + a,
      y2: e,
      className: "rq-stem"
    }), t.jsxs("g", {
      className: "hs-float",
      style: {
        "--i": c
      },
      children: [t.jsx("rect", {
        x: n - s / 2,
        y: d,
        width: s,
        height: a,
        rx: "10",
        className: "face"
      }), t.jsx("rect", {
        x: n - s / 2,
        y: d,
        width: s,
        height: a,
        rx: "10",
        className: "rim"
      }), t.jsx("path", {
        d: `M${n - s / 2 + 10} ${d + 1} H${n + s / 2 - 10}`,
        className: "shine"
      }), t.jsx("g", {
        transform: `translate(${n} ${d + a / 2})`,
        children: h
      })]
    })]
  });
}

function Request() {
  const n = (g, x) => [g, x],
    e = [[-30, 262], [80, 236], [150, 238], [214, 218], [280, 214], [344, 192], [410, 186], [478, 162], [600, 140]],
    s = [1, 3, 5, 7].map(g => e[g]),
    a = [1, 3, 5, 7].map(g => g / (e.length - 1)),
    i = g => g * g * (3 - 2 * g),
    c = g => .28 + .72 * i(Math.min(Math.min(...a.map(x => Math.abs(g - x))) / .12, 1)),
    d = [];
  for (let g = -10; g <= 26; g += 1) d.push(`M${-200 + g * 34} 330 L${400 + g * 34} 120`), d.push(`M${-200 + g * 34} 150 L${500 + g * 34} 360`);
  const h = [[36, 150, 250], [116, 120, 228], [252, 90, 210], [298, 130, 205], [384, 70, 186], [518, 60, 150], [540, 110, 150]],
    [f, m] = s;
  return t.jsxs(ke, {
    h: 300,
    children: [t.jsxs("defs", {
      children: [t.jsxs("radialGradient", {
        id: "rq-floor",
        cx: "55%",
        cy: "75%",
        r: "60%",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#fff",
          stopOpacity: "0.9"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#fff",
          stopOpacity: "0"
        })]
      }), t.jsx("mask", {
        id: "rq-mask",
        children: t.jsx("rect", {
          x: "-40",
          y: "0",
          width: "640",
          height: "300",
          fill: "url(#rq-floor)"
        })
      }), t.jsxs("linearGradient", {
        id: "rq-glass",
        x1: "0",
        y1: "0",
        x2: "0.5",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#6fb4ff",
          stopOpacity: "0.32"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#0d3a9a",
          stopOpacity: "0.28"
        })]
      })]
    }), t.jsx("path", {
      d: d.join(" "),
      className: "te-grid",
      mask: "url(#rq-mask)"
    }), h.map(([g, x, v], j) => t.jsxs("g", {
      className: "te-beam",
      style: {
        "--n": j
      },
      children: [t.jsx("line", {
        x1: g,
        x2: g,
        y1: x,
        y2: v
      }), t.jsx("circle", {
        cx: g,
        cy: x,
        r: "1.9"
      })]
    }, j)), t.jsx(ga, {
      cps: e,
      spread: 34,
      width: c,
      strands: 16,
      id: 0,
      project: n,
      light: !0
    }), t.jsx("path", {
      d: `M${m[0] - 6} ${m[1] - 100} C${m[0] - 30} ${m[1] - 150} ${f[0] + 20} ${f[1] - 150} ${f[0] + 4} ${f[1] - 106}`,
      className: "rq-return"
    }), t.jsx("path", {
      d: `M${f[0] + 4} ${f[1] - 104} l-5 -9 l9 2 z`,
      className: "rq-arrow"
    }), t.jsx(B2, {
      x: f[0],
      y: f[1],
      kind: "request",
      i: 0
    }), t.jsx(B2, {
      x: m[0],
      y: m[1],
      kind: "person",
      i: 1
    }), t.jsx(B2, {
      x: s[2][0],
      y: s[2][1],
      kind: "sheet",
      i: 2
    }), t.jsx(B2, {
      x: s[3][0],
      y: s[3][1],
      w: 80,
      h: 94,
      kind: "approved",
      i: 3
    }), s.map(([g, x], v) => t.jsx(_y, {
      x: g,
      y: x,
      r: v === 3 ? 8 : 6,
      i: v
    }, g))]
  });
}

const MODEL_LAYERS = ["Outcome", "People", "Technology", "Governance"];

const JV = ["Applications", "Models", "Platform", "Data", "Security & Governance"];

function LayerStack({
  labels: n = JV,
  top: e = 82,
  gap: s = 76
}) {
  const a = n.some(Boolean),
    i = a ? 190 : 280,
    c = a ? 165 : 200,
    d = a ? 50 : 60,
    h = 12,
    f = n.map((g, x) => e + x * s),
    m = (g, x = 1) => `${i - c * x},${g} ${i},${g - d * x} ${i + c * x},${g} ${i},${g + d * x}`;
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      children: [t.jsxs("defs", {
        children: [t.jsxs("linearGradient", {
          id: "hs-st-top",
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "1",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#4f9bff",
            stopOpacity: "0.5"
          }), t.jsx("stop", {
            offset: "55%",
            stopColor: "#1f5fff",
            stopOpacity: "0.3"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#0a2a6b",
            stopOpacity: "0.45"
          })]
        }), t.jsxs("linearGradient", {
          id: "hs-st-rim",
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "0",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#8fcbff",
            stopOpacity: "0.2"
          }), t.jsx("stop", {
            offset: "50%",
            stopColor: "#e6f4ff",
            stopOpacity: "1"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#8fcbff",
            stopOpacity: "0.2"
          })]
        }), t.jsxs("radialGradient", {
          id: "hs-st-floor",
          cx: "50%",
          cy: "50%",
          r: "50%",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#3f8cff",
            stopOpacity: "0.45"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#3f8cff",
            stopOpacity: "0"
          })]
        })]
      }), [-150, -90, 90, 150].map(g => t.jsx("line", {
        x1: i + g,
        x2: i + g,
        y1: "40",
        y2: "440",
        className: "hs-st-guide"
      }, g)), t.jsx("ellipse", {
        cx: i,
        cy: "436",
        rx: "230",
        ry: "44",
        fill: "url(#hs-st-floor)"
      }), t.jsx("ellipse", {
        cx: i,
        cy: "404",
        rx: "262",
        ry: "46",
        className: "hs-st-orbit"
      }), t.jsx(Te, {
        d: `M${i} 470 V20`,
        lit: !0,
        dots: 4,
        dur: 3.6
      }), [...n].reverse().map((g, x) => {
        const v = n.length - 1 - x,
          j = f[v];
        return t.jsxs("g", {
          className: "hs-st-plate",
          style: {
            "--i": v
          },
          children: [t.jsx("polygon", {
            points: `${i - c},${j} ${i},${j + d} ${i},${j + d + h} ${i - c},${j + h}`,
            className: "side"
          }), t.jsx("polygon", {
            points: `${i},${j + d} ${i + c},${j} ${i + c},${j + h} ${i},${j + d + h}`,
            className: "side dark"
          }), t.jsx("polygon", {
            points: m(j),
            className: "top"
          }), t.jsx("polygon", {
            points: m(j, .84),
            className: "inset"
          }), t.jsx("path", {
            d: `M${i - c} ${j} L${i} ${j - d} L${i + c} ${j}`,
            className: "rim"
          }), t.jsx("circle", {
            cx: i,
            cy: j,
            r: "4",
            className: "hs-st-node"
          }), g && t.jsx("path", {
            d: `M${i + c + 4} ${j} H${i + c + 20}`,
            className: "hs-line dash"
          })]
        }, v);
      })]
    }), n.map((g, x) => g && t.jsxs("span", {
      className: "hs-st-tag",
      style: {
        left: i + c + 22,
        top: f[x],
        "--i": x
      },
      children: [t.jsx("i", {}), g]
    }, g))]
  });
}

function Domain() {
  const e = b => +(300 + (b - 930) * .44).toFixed(1),
    s = b => +(250 + (b - 500) * .44).toFixed(1),
    a = (b, E) => `${e(b)} ${s(E)}`,
    i = (b, E, N, C) => `M${a(b - N, E)} A${N * .44} ${C * .44} 0 0 1 ${a(b + N, E)} A${N * .44} ${C * .44} 0 0 1 ${a(b - N, E)}`,
    c = ({
      cx: b,
      cy: E,
      rx: N,
      ry: C,
      className: Z,
      rot: L = 0
    }) => t.jsx("ellipse", {
      cx: e(b),
      cy: s(E),
      rx: N * .44,
      ry: C * .44,
      className: Z,
      transform: L ? `rotate(${L} ${e(b)} ${s(E)})` : void 0
    }),
    d = [938, 520, 550, 190],
    h = [915, 505, 600, 262],
    f = ([b, E, N, C], Z) => [b + N * Math.cos(Z * Math.PI / 180), E + C * Math.sin(Z * Math.PI / 180)],
    m = i(...d),
    g = `M${a(385, 520)} A${555 * .44} ${360 * .44} 0 0 1 ${a(1495, 520)} A${555 * .44} ${335 * .44} 0 0 1 ${a(385, 520)}`,
    x = [[...f(h, 245), 15], [...f(h, 192), 8], [...f(d, 205), 28, !0], [...f(d, 22), 14], [...f(d, 140), 30, !0]],
    v = [[1163, 102, 330], [1263, 255, 425], [1377, 343, 605], [486, 310, 430], [440, 475, 620], [517, 676, 850], [1122, 760, 880]],
    j = !Ae(),
    A = ({
      x: b,
      y: E,
      r: N,
      ringed: C,
      i: Z
    }) => t.jsxs("g", {
      className: "od-sat",
      style: {
        "--i": Z
      },
      children: [t.jsx("circle", {
        cx: e(b),
        cy: s(E),
        r: N * .44 * 2.4,
        className: "halo"
      }), C && t.jsx(c, {
        cx: b,
        cy: E + N * .15,
        rx: N * 1.75,
        ry: N * .5,
        className: "band"
      }), t.jsx("circle", {
        cx: e(b),
        cy: s(E),
        r: N * .44,
        className: "ball"
      }), t.jsx("ellipse", {
        cx: e(b) - N * .44 * .3,
        cy: s(E) - N * .44 * .38,
        rx: N * .44 * .42,
        ry: N * .44 * .26,
        className: "shine"
      }), C && t.jsx("path", {
        d: `M${a(b - N * 1.75, E + N * .15)} A${N * 1.75 * .44} ${N * .5 * .44} 0 0 0 ${a(b + N * 1.75, E + N * .15)}`,
        className: "band front"
      })]
    }),
    M = 55 * .44 * 2.7;
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      children: [t.jsxs("defs", {
        children: [t.jsxs("radialGradient", {
          id: "od-dome",
          cx: "50%",
          cy: "58%",
          r: "55%",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#1f5fff",
            stopOpacity: "0.2"
          }), t.jsx("stop", {
            offset: "60%",
            stopColor: "#1f5fff",
            stopOpacity: "0.06"
          }), t.jsx("stop", {
            offset: "88%",
            stopColor: "#3f8cff",
            stopOpacity: "0.16"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#8fcbff",
            stopOpacity: "0.34"
          })]
        }), t.jsxs("linearGradient", {
          id: "od-rim",
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "0",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#8fcbff",
            stopOpacity: "0"
          }), t.jsx("stop", {
            offset: "50%",
            stopColor: "#ffffff",
            stopOpacity: "0.9"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#8fcbff",
            stopOpacity: "0"
          })]
        }), t.jsxs("radialGradient", {
          id: "od-ball",
          cx: "34%",
          cy: "28%",
          r: "75%",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#e9f6ff"
          }), t.jsx("stop", {
            offset: "30%",
            stopColor: "#9fdcff"
          }), t.jsx("stop", {
            offset: "62%",
            stopColor: "#2f7bff"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#0b1a44"
          })]
        }), t.jsx("filter", {
          id: "od-blur",
          x: "-20%",
          y: "-50%",
          width: "140%",
          height: "200%",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "5"
          })
        })]
      }), t.jsx("path", {
        d: g,
        fill: "url(#od-dome)",
        className: "od-dome"
      }), t.jsx("path", {
        d: `M${a(385, 520)} A${555 * .44} ${360 * .44} 0 0 1 ${a(1495, 520)}`,
        stroke: "url(#od-rim)",
        className: "od-rim"
      }), [.38, .72].map(b => t.jsx("path", {
        d: `M${a(940 - 555 * b, 520)} A${555 * b * .44} ${360 * .44} 0 0 1 ${a(940 + 555 * b, 520)}`,
        className: "od-mer"
      }, b)), t.jsx("path", {
        d: `M${a(470, 400)} A${470 * .44} ${80 * .44} 0 0 1 ${a(1410, 400)}`,
        className: "od-mer"
      }), t.jsx("line", {
        x1: e(925),
        x2: e(925),
        y1: s(160),
        y2: s(860),
        className: "od-axis"
      }), t.jsx(c, {
        cx: 935,
        cy: 600,
        rx: 650,
        ry: 300,
        className: "od-orbit faint"
      }), [80, 150, 230, 320, 420].map((b, E) => t.jsx(c, {
        cx: 925,
        cy: 525,
        rx: b,
        ry: b * .38,
        className: `od-floor${E % 2 ? " rev" : ""}`
      }, b)), t.jsx(c, {
        cx: h[0],
        cy: h[1],
        rx: h[2],
        ry: h[3],
        rot: 1.5,
        className: "od-orbit"
      }), t.jsx("path", {
        d: m,
        className: "od-ring glow",
        filter: "url(#od-blur)"
      }), t.jsx("path", {
        d: m,
        className: "od-ring"
      }), t.jsx("path", {
        d: m,
        className: "od-ring core"
      }), Array.from({
        length: 14
      }, (b, E) => {
        const N = E / 14 * Math.PI * 2 + .2;
        return t.jsx("circle", {
          cx: e(938 + Math.cos(N) * 550),
          cy: s(520 + Math.sin(N) * 190),
          r: "1.6",
          className: "od-tick"
        }, E);
      }), j && [0, 1, 2].map(b => t.jsx("circle", {
        r: "2.8",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "16s",
          begin: `-${b * 5.3}s`,
          repeatCount: "indefinite",
          path: m
        })
      }, b)), v.map(([b, E, N], C) => t.jsxs("g", {
        className: "te-beam",
        style: {
          "--n": C
        },
        children: [t.jsx("line", {
          x1: e(b),
          x2: e(b),
          y1: s(E),
          y2: s(N)
        }), t.jsx("circle", {
          cx: e(b),
          cy: s(E),
          r: "2.4"
        }), t.jsx("circle", {
          cx: e(b),
          cy: s(N),
          r: "1.5",
          className: "end"
        })]
      }, C)), t.jsx(c, {
        cx: 925,
        cy: 500,
        rx: 110,
        ry: 30,
        className: "od-orbit near"
      }), x.map(([b, E, N, C], Z) => t.jsx(A, {
        x: b,
        y: E,
        r: N,
        ringed: C,
        i: Z + 1
      }, Z))]
    }), t.jsxs("div", {
      className: "od-orb",
      style: {
        left: e(925),
        top: s(470),
        width: M,
        height: M
      },
      children: [t.jsx("span", {
        className: "od-orb-glow",
        "aria-hidden": "true"
      }), t.jsxs("div", {
        className: "orb-glass od-orb-glass",
        children: [t.jsx("span", {
          className: "orb-swirl",
          "aria-hidden": "true"
        }), t.jsx("span", {
          className: "orb-swirl two",
          "aria-hidden": "true"
        })]
      })]
    })]
  });
}

const lt = {
  w: 892,
  h: 441,
  cx: 446,
  y0: 120,
  f: 583,
  cam: 1,
  phi: 37.9 * Math.PI / 180,
  p0: [-.24, 2.31]
};

const Vc = [Math.cos(lt.phi), -Math.sin(lt.phi)];

const Zc = [Math.sin(lt.phi), Math.cos(lt.phi)];

const tZ = (n, e, s) => {
  const a = lt.f * (lt.cam - s) / (e - lt.y0),
    c = [(n - lt.cx) * a / lt.f - lt.p0[0], a - lt.p0[1]];
  return [c[0] * Vc[0] + c[1] * Vc[1], c[0] * Zc[0] + c[1] * Zc[1], s];
};

const nZ = [[165, 262, .12], [300, 237, .2], [400, 210, .28], [475, 200, .32], [550, 202, .3], [585, 218, .15]];

const sZ = [[0, 240, .12], [150, 212, .15], [250, 205, .16], [350, 202, .16]];

const aZ = [[300, 200, .2], [350, 182, .3], [450, 152, .42], [510, 150, .45], [590, 143, .5]];

const rZ = [[515, 177, .22], [565, 172, .25], [620, 165, .28]];

const iZ = [[655, 145, .45], [725, 139, .55], [800, 140, .55], [892, 160, .45]];

const lZ = [[.6, nZ], [.8, sZ], [1, aZ], [.6, rZ], [1.6, iZ]].map(([n, e]) => ({
  w: n,
  p: e.map(([s, a, i]) => tZ(s, a, i))
}));

function oZ(n, e) {
  let s = 0;
  for (const {
    w: a,
    p: i
  } of lZ) {
    let c = 1 / 0,
      d = 0;
    for (let h = 0; h < i.length - 1; h += 1) {
      const [f, m, g] = i[h],
        [x, v, j] = i[h + 1],
        A = x - f,
        M = v - m,
        b = Math.max(0, Math.min(1, ((n - f) * A + (e - m) * M) / (A * A + M * M || 1))),
        E = Math.hypot(n - f - b * A, e - m - b * M);
      E < c && (c = E, d = g + (j - g) * b);
    }
    s = Math.max(s, d * Math.exp(-((c / a) ** 2) / 2));
  }
  return s;
}

const a5 = (n, e, s) => {
  const a = lt.p0[0] + n * Vc[0] + e * Zc[0],
    i = lt.p0[1] + n * Vc[1] + e * Zc[1],
    c = s ? 0 : oZ(n, e);
  return [lt.cx + lt.f * a / i, lt.y0 + lt.f * (lt.cam - c) / i, i];
};

const r5 = n => .1 * Math.min(n, 0);

const by = [[-10, 244], [0, 240], [80, 226], [150, 212], [250, 205], [300, 202], [350, 182], [400, 166], [450, 152], [510, 150], [590, 143], [640, 141], [678, 141], [725, 139], [800, 140], [850, 146], [902, 164]];

const cZ = [by.slice(1, 13), [[650, 145], [725, 139], [800, 140], [850, 146], [892, 160]], [[165, 262], [230, 250], [300, 237], [350, 222], [400, 210], [450, 201], [475, 200], [520, 201], [550, 204], [585, 218], [600, 228]], [[500, 180], [515, 177], [565, 172], [620, 165]]];

const i5 = (n, e = 6) => {
  const s = D0(n);
  return Array.from({
    length: (n.length - 1) * e + 1
  }, (a, i) => s(i / ((n.length - 1) * e)));
};

function dZ(n) {
  const e = Math.min(3, 2 * (window.devicePixelRatio || 1));
  n.width = lt.w * e, n.height = lt.h * e;
  const s = n.getContext("2d");
  s.scale(e, e), s.save(), s.beginPath(), s.moveTo(-10, lt.h + 20), i5(by).forEach(([x, v]) => s.lineTo(x, v)), s.lineTo(lt.w + 10, lt.h + 20), s.closePath(), s.clip();
  const a = .1,
    i = Array.from({
      length: Math.round(16.4 / a) + 1
    }, (x, v) => -14 + v * a),
    c = Array.from({
      length: 150
    }, (x, v) => v),
    d = c.map(x => i.map(v => a5(v, r5(v) + x * a))),
    h = c.map(x => i.map(v => a5(v, r5(v) + x * a, !0))),
    f = x => Math.max(0, Math.min(1, 1.3 - x / 15)),
    m = ([x, v]) => x > -10 && x < lt.w + 10 && v > 90 && v < lt.h + 10,
    g = (x, v) => Math.max(.6, Math.min(2.2, (d[x][v][1] - d[x + 1][v][1]) / Math.max(.01, h[x][v][1] - h[x + 1][v][1])));
  for (let x = c.length - 2; x >= 0; x -= 1) {
    const v = d[x],
      j = d[x + 1];
    s.beginPath(), v.forEach(([A, M], b) => b ? s.lineTo(A, M) : s.moveTo(A, M));
    for (let A = j.length - 1; A >= 0; A -= 1) s.lineTo(j[A][0], j[A][1]);
    s.closePath(), s.fillStyle = "#020917", s.fill(), s.lineWidth = .55;
    for (let A = 0; A < v.length; A += 1) {
      if (!m(j[A])) continue;
      const M = f(j[A][2]) * Math.min(1.6, g(x, A));
      s.strokeStyle = `rgba(63, 140, 255, ${.2 * M})`, s.beginPath(), s.moveTo(v[A][0], v[A][1]), s.lineTo(j[A][0], j[A][1]), s.stroke(), A && (s.strokeStyle = `rgba(63, 140, 255, ${.16 * M})`, s.beginPath(), s.moveTo(j[A - 1][0], j[A - 1][1]), s.lineTo(j[A][0], j[A][1]), s.stroke());
    }
    j.forEach(([A, M, b], E) => {
      if (!m([A, M])) return;
      const N = Math.min(1, f(b) * Math.min(1.5, g(x, E)));
      N <= .03 || (s.fillStyle = `rgba(${b < 4.5 ? "143, 203, 255" : "79, 155, 255"}, ${.9 * N})`, s.beginPath(), s.arc(A, M, Math.max(.35, Math.min(1.35, 3 / b)), 0, Math.PI * 2), s.fill());
    });
  }
  s.lineCap = "round";
  for (let x = 1; x < i.length; x += 1) {
    const [v, j] = d[0][x - 1],
      [A, M] = d[0][x],
      b = .2 + .8 * Math.exp(-((i[x] / 2.2) ** 2));
    s.strokeStyle = `rgba(143, 203, 255, ${b})`, s.lineWidth = 1.3, s.shadowColor = "#3f8cff", s.shadowBlur = 8, s.beginPath(), s.moveTo(v, j), s.lineTo(A, M), s.stroke();
  }
  s.restore(), s.lineCap = "round", s.shadowColor = "#3f8cff", cZ.forEach(x => {
    const v = i5(x, 10);
    for (let j = 1; j < v.length; j += 1) {
      const A = j / (v.length - 1),
        M = Math.sin(Math.PI * Math.min(1, Math.max(0, A))) ** .6;
      s.lineWidth = 1.2, s.shadowBlur = 10, s.strokeStyle = `rgba(110, 180, 255, ${.9 * M})`, s.beginPath(), s.moveTo(v[j - 1][0], v[j - 1][1]), s.lineTo(v[j][0], v[j][1]), s.stroke();
    }
  }), s.shadowBlur = 0;
}

function Terrain() {
  const n = o.useRef(null);
  o.useLayoutEffect(() => {
    n.current && dZ(n.current);
  }, []);
  const e = D0([[383, 372], [392, 345], [402, 328], [418, 312], [440, 297], [470, 285], [500, 277], [550, 265], [620, 245], [650, 236], [667, 228], [677, 214], [673, 202], [660, 191], [640, 181], [624, 171], [619, 163], [626, 156], [642, 150], [662, 144], [678, 139]]),
    s = Array.from({
      length: 200
    }, (h, f) => e(f / 199)),
    a = [[0, 50, 3.1], [49, 100, 2.6], [99, 150, 2.1], [149, 199, 1.6]],
    i = vt(s),
    c = [[361, 155, 228, 2.1], [504, 121, 200, 2.1], [395, 233, 325, 3.4], [772, 74, 228, 2.1], [825, 131, 149, 1.5], [832, 197, 280, 2.5], [787, 291, 441, 4.2], [595, 122, 150, 1.2]],
    d = !Ae();
  return t.jsxs(t.Fragment, {
    children: [t.jsx("canvas", {
      ref: n,
      className: "tr-canvas"
    }), t.jsxs(ke, {
      w: lt.w,
      h: lt.h,
      children: [t.jsx("defs", {
        children: t.jsxs("radialGradient", {
          id: "tr-sky",
          cx: "50%",
          cy: "50%",
          r: "50%",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#1f5fff",
            stopOpacity: "0.42"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#1f5fff",
            stopOpacity: "0"
          })]
        })
      }), t.jsx("ellipse", {
        cx: "650",
        cy: "110",
        rx: "250",
        ry: "95",
        fill: "url(#tr-sky)"
      }), c.map(([h, f, m, g], x) => t.jsxs("g", {
        className: "tr-pin",
        style: {
          "--n": x
        },
        children: [t.jsx("line", {
          x1: h,
          x2: h,
          y1: f,
          y2: m
        }), t.jsx("circle", {
          cx: h,
          cy: f,
          r: g * 2.6,
          className: "halo"
        }), t.jsx("circle", {
          cx: h,
          cy: f,
          r: g,
          className: "cap"
        })]
      }, x)), t.jsx("path", {
        d: i,
        className: "tr-road glow"
      }), t.jsx("path", {
        d: i,
        className: "tr-road haze"
      }), a.map(([h, f, m]) => t.jsx("path", {
        d: vt(s.slice(h, f + 1)),
        className: "tr-road core",
        style: {
          strokeWidth: m
        }
      }, h)), d && [0, 1].map(h => t.jsx("circle", {
        r: "2.2",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "6s",
          begin: `-${h * 3}s`,
          repeatCount: "indefinite",
          path: i
        })
      }, h)), t.jsxs("g", {
        className: "tr-goal",
        children: [t.jsx("circle", {
          cx: "678",
          cy: "139",
          r: "34",
          className: "sky"
        }), [31, 23, 15].map((h, f) => t.jsx("circle", {
          cx: "678",
          cy: "139",
          r: h,
          className: `ring r${f}`
        }, h)), t.jsx("circle", {
          cx: "678",
          cy: "139",
          r: "6.5",
          className: "core"
        })]
      })]
    })]
  });
}

function z2({
  x: n,
  y: e,
  w: s,
  h: a,
  skew: i,
  lit: c = "right",
  i: d
}) {
  const f = i / s,
    m = `M${n} ${e + 6} Q${n} ${e} ${n + 6} ${e + 6 * f} L${n + s - 6} ${e + i - 6 * f} Q${n + s} ${e + i} ${n + s} ${e + i + 6} V${e + i + a - 6} Q${n + s} ${e + i + a} ${n + s - 6} ${e + i + a - 6 * f} L${n + 6} ${e + a + 6 * f} Q${n} ${e + a} ${n} ${e + a - 6} Z`,
    g = c === "right" ? `M${n + s} ${e + i + 6} V${e + i + a - 6}` : `M${n} ${e + 6} V${e + a - 6}`;
  return t.jsxs("g", {
    className: "cf-pane",
    style: {
      "--n": d
    },
    children: [t.jsx("rect", {
      x: n - 6,
      y: e + a + 18,
      width: s + 12,
      height: a * .5,
      className: "reflect"
    }), t.jsx("path", {
      d: m,
      className: "face"
    }), t.jsx("path", {
      d: m,
      className: "rim"
    }), t.jsx("path", {
      d: g,
      className: "edge"
    }), t.jsx("path", {
      d: `M${n + 6 + 2} ${e + 3 + 6 * f} L${n + s - 6 - 2} ${e + i + 3 - 6 * f}`,
      className: "shine"
    })]
  });
}

function CubeFlow() {
  const n = [-420, -200, 0, 150, 270, 348, 412, 474, 600, 716, 787, 845, 960, 1107],
    e = [200, 198, 196, 194, 192, 192, 190, 192, 194, 194, 195, 195, 195, 195],
    s = [250, 185, 122, 80, 40, 30, 22, 18, 24, 16, 13, 11, 7, 0],
    a = 44,
    i = Array.from({
      length: a
    }, (E, N) => {
      const C = N / (a - 1) * 2 - 1,
        Z = n.map((O, T) => [O, e[T] + C * s[T] + Math.sin(N * 2.3 + T * 1.1) * s[T] * .16]),
        L = D0(Z);
      return {
        i: N,
        d: vt(Array.from({
          length: 120
        }, (O, T) => L(T / 119))),
        at: L,
        f: C
      };
    }),
    c = D0(n.map((E, N) => [E, e[N]])),
    d = vt(Array.from({
      length: 120
    }, (E, N) => c(N / 119))),
    h = [];
  i.filter(E => E.i % 2 === 0).forEach(E => [.12, .24, .33, .47, .62, .78, .9].forEach((N, C) => {
    const [Z, L] = E.at((N + E.i * 37 % 11 * .007) % .97),
      O = (E.i + C) % 5 === 0 ? 2.6 : 1.3,
      T = (Z > 330 ? 26 : 12) + O * 2;
    Z > -60 && h.every(([I, z, B]) => Math.hypot(Z - I, L - z) > T + B * 2) && h.push([Z, L, O, (E.i + C) % 7]);
  }));
  const f = [[70, 116, 7], [150, 312, 9], [228, 266, 6], [262, 92, 6], [930, 114, 7], [1010, 148, 8], [1046, 276, 6], [884, 300, 7], [40, 210, 5]],
    m = !Ae(),
    [g, x, v] = [540, 137, 150],
    [j, A] = [g - 18, x - 15],
    M = [[581, 182], [611, 182], [581, 228], [611, 228]],
    b = [[648, 168], [648, 198], [648, 228]];
  return t.jsxs(ke, {
    w: 1200,
    h: 400,
    children: [t.jsxs("defs", {
      children: [t.jsxs("linearGradient", {
        id: "cf-glass",
        x1: "0",
        y1: "0",
        x2: "0.4",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#8fcbff",
          stopOpacity: "0.26"
        }), t.jsx("stop", {
          offset: "45%",
          stopColor: "#1f5fff",
          stopOpacity: "0.08"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#0b1d52",
          stopOpacity: "0.3"
        })]
      }), t.jsxs("linearGradient", {
        id: "cf-cube",
        x1: "0",
        y1: "0",
        x2: "0.3",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#8fcbff",
          stopOpacity: "0.2"
        }), t.jsx("stop", {
          offset: "55%",
          stopColor: "#1f5fff",
          stopOpacity: "0.14"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#3f8cff",
          stopOpacity: "0.32"
        })]
      }), t.jsxs("linearGradient", {
        id: "cf-top",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#cfeaff",
          stopOpacity: "0.28"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#3f8cff",
          stopOpacity: "0.12"
        })]
      }), t.jsxs("linearGradient", {
        id: "cf-ref",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#3f8cff",
          stopOpacity: "0.45"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#1f5fff",
          stopOpacity: "0"
        })]
      }), t.jsxs("radialGradient", {
        id: "cf-pool",
        cx: "50%",
        cy: "50%",
        r: "50%",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#8fcbff",
          stopOpacity: "0.85"
        }), t.jsx("stop", {
          offset: "40%",
          stopColor: "#3f8cff",
          stopOpacity: "0.45"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#1f5fff",
          stopOpacity: "0"
        })]
      }), t.jsxs("linearGradient", {
        id: "cf-fade",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#fff",
          stopOpacity: "0"
        }), t.jsx("stop", {
          offset: "18%",
          stopColor: "#fff",
          stopOpacity: "1"
        })]
      }), t.jsx("mask", {
        id: "cf-in",
        children: t.jsx("rect", {
          x: "-440",
          y: "-40",
          width: "1700",
          height: "480",
          fill: "url(#cf-fade)"
        })
      })]
    }), f.map(([E, N, C], Z) => t.jsx("rect", {
      x: E,
      y: N,
      width: C,
      height: C,
      rx: "1.5",
      className: "cf-bit",
      style: {
        "--n": Z
      }
    }, Z)), t.jsx("ellipse", {
      cx: 618,
      cy: 292,
      rx: 270,
      ry: 46,
      className: "cf-floor"
    }), t.jsx("ellipse", {
      cx: 618,
      cy: 292,
      rx: 180,
      ry: 30,
      className: "cf-floor"
    }), t.jsx("ellipse", {
      cx: 618,
      cy: 292,
      rx: 100,
      ry: 16,
      className: "cf-floor"
    }), t.jsx("ellipse", {
      cx: 612,
      cy: 290,
      rx: 150,
      ry: 22,
      fill: "url(#cf-pool)",
      className: "cf-pool"
    }), t.jsxs("g", {
      mask: "url(#cf-in)",
      children: [t.jsx("path", {
        d,
        className: "cf-glow"
      }), i.map(({
        i: E,
        d: N,
        f: C
      }) => t.jsx("path", {
        d: N,
        className: `cf-strand${E % 6 === 3 ? " lit" : ""}`,
        style: {
          opacity: .3 + .7 * (1 - Math.abs(C)) ** .7
        }
      }, E)), h.map(([E, N, C, Z], L) => t.jsx("circle", {
        cx: E,
        cy: N,
        r: C,
        className: `cf-bead${C > 2 ? " big" : ""}`,
        style: {
          "--n": Z
        }
      }, L)), m && [4, 13, 22, 31, 40].map((E, N) => t.jsx("circle", {
        r: "2.2",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "6s",
          begin: `-${N * 1.2}s`,
          repeatCount: "indefinite",
          path: i[E].d
        })
      }, E))]
    }), t.jsx(z2, {
      x: 318,
      y: 100,
      w: 60,
      h: 176,
      skew: 8,
      lit: "right",
      i: 0
    }), t.jsx(z2, {
      x: 448,
      y: 94,
      w: 52,
      h: 172,
      skew: 6,
      lit: "right",
      i: 1
    }), t.jsxs("g", {
      className: "cf-cube",
      children: [t.jsx("rect", {
        x: g - 14,
        y: x + v + 10,
        width: v + 28,
        height: 70,
        fill: "url(#cf-ref)",
        className: "cf-reflect"
      }), t.jsx("rect", {
        x: j,
        y: A,
        width: v,
        height: v,
        className: "cf-back"
      }), t.jsx("path", {
        d: `M${j} ${A + v} L${g} ${x + v} M${j} ${A + v} V${A}`,
        className: "cf-edge back"
      }), t.jsx("path", {
        d: `M${b[0][0]} ${b[0][1]} V${b[2][1]} M${M[1][0]} ${M[1][1]} L${b[0][0]} ${b[0][1]} M${M[3][0]} ${M[3][1]} L${b[2][0]} ${b[2][1]} M${M[0][0]} ${M[0][1]} H${M[1][0]} V${M[3][1]} H${M[0][0]} Z M${M[0][0]} ${M[0][1]} L${M[3][0]} ${M[3][1]}`,
        className: "cf-wire"
      }), b.map(([E, N], C) => t.jsx("circle", {
        cx: E,
        cy: N,
        r: "2.8",
        className: "cf-dot deep",
        style: {
          "--n": C + 4
        }
      }, `d${C}`)), t.jsx("polygon", {
        points: Cs([[j, A], [j + v, A], [g + v, x], [g, x]]),
        fill: "url(#cf-top)",
        className: "cf-top"
      }), t.jsx("polygon", {
        points: Cs([[j + v, A], [g + v, x], [g + v, x + v], [j + v, A + v]]),
        className: "cf-side"
      }), t.jsx("rect", {
        x: g,
        y: x,
        width: v,
        height: v,
        rx: "3",
        fill: "url(#cf-cube)",
        className: "cf-face"
      }), t.jsx("path", {
        d: `M${j} ${A} L${g} ${x} M${j + v} ${A} L${g + v} ${x} M${j} ${A} H${j + v}`,
        className: "cf-edge"
      }), M.map(([E, N], C) => t.jsxs("g", {
        className: "cf-node",
        style: {
          "--n": C
        },
        children: [t.jsx("circle", {
          cx: E,
          cy: N,
          r: "11",
          className: "halo"
        }), t.jsx("circle", {
          cx: E,
          cy: N,
          r: "5",
          className: "cf-dot"
        })]
      }, `l${C}`)), t.jsx("path", {
        d: `M${g + 4} ${x + 1} H${g + v - 4} M${g + v} ${x + 4} V${x + v - 4}`,
        className: "cf-shine"
      }), t.jsx("ellipse", {
        cx: g + v / 2,
        cy: x + v + 1,
        rx: v * .46,
        ry: 6,
        className: "cf-base"
      })]
    }), t.jsx(z2, {
      x: 714,
      y: 92,
      w: 70,
      h: 172,
      skew: 7,
      lit: "left",
      i: 2
    }), t.jsx(z2, {
      x: 813,
      y: 112,
      w: 64,
      h: 154,
      skew: 8,
      lit: "left",
      i: 3
    }), t.jsxs("g", {
      className: "cf-goal",
      children: [t.jsx("circle", {
        cx: 1107,
        cy: 195,
        r: 40,
        className: "glow"
      }), [78, 62].map(E => t.jsx("circle", {
        cx: 1107,
        cy: 195,
        r: E,
        className: "ring faint"
      }, E)), t.jsx("circle", {
        cx: 1107,
        cy: 195,
        r: 46,
        className: "ring dots"
      }), [26, 16].map(E => t.jsx("circle", {
        cx: 1107,
        cy: 195,
        r: E,
        className: "ring"
      }, E)), t.jsx("circle", {
        cx: 1107,
        cy: 195,
        r: "8",
        className: "core"
      })]
    })]
  });
}

function Ny({
  w: n,
  h: e,
  horizon: s,
  cx: a,
  rows: i = 9,
  cols: c = 24,
  id: d
}) {
  const h = [],
    f = [],
    m = g => s + (e - s) * (g / i) ** 1.8;
  for (let g = 1; g <= i; g += 1) h.push(`M0 ${m(g).toFixed(1)} H${n}`);
  for (let g = -c; g <= c; g += 1) {
    const x = a + g * (n / c) * 1.6;
    h.push(`M${a + g * 6} ${s} L${x.toFixed(1)} ${e}`);
    for (let v = 2; v <= i; v += 2) {
      const j = m(v),
        A = a + g * 6 + (x - a - g * 6) * ((j - s) / (e - s));
      A > 0 && A < n && f.push(`M${A.toFixed(1)} ${j.toFixed(1)}h0`);
    }
  }
  return t.jsxs(t.Fragment, {
    children: [t.jsxs("defs", {
      children: [t.jsxs("linearGradient", {
        id: `${d}-fade`,
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#fff",
          stopOpacity: "0"
        }), t.jsx("stop", {
          offset: "0.6",
          stopColor: "#fff",
          stopOpacity: "0.9"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#fff",
          stopOpacity: "0.5"
        })]
      }), t.jsx("mask", {
        id: `${d}-floor`,
        children: t.jsx("rect", {
          x: "0",
          y: s,
          width: n,
          height: e - s,
          fill: `url(#${d}-fade)`
        })
      })]
    }), t.jsxs("g", {
      mask: `url(#${d}-floor)`,
      children: [t.jsx("path", {
        d: h.join(" "),
        className: "ex-floor"
      }), t.jsx("path", {
        d: f.join(""),
        className: "ex-floor-dots"
      })]
    })]
  });
}

function HappyPath() {
  const n = Array.from({
      length: 8
    }, (d, h) => ({
      x: 214 + h * 80,
      base: 396 - h * 13,
      h: 70 + h * 34,
      w: 50,
      skew: -10 - h
    })),
    e = D0([[40, 430], [150, 400], [260, 352], [350, 290], [430, 236], [505, 208], [575, 214], [640, 246], [700, 262], [760, 238], [815, 186], [852, 146]]),
    s = Array.from({
      length: 160
    }, (d, h) => e(h / 159)),
    a = vt(s),
    i = s[s.length - 1],
    c = !Ae();
  return t.jsxs(ke, {
    w: 892,
    h: 441,
    children: [t.jsx("defs", {
      children: t.jsxs("linearGradient", {
        id: "hp-glass",
        x1: "0",
        y1: "0",
        x2: "0.5",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#8fcbff",
          stopOpacity: "0.24"
        }), t.jsx("stop", {
          offset: "50%",
          stopColor: "#1f5fff",
          stopOpacity: "0.08"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#0b1d52",
          stopOpacity: "0.3"
        })]
      })
    }), t.jsx(Ny, {
      w: 892,
      h: 441,
      horizon: 300,
      cx: 560,
      id: "hp"
    }), n.map(({
      x: d,
      base: h,
      h: f,
      w: m,
      skew: g
    }, x) => {
      const v = h - f,
        j = `M${d} ${h} V${v} L${d + m} ${v + g} V${h + g} Z`;
      return t.jsxs("g", {
        className: "hp-pane",
        style: {
          "--n": x
        },
        children: [t.jsx("path", {
          d: j,
          className: "face"
        }), t.jsx("path", {
          d: `M${d} ${h} V${v} L${d + m} ${v + g}`,
          className: "rim"
        }), t.jsx("path", {
          d: `M${d + m} ${v + g} V${h + g}`,
          className: "edge"
        }), t.jsx("circle", {
          cx: d + m,
          cy: v + g,
          r: "1.8",
          className: "tip"
        })]
      }, x);
    }), t.jsx("path", {
      d: a,
      className: "hp-line glow"
    }), t.jsx("path", {
      d: a,
      className: "hp-line haze"
    }), t.jsx("path", {
      d: a,
      className: "hp-line core"
    }), c && [0, 1].map(d => t.jsx("circle", {
      r: "2.4",
      className: "hs-dot",
      children: t.jsx("animateMotion", {
        dur: "5.5s",
        begin: `-${d * 2.75}s`,
        repeatCount: "indefinite",
        path: a
      })
    }, d)), t.jsxs("g", {
      className: "hp-end",
      children: [t.jsx("circle", {
        cx: i[0],
        cy: i[1],
        r: "16",
        className: "halo"
      }), t.jsx("circle", {
        cx: i[0],
        cy: i[1],
        r: "5",
        className: "core"
      })]
    })]
  });
}

const pZ = {
  doc: t.jsxs(t.Fragment, {
    children: [t.jsx("path", {
      d: "M-11 -15 H5 L12 -8 V15 H-11 Z"
    }), t.jsx("path", {
      d: "M5 -15 V-8 H12 M-5 -3 H6 M-5 3 H6 M-5 9 H2"
    })]
  }),
  db: t.jsxs(t.Fragment, {
    children: [t.jsx("ellipse", {
      cx: "0",
      cy: "-10",
      rx: "12",
      ry: "4.5"
    }), t.jsx("path", {
      d: "M-12 -10 V10 A12 4.5 0 0 0 12 10 V-10 M-12 -3 A12 4.5 0 0 0 12 -3 M-12 4 A12 4.5 0 0 0 12 4"
    })]
  }),
  net: t.jsxs(t.Fragment, {
    children: [t.jsx("circle", {
      cx: "-8",
      cy: "-9",
      r: "4"
    }), t.jsx("circle", {
      cx: "9",
      cy: "-4",
      r: "4"
    }), t.jsx("circle", {
      cx: "-4",
      cy: "10",
      r: "4"
    }), t.jsx("circle", {
      cx: "10",
      cy: "11",
      r: "3"
    }), t.jsx("path", {
      d: "M-5 -6 L6 -5 M-7 -5 L-5 6 M7 -1 L-1 8 M0 11 H7"
    })]
  }),
  people: t.jsxs(t.Fragment, {
    children: [t.jsx("circle", {
      cx: "-5",
      cy: "-6",
      r: "5"
    }), t.jsx("circle", {
      cx: "8",
      cy: "-4",
      r: "4"
    }), t.jsx("path", {
      d: "M-15 11 A10 8 0 0 1 5 11 Z M4 3 A8 7 0 0 1 16 11 H7"
    })]
  }),
  shield: t.jsxs(t.Fragment, {
    children: [t.jsx("path", {
      d: "M0 -14 L12 -7 V7 L0 14 L-12 7 V-7 Z",
      className: "fill"
    }), t.jsx("path", {
      d: "M-5 0 L-1 4 L6 -4",
      className: "tick"
    })]
  })
};

function CaseChain() {
  const n = {
      w: 86,
      h: 118,
      skew: 14
    },
    e = [["doc", 60, 172], ["db", 210, 158], ["net", 360, 144], ["people", 510, 130], ["shield", 660, 116]],
    s = ([, j, A]) => [j + n.w / 2, A + n.skew / 2 - 4],
    a = ([, j, A]) => [j + n.w / 2, A + n.h / 2 + n.skew / 2],
    [i, c] = [s(e[2]), s(e[4])],
    d = `M${e[0][1] + 64} ${e[0][2] + 8} C170 40 300 14 ${i[0]} ${i[1]}`,
    h = `M${i[0]} ${i[1]} C470 -10 560 0 600 50 S660 ${c[1] - 6} ${c[0]} ${c[1]}`,
    f = `M${e[1][1] + 52} ${e[1][2] + 6} C300 70 340 104 ${i[0]} ${i[1]}`,
    [m, g] = a(e[4]),
    x = (j, A) => `M${j} ${A + 7} Q${j} ${A} ${j + 7} ${A + 1} L${j + n.w - 7} ${A + n.skew - 1} Q${j + n.w} ${A + n.skew} ${j + n.w} ${A + n.skew + 7} V${A + n.skew + n.h - 7} Q${j + n.w} ${A + n.skew + n.h} ${j + n.w - 7} ${A + n.skew + n.h - 1} L${j + 7} ${A + n.h + 1} Q${j} ${A + n.h} ${j} ${A + n.h - 7} Z`,
    v = !Ae();
  return t.jsxs(ke, {
    w: 800,
    h: 330,
    children: [t.jsxs("defs", {
      children: [t.jsxs("linearGradient", {
        id: "cc-glass",
        x1: "0",
        y1: "0",
        x2: "0.7",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#ffffff",
          stopOpacity: "0.16"
        }), t.jsx("stop", {
          offset: "42%",
          stopColor: "#ffffff",
          stopOpacity: "0.05"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#6eaaff",
          stopOpacity: "0.12"
        })]
      }), t.jsxs("linearGradient", {
        id: "cc-hot",
        x1: "0",
        y1: "0",
        x2: "0.7",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#a0d4ff",
          stopOpacity: "0.46"
        }), t.jsx("stop", {
          offset: "50%",
          stopColor: "#3f8cff",
          stopOpacity: "0.28"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#1f5fff",
          stopOpacity: "0.34"
        })]
      }), t.jsxs("linearGradient", {
        id: "cc-ref",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0%",
          stopColor: "#3f8cff",
          stopOpacity: "0.4"
        }), t.jsx("stop", {
          offset: "100%",
          stopColor: "#3f8cff",
          stopOpacity: "0"
        })]
      })]
    }), t.jsx(Ny, {
      w: 800,
      h: 330,
      horizon: 165,
      cx: 450,
      rows: 8,
      id: "cc"
    }), [[24, 50, 250], [140, 16, 220], [560, 6, 150], [772, 30, 210]].map(([j, A, M], b) => t.jsx("line", {
      x1: j,
      x2: j,
      y1: A,
      y2: M,
      className: "cc-streak",
      style: {
        "--n": b
      }
    }, j)), t.jsx("path", {
      d,
      className: "cc-arc"
    }), t.jsx("path", {
      d: f,
      className: "cc-arc dots"
    }), t.jsx("path", {
      d: h,
      className: "cc-arc"
    }), [[110, 70], [170, 36], [262, 22], [470, 14], [552, 30]].map(([j, A], M) => t.jsx("circle", {
      cx: j,
      cy: A,
      r: "2.2",
      className: "cc-bead",
      style: {
        "--n": M
      }
    }, j)), [86, 68, 52].map((j, A) => t.jsx("ellipse", {
      cx: m,
      cy: g,
      rx: j,
      ry: j * 1.05,
      className: `cc-ring${A === 1 ? " dots" : ""}`
    }, j)), e.slice(0, -1).map((j, A) => {
      const [M, b] = a(j),
        [E, N] = a(e[A + 1]);
      return t.jsx("path", {
        d: `M${M + n.w / 2 + 8} ${b + 4} L${E - n.w / 2 - 8} ${N - 4}`,
        className: "cc-link"
      }, A);
    }), e.map(([j, A, M], b) => {
      const E = j === "shield";
      return t.jsxs("g", {
        className: `cc-tile${E ? " hot" : ""}`,
        style: {
          "--n": b
        },
        children: [t.jsx("path", {
          d: `M${A - 2} ${M + n.h + n.skew + 12} h${n.w + 4} l0 52 h-${n.w + 4} Z`,
          className: "reflect"
        }), t.jsx("path", {
          d: x(A, M),
          className: "base"
        }), t.jsx("path", {
          d: x(A, M),
          fill: `url(#${E ? "cc-hot" : "cc-glass"})`,
          className: "face"
        }), t.jsx("path", {
          d: `M${A + 8} ${M + 1.5} L${A + n.w - 8} ${M + n.skew - 1.5}`,
          className: "rim"
        }), t.jsx("path", {
          d: `M${A + n.w} ${M + n.skew + 8} V${M + n.skew + n.h - 8}`,
          className: "edge"
        }), t.jsx("g", {
          transform: `translate(${A + n.w / 2} ${M + n.h / 2 + n.skew / 2}) scale(1.35)`,
          className: "ico",
          children: pZ[j]
        })]
      }, j);
    }), [i, c].map(([j, A]) => t.jsxs("g", {
      className: "cc-node",
      children: [t.jsx("circle", {
        cx: j,
        cy: A,
        r: "10",
        className: "halo"
      }), t.jsx("circle", {
        cx: j,
        cy: A,
        r: "3.8",
        className: "core"
      })]
    }, j)), v && [d, h].map((j, A) => t.jsx("circle", {
      r: "2.4",
      className: "hs-dot",
      children: t.jsx("animateMotion", {
        dur: "4.5s",
        begin: `-${A * 2.2}s`,
        repeatCount: "indefinite",
        path: j
      })
    }, A))]
  });
}

const gZ = ({
  kind: n
}) => t.jsx("svg", {
  viewBox: "0 0 40 40",
  className: "ts-glyph",
  "aria-hidden": "true",
  children: n === "agent" ? t.jsxs(t.Fragment, {
    children: [t.jsx("path", {
      d: "M20 3 L35 11.5 V28.5 L20 37 L5 28.5 V11.5 Z",
      className: "hex"
    }), t.jsx("circle", {
      cx: "20",
      cy: "17",
      r: "5.5",
      className: "ink"
    }), t.jsx("path", {
      d: "M11.5 29 a8.5 7 0 0 1 17 0 Z",
      className: "ink"
    }), t.jsx("path", {
      d: "M12 18 a8 8 0 0 1 16 0 M12 18 v3 M28 18 v3",
      className: "line"
    })]
  }) : t.jsxs(t.Fragment, {
    children: [t.jsx("ellipse", {
      cx: "20",
      cy: "9",
      rx: "13",
      ry: "5",
      className: "top"
    }), t.jsx("path", {
      d: "M7 9 V31 A13 5 0 0 0 33 31 V9",
      className: "body"
    }), t.jsx("path", {
      d: "M7 16.5 A13 5 0 0 0 33 16.5 M7 24 A13 5 0 0 0 33 24",
      className: "line"
    })]
  })
});

const l5 = [{
  title: "User experience",
  items: ["People", "Teams", "Applications"],
  logos: [["teams", "Microsoft Teams"], ["agent"], ["slack", "Slack"]]
}, {
  title: "Agentic layer",
  items: ["Models", "Tools", "Guardrails"],
  logos: [["openai", "OpenAI"], ["meta", "Meta"], ["anthropic", "Anthropic"], ["gemini", "Google Gemini"]]
}, {
  title: "Enterprise layer",
  items: ["Data", "Systems", "Security"],
  logos: [["db"], ["salesforce", "Salesforce"], ["sap", "SAP"], ["oracle", "Oracle"], ["microsoft", "Microsoft"]]
}];

function TechStack() {
  const n = [[300, 116, 336, 60, -6], [300, 284, 336, 62, -6]],
    [e, s] = [18, 170],
    a = ([x, v, j, A], M) => `M${x - j} ${v} A${j} ${A} 0 0 ${M} ${x + j} ${v}`,
    i = ([x, v,,, j]) => `rotate(${j} ${x} ${v})`,
    c = n.flatMap(([x, v, j,, A]) => {
      const [M, b] = [Math.sin(A * Math.PI / 180), Math.cos(A * Math.PI / 180)];
      return [[x - j * b, v - j * M], [x + j * b, v + j * M]];
    }),
    d = [];
  for (let x = 0; x < 6; x += 1) d.push([-20 + x * 13, 470 - x * 37 % 110]), d.push([620 - x * 13, 464 - x * 53 % 120]);
  const h = Array.from({
      length: 20
    }, (x, v) => [v * 97 % 680 - 40, 452 + v * 41 % 90]),
    f = [];
  for (let x = -14; x <= 14; x += 1) f.push(`M${300 + x * 26} 440 L${300 + x * 110} 600`);
  [452, 474, 504, 546, 600].forEach(x => f.push(`M-80 ${x} H680`));
  const m = [...new Set(c.map(([x]) => Math.round(x)))],
    g = !Ae();
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 600,
      h: 520,
      children: [t.jsxs("defs", {
        children: [t.jsxs("radialGradient", {
          id: "ts-bg",
          cx: "50%",
          cy: "50%",
          r: "50%",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#1f5fff",
            stopOpacity: "0.4"
          }), t.jsx("stop", {
            offset: "60%",
            stopColor: "#1f5fff",
            stopOpacity: "0.12"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#1f5fff",
            stopOpacity: "0"
          })]
        }), t.jsxs("linearGradient", {
          id: "ts-fade",
          x1: "0",
          y1: "0",
          x2: "0",
          y2: "1",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#fff",
            stopOpacity: "0"
          }), t.jsx("stop", {
            offset: "0.3",
            stopColor: "#fff",
            stopOpacity: "1"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0.3"
          })]
        }), t.jsx("mask", {
          id: "ts-floor",
          children: t.jsx("rect", {
            x: "-80",
            y: "430",
            width: "760",
            height: "170",
            fill: "url(#ts-fade)"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "300",
        cy: "250",
        rx: "420",
        ry: "300",
        fill: "url(#ts-bg)"
      }), t.jsxs("g", {
        mask: "url(#ts-floor)",
        children: [t.jsx("path", {
          d: f.join(" "),
          className: "ts-floor"
        }), h.map(([x, v], j) => t.jsx("circle", {
          cx: x,
          cy: v,
          r: j % 5 ? 1.2 : 2,
          className: "ts-floor-spark",
          style: {
            "--n": j % 9
          }
        }, j))]
      }), d.map(([x, v], j) => t.jsx("line", {
        x1: x,
        x2: x,
        y1: v,
        y2: 530,
        className: "ts-pillar",
        style: {
          "--n": j % 9
        }
      }, j)), m.map(x => t.jsx("line", {
        x1: x,
        x2: x,
        y1: 60,
        y2: 500,
        className: "ts-guide"
      }, x)), n.map(x => t.jsx("path", {
        d: a(x, 1),
        transform: i(x),
        className: "ts-ring back"
      }, x[1])), g && n.map((x, v) => t.jsx("circle", {
        r: "2.6",
        className: "hs-dot",
        transform: i(x),
        children: t.jsx("animateMotion", {
          dur: "6s",
          begin: `-${v * 2}s`,
          repeatCount: "indefinite",
          path: a(x, 1)
        })
      }, x[1]))]
    }), t.jsx("div", {
      className: "ts-stack",
      children: l5.map((x, v) => t.jsxs("div", {
        className: `ts-panel${v === l5.length - 1 ? " last" : ""}`,
        style: {
          "--i": v,
          top: e + v * s
        },
        children: [t.jsx("strong", {
          children: x.title
        }), x.items && t.jsx("span", {
          className: "ts-items",
          children: x.items.map((j, A) => t.jsxs("span", {
            children: [A > 0 && t.jsx("i", {
              children: "·"
            }), j]
          }, j))
        }), t.jsx("span", {
          className: "ts-logos",
          children: x.logos.map(([j, A]) => t.jsx("span", {
            className: "ts-tile",
            children: A ? t.jsx("img", {
              src: `/svg/logos/${j}.svg`,
              alt: A,
              className: `ts-logo ${j}`
            }) : t.jsx(gZ, {
              kind: j === "agent" ? "agent" : "db"
            })
          }, j))
        })]
      }, x.title))
    }), t.jsxs("svg", {
      className: "hs-svg ts-front",
      viewBox: "0 0 600 520",
      "aria-hidden": "true",
      children: [n.map(x => t.jsx("path", {
        d: a(x, 0),
        transform: i(x),
        className: "ts-ring glow"
      }, x[1])), n.map(x => t.jsx("path", {
        d: a(x, 0),
        transform: i(x),
        className: "ts-ring"
      }, x[1])), g && n.map((x, v) => t.jsx("circle", {
        r: "3",
        className: "hs-dot",
        transform: i(x),
        children: t.jsx("animateMotion", {
          dur: "6s",
          begin: `-${v * 2 + 3}s`,
          repeatCount: "indefinite",
          path: a(x, 0)
        })
      }, x[1])), c.map(([x, v], j) => t.jsxs("g", {
        className: "ts-node",
        style: {
          "--n": j
        },
        children: [t.jsx("circle", {
          cx: x,
          cy: v,
          r: "11",
          className: "halo"
        }), t.jsx("circle", {
          cx: x,
          cy: v,
          r: "4.2",
          className: "core"
        })]
      }, `${x}-${v}`))]
    })]
  });
}

const yZ = ({
  kind: n
}) => t.jsxs("svg", {
  viewBox: "0 0 40 40",
  className: "hb-glyph",
  "aria-hidden": "true",
  children: [t.jsx("defs", {
    children: t.jsxs("linearGradient", {
      id: `hb-g-${n}`,
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1",
      children: [t.jsx("stop", {
        offset: "0",
        stopColor: "#8fcbff"
      }), t.jsx("stop", {
        offset: "1",
        stopColor: "#1f5fff"
      })]
    })
  }), n === "cloud" && t.jsxs(t.Fragment, {
    children: [t.jsx("path", {
      d: "M12 30 a8 8 0 0 1 -1 -15.9 a10 10 0 0 1 19.3 3 a6.5 6.5 0 0 1 -0.8 12.9 Z",
      fill: `url(#hb-g-${n})`
    }), t.jsx("path", {
      d: "M20 15 L25.5 25 H14.5 Z",
      fill: "#fff"
    })]
  }), n === "cube" && t.jsxs(t.Fragment, {
    children: [t.jsx("path", {
      d: "M20 5 L34 12.5 V27.5 L20 35 L6 27.5 V12.5 Z",
      fill: `url(#hb-g-${n})`
    }), t.jsx("path", {
      d: "M20 5 V20 M6 12.5 L20 20 L34 12.5 M20 20 V35",
      className: "edge"
    }), t.jsx("path", {
      d: "M13 16 L20 12 L27 16 V24 L20 28 L13 24 Z",
      className: "edge"
    })]
  }), n === "user" && t.jsxs(t.Fragment, {
    children: [t.jsx("circle", {
      cx: "20",
      cy: "20",
      r: "15",
      fill: `url(#hb-g-${n})`
    }), t.jsx("circle", {
      cx: "20",
      cy: "16",
      r: "5",
      fill: "#fff"
    }), t.jsx("path", {
      d: "M11.5 29 a8.5 7 0 0 1 17 0",
      fill: "#fff"
    })]
  }), n === "list" && t.jsx("path", {
    d: "M8 11 H32 M8 20 H32 M8 29 H24",
    stroke: `url(#hb-g-${n})`,
    strokeWidth: "5",
    strokeLinecap: "round"
  }), n === "gear" && t.jsxs(t.Fragment, {
    children: [t.jsx("path", {
      d: "M20 4 l3 4.5 5.2-1.4 1 5.3 5.2 1.5 -1.6 5.1 3.6 4 -4.4 3 1 5.3 -5.3.6 -1.7 5.1 -5-2 -4 3.6 -3-4.4 -5.3 .9 -.5-5.3 -5.1-1.7 2-5 -3.6-4 4.4-3 -.9-5.3 5.3-.5 1.7-5.1 5 2 Z",
      fill: `url(#hb-g-${n})`,
      transform: "translate(20 20) scale(0.92) translate(-20 -20)"
    }), t.jsx("circle", {
      cx: "20",
      cy: "20",
      r: "5.5",
      fill: "#06122e"
    })]
  }), n === "tree" && t.jsxs(t.Fragment, {
    children: [t.jsx("circle", {
      cx: "20",
      cy: "9",
      r: "4",
      fill: "none",
      stroke: `url(#hb-g-${n})`,
      strokeWidth: "2.6"
    }), t.jsx("path", {
      d: "M20 13 V20 M10 27 V20 H30 V27",
      fill: "none",
      stroke: `url(#hb-g-${n})`,
      strokeWidth: "2.6"
    }), t.jsx("circle", {
      cx: "10",
      cy: "30",
      r: "3.5",
      fill: "#8fcbff"
    }), t.jsx("circle", {
      cx: "20",
      cy: "30",
      r: "3.5",
      fill: "#8fcbff"
    }), t.jsx("circle", {
      cx: "30",
      cy: "30",
      r: "3.5",
      fill: "#8fcbff"
    })]
  })]
});

const vZ = [{
  title: "Your applications",
  side: "l",
  y: 96,
  tiles: [["teams", "Microsoft Teams"], ["slack", "Slack"], ["cloud"], ["cube"]]
}, {
  title: "Enterprise data and systems",
  side: "l",
  y: 386,
  tiles: [["salesforce", "Salesforce"], ["sap", "SAP"], ["oracle", "Oracle"], ["microsoft", "Microsoft"]]
}, {
  title: "Models and tools",
  side: "r",
  y: 96,
  tiles: [["openai", "OpenAI"], ["meta", "Meta"], ["anthropic", "Anthropic"], ["gemini", "Google Gemini"]]
}, {
  title: "Agent orchestration",
  side: "r",
  y: 386,
  tiles: [["user"], ["list"], ["gear"], ["tree"]]
}];

function Hub() {
  const [n, e, s] = [500, 290, 92],
    a = [[[350, 162], [n - s * .8, e - s * .6]], [[350, 452], [n - s * .8, e + s * .6]], [[650, 162], [n + s * .8, e - s * .6]], [[650, 452], [n + s * .8, e + s * .6]]],
    i = ([d, h], [f, m]) => [-4, 4].map(g => {
      const x = (d + f) / 2;
      return `M${d} ${h + g} C${x} ${h + g} ${x} ${m + g * .6} ${f} ${m + g * .4}`;
    }),
    c = !Ae();
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 1e3,
      h: 620,
      children: [t.jsx("defs", {
        children: t.jsxs("radialGradient", {
          id: "hb-bg",
          cx: "50%",
          cy: "50%",
          r: "50%",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#1f5fff",
            stopOpacity: "0.22"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#1f5fff",
            stopOpacity: "0"
          })]
        })
      }), t.jsx("ellipse", {
        cx: n,
        cy: e,
        rx: "420",
        ry: "280",
        fill: "url(#hb-bg)"
      }), [120, 220, 340].map((d, h) => t.jsx("ellipse", {
        cx: n,
        cy: "470",
        rx: d,
        ry: d * .18,
        className: `hb-floor${h ? " dash" : ""}`
      }, d)), a.map(([d, h], f) => i(d, h).map((m, g) => t.jsxs("g", {
        children: [t.jsx("path", {
          d: m,
          className: `hb-wire${g ? "" : " lit"}`
        }), c && g === 0 && t.jsx("circle", {
          r: "2.4",
          className: "hs-dot",
          children: t.jsx("animateMotion", {
            dur: "3.2s",
            begin: `-${f * .8}s`,
            repeatCount: "indefinite",
            path: m
          })
        })]
      }, `${f}-${g}`))), a.map(([[d, h], [f, m]], g) => t.jsxs("g", {
        children: [t.jsx("circle", {
          cx: d,
          cy: h,
          r: "3",
          className: "hb-end"
        }), t.jsx("circle", {
          cx: f,
          cy: m,
          r: "3",
          className: "hb-end"
        })]
      }, g))]
    }), t.jsxs("div", {
      className: "hb-orb",
      style: {
        left: n,
        top: e,
        width: s * 2,
        height: s * 2
      },
      children: [t.jsx("span", {
        className: "hb-orb-glow",
        "aria-hidden": "true"
      }), t.jsxs("div", {
        className: "orb-glass hb-orb-glass",
        children: [t.jsx("span", {
          className: "orb-swirl",
          "aria-hidden": "true"
        }), t.jsx("span", {
          className: "orb-swirl two",
          "aria-hidden": "true"
        }), t.jsxs("div", {
          className: "hb-orb-body",
          children: [t.jsxs("svg", {
            viewBox: "0 0 216 216",
            className: "hb-mark",
            "aria-hidden": "true",
            children: [t.jsx("path", {
              d: "M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818"
            }), t.jsx("path", {
              d: "M149.331 49.43c3.878-5.725 11.784-7.192 16.743-2.374a83.9 83.9 0 0 1 16.658 22.862c6.146 12.379 9.2 26.125 8.889 40.01s-3.978 27.473-10.672 39.549a83.6 83.6 0 0 1-17.652 22.045c-5.177 4.588-13.01 2.758-16.626-3.138-3.507-5.719-1.682-13.113 3.088-17.831a59 59 0 0 0 10.101-13.342 60.26 60.26 0 0 0 7.516-27.853 60.35 60.35 0 0 0-6.261-28.178 59.2 59.2 0 0 0-9.517-13.83c-4.543-4.92-6.025-12.376-2.267-17.92"
            }), t.jsx("path", {
              d: "M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z"
            }), t.jsx("rect", {
              width: "20.488",
              height: "57.366",
              x: "97.293",
              y: "122.341",
              rx: "10.244"
            })]
          }), t.jsx("span", {
            className: "hb-word",
            children: "Intellient"
          })]
        })]
      })]
    }), vZ.map((d, h) => t.jsxs("div", {
      className: `hb-panel ${d.side}`,
      style: {
        "--i": h,
        top: d.y
      },
      children: [t.jsx("strong", {
        children: d.title
      }), t.jsx("div", {
        className: "hb-tiles",
        children: d.tiles.map(([f, m]) => t.jsx("span", {
          className: "hb-tile",
          children: m ? t.jsx("img", {
            src: `/svg/logos/${f}.svg`,
            alt: m,
            className: `hb-logo ${f}`
          }) : t.jsx(yZ, {
            kind: f
          })
        }, f))
      })]
    }, d.title))]
  });
}

const o5 = [["Business data", "CRM · ERP · Databases", wn], ["Documents", "Policies · SOPs · Knowledge", Qe], ["People & experience", "Teams · Expertise · Decisions", St], ["Systems & tools", "Apps · Configurations · Access", Jr], ["Measurements", "Metrics · KPIs · Outcomes", B0]];

const wZ = [["Outcome", "What should change?", oo], ["Operating reality", "Where are we today?", Qe], ["Future state", "What will this work look like?", ir], ["Value baseline", "How will we measure it?", B0]];

function Funnel() {
  const n = [437, 300],
    e = o5.map((i, c) => 104 + c * 98),
    s = e.map(i => `M292 ${i} C352 ${i} 360 ${n[1]} 404 ${n[1]}`),
    a = !Ae();
  return t.jsxs("div", {
    className: "bp-3d",
    children: [t.jsxs(ke, {
      w: 1e3,
      h: 600,
      children: [t.jsxs("defs", {
        children: [t.jsxs("radialGradient", {
          id: "bp-bg",
          cx: "50%",
          cy: "50%",
          r: "50%",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#1f5fff",
            stopOpacity: "0.32"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#1f5fff",
            stopOpacity: "0"
          })]
        }), t.jsxs("linearGradient", {
          id: "bp-orbit",
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "0",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#3f8cff",
            stopOpacity: "0"
          }), t.jsx("stop", {
            offset: "0.25",
            stopColor: "#3f8cff"
          }), t.jsx("stop", {
            offset: "0.75",
            stopColor: "#3f8cff",
            stopOpacity: "0.5"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#8fcbff"
          })]
        })]
      }), t.jsx("ellipse", {
        cx: "640",
        cy: "300",
        rx: "460",
        ry: "300",
        fill: "url(#bp-bg)"
      }), t.jsx("path", {
        d: "M-40 470 A540 105 0 0 0 1040 450",
        className: "bp-arc",
        stroke: "url(#bp-orbit)"
      }), s.map((i, c) => t.jsxs("g", {
        children: [t.jsx("path", {
          d: i,
          className: "bp-wire glow"
        }), t.jsx("path", {
          d: i,
          className: `bp-wire${c === 2 ? " lit" : ""}`
        }), a && t.jsx("circle", {
          r: "2.6",
          className: "hs-dot",
          children: t.jsx("animateMotion", {
            dur: "2.6s",
            begin: `-${c * .5}s`,
            repeatCount: "indefinite",
            path: i
          })
        })]
      }, i)), e.map(i => t.jsx("circle", {
        cx: "292",
        cy: i,
        r: "3.4",
        className: "bp-end"
      }, i)), t.jsx("path", {
        d: `M${n[0]} ${n[1]} H612`,
        className: "bp-beam glow"
      }), t.jsx("path", {
        d: `M${n[0]} ${n[1]} H612`,
        className: "bp-beam"
      }), [0, 1, 2].map(i => t.jsx("circle", {
        cx: 512 + i * 26,
        cy: n[1],
        r: "3.4",
        className: "bp-end"
      }, i))]
    }), o5.map(([i, c, d], h) => t.jsxs("div", {
      className: "bp-source",
      style: {
        top: e[h] - 37,
        "--i": h
      },
      children: [t.jsx("span", {
        className: "bp-ico fill",
        children: t.jsx(d, {
          weight: "fill"
        })
      }), t.jsxs("span", {
        children: [t.jsx("strong", {
          children: i
        }), t.jsx("em", {
          children: c
        })]
      })]
    }, i)), t.jsx("div", {
      className: "bp-col",
      children: [Qe, ir, Jr, B0].map((i, c) => t.jsx("span", {
        className: `bp-ico${c === 1 ? " hot" : ""}`,
        children: t.jsx(i, {
          weight: "duotone"
        })
      }, c))
    }), [0, 1, 2].map(i => t.jsx("span", {
      className: "bp-strip",
      style: {
        left: 494 + i * 26,
        "--k": i
      }
    }, i)), t.jsx("span", {
      className: "bp-plinth"
    }), [2, 1].map(i => t.jsx("span", {
      className: "bp-pane",
      style: {
        "--k": i
      }
    }, i)), t.jsxs("div", {
      className: "bp-panel",
      children: [t.jsx("span", {
        className: "bp-kicker",
        children: "AIR Audit / Blueprint"
      }), wZ.map(([i, c, d]) => t.jsxs("div", {
        className: "bp-row",
        children: [t.jsx("span", {
          className: "bp-ring",
          children: t.jsx(d, {
            weight: "bold"
          })
        }), t.jsxs("span", {
          children: [t.jsx("strong", {
            children: i
          }), t.jsx("em", {
            children: c
          })]
        }), t.jsx(fi, {
          className: "bp-caret",
          weight: "bold"
        })]
      }, i))]
    })]
  });
}

function Optional() {
  const n = [1010, 502],
    e = [[[-40, 262], [300, 280], [520, 336], [700, 400], [820, 440], [910, 472], n], [[-40, 300], [380, 322], [620, 356], [780, 412], [870, 452], [920, 478], n], [[-40, 340], [300, 346], [520, 392], [720, 434], [850, 466], [920, 486], n], [[-40, 486], [250, 490], [460, 444], [640, 396], [770, 420], [880, 470], [930, 492], n], [[-40, 562], [300, 576], [560, 524], [760, 478], [870, 490], [930, 498], n], [[-40, 604], [400, 598], [690, 546], [840, 512], [930, 506], n]].map(d => vt(Array.from({
      length: 180
    }, (h, f) => D0(d)(f / 179)))),
    s = "M1010 502 C1036 507 1060 508 1096 508 C1334 508 1370 392 1600 390",
    a = [[337, 481, 598], [443, 308, 400], [564, 486, 578], [668, 298, 405], [771, 313, 425], [931, 330, 455], [1017, 418, 485], [1157, 457, 525], [1208, 362, 470], [1399, 486, 585], [1577, 518, 590], [1722, 483, 582]],
    i = [];
  for (let d = -36; d <= 36; d += 1) i.push(`M${1e3 + d * 24} 545 L${1e3 + d * 180} 729`);
  [550, 562, 580, 606, 642, 692].forEach(d => i.push(`M0 ${d} H2000`));
  const c = !Ae();
  return t.jsxs(ke, {
    w: 2e3,
    h: 729,
    children: [t.jsxs("defs", {
      children: [t.jsxs("linearGradient", {
        id: "op-tone",
        gradientUnits: "userSpaceOnUse",
        x1: "0",
        y1: "0",
        x2: "1000",
        y2: "0",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#e9f6ff",
          stopOpacity: "0.35"
        }), t.jsx("stop", {
          offset: "0.3",
          stopColor: "#e9f6ff"
        }), t.jsx("stop", {
          offset: "0.6",
          stopColor: "#8fcbff"
        }), t.jsx("stop", {
          offset: "0.85",
          stopColor: "#3f8cff"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#3f8cff"
        })]
      }), t.jsxs("linearGradient", {
        id: "op-core",
        gradientUnits: "userSpaceOnUse",
        x1: "960",
        y1: "0",
        x2: "1110",
        y2: "0",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#e9f6ff",
          stopOpacity: "0"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#e9f6ff"
        })]
      }), t.jsxs("radialGradient", {
        id: "op-floor",
        cx: "0.5",
        cy: "0",
        r: "0.6",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#fff"
        }), t.jsx("stop", {
          offset: "0.6",
          stopColor: "#fff",
          stopOpacity: "0.35"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#fff",
          stopOpacity: "0"
        })]
      }), t.jsx("mask", {
        id: "op-floor-m",
        children: t.jsx("rect", {
          x: "0",
          y: "545",
          width: "2000",
          height: "184",
          fill: "url(#op-floor)"
        })
      }), t.jsxs("radialGradient", {
        id: "op-pool",
        cx: "50%",
        cy: "50%",
        r: "50%",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#1f5fff",
          stopOpacity: "0.75"
        }), t.jsx("stop", {
          offset: "0.45",
          stopColor: "#1f5fff",
          stopOpacity: "0.28"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#1f5fff",
          stopOpacity: "0"
        })]
      })]
    }), t.jsx("ellipse", {
      cx: "1000",
      cy: "580",
      rx: "1000",
      ry: "150",
      fill: "url(#op-pool)"
    }), t.jsx("path", {
      d: i.join(" "),
      className: "op-floor",
      mask: "url(#op-floor-m)"
    }), a.map(([d, h, f], m) => t.jsxs("g", {
      className: "op-pin",
      style: {
        "--n": m % 7
      },
      children: [t.jsx("line", {
        x1: d,
        x2: d,
        y1: h,
        y2: f
      }), t.jsx("circle", {
        cx: d,
        cy: h,
        r: "4"
      })]
    }, d)), t.jsx("circle", {
      cx: "1610",
      cy: "385",
      r: "118",
      className: "op-halo-ring"
    }), t.jsx("ellipse", {
      cx: "930",
      cy: "488",
      rx: "170",
      ry: "46",
      className: "op-merge"
    }), e.map(d => t.jsx("path", {
      d,
      className: "op-band wide"
    }, `w${d}`)), e.map(d => t.jsx("path", {
      d,
      className: "op-band"
    }, `m${d}`)), e.map(d => t.jsx("path", {
      d,
      className: "op-thread"
    }, d)), t.jsx("path", {
      d: s,
      className: "op-main glow"
    }), t.jsx("path", {
      d: s,
      className: "op-main haze"
    }), t.jsx("path", {
      d: s,
      className: "op-main",
      stroke: "url(#op-core)"
    }), t.jsx("path", {
      d: "M1598 362 L1652 390 L1598 418 Z",
      className: "op-head"
    }), c && [0, 1].map(d => t.jsx("circle", {
      r: "4",
      className: "hs-dot",
      children: t.jsx("animateMotion", {
        dur: "5s",
        begin: `-${d * 2.5}s`,
        repeatCount: "indefinite",
        path: s
      })
    }, d)), t.jsx("line", {
      x1: "72",
      x2: "72",
      y1: "420",
      y2: "462",
      className: "op-drop"
    }), t.jsx("circle", {
      cx: "72",
      cy: "409",
      r: "8",
      className: "op-start"
    }), t.jsx("text", {
      x: "104",
      y: "420",
      className: "op-label",
      children: "TODAY"
    }), t.jsx("text", {
      x: "104",
      y: "452",
      className: "op-sub",
      children: "(Optional path)"
    }), t.jsx("text", {
      x: "1700",
      y: "384",
      className: "op-label hot",
      children: "FUTURE STATE"
    }), t.jsx("text", {
      x: "1700",
      y: "418",
      className: "op-sub",
      children: "(Executable design)"
    })]
  });
}

function Owner() {
  const n = ["Outcome", "Workflow", "Authority", "Architecture", "Measurement"],
    e = [[101, 18], [11, 86], [101, 86], [191, 86], [101, 122]];
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 1e3,
      h: 520,
      children: [t.jsxs("defs", {
        children: [t.jsxs("radialGradient", {
          id: "ow-floor",
          cx: "0.5",
          cy: "0.3",
          r: "0.55",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#fff"
          }), t.jsx("stop", {
            offset: "0.6",
            stopColor: "#fff",
            stopOpacity: "0.5"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        }), t.jsx("mask", {
          id: "ow-floor-m",
          children: t.jsx("rect", {
            x: "0",
            y: "420",
            width: "1000",
            height: "140",
            fill: "url(#ow-floor)"
          })
        }), t.jsxs("radialGradient", {
          id: "ow-bg",
          cx: "50%",
          cy: "50%",
          r: "50%",
          children: [t.jsx("stop", {
            offset: "0%",
            stopColor: "#1f5fff",
            stopOpacity: "0.32"
          }), t.jsx("stop", {
            offset: "100%",
            stopColor: "#1f5fff",
            stopOpacity: "0"
          })]
        })]
      }), t.jsx("ellipse", {
        cx: "500",
        cy: "300",
        rx: "480",
        ry: "240",
        fill: "url(#ow-bg)"
      }), t.jsx("path", {
        d: [...Array.from({
          length: 33
        }, (s, a) => `M${500 + (a - 16) * 22} 430 L${500 + (a - 16) * 120} 560`), ...[438, 452, 472, 500, 540].map(s => `M0 ${s} H1000`)].join(" "),
        className: "ow-floor",
        mask: "url(#ow-floor-m)"
      }), t.jsx("ellipse", {
        cx: "500",
        cy: "458",
        rx: "440",
        ry: "40",
        className: "ow-ring dash"
      }), t.jsx("ellipse", {
        cx: "500",
        cy: "448",
        rx: "390",
        ry: "34",
        className: "ow-ring glow"
      }), t.jsx("ellipse", {
        cx: "500",
        cy: "448",
        rx: "390",
        ry: "34",
        className: "ow-ring"
      }), t.jsx("ellipse", {
        cx: "500",
        cy: "441",
        rx: "352",
        ry: "27",
        className: "ow-ring inner"
      }), t.jsx("ellipse", {
        cx: "500",
        cy: "436",
        rx: "314",
        ry: "21",
        className: "ow-ring faint"
      }), t.jsx("path", {
        d: "M444 240 H452 M548 240 H558",
        className: "ow-link"
      }), [[56, 230, 452], [100, 300, 456], [900, 300, 456], [944, 230, 452]].map(([s, a, i], c) => t.jsxs("g", {
        className: "op-pin",
        style: {
          "--n": c
        },
        children: [t.jsx("line", {
          x1: s,
          x2: s,
          y1: a,
          y2: i
        }), t.jsx("circle", {
          cx: s,
          cy: a,
          r: "3.4"
        })]
      }, s))]
    }), [2, 1].map(s => t.jsx("span", {
      className: "ow-file back",
      style: {
        left: 140 + s * 12,
        top: 100 - s * 12,
        "--k": s
      }
    }, s)), t.jsxs("div", {
      className: "ow-file front",
      children: [t.jsx("span", {
        className: "ow-tab"
      }), t.jsx("strong", {
        children: "BLUEPRINT"
      }), t.jsxs("svg", {
        viewBox: "0 0 260 150",
        className: "ow-flow",
        "aria-hidden": "true",
        children: [t.jsx("path", {
          d: "M130 44 V86 M69 99 H101 M159 99 H191 M130 112 V122 M101 31 H40 V86 M159 31 H220 V86 M40 112 V135 H101 M220 112 V135 H159",
          className: "link"
        }), e.map(([s, a]) => t.jsx("rect", {
          x: s,
          y: a,
          width: "58",
          height: "26",
          rx: "5",
          className: "box"
        }, `${s}-${a}`)), t.jsx("circle", {
          cx: "40",
          cy: "135",
          r: "3.5",
          className: "node"
        }), t.jsx("circle", {
          cx: "220",
          cy: "135",
          r: "3.5",
          className: "node"
        })]
      })]
    }), t.jsx("div", {
      className: "ow-person",
      children: t.jsx(Qt, {
        weight: "fill"
      })
    }), t.jsx("div", {
      className: "ow-list",
      children: n.map(s => t.jsxs("div", {
        className: "ow-row",
        children: [t.jsx("span", {
          className: "ow-check",
          children: t.jsx(j0, {
            weight: "bold"
          })
        }), s, t.jsx(fi, {
          className: "bp-caret",
          weight: "bold"
        })]
      }, s))
    })]
  });
}

const bZ = ["Outcome", "Operating reality", "Future state", "Value baseline"];

function AuditPanels() {
  const n = [44, 60, 96, 56, 84, 132];
  return t.jsxs("div", {
    className: "aa-3d",
    children: [t.jsxs(ke, {
      w: 1e3,
      h: 600,
      children: [t.jsx("defs", {
        children: t.jsxs("radialGradient", {
          id: "aa-bg",
          cx: "50%",
          cy: "50%",
          r: "50%",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#1f5fff",
            stopOpacity: "0.32"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#1f5fff",
            stopOpacity: "0"
          })]
        })
      }), t.jsx("ellipse", {
        cx: "520",
        cy: "320",
        rx: "480",
        ry: "300",
        fill: "url(#aa-bg)"
      }), t.jsx("ellipse", {
        cx: "510",
        cy: "520",
        rx: "420",
        ry: "56",
        className: "aa-ring glow"
      }), t.jsx("ellipse", {
        cx: "510",
        cy: "520",
        rx: "420",
        ry: "56",
        className: "aa-ring"
      }), t.jsx("ellipse", {
        cx: "510",
        cy: "514",
        rx: "376",
        ry: "44",
        className: "aa-ring inner"
      }), t.jsx("ellipse", {
        cx: "510",
        cy: "530",
        rx: "452",
        ry: "68",
        className: "aa-ring dash"
      })]
    }), t.jsx("span", {
      className: "aa-pane back l"
    }), t.jsx("span", {
      className: "aa-pane back r"
    }), t.jsxs("div", {
      className: "aa-pane side l",
      children: [t.jsx("span", {
        className: "aa-kicker",
        children: "Questions"
      }), [0, 1, 2, 3].map(e => t.jsxs("span", {
        className: `aa-q${e ? "" : " on"}`,
        children: [t.jsx("span", {
          className: "box",
          children: !e && t.jsx(j0, {
            weight: "bold"
          })
        }), t.jsx("i", {
          style: {
            width: `${[70, 56, 78, 50][e]}%`
          }
        })]
      }, e))]
    }), t.jsxs("div", {
      className: "aa-pane side r",
      children: [t.jsx("span", {
        className: "aa-kicker",
        children: "Insights"
      }), t.jsx("span", {
        className: "aa-chart",
        children: n.map((e, s) => t.jsx("i", {
          style: {
            height: e,
            "--k": s
          }
        }, s))
      })]
    }), t.jsxs("div", {
      className: "aa-pane front",
      children: [t.jsx("span", {
        className: "aa-kicker big",
        children: "AIR Audit"
      }), bZ.map(e => t.jsxs("div", {
        className: "aa-row",
        children: [t.jsx("span", {
          className: "aa-tick",
          children: t.jsx(j0, {
            weight: "bold"
          })
        }), t.jsx("strong", {
          children: e
        }), t.jsx(fi, {
          className: "bp-caret",
          weight: "bold"
        })]
      }, e))]
    })]
  });
}

function Brief() {
  const e = D0([[330, 520], [520, 470], [560, 410], [470, 360], [430, 300], [500, 240], [600, 200], [590, 140], [520, 112]]),
    s = vt(Array.from({
      length: 160
    }, (d, h) => e(h / 159))),
    a = d => vt(Array.from({
      length: 160
    }, (h, f) => {
      const [m, g] = e(f / 159);
      return [m + d, g + d * .4];
    })),
    i = [.08, .3, .52, .72, .9].map(d => e(d)),
    c = !Ae();
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 540,
      children: [t.jsx("defs", {
        children: t.jsxs("radialGradient", {
          id: "br-bg",
          cx: "50%",
          cy: "50%",
          r: "50%",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#1f5fff",
            stopOpacity: "0.3"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#1f5fff",
            stopOpacity: "0"
          })]
        })
      }), t.jsx("ellipse", {
        cx: "470",
        cy: "320",
        rx: "240",
        ry: "260",
        fill: "url(#br-bg)"
      }), [-14, 14].map(d => t.jsx("path", {
        d: a(d),
        className: "br-path faint"
      }, d)), t.jsx("path", {
        d: s,
        className: "br-path glow"
      }), t.jsx("path", {
        d: s,
        className: "br-path"
      }), i.map(([d, h], f) => t.jsxs("g", {
        className: "br-node",
        style: {
          "--n": f
        },
        children: [t.jsx("circle", {
          cx: d,
          cy: h,
          r: "11",
          className: "halo"
        }), t.jsx("circle", {
          cx: d,
          cy: h,
          r: f === 0 ? 6 : 4.5,
          className: "core"
        })]
      }, f)), c && [0, 1].map(d => t.jsx("circle", {
        r: "3",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "4.5s",
          begin: `-${d * 2.25}s`,
          repeatCount: "indefinite",
          path: s
        })
      }, d))]
    }), [["Current process", Qe, 168], ["Multiple stakeholders", St, 278], ["Fragmented information", wn, 388]].map(([d, h, f], m) => t.jsxs("div", {
      className: "br-chip",
      style: {
        top: f,
        left: 30 + m % 2 * 8
      },
      children: [t.jsx(h, {
        weight: "duotone"
      }), t.jsx("span", {
        children: d
      })]
    }, d)), t.jsxs("div", {
      className: "br-chip goal",
      children: [t.jsx(Rc, {
        weight: "fill"
      }), t.jsxs("span", {
        children: [t.jsx("strong", {
          children: "Clear brief"
        }), t.jsx("em", {
          children: "for what to change"
        })]
      }), t.jsx(fi, {
        className: "bp-caret",
        weight: "bold"
      })]
    })]
  });
}

const H1 = [110, 555, 1006, 1452];

const kZ = [[1900, 396], [1452, 404], [1006, 412], [555, 420], [220, 438], [70, 495], [153, 566], [557, 573], [1006, 577], [1450, 580], [1900, 592]];

function Route({
  items: n
}) {
  const e = D0(kZ),
    s = Array.from({
      length: 400
    }, (h, f) => e(f / 399)),
    a = vt(s),
    i = (h, f) => s.filter(([, m]) => f ? m > 500 : m < 500 && m > 330).reduce((m, g) => Math.abs(g[0] - h) < Math.abs(m[0] - h) ? g : m),
    c = [...H1.map(h => i(h, !1)), ...H1.map(h => i(h + (h === 110 ? 43 : 0), !0))],
    d = !Ae();
  return t.jsxs("div", {
    className: "rt",
    children: [t.jsxs("svg", {
      className: "rt-svg",
      viewBox: "0 0 1875 840",
      "aria-hidden": "true",
      children: [t.jsxs("defs", {
        children: [t.jsxs("linearGradient", {
          id: "rt-fade",
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "0",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#fff"
          }), t.jsx("stop", {
            offset: "0.8",
            stopColor: "#fff"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        }), t.jsx("mask", {
          id: "rt-m",
          children: t.jsx("rect", {
            x: "0",
            y: "0",
            width: "1875",
            height: "840",
            fill: "url(#rt-fade)"
          })
        })]
      }), t.jsxs("g", {
        mask: "url(#rt-m)",
        children: [t.jsx("path", {
          d: a,
          className: "rt-path glow"
        }), t.jsx("path", {
          d: a,
          className: "rt-path haze"
        }), t.jsx("path", {
          d: a,
          className: "rt-path"
        }), d && [0, 1, 2].map(h => t.jsx("circle", {
          r: "4",
          className: "hs-dot",
          children: t.jsx("animateMotion", {
            dur: "12s",
            begin: `-${h * 4}s`,
            repeatCount: "indefinite",
            path: a
          })
        }, h))]
      }), H1.map((h, f) => t.jsx("line", {
        x1: h,
        x2: h,
        y1: "232",
        y2: c[f][1],
        className: "rt-drop"
      }, `t${f}`)), H1.map((h, f) => {
        const m = f === 0 ? 153 : h;
        return t.jsx("line", {
          x1: m,
          x2: m,
          y1: c[f + 4][1],
          y2: "800",
          className: "rt-drop fade"
        }, `b${f}`);
      }), H1.map(h => t.jsx("circle", {
        cx: h,
        cy: "232",
        r: "6",
        className: "rt-cap"
      }, `c${h}`)), c.map(([h, f], m) => t.jsxs("g", {
        className: "rt-node",
        style: {
          "--n": m
        },
        children: [t.jsx("circle", {
          cx: h,
          cy: f,
          r: "18",
          className: "halo"
        }), t.jsx("circle", {
          cx: h,
          cy: f,
          r: "8",
          className: "core"
        })]
      }, m))]
    }), t.jsx("ol", {
      className: "rt-steps",
      children: n.map((h, f) => {
        const m = f % 4,
          g = f >= 4,
          x = ((g && m === 0 ? 153 : H1[m]) + 27) / 18.75;
        return t.jsxs("li", {
          className: g ? "low" : "",
          style: {
            left: `${x}%`,
            "--i": m
          },
          "data-reveal": !0,
          children: [t.jsx("span", {
            className: "rt-num",
            children: String(f + 1).padStart(2, "0")
          }), t.jsx("h3", {
            children: h.title
          }), t.jsx("p", {
            children: h.body
          })]
        }, h.title);
      })
    })]
  });
}

const c5 = [[106, wn], [218, uu], [330, Qe], [442, vu]];

const d5 = [[150, Qt], [295, Jr], [440, B0]];

const Fr = [296, 296, 62];

const VZ = [262, 284, 308, 330];

const ZZ = [270, 296, 322];

const u5 = (n, e) => [Fr[0] + e * Math.sqrt(Fr[2] ** 2 - (n - Fr[1]) ** 2), n];

const ol = ([n, e], [s, a], i = 0) => {
  const c = (n + s) / 2;
  return [[n, e], [c, e + i], [c, a + i], [s, a]];
};

const U2 = ([n, e, s, a]) => `M${n[0]} ${n[1]} C${e[0]} ${e[1]} ${s[0]} ${s[1]} ${a[0]} ${a[1]}`;

const $Z = ([n, e, s, a], i) => [0, 1].map(c => (1 - i) ** 3 * n[c] + 3 * (1 - i) ** 2 * i * e[c] + 3 * (1 - i) * i * i * s[c] + i ** 3 * a[c]);

function LinkHub() {
  const n = [...c5.map(([a], i) => [[118, a], u5(VZ[i], -1)]), ...d5.map(([a], i) => [u5(ZZ[i], 1), [458, a]])],
    e = !Ae(),
    s = [...Array.from({
      length: 17
    }, (a, i) => `M${310 + (i - 8) * 30} 384 L${310 + (i - 8) * 120} 560`), ...[396, 414, 440, 474, 520].map(a => `M0 ${a} H640`)].join(" ");
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 560,
      children: [t.jsxs("defs", {
        children: [t.jsxs("linearGradient", {
          id: "lh-beam",
          x1: "0",
          y1: "0",
          x2: "0",
          y2: "1",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#3f8cff",
            stopOpacity: "0"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#3f8cff",
            stopOpacity: "0.45"
          })]
        }), t.jsxs("radialGradient", {
          id: "lh-floor-g",
          cx: "0.5",
          cy: "0.15",
          r: "0.6",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#fff"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        }), t.jsx("mask", {
          id: "lh-floor-m",
          children: t.jsx("rect", {
            x: "0",
            y: "370",
            width: "640",
            height: "190",
            fill: "url(#lh-floor-g)"
          })
        }), t.jsx("filter", {
          id: "lh-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "560",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "3"
          })
        }), t.jsx("filter", {
          id: "lh-blur",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "560",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "10"
          })
        }), t.jsx("filter", {
          id: "lh-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "560",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "18"
          })
        })]
      }), t.jsx("rect", {
        x: "278",
        y: "0",
        width: "36",
        height: "236",
        fill: "url(#lh-beam)",
        filter: "url(#lh-blur)"
      }), t.jsx("path", {
        d: s,
        className: "lh-floor",
        mask: "url(#lh-floor-m)"
      }), t.jsx("ellipse", {
        cx: "296",
        cy: "400",
        rx: "160",
        ry: "30",
        fill: "#1f5fff",
        opacity: "0.4",
        filter: "url(#lh-wide)"
      }), n.map(([a, i]) => t.jsx("path", {
        d: U2(ol(a, i)),
        className: "lh-wire-glow",
        filter: "url(#lh-soft)"
      }, `g${a}`)), n.map(([a, i]) => [-5, 5].map(c => t.jsx("path", {
        d: U2(ol(a, i, c)),
        className: "lh-strand"
      }, `s${a}${c}`))), n.map(([a, i]) => t.jsx("path", {
        d: U2(ol(a, i)),
        className: "lh-wire"
      }, `c${a}`)), n.map(([a, i], c) => Array.from({
        length: 9
      }, (d, h) => {
        const [f, m] = $Z(ol(a, i, h % 2 ? 5 : -5), (h + 1) / 10);
        return t.jsx("circle", {
          cx: f.toFixed(1),
          cy: m.toFixed(1),
          r: h % 3 ? 1 : 1.5,
          className: "lh-mote",
          style: {
            "--n": (c + h) % 7
          }
        }, `p${c}-${h}`);
      })), n.map(([a, i]) => [a, i].map(([c, d]) => t.jsx("circle", {
        cx: c,
        cy: d,
        r: "3.2",
        className: "lh-end"
      }, `e${c}${d}`))), e && n.map(([a, i], c) => [0, 1].map(d => t.jsx("circle", {
        r: "2",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "2.8s",
          begin: `-${c % 4 * .5 + d * 1.4}s`,
          repeatCount: "indefinite",
          path: U2(ol(a, i))
        })
      }, `m${c}${d}`))), t.jsx("ellipse", {
        cx: "296",
        cy: "398",
        rx: "96",
        ry: "18",
        className: "lh-ring glow",
        filter: "url(#lh-soft)"
      }), t.jsx("ellipse", {
        cx: "296",
        cy: "398",
        rx: "96",
        ry: "18",
        className: "lh-ring"
      }), t.jsx("ellipse", {
        cx: "296",
        cy: "398",
        rx: "70",
        ry: "12",
        className: "lh-ring inner"
      })]
    }), t.jsxs("div", {
      className: "lh-orb",
      style: {
        left: Fr[0],
        top: Fr[1],
        width: Fr[2] * 2,
        height: Fr[2] * 2
      },
      children: [t.jsx("span", {
        className: "lh-orb-glow",
        "aria-hidden": "true"
      }), t.jsxs("div", {
        className: "orb-glass lh-orb-glass",
        children: [t.jsx("span", {
          className: "orb-swirl",
          "aria-hidden": "true"
        }), t.jsx("span", {
          className: "orb-swirl two",
          "aria-hidden": "true"
        })]
      }), t.jsx("img", {
        src: "/svg/intellilink.svg",
        alt: "",
        className: "lh-logo"
      })]
    }), c5.map(([a, i]) => t.jsx("div", {
      className: "lh-tile",
      style: {
        top: a - 46
      },
      children: t.jsx(i, {
        weight: "duotone"
      })
    }, a)), d5.map(([a, i]) => t.jsxs("div", {
      className: "lh-card",
      style: {
        top: a - 54
      },
      children: [t.jsx(i, {
        weight: "fill"
      }), t.jsxs("span", {
        className: "lh-lines",
        children: [t.jsx("i", {}), t.jsx("i", {}), t.jsx("i", {})]
      }), t.jsx("span", {
        className: "lh-tick",
        children: t.jsx(j0, {
          weight: "bold"
        })
      })]
    }, a))]
  });
}

const st = {
  cx: -150,
  cy: 1106,
  r: 968,
  tilt: -.12,
  spin: .62
};

const $d = (n, e) => {
  const [s, a] = [Math.cos(n), Math.sin(n)];
  let [i, c, d] = [s * Math.sin(e + st.spin), a, s * Math.cos(e + st.spin)];
  return [c, d] = [c * Math.cos(st.tilt) - d * Math.sin(st.tilt), c * Math.sin(st.tilt) + d * Math.cos(st.tilt)], [st.cx + st.r * i, st.cy - st.r * c, d];
};

const h5 = ([n, e, s]) => s > 0 && n > -10 && n < 910 && e > -10 && e < 530;

const Sd = n => {
  const e = (n - st.cx) / st.r;
  return [n, st.cy - st.r * Math.sqrt(1 - e * e)];
};

function Globe() {
  const n = Math.PI / 180,
    e = [];
  for (let g = -88; g <= 88; g += 3.2) for (let x = -180; x < 180; x += 3.2) {
    const v = $d(g * n, x * n);
    h5(v) && e.push(v);
  }
  const s = g => {
      const x = [];
      let v = [];
      return g.forEach(j => {
        h5(j) ? v.push(j) : (v.length > 1 && x.push(v), v = []);
      }), v.length > 1 && x.push(v), x.map(j => `M${j.map(([A, M]) => `${A.toFixed(1)} ${M.toFixed(1)}`).join(" L")}`).join(" ");
    },
    a = [...Array.from({
      length: 24
    }, (g, x) => s(Array.from({
      length: 120
    }, (v, j) => $d((-89 + j * 1.5) * n, x * 15 * n)))), ...[-45, -30, -15, 0, 15, 30, 45, 60].map(g => s(Array.from({
      length: 361
    }, (x, v) => $d(g * n, (-180 + v) * n))))].join(" "),
    i = [[330, 150], [420, 110], [470, 80]].map(([g, x]) => [...Sd(g), x]),
    c = Sd(262);
  let d = 17;
  const h = () => (d = d * 16807 % 2147483647, d / 2147483647),
    f = Array.from({
      length: 46
    }, () => {
      const g = 20 + h() ** 1.4 * 640,
        [, x] = Sd(g);
      return [g, x - 6 - h() * 70 * (1 - Math.abs(g - 262) / 700), .6 + h() * 1.2];
    }),
    m = !Ae();
  return t.jsxs("svg", {
    className: "pg-globe",
    viewBox: "0 0 900 520",
    preserveAspectRatio: "xMinYMax meet",
    "aria-hidden": "true",
    children: [t.jsxs("defs", {
      children: [t.jsxs("radialGradient", {
        id: "gl-body",
        cx: st.cx,
        cy: st.cy,
        r: st.r,
        gradientUnits: "userSpaceOnUse",
        children: [t.jsx("stop", {
          offset: "0.7",
          stopColor: "#1f5fff",
          stopOpacity: "0.03"
        }), t.jsx("stop", {
          offset: "0.95",
          stopColor: "#1f5fff",
          stopOpacity: "0.26"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#3f8cff",
          stopOpacity: "0.5"
        })]
      }), t.jsxs("linearGradient", {
        id: "gl-pin",
        x1: "0",
        y1: "1",
        x2: "0",
        y2: "0",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#8fcbff",
          stopOpacity: "0.95"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#8fcbff",
          stopOpacity: "0"
        })]
      }), t.jsxs("linearGradient", {
        id: "gl-beam",
        x1: "0",
        y1: "1",
        x2: "0",
        y2: "0",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#3f8cff",
          stopOpacity: "0.9"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#3f8cff",
          stopOpacity: "0"
        })]
      }), t.jsxs("linearGradient", {
        id: "gl-fade",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#fff",
          stopOpacity: "0.55"
        }), t.jsx("stop", {
          offset: "0.25",
          stopColor: "#fff"
        })]
      }), t.jsx("mask", {
        id: "gl-m",
        maskUnits: "userSpaceOnUse",
        x: "0",
        y: "0",
        width: "900",
        height: "520",
        children: t.jsx("rect", {
          width: "900",
          height: "520",
          fill: "url(#gl-fade)"
        })
      }), t.jsx("filter", {
        id: "gl-soft",
        filterUnits: "userSpaceOnUse",
        x: "-100",
        y: "-100",
        width: "1100",
        height: "720",
        children: t.jsx("feGaussianBlur", {
          stdDeviation: "4"
        })
      }), t.jsx("filter", {
        id: "gl-wide",
        filterUnits: "userSpaceOnUse",
        x: "-100",
        y: "-100",
        width: "1100",
        height: "720",
        children: t.jsx("feGaussianBlur", {
          stdDeviation: "16"
        })
      })]
    }), t.jsxs("g", {
      mask: "url(#gl-m)",
      children: [t.jsx("circle", {
        cx: st.cx,
        cy: st.cy,
        r: st.r,
        fill: "url(#gl-body)"
      }), t.jsx("path", {
        d: a,
        className: "gl-grid"
      }), e.map(([g, x, v], j) => t.jsx("circle", {
        cx: g.toFixed(1),
        cy: x.toFixed(1),
        r: (.55 + (1 - v) * 1.5).toFixed(2),
        className: "gl-dot",
        style: {
          opacity: (.18 + (1 - v) * .75).toFixed(2)
        }
      }, j)), t.jsx("circle", {
        cx: st.cx,
        cy: st.cy,
        r: st.r,
        className: "gl-limb glow",
        filter: "url(#gl-wide)"
      }), t.jsx("circle", {
        cx: st.cx,
        cy: st.cy,
        r: st.r,
        className: "gl-limb haze",
        filter: "url(#gl-soft)"
      }), t.jsx("circle", {
        cx: st.cx,
        cy: st.cy,
        r: st.r,
        className: "gl-limb"
      })]
    }), f.map(([g, x, v], j) => t.jsx("circle", {
      cx: g.toFixed(1),
      cy: x.toFixed(1),
      r: v.toFixed(2),
      className: "gl-spark",
      style: {
        "--n": j % 7
      }
    }, `s${j}`)), t.jsx("rect", {
      x: c[0] - 5,
      y: c[1] - 110,
      width: "10",
      height: "110",
      fill: "url(#gl-beam)",
      filter: "url(#gl-soft)"
    }), t.jsx("rect", {
      x: c[0] - .8,
      y: c[1] - 100,
      width: "1.6",
      height: "100",
      fill: "url(#gl-pin)"
    }), t.jsx("circle", {
      cx: c[0],
      cy: c[1],
      r: "34",
      fill: "#3f8cff",
      opacity: "0.7",
      filter: "url(#gl-wide)"
    }), t.jsx("path", {
      d: `M${c[0] - 36} ${c[1]} H${c[0] + 36} M${c[0]} ${c[1] - 30} V${c[1] + 30}`,
      className: "gl-flare",
      filter: "url(#gl-soft)"
    }), t.jsx("circle", {
      cx: c[0],
      cy: c[1],
      r: "3.6",
      fill: "#fff"
    }), i.map(([g, x, v], j) => t.jsxs("g", {
      children: [t.jsx("rect", {
        x: g - .7,
        y: x - v,
        width: "1.4",
        height: v,
        fill: "url(#gl-pin)"
      }), t.jsx("circle", {
        cx: g,
        cy: x - v * .72,
        r: "2.6",
        className: "gl-node",
        style: {
          "--n": j
        }
      }), t.jsx("circle", {
        cx: g,
        cy: x - v * .3,
        r: "2",
        className: "gl-node",
        style: {
          "--n": j + 3
        }
      }), t.jsx("circle", {
        cx: g,
        cy: x,
        r: "2.6",
        className: "gl-node",
        style: {
          "--n": j + 1
        }
      }), m && t.jsx("circle", {
        r: "1.8",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "3s",
          begin: `-${j}s`,
          repeatCount: "indefinite",
          path: `M${g} ${x} V${x - v}`
        })
      })]
    }, j))]
  });
}

const LZ = [[40, 60, 300], [88, 10, 200], [170, 0, 150], [262, 30, 120], [330, 0, 160], [410, 20, 130], [486, 0, 110], [560, 40, 150], [612, 0, 260]];

const Hd = [[10, 168], [42, 140], [70, 150], [104, 112], [134, 126], [160, 96], [196, 52], [222, 62], [258, 18]];

function GovernView() {
  const n = !Ae(),
    e = (() => {
      const c = D0(Hd);
      return `M${Array.from({
        length: 80
      }, (d, h) => c(h / 79).map(f => f.toFixed(1)).join(" ")).join(" L")}`;
    })(),
    s = 300,
    a = [...Array.from({
      length: 21
    }, (c, d) => `M${s + (d - 10) * 26} 452 L${s + (d - 10) * 110} 600`), ...[460, 474, 494, 520, 556].map(c => `M0 ${c} H640`)].join(" "),
    i = [];
  return [474, 494, 520, 556].forEach((c, d) => {
    for (let h = -10; h <= 10; h += 2) {
      const f = (c - 452) / 148;
      i.push([s + (h + d % 2) * (26 + 84 * f), c, d]);
    }
  }), t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 600,
      children: [t.jsxs("defs", {
        children: [t.jsxs("linearGradient", {
          id: "gv-streak",
          x1: "0",
          y1: "0",
          x2: "0",
          y2: "1",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#3f8cff",
            stopOpacity: "0"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#3f8cff",
            stopOpacity: "0.55"
          })]
        }), t.jsxs("radialGradient", {
          id: "gv-floor-g",
          cx: "0.5",
          cy: "0.1",
          r: "0.7",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#fff"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        }), t.jsx("mask", {
          id: "gv-floor-m",
          children: t.jsx("rect", {
            x: "0",
            y: "446",
            width: "640",
            height: "154",
            fill: "url(#gv-floor-g)"
          })
        }), t.jsx("filter", {
          id: "gv-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "600",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "20"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "300",
        cy: "300",
        rx: "300",
        ry: "220",
        fill: "#1f5fff",
        opacity: "0.16",
        filter: "url(#gv-wide)"
      }), LZ.map(([c, d, h], f) => t.jsxs("g", {
        children: [t.jsx("rect", {
          x: c - .6,
          y: d,
          width: "1.2",
          height: h,
          fill: "url(#gv-streak)"
        }), t.jsx("circle", {
          cx: c,
          cy: d + h,
          r: "1.8",
          className: "gv-cap",
          style: {
            "--n": f % 5
          }
        })]
      }, c)), t.jsx("path", {
        d: a,
        className: "gv-floor",
        mask: "url(#gv-floor-m)"
      }), i.map(([c, d, h], f) => t.jsx("circle", {
        cx: c.toFixed(1),
        cy: d,
        r: 1.2 + h * .25,
        className: "gv-fdot",
        style: {
          "--n": f % 7
        },
        mask: "url(#gv-floor-m)"
      }, f)), t.jsx("ellipse", {
        cx: "300",
        cy: "462",
        rx: "170",
        ry: "22",
        fill: "#3f8cff",
        opacity: "0.35",
        filter: "url(#gv-wide)"
      }), t.jsx("path", {
        d: "M226 446 L246 432 H366 L346 446 Z",
        className: "gv-stand top"
      }), t.jsx("path", {
        d: "M226 446 H346 V458 H226 Z",
        className: "gv-stand front"
      }), t.jsx("path", {
        d: "M346 446 L366 432 V444 L346 458 Z",
        className: "gv-stand side"
      }), t.jsx("path", {
        d: "M226 446 H346",
        className: "gv-stand-rim"
      }), t.jsx("path", {
        d: "M286 432 V420",
        className: "gv-stand-rim"
      })]
    }), t.jsx("div", {
      className: "gv-pane gv-side",
      children: [Qt, Jr, Qe].map((c, d) => t.jsx("span", {
        className: "gv-tile",
        children: t.jsx(c, {
          weight: "fill"
        })
      }, d))
    }), t.jsxs("div", {
      className: "gv-pane gv-main",
      children: [t.jsx("span", {
        className: "gv-bar head"
      }), t.jsxs("div", {
        className: "gv-main-body",
        children: [t.jsx("span", {
          className: "gv-lines",
          children: [70, 52, 62, 44].map(c => t.jsx("i", {
            style: {
              width: `${c}%`
            }
          }, c))
        }), t.jsxs("svg", {
          viewBox: "0 0 270 190",
          className: "gv-chart",
          "aria-hidden": "true",
          children: [t.jsx("defs", {
            children: t.jsxs("linearGradient", {
              id: "gv-area",
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [t.jsx("stop", {
                offset: "0",
                stopColor: "#3f8cff",
                stopOpacity: "0.45"
              }), t.jsx("stop", {
                offset: "1",
                stopColor: "#3f8cff",
                stopOpacity: "0"
              })]
            })
          }), [40, 80, 120, 160].map(c => t.jsx("path", {
            d: `M0 ${c} H270`,
            className: "gv-grid"
          }, c)), [60, 120, 180, 240].map(c => t.jsx("path", {
            d: `M${c} 0 V180`,
            className: "gv-grid"
          }, c)), t.jsx("path", {
            d: `${e} L258 180 L10 180 Z`,
            fill: "url(#gv-area)"
          }), t.jsx("path", {
            d: e,
            className: "gv-line glow"
          }), t.jsx("path", {
            d: e,
            className: "gv-line"
          }), Hd.filter((c, d) => d % 2 === 1 || d === Hd.length - 1).map(([c, d]) => t.jsx("circle", {
            cx: c,
            cy: d,
            r: "3.6",
            className: "gv-pt"
          }, c)), n && t.jsx("circle", {
            r: "3",
            className: "hs-dot",
            children: t.jsx("animateMotion", {
              dur: "4s",
              repeatCount: "indefinite",
              path: e
            })
          }), [30, 80, 130, 180, 230].map(c => t.jsx("path", {
            d: `M${c} 186 h14`,
            className: "gv-tick"
          }, c))]
        })]
      })]
    }), t.jsxs("div", {
      className: "gv-pane gv-right one",
      children: [t.jsx("span", {
        className: "gv-lines",
        children: [80, 60, 70, 48].map(c => t.jsx("i", {
          style: {
            width: `${c}%`
          }
        }, c))
      }), t.jsx("span", {
        className: "gv-bars",
        children: [30, 52, 40, 70, 92].map((c, d) => t.jsx("i", {
          style: {
            height: `${c}%`
          }
        }, d))
      })]
    }), t.jsxs("div", {
      className: "gv-pane gv-right two",
      children: [t.jsxs("svg", {
        viewBox: "0 0 60 60",
        className: "gv-donut",
        "aria-hidden": "true",
        children: [t.jsx("circle", {
          cx: "30",
          cy: "30",
          r: "21",
          className: "track"
        }), t.jsx("circle", {
          cx: "30",
          cy: "30",
          r: "21",
          className: "arc",
          pathLength: "100",
          strokeDasharray: "68 100",
          transform: "rotate(-90 30 30)"
        }), t.jsx("circle", {
          cx: "30",
          cy: "30",
          r: "21",
          className: "arc soft",
          pathLength: "100",
          strokeDasharray: "20 100",
          strokeDashoffset: "-70",
          transform: "rotate(-90 30 30)"
        })]
      }), t.jsx("span", {
        className: "gv-lines",
        children: [78, 56, 66, 50].map(c => t.jsx("i", {
          style: {
            width: `${c}%`
          }
        }, c))
      })]
    }), t.jsx("div", {
      className: "gv-pane gv-right three",
      children: t.jsx("span", {
        className: "gv-lines wide",
        children: [72, 88, 60, 80].map(c => t.jsx("i", {
          style: {
            width: `${c}%`
          }
        }, c))
      })
    })]
  });
}

const kt = {
  cx: 700,
  cy: 1e3,
  r: 780,
  tilt: .14
};

const FZ = n => kt.cy - Math.sqrt(kt.r ** 2 - (n - kt.cx) ** 2);

const PZ = (n, e) => {
  const [s, a] = [Math.cos(n), Math.sin(n)];
  let [i, c, d] = [s * Math.sin(e), a, s * Math.cos(e)];
  return [c, d] = [c * Math.cos(kt.tilt) - d * Math.sin(kt.tilt), c * Math.sin(kt.tilt) + d * Math.cos(kt.tilt)], [kt.cx + kt.r * i, kt.cy - kt.r * c, d];
};

function GovernDome() {
  const n = Math.PI / 180,
    e = [];
  for (let c = -10; c <= 84; c += 2.6) for (let d = -180; d < 180; d += 2.6) {
    const h = PZ(c * n, d * n);
    h[2] > 0 && h[1] < 640 && e.push(h);
  }
  const s = (c, d, h) => `M${700 - c} ${h} A${c} ${d} 0 1 0 ${700 + c} ${h} A${c} ${d} 0 1 0 ${700 - c} ${h}`,
    a = [[150, 150], [260, 110], [470, 70], [700, 90], [930, 70], [1140, 110], [1250, 150]].map(([c, d]) => [c, FZ(c), d]),
    i = !Ae();
  return t.jsxs(ke, {
    w: 1400,
    h: 640,
    children: [t.jsxs("defs", {
      children: [t.jsxs("radialGradient", {
        id: "gd-body",
        cx: "700",
        cy: "1000",
        r: "780",
        gradientUnits: "userSpaceOnUse",
        children: [t.jsx("stop", {
          offset: "0.6",
          stopColor: "#1f5fff",
          stopOpacity: "0.04"
        }), t.jsx("stop", {
          offset: "0.95",
          stopColor: "#1f5fff",
          stopOpacity: "0.28"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#3f8cff",
          stopOpacity: "0.45"
        })]
      }), t.jsxs("linearGradient", {
        id: "gd-pin",
        x1: "0",
        y1: "1",
        x2: "0",
        y2: "0",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#8fcbff",
          stopOpacity: "0.9"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#8fcbff",
          stopOpacity: "0"
        })]
      }), t.jsxs("linearGradient", {
        id: "gd-fade",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        children: [t.jsx("stop", {
          offset: "0.55",
          stopColor: "#fff"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#fff",
          stopOpacity: "0"
        })]
      }), t.jsx("mask", {
        id: "gd-m",
        maskUnits: "userSpaceOnUse",
        x: "0",
        y: "0",
        width: "1400",
        height: "640",
        children: t.jsx("rect", {
          width: "1400",
          height: "640",
          fill: "url(#gd-fade)"
        })
      }), t.jsx("filter", {
        id: "gd-soft",
        filterUnits: "userSpaceOnUse",
        x: "0",
        y: "0",
        width: "1400",
        height: "640",
        children: t.jsx("feGaussianBlur", {
          stdDeviation: "5"
        })
      }), t.jsx("filter", {
        id: "gd-wide",
        filterUnits: "userSpaceOnUse",
        x: "0",
        y: "0",
        width: "1400",
        height: "640",
        children: t.jsx("feGaussianBlur", {
          stdDeviation: "22"
        })
      })]
    }), t.jsxs("g", {
      mask: "url(#gd-m)",
      children: [t.jsx("circle", {
        cx: kt.cx,
        cy: kt.cy,
        r: kt.r,
        fill: "url(#gd-body)"
      }), e.map(([c, d, h], f) => t.jsx("circle", {
        cx: c.toFixed(1),
        cy: d.toFixed(1),
        r: (.6 + (1 - h) * 1.3).toFixed(2),
        className: "gd-dot",
        style: {
          opacity: (.1 + (1 - h) * .7).toFixed(2)
        }
      }, f)), t.jsx("circle", {
        cx: kt.cx,
        cy: kt.cy,
        r: kt.r,
        className: "gd-limb glow",
        filter: "url(#gd-wide)"
      }), t.jsx("circle", {
        cx: kt.cx,
        cy: kt.cy,
        r: kt.r,
        className: "gd-limb haze",
        filter: "url(#gd-soft)"
      }), t.jsx("circle", {
        cx: kt.cx,
        cy: kt.cy,
        r: kt.r,
        className: "gd-limb"
      }), t.jsx("path", {
        d: s(680, 130, 470),
        className: "gd-orbit lit"
      }), t.jsx("path", {
        d: s(640, 112, 480),
        className: "gd-orbit"
      }), t.jsx("path", {
        d: s(720, 150, 458),
        className: "gd-orbit dash"
      }), i && [0, 1].map(c => t.jsx("circle", {
        r: "2.6",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "14s",
          begin: `-${c * 7}s`,
          repeatCount: "indefinite",
          path: s(680, 130, 470)
        })
      }, c))]
    }), t.jsx("ellipse", {
      cx: "700",
      cy: "226",
      rx: "260",
      ry: "36",
      fill: "#3f8cff",
      opacity: "0.45",
      filter: "url(#gd-wide)"
    }), a.map(([c, d, h], f) => t.jsxs("g", {
      children: [t.jsx("rect", {
        x: c - .7,
        y: d - h,
        width: "1.4",
        height: h,
        fill: "url(#gd-pin)"
      }), t.jsx("circle", {
        cx: c,
        cy: d - h * .65,
        r: "2.4",
        className: "gd-node",
        style: {
          "--n": f
        }
      }), t.jsx("circle", {
        cx: c,
        cy: d,
        r: "3",
        className: "gd-node",
        style: {
          "--n": f + 2
        }
      })]
    }, c)), [[20, 470], [1380, 470], [240, 470 + 130 * Math.sqrt(1 - (460 / 680) ** 2)], [1160, 470 + 130 * Math.sqrt(1 - (460 / 680) ** 2)]].map(([c, d], h) => t.jsxs("g", {
      children: [t.jsx("circle", {
        cx: c,
        cy: d,
        r: "14",
        fill: "#3f8cff",
        opacity: "0.6",
        filter: "url(#gd-soft)"
      }), t.jsx("circle", {
        cx: c,
        cy: d,
        r: "3.6",
        className: "gd-node hot",
        style: {
          "--n": h
        }
      })]
    }, `o${c}`))]
  });
}

const Ey = [["Redesign", Dc, 2], ["Engineer", hu, 3], ["Govern", Fn, 2], ["Embed", St, 3], ["Operate", lo, 2], ["Compound", tr, 1]];

const Ie = {
  y: 150,
  arch: 50,
  x0: 132,
  step: 72,
  out: 616,
  team: 92,
  label: 52,
  acc: 262
};

const Ld = Ey.map((n, e) => Ie.x0 + e * Ie.step);

function ResidencyThread() {
  const n = !Ae(),
    e = `M${Ie.arch + 30} ${Ie.y} H${Ie.out - 78}`,
    s = [...Array.from({
      length: 21
    }, (a, i) => `M${348 + (i - 10) * 34} ${Ie.y + 40} L${348 + (i - 10) * 90} 300`), ...[198, 212, 232, 258, 290].map(a => `M0 ${a} H696`)].join(" ");
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 696,
      h: 300,
      children: [t.jsxs("defs", {
        children: [t.jsxs("radialGradient", {
          id: "rs-floor-g",
          cx: "0.5",
          cy: "0.1",
          r: "0.7",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#fff"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        }), t.jsx("mask", {
          id: "rs-floor-m",
          children: t.jsx("rect", {
            x: "0",
            y: Ie.y + 36,
            width: "696",
            height: "120",
            fill: "url(#rs-floor-g)"
          })
        }), t.jsx("filter", {
          id: "rs-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "696",
          height: "300",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "rs-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "696",
          height: "300",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "22"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "348",
        cy: Ie.y,
        rx: "320",
        ry: "90",
        fill: "#1f5fff",
        opacity: "0.2",
        filter: "url(#rs-wide)"
      }), t.jsx("path", {
        d: s,
        className: "rs-floor",
        mask: "url(#rs-floor-m)"
      }), Ld.map((a, i) => t.jsx("path", {
        d: `M${a} ${Ie.y - Ie.team + 16} V${Ie.y - 46}`,
        className: `rs-join${i === 1 ? " hot" : ""}`
      }, a)), t.jsx("path", {
        d: e,
        className: "rs-thread glow",
        filter: "url(#rs-soft)"
      }), t.jsx("path", {
        d: e,
        className: "rs-thread"
      }), [-6, 6].map(a => t.jsx("path", {
        d: `M${Ie.arch + 30} ${Ie.y + a} H${Ie.out - 78}`,
        className: "rs-strand"
      }, a)), Ld.slice(0, -1).map(a => t.jsx("circle", {
        cx: a + Ie.step / 2,
        cy: Ie.y,
        r: "2.6",
        className: "rs-node"
      }, a)), n && [0, 1, 2].map(a => t.jsx("circle", {
        r: "2.6",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "6s",
          begin: `-${a * 2}s`,
          repeatCount: "indefinite",
          path: e
        })
      }, a)), t.jsx("path", {
        d: `M${Ie.arch} ${Ie.acc} H${Ie.out}`,
        className: "rs-account"
      }), t.jsx("path", {
        d: `M${Ie.arch} ${Ie.y + 30} V${Ie.acc} M${Ie.out} ${Ie.acc} V${Ie.y + 34}`,
        className: "rs-account drop"
      }), t.jsx("text", {
        x: Ie.arch + 16,
        y: Ie.acc - 10,
        className: "rs-cap",
        children: "ACCOUNTABILITY"
      })]
    }), t.jsx("div", {
      className: "rs-architect",
      style: {
        left: Ie.arch,
        top: Ie.y
      },
      children: t.jsx(Qt, {
        weight: "fill"
      })
    }), t.jsx("span", {
      className: "rs-tag",
      style: {
        left: Ie.arch,
        top: Ie.y - 46
      },
      children: "Architect"
    }), Ey.map(([a, i, c], d) => {
      const h = Ld[d];
      return t.jsxs("div", {
        children: [t.jsx("div", {
          className: `rs-team${d === 1 ? " hot" : ""}`,
          style: {
            left: h,
            top: Ie.y - Ie.team
          },
          children: Array.from({
            length: c
          }, (f, m) => t.jsx("span", {
            children: t.jsx(Qt, {
              weight: "fill"
            })
          }, m))
        }), t.jsx("div", {
          className: `rs-gate${d === 1 ? " hot" : ""}`,
          style: {
            left: h,
            top: Ie.y
          },
          children: t.jsx(i, {
            weight: "duotone"
          })
        }), t.jsx("span", {
          className: "rs-label",
          style: {
            left: h,
            top: Ie.y + Ie.label
          },
          children: a
        })]
      }, a);
    }), t.jsxs("div", {
      className: "rs-outcome",
      style: {
        left: Ie.out,
        top: Ie.y
      },
      children: [t.jsx(oo, {
        weight: "duotone"
      }), t.jsxs("span", {
        children: ["Operating", t.jsx("br", {}), "outcome"]
      })]
    })]
  });
}

function Handoff() {
  const n = !Ae(),
    e = Array.from({
      length: 9
    }, (c, d) => `M178 ${64 + d * 11} C236 ${64 + d * 11} 252 ${104 + d * 4} 290 ${110 + d * 4}`),
    s = [[312, 160, .7], [326, 182, .5], [300, 198, .4], [338, 210, .3], [318, 228, .22], [306, 172, .6], [344, 192, .4]],
    a = ["M370 120 C410 120 420 112 466 112", "M370 136 C410 136 420 140 466 140"],
    i = Array.from({
      length: 5
    }, (c, d) => `M60 ${336 + (d - 2) * 7} C220 ${336 + (d - 2) * 7} 420 ${330 + (d - 2) * 7} 590 ${330 + (d - 2) * 7}`);
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 440,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "ho-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "440",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "ho-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "440",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "16"
          })
        })]
      }), t.jsx("text", {
        x: "30",
        y: "26",
        className: "ho-cap",
        children: "HAND-OFF"
      }), t.jsx("text", {
        x: "30",
        y: "290",
        className: "ho-cap hot",
        children: "AIR"
      }), t.jsx("path", {
        d: "M30 262 H610",
        className: "ho-divide"
      }), e.map((c, d) => t.jsx("path", {
        d: c,
        className: `ho-in${d === 4 ? " lit" : ""}`
      }, c)), s.map(([c, d, h], f) => t.jsx("circle", {
        cx: c,
        cy: d,
        r: "1.8",
        className: "ho-lost",
        style: {
          opacity: h,
          "--n": f
        }
      }, f)), a.map(c => t.jsx("path", {
        d: c,
        className: "ho-out"
      }, c)), t.jsx("ellipse", {
        cx: "330",
        cy: "334",
        rx: "280",
        ry: "26",
        fill: "#1f5fff",
        opacity: "0.3",
        filter: "url(#ho-wide)"
      }), i.map((c, d) => t.jsx("path", {
        d: c,
        className: `ho-air${d === 2 ? " lit" : ""}`
      }, c)), n && [0, 1].map(c => t.jsx("circle", {
        r: "2.6",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "4.5s",
          begin: `-${c * 2.25}s`,
          repeatCount: "indefinite",
          path: i[2]
        })
      }, c)), t.jsx("circle", {
        cx: "60",
        cy: "336",
        r: "5",
        className: "ho-end"
      }), t.jsx("circle", {
        cx: "590",
        cy: "330",
        r: "5",
        className: "ho-end"
      })]
    }), t.jsxs("div", {
      className: "ho-pane",
      style: {
        left: 30,
        top: 44,
        width: 148,
        height: 132
      },
      children: [t.jsx("span", {
        className: "ho-title",
        children: "Strategy"
      }), [92, 74, 86, 60, 80, 52].map((c, d) => t.jsx("i", {
        style: {
          width: `${c}%`
        }
      }, d))]
    }), t.jsxs("div", {
      className: "ho-doc",
      style: {
        left: 290,
        top: 96
      },
      children: [t.jsx(Qe, {
        weight: "duotone"
      }), t.jsx("span", {
        children: "Requirements"
      })]
    }), t.jsxs("div", {
      className: "ho-pane dim",
      style: {
        left: 466,
        top: 84,
        width: 144,
        height: 92
      },
      children: [t.jsx("span", {
        className: "ho-title",
        children: "Delivery"
      }), [70, 46].map((c, d) => t.jsx("i", {
        style: {
          width: `${c}%`
        }
      }, d))]
    }), t.jsx("div", {
      className: "ho-chip",
      style: {
        left: 30,
        top: 360
      },
      children: "Strategy"
    }), t.jsx("div", {
      className: "ho-orb",
      style: {
        left: 320,
        top: 332
      },
      children: t.jsxs("span", {
        className: "orb-glass ho-orb-glass",
        children: [t.jsx("span", {
          className: "orb-swirl"
        }), t.jsx("span", {
          className: "orb-swirl two"
        })]
      })
    }), t.jsx("div", {
      className: "ho-chip hot",
      style: {
        left: 516,
        top: 356
      },
      children: "Production"
    })]
  });
}

const Td = [["Process", ir], ["Data", wn], ["Engineering", hu], ["Security", mu], ["Change", St], ["Operations", lo]];

function Specialists() {
  const [n, e, s, a] = [320, 228, 248, 156],
    i = Td.map((h, f) => {
      const m = -Math.PI / 2 + f * Math.PI * 2 / Td.length;
      return [n + s * Math.cos(m), e + a * Math.sin(m)];
    }),
    c = 2,
    d = !Ae();
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 460,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "sp-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "460",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "sp-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "460",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "20"
          })
        })]
      }), t.jsx("ellipse", {
        cx: n,
        cy: e,
        rx: "200",
        ry: "130",
        fill: "#1f5fff",
        opacity: "0.2",
        filter: "url(#sp-wide)"
      }), t.jsx("ellipse", {
        cx: n,
        cy: e,
        rx: s,
        ry: a,
        className: "sp-orbit"
      }), t.jsx("ellipse", {
        cx: n,
        cy: e,
        rx: s * .62,
        ry: a * .62,
        className: "sp-orbit inner"
      }), i.map(([h, f], m) => t.jsx("path", {
        d: `M${n} ${e} L${h} ${f}`,
        className: `sp-link${m === c ? " hot" : ""}`
      }, m)), t.jsx("path", {
        d: `M${n} ${e} L${i[c][0]} ${i[c][1]}`,
        className: "sp-link glow",
        filter: "url(#sp-soft)"
      }), d && [0, 1].map(h => t.jsx("circle", {
        r: "2.4",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "2.4s",
          begin: `-${h * 1.2}s`,
          repeatCount: "indefinite",
          path: `M${n} ${e} L${i[c][0]} ${i[c][1]}`
        })
      }, h)), i.map(([h, f], m) => [.35, .7].map(g => t.jsx("circle", {
        cx: n + (h - n) * g,
        cy: e + (f - e) * g,
        r: "1.6",
        className: "tp-mote",
        style: {
          "--n": m
        }
      }, `${m}${g}`)))]
    }), t.jsxs("div", {
      className: "sp-core",
      style: {
        left: n,
        top: e
      },
      children: [t.jsx("span", {
        className: "sp-core-glow"
      }), t.jsxs("span", {
        className: "orb-glass sp-core-glass",
        children: [t.jsx("span", {
          className: "orb-swirl"
        }), t.jsx("span", {
          className: "orb-swirl two"
        })]
      }), t.jsx(Qt, {
        weight: "fill",
        className: "sp-core-ico"
      })]
    }), t.jsx("span", {
      className: "sp-core-label",
      style: {
        left: n,
        top: e + 70
      },
      children: "Intellient Architect"
    }), Td.map(([h, f], m) => t.jsxs("div", {
      className: `sp-role${m === c ? " hot" : ""}`,
      style: {
        left: i[m][0],
        top: i[m][1]
      },
      children: [t.jsx(f, {
        weight: "duotone"
      }), t.jsx("span", {
        children: h
      })]
    }, h))]
  });
}

const Fd = [["Work waits in queues", 104], ["Systems disagree", 196], ["Exceptions recur", 288], ["Decisions arrive late", 380]];

const BZ = ["Outcome to move", "Proposed Operating Domain", "Visible symptoms", "Exception and context signals", "Ownership and authority", "Evidence available", "Meaningful improvement", "Recommended next step"];

function BriefDoc() {
  const n = !Ae(),
    e = Fd.map(([, s], a) => `M196 ${s} C250 ${s} 262 ${150 + a * 40} 318 ${150 + a * 40}`);
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 540,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "bd-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "540",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "bd-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "540",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "20"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "450",
        cy: "300",
        rx: "220",
        ry: "230",
        fill: "#1f5fff",
        opacity: "0.22",
        filter: "url(#bd-wide)"
      }), t.jsx("ellipse", {
        cx: "468",
        cy: "500",
        rx: "166",
        ry: "24",
        className: "bd-ring glow",
        filter: "url(#bd-soft)"
      }), t.jsx("ellipse", {
        cx: "468",
        cy: "500",
        rx: "166",
        ry: "24",
        className: "bd-ring"
      }), t.jsx("ellipse", {
        cx: "468",
        cy: "496",
        rx: "130",
        ry: "16",
        className: "bd-ring inner"
      }), e.map(s => t.jsx("path", {
        d: s,
        className: "bd-wire glow",
        filter: "url(#bd-soft)"
      }, s)), e.map(s => t.jsx("path", {
        d: s,
        className: "bd-wire"
      }, `c${s}`)), Fd.map(([, s], a) => [.3, .62].map(i => {
        const c = 150 + a * 40,
          [d, h] = [196 + 122 * (3 * (1 - i) * i * i * .5 + 3 * (1 - i) ** 2 * i * .5 + i ** 3), (1 - i) ** 3 * s + 3 * (1 - i) ** 2 * i * s + 3 * (1 - i) * i * i * c + i ** 3 * c];
        return t.jsx("circle", {
          cx: d.toFixed(1),
          cy: h.toFixed(1),
          r: "1.6",
          className: "tp-mote",
          style: {
            "--n": a * 2 + (i > .5 ? 1 : 0)
          }
        }, `${a}${i}`);
      })), n && e.map((s, a) => t.jsx("circle", {
        r: "2.2",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "2.6s",
          begin: `-${a * .65}s`,
          repeatCount: "indefinite",
          path: s
        })
      }, `m${a}`))]
    }), Fd.map(([s, a]) => t.jsxs("div", {
      className: "bd-signal",
      style: {
        top: a
      },
      children: [t.jsx("i", {}), s]
    }, s)), t.jsx("div", {
      className: "bd-sheet back"
    }), t.jsxs("div", {
      className: "bd-sheet",
      children: [t.jsxs("div", {
        className: "bd-head",
        children: [t.jsx("span", {
          children: "Operating Domain Brief"
        }), t.jsx("i", {
          children: t.jsx("b", {})
        })]
      }), t.jsx("ol", {
        children: BZ.map((s, a) => t.jsxs("li", {
          className: a < 5 ? "done" : "",
          style: {
            "--k": a
          },
          children: [t.jsx("span", {
            className: "bd-num",
            children: String(a + 1).padStart(2, "0")
          }), t.jsx("span", {
            className: "bd-text",
            children: s
          }), t.jsx("span", {
            className: "bd-tick",
            children: a < 5 && t.jsx(j0, {
              weight: "bold"
            })
          })]
        }, s))
      })]
    })]
  });
}

const UZ = [320, 318, 66];

const f5 = [["Plan", Bg, 92, 262], ["Model", e1, 156, 128], ["Agent", wc, 320, 82], ["Tool", zc, 484, 128, "retry"], ["Human decision", Qt, 548, 262, "person"]];

const Pd = "M92 243 C96 190 120 150 156 128 C210 96 262 82 320 82 C378 82 430 96 484 128 C520 150 544 190 548 243";

function CoreWork() {
  const n = !Ae(),
    [e, s, a] = UZ,
    i = [...Array.from({
      length: 17
    }, (c, d) => `M${e + (d - 8) * 32} 432 L${e + (d - 8) * 110} 560`), ...[440, 454, 474, 502, 540].map(c => `M0 ${c} H640`)].join(" ");
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 560,
      children: [t.jsxs("defs", {
        children: [t.jsxs("radialGradient", {
          id: "cw-floor-g",
          cx: "0.5",
          cy: "0.1",
          r: "0.7",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#fff"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        }), t.jsx("mask", {
          id: "cw-floor-m",
          children: t.jsx("rect", {
            x: "0",
            y: "428",
            width: "640",
            height: "132",
            fill: "url(#cw-floor-g)"
          })
        }), t.jsx("filter", {
          id: "cw-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "560",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "cw-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "560",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "20"
          })
        })]
      }), t.jsx("ellipse", {
        cx: e,
        cy: s,
        rx: "250",
        ry: "200",
        fill: "#1f5fff",
        opacity: "0.18",
        filter: "url(#cw-wide)"
      }), t.jsx("path", {
        d: i,
        className: "cw-floor",
        mask: "url(#cw-floor-m)"
      }), t.jsx("ellipse", {
        cx: e,
        cy: "430",
        rx: "150",
        ry: "24",
        className: "cw-ring glow",
        filter: "url(#cw-soft)"
      }), t.jsx("ellipse", {
        cx: e,
        cy: "430",
        rx: "150",
        ry: "24",
        className: "cw-ring"
      }), t.jsx("ellipse", {
        cx: e,
        cy: "426",
        rx: "112",
        ry: "16",
        className: "cw-ring inner"
      }), f5.map(([c,, d, h]) => t.jsx("path", {
        d: `M${d} ${h} L${e} ${s}`,
        className: "cw-state"
      }, c)), t.jsx("path", {
        d: Pd,
        className: "cw-route glow",
        filter: "url(#cw-soft)"
      }), t.jsx("path", {
        d: Pd,
        className: "cw-route"
      }), t.jsx("path", {
        d: `M548 282 C548 380 520 470 ${e + 150} 492`,
        className: "cw-route"
      }), t.jsx("path", {
        d: "M548 96 a16 16 0 1 1 10 14",
        className: "cw-retry"
      }), t.jsx("path", {
        d: "M558 110 l-9 1 l6 6 z",
        className: "cw-arrow"
      }), n && [0, 1].map(c => t.jsx("circle", {
        r: "2.6",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "7s",
          begin: `-${c * 3.5}s`,
          repeatCount: "indefinite",
          path: `${Pd} L548 282 C548 380 520 470 ${e + 150} 492`
        })
      }, c))]
    }), t.jsxs("div", {
      className: "cw-orb",
      style: {
        left: e,
        top: s,
        width: a * 2,
        height: a * 2
      },
      children: [t.jsx("span", {
        className: "cw-orb-glow",
        "aria-hidden": "true"
      }), t.jsxs("span", {
        className: "orb-glass cw-orb-glass",
        children: [t.jsx("span", {
          className: "orb-swirl"
        }), t.jsx("span", {
          className: "orb-swirl two"
        })]
      }), t.jsx("img", {
        src: "/svg/intellient-core.svg",
        alt: "",
        className: "cw-logo"
      })]
    }), t.jsx("span", {
      className: "cw-state-label",
      style: {
        left: e,
        top: 462
      },
      children: "Workflow state"
    }), f5.map(([c, d, h, f, m]) => t.jsxs("div", {
      className: `cw-step${m ? ` ${m}` : ""}`,
      style: {
        left: h,
        top: f
      },
      children: [t.jsx(d, {
        weight: "duotone"
      }), t.jsx("span", {
        children: c
      }), m === "retry" && t.jsx("em", {
        children: "Retry"
      })]
    }, c)), t.jsxs("div", {
      className: "cw-step done",
      style: {
        left: e + 70,
        top: 500
      },
      children: [t.jsx(jt, {
        weight: "fill"
      }), t.jsx("span", {
        children: "Completion evidence"
      })]
    })]
  });
}

function CoreOrbits() {
  const n = [[180, 64], [270, 98], [360, 132], [450, 166]],
    e = !Ae();
  return t.jsxs("svg", {
    className: "pg-coreorbits",
    viewBox: "0 0 900 520",
    preserveAspectRatio: "xMinYMax meet",
    "aria-hidden": "true",
    children: [t.jsxs("defs", {
      children: [t.jsxs("radialGradient", {
        id: "co-core",
        cx: "40%",
        cy: "35%",
        r: "70%",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#8fcbff"
        }), t.jsx("stop", {
          offset: "0.35",
          stopColor: "#3f8cff"
        }), t.jsx("stop", {
          offset: "0.75",
          stopColor: "#10307a"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#06102a"
        })]
      }), t.jsx("filter", {
        id: "co-soft",
        filterUnits: "userSpaceOnUse",
        x: "-100",
        y: "-100",
        width: "1100",
        height: "720",
        children: t.jsx("feGaussianBlur", {
          stdDeviation: "5"
        })
      }), t.jsx("filter", {
        id: "co-wide",
        filterUnits: "userSpaceOnUse",
        x: "-100",
        y: "-100",
        width: "1100",
        height: "720",
        children: t.jsx("feGaussianBlur", {
          stdDeviation: "26"
        })
      })]
    }), t.jsx("circle", {
      cx: "170",
      cy: "470",
      r: "150",
      fill: "#1f5fff",
      opacity: "0.4",
      filter: "url(#co-wide)"
    }), n.map(([s, a], i) => t.jsxs("g", {
      children: [t.jsx("ellipse", {
        cx: "170",
        cy: "470",
        rx: s,
        ry: a,
        className: `co-ring${i === 1 ? " lit" : ""}`,
        transform: "rotate(-14 170 470)"
      }), i === 1 && t.jsx("ellipse", {
        cx: "170",
        cy: "470",
        rx: s,
        ry: a,
        className: "co-ring glow",
        transform: "rotate(-14 170 470)",
        filter: "url(#co-soft)"
      })]
    }, s)), n.map(([s, a], i) => [.15, .32, .6].map((c, d) => {
      const h = -Math.PI * (.18 + c),
        [f, m] = [s * Math.cos(h), a * Math.sin(h)],
        g = -14 * Math.PI / 180;
      return t.jsx("circle", {
        cx: (170 + f * Math.cos(g) - m * Math.sin(g)).toFixed(1),
        cy: (470 + f * Math.sin(g) + m * Math.cos(g)).toFixed(1),
        r: d === 1 ? 3 : 2,
        className: "co-node",
        style: {
          "--n": i + d
        }
      }, `${i}${d}`);
    })), e && t.jsx("circle", {
      r: "3",
      className: "hs-dot",
      children: t.jsx("animateMotion", {
        dur: "10s",
        repeatCount: "indefinite",
        path: "M-100 470 a270 98 0 1 1 540 0 a270 98 0 1 1 -540 0",
        rotate: "0"
      })
    }), t.jsx("circle", {
      cx: "170",
      cy: "470",
      r: "58",
      fill: "url(#co-core)",
      className: "co-core"
    }), t.jsx("ellipse", {
      cx: "150",
      cy: "440",
      rx: "26",
      ry: "12",
      className: "co-shine"
    })]
  });
}

function EntryHorizon() {
  const n = c => {
    const d = (c + 300) / 2200;
    return 1200 * ((1 - d) ** 2 + d * d) - 520 * d * (1 - d);
  };
  let e = 23;
  const s = () => (e = e * 16807 % 2147483647, e / 2147483647),
    a = Array.from({
      length: 220
    }, () => {
      const c = s() * 1600;
      return [c, n(c) + 10 + s() * 160, .5 + s()];
    }),
    i = [[420, 80], [600, 130], [1e3, 130], [1180, 80]];
  return t.jsxs("svg", {
    className: "pg-entry",
    viewBox: "0 0 1600 700",
    preserveAspectRatio: "xMidYMax slice",
    "aria-hidden": "true",
    children: [t.jsxs("defs", {
      children: [t.jsxs("linearGradient", {
        id: "eh-planet",
        x1: "0",
        y1: "470",
        x2: "0",
        y2: "760",
        gradientUnits: "userSpaceOnUse",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#081a4a"
        }), t.jsx("stop", {
          offset: "0.25",
          stopColor: "#040b1f"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#000"
        })]
      }), t.jsxs("linearGradient", {
        id: "eh-pin",
        x1: "0",
        y1: "1",
        x2: "0",
        y2: "0",
        children: [t.jsx("stop", {
          offset: "0",
          stopColor: "#8fcbff"
        }), t.jsx("stop", {
          offset: "1",
          stopColor: "#8fcbff",
          stopOpacity: "0"
        })]
      }), t.jsx("filter", {
        id: "eh-soft",
        filterUnits: "userSpaceOnUse",
        x: "0",
        y: "0",
        width: "1600",
        height: "700",
        children: t.jsx("feGaussianBlur", {
          stdDeviation: "5"
        })
      }), t.jsx("filter", {
        id: "eh-wide",
        filterUnits: "userSpaceOnUse",
        x: "0",
        y: "0",
        width: "1600",
        height: "700",
        children: t.jsx("feGaussianBlur", {
          stdDeviation: "26"
        })
      })]
    }), t.jsx("path", {
      d: "M-300 1200 Q800 -260 1900 1200 Z",
      fill: "url(#eh-planet)"
    }), a.map(([c, d, h], f) => t.jsx("circle", {
      cx: c.toFixed(0),
      cy: d.toFixed(0),
      r: h.toFixed(2),
      fill: "#8fcbff",
      opacity: (.12 + f % 5 * .06).toFixed(2)
    }, f)), t.jsx("path", {
      d: "M-300 1200 Q800 -260 1900 1200",
      fill: "none",
      stroke: "#1f5fff",
      strokeWidth: "26",
      opacity: "0.55",
      filter: "url(#eh-wide)"
    }), t.jsx("path", {
      d: "M-300 1200 Q800 -260 1900 1200",
      fill: "none",
      stroke: "#3f8cff",
      strokeWidth: "6",
      opacity: "0.8",
      filter: "url(#eh-soft)"
    }), t.jsx("path", {
      d: "M-300 1200 Q800 -260 1900 1200",
      fill: "none",
      stroke: "#e9f6ff",
      strokeWidth: "1.6"
    }), i.map(([c, d], h) => t.jsxs("g", {
      children: [t.jsx("rect", {
        x: c - .7,
        y: n(c) - d,
        width: "1.4",
        height: d,
        fill: "url(#eh-pin)"
      }), t.jsx("circle", {
        cx: c,
        cy: n(c) - d * .7,
        r: "2.4",
        className: "gd-node",
        style: {
          "--n": h
        }
      }), t.jsx("circle", {
        cx: c,
        cy: n(c),
        r: "2.6",
        className: "gd-node",
        style: {
          "--n": h + 2
        }
      })]
    }, c)), t.jsx("ellipse", {
      cx: "800",
      cy: "470",
      rx: "240",
      ry: "30",
      fill: "#3f8cff",
      opacity: "0.55",
      filter: "url(#eh-wide)"
    }), t.jsx("rect", {
      x: "796",
      y: "360",
      width: "8",
      height: "110",
      fill: "url(#eh-pin)",
      filter: "url(#eh-soft)"
    }), t.jsx("rect", {
      x: "799.2",
      y: "350",
      width: "1.6",
      height: "120",
      fill: "url(#eh-pin)"
    }), t.jsx("circle", {
      cx: "800",
      cy: "470",
      r: "5",
      fill: "#fff"
    }), t.jsx("path", {
      d: "M770 470 H830 M800 444 V496",
      stroke: "#e9f6ff",
      strokeWidth: "1.2",
      filter: "url(#eh-soft)"
    })]
  });
}

const p5 = [["Experience", null], ["Connection and action", "/svg/intellilink.svg", "IntelliLink"], ["Reasoning and orchestration", "/svg/intellient-core.svg", "Intellient Core"], ["Trust and control", "/svg/intellisphere.svg", "IntelliSphere"], ["Enterprise foundation", null]];

const Od = {
  cx: 210,
  top: 92,
  gap: 88,
  w: 170,
  h: 54,
  t: 10
};

function ArchStack() {
  const n = !Ae(),
    e = p5.map((h, f) => Od.top + f * Od.gap),
    {
      cx: s,
      w: a,
      h: i,
      t: c
    } = Od,
    d = `M${s} 20 V${e[4] + i}`;
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 560,
      children: [t.jsxs("defs", {
        children: [t.jsxs("linearGradient", {
          id: "as-top",
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "1",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#8fcbff",
            stopOpacity: "0.32"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#1f5fff",
            stopOpacity: "0.16"
          })]
        }), t.jsxs("linearGradient", {
          id: "as-top-hot",
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "1",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#8fcbff",
            stopOpacity: "0.55"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#3f8cff",
            stopOpacity: "0.32"
          })]
        }), t.jsx("filter", {
          id: "as-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "560",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "as-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "560",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "22"
          })
        })]
      }), t.jsx("ellipse", {
        cx: s,
        cy: e[4] + 30,
        rx: "230",
        ry: "60",
        fill: "#1f5fff",
        opacity: "0.35",
        filter: "url(#as-wide)"
      }), [...e].reverse().map((h, f) => {
        const m = 4 - f,
          g = m >= 1 && m <= 3;
        return t.jsxs("g", {
          className: `as-slab${g ? " hot" : ""}`,
          children: [t.jsx("path", {
            d: `M${s - a} ${h} L${s} ${h + i} V${h + i + c} L${s - a} ${h + c} Z`,
            className: "l"
          }), t.jsx("path", {
            d: `M${s + a} ${h} L${s} ${h + i} V${h + i + c} L${s + a} ${h + c} Z`,
            className: "r"
          }), t.jsx("path", {
            d: `M${s - a} ${h} L${s} ${h - i} L${s + a} ${h} L${s} ${h + i} Z`,
            fill: `url(#${g ? "as-top-hot" : "as-top"})`,
            className: "t"
          }), t.jsx("path", {
            d: `M${s - a * .62} ${h} L${s} ${h - i * .62} L${s + a * .62} ${h} L${s} ${h + i * .62} Z`,
            className: "in"
          }), t.jsx("path", {
            d: `M${s + a} ${h} H${s + a + 34}`,
            className: "as-tick"
          })]
        }, h);
      }), t.jsx("path", {
        d,
        className: "as-beam glow",
        filter: "url(#as-soft)"
      }), t.jsx("path", {
        d,
        className: "as-beam"
      }), t.jsx("path", {
        d: `M${s + 14} ${e[4] + i} V20`,
        className: "as-beam back"
      }), e.map(h => t.jsx("circle", {
        cx: s,
        cy: h,
        r: "4",
        className: "as-node"
      }, h)), n && t.jsxs(t.Fragment, {
        children: [t.jsx("circle", {
          r: "3",
          className: "hs-dot",
          children: t.jsx("animateMotion", {
            dur: "4s",
            repeatCount: "indefinite",
            path: d
          })
        }), t.jsx("circle", {
          r: "2.4",
          className: "hs-dot",
          children: t.jsx("animateMotion", {
            dur: "4s",
            begin: "-2s",
            repeatCount: "indefinite",
            path: `M${s + 14} ${e[4] + i} V20`
          })
        })]
      })]
    }), p5.map(([h, f, m], g) => t.jsxs("div", {
      children: [f && t.jsx("img", {
        src: f,
        alt: "",
        className: "as-logo",
        style: {
          left: s - 62,
          top: e[g] - 4
        }
      }), t.jsxs("div", {
        className: `as-chip${f ? " hot" : ""}`,
        style: {
          left: s + a + 36,
          top: e[g]
        },
        children: [t.jsx("span", {
          className: "as-num",
          children: String(g + 1).padStart(2, "0")
        }), t.jsxs("span", {
          children: [t.jsx("b", {
            children: h
          }), m && t.jsx("em", {
            children: m
          })]
        })]
      })]
    }, h))]
  });
}

const m5 = [["Performance", .8], ["Latency", .9], ["Economics", .6], ["Data boundaries", 1], ["Supportability", .7]];

const KZ = [["Model A", [.95, .5, .4, .6, .7]], ["Model B", [.82, .92, .7, 1, .8]], ["Model C", [.55, .95, .95, .5, .6]]];

function ModelFit() {
  const n = !Ae(),
    e = [88, 210, 332],
    s = e.map(a => `M262 210 C300 210 300 ${a} 350 ${a}`);
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 420,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "mf-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "420",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "mf-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "420",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "20"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "420",
        cy: "210",
        rx: "220",
        ry: "150",
        fill: "#1f5fff",
        opacity: "0.2",
        filter: "url(#mf-wide)"
      }), s.map((a, i) => t.jsx("path", {
        d: a,
        className: `mf-link${i === 1 ? " hot" : ""}`
      }, a)), t.jsx("path", {
        d: s[1],
        className: "mf-link glow",
        filter: "url(#mf-soft)"
      }), n && [0, 1].map(a => t.jsx("circle", {
        r: "2.4",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "2.4s",
          begin: `-${a * 1.2}s`,
          repeatCount: "indefinite",
          path: s[1]
        })
      }, a)), t.jsx("rect", {
        x: "292",
        y: "58",
        width: "16",
        height: "304",
        rx: "8",
        className: "mf-gate"
      })]
    }), t.jsx("span", {
      className: "mf-gate-label",
      style: {
        left: 300,
        top: 384
      },
      children: "Evaluation"
    }), t.jsxs("div", {
      className: "mf-work",
      children: [t.jsx("span", {
        className: "mf-title",
        children: "Workload"
      }), m5.map(([a, i]) => t.jsxs("div", {
        className: "mf-row",
        children: [t.jsx("span", {
          children: a
        }), t.jsx("i", {
          children: t.jsx("b", {
            style: {
              width: `${i * 100}%`
            }
          })
        })]
      }, a))]
    }), KZ.map(([a, i], c) => t.jsxs("div", {
      className: `mf-model${c === 1 ? " hot" : ""}`,
      style: {
        top: e[c]
      },
      children: [t.jsxs("div", {
        className: "mf-model-head",
        children: [t.jsx("span", {
          children: a
        }), c === 1 && t.jsxs("em", {
          children: [t.jsx(j0, {
            weight: "bold"
          }), "Fits"]
        })]
      }), t.jsx("div", {
        className: "mf-bars",
        children: i.map((d, h) => t.jsx("i", {
          className: d >= m5[h][1] ? "ok" : "",
          style: {
            height: `${d * 100}%`
          }
        }, h))
      })]
    }, a))]
  });
}

const Rd = [["Core systems", wn, 84, 352], ["Workflows", ir, 222, 284], ["Governance", Fn, 360, 212], ["Delivery teams", St, 486, 154]];

const Id = "M20 392 C60 380 70 360 84 352 C140 320 170 300 222 284 C280 266 310 236 360 212 C410 190 450 168 486 154 C524 138 554 124 578 112";

function Origin() {
  const n = !Ae();
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 440,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "og-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "440",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "og-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "440",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "20"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "340",
        cy: "250",
        rx: "300",
        ry: "150",
        fill: "#1f5fff",
        opacity: "0.16",
        filter: "url(#og-wide)"
      }), Rd.map(([e,, s, a]) => t.jsx("path", {
        d: `M${s} ${a + 34} V420`,
        className: "og-drop"
      }, e)), t.jsx("path", {
        d: "M0 420 H640",
        className: "og-base"
      }), t.jsx("path", {
        d: Id,
        className: "og-path glow",
        filter: "url(#og-soft)"
      }), t.jsx("path", {
        d: Id,
        className: "og-path"
      }), Rd.map(([e,, s, a]) => t.jsx("circle", {
        cx: s,
        cy: a,
        r: "4",
        className: "og-node"
      }, e)), n && [0, 1].map(e => t.jsx("circle", {
        r: "2.6",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "5s",
          begin: `-${e * 2.5}s`,
          repeatCount: "indefinite",
          path: Id
        })
      }, e))]
    }), Rd.map(([e, s, a, i], c) => t.jsxs("div", {
      className: "og-tile",
      style: {
        left: a - (c === 3 ? 44 : 0),
        top: i - 44,
        "--k": c
      },
      children: [t.jsx(s, {
        weight: "duotone"
      }), t.jsx("span", {
        children: e
      })]
    }, e)), t.jsxs("div", {
      className: "og-mark",
      style: {
        left: 584,
        top: 108
      },
      children: [t.jsxs("span", {
        className: "orb-glass og-mark-glass",
        children: [t.jsx("span", {
          className: "orb-swirl"
        }), t.jsx("span", {
          className: "orb-swirl two"
        })]
      }), t.jsxs("svg", {
        viewBox: "0 0 216 216",
        className: "in-mark",
        "aria-hidden": "true",
        children: [t.jsx("path", {
          d: "M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818"
        }), t.jsx("path", {
          d: "M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z"
        }), t.jsx("rect", {
          width: "20.488",
          height: "57.366",
          x: "97.293",
          y: "122.341",
          rx: "10.244"
        })]
      })]
    })]
  });
}

function Company() {
  const n = !Ae(),
    e = [[110, 96], [320, 72], [530, 96]].map(([a, i]) => `M${a} ${i + 52} C${a} ${i + 120} 320 170 320 222`),
    s = "M320 300 C320 350 380 380 470 392";
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 460,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "cp-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "460",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "cp-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "460",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "22"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "320",
        cy: "262",
        rx: "230",
        ry: "150",
        fill: "#1f5fff",
        opacity: "0.2",
        filter: "url(#cp-wide)"
      }), t.jsx("ellipse", {
        cx: "320",
        cy: "324",
        rx: "120",
        ry: "18",
        className: "cp-ring"
      }), e.map(a => t.jsx("path", {
        d: a,
        className: "cp-link glow",
        filter: "url(#cp-soft)"
      }, a)), e.map(a => t.jsx("path", {
        d: a,
        className: "cp-link"
      }, `c${a}`)), t.jsx("path", {
        d: s,
        className: "cp-link out glow",
        filter: "url(#cp-soft)"
      }), t.jsx("path", {
        d: s,
        className: "cp-link out"
      }), n && [...e, s].map((a, i) => t.jsx("circle", {
        r: "2.4",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "2.8s",
          begin: `-${i * .7}s`,
          repeatCount: "indefinite",
          path: a
        })
      }, `m${i}`))]
    }), t.jsxs("div", {
      className: "cp-src",
      style: {
        left: 110,
        top: 96
      },
      children: [t.jsx(Pc, {
        weight: "duotone"
      }), t.jsx("span", {
        children: "Operating model"
      })]
    }), t.jsxs("div", {
      className: "cp-src",
      style: {
        left: 320,
        top: 72
      },
      children: [t.jsx("span", {
        className: "cp-logos",
        children: ["/svg/intellilink.svg", "/svg/intellient-core.svg", "/svg/intellisphere.svg"].map(a => t.jsx("img", {
          src: a,
          alt: ""
        }, a))
      }), t.jsx("span", {
        children: "Technology"
      })]
    }), t.jsxs("div", {
      className: "cp-src",
      style: {
        left: 530,
        top: 96
      },
      children: [t.jsx(St, {
        weight: "duotone"
      }), t.jsx("span", {
        children: "Specialist capability"
      })]
    }), t.jsxs("div", {
      className: "cp-core",
      style: {
        left: 320,
        top: 262
      },
      children: [t.jsx("span", {
        className: "cp-core-glow"
      }), t.jsxs("span", {
        className: "orb-glass cp-core-glass",
        children: [t.jsx("span", {
          className: "orb-swirl"
        }), t.jsx("span", {
          className: "orb-swirl two"
        })]
      }), t.jsxs("svg", {
        viewBox: "0 0 216 216",
        className: "in-mark",
        "aria-hidden": "true",
        children: [t.jsx("path", {
          d: "M149.102 166.668c3.863 5.453 11.491 6.799 16.333 2.193a84 84 0 0 0 21.609-87.97 84 84 0 0 0-82.935-56.821 84 84 0 0 0-49.308 149.311c5.201 4.196 12.693 2.233 16.099-3.518s1.396-13.094-3.553-17.586a59.8 59.8 0 0 1 37.75-104.025 59.798 59.798 0 0 1 46.111 100.598c-4.565 4.881-5.97 12.365-2.106 17.818"
        }), t.jsx("path", {
          d: "M104.373 65.108c.537-1.453 2.592-1.453 3.13 0l4.93 13.322c.169.457.529.817.986.986l13.322 4.93c1.453.538 1.453 2.593 0 3.13l-13.322 4.93c-.457.17-.817.53-.986.986l-4.93 13.323c-.538 1.453-2.593 1.453-3.13 0l-4.93-13.323a1.67 1.67 0 0 0-.986-.986l-13.323-4.93c-1.453-.537-1.453-2.592 0-3.13l13.323-4.93c.457-.169.817-.529.986-.986z"
        }), t.jsx("rect", {
          width: "20.488",
          height: "57.366",
          x: "97.293",
          y: "122.341",
          rx: "10.244"
        })]
      })]
    }), t.jsx("span", {
      className: "cp-air",
      style: {
        left: 382,
        top: 362
      },
      children: "AIR"
    }), t.jsxs("div", {
      className: "cp-dest",
      style: {
        left: 540,
        top: 392
      },
      children: [t.jsx(hi, {
        weight: "duotone"
      }), t.jsx("span", {
        children: "Customer environment"
      })]
    })]
  });
}

const g5 = [["Access", ro, 196], ["Policy", Fn, 320], ["Authority", ri, 444]];

function Gates3D() {
  const n = !Ae(),
    e = "M96 236 H540",
    s = "M320 236 C300 236 290 300 268 318",
    a = [...Array.from({
      length: 19
    }, (i, c) => `M${320 + (c - 9) * 32} 330 L${320 + (c - 9) * 110} 520`), ...[338, 352, 372, 400, 440, 500].map(i => `M0 ${i} H640`)].join(" ");
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 520,
      children: [t.jsxs("defs", {
        children: [t.jsxs("radialGradient", {
          id: "gt-floor-g",
          cx: "0.5",
          cy: "0.1",
          r: "0.7",
          children: [t.jsx("stop", {
            offset: "0",
            stopColor: "#fff"
          }), t.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        }), t.jsx("mask", {
          id: "gt-floor-m",
          children: t.jsx("rect", {
            x: "0",
            y: "326",
            width: "640",
            height: "194",
            fill: "url(#gt-floor-g)"
          })
        }), t.jsx("filter", {
          id: "gt-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "520",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "gt-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "520",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "20"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "320",
        cy: "250",
        rx: "300",
        ry: "120",
        fill: "#1f5fff",
        opacity: "0.18",
        filter: "url(#gt-wide)"
      }), t.jsx("path", {
        d: a,
        className: "gt-floor",
        mask: "url(#gt-floor-m)"
      }), t.jsx("path", {
        d: e,
        className: "gt-route glow",
        filter: "url(#gt-soft)"
      }), t.jsx("path", {
        d: e,
        className: "gt-route"
      }), t.jsx("path", {
        d: s,
        className: "gt-held"
      }), t.jsx("circle", {
        cx: "268",
        cy: "318",
        r: "9",
        className: "gt-hold"
      }), t.jsx("path", {
        d: "M264 314 L272 322 M272 314 L264 322",
        className: "gt-hold-x"
      }), t.jsx("path", {
        d: "M444 278 V392",
        className: "gt-drop"
      }), t.jsx("path", {
        d: "M444 430 C444 452 470 462 500 462",
        className: "gt-drop"
      }), g5.map(([i,, c]) => t.jsx("circle", {
        cx: c,
        cy: "236",
        r: "4",
        className: "gt-node"
      }, i)), n && [0, 1].map(i => t.jsx("circle", {
        r: "2.6",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "3.6s",
          begin: `-${i * 1.8}s`,
          repeatCount: "indefinite",
          path: e
        })
      }, i))]
    }), g5.map(([i, c, d]) => t.jsxs("div", {
      children: [t.jsx("span", {
        className: "gt-gate",
        style: {
          left: d,
          top: 236
        }
      }), t.jsxs("div", {
        className: "gt-tag",
        style: {
          left: d,
          top: 116
        },
        children: [t.jsx(c, {
          weight: "duotone"
        }), t.jsx("span", {
          children: i
        })]
      })]
    }, i)), t.jsxs("div", {
      className: "gt-chip",
      style: {
        left: 56,
        top: 236
      },
      children: [t.jsx(e1, {
        weight: "duotone"
      }), t.jsx("span", {
        children: "Model"
      })]
    }), t.jsxs("div", {
      className: "gt-chip hot",
      style: {
        left: 566,
        top: 236
      },
      children: [t.jsx(jt, {
        weight: "fill"
      }), t.jsx("span", {
        children: "Authorised"
      })]
    }), t.jsx("span", {
      className: "gt-held-label",
      style: {
        left: 268,
        top: 346
      },
      children: "Held at the boundary"
    }), t.jsxs("div", {
      className: "gt-chip",
      style: {
        left: 444,
        top: 410
      },
      children: [t.jsx(Qt, {
        weight: "fill"
      }), t.jsx("span", {
        children: "Accountable person"
      })]
    }), t.jsxs("div", {
      className: "gt-chip evidence",
      style: {
        left: 566,
        top: 462
      },
      children: [t.jsx(Qe, {
        weight: "duotone"
      }), t.jsx("span", {
        children: "Evidence retained"
      })]
    })]
  });
}

const t$ = [["Design", [0, 1, 2]], ["Production", [3, 4, 5]], ["Review", [6]]];

function ControlLoop() {
  const [n, e, s, a] = [260, 190, 200, 120],
    i = f => {
      const m = -Math.PI / 2 + f / 7 * Math.PI * 2;
      return [n + s * Math.cos(m), e + a * Math.sin(m)];
    },
    c = (f, m) => `M${Array.from({
      length: 30
    }, (x, v) => {
      const j = -Math.PI / 2 + (f + (m - f) * (v / 29)) / 7 * Math.PI * 2;
      return [n + s * Math.cos(j), e + a * Math.sin(j)];
    }).map(x => x.map(v => v.toFixed(1)).join(" ")).join(" L")}`,
    d = !Ae(),
    h = `M${n} ${e - a} A${s} ${a} 0 1 1 ${n - .1} ${e - a}`;
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 520,
      h: 360,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "cl-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "520",
          height: "360",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "cl-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "520",
          height: "360",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "20"
          })
        })]
      }), t.jsx("ellipse", {
        cx: n,
        cy: e,
        rx: s * .7,
        ry: a * .7,
        fill: "#1f5fff",
        opacity: "0.22",
        filter: "url(#cl-wide)"
      }), t.jsx("ellipse", {
        cx: n,
        cy: e,
        rx: s,
        ry: a,
        className: "cl-ring"
      }), [[0, 2], [3, 5], [6, 6.6]].map(([f, m], g) => t.jsx("path", {
        d: c(f - .2, m + .2),
        className: `cl-arc${g === 1 ? " hot" : ""}`
      }, g)), t.jsx("path", {
        d: c(2.8, 5.2),
        className: "cl-arc glow",
        filter: "url(#cl-soft)"
      }), d && t.jsx("circle", {
        r: "3",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "9s",
          repeatCount: "indefinite",
          path: h
        })
      }), Array.from({
        length: 7
      }, (f, m) => {
        const [g, x] = i(m);
        return t.jsx("circle", {
          cx: g,
          cy: x,
          r: "13",
          className: `cl-node${m >= 3 && m <= 5 ? " hot" : ""}`
        }, m);
      }), Array.from({
        length: 7
      }, (f, m) => {
        const [g, x] = i(m);
        return t.jsx("text", {
          x: g,
          y: x + 4,
          className: "cl-num",
          textAnchor: "middle",
          children: String(m + 1).padStart(2, "0")
        }, `t${m}`);
      })]
    }), t$.map(([f, m], g) => {
      const x = (m[0] + m[m.length - 1]) / 2,
        v = -Math.PI / 2 + x / 7 * Math.PI * 2;
      return t.jsx("span", {
        className: `cl-label${g === 1 ? " hot" : ""}`,
        style: {
          left: n + s * .55 * Math.cos(v),
          top: e + a * .55 * Math.sin(v)
        },
        children: f
      }, f);
    })]
  });
}

function cl({
  inputs: n,
  hub: e,
  gates: s = [],
  out: a,
  owner: i
}) {
  const c = !Ae(),
    d = n.length,
    h = n.map((v, j) => 240 + (j - (d - 1) / 2) * 76),
    f = 262,
    m = h.map(v => `M168 ${v} C212 ${v} 214 240 ${f - 48} 240`),
    g = s.map((v, j) => s.length === 1 ? 410 : 350 + j * (120 / (s.length - 1))),
    x = `M${f + 48} 240 H${a ? 498 : 560}`;
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 480,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "sf-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "480",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "sf-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "480",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "22"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "340",
        cy: "240",
        rx: "280",
        ry: "170",
        fill: "#1f5fff",
        opacity: "0.18",
        filter: "url(#sf-wide)"
      }), t.jsx("ellipse", {
        cx: f,
        cy: "330",
        rx: "86",
        ry: "13",
        className: "sf-ring"
      }), m.map(v => t.jsx("path", {
        d: v,
        className: "sf-wire glow",
        filter: "url(#sf-soft)"
      }, v)), m.map(v => t.jsx("path", {
        d: v,
        className: "sf-wire"
      }, `c${v}`)), t.jsx("path", {
        d: x,
        className: "sf-route glow",
        filter: "url(#sf-soft)"
      }), t.jsx("path", {
        d: x,
        className: "sf-route"
      }), i && t.jsx("path", {
        d: `M${a ? 540 : 560} 262 V368`,
        className: "sf-drop"
      }), c && [...m, x].map((v, j) => t.jsx("circle", {
        r: "2.2",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "2.8s",
          begin: `-${j * .6}s`,
          repeatCount: "indefinite",
          path: v
        })
      }, `m${j}`))]
    }), n.map(([v, j], A) => t.jsxs("div", {
      className: "sf-in",
      style: {
        top: h[A]
      },
      children: [t.jsx(j, {
        weight: "duotone"
      }), t.jsx("span", {
        children: v
      })]
    }, v)), t.jsx("div", {
      className: "sf-hub",
      style: {
        left: f,
        top: 240
      },
      children: t.jsxs("span", {
        className: "orb-glass sf-hub-glass",
        children: [t.jsx("span", {
          className: "orb-swirl"
        }), t.jsx("span", {
          className: "orb-swirl two"
        })]
      })
    }), t.jsx("span", {
      className: "sf-hub-label",
      style: {
        left: f,
        top: 300
      },
      children: e
    }), s.map(([v, j], A) => t.jsxs("div", {
      children: [t.jsx("span", {
        className: "sf-gate",
        style: {
          left: g[A],
          top: 240
        }
      }), t.jsxs("div", {
        className: "sf-gate-tag",
        style: {
          left: g[A],
          top: A % 2 ? 340 : 140
        },
        children: [t.jsx(j, {
          weight: "duotone"
        }), t.jsx("span", {
          children: v
        })]
      })]
    }, v)), a && t.jsxs("div", {
      className: "sf-out",
      style: {
        left: 556,
        top: 240
      },
      children: [t.jsx(jt, {
        weight: "fill"
      }), t.jsx("span", {
        children: a
      })]
    }), i && t.jsxs("div", {
      className: "sf-owner",
      style: {
        left: a ? 540 : 560,
        top: 392
      },
      children: [t.jsx(Qt, {
        weight: "fill"
      }), t.jsx("span", {
        children: i
      })]
    }), t.jsx("span", {
      className: "sf-note",
      children: "Illustrative"
    })]
  });
}

function Dd({
  title: n,
  parts: e,
  before: s,
  after: a,
  good: i
}) {
  const c = !Ae(),
    d = s.reduce((g, x) => g + x, 0),
    h = 520,
    f = g => {
      let x = 0;
      return g.map(v => {
        const j = [x, v / d * h];
        return x += j[1], j;
      });
    },
    m = [["Before", f(s)], ["After", f(a)]];
  return t.jsxs(t.Fragment, {
    children: [t.jsxs(ke, {
      w: 640,
      h: 420,
      children: [t.jsxs("defs", {
        children: [t.jsx("filter", {
          id: "bk-soft",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "420",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "4"
          })
        }), t.jsx("filter", {
          id: "bk-wide",
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "640",
          height: "420",
          children: t.jsx("feGaussianBlur", {
            stdDeviation: "22"
          })
        })]
      }), t.jsx("ellipse", {
        cx: "320",
        cy: "210",
        rx: "300",
        ry: "150",
        fill: "#1f5fff",
        opacity: "0.16",
        filter: "url(#bk-wide)"
      }), Array.from({
        length: 11
      }, (g, x) => t.jsx("path", {
        d: `M${60 + x * 52} 96 V330`,
        className: "bk-grid"
      }, x)), m.map(([, g], x) => g.map(([v, j], A) => {
        const M = x ? 236 : 140,
          b = i === A;
        return t.jsx("rect", {
          x: 60 + v + 2,
          y: M,
          width: Math.max(j - 4, 2),
          height: "44",
          rx: "8",
          className: `bk-seg s${A}${b ? " hot" : ""}${x ? " after" : ""}`
        }, `${x}${A}`);
      })), t.jsx("path", {
        d: `M${60 + f(a).reduce((g, [x, v]) => x + v, 0)} 228 V290`,
        className: "bk-end"
      }), c && t.jsx("circle", {
        r: "3",
        className: "hs-dot",
        children: t.jsx("animateMotion", {
          dur: "3.4s",
          repeatCount: "indefinite",
          path: `M60 258 H${60 + f(a).reduce((g, [x, v]) => x + v, 0)}`
        })
      })]
    }), t.jsx("span", {
      className: "bk-title",
      children: n
    }), m.map(([g], x) => t.jsx("span", {
      className: "bk-row",
      style: {
        top: x ? 258 : 162
      },
      children: g
    }, g)), t.jsx("div", {
      className: "bk-legend",
      children: e.map((g, x) => t.jsxs("span", {
        className: `s${x}${i === x ? " hot" : ""}`,
        children: [t.jsx("i", {}), g]
      }, g))
    }), t.jsx("span", {
      className: "sf-note",
      children: "Illustrative"
    })]
  });
}

const DETAIL_SCENES = {
  "cx-manufacturing": () => t.jsx(cl, {
    inputs: [["Production", Oc], ["Quality", jt], ["Maintenance", zc], ["Supply", tr]],
    hub: "Plant decision",
    out: "Decision made",
    owner: "Plant lead"
  }),
  "cx-bfsi": () => t.jsx(cl, {
    inputs: [["Application", Qe], ["Customer record", wn], ["Risk signals", mi]],
    hub: "Case assembled",
    gates: [["Evidence", Qe], ["Authority", ri]],
    out: "Decision",
    owner: "Accountable officer"
  }),
  "cx-healthcare-life-sciences": () => t.jsx(cl, {
    inputs: [["Knowledge", tr], ["Documents", Qe], ["Operations", Ic]],
    hub: "Evidence prepared",
    gates: [["Review", ao]],
    out: "Ready for review",
    owner: "Accountable reviewer"
  }),
  "cx-enterprise-services": () => t.jsx(cl, {
    inputs: [["Service request", hi], ["Knowledge", wn], ["Onboarding", St], ["Managed work", Jr]],
    hub: "Context reassembled",
    out: "Hand-off complete",
    owner: "Service owner"
  }),
  "cx-operating-performance": () => t.jsx(Dd, {
    title: "Elapsed time for one case",
    parts: ["Work", "Waiting", "Exceptions", "Rework"],
    before: [18, 44, 22, 16],
    after: [18, 14, 8, 4],
    good: 0
  }),
  "cx-revenue-movement": () => t.jsx(Dd, {
    title: "Time to a commercial decision",
    parts: ["Finding context", "Hand-offs", "Approval", "Decision"],
    before: [34, 30, 24, 12],
    after: [10, 8, 12, 12],
    good: 3
  }),
  "cx-employee-capacity": () => t.jsx(Dd, {
    title: "Where a specialist's week goes",
    parts: ["Coordination", "Reconstruction", "Expertise applied"],
    before: [36, 30, 34],
    after: [12, 8, 80],
    good: 2
  }),
  "cx-risk-control": () => t.jsx(cl, {
    inputs: [["Request", ou], ["Data", wn]],
    hub: "In the workflow",
    gates: [["Permissions", mu], ["Evidence", Qe], ["Approval", ri]],
    out: "Action taken",
    owner: "Exception owner"
  })
};

export { LayerStack, MODEL_LAYERS, ModelPath, Rise, Request, Domain, Terrain, CubeFlow, HappyPath, CaseChain, TechStack, Hub, Funnel, AuditPanels, Brief, Optional, Owner, LinkHub, GovernView, ResidencyThread, BriefDoc, CoreWork, ArchStack, Origin, Company, Gates3D, ControlLoop, DETAIL_SCENES, ModelFit, Handoff, Specialists, GovernDome, Route, Globe, CoreOrbits, EntryHorizon };
