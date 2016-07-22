'use strict';

var Constants = require('./constants');
var LogWrapper = require('./log-wrapper');
var OptionsHandler = require('./options-handler');
var Validator = require('./validator');
var jsYaml = require('js-yaml');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Buffer = require('buffer').Buffer;
var path = require('path');
var isStream = require('is-stream');
var stringify = require('json-stringify-safe');

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `Reader` with an (optional) logger.
 *
 * @param {(logger|cli|console)} [logger=console] - Logger instance.
 * @returns {Reader} The instance.
 * @constructor
 * @class This class provides utility methods usable to read YAML, JSON or JS
 *        from a source (file, {object} or {@link stream.Readable}) to JS memory objects.
 * @example
 * var Reader = require('jy-transform').Reader;
 * var logger = ...;
 *
 * var reader = new Reader(logger);
 */
function Reader(logger) {
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

    /**
     * Creates a function to read from the passed source in to the given buffer array.
     *
     * @param {stream.Readable} readable - The source to read from.
     * @param {array} bufs               - The temporary buffer array.
     * @returns {Function}               - The function which reads and buffers.
     * @private
     */
    function createReadableFunction(readable, bufs) {
        return function () {
            var chunk;
            while (null !== (chunk = readable.read())) {
                self.logInstance.trace('JSON chunk: ', chunk);
                bufs.push(chunk);
            }
        };
    }

    /**
     * Reads from a passed stream and resolves by callback.
     *
     * @param {stream.Readable} readable - The source to read from.
     * @param {function} resolve         - Callback for success case.
     * @param {function} reject          - Callback for Error case.
     * @param {string} origin            - Origin type, must be 'yaml' or 'json'/'js'.
     * @private
     */
    function readFromStream(readable, resolve, reject, origin) {
        var bufs = [];
        readable
            .on('readable', createReadableFunction(readable, bufs))
            .on('error', function (err) {
                reject(err);
            })
            .on('end', function () {
                var buffer = Buffer.concat(bufs);
                try {
                    self.logInstance.debug(origin + ' reading from Readable');
                    if (origin === Constants.JSON || origin === Constants.JS) {
                        resolve(JSON.parse(buffer.toString(Constants.UTF8)));
                    } else {// HINT: commented (see below): if (origin === Constants.YAML) {
                        resolve(jsYaml.safeLoad(buffer.toString(Constants.UTF8)));
                    }
                    // HINT: for the sake of test coverage it's commented, since this is a private method we have control over options.origin inside this class!
                    //else {
                    //    reject(new Error('Unsupported type: ' + origin + ' to read from Readable'));
                    //}
                } catch (err) { // probably a SyntaxError for JSON or a YAMLException
                    self.logInstance.error('Unexpected error: ' + err.stack);
                    readable.emit('error', err); // send to .on('error',...
                }
            });
    }

    ///////////////////////////////////////////////////////////////////////////////
    // API METHODS (PUBLIC)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Reads the data from a given JS or JSON source.
     *
     * @param {Options} options - Contains the JS/JSON source reference to read from.
     * @returns {Promise}       - Contains the read JS object.
     * @public
     * @example
     * var Reader = require('jy-transform').Reader;
     * var logger = ...;
     * var reader = new Reader(logger);
     *
     * // --- from file path
     *
     * var options = {
     *    src: 'foo.js'
     * };
     *
     * reader.readJs(options)
     *     .then(function (obj){
     *         logger.info(JSON.stringify(obj));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     *
     * // --- from Readable
     *
     * options = {
     *     src: fs.createReadStream('foo.js')
     * };
     *
     * reader.readJs(options)
     *     .then(function (obj){
     *         logger.info(JSON.stringify(obj));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     *
     * // --- from object
     *
     * options = {
     *     src: {
     *         foo: 'bar'
     *     }
     * };
     *
     * reader.readJs(options)
     *     .then(function (obj){
     *         logger.info(JSON.stringify(obj));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.readJs = function (options) {
        self.logInstance.trace('OPTIONS BEFORE ASSERTING IN readJs:::' + JSON.stringify(options));
        return self.optionsHandler.assertOptions(options, ['src'])
            .then(function (assertedOptions) {
                return new Promise(function (resolve, reject) {
                    if (typeof assertedOptions.src === 'string') {
                        try {
                            var resolvedPath = path.resolve('', assertedOptions.src);

                            if ((path.extname(assertedOptions.src) === '.js' || options.origin === Constants.JS) && options.imports && options.imports !== '') {

                                if (!self.validator.validateIdentifier(options.imports)) {
                                    reject(new Error('found invalid identifier for reading from exports: ' + stringify(options.imports, null, 4)));
                                } else {
                                    var json = require(resolvedPath)[options.imports];
                                    self.logInstance.trace('LOADED JSON object (' + options.imports + '):: ' + stringify(json, null, 4));
                                    if (!json) {
                                        reject(new Error('an identifier string \'' + options.imports + '\' was specified for JS object but could not find this object, pls ensure that file ' + assertedOptions.src + ' contains it.'));
                                    } else {
                                        resolve(json);
                                    }
                                }

                            } else {
                                resolve(require(resolvedPath));
                            }
                        } catch (err) { // probably a SyntaxError
                            self.logInstance.error('Unexpected error: ' + err.stack);
                            reject(err);
                        }
                    } else if (isStream.readable(assertedOptions.src)) {
                        readFromStream(assertedOptions.src, resolve, reject, Constants.JSON);
                    } else if (options.imports && options.imports !== '') {

                        if (!self.validator.validateIdentifier(options.imports)) {
                            reject(new Error('found invalid identifier for reading from object: ' + stringify(options.imports, null, 4)));
                        } else {
                            var obj = assertedOptions.src[options.imports];
                            self.logInstance.trace('LOADED JSON object (' + options.imports + '):: ' + stringify(obj, null, 4));
                            if (!obj) {
                                reject(new Error('an identifier string \'' + options.imports + '\' was specified for JS object but could not find this object, pls ensure that object source contains it.'));
                            } else {
                                resolve(obj);
                            }
                        }
                    } else {
                        resolve(assertedOptions.src);
                    }
                });
            });
    };

    /**
     * Loads a single YAML source containing document and returns a JS object.
     *
     * *NOTE:* This function does not understand multi-document sources, it throws
     * exception on those.
     *
     * @param {Options} options - Contains the YAML source reference to read from.
     * @returns {Promise}       - Contains the read JS object.
     * @public
     * @example
     * var Reader = require('jy-transform').Reader;
     * var logger = ...;
     * var reader = new Reader(logger);
     *
     * // --- from file path
     *
     * options = {
     *     src: 'foo.yml'
     * };
     *
     * reader.readYaml(options)
     *     .then(function (obj){
     *         logger.info(JSON.stringify(obj));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     *
     * // --- from Readable
     *
     * options = {
     *     src: fs.createReadStream('foo.yml')
     * };
     *
     * reader.readJs(options)
     *     .then(function (obj){
     *         logger.info(JSON.stringify(obj));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.readYaml = function (options) {
        self.logInstance.trace('OPTIONS BEFORE ASSERTING IN readYaml::: ' + JSON.stringify(options));
        return self.optionsHandler.assertOptions(options, ['src'])
            .then(function (assertedOptions) {
                return new Promise(function (resolve, reject) {
                    if (typeof assertedOptions.src === 'string') {
                        // load source from YAML file
                        fs.readFileAsync(assertedOptions.src, Constants.UTF8)
                            .then(function (yaml) {
                                self.logInstance.debug('YAML loaded from file ' + assertedOptions.src);
                                try {
                                    resolve(jsYaml.safeLoad(yaml));
                                } catch (err) { // probably a YAMLException
                                    self.logInstance.error('Unexpected error: ' + err.stack);
                                    reject(err);
                                }
                            });
                    } else if (isStream.readable(assertedOptions.src)) {
                        readFromStream(assertedOptions.src, resolve, reject, Constants.YAML);
                    } else {
                        resolve(assertedOptions.src);
                    }
                });
            });
    };

///**
// * Parses string as single YAML source containing multiple YAML document and turns a JS objects array.
// *
// * NOTE: This function does not understand multi-document sources, it throws exception on those.
// *
// * @param src {string} The YAML source to read.
// * @returns {Promise} Containing an array holding the multiple JSON objects.
// * @public
// */
//Reader.prototype.readYamls = function (src) {
//    // load source from YAML source
//    return fs.readFileAsync(src, 'utf8')
//        .then(function(yaml) {
//            self.logger.debug('YAML documents loaded from ' + src); // TOD: can this be shortened? -> return Promise.resolve(jsYaml.safeLoadAll(yaml));
//            return Promise.resolve().then(function () {
//                var jsDocs = [];
//                return jsYaml.safeLoadAll(yaml, function (doc) { // TOD this will not work in Promise environment!!!
//                    self.logger.trace(doc);
//                    jsDocs.push(doc);
//                });
//            });
//        });
//};

}

Reader.prototype.constructor = Reader;
module.exports = Reader;
