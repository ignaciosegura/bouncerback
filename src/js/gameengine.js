// Game engine class

class GameEngine {

  constructor(bpm, time, song) {
    this.frameRate = 60;
    this.framesPerBeat = (60 / bpm) * this.frameRate;
    this.framesPerTime = time * this.framesPerBeat;
    this.clock = 0;
    this.interval = 1000 / this.frameRate;
    setInterval(this.gameLoop, 5000);
  }

  gameLoop() {
    this.clock++;
    console.log('fire');
  }
}

export default GameEngine;
