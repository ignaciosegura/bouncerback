
// AtomService

import Atom from '../atom.js';
import { compareVectorsForBounce } from '../helpers.js';

class AtomService {
  static moveAtoms(atoms) {
    atoms.forEach(a => a.moveAtom());
  }

  static checkAtomsStatus(atoms, radius) {
    atoms.forEach(a => a.checkAtom(radius));
  }

  static createAtom(index, level) {
    let newAtom = new Atom(index, level);
    newAtom.createDOMElement();
    newAtom.domElement = document.querySelector('.atom[index="' + index + '"]');
    return newAtom;
  }

  static destroyAtoms(atoms) {
    let i;

    for (i in atoms) {
      if (atoms[i].status !== 'dead') continue;

      atoms[i].domElement.remove();
      atoms.splice(i, 1);
    }
  }

  static bounceAtoms(atoms, pucks) {
    let colliders = atoms.filter(a => a.status == 'collide');
    let bouncesCount = 0;

    colliders.forEach(a => {
      pucks.forEach(p => {
        let result = compareVectorsForBounce(a.vector, p.vector, p.angle);

        if (result) {
          a.executeBounce();
          bouncesCount++;
        }
      })
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
    let capturedAtoms = atoms.reduce((ax, current) => {
      return (current.status == 'captured')
        ? ax + 1
        : ax;
    }, 0);

    return (capturedAtoms === atoms.length);
  }
}

export default AtomService;
