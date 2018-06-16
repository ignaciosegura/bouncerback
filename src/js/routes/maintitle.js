/* Global require */
import React from 'react';

import ScreenMenu from '../screenmenu.js';

let GameLogo = require('../../img/game_logo.svg');

class MainTitle extends React.Component {
  render() {
    return <div id="main-title">
      <img id="game-logo" src={GameLogo} />
      <ScreenMenu />
    </div>
  }
}

export default MainTitle;
