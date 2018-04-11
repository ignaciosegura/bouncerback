/*global require*/
// Atom class

require('../sass/_atom.scss');

class Atom {
  constructor(index, speed, gameSurfaceCoords, collisionSound = '', destructionSound = '') {
    this.index = index;
    this.speed = speed; // Speed is measured in px per frame
    this.gameSurfaceCoords = gameSurfaceCoords;
    this.vector = Math.random() * 2 * Math.PI - Math.PI;
    this.radius = 10;
    this.sounds = {
      collision: collisionSound,
      destruction: destructionSound
    }  
  }

  createAtom() {
    let atom = `<circle
      cx="${this.gameSurfaceCoords.radius}"
      cy="${this.gameSurfaceCoords.radius}"
      r="${this.radius}"
      index="${this.index}"
      class="atom"
      />`;
    let theZone = document.getElementById('the-zone');
    theZone.insertAdjacentHTML('beforeend', atom);
  }
}

export default Atom;
