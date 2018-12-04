import React from 'react';
import { Link } from 'react-router-dom';

import MainMenu from './mainmenu.js';
import Scoreboard from '../scoreboard.js';

class GameOver extends React.Component {
  render() {
    return <div id="game-ended-screen" className="game-over">
      <h1>Game Over</h1>
      <Scoreboard type="score" />
      <Scoreboard type="level" />
      <Link to="/level-list" className="text ready">New Game</Link>
    </div>
  }
}

export default GameOver;
