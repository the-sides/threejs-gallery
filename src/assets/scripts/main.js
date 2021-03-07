/* eslint-disable no-undef */
import * as THREE from 'three';

let camera; let scene; let
  renderer;
let geometry; let material; let
  mesh;

const controls = {
  x: 0,
  z: 0,
};

const setupEnvironment = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  scene.background = new THREE.Color(0xffffff);
};

function movementBinds() {
  window.addEventListener('keydown', (ev) => {
    const actions = {
      w: () => { controls.z = -0.01; },
      s: () => { controls.z = 0.01; },
      a: () => { controls.x = -0.01; },
      d: () => { controls.x = 0.01; },
    };
    if (actions[ev.key]) actions[ev.key]();
  });
  window.addEventListener('keyup', (ev) => {
    const actions = {
      w: () => { controls.z = 0; },
      s: () => { controls.z = 0; },
      a: () => { controls.x = 0; },
      d: () => { controls.x = 0; },
    };
    if (actions[ev.key]) actions[ev.key]();
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  camera.position.x += controls.x;
  camera.position.z += controls.z;
}

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  material = new THREE.MeshNormalMaterial();

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  mesh = new THREE.Mesh(geometry, material);

  const room = new THREE.BoxGeometry(2, 2, 2);
  const walls = new THREE.Mesh(room, material);

  scene.add(mesh);

  const light = new THREE.AmbientLight(0x404040); // soft white light
  light.position.set(0.5, 0.5);
  scene.add(light);
  scene.add(walls);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  setupEnvironment();

  animate();

  movementBinds();

  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);
}

init();
