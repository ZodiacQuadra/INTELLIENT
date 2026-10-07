import { useEffect, useRef, useState } from 'react';

/*
  Live "eclipse aurora": a dark planet limb with a bright rim, and shimmering vertical
  light curtains rising off it. Single-hue (blue) take on the Cosmoq hero. The rim peaks
  just above the console so the console sits on the planet.
*/

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;      // canvas size in device px
uniform float uTime;
uniform float uLimb;    // limb peak, device px from the top
uniform float uRadius;  // planet radius, device px
uniform float uScale;   // device px per CSS px

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// Gradient noise with a quintic fade: smooth, with none of value noise's creases.
vec2 grad(vec2 p) { float a = hash(p) * 6.2831853; return vec2(cos(a), sin(a)); }
float gnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(grad(i), f);
  float b = dot(grad(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(grad(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(grad(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 1.4;
}

void main() {
  float x = gl_FragCoord.x;
  float y = uRes.y - gl_FragCoord.y;           // top-down
  float dx = x - uRes.x * 0.5;
  float dy = y - (uLimb + uRadius);
  float d = (sqrt(dx * dx + dy * dy) - uRadius) / uScale;  // CSS px above (+) / inside (-) the limb

  float u = dx / (uRes.x * 0.5);               // -1 .. 1 across the width
  float alt = max(d, 0.0) / 700.0;             // normalised altitude above the limb
  float t = uTime;

  float cent = exp(-u * u * 34.0);             // the hot central column
  float side = smoothstep(1.7, 0.0, abs(u));

  // Curtains: soft columns of varied width from layered gradient noise, drifting slowly.
  float curt = 0.55 * gnoise(vec2(u * 4.5, t * 0.07))
             + 0.30 * gnoise(vec2(u * 9.5 + 11.0, t * 0.10))
             + 0.15 * gnoise(vec2(u * 19.0 + 23.0, t * 0.14));
  float band = smoothstep(-0.45, 0.55, curt);
  band = band * band * (3.0 - 2.0 * band);
  float len = 0.38 + 0.7 * smoothstep(-0.6, 0.7, gnoise(vec2(u * 2.6 + 7.0, t * 0.05))) + cent * 0.5;
  // Light travelling up each curtain: the aurora's shimmer.
  float shimmer = 0.84 + 0.16 * gnoise(vec2(u * 6.0, alt * 3.0 - t * 0.22));
  float ray = (0.12 + band * 1.9 + cent * 0.9) * exp(-alt / len) * side * shimmer;
  // Keep the band behind the headline copy calmer so the text stays readable.
  ray *= 1.0 - 0.42 * exp(-u * u * 3.0) * smoothstep(0.18, 0.45, alt);
  ray *= smoothstep(-2.0, 6.0, d);

  // Rim: a crisp anti-aliased line on the limb, a tight glow and a wide halo.
  float core = exp(-(d * d) / 2.4);
  float tight = exp(-abs(d) / 10.0);
  float rim = core * (1.1 + 1.8 * cent + 0.4 * side) + tight * (0.35 + 0.9 * cent) * side;
  float halo = exp(-max(d, 0.0) / (90.0 + 140.0 * cent)) * (0.45 + 0.8 * cent) * side;
  float atmos = d < 0.0 ? exp(d / 35.0) * (0.45 + 0.8 * cent) : 0.0;

  // Blue-only palette: royal blue left, electric cyan right, ice-white at the core.
  vec3 deep = vec3(0.10, 0.30, 1.0);
  vec3 cyan = vec3(0.22, 0.70, 1.0);
  vec3 ice = vec3(0.86, 0.95, 1.0);
  vec3 hue = mix(deep, cyan, smoothstep(-0.95, 0.95, u));
  hue = mix(hue, deep, clamp(alt * 1.1, 0.0, 0.7));
  vec3 col = mix(hue, ice, cent * exp(-alt / 0.22));
  vec3 rimCol = mix(hue, ice, 0.4 + 0.6 * cent);

  vec3 c = col * ray * 0.95 + rimCol * (rim * 1.6 + halo) + hue * atmos * 0.6;

  // Stars: soft round points on a jittered grid, twinkling slowly.
  vec2 cp = gl_FragCoord.xy / uScale;
  vec2 cell = floor(cp / 38.0);
  vec2 r = vec2(hash(cell), hash(cell + 7.3));
  vec2 sp = (cell + 0.15 + 0.7 * r) * 38.0;
  float sd = length(cp - sp);
  float twinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(t * 1.3 + r.x * 40.0));
  float star = step(0.84, hash(cell + 3.1)) * exp(-sd * sd / 0.6) * twinkle * (0.25 + 0.5 * r.y);
  c += vec3(0.78, 0.88, 1.0) * star * step(0.0, d) * (1.0 - clamp(ray * 1.6, 0.0, 1.0));

  c = 1.0 - exp(-c * 1.55);                   // soft tone map: the core blooms to white instead of clipping
  c += (hash(gl_FragCoord.xy + floor(t * 24.0) * 1.37) - 0.5) * 0.028;  // fine film grain, also removes banding
  gl_FragColor = vec4(max(c, 0.0), 1.0);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

export default function HeroAurora() {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.closest('.hero');
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!canvas || !hero || !gl) { setFailed(true); return undefined; }

    let prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch {
      setFailed(true);
      return undefined;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = Object.fromEntries(['uRes', 'uTime', 'uLimb', 'uRadius', 'uScale'].map((n) => [n, gl.getUniformLocation(prog, n)]));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Full resolution so the rim stays a crisp line.
    const scale = Math.min(window.devicePixelRatio || 1, 2);

    const layout = () => {
      const stage = hero.querySelector('.console-stage');
      const w = hero.clientWidth;
      const limbCss = stage ? stage.offsetTop - (w < 760 ? 20 : 60) : 640;
      const hCss = limbCss + 420;
      canvas.style.height = `${hCss}px`;
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(hCss * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uLimb, limbCss * scale);
      gl.uniform1f(U.uRadius, Math.max(w * 0.95, 900) * scale);
      gl.uniform1f(U.uScale, scale);
    };

    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const draw = (now) => {
      gl.uniform1f(U.uTime, reduce ? 12 : (now - t0) / 1000 + 12);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!reduce && !raf) raf = requestAnimationFrame(loop); };

    layout();
    draw(performance.now());
    start();

    const ro = new ResizeObserver(() => { layout(); draw(performance.now()); });
    ro.observe(hero);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  if (failed) return <div className="hero-bg" aria-hidden="true" />;
  return <canvas ref={ref} className="hero-aurora" aria-hidden="true" />;
}
