// Game Controller class

import CoordsService from './services/coordsservice.js';

class GameController {
  constructor(gameSurfaceCoords, pucks) {
    let vector = CoordsService.getVectorFromXY(0, -1);
    this.gameSurfaceCoords = gameSurfaceCoords;
    this.pucks = pucks;

    this.movePucks(vector); // First run
    this.movePucksOnInput();
  }

  movePucksOnInput() {
    let inputHandler = (e) => {
      let vector = this.getVectorFromInput(e);
      this.movePucks(vector);
    };

    ['mousemove', 'touchmove'].forEach(e => {
      document.addEventListener(e, inputHandler.bind(this), false);
    });
  }

  getVectorFromInput(e) {
    let position = CoordsService.getXYFromInput(e);
    let x = position.x - this.gameSurfaceCoords.centerX;
    let y = position.y - this.gameSurfaceCoords.centerY;
    return CoordsService.getVectorFromXY(x, y);
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
