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

  static addBouncesToScore(bounces) {
    if (bounces > 0 && GameShop.type !== 'tutorial')
      GameShop.addBounce(bounces);
  }
  static addCapturesToScore(captures) {
    if (GameShop.type !== 'tutorial')
      GameShop.addCapture(captures);
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
        this.whereToGoNext(level);
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
    ClockService.startTheClock();
    SoundtrackService.resume();
  }

  static toggleGame() {
    if (TimeShop.clock == 'on')
      this.pauseTheGame();
    else
      this.resumeTheGame();
  }

  static whereToGoNext() {
    if (GameShop.isLastLevel() && !GameShop.isTutorial())
      this.goGameBeaten();
    else
      this.goNextLevel();
  }

  static goNextLevel() {
    this.stopTheGame();
    GameShop.nextLevel();
  }

  static goGameBeaten() {
    this.goTo('/game-beaten');
  }

  static goBackHome() {
    this.goTo('/');
  }

  static goGameOver() {
    this.goTo('/game-over');
  }
  static goTo(route) {
    this.stopTheGame();
    history.push(route);
  }
}

export default GameService;
