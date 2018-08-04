import { resolve } from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { BannerPlugin, Configuration } from 'webpack';
import * as NodeExternals from 'webpack-node-externals';

export default ['bin', 'index'].map(name => {
  return {
    entry: {
      [name]: resolve(__dirname, 'src', name),
    },
    externals: [NodeExternals()],
    module: {
      rules: [{ test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' }],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname),
      ...(name === 'index'
        ? { library: 'reexporter', libraryTarget: 'commonjs2' }
        : {}),
    },
    plugins:
      name === 'bin'
        ? [new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })]
        : [],
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },
    target: 'node',
  } as Configuration;
});
