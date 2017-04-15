const browserEnv = require('browser-env');
const hook = require('vue-node');
const Vue = require('vue');
const { join } = require('path');

Vue.config.productionTip = false;
// Setup a fake browser environment
browserEnv();

hook(join(__dirname, './webpack.config.test.js'));
