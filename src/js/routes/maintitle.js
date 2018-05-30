/* global require */

require ('../../sass/_main_title.scss');

import React from 'react';
let GameLogo = require('../../img/game_logo.svg');

const MainTitle = () => {
  return <img id="main-title" src={GameLogo} />
}

export default MainTitle;
