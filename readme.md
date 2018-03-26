BOUNCEBACK
--------------------------------

Bounceback, a JS game built on React and PhaserJS 3.

This game is built using Nik Nak Studio React + Webpack Starter Kit as starting point.
https://github.com/ignaciosegura/niknak_react_webpack


THINGS IT DOES

* Includes React.
* Transpiles JS ES6 and JSX.
* Processes Compass SASS.
* Process SVG images. It includes it as base64 CSS if smaller than 10.000 bytes.
* Process fonts. It includes it as base64 CSS if smaller than 100.000 bytes.
* It creates source maps.
* Includes .htaccess file on both /dev and /prod folder to map all requests to index.html.
* Creates and adds META code for many different versions of favicon using a favicon PNG image in /src/img as reference.

REQUIRES

Node.js should be installed in your system.

ENVIRONMENTS

By default, this kit compiles to /dev folder as debugger friendly code.

There's also an option to compile for production ready in /prod folder.

INSTALL

npm install

RUN WEBPACK

In watch mode: npm run watch-development

Building for development (/dev folder): npm run build-development

Build for production (/prod folder): npm run build-production

UPDATING THIS KIT
This kit is updated using NPM Check Updates. Use with caution, as updating too much stuff at once tends to break things.

ncu -> show dependencies

ncu -u -> update and update package.json

https://www.npmjs.com/package/npm-check-updates
