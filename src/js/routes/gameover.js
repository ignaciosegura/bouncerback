/* global require */
require('../../sass/_game_over.scss');

import React from 'react';
import { Link } from 'react-router-dom';

import ScreenMenu from '../screenmenu.js';
import Scoreboard from '../scoreboard.js';

class GameOver extends React.Component {
  render() {
    return <div id="game-over-screen">
      <h1>Game Over</h1>
      <ScreenMenu />
      <Scoreboard type="bounces" />
      <Scoreboard type="level" />
    </div>
  }
}

export default GameOver;
