/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const merge = require('webpack-merge')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const baseConfig = require('./common.config.js')

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  mode: 'development',
  plugins: [new ErrorOverlayPlugin(), new webpack.NamedModulesPlugin()],
})
