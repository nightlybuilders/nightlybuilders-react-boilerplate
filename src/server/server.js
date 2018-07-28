// server imports
import Hapi from 'hapi'
import inert from 'inert'

import { setupRoutes } from './routes'

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

    // register routes
    setupRoutes(server)

    await server.start()
    console.log('Server running at:', server.info.uri) // eslint-disable-line
  } catch (err) {
    console.log(err) // eslint-disable-line
    process.exit(1)
  }
}

createAndStartServer()
