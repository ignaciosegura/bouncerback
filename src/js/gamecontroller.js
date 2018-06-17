// Game Controller class
import SystemShop from './stores/systemshop.js';
import CoordsService from './services/coordsservice.js';

class GameController {
  constructor(pucks) {
    this.pucks = pucks;

    this.movePucks([0, Math.PI]); // First run
    this.movePucksOnInput();
  }

  movePucksOnInput() {
    let inputHandler = (e) => {
      let positionArr = CoordsService.getXYFromInput(e);
      let vectorArr = (e.type == 'touchmove')
        ? this.getVectorsFromTouchPositions(positionArr)
        : this.getVectorsFromMousePosition(positionArr)
      this.movePucks(vectorArr);
    };

    ['mousemove', 'touchmove'].forEach(e => {
      document.addEventListener(e, inputHandler.bind(this), false);
    });
  }

  getVectorsFromMousePosition(positionArr) {
    let mousePos = CoordsService.getVectorFromScreenCoords(positionArr[0]);
    return [mousePos, mousePos];
  }

  getVectorsFromTouchPositions(positionArr) {
    let xyArr = positionArr.map(p => CoordsService.getXYFromScreenCoords(p));
    let leftOrRight;
    let vectorArr = [null, null];

    xyArr.forEach(xy => {
      leftOrRight = (xy.x < 0)
        ? 0
        : 1;
      vectorArr[leftOrRight] = CoordsService.getVectorFromXY(xy.x, xy.y);
    });
    return vectorArr;
  }

  movePucks(vectorArr) {
    this.pucks.forEach(p => {
      if (vectorArr[p.index] === null)
        return;
      p.updatePosition(vectorArr[p.index]);
    });
  }
}

export default GameController;
