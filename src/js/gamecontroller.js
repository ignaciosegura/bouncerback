// Game Controller class
import SystemShop from './stores/systemshop.js';
import CoordsService from './services/coordsservice.js';

class GameController {
  constructor(pucks) {
    this.pucks = pucks;

    this.movePucks([]); // First run
    this.movePucksOnInput();
  }

  movePucksOnInput() {
    let inputHandler = (e) => {
      let positionArr = CoordsService.getXYFromInput(e);
      let vectorArr = positionArr.map(p => CoordsService.getVectorFromScreenCoords(p));
      this.movePucks(vectorArr);
    };

    ['mousemove', 'touchmove'].forEach(e => {
      document.addEventListener(e, inputHandler.bind(this), false);
    });
  }

  movePucks(vectorArr) {
    this.pucks.forEach(p => {
      let vector = (vectorArr[p.index])
        ? vectorArr[p.index]
        : p.vector;

      p.vector = this.moveOnePuck(p, vector);
    });
  }

  moveOnePuck(puck, vector) {
    let radius = SystemShop.gameSurfaceCoords.radius;
    let x = Math.cos(vector) * radius;
    let y = Math.sin(vector) * radius;
    let perpendicularInDegs = CoordsService.getDegreesFromRads(vector) + 90;

    puck.domElement.setAttribute('transform', `translate(${x}, ${y}), rotate(${perpendicularInDegs})`);

    return vector;
  }
}

export default GameController;
