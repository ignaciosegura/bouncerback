// Game Controller class

import { getVectorFromXY } from './helpers.js';

class GameController {
  constructor(gameSurfaceCoords, pucks) {
    let vector = getVectorFromXY(0, -1);
    this.gameSurfaceCoords = gameSurfaceCoords;
    this.pucks = pucks;

    this.movePucks(vector);
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
      this.movePucks(mouseVector);
    };
  }

  _getMouseVector(mousePos) {
    let x = mousePos.x - this.gameSurfaceCoords.centerX;
    let y = mousePos.y - this.gameSurfaceCoords.centerY;
    return getVectorFromXY(x, y);
  }

  movePucks(vector) {
    this.pucks.forEach(p => {
      p.vector = vector.rads;
      let radius = this.gameSurfaceCoords.radius;
      let x = Math.cos(vector.rads) * radius;
      let y = Math.sin(vector.rads) * radius;
      let perpendicularInDegs = vector.degrees + 90;

      p.domElement.setAttribute('transform', `translate(${x}, ${y}), rotate(${perpendicularInDegs})`);
    });
  }
}

export default GameController;
