// Atom counter React component

import React from 'react';
import { observer, inject } from 'mobx-react';

import GameShop from './stores/gameshop.js';

@inject('GameShop') @observer
class LivesCounter extends React.Component {
  constructor(props) {
    super(props);
    this.lives = this.props.GameShop.lives;
  }

  renderList() {
    let rendered = [...Array(this.props.GameShop.lives)];
    return rendered.map((life, index) => <li key={index}></li>);
  }

  componentDidUpdate() {
    this.lives = this.props.GameShop.lives;
  }

  render() {
    let livesRendered = this.renderList();
    let dyingLife = (this.lives > this.props.GameShop.lives)
      ? <li key={this.props.GameShop.lives} className='dying'></li>
      : '';

    return <ul id="lives-counter">{livesRendered}{dyingLife}</ul>
  }
}

export default LivesCounter;
