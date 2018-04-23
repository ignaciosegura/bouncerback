// Class storing level data. Every instance of this class will be a level.
// setup object to be delivered on instantiation:
/*
{
  name: '',
  levelType: '', // Possible values are "tutorial" / "real"
  levelLength: , // measured in times.
  levelPassAction: 'next', // Possible values are "next"
  gameOverAction: 'gameover' // possible values are "gameover" and "restart"
  time = {
    bpm: bpm,
    signature: timeSignature
  };
  sound = {
    launch: '',
    bounce: '',
    destruction: '',
    song: ''
  }
  atoms: [] // Array of moments where a new atom should be created
}

*/


class Level {
  constructor(setup) {
    for (let k in setup) {
      this[k] = setup[k];
    }
    this.levelIsOver = false;
  }

  isLevelOver(times) {
    return (times >= this.levelLength);
  }
}

export default Level;
