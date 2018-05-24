// Sound engine

class SoundFX {
  constructor(sound = null) {
    this.sound = new Audio(sound);
    this.sound.volume = 1;
    this.sound.fadeoutTime = 3000;
    this.fadeInterval;

    this.sound.load();
  }

  play() {
    this.sound.play();
  }

  fadeOut() {
    let soundFrame = 10;
    let rate = 1 * soundFrame / this.fadeoutTime;

    this.fadeInterval = setInterval(
      () => {
        this.sound.volume = this.sound.volume - rate;
        if (this.sound.volume <= 0) clearInterval(this.fadeInterval);
      }, soundFrame);
  }

}

export default SoundFX;
