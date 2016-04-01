'use strict';

var Constants = require('./constants.js');
var LogWrapper = require('./log-wrapper.js');
var OptionsHandler = require('./options-handler.js');
var jsYaml = require('js-yaml');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Buffer = require('buffer').Buffer;
var path = require('path');
var isStream = require('is-stream');

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `Reader` with an (optional) logger.
 *
 * @param {(logger|cli|console)} [logger=console] - Logger object.
 * @returns {Reader} The instance.
 * @constructor
 * @class This class provides utility methods usable to read YAML, JSON or JS
 *        from a file to JS memory objects.
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

    var self = this;

    /**
     * Creates a function to read from the passed source in to the given buffer array.
     *
     * @param {stream.Readable} src - The source to read from.
     * @param {array} bufs          - The temporary buffer array.
     * @returns {Function}          - The function whic hreads and buffers.
     */
    function createReadableFunction(src, bufs) {
        return function () {
            var chunk;
            while (null !== (chunk = src.read())) {
                self.logInstance.debug('JSON chunk: ', chunk);
                bufs.push(chunk);
            }
        };
    }

    ///////////////////////////////////////////////////////////////////////////////
    // API METHODS (PUBLIC)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Reads the data from a given _*.js_ or _*.json_ file source.
     *
     * @param {Options} options - Contains the JS/JSON source reference to read from.
     * @returns {Promise}       - Contains the read JSON object.
     * @public
     * @example
     * var Reader = require('jy-transform').Reader;
     * var logger = ...;
     * var options = {
     *    src: 'foo.js'
     * };
     * var reader = new Reader(logger);
     * reader.readJs(options)
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * options = {
     *     src: fs.createReadStream('./my.js')
     * };
     * reader.readJs(options)
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * options = {
     *     src: {
     *         foo: 'bar'
     *     }
     * };
     * reader.readJs(options)
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.readJs = function (options) {
        self.logInstance.debug('OPTIONS BEFORE ASSERTING IN readJs:::' + JSON.stringify(options));
        return self.optionsHandler.assertOptions(options, ['src'])
            .then(function (assertedOptions) {
                return new Promise(function (resolve, reject) {
                    if (typeof assertedOptions.src === 'string') {
                        try {
                            var resolvedPath = path.resolve('', assertedOptions.src);
                            return resolve(require(resolvedPath));
                        } catch (err) { // probably a SyntaxError
                            self.logInstance.error('Unexpected error: ' + err.stack);
                            return reject(err);
                        }
                    } else if (isStream.readable(assertedOptions.src)) {
                        // read stringified JSON
                        var bufs = [];
                        assertedOptions.src.on('readable', createReadableFunction(assertedOptions.src, bufs))
                            .on('error', function (err) {
                                return reject(err);
                            })
                            .on('end', function () {
                                var buffer = Buffer.concat(bufs);
                                try {
                                    return resolve(JSON.parse(buffer.toString(Constants.UTF8)));
                                } catch (err) { // probably a SyntaxError
                                    self.logInstance.error('Unexpected error: ' + err.stack);
                                    this.emit('error', err); // send to .on('error',...
                                }
                            });
                    } else {
                        return resolve(assertedOptions.src);
                    }
                });
            });
    };

    /**
     * Loads a single YAML file containing document and turns a JS object.
     *
     * *NOTE:* This function does not understand multi-document sources, it throws
     * exception on those.
     *
     * @param {Options} options - Contains the YAML source reference to read from.
     * @returns {Promise}       - Contains the read JSON object.
     * @public
     * @example
     * var Reader = require('jy-transform').Reader;
     * var logger = ...;
     *
     * var reader = new Reader(logger);
     * reader.readYaml('foo.yaml')
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * options = {
     *     src: fs.createReadStream('foo.yml')
     * };
     * reader.readJs(options)
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.readYaml = function (options) {
        self.logInstance.debug('OPTIONS BEFORE ASSERTING IN readYaml::: ' + JSON.stringify(options));
        return self.optionsHandler.assertOptions(options, ['src'])
            .then(function (assertedOptions) {
                return new Promise(function (resolve, reject) {
                    if (typeof assertedOptions.src === 'string') {
                        // load source from YAML file
                        return fs.readFileAsync(assertedOptions.src, Constants.UTF8)
                            .then(function (yaml) {
                                self.logInstance.debug('YAML loaded from file ' + assertedOptions.src);
                                try {
                                    return resolve(jsYaml.safeLoad(yaml));
                                } catch (err) { // probably a YAMLException
                                    self.logInstance.error('Unexpected error: ' + err.stack);
                                    return reject(err);
                                }
                            });
                    } else if (isStream.readable(assertedOptions.src)) {
                        // read YAML
                        var bufs = [];
                        assertedOptions.src.on('readable', createReadableFunction(assertedOptions.src, bufs))
                            .on('error', function (err) {
                                return reject(err);
                            })
                            .on('end', function () {
                                var buffer = Buffer.concat(bufs);
                                self.logInstance.debug('YAML loaded from stream');
                                try {
                                    return resolve(jsYaml.safeLoad(buffer.toString(Constants.UTF8)));
                                } catch (err) { // probably a YAMLException
                                    self.logInstance.error('Unexpected error: ' + err.stack);
                                    this.emit('error', err); // send to .on('error',...
                                }
                            });
                    } else {
                        return resolve(assertedOptions.src);
                    }
                });
            });
    };

///**
// * Parses string as single YAML file containing multiple YAML document and turns a JS objects array.
// *
// * NOTE: This function does not understand multi-document sources, it throws exception on those.
// *
// * @param src {string} The YAML source file to read.
// * @returns {Promise} Containing an array holding the multiple JSON objects.
// * @public
// */
//Reader.prototype.readYamls = function (src) {
//    // load source from YAML file
//    return fs.readFileAsync(src, 'utf8')
//        .then(function(yaml) {
//            self.logger.debug('YAML documents loaded from ' + src); // TOD: can this be shortened? -> return Promise.resolve(jsYaml.safeLoadAll(yaml));
//            return Promise.resolve().then(function () {
//                var jsDocs = [];
//                return jsYaml.safeLoadAll(yaml, function (doc) { // TOD this will not work in Promise environment!!!
//                    self.logger.debug(doc);
//                    jsDocs.push(doc);
//                });
//            });
//        });
//};

}

Reader.prototype.constructor = Reader;
module.exports = Reader;
