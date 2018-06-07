// Clock service

import { autorun } from 'mobx';
import TimeShop from '../stores/timeshop.js';

class ClockService {
  static startTheClock() {
    TimeShop.clock = 'on';
  }

  static stopTheClock() {
    TimeShop.clock = 'off';
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
    this.startTheClock();
    this.resetClock();

    this.gameLoop = engine.gameLoop;

    this.scheduleTick();
  }

  static scheduleTick() {
    if (TimeShop.clock === 'off') return;

    this.setNextIteration(TimeShop.millisecondsPerFrame);
  }

  static setNextIteration(time) {
    setTimeout(() => {
      this.gameLoop();
      this.nextTick();
      this.scheduleTick();
    }, time);
  }

  static calculateTickFromMusicalNotation(time = 0, beat = 0) {
    return (time * TimeShop.framesPerTime) + (beat * TimeShop.framesPerBeat);
  }
}

export default ClockService;
