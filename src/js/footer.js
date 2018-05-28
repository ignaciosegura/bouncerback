/* global require */
// Dummy element. We need something we can click during development

require('../sass/_footer.scss');

import React from 'react';

class Footer extends React.Component {
  render() {
    return <footer><a rel="nofollow" href="http://www.niknak.es">© Nik Nak Studio</a></footer>
  }
}

export default Footer;
