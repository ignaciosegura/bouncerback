import React from 'react';

import ScreenMenu from '../screenmenu.js';
import Scoreboard from '../scoreboard.js';

class GameOver extends React.Component {
  render() {
    return <div id="game-ended-screen" className="game-over">
      <h1>Game Over</h1>
      <ScreenMenu />
      <Scoreboard type="bounces" />
      <Scoreboard type="level" />
    </div>
  }
}

export default GameOver;
