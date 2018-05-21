/*global require*/
// Vortex class

require('../sass/_vortex.scss');

import SoundFX from './soundfx.js';

class Vortex {
  constructor(radius) {  
    this.timeToEffect = 3000;
    this.sounds = {
      creation: new SoundFX(require('../sound/vortex_creation.mp3')),
    }
    this.domElement = this.createVortex(radius);
  }

  createVortex(radius) {
    this.sounds.creation.play();
    let vortexHTML = `<circle id="vortex" cx="0" cy="0" r="${radius}" style="animation-duration: ${this.timeToEffect}" />`;
    let pointZero = document.getElementById('point-zero');
    pointZero.insertAdjacentHTML('beforeend', vortexHTML);

    return document.getElementById('vortex');
  }
}

export default Vortex;
