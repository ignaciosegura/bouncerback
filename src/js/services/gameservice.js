// End game different conditions service

import { history } from '../index.js';

import AtomService from './atomservice.js';
import ClockService from './clockservice.js';
import SoundtrackService from './soundtrackservice.js';

import GameShop from '../stores/gameshop.js';
import TimeShop from '../stores/timeshop.js';

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

  static pauseTheGame() {
    ClockService.stopTheClock();
    SoundtrackService.pause();
  }

  static resumeTheGame() {
    ClockService.resumeTheClock();
    SoundtrackService.resume();
  }

  static toggleGame() {
    if (TimeShop.clock == 'on')
      this.pauseTheGame();
    else
      this.resumeTheGame();
  }

  static whereToGoNext() {
    this.stopTheGame();
    let currentLevel = GameShop.level;

    if(GameShop.isLastLevel() && !GameShop.isTutorial())
      this.goGameBeaten();
    else
      this.goNextLevel();
  }

  static goNextLevel() {
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

  static goGameBeaten() {
    this.stopTheGame();
    history.push('/game-passed');
  }
}

export default GameService;
