'use strict';

var Constants = require('./constants.js');
var LogWrapper = require('./log-wrapper.js');
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

    var self = this;


    ///////////////////////////////////////////////////////////////////////////////
    // METHODS (PRIVATE)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Writes a serialized data object to file.
     *
     * @param {string} data   - The data to write into file.
     * @param {string} dest   - The file destination path.
     * @param {string} target - The target type, one of [ 'yaml' | 'json' | 'js' ].
     * @see {@link Constants#YAML}
     * @see {@link Constants#JSON}
     * @see {@link Constants#JS}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @throws {Error}    - If serialized JSON file could not be written due to any reason.
     * @private
     */
    var write = function (data, dest, target) {
        var destDir = path.dirname(dest);
        self.logInstance.debug('Destination dir: ' + destDir);
        return mkdirp(destDir)
            .then(function () {
                self.logInstance.debug('Destination dir ' + destDir + ' successfully written');
                return fs.writeFileAsync(dest, data, Constants.UTF8);
            })
            .then(function () {
                return Promise.resolve('Writing \'' + target + '\' file \'' + dest + '\' successful.');
            })
            .catch(function (err) {
                err.message = 'Could not write \'' + target + '\' file \'' + dest + '\', cause: ' + err.message;
                throw err;
            });
    };

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
     * var json = {...}
     *
     * var writer = new Writer(logger);
     * writer.writeYaml(json, result.yml, 2)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.writeYaml = function (json, options) {
        return new Promise(function (resolve, reject) {
            var dest = options.dest;
            var indent = options.indent;
            var yaml;
            try {
                yaml = jsYaml.safeDump(json, {indent: indent, noRefs: true}); // TODO Promisify???
            } catch (err) {
                err.message = 'Could not write YAML file \'' + dest + '\', cause: ' + err.message;
                return reject(err);
            }
            if (typeof dest === 'string') {
                return write(yaml, dest, Constants.YAML)
                    .then(function (msg) {
                        return resolve(msg);
                    });
            } else if (isStream.writable(dest)) {
                // write stringified YAML
                dest.write(yaml);
                dest.end();
                dest.on('error', function (err) {
                        return reject(err);
                    })
                    .on('finish', function () {
                        return resolve('Writing YAML stream successful.');
                    });
            } else {
                options.dest = yaml;
                return resolve('Writing YAML options.dest successful.');
            }
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
     * var json = {...}
     *
     * var writer = new Writer(logger);
     * writer.writeJson(json, result.yml, 2)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.writeJson = function (json, options) {
        return new Promise(function (resolve, reject) {
            var dest = options.dest;
            var indent = options.indent;
            if (typeof dest === 'string') {
                var serializedJson = jsonStringifySafe(json, null, indent) + os.EOL;
                return write(serializedJson, dest, Constants.JSON)
                    .then(function (msg) {
                        return resolve(msg);
                    });
            } else if (isStream.writable(dest)) {
                // write stringified JSON
                dest.write(json);
                dest.end();
                dest.on('error', function (err) {
                        return reject(err);
                    })
                    .on('finish', function () {
                        return resolve('Writing JSON stream successful.');
                    });
            } else {
                options.dest = json;
                return resolve('Writing JSON options.dest successful.');
            }
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
     * var json = {...}
     *
     * var writer = new Writer(logger);
     * writer.writeJs(json, result.yml, 2)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.writeJs = function (json, options) {
        return new Promise(function (resolve, reject) {
            var dest = options.dest;
            var indent = options.indent;
            if (typeof dest === 'string') {
                // TODO: (this.options.prefix ? 'module.exports = ' : '')
                var serializedJson = 'module.exports = ' + serializeJs.serialize(json, {indent: indent}) + ';' + os.EOL;
                return write(serializedJson, dest, Constants.JS)
                    .then(function (msg) {
                        return resolve(msg);
                    });
            } else if (isStream.writable(dest)) {
                // write stringified JSON here!
                dest.write(jsonStringifySafe(json, null, indent) + os.EOL);
                dest.end();
                dest.on('error', function (err) {
                        return reject(err);
                    })
                    .on('finish', function () {
                        return resolve('Writing JS(ON) stream successful.');
                    });
            } else {
                options.dest = json;
                return resolve('Writing JS options.dest successful.');
            }
        });
    };

}

Writer.prototype.constructor = Writer;
module.exports = Writer;
