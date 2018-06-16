// Clock service

import TimeShop from '../stores/timeshop.js';

class ClockService {
  static startTheClock() {
    TimeShop.clock = 'on';
    this.scheduleTick();
  }

  static stopTheClock() {
    TimeShop.clock = 'off';
    this.killScheduledTick();
  }

  static toggleClock() {
    TimeShop.clock = (TimeShop.clock === 'on')
      ? 'off'
      : 'on';
  }

  static resetClock() {
    TimeShop.reset();
  }

  static nextTick() {
    TimeShop.nextTick();
  }

  static startGameLoop(engine) {
    this.gameLoop = engine.gameLoop;
    this.resetClock();
    this.startTheClock();
  }

  static scheduleTick() {
    if (TimeShop.clock === 'off') return;

    this.setNextIteration(TimeShop.millisecondsPerFrame);
  }

  static setNextIteration(time) {
    TimeShop.nextTimeout = setTimeout(() => {
      this.gameLoop();
      this.nextTick();
      this.scheduleTick();
    }, time);
  }

  static killScheduledTick() {
    clearTimeout(TimeShop.nextTimeout);
  }

  static calculateTickFromMusicalNotation(time = 0, beat = 0) {
    return (time * TimeShop.framesPerTime) + (beat * TimeShop.framesPerBeat);
  }
}

export default ClockService;
