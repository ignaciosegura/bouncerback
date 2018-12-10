/* global  */
// TimeShop

import { observable, computed } from 'mobx';

class Time {
  frameRate = 60;
  millisecondsPerFrame = 1000 / this.frameRate;
  @observable clock = 'on'; // possible values are 'on', 'off' and 'slowing-down'
  @observable tick = 0;
  framesPerBeat = 1;
  framesPerTime = 1;
  timeSignature = 1;
  levelDuration;
  nextTimeout;

  setup(bpm, timeSignature, duration) {
    this.reset();
    this.bpm = bpm;
    this.timeSignature = timeSignature;
    this.framesPerBeat = Math.pow(this.frameRate, 2) / bpm;
    this.framesPerTime = this.timeSignature * this.framesPerBeat;
    this.levelDuration = duration * this.framesPerTime;
  }

  reset() {
    this.tick = 0;
  }

  @computed get beat() {
    return this.getRoundedTimeUnit(this.framesPerBeat) % this.timeSignature;
  }

  @computed get time() {
    return this.getRoundedTimeUnit(this.framesPerTime);
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
