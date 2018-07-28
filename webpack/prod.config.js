/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')

// PROD Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const common = require('./common.config.js')

module.exports = merge(common, {
  mode: 'production',

  // one could also optimise/try these
  // - https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points
  // - https://github.com/jantimon/html-webpack-plugin/issues/218
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_console: true,
            dead_code: true,
          },
          output: {
            beautify: false,
            comments: false,
          },
        },
      }),
    ],
  },
})
