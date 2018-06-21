// Game Controller class
import SystemShop from './stores/systemshop.js';
import CoordsService from './services/coordsservice.js';

class GameController {
  constructor(pucks) {
    this.pucks = pucks;

    this.movePucks([Math.PI, 0]); // First run
    this.movePucksOnInput();
  }

  movePucksOnInput() {
    let inputHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let positionArr = CoordsService.getXYFromInput(e);
      let vectorArr = (e.type == 'mousemove')
        ? this.getVectorsFromMousePosition(positionArr)
        : this.getVectorsFromTouchPositions(positionArr);
      this.movePucks(vectorArr);
    };

    ['touchmove', 'touchend', 'mousemove'].forEach(e => {
      let gameBoard = document.getElementById('game-board');
      gameBoard.addEventListener(e, inputHandler.bind(this), false);
    });
  }

  getVectorsFromMousePosition(positionArr) {
    let mouseVector = CoordsService.getVectorFromScreenCoords(positionArr[0]);
    let reversedMouseVector = CoordsService.getReversedVector(mouseVector);
    return [mouseVector, reversedMouseVector];
  }

  getVectorsFromTouchPositions(positionArr) {
    let xyArr = positionArr.map(p => CoordsService.getXYFromScreenCoords(p));
    let leftOrRight;
    let vectorArr = [null, null];

    xyArr.forEach(xy => {
      leftOrRight = (xy.x < 0)
        ? 0
        : 1;
      vectorArr[leftOrRight] = CoordsService.getVectorFromYandScreen(xy.x, xy.y);
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
