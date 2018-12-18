/**
 * Inspired by (Credits):
 * - https://github.com/storybooks/storybook/issues/208#issuecomment-306953718
 *
 * Other links
 * - https://github.com/storybooks/storybook/issues/1685#issuecomment-336811882
 * - https://github.com/storybooks/storybook/issues/714#issuecomment-302996551
 * - https://github.com/storybooks/storybook/pull/435#issuecomment-264813688
 */
/* eslint-disable import/no-extraneous-dependencies */
const proxy = require('http-proxy-middleware')

require('dotenv').config()

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8000

// proxy static request to our Node.js server
module.exports = function expressMiddleware(router) {
  router.use(
    '/__static__',
    proxy({
      changeOrigin: true,
      target: `http://${host}:${port}/`,
    }),
  )
}
