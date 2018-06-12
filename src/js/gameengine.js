/*global require*/
// Game engine class

require('../sass/_game_props.scss');

import { autorun } from 'mobx';

import levelList from '../gameData/levelList.js';
import tutorialList from '../gameData/tutorialList.js';

import GameShop from './stores/gameshop.js';
import TimeShop from './stores/timeshop.js';
import SystemShop from './stores/systemshop.js';

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Level from './level.js';
import Vortex from './vortex.js';

import AtomService from './services/atomservice.js';
import CoordsService from './services/coordsservice.js';
import ClockService from './services/clockservice.js';
import GameService from './services/gameservice.js';
import TextService from './services/textservice.js';
import SoundtrackService from './services/soundtrackservice.js';

class GameEngine {

  constructor(level, gameType) {
    this.gameType = gameType;
    this.level = this.gameType === 'tutorial'
      ? new Level(tutorialList[level])
      : new Level(levelList[level]);
    TimeShop.setup(this.level.time.bpm, this.level.time.signature, this.level.duration);
    GameService.setInitialLives(this.level.atomList.length, gameType);

    this.pucks = [];
    this.atoms = [];
    this.vortex = null;
    this.gameLoop = this.gameLoop.bind(this);

    this.setupReadyState();
  }

  setupReadyState() {
    CoordsService.createPointZero('#the-zone');
    SoundtrackService.newTrack(this.level.sound.track);
    this.level.scheduleAtom(0);

    let title = TextService.renderTitle(this.level.name);
    let readyText = TextService.renderReadyText();
    let fadeoutTime = SystemShop.text.fadeoutTime;

    readyText.domElement.onclick = (e) => {
      e.preventDefault();
      this.startGame();
      TextService.scheduleTextRemoval(title, fadeoutTime);
      TextService.scheduleTextRemoval(readyText, fadeoutTime);
    }
  }

  startGame() {
    SystemShop.gameSurfaceCoords = CoordsService.findGameSurfaceCoords();
    this.pucks.push(new Puck(0));
    this.pucks.push(new Puck(1));

    new GameController(this.pucks);

    SoundtrackService.play();

    ClockService.startGameLoop(this);

    this.setupAutoruns();
  }

  setupAutoruns() {
    let createVortex = autorun(() => {
      if (!TimeShop.levelIsOver || this.vortex !== null) return;

      this.vortex = new Vortex(this.gameSurfaceCoords.radius);

      AtomService.setAtomsToVortex(this.atoms, this.vortex.timeToEffect);
    });
  }

  gameLoop() {
    let bounces;

    AtomService.destroyAtoms(this.atoms);
    AtomService.checkAtomsStatus(this.atoms);
    AtomService.moveAtoms(this.atoms);
    bounces = AtomService.bounceAtoms(this.atoms, this.pucks);

    if (bounces > 0 && this.level.type !== 'tutorial')
      GameShop.addBounce(bounces);

    this.checkVortex();
    this.checkAtomList();
    this.checkGameOver();
    this.checkAllAtomsAreinVortex();
  }

  checkGameOver() {
    if (GameService.gameIsOver())
      GameService.goGameOver();
  }

  checkVortex() {
    if (this.vortex === null || this.vortex.active === false)
      return;

    AtomService.checkVortex(this.atoms, this.vortex);
  }

  checkAllAtomsAreinVortex() {
    if (!GameService.gameHasEnded(this.atoms)) return;

    GameService.runEndGameActions(this.level);
  }

  checkAtomList() {
    if (this.level.areAllAtomsOut()) return;
    if (Math.round(this.level.nextAtom.tick) !== TimeShop.tick) return;

    this.addAtomToGameSurface();
    this.level.scheduleNextAtom();
  }

  addAtomToGameSurface() {
    this.atoms.push(AtomService.createAtom(this.level.nextAtom.order, this.level));
  }
}

export default GameEngine;
