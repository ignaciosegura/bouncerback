/* global require */

var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
  user: "bouncerback@niknak.es", // optional, prompted if none given. Password is 101.
  host: "bouncerback.niknak.es",
  port: 21,
  localRoot: __dirname + '/prod',
  remoteRoot: '/',
  include: ['*', '**/*'],      // this would upload everything except dot files
  // include: ['*.php', 'dist/*'],
  exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps
  deleteRoot: true                // delete existing files at destination before uploading
}

// use with promises
ftpDeploy.deploy(config)
  .then(res => console.log('finished'))
  .catch(err => console.log(err))


