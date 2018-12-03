// After FX animation service controlled by Lottie

import lottie from 'lottie-web';

class AfterFXAnimationController {
  play(name) {
    lottie.play();
  }

  stop(name) {
    lottie.stop(name);
  }

  pause(name) {
    lottie.pause(name);
  }
}

const AfterFXAnimationService = new AfterFXAnimationController();

export default AfterFXAnimationService;
