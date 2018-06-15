/* global require */

// Game beaten screen

require('../../sass/_game_ended.scss');

import React from 'react';

import ScreenMenu from '../screenmenu.js';
import Scoreboard from '../scoreboard.js';

class GameBeaten extends React.Component {
  render() {
    return <div id="game-ended-screen" className="game-beaten">
      <h1>Congratulations!</h1>
      <h2>You saved the vortex, yourself and the whole universe. Sort of.</h2>
      <ScreenMenu />
      <Scoreboard type="bounces" />
      <Scoreboard type="level" />
    </div>
  }
}

export default GameBeaten;
