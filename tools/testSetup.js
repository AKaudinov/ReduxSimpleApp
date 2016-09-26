process.env.NODE_ENV = 'test'; //node environment variable to test

/*eslint-disable no-console*/
require('babel-register')(); //babel will transpile all tests

//disable webpack specific features that mocha doesn't understand
require.extensions['.css'] = function() {return null;};
require.extensions['.png'] = function() {return null;};
require.extensions['.jpg'] = function() {return null;};

//set up jsdom will create a virtual in memory dom
//test react components without opening up the browser
//important to have window, navigator, and document when testing with react, since react will look for these properties.
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
   if(typeof global[property] ==='undefined'){
       exposedProperties.push(property);
       global[property] = document.defaultView[property];
   }
});


global.navigator = {
    userAgent: 'node.js'
};

documentRef = document; //eslint-disable-line no-undef