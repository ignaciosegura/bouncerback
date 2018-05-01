/*global require*/
// Game engine class

require('../sass/_game_props.scss');

import levelList from '../gameData/levelList.js';

import ScoreShop from './stores/scoreshop.js';
import TimeShop from './stores/timeshop.js';

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Atom from './atom.js';
import Level from './level.js';
import { findGameSurfaceCoords, findBounceDistance } from './helpers.js';

class GameEngine {

  constructor(level) {
    this.level = new Level(levelList[level]);
    TimeShop.setup(this.level.time.bpm, this.level.time.signature);

    this.gameSurfaceCoords = findGameSurfaceCoords();
    this.bounceDistance = findBounceDistance();
    this.pucks = [];
    this.atoms = [];
    this.gameLoop = this.gameLoop.bind(this);

    this.createPointZero('#the-zone');

    let puck = new Puck(0);
    puck.placePuck();
    this.pucks.push(puck);
    this.pucks[0].domElement = document.querySelector('#point-zero rect');

    let gameController = new GameController(this.gameSurfaceCoords, this.pucks);
    gameController.movePucksOnMouse();

    this.gameLoopInterval = setInterval(this.gameLoop, TimeShop.millisecondsPerFrame);
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
    Atom.checkAtomsStatus(this.atoms, this.bounceDistance);
    bounces = Atom.bounceAtoms(this.atoms, this.pucks);

    if (bounces > 0) ScoreShop.addBounce(bounces);

    this.checkAtomList();
    TimeShop.nextTick();
    this.checkGameOver();
  }

  checkGameOver() {
    if (!this.level.areThereMoreAtoms() || this.atoms.length > 0) return false;

    clearInterval(this.gameLoopInterval);
    console.log('Game Over!');
  }

  checkAtomList() {
    if (!TimeShop.newBeat) return;
    if (this.level.areThereMoreAtoms()) return;

    let nextAtom = this.level.nextAtom;

    let timeMatch = (TimeShop.time === this.level.atomList[nextAtom].t) ? true : false;
    let beatMatch = (TimeShop.beat === this.level.atomList[nextAtom].b) ? true : false;

    if (timeMatch && beatMatch) {
      this.addAtomToGameSurface();
    }
  }

  addAtomToGameSurface() {
    this.atoms.push(Atom.create(this.level.nextAtom, this.level));
    this.level.nextAtom++;
  }
}

export default GameEngine;
