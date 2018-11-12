/*global require*/

require('../sass/index.scss'); // Required by Webpack to read SASS folder and generate a CSS file
require('../.htaccess');

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
export const history = createBrowserHistory();

import MainTitle from './routes/maintitle.js';
import LevelMenu from './routes/levelmenu.js';
import GameSurface from './routes/gamesurface.js';
import GameOver from './routes/gameover.js';
import GameBeaten from './routes/gamebeaten.js';

import PhoneGapService from './services/phonegapservice.js';
import BackgroundService from './services/backgroundservice.js';
import GameService from './services/gameservice.js';
import GameShop from './stores/gameshop.js';
import SystemShop from './stores/systemshop.js';
import TimeShop from './stores/timeshop.js';

import { Provider } from 'mobx-react';

class Index extends React.Component {
  constructor(props) {
    super(props);
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });
    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, false);

    history.listen((location, action) => {
      BackgroundService.renderProperState();
    });

    window.onpopstate = function () {
      GameService.stopTheGame();
    };

    PhoneGapService.setupPhoneGapListeners();
  }

  preventDefault(e) {
    e.preventDefault();
  }

  render() {
    return <div id="container" onTouchMove={this.preventDefault}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={MainTitle} />
          <Route exact path="/tutorial" render={() => <GameSurface gameType='tutorial' level={0} />} />
          <Route exact path="/level-list" component={LevelMenu} />
          <Route exact path="/game" render={(props) => <GameSurface gameType='game' {...props} />} />
          <Route exact path="/game-over" component={GameOver} />
          <Route exact path="/game-beaten" component={GameBeaten} />
          <Route path="*" component={MainTitle} />} />
        </Switch>
      </Router>
    </div>
  }
}

ReactDOM.render(
  <Provider GameShop={GameShop} SystemShop={SystemShop} TimeShop={TimeShop}><Index /></Provider>,
  document.getElementsByTagName('body')[0]
);
