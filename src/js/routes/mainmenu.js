// Screen menu

import React from 'react';
import { Link } from 'react-router-dom';

import GameShop from '../stores/gameshop.js';

class MainMenu extends React.Component {
  componentWillUnmount() {
    GameShop.resetScore();
  }
  render() {
    return <div className="main-menu">
      <Link to="/level-list" className="text ready">New Game</Link>
      <Link to="/tutorial" className="text ready">Tutorial</Link>
    </div>
  }
}

export default MainMenu;
