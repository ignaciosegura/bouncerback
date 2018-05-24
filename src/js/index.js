/*global require*/

require('../sass/index.scss'); // Required by Webpack to read SASS folder and generate a CSS file

import React from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './scoreboard.js';
import Dummy from './dummy.js';
import GameSurface from './gamesurface.js';
import GameShop from './stores/gameshop.js';
import { Provider, inject } from 'mobx-react';

@inject('GameShop')
class Index extends React.Component {

  render() {
    return <div id="container">
      <Scoreboard type="bounces" />
      <Scoreboard type="level" />
      <GameSurface />
    </div>
  }
}

ReactDOM.render(
  <Provider GameShop={GameShop}><Index /></Provider>,
  document.getElementById('content')
);
