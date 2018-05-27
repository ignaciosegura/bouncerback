/*global require*/

// Game container and touch surface


require('../sass/_gamesurface.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { observer, inject } from 'mobx-react';

import Ready from './ready.js';

import GameEngine from './gameengine.js';
import GameShop from './stores/gameshop.js';
import DefaultsShop from './stores/defaultsshop.js';

@inject('DefaultsShop', 'GameShop') @observer
class GameSurface extends React.Component {
  constructor(props) {
    super();
    this.engine = null;
    this.bootGameEngine = this.bootGameEngine.bind(this);
    this.clickedReadyHandler = this.clickedReadyHandler.bind(this);
  }

  clickedReadyHandler(e) {
    e.preventDefault();
    if (this.engine !== null) return;

    let readyText = document.getElementById('text-ready');
    let timeForRemoval = this.props.DefaultsShop.text.timeForRemoval - this.props.DefaultsShop.text.readingTime;

    this.bootGameEngine(e);
    readyText.classList.add('clicked');

    setTimeout(() => {
      readyText.remove();
    }, timeForRemoval);
  }

  bootGameEngine(e) {
    this.engine = new GameEngine(GameShop.level);
  }

  componentWillUpdate() {
    let playground = document.getElementById('point-zero');
    playground.remove();
    this.engine = null;
  }

  render() {
    return <div id="gamesurface">
      <svg id="the-zone" data-level={this.props.GameShop.level} onClick={this.clickedReadyHandler}>
        <circle id="the-circle" cx="300" cy="300" r="300" />
      </svg>
      <Ready clicked={false} />
    </div>
  }
}

export default GameSurface;
