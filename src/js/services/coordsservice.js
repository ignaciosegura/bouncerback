// Coordinates service
import SystemShop from '../stores/systemshop.js';

class CoordsService {

  static findGameSurfaceCoords() {
    let theCircle = document.getElementById('the-circle');
    let coords = theCircle.getBoundingClientRect();
    return {
      centerX: (coords.left + coords.right) / 2,
      centerY: (coords.top + coords.bottom) / 2,
      width: coords.width,
      height: coords.height,
      radius: coords.width / 2,
    };
  }

  static getVectorFromXY(x, y) {
    return Math.atan2(y, x);
  }

  static getVectorFromYandScreen(x, y) {
    let YRangeFactor = 1.75;
    let sinY = (y * YRangeFactor) / (window.innerHeight / 2);

    let rangedSinY = (Math.abs(sinY) > 1)
      ? 1 * Math.sign(sinY)
      : sinY;
    let Yradian = rangedSinY * (Math.PI / 2)
    let side = Math.sign(x);

    return side === 1
      ? Yradian
      : Math.PI - Yradian;
  }

  static getDegreesFromRads(rads) {
    return rads * 180 / Math.PI;
  }

  static getVectorFromScreenCoords(position) {
    let normalizedPos = this.getXYFromScreenCoords(position);
    return this.getVectorFromXY(normalizedPos.x, normalizedPos.y);
  }

  static getXYFromScreenCoords(position) {
    return {
      x: position.x - SystemShop.gameSurfaceCoords.centerX,
      y: position.y - SystemShop.gameSurfaceCoords.centerY
    }
  }

  static getDistanceFromXY(x, y) {
    return Math.sqrt((Math.pow(x, 2)) + (Math.pow(y, 2)));
  }

  static getXYFromVector(vector, displacement) {
    return {
      x: Math.cos(vector) * displacement,
      y: Math.sin(vector) * displacement
    }
  }

  static getReversedVector(vector) {
    return (vector > 0)
      ? vector - Math.PI
      : vector + Math.PI;
  }

  static makeFinite(value) {
    return isFinite(value)
      ? value
      : 0;
  }

  // Creates a Point Zero for SVG coords (required by Firefox, as set origin CSS directive doesn't work)
  static createPointZero(cssPlace) {
    let puckContainer = '<svg id="point-zero" x="50%" y="50%"></svg>';
    let target = document.querySelector(cssPlace);
    target.insertAdjacentHTML('beforeend', puckContainer);
  }

  static getXYFromInput(e) {
    let readPosition = path => {
      return {
        x: path.clientX,
        y: path.clientY
      }
    }
    return (e.type === 'mousemove')
      ? [readPosition(e)]
      : Array.from(e.changedTouches).map(t => readPosition(t));
  }

  static compareVectorsForBounce(angleAtom, anglePuck, range) {
    let angleAtomPos = this.makeAnglePositive(angleAtom);
    let angleAtomFullCircle = angleAtomPos + (Math.PI * 2);

    let anglePuckPos = this.makeAnglePositive(anglePuck);
    let halfRange = range / 2;
    let bracket = {
      from: anglePuckPos - halfRange,
      to: anglePuckPos + halfRange
    }

    if (this.isInRange(angleAtom, bracket)
      || this.isInRange(angleAtomPos, bracket)
      || this.isInRange(angleAtomFullCircle, bracket)) {
      return true;
    } else {
      return false;
    }
  }
  static isInRange(angle, bracket) {
    return (angle > bracket.from && angle < bracket.to);
  }

  static makeAnglePositive(angle) {
    return (angle < 0)
      ? angle + 2 * Math.PI
      : angle;
  }
}

export default CoordsService;
