/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const SRC_DIR = path.resolve(__dirname, '..', 'src')
const BUILD_DIR = path.resolve(__dirname, '..', 'dist')

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
})

const bundle = name => ({
  [`${name}.bundled.js`]: [
    'babel-polyfill',
    path.resolve(__dirname, '..', 'src', 'client', `${name}.js`),
  ],
})

const styles = name => ({
  [`${name}.styles`]: [path.resolve(__dirname, '..', 'src', 'client', 'styles', `${name}.scss`)],
})

module.exports = {
  entry: {
    ...bundle('index'),
    ...styles('main'),
  },

  output: {
    filename: '[name]',
    path: path.join(__dirname, '..', 'dist', 'static'),
  },

  resolve: {
    extensions: ['.js', '.css', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production',
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new Dotenv(),
    extractSass,
    new CopyWebpackPlugin(
      [
        {
          context: './src/static',
          from: `${path.resolve(__dirname, '..', 'src', 'static', 'images')}/**/*.+(png|jpg|gif)`,
          to: `${BUILD_DIR}/static/images`,
        },
        {
          context: './src/static',
          from: `${path.resolve(
            __dirname,
            '..',
            'src',
            'static',
            'fonts',
          )}/**/*.+(ttf|otf|eot|svg|woff|woff2)`,
          to: `${BUILD_DIR}/static/fonts`,
        },
      ],
      {
        copyUnmodified: true, // copy w/ every watch
      },
    ),
  ],
}
