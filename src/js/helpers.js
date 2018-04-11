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

export default findGameSurfaceCoords;
