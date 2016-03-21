'use strict';

var Promise = require('bluebird');

///////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
///////////////////////////////////////////////////////////////////////////////

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
 * Ensure that the given middleware Promise is a function if set.
 * If not set a new JSON 'identity' Promise is returned which simply passes
 * a JSON object.
 *
 * @param {Function} middleware - This middleware Promise can be used to intercept
 *        the JSON object for altering he passed JSON, the function signature is:
 *        ```
 *        function(json)
 *        ```
 *        The Promise has to return the processed JSON!
 * @returns {Promise} The given middleware Promise or a new JSON 'identity' middleware Promise.
 * @throws {TypeError} Will throw this error when the passed `middleware`
 *         is not type of `Function`.
 * @example
 * var middleware = require('./lib/middleware.js');
 * var myMiddleware = function(json) {
 *     ...
 * };
 * transformer.transform(options, middleware.ensureMiddleware(myMiddleware))
 *     .then(function(json) {
 *         ...
 *     }):
 * @public
 */
Middleware.prototype.ensureMiddleware = function (middleware) {
    if (middleware !== undefined && (typeof middleware !== 'function')) {
        return Promise.reject(new TypeError('The provided middleware is not a Function type'));
    }
    if (!middleware) {
        /**
         * The identity function middleware.
         *
         * @param {object} json - The JSON memory object.
         * @returns A Promise containing the passed `json` object.
         * @private
         */
        middleware = function (json) {
            return Promise.resolve(json);
        };
    }
    return middleware;
};
