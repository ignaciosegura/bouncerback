// Sound engine

class SoundFX {
  constructor(sound = null) {
    this.sound = sound;
  }

  play() {
    console.log('playing one shot sound');
  }
}

export default SoundFX;
