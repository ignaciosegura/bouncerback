/* global require */

const levelList = [
  {
    name: 'Tutorial',
    type: 'tutorial',
    duration: 4,
    levelPassAction: 'next',
    gameOverAction: 'gameover',
    time: {
      bpm: 115,
      signature: 4
    },
    sound: {
      launch: require('../sound/launch.mp3'),
      bounce: require('../sound/bounce_dry.mp3'),
      destroy: require('../sound/destroy.mp3'),
      song: require('../sound/tracks/tutorial.mp3')
    },
    atomSpeed: 4,
    atomList: [
      { t: 0, b: 0 },
      { t: 1, b: 0 },
      { t: 2, b: 0 },
      { t: 3, b: 0 },
    ]
  },
];

export default levelList;
