const path = require('path');
const shell = require('shelljs');
const watch = require('node-watch');

const arguments = process.env;

const miniRootPath = './packages/form-render-next/src/platform/mini';

const alipayWidgetsPath = path.join(miniRootPath, './alipay/widgets');
const alipayMiniProgramPath = path.join(miniRootPath, '../../scripts/mini-program-template');
const wxWidgetsTemporaryPath = path.join('./wx', miniRootPath, './alipay/widgets');
const wxWidgetsPath = path.join(miniRootPath, './wx/widgets');

const needRemoveFileOrDirection = [
  'wx',
  'pages',
  'app.js',
  'app.acss',
  'app.json',
  'dslplus.config.js',
  'mini.project.json'
];

if (!arguments.TRANSFORM_MODE) {
  transform();
}

if (arguments.TRANSFORM_MODE === 'watch') {
  const watcher = watch(alipayWidgetsPath, {
    recursive: true
  });

  watcher.on('change', (event, name) => {
    console.log(`you ${event} file ${name}`);
    transform();
  });
}

function transform() {
  shell.cp('-r', `${alipayMiniProgramPath}/*`, '.');
  shell.exec('npx dslplus mtw');
  shell.cp('-R', wxWidgetsTemporaryPath, wxWidgetsPath);
  needRemoveFileOrDirection.forEach((item) => {
    shell.rm('-rf', item);
  });
}