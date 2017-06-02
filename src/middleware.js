/**
 * @module jy-transform:middlware
 * @description The module exporting the {@link external:joi.Extension}s for option validations.
 * @see {@link https://github.com/hapijs/joi/blob/v10.2.2/API.md#extendextension Joi.extend(extension) method}.
 * @public
 */

/**
 * Promise which reflects the identity of passed JSON: `f(object) → object`.
 *
 * @param {Object} object - The JS object which is resolved by Promise.
 * @returns {Promise.<object>} - A Promise resolving the passed JS `object`.
 * @private
 */
function identity(object) {
  return Promise.resolve(object);
}

/**
 * Middleware Promise which reflects the identity of passed JS: `f(object) → object`.
 *
 * @param {Object} object - The object which is returned in Promise.
 * @returns {Promise.<object>} A Promise resolving the passed JS object.
 * @example
 * import { identityMiddleware } from './lib/middleware';
 * transformer.transform(options, identityMiddleware)
 *   .then((object) => {
 *       // ...
 *   }):
 * @protected
 */
export function identityMiddleware(object) { // TODO remove
  return identity(object);
}

/**
 * Ensure that the given middleware Promise is a function if set.
 * If not set a new JSON 'identity' Promise is returned which simply passes
 * a JSON object.
 *
 * @param {Function} middleware - This middleware Promise can be used to intercept
 *        the JSON object for altering he passed JSON, the function signature is
 *        `function(object).` **NOTE:** the Promise has to return the processed JSON.
 * @returns {Function} - The given middleware Promise or a new JSON 'identity' middleware Promise function.
 * @throws {TypeError} - Will throw this error when the passed `middleware` is not type of `Function`.
 * @example
 * import { ensureMiddleware } from './lib/middleware';
 * const myMiddleware = async (object) => {
 *     //...do something with object
 *     return object;
 * };
 * transformer.transform(options, ensureMiddleware(myMiddleware))
 *   .then((transformedObject) => {
 *       //...
 *   }):
 * @protected
 */
export function ensureMiddleware(middleware) {
  if (middleware !== undefined && (typeof middleware !== 'function')) {
    throw new TypeError('The provided middleware is not a Function type');
  }
  if (!middleware) {
    return identity;
  }
  return middleware;
}

export default {
  identityMiddleware,
  ensureMiddleware,
};
