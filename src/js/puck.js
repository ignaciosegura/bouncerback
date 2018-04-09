/*global require*/
// Puck class

require('../sass/_puck.scss');

class Puck {
  constructor(index) {
    this.puck = `<rect class="puck" index=${index} x="0" y="0" />`;
    let theZone = document.getElementById('the-zone');
    theZone.innerHTML += this.puck;
  }

  place(HTMLpuck) {

  }

  getMousePosition() {

  }

}

export default Puck;
