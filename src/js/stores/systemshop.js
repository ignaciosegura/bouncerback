// Store saving dafault values

import { observable, computed } from 'mobx';

class Default {
  @observable sound = {
    muted: false,
    factor: 0.5
  }

  constructor() {
    this.text = {
      fadeoutTime: 1500,
      readingTime: 3500,
    }
    this.TimeForRemoval = this.fadeoutTime + this.readingTime;

    this.circleRadius = observable.box(275);
  }

  toggleSound() {
    this.sound.muted = !this.sound.muted;
  }

}

const SystemShop = new Default();

export default SystemShop;
