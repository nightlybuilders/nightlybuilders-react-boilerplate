// babel-register: enables server files to use modern ecmascript
require('babel-register')({
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    'stage-2',
    'react',
  ],
})

require('./server')
