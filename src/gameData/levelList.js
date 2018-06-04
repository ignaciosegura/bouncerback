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
  },
  atomSpeed: 1, // Beats to make a round trip
  atomList: [] // Array of moments where a new atom should be created
}

*/


const levelList = [
  {}, // Level Zero does not exist on real game, only on tutorial.
  {
    name: 'Femtocosmos',
    levelType: 'game',
    duration: 16,
    levelPassAction: 'next',
    gameOverAction: 'gameover',
    time: {
      bpm: 130,
      signature: 4
    },
    sound: {
      launch: require('../sound/launch.mp3'),
      bounce: require('../sound/bounce_dry.mp3'),
      destroy: require('../sound/destroy.mp3'),
      song: require('../sound/tracks/femtocosmos.mp3')
    },
    atomSpeed: 2,
    atomList: [
      { t: 0, b: 0 },
      { t: 4, b: 0 },
      { t: 6, b: 1.5 },
      { t: 8, b: 3.5 },
      { t: 9, b: 1.5 },
      { t: 11, b: 2.75 },
      { t: 13, b: 1 },
      { t: 16, b: 0.5 },
      { t: 19, b: 3.25 },
      { t: 21, b: 0.75 },
      { t: 24, b: 2.5 },
    ]
  },
  {
    name: 'Chronosaedrøn',
    levelType: 'game',
    duration: 30,
    levelPassAction: 'next',
    gameOverAction: 'gameover',
    time: {
      bpm: 130,
      signature: 4
    },
    sound: {
      launch: require('../sound/launch.mp3'),
      bounce: require('../sound/bounce_dry.mp3'),
      destroy: require('../sound/destroy.mp3'),
      song: require('../sound/tracks/chronosaedron.mp3')
    },
    atomSpeed: 2,
    atomList: [
      { t: 0, b: 0 },
      { t: 4, b: 0 },
      { t: 6, b: 1.5 },
      { t: 8, b: 3.5 },
      { t: 9, b: 1.5 },
      { t: 11, b: 2.75 },
      { t: 13, b: 1 },
      { t: 16, b: 0.5 },
      { t: 19, b: 3.25 },
      { t: 21, b: 0.75 },
      { t: 24, b: 2.5 },
    ]
  },
  {
    name: 'Mekanomancer',
    levelType: 'game',
    duration: 30,
    levelPassAction: 'next',
    gameOverAction: 'gameover',
    time: {
      bpm: 180,
      signature: 3
    },
    sound: {
      launch: require('../sound/launch.mp3'),
      bounce: require('../sound/bounce_dry.mp3'),
      destroy: require('../sound/destroy.mp3'),
      song: require('../sound/tracks/mekanomancer.mp3')
    },
    atomSpeed: 3,
    atomList: [
      { t: 0, b: 0 },
      { t: 3, b: 0 },
      { t: 5, b: 0 },
      { t: 7, b: 0 },
      { t: 8, b: 1.5 },
      { t: 11, b: 1.5 },
      { t: 13, b: 2 },
      { t: 16, b: 1 },
      { t: 19, b: 3.25 },
      { t: 21, b: 0.75 },
      { t: 23, b: 0.5 },
      { t: 25, b: 1.25 },
    ]
  }
];
// Synthetogenesis
// Quantåmorphica
// Femtocosmos
// Gravcon
// Neutronika
// Hexerion
export default levelList;
