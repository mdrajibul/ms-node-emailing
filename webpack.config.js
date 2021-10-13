const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      },
      {
        test: /\.(html)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'views'
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/views/index.html', to: 'views/' },
        { from: './assets/**/*', to: '' }
      ]
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
