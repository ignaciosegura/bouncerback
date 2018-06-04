/* global require */

require('../../sass/_main_title.scss');

import React from 'react';
import { Link } from 'react-router-dom';

let GameLogo = require('../../img/game_logo.svg');

class MainTitle extends React.Component {
  render() {
    return <div id="main-title">
      <img id="game-logo" src={GameLogo} />
      <div className="menu">
        <Link to="/tutorial" className="text ready">Tutorial</Link>
        <Link to="/game" className="text ready">New Game</Link>
      </div>
    </div>
  }
}

export default MainTitle;
