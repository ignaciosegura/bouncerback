/*global require*/
// Atom class

require('../sass/_atom.scss');

import SoundFX from './soundfx.js';
import TimeShop from './stores/timeshop.js';
import { findGameSurfaceCoords, getXYFromVector, getDistanceFromXY, compareVectorsForBounce } from './helpers.js';

class Atom {
  constructor(index, level) {
    this.index = index;
    this.speed = this.convertTimesPerTripIntoPixelsPerSecond(level.atomSpeed); // Speed is measured in px per time
    this.vector = Math.random() * 2 * Math.PI - Math.PI;
    this.radius = 10;
    this.sounds = {
      launch: new SoundFX(level.sound.launch),
      bounce: new SoundFX(level.sound.bounce),
      destroy: new SoundFX(level.sound.destroy)
    }
    this.destructionTime = 2000; // in milliseconds
    this.status = 'alive'; // Possible values are "alive", "collide", "dying", "dead"
    this.domElement;
  }

  createDOMElement() {
    let atom = `<circle
      cx="0"
      cy="0"
      r="${this.radius}"
      index="${this.index}"
      class="atom ${this.status}"
      />`;
    let theZone = document.getElementById('point-zero');
    theZone.insertAdjacentHTML('beforeend', atom);
    this.sounds.launch.play();
  }

  get atomPosition() {
    return ({
      cx: this.domElement.cx.baseVal.value,
      cy: this.domElement.cy.baseVal.value
    })
  }


  convertTimesPerTripIntoPixelsPerSecond(speed) {
    let framesPerTrip = speed * TimeShop.framesPerTime;
    let gameSurfaceCoords = findGameSurfaceCoords();
    let tripLength = gameSurfaceCoords.radius * 2;

    return tripLength / framesPerTrip;
  }

  setStatus(newStatus) {
    this.domElement.classList.remove(this.status);
    this.status = newStatus;
    this.domElement.classList.add(newStatus);
  }

  tagForRemoval() {
    let a = this;
    setTimeout(() => {
      a.setStatus('dead');
    }, this.destructionTime);
  }

  executeBounce() {
    this.reverseAtomDirection();
    this.setStatus('alive');
    this.sounds.bounce.play();
  }

  checkAtom(bounceDistance) {
    const pos = this.atomPosition;
    const distance = getDistanceFromXY(pos.cx, pos.cy);

    if (distance >= bounceDistance.from && distance <= bounceDistance.to) {
      this.setStatus('collide');
    } else if (distance > bounceDistance.to && this.status == 'collide') {
      this.setStatus('dying');
      this.sounds.destroy.play();
      this.tagForRemoval();
    }
  }

  moveAtom() {
    let atomPosition = this.atomPosition;
    let displacement = getXYFromVector(this.vector, this.speed);
    this.domElement.cx.baseVal.value = atomPosition.cx + displacement.x;
    this.domElement.cy.baseVal.value = atomPosition.cy + displacement.y;
  }

  reverseAtomDirection() {
    this.vector = (this.vector > 0)
      ? this.vector - Math.PI
      : this.vector + Math.PI;
  }

  static destroyAtoms(atoms) {
    let i;

    for (i in atoms) {
      if (atoms[i].status !== 'dead') continue;

      atoms[i].domElement.remove();
      atoms.splice(i, 1);
    }
  }

  static bounceAtoms(atoms, pucks) {
    let colliders = atoms.filter(a => a.status == 'collide');
    let bouncesCount = 0;

    colliders.forEach(a => {
      pucks.forEach(p => {
        let result = compareVectorsForBounce(a.vector, p.vector, p.angle);

        if (result) {
          a.executeBounce();
          bouncesCount++;
        }
      })
    });
    return bouncesCount;
  }

  static moveAtoms(atoms) {
    atoms.forEach(a => a.moveAtom());
  }

  static checkAtomsStatus(atoms, bounceDistance) {
    atoms.forEach(a => a.checkAtom(bounceDistance));
  }

  static create(index, level) {
    let newAtom = new Atom(index, level);
    newAtom.createDOMElement();
    newAtom.domElement = document.querySelector('.atom[index="' + index + '"]');
    return newAtom;
  }
}

export default Atom;
