import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import baseConfig from './.umirc.base';

export default defineConfig({
  ...baseConfig,
  chainWebpack(config, { webpack }) {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin);
  },
  // more config: https://d.umijs.org/config
});
