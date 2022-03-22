const watch = require('node-watch');
const path = require('path');
const shell = require('shelljs');

const watchPath = path.join(__dirname, '../platform/mini/widgets');

const watcher = watch(watchPath, {
  recursive: true
});

watcher.on('change', (event, name) => {
  console.log('===',path.join(watchPath, '../demo'))
  shell.cd(path.join(watchPath, '../demo'));
  shell.exec('npx dslplus mtw');
});

watcher.on('error', (event, name) => {

});

watcher.on('ready', (event, name) => {

});
