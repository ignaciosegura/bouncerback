// System menu

require('../sass/_systemmenu.scss');

import React from 'react';
import {Link} from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import SystemShop from './stores/systemshop.js';
import ClockService from './services/clockservice.js';
import EndGameService from './services/endgameservice.js';


@inject('TimeShop', 'SystemShop') @observer
class SystemMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  soundClick(e) {
    e.preventDefault();
    SystemShop.toggleSound();
  }

  pauseClick(e) {
    e.preventDefault();
    ClockService.toggleClock();
  }
  closeClick(e) {
    EndGameService.stopTheGame();
  }


  render() {
    let soundStatusClass = (this.props.SystemShop.sound.muted)
      ? 'muted'
      : 'sound';
    let pauseStatusClass = (this.props.TimeShop.clock === 'on')
      ? 'playing'
      : 'paused';

    return <div id='system-menu'>
      <a href='#' className={soundStatusClass} onClick={this.soundClick}>S</a>
      <a href='#' className={pauseStatusClass} onClick={this.pauseClick}>G</a>
      <Link to='/' className='close'  onClick={this.closeClick}>X</Link>
    </div>
  }
}

export default SystemMenu;
