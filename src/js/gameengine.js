// Game engine class

import Puck from './puck.js';

class GameEngine {

  constructor(bpm, time, song) {
    this.frameRate = 60;
    this.framesPerBeat = (60 / bpm) * this.frameRate;
    this.framesPerTime = time * this.framesPerBeat;
    this.clock = 0;
    this.interval = 1000 / this.frameRate;
    let puck = new Puck(1);
    this.pucks = document.getElementsByClassName('puck');
    this.gameSurfaceCenter = this.findGameSurfaceCenter();
    this.mouseVector;
    
    this.trackMousePosition();
    setInterval(this.gameLoop, 5000);
  }

  findGameSurfaceCenter() {
    let theZone = document.getElementById('the-zone');
    let coords = theZone.getBoundingClientRect();
    return {
      centerX: (coords.left + coords.right) / 2,
      centerY: (coords.top + coords.bottom) / 2
    };
  }

  bindMouseTrackToPucks() {

  }

  trackMousePosition() {
    let mousePos;
    document.onmousemove = (e) => {
      mousePos = {
        x: e.clientX,
        y: e.clientY
      };
      this.mouseVector = this._getMouseVector(mousePos);
      console.log(this.mouseVector);
      return this.mouseVector;
    };
  }

  _getMouseVector(mousePos) {
    let x = mousePos.x - this.gameSurfaceCenter.centerX;
    let y = this.gameSurfaceCenter.centerY - mousePos.y;
    let atan2 = Math.atan2(y, x);
    return {
      angleRadians: atan2,
      angleDeg: atan2 * 180 / Math.PI
    }
  }

  gameLoop() {
    this.clock++;
    console.log('fire');
  }
}

export default GameEngine;
