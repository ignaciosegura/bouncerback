// Puck class

import SystemShop from './stores/systemshop.js';
import CoordsService from './services/coordsservice.js';

class Puck {
  constructor(index = 0, angle = 20) {
    this.index = index;
    this.size = {
      width: SystemShop.gameSurfaceCoords.width / 11 * 2,
      height: SystemShop.gameSurfaceCoords.width / 55
    }
    this.translateCoords = {
      x: this.size.width / -2,
      y: this.size.height / -2
    }
    this.vector = CoordsService.getVectorFromXY(0, -1);
    this.angle = angle * Math.PI / 180;
    this.domElement = this.placeInDOM();
  }

  static getSize() {
    return this.size;
  }

  placeInDOM() {
    let puck = `<rect class="puck"
      index="${this.index}"
      x="${this.translateCoords.x}"
      y="${this.translateCoords.y}"
      width="${this.size.width}"
      height="${this.size.height}"
    />`;
    let putContainer = document.getElementById('point-zero');
    putContainer.insertAdjacentHTML('beforeend', puck);

    return document.querySelector(`#point-zero .puck[index="${this.index}"]`);
  }

  updatePosition(vector) {
    this.vector = vector;
    this.move();
  }

  move() {
    let radius = SystemShop.gameSurfaceCoords.radius;
    let x = Math.cos(this.vector) * radius;
    let y = Math.sin(this.vector) * radius;
    let perpendicularInDegs = CoordsService.getDegreesFromRads(this.vector) + 90;

    this.domElement.setAttribute('transform', `translate(${x}, ${y}), rotate(${perpendicularInDegs})`);
  }
}

export default Puck;
