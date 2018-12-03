import React from 'react';

import MainMenu from './mainmenu.js';
import Scoreboard from '../scoreboard.js';

class GameOver extends React.Component {
  render() {
    return <div id="game-ended-screen" className="game-over">
      <h1>Game Over</h1>
      <MainMenu />
      <Scoreboard type="score" />
      <Scoreboard type="level" />
    </div>
  }
}

export default GameOver;
