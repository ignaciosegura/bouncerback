/* global require */

const levelList = [
  {
    name: 'Tutorial',
    type: 'tutorial',
    duration: 12,
    levelPassAction: 'home',
    gameOverAction: 'gameover',
    time: {
      bpm: 65,
      signature: 4
    },
    sound: {
      track: require('../sound/tracks/tutorial.mp3')
    },
    atomSpeed: 4,
    atomList: [
      { t: 1, b: 0 },
      { t: 3, b: 0 },
      { t: 6, b: 0 },
      { t: 10, b: 0 },
    ]
  },
];

export default levelList;
