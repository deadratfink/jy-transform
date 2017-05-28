var Promise = require('bluebird');

// ////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
// ////////////////////////////////////////////////////////////////////////////

/**
 * Constructs the `Middleware`.
 *
 * @returns {Middleware} - The instance.
 * @constructor
 * @class Class which defines middleware Promises usable in or with this module.
 * @example
 * var middleware = require('./lib/middleware.js');
 */
function Middleware() {
}

Middleware.prototype.constructor = Middleware;
module.exports = new Middleware();

/**
 * Promise which reflects the identity of passed JSON: `f(object) → object`.
 *
 * @param {object} object - The JS object which is returned in Promise.
 * @returns {Promise.<object>} - A Promise resolving the passed `json` object.
 * @private
 */
function identity(object) {
  return Promise.resolve(object);
}

/**
 * Middleware Promise which reflects the identity of passed JSON: `f(object) → object`.
 *
 * @param {object} object - The object which is returned in Promise.
 * @returns {Promise.<object>} - A Promise resolving the passed `json` object.
 * @example
 * var middleware = require('./lib/middleware.js');
 * var identityMiddleware = middleware.identityMiddleware;
 * transformer.transform(options, identityMiddleware)
 *     .then(function(object) {
 *         ...
 *     }):
 * @public
 */
Middleware.prototype.identityMiddleware = identity;

/**
 * Ensure that the given middleware Promise is a function if set.
 * If not set a new JSON 'identity' Promise is returned which simply passes
 * a JSON object.
 *
 * @param {Function} middleware - This middleware Promise can be used to intercept
 *        the JSON object for altering he passed JSON, the function signature is:
 *
 *        ```
 *        function(object)
 *        ```
 *
 *        **NOTE:** the Promise has to return the processed JSON!
 * @returns {Function} - The given middleware Promise or a new JSON 'identity' middleware Promise function.
 * @throws {TypeError} - Will throw this error when the passed `middleware` is not type of `Function`.
 * @example
 * var middleware = require('./lib/middleware.js');
 * var myMiddleware = function(object) {
 *     //...
 * };
 * transformer.transform(options, middleware.ensureMiddleware(myMiddleware))
 *     .then(function(object) {
 *         //...
 *     }):
 * @public
 */
Middleware.prototype.ensureMiddleware = function (middleware) {
  if (middleware !== undefined && (typeof middleware !== 'function')) {
    throw new TypeError('The provided middleware is not a Function type');
  }
  if (!middleware) {
    middleware = identity;
  }
  return middleware;
};
