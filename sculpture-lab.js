// Temporary harness: renders the three hero loops statically for side-by-side comparison with the reference.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import * as P from './src/components/webgl/sculptureParts.js';

const rad = (d) => (d * Math.PI) / 180;
const params = new URLSearchParams(location.search);
const LOOPS = window.LAB_LOOPS || [
  { key: 'left', x: -1.7, yaw: 0.5, roll: -0.2, cfg: { R: 0.62, sx: 1.22, half: 0.36, crumple: 0.35, pinch: 0.4, pinchAt: rad(100), swoosh: 0.55, seed: 4.2 } },
  { key: 'centre', x: 0, yaw: 0.36, roll: -0.03, cfg: { R: 0.8, sx: 1.2, half: 0.4, crumple: 0.2, pinch: 0.1, pinchAt: rad(320), swoosh: 0.85, seed: 1, flare: 0.8 } },
  { key: 'right', x: 1.7, yaw: -0.5, roll: 0.2, cfg: { R: 0.62, sx: 1.22, half: 0.36, crumple: 0.35, pinch: 0.4, pinchAt: rad(60), swoosh: 0.55, seed: 7.7 } },
];

const stage = document.getElementById('stage');
const W = stage.clientWidth;
const H = stage.clientHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H);
renderer.setClearColor(0x000000, 1);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
stage.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(params.get('bg') ? `#${params.get('bg')}` : '#000000');
scene.environment = P.createEnvironment(THREE, renderer).texture;

const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 60);
const camZ = Number(params.get('z') || 7.2);
const camY = Number(params.get('y') || 1.4);
camera.position.set(0, camY, camZ);
camera.lookAt(0, Number(params.get('ly') || 0.62), 0);

const chrome = P.createChromeMaterial(THREE, false);
LOOPS.forEach((l) => {
  const data = P.buildLoopData(THREE, l.cfg);
  const root = new THREE.Group();
  root.position.set(l.x, l.y || 0, l.z || 0);
  const tilt = new THREE.Group();
  tilt.rotation.set(l.pitch || 0, l.yaw, l.roll || 0);
  tilt.add(new THREE.Mesh(data.geo, chrome));
  root.add(tilt);
  scene.add(root);
});

const composer = new EffectComposer(renderer);
composer.setSize(W, H);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.4, 0.4, 0.82));
composer.addPass(new OutputPass());

const fit = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  composer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
window.addEventListener('resize', fit);
fit();

const spin = Number(params.get('spin') || 0);
const tick = (t) => {
  if (spin) scene.children.forEach((c) => { if (c.isGroup) c.rotation.y = t * 0.0004 * spin; });
  composer.render();
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);
window.__labReady = true;
