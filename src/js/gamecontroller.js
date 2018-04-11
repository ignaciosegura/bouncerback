// Game Controller class

class GameController {
  constructor(gameSurfaceCoords, pucks) {
    this.gameSurfaceCoords = gameSurfaceCoords;
    this.pucks = pucks;
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
      this._movePucks(mouseVector);
    };
  }

  _getMouseVector(mousePos) {
    let x = mousePos.x - this.gameSurfaceCoords.centerX;
    let y = mousePos.y - this.gameSurfaceCoords.centerY;
    let angle = Math.atan2(y, x);
    return {
      rads: angle,
      degrees: angle * 180 / Math.PI
    }
  }

  _movePucks(vector) {
    this.pucks.forEach( p => {
      let radius = this.gameSurfaceCoords.radius;
      let x = Math.cos(vector.rads) * radius;
      let y = Math.sin(vector.rads) * radius;
      let perpendicularInDegs = vector.degrees + 90;
      let rotationCoords = {
        x: x - p.instance.translateCoords.x,
        y: y - p.instance.translateCoords.y
      }

      p.setAttribute('x', radius + x);
      p.setAttribute('y', radius + y);
      p.setAttribute('transform', p.instance.translation + ' rotate(' + perpendicularInDegs + ' ' + rotationCoords.x + ' ' + rotationCoords.y + ')');
    });
  }
}

export default GameController;
