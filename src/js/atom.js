/*global require*/
// Atom class

require('../sass/_atom.scss');

import { getXYFromVector, getDistanceFromXY, compareVectorsForCollision } from './helpers.js';

class Atom {
  constructor(index, speed, collisionSound = '', destructionSound = '') {
    this.index = index;
    this.speed = speed / 60; // Speed is measured in px per second
    this.vector = Math.random() * 2 * Math.PI - Math.PI;
    this.radius = 10;
    this.sounds = {
      collision: collisionSound,
      destruction: destructionSound
    }
    this.destructionTime = 2000; // in milliseconds
    this.statusList = ['alive', 'collide', 'dying', 'dead'];
    this.status = this.statusList[0]; // Possible values are "alive", "dying", "dead"
    this.domElement;
  }

  create() {
    let atom = `<circle
      cx="0"
      cy="0"
      r="${this.radius}"
      index="${this.index}"
      class="atom"
      />`;
    let theZone = document.getElementById('point-zero');
    theZone.insertAdjacentHTML('beforeend', atom);
  }

  get atomPosition() {
    return ({
      cx: this.domElement.cx.baseVal.value,
      cy: this.domElement.cy.baseVal.value
    })
  }

  setStatus(newStatus) {
    try {
      if (!this.statusList.includes(newStatus)) {
        throw 'Bummer! Trying to set an status that does not exist!';
      }
      this.domElement.classList.remove(this.status);
      this.status = newStatus;
      this.domElement.classList.add(newStatus);
    } catch (e) {
      console.log(e);
    }
  }

  tagForRemoval() {
    setTimeout(() => {
      this.setStatus('dead');
    }, this.destructionTime);
  }

  checkAtom(collisionDistance) {
    const pos = this.atomPosition;
    const distance = getDistanceFromXY(pos.cx, pos.cy);

    if (distance >= collisionDistance.from && distance <= collisionDistance.to) {
      this.setStatus('collide');
    } else if (distance > collisionDistance.to && this.status != 'dying') {
      this.setStatus('dying');
      this.tagForRemoval();
    }
  }

  moveAtom() {
    let atomPosition = this.atomPosition;
    let displacement = getXYFromVector(this.vector, this.speed);
    this.domElement.cx.baseVal.value = atomPosition.cx + displacement.x;
    this.domElement.cy.baseVal.value = atomPosition.cy + displacement.y;
  }

  static destroyAtoms(atoms) {
    let i = 0;

    while (i < atoms.length) {
      if (atoms[i].status == 'dead') {
        atoms[i].domElement.remove();
        atoms.splice(i, 1);
        continue;
      }
      i++;
    }
  }

  static collideAtoms(atoms, pucks) {
    let colliders = atoms.filter(a => a.status == 'collide');

    colliders.forEach(a => {
      pucks.forEach(p => {
        let result = compareVectorsForCollision(a.vector, p.vector, p.angle);

        console.log(result ? 'collide' : '');
      })
    });
  }
}

export default Atom;
