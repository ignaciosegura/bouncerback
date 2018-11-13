// Background service

import SystemShop from '../stores/systemshop.js';
import GameShop from '../stores/gameshop.js';
import { autorun } from 'mobx';

class Background {
  constructor() {
    this.domElement = document.getElementsByTagName('body')[0];

    autorun(() => {
      this.renderProperState();
    });
  }

  changeState(newState) {
    this.domElement.classList.remove(SystemShop.backgroundState);
    return this.setState(newState);
  }

  setState(newState) {
    this.domElement.classList.add(newState);
    SystemShop.backgroundState = newState;

    return newState;
  }

  renderProperState() {
    let currentScreen = window.location.pathname;
    let currentLives = GameShop.lives;
    let newState;

    switch (currentScreen) {
      case '/game':
        if (currentLives === 1)
          newState = 'danger';
        break;
      case '/game-over':
        newState = 'game-over';
        break;
      case '/game-beaten':
        newState = 'beaten';
        break;
      case '/':
        newState = 'intro';
        break;
      default:
        newState = 'neutral';
    }

    this.changeState(newState);
  }
}

const BackgroundService = new Background();

export default BackgroundService;
