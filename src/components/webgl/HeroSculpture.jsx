import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroSculpture - real-time Three.js hero.
 *
 * Three chrome ribbon loops on a glossy black floor, choreographed after the reference clip:
 *
 *   0.0  rest, slow dolly            5.0  floor rings ripple out, loops levitate
 *   0.7  light trail on the centre   6.0  loops rise + spin, orbit ribbons cross in an X
 *        loop's bottom rim           7.3  settle, rings fade
 *   1.8  trails run all three rims   8.0  residual rim trails re-trace once
 *   3.3  flare on the apex           9.0  rest (identical to 0.0 so the loop is seamless)
 *   3.7  loops turn edge-on
 *
 * The entry fills the whole hero (copy hidden), then the camera glides the trio below the headline while the copy
 * fades in. It plays once on load, then idles (slow rim shine, float, pointer parallax) and replays every ~24s while visible.
 * Patterns follow IntelliLink's SecurityKeyMatrix / HeroIntelligenceCore: WebGL detection with an <img> fallback,
 * IntersectionObserver gating, prefers-reduced-motion, pointer mapped into the stage, full disposal on unmount.
 */

const FOV = 32;
// Camera framings. The canvas covers the whole hero: the entry plays big and centred, then the camera glides
// so the trio rests below the headline and buttons.
const VIEW_START = { z: 6.2, y: 1.3, lookY: 0.62 };
const VIEW_INTRO = { z: 7.2, y: 1.4, lookY: 0.6 };
const VIEW_REST = { z: 11.9, y: 2.15, lookY: 1.84 };
const TEXT_ZONE = 460; // px from the hero top: pointer effects / hover only apply below the copy
const announce = () => window.dispatchEvent(new CustomEvent('hero-sculpture-align'));
const TAU = Math.PI * 2;
const POSTER_SRC = 'https://framerusercontent.com/images/O5PQexhd4BXevLZvR6qAMiDGXVQ.png';
const REPLAY_AFTER = 24; // seconds of idling between full sequences
const rad = (d) => (d * Math.PI) / 180;

const LOOPS = [
  // Outer loops lean in toward the centre, like the artwork.
  { key: 'left', x: -1.7, yaw: 0.5, roll: -0.2, cfg: { R: 0.62, sx: 1.22, half: 0.36, crumple: 0.35, pinch: 0.4, pinchAt: rad(100), swoosh: 0.55, seed: 4.2 } },
  { key: 'centre', x: 0, yaw: 0.36, roll: -0.03, cfg: { R: 0.8, sx: 1.2, half: 0.4, crumple: 0.2, pinch: 0.1, pinchAt: rad(320), swoosh: 0.85, seed: 1, flare: 0.8 } },
  { key: 'right', x: 1.7, yaw: -0.5, roll: 0.2, cfg: { R: 0.62, sx: 1.22, half: 0.36, crumple: 0.35, pinch: 0.4, pinchAt: rad(60), swoosh: 0.55, seed: 7.7 } },
];

const MASK =
  'linear-gradient(to bottom, transparent 0, transparent var(--sculpt-fade), #000 calc(var(--sculpt-fade) + 70px), #000 calc(100% - 60px), transparent 100%)';

export default function HeroSculpture() {
  const containerRef = useRef(null);
  const holderRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [ready, setReady] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const holder = holderRef.current;
    if (!container || !holder) return undefined;

    // 1. WebGL capability check (same guard as SecurityKeyMatrix); fall back to the poster image.
    try {
      const probe = document.createElement('canvas');
      if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) {
        setWebglSupported(false);
        setSettled(true);
        announce();
        return undefined;
      }
    } catch {
      setWebglSupported(false);
      setSettled(true);
      announce();
      return undefined;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alive = true;
    const cleanups = [];

    Promise.all([
      import('three'),
      import('gsap'),
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js'),
      import('three/addons/postprocessing/OutputPass.js'),
      import('./sculptureParts.js'),
    ])
      .then(([THREE, { gsap }, { EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }, P]) => {
        if (!alive) return;

        let width = container.clientWidth || 1440;
        let height = container.clientHeight || 620;

        // 2. Renderer / scene / camera. Opaque black on purpose: bloom + a transparent canvas leaves grey fringes.
        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        } catch {
          setWebglSupported(false);
          setSettled(true);
          announce();
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 1);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
        holder.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        const envRT = P.createEnvironment(THREE, renderer);
        scene.environment = envRT.texture;

        const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 60);

        const composer = new EffectComposer(renderer);
        composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        composer.setSize(width, height);
        composer.addPass(new RenderPass(scene, camera));
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width / 2, height / 2), 0.4, 0.4, 0.82);
        composer.addPass(bloomPass);
        composer.addPass(new OutputPass());

        // 3. Loops (real + mirrored copy for the glossy floor).
        const chrome = P.createChromeMaterial(THREE, false);
        const chromeRefl = P.createChromeMaterial(THREE, true);

        const built = LOOPS.map((l) => {
          const data = P.buildLoopData(THREE, l.cfg);
          return {
            ...l,
            data,
            trailA: new THREE.TubeGeometry(data.curveA, 360, 0.045, 8, true),
            trailB: new THREE.TubeGeometry(data.curveB, 360, 0.045, 8, true),
            uni: { uHead: { value: 0 }, uLen: { value: 0.26 }, uAlpha: { value: 0 } },
          };
        });

        const assemble = (reflect) => {
          const rig = new THREE.Group();
          const roots = built.map((l) => {
            const root = new THREE.Group();
            root.position.x = l.x;
            const tilt = new THREE.Group();
            tilt.rotation.y = l.yaw;
            tilt.rotation.z = l.roll || 0;
            tilt.add(new THREE.Mesh(l.data.geo, reflect ? chromeRefl : chrome));
            const trailMat = P.createTrailMaterial(THREE, l.uni, reflect);
            tilt.add(new THREE.Mesh(l.trailA, trailMat));
            tilt.add(new THREE.Mesh(l.trailB, trailMat));
            root.add(tilt);
            rig.add(root);
            return root;
          });
          return { rig, roots };
        };

        const real = assemble(false);
        scene.add(real.rig);
        const mirror = assemble(true);
        const mirrorRoot = new THREE.Group();
        mirrorRoot.scale.y = -1;
        mirrorRoot.add(mirror.rig);
        scene.add(mirrorRoot);

        // 4. Floor glow, rings, orbit ribbons.
        const glowTex = P.makeGlowTexture(THREE, '47,128,237', 128);
        const floorGlow = new THREE.Mesh(
          new THREE.CircleGeometry(4.6, 64),
          new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
        );
        floorGlow.rotation.x = -Math.PI / 2;
        floorGlow.position.y = 0.003;
        floorGlow.scale.set(1.3, 0.7, 1);
        scene.add(floorGlow);

        const rings = [1.25, 1.8, 2.4, 3.1].map((r) => {
          const ring = P.createRing(THREE, r);
          ring.mesh.scale.setScalar(0.4);
          scene.add(ring.mesh);
          return ring;
        });

        const orbitDefs = [
          { a: 3.1, b: 0.4, c: 0.45, tiltZ: 0.26, tiltX: 0.1, centreY: 0.85 },
          { a: 3.1, b: 0.4, c: 0.45, tiltZ: -0.26, tiltX: -0.1, centreY: 0.85 },
        ];
        const orbits = orbitDefs.map((def) => {
          const curve = P.createOrbitCurve(THREE, def);
          const geo = new THREE.TubeGeometry(curve, 240, 0.06, 8, true);
          const uni = { uHead: { value: 0 }, uLen: { value: 0.72 }, uAlpha: { value: 0 } };
          const mesh = new THREE.Mesh(geo, P.createTrailMaterial(THREE, uni, false));
          scene.add(mesh);
          return { uni };
        });

        // 5. Apex flare + soft anamorphic streak (sits on the centre loop's top, R * 2 = 1.7 tall).
        const APEX = new THREE.Vector3(0, 1.62, 0.3);
        const starTex = P.makeStarTexture(THREE);
        const star = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: starTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false })
        );
        star.position.copy(APEX);
        star.scale.set(0.01, 0.01, 1);
        scene.add(star);
        const streakTex = P.makeStreakTexture(THREE);
        const streak = new THREE.Mesh(
          new THREE.PlaneGeometry(2.4, 0.08),
          new THREE.MeshBasicMaterial({ map: streakTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false })
        );
        streak.position.copy(APEX);
        streak.scale.x = 0.001;
        scene.add(streak);

        // 6. Ambient dust: SecurityKeyMatrix-style points that shy away from the pointer and light up near it.
        const DUST = 140;
        const dBase = new Float32Array(DUST * 3);
        const dPos = new Float32Array(DUST * 3);
        const dCol = new Float32Array(DUST * 3);
        const dCol0 = new Float32Array(DUST * 3);
        for (let i = 0; i < DUST; i++) {
          const i3 = i * 3;
          dBase[i3] = (Math.random() - 0.5) * 14;
          dBase[i3 + 1] = 0.1 + Math.random() * 4.9;
          dBase[i3 + 2] = (Math.random() - 0.5) * 4;
          const t = Math.random();
          dCol0[i3] = 0.03 + t * 0.12;
          dCol0[i3 + 1] = 0.4 + t * 0.3;
          dCol0[i3 + 2] = 1;
        }
        dPos.set(dBase);
        dCol.set(dCol0);
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
        dustGeo.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
        const dustTex = P.makeGlowTexture(THREE, '150,205,255', 64);
        const dustMat = new THREE.PointsMaterial({
          size: 0.055, map: dustTex, vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
        });
        scene.add(new THREE.Points(dustGeo, dustMat));

        // 7. Animated state (GSAP tweens plain objects; the ticker applies them to the scene).
        const S = { lev: 0, rot: [0, 0, 0], floor: 0.5 };
        const v0 = reduced ? VIEW_REST : VIEW_START;
        const cam = { z: v0.z, y: v0.y, lookY: v0.lookY, yaw: 0, pitch: 0, sx: 0, sy: 0 };
        const fx = { bloom: 0.4, exposure: reduced ? 1.05 : 0.04, dust: 0 };
        if (reduced) {
          setSettled(true);
          announce();
        }
        const trailU = built.map((b) => b.uni);

        // Pointer -> camera parallax (quickTo, like HeroIntelligenceCore) and dust interaction in world units.
        let mouseX = 9999;
        let mouseY = 9999;
        let hoverInside = false;
        let onEnter = () => {};
        if (!reduced) {
          const quickYaw = gsap.quickTo(cam, 'yaw', { duration: 0.6, ease: 'power3.out' });
          const quickPitch = gsap.quickTo(cam, 'pitch', { duration: 0.6, ease: 'power3.out' });
          const onMove = (e) => {
            const rect = container.getBoundingClientRect();
            const inRect = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
            const inside = inRect && e.clientY - rect.top > TEXT_ZONE;
            if (inside) {
              const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
              const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
              quickYaw(nx * 0.07);
              quickPitch(ny * 0.4);
              const visH = 2 * cam.z * Math.tan(rad(FOV) / 2);
              mouseX = nx * (visH * camera.aspect) * 0.5;
              mouseY = cam.lookY + ny * visH * 0.5;
              if (!hoverInside) onEnter();
            } else {
              quickYaw(0);
              quickPitch(0);
              mouseX = 9999;
              mouseY = 9999;
            }
            hoverInside = inside;
          };
          window.addEventListener('pointermove', onMove, { passive: true });
          cleanups.push(() => window.removeEventListener('pointermove', onMove));
        }

        // 8. Choreography.
        let masterActive = false;
        let igniteActive = false;
        let started = false;
        let visible = true;
        let master = null;
        let intro = null;
        let ignite = null;
        let replayCall = null;

        const buildMaster = () => {
          const tl = gsap.timeline({
            paused: true,
            onStart: () => { masterActive = true; },
            onComplete: () => {
              masterActive = false;
              scheduleReplay();
            },
          });
          const [L, C, R] = trailU;
          const trailsAll = [L, C, R];

          // T0: clear any idle shine so the first trail reads clean.
          tl.to(trailsAll.map((u) => u.uAlpha), { value: 0, duration: 0.3, ease: 'power1.out' }, 0);

          // T1 0.7 + T2 1.7: centre loop's trail starts on the bottom rim and keeps going; the side loops follow, staggered.
          tl.set(C.uLen, { value: 0.26 }, 0.6);
          tl.fromTo(C.uHead, { value: 0 }, { value: 1.25, duration: 2.3, ease: 'power1.inOut' }, 0.7);
          tl.to(C.uAlpha, { value: 1, duration: 0.15, ease: 'power1.out' }, 0.7);
          tl.set([L.uLen, R.uLen], { value: 0.3 }, 1.7);
          tl.fromTo(L.uHead, { value: 0 }, { value: 1.25, duration: 1.3, ease: 'power2.inOut' }, 1.82);
          tl.fromTo(R.uHead, { value: 0 }, { value: 1.25, duration: 1.3, ease: 'power2.inOut' }, 1.94);
          tl.to([L.uAlpha, R.uAlpha], { value: 1, duration: 0.15 }, 1.82);
          tl.to(trailsAll.map((u) => u.uAlpha), { value: 0, duration: 0.35, ease: 'power2.in' }, 3.0);

          // T3 3.3: anticipation -> star pop -> streak -> bloom spike -> 2-frame hit-stop, then release.
          tl.to(fx, { bloom: 0.9, duration: 0.4, ease: 'power2.in' }, 2.9);
          tl.set(star.material, { opacity: 1 }, 3.3);
          tl.fromTo(star.scale, { x: 0.01, y: 0.01 }, { x: 1.35, y: 1.35, duration: 0.06, ease: 'power3.out' }, 3.3);
          tl.to(star.scale, { x: 0.05, y: 0.05, duration: 0.5, ease: 'power2.in' }, 3.38);
          tl.set(star.material, { opacity: 0 }, 3.9);
          tl.set(streak.material, { opacity: 0.95 }, 3.3);
          tl.fromTo(streak.scale, { x: 0.001 }, { x: 1, duration: 0.1, ease: 'expo.out' }, 3.3);
          tl.to(streak.scale, { x: 0.001, duration: 0.4, ease: 'power2.in' }, 3.42);
          tl.set(streak.material, { opacity: 0 }, 3.86);
          tl.to(fx, { bloom: 1.5, duration: 0.08, ease: 'power4.out' }, 3.3);
          tl.to(fx, { bloom: 0.4, duration: 0.6, ease: 'expo.out' }, 3.38);
          tl.to(cam, { sx: 0.025, sy: -0.02, duration: 0.04 }, 3.3);
          tl.to(cam, { sx: 0, sy: 0, duration: 0.28, ease: 'expo.out' }, 3.34);

          // T4 3.7: the loops turn (the centre one goes edge-on at ~4.0), the camera drops so the floor opens up.
          tl.to(S.rot, { 1: Math.PI, duration: 1.3, ease: 'power3.inOut' }, 3.7);
          tl.to(S.rot, { 0: -TAU, duration: 1.9, ease: 'power2.inOut' }, 3.75);
          tl.to(S.rot, { 2: TAU, duration: 1.9, ease: 'power2.inOut' }, 3.85);

          // T5 4.7: rings ripple out under a levitating trio.
          rings.forEach((r, i) => {
            const at = 4.7 + i * 0.12;
            tl.to(r.uniforms.uOpacity, { value: 0.95 - i * 0.12, duration: 0.5, ease: 'power2.out' }, at);
            tl.fromTo(r.mesh.scale, { x: 0.4, y: 0.4, z: 0.4 }, { x: 1, y: 1, z: 1, duration: 1.0, ease: 'expo.out' }, at);
            tl.to(r.mesh.scale, { x: 1.14, y: 1.14, z: 1.14, duration: 2.3, ease: 'sine.out' }, at + 1.0);
          });
          tl.to(S, { floor: 1, duration: 0.8, ease: 'power2.out' }, 4.7);
          tl.to(fx, { bloom: 0.7, duration: 0.8, ease: 'power2.out' }, 4.7);
          tl.to(S, { lev: 0.18, duration: 1.1, ease: 'sine.inOut' }, 4.7);

          // T6 6.0: rise + spin again while two orbit ribbons draw an X around the trio.
          tl.to(S, { lev: 0.28, duration: 1.2, ease: 'power2.out' }, 6.0);
          tl.to(S.rot, { 1: TAU, duration: 1.5, ease: 'power2.inOut' }, 6.0);
          tl.to(S.rot, { 0: -2 * TAU, duration: 1.6, ease: 'power2.inOut' }, 6.0);
          tl.to(S.rot, { 2: 2 * TAU, duration: 1.6, ease: 'power2.inOut' }, 6.1);
          orbits.forEach((o, i) => {
            const at = 6.0 + i * 0.15;
            tl.fromTo(o.uni.uHead, { value: 0 }, { value: 1.15, duration: 1.6, ease: 'power1.inOut' }, at);
            tl.to(o.uni.uAlpha, { value: 0.7, duration: 0.2, ease: 'power1.out' }, at);
            tl.to(o.uni.uAlpha, { value: 0, duration: 0.5, ease: 'power2.in' }, at + 1.25);
          });

          // T7 7.3: settle.
          tl.to(S, { lev: 0, duration: 0.7, ease: 'expo.out' }, 7.3);
          tl.to(fx, { bloom: 0.4, duration: 0.9, ease: 'power2.out' }, 7.3);
          tl.to(S, { floor: 0.5, duration: 0.9, ease: 'power2.out' }, 7.3);
          tl.to(rings.map((r) => r.uniforms.uOpacity), { value: 0, duration: 0.7, ease: 'power2.out' }, 7.3);

          // T8 8.0: residual rim trails re-trace once (centre loop last), then fade.
          tl.set(trailsAll.map((u) => u.uLen), { value: 0.24 }, 7.95);
          tl.to(L.uAlpha, { value: 0.85, duration: 0.15 }, 8.0);
          tl.fromTo(L.uHead, { value: 0 }, { value: 0.8, duration: 0.85, ease: 'power2.out' }, 8.0);
          tl.to(R.uAlpha, { value: 0.85, duration: 0.15 }, 8.05);
          tl.fromTo(R.uHead, { value: 0 }, { value: 0.8, duration: 0.85, ease: 'power2.out' }, 8.05);
          tl.to(C.uAlpha, { value: 0.85, duration: 0.15 }, 8.1);
          tl.fromTo(C.uHead, { value: 0 }, { value: 0.85, duration: 0.9, ease: 'power2.out' }, 8.1);
          tl.to([L.uAlpha, R.uAlpha], { value: 0, duration: 0.4, ease: 'power2.in' }, 8.7);
          tl.to(C.uAlpha, { value: 0, duration: 0.45, ease: 'power2.in' }, 8.85);

          // T9 9.0: rest. Rotations are whole turns, so snapping them to 0 is invisible and keeps the loop seamless.
          tl.set(S.rot, { 0: 0, 1: 0, 2: 0 }, 9.0);
          tl.set({}, {}, 9.6);
          return tl;
        };

        const scheduleReplay = () => {
          if (replayCall) replayCall.kill();
          replayCall = gsap.delayedCall(REPLAY_AFTER, function again() {
            if (!alive) return;
            if (!visible || masterActive) {
              replayCall = gsap.delayedCall(4, again);
              return;
            }
            master.invalidate().restart();
          });
        };

        // Hover -> "Ignite": one trail lap on all three loops, rate limited.
        let lastIgnite = 0;
        onEnter = () => {
          const now = performance.now();
          if (masterActive || igniteActive || now - lastIgnite < 6000 || !started) return;
          lastIgnite = now;
          igniteActive = true;
          ignite = gsap.timeline({ onComplete: () => { igniteActive = false; } });
          trailU.forEach((u, i) => {
            ignite.set(u.uLen, { value: 0.28 }, 0);
            ignite.fromTo(u.uHead, { value: 0 }, { value: 1.2, duration: 1.4, ease: 'power1.inOut' }, i * 0.12);
            ignite.to(u.uAlpha, { value: 1, duration: 0.15 }, i * 0.12);
            ignite.to(u.uAlpha, { value: 0, duration: 0.4, ease: 'power2.in' }, 1.1 + i * 0.12);
          });
        };

        // 9. Visibility gate: stop rendering AND pause the choreography while off-screen.
        let gated = [];
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (!visible) {
            gated = [intro, master, ignite].filter((t) => t && !t.paused() && t.progress() < 1);
            gated.forEach((t) => t.pause());
          } else {
            gated.forEach((t) => t.resume());
            gated = [];
          }
        }, { threshold: 0.05 });
        io.observe(container);
        cleanups.push(() => io.disconnect());

        // 10. Render loop on gsap.ticker (one clock for timelines and rendering).
        let time = 0;
        let firstFrame = false;
        const shineOffsets = [0.0, 0.33, 0.66];
        const tick = (_t, deltaMs) => {
          if (!visible || document.hidden) return;
          const dt = Math.min(0.05, deltaMs / 1000);
          time += reduced ? 0 : dt;

          // camera: orbit target with pointer parallax + hit-stop shake
          const r = cam.z;
          camera.position.set(Math.sin(cam.yaw) * r + cam.sx, cam.y + cam.pitch + cam.sy, Math.cos(cam.yaw) * r);
          camera.lookAt(0, cam.lookY, 0);
          renderer.toneMappingExposure = fx.exposure;
          bloomPass.strength = fx.bloom;

          // sculpture state -> real + mirrored copy
          const bob = reduced ? 0 : Math.sin(time * 0.9) * 0.018;
          real.rig.position.y = S.lev + bob;
          mirror.rig.position.y = S.lev + bob;
          for (let i = 0; i < 3; i++) {
            const sway = reduced ? 0 : Math.sin(time * 0.5 + i * 1.7) * 0.025;
            const ry = S.rot[i] + sway;
            real.roots[i].rotation.y = ry;
            mirror.roots[i].rotation.y = ry;
          }
          floorGlow.material.opacity = 0.05 + S.floor * 0.16 + (reduced ? 0 : Math.sin(time * 1.05) * 0.05);

          // idle: slow rim shine (only when no authored beat is running)
          if (!reduced && !masterActive && !igniteActive) {
            trailU.forEach((u, i) => {
              u.uLen.value += (0.2 - u.uLen.value) * 0.05;
              u.uHead.value = (u.uHead.value + dt * 0.085) % 1;
              const target = 0.3 + 0.1 * Math.sin(time * 1.1 + shineOffsets[i] * TAU);
              u.uAlpha.value += (target - u.uAlpha.value) * 0.03;
            });
          }

          // dust
          if (!reduced) {
            dustMat.opacity = fx.dust;
            for (let i = 0; i < DUST; i++) {
              const i3 = i * 3;
              const bx = dBase[i3];
              const by = dBase[i3 + 1];
              const wave = Math.sin(time * 1.3 + bx * 1.8 + by * 1.2) * 0.04;
              const dx = bx - mouseX;
              const dy = by - mouseY;
              const dist = Math.hypot(dx, dy);
              let rx = 0;
              let ry = 0;
              let glow = 0;
              if (dist < 1.2) {
                const k = 1 - dist / 1.2;
                const force = k * k * 0.5;
                rx = (dx / (dist || 1)) * force;
                ry = (dy / (dist || 1)) * force;
                glow = k;
              }
              dPos[i3] = bx + rx;
              dPos[i3 + 1] = by + wave + ry;
              dPos[i3 + 2] = dBase[i3 + 2];
              dCol[i3] = Math.min(1, dCol0[i3] + glow * 0.7);
              dCol[i3 + 1] = Math.min(1, dCol0[i3 + 1] + glow * 0.5);
            }
            dustGeo.attributes.position.needsUpdate = true;
            dustGeo.attributes.color.needsUpdate = true;
          }

          composer.render(dt);

          if (!firstFrame) {
            firstFrame = true;
            setReady(true);
            if (!reduced) {
              started = true;
              intro = gsap.timeline();
              intro.to(fx, { exposure: 1.05, duration: 1.5, ease: 'power2.out' }, 0);
              intro.to(fx, { dust: 0.55, duration: 2.4, ease: 'sine.inOut' }, 0.6);
              // Entry: big, centred, filling the hero while header + copy stay hidden.
              intro.to(cam, { z: VIEW_INTRO.z, y: VIEW_INTRO.y, lookY: VIEW_INTRO.lookY, duration: 3.3, ease: 'power2.out' }, 0);
              // Handoff: after the flare the camera glides the trio below the copy; header + copy fade in as it leaves centre.
              intro.call(announce, null, 4.15);
              intro.to(cam, { z: VIEW_REST.z, y: VIEW_REST.y, lookY: VIEW_REST.lookY, duration: 1.7, ease: 'power3.inOut' }, 3.4);
              intro.call(() => setSettled(true), null, 5.1);
              master = buildMaster();
              window.__heroMasterTimeline = master;
              window.__heroDebug = { intro, master, cam, S, fx };
              master.play();
            }
          }
        };
        gsap.ticker.add(tick);
        cleanups.push(() => gsap.ticker.remove(tick));

        // 11. Resize.
        const ro = new ResizeObserver(() => {
          width = container.clientWidth || width;
          height = container.clientHeight || height;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          composer.setSize(width, height);
        });
        ro.observe(container);
        cleanups.push(() => ro.disconnect());

        // 12. Disposal.
        cleanups.push(() => {
          [intro, master, ignite].forEach((t) => t && t.kill());
          if (replayCall) replayCall.kill();
          gsap.killTweensOf([cam, fx, S, S.rot]);
          delete window.__heroMasterTimeline;
          delete window.__heroDebug;
          scene.traverse((o) => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) o.material.dispose();
          });
          [glowTex, starTex, streakTex, dustTex].forEach((t) => t.dispose());
          envRT.dispose();
          composer.passes.forEach((p) => p.dispose && p.dispose());
          renderer.dispose();
          if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        });
      })
      .catch((err) => {
        console.error('HeroSculpture failed, showing poster', err);
        setWebglSupported(false);
        setSettled(true);
        announce();
      });

    return () => {
      alive = false;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-sculpture-container"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        '--sculpt-fade': settled ? '440px' : '0px',
        transition: '--sculpt-fade 1s cubic-bezier(0.16, 1, 0.3, 1)',
        WebkitMaskImage: MASK,
        maskImage: MASK,
      }}
    >
      <div ref={holderRef} style={{ position: 'absolute', inset: 0, opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }} />
      {!webglSupported && (
        <img
          src={POSTER_SRC}
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', left: '50%', top: 540, width: 1200, maxWidth: '100%', transform: 'translateX(-50%)', objectFit: 'contain' }}
        />
      )}
    </div>
  );
}
