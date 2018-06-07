// End game different conditions service

import { history } from '../index.js';

import AtomService from './atomservice.js';
import ClockService from './clockservice.js';
import SoundtrackService from './soundtrackservice.js';

import GameShop from '../stores/gameshop.js';

class GameService {
  static setInitialLives(atomCount, gameType) {
    let lives = gameType === 'tutorial'
      ? atomCount
      : Math.ceil(atomCount / 2);
    GameShop.setLives(lives);
  }

  static gameHasEnded(atoms) {
    return (AtomService.allAtomsAreInVortex(atoms) === true);
  }

  static gameIsOver() {
    return (GameShop.lives === 0);
  }

  static runEndGameActions(level) {
    switch (level.levelPassAction) {
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
    GameShop.setLives(0);
  }

  static gotoNextLevel() {
    this.stopTheGame();
    GameShop.nextLevel();
  }

  static goBackHome() {
    this.stopTheGame();
    history.push('/');
  }
  static goGameOver() {
    this.stopTheGame();
    history.push('/game-over');
  }
}

export default GameService;
