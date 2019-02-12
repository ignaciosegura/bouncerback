// Class storing level data. Every instance of this class will be a level.
// setup object to be delivered on instantiation:

import ClockService from './services/clockservice.js';

class Level {

  constructor(setup) {
    for (let k in setup) {
      this[k] = setup[k];
    }
    this.nextAtom = {
      order: 0,
      tick: 0,
    }
    this.atoms = [];
  }

  areAllAtomsOut() {
    return (this.nextAtom.order >= this.atomList.length);
  }

  scheduleNextAtom() {
    this.nextAtom.order++;
    this.scheduleAtom(this.nextAtom.order);
  }

  scheduleAtom(order) {
    if (this.areAllAtomsOut()) return;
    let atomTime = this.atomList[order];

    this.nextAtom.tick = ClockService.calculateTickFromMusicalNotation(atomTime.t, atomTime.b);
  }
}

export default Level;
