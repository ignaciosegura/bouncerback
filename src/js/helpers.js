// Helper functions

import Puck from './puck.js';

function findGameSurfaceCoords() {
  let theCircle = document.getElementById('the-circle');
  let coords = theCircle.getBoundingClientRect();
  return {
    centerX: (coords.left + coords.right) / 2,
    centerY: (coords.top + coords.bottom) / 2,
    radius: parseInt(theCircle.getAttribute('cx'))
  };
}

function findcollisionDistance() {
  let dummyPuck = new Puck();
  let gameSurfaceCoords = findGameSurfaceCoords();
  return {
    from: gameSurfaceCoords.radius - dummyPuck.size.height,
    to: gameSurfaceCoords.radius
  }
}

function getVectorFromXY(x, y) {
  let angle = Math.atan2(y, x);
  return {
    rads: angle,
    degrees: angle * 180 / Math.PI
  }
}

function getDistanceFromXY(x, y) {
  return Math.sqrt((x ** 2) + (y ** 2));
}

function getXYFromVector(vector, displacement) {
  return {
    x: Math.cos(vector) * displacement,
    y: Math.sin(vector) * displacement
  }
}

function compareVectorsForCollision(angle1, angle2, range) {
  angle1 = makeAnglePositive(angle1);
  angle2 = makeAnglePositive(angle2);
  range = range / 2;
  let bracket = {
    from: angle2 - range,
    to: angle2 + range
  }

  return (angle1 > bracket.from && angle1 < bracket.to)
    ? true
    : false;
}

function makeAnglePositive(angle) {
  return (angle < 0)
    ? angle + 2 * Math.PI
    : angle;
}

export { findGameSurfaceCoords, findcollisionDistance, getVectorFromXY, getDistanceFromXY, getXYFromVector, compareVectorsForCollision };
