/*global require */

// Text field

require('../sass/_text.scss');

class Text {
  constructor(text, type = 'plain') {
    this.text = text;
    this.type = type;
    this.timeForRemoval = 5000;

    this.render();
  }

  render() {
    let gameSurface = document.getElementById('gamesurface');
    let textToRender = `<div class="text ${this.type}">${this.text}</div>`;
    gameSurface.insertAdjacentHTML('beforeend', textToRender);
    this.scheduleRemoval();
  }

  scheduleRemoval() {
    let textToRemove = document.querySelector('#gamesurface > .text');
    setTimeout(() => textToRemove.remove(), this.timeForRemoval);
  }
}

export default Text;
