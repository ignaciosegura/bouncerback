/* Global require */
import React from 'react';

import ScreenMenu from '../screenmenu.js';
import SoundtrackService from '../services/soundtrackservice.js';
import BackgroundService from '../services/backgroundservice.js';
import AfterFXAnimation from '../afterfxanimation.js';

import * as animationData from '../../motion/data.json';

import Footer from '../footer.js';

import InlineSVG from 'svg-inline-react';

class MainTitle extends React.Component {
  constructor() {
    super();
    this.playSoundtrack();
    BackgroundService.changeState('intro');
  }
  playSoundtrack() {
    let mainScreenSong = require('../../sound/tracks/main_title.mp3');
    SoundtrackService.newTrack(mainScreenSong, 'intro');
    SoundtrackService.play();
  }

  render() {
    let SVGBackground = require('../../img/title_screen_gamesurface.svg');
    let GameLogo = require('../../img/game_logo_v2.svg');

    return <div>
      <AfterFXAnimation animationData={animationData} width={'100%'} height={'auto'} loop={false} autoplay={true} title="maintitle-animation" />
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
