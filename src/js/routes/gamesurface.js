// Game container and touch surface

import React from 'react';
import ReactDOM from 'react-dom';

import { observer, inject } from 'mobx-react';
import { history } from '../index.js';

import Scoreboard from '../scoreboard.js';
import LivesCounter from '../livescounter.js';
import SystemMenu from '../systemmenu.js';
import GameEngine from '../gameengine.js';

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

  render() {
    return <div id="gamesurface" onTouchMove={this.preventDefault}>
      <Scoreboard type="score" />
      <Scoreboard type="level" />
      <LivesCounter />
      <SystemMenu />
      <div id="zone-wrapper">
        <svg id="the-zone" data-level={this.props.GameShop.level} width="100%" height="100%">
          <circle id="the-circle" cx="50%" cy="50%" r="50%" />
        </svg>
      </div>
    </div>
  }
}

export default GameSurface;
