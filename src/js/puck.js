// Puck class

class Puck {
  constructor(index = 0, angle = 10) {
    this.index = index;
    this.size = {
      width: 80,
      height: 10
    }
    this.translateCoords = {
      x: this.size.width / -2,
      y: this.size.height / -2
    }
    this.angle = angle * Math.PI / 180;
    this.vector;
    this.domElement;

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
}

export default Puck;
