// Logic specific to mobile version

import GameService from './gameservice.js';

class PhoneGapService {
  static setupPhoneGapListeners() {

    document.addEventListener('deviceready', () => {

      document.addEventListener('pause', () => {
        GameService.pauseTheGame();
      });
      document.addEventListener('resume', () => {
        GameService.resumeTheGame();
      });

    }, false);
  }
}

export default PhoneGapService;
