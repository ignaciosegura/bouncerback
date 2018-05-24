/*global require*/

// Game container and touch surface


require('../sass/_gamesurface.scss');

import React from 'react';
import { observer, inject } from 'mobx-react';

import GameEngine from './gameengine.js';
import GameShop from './stores/gameshop.js';

@inject('GameShop') @observer
class GameSurface extends React.Component {
  constructor(props) {
    super();
    this.engine = null;
    this.bootGameEngine = this.bootGameEngine.bind(this);
  }

  bootGameEngine(e) {
    if (this.engine !== null) return;

    this.engine = new GameEngine(GameShop.level);
  }

  componentWillUpdate() {
    console.log('component will update');
    let playground = document.getElementById('point-zero');
    playground.remove();
    this.engine = null;
  }

  render() {
    return <div id="gamesurface">
      <svg id="the-zone" onClick={this.bootGameEngine} data-level={this.props.GameShop.level}>
        <circle id="the-circle" cx="300" cy="300" r="300" />
      </svg>
    </div>
  }
}

export default GameSurface;
