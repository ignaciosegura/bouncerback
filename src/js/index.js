/*global require*/

require('../sass/index.scss'); // Required by Webpack to read SASS folder and generate a CSS file

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
export const history = createBrowserHistory();

import MainTitle from './routes/maintitle.js';
import GameSurface from './routes/gamesurface.js';
import Footer from './footer.js';
import GameShop from './stores/gameshop.js';
import DefaultsShop from './stores/defaultsshop.js';

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
  }

  preventDefault(e) {
    e.preventDefault();
  }

  render() {
    return <Router history={history}>
      <div id="container" onTouchMove={this.preventDefault}>
        <Route exact path="/" component={MainTitle} />
        <Route exact path="/tutorial" render={()=><GameSurface gameType='tutorial' level={0} />} />
        <Route exact path="/game" render={()=><GameSurface gameType='game' level={1} />} />
        <Footer />
      </div>
    </Router>
  }
}

ReactDOM.render(
  <Provider GameShop={GameShop} DefaultsShop={DefaultsShop}><Index /></Provider>,
  document.getElementById('content')
);
