// End game different conditions service

import AtomService from './atomservice.js';
import ClockService from './clockservice.js';

import GameShop from '../stores/gameshop.js';

class EndGameService {
  static gameHasEnded(atoms) {
    return (AtomService.allAtomsAreInVortex(atoms) === true);
  }

  static runEndGameActions(level) {
    switch(level.levelPassAction) {
    case 'next':
      this.gotoNextLevel(level);
      break;
    case 'home':
      // Do something to Route to home
    }
  }

  static gotoNextLevel(level) {
    level.soundtrack.fadeOut();
    ClockService.stopTheClock();
    GameShop.nextLevel();
  }
}

export default EndGameService;
