/* global  */
// Store

import {observable, computed} from 'mobx';

class Store {
  @observable bounces = 0;
  @observable level = 1;

  @computed get report() {
    return `Bounces: ${this.bounces} / Level: ${this.level}`;
  }

  addBounce() {
    ++this.bounces;
  }
}


export default Store; 
