import logger from 'cli';
import { TRANSFORMATIONS } from './constants';
import { ensureMiddleware } from './middleware';
import { readJs, readYaml } from './reader';
import Joi from './validation/joi-extensions';
import { transformerOptionsSchema } from './validation/options-schema';
import { writeJs, writeJson, writeYaml } from './writer';

/**
 * @module jy-transform:transformer
 * @description This module provides the _transform_ functionality for YAML, JS or JSON source to destination mapping.
 * @public
 */

/**
 * This method creates the transformation described by the given options resolving a name to get the proper function.
 *
 * @param {Options} options - The configuration for a transformation.
 * @returns {Promise.<string>} The transformation name.
 * @example
 * var OptionsHandler = require('./options-handler.js');
 * var logger = ...;
 * var optionsHandler = new OptionsHandler(logger);
 *
 * optionsHandler.validateTransformation(options)
 *     .spread(function (validatedOptions, transformation) {
 *         ...
 *     )):
 * @see {@link transformations}
 * @public
 */
async function createTransformation(options) {
  const transformation = options.origin + '2' + options.target;
  console.log('Transformation: ' + transformation)
  return transformation;
}

/**
 * Internal delegate function to execute transformation logic (ITMO):
 * - Input (read)
 * - Transform + Middleware
 * - Output (write)
 *
 * @param {Options} options       - The configuration for a transformation.
 * @param {Function} read         - The reader function.
 * @param {Function} [middleware] - The middleware to apply.
 * @param {Function} write        - The writer functions.
 * @example
 * var options = {...};
 * var middleware = async (obj) => {
 *     ...
 * };
 * const result = await itmo(options, readYaml, middleware, writeJson);
 * @private
 */
async function itmo(options, read, middleware, write) {
  const ensuredMiddleware = ensureMiddleware(middleware);
  let json = await read(options);
  json = await ensuredMiddleware(json);
  return await write(json, options);
}

// ////////////////////////////////////////////////////////////////////////////
// TRANSFORMATION METHODS (DELEGATES)
// ////////////////////////////////////////////////////////////////////////////

/**
 * Convert YAML to JS.
 *
 * @param {Options} options - The configuration for a transformation.
 * @param {Function} [middleware] - This middleware Promise can be used to intercept
 *        the JS object for manipulation. The function signature is `function(object)`.
 *        **NOTE:** the Promise has to return the processed JS object!
 * @returns {Promise.<string>} Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} Will throw this error when the passed `middleware` is not type of `Function`.
 * @throws {Error} Will throw plain error when writing to JS destination failed due to any reason.
 * @example
 * import { transformer } from 'jy-transform';
 * const options = {...};
 * var middleware = function (obj) {
 *     ...
 * };
 * yamlToJs(options, middleware);
 * @see itmo
 * @private
 */
function yamlToJs(options, middleware) {
  return itmo(options, readYaml, middleware, writeJs);
}

/**
 * Convert YAML to JSON.
 *
 * @param {Options} options - The configuration for a transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JS object for manipulation. The function signature is:
 *        ```
 *        function(object)
 *        ```
 *        **NOTE:** the Promise has to return the processed JS object!
 * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} - Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error}     - Will throw plain error when writing to JSON destination failed due to any reason.
 * @example
 * var logger = ...;
 * var options = {...};
 * var middleware = function (obj) {
     *     ...
     * };
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 * transformer.yamlToJson(options, middleware);
 * @see itmo
 * @private
 */
function yamlToJson(options, middleware) {
  return itmo(options, readYaml, middleware, writeJson);
}

/**
 * Convert JS to YAML.
 *
 * @param {Options} options       - The configuration for a transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JS object for manipulation. The function signature is:
 *        ```
 *        function(object)
 *        ```
 *        **NOTE:** the Promise has to return the processed JS object!
 * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} - Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error}     - Will throw plain error when writing to YAML destination failed due to any reason.
 * @example
 * var logger = ...;
 * var options = {...};
 * var middleware = function (obj) {
     *     ...
     * };
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 * transformer.jsToYaml(options, middleware);
 * @see itmo
 * @private
 */
function jsToYaml(options, middleware) {
  return itmo(options, readJs, middleware, writeYaml);
}

/**
 * Convert JSON to JS.
 *
 * @param {Options} options       - The configuration for a transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JS object for manipulation. The function signature is:
 *        ```
 *        function(object)
 *        ```
 *        **NOTE:** the Promise has to return the processed JS object!
 * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} - Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error}     - Will throw plain error when writing to JS destination failed due to any reason.
 * @example
 * var logger = ...;
 * var options = {...};
 * var middleware = function (obj) {
     *     ...
     * };
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 * transformer.jsonToJs(options, middleware);
 * @see itmo
 * @private
 */
function jsonToJs(options, middleware) {
  return itmo(options, readJs, middleware, writeJs);
}

/**
 * Convert JS to JSON.
 *
 * @param {Options} options       - The configuration for a transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JS object for manipulation. The function signature is:
 *        ```
 *        function(object)
 *        ```
 *        **NOTE:** the Promise has to return the processed JS object!
 * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} - Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error}     - Will throw plain error when writing to JSON destination failed due to any reason.
 * @example
 * var logger = ...;
 * var options = {...};
 * var middleware = function (obj) {
     *     ...
     * };
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 * transformer.jsToJson(options, middleware);
 * @see itmo
 * @private
 */
function jsToJson(options, middleware) {
  return itmo(options, readJs, middleware, writeJson);
}

/**
 * Convert YAML to YAML.
 *
 * @param {Options} options       - The configuration for a transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JS object for manipulation. The function signature is:
 *        ```
 *        function(object)
 *        ```
 *        **NOTE:** the Promise has to return the processed JS object!
 * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} - Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error}     - Will throw plain error when writing to YAML destination failed due to any reason.
 * @example
 * var logger = ...;
 * var options = {...};
 * var middleware = function (obj) {
     *     ...
     * };
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 * transformer.yamlToYaml(options, middleware);
 * @see itmo
 * @private
 */
function yamlToYaml(options, middleware) {
  return itmo(options, readYaml, middleware, writeYaml);
}

/**
 * Convert JSON to JSON.
 *
 * @param {Options} options       - The configuration for a transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JS object for manipulation. The function signature is:
 *        ```
 *        function(object)
 *        ```
 *        **NOTE:** the Promise has to return the processed JS object!
 * @returns {Promise}  - Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} - Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @throws {Error}     - Will throw plain error when writing to JSON destination failed due to any reason.
 * @example
 * var logger = ...;
 * var options = {...};
 * var middleware = function (obj) {
     *     ...
     * };
 * var Transformer = require('jy-transform');
 * var transformer = new Transformer(logger);
 * transformer.jsonToJson(options, middleware);
 * @see itmo
 * @private
 */
function jsonToJson(options, middleware) {
  return itmo(options, readJs, middleware, writeJson);
}

/**
 * Convert JS to JS.
 *
 * @param {Options} options       - The configuration for a transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JS object for manipulation. The function signature is:
 *        ```
 *        function(object)
 *        ```
 *        **NOTE:** the Promise has to return the processed JS object!
 * @returns {Promise.<String>} Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} Will throw this error when the passed `middleware` is not type of `Function`.
 * @throws {Error} Will throw plain error when writing to JS destination failed due to any reason.
 * @example
 * var options = {...};
 * var middleware = async (json) {
 *   ...
 * };
 * jsToJs(options, middleware);
 * @see itmo
 * @private
 */
function jsToJs(options, middleware) {
  return itmo(options, readJs, middleware, writeJs);
}

/**
 * A transformation name to internal function mapping.
 *
 * @namespace
 * @property {Function} yaml2js   - The transformation function for YAML ⇒ JS.
 * @property {Function} yaml2json - The transformation function for YAML ⇒ JSON.
 * @property {Function} yaml2yaml - The transformation function for YAML ⇒ YAML.
 * @property {Function} json2yaml - The transformation function for JSON ⇒ YAML.
 * @property {Function} json2js   - The transformation function for JSON ⇒ JS.
 * @property {Function} json2json - The transformation function for JSON ⇒ JSON.
 * @property {Function} js2yaml   - The transformation function for JS ⇒ YAML.
 * @property {Function} js2json   - The transformation function for JS ⇒ JSON.
 * @property {Function} js2js     - The transformation function for JS ⇒ JS.
 * @private
 */
const transformations = {
  yaml2js: yamlToJs,
  yaml2json: yamlToJson,
  yaml2yaml: yamlToYaml,
  json2yaml: jsToYaml,
  json2js: jsonToJs,
  json2json: jsonToJson,
  js2yaml: jsToYaml,
  js2json: jsToJson,
  js2js: jsToJs
};

// /**
//  * Constructs the `Transformer` with options and an (optional) logger.
//  *
//  * @param {(logger|cli|console)} [logger=console] - Logger instance.
//  * @returns {Transformer} - The instance.
//  * @constructor
//  * @class This class provides all methods usable to handle YAML, JSON and JS and
//  *        their transformations.
//  * @example
//  * var logger = ...;
//  * var Transformer = require('jy-transform');
//  * var transformer = new Transformer(logger);
//  */
// export class Transformer {

// const logger = new LogWrapper(logger);
// const writer = new Writer(logger);
// const reader = new Reader(logger);

// ////////////////////////////////////////////////////////////////////////////
// PUBLIC API
// ////////////////////////////////////////////////////////////////////////////

/**
 * The entry method for all transformation accepting a configuration object and
 * an (optional) middleware function.
 *
 * @param {Options} options - The configuration for a transformation.
 * @param {function} [middleware] - This middleware Promise can be used to intercept
 *        the JSON object for altering the passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        <p>
 *        **NOTE:** the Promise has to return the processed JSON!
 * @returns {Promise.<String>} Containing the transformation result as message (e.g. to be logged by caller).
 * @throws {TypeError} Will throw this error when the passed `middleware` is not type of `Function`.
 * @throws {Error} Will throw plain error when writing to file failed due to any reason.
 * @public
 * @example
 * import { transform } from 'jy-transform';
 * const options = {...};
 * const middleware = async (json) {
 *     json.myproperty = 'new value';
 *     return json;
 * };
 *
 * transform(options, middleware)
 *     .then(function (msg){
 *         logger.info(msg);
 *     })
 *     .catch(function (err) {
 *         logger.error(err.stack);
 *     });
 */
export async function transform(options, middleware) {
  logger.debug('transform');
  const ensuredOptions = await Joi.validate(options, transformerOptionsSchema);
  const transformation = await createTransformation(ensuredOptions);
  logger.debug('Calling transformation: ' + transformation);
  return await transformations[transformation](ensuredOptions, middleware);
}

export default {
  transform,
};
