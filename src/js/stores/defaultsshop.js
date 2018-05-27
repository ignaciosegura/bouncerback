// Store saving dafault values

import { observable, computed } from 'mobx';

class Default {
  text = {
    timeForRemoval: 5000,
    readingTime: 3500,
  }
}

const DefaultsShop = new Default();

export default DefaultsShop;
