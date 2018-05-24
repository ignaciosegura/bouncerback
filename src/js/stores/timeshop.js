/* global  */
// TimeShop

import { observable, computed } from 'mobx';

class Time {
  frameRate = 60;
  millisecondsPerFrame = 1000 / this.frameRate;
  @observable clock = 'on'; // possible values are 'on', 'off' and 'slowing-down'
  @observable tick = 0;
  @observable beat = 0;
  @observable time = 0;
  framesPerBeat;
  framesPerTime;
  levelDuration;

  setup(bpm, timeSignature, duration) {
    this.bpm = bpm;
    this.timeSignature = timeSignature;
    this.framesPerBeat = Math.pow(this.frameRate, 2) / bpm;
    this.framesPerTime = timeSignature * this.framesPerBeat;
    this.levelDuration = duration;
  }

  updateTimeUnits() {
    this.beat = this.getRoundedTimeUnit(this.beat, this.framesPerBeat) % this.timeSignature;
    this.time = this.getRoundedTimeUnit(this.time, this.framesPerTime);
  }

  getRoundedTimeUnit(current, framesPerUnit) {
    return Math.floor(this.tick / framesPerUnit);
  }

  nextTick() {
    this.tick++;
    this.updateTimeUnits();
  }

  @computed get newBeat() {
    return (this.tick % this.framesPerBeat == 0) ? true : false;
  }

  @computed get levelIsOver() {
    return (this.time >= this.levelDuration);
  }
}

const TimeShop = new Time();

export default TimeShop; 
