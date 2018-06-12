// Game Controller class
import SystemShop from './stores/systemshop.js';
import CoordsService from './services/coordsservice.js';

class GameController {
  constructor(pucks) {
    let initVector = [CoordsService.getVectorFromXY(0, -1)];
    this.pucks = pucks;

    this.movePucks(initVector); // First run
    this.movePucksOnInput();
  }

  movePucksOnInput() {
    let inputHandler = (e) => {
      let positionArr = CoordsService.getXYFromInput(e);
      let vectorArr = positionArr.map(p => this.getVectorFromPosition(p));
      this.movePucks(vectorArr);
    };

    ['mousemove', 'touchmove'].forEach(e => {
      document.addEventListener(e, inputHandler.bind(this), false);
    });
  }

  getVectorFromPosition(position) {
    let x = position.x - SystemShop.gameSurfaceCoords.centerX;
    let y = position.y - SystemShop.gameSurfaceCoords.centerY;
    return CoordsService.getVectorFromXY(x, y);
  }

  movePucks(vectorArr) {
    this.pucks.forEach(p => {
      let vector = (vectorArr[p.index])
        ? vectorArr[p.index]
        : vectorArr[0];

      p.vector = vector.rads;
      let radius = SystemShop.gameSurfaceCoords.radius;
      let x = Math.cos(vector.rads) * radius;
      let y = Math.sin(vector.rads) * radius;
      let perpendicularInDegs = vector.degrees + 90;

      p.domElement.setAttribute('transform', `translate(${x}, ${y}), rotate(${perpendicularInDegs})`);
    });
  }
}

export default GameController;
