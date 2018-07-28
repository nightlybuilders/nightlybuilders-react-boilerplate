module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  setupTestFrameworkScriptFile: '<rootDir>/jest/jest.setup.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'https://example.com',
}
