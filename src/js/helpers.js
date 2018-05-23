// Helper functions

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

export { compareVectorsForBounce };
