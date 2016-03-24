'use strict';

var Constants = require('./constants.js');
var LogWrapper = require('./log-wrapper.js');
var OptionsHandler = require('./options-handler.js');
var serializeJs = require('serialize-js');
var jsYaml = require('js-yaml');
var Promise = require('bluebird');
var mkdirp = require('mkdirp-then');
var jsonStringifySafe = require('json-stringify-safe');
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var os = require('os');
var isStream = require('is-stream');

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `Writer` with an (optional) logger.
 *
 * @param {(logger|cli|console)} [logger=console] - Logger object.
 * @returns {Writer} The instance.
 * @constructor
 * @class This class provides utility methods usable to write JSON/JS/YAML
 *        from memory to a JSON/JS/YAML file.
 * @example
 * var Writer = require('jy-transform').Writer;
 * var logger = ...;
 *
 * var writer = new Writer(logger);
 */
function Writer(logger) {
    /**
     * The logger instance.
     *
     * @member {(logger|cli|console)}
     * @private
     */
    this.logInstance = new LogWrapper(logger);

    /**
     * The options handler.
     *
     * @type {OptionsHandler}
     * @private
     */
    this.optionsHandler = new OptionsHandler(logger);

    var self = this;


    ///////////////////////////////////////////////////////////////////////////////
    // METHODS (PRIVATE)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Serialize a JS object to string.
     *
     * @param {object} json   - Object to serialize.
     * @param {number} indent - Indention.
     * @returns {string}      - The serialized JS.
     * @private
     */
    function serializeJsToString(json, indent) {
        // TODO: (this.options.prefix ? 'module.exports = ' : '')
        return 'module.exports = ' + serializeJs.serialize(json, {indent: indent}) + ';' + os.EOL;
    }

    /**
     * Serialize a JS object to JSON string.
     *
     * @param {object} json   - Object to serialize.
     * @param {number} indent - Indention.
     * @returns {string}      - The serialized JSON.
     * @private
     */
    function serializeJsToJsonString(json, indent) {
        return jsonStringifySafe(json, null, indent) + os.EOL;
    }

    /**
     * Writes a serialized data object to file.
     *
     * @param {string} data      - The data to write into file.
     * @param {string} dest      - The file destination path.
     * @param {string} target    - The target type, one of [ 'yaml' | 'json' | 'js' ].
     * @param {function} resolve - The Promise `resolve` callback.
     * @param {function} reject  - The Promise `reject` callback.
     * @see {@link Constants#YAML}
     * @see {@link Constants#JSON}
     * @see {@link Constants#JS}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @throws {Error}    - If serialized JSON file could not be written due to any reason.
     * @private
     */
    function writeToFile(data, dest, target, resolve, reject) {
        var destDir = path.dirname(dest);
        self.logInstance.debug('Destination dir: ' + destDir);
        return mkdirp(destDir)
            .then(function () {
                self.logInstance.debug('Destination dir ' + destDir + ' successfully written');
                return fs.writeFileAsync(dest, data, Constants.UTF8);
            })
            .then(function () {
                return resolve('Writing \'' + target + '\' file \'' + dest + '\' successful.');
            })
            .catch(function (err) {
                err.message = 'Could not write \'' + target + '\' file \'' + dest + '\', cause: ' + err.message;
                return reject(err);
            });
    }

    /**
     * Writes a string serialized data object to a stream.
     *
     * @param {string} data      - The data to write into stream.
     * @param {string} dest      - The stream destination.
     * @param {string} target    - The target type, one of [ 'yaml' | 'json' | 'js' ].
     * @param {function} resolve - The Promise `resolve` callback.
     * @param {function} reject  - The Promise `reject` callback.
     * @see {@link Constants#YAML}
     * @see {@link Constants#JSON}
     * @see {@link Constants#JS}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @throws {Error}    - If serialized JSON file could not be written due to any reason.
     * @private
     */
    function writeToStream(data, dest, target, resolve, reject) {
        dest.on('error', function (err) {
                return reject(err);
            })
            .on('finish', function () {
                return resolve('Writing ' + target + ' to stream successful.');
            });

        // write stringified data
        dest.write(data);
        dest.end();
    }

    ///////////////////////////////////////////////////////////////////////////////
    // API METHODS (PUBLIC)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Writes a JSON object to a _*.yaml_ file.
     *
     * @param {object} json - The JSON to write into _*.yaml_ file.
     * @param {Options} options - The write destination and indention.
     * @see {@link Constants#MIN_YAML_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @throws {Error}    - If YAML file could not be written due to any reason.
     * @public
     * @example
     * var Writer = require('jy-transform').Writer;
     * var logger = ...;
     * var json = {...},
     * var options = {
     *     dest: 'result.yml',
     *     indent: 2
     * }
     *
     * var writer = new Writer(logger);
     * writer.writeYaml(json, options)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.writeYaml = function (json, options) {
        return self.optionsHandler.ensureIndent(options)
            .then(function (ensuredOptions) {
                return new Promise(function (resolve, reject) {

                    // complain about missing destination
                    if (!ensuredOptions.dest) {
                        return reject(new Error('missing options.dest: pls specify existing destination source!'));
                    }

                    var dest = ensuredOptions.dest;
                    var indent = ensuredOptions.indent;

                    var yaml;
                    try {
                        yaml = jsYaml.safeDump(json, {indent: indent, noRefs: true}); // TODO Promisify???
                    } catch (err) {
                        err.message = 'Could not write YAML file \'' + dest + '\', cause: ' + err.message;
                        return reject(err);
                    }

                    if (typeof dest === 'string') {
                        return writeToFile(yaml, dest, Constants.YAML, resolve, reject);
                    } else if (isStream.writable(dest)) {
                        return writeToStream(yaml, dest, Constants.YAML, resolve, reject);
                    } else {
                        ensuredOptions.dest = yaml;
                        return resolve('Writing YAML to options.dest successful.');
                    }
                });
            });
    };

    /**
     * Writes a JSON object to a _*.json_ file.
     *
     * @param {object} json - The JSON to write into _*.json_ file.
     * @param {Options} options - The write destination and indention.
     * @see {@link Constants#MIN_JSON_JS_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @public
     * @example
     * var Writer = require('jy-transform').Writer;
     * var logger = ...;
     * var json = {...};
     * var options = {
     *     dest: 'result.yml',
     *     indent: 2
     * }
     *
     * var writer = new Writer(logger);
     * writer.writeJson(json, options)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.writeJson = function (json, options) {
        return self.optionsHandler.ensureIndent(options)
            .then(function (ensuredOptions) {
                return new Promise(function (resolve, reject) {
                    // complain about missing destination
                    if (!ensuredOptions.dest) {
                        return reject(new Error('missing options.dest: pls specify existing destination source!'));
                    }
                    var dest = ensuredOptions.dest;
                    var indent = ensuredOptions.indent;
                    if (typeof dest === 'string') {
                        return writeToFile(serializeJsToJsonString(json, indent), dest, Constants.JSON, resolve, reject);
                    } else if (isStream.writable(dest)) {
                        return writeToStream(serializeJsToJsonString(json, indent), dest, Constants.JSON, resolve, reject);
                    } else {
                        ensuredOptions.dest = serializeJsToJsonString(json, indent);
                        return resolve('Writing JSON to options.dest successful.');
                    }
                });
            });
    };

    /**
     * Writes a JSON object to a _*.js_ file. The object is prefixed by `module.exports = `.
     *
     * @param {object} json - The JSON to write into _*.js_ file.
     * @param {Options} options - The write destination and indention.
     * @see {@link Constants#MIN_JSON_JS_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @public
     * @example
     * var Writer = require('jy-transform').Writer;
     * var logger = ...;
     * var json = {...};
     * var options = {
     *     dest: 'result.yml',
     *     indent: 2
     * }
     *
     * var writer = new Writer(logger);
     * writer.writeJs(json, options)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.writeJs = function (json, options) {
        return self.optionsHandler.ensureIndent(options)
            .then(function (ensuredOptions) {
                return new Promise(function (resolve, reject) {
                    // complain about missing destination
                    if (!ensuredOptions.dest) {
                        return reject(new Error('missing options.dest: pls specify existing destination source!'));
                    }

                    var dest = ensuredOptions.dest;
                    var indent = ensuredOptions.indent;
                    if (typeof dest === 'string') {
                        return writeToFile(serializeJsToString(json, indent), dest, Constants.JS, resolve, reject);
                    } else if (isStream.writable(dest)) {
                        return writeToStream(serializeJsToString(json, indent), dest, Constants.JS, resolve, reject);
                    } else {
                        ensuredOptions.dest = json;
                        return resolve('Writing JS to options.dest successful.');
                    }
                });
            });
    };
}

Writer.prototype.constructor = Writer;
module.exports = Writer;
