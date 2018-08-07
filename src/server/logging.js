// DOCS: https://github.com/hapijs/good
// Example: https://github.com/hapijs/good#example-usage

require('dotenv').config()

let obsLogger = {}
if (process.env.LOG_OPS === 'TRUE') {
  obsLogger = {
    opsLogger: [
      {
        args: [{ ops: '*' }],
        module: 'good-squeeze',
        name: 'Squeeze',
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson',
      },
      {
        args: ['./logs/hapi/ops.log'],
        module: 'good-file',
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
        args: [{ error: '*', log: '*' }],
        module: 'good-squeeze',
        name: 'Squeeze',
      },
      {
        module: 'good-console',
      },
      'stdout',
    ],
    fileLogger: [
      {
        args: [{ error: '*' }],
        module: 'good-squeeze',
        name: 'Squeeze',
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson',
      },
      {
        args: ['./logs/hapi/error.log'],
        module: 'good-file',
      },
    ],
    ...obsLogger,
  },
}

export const setupLogging = async server => {
  await server.register({
    options,
    plugin: require('good'), // eslint-disable-line global-require
  })
}
