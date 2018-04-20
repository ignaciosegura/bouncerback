/*global require*/
// Game engine class

require('../sass/_game_props.scss');

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Atom from './atom.js';
import {findGameSurfaceCoords, findCollisionInterval, getDistanceFromXY, setupTimeUnits} from './helpers.js';

class GameEngine {

  constructor(bpm, time, song = '') {
    this.time = setupTimeUnits(bpm, time);

    this.gameSurfaceCoords = findGameSurfaceCoords();
    this.collisionInterval = findCollisionInterval();
    this.pucks = [];
    this.atoms = [];
    this.gameLoop = this.gameLoop.bind(this);

    this.createPointZero('#the-zone');

    let puck = new Puck(0);
    puck.placePuck();
    this.pucks.push(puck);
    this.pucks[0].domElement = document.querySelector('#point-zero rect');

    let atom = new Atom(0, 100);
    atom.createAtom();
    this.atoms.push(atom);
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
    this.atoms.forEach(a => {
      a.moveAtom();
    });
    this.checkCollisions();
  }
  
  checkCollisions() {
    let atoms = this.atoms;
    let pucks = this.pucks;
    let collisionInterval = this.collisionInterval;

    atoms.forEach(a => {
      let atomPosition = a.atomPosition;
      let distance = getDistanceFromXY(atomPosition.cx, atomPosition.cy);

      if (distance > collisionInterval.from && distance < collisionInterval.to) {
        console.log("Collision needs to be checked for Atom " + a.index);
      }
    }, this);
  }
}

export default GameEngine;
