/*global require*/
// Scoreboard element. Used for both bounces and level.

require('../sass/_scoreboard.scss');

import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('store') @observer
class Scoreboard extends React.Component {
  
  render() {
    let score = this.props.store[this.props.type];
    return <div className={`scoreboard ${this.props.type}`}>
      {score} {this.props.type}
    </div>
  }
}

export default Scoreboard;
