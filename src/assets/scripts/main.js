/* eslint-disable no-undef */
import * as THREE from './threejs/three.module.js';
import { APP } from './threejs/app.js';
import { VRButton } from './threejs/VRButton.js';

window.THREE = THREE; // Used by APP Scripts.
window.VRButton = VRButton; // Used by APP Scripts.

const loader = new THREE.FileLoader();
loader.load('app.json', (text) => {
  const player = new APP.Player();
  player.load(JSON.parse(text));
  player.setSize(window.innerWidth, window.innerHeight);
  player.play();

  document.body.appendChild(player.dom);

  window.addEventListener('resize', () => {
    player.setSize(window.innerWidth, window.innerHeight);
  });
});
