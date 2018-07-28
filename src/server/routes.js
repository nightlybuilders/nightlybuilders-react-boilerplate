import { resolve } from 'path'
import * as handler from './handler'

export const setupRoutes = server => {
  // monitoring route
  server.route({
    method: 'GET',
    path: '/probe_status',
    handler() {
      return 'OK'
    },
  })

  // serves static files from <rootDir>/dist/static
  server.route({
    method: 'GET',
    path: '/static/{version}/{params*}', // version is used as a CACHEBUSTER
    handler: {
      directory: {
        path: resolve(__dirname, '..', '..', 'dist', 'static'),
      },
    },
  })

  // route every other request to the handleRender
  server.route({
    method: 'GET',
    path: '/{url*}',
    handler() {
      return handler.handleRender()
    },
  })
}
