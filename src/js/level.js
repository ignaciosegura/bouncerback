// Class storing level data. Every instance of this class will be a level.
// setup object to be delivered on instantiation:

import SoundFX from './soundfx.js';

class Level {

  constructor(setup) {
    for (let k in setup) {
      this[k] = setup[k];
    }
    this.nextAtom = {
      order: 0,
      tick: 0
    }
    this.atoms = [];
  }

  areAllAtomsOut() {
    return (this.nextAtom.order >= this.atomList.length);
  }
}

export default Level;
