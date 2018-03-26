/*global require*/

require('../sass/index.scss'); // Required by Webpack to read SASS folder and generate a CSS file

import React from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './scoreboard.js';
import Dummy from './dummy.js';

class Index extends React.Component {

  render() {
    return <div id="container">
      <Scoreboard type="bounces" />
      <Scoreboard type="level" />
      <Dummy />
    </div>
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('content')
);
