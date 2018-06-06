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
    this.track.play();
  }
  pause() {
    this.track.pause();
  }
  fadeOut() {
    this.track.fadeOut();
  }
}

const SoundtrackService = new Soundtrack();

export default SoundtrackService;
