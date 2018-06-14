// Soundtrack Service

import { autorun } from 'mobx';

import SoundFX from '../soundfx.js';
import SystemShop from '../stores/systemshop.js';

class Soundtrack {
  constructor() {
    this.track;
    this.autoWatch;
  }

  setupAutorun() {
    this.autowatch = autorun(() =>
      this.track.sound.muted = SystemShop.sound.muted
    );
  }

  newTrack(soundtrackFile) {
    this.track = new SoundFX(soundtrackFile);
    this.setupAutorun();
  }

  play() {
    if (this.track)
      this.track.play();
  }
  resume() {
    if (this.track && this.track.sound.currentTime > 0)
      this.track.play();
  }
  pause() {
    if (this.track)
      this.track.pause();
  }
  fadeOut() {
    if (this.track)
      this.track.fadeOut();
  }
  toggle() {
    if (this.track)
      this.track.pause();
  }
}

const SoundtrackService = new Soundtrack();

export default SoundtrackService;
