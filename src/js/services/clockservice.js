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
      this.scheduleTick();
      this.gameLoop();
      this.nextTick();
    }, time);
  }

  static killScheduledTick() {
    clearTimeout(TimeShop.nextTimeout);
  }

  static calculateTickFromMusicalNotation(bar = 0, beat = 0) {
    return (bar * TimeShop.framesPerBar) + (beat * TimeShop.framesPerBeat);
  }

  static convertTimesIntoFrames(bars) {
    return bars * TimeShop.framesPerBar;
  }
}

export default ClockService;
