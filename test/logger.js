import winston from 'winston';

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

logger.info('Test-logger initialized, writing to ', winstonFileOptions.filename);

export default {
  logger,
};
