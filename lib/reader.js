'use strict';

var Constants = require('./constants.js');
var LogWrapper = require('./log-wrapper.js');
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

    var self = this;

    /**
     * Creates a function to read from the passed source in to the given buffer array.
     *
     * @param {stream.Readable} src - The source to read from.
     * @param {array} bufs          - The temporary buffer array.
     * @returns {Function}          - The function whic hreads and buffers.
     */
    function createReadableFunction (src, bufs) {
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
     * @param {(string|Readable|object)} src - The JS/JSON source file to read.
     * @returns {Promise}  - Containing the JSON object.
     * @public
     * @example
     * var Reader = require('jy-transform').Reader;
     * var logger = ...;
     *
     * var reader = new Reader(logger);
     * reader.readJs('./my.js')
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * reader.readJs('./my.json')
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.readJs = function (src) {
        // complain about missing source file
        if (!src) {
            return Promise.reject(new Error('missing options.src: pls specify existing input source!'));
        }
        if (typeof src === 'string') {
            try {
                var resolvedPath = path.resolve('', src);
                return Promise.resolve(require(resolvedPath));
            } catch (err) { // probably a SyntaxError
                self.logInstance.error('Unexpected error: ' + err.stack);
                return Promise.reject(err);
            }
        } else if (isStream.readable(src)) {
            return new Promise(function (resolve, reject) {
                // read stringified JSON
                var bufs = [];
                src.on('readable', createReadableFunction (src, bufs))
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
            });
        } else {
            return Promise.resolve(src);
        }
    };

    /**
     * Loads a single YAML file containing document and turns a JS object.
     *
     * *NOTE:* This function does not understand multi-document sources, it throws
     * exception on those.
     *
     * @param {(string|Readable|object)} src - The YAML source file to read.
     * @returns {Promise} - Containing the JSON object.
     * @public
     * @example
     * var Reader = require('jy-transform').Reader;
     * var logger = ...;
     *
     * var reader = new Reader(logger);
     * reader.readYaml('./my.yaml')
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.readYaml = function (src) {
        // complain about missing source file
        if (!src) {
            return Promise.reject(new Error('missing options.src: pls specify existing input source!'));
        }
        if (typeof src === 'string') {
            // load source from YAML file
            return fs.readFileAsync(src, Constants.UTF8)
                .then(function (yaml) {
                    self.logInstance.debug('YAML loaded from file ' + src);
                    try {
                        return Promise.resolve(jsYaml.safeLoad(yaml));
                    } catch (err) { // probably a YAMLException
                        self.logInstance.error('Unexpected error: ' + err.stack);
                        return Promise.reject(err);
                    }
                });
        } else if (isStream.readable(src)) {
            return new Promise(function (resolve, reject) {
                // read YAML
                var bufs = [];
                src.on('readable', createReadableFunction (src, bufs))
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
            });
        } else {
            return Promise.resolve(src);
        }
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
//            self.logger.debug('YAML documents loaded from ' + src); // TODO: can this be shortened? -> return Promise.resolve(jsYaml.safeLoadAll(yaml));
//            return Promise.resolve().then(function () {
//                var jsDocs = [];
//                return jsYaml.safeLoadAll(yaml, function (doc) { // TODO this will not work in Promise environment!!!
//                    self.logger.debug(doc);
//                    jsDocs.push(doc);
//                });
//            });
//        });
//};

}

Reader.prototype.constructor = Reader;
module.exports = Reader;
