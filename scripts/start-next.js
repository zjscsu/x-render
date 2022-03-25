const path = require('path');
const fork = require('./fork');

const frRoot = path.resolve(__dirname, '../packages/form-render-next');
fork(`cd ${frRoot} && NODE_ENV=development father-build --watch --colors`);
