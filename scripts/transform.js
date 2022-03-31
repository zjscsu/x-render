const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const watch = require('node-watch');

const args = process.env;
const target = args.target || 'wx';
const targetModules = args.targetModules || 'npm_modules';

// 基础路径
const rootScriptsPath = path.resolve(__dirname, '../scripts');
const rootPackageJsonPath = path.resolve(__dirname, '../package.json');
const rootNodeModulesPath = path.resolve(__dirname, '../node_modules');
const formRenderNextPath = path.resolve(
  __dirname,
  '../packages/form-render-next'
);
const alipayMiniProgramPath = path.resolve(
  __dirname,
  '..',
  './.mini-program-template'
);
const alipayMiniProgramNodeModulesPath = path.resolve(
  alipayMiniProgramPath,
  'node_modules'
);
const commonLibPath = path.resolve(formRenderNextPath, './lib');
const commonEsPath = path.resolve(formRenderNextPath, './es');
const miniPatchPath = path.resolve(
  formRenderNextPath,
  './src/platform/mini/patch'
);
const commonLibMiniPath = path.resolve(
  formRenderNextPath,
  './lib/platform/mini'
);
const commonEsMiniPath = path.resolve(formRenderNextPath, './es/platform/mini');
const alipayRenderPath = path.resolve(
  formRenderNextPath,
  './src/platform/mini/alipay/render'
);
const alipayWidgetsPath = path.resolve(
  formRenderNextPath,
  './src/platform/mini/alipay/widgets'
);
const miniProjectJsonBasePath = path.resolve(
  alipayMiniProgramPath,
  'mini.project.json'
);
const dslPlugConfigBasePath = path.resolve(
  alipayMiniProgramPath,
  'dslplus.config.js'
);
const appJsonBasePath = path.resolve(alipayMiniProgramPath, 'app.json');
const appJsBasePath = path.resolve(alipayMiniProgramPath, 'app.js');
const pagesBasePath = path.resolve(alipayMiniProgramPath, 'pages');
const pagesIndexJsPath = path.resolve(alipayMiniProgramPath, 'pages/index.js');
const pagesIndexJsonPath = path.resolve(
  alipayMiniProgramPath,
  'pages/index.json'
);
const pagesIndexAxmlPath = path.resolve(
  alipayMiniProgramPath,
  'pages/index.axml'
);
const miniComponentsPath = path.resolve(alipayMiniProgramPath, './components');

// 平台相关路径
const platformNpmModulesLibPath = path.resolve(
  formRenderNextPath,
  `./lib/platform/mini/${target}/${targetModules}`
);
const platformWidgetsLibPath = path.resolve(
  formRenderNextPath,
  `./lib/platform/mini/${target}/widgets`
);
const platformNpmModulesESPath = path.resolve(
  formRenderNextPath,
  `./es/platform/mini/${target}/${targetModules}`
);
const platformWidgetsEsPath = path.resolve(
  formRenderNextPath,
  `./es/platform/mini/${target}/widgets`
);

async function generateMiniProjectTemplates(widgets = []) {
  let usingComponents = ``;
  let usingWidgets = ``;

  widgets.forEach((widget, key, source) => {
    const isLast = key === source.length - 1;
    usingComponents += `
      "${widget}": "../components/${widget}/index"${isLast ? '' : ','}
    `;

    usingWidgets += `
      <${widget}>
    `;
  });

  return Promise.all([
    fs.writeFile(
      miniProjectJsonBasePath,
      `
      {
        "enableAppxNg": true,
        "enableNodeModuleBabelTransform": true
      }
    `
    ),

    fs.writeFile(
      dslPlugConfigBasePath,
      `
      const path = require('path');

      module.exports = {
        // 支付宝小程序 mini.project.json 所在目录
        root: path.resolve('./'),
        output: {
          // 输出目录
          dirname: path.resolve('${alipayMiniProgramPath}', './__${target}__'),
        },
        compiler: {
          javascript: {
            babel: {
              plugins: [
                [
                  '@ali/dslplus-mini-runtime-api/lib/babel',
                  {
                    from: 'my',
                    to: '${target}',
                    wrapIf: true
                  }
                ]
              ]
            },
          }
        },
      };
    `
    ),

    fs.writeFile(
      appJsonBasePath,
      `
    {
      "pages": [
        "pages/index"
      ]
    }  
  `
    ),

    fs.writeFile(
      appJsBasePath,
      `
    App({});
  `
    ),

    fs.writeFile(
      pagesIndexJsPath,
      `
    Page({});
  `
    ),

    fs.writeFile(
      pagesIndexJsonPath,
      `
    {
      "usingComponents": {
        ${usingComponents}
      }
    }
  `
    ),

    fs.writeFile(
      pagesIndexAxmlPath,
      `
    ${usingWidgets}
  `
    ),
  ]);
}

async function generateTemplates() {
  /**
   * @description: 在根目录创建components文件夹并复制支付宝组件到里面
   */
  shell.mkdir('-p', miniComponentsPath);
  shell.cp('-r', `${alipayRenderPath}`, miniComponentsPath);
  shell.cp('-r', `${alipayWidgetsPath}/*`, miniComponentsPath);
  shell.cp('-r', rootPackageJsonPath, alipayMiniProgramPath);
  await fs.mkdirp(pagesBasePath);
  const widgets = await fs.readdir(miniComponentsPath);
  await generateMiniProjectTemplates(widgets);
}

async function clearTemplates() {
  await fs.remove(alipayMiniProgramPath);
}

async function createModulesSymLink() {
  try {
    await fs.symlink(rootNodeModulesPath, alipayMiniProgramNodeModulesPath);
  } catch (e) {}
}

function runDslPlus() {
  /**
   * @description: 调用dslplus转化wx组件的命令
   */
  shell.exec(`cd ${alipayMiniProgramPath} && dslplus mtw`);
}

function copyDestDirs() {
  /**
   * @description: 转换完成后在对应位置将${targetModules}下相应文件放到lib和es包里
   */
  shell.exec(`mkdir -p ${platformNpmModulesLibPath}`);
  shell.exec(`mkdir -p ${platformNpmModulesESPath}`);
  shell.exec(`mkdir -p ${platformWidgetsLibPath}`);
  shell.exec(`mkdir -p ${platformWidgetsEsPath}`);
  shell.exec(
    `cd ${alipayMiniProgramPath}  && cp -r __${target}__/${targetModules}/ ${platformNpmModulesLibPath}`
  );
  shell.exec(
    `cd ${alipayMiniProgramPath}  && cp -r __${target}__/${targetModules}/ ${platformNpmModulesESPath}`
  );
  shell.exec(
    `cd ${alipayMiniProgramPath}  && cp -r __${target}__/components/ ${platformWidgetsLibPath}`
  );
  shell.exec(
    `cd ${alipayMiniProgramPath}  && cp -r __${target}__/components/ ${platformWidgetsEsPath}`
  );
  // 为编译方便将 render 作为组件引入，编译阶段会放到 widgets 目录，故删除
  shell.exec(`cd ${platformWidgetsLibPath}  && rm -rf render/`);
  shell.exec(`cd ${platformWidgetsEsPath}  && rm -rf render/`);
  // 删除打包阶段引入到 lib 和 es 目录的 patch 目录
  shell.exec(`cd ${commonLibMiniPath}  && rm -rf patch/`);
  shell.exec(`cd ${commonEsMiniPath}  && rm -rf patch/`);
}

async function copyPatchDirs() {
  const dirs = await fs.readdir(miniPatchPath);
  dirs.forEach(dir => {
    const p = path.resolve(miniPatchPath, dir);
    shell.exec(`cd ${miniPatchPath}  && cp -r ${dir} ${commonLibMiniPath}`);
    shell.exec(`cd ${miniPatchPath}  && cp -r ${dir} ${commonEsMiniPath}`);
  });
}

// 执行转换前的清理操作
function beforeTransform() {
  shell.exec(`rm -rf ${alipayMiniProgramPath}`);
  shell.exec(`rm -rf ${commonLibPath}`);
  shell.exec(`rm -rf ${commonEsPath}`);
}

function runBuild() {
  shell.exec(`cd ${rootScriptsPath} && node ./build-next.js`);
}

async function transform() {
  // 转换前清理目录
  beforeTransform();
  // 进行初始化构建
  runBuild();
  // 生成初始化小程序模板
  await generateTemplates();
  // 创建 node_modules 软链
  await createModulesSymLink();
  // 执行 DSL+ 编译
  runDslPlus();
  // 拷贝 DSL+ 转换后文件
  copyDestDirs();
  // 拷贝 patch 包
  copyPatchDirs();
  // 清理临时目录
  clearTemplates();
}

if (!args.TRANSFORM_MODE) {
  transform();
}

if (args.TRANSFORM_MODE === 'watch') {
  const watcher = watch(alipayWidgetsPath, {
    recursive: true,
  });

  watcher.on('change', (event, name) => {
    console.log(`you ${event} file ${name}`);
    transform();
  });
}
