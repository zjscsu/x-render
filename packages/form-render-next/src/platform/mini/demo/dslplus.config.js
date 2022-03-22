const path = require('path');

module.exports = {
  // 支付宝小程序 mini.project.json 所在目录
  root: path.resolve('./'),
  output: {
    // 输出目录
    dirname: path.resolve('./__mtw_next__'),
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