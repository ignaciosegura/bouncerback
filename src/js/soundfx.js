// Sound engine

import { computed } from 'mobx';

import PlatformService from './services/platformservice.js';
import SystemShop from './stores/systemshop.js';

class SoundFX {
  constructor(sound) {
    this.soundPath = PlatformService.adaptPathToDevices(sound);
    this.sound = new Audio(this.soundPath);
    this.sound.volume = 1 * SystemShop.sound.factor;
    this.sound.loop = false;
    this.sound.playbackRate = 1;
    this.sound.muted = computed(() => {
      return SystemShop.sound.muted
    }).get();
    this.fadeoutTime = 3000;
    this.fadeInterval;

    this.sound.load();
    this.prefetch();
  }

  play() {
    if (!SystemShop.sound.muted)
      this.sound.play();
  }
  pause() {
    this.sound.pause();
  }
  prefetch() {
    this.play();
    this.pause();
  }

  fadeOut() {
    let soundFrame = 5;
    let rate = 1 * soundFrame / this.fadeoutTime;

    this.fadeInterval = setInterval(
      () => {
        let newVolume = this.sound.volume - rate;
        this.sound.volume = (newVolume >= 0)
          ? newVolume
          : 0;
        if (this.sound.volume === 0) {
          this.sound.pause();
          clearInterval(this.fadeInterval);

        }
      }, soundFrame);
  }

}

export default SoundFX;
