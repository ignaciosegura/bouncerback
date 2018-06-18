/* global  */
// GameShop

import { observable, computed } from 'mobx';
import levelList from '../../gameData/levellist.js';

class Game {
  @observable bounces = 0;
  @observable captured = 0;
  @observable level = 0;
  @observable lives = 0;
  totalLevels = levelList.length;
  type = '';

  @computed get score() {
    return this.bounces * 10 + this.captured * 100;
  }

  addBounce(b = 1) {
    this.bounces += b;
  }
  addCapture(c = 1) {
    this.captured += c;
  }

  nextLevel() {
    this.level++;
  }

  resetCaptures() {
    this.captured = 0;
  }

  resetBounces() {
    this.bounces = 0;
  }

  resetScore() {
    this.resetCaptures();
    this.resetBounces();
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
