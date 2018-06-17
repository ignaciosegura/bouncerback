/* global  */
// GameShop

import { observable, computed } from 'mobx';
import levelList from '../../gameData/levellist.js';

class Game {
  @observable bounces = 0;
  @observable level = 0;
  @observable lives = 0;
  totalLevels = levelList.length;
  type = '';

  addBounce(b = 1) {
    this.bounces += b;
  }

  nextLevel() {
    this.level++;
  }

  resetBounces() {
    this.bounces = 0;
  }

  setLives(lives) {
    this.lives = lives;
  }
  removeALife() {
    this.lives = (this.lives > 0)
      ? --this.lives
      : 0;
  }
  isLastLevel() {
    return ((this.level + 1) === this.totalLevels);
  }
  isTutorial() {
    return (this.type === 'tutorial');
  }
}

const GameShop = new Game();

export default GameShop; 
