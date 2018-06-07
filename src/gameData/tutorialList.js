/* global require */

const levelList = [
  {
    name: 'Tutorial',
    type: 'tutorial',
    duration: 32,
    levelPassAction: 'home',
    gameOverAction: 'gameover',
    time: {
      bpm: 140,
      signature: 3
    },
    sound: {
      launch: require('../sound/launch.mp3'),
      bounce: require('../sound/bounce_dry.mp3'),
      destroy: require('../sound/destroy.mp3'),
      track: require('../sound/tracks/tutorial.mp3')
    },
    atomSpeed: 8,
    atomList: [
      { t: 8, b: 0 },
      { t: 14, b: 0 },
      { t: 20, b: 0 },
      { t: 26, b: 0 },
    ]
  },
];

export default levelList;
