/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const Jarvis = require('webpack-jarvis')

const production = require('./prod.config.js')

module.exports = merge(production, {
  plugins: [
    new Jarvis({
      port: 3333,
      watchOnly: false,
    }),
  ],
})
