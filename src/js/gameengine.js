/*global require*/
// Game engine class

require('../sass/_game_props.scss');

var bounceSoundPath = require('../sound/bounce_dry.mp3');
var launchSoundPath = require('../sound/launch.mp3');
var destroySoundPath = require('../sound/destroy.mp3');

import ScoreShop from './stores/scoreshop.js';
import TimeShop from './stores/timeshop.js';

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Atom from './atom.js';
import { findGameSurfaceCoords, findcollisionDistance } from './helpers.js';

class GameEngine {

  constructor(bpm, time, song = '') {
    TimeShop.setup(120, 4);

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

    this.atoms.push(new Atom(0, 100, launchSoundPath, bounceSoundPath, destroySoundPath));
    this.atoms[0].create();
    this.atoms[0].domElement = Array.from(document.getElementsByClassName('atom'))[0];

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
    let collisions;

    TimeShop.nextTick();
    this.atoms.forEach((a) => {
      a.moveAtom();
      a.checkAtom(this.collisionDistance);
    });
    Atom.destroyAtoms(this.atoms);
    collisions = Atom.collideAtoms(this.atoms, this.pucks);

    if (collisions > 0) ScoreShop.addBounce(collisions);

    this.checkGameOver();
  }

  checkGameOver() {
    if (this.atoms.length > 0) return false;
    clearInterval(this.gameLoopInterval);
    console.log('Game Over!');
  }
}

export default GameEngine;
