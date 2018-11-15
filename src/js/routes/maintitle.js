/* Global require */
import React from 'react';

import ScreenMenu from '../screenmenu.js';
import SoundtrackService from '../services/soundtrackservice.js';

import Footer from '../footer.js';

import InlineSVG from 'svg-inline-react';

class MainTitle extends React.Component {
  playSoundtrack() {
    let mainScreenSong = require('../../sound/tracks/main_title.mp3');
    SoundtrackService.newTrack(mainScreenSong);
    SoundtrackService.play();
  }

  render() {
    let SVGBackground = require('../../img/title_screen_gamesurface.svg');
    let GameLogo = require('../../img/game_logo_v2.svg');
    this.playSoundtrack();

    return <div>
      <InlineSVG className="svg-background" src={SVGBackground} raw={true} />
      <div id="main-title">
        <InlineSVG className="main-logo" src={GameLogo} raw={true} />
        <ScreenMenu />
      </div>
      <Footer />
    </div>
  }
}

export default MainTitle;
