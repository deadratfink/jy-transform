module.exports = {
  // this is a workaround that jest does not create a jest_0/ folder in the project root dir!
  cacheDirectory: '/tmp/jest-cache',
  collectCoverageFrom: [
    'lib/**/*.js',
    'src/**/*.js',
    'index.js'
  ],
  coverageDirectory: './coverage/',
  coverageReporters:  ['html', 'lcov', 'lcovonly', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  mapCoverage: true,
  // testMatch: [
  //   // '**/test/**/*.js!**/test/functional/util/**',
  //   '**/test/unit/*.js',
  //   // '**/test/test-log-wrapper.js',
  //   // '**/test/test-middleware.js',
  //   // '**/test/test-index.js',
  //   //'/*.js!**/test/functional/util/**',
  //   // '!**/test/*.js',
  // ],
  testRegex: '\\/test\\/unit\\/.*|\/\\.js?$/',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    // '<rootDir>/test/data/.*',
    // '<rootDir>/test/tmp/.*',
    // '<rootDir>/test/logger.js',
  ],
  verbose: true,
};
