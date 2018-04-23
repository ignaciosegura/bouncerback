// Class storing level data. Every instance of this class will be a level.
// setup object to be delivered on instantiation:

class Level {
  constructor(setup) {
    for (let k in setup) {
      this[k] = setup[k];
    }
    this.levelIsOver = false;
    this.nextAtom = 0;
  }

  isLevelOver(times) {
    return (times >= this.levelLength);
  }
}

export default Level;
