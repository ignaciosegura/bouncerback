// Coordinates service
require('../../sass/_point_zero.scss');

class CoordsService {

  static findGameSurfaceCoords() {
    let theCircle = document.getElementById('the-circle');
    let coords = theCircle.getBoundingClientRect();
    return {
      centerX: (coords.left + coords.right) / 2,
      centerY: (coords.top + coords.bottom) / 2,
      radius: parseInt(theCircle.getAttribute('cx'))
    };
  }

  static getVectorFromXY(x, y) {
    let angle = Math.atan2(y, x);
    return {
      rads: angle,
      degrees: angle * 180 / Math.PI
    }
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
