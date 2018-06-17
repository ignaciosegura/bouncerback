// Logic specific to mobile version

import { history } from '../index.js';
import GameService from './gameservice.js';

import SystemShop from '../stores/systemshop.js';

class PhoneGapService {
  static setupPhoneGapListeners() {

    document.addEventListener('deviceready', () => {

      document.addEventListener('pause', () => {
        GameService.pauseTheGame();
      });
      document.addEventListener('resume', () => {
        GameService.resumeTheGame();
      });
      document.addEventListener('backbutton', () => {
        GameService.stopTheGame();
        history.goBack();
      });

      SystemShop.physicalScreen = this.getRealScreenSizeIfPossible();
    }, false);
  }

  static getRealScreenSizeIfPossible() {
    return (window.plugins.screensize)
      ? window.plugins.screensize.get(
        result => { return result }
        , result => { return result }
      )
      : null;
  }
}

export default PhoneGapService;
