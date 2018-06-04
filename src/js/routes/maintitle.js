/* global require */

require ('../../sass/_main_title.scss');

import React from 'react';
import { Link } from 'react-router-dom';

let GameLogo = require('../../img/game_logo.svg');

class MainTitle extends React.Component {
  render() {
    return <div id="main-title">
      <img id="game-logo" src={GameLogo} />
      <Link to="/">Title</Link>
      <Link to="/game">Game</Link>
    </div>
  }
}

export default MainTitle;
