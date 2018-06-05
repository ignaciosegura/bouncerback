/* global  */
// GameShop

import { observable, computed } from 'mobx';

class Game {
  @observable bounces = 0;
  @observable level = 0;
  @observable lives = 0;

  addBounce(b = 1) {
    this.bounces += b;
  }

  levelUp(l) {
    this.level += l;
  }
  nextLevel() {
    this.levelUp(1);
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
}

const GameShop = new Game();

export default GameShop; 
