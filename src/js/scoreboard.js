/*global require*/
// Scoreboard element. Used for both bounces and level.

require('../sass/_scoreboard.scss');

import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('GameShop') @observer
class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let score = this.props.GameShop[this.props.type];
    return <div className={`scoreboard ${this.props.type}`}>
      <div className="label">{this.props.type}</div>
      <div className="value">{score}</div>
    </div>
  }
}

export default Scoreboard;
