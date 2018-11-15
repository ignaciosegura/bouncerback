// Game container and touch surface

import React from 'react';
import ReactDOM from 'react-dom';

import { observer, inject } from 'mobx-react';
import { history } from '../index.js';

import Scoreboard from '../scoreboard.js';
import Chrono from '../chrono.js';
import LivesCounter from '../livescounter.js';
import SystemMenu from '../systemmenu.js';
import GameEngine from '../gameengine.js';
import SoundtrackService from '../services/soundtrackservice.js';

import GameShop from '../stores/gameshop.js';
import SystemShop from '../stores/systemshop.js';

@inject('GameShop', 'SystemShop') @observer
class GameSurface extends React.Component {
  constructor(props) {
    super(props);
    this.engine = null;

    if (props.gameType === 'tutorial')
      GameShop.level = 0;
  }

  componentDidMount() {
    this.stopSoundtrack();
    if (this.engine !== null) return;

    if (this.props.gameType === 'game' && this.props.GameShop.level === 0) {
      history.push('/level-list');
      return;
    }

    this.engine = new GameEngine(GameShop.level, this.props.gameType);
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  componentWillUpdate() {
    let playground = document.getElementById('point-zero');
    playground.remove();
    this.engine = null;
  }

  preventDefault(e) {
    e.preventDefault();
  }

  stopSoundtrack() {
    SoundtrackService.fadeOut();
  }

  render() {
    return <div id="gamesurface">
      <div id="game-hud">
        <Scoreboard type="score" />
        <Scoreboard type="level" />
        <Chrono />
        <LivesCounter />
        <SystemMenu />
      </div>
      <div id="game-board" onTouchMove={this.preventDefault}>
        <div id="zone-wrapper">
          <svg id="the-zone" data-level={this.props.GameShop.level} width="100%" height="100%">
            <circle id="the-circle" cx="50%" cy="50%" r="50%" />
          </svg>
        </div>
      </div>
    </div>
  }
}

export default GameSurface;
