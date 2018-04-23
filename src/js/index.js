/*global require*/

require('../sass/index.scss'); // Required by Webpack to read SASS folder and generate a CSS file

import React from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './scoreboard.js';
import Dummy from './dummy.js';
import GameSurface from './gamesurface.js';
import ScoreShop from './stores/scoreshop.js';
import {Provider, inject} from 'mobx-react';

@inject('ScoreShop')
class Index extends React.Component {

  render() {
    return <div id="container">
      <Scoreboard type="bounces" />
      <Scoreboard type="level" />
      <Scoreboard type="times" />
      <GameSurface />
    </div>
  }
}

ReactDOM.render(
  <Provider ScoreShop={ScoreShop}><Index /></Provider>,
  document.getElementById('content')
);
