'use strict';

var Constants = require('./constants.js');
var LogWrapper = require('./log-wrapper.js');
var jsYaml = require('js-yaml');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

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

    ///////////////////////////////////////////////////////////////////////////////
    // API METHODS (PUBLIC)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Reads the data from a given _*.js_ or _*.json_ file source.
     *
     * @param {string} src - The JS/JSON source file to read.
     * @returns {Promise}  - Containing the JSON object.
     * @public
     * @example
     * var Reader = require('jy-transform').Reader;
     * var logger = ...;
     *
     * var reader = new Reader(logger);
     * reader.readJs(./my.js)
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     *
     * reader.readJs(./my.json)
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.readJs = function (src) {
        var resolvedPath = path.resolve('', src);
        return Promise.resolve(require(resolvedPath));
    };

    /**
     * Loads a single YAML file containing document and turns a JS object.
     *
     * *NOTE:* This function does not understand multi-document sources, it throws
     * exception on those.
     *
     * @param{string} src - The YAML source file to read.
     * @returns {Promise} - Containing the JSON object.
     * @public
     * @example
     * var Reader = require('jy-transform').Reader;
     * var logger = ...;
     *
     * var reader = new Reader(logger);
     * reader.readYaml(./my.yaml)
     *     .then(function (json){
     *         logger.info(JSON.stringify(json));
     *     })
     *     .catch(function (err) {
     *         logger.error(err.stack);
     *     });
     */
    this.readYaml = function (src) {
        // load source from YAML file
        return fs.readFileAsync(src, Constants.UTF8)
            .then(function (yaml) {
                self.logInstance.debug('YAML loaded from ' + src);
                return Promise.resolve(jsYaml.safeLoad(yaml));
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
