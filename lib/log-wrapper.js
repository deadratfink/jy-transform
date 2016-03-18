'use strict';

var Promise = require('bluebird');

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `LogWrapper`.
 *
 * @param {(logger|cli|console)} logger=console - Logger object.
 * @returns {LogWrapper} - The instance.
 * @constructor
 * @class Class which defines a `logger` wrapper usable in this module.
 *        <p>
 *        **NOTE:** This class is not to be intended to be called from
 *        outside this module!
 */
function LogWrapper(logger) {

    /**
     * The logger instance.
     *
     * @member {(logger|cli|console)}
     * @private
     */
    this.logInstance = logger || console;
}

LogWrapper.prototype = {};
LogWrapper.prototype.constructor = LogWrapper;

///////////////////////////////////////////////////////////////////////////////
// LOGGER METHODS
///////////////////////////////////////////////////////////////////////////////

/**
 * Log the options with DEBUG level (logger supports it, else with INFO).
 *
 * @param {string} msg - The message to log.
 * @public
 */
LogWrapper.prototype.debug = function (msg) {
    if (this.logInstance.debug && typeof this.logInstance.debug === 'function') {
        this.logInstance.debug('I can debug :-)');
        this.logInstance.debug(msg);
    } else {
        this.info(msg);
    }
};

/**
 * Log the options with INFO level.
 *
 * @param {string} msg - The message to log.
 * @public
 */
LogWrapper.prototype.info = function (msg) {
    this.logInstance.info(msg);
};

/**
 * Log the options with ERROR level.
 *
 * @param {string} msg - The message to log.
 * @public
 */
LogWrapper.prototype.error = function (msg) {
    this.logInstance.error(msg);
};

/**
 * Log the options with INFO level.
 *
 * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options - The properties to log with INFO.
 * @returns A Promise containing the passed `options` object.
 * @public
 */
LogWrapper.prototype.verboseOptions = function (options) {
    // verbose info
    this.logInstance.info('origin: ' + options.origin);
    this.info('target: ' + options.target);
    this.info('src:    ' + options.src);
    this.info('dest:   ' + options.dest);
    this.info('indent: ' + options.indent);
    return Promise.resolve(options);
};

exports = module.exports = LogWrapper;