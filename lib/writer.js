'use strict';

var Constants = require('./constants.js');
var LogWrapper = require('./log-wrapper.js');
var OptionsHandler = require('./options-handler.js');
var Validator = require('./validator.js');
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
 *        from memory to a JSON/JS/YAML destination
 *        (file, {object} or {@link stream.Readable}).
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

    /**
     * The validator.
     *
     * @type {Validator}
     */
    this.validator = new Validator(logger);

    var self = this;


    ///////////////////////////////////////////////////////////////////////////////
    // METHODS (PRIVATE)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Creates a potential named `'module.exports[.exportsTo]'` string.
     *
     * @param {string} [exportsTo] - The export name.
     * @returns {Promise}          - Promise resolves with the exports string.
     * @private
     */
    function createExportsString(exportsTo) {
        return new Promise(function (resolve, reject) {
            var exports = 'module.exports';
            if (exportsTo && exportsTo !== '') {
                if (!self.validator.validateIdentifier(exportsTo)) {
                    return reject(new Error('Found invalid identifier for exports: ' + exportsTo));
                } else {
                    exports = exports + '.' + exportsTo + ' = ';
                }
            } else {
                exports = exports + ' = ';
            }
            resolve(exports);
        });
    }

    /**
     * Serialize a JS object to string.
     *
     * @param {object} json        - Object to serialize.
     * @param {number} indent      - Indention.
     * @param {string} [exportsTo] - Name for export (*IMPORTANT:* must be a valid ES6 identifier).
     * @returns {Promise}          - Promise resolve with the serialized JS.
     * @private
     */
    function serializeJsToString(json, indent, exportsTo) {
        return createExportsString(exportsTo)
            .then(function(exportsStr) {
                return exportsStr + serializeJs.serialize(json, {indent: indent}) + ';' + os.EOL;
            });
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
     * Turns the destination file name into a name containing a consecutive
     * number if it exists. It iterates over the files until it finds a file
     * name which does not exist.
     *
     * @param {string} dest - The destination file.
     * @returns {string}    - A consecutive file name or the original one if
     *                        `dest` file does not exist.
     * @private
     */
    function getConsecutiveDestName(dest) {
        var tmpDest = dest;
        var i = 1;
        var destDirName = path.dirname(tmpDest);
        var ext = path.extname(tmpDest);
        var basename = path.basename(tmpDest, ext);
        while (fs.existsSync(tmpDest)) {
            tmpDest = path.join(destDirName, basename + '(' + i++ + ')' + ext);
        }
        return tmpDest;
    }

    /**
     * Writes a serialized data object to file.
     *
     * @param {string} data      - The data to write into file.
     * @param {string} dest      - The file destination path.
     * @param {string} target    - The target type, one of [ 'yaml' | 'json' | 'js' ].
     * @param {function} resolve - The Promise `resolve` callback.
     * @param {function} reject  - The Promise `reject` callback.
     * @param {boolean} [forceOverwrite] - Force overwriting the destination file if `true`.
     * @see {@link Constants#YAML}
     * @see {@link Constants#JSON}
     * @see {@link Constants#JS}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @throws {Error}    - If serialized JSON file could not be written due to any reason.
     * @private
     */
    function writeToFile(data, dest, target, resolve, reject, forceOverwrite) {

        /**
         * Ensures that all dirs exists for dest and writes the file.
         *
         * @private
         */
        function mkdirAndWrite() {
            var destDir = path.dirname(dest);
            self.logInstance.debug('Destination dir: ' + destDir);
            mkdirp(destDir)
                .then(function () {
                    self.logInstance.debug('Destination dir ' + destDir + ' successfully written');
                    if (forceOverwrite === undefined || forceOverwrite === false) {
                        dest = getConsecutiveDestName(dest);
                        self.logInstance.info('Setting was: do not overwrite, using destination ' + dest + '.');
                    }
                    return fs.writeFileAsync(dest, data, Constants.UTF8);
                })
                .then(function () {
                    resolve('Writing \'' + target + '\' file \'' + dest + '\' successful.');
                })
                .catch(function (err) {
                    err.message = 'Could not write \'' + target + '\' file \'' + dest + '\', cause: ' + err.message;
                    reject(err);
                });
        }

        return fs.statAsync(dest)
            .then(function (stats) {
                if (stats.isDirectory()) {
                    reject(new Error('Destination file is a directory, pls specify a valid file resource!'));
                } else {
                    // file exists
                    mkdirAndWrite();
                }
            })
            .catch(function (err) {
                // ignore error (because file could possibly not exist at this point of time)
                mkdirAndWrite();
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
     * @throws {Error}    - If serialized JSON could not be written due to any reason.
     * @private
     */
    function writeToStream(data, dest, target, resolve, reject) {
        dest.on('error', function (err) {
                reject(err);
            })
            .on('finish', function () {
                resolve('Writing ' + target + ' to stream successful.');
            });

        // write stringified data
        dest.write(data);
        dest.end();
    }

    ///////////////////////////////////////////////////////////////////////////////
    // API METHODS (PUBLIC)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Writes a JSON object to a YAML destination.
     *
     * @param {object} json     - The JSON to write into YAML destination.
     * @param {Options} options - The write destination and indention.
     * @see {@link Constants#MIN_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @throws {Error}    - If YAML destination could not be written due to any reason.
     * @public
     * @example
     * var Writer = require('jy-transform').Writer;
     * var logger = ...;
     * var writer = new Writer(logger);
     *
     * var json = {...},
     * var options = {
     *     dest: 'result.yml',
     *     indent: 2
     * }
     *
     * writer.writeYaml(json, options)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * options = {
     *     dest: fs.createWriteStream('result.yml'),
     *     indent: 4
     * }
     *
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
                        reject(new Error('Missing options.dest, pls specify existing destination resource!'));
                    } else {
                        var dest = ensuredOptions.dest;
                        var indent = ensuredOptions.indent;

                        var yaml;
                        try {
                            yaml = jsYaml.safeDump(json, {indent: indent, noRefs: true});
                        } catch (err) {
                            err.message = 'Could not write YAML file \'' + dest + '\', cause: ' + err.message;
                            return reject(err);
                        }

                        if (typeof dest === 'string') { // file
                            writeToFile(yaml, dest, Constants.YAML, resolve, reject, ensuredOptions.force);
                        } else if (isStream.writable(dest)) { // stream
                            writeToStream(yaml, dest, Constants.YAML, resolve, reject);
                        } else { // file
                            ensuredOptions.dest = yaml;
                            resolve('Writing YAML to options.dest successful.');
                        }
                    }
                });
            });
    };

    /**
     * Writes a JSON object to a JSON destination.
     *
     * @param {object} json - The JSON to write into JSON destination.
     * @param {Options} options - The write destination and indention.
     * @see {@link Constants#MIN_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @public
     * @example
     * var Writer = require('jy-transform').Writer;
     * var logger = ...;
     * var writer = new Writer(logger);
     *
     * var json = {...};
     * var options = {
     *     dest: 'result.json',
     *     indent: 2
     * }
     *
     * writer.writeJson(json, options)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * options = {
     *     dest: fs.createWriteStream('result.json'),
     *     indent: 4
     * }
     *
     * writer.writeJson(json, options)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * options = {
     *     dest: {},
     *     indent: 4
     * }
     *
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
                        reject(new Error('Missing options.dest, pls specify existing destination resource!'));
                    } else {
                        var dest = ensuredOptions.dest;
                        var indent = ensuredOptions.indent;
                        if (typeof dest === 'string') { // file
                            writeToFile(serializeJsToJsonString(json, indent), dest, Constants.JSON, resolve, reject, ensuredOptions.force);
                        } else if (isStream.writable(dest)) { // stream
                            writeToStream(serializeJsToJsonString(json, indent), dest, Constants.JSON, resolve, reject);
                        } else { // object
                            ensuredOptions.dest = serializeJsToJsonString(json, indent);
                            resolve('Writing JSON to options.dest successful.');
                        }
                    }
                });
            });
    };

    /**
     * Writes a JSON object to a JS destination. The object is prefixed by `module.exports = `.
     *
     * @param {object} json - The JSON to write into JS destination.
     * @param {Options} options - The write destination and indention.
     * @see {@link Constants#MIN_INDENT}
     * @see {@link Constants#DEFAULT_INDENT}
     * @see {@link Constants#MAX_INDENT}
     * @returns {Promise} - Containing the write success message to handle by caller (e.g. for logging).
     * @public
     * @example
     * var Writer = require('jy-transform').Writer;
     * var logger = ...;
     * var writer = new Writer(logger);
     *
     * var json = {...};
     * var options = {
     *     dest: 'result.js',
     *     indent: 2
     * }
     *
     * writer.writeJs(json, options)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * options = {
     *     dest: fs.createWriteStream('result.json'),
     *     indent: 4
     * }
     *
     * writer.writeJs(json, options)
     *     .then(function (msg){
     *         logger.info(msg);
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * options = {
     *     dest: {},
     *     indent: 2
     * }
     *
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
                        reject(new Error('Missing options.dest, pls specify existing destination resource!'));
                    } else {
                        var dest = ensuredOptions.dest;
                        var indent = ensuredOptions.indent;
                        if (typeof dest === 'string') { // file
                            serializeJsToString(json, indent, ensuredOptions.exports)
                                .then(function (data) {
                                    return writeToFile(data, dest, Constants.JS, resolve, reject, ensuredOptions.force);
                                })
                                .catch(function (err) {
                                    reject(err);
                                });
                        } else if (isStream.writable(dest)) { // stream
                            serializeJsToString(json, indent, ensuredOptions.exports)
                                .then(function (data) {
                                    return writeToStream(data, dest, Constants.JS, resolve, reject);
                                })
                                .catch(function (err) {
                                    reject(err);
                                });
                        } else { // object
                            var msg;
                            if (ensuredOptions.exports && ensuredOptions.exports !== '') {
                                if (!self.validator.validateIdentifier(ensuredOptions.exports)) {
                                    reject(new Error('Found invalid identifier for exports: ' + ensuredOptions.exports));
                                } else {
                                    ensuredOptions.dest[ensuredOptions.exports] = json;
                                    msg = 'Writing JS to options.dest.' + ensuredOptions.exports + ' successful.';
                                }
                            } else {
                                ensuredOptions.dest = json;
                                msg = 'Writing JS to options.dest successful.';
                            }
                            resolve(msg);
                        }
                    }
                });
            });
    };
}

Writer.prototype.constructor = Writer;
module.exports = Writer;
