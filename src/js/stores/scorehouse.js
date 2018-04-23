/* global  */
// ScoreHouse

import {observable, computed} from 'mobx';

class ScoreHouse {
  @observable bounces = 0;
  @observable level = 1;
  @observable times = 0;

  @computed get report() {
    return `Bounces: ${this.bounces} / Level: ${this.level}`;
  }

  addBounce() {
    ++this.bounces;
  }

  addTime() {
    ++this.times;
  }
}


export default ScoreHouse; 
