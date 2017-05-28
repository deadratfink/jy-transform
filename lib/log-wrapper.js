var Promise = require('bluebird');

// ////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
// ////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `LogWrapper`.
 *
 * @param {(logger|cli|console)} [logger=console] - Logger object.
 * @returns {LogWrapper} - The instance.
 * @constructor
 * @example
 * var logger = ...;
 * var logWrapper = new LogWrapper(logger);
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

// ////////////////////////////////////////////////////////////////////////////
// LOGGER METHODS
// ////////////////////////////////////////////////////////////////////////////

/**
 * Log the options with INFO level.
 *
 * @param {string} msg - The message to log.
 * @example
 * var logger = ...;
 * var logWrapper = new LogWrapper(logger);
 * var msg = '...';
 * logWrapper.info(msg);
 * @public
 */
LogWrapper.prototype.info = function (msg) {
  this.logInstance.info(msg);
};

/**
 * Log the options with DEBUG level (if logger supports it, else with INFO).
 *
 * @param {string} msg - The message to log.
 * @example
 * var logger = ...;
 * var logWrapper = new LogWrapper(logger);
 * var msg = '...';
 * logWrapper.debug(msg);
 * @public
 */
LogWrapper.prototype.debug = function (msg) {
  if (this.logInstance.debug && typeof this.logInstance.debug === 'function') {
    this.logInstance.debug(msg);
  } else {
    this.info(msg);
  }
};

/**
 * Log the options with TRACE level (if logger supports it, else with DEBUG).
 *
 * @param {string} msg - The message to log.
 * @example
 * var logger = ...;
 * var logWrapper = new LogWrapper(logger);
 * var msg = '...';
 * logWrapper.trace(msg);
 * @public
 * @see {@link #debug}
 */
LogWrapper.prototype.trace = function (msg) {
  if (this.logInstance.trace && typeof this.logInstance.trace === 'function') {
    this.logInstance.trace(msg);
  } else {
    this.debug(msg);
  }
};

/**
 * Log the options with ERROR level.
 *
 * @param {string} msg - The message to log.
 * @example
 * var logger = ...;
 * var logWrapper = new LogWrapper(logger);
 * var msg = '...';
 * logWrapper.error(msg);
 * @public
 */
LogWrapper.prototype.error = function (msg) {
  this.logInstance.error(msg);
};

/**
 * Log the options with INFO level.
 *
 * @param {Options} options - The properties to log with INFO.
 * @returns A Promise containing the passed `options` object.
 * @example
 * var logger = ...;
 * var logWrapper = new LogWrapper(logger);
 * var options = {
 *     ...
 * };
 * logWrapper.verboseOptions(options)
 *     .then(function (options) {
 *         ...
 *     });
 * @public
 */
LogWrapper.prototype.verboseOptions = function (options) {
  var self = this;
  return Promise.resolve()
    .then(function () {
      self.info('origin: ' + options.origin);
      self.info('target: ' + options.target);
      self.info('src:    ' + options.src);
      self.info('dest:   ' + options.dest);
      self.info('indent: ' + options.indent);
      return options;
    });
};

exports = module.exports = LogWrapper;
