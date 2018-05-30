/*global require*/

// Game container and touch surface


require('../sass/_gamesurface.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { observer, inject } from 'mobx-react';

import Ready from './ready.js';

import GameEngine from './gameengine.js';
import GameShop from './stores/gameshop.js';

@inject('DefaultsShop', 'GameShop') @observer
class GameSurface extends React.Component {
  constructor(props) {
    super();
    this.engine = null;
  }

  componentDidMount() {
    if (this.engine !== null) return;

    this.engine = new GameEngine(GameShop.level);
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  componentWillUpdate() {
    let playground = document.getElementById('point-zero');
    playground.remove();
    this.engine = null;
  }

  render() {
    let radius = this.props.DefaultsShop.circleRadius;
    let size = radius * 2;
    
    return <div id="gamesurface">
      <svg id="the-zone" data-level={this.props.GameShop.level} width={size} height={size}>
        <circle id="the-circle" cx={radius} cy={radius} r={radius} />
      </svg>
    </div>
  }
}

export default GameSurface;
