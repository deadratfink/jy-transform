'use strict';

var Constants = require('./constants.js');
var serializeJs = require('serialize-js');
var jsYaml = require('js-yaml');
var Promise = require('bluebird');
var mkdirp = require('mkdirp-then');
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var os = require('os');

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Internal `this` reference.
 *
 * @type {Writer}
 * @private
 */
var self;

/**
 * Constructs the `Writer` with an (optional) logger.
 *
 * @param logger {logger|cli|console} (optional) Logger, default is `console`.
 * @returns {Writer} The instance.
 * @constructor
 * @class This class provides utility methods usable to write JSON/JS
 *        from memory to a YAML, JSON or JS file.
 * @example
 * var Writer = require('jy-transform').Writer;
 * var logger = ...;
 *
 * var writer = new Writer(logger);
 */
var Writer = function (logger) {
    /**
     * The logger instance.
     *
     * @member {logger|cli|console}
     */
    this.logger = logger || console;

    self = this;
    return this;
};

Writer.prototype.constructor = Writer;

///////////////////////////////////////////////////////////////////////////////
// METHODS (PRIVATE)
///////////////////////////////////////////////////////////////////////////////

/**
 * Writes a serialized data object to file.
 *
 * @param data {string} The data to write into file.
 * @param dest {string} The file destination path.
 * @param target {string} The target type, one of [ 'yaml' | 'json' | 'js' ].
 * @see {@link Constants#YAML}
 * @see {@link Constants#JSON}
 * @see {@link Constants#JS}
 * @returns {Promise} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If serialized JSON file could not be written due to any reason.
 * @private
 */
function write(data, dest, target) {
    var destDir = path.dirname(dest);
    self.logger.debug('Destination dir: ' + destDir);
    return mkdirp(destDir)
        .then(function() {
            self.logger.debug('Destination dir ' + destDir + ' successfully written');
            return fs.writeFileAsync(dest, data, Constants.UTF8);
        })
        .then(function () {
            return Promise.resolve('Writing \'' + target + '\' file \'' + dest + '\' successful.');
        })
        .catch(function (err) {
            err.message = 'Could not write \'' + target + '\' file \'' + dest + '\', cause: ' + err.message;
            throw err;
        });
}

///////////////////////////////////////////////////////////////////////////////
// API METHODS (PUBLIC)
///////////////////////////////////////////////////////////////////////////////

/**
 * Writes a JSON object to a _*.yaml_ file.
 *
 * @param json {object} The JSON to write into _*.yaml_ file.
 * @param dest {string} The file destination path.
 * @param indent {number} The indent in spaces.
 * @see {@link Constants#MIN_YAML_INDENT}
 * @see {@link Constants#DEFAULT_INDENT}
 * @see {@link Constants#MAX_INDENT}
 * @returns {Promise} Containing the write success message to handle by caller (e.g. for logging).
 * @throws {Error} If YAML file could not be written due to any reason.
 * @public
 */
Writer.prototype.writeYaml = function (json, dest, indent) {
    return new Promise(function(resolve, reject) {
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
 * @param json {object} The JSON to write into _*.json_ file.
 * @param dest {string} The file destination path.
 * @param indent {number} The indent in spaces.
 * @see {@link Constants#MIN_JSON_JS_INDENT}
 * @see {@link Constants#DEFAULT_INDENT}
 * @see {@link Constants#MAX_INDENT}
 * @returns {Promise} Containing the write success message to handle by caller (e.g. for logging).
 * @public
 */
Writer.prototype.writeJson = function (json, dest, indent) {
    var serializedJson = JSON.stringify(json, null, indent) + os.EOL;
    return write(serializedJson, dest, Constants.JSON);
};

/**
 * Writes a JSON object to a _*.js_ file.
 *
 * @param json {object} The JSON to write into _*.js_ file.
 * @param dest {string} The file destination path.
 * @param indent {number} The indent in spaces.
 * @see {@link Constants#MIN_JSON_JS_INDENT}
 * @see {@link Constants#DEFAULT_INDENT}
 * @see {@link Constants#MAX_INDENT}
 * @returns {Promise} Containing the write success message to handle by caller (e.g. for logging).
 * @public
 */
Writer.prototype.writeJs = function (json, dest, indent) {
    // (self.options.prefix ? 'module.exports = ' : '')
    var serializedJson = 'module.exports = ' + serializeJs.serialize(json, {indent: indent}) + ';' + os.EOL;
    return write(serializedJson, dest, Constants.JS);
};

module.exports = Writer;
