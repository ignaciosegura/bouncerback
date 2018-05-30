/* global require */
// Dummy element. We need something we can click during development

require('../sass/_footer.scss');

import React from 'react';

class Footer extends React.Component {
  render() {
    return <footer><a rel="nofollow" href="http://www.niknak.es" target="_blank">© Nik Nak Studio</a> /&nbsp;
      <a rel="nofollow" href="https://github.com/ignaciosegura/bouncerback" target="_blank">Bouncerback on GitHub</a></footer>
  }
}

export default Footer;
