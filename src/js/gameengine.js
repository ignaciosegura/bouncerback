/*global require*/
// Game engine class

require('../sass/_game_props.scss');

import {autorun} from 'mobx';

import levelList from '../gameData/levelList.js';

import ScoreShop from './stores/scoreshop.js';
import TimeShop from './stores/timeshop.js';

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Atom from './atom.js';
import Level from './level.js';
import Vortex from './vortex.js';
import { findGameSurfaceCoords } from './helpers.js';

class GameEngine {

  constructor(level) {
    this.level = new Level(levelList[level]);
    TimeShop.setup(this.level.time.bpm, this.level.time.signature, this.level.duration);

    this.gameSurfaceCoords = findGameSurfaceCoords();
    this.pucks = [];
    this.atoms = [];
    this.gameLoop = this.gameLoop.bind(this);

    this.createPointZero('#the-zone');

    let puck = new Puck(0);
    puck.placePuck();
    this.pucks.push(puck);
    this.pucks[0].domElement = document.querySelector('#point-zero rect');

    let gameController = new GameController(this.gameSurfaceCoords, this.pucks);

    this.gameLoopInterval = setInterval(this.gameLoop, TimeShop.millisecondsPerFrame);

    this.setupAutoruns();
  }

  setupAutoruns() {
    let autoLevelEnding = autorun(() => {
      if (!TimeShop.levelIsOver) return;

      let vortex = new Vortex(this.gameSurfaceCoords.radius);
    })
  }

  createPointZero(place) {
    let puckContainer = '<svg id="point-zero" x="50%" y="50%"></svg>';
    let theZone = document.querySelector(place);
    theZone.insertAdjacentHTML('beforeend', puckContainer);
  }

  gameLoop() {
    let bounces;

    Atom.destroyAtoms(this.atoms);
    Atom.moveAtoms(this.atoms);
    Atom.checkAtomsStatus(this.atoms, this.gameSurfaceCoords.radius);
    bounces = Atom.bounceAtoms(this.atoms, this.pucks);

    if (bounces > 0) ScoreShop.addBounce(bounces);

    this.checkAtomList();
    TimeShop.nextTick();
    this.checkGameOver();
  }

  checkGameOver() {
    if (!this.level.areAllAtomsOut() || this.atoms.length > 0) return false;

    clearInterval(this.gameLoopInterval);
    console.log('Game Over!');
  }

  checkAtomList() {
    if (this.level.areAllAtomsOut()) return;
    if (Math.round(this.level.nextAtom.tick) !== TimeShop.tick) return;

    this.addAtomToGameSurface();
    this.scheduleNextAtom();

  }

  addAtomToGameSurface() {
    this.atoms.push(Atom.create(this.level.nextAtom.order, this.level));
  }


  scheduleNextAtom() {
    this.level.nextAtom.order++;
    if (this.level.areAllAtomsOut()) return;

    let nextAtom = this.level.nextAtom.order;
    let atomTime = this.level.atomList[nextAtom];

    this.level.nextAtom.tick = atomTime.b * TimeShop.framesPerBeat + atomTime.t * TimeShop.framesPerTime;
  }
}

export default GameEngine;
