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

export {findGameSurfaceCoords, getVectorFromXY};
