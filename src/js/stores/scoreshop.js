/* global  */
// ScoreShop

import {observable, computed} from 'mobx';

class Score {
  @observable bounces = 0;
  @observable level = 1;

  @computed get report() {
    return `Bounces: ${this.bounces} / Level: ${this.level}`;
  }

  addBounce(b = 1) {
    this.bounces += b;
  }
}

const ScoreShop = new Score();

export default ScoreShop; 
