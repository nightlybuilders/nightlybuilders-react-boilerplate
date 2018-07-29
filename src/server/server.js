// server imports
import Hapi from 'hapi'
import inert from 'inert'

import { setupLogging } from './logging'
import { setupRoutes } from './routes'
import { setupSecurity } from './security'

require('dotenv').config()

// create and start the server
const createAndStartServer = async () => {
  try {
    // Create a server with a host and port
    const server = Hapi.server({
      host: process.env.HOST,
      port: process.env.PORT || 8000,
    })

    // register middlewares
    await server.register(inert)
    await setupLogging(server)
    await setupSecurity(server)

    // register routes
    setupRoutes(server)

    await server.start()
    console.log('Server running at:', server.info.uri) // eslint-disable-line
  } catch (err) {
    console.error(err) // eslint-disable-line
    process.exit(1)
  }
}

createAndStartServer()
