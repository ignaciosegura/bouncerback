import React from 'react';
import Lottie from 'react-lottie';

import { observer, inject } from 'mobx-react';

// 2D animation service

@inject('GameShop') @observer
class AfterFXAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.defaultOptions = {
      loop: this.props.loop,
      autoplay: this.props.autoplay,
      animationData: this.props.animationData,
      name: this.props.name,
      renderer: 'canvas',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        className: this.props.name
      },
      size: {
        width: this.props.width,
        height: this.props.height
      },
    };
  }

  render() {
    let shouldWeStopTheAnimation = this.props.GameShop.playing;
    return (
      <Lottie options={this.defaultOptions}
        height={this.defaultOptions.size.height}
        width={this.defaultOptions.size.width}
        isStopped={shouldWeStopTheAnimation}
        isPaused={this.props.isPaused}
        title={this.props.name}
        isClickToPauseDisabled={true}
      />
    );
  }
}

export default AfterFXAnimation;
