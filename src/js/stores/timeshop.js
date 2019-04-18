/* global  */
// TimeShop

import { observable, computed } from 'mobx';

class Time {
  frameRate = 30;
  millisecondsPerFrame = 1000 / this.frameRate;
  @observable clock = 'on'; // possible values are 'on', 'off' and 'slowing-down'
  @observable tick = 0;
  framesPerBeat = 1;
  framesPerBar = 1;
  timeSignature = 1;
  levelDuration;
  nextTimeout;

  setup(bpm, timeSignature, duration) {
    this.reset();
    this.bpm = bpm;
    this.timeSignature = timeSignature;
    this.framesPerBeat = Math.pow(this.frameRate, 2) / bpm;
    this.framesPerBar = this.timeSignature * this.framesPerBeat;
    this.levelDuration = duration * this.framesPerBar;
  }

  reset() {
    this.tick = 0;
  }

  @computed get beat() {
    return this.getRoundedTimeUnit(this.framesPerBeat) % this.timeSignature;
  }

  @computed get bar() {
    return this.getRoundedTimeUnit(this.framesPerBar);
  }

  getRoundedTimeUnit(framesPerUnit) {
    return Math.floor(this.tick / framesPerUnit);
  }

  millisecondsToFrames(milliseconds) {
    return parseInt(milliseconds / this.millisecondsPerFrame);
  }

  nextTick() {
    this.tick++;
  }

  @computed get newBeat() {
    return (this.tick % this.framesPerBeat == 0) ? true : false;
  }

  @computed get levelIsOver() {
    return (this.tick >= this.levelDuration);
  }
}

const TimeShop = new Time();

export default TimeShop; 
