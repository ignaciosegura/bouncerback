/*global require*/

require('../sass/index.scss'); // Required by Webpack to read SASS folder and generate a CSS file

import React from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './scoreboard.js';
import MainTitle from './routes/maintitle.js';
import GameSurface from './gamesurface.js';
import Footer from './footer.js';
import GameShop from './stores/gameshop.js';
import DefaultsShop from './stores/defaultsshop.js';
import { Provider, inject } from 'mobx-react';

class Index extends React.Component {

  render() {
    return <div id="container">
      <Scoreboard type="bounces" />
      <Scoreboard type="level" />
      <MainTitle />
      <GameSurface />
      <Footer />
    </div>
  }
}

ReactDOM.render(
  <Provider GameShop={GameShop} DefaultsShop={DefaultsShop}><Index /></Provider>,
  document.getElementById('content')
);
