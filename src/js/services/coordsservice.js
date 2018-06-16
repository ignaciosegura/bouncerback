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

  static getDegreesFromRads(rads) {
    return rads * 180 / Math.PI;
  }

  static getVectorFromScreenCoords(position) {
    let x = position.x - SystemShop.gameSurfaceCoords.centerX;
    let y = position.y - SystemShop.gameSurfaceCoords.centerY;
    return this.getVectorFromXY(x, y);
  }

  static getDistanceFromXY(x, y) {
    return Math.sqrt((x ** 2) + (y ** 2));
  }

  static getXYFromVector(vector, displacement) {
    return {
      x: Math.cos(vector) * displacement,
      y: Math.sin(vector) * displacement
    }
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
    return (e.type === 'touchmove')
      ? Array.from(e.targetTouches).map(t => readPosition(t))
      : [readPosition(e)];
  }

  static compareVectorsForBounce(angleAtom, anglePuck, range) {
    angleAtom = this.makeAnglePositive(angleAtom);
    anglePuck = this.makeAnglePositive(anglePuck);
    let halfRange = range / 2;
    let bracket = {
      from: anglePuck - halfRange,
      to: anglePuck + halfRange
    }
    let isInRange = (a) => (a > bracket.from && a < bracket.to);

    return (isInRange(angleAtom))
      ? true
      : isInRange(angleAtom + (Math.PI * 2));
  }

  static makeAnglePositive(angle) {
    return (angle < 0)
      ? angle + 2 * Math.PI
      : angle;
  }
}

export default CoordsService;
