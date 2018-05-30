/*global require*/
// Game engine class

require('../sass/_game_props.scss');

import { autorun } from 'mobx';

import levelList from '../gameData/levelList.js';

import GameShop from './stores/gameshop.js';
import TimeShop from './stores/timeshop.js';

import Puck from './puck.js';
import GameController from './gamecontroller.js';
import Level from './level.js';
import Vortex from './vortex.js';

import AtomService from './services/atomservice.js';
import CoordsService from './services/coordsservice.js';
import ClockService from './services/clockservice.js';
import TextService from './services/textservice.js';
import DefaultsShop from './stores/defaultsshop';

class GameEngine {

  constructor(level) {
    this.level = new Level(levelList[level]);
    TimeShop.setup(this.level.time.bpm, this.level.time.signature, this.level.duration);

    this.gameSurfaceCoords = CoordsService.findGameSurfaceCoords();
    this.pucks = [];
    this.atoms = [];
    this.vortex = null;
    this.gameLoop = this.gameLoop.bind(this);
    this.gameInterval;

    this.setupReadyState();
  }

  setupReadyState() {
    CoordsService.createPointZero('#the-zone');
    let title = TextService.renderTitle(this.level.name);
    let readyText = TextService.renderReadyText();
    let fadeoutTime = DefaultsShop.text.fadeoutTime;

    readyText.domElement.onclick = () => {
      this.startGame();
      TextService.scheduleTextRemoval(title, fadeoutTime);
      TextService.scheduleTextRemoval(readyText, fadeoutTime);
    }
  }

  startGame() {
    let puck = new Puck(0);
    puck.placePuck();
    this.pucks.push(puck);
    this.pucks[0].domElement = document.querySelector('#point-zero rect');

    let gameController = new GameController(this.gameSurfaceCoords, this.pucks);

    this.level.soundtrack.play();

    ClockService.startGameLoop(this);

    this.setupAutoruns();
  }

  setupAutoruns() {
    let createVortex = autorun(() => {
      if (!TimeShop.levelIsOver || this.level.levelPassAction !== 'next' || this.vortex !== null) return;

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

    if (bounces > 0) GameShop.addBounce(bounces);

    this.checkVortex();
    this.checkAtomList();
    this.checkGameOver();
    this.checkAllAtomsAreinVortex();
  }

  checkGameOver() {
    if (!this.level.areAllAtomsOut() || this.atoms.length > 0) return false;

    clearInterval(this.gameLoopInterval);
    console.log('Game Over!');
  }

  checkVortex() {
    if (this.vortex === null || this.vortex.active === false)
      return;

    AtomService.checkVortex(this.atoms, this.vortex);
  }

  checkAllAtomsAreinVortex() {
    if (AtomService.allAtomsAreInVortex(this.atoms) !== true) return;

    this.level.soundtrack.fadeOut();
    ClockService.stopTheClock();
    GameShop.nextLevel();
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
