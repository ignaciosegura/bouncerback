/*global require*/
// Puck class

require('../sass/_puck.scss');

class Puck {
  constructor(index = 0) {
    this.index = index;
    this.size = {
      width: 80,
      height: 25
    }
    this.translateCoords = {
      x: this.size.width / -2,
      y: this.size.height / -2
    }
    this.vector;
  }

  static getSize() {
    return this.size;
  }

  static placeContainer(placeId) {
    let puckContainer = '<svg class="puck" x="50%" y="50%"></svg>';
    let theZone = document.getElementById(placeId);
    theZone.insertAdjacentHTML('beforeend', puckContainer);   
  }

  placePuck() {
    let puck = `<rect
      index="${this.index}"
      x="${this.translateCoords.x}"
      y="${this.translateCoords.y}"
      width="${this.size.width}"
      height="${this.size.height}"
    />`;
    let putContainer = document.querySelector('svg.puck');
    putContainer.insertAdjacentHTML('beforeend', puck);
  }
}

export default Puck;
