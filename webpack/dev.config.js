/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const merge = require('webpack-merge')

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const baseConfig = require('./common.config.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',

  plugins: [new ErrorOverlayPlugin(), new webpack.NamedModulesPlugin()],
})
