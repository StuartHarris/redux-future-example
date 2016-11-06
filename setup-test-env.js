global.document = require('jsdom').jsdom('<body></body>'); // eslint-disable-line

global.window = document.defaultView;
global.navigator = window.navigator;
