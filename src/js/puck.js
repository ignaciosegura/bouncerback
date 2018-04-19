/*global require*/
// Puck class

require('../sass/_puck.scss');

class Puck {
  constructor(index) {
    this.index = index;
    this.size = {
      width: 80,
      height: 25
    }
    this.translateCoords = {
      x: this.size.width / -2,
      y: this.size.height / -2
    }
  }

  place() {
    let puck = `<svg class="puck" x="50%" y="50%">
      <rect
        index="${this.index}"
        x="${this.translateCoords.x}"
        y="${this.translateCoords.y}"
        width="${this.size.width}"
        height="${this.size.height}"
      />
    </svg>`;
    let theZone = document.getElementById('the-zone');
    theZone.insertAdjacentHTML('beforeend', puck);
  }
}

export default Puck;
