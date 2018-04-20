/*global require*/
// Game engine class

require('../sass/_game_props.scss');

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Atom from './atom.js';
import { findGameSurfaceCoords, findcollisionDistance, setupTimeUnits } from './helpers.js';

class GameEngine {

  constructor(bpm, time, song = '') {
    this.time = setupTimeUnits(bpm, time);

    this.gameSurfaceCoords = findGameSurfaceCoords();
    this.collisionDistance = findcollisionDistance();
    this.pucks = [];
    this.atoms = [];
    this.gameLoop = this.gameLoop.bind(this);

    this.createPointZero('#the-zone');

    let puck = new Puck(0);
    puck.placePuck();
    this.pucks.push(puck);
    this.pucks[0].domElement = document.querySelector('#point-zero rect');

    this.atoms.push(new Atom(0, 100));
    this.atoms[0].create();
    this.atoms[0].domElement = Array.from(document.getElementsByClassName('atom'))[0];

    let gameController = new GameController(this.gameSurfaceCoords, this.pucks);
    gameController.movePucksOnMouse();

    setInterval(this.gameLoop, this.time.millisecondsPerFrame);
  }

  createPointZero(place) {
    let puckContainer = '<svg id="point-zero" x="50%" y="50%"></svg>';
    let theZone = document.querySelector(place);
    theZone.insertAdjacentHTML('beforeend', puckContainer);
  }

  gameLoop() {
    this.time.clock++;
    this.atoms.forEach((a) => {
      a.moveAtom();
      a.checkAtom(this.collisionDistance);
    });
    Atom.destroyAtoms(this.atoms);
  }
}

export default GameEngine;
