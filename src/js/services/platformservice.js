// Specifics for different platforms

class PlatformService {
  static isPhonegap() {
    return (typeof window.cordova == 'object');
  }

  static isAndroid() {
    return (this.isPhonegap() && window.cordova.platformId === 'android');
  }

  static adaptPathToDevices(path) {
    let newPath = path;
    if (this.isAndroid())
      newPath = '/android_asset/www/' + path;
    else
      newPath = '/' + path;

    return newPath;
  }
}

export default PlatformService;
