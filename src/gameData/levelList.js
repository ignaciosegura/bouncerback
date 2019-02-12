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
    track: ''
  },
  scenes: [
    { name: 'synthwave', time: 20 }
  ],
  atomSpeed: 1, // Beats to make a round trip
  atomList: [] // Array of moments where a new atom should be created
}

*/


const levelList = [
  {}, // Level Zero does not exist in real game, only on tutorial.
  {
    name: 'Neutronika',
    levelType: 'game',
    duration: 58,
    levelPassAction: 'next',
    gameOverAction: 'gameover',
    time: {
      bpm: 120,
      signature: 4
    },
    sound: {
      track: require('../sound/tracks/1.mp3')
    },
    scenes: [
      { name: 'neutral', time: 0 },
      { name: 'synthwave', time: 18 },
      { name: 'synthwave-mag', time: 36 },
      { name: 'synthwave-silver', time: 50 },
      { name: 'neutral', time: 58 }
    ],
    atomSpeed: 4,
    atomList: [
      { t: 0, b: 0, dir: 'left' },
      { t: 2, b: 0, dir: 'left' },
      { t: 7, b: 0.25 },
      { t: 11, b: 3.5, dir: 'right' },
      { t: 15, b: 2.5 },
      { t: 19, b: 3, dir: 'right' },
      { t: 25, b: 1, dir: 'left' },
      { t: 35, b: 0.75 },
      { t: 48, b: 3.25 },
    ]
  },
  {
    name: 'Femtocosmos',
    levelType: 'game',
    duration: 28,
    levelPassAction: 'next',
    gameOverAction: 'gameover',
    time: {
      bpm: 130,
      signature: 4
    },
    sound: {
      track: require('../sound/tracks/femtocosmos.mp3')
    },
    scenes: [
      { name: 'neutral', time: 0 }
    ],
    atomSpeed: 4,
    atomList: [
      { t: 0, b: 0, dir: 'right' },
      { t: 4, b: 0, dir: 'right' },
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
      track: require('../sound/tracks/chronosaedron.mp3')
    },
    scenes: [],
    atomSpeed: 2,
    atomList: [
      { t: 0, b: 0, dir: 'left' },
      { t: 4, b: 0, dir: 'right' },
      { t: 6, b: 1.5 },
      { t: 8, b: 3.5, dir: 'left' },
      { t: 9, b: 1.5, dir: 'right' },
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
      track: require('../sound/tracks/mekanomancer.mp3')
    },
    scenes: [],
    atomSpeed: 3,
    atomList: [
      { t: 0, b: 0, dir: 'right' },
      { t: 3, b: 0, dir: 'right' },
      { t: 5, b: 0 },
      { t: 7, b: 0 },
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
// Gravcon
// Neutronika
// Hexerion
export default levelList;
