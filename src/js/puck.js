/*global require*/
// Puck class

require('../sass/_puck.scss');

class Puck {
  constructor(index) {
    this.size = {
      width: 80,
      height: 25
    }
    this.translateCoords = {
      x: this.size.width / -2,
      y: this.size.height / -2
    }
    this.translation = 'translate(' + this.translateCoords.x + ', ' + this.translateCoords.y + ')';
    this.puck = `<rect class="puck" index="${index}" x="0" y="0" width="${this.size.width}" height="${this.size.height}" transform="${this.translation}" transform-origin="center center" />`;
  }

  place() {
    let theZone = document.getElementById('the-zone');
    theZone.innerHTML += this.puck;
  }

  getMousePosition() {

  }

}

export default Puck;
