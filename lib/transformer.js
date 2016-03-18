'use strict';

var Writer = require('./writer.js');
var Reader = require('./reader.js');
var LogWrapper = require('./log-wrapper.js');
var OptionsHandler = require('./options-handler.js');
var middleware = require('./middleware.js');
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `Transformer` with options and an (optional) logger.
 *
 * @param {(logger|cli|console)} [logger=console] - Logger object.
 * @returns {Transformer} - The instance.
 * @constructor
 * @class This class provides all methods usable to handle YAML, JSON and JS and
 *        their transformations.
 * @example
 * var logger = ...;
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 */
function Transformer(logger) {

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
     * The internal `Writer` instance.
     *
     * @type {Writer}
     * @private
     */
    var writer = new Writer(logger);

    /**
     * The internal `Reader` instance.
     *
     * @type {Reader}
     * @private
     */
    var reader = new Reader(logger);

    /**
     * Ensures that basic middleware is set.
     */
    var ensureMiddleware = middleware.ensureMiddleware;

    /**
     * Internal function to execute transformation logic (ITMO):
     * - Input
     * - Transform
     * - Middleware
     * - Write
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} read The reader function.
     * @param {function} [middleware] The middleware to apply.
     * @param {function} write The writer functions.
     */
    var itmo = function (options, read, middleware, write) {
        return read(options.src)
            .then(middleware)
            .then(function (json) {
                return write(json, options.dest, options.indent);
            });
    };

    ///////////////////////////////////////////////////////////////////////////////
    // TRANSFORMATION METHODS (DELEGATES)
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Convert YAML to JS file.
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} [middleware] - This middleware Promise can be used to intercept
     *        the JSON object for altering he passed JSON, the function signature is:
     *        ```
     *        function(json)
     *        ```
     *        The Promise has to return the processed JSON!
     * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
     * @throws {TypeError} - Will throw this error when the passed `middleware`
     *         is not type of `Function`.
     * @throws {Error}     - Will throw plain error when writing to JSON/JS file failed due to any reason.
     * @private
     */
    this.yamlToJs = function (options, middleware) {
        return itmo(options, reader.readYaml, ensureMiddleware(middleware), writer.writeJs);
    };

    /**
     * Convert YAML to JSON file.
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} [middleware] - This middleware Promise can be used to intercept
     *        the JSON object for altering he passed JSON, the function signature is:
     *        ```
     *        function(json)
     *        ```
     *        The Promise has to return the processed JSON!
     * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
     * @throws {TypeError} - Will throw this error when the passed `middleware`
     *         is not type of `Function`.
     * @throws {Error}     - Will throw plain error when writing to JSON/JS file failed due to any reason.
     * @private
     */
    this.yamlToJson = function (options, middleware) {
        return itmo(options, reader.readYaml, ensureMiddleware(middleware), writer.writeJson);
    };

    /**
     * Convert JSON/JS to YAML file.
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} [middleware] - This middleware Promise can be used to intercept
     *        the JSON object for altering the passed JSON, the function signature is:
     *        ```
     *        function(json)
     *        ```
     *        The Promise has to return the processed JSON object!
     * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
     * @throws {TypeError} - Will throw this error when the passed `middleware`
     *         is not type of `Function`.
     * @throws {Error}     - Will throw plain error when writing to YAML file failed due to any reason.
     * @private
     */
    this.jsToYaml = function (options, middleware) {
        return itmo(options, reader.readJs, ensureMiddleware(middleware), writer.writeYaml);
    };

    /**
     * Convert JSON to JS file.
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} [middleware] - This middleware Promise can be used to intercept
     *        the JSON object for altering the passed JSON, the function signature is:
     *        ```
     *        function(json)
     *        ```
     *        The Promise has to return the processed JSON object!
     * @private
     */
    this.jsonToJs = function (options, middleware) {
        return itmo(options, reader.readJs, ensureMiddleware(middleware), writer.writeJs);
    };

    /**
     * Convert JS to JSON file.
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} [middleware] - This middleware Promise can be used to intercept
     *        the JSON object for altering the passed JSON, the function signature is:
     *        ```
     *        function(json)
     *        ```
     *        The Promise has to return the processed JSON object!
     * @private
     */
    this.jsToJson = function (options, middleware) {
        return itmo(options, reader.readJs, ensureMiddleware(middleware), writer.writeJson);
    };

    /**
     * Convert YAML to YAML file.
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} [middleware] - This middleware Promise can be used to intercept
     *        the JSON object for altering the passed JSON, the function signature is:
     *        ```
     *        function(json)
     *        ```
     *        The Promise has to return the processed JSON object!
     * @private
     */
    this.yamlToYaml = function (options, middleware) {
        return itmo(options, reader.readYaml, ensureMiddleware(middleware), writer.writeYaml);
    };

    /**
     * Convert JSON to JSON file.
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} [middleware] - This middleware Promise can be used to intercept
     *        the JSON object for altering the passed JSON, the function signature is:
     *        ```
     *        function(json)
     *        ```
     *        The Promise has to return the processed JSON object!
     * @private
     */
    this.jsonToJson = function (options, middleware) {
        return itmo(options, reader.readJs, ensureMiddleware(middleware), writer.writeJson);
    };

    /**
     * Convert JS to JS file.
     *
     * @param {{src: string, dest: string, indent: number}} options - The minimum configuration for a transformation.
     * @param {function} [middleware] - This middleware Promise can be used to intercept
     *        the JSON object for altering the passed JSON, the function signature is:
     *        ```
     *        function(json)
     *        ```
     *        The Promise has to return the processed JSON object!
     * @private
     */
    this.jsToJs = function (options, middleware) {
        return itmo(options, reader.readJs, ensureMiddleware(middleware), writer.writeJs);
    };

    /**
     * A transformation name to internal function mapping.
     *
     * @namespace
     * @property {function} yaml2js   - The transformation function for YAML -> JS.
     * @property {function} yaml2json - The transformation function for YAML -> JSON.
     * @property {function} yaml2yaml - The transformation function for YAML -> YAML.
     * @property {function} json2yaml - The transformation function for JSON -> YAML.
     * @property {function} json2js   - The transformation function for JSON -> JS.
     * @property {function} json2json - The transformation function for JSON -> JSON.
     * @property {function} js2yaml   - The transformation function for JS -> YAML.
     * @property {function} js2json   - The transformation function for JS -> JSON.
     * @property {function} js2js     - The transformation function for JS -> JS.
     * @private
     */
    this.transformations = {
        yaml2js: this.yamlToJs,
        yaml2json: this.yamlToJson,
        yaml2yaml: this.yamlToYaml,
        json2yaml: this.jsToYaml,
        json2js: this.jsonToJs,
        json2json: this.jsonToJson,
        js2yaml: this.jsToYaml,
        js2json: this.jsToJson,
        js2js: this.jsToJs
    };

    return this;
}

///////////////////////////////////////////////////////////////////////////////
// PROTOTYPE
///////////////////////////////////////////////////////////////////////////////

Transformer.prototype.constructor = Transformer;
exports = module.exports = Transformer;

///////////////////////////////////////////////////////////////////////////////
// API METHOD (PUBLIC)
///////////////////////////////////////////////////////////////////////////////

/**
 * The entry method for all transformation accepting a configuration object and
 * an (optional) middleware function.
 *
 * @param {{origin: string, target: string, src: string, dest: string, indent: number}} options -
 *        Properties to configure the transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        <p>
 *        **NOTE:** the Promise has to return the processed JSON!
 * @returns {Promise}  - Containing the transformation result as message (e.g.
 *          to be logged by caller).
 * @throws {TypeError} - Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error}     - Will throw plain error when writing to file failed due to any reason.
 * @public
 * @example
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 * var Promise = require('bluebird');
 * var logger = ...;
 * var options = {...};
 * var middleware = function (json) {
 *     json.myproperty = 'new value';
 *     return Promise.resolve(json);
 * };
 *
 * transformer.transform(options, middleware)
 *     .then(function (msg){
 *         logger.info(msg);
 *     })
 *     .catch(function (err) {
 *         logger.error(err.stack);
 *     });
 */
Transformer.prototype.transform = function (options, middleware) {
    var self = this;
    this.logInstance.debug('transform');
    return this.optionsHandler.ensureOptions(options)
        .then(this.optionsHandler.validateTransformation)
        .spread(function (copiedOptions, transformation) {
            self.logInstance.info('Calling transformation: ' + transformation);
            return self.transformations[transformation](copiedOptions, middleware);
        });
};
