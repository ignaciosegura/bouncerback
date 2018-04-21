// Sound engine

class SoundFX {
  constructor(sound = null) {
    this.sound = new Audio(sound);
  }

  play() {
    this.sound.play();
  }
}

export default SoundFX;
