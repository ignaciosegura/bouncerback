// Chrono component

import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('TimeShop') @observer
class Chrono extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let time = this.props.TimeShop;
    let duration = time.levelDuration * time.framesPerTime;
    let timeLeft = duration - time.tick;
    let renderedTime = timeLeft > 0
      ? Math.ceil(timeLeft)
      : 0;

    return <div className="scoreboard chrono">
      <div className="label">Time</div>
      <div className="value">{renderedTime}</div>
    </div>
  }
}

export default Chrono;
