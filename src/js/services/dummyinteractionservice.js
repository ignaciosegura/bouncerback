// This dummy interaction is required by Chrome to enable Audio.
// Chrome requires the user to interact with the website before letting any audio to be played.
// In order to start the Main Screen soundtrack, we need this.

/* global require */

import PlatformService from './platformservice.js';

export default class DummyInteractionService {
  static makeDummyInteraction() {
    if (PlatformService.isPhonegap())
      return;

    let body = document.getElementsByTagName('body')[0];
    let silenceRes = require('../../sound/silence.mp3');
    let dummyID = 'dummy-interaction';
    let silencePath = PlatformService.adaptPathToDevices(silenceRes);
    let dummyElement = `<iframe id="${dummyID}" src="${silencePath}" allow="autoplay" id="audio" style="display:none"></iframe>`;

    body.insertAdjacentHTML('beforeend', dummyElement);
  }
}
