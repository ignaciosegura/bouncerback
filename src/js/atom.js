/*global require*/
// Atom class

import { observable, autorun } from 'mobx';

import SoundFX from './soundfx.js';
import TimeShop from './stores/timeshop.js';
import SystemShop from './stores/systemshop.js';
import GameService from './services/gameservice.js';
import CoordsService from './services/coordsservice.js';
import ClockService from './services/clockservice.js';

const CSSClasses = {
  base: 'atom',
  alive: 'alive',
  dead: 'dead',
  dying: 'dying',
  vortex: 'vortex',
  captured: 'captured'
}
const directions = {
  out: 'out',
  in: 'in'
}

class Atom {
  constructor(index, level, direction = null) {
    this.index = index;
    this.vector = CoordsService.getRandomVector(direction);
    this.direction = directions.out;
    this.distance = 0;
    this.radius = 0.05;
    this.distanceToBorder = 1 - this.radius;
    this.framesPerTrip = ClockService.convertTimesIntoFrames(level.atomSpeed);
    this.speed = {
      original: this.convertTimesPerTripIntoDistancePerFrame()
    }
    this.speed.current = this.speed.original; // Part of a Diameter of 2 per frame. Level Speed is measured in times per full trip
    this.destructionTime = 2000; // in milliseconds
    this.vortexTime;
    this.status = observable({
      alive: true,
      vortex: false,
      collide: false,
      dying: false,
      captured: false
    });
    this.creationTick = TimeShop.tick;
    this.sounds = {
      launch: new SoundFX(require('../sound/launch.mp3')),
      bounce: new SoundFX(require('../sound/bounce_dry.mp3')),
      destroy: new SoundFX(require('../sound/destroy.mp3')),
      capture: new SoundFX(require('../sound/capture.mp3'))
    };
    this.domElement;
  }

  spawnAtomInDOM() {
    let atom = `<circle
      cx="0"
      cy="0"
      r="${this.radius * SystemShop.gameSurfaceCoords.radius}"
      index="${this.index}"
      class="${CSSClasses.base}"
      />`;
    let theZone = document.getElementById('point-zero');
    theZone.insertAdjacentHTML('beforeend', atom);
    this.domElement = document.querySelector('.atom[index="' + this.index + '"]');
    this.setStatusClasses();
    this.sounds.launch.play();
  }

  get atomPosition() {
    return ({
      cx: this.domElement.cx.baseVal.value,
      cy: this.domElement.cy.baseVal.value
    })
  }

  get moment() {
    return this.timeOfExistence % this.framesPerTrip;
  }

  get timeOfExistence() {
    return TimeShop.tick - this.creationTick;
  }

  setAtomPosition(cx, cy) {
    let radius = SystemShop.gameSurfaceCoords.radius;

    this.domElement.cx.baseVal.value = cx * radius;
    this.domElement.cy.baseVal.value = cy * radius;
  }

  convertTimesPerTripIntoDistancePerFrame() {
    let effectiveDiameter = this.distanceToBorder * 2;

    return effectiveDiameter / this.framesPerTrip;
  }

  isOnCollideArea() {
    return (this.distance >= this.distanceToBorder)
      && this.distance <= 1
      && this.direction == directions.out;
  }

  isTravellingOut() {
    return (this.distance >= 0);
  }

  setStatusClasses() {
    let auto = autorun(() => {
      let statusClasses = [];

      statusClasses.push(this.status.alive
        ? CSSClasses.alive
        : CSSClasses.dead);
      if (this.status.vortex) statusClasses.push(CSSClasses.vortex);
      if (this.status.captured) statusClasses.push(CSSClasses.captured);
      if (this.status.dying) statusClasses.push(CSSClasses.dying);

      if (!this.domElement)
        return;

      this.domElement.classList = [CSSClasses.base];
      this.domElement.classList.add(...statusClasses);
    });
  }

  tagForRemoval() {
    let a = this;
    setTimeout(() => {
      a.status.dying = false;
      a.status.alive = false;
      a.domElement.remove();
    }, this.destructionTime);
  }

  executeBounce() {
    this.reverseAtomDirection();
    this.status.collide = false;
    this.sounds.bounce.play();
  }

  startDying() {
    this.status.dying = true;
    this.status.collide = false;
    this.status.vortex = false;
    this.sounds.destroy.play();
    this.tagForRemoval();
  }

  checkAtom() {
    if (this.isFirstHalfOfTrip())
      this.direction = directions.out;

    let s = this.status;

    if (this.isOnCollideArea() && s.alive && !s.vortex) {
      s.collide = true;
    } else if (s.alive && s.collide && !s.vortex && this.distance > 1) {
      this.startDying();
    } else if (this.status.vortex && this.status.alive) {
      this.vector = this.setVortexVector();
    }
  }

  setVortexVector() {
    return this.vector + .005;
  }

  moveAtom() {
    this.distance = this.calculateDistance();
    let position = CoordsService.getXYFromVector(this.vector, this.distance);
    let x = position.x;
    let y = position.y;

    this.setAtomPosition(x, y);
  }

  calculateDistance() {
    if (this.status.vortex)
      return this.calculateDistanceFromOvertime();

    return this.calculateDistanceFromMoment();
  }

  calculateLinearDistance(moment, speed) {
    return moment * speed;
  }

  calculateDistanceFromMoment() {
    let distance = this.calculateLinearDistance(this.moment, this.speed.current);

    if (!this.isFirstHalfOfTrip() && this.direction == directions.in && !this.status.vortex)
      distance = distance - (this.distanceToBorder * 2);

    return distance;
  }

  calculateDistanceFromOvertime() {
    let tripsBeforeLevelEnded = parseInt(this.vortexTime / this.framesPerTrip);
    let absoluteMoment = this.timeOfExistence - (tripsBeforeLevelEnded * this.framesPerTrip);
    let timeFromVortexActivation = TimeShop.tick - this.vortexTime;

    absoluteMoment = this.distance > 0
      ? absoluteMoment - Math.pow(timeFromVortexActivation, 1.2)
      : absoluteMoment + Math.pow(timeFromVortexActivation, 1.2);

    let distance = this.calculateLinearDistance(absoluteMoment, this.speed.current);

    distance = (distance > 1)
      ? distance - (this.distanceToBorder * 2)
      : distance;

    return distance;
  }

  isFirstHalfOfTrip() {
    return ((this.moment * 2) < this.framesPerTrip);
  }

  reverseAtomDirection() {
    this.vector = CoordsService.getReversedVector(this.vector);
    this.direction = 'in';
  }

  checkVortex(vortexActiveRadius) {
    let distancePlusRadius = Math.abs(this.distance) + this.radius;
    if (distancePlusRadius > vortexActiveRadius)
      return;

    this.setAtomToCaptured();
  }

  setAtomToVortex() {
    this.status.vortex = true;
    this.vortexTime = TimeShop.tick;
  }

  setAtomToCaptured() {
    this.status.captured = true;
    this.sounds.capture.play();
  }
}

export default Atom;
