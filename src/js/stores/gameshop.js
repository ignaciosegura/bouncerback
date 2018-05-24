/* global  */
// GameShop

import { observable, computed } from 'mobx';

class Game {
  @observable bounces = 0;
  @observable level = 0;

  addBounce(b = 1) {
    this.bounces += b;
  }
}

const GameShop = new Game();

export default GameShop; 
