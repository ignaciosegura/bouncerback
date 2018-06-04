// End game different conditions service

import {history} from '../index.js';

import AtomService from './atomservice.js';
import ClockService from './clockservice.js';
import SoundtrackService from './soundtrackservice.js';

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
      this.goBackHome();
    }
  }

  static stopTheGame() {
    SoundtrackService.fadeOut();
    ClockService.stopTheClock();
  }

  static gotoNextLevel() {
    this.stopTheGame();
    GameShop.nextLevel();
  }

  static goBackHome() {
    this.stopTheGame();
    history.push('/');
  }
}

export default EndGameService;