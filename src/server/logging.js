// DOCS: https://github.com/hapijs/good
// Example: https://github.com/hapijs/good#example-usage

require('dotenv').config()

let obsLogger = {}
if (process.env.LOG_OPS === 'TRUE') {
  obsLogger = {
    opsLogger: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*' }],
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson',
      },
      {
        module: 'good-file',
        args: ['./logs/hapi/ops.log'],
      },
    ],
  }
}

export const options = {
  // constantly report the ops status
  ops: {
    interval: 6 * 10 * 1000, // every minute
  },
  reporters: {
    consoleLogger: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', error: '*' }],
      },
      {
        module: 'good-console',
      },
      'stdout',
    ],
    fileLogger: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ error: '*' }],
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson',
      },
      {
        module: 'good-file',
        args: ['./logs/hapi/error.log'],
      },
    ],
    ...obsLogger,
  },
}

export const setupLogging = async server => {
  await server.register({
    plugin: require('good'), // eslint-disable-line global-require
    options,
  })
}
