/*global require*/
// Vortex class

require('../sass/_vortex.scss');

import SoundFX from './soundfx.js';

class Vortex {
  constructor(radius) {
    this.timeToEffect = 3000;
    this.active = false;
    this.activeRadius = 0;
    this.sounds = {
      creation: new SoundFX(require('../sound/vortex_creation.mp3')),
    }
    this.domElement = this.createVortex(radius);
    this.activateVortex();
  }

  createVortex(radius) {
    this.sounds.creation.play();
    let vortexHTML = `<circle id="vortex" cx="0" cy="0" r="${radius}" >
      <circle/>`;
    let pointZero = document.getElementById('point-zero');
    pointZero.insertAdjacentHTML('beforeend', vortexHTML);

    return document.getElementById('vortex');
  }

  activateVortex() {
    setTimeout(() => {
      this.active = true
      this.activeRadius = this.domElement.getBoundingClientRect().width / 2;
    }, this.timeToEffect);
  }
}

export default Vortex;
