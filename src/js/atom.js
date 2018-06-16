/*global require*/
// Atom class

import SoundFX from './soundfx.js';
import TimeShop from './stores/timeshop.js';
import SystemShop from './stores/systemshop.js';
import CoordsService from './services/coordsservice.js';

class Atom {
  constructor(index, level) {
    this.index = index;
    this.vector = Math.random() * 2 * Math.PI - Math.PI;
    this.radius = SystemShop.canonicalSizes.radius;
    this.framesPerRebound = this.convertTimesPerTripIntoFramesPerRebound(level.atomSpeed);
    this.speed = {
      original: this.convertTimesPerTripIntoPixelsPerFrame(level.atomSpeed, this.radius)
    }
    this.speed.current = this.speed.original; // Pixels per seconds. Level Speed is measured in times per full trip
    this.destructionTime = 2000; // in milliseconds
    this.status = 'alive'; // Possible values are "alive", "collide", "dying", "dead", "vortex"
    this.creationTick = TimeShop.tick;
    this.next = {
      rebound: this.calculateNextEvent('rebound'),
      center: 0,
    };
    this.sounds = {
      launch: new SoundFX(require('../sound/launch.mp3')),
      bounce: new SoundFX(require('../sound/bounce_dry.mp3')),
      destroy: new SoundFX(require('../sound/destroy.mp3')),
      capture: new SoundFX(require('../sound/capture.mp3'))
    }
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


  convertTimesPerTripIntoPixelsPerFrame(speed, oversize = 0) {
    let framesPerTrip = this.convertTimesPerTripIntoFramesPerRebound(speed);
    let gameSurfaceCoords = SystemShop.gameSurfaceCoords;
    let tripLength = (gameSurfaceCoords.radius * 2) - (oversize * 2);

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

  checkAtom() {
    let radius = SystemShop.gameSurfaceCoords.radius;
    let pos = this.atomPosition;
    let distance = CoordsService.getDistanceFromXY(pos.cx, pos.cy);

    if (this.AtomIsOnReboundArea()) {
      this.next.rebound = this.calculateNextEvent('rebound');
      this.next.center = this.calculateNextEvent('center');
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
      speedFactor = CoordsService.makeFinite(1 / (this.next.rebound - currentTick));
      return this.speed.current - (this.speed.original * speedFactor);
    } else {
      speedFactor = CoordsService.makeFinite(1 / (this.next.center - currentTick));
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
    this.sounds.capture.play();
  }
}

export default Atom;
