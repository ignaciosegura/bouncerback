
// AtomService

import Atom from '../atom.js';
import CoordsService from './coordsservice.js';
import GameShop from '../stores/gameshop.js';

class AtomService {
  static moveAtoms(atoms) {
    atoms.forEach(a => a.moveAtom());
  }

  static checkAtomsStatus(atoms) {
    atoms.forEach(a => a.checkAtom());
  }

  static createAtom(index, level, direction) {
    let newAtom = new Atom(index, level, direction);
    newAtom.spawnAtomInDOM();
    return newAtom;
  }

  static countAtoms(atoms, property, value) {
    if (atoms.length == 0)
      return 0;

    let countedAtoms = atoms.reduce((ax, a) => {
      return (a.status[property] === value)
        ? ax + 1
        : ax
    }, 0);
    return countedAtoms;
  }

  static bounceAtoms(atoms, pucks) {
    let colliders = atoms.filter(a => a.status.collide);
    let bouncesCount = 0;

    colliders.forEach(a => {
      let didAtomCollide = pucks.some(p => {
        let result = CoordsService.compareVectorsForBounce(a.vector, p.vector, p.angle);

        if (result) {
          a.executeBounce();
          bouncesCount++;
          return true;
        }
      });
    });
    return bouncesCount;
  }

  static setAtomsToVortex(atoms, timeToEffect) {
    setTimeout(function () {
      atoms.forEach(a => a.setAtomToVortex(timeToEffect));
    }, timeToEffect);
  }

  static checkVortex(atoms, vortex) {
    atoms.forEach(a => a.checkVortex(vortex.activeRadius));
  }

  static allAtomsAreInVortex(atoms) {
    if (atoms.length === 0)
      return false;

    let capturedAtoms = this.countAtoms(atoms, 'captured', true);
    let deadAtoms = this.countAtoms(atoms, 'alive', false);

    return ((capturedAtoms + deadAtoms) === atoms.length);
  }
}

export default AtomService;
