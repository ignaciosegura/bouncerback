// System menu

require('../sass/_systemmenu.scss');

import React from 'react';
import {Link} from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import SystemShop from './stores/systemshop.js';
import ClockService from './services/clockservice.js';


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

  render() {
    let soundStatusClass = (this.props.SystemShop.sound.muted)
      ? 'muted'
      : 'sound';
    let pauseStatusClass = (this.props.TimeShop.clock === 'on')
      ? 'playing'
      : 'paused';

    return <div id='system-menu'>
      <a href='#' className={soundStatusClass} onClick={this.soundClick}></a>
      <a href='#' className={pauseStatusClass} onClick={this.pauseClick}></a>
      <Link to='/' className='close'></Link>
    </div>
  }
}

export default SystemMenu;
