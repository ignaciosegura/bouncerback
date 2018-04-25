/*global require*/
//EXAMPLE LEVEL

/*
{
  name: '',
  levelType: '', // Possible values are "tutorial" / "real"
  duration: , // measured in times.
  levelPassAction: 'next', // Possible values are "next"
  gameOverAction: 'gameover' // possible values are "gameover" and "restart"
  time = {
    bpm: 120,
    signature: 4
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


const levelList = [
  {
    name: 'Tutorial',
    levelType: 'tutorial',
    duration: 2,
    levelPassAction: 'next',
    gameOverAction: 'gameover',
    time: {
      bpm: 120,
      signature: 4
    },
    sound: {
      launch: require('../sound/launch.mp3'),
      bounce: require('../sound/bounce_dry.mp3'),
      destroy: require('../sound/destroy.mp3'),
      song: ''
    },
    atomSpeed: 100,
    atomList: [
      { t: 0, b: 0 },
      { t: 2, b: 1 },
      { t: 4, b: 2 },
      { t: 6, b: 3 },
      { t: 9, b: 0 }
    ]
  }
];

export default levelList;
