// Sound engine

class SoundFX {
  constructor(sound = null) {
    this.sound = new Audio(sound);
    this.sound.load();
  }

  play() {
    this.sound.play();
  }
}

export default SoundFX;
