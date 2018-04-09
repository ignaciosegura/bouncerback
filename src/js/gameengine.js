// Game engine class

import Puck from './puck.js';

class GameEngine {

  constructor(bpm, time, song) {
    this.frameRate = 60;
    this.framesPerBeat = (60 / bpm) * this.frameRate;
    this.framesPerTime = time * this.framesPerBeat;
    this.clock = 0;
    this.interval = 1000 / this.frameRate;
    this.gameSurfaceCoords = this.findGameSurfaceCoords();
    this.pucks;

    let puck = new Puck(1);
    this.pucks = Array.from(document.getElementsByClassName('puck'));
    
    this.movePucksOnMouse();
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

  movePucksOnMouse() {
    let mousePos;
    let mouseVector;

    document.onmousemove = (e) => {
      mousePos = {
        x: e.clientX,
        y: e.clientY
      };
      mouseVector = this._getMouseVector(mousePos);
      this._movePucks(mouseVector);
    };
  }

  _getMouseVector(mousePos) {
    let x = mousePos.x - this.gameSurfaceCoords.centerX;
    let y = mousePos.y - this.gameSurfaceCoords.centerY;
    let atan2 = Math.atan2(y, x);
    return {
      angleRadians: atan2,
      angleDeg: atan2 * 180 / Math.PI
    }
  }

  _movePucks(vector) {
    this.pucks.forEach( p => {
      let surface = this.gameSurfaceCoords;
      let x = Math.cos(vector.angleRadians) * surface.radius;
      let y = Math.sin(vector.angleRadians) * surface.radius;
      p.setAttribute('x', surface.radius + x);
      p.setAttribute('y', surface.radius + y);
    });
  }

  gameLoop() {
    this.clock++;
    console.log('fire');
  }
}

export default GameEngine;
