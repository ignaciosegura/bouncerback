// Game engine class

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Atom from './atom.js';
import {findGameSurfaceCoords, findCollisionInterval, setupTimeUnits} from './helpers.js';

class GameEngine {

  constructor(bpm, time, song = '') {
    this.time = setupTimeUnits(bpm, time);

    this.gameSurfaceCoords = findGameSurfaceCoords();
    this.collisionInterval = findCollisionInterval();
    this.pucks = [];
    this.atoms = [];
    this.gameLoop = this.gameLoop.bind(this);

    Puck.placeContainer('the-zone');
    let puck = new Puck(0);
    puck.placePuck();
    this.pucks.push(puck);
    this.pucks[0].domElement = document.querySelector('.puck rect');

    let atom = new Atom(0, 100, this.gameSurfaceCoords);
    atom.createAtom();
    this.atoms.push(atom);
    this.atoms[0].domElement = Array.from(document.getElementsByClassName('atom'))[0];

    let gameController = new GameController(this.gameSurfaceCoords, this.pucks);
    gameController.movePucksOnMouse();

    setInterval(this.gameLoop, this.time.millisecondsPerFrame);
  }

  gameLoop() {
    this.time.clock++;
    this.atoms.forEach(a => {
      a.moveAtom();
    });
    this.checkCollisions();
  }
  
  checkCollisions() {
    let atoms = this.atoms;
    let pucks = this.pucks;
    let collisionInterval = this.collisionInterval;

  }
}

export default GameEngine;
