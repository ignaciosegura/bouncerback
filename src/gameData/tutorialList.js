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
      launch: require('../sound/launch.mp3'),
      bounce: require('../sound/bounce_dry.mp3'),
      destroy: require('../sound/destroy.mp3'),
      track: require('../sound/tracks/tutorial.mp3')
    },
    atomSpeed: 4,
    atomList: [
      { t: 4, b: 0 },
      { t: 5, b: 0 },
      { t: 6, b: 0 },
      { t: 7, b: 0 },
    ]
  },
];

export default levelList;
