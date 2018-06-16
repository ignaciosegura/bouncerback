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

    if (currentScreen === '/game' && GameShop.lives === 1) {
      this.changeState('danger');
    } else if (currentScreen === '/game-over') {
      this.changeState('game-over');
    } else if (currentScreen === '/game-beaten') {
      this.changeState('beaten');
    } else {
      this.changeState('neutral');
    }
  }
}

const BackgroundService = new Background();

export default BackgroundService;
