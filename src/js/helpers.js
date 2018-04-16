// Helper functions

function findGameSurfaceCoords() {
  let theCircle = document.getElementById('the-circle');
  let coords = theCircle.getBoundingClientRect();
  return {
    centerX: (coords.left + coords.right) / 2,
    centerY: (coords.top + coords.bottom) / 2,
    radius: parseInt(theCircle.getAttribute('cx'))
  };
}

function getVectorFromXY(x, y) {
  let angle = Math.atan2(y, x);
  return {
    rads: angle,
    degrees: angle * 180 / Math.PI
  }
}

function getXYFromVector(vector, displacement) {
  return {
    x: Math.cos(vector) * displacement,
    y: Math.sin(vector) * displacement
  }
}

function setupTimeUnits(bpm, time) {
  let frameRate = 60;
  let framesPerBeat = (60 / bpm) * frameRate;
  let framesPerTime = time * framesPerBeat;
  let clock = 0;
  let millisecondsPerFrame = 1000 / frameRate;

  return {frameRate, framesPerBeat, framesPerTime, clock, millisecondsPerFrame};
}

export {findGameSurfaceCoords, getVectorFromXY, getXYFromVector, setupTimeUnits};
