// Soundtrack Service

import SoundFX from '../soundfx.js';

class Soundtrack {
  constructor() {
    this.track = null;
  }

  newTrack(soundtrackFile) {
    this.track = new SoundFX(soundtrackFile);
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
