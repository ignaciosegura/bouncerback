/*global require*/
// Game engine class

require('../sass/_game_props.scss');

import { autorun } from 'mobx';

import levelList from '../gameData/levelList.js';
import tutorialList from '../gameData/tutorialList.js';

import GameShop from './stores/gameshop.js';
import TimeShop from './stores/timeshop.js';

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Level from './level.js';
import Vortex from './vortex.js';

import AtomService from './services/atomservice.js';
import CoordsService from './services/coordsservice.js';
import ClockService from './services/clockservice.js';
import EndGameService from './services/endgameservice.js';
import TextService from './services/textservice.js';
import SoundtrackService from './services/soundtrackservice.js';

import SystemShop from './stores/systemshop';

class GameEngine {

  constructor(level, gameType) {
    this.level = gameType === 'tutorial'
      ? new Level(tutorialList[level])
      : new Level(levelList[level]);
    TimeShop.setup(this.level.time.bpm, this.level.time.signature, this.level.duration);
    GameShop.setLives(Math.ceil(this.level.atomList.length / 2));

    this.gameSurfaceCoords = CoordsService.findGameSurfaceCoords();
    this.pucks = [];
    this.atoms = [];
    this.vortex = null;
    this.gameLoop = this.gameLoop.bind(this);

    this.setupReadyState();
  }

  setupReadyState() {
    CoordsService.createPointZero('#the-zone');
    SoundtrackService.newTrack(this.level.sound.track);

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
    this.pucks.push(new Puck(0));
    this.pucks.push(new Puck(1));

    new GameController(this.gameSurfaceCoords, this.pucks);

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
    AtomService.checkAtomsStatus(this.atoms, this.gameSurfaceCoords.radius);
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
    if (EndGameService.gameIsOver())
      EndGameService.goGameOver();
  }

  checkVortex() {
    if (this.vortex === null || this.vortex.active === false)
      return;

    AtomService.checkVortex(this.atoms, this.vortex);
  }

  checkAllAtomsAreinVortex() {
    if (!EndGameService.gameHasEnded(this.atoms)) return;

    EndGameService.runEndGameActions(this.level);
  }

  checkAtomList() {
    if (this.level.areAllAtomsOut()) return;
    if (Math.round(this.level.nextAtom.tick) !== TimeShop.tick) return;

    this.addAtomToGameSurface();
    this.scheduleNextAtom();

  }

  addAtomToGameSurface() {
    this.atoms.push(AtomService.createAtom(this.level.nextAtom.order, this.level));
  }


  scheduleNextAtom() {
    this.level.nextAtom.order++;
    if (this.level.areAllAtomsOut()) return;

    let nextAtom = this.level.nextAtom.order;
    let atomTime = this.level.atomList[nextAtom];

    this.level.nextAtom.tick = atomTime.b * TimeShop.framesPerBeat + atomTime.t * TimeShop.framesPerTime;
  }
}

export default GameEngine;
