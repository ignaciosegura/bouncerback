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

function getDistanceFromXY(x, y) {
  return Math.sqrt((x ** 2) + (y ** 2));
}

function getXYFromVector(vector, displacement) {
  return {
    x: Math.cos(vector) * displacement,
    y: Math.sin(vector) * displacement
  }
}

function compareVectorsForBounce(angleAtom, anglePuck, range) {
  angleAtom = makeAnglePositive(angleAtom);
  anglePuck = makeAnglePositive(anglePuck);
  range = range / 2;
  let bracket = {
    from: anglePuck - range,
    to: anglePuck + range
  }

  return (angleAtom > bracket.from && angleAtom < bracket.to)
    ? true
    : false;
}

function makeAnglePositive(angle) {
  return (angle < 0)
    ? angle + 2 * Math.PI
    : angle;
}

export { findGameSurfaceCoords, getVectorFromXY, getDistanceFromXY, getXYFromVector, compareVectorsForBounce };
