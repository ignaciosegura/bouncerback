/*global require */

// Text field

require('../sass/_text.scss');

import TimeShop from './stores/timeshop.js';

class Text {
  constructor(text, type = 'plain', timeForRemoval = null) {
    this.text = text;
    this.type = type;
    this.tick = TimeShop.tick;
    this.domElement = null;
    this.timeForRemoval = timeForRemoval;

    this.render();
  
    if(this.timeForRemoval !== null) {
      this.scheduleRemoval(this.timeForRemoval);
    }
  }

  render() {
    let gameSurface = document.getElementById('gamesurface');
    let textId = `${this.type}-${this.tick}`;
    let textToRender = `<div id="${textId}" class="text ${this.type}">${this.text}</div>`;
    gameSurface.insertAdjacentHTML('beforeend', textToRender);

    this.domElement = document.getElementById(textId);
  }

  scheduleRemoval(timeForRemoval) {
    setTimeout(() => this.remove(), timeForRemoval);
  }

  remove() {
    this.domElement.remove();
  }
}

export default Text;
