/* Global require */
import React from 'react';

import THREE from 'three';

import ScreenMenu from '../screenmenu.js';

import Footer from '../footer.js';

let GameLogo = require('../../img/game_logo_v2.svg');

class MainTitle extends React.Component {
  generateCanvas() {

  }

  render() {
    return <div>
      <div id="main-title">
        <img id="game-logo" src={GameLogo} />
        <ScreenMenu />
      </div>
      <Footer />
    </div>
  }
}

export default MainTitle;
