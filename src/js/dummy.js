/* global require */
// Dummy element. We need something we can click during development


import React from 'react';
import { inject } from 'mobx-react';

@inject('GameShop')
class Dummy extends React.Component {

  clickedMe = (e) => {
    this.props.GameShop.addBounce();
  }

  render() {
    return <div onClick={this.clickedMe} className="dummy">Click me, motherfucker!</div>
  }
}

export default Dummy;
