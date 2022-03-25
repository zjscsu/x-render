const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const watch = require('node-watch');

const args = process.env;

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
const alipayWidgetsPath = path.resolve(
  formRenderNextPath,
  './src/platform/mini/alipay/widgets'
);
const wxNpmModulesLibPath = path.resolve(
  formRenderNextPath,
  './lib/platform/mini/wx'
);
const wxWidgetsLibPath = path.resolve(
  formRenderNextPath,
  './lib/platform/mini/wx/widgets'
);
const wxNpmModulesESPath = path.resolve(
  formRenderNextPath,
  './es/platform/mini/wx'
);
const wxWidgetsEsPath = path.resolve(
  formRenderNextPath,
  './es/platform/mini/wx/widgets'
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
          dirname: path.resolve('${alipayMiniProgramPath}', './__wx__'),
        },
        compiler: {
          // markup: {
          //   plugins: [
          //     [
          //       '@ali/dslplus-mini-plugin-target-component',
          //       {
          //         sourcePath: '/components/pre-plugins',
          //         targetPath: '/components/my-plugins',
          //         targetTag: 'my-plugins',
          //         include: () => {
                    
          //         }
          //         // 这个插件有一丢丢慢，所以限定开启的文件
          //       },
          //       // 标记此实例的唯一 ID
          //       // 未来可按这样子复用目标自定义组件替换机制
          //       'my-plugins'
          //     ]
          //   ]
          // },
          javascript: {
            babel: {
              plugins: [
                [
                  '@ali/dslplus-mini-runtime-api/lib/babel',
                  {
                    from: 'my',
                    to: 'wx',
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
  await fs.mkdirp(pagesBasePath);
  const widgets = await fs.readdir(alipayWidgetsPath);
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
   * @description: 在根目录创建components文件夹并复制支付宝组件到里面
   */
  shell.mkdir('-p', miniComponentsPath);
  shell.cp('-r', `${alipayWidgetsPath}/*`, miniComponentsPath);
  shell.cp('-r', rootPackageJsonPath, alipayMiniProgramPath);

  /**
   * @description: 调用dslplus转化wx组件的命令
   */
  shell.exec(`cd ${alipayMiniProgramPath} && npx dslplus mtw`);
}

function copyDestDirs() {
  /**
   * @description: 转换完成后在对应位置将npm_modules下相应文件放到lib和es包里
   */
  shell.exec(`mkdir -p ${wxNpmModulesLibPath}`);
  shell.exec(`mkdir -p ${wxNpmModulesESPath}`);
  shell.exec(`mkdir -p ${wxWidgetsLibPath}`);
  shell.exec(`mkdir -p ${wxWidgetsEsPath}`);
  shell.exec(
    `cd ${alipayMiniProgramPath}  && cp -r __wx__/npm_modules ${wxNpmModulesLibPath}`
  );
  shell.exec(
    `cd ${alipayMiniProgramPath}  && cp -r __wx__/npm_modules ${wxNpmModulesESPath}`
  );
  shell.exec(
    `cd ${alipayMiniProgramPath}  && cp -r __wx__/components ${wxWidgetsLibPath}`
  );
  shell.exec(
    `cd ${alipayMiniProgramPath}  && cp -r __wx__/components ${wxWidgetsEsPath}`
  );
}

function copyPatchDirs() {
  // TODO...
}

async function transform() {
  await generateTemplates();
  await createModulesSymLink();
  runDslPlus();
  copyDestDirs();
  copyPatchDirs();
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
