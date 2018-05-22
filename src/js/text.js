/*global require */

// Text field

require('../sass/_text.scss');

class Text {
  constructor(text, type = 'plain') {
    this.text = text;
    this.type = type;
    this.timeForRemoval = 4000;
  }

  render() {
    let gameSurface = document.getElementById('gamesurface');
    let textToRender = `<div class="text ${this.type}">${this.text}</div>`;
    gameSurface.insertAdjacentHTML('beforeend', textToRender);
    this.scheduleOwnDestruction();
  }

  scheduleRemoval() {
    let textToRemove = document.querySelector('#gamesurface > .text');
    setTimeout(() => textToRemove.remove(), this.timeForRemoval);
  }
}
