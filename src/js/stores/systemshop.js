// Store saving dafault values

import { observable, computed } from 'mobx';

class Default {
  @observable sound = {
    muted: false,
    factor: 0.5
  }
  @observable circleRadius = this.getZoneCSSWidth() / 2;

  constructor() {
    this.text = {
      fadeoutTime: 1500,
      readingTime: 3500,
    }
    this.TimeForRemoval = this.fadeoutTime + this.readingTime;
  }

  toggleSound() {
    this.sound.muted = !this.sound.muted;
  }

  getZoneCSSWidth() {
    let theZone = document.getElementById('the-zone');

    return (theZone !== null)
      ? parseInt(window.getComputedStyle(theZone).width)
      : 0;
  }

  getCircleRadius() {
    return this.getZoneCSSWidth() / 2;
  }

}

const SystemShop = new Default();

export default SystemShop;
