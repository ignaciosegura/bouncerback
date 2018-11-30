// This dummy interaction is required by Chrome to enable Audio.
// Chrome requires the user to interact with the website before letting any audio to be played.
// In order to start the Main Screen soundtrack, we need this.

export default class DummyInteractionService {
  static makeDummyInteraction() {
    let body = document.getElementsByTagName('body')[0];
    let dummyID = 'dummy-interaction';
    let dummyElement = '<button type="button" id="' + dummyID + '"  />';

    body.insertAdjacentHTML('beforeend', dummyElement);

    document.getElementById(dummyID).click();
  }
}
