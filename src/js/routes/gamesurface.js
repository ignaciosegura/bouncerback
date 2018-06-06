/*global require*/

// Game container and touch surface


require('../../sass/_gamesurface.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { observer, inject } from 'mobx-react';

import Scoreboard from '../scoreboard.js';
import LivesCounter from '../livescounter.js';
import GameEngine from '../gameengine.js';

import GameShop from '../stores/gameshop.js';

@inject('GameShop', 'SystemShop') @observer
class GameSurface extends React.Component {
  constructor(props) {
    super();
    this.engine = null;
    GameShop.level = props.level;
  }

  componentDidMount() {
    if (this.engine !== null) return;

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
    let radius = this.props.SystemShop.circleRadius;
    let size = radius * 2;

    return <div id="gamesurface" onTouchMove={this.preventDefault}>
      <Scoreboard type="bounces" />
      <Scoreboard type="level" />
      <LivesCounter />
      <svg id="the-zone" data-level={this.props.GameShop.level} width={size} height={size}>
        <circle id="the-circle" cx={radius} cy={radius} r={radius} />
      </svg>
    </div>
  }
}

export default GameSurface;
