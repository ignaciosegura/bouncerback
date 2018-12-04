// System menu

import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import SystemShop from './stores/systemshop.js';
import GameService from './services/gameservice.js';

@inject('TimeShop', 'SystemShop') @observer
class SystemMenu extends React.Component {
  constructor(props) {
    super(props);

    this.soundClick = this.soundClick.bind(this);
    this.pauseClick = this.pauseClick.bind(this);
    this.closeClick = this.closeClick.bind(this);
  }
  soundClick(e) {
    this.stopDefaultActions(e);
    SystemShop.toggleAllSound();
  }

  pauseClick(e) {
    this.stopDefaultActions(e);
    GameService.toggleGame();
  }
  closeClick(e) {
    this.stopDefaultActions(e);
    GameService.goToMainMenu();
  }

  stopDefaultActions(e) {
    e.preventDefault();
    e.stopPropagation();
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
      <Link to='/main-menu' className='close' onClick={this.closeClick}>X</Link>
    </div>
  }
}

export default SystemMenu;
