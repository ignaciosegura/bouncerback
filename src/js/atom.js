/*global require*/
// Atom class

require('../sass/_atom.scss');

import {getXYFromVector} from './helpers.js';

class Atom {
  constructor(index, speed, gameSurfaceCoords, collisionSound = '', destructionSound = '') {
    this.index = index;
    this.speed = speed / 60; // Speed is measured in px per second
    this.gameSurfaceCoords = gameSurfaceCoords;
    this.vector = Math.random() * 2 * Math.PI - Math.PI;
    this.radius = 10;
    this.sounds = {
      collision: collisionSound,
      destruction: destructionSound
    }
    this.domElement;
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

  get atomPosition() {
    return ({
      cx: this.domElement.cx.baseVal.value,
      cy: this.domElement.cy.baseVal.value
    })
  }

  moveAtom() {
    let atomPosition = this.atomPosition;
    let displacement = getXYFromVector(this.vector, this.speed);
    this.domElement.cx.baseVal.value = atomPosition.cx + displacement.x;
    this.domElement.cy.baseVal.value = atomPosition.cy + displacement.y;
  }
}

export default Atom;
