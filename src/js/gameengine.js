// Game engine class

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Atom from './atom.js';
import findGameSurfaceCoords from './helpers.js';

class GameEngine {

  constructor(bpm, time, song = '') {
    this.frameRate = 60;
    this.framesPerBeat = (60 / bpm) * this.frameRate;
    this.framesPerTime = time * this.framesPerBeat;
    this.clock = 0;
    this.interval = 1000 / this.frameRate;
    this.gameSurfaceCoords = findGameSurfaceCoords();
    this.pucks = [];

    let puck = new Puck(0);
    puck.place();
    this.pucks = Array.from(document.getElementsByClassName('puck'));
    this.pucks[0].instance = puck;

    let atom = new Atom(0, 5, this.gameSurfaceCoords);
    atom.createAtom();
    this.atoms = Array.from(document.getElementsByClassName('atom'));
    this.atoms[0].instance = atom;

    let gameController = new GameController(this.gameSurfaceCoords, this.pucks);
    gameController.movePucksOnMouse();

    setInterval(this.gameLoop, 5000);
  }

  gameLoop() {
    this.clock++;
    console.log('fire');
  }
}

export default GameEngine;
