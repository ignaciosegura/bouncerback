/*global require*/
// Puck class

require('../sass/_puck.scss');

class Puck {
  constructor(index) {
    this.puck = `<svg class="puck" index=${index}>
      <rect cx="0" cy="0" />
    </svg>`;
    let theZone = document.getElementById('the-zone');
    theZone.innerHTML += this.puck;
  }

  place(HTMLpuck) {

  }

  getMousePosition() {
    
  }

}

export default Puck;
