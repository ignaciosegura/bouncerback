/*global require*/

// Game container and touch surface


require('../sass/_gamesurface.scss');

import React from 'react';
import {observer, inject} from 'mobx-react';

import GameEngine from './gameengine.js';

@inject('store')
class GameSurface extends React.Component {
  constructor(props) {
    super();
    this.engine = false;
    this.bootGameEngine = this.bootGameEngine.bind(this);
  }

  bootGameEngine(e) {
    if (this.engine !== false) return;
    this.engine = new GameEngine(130, 4, '');  
  }

  render() {
    return <div id="gamesurface">
      <svg id="the-zone" onClick={this.bootGameEngine}>
        <circle id="the-circle" cx="300" cy="300" r="299" />
      </svg>
    </div>
  }
}

export default GameSurface;