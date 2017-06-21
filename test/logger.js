import winston from 'winston';
import fsExtra from 'fs-extra';
// import promisify from 'promisify-es6';
// // import toYAML from 'combarnea-winston-console-formatter';
//
// const ensureDir = promisify(fsExtra.ensureDir);
// const emptyDir = promisify(fsExtra.emptyDir);

/**
 * @module jy-transform:unit:logger
 * @description The test suite logger.
 * @type {Object}
 * @private
 */

// ////////////////////////////////////////////////////////////////////////////
// PRIVATES
// ////////////////////////////////////////////////////////////////////////////

/**
 * An indent of 0 SPACEs.
 *
 * @type {string}
 * @constant
 * @private
 */
const INDENT = '';

/**
 * A temporary test directory.
 *
 * @type {string}
 * @constant
 * @private
 */
const TEST_TMP_DIR = './test/tmp';

/**
 * This function formats the log string by given options to log.
 *
 * @param {Object} options - The formatter options.
 * @returns {string} The log string.
 * @private
 */
const formatter = (options) => {
  // Return string will be passed to logger.
  return (options.timestamp() !== '' ? '[' + options.timestamp() + '] ' : '') + '[' + options.level.toUpperCase() + '] '
    + (undefined !== options.message ? options.message : '')
    + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
};

/**
 * Options for winston file logging.
 *
 * @type {{filename: string, timestamp: winstonFileOptions.timestamp, formatter: formatter, level: string}}
 * @private
 */
const winstonFileOptions = {
  filename: TEST_TMP_DIR + '/test.log',
  /**
   * Formats the timestamp as {@link Date} ISO string prefixed by an indent.
   *
   * @see #INDENT
   * @returns {string} - The {@link Date} ISO string.
   */
  timestamp: () => {
    return new Date().toISOString();
  },
  json: false,
  formatter,
  level: 'info'
};

/**
 * Options for winston console logging.
 *
 * @type {{timestamp: winstonConsoleOptions.timestamp, formatter: formatter, level: string}}
 * @private
 */
const winstonConsoleOptions = {
  /**
   * Overwrites the timestamp by indent.
   *
   * @see #INDENT
   * @returns {string} - The indent only.
   */
  timestamp: () => {
    return INDENT;
  },
  formatter,
  level: 'info'
};

// ////////////////////////////////////////////////////////////////////////////
// PREPARE TMP FOLDER
// ////////////////////////////////////////////////////////////////////////////

// (async () => {
//   await ensureDir(TEST_TMP_DIR);
//   await emptyDir(TEST_TMP_DIR);
// })();
// fsExtra.ensureDirSync(TEST_TMP_DIR);
// fsExtra.emptyDirSync(TEST_TMP_DIR);

// ////////////////////////////////////////////////////////////////////////////
// PROTECTED EXPORTS
// ////////////////////////////////////////////////////////////////////////////

/**
 * The winston logger.
 *
 * @protected
 */
export const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)(winstonFileOptions),
    new (winston.transports.Console)(winstonConsoleOptions)
  ],
  exitOnError: false
});

// logger.add(winston.transports.Console, toYAML.config({
//   // colors, // colorizer colors array
//   noMeta: false, // boolean - not to print metadata, if true metadata will not be printed
//   noStack: false // boolean - not to print stack trace, if true stack trace will not be printed
// }));

logger.info('Test-logger initialized, writing to ', winstonFileOptions.filename);

export default {
  logger,
};
