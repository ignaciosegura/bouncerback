// Game engine class

import Puck from './puck.js';
import GameController from './gamecontroller.js';

class GameEngine {

  constructor(bpm, time, song) {
    this.frameRate = 60;
    this.framesPerBeat = (60 / bpm) * this.frameRate;
    this.framesPerTime = time * this.framesPerBeat;
    this.clock = 0;
    this.interval = 1000 / this.frameRate;
    this.gameSurfaceCoords = this.findGameSurfaceCoords();
    this.pucks;

    let puck = new Puck(0);
    puck.place();
    this.pucks = Array.from(document.getElementsByClassName('puck'));
    this.pucks[0].instance = puck;

    let gameController = new GameController(this.gameSurfaceCoords, this.pucks);
    gameController.movePucksOnMouse();

    setInterval(this.gameLoop, 5000);
  }

  findGameSurfaceCoords() {
    let theCircle = document.getElementById('the-circle');
    let coords = theCircle.getBoundingClientRect();
    return {
      centerX: (coords.left + coords.right) / 2,
      centerY: (coords.top + coords.bottom) / 2,
      radius: parseInt(theCircle.getAttribute('cx'))
    };
  }

  gameLoop() {
    this.clock++;
    console.log('fire');
  }
}

export default GameEngine;
