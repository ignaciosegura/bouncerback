/*global require*/
// Scoreboard element. Used for both bounces and level.

require('../sass/_scoreboard.scss');

import React from 'react';
import {observer} from 'mobx-react';

@observer
class Scoreboard extends React.Component {
  
  render() {
    return <div className={`scoreboard ${this.props.type}`}>
      14 {this.props.type}
    </div>
  }
}

export default Scoreboard;
