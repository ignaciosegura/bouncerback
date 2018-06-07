// Text service

import Text from '../text.js';
import SystemShop from '../stores/systemshop.js';

class TextService {
  static renderTitle(levelName) {
    return this.renderText(levelName, 'title');
  }

  static renderReadyText() {
    return this.renderText('I\'m ready!', 'ready');
  }

  static renderText(text, type) {
    return new Text(text, type);
  }

  static scheduleTextRemoval(text, timeForRemoval = null) {
    text.domElement.classList.add('fadeout');
    let time = (timeForRemoval === null)
      ? SystemShop.text.timeForRemoval
      : timeForRemoval;

    text.scheduleRemoval(time);
  }
}

export default TextService;
