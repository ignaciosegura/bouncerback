/* global require */
// Dummy element. We need something we can click during development


import React from 'react';

class Dummy extends React.Component {
  clickedMe(e) {
    console.log("you clicked me, motherfucker");
  }

  render() {
    return <div onClick={this.clickedMe} className="dummy">Click me, motherfucker!</div>
  }
}

export default Dummy;
