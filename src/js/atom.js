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
}
const directions = {
  out: 'out',
  in: 'in'
}

class Atom {
  constructor(index, level, direction = null) {
    this.index = index;
    this.vector = CoordsService.getRandomVector(direction);
    this.direction = 'out';
    this.distance = 0;
    this.radius = 0.05;
    this.distanceToBorder = 1 - this.radius;
    this.framesPerTrip = ClockService.convertTimesIntoFrames(level.atomSpeed);
    this.speed = {
      original: this.convertTimesPerTripIntoDistancePerFrame()
    }
    this.speed.current = this.speed.original; // Part of a Diameter of 2 per frame. Level Speed is measured in times per full trip
    this.destructionTime = 2000; // in milliseconds
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
    let timeOfExistence = TimeShop.tick - this.creationTick;
    return timeOfExistence % this.framesPerTrip;
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

    if (this.isOnCollideArea() && this.status.alive) {
      this.status.collide = true;
    } else if (this.status.collide && this.distance > 1) {
      this.startDying();
    } else if (this.status.vortex && this.status.alive) {
      this.speed.current = this.setVortexSpeed();
    }
  }

  setVortexSpeed() {
    let currentTick = TimeShop.tick;
    let isMovingAway = this.isTravellingOut();
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
    this.distance = this.calculateAtomDistance();
    let position = CoordsService.getXYFromVector(this.vector, this.distance);
    let x = position.x;
    let y = position.y;

    this.setAtomPosition(x, y);
  }

  calculateAtomDistance() {
    let moment = this.moment;
    let distance = moment * this.speed.current;

    if (!this.isFirstHalfOfTrip() && this.direction == directions.in)
      distance = distance - (this.distanceToBorder * 2);

    return distance;
  }

  isFirstHalfOfTrip() {
    let moment = this.moment;
    return (moment * 2 < this.framesPerTrip);
  }

  reverseAtomDirection() {
    this.vector = CoordsService.getReversedVector(this.vector);
    this.direction = 'in';
  }

  checkVortex(vortexActiveRadius) {
    let distanceToCenter = CoordsService.getDistanceFromXY(this.atomPosition.cx, this.atomPosition.cy);
    if (distanceToCenter > vortexActiveRadius)
      return;

    this.setAtomToCaptured();
  }

  setAtomToVortex() {
    this.status.vortex = true;
  }

  setAtomToCaptured() {
    this.status.captured = true;
    GameService.addCapturesToScore();
    this.sounds.capture.play();
  }
}

export default Atom;
