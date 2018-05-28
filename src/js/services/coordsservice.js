// Coordinates service

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
    let debug = Math.cos(vector) * displacement;
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
}

export default CoordsService;
