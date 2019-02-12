// Background service

import SystemShop from '../stores/systemshop.js';
import TimeShop from '../stores/timeshop.js';
import GameShop from '../stores/gameshop.js';
import { autorun } from 'mobx';

class Background {
  constructor() {
    this.domElement = document.getElementsByTagName('body')[0];
    this.currentScene = 'neutral';

    autorun(() => {
      this.renderProperState();
    });
  }

  scheduleSceneChanges(scenes) {
    if (scenes.length == 0)
      return;

    scenes.forEach(element => {
      this.scheduleSceneChange(element);
    });
  }

  scheduleSceneChange(scene) {
    let timeToScene = scene.time * TimeShop.framesPerBar * TimeShop.millisecondsPerFrame;
    setTimeout(() => {
      this.changeState(scene.name);
    }, timeToScene);
  }

  changeState(newState) {
    this.domElement.classList.remove(SystemShop.backgroundState);
    this.currentScene = newState;
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
        newState = (currentLives === 1)
          ? 'danger'
          : this.currentScene;
        break;
      case '/game-over':
        newState = 'game-over';
        break;
      case '/game-beaten':
        newState = 'beaten';
        break;
      case '/main-menu':
        newState = 'game-select';
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
