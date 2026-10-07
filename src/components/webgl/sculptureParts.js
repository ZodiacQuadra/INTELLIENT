/**
 * Pure THREE builders for the hero sculpture. THREE is injected because the
 * library is lazy-loaded by HeroSculpture (keeps it out of the initial bundle).
 *
 * World units: floor is y = 0, the trio is ~5 units wide, the centre loop ~1.7 tall.
 */

const TAU = Math.PI * 2;
const TRAIL_START = (210 * Math.PI) / 180; // bottom-left vertex: trails begin on the bottom rim, like the reference

// Periodic (integer-frequency) noise so the ribbon closes without a seam.
const noise = (a, seed) =>
  Math.sin(2 * a + seed) * 0.5 + Math.sin(4 * a + seed * 1.7) * 0.3 + Math.sin(5 * a + seed * 0.6) * 0.2;

const angDist = (a, b) => {
  let d = (a - b) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

/**
 * A folded, chrome ribbon bent into a rounded triangle that stands on the floor.
 * Returns the ribbon geometry plus the two rim curves (used for edge lines and light trails).
 */
export function buildLoopData(THREE, cfg) {
  const { R, half, crumple, pinch, pinchAt, swoosh, seed, flare = 0.85, bow: bowK = 0.24, sx = 1 } = cfg;
  const N = 360;
  const M = 8;

  // Polar triangle with softened corners: vertex at the top, flat base on the floor.
  const RV = R * 1.31;
  const polar = (th) => {
    const psi = (((th - Math.PI / 2) % (TAU / 3)) + TAU / 3) % (TAU / 3);
    const poly = (RV * 0.5) / Math.cos(psi - Math.PI / 3);
    return poly * 0.72 + RV * 0.8 * 0.28;
  };
  const base = polar((3 * Math.PI) / 2);
  const centre = (th) => {
    const k = 1 + crumple * 0.055 * noise(th, seed);
    const r = polar(th) * k;
    return { x: r * Math.cos(th) * sx, y: r * Math.sin(th) + base };
  };

  const pos = new Float32Array(N * (M + 1) * 3);
  const rimA = [];
  const rimB = [];

  for (let i = 0; i < N; i++) {
    const th = TRAIL_START + (i / N) * TAU;
    const c = centre(th);
    const e = 0.004;
    const c1 = centre(th + e);
    const c0 = centre(th - e);
    let tx = c1.x - c0.x;
    let ty = c1.y - c0.y;
    const tl = Math.hypot(tx, ty) || 1;
    tx /= tl;
    ty /= tl;
    const nx = ty; // outward in-plane normal (CCW traversal)
    const ny = -tx;

    // Band direction swings between the view axis (z) and the in-plane normal: the "folded paper" look.
    const bump = Math.exp(-Math.pow(angDist(th, (270 * Math.PI) / 180) / 0.55, 2));
    const phi = flare + 0.3 * crumple * noise(th + 1.3, seed + 3) + swoosh * bump * 0.5 + 0.08 * Math.sin(3 * th + seed) + 0.05 * Math.sin(6 * th + seed * 2) + 0.03 * Math.sin(9 * th + seed);
    const bx = Math.sin(phi) * nx;
    const by = Math.sin(phi) * ny;
    const bz = Math.cos(phi);

    const pinchK = pinch * Math.exp(-Math.pow(angDist(th, pinchAt) / 0.3, 2));
    const hw = half * (1 - pinchK) * (1 + 0.1 * noise(th, seed + 9));
    const bow = bowK * R * (1 + 0.6 * noise(th + 0.7, seed + 5) + 0.15 * Math.sin(7 * th + seed));

    for (let j = 0; j <= M; j++) {
      const t = (j / M) * 2 - 1;
      const o = (i * (M + 1) + j) * 3;
      const lift = bow * (1 - t * t);
      pos[o] = c.x + bx * hw * t + nx * lift;
      pos[o + 1] = c.y + by * hw * t + ny * lift;
      pos[o + 2] = bz * hw * t;
    }
    rimA.push(new THREE.Vector3(c.x - bx * hw, c.y - by * hw, -bz * hw));
    rimB.push(new THREE.Vector3(c.x + bx * hw, c.y + by * hw, bz * hw));
  }

  const index = [];
  for (let i = 0; i < N; i++) {
    const i2 = (i + 1) % N;
    for (let j = 0; j < M; j++) {
      const a = i * (M + 1) + j;
      const b = i2 * (M + 1) + j;
      const c = b + 1;
      const d = a + 1;
      index.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setIndex(index);
  geo.computeVertexNormals();

  return {
    geo,
    curveA: new THREE.CatmullRomCurve3(rimA, true),
    curveB: new THREE.CatmullRomCurve3(rimB, true),
  };
}

/** A near-black navy studio with narrow bright strips: dark chrome with long blue-white streaks. */
export function createEnvironment(THREE, renderer) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x01040f);

  const box = (w, h, rgb, k, pos, look) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(rgb).multiplyScalar(k), side: THREE.DoubleSide })
    );
    m.position.set(...pos);
    m.lookAt(...look);
    env.add(m);
    return m;
  };
  // Front hemisphere (what front-facing chrome reflects): staggered vertical strips
  box(0.5, 8, 0xb8dcff, 7, [-5.5, 2.5, 5], [0, 1, 0]);
  box(0.35, 9, 0x8cc4ff, 6, [-2, 3, 8], [0, 1, 0]);
  box(0.7, 9, 0x4d94ff, 4.5, [1.5, 2.5, 8], [0, 1, 0]);
  box(0.45, 8, 0xa8d2ff, 6, [5, 2, 6], [0, 1, 0]);
  // Sides and back: broad deep-blue panels
  box(2, 6, 0x2a6cff, 1.6, [7.5, 1, 1], [0, 1, 0]);
  box(2, 6, 0x2460f0, 1.4, [-7.5, 1, 0], [0, 1, 0]);
  box(12, 5, 0x0e2f9a, 0.8, [0, 3, -8], [0, 1, 0]);
  // Top strip and the blue floor bounce
  box(10, 0.7, 0x8fc4ff, 1.6, [0, 8, 3], [0, 0, 0]);
  box(14, 10, 0x0a35a0, 0.8, [0, -2.5, 2], [0, 5, 2]);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(env, 0.02);
  pmrem.dispose();
  env.traverse((o) => {
    if (o.isMesh) {
      o.geometry.dispose();
      o.material.dispose();
    }
  });
  return rt;
}

/** Chrome ribbon material. `reflect` copies fade toward the floor like a glossy black surface. */
export function createChromeMaterial(THREE, reflect) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x86b0ff,
    metalness: 1,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.35,
    side: THREE.DoubleSide,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uReflect = { value: reflect ? 1 : 0 };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vWY;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWY = (modelMatrix * vec4(transformed, 1.0)).y;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vWY;\nuniform float uReflect;')
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        if (uReflect > 0.5) { float f = clamp(1.0 + vWY / 1.15, 0.0, 1.0); gl_FragColor.rgb *= f * f * 0.22; }`
      );
  };
  return mat;
}

/** Comet-style light trail: a bright head with a decaying tail that runs along a closed tube. */
export function createTrailMaterial(THREE, uniforms, reflect) {
  return new THREE.ShaderMaterial({
    uniforms: { ...uniforms, uReflect: { value: reflect ? 1 : 0 } },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexShader: /* glsl */ `
      varying float vU;
      varying float vWY;
      void main() {
        vU = uv.x;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWY = wp.y;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uHead;
      uniform float uLen;
      uniform float uAlpha;
      uniform float uReflect;
      varying float vU;
      varying float vWY;
      void main() {
        float d = mod(uHead - vU, 1.0);
        float t = 1.0 - d / max(uLen, 0.001);
        if (t <= 0.0 || uAlpha < 0.002) discard;
        float body = pow(t, 1.7);
        float hot = exp(-d * 70.0);
        vec3 col = mix(vec3(0.10, 0.45, 1.0), vec3(0.62, 0.90, 1.0), body) + vec3(1.0) * hot * 2.2;
        float a = (body * 0.85 + hot) * uAlpha;
        if (uReflect > 0.5) { float f = clamp(1.0 + vWY / 1.4, 0.0, 1.0); a *= f * f * 0.55; }
        gl_FragColor = vec4(col * 1.6, a);
      }
    `,
  });
}

/** Thin glowing ring lying on the floor. Radius-invariant soft edge; brightness is animated via uOpacity. */
export function createRing(THREE, radius) {
  const hw = 0.03;
  const geo = new THREE.RingGeometry(radius - hw * 1.6, radius + hw * 1.6, 180, 1);
  const uniforms = { uR: { value: radius }, uHW: { value: hw * 1.6 }, uOpacity: { value: 0 } };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: /* glsl */ `
      varying float vR;
      void main() {
        vR = length(position.xy);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uR;
      uniform float uHW;
      uniform float uOpacity;
      varying float vR;
      void main() {
        float d = abs(vR - uR) / uHW;
        float a = smoothstep(1.0, 0.0, d);
        a *= a;
        if (a * uOpacity < 0.002) discard;
        gl_FragColor = vec4(vec3(0.35, 0.82, 1.0) * 2.6, a * uOpacity);
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.006;
  return { mesh, geo, mat, uniforms };
}

/** Closed elliptical orbit, tilted in screen space so two of them read as an X from the front. */
export function createOrbitCurve(THREE, { a, b, c, tiltZ, tiltX, centreY }) {
  const pts = [];
  const up = new THREE.Vector3(0, 0, 1);
  const right = new THREE.Vector3(1, 0, 0);
  for (let i = 0; i < 160; i++) {
    const t = (i / 160) * TAU;
    const v = new THREE.Vector3(Math.cos(t) * a, Math.sin(t) * b, Math.sin(t) * c);
    v.applyAxisAngle(right, tiltX);
    v.applyAxisAngle(up, tiltZ);
    v.y += centreY;
    pts.push(v);
  }
  return new THREE.CatmullRomCurve3(pts, true);
}

// ---- Canvas sprites (same approach as SecurityKeyMatrix in IntelliLink) --------------------------------------------

export function makeGlowTexture(THREE, rgb, size = 64) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const h = size / 2;
  const grad = g.createRadialGradient(h, h, 0, h, h, h);
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(0.25, `rgba(${rgb},0.4)`);
  grad.addColorStop(0.6, `rgba(${rgb},0.1)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

export function makeStarTexture(THREE, size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const h = size / 2;
  const core = g.createRadialGradient(h, h, 0, h, h, h * 0.5);
  core.addColorStop(0, 'rgba(255,255,255,1)');
  core.addColorStop(0.18, 'rgba(210,235,255,0.95)');
  core.addColorStop(0.55, 'rgba(70,160,255,0.35)');
  core.addColorStop(1, 'rgba(30,90,235,0)');
  g.fillStyle = core;
  g.fillRect(0, 0, size, size);

  const ray = (len, width, alpha, ang) => {
    g.save();
    g.translate(h, h);
    g.rotate(ang);
    const lg = g.createLinearGradient(-len, 0, len, 0);
    lg.addColorStop(0, 'rgba(255,255,255,0)');
    lg.addColorStop(0.5, `rgba(235,246,255,${alpha})`);
    lg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = lg;
    g.fillRect(-len, -width / 2, len * 2, width);
    g.restore();
  };
  ray(h * 0.98, 3, 0.95, 0);
  ray(h * 0.98, 3, 0.95, Math.PI / 2);
  ray(h * 0.62, 1.6, 0.55, Math.PI / 4);
  ray(h * 0.62, 1.6, 0.55, -Math.PI / 4);
  return new THREE.CanvasTexture(c);
}

/** Anamorphic streak: soft at both ends so it never reads as a hard bar. */
export function makeStreakTexture(THREE) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 16;
  const g = c.getContext('2d');
  const lg = g.createLinearGradient(0, 0, 512, 0);
  lg.addColorStop(0, 'rgba(120,190,255,0)');
  lg.addColorStop(0.5, 'rgba(235,246,255,1)');
  lg.addColorStop(1, 'rgba(120,190,255,0)');
  g.fillStyle = lg;
  g.fillRect(0, 0, 512, 16);
  g.globalCompositeOperation = 'destination-in';
  const vg = g.createLinearGradient(0, 0, 0, 16);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(0.5, 'rgba(0,0,0,1)');
  vg.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = vg;
  g.fillRect(0, 0, 512, 16);
  return new THREE.CanvasTexture(c);
}
