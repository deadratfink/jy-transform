module.exports = {
  // this is a workaround that jest does not create a jest_0/ folder in the project root dir!
  cacheDirectory: '/tmp/jest-cache',
  collectCoverageFrom: [
    //'lib/**/*.js',
    'src/**/*.js',
    '!src/cli.js', // TODO: maybe later!
    '!src/debug-log.js', // TODO: maybe later!
    'index.js'
  ],
  coverageDirectory: './coverage/',
  coverageReporters: ['html', 'lcov', 'lcovonly', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  mapCoverage: true,
  testMatch: [
    // '**/test/unit/validation/test-joi-extensions-file-helper.js',
    // '**/test/unit/validation/test-joi-extensions-identifier-helper.js',
    //'**/test/unit/test-transformer.js',
    // '**/test/unit/test-index.js',
    //'**/test/unit/test-reader.js',
    // '**/test/unit/test-writer.js',
     //'**/test/unit/validation/test-options-schema.js',
    '**/test/unit/**/*.js',
//'**/test/unit/validation/test-options-schema-helper.js',

    // '**/test/test-log-wrapper.js',
    // '**/test/unit/test-middleware.js',
    // '**/test/test-index.js',
    //'/*.js!**/test/functional/util/**',
    //'!**/test/*.js',
  ],
  // testRegex: '\\/test\\/unit\\/.*|\/\\.js?$/',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    // '<rootDir>/test/data/.*',
    // '<rootDir>/test/tmp/.*',
    // '<rootDir>/test/logger.js',
  ],
  verbose: true,
};
