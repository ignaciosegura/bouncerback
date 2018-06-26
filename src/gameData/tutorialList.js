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
      { t: 1, b: 0, dir: 'left' },
      { t: 3, b: 0, dir: 'left' },
      { t: 6, b: 0, dir: 'right' },
      { t: 10, b: 0, dir: 'right' },
    ]
  },
];

export default levelList;
