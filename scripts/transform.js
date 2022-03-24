const path = require('path');
const shell = require('shelljs');
const watch = require('node-watch');

const args = process.env;

const formRenderNextPath = './packages/form-render-next';

const alipayWidgetsPath = path.join(formRenderNextPath, './src/platform/mini/alipay/widgets');
const alipayMiniProgramPath = path.join(formRenderNextPath, './scripts/mini-program-template');

const wxNpmModulesLibPath = path.join(formRenderNextPath, './lib/platform/mini/wx/npm_modules');
const wxWidgetsLibPath = path.join(formRenderNextPath, './lib/platform/mini/wx/widgets');
const wxNpmModulesESPath = path.join(formRenderNextPath, './es/platform/mini/wx/npm_modules');
const wxWidgetsEsPath = path.join(formRenderNextPath, './es/platform/mini/wx/widgets');

const needRemoveFileOrDirection = [
  'pages',
  'components',
  'app.js',
  'app.acss',
  'app.json',
  'dslplus.config.js',
  'mini.project.json'
];

if (!args.TRANSFORM_MODE) {
  transform();
}

if (args.TRANSFORM_MODE === 'watch') {
  const watcher = watch(alipayWidgetsPath, {
    recursive: true
  });

  watcher.on('change', (event, name) => {
    console.log(`you ${event} file ${name}`);
    transform();
  });
}

function transform() {
  /** 
   * @description: 复制支付宝小程序模板到根目录
   */
  shell.cp('-r', `${alipayMiniProgramPath}/*`, '.');

  /** 
   * @description: 在根目录创建components文件夹并复制支付宝组件到里面
   */
  shell.mkdir('-p', './components');
  shell.cp('-r', `${alipayWidgetsPath}/*`, './components');

  /** 
   * @description: 调用dslplus转化wx组件的命令
   */
  shell.exec('npx dslplus mtw');

  /** 
   * @description: 转换完成后在对应位置将npm_modules下相应文件放到lib和es包里
   */
  shell.mkdir('-p', wxNpmModulesLibPath);
  shell.cp('-r', './__wx__/npm_modules/antd-mini', `${wxNpmModulesLibPath}`);
  shell.cp('-r', './__wx__/npm_modules/@ali', `${wxNpmModulesLibPath}`);
  shell.mkdir('-p', `${wxNpmModulesESPath}/antd-mini`);
  shell.cp('-r', './__wx__/npm_modules/antd-mini', wxNpmModulesESPath);
  shell.cp('-r', './__wx__/npm_modules/@ali', wxNpmModulesESPath);

  /** 
   * @description: 将生成组件放到lib和es包里
   */
  shell.mkdir('-p', wxWidgetsLibPath);
  shell.cp('-r', './__wx__/components/*', wxWidgetsLibPath);
  shell.mkdir('-p', wxWidgetsEsPath);
  shell.cp('-r', './__wx__/components/*', wxWidgetsEsPath);


  needRemoveFileOrDirection.forEach((item) => {
    shell.rm('-rf', item);
  });
}
