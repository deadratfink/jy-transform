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

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `Writer` with an (optional) logger.
 *
 * @param {(logInstance|cli|console)} [logger=console] - Logger object.
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
     * @member {(logInstance|cli|console)}
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
     * @param {object} json   - The JSON to write into _*.yaml_ file.
     * @param {string} dest   - The file destination path.
     * @param {number} indent - The indent in spaces.
     * @see {@link Constants#MIN_YAML_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @throws {Error}    - If YAML file could not be written due to any reason.
     * @public
     */
    this.writeYaml = function (json, dest, indent) {
        return new Promise(function (resolve, reject) {
            try {
                var yaml = jsYaml.safeDump(json, {indent: indent, noRefs: true}); // TODO Async???
                write(yaml, dest, Constants.YAML);
                resolve('WritingYAML file \'' + dest + '\' successful.');
            } catch (err) {
                err.message = 'Could not write YAML file \'' + dest + '\', cause: ' + err.message;
                reject(err);
            }
        });
    };

    /**
     * Writes a JSON object to a _*.json_ file.
     *
     * @param {object} json   - The JSON to write into _*.json_ file.
     * @param {string} dest   - The file destination path.
     * @param {number} indent - The indent in spaces.
     * @see {@link Constants#MIN_JSON_JS_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @public
     */
    this.writeJson = function (json, dest, indent) {
        var serializedJson = jsonStringifySafe(json, null, indent) + os.EOL;
        return write(serializedJson, dest, Constants.JSON);
    };

    /**
     * Writes a JSON object to a _*.js_ file.
     *
     * @param {object} json   - The JSON to write into _*.js_ file.
     * @param {string} dest   - The file destination path.
     * @param {number} indent - The indent in spaces.
     * @see {@link Constants#MIN_JSON_JS_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @public
     */
    this.writeJs = function (json, dest, indent) {
        // (this.options.prefix ? 'module.exports = ' : '')
        var serializedJson = 'module.exports = ' + serializeJs.serialize(json, {indent: indent}) + ';' + os.EOL;
        return write(serializedJson, dest, Constants.JS);
    };

}

Writer.prototype.constructor = Writer;
module.exports = Writer;
