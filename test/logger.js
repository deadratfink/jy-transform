'use strict';

var assert = require('assert');
var winston = require('winston');
var fs = require('fs-extra');
/**
 * An indent of 8 SPACEs.
 *
 * @type {string}
 */
var INDENT = '        ';
var TEST_TMP_DIR = './test/tmp';

/**
 * This function formats the log string by given options to log.
 *
 * @param {{timestamp: function, level: string, [message: string], [meta: object]}} options - The formatter options.
 * @returns {string} - The log string.
 * @private
 */
var formatter = function(options) {
    // Return string will be passed to logger.
    return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
};

/**
 * Options for winston file logging.
 *
 * @type {{filename: string, timestamp: winstonFileOptions.timestamp, formatter: formatter, level: string}}
 * @private
 */
var winstonFileOptions = {
    filename: TEST_TMP_DIR + '/test.log',
    /**
     * Formats the timestamp as {@link Date} ISO string prefixed by an indent.
     *
     * @see #INDENT
     * @returns {string} - The {@link Date} ISO string.
     */
    timestamp: function() {
        return new Date().toISOString();
    },
    json: false,
    formatter: formatter,
    level: 'debug'
};

fs.ensureDirSync(TEST_TMP_DIR);
fs.emptyDirSync(TEST_TMP_DIR);

/**
 * Options for winston console logging.
 *
 * @type {{timestamp: winstonConsoleOptions.timestamp, formatter: formatter, level: string}}
 * @private
 */
var winstonConsoleOptions = {
    /**
     * Overwrites the timestamp by indent.
     *
     * @see #INDENT
     * @returns {string} - The indent only.
     */
    timestamp: function() {
        return INDENT;
    },
    formatter: formatter,
    level: 'info'
};

/**
 * The winston logger.
 *
 * @public
 */
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)(winstonFileOptions),
        new (winston.transports.Console)(winstonConsoleOptions)
    ],
    exitOnError: false
});

logger.info('Test-logger initialized, writing to ', winstonFileOptions.filename);

module.exports = logger;
