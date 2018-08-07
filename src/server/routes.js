/**
 * server/routes.js: is responsible for handling and creating the routes of the
 * hapijs node-server. They are not necessarely matching the routes in common/routes
 */
import { resolve } from 'path'

import { handleRender } from './handler'

export const setupRoutes = server => {
  // monitoring route
  server.route({
    handler() {
      return 'OK'
    },
    method: 'GET',
    path: '/probe_status',
  })

  // NOTE:
  // - this route is basic auth protected, see security.js
  // - one could also implement a service-status page, eg: https://github.com/opentable/hapi-service-status/blob/master/lib/service.js
  if (process.env.BASIC_USER && process.env.BASIC_PW) {
    server.route({
      handler: {
        file: resolve(__dirname, '..', '..', 'logs', 'hapi', 'ops.log'),
      },
      method: 'GET',
      options: {
        auth: 'simple',
      },
      path: '/svc_status',
    })
  }

  // serves static files from <rootDir>/dist/static
  server.route({
    handler: {
      directory: {
        path: resolve(__dirname, '..', '..', 'dist', 'static'),
      },
    },
    method: 'GET',
    options: {
      cache: {
        expiresIn: (process.env.STATIC_CACHE_EXPIRATION_TIME || 60 * 10) * 1000, // in seconds
        privacy: process.env.STATIC_CACHE_PRIVACY || 'private',
      },
    },
    path: '/__static__/{version}/{params*}', // version is used as a CACHEBUSTER
  })

  // route every other request to the handleRender
  server.route({
    handler: async (req, res) => handleRender(req, res),
    method: 'GET',
    path: '/{url*}',
  })
}
