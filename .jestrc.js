module.exports = {
  // this is a workaround that jest does not create a jest_0/ folder in the project root dir!
  cacheDirectory: '/tmp/jest-cache',
  collectCoverageFrom: [
    '!lib/**/*.js',
    'src/**/*.js',
    '!src/cli.js', // TODO: maybe later!
    'index.js',
    'jyt',
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
    // '**/test/unit/test-serialize-utils.js',
    // '**/test/functional/test-jyt-cli.js',
    // '**/test/unit/validation/test-joi-extensions-file-helper.js',
    // '**/test/unit/validation/test-joi-extensions-identifier-helper.js',
    //'**/test/functional/test-transformer.js',
    // '**/test/unit/test-index.js',
    //'**/test/unit/test-reader.js',
    // '**/test/unit/test-writer.js',
    //'**/test/unit/validation/test-options-schema.js',
    '**/test/unit/**/*.js',
    '**/test/functional/**/*.js',
//'**/test/unit/validation/test-options-schema-helper.js',


    //'**/test/unit/test-serialize-utils.js',
    // '**/test/unit/test-middleware.js',
    // '**/test/test-index.js',
    //'/*.js!**/test/functional/util/**',
    //'!**/test/*.js',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/test/functional/tmp/.*',
    '<rootDir>/test/data/.*',
  ],
  verbose: true,
};
