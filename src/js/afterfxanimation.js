import React from 'react';
import PlatformService from './services/platformservice.js';
import Lottie from 'react-lottie';

// 2D animation service

class AfterFXAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.defaultOptions = {
      loop: this.props.loop,
      autoplay: this.props.autoplay, 
      animationData: this.props.animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      },
      size: {
        width: this.props.width,
        height: this.props.height
      },
      isStopped: false,
      isPaused: false
    };
  }

  render () {
    return (
      <Lottie options={this.defaultOptions}
        height={this.defaultOptions.size.height}
        width={this.defaultOptions.size.width}
        isStopped={this.defaultOptions.isStopped}
        isPaused={this.defaultOptions.isPaused} 
        title={this.props.title} />
    );
  }
}

export default AfterFXAnimation;
