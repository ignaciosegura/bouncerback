/*global require*/
// Atom class

require('../sass/_atom.scss');

import SoundFX from './soundfx.js';
import TimeShop from './stores/timeshop.js';
import CoordsService from './services/coordsservice.js';

class Atom {
  constructor(index, level) {
    this.index = index;
    this.speed = {
      original: this.convertTimesPerTripIntoPixelsPerFrame(level.atomSpeed)
    }
    this.speed.current = this.speed.original; // Pixels per seconds. Level Speed is measured in times per full trip
    this.vector = Math.random() * 2 * Math.PI - Math.PI;
    this.radius = 10;
    this.sounds = {
      launch: new SoundFX(level.sound.launch),
      bounce: new SoundFX(level.sound.bounce),
      destroy: new SoundFX(level.sound.destroy)
    }
    this.destructionTime = 2000; // in milliseconds
    this.status = 'alive'; // Possible values are "alive", "collide", "dying", "dead", "vortex"
    this.creationTick = TimeShop.tick;
    this.framesPerRebound = this.convertTimesPerTripIntoFramesPerRebound(level.atomSpeed);
    this.next = {
      rebound: this.calculateNextEvent('rebound'),
      center: 0,
    };
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


  convertTimesPerTripIntoPixelsPerFrame(speed) {
    let framesPerTrip = this.convertTimesPerTripIntoFramesPerRebound(speed);
    let gameSurfaceCoords = CoordsService.findGameSurfaceCoords();
    let tripLength = gameSurfaceCoords.radius * 2;

    return tripLength / framesPerTrip;
  }

  convertTimesPerTripIntoFramesPerRebound(speed) {
    return speed * TimeShop.framesPerTime;
  }

  AtomIsOnReboundArea() {
    return (TimeShop.tick == this.next.rebound);
  }

  calculateNextEvent(eventType) {
    let eventOffset = (eventType === 'rebound')
      ? this.framesPerRebound / 2
      : 0;

    let ticksSinceCreation = TimeShop.tick - this.creationTick;
    let timeFactor = Math.ceil(ticksSinceCreation / this.framesPerRebound);
    let nextTime = this.creationTick + Math.floor(timeFactor * this.framesPerRebound + eventOffset);

    return nextTime;
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

  checkAtom(radius) {
    const pos = this.atomPosition;
    const distance = CoordsService.getDistanceFromXY(pos.cx, pos.cy);

    if (this.AtomIsOnReboundArea()) {
      this.next.rebound = this.calculateNextEvent();
      if (this.status == 'alive')
        this.setStatus('collide');
    } else if (distance > radius && this.status == 'collide') {
      this.setStatus('dying');
      this.sounds.destroy.play();
      this.tagForRemoval();
    } else if (this.status === 'vortex') {
      this.speed.current = this.setVortexSpeed();
    }
  }

  setVortexSpeed() {
    let currentTick = TimeShop.tick;
    let isMovingAway = (this.next.rebound < this.next.center);
    let speedFactor;

    if (isMovingAway) {
      speedFactor = 1 / (this.next.rebound - currentTick);
      return this.speed.current - (this.speed.original * speedFactor);
    } else {
      speedFactor = 1 / (this.next.center - currentTick);
      return this.speed.current + speedFactor;
    }
  }

  moveAtom() {
    let atomPosition = this.atomPosition;
    let displacement = CoordsService.getXYFromVector(this.vector, this.speed.current);
    this.domElement.cx.baseVal.value = atomPosition.cx + displacement.x;
    this.domElement.cy.baseVal.value = atomPosition.cy + displacement.y;
  }

  reverseAtomDirection() {
    this.vector = (this.vector > 0)
      ? this.vector - Math.PI
      : this.vector + Math.PI;
  }

  setAtomToVortex() {
    this.setStatus('vortex');
    this.next.center = this.calculateNextEvent('center');
  }

  checkVortex(vortexActiveRadius) {
    let distanceToCenter = CoordsService.getDistanceFromXY(this.atomPosition.cx, this.atomPosition.cy);
    if (distanceToCenter > vortexActiveRadius)
      return;

    this.setStatus('captured');
  }
}

export default Atom;
