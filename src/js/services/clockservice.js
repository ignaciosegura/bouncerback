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

  static resetClock() {
    TimeShop.tick = 0;
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

  static dummy() {
    console.log(this.gameInterval);
  }
}

export default ClockService;
