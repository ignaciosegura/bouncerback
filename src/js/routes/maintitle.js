/* Global require */
import React from 'react';

import ScreenMenu from '../screenmenu.js';

import Footer from '../footer.js';

import InlineSVG from 'svg-inline-react';

class MainTitle extends React.Component {
  generateCanvas() {

  }

  render() {
    let GameLogo = require('../../img/game_logo_v2.svg');

    return <div>
      <div id="main-title">
        <InlineSVG src={GameLogo} raw={true} />
        <ScreenMenu />
      </div>
      <Footer />
    </div>
  }
}

export default MainTitle;
